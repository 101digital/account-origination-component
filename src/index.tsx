import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text
} from "react-native";
import { ApplicationDetails, StepData } from "./types";
import useMergeStyles from "./styles";

import { BackIcon, InfoIcon } from "./assets/icons";

import { HeaderComponentStyles } from "./components/header-component";
import { AccountOriginationContext } from "./context/onboarding-context";
import { showMessage } from "react-native-flash-message";
import { Button, ThemeContext } from "react-native-theme-component";

import ComparisonVerificationComponent, {
  ComparisonVerificationComponentStyles
} from "./components/comparison-verification-component";

import {
  CustomerInvokeComponent,
  defaultCustomerInvokeSteps,
  CustomerInvokeContext,
  CustomerInvokeService
} from "customer-invoke-component";
import { AuthContext } from "react-native-auth-component";

export type AccountOriginationComponentProps = {
  onCompleted: (data: ApplicationDetails) => void;
  initData?: InitAccountOriginationData;
  onBack: () => void;
  onLogin?: () => void;
  initStep: StepData;
  steps?: StepData[];
  style?: AccountOriginationComponentStyles;
  backIcon?: ReactNode;
};

export type AccountOriginationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  progressBarStyle?: StyleProp<ViewStyle>;
  activeBarStyle?: StyleProp<ViewStyle>;
  backButtonContainerStyle?: StyleProp<ViewStyle>;
  headerComponentStyles?: HeaderComponentStyles;
  mainDetailsComponentStyles?: MainDetailComponentStyles;
  nationalityComponentStyles?: NationalityComponentStyles;
  addressDetailsComponentStyles?: AddressDetailsComponentStyles;
  otherDetailsComponentStyles?: OtherDetailsComponentStyles;
  accountDetailsComponentStyles?: AccountDetailsComponentStyles;
};

export const defaultAccountOriginationSteps: StepData[] = [
  {
    id: "main-details",
    title: "We want to know you more",
    subTitle: "Enter main details."
  },
  {
    id: "comparison-verification",
    title: "Review captured information",
    subTitle:
      "We've captured the information from your ID. Is the captured information correct?"
  }
];

