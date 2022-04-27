import { OngoingIcon } from '../../../../assets/icons';
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type OngoingVerificationComponentProps = {
  style?: OngoingVerificationComponentStyles;
  onNext: () => void;
};

export type OngoingVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const OngoingVerificationComponent = ({ style, onNext }: OngoingVerificationComponentProps) => {
  const styles: OngoingVerificationComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <OngoingIcon width={94} height={94} />
        <Text style={styles.titleTextStyle}>
          {i18n?.t('edd_component.lbl_ongoing_verification') ?? 'Ongoing account\nverification'}
        </Text>
        <Text style={styles.messageTextStyle}>
          {i18n?.t('edd_component.msg_ongoing_verification') ??
            'Thank you for submitting your\ninformation. We will process your\nrequest and notify you within 24 hours.'}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Button label={i18n?.t('edd_component.btn_next') ?? 'Next'} onPress={onNext} />
      </View>
    </View>
  );
};

export default OngoingVerificationComponent;
