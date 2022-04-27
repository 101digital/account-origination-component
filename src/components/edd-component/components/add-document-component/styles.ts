import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AddDocumentComponentStyles } from '.';

const useMergeStyles = (style?: AddDocumentComponentStyles): AddDocumentComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: AddDocumentComponentStyles = StyleSheet.create({
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
    labelAttachmentStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      marginTop: 40,
      color: colors.primaryTextColor,
    },
    descriptionAttachmentStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#7F7B82',
      marginVertical: 12,
    },
    attachButtonStyle: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FF9800',
      borderRadius: 4,
      marginTop: 8,
    },
    attachButtonLabelStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: '#FF9800',
    },
    disableAttachButtonLabelStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: '#BAB7BB',
    },
    disableAttachButtonStyle: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#BAB7BB',
      borderRadius: 4,
      marginTop: 8,
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
