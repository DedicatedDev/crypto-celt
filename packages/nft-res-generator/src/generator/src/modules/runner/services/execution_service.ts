import { lodash, log, RateLimiter } from "../../../../deps.ts";

import { IAuthService } from "./auth_service.ts";
import { BaseGoogleAPI } from "./google/base_api.ts";

const logger = log.getLogger();

interface ExecutionStatus {
  test: number;
  lastDriveId: number;
  lastIPFSId: number;
  lastPolygonMintId: number;
}

interface ExecutionSettings {
  usdToEth: number;
  maxMintId: number;
}

export enum StatusCell {
  LastDriveImageId = "B3",
  LastIPFSId = "B4",
  LastPolygonMintId = "B5",
}

export interface Asset {
  id: number;
  openSeaURL?: URL;
  polygonURL?: URL;
  mintDateUTC?: Date;
  ipfsMetaURL?: URL;
  metaDateUTC?: Date;
  ipfsImageURL?: URL;
  imageDateUTC?: Date;
  driveImageFileId?: string;
  driveMetadataFileId?: string;
  driveDataUTC?: Date;
}

export interface GoogleOptions {
  id: string;
  limiter: RateLimiter;
}

export class ExecutionService extends BaseGoogleAPI {
  private static readonly baseSheetAPI = "https://sheets.googleapis.com/v4/spreadsheets";
  private static readonly baseDriveAPI = "https://www.googleapis.com/drive/v3";
  private sheetAPI: string;
  private sheetLimiter: RateLimiter;
  private driveAPI: string;
  private driveId: string;
  private driveLimiter: RateLimiter;

  constructor(authService: IAuthService, sheet: GoogleOptions, drive: GoogleOptions) {
    super(authService);

    const { id: sheetId, limiter: sheetLimiter } = sheet;
    this.sheetAPI = `${ExecutionService.baseSheetAPI}/${sheetId}`;
    this.sheetLimiter = sheetLimiter;

    const { id: driveId, limiter: driveLimiter } = drive;
    this.driveAPI = ExecutionService.baseDriveAPI;
    this.driveId = driveId;
    this.driveLimiter = driveLimiter;
  }

  async updateRange(sheet: string, range: string, values: string[][]) {
    const sheetURL = new URL(`${this.sheetAPI}/values/${sheet}!${range}`);

    sheetURL.searchParams.append("valueInputOption", "RAW");
    const payload = {
      range: `${sheet}!${range}`,
      majorDimension: "ROWS",
      values: values,
    };

    await this.sheetLimiter.removeTokens(1);

    logger.info(`Writing ${sheet}!${range}`);

    await this.put(sheetURL.href, JSON.stringify(payload), {
      "Content-Type": "application/json",
    });
  }

  async getAssets(firstAssetId: number, lastAssetId: number): Promise<Asset[]> {
    const startRow = firstAssetId + 1;
    const endRow = lastAssetId + 1;
    const range = `A${startRow}:K${endRow}`;

    await this.sheetLimiter.removeTokens(1);

    const assetResponse = await this.get(`${this.sheetAPI}/values/assets!${range}`);
    const response = await assetResponse.json();
    const rawAssets = response.values || [];

    const expectedLength = endRow - startRow;

    if (rawAssets.length < expectedLength) {
      const emptyAsset = Array(11).fill("");
      const delta = Array(expectedLength).fill(emptyAsset);
      rawAssets.push(...delta);
    }

    return rawAssets.map((jsonAsset: any, index: number) => ({
      id: jsonAsset[0] ? Number(jsonAsset[0]) : index + 1,
      openSeaURL: jsonAsset[1] ? new URL(jsonAsset[1]) : undefined,
      polygonURL: jsonAsset[2] ? new URL(jsonAsset[2]) : undefined,
      mintDateUTC: jsonAsset[3] ? new Date(jsonAsset[3]) : undefined,
      ipfsMetaURL: jsonAsset[4] ? new URL(jsonAsset[4]) : undefined,
      metaDateUTC: jsonAsset[5] ? new Date(jsonAsset[3]) : undefined,
      ipfsImageURL: jsonAsset[6] ? new URL(jsonAsset[6]) : undefined,
      imageDateUTC: jsonAsset[7] ? new Date(jsonAsset[7]) : undefined,
      driveImageFileId: jsonAsset[8] || undefined,
      driveMetadataFileId: jsonAsset[9] || undefined,
      driveDataUTC: jsonAsset[10] ? new Date(jsonAsset[10]) : undefined,
    }));
  }

