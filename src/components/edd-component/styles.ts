import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { EDDComponentStyles } from '.';

const useMergeStyles = (style?: EDDComponentStyles): EDDComponentStyles => {
  const defaultStyles: EDDComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    backButtonContainerStyle: {
      padding: 15,
      marginLeft: 12,
      width: 100,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
