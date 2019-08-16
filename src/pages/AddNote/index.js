import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';

import stringsUtil from '~/util/strings';

export default function AddNote({navigation}) {
  const [textInput, setTextInput] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    const latParam = navigation.getParam('latParam');
    const longParam = navigation.getParam('longParam');
    setLatitude(latParam);
    setLongitude(longParam);
    // console.tron.log(`AddNote latitude: ${latParam}`);
    // console.tron.log(`AddNote longitude: ${longParam}`);
  }, [navigation]);

  const saveAsyncStorage = async note => {
    try {
      let notes = await AsyncStorage.getItem(stringsUtil.storage.listNotes);
      // console.tron.log(`notes: ${JSON.stringify(notes)}`);
      if (notes !== null) {
        notes = JSON.parse(notes);
      } else {
        notes = [];
      }

      notes = [...notes, note];
      // console.tron.log(`saveAsyncStorage: ${JSON.stringify(notes)}`);
      await AsyncStorage.setItem(
        stringsUtil.storage.listNotes,
        JSON.stringify(notes),
      );
    } catch (error) {
      if (__DEV__) {
        console.tron.error(error);
      }
    }
  };

  const handleSave = async () => {
    // console.tron.log(`handleSave: ${textInput}`);
    if (textInput === '') {
      showMessage({
        message: 'Digite uma anotação para salvar',
        type: 'warning',
        icon: 'warning',
      });
      return;
    }

    const note = {
      id: new Date().getTime(),
      date: new Date(),
      description: textInput,
      latitude,
      longitude,
      sync: false,
    };

    await saveAsyncStorage(note);

    navigation.navigate('Main', {
      reload: true,
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={styles.containerForm} behavior="padding">
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite aqui a anotação..."
          underlineColorAndroid="transparent"
          multiline
          numberOfLines={20}
          value={textInput}
          onChangeText={text => {
            setTextInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSave();
          }}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        {/* <Button
          onPress={handleSave}
          title="Adicionar"
          color={colors.secundary}
          accessibilityLabel="Adicione uma anotação"
        /> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

AddNote.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
