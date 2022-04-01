import { config } from "https://deno.land/x/dotenv/mod.ts";

config({ export: true, safe: false });

function formatGooglePrivateKey(key: string): string {
  const header = "-----BEGIN PRIVATE KEY-----";
  const footer = "-----END PRIVATE KEY-----";

  return key.replace(header, "").replace(footer, "").replace(/\\n/g, "").replace(/\s+/g, "");
}

const googleServiceAccountPrivateKeyRaw = Deno.env.get("G_SERVICE_ACCOUNT_PRIVATE_KEY") as string;

const googleServiceAccountPrivateKey = formatGooglePrivateKey(googleServiceAccountPrivateKeyRaw);

const authConfig = {
  googleServiceAccountPrivateKey,
  googleServiceAccountClientEmail: Deno.env.get("G_SERVICE_ACCOUNT_CLIENT_EMAIL"),
  nftPortAPIKey: Deno.env.get("NFT_PORT_API_KEY") as string,
};

export { authConfig };
