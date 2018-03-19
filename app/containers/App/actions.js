/*
 *
 * LoginPage actions
 *
 */

import {
  CHECK_USER_AUTH,
  SET_USER_AUTH,
  ERROR_USER_AUTH,
  UNSET_USER_AUTH,
} from './constants';

export function checkUserAuth({ email, password }) {
  return {
    type: CHECK_USER_AUTH,
    email,
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

export function unsetUserAuth() {
  return {
    type: UNSET_USER_AUTH,
  };
}
