import { put, takeEvery } from 'redux-saga/effects';
import { LOGIN, USERS, LOGIN_ERROR_MSG } from 'containers/LoginPage/constants';
import { setCurrentUser } from 'containers/App/actions';
import { loginUser, loginError } from 'containers/LoginPage/actions';
import _ from 'lodash';

export function* authenticateUser({ username, password }) {
  try {
    const userIndex = _.findIndex(USERS, {
      username,
      password,
    });

    if (userIndex !== -1) {
      yield put(loginUser());
      yield put(setCurrentUser(USERS[userIndex]));
    } else {
      throw new Error();
    }
  } catch (err) {
    yield put(loginError(LOGIN_ERROR_MSG));
  }
}

export default function* watchLogin() {
  yield takeEvery(LOGIN, authenticateUser);
}
