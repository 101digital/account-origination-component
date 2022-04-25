import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { MainDetailComponentStyles } from ".";

const useMergeStyles = (
  style?: MainDetailComponentStyles
): MainDetailComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: MainDetailComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 96
    },
    labelTextStyle: {
      fontSize: 12,
      lineHeight: 21,
      fontFamily: fonts.medium,
      color: colors.primaryTextColor,
      marginBottom: 3,
      marginTop: 20
    },
    optionalTextStyle: {
      color: "#BAB7BB"
    },
    suffixContainerStyle: {
      paddingHorizontal: 12
    },
    footerContainerStyle: {
      padding: 24,
      backgroundColor: "rgba(246, 250, 255, 0.8)"
    },
    noteContainer: {
      borderRadius: 8,
      backgroundColor: "#E7DBF5",
      padding: 15
    },
    noteText: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: colors.primary
    },
    checkBoxInputFieldStyle: {
      containerStyle: {
        flexDirection: "row",
        alignItems: "center"
      },
      selectedBoxStyle: {
        width: 20,
        height: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#14BDEB"
      },
      unSelectedBoxStyle: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        alignItems: "center",
        borderColor: "#14BDEB",
        justifyContent: "center"
      },
      titleStyle: {
        flex: 1,
        fontSize: 12,
        color: "#000",
        marginLeft: 12
      }
    },
    checkBoxWrapper: {
      paddingHorizontal: 1,
      // bottom: 70,
      marginVertical: 25,
      flexDirection: "row",
      alignItems: "center"
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
