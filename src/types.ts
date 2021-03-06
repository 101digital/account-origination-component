import { AddressDetailsData } from "./components/address-detail-component/model";
import { NationalityData } from "./components/nationality-component/model";
import { MainDetailsData } from "./components/main-detail-component/model";
import { OtherDetailsData } from "./components/other-details-component/model";
import { AccountDetailsData } from "./components/account-details-component/model";

export interface InitAccountOriginationData {
  firstName?: string;
  lastName?: string;
  subStepNumber?: number;
  mainStepNumber?: number;
  applicationId?:string;
}

export interface CountryInformation {
  id: number;
  type: string;
  attributes: {
    code3: string;
    code2: string;
    name: string;
    capitalCity: string;
    flagUrlRect: string;
    flagUrlRound: string;
    idd: string;
    active: boolean;
    region: string;
    currencyInfo: {
      listCurrency: Currency[];
    };
  };
}

export interface Currency {
  name: string;
  code: string;
  symbol: string;
  decimals: number;
  displaySymbol: string;
  displayFormat: string;
  displaySymbolFirst: boolean;
  isoCode: string;
  displaySpace: number;
  logo?: string;
}

export type GroupNationality = {
  section: string;
  items: Nationality[];
};

export type GroupCountry = {
  section: string;
  items: CountryInformation[];
};

export type Nationality = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type Region = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupRegion = {
  section: string;
  items: Region[];
};

export type Occupation = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupOccupation = {
  section: string;
  items: Occupation[];
};

export type Province = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupProvince = {
  section: string;
  items: Province[];
};

export type City = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupCity = {
  section: string;
  items: City[];
};

export type NatureWork = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupNatureWork = {
  section: string;
  items: NatureWork[];
};

export type Barangay = {
  name: string;
  isFeatured: boolean;
  id: number;
};

export type GroupBarangay = {
  section: string;
  items: Barangay[];
};

export type StepData = {
  id: string;
  title: string;
  subTitle?: string;
  progress: number;
};

export type AccountOriginationData = {
  mainDetails?: MainDetailsData;
  nationalityDetails?: NationalityData;
  addresses?: AddressDetailsData[];
  otherDetails?: OtherDetailsData;
  accountDetails?: AccountDetailsData;
};

export interface Profile {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  status: string;
  lastLoginAt: string;
  country: CountryInformation;
}

export interface AddressParams {
  addressType: string;
  line1: string;
  line2: string;
  line3: string;
  buildingName: string;
  buildingNumber: string;
  apartmentName: string;
  city: string;
  county: string;
  region: string;
  province: string;
  postcode: string;
}

export interface ApplicationDetailsParams {
  firstName: string;
  lastName: string;
  middleName: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  citizenFlag: boolean;
  presentAsPermAddressFlag: boolean;
  contactDetails: { contactType: string; contactValue: string }[];
  addresses: AddressParams[];
}

export interface EmploymentDetails {
  status: string;
  designation: string;
  companyType: string;
  companyName: string;
  addresses: { city: string; postcode: string }[];
}

export interface Credit {
  applicant: CreditApplicant;
}

export interface CreditApplicant {
  individual: CreditIndividual;
}

export interface CreditIndividual {
  sourceOfFund: string;
  accountPurpose: string;
  minMonthlyIncome?: number;
  maxMonthlyIncome?: number;
  currency: string;
}

export interface CreateApplicationParams {
  submitType: string;
  applicantDetails: ApplicationDetailsParams;
  employmentDetails: EmploymentDetails;
  credit: Credit;
}

export interface MainDetailParam {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  gender: string;
  contacts: {
    contactType: string;
    contactValue: string;
    isPrimary: boolean;
  }[];
}

export interface NationalityParam {
  placeOfBirth: string;
  nationality: string;
  isCitizen: boolean;
}

export interface ApplicationDetails {
  applicationId: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface ValidateUserDetailsParam {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface EBank {
  id: string;
  name: string;
  createdAt: string;
  paymentProviders: PaymentProvider[];
}

export interface PaymentProvider {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
}

export type GroupEBank = {
  section: string;
  items: EBank[];
};

export interface DocumentFileData {
  id?: string;
  size: number;
  type: string;
  data: string;
  name: string;
}

export interface UpdateKYCApplicantParam {
  kycDetails: {
          firstName: string;
          middleName:  string;
          lastName:  string;
          dateOfBirth:  string;
          idNumber:  string;
          idIssuingCountry: string;
          idExpiredDate:  string;
      }
}