const AccountOriginationComponent = (
  props: AccountOriginationComponentProps
) => {
  const {
    onCompleted,
    steps,
    style,
    initStep,
    backIcon,
    onBack,
    onLogin,
    initData
  } = props;
  const _steps = steps ?? defaultAccountOriginationSteps;
  const styles: AccountOriginationComponentStyles = useMergeStyles(style);
  const [step, setStep] = useState<StepData>(initStep);
  const [showErrorModel, setShowErrorModel] = useState<boolean>(false);
  const { data, clearData, clearErrors, errorAddMainDetails } = useContext(
    AccountOriginationContext
  );
  const { profile, logout } = useContext(AuthContext);
  const { i18n } = useContext(ThemeContext);

  const { defaultStep } = route.params;

  // useEffect(() => {
  //   if (errorAddMainDetails) {
  //     showMessage({
  //       message: "Errror while updating main details. Please try again",
  //       backgroundColor: "#ff0000"
  //     });
  //     clearErrors();
  //   }
  // }, [
  //   errorAddMainDetails,
  // ]);

  useEffect(() => {}, []);

  const _handleBack = () => {
    const _index = _steps.findIndex(s => s.id === step.id);
    if (_index === -1) {
      return;
    }
    if (_index === 0) {
      onBack();
      return;
    }
    setStep(_steps[_index - 1]);
  };

  useEffect(() => {
    return () => {
      clearData();
      clearErrors();
    };
  }, []);

  const validate = async (
    token: string,
    applicationDetails: any,
    requestId: string
  ) => {
    const result = await OnfidoComponent({ sdkToken: token });
    if (result === "UserCanceled") {
      // navigation.goBack();
    } else {
      try {
        await customerInvokeService.checkOnfidoSdkToken(
          applicationDetails.applicationId,
          requestId
        );
        setStep(_steps[1]);
        // navigation.navigate(Route.DASHBOARD_SCREEN, {});

        // console.log('data', data);
        // dispatch(signInActions.request(phoneNumber, password, country));
      } catch (error) {
        console.log("error", error);
        showMessage({
          message: "Errror while submit KYC check request. Please try again",
          backgroundColor: "#ff0000"
        });
        // navigation.replace(Route.KYC);
      }
    }
  };

  const onfidoInitiate = async (applicationDetails: any) => {
    try {
      const response = await customerInvokeService.getOnfidoSdkToken(
        applicationDetails.applicationId,
        applicationDetails.firstName,
        applicationDetails.lastName
      );

      if (response) {
        const { data } = response;
        if (data && data.sdkToken && data.requestId) {
          validate(data.sdkToken, applicationDetails, data.requestId);
        } else {
          showMessage({
            message: "Errror while create a new KYC request. Please try again",
            backgroundColor: "#ff0000"
          });
        }
      } else {
        showMessage({
          message: "Errror while create a new KYC request. Please try again",
          backgroundColor: "#ff0000"
        });
      }
    } catch (error) {
      console.log("error ", error);

      showMessage({
        message: "Errror while create a new KYC request. Please try again",
        backgroundColor: "#ff0000"
      });
    }
  };

  if (showErrorModel) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentBox}>
          <InfoIcon width={60} height={60} color={"#E06D6D"} />
          <Text style={styles.messageTitle}>
            {i18n?.t("customer_invoke_component.lbl_account_exists") ??
              "Account already exists"}
          </Text>
          <Text style={styles.messageDescription}>
            {i18n?.t("customer_invoke_component.msg_account_exists") ??
              "Looks like the personal information you entered has a linked UnionDigital Bank Account already. Please login to your account."}
          </Text>
        </View>
        <Button
          onPress={() => {
            onLogin();
            setShowErrorModel(false);
            // navigation.navigate(Route.USER_NAME_REGISTER_SCREEN, {});
          }}
          label="Proceed to login"
          style={{
            primaryContainerStyle: {
              marginHorizontal: 24,
              marginBottom: Platform.OS === "android" ? 24 : 0
            }
          }}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        {step.id === "main-details" && (
          <>
            <CustomerInvokeComponent
              initData={{
                firstName: `${profile?.firstName ?? ""}`,
                lastName: `${profile?.lastName ?? ""}`
              }}
              onBack={() => onBack()}
              onCompleted={applicationDetails => {
                onfidoInitiate(applicationDetails);
              }}
              onLogin={() => {
                //navigation.navigate(Route.LOGIN_SCREEN, {});
                logout();
              }}
              initStep={
                defaultCustomerInvokeSteps[defaultStep ? defaultStep : 0]
              }
              style={{
                headerComponentStyles: {
                  containerStyle: {
                    marginBottom: 20
                  },
                  headerTitleTextStyle: {
                    lineHeight: 36,
                    color: "#5E0CBC",
                    fontSize: 24
                  },
                  subTitleTextStyle: {
                    fontSize: 14,
                    lineHeight: 24,
                    color: "#4E4B50",
                    marginTop: 20
                  }
                }
              }}
            />
          </>
        )}
        {step.id === "comparison-verification" && (
          <SafeAreaView style={styles.container1}>
            <View style={styles.containerStyle}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={_handleBack}
                style={styles.backButtonContainerStyle}
              >
                {backIcon ?? <BackIcon width={17} height={12} />}
              </TouchableOpacity>
              <ComparisonVerificationComponent
                firstName={initData?.firstName}
                lastName={initData?.lastName}
                initData={data?.mainDetails}
                header={{
                  style: styles?.headerComponentStyles,
                  data: step
                }}
                onContinue={() => {
                  setStep(_steps[1]);
                }}
                style={styles?.mainDetailsComponentStyles}
              />
            </View>
          </SafeAreaView>
        )}
      </>
    );
  }
};

export default AccountOriginationComponent;
