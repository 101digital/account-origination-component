import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { AccountOriginationComponentStyles } from ".";

const useMergeStyles = (
  style?: AccountOriginationComponentStyles
): AccountOriginationComponentStyles => {
  const { colors } = useContext(ThemeContext);

  const defaultStyles: AccountOriginationComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1
    },
    progressBarStyle: {
      height: 5,
      width: "100%"
    },
    activeBarStyle: {
      height: "100%",
      backgroundColor: colors.secondaryColor
    },
    backButtonContainerStyle: {
      padding: 15,
      marginLeft: 12,
      marginTop: 26,
      marginBottom: 8,
      width: 100
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
