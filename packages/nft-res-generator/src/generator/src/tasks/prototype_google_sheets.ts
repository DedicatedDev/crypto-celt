import { log } from "../../deps.ts";
import { executionService } from "../modules/runner/services/mod.ts";

export async function prototypeGoogleSheets() {
  const logger = log.getLogger();

  const [id] = crypto.getRandomValues(new Uint8Array(1));

  log.info(`expected: ${id}`);

  // Write to test cell
  await executionService.updateRange("status", "B2", [[id.toString()]]);

  try {
    const status = await executionService.getStatus();
    logger.info(status);
  } catch (e) {
    logger.error(e);
  }
}
