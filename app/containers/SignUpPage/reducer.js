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
  signUpError: null,
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
      return state
        .set('signingUp', true)
        .set('signUpError', null);

    case SIGNUP_USER_SUCCESS:
      return state
        .set('signingUp', false)
        .set('signUpError', null);

    case SIGNUP_USER_ERROR:
      return state
        .set('signingUp', false)
        .set('signUpError', action.errorMsg);

    default:
      return state;
  }
}

export default signUpPageReducer;
