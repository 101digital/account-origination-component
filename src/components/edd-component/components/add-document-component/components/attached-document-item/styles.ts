import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AttachedDocumentItemStyles } from '.';

const useMergeStyles = (style?: AttachedDocumentItemStyles): AttachedDocumentItemStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: AttachedDocumentItemStyles = StyleSheet.create({
    containerStyle: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },
    documentNameStyle: {
      flex: 1,
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      paddingHorizontal: 13,
    },
    progressContainerStyle: {
      height: 4,
      width: 38,
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: '#DCF5FC',
    },
    progressFilledStyle: {
      backgroundColor: '#14BDEB',
      height: '100%',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
