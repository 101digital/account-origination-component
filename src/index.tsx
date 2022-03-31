import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import {
  ApplicationDetails,
  InitAccountOriginationData,
  StepData
} from "./types";
import useMergeStyles from "./styles";

import { BackIcon } from "./assets/icons";

import AccountDetailsComponent, {
  AccountDetailsComponentStyles
} from "./components/account-details-component";
import { HeaderComponentStyles } from "./components/header-component";
import { AccountOriginationContext } from "./context/onboarding-context";
import { showMessage } from "react-native-flash-message";

export type AccountOriginationComponentProps = {
  onCompleted: (data: ApplicationDetails) => void;
  initData?: InitAccountOriginationData;
  onBack: () => void;
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

  accountDetailsComponentStyles?: AccountDetailsComponentStyles;
};

export const defaultAccountOriginationSteps: StepData[] = [
  {
    id: "account-details",
    title: "Account details",
    subTitle: "Select where you get your funds.",
    progress: 9 / 12
  }
];

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
    initData
  } = props;
  const _steps = steps ?? defaultAccountOriginationSteps;
  const styles: AccountOriginationComponentStyles = useMergeStyles(style);
  const [step, setStep] = useState<StepData>(defaultAccountOriginationSteps[0]);
  const {
    data,
    clearData,
    clearErrors,
    isCreatedApplication,
    errorUpdateMainDetails,
    errorUpdateAddressDetails,
    errorUpdateNationality,
    errorCreateApplication,
    applicationDetails
  } = useContext(AccountOriginationContext);

  useEffect(() => {
    if (errorUpdateMainDetails) {
      showMessage({
        message: "Errror while updating main details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorUpdateAddressDetails) {
      showMessage({
        message: "Errror while updating addresses details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorUpdateNationality) {
      showMessage({
        message: "Errror while updating nationality details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
    if (errorCreateApplication) {
      showMessage({
        message: "Errror while creating application details. Please try again",
        backgroundColor: "#ff0000"
      });
      clearErrors();
    }
  }, [
    errorUpdateMainDetails,
    errorUpdateAddressDetails,
    errorUpdateNationality,
    errorCreateApplication
  ]);

  useEffect(() => {
    if (isCreatedApplication && applicationDetails) {
      onCompleted(applicationDetails);
    }
  }, [isCreatedApplication]);

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

  return (
    <View style={styles.containerStyle}>
      <SafeAreaView>
        <View style={styles.progressBarStyle}>
          <View
            style={[
              styles.activeBarStyle,
              { width: `${step.progress * 100}%` }
            ]}
          />
        </View>
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={_handleBack}
        style={styles.backButtonContainerStyle}
      >
        {backIcon ?? <BackIcon width={17} height={12} />}
      </TouchableOpacity>

      <AccountDetailsComponent
        initValue={data?.accountDetails}
        header={{
          style: styles?.headerComponentStyles,
          data: step
        }}
        style={styles.accountDetailsComponentStyles}
      />
    </View>
  );
};

export default AccountOriginationComponent;
