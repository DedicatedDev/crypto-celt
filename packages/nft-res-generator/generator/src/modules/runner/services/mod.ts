import { RateLimiter } from "../../../../deps.ts";
import { GoogleOAuth2Service } from "./google/google_oauth2.ts";
import { googleServiceAccountToken } from "./google/google_service_account.ts";
import { AuthService } from "./auth_service.ts";
import { ExecutionService, StatusCell } from "./execution_service.ts";
import { NFTPortService } from "./nft_port_service.ts";
import { authConfig, driveConfig } from "../../../config/mod.ts";

const googleOAuth2Client = new GoogleOAuth2Service(googleServiceAccountToken);

const authService = new AuthService(
  googleOAuth2Client,
);

const driveLimiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: "second",
  fireImmediately: false,
});

const sheetsLimiter = new RateLimiter({
  tokensPerInterval: 50,
  interval: "minute",
  fireImmediately: false,
});

const nftPortLimiter = new RateLimiter({
  tokensPerInterval: 4,
  interval: "second",
  fireImmediately: false,
});

const executionService = new ExecutionService(
  authService,
  { id: driveConfig.executionSheetId, limiter: sheetsLimiter },
  { id: driveConfig.sharedDriveId, limiter: driveLimiter },
);

const nftPortService = new NFTPortService(
  nftPortLimiter,
  authConfig.nftPortAPIKey,
);

export { authService, executionService, nftPortService, StatusCell };
