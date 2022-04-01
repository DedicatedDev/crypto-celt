import { JWTToken } from "../domain/jwt.ts";

import { AbstractGoogleClient } from "./google/abstract_google_auth_client.ts";
import { IGoogleOAuth2Service } from "./google/google_oauth2.ts";

export interface IAuthService {
  isAuthenticated(): boolean;
  signJWT(): Promise<JWTToken>;
}

export class AuthService extends AbstractGoogleClient implements IAuthService {
  constructor(googleOuth2Client: IGoogleOAuth2Service) {
    super(googleOuth2Client);
  }

  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }
}
