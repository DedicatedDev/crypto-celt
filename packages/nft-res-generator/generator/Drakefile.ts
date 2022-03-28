import { run, task } from "https://deno.land/x/drake@v1.5.0/mod.ts";
import { convertLayersCsv } from "./src/tasks/convert_layers_csv.ts";
import { createExecutionTemplate } from "./src/tasks/create_execution_template.ts";
import { generateMetadata } from "./src/tasks/generate_metadata.ts";
import { prototypeGoogleDrive } from "./src/tasks/prototype_google_drive.ts";
import { prototypeGoogleSheets } from "./src/tasks/prototype_google_sheets.ts";
import { writeFileIds } from "./src/tasks/write_file_ids.ts";
import { writeIPFS } from "./src/tasks/write_ipfs.ts";

task("convert-layers-csv", [], function () {
  convertLayersCsv();
});

task("generate-metadata", [], async function () {
  await generateMetadata();
});

task("create-execution-template", [], function () {
  createExecutionTemplate();
});

task("write-file-ids", [], async function () {
  await writeFileIds();
});

task("write-ipfs", [], async function () {
  await writeIPFS();
});

task("prototype-google-drive", [], async function () {
  await prototypeGoogleDrive();
});

task("prototype-google-sheets", [], async function () {
  await prototypeGoogleSheets();
});

run();
