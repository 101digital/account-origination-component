import * as Yup from 'yup';

export class CompanyData {
  constructor(readonly name: string) {}

  static empty(name?: string): CompanyData {
    return new CompanyData(name ?? '');
  }
}

export const CompanyDataSchema = () =>
  Yup.object().shape({
    name: Yup.string().required('Please enter company names'),
  });
