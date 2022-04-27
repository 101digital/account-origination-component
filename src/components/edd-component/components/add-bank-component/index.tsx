import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Button, InputField, KeyboardSpace, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';
import SelectEBankComponent, { SelectEBankComponentStyles } from '../select-ebank-component';
import { ArrowDownIcon, MinusIcon } from '../../../../assets/icons';
import { FieldArray, Formik } from 'formik';
import { EBankData, EBanksSchema } from './model';
import { AccountOriginationContext } from '../../../../context/onboarding-context';
import ErrorMessageModal, {
  ErrorMessageModalStyles,
} from '../../../sub-components/error-message-modal';

export type AddBankComponentProps = {
  applicationId: string;
  initValue?: EBankData[];
  style?: AddBankComponentStyles;
  onSaved: (data: EBankData[]) => void;
};

export type AddBankComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerSubTitleStyle?: StyleProp<TextStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  addBankButtonContainerStyle?: StyleProp<ViewStyle>;
  addBankButtonLabelStyle?: StyleProp<TextStyle>;
  errorMessageModalStyle?: ErrorMessageModalStyles;
  footerContainerStyle?: StyleProp<ViewStyle>;
  bankItemContainerStyle?: StyleProp<ViewStyle>;
  bankNameContainerStyle?: StyleProp<ViewStyle>;
  selectEBankComponentStyle?: SelectEBankComponentStyles;
};

const AddBankComponent = ({ style, initValue, onSaved, applicationId }: AddBankComponentProps) => {
  const styles: AddBankComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const [isShowSelectEBank, setShowSelectEBank] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const formikRef: any = useRef(null);
  const { submitBank, isSubmitedBank, isSubmitingBank, errorSubmitBankCompany, clearErrors } =
    useContext(AccountOriginationContext);

  useEffect(() => {
    if (isSubmitedBank) {
      onSaved(formikRef?.current?.values.eBanks);
    }
  }, [isSubmitedBank]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  const _setFieldValue = (index: number, name: string, value: string) => {
    formikRef?.current?.setFieldValue(_valueName(index, name), value);
  };

  const _valueName = (index: number, name: string) => `eBanks[${index}].${name}`;

  const _getFieldValue = (index?: number, name?: string) => {
    if (index === undefined || name === undefined) {
      return undefined;
    }
    return formikRef?.current?.values['eBanks'][index][name];
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{ eBanks: initValue ?? [EBankData.empty()] }}
        validationSchema={EBanksSchema()}
        onSubmit={(values) => {
          submitBank(
            applicationId,
            values.eBanks.map((eb) => eb.name)
          );
        }}
      >
        {({ isValid, submitForm, values }) => {
          return (
            <View style={styles.containerStyle}>
              <ScrollView style={styles.mainContainerStyle}>
                <Text style={styles.headerTitleStyle}>
                  {i18n?.t('edd_component.lbl_add_bank_header') ?? 'Additional Information'}
                </Text>
                <Text style={styles.headerSubTitleStyle}>
                  {i18n?.t('edd_component.lbl_add_bank_subheader') ??
                    'Please list the banks where you have maintained or maintaining an account.'}
                </Text>
                <FieldArray
                  name="eBanks"
                  render={({ remove, push }) => {
                    const canAddBank = values.eBanks.length <= 10 && isValid;
                    const addBankColor = canAddBank ? '#FF9800' : '#BAB7BB';
                    return (
                      <>
                        {values.eBanks.map((eBank, index) => {
                          return (
                            <>
                              <Text style={styles.labelTextStyle}>{`Bank no. ${index + 1}`}</Text>
                              <View style={styles.bankItemContainerStyle}>
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    setFocusedIndex(index);
                                    setShowSelectEBank(true);
                                  }}
                                  style={styles.bankNameContainerStyle}
                                >
                                  <InputField
                                    name={_valueName(index, 'name')}
                                    placeholder={
                                      i18n?.t('edd_component.phl_select_ebank') ?? 'Select a bank'
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
                                {index > 0 && (
                                  <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => remove(index)}
                                  >
                                    <MinusIcon width={20} height={20} />
                                  </TouchableOpacity>
                                )}
                              </View>
                            </>
                          );
                        })}
                        <TouchableOpacity
                          disabled={!canAddBank}
                          style={styles.addBankButtonContainerStyle}
                          onPress={() => {
                            push(EBankData.empty());
                          }}
                        >
                          <Text style={[styles.addBankButtonLabelStyle, { color: addBankColor }]}>
                            {i18n?.t('edd_component.btn_add_a_bank') ?? 'Add a bank'}
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              </ScrollView>
              <KeyboardSpace style={styles.footerContainerStyle}>
                <Button
                  disabled={!isValid}
                  disableColor={colors.secondaryButtonColor}
                  onPress={() => submitForm()}
                  isLoading={isSubmitingBank}
                  label={i18n?.t('edd_component.btn_save_continue') ?? 'Save & Continue'}
                />
              </KeyboardSpace>
            </View>
          );
        }}
      </Formik>
      <SelectEBankComponent
        eBankId={_getFieldValue(focusedIndex, 'id')}
        isVisible={isShowSelectEBank}
        onSelected={(eBank) => {
          setShowSelectEBank(false);
          _setFieldValue(focusedIndex, 'name', eBank.name);
          _setFieldValue(focusedIndex, 'id', eBank.id);
        }}
        onClose={() => setShowSelectEBank(false)}
        style={styles.selectEBankComponentStyle}
      />
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

export default AddBankComponent;
