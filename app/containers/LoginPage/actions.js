/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN,
  LOGIN_USER,
  LOGIN_ERROR,
} from './constants';

export function login({ username, password }) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function loginUser() {
  return {
    type: LOGIN_USER,
  };
}

export function loginError(errorMsg) {
  return {
    type: LOGIN_ERROR,
    errorMsg,
  };
}
