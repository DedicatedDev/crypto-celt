// @ts-ignore
// https://github.com/stemmlerjs/ddd-forum/blob/ea393502396c91b7d85fdcc664b158de683a0bf2/public/app/src/shared/infra/services/BaseAPI.tsx
import ky, { BeforeRequestHook } from "https://cdn.skypack.dev/ky?dts";

import { JWTToken } from "../../domain/jwt.ts";
import { IAuthService } from "../auth_service.ts";

export abstract class BaseGoogleAPI {
  private kyInstance: typeof ky;
  public authService: IAuthService;
  private accessToken: JWTToken | null;

  constructor(authService: IAuthService) {
    this.authService = authService;
    this.kyInstance = ky.create({});
    this.accessToken = null;
    this.enableInterceptors();
  }

  private enableInterceptors(): void {
    this.kyInstance = this.kyInstance.extend({
      hooks: {
        beforeRequest: [this.getBeforeRequestHandler()],
        afterResponse: [this.getSuccessResponseHandler(), this.getErrorResponseHandler()],
      },
    });
  }

  private getBeforeRequestHandler(): BeforeRequestHook {
    return async (request, _options) => {
      if (!this.accessToken) {
        await this.generateAccessToken();
      }

      request.headers.set("Authorization", `Bearer ${this.accessToken}`);
    };
  }

  private getSuccessResponseHandler() {
    return (_request: any, _options: any, response: any) => {
      if (response.status >= 400) {
        return response;
      }
    };
  }

  private didAccessTokenExpire(response: any): boolean {
    return response.statusText === "Unauthorized";
  }

  public async generateAccessToken(): Promise<void> {
    this.accessToken = await this.authService.signJWT();
  }

  private getErrorResponseHandler() {
    return (request: any, _options: any, response: any) => {
      if (response.status <= 400) {
        return response;
      }

      if (this.didAccessTokenExpire(response)) {
        this.accessToken = null;
        return this.kyInstance(request);
      }

      return Promise.reject({ ...response });
    };
  }

  protected get(url: string, headers?: any): Promise<any> {
    return this.kyInstance.get(url, {
      headers,
    });
  }

  protected put(url: string, body?: any, headers?: any): Promise<any> {
    return this.kyInstance(url, {
      method: "PUT",
      body,
      headers,
    });
  }

  protected post(url: string, body?: any, headers?: any): Promise<any> {
    return this.kyInstance(url, {
      method: "POST",
      body,
      headers,
    });
  }
}
