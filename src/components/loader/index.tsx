import { colors, fonts } from "../../assets";
import { LoaderIcon } from "../../assets/icons";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";

interface ComponentProps {
  onExacute: () => void;
}

export type LoaderProps = ComponentProps;

const Loader = (prop: LoaderProps) => {
  let count = 0;

  useEffect(() => {
    count = 0;
  }, []);

  useEffect(() => {
    var handle = setInterval(() => {
      count++;
      prop.onExacute(count);
    }, 10000);

    return () => {
      clearInterval(handle);
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hang on for a moment</Text>
      <Text style={styles.subTitle}>We’re currently setting things up.</Text>
      <ActivityIndicator
        size={"large"}
        style={styles.loadingIndicatorStyle}
        color={colors.primary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.primary,
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: "center"
  },
  subTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: "#7F7B82",
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: "center",
    paddingBottom: 100
  },
  loadingIndicatorStyle: {
    marginTop: 80
  }
});

export default Loader;
