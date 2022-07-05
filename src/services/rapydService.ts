import crypto from "crypto";

import config from "../config/configs";
import HttpMethod from "http-method-enum";
import axios, { AxiosInstance } from "axios";
import ErrorResponse from "../utils/errorResponse";
import { RapydResponse } from "../models/baseRapydResponse";
import {
  ICreateWallet,
  IResponseCreateWallet,
} from "../interfaces/db/idbwallet";
import {
  ICreateCustomer,
  ICreateCustomerResponse,
} from "../interfaces/db/idbcontact";
import { IdentityVerification } from "../interfaces/rapyd/iwallet";
import {
  ICreateVirtualAccount,
  ICreateVirtualAccountResponse,
  ISimulateBankTransfer,
} from "../interfaces/db/idbvirtualaccount";

class RapydService {
  private _accessKey: string;
  private _secretKey: string;
  private _baseUrl: string;
  private _axiosClient: AxiosInstance;

  constructor() {
    this._accessKey = config.accessKey;
    this._secretKey = config.secretKey;
    this._baseUrl = config.baseRapydApiUrl;

    this._axiosClient = axios.create({
      baseURL: this._baseUrl,
    });

    this._axiosClient.interceptors.request.use((req) => {
      const method = req.method as HttpMethod;
      const salt = this.generateRandomString(8);
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = this.generateSignature(
        method,
        req.url!,
        salt,
        timestamp,
        req.data
      );
      req.headers!.salt = salt;
      req.headers!.timestamp = timestamp;
      req.headers!.access_key = this._accessKey;
      req.headers!.signature = signature;
      return req;
    });
  }

  public async createWallet(
    body: ICreateWallet.Root
  ): Promise<IResponseCreateWallet.Root | undefined> {
    try {
      const response = await this._axiosClient.post<
        RapydResponse<IResponseCreateWallet.Root>
      >("/v1/user", body);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }
  public async getWallet(eWallet: string): Promise<any> {
    try {
      const response = await this._axiosClient.get<RapydResponse<any>>(
        `/v1/user/${eWallet}`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async createCustomer(
    body: ICreateCustomer
  ): Promise<ICreateCustomerResponse | undefined> {
    try {
      const response = await this._axiosClient.post<
        RapydResponse<ICreateCustomerResponse | undefined>
      >("/v1/customers", body);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async generateIdentityVerificationPage(
    body: IdentityVerification.Request
  ): Promise<IdentityVerification.Response | undefined> {
    try {
      const response = await this._axiosClient.post<
        RapydResponse<IdentityVerification.Response>
      >("/v1/hosted/idv", body);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async listContactsForRapydWallet(eWallet: string): Promise<any> {
    try {
      const response = await this._axiosClient.get<RapydResponse<any>>(
        `/v1/ewallets/${eWallet}/contacts`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async issueVirtualAccountToWallet(
    body: ICreateVirtualAccount
  ): Promise<ICreateVirtualAccountResponse | undefined> {
    try {
      const response = await this._axiosClient.post<
        RapydResponse<ICreateVirtualAccountResponse>
      >("/v1/issuing/bankaccounts", body);
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async listVirtualAccountsByWallet(ewallet: string): Promise<any> {
    try {
      const response = await this._axiosClient.get<RapydResponse<any>>(
        `/v1/issuing/bankaccounts/list?ewallet=${ewallet}`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async simulateBankTransfer(body: ISimulateBankTransfer): Promise<any> {
    try {
      const response = await this._axiosClient.post<RapydResponse<any>>(
        "/v1/issuing/bankaccounts/bankaccounttransfertobankaccount",
        body
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async retrieveVirtualAccountHistory(
    issued_bank_account: string
  ): Promise<any> {
    try {
      const response = await this._axiosClient.get<RapydResponse<any>>(
        `/v1/issuing/bankaccounts/${issued_bank_account}`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public async retrieveVirtualAccountTransaction(
    issued_bank_account: string,
    transaction: string
  ): Promise<any> {
    try {
      const response = await this._axiosClient.get<RapydResponse<any>>(
        `/v1/issuing/bankaccounts/${issued_bank_account}/transactions/${transaction}`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.isAxiosError) {
        console.log(error.response.data);
        throw new ErrorResponse(
          error.response.status,
          error.response.data?.status || error.response.data
        );
      }
    }
  }

  public authWebhookRequest(
    incomeSign: string,
    url: string,
    salt: string,
    timestamp: number,
    body: string
  ): boolean {
    const signature = this.generateSignatureForWebhookAuth(
      url,
      salt,
      timestamp,
      body
    );

    return signature === incomeSign;
  }

  private generateSignature(
    method: HttpMethod,
    urlPath: string,
    salt: string,
    timestamp: number,
    body: any
  ): string {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      const toSign =
        method.toLowerCase() +
        urlPath +
        salt +
        timestamp +
        this._accessKey +
        this._secretKey +
        bodyString;

      return this.hashSignature(toSign, this._secretKey);
    } catch (error) {
      console.error("Error generating signature");
      throw error;
    }
  }
  private generateSignatureForWebhookAuth(
    url: string,
    salt: string,
    timestamp: number,
    body: any
  ): string {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      const toSign =
        url + salt + timestamp + this._accessKey + this._secretKey + bodyString;

      return this.hashSignature(toSign, this._secretKey);
    } catch (error) {
      console.error("Error generating signature");
      throw error;
    }
  }

  private hashSignature(signature: string, key: string): string {
    const hash = crypto.createHmac("sha256", key);
    hash.update(signature);
    const hashSignature = Buffer.from(hash.digest("hex")).toString("base64");

    return hashSignature;
  }

  private generateRandomString(size: number): string {
    try {
      return crypto.randomBytes(size).toString("hex");
    } catch (error) {
      console.error("Error generating salt");
      throw error;
    }
  }
}

export default RapydService;
