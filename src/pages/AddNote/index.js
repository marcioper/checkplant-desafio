import React from 'react';

import {Text, SafeAreaView, StatusBar} from 'react-native';

import styles from './styles';

export default function AddNote() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.welcome}>Add Form here</Text>
    </SafeAreaView>
  );
}
