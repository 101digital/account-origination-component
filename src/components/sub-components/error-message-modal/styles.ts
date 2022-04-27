import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ErrorMessageModalStyles } from '.';

const useMergeStyles = (style?: ErrorMessageModalStyles): ErrorMessageModalStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: ErrorMessageModalStyles = StyleSheet.create({
    containerStyle: {
      marginHorizontal: 24,
      marginVertical: 10,
      backgroundColor: '#D32F2F',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    messageStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#ffffff',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
