import { Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  InputField,
  ThemeContext,
  ErrorModal,
  CheckBox
} from "react-native-theme-component";
import HeaderComponent, { HeaderComponentProps } from "../header-component";
import {
  ComparisonVerificationData,
  ComparisonVerificationSchema
} from "./model";
import DatePicker from "react-native-date-picker";
import useMergeStyles from "./styles";
import { ArrowDownIcon, CalendarIcon, InfoIcon } from "../../assets/icons";
import moment from "moment";

import KeyboardSpace from "../sub-components/keyboard-space";
import { CustomerInvokeContext } from "../../context/onboarding-context";

export type ComparisonVerificationComponentProps = {
  initData?: ComparisonVerificationData;
  header: HeaderComponentProps;
  onContinue: () => void;
  style?: ComparisonVerificationComponentStyles;
  firstName?: string;
  lastName?: string;
};

export type ComparisonVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  suffixContainerStyle?: StyleProp<ViewStyle>;
  optionalTextStyle?: StyleProp<TextStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
};

const ComparisonVerificationComponent = ({
  style,
  header,
  onContinue,
  initData,
  firstName,
  lastName
}: ComparisonVerificationComponentProps) => {
  const styles: ComparisonVerificationComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const [date, setDate] = useState<Date | undefined>();
  const [expDate, setExpDate] = useState<Date | undefined>();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState("dateOfBirth");
  const [isAcceptCondition, setAcceptCondition] = useState(false);

  const {
    addMainDetails,
    isUpdatingMainDetails,
    isUpdatedMainDetails
  } = useContext(CustomerInvokeContext);

  const formikRef: any = useRef(null);

  useEffect(() => {
    if (isUpdatedMainDetails) {
      onContinue();
    }
  }, [isUpdatedMainDetails]);

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
        initialValues={
          initData ??
          ComparisonVerificationData.empty(undefined, undefined, undefined)
        }
        validationSchema={ComparisonVerificationSchema()}
        onSubmit={addMainDetails}
      >
        {({ isValid, submitForm, setFieldValue }) => (
          <View style={styles.containerStyle}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={styles.contentContainerStyle}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
              extraScrollHeight={50}
            >
              <TouchableOpacity
                onPress={() => {
                  /// Auto fill sample data
                  setFieldValue("firstName", "Ferdinan");
                  setFieldValue("middleName", "Sharmal");
                  setFieldValue("lastName", "Perera");
                  setFieldValue("dateOfBirth", "12 / 07 /1991");
                  setFieldValue("idNumber", "122324");
                  setFieldValue("dateOfExpiry", "12 / 07 /1991");
                  setTimeout(() => {
                    formikRef?.current?.validateForm();
                  }, 0);
                }}
              >
                <HeaderComponent {...header} />
              </TouchableOpacity>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                  {
                    "NOTE: Captured name information is correct, you can still edit the date of birth, ID number & ID expiry date. Just make sure they are correct and matches your ID."
                  }
                </Text>
              </View>
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_first_name") ??
                  "First name"}
              </Text>
              <InputField
                name="firstName"
                placeholder={
                  i18n?.t("customer_invoke_component.lbl_first_name") ??
                  "Enter first name"
                }
                maxLength={100}
                style={{
                  contentContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    backgroundColor: "#fff"
                  }
                }}
              />
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_middle_name") ??
                  "Middle name"}
              </Text>
              <InputField
                name="middleName"
                placeholder={
                  i18n?.t("customer_invoke_component.plh_middle_name") ??
                  "Enter middle name"
                }
                maxLength={100}
                style={{
                  contentContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    backgroundColor: "#fff"
                  }
                }}
              />
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_last_name") ??
                  "Last name"}
              </Text>
              <InputField
                name="lastName"
                placeholder={
                  i18n?.t("customer_invoke_component.plh_last_name") ??
                  "Enter last name"
                }
                maxLength={100}
                style={{
                  contentContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    backgroundColor: "#fff"
                  }
                }}
              />
              <Text style={styles.labelTextStyle}>
                {i18n?.t("customer_invoke_component.lbl_dob") ??
                  "Date of Birth"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setDatePickerType("dateOfBirth");
                  setOpenDatePicker(true);
                }}
              >
                <InputField
                  name="dateOfBirth"
                  placeholder={
                    i18n?.t("customer_invoke_component.plh_dob") ??
                    "MM / DD / YYYY"
                  }
                  pointerEvents="none"
                  editable={false}
                  suffixIcon={
                    <View style={styles.suffixContainerStyle}>
                      <CalendarIcon width={24} height={24} />
                    </View>
                  }
                  style={{
                    contentContainerStyle: {
                      borderWidth: 1,
                      borderRadius: 5,
                      borderBottomWidth: 1,
                      backgroundColor: "#fff"
                    }
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.labelTextStyle}>{"ID number"}</Text>
              <InputField
                name="idNumber"
                placeholder={"Enter id number"}
                maxLength={100}
                style={{
                  contentContainerStyle: {
                    borderWidth: 1,
                    borderRadius: 5,
                    borderBottomWidth: 1,
                    backgroundColor: "#fff"
                  }
                }}
              />

              <Text style={styles.labelTextStyle}>{"ID Expiry Date"}</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setDatePickerType("dateOfExpiry");
                  setOpenDatePicker(true);
                }}
              >
                <InputField
                  name="dateOfExpiry"
                  placeholder={"ID Expiry Date"}
                  pointerEvents="none"
                  editable={false}
                  suffixIcon={
                    <View style={styles.suffixContainerStyle}>
                      <CalendarIcon width={24} height={24} />
                    </View>
                  }
                  style={{
                    contentContainerStyle: {
                      borderWidth: 1,
                      borderRadius: 5,
                      borderBottomWidth: 1,
                      backgroundColor: "#fff"
                    }
                  }}
                />
              </TouchableOpacity>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title="I am declaring that this information matches  my ID in compliance to the BSP 921 Guidelines on Customer Due Diligence."
                  isSelected={isAcceptCondition}
                  onChanged={value => {
                    setAcceptCondition(value);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                  // disabled
                />
              </View>
            </KeyboardAwareScrollView>
            <KeyboardSpace style={styles.footerContainerStyle}>
              <Button
                onPress={submitForm}
                label={
                  i18n?.t("customer_invoke_component.lbl_continue") ??
                  "Continue"
                }
                isLoading={isUpdatingMainDetails}
                disabled={!isValid || !isAcceptCondition}
                disableColor={colors.secondaryButtonColor}
              />
            </KeyboardSpace>
          </View>
        )}
      </Formik>

      <DatePicker
        modal
        open={openDatePicker}
        date={
          datePickerType === "dateOfBirth"
            ? date
              ? date
              : new Date()
            : expDate
            ? expDate
            : new Date()
        }
        onConfirm={value => {
          setOpenDatePicker(false);
          if (datePickerType === "dateOfBirth") {
            formikRef?.current.setFieldValue(
              "dateOfBirth",
              moment(value).format("DD / MM / YYYY")
            );
            setDate(value);
          } else {
            formikRef?.current.setFieldValue(
              "dateOfExpiry",
              moment(value).format("DD / MM / YYYY")
            );
            setExpDate(value);
          }
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
        title={
          datePickerType === "dateOfBirth" ? "Date of Birth" : "ID Expiry Date"
        }
        androidVariant="nativeAndroid"
        mode="date"
        maximumDate={datePickerType === "dateOfBirth" ? new Date() : ""}
        confirmText={
          i18n?.t("customer_invoke_component.lbl_picker_confirm") ?? "Select"
        }
      />
    </>
  );
};

export default ComparisonVerificationComponent;
