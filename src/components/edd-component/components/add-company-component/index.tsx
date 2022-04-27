import { Formik } from 'formik';
import React, { useContext, useEffect, useRef } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, InputField, KeyboardSpace, ThemeContext } from 'react-native-theme-component';
import { CompanyData, CompanyDataSchema } from './model';
import useMergeStyles from './styles';
import { AccountOriginationContext } from '../../../../context/onboarding-context';
import ErrorMessageModal, {
  ErrorMessageModalStyles,
} from '../../../sub-components/error-message-modal';

export type AddCompanyComponentProps = {
  initValue?: string;
  applicationId: string;
  style?: AddCompanyComponentStyles;
  onSaved: () => void;
};

export type AddCompanyComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerSubTitleStyle?: StyleProp<TextStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  countLengthStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  errorMessageModalStyle?: ErrorMessageModalStyles;
};

const AddCompanyComponent = ({ style, applicationId, onSaved }: AddCompanyComponentProps) => {
  const styles: AddCompanyComponentStyles = useMergeStyles(style);
  const formikRef: any = useRef(null);
  const { i18n, colors } = useContext(ThemeContext);
  const {
    submitCompany,
    isSubmitedCompany,
    isSubmitingCompany,
    errorSubmitBankCompany,
    clearErrors,
  } = useContext(AccountOriginationContext);

  useEffect(() => {
    if (isSubmitedCompany) {
      onSaved();
    }
  }, [isSubmitedCompany]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={CompanyData.empty()}
        validationSchema={CompanyDataSchema()}
        onSubmit={(values) => {
          submitCompany(applicationId, values.name);
        }}
      >
        {({ isValid, submitForm, values }) => {
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
                  {i18n?.t('edd_component.lbl_add_company_header') ?? 'Additional Information'}
                </Text>
                <Text style={styles.headerSubTitleStyle}>
                  {i18n?.t('edd_component.lbl_add_company_subheader') ??
                    `Please list the companies where  you are a stockholder, director, officer, or authorized signatory. For multiple companies, please separate them by comma.

                  If you're not affiliated with any companies, just indicate 'Not Applicable'.  `}
                </Text>
                <Text style={styles.labelTextStyle}>
                  {i18n?.t('edd_component.lbl_company_names') ?? 'Company names'}
                </Text>
                <InputField
                  scrollEnabled={false}
                  name={'name'}
                  placeholder={
                    i18n?.t('edd_component.phl_enter_company_names') ?? 'Enter company names'
                  }
                  maxLength={500}
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
                <Text style={styles.countLengthStyle}>{`${values.name?.length ?? 0} / 500`}</Text>
              </KeyboardAwareScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                  onPress={() => submitForm()}
                  isLoading={isSubmitingCompany}
                  label={i18n?.t('edd_component.btn_save_continue') ?? 'Save & Continue'}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <ErrorMessageModal
        isVisible={errorSubmitBankCompany !== undefined}
        onClose={clearErrors}
        message={
          i18n?.t('edd_component.msg_error_connect') ??
          "We're having difficulty trying to connecting to our server. Please try again."
        }
        style={styles.errorMessageModalStyle}
      />
    </>
  );
};

export default AddCompanyComponent;
