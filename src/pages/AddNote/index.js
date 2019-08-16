import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './styles';

export default function AddNote({navigation}) {
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const latParam = navigation.getParam('latParam');
    const longParam = navigation.getParam('longParam');
    console.tron.log(`AddNote latitude: ${latParam}`);
    console.tron.log(`AddNote longitude: ${longParam}`);
  });

  return (
    <ScrollView style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

AddNote.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
