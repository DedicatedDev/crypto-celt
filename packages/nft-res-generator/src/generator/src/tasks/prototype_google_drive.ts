import { log, RateLimiter } from "../../deps.ts";
import { executionService } from "../modules/runner/services/mod.ts";

const limiter = new RateLimiter({
  tokensPerInterval: 4,
  interval: "second",
  fireImmediately: true,
});

export async function prototypeGoogleDrive() {
  const logger = log.getLogger();
  // const nftPortURL = "https://api.nftport.xyz/v0/files";

  try {
    // test file
    const blob = await executionService.getFile("1kh_aa1zWABKOAl7B_J8dhP_BCJlRc0Jt");

    console.log(blob);

    /*
    const formData = new FormData();
    formData.append("file", blob, "test.jpg");

    await limiter.removeTokens(1);

    // https://github.com/sindresorhus/ky/issues/380
    const response = await fetch(nftPortURL, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": nftPortConfig.apiKey,
      },
    });

    logger.info(await response.json());*/
  } catch (e) {
    console.log(e);
    logger.error(e);
  }
}
