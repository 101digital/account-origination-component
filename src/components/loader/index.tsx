import { colors, fonts } from '../../assets';
import { LoaderIcon } from '../../assets/icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const Loader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hang on for a moment</Text>
      <Text style={styles.subTitle}>We’re currently setting things up.</Text>
      <LoaderIcon width={60} height={60} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.primary,
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 24,
    color: '#7F7B82',
    paddingHorizontal: 24,
    marginBottom: 32,
    textAlign: 'center',
    paddingBottom: 100,
  },
});

export default Loader;
