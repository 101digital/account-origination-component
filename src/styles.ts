import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { AccountOriginationComponentStyles } from ".";

const useMergeStyles = (
  style?: AccountOriginationComponentStyles
): AccountOriginationComponentStyles => {
  const { colors ,fonts} = useContext(ThemeContext);

  const defaultStyles: AccountOriginationComponentStyles = StyleSheet.create({

      container: {
        flex: 1,
        backgroundColor: '#F1F6FC',
      },
      containerStyle: {
        flex: 1
      },
      backButtonContainerStyle: {
        padding: 15,
        marginLeft: 12,
        width: 100
      },
      headerComponentStyles: {
        containerStyle: {
          marginBottom: 20,
        },
        headerTitleTextStyle: {
          lineHeight: 36,
          color: '#5E0CBC',
          fontFamily: fonts.bold,
          fontSize: 24,
        },
        subTitleTextStyle: {
          fontFamily: fonts.medium,
          fontSize: 14,
          lineHeight: 24,
          color: '#4E4B50',
          marginTop: 20,
        },
      },

    errorContainer: {
      flex: 1,
      backgroundColor: "#5E0CBC"
    },
    contentBox: {
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      marginBottom: 50,
      width: 330
    },
    messageTitle: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: "700",
      textAlign: "center",
      // fontFamily: fonts.medium,
      color: "#E06D6D",
      paddingTop: 50
    },
    messageDescription: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "700",
      textAlign: "center",
      // fontFamily: fonts.medium,
      color: "#fff",
      paddingTop: 16
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
