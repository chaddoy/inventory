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

export function signUpUser(user) {
  return {
    type: SIGNUP_USER,
    user,
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
