import * as Yup from 'yup';

export class DocumentData {
  constructor(
    readonly documentType: string,
    readonly documentId: string,
    readonly otherType?: string
  ) {}

  static empty(documentType?: string, documentId?: string, otherType?: string): DocumentData {
    return new DocumentData(documentType ?? '', documentId ?? '', otherType);
  }
}

export const DocumentDataSchema = () =>
  Yup.object().shape({
    documentType: Yup.string().trim().required('Select document type'),
    otherType: Yup.string().when('documentType', {
      is: (type) => type === 'Others',
      then: Yup.string().required('Enter details for others'),
    }),
    documentId: Yup.string().trim().required(),
  });
