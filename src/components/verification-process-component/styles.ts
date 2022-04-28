import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { OngoingVerificationComponentStyles } from '.';

const useMergeStyles = (
  style?: OngoingVerificationComponentStyles
): OngoingVerificationComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: OngoingVerificationComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: colors.primaryColor,
    },
    mainContainerStyle: {
      flex: 1,
      // justifyContent: 'center',
      paddingTop:50,
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    footerContainerStyle: {
      padding: 24,
    },
    titleTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 30,
    },
    message1TextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 16,
      width:325,
      fontWeight:'400'
    },
    message2TextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 30,
      width:325,
      fontWeight:'400'
    },
    message3TextStyle: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 30,
      width:325,
      fontWeight:'400'
    },
    message4TextStyle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      lineHeight: 21,
      textAlign: 'left',
      color: '#DCF5FC',
      marginTop: 30,
      width:315,
      fontWeight:'400'
    },
    dashboardCarousel: {
      marginTop: 60,
    },
    sliderContainerStyle:{
      flex: 1,
      paddingTop:80,
      alignItems: 'center',
      // marginRight:
      // paddingHorizontal: 1,
    },
    imageCard:{
      width: 109,
      height: 34,
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
