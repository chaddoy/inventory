/**
 * Tests for HomePage sagas
 */

import { put, takeEvery } from 'redux-saga/effects';

import { LOGIN_ERROR_MSG } from 'containers/LoginPage/constants';
import { CHECK_USER_AUTH } from 'containers/App/constants';
import { setUserAuth, errUserAuth } from 'containers/App/actions';

import watchLogin, { checkAuth } from '../saga';

const creds = {
  username: 'admin',
  password: 'admin',
};

const response = [{
  username: 'admin',
  password: 'admin',
  firstName: 'Abraham',
  lastName: 'Maslow',
}];

/* eslint-disable redux-saga/yield-effects */
describe('checkAuth Saga', () => {
  let checkAuthGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    checkAuthGenerator = checkAuth(creds);
  });

  it('should dispatch the setUserAuth action if it requests the data successfully', () => {
    const putDescriptor = checkAuthGenerator.next(creds).value;
    expect(putDescriptor).toEqual(put(setUserAuth(response[0])));
  });

  it('should call the errUserAuth action if the response errors', () => {
    const errorCreds = {
      username: 'wrongusername',
      password: 'wrongpassword',
    };
    checkAuthGenerator = checkAuth(errorCreds);
    const putDescriptor = checkAuthGenerator.next().value;
    expect(putDescriptor).toEqual(put(errUserAuth(LOGIN_ERROR_MSG)));
  });
});

describe('watchLoginSaga Saga', () => {
  const watchLoginSaga = watchLogin();

  it('should start task to watch for CHECK_USER_AUTH action', () => {
    const takeEveryDescriptor = watchLoginSaga.next().value;
    expect(takeEveryDescriptor).toEqual(takeEvery(CHECK_USER_AUTH, checkAuth));
  });
});
