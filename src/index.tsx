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
import { OnfidoComponent } from '@onfido-component';
import { AuthContext } from "react-native-auth-component";

export type AccountOriginationComponentProps = {
  onCompleted: (data: ApplicationDetails) => void;
  initData?: InitAccountOriginationData;
  onBack: () => void;
  onLogin?: () => void;
  // initStep: StepData;
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
    id: "verify-identity",
    title: "Verify your identity",
    subTitle:
      ""
  },
  {
    id: "processing-screen",
    title: "processing screen",
    subTitle:
      ""
  },
  {
    id: "comparison-verification",
    title: "Review captured information",
    subTitle:
      "We've captured the information from your ID. Is the captured information correct?"
  },
  {
    id: "edd",
    title: "Review captured information",
    subTitle:
      "We've captured the information from your ID. Is the captured information correct?"
  }
];
const customerInvokeService = CustomerInvokeService.instance();

const AccountOriginationComponent = (
  props: AccountOriginationComponentProps
) => {
  const {
    onCompleted,
    steps,
    style,
    // initStep,
    backIcon,
    onBack,
    onLogin,
    initData
  } = props;
  const _steps = steps ?? defaultAccountOriginationSteps;
  const styles: AccountOriginationComponentStyles = useMergeStyles(style);
  const [step, setStep] = useState<StepData>(defaultAccountOriginationSteps[initData.mainStepNumber]);
  const [showErrorModel, setShowErrorModel] = useState<boolean>(false);
  const [applicationKycStatus, setApplicationKycStatus] = useState<any>();
  const { data, clearData, clearErrors, errorAddMainDetails  } = useContext(
    AccountOriginationContext
  );

  const { updateProfile, getApplicationList, applicationList, isGetApplicationList } =
    useContext(CustomerInvokeContext);

  const { fetchProfile,profile, logout } = useContext(AuthContext);
  const { i18n } = useContext(ThemeContext);
  const { getApplicationStatus, applicationStatus } = useContext(AccountOriginationContext);


  useEffect(() => {
    if (initData.applicationId !== 0) {
      getApplicationStatus(initData.applicationId)
      const verificationStatus = profile?.kycDetails?.verificationStatus;

      if (verificationStatus === undefined) {
        const applicationData = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          applicationId: initData.applicationId
        };
        onfidoInitiate(applicationData)
      }
    }

  }, [initData.applicationId]);


  useEffect(() => {
    if (applicationList && applicationList.length > 0) {
      //get application Id
      const applicationId = applicationList[applicationList.length - 1].applicationId;

      // get application status
      getApplicationStatus(applicationId);
    }
  }, [applicationList]);

  useEffect(() => {
    if (applicationStatus && applicationStatus.nextCustomerAction) {
      const { nextCustomerAction, applicationId } = applicationStatus;
      let mainStepNumber = 0;

      if (nextCustomerAction) {
        switch (nextCustomerAction.statusName) {
          case 'KYC':
            switch (nextCustomerAction.statusValue) {
              case 'Pending':
                mainStepNumber = 1; //Onfido
                break;
              case 'Processing':
              case 'Success':
                mainStepNumber = 2;
                break;
              case 'OCRConsider':
              case  'OCRClear':
                mainStepNumber = 3;
                break;
              default:
                break;
            }
            break;
          case 'EDD':
            mainStepNumber = 4;
            break;
          default:
            break;
        }
      }

      setApplicationKycStatus(nextCustomerAction)
      setStep(_steps[mainStepNumber]);
    }
  }, [applicationStatus]);


  // useEffect(() => {
  //   if (applicationStatus) {
  //     const kycStatus = applicationStatus.applicationStatuses.find(
  //       (o) => o.statusName === 'KYC'
  //     );
  //
  //     setApplicationKycStatus(kycStatus)
  //     setStep(_steps[2]);
  //   }
  //
  //
  // },[applicationStatus])

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
    try {
      const result = await OnfidoComponent({ sdkToken: token });

      if (result === "UserCanceled") {
          onBack();
      } else {
        try {
          await customerInvokeService.checkOnfidoSdkToken(
            applicationDetails.applicationId,
            requestId
          );
          fetchProfile();
          setStep(_steps[3]);
        } catch (error) {
          console.log("error", error);
          showMessage({
            message: "Errror while submit KYC check request. Please try again",
            backgroundColor: "#ff0000"
          });
          // navigation.replace(Route.KYC);
        }
      }
    } catch (error) {
      console.log('error ',error);
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
      {step.id === "main-details"  && (
        <>
          <CustomerInvokeComponent
            initData={{
              firstName: `${profile?.firstName ?? ""}`,
              lastName: `${profile?.lastName ?? ""}`
            }}
            onBack={() => onBack()}
            onCompleted={applicationDetails => {
              // fetchProfile()
              // getApplicationList();

              onfidoInitiate(applicationDetails);
              // setStep(_steps[1])
            }}
            onLogin={() => {
              //navigation.navigate(Route.LOGIN_SCREEN, {});
              logout();
            }}
            initStep={
              defaultCustomerInvokeSteps[initData.subStepNumber?initData.subStepNumber: 0]
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
        <SafeAreaView style={styles.container}>
          <View style={styles.containerStyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>{onBack()}}
              style={styles.backButtonContainerStyle}
            >
              {backIcon ?? <BackIcon width={17} height={12} />}
            </TouchableOpacity>
          <ComparisonVerificationComponent

              initData={{
                firstName: `${profile?.firstName ?? ''}`,
                lastName: `${profile?.lastName ?? ''}`,
                middleName:`${profile?.middleName ?? ''}`,
                dateOfBirth:`${profile?.dateOfBirth ?? ''}`}}
              status={applicationKycStatus?applicationKycStatus:undefined}
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
