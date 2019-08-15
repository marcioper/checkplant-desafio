import React from 'react';

import {Text, SafeAreaView, StatusBar} from 'react-native';

import {FloatingAction} from 'react-native-floating-action';

import styles from './styles';

export default function Main() {
  const actions = [
    {
      text: 'Sincronizar',
      icon: require('~/assets/images/icons/refresh.png'),
      name: 'bt_refresh',
      position: 2,
    },
    {
      text: 'Adicionar',
      icon: require('~/assets/images/icons/edit.png'),
      name: 'bt_edit',
      position: 1,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.welcome}>MAPBOX here</Text>
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.tron.log(`selected button: ${name}`);
        }}
      />
    </SafeAreaView>
  );
}
