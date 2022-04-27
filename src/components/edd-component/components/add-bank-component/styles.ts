import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddBankComponentStyles } from '.';

const useMergeStyles = (style?: AddBankComponentStyles): AddBankComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: AddBankComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 24,
    },
    headerTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      color: colors.primaryColor,
    },
    headerSubTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: '#4E4B50',
      marginTop: 20,
    },
    mainContainerStyle: {
      flex: 1,
    },
    labelTextStyle: {
      fontSize: 12,
      lineHeight: 21,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginBottom: 3,
      marginTop: 20,
    },
    suffixContainerStyle: {
      paddingHorizontal: 12,
    },
    addBankButtonContainerStyle: {
      height: 45,
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addBankButtonLabelStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    footerContainerStyle: {
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      padding: 24,
    },
    bankItemContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bankNameContainerStyle: {
      flex: 1,
      marginRight: 14,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
