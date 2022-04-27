import { Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions
} from "react-native";

import {
  Button,
  InputField,
  ThemeContext,
  ErrorModal,
  CheckBox
} from "react-native-theme-component";

import useMergeStyles from "./styles";
import { OngoingIcon,Page1, Page2,Page3 } from "../../assets/icons";
import { Carousel } from '../carousel';
// import { OngoingIcon } from '../../../../assets/icons';
const { width } = Dimensions.get('window');

export type OngoingVerificationComponentProps = {
  style?: OngoingVerificationComponentStyles;
};

export type OngoingVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const VerificationProcessComponent = ({style}:OngoingVerificationComponentProps) => {
  const styles: OngoingVerificationComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);

  const carouselList = [
    { item: <Page1 width={170} height={254}/> },
    { item: <Page2 width={170} height={254} /> },
    { item: <Page3 width={170} height={254} /> },

  ];

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <OngoingIcon width={50} height={50} />
        <Text style={styles.titleTextStyle}>
          {i18n?.t('edd_component.lbl_ongoing_verification') ?? 'Ongoing account\nverification'}
        </Text>
        <Text style={styles.message1TextStyle}>
          {'This might take up to 5-10 minutes.'}
        </Text>
        <Text style={styles.message2TextStyle}>
          {'Once your account is fully verified, we will notify you through your registered mobile number and email.'}
        </Text>
        <Text style={styles.message3TextStyle}>
          {'Keep an eye on your phone. Log back in with your credentials..'}
        </Text>
        <Text style={styles.message4TextStyle}>
          {'In the mean time, you can browse through our recommended articles below.'}
        </Text>
      </View>
      <View style={styles.sliderContainerStyle}>
        <Carousel showBullets={false} containerStyle={styles.dashboardCarousel} carouselList={carouselList} />
      </View>
    </View>
  );
};

export default VerificationProcessComponent;
