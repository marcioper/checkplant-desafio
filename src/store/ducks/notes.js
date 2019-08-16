import {markActionsOffline} from 'redux-offline-queue';

export const Types = {
  ADD_REQUEST: 'notes/ADD_REQUEST',
  ADD_SUCCESS: 'notes/ADD_SUCCESS',
  ADD_ERROR: 'notes/ADD_ERROR',
};

const initialState = {
  data: [],
  loading: false,
  success: null,
  error: null,
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: '',
        error: '',
      };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.message,
        error: '',
      };
    case Types.ADD_ERROR:
      return {
        ...state,
        loading: false,
        success: '',
        error: action.payload.message,
      };
    default:
      return state;
  }
}

export const Creators = {
  addNoteRequest: () => ({
    type: Types.ADD_REQUEST,
  }),

  addNoteSuccess: message => ({
    type: Types.ADD_SUCCESS,
    payload: {
      message,
    },
  }),

  addNoteError: message => ({
    type: Types.ADD_ERROR,
    payload: {
      message,
    },
  }),
};

markActionsOffline(Creators, ['addNoteRequest']);
