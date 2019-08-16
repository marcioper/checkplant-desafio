import {all, spawn, takeLatest} from 'redux-saga/effects';

import {startWatchingNetworkConnectivity} from './offline';

import {Types as NoteTypes} from '~/store/ducks/notes';
import {addNoteRequest} from './notes';

export default function* rootSaga() {
  return yield all([
    spawn(startWatchingNetworkConnectivity),
    takeLatest(NoteTypes.ADD_REQUEST, addNoteRequest),
  ]);
}
