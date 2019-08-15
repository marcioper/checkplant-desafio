import React from 'react';
import PropTypes from 'prop-types';

import {Text, SafeAreaView, StatusBar} from 'react-native';

import {FloatingAction} from 'react-native-floating-action';

import styles from './styles';

import IconRefresh from '~/assets/images/icons/refresh.png';
import IconEdit from '~/assets/images/icons/edit.png';
import {colors} from '~/styles';

export default function Main({navigation}) {
  const actions = [
    {
      text: 'Sincronizar',
      icon: IconRefresh,
      color: colors.primary,
      name: 'bt_refresh',
      position: 2,
    },
    {
      text: 'Adicionar',
      icon: IconEdit,
      color: colors.primary,
      name: 'bt_edit',
      position: 1,
    },
  ];

  function syncData() {}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.welcome}>MAPBOX here</Text>
      <FloatingAction
        actions={actions}
        color={colors.primary}
        onPressItem={name => {
          if (name === 'bt_edit') navigation.navigate('AddNote');
          else syncData();
        }}
      />
    </SafeAreaView>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
