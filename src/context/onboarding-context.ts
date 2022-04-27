import moment from "moment";
import { AccountDetailsData } from "./../components/account-details-component/model";
import { OtherDetailsData } from "./../components/other-details-component/model";
import React, { useCallback, useMemo, useState } from "react";
import { AddressDetailsData } from "../components/address-detail-component/model";
import { MainDetailsData } from "../components/main-detail-component/model";
import { NationalityData } from "../components/nationality-component/model";
import { AccountOriginationService } from "../service/onboarding-service";
import { AccountOriginationData, Profile, ApplicationDetails,UpdateKYCApplicantParam,EBank } from "../types";
const banksData = require('../assets/data/banks.json');

const onboardingService = AccountOriginationService.instance();

export interface AccountOriginationContextData {
  data: AccountOriginationData;
  setAccountOriginationData: (data: AccountOriginationData) => void;
  isLoadingProfile: boolean;
  isLoadingApplicationStatus: boolean;
  isUpdateingKYCApplicant: boolean;
  isInValidateUser?: boolean;
  profile?: Profile;
  errorLoadProfile?: Error;
  errorUpdateKYCApplicant?: Error;
  getUserProfile: () => void;
  getApplicationStatus: (applicationId:string) => void;
  updateKYCApplicant:(applicationId:string,kycDetails:UpdateKYCApplicantParam) => void;
  setUserProfile: (profile: Profile) => void;
  isUpdatingMainDetails: boolean;
  isUpdatedMainDetails: boolean;
  isUpdatedKYCApplicant: boolean;
  updateMainDetails: (params: MainDetailsData) => void;
  errorUpdateMainDetails?: Error;
  isUpdatingNationality: boolean;
  isUpdatedNationality: boolean;
  updateNationality: (params: NationalityData) => void;
  errorUpdateNationality?: Error;
  isUpdatingAddressDetails: boolean;
  isUpdatedAddressDetails: boolean;
  updateAddressDetails: (
    isPresentAsPermAddress: boolean,
    addresses: AddressDetailsData[]
  ) => void;
  errorUpdateAddressDetails?: Error;
  clearErrors: () => void;
  updateOtherDetails: (params: OtherDetailsData) => void;
  updateAccountDetails: (params: AccountDetailsData) => void;
  clearData: () => void;
  isCreatingApplication: boolean;
  isCreatedApplication: boolean;
  createApplication: (minIncome?: number, maxIncome?: number) => void;
  errorCreateApplication?: Error;
  isUpdatedOtherDetails: boolean;
  isUpdatedAccountDetails: boolean;
  applicationDetails?: ApplicationDetails;
  uploadDocumentPercent: number;
  uploadDocument: (
    content: string,
    documentType: string,
    contentType: string
  ) => Promise<string | undefined>;
  errorUploadDocument?: Error;
  submitDocument: (documentId: string, applicationId: string, documentType: string) => void;
  isSubmitingDocument: boolean;
  errorSubmitDocument?: Error;
  isSubmitedDocument: boolean;
  isLoadingEBanks: boolean;
  getEBank: () => void;
  eBanks: EBank[];
  errorLoadEBanks?: Error;
  isSubmitingBank: boolean;
  isSubmitingCompany: boolean;
  submitBank: (applicationId: string, eBanks: string[]) => void;
  submitCompany: (applicationId: string, eBanks: string[], company: string) => void;
  isSubmitedBank: boolean;
  isSubmitedCompany: boolean;
  errorSubmitBankCompany?: Error;
}