  toDTO(asset: Asset) {
    const {
      id,
      openSeaURL,
      polygonURL,
      mintDateUTC,
      ipfsMetaURL,
      metaDateUTC,
      ipfsImageURL,
      imageDateUTC,
      driveImageFileId,
      driveMetadataFileId,
      driveDataUTC,
    } = asset;

    return [
      id.toString(),
      openSeaURL?.href || "",
      polygonURL?.href || "",
      mintDateUTC?.toISOString() || "",
      ipfsMetaURL?.href || "",
      metaDateUTC?.toISOString() || "",
      ipfsImageURL?.href || "",
      imageDateUTC?.toISOString() || "",
      driveImageFileId?.toString() || "",
      driveMetadataFileId?.toString() || "",
      driveDataUTC?.toISOString() || "",
    ];
  }

  async writeAssets(assets: Asset[], statusRange?: StatusCell): Promise<void> {
    const values = assets.map(this.toDTO);
    const batchValues = lodash.chunk(values, 100);

    for (const batch of batchValues) {
      const startRow = Number(batch[0][0]) + 1;
      const lastBatchAssetId = Number(batch[batch.length - 1][0]);
      const endRow = lastBatchAssetId + 1;
      const range = `A${startRow}:K${endRow}`;

      await this.updateRange("assets", range, batch);

      if (statusRange) {
        await this.updateRange("status", statusRange, [[lastBatchAssetId.toString()]]);
      }
    }
  }

  async getStatus(): Promise<ExecutionStatus> {
    await this.sheetLimiter.removeTokens(1);

    const statusResponse = await this.get(`${this.sheetAPI}/values/status!A2:B6`);

    const jsonStatus = await statusResponse.json();
    const status = Object.fromEntries(jsonStatus.values);

    return {
      test: +status.test,
      lastDriveId: +status.last_drive_id,
      lastIPFSId: +status.last_ipfs_id,
      lastPolygonMintId: +status.last_polygon_mint_id,
    };
  }

  async getSettings(): Promise<ExecutionSettings> {
    await this.sheetLimiter.removeTokens(1);

    const settingsResponse = await this.get(`${this.sheetAPI}/values/settings!A2:B3`);

    const jsonStatus = await settingsResponse.json();
    const settings = Object.fromEntries(jsonStatus.values);

    return {
      usdToEth: +settings.usd_to_eth,
      maxMintId: +settings.max_mint_id,
    };
  }

  async getFile(fileId: string) {
    const fileURL = new URL(`${this.driveAPI}/files/${fileId}`);

    fileURL.searchParams.append("alt", "media");
    fileURL.searchParams.append("driveId", this.driveId);
    fileURL.searchParams.append("supportsAllDrives", "true");

    await this.driveLimiter.removeTokens(1);

    return this.get(fileURL.href);
  }

  async getImage(fileId: string) {
    const response = await this.getFile(fileId);
    return response.blob();
  }

  async getMetadata(fileId: string) {
    const response = await this.getFile(fileId);
    return response.json();
  }

  async listFiles(parentId: string) {
    let fileLookup = {};
    let pageToken = "";

    do {
      const queryURL = new URL(`${this.driveAPI}/files`);
      queryURL.searchParams.append("driveId", this.driveId);
      queryURL.searchParams.append("includeItemsFromAllDrives", "true");
      queryURL.searchParams.append("corpora", "drive");
      queryURL.searchParams.append("supportsAllDrives", "true");
      queryURL.searchParams.append("q", `'${parentId}' in parents`);
      queryURL.searchParams.append("pageSize", "1000");

      pageToken && queryURL.searchParams.append("pageToken", pageToken);

      await this.driveLimiter.removeTokens(1);

      const response = await this.get(queryURL.href);
      const responseJSON = await response.json();
      pageToken = responseJSON.nextPageToken;

      const newFiles = responseJSON.files.reduce(
        (lookup: any, file: any) => ((lookup[file.name] = file.id), lookup),
        {}
      );
      fileLookup = { ...fileLookup, ...newFiles };
    } while (pageToken);

    return fileLookup;
  }
}
