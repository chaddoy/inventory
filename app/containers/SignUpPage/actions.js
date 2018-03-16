/*
 *
 * SignUpPage actions
 *
 */

import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
} from './constants';

export function signUpUser({ email, password }) {
  return {
    type: SIGNUP_USER,
    email,
    password,
  };
}

export function signUpUserSuccess() {
  return {
    type: SIGNUP_USER_SUCCESS,
  };
}

export function signUpUserError(errorMsg) {
  return {
    type: SIGNUP_USER_ERROR,
    errorMsg,
  };
}