export const onboardingDefaultValue: AccountOriginationContextData = {
  isSubmitedBank: false,
  isSubmitedCompany: false,
  isSubmitingBank: false,
  isSubmitingCompany: false,
  submitBank: () => null,
  submitCompany: () => null,
  isLoadingEBanks: false,
  getEBank: () => null,
  eBanks: [],
  data: {},
  setAccountOriginationData: () => null,
  isLoadingProfile: false,
  isLoadingApplicationStatus:false,
  isUpdateingKYCApplicant:false,
  isUpdatingAddressDetails: false,
  isUpdatingMainDetails: false,
  isUpdatingNationality: false,
  updateMainDetails: () => null,
  updateNationality: () => null,
  getUserProfile: () => null,
  getApplicationStatus: () => null,
  updateKYCApplicant:() => null,
  updateAddressDetails: () => null,
  clearErrors: () => null,
  setUserProfile: () => null,
  isUpdatedAddressDetails: false,
  isUpdatedMainDetails: false,
  isUpdatedNationality: false,
  isUpdatedKYCApplicant:false,
  updateOtherDetails: () => null,
  updateAccountDetails: () => null,
  clearData: () => null,
  createApplication: () => null,
  isCreatingApplication: false,
  isCreatedApplication: false,
  isUpdatedAccountDetails: false,
  isUpdatedOtherDetails: false,
  uploadDocumentPercent: 0,
  uploadDocument: async () => undefined,
  submitDocument: () => null,
  isSubmitingDocument: false,
  isSubmitedDocument: false,
};

export const AccountOriginationContext = React.createContext<
  AccountOriginationContextData
>(onboardingDefaultValue);

