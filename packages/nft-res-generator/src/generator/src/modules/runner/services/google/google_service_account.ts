// Based on https://gitlab.com/mintroad/tech/celts/-/snippets/2228494

import { authConfig } from "../../../../config/mod.ts";
import { JWTToken } from "../../domain/jwt.ts";
import { decode } from "https://deno.land/std/encoding/base64.ts";
import { create, Header, Payload } from "https://deno.land/x/djwt@v2.4/mod.ts";

async function serviceAccountJWT(): Promise<JWTToken> {
  const {
    googleServiceAccountPrivateKey: rawPrivateKey,
    googleServiceAccountClientEmail: clientEmail,
  } = authConfig;

  const binaryPrivateKey = decode(rawPrivateKey).buffer;

  const privateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    binaryPrivateKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    true,
    ["sign"],
  );

  const header: Header = {
    alg: "RS256",
    typ: "JWT",
  };

  const scope =
    "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets";

  const now = new Date();
  const secondsSinceEpoch = Math.round(now.getTime() / 1000);

  const payload: Payload = {
    scope,
    iss: clientEmail,
    aud: "https://oauth2.googleapis.com/token",
    exp: secondsSinceEpoch + 60 * 60,
    iat: secondsSinceEpoch,
  };

  return create(
    header,
    payload,
    privateKey,
  );
}

const googleServiceAccountToken = await serviceAccountJWT();

export { googleServiceAccountToken };
