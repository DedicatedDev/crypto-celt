
import { log, RateLimiter } from "../../../../deps.ts";

const logger = log.getLogger();

type DisplayType = "boost_number" | "boost_percentage" | "number" | "date";

interface MetadataAttribute {
  trait_type: string;
  value: string;
  max_value?: string;
  display_type?: DisplayType;
}

interface IPFSMetadata {
  name: string;
  description: string;
  external_url: string;
  file_url: string;
  attributes: MetadataAttribute[];
}

export class NFTPortService {
  private static readonly baseAPI = "https://api.nftport.xyz/v0";
  private api: string;
  private apiKey: string;
  private limiter: RateLimiter;

  constructor(limiter: RateLimiter, apiKey: string) {
    this.limiter = limiter;
    this.apiKey = apiKey;
    this.api = NFTPortService.baseAPI;
  }

  async writeImage(image: Blob, name: string) {
    const formData = new FormData();
    formData.append("file", image, name);

    await this.limiter.removeTokens(1);

    // https://github.com/sindresorhus/ky/issues/380
    const response = await fetch(`${this.api}/files`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": this.apiKey,
      },
    });

    return response.json();
  }

}
