import { call, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'utils/firebase';

import { signUpUserSuccess, signUpUserError } from './actions';
import { SIGNUP_USER, SIGNUP_SUCCESS_MSG } from './constants';

export function* registerUser({ email, password }) {
  try {
    const response = yield call(
      auth.doCreateUserWithEmailAndPassword,
      email,
      password
    );
    console.log(response);
    yield put(signUpUserSuccess(SIGNUP_SUCCESS_MSG));
  } catch ({ message }) {
    yield put(signUpUserError(message));
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGNUP_USER, registerUser);
}
