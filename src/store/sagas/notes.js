import AsyncStorage from '@react-native-community/async-storage';

import {call, put} from 'redux-saga/effects';
import api from '~/services/api';

import {Creators as NoteActions} from '~/store/ducks/notes';

import stringsUtil from '~/util/strings';

export function* addNoteRequest() {
  try {
    let listNotesJSON = yield AsyncStorage.getItem(
      stringsUtil.storage.listNotes,
    );

    /**
     * Pegar notas não sincronizadas e enviar a requisição
     */
    if (listNotesJSON !== null) {
      listNotesJSON = JSON.parse(listNotesJSON);
      const newListNotSync = listNotesJSON.filter(note => {
        return note.sync === false;
      });
      yield newListNotSync.forEach(note => {
        const response = call(
          api.post,
          '/472009/09rj5z/?email_key=marcioper@gmail.com',
          {
            latitude: note.latitude,
            longitude: note.longitude,
            annotation: note.description,
            datetime: note.date,
          },
        );
        if (response === null || response.status !== 200) {
          put(NoteActions.addNoteError('Ocorreu um erro ao sincronizar!'));
        }
      });

      /**
       * Marca todas as notas como sincronizadas após a sincronização acima
       */
      let allNotes = [];
      listNotesJSON.forEach(el => {
        const newNote = el;
        newNote.sync = true;
        allNotes = [...allNotes, newNote];
      });

      yield AsyncStorage.setItem(
        stringsUtil.storage.listNotes,
        JSON.stringify(allNotes),
      );

      yield put(
        NoteActions.addNoteSuccess('Sincronização realizada com sucesso!'),
      );
    }
  } catch (error) {
    yield put(NoteActions.addNoteError('Ocorreu um erro ao sincronizar!'));
  }
}
