/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN,
  LOGIN_USER,
  LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
  loggingIn: false,
  errorMsg: '',
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
        .set('loggingIn', true)
        .set('errorMsg', '');

    case LOGIN_USER:
      return state
        .set('loggingIn', false)
        .set('errorMsg', '');

    case LOGIN_ERROR:
      return state
        .set('loggingIn', false)
        .set('errorMsg', action.errorMsg);

    default:
      return state;
  }
}

export default loginPageReducer;
