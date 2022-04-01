import { JWTToken } from "../../domain/jwt.ts";

import { IGoogleOAuth2Service } from "./google_oauth2.ts";

export abstract class AbstractGoogleClient {
  private client: IGoogleOAuth2Service;
  public accessToken?: JWTToken;

  constructor(googleOuth2Client: IGoogleOAuth2Service) {
    this.client = googleOuth2Client;
  }

  public async signJWT(): Promise<JWTToken> {
    this.accessToken = await this.client.requestAccessKey();
    return this.accessToken;
  }
}
