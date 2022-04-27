import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button, KeyboardSpace, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SummaryComponentProps = {
  style?: SummaryComponentStyles;
  onNext: () => void;
};

export type SummaryComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerSubTitleStyle?: StyleProp<TextStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
};

const SummaryComponent = ({ style, onNext }: SummaryComponentProps) => {
  const styles: SummaryComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <Text style={styles.headerTitleStyle}>
          {i18n?.t('edd_component.lbl_summary_header') ?? 'Before we continue'}
        </Text>
        <Text style={styles.headerSubTitleStyle}>
          {i18n?.t('edd_component.lbl_summary_subheader') ??
            `For us to futher verify your identity, we will be needing you to provide additional documents and answer some questions.

By continuing, you allow the application to use the provided information for all of your transactions.

Should you need to drop off, you can relogin to your account and continue your application where you dropped off.`}
        </Text>
      </View>
      <KeyboardSpace style={styles.footerContainerStyle}>
        <Button onPress={onNext} label={i18n?.t('edd_component.btn_consent') ?? 'I consent'} />
      </KeyboardSpace>
    </View>
  );
};

export default SummaryComponent;
