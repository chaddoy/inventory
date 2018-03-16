/*
 *
 * SignUpPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
} from './constants';

const initialState = fromJS({
  signingUp: false,
  signUpSuccess: false,
  signUpError: false,
  messageToUser: '',
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return state
        .set('signingUp', true)
        .set('signUpSuccess', false)
        .set('signUpError', false)
        .set('messageToUser', '');

    case SIGNUP_USER_SUCCESS:
      return state
        .set('signingUp', false)
        .set('signUpSuccess', true)
        .set('signUpError', false)
        .set('messageToUser', action.msgToUser);

    case SIGNUP_USER_ERROR:
      return state
        .set('signingUp', false)
        .set('signUpSuccess', false)
        .set('signUpError', true)
        .set('messageToUser', action.errorMsg);

    default:
      return state;
  }
}

export default signUpPageReducer;
