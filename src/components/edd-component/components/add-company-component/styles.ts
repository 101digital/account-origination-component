import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddCompanyComponentStyles } from '.';

const useMergeStyles = (style?: AddCompanyComponentStyles): AddCompanyComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: AddCompanyComponentStyles = StyleSheet.create({
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
    countLengthStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#000000',
      marginTop: 8,
      textAlign: 'right',
    },
    footerContainerStyle: {
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      padding: 24,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
