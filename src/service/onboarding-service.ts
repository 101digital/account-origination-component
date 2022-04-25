import {
  AddressParams,
  CreateApplicationParams,
  MainDetailParam,
  NationalityParam
} from "../types";

type OnboaringClient = {
  membershipClient: any;
  accountOriginationClient: any;
};

export class AccountOriginationService {
  private static _instance: AccountOriginationService = new AccountOriginationService();

  private _membershipClient?: any;
  private _accountOriginationClient?: any;

  constructor() {
    if (AccountOriginationService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use AccountOriginationService.getInstance() instead of new."
      );
    }
    AccountOriginationService._instance = this;
  }

  public static instance(): AccountOriginationService {
    return AccountOriginationService._instance;
  }

  public initClients = (clients: OnboaringClient) => {
    this._membershipClient = clients.membershipClient;
    this._accountOriginationClient = clients.accountOriginationClient;
  };

  getProfile = async () => {
    if (this._membershipClient) {
      const response = await this._membershipClient.get("users/me");
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateMainDetails = async (userId: string, details: MainDetailParam) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(
        `users/${userId}`,
        details
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  createApplication = async (params: CreateApplicationParams) => {
    if (this._membershipClient) {
      const response = await this._accountOriginationClient.post(
        "applications",
        params
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  getOnfidoSdkToken = async (
    applicationId: string,
    firstName: string,
    lastName: string
  ) => {
    if (this._membershipClient) {
      const response = await this._accountOriginationClient.post(
        `/applications/${applicationId}/kyc/requests`,
        { firstName, lastName }
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  checkOnfidoSdkToken = async (applicationId: string, requestId: string) => {
    if (this._membershipClient) {
      const response = await this._accountOriginationClient.put(
        `/applications/${applicationId}/kyc/requests/${requestId}`,
        { reportNames: ["document"] }
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };
}
