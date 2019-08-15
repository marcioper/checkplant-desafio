import React from 'react';

import {Text, SafeAreaView, StatusBar} from 'react-native';

import styles from './styles';

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.welcome}>MAPBOX here</Text>
    </SafeAreaView>
  );
}
