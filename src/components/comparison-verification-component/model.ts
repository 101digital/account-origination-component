import * as Yup from "yup";

export class ComparisonVerificationData {
  constructor(
    readonly firstName: string,
    readonly middleName: string,
    readonly lastName: string,
    readonly dateOfBirth: string,
    readonly idNumber: string,
    readonly dateOfExpiry: string
  ) {}

  static empty(
    firstName?: string,
    midName?: string,
    lastName?: string,
    dateOfBirth?: string,
    idNumber?: string,
    dateOfExpiry?: string
  ): ComparisonVerificationData {
    return new ComparisonVerificationData(
      firstName ?? "",
      midName ?? "",
      lastName ?? "",
      dateOfBirth ?? "",
      idNumber ?? "",
      dateOfExpiry ?? ""
    );
  }
}

export const ComparisonVerificationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required("Enter first name"),
    middleName: Yup.string()
      .trim(),
    lastName: Yup.string()
      .trim()
      .required("Enter last name"),
    dateOfBirth: Yup.string()
      .trim()
      .required("Select date of birth"),
    idNumber: Yup.string()
      .trim()
      .required("Select Id number"),
    dateOfExpiry: Yup.string()
      .trim()
      .required("Select id date of id expiry")
  });
