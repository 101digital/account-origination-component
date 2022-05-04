import { OncompletedIcon } from "../../assets/icons";
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SuccessVerificationComponentProps = {
  style?: SuccessVerificationComponentStyles;
  onNext: () => void;
};

export type SuccessVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const SuccessVerificationComponent = ({ style, onNext }: SuccessVerificationComponentProps) => {
  const styles: SuccessVerificationComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <OncompletedIcon width={94} height={94} />
        <Text style={styles.titleTextStyle}>
          {i18n?.t('account_origination.lbl_success_verification') ?? '#UDidIt! Welcome to UnionDigital Bank!'}
        </Text>
        <Text style={styles.messageTextStyle}>
          {i18n?.t('account_origination.msg_success_verification') ??
            'Accesss your Pitaka account and start making payments today!'}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Button label={i18n?.t('account_origination.btn_next') ?? 'Take me to My Pitaka'} onPress={onNext} />
      </View>
    </View>
  );
};

export default SuccessVerificationComponent;
