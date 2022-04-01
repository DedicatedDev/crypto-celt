import { dirname, fromFileUrl, join } from "https://deno.land/std@0.118.0/path/mod.ts";
import { abort, env, sh } from "https://deno.land/x/drake@v1.5.0/mod.ts";

import { Guard } from "../shared/core/guard.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

const pythonModule = join(__dirname, "convert_layers_csv.py");

export async function convertLayersCsv() {
  const layersCsvPath = env("layersCsvPath");
  const outputJsonPath = env("outputJsonPath");

  const guardResult = Guard.againstNullOrUndefinedBulk([
    { argument: layersCsvPath, argumentName: "layersCsvPath" },
    { argument: outputJsonPath, argumentName: "outputJsonPath" },
  ]);

  if (!guardResult.succeeded) {
    abort(guardResult.message as string);
  }

  sh(`poetry run python3 "${pythonModule}" "${layersCsvPath}" "${outputJsonPath}"`);
}
