import { put, takeEvery } from 'redux-saga/effects';
import { USERS, LOGIN_ERROR_MSG } from 'containers/LoginPage/constants';
import { CHECK_USER_AUTH } from 'containers/App/constants';
import { setUserAuth, errUserAuth } from 'containers/App/actions';
import _ from 'lodash';

export function* checkAuth({ username, password }) {
  try {
    const userIndex = _.findIndex(USERS, {
      username,
      password,
    });

    if (userIndex !== -1) {
      yield put(setUserAuth(USERS[userIndex]));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(errUserAuth(LOGIN_ERROR_MSG));
  }
}

export default function* watchLogin() {
  yield takeEvery(CHECK_USER_AUTH, checkAuth);
}
