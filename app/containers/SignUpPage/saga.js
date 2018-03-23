import { call, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'utils/firebase';

import { signUpUserSuccess, signUpUserError } from './actions';
import { SIGNUP_USER } from './constants';

export function* registerUser({ user }) {
  try {
    const { email, password, firstName, lastName } = user;
    yield call(auth.doCreateUserWithEmailAndPassword, email, password);
    yield call(auth.doUpdateUserProfile, {
      displayName: `${firstName} ${lastName}`,
    });
    yield put(signUpUserSuccess(''));
  } catch ({ message }) {
    yield put(signUpUserError(message));
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGNUP_USER, registerUser);
}
