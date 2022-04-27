import * as Yup from 'yup';

export class EBankData {
  constructor(readonly name: string, readonly id: string) {}

  static empty(name?: string, id?: string): EBankData {
    return new EBankData(name ?? '', id ?? '');
  }
}

export const EBanksSchema = () =>
  Yup.object().shape({
    eBanks: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(),
        id: Yup.string().required(),
      })
    ),
  });
