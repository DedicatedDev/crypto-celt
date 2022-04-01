import { log } from "../../deps.ts";
import { driveConfig } from "../config/mod.ts";
import { executionService, StatusCell } from "../modules/runner/services/mod.ts";

export async function writeFileIds() {
  const logger = log.getLogger();

  try {
    logger.info("Retrieving image file ids");
    const imageLookup: any = await executionService.listFiles(driveConfig.imagesFolderId);

    logger.info("Retrieving metadata file ids");
    const metaLookup: any = await executionService.listFiles(driveConfig.metadataFolderId);

    logger.info("Creating assets");
    // Reading assets in advance using getAssets (updated to page) could make this task
    // idempotent.
    const assets = [...Array(8888).keys()].map((index) => {
      const id = index + 1;
      const filePrefix = id.toString().padStart(4, "0");

      return {
        id,
        driveImageFileId: imageLookup[`${filePrefix}.png`],
        driveMetadataFileId: metaLookup[`${filePrefix}.json`],
        driveDataUTC: new Date(),
      };
    });

    logger.info("Updating execution sheet");
    await executionService.writeAssets(assets, StatusCell.LastDriveImageId);
  } catch (e) {
    logger.error(e);
  }
}
