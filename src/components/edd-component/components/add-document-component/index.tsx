import { Formik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Platform,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Button, InputField, KeyboardSpace, ThemeContext } from 'react-native-theme-component';
import { DocumentData, DocumentDataSchema } from './model';
import useMergeStyles from './styles';
import { ArrowDownIcon } from '../../../../assets/icons';
import SelectDocumentTypeModal, {
  SelectDocumentTypeModalStyles,
} from './components/select-document-type-modal';
import DocumentPicker, { types } from 'react-native-document-picker';
import { DocumentFileData } from '../../../../types';
import ErrorMessageModal, {
  ErrorMessageModalStyles,
} from '../../../sub-components/error-message-modal';
import AttachedDocumentItem from './components/attached-document-item';
import RNFS from 'react-native-fs';
import { AccountOriginationContext } from '../../../../context/onboarding-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import AlertComponent, { AlertComponentStyles } from '../../../sub-components/alert-modal';

export type AddDocumentComponentProps = {
  initValue?: DocumentData;
  style?: AddDocumentComponentStyles;
  maxFileSize?: number;
  applicationId: string;
  onSaved: (data: DocumentData) => void;
};

export type AddDocumentComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerSubTitleStyle?: StyleProp<TextStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  labelAttachmentStyle?: StyleProp<TextStyle>;
  descriptionAttachmentStyle?: StyleProp<TextStyle>;
  attachButtonStyle?: StyleProp<ViewStyle>;
  attachButtonLabelStyle?: StyleProp<TextStyle>;
  disableAttachButtonStyle?: StyleProp<ViewStyle>;
  disableAttachButtonLabelStyle?: StyleProp<TextStyle>;
  errorMessageModalStyle?: ErrorMessageModalStyles;
  selectDocumentModalStyle?: SelectDocumentTypeModalStyles;
  countLengthStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  alertComponentStyle?: AlertComponentStyles;
};

