import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ItemEBankComponentStyles } from '.';

const useMergeStyles = (style?: ItemEBankComponentStyles): ItemEBankComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ItemEBankComponentStyles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      marginVertical: 12.5,
      alignItems: 'center',
    },
    avatarContainerStyle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF9800',
    },
    bankNameStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.primaryTextColor,
    },
    contentContainerStyle: {
      flex: 1,
      marginHorizontal: 16,
    },
    avatarNameTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: '#5E0CBC',
    },
    radioContainerStyle: {
      width: 26,
      height: 26,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: colors.secondaryColor,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerRadioContainerStyle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.secondaryColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
