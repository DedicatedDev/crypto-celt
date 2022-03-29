const driveConfig = {
  executionSheetId: Deno.env.get("G_DRIVE_SHEET_ID") as string,
  imagesFolderId: Deno.env.get("G_DRIVE_IMAGES_FOLDER_ID") as string,
  metadataFolderId: Deno.env.get("G_DRIVE_METADATA_FOLDER_ID") as string,
  sharedDriveId: Deno.env.get("G_DRIVE_SHARED_ID") as string,
};

export { driveConfig };
