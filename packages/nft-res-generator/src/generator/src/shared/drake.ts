import { abort, debug } from "https://deno.land/x/drake@v1.5.0/mod.ts";
import { existsSync } from "../../deps.ts";

/**
 * Write text to a file synchronously.
 * If the file exists it will be overwritten.
 * Returns `true` if a new file was created.
 * Returns `false` if the file already exists.
 */
export function writeFile(
  filename: string,
  text: string,
  options?: { append: boolean },
): boolean {
  const exists = existsSync(filename);
  try {
    debug(
      "writeFile",
      `${filename}: ${text.length} characters written`,
    );

    Deno.writeTextFileSync(filename, text, options);
  } catch (e) {
    abort(`writeFile: ${filename}: ${e.message}`);
  }
  return !exists;
}
