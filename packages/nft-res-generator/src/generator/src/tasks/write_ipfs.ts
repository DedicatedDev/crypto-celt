import { abort } from "https://deno.land/x/drake@v1.5.0/mod.ts";

import { log } from "../../deps.ts";
import { Asset, StatusCell } from "../modules/runner/services/execution_service.ts";
import { executionService } from "../modules/runner/services/mod.ts";

const logger = log.getLogger();

async function writeBatch(assets: Asset[]): Promise<void> {
  const [asset] = assets;
  const { id, driveImageFileId, driveMetadataFileId, ipfsImageURL, ipfsMetaURL } = asset;

  if (ipfsImageURL || ipfsMetaURL) {
    throw new Error(`Asset ${id} is already written`);
  }

  if (!driveImageFileId || !driveMetadataFileId) {
    throw new Error(`Asset ${id} is missing file metadata`);
  }

  logger.info(`Reading image ${driveImageFileId} for asset ${id}`);
  const image = await executionService.getImage(driveImageFileId);

  logger.info(`Reading metadata ${driveMetadataFileId} for asset ${id}`);
  const metadata = await executionService.getMetadata(driveMetadataFileId);

  logger.info("Writing image");
  // nftPortService.writeImage(image, `${metadata.name}.png`);

  logger.info("Writing metadata");
  // TODO: create IPFSMetadata (nft_port_service) payload
  // nftPortService.writeMetadata(image, `${ipfsMeta.name}.png`);

  // TODO: remove
  console.log(metadata);

  logger.info("Updating execution sheet");

  // TODO: write updated asset so the IPFS URLs are there for minting
  await executionService.writeAssets([asset], StatusCell.LastIPFSId);

  const nextAssets = assets.slice(1);

  if (nextAssets.length > 0) {
    await writeBatch(nextAssets);
  }
}

export async function writeIPFS() {
  try {
    logger.info("Retrieving settings");
    const { maxMintId } = await executionService.getSettings();

    logger.info("Retrieving status");
    const { lastIPFSId } = await executionService.getStatus();

    const startId = +lastIPFSId + 1;
    const endId = maxMintId;

    if (startId > maxMintId) {
      throw new Error(`Asset ${startId} is greater than max_mint_id (${maxMintId})`);
    }

    const assets = await executionService.getAssets(startId, endId);
    await writeBatch(assets);
  } catch (e) {
    abort(e);
  }
}
