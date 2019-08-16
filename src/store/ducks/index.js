import {combineReducers} from 'redux';

import {reducer as offline} from 'redux-offline-queue';
import notes from './notes';

export default combineReducers({
  offline,
  notes,
});
