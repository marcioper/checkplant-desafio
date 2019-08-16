import React, {useState} from 'react';

import {
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './styles';

export default function AddNote() {
  const [textInput, setTextInput] = useState('');

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
