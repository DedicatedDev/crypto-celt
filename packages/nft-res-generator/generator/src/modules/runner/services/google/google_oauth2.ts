import { JWTToken } from "../../domain/jwt.ts";

export interface IGoogleOAuth2Service {
  requestAccessKey(): Promise<JWTToken>;
}

export class GoogleOAuth2Service {
  private googleServiceAccountToken: JWTToken;

  constructor(googleServiceAccountToken: JWTToken) {
    this.googleServiceAccountToken = googleServiceAccountToken;
  }

  public async requestAccessKey(): Promise<JWTToken> {
    const body = new URLSearchParams();
    body.set("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
    body.set("assertion", this.googleServiceAccountToken);

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const { access_token: accessToken } = await response.json();

    return accessToken;
  }
}
