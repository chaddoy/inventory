/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import CryptoJS from 'crypto-js';
import {
  CHECK_USER_AUTH,
  SET_USER_AUTH,
  ERROR_USER_AUTH,
  UNSET_USER_AUTH,
} from './constants';

const initialState = fromJS({
  authenticating: false,
  authenticated: false,
  messageToUser: '',
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_USER_AUTH:
      return state
        .set('authenticating', true)
        .set('authenticated', false);

    case SET_USER_AUTH: {
      const userString = JSON.stringify(action.user);
      const encryptedUser = CryptoJS.AES.encrypt(userString, 'capd.user');
      localStorage.setItem('capd.user', encryptedUser);
      return state
        .set('authenticated', true)
        .set('authenticating', false)
        .set('user', action.user);
    }

    case ERROR_USER_AUTH:
      return state
        .set('messageToUser', action.errorMsg)
        .set('authenticating', false)
        .set('authenticated', false);

    case UNSET_USER_AUTH: {
      localStorage.removeItem('capd.user');
      return state
        .set('user', null)
        .set('authenticating', false)
        .set('authenticated', false)
        .set('messageToUser', '');
    }

    default:
      return state;
  }
}

export default appReducer;
