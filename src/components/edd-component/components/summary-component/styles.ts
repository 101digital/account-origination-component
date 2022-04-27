import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SummaryComponentStyles } from '.';

const useMergeStyles = (style?: SummaryComponentStyles): SummaryComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SummaryComponentStyles = StyleSheet.create({
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
      marginVertical: 20,
    },
    mainContainerStyle: {
      flex: 1,
    },
    footerContainerStyle: {
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      padding: 24,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