export function useAccountOriginationContextValue(): AccountOriginationContextData {
  const [_data, setData] = useState<AccountOriginationData>({});

  const [_profile, setProfile] = useState<Profile | undefined>(undefined);
  const [_applicationStatus, setApplicationStatus] = useState<any | undefined>(undefined);
  const [_isLoadingProfile, setLoadingProfile] = useState(false);
  const [_isLoadingApplicationStatus, setLoadingApplicationStatus] = useState(false);


  const [_errorLoadProfile, setErrorLoadProfile] = useState<Error | undefined>(
    undefined
  );

  const [_validateUser, setValidateUser] = useState(false);
  const [_isUpdateingKYCApplicant, setUpdateingKYCApplicant] = useState(false);
  const [_isUpdatedKYCApplicant, setUpdatedKYCApplicant] = useState(false);
  const [_errorUpdateKYCApplicant, setErrorUpdateKYCApplicant] = useState<Error | undefined>(
    undefined
  );

  const [_isUpdatingMainDetails, setUpdatingMainDetails] = useState(false);
  const [_isUpdatedMainDetails, setUpdatedMainDetails] = useState(false);
  const [_errorUpdateMainDetails, setErrorUpdateMainDetails] = useState<
    Error | undefined
  >(undefined);

  const [_isUpdatingNationality, setUpdatingNationality] = useState(false);
  const [_isUpdatedNationality, setUpdatedNationality] = useState(false);
  const [_errorUpdateNationality, setErrorUpdateNationality] = useState<
    Error | undefined
  >(undefined);

  const [_isUpdatingAddressDetails, setUpdatingAddressDetails] = useState(
    false
  );
  const [_isUpdatedAddressDetails, setUpdatedAddressDetails] = useState(false);
  const [_errorUpdateAddressDetails, setErrorUpdateAddressDetails] = useState<
    Error | undefined
  >(undefined);

  const [_isCreatingApplication, setCreatingApplication] = useState(false);
  const [_isCreatedApplication, setCreatedApplication] = useState(false);
  const [_errorCreateApplication, setErrorCreateApplication] = useState<
    Error | undefined
  >(undefined);

  const [_isUpdatedOtherDetails, setUpdatedOtherDetails] = useState(false);
  const [_isUpdatedAccountDetails, setUpdatedAccountDetails] = useState(false);
  const [_applicationDetails, setApplicationDetails] = useState<
    ApplicationDetails | undefined
  >(undefined);

  const [_errorUploadDocument, setErrorUploadDocument] = useState<Error | undefined>(undefined);
  const [_uploadDocumentPercent, setUploadDocumentPercent] = useState<number>(0);

  const [_isSubmitingDocument, setSubmitingDocument] = useState(false);
  const [_isSubmitedDocument, setSubmitedDocument] = useState(false);
  const [_errorSubmitDocument, setErrorSubmitDocument] = useState<Error | undefined>(undefined);

  const [_eBanks, setEBanks] = useState<EBank[]>([]);
  const [_isLoadingEBank, setLoadingEBank] = useState(false);
  const [_errorLoadEBank, setErrorLoadEBank] = useState<Error | undefined>(undefined);

  const [_isSubmitingCompany, setSubmitingCompany] = useState(false);
  const [_isSubmitingBank, setSubmitingBank] = useState(false);
  const [_isSubmitedBank, setSubmitedBank] = useState(false);
  const [_isSubmitedCompany, setSubmitedCompany] = useState(false);
  const [_errorSubmitBankCompany, setErrorSubmitBankCompany] = useState<Error | undefined>(
    undefined)

  const getUserProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      const { data } = await onboardingService.getProfile();
      setProfile(data);
      setLoadingProfile(false);
    } catch (error) {
      setLoadingProfile(false);
      setErrorLoadProfile(error as Error);
    }
  }, []);

  const clearErrors = useCallback(() => {
    if (_errorLoadProfile) {
      setErrorLoadProfile(undefined);
    }
    if (_errorUpdateMainDetails) {
      setErrorUpdateMainDetails(undefined);
    }
    if (_errorUpdateAddressDetails) {
      setErrorUpdateAddressDetails(undefined);
    }
    if (_errorCreateApplication) {
      setErrorCreateApplication(undefined);
    }

    if (_errorUpdateKYCApplicant) {
      setErrorUpdateKYCApplicant(undefined);
    }

    if (_validateUser) {
      setValidateUser(false);
    }

  }, [
    _errorLoadProfile,
    _errorUpdateMainDetails,
    _errorUpdateNationality,
    _errorUpdateAddressDetails,
    _errorCreateApplication,
    _errorUpdateKYCApplicant,
    _validateUser,
  ]);

  const updateMainDetails = useCallback(
    async (params: MainDetailsData) => {
      try {
        setUpdatingMainDetails(true);
        await onboardingService.updateMainDetails(_profile?.userId!, {
          ...params,
          dateOfBirth: moment(params.dateOfBirth, "DD / MM / YYYY").format(
            "YYYY-MM-DD"
          ),
          contacts: params.email
            ? [
                {
                  contactType: "EMAIL",
                  contactValue: params.email,
                  isPrimary: true
                }
              ]
            : []
        });
        setData({
          ..._data,
          mainDetails: params
        });
        setUpdatedMainDetails(true);
        setTimeout(() => {
          setUpdatedMainDetails(false);
        }, 50);
        setUpdatingMainDetails(false);
      } catch (error) {
        setUpdatingMainDetails(false);
        setErrorUpdateMainDetails(error as Error);
      }
    },
    [_data, _profile]
  );

  const updateNationality = useCallback(
    async (params: NationalityData) => {
      try {
        setUpdatingNationality(true);
        await onboardingService.updateNationalityDetails(_profile?.userId!, {
          ...params,
          isCitizen: params.isCitizen === "yes"
        });
        setData({
          ..._data,
          nationalityDetails: params
        });
        setUpdatedNationality(true);
        setTimeout(() => {
          setUpdatedNationality(false);
        }, 50);
        setUpdatingNationality(false);
      } catch (error) {
        setUpdatingNationality(false);
        setErrorUpdateNationality(error as Error);
      }
    },
    [_data, _profile]
  );

  const updateAddressDetails = useCallback(
    async (
      isPresentAsPermAddress: boolean,
      addresses: AddressDetailsData[]
    ) => {
      try {
        setUpdatingAddressDetails(true);
        await onboardingService.updateAddressDetails(
          _profile?.userId!,
          isPresentAsPermAddress,
          addresses.map(address => ({
            ...address,
            addressType: address.addressType === 1 ? "Resident" : "Permanent",
            buildingNumber: "-",
            apartmentName: "-",
            county: "-"
          }))
        );
        setData({
          ..._data,
          addresses
        });
        setUpdatedAddressDetails(true);
        setTimeout(() => {
          setUpdatedAddressDetails(false);
        }, 50);
        setUpdatingAddressDetails(false);
      } catch (error) {
        setUpdatingAddressDetails(false);
        setErrorUpdateAddressDetails(error as Error);
      }
    },
    [_data, _profile]
  );

  const setUserProfile = useCallback((profile: Profile) => {
    setProfile(profile);
  }, []);

  const setAccountOriginationData = useCallback(
    (data: AccountOriginationData) => {
      setAccountOriginationData(data);
    },
    []
  );

  const updateAccountDetails = useCallback(
    (params: AccountDetailsData) => {
      setData({
        ..._data,
        accountDetails: params
      });
      setUpdatedAccountDetails(true);
      setTimeout(() => {
        setUpdatedAccountDetails(false);
      }, 50);
    },
    [_data]
  );

  const updateOtherDetails = useCallback(
    (params: OtherDetailsData) => {
      setData({
        ..._data,
        otherDetails: params
      });
      setUpdatedOtherDetails(true);
      setTimeout(() => {
        setUpdatedOtherDetails(false);
      }, 50);
    },
    [_data]
  );

  const clearData = useCallback(() => {
    setData({});
    setApplicationDetails(undefined);
  }, []);

  const createApplication = useCallback(
    async (minIncome?: number, maxIncome?: number) => {
      try {
        if (
          !_data.mainDetails ||
          !_data.addresses ||
          !_data.nationalityDetails ||
          !_data.accountDetails ||
          !_data.otherDetails
        ) {
          setErrorCreateApplication(new Error("Missing parameters"));
          return;
        }
        setCreatingApplication(true);
        const { data } = await onboardingService.createApplication({
          submitType: "Submit",
          applicantDetails: {
            firstName: _data.mainDetails.firstName ?? "",
            lastName: _data.mainDetails.lastName ?? "",
            middleName: _data.mainDetails.middleName ?? "",
            dateOfBirth:
              moment(_data.mainDetails?.dateOfBirth, "DD / MM / YYYY").format(
                "YYYY-MM-DD"
              ) ?? "",
            maritalStatus: _data.mainDetails.maritalStatus ?? "",
            gender: _data.mainDetails.gender ?? "",
            contactDetails: _data.mainDetails.email
              ? [
                  {
                    contactType: "Email",
                    contactValue: _data.mainDetails?.email!
                  }
                ]
              : [],
            placeOfBirth: _data.nationalityDetails.placeOfBirth,
            nationality: _data.nationalityDetails.nationality,
            citizenFlag: _data.nationalityDetails?.isCitizen === "yes",
            presentAsPermAddressFlag: _data.addresses?.length === 1,
            addresses:
              _data.addresses?.map(address => ({
                ...address,
                addressType:
                  address.addressType === 1 ? "Resident" : "Permanent",
                buildingNumber: "-",
                apartmentName: "-",
                county: "-"
              })) ?? []
          },
          employmentDetails: {
            status: _data.otherDetails.status ?? "",
            companyName: _data.otherDetails.companyName ?? "",
            companyType: _data.otherDetails.companyType ?? "",
            addresses: [{ ..._data.otherDetails }],
            designation: _data.otherDetails.occupation
          },
          credit: {
            applicant: {
              individual: {
                accountPurpose: _data.accountDetails.accountPurpose,
                sourceOfFund: _data.accountDetails.sourceOfFund,
                currency: "PHP",
                maxMonthlyIncome: maxIncome,
                minMonthlyIncome: minIncome
              }
            }
          }
        });
        setApplicationDetails({
          applicationId: data.applicationId,
          firstName: data.applicantDetails.firstName,
          lastName: data.applicantDetails.lastName,
          middleName: data.applicantDetails.middleName
        });
        setCreatedApplication(true);
        setTimeout(() => {
          setCreatedApplication(false);
        }, 50);
        setCreatingApplication(false);
      } catch (error) {
        setCreatingApplication(false);
        setErrorCreateApplication(error as Error);
      }
    },
    [_data]
  );

  const getApplicationStatus = useCallback(async (applicationId:string) => {
    try {
      setLoadingApplicationStatus(true);
      const { data } = await onboardingService.getApplicationStatus(applicationId);
      setApplicationStatus(data);
      setLoadingApplicationStatus(false);
    } catch (error) {
      setLoadingApplicationStatus(false);
      setErrorLoadProfile(error as Error);
    }
  }, []);

  const updateKYCApplicant = useCallback(async (applicationId:string,kycDetails:UpdateKYCApplicantParam) => {
    try {

      setUpdateingKYCApplicant(true);
      const validateUserResponse = await onboardingService.validateUserDetails({
          firstName: kycDetails.kycDetails.firstName,
          middleName: kycDetails.kycDetails.middleName,
          lastName: kycDetails.kycDetails.lastName,
          dateOfBirth: kycDetails.kycDetails.dateOfBirth
        });
      if (validateUserResponse.exist === true) {
          setValidateUser(true);
      } else {
        await onboardingService.updateKYCApplicant(kycDetails,applicationId);
          // setApplicationStatus(data);
          setValidateUser(false);
          setUpdatedKYCApplicant(true);
          setTimeout(() => {
            setUpdatedKYCApplicant(false);
          }, 50);

          setUpdateingKYCApplicant(false);
      }

    } catch (error) {
      setUpdateingKYCApplicant(false);
      setErrorUpdateKYCApplicant(error as Error);
    }
  }, []);


  const uploadDocument = useCallback(
    async (content: string, documentType: string, contentType: string) => {
      try {
        setUploadDocumentPercent(1);
        const { data } = await onboardingService.uploadDocument(
          content,
          documentType,
          'EDD',
          contentType,
          (progressEvent) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadDocumentPercent(percentCompleted);
          }
        );
        setUploadDocumentPercent(0);
        return data.id;
      } catch (error) {
        setUploadDocumentPercent(0);
        setErrorUploadDocument(error as Error);
      }
      return undefined;
    },
    []
  );

  const submitDocument = useCallback(
    async (documentId: string, applicationId: string, documentType: string) => {
      try {
        setSubmitingDocument(true);
        await onboardingService.submitDocument(documentId, applicationId, documentType, 'EDD');
        setSubmitedDocument(true);
        setTimeout(() => {
          setSubmitedDocument(false);
        }, 50);
        setSubmitingDocument(false);
      } catch (error) {
        setSubmitingDocument(false);
        setErrorSubmitDocument(error as Error);
      }
    },
    []
  );

  const getEBank = useCallback(async () => {
    try {
      setLoadingEBank(true);
      const { data } = await onboardingService.getEBanks();
      setEBanks(data);
      setLoadingEBank(false);
    } catch (error) {
      setLoadingEBank(false);
      const banks: EBank[] = JSON.parse(JSON.stringify(banksData));
      setEBanks(banks);
      // setErrorLoadEBank(error as Error);
    }
  }, []);

  const submitBank = useCallback(async (applicationId: string, eBanks: string[]) => {
    try {
      setSubmitingBank(true);
      // await onboardingService.updateBankCompany(applicationId, eBanks, '');
      await onboardingService.updateBank(applicationId, eBanks);
      setSubmitedBank(true);
      setTimeout(() => {
        setSubmitedBank(false);
      }, 50);
      setSubmitingBank(false);
    } catch (error) {
      setSubmitingBank(false);
      setErrorSubmitBankCompany(error as Error);
    }
  }, []);

  const submitCompany = useCallback(
    async (applicationId: string, companyName: string) => {
      try {
        setSubmitingCompany(true);
        // await onboardingService.updateBankCompany(applicationId, eBanks, companyName);
        await onboardingService.updateCompany(applicationId, [companyName]);
        setSubmitedCompany(true);
        setTimeout(() => {
          setSubmitedCompany(false);
        }, 50);
        setSubmitingCompany(false);
      } catch (error) {
        setSubmitingCompany(false);
        setErrorSubmitBankCompany(error as Error);
      }
    },
    []
  );

  return useMemo(
    () => ({
      submitBank,
      submitCompany,
      isSubmitedBank: _isSubmitedBank,
      isSubmitedCompany: _isSubmitedCompany,
      isSubmitingBank: _isSubmitingBank,
      isSubmitingCompany: _isSubmitingCompany,
      errorSubmitBankCompany: _errorSubmitBankCompany,
      isInValidateUser: _validateUser,
      getEBank,
      isLoadingEBanks: _isLoadingEBank,
      errorLoadEBanks: _errorLoadEBank,
      eBanks: _eBanks,
      getUserProfile,
      getApplicationStatus,
      updateKYCApplicant,
      clearErrors,
      profile: _profile,
      applicationStatus:_applicationStatus,
      isLoadingProfile: _isLoadingProfile,
      isLoadingApplicationStatus: _isLoadingApplicationStatus,
      isUpdateingKYCApplicant: _isUpdateingKYCApplicant,
      errorLoadProfile: _errorLoadProfile,
      errorUpdateKYCApplicant: _errorUpdateKYCApplicant,
      updateMainDetails,
      isUpdatingMainDetails: _isUpdatingMainDetails,
      errorUpdateMainDetails: _errorUpdateMainDetails,
      updateNationality,
      isUpdatingNationality: _isUpdatingNationality,
      errorUpdateNationality: _errorUpdateNationality,
      updateAddressDetails,
      isUpdatingAddressDetails: _isUpdatingAddressDetails,
      errorUpdateAddressDetails: _errorUpdateAddressDetails,
      setUserProfile,
      isUpdatedAddressDetails: _isUpdatedAddressDetails,
      isUpdatedMainDetails: _isUpdatedMainDetails,
      isUpdatedNationality: _isUpdatedNationality,
      isUpdatedKYCApplicant: _isUpdatedKYCApplicant,
      setAccountOriginationData,
      data: _data,
      updateAccountDetails,
      updateOtherDetails,
      clearData,
      createApplication,
      isCreatedApplication: _isCreatedApplication,
      isCreatingApplication: _isCreatingApplication,
      errorCreateApplication: _errorCreateApplication,
      isUpdatedAccountDetails: _isUpdatedAccountDetails,
      isUpdatedOtherDetails: _isUpdatedOtherDetails,
      applicationDetails: _applicationDetails,
      uploadDocument,
      uploadDocumentPercent: _uploadDocumentPercent,
      errorUploadDocument: _errorUploadDocument,
      submitDocument,
      isSubmitingDocument: _isSubmitingDocument,
      isSubmitedDocument: _isSubmitedDocument,
      errorSubmitDocument: _errorSubmitDocument,
    }),
    [
      _isSubmitedBank,
      _isSubmitedCompany,
      _isSubmitingBank,
      _isSubmitingCompany,
      _errorSubmitBankCompany,
      _isLoadingEBank,
      _errorLoadEBank,
      _eBanks,
      _isSubmitingDocument,
      _isSubmitedDocument,
      _errorSubmitDocument,
      _errorUploadDocument,
      _uploadDocumentPercent,
      _applicationDetails,
      _data,
      _isUpdatedOtherDetails,
      _isUpdatedAccountDetails,
      _isCreatedApplication,
      _isCreatingApplication,
      _errorCreateApplication,
      _isUpdatedNationality,
      _isUpdatedMainDetails,
      _isUpdatedAddressDetails,
      _profile,
      _applicationStatus,
      _isLoadingProfile,
      _isLoadingApplicationStatus,
      _isUpdateingKYCApplicant,
      _errorLoadProfile,
      _errorUpdateKYCApplicant,
      _isUpdatingMainDetails,
      _errorUpdateMainDetails,
      _isUpdatingNationality,
      _errorUpdateNationality,
      _isUpdatingAddressDetails,
      _errorUpdateAddressDetails,
      _isUpdatedKYCApplicant,
      _validateUser,
    ]
  );
}
