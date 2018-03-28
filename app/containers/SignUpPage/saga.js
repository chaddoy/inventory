import { call, put, takeEvery } from 'redux-saga/effects';
import * as firebase from 'firebase';
import { auth } from 'utils/firebase';
import _ from 'lodash';

import { signUpUserSuccess, signUpUserError } from './actions';
import { SIGNUP_USER } from './constants';

function getUsers(path) {
  return firebase.database().ref(path).once('value');
}

export function addUserToFireDB(user) {
  const { username, password, address, email, gender } = user;
  return firebase.database()
    .ref(`users/${user.username}`)
    .set({
      username,
      password,
      first_name: user.firstName,
      middle_name: _.result(user, 'middleName', null),
      last_name: user.lastName,
      address,
      email,
      contact_no: user.phoneNumber,
      gender,
    });
}

function errorObject(message) {
  return { message };
}

export function* registerUser({ user }) {
  try {
    const users = yield call(getUsers, '/users');
    const existingEmail = _.findKey(users.val(), ['email', user.email]);
    if (!_.has(users.val(), user.username) && !existingEmail) {
      yield call(addUserToFireDB, user);
      yield call(
        auth.doCreateUserWithEmailAndPassword,
        user.email,
        user.password
      );
      yield put(signUpUserSuccess(''));
    } else {
      throw errorObject(existingEmail
        ? 'Email already exist'
        : 'Username already exist');
    }
  } catch (err) {
    yield put(signUpUserError(err.message));
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGNUP_USER, registerUser);
}
