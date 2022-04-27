import {
  AddressParams,
  CreateApplicationParams,
  MainDetailParam,
  NationalityParam,
  ValidateUserDetailsParam,
  UpdateKYCApplicantParam
} from "../types";

type OnboaringClient = {
  membershipClient: any;
  accountOriginationClient: any;
  documentClient: any;
  bankInformationClient: any;
};

export class AccountOriginationService {
  private static _instance: AccountOriginationService = new AccountOriginationService();

  private _membershipClient?: any;
  private _accountOriginationClient?: any;
  private _documentClient?: any;
  private _bankInformationClient?: any;

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
    this._documentClient = clients.documentClient;
    this._bankInformationClient = clients.bankInformationClient;
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

  updateNationalityDetails = async (
    userId: string,
    details: NationalityParam
  ) => {
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

  updateAddressDetails = async (
    userId: string,
    isPresentAsPermAddress: boolean,
    addresses: AddressParams[]
  ) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.patch(`users/${userId}`, {
        isPresentAsPermAddress,
        addresses
      });
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

  getApplicationStatus = async (applicationId:string) => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.get(`applications/${applicationId}/status`);
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  validateUserDetails = async (details: ValidateUserDetailsParam) => {
    if (this._membershipClient) {
      const response = await this._membershipClient.post(
        `users/validate`,
        details
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  updateKYCApplicant = async (
    kycDetails: UpdateKYCApplicantParam,
    applicationId:string
  ) => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.patch(
        `applications/${applicationId}`,
        kycDetails
      );
      return response.data;
    } else {
      throw new Error("Onboaring Client is not registered");
    }
  };

  uploadDocument = async (
      content: string,
      name: string,
      folderName: string,
      contentType: string,
      onUploadProgress: (progressEvent: any) => void
    ) => {
      if (this._documentClient) {
        const response = await this._documentClient.post(
          'documents',
          {
            content,
            name,
            contentType,
            meta: {
              folderName,
            },
          },
          {
            onUploadProgress,
          }
        );
        return response.data;
      } else {
        throw new Error('Document Client is not registered');
      }
    };

  submitDocument = async (
    documentId: string,
    applicationId: string,
    documentType: string,
    documentCategory: string
  ) => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.post(
        `applications/${applicationId}/documents`,
        {
          documentName: documentType,
          documentId,
          documentCategory,
        }
      );
      return response.data;
    } else {
      throw new Error('Account Origination Client is not registered');
    }
  };

  public getEBanks = async () => {
    if (this._bankInformationClient) {
      const response = await this._bankInformationClient.get('banks', {
        params: {
          pageSize: 1000,
        },
      });
      return response.data;
    } else {
      throw new Error('Bank Information Client is not registered');
    }
  };

  public updateBankCompany = async (
      applicationId: string,
      eBanks: string[],
      companyName: string
    ) => {
      if (this._accountOriginationClient) {
        const response = await this._accountOriginationClient.patch(`applications/${applicationId}`, {
          bankRelationships: eBanks,
          companyRelationships: [companyName],
        });
        return response.data;
      } else {
        throw new Error('Account Origination Client is not registered');
      }
    };


  public updateBank = async (applicationId: string, eBanks: string[]) => {
    if (this._accountOriginationClient) {
      const response = await this._accountOriginationClient.patch(`applications/${applicationId}`, {
        bankRelationships: eBanks,
      });
      return response.data;
    } else {
      throw new Error('Account Origination Client is not registered');
    }
  };

  public updateCompany = async (applicationId: string, company: string[]) => {
      if (this._accountOriginationClient) {
        const response = await this._accountOriginationClient.patch(`applications/${applicationId}`, {
          submitType: 'EDDSubmit',
          companyRelationships: company,
        });
        return response.data;
      } else {
        throw new Error('Account Origination Client is not registered');
      }
    };
}
