/*
 *
 * LoginPage actions
 *
 */

import {
  CHECK_USER_AUTH,
  SET_USER_AUTH,
  ERROR_USER_AUTH,
} from './constants';

export function checkUserAuth({ username, password }) {
  return {
    type: CHECK_USER_AUTH,
    username,
    password,
  };
}

export function setUserAuth(user) {
  return {
    type: SET_USER_AUTH,
    user,
  };
}

export function errUserAuth(errorMsg) {
  return {
    type: ERROR_USER_AUTH,
    errorMsg,
  };
}