const AddDocumentComponent = ({
  style,
  onSaved,
  maxFileSize,
  applicationId,
  initValue,
}: AddDocumentComponentProps) => {
  const styles: AddDocumentComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const formikRef: any = useRef(null);
  const [openDocumentTypeModal, setDocumentTypeModal] = useState(false);
  const [document, setDocument] = useState<DocumentFileData | undefined>();
  const [isFileSizeErrorModal, setFileSizeErrorModal] = useState(false);
  const {
    uploadDocument,
    errorUploadDocument,
    clearErrors,
    isSubmitingDocument,
    submitDocument,
    isSubmitedDocument,
    errorSubmitDocument,
  } = useContext(AccountOriginationContext);
  const _maxFileSize = maxFileSize ?? 5000000;
  const [isDocumentError, setDocumentError] = useState(false);
  const [isShowPermission, setShowPermission] = useState(false);

  const requestReadFilePermission = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        default: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      })
    ).then((result) => {
      if (result === RESULTS.GRANTED) {
        pickDocument();
      } else {
        setShowPermission(true);
      }
    });
  };

  useEffect(() => {
    if (isSubmitedDocument) {
      onSaved(formikRef?.current?.values);
    }
  }, [isSubmitedDocument]);

  useEffect(() => {
    if (errorUploadDocument) {
      setDocumentError(true);
    }
  }, [errorUploadDocument]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  const pickDocument = async () => {
    const pickerResult = await DocumentPicker.pickSingle({
      type: [types.pdf, types.images],
    });
    const _fileData = await RNFS.readFile(pickerResult.uri, 'base64');
    const _document = {
      name: pickerResult.name,
      size: pickerResult.size ?? 0,
      type: pickerResult.type ?? 'image/jpg',
      data: _fileData,
    };
    setDocument(_document);
    if ((pickerResult?.size ?? 0) <= _maxFileSize) {
      const documentId = await uploadDocument(
        _document.data,
        formikRef?.current?.values.documentType,
        _document.type
      );
      formikRef?.current.setFieldValue('documentId', documentId);
      setDocument({ ..._document, id: documentId });
    } else {
      setFileSizeErrorModal(true);
      setDocumentError(true);
    }
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={initValue ?? DocumentData.empty()}
        validationSchema={DocumentDataSchema()}
        onSubmit={(values) => {
          const _docType =
            values.documentType === 'Others' ? values.otherType ?? '' : values.documentType;
          submitDocument(values.documentId, applicationId, _docType);
        }}
      >
        {({ isValid, submitForm, values }) => {
          const _isOther = values.documentType === 'Others';
          return (
            <View style={styles.containerStyle}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.mainContainerStyle}
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                showsVerticalScrollIndicator={false}
                extraScrollHeight={50}
              >
                <Text style={styles.headerTitleStyle}>
                  {i18n?.t('edd_component.lbl_add_document_header') ?? 'Additional Information'}
                </Text>
                <Text style={styles.headerSubTitleStyle}>
                  {i18n?.t('edd_component.lbl_add_document_subheader') ??
                    'Please provide supporting information for the source of fund or wealth'}
                </Text>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t('edd_component.lbl_select_document_type') ?? 'Select document type'}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setDocumentTypeModal(true);
                  }}
                >
                  <InputField
                    name="documentType"
                    placeholder={
                      i18n?.t('edd_component.plh_select_document_type') ?? 'Select document type'
                    }
                    pointerEvents="none"
                    editable={false}
                    suffixIcon={
                      <View style={styles.suffixContainerStyle}>
                        <ArrowDownIcon width={24} height={24} />
                      </View>
                    }
                  />
                </TouchableOpacity>
                {_isOther && (
                  <>
                    <InputField
                      scrollEnabled={false}
                      name={'otherType'}
                      placeholder={
                        i18n?.t('edd_component.plh_enter_other_details') ??
                        'Enter details for others'
                      }
                      maxLength={100}
                      multiline
                      numberOfLines={3}
                      style={{
                        containerStyle: {
                          marginTop: 8,
                        },
                        inputContainerStyle: {
                          height: 102,
                          alignItems: 'flex-start',
                          paddingHorizontal: 0,
                          paddingVertical: 10,
                        },
                      }}
                    />
                    <Text style={styles.countLengthStyle}>{`${
                      values.otherType?.length ?? 0
                    } / 100`}</Text>
                  </>
                )}
                <Text style={styles.labelAttachmentStyle}>
                  {i18n?.t('edd_component.lbl_add_attachment') ?? 'Add Attachment'}
                </Text>
                <Text style={styles.descriptionAttachmentStyle}>
                  {i18n?.t('edd_component.msg_attachment') ??
                    'Upload a file in .jpg, .png, or .pdf format. Max of 5MB'}
                </Text>
                <TouchableOpacity
                  onPress={requestReadFilePermission}
                  activeOpacity={0.8}
                  style={document ? styles.disableAttachButtonStyle : styles.attachButtonStyle}
                >
                  <Text
                    style={
                      document
                        ? styles.disableAttachButtonLabelStyle
                        : styles.attachButtonLabelStyle
                    }
                  >
                    {i18n?.t('edd_component.btn_attach_file_photo') ?? 'Attach a file or photo'}
                  </Text>
                </TouchableOpacity>
                {document && (
                  <AttachedDocumentItem
                    document={document}
                    onDelete={() => {
                      setDocument(undefined);
                      setDocumentError(false);
                      formikRef?.current.setFieldValue('documentId', undefined);
                    }}
                    isError={isDocumentError}
                  />
                )}
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                  onPress={() => {
                    submitForm();
                  }}
                  isLoading={isSubmitingDocument}
                  label={i18n?.t('edd_component.btn_save_continue') ?? 'Save & Continue'}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectDocumentTypeModal
        initValue={formikRef?.current?.values.documentType}
        isVisible={openDocumentTypeModal}
        onClose={() => setDocumentTypeModal(false)}
        onValueChanged={(value) => {
          setDocumentTypeModal(false);
          formikRef?.current.setFieldValue('documentType', value.label);
        }}
        style={styles.selectDocumentModalStyle}
      />
      <ErrorMessageModal
        isVisible={isFileSizeErrorModal}
        onClose={() => {
          setFileSizeErrorModal(false);
        }}
        message={`File size is too large. ${document?.name} was not uploaded. Files cannot be larger than 5mb.`}
        style={styles.errorMessageModalStyle}
      />
      <ErrorMessageModal
        isVisible={errorUploadDocument !== undefined || errorSubmitDocument !== undefined}
        onClose={clearErrors}
        message={
          i18n?.t('edd_component.msg_error_connect') ??
          "We're having difficulty trying to connecting to our server. Please try again."
        }
        style={styles.errorMessageModalStyle}
      />
      <AlertComponent
        isVisible={isShowPermission}
        title={
          i18n?.t('edd_component.lbl_storage_permission_required') ?? 'Need storage permission'
        }
        confirmTitle={i18n?.t('edd_component.btn_open_settings') ?? 'Go to Settings'}
        cancelTitle={i18n?.t('edd_component.btn_cancel') ?? 'Cancel'}
        message={
          i18n?.t('edd_component.msg_storage_permission_required') ??
          'The app needs permission in order to access your files. Please adjust this in your settings.'
        }
        onCancel={() => setShowPermission(false)}
        onConfirmed={() => {
          setShowPermission(false);
          openSettings();
        }}
        style={styles.alertComponentStyle}
      />
    </>
  );
};

export default AddDocumentComponent;
