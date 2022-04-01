import { abort, env, sh } from "https://deno.land/x/drake@v1.5.0/mod.ts";

import { dirname, fromFileUrl, join, resolve } from "../../deps.ts";
import { Guard } from "../shared/core/guard.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));

const pythonModule = join(__dirname, "generate_metadata.py");

const assetsDirectory = resolve(__dirname, "../../", "assets");
const outputDirectory = resolve(__dirname, "../../", "build");

// deno-lint-ignore require-await
export async function generateMetadata() {
  const numberOfTokens = env("count");
  const isFakeImage = env("fakeImage") === "true";

  const guardResult = Guard.greaterThan(0, numberOfTokens);

  if (!guardResult.succeeded) {
    abort(guardResult.message as string);
  }

  sh(
    `poetry run python3 "${pythonModule}" "${assetsDirectory}" "${outputDirectory}" ${numberOfTokens} ${
      isFakeImage ? "--fake-image" : ""
    }`
  );
}
