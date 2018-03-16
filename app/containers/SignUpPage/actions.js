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

export function signUpUserSuccess(msgToUser) {
  return {
    type: SIGNUP_USER_SUCCESS,
    msgToUser,
  };
}

export function signUpUserError(errorMsg) {
  return {
    type: SIGNUP_USER_ERROR,
    errorMsg,
  };
}
