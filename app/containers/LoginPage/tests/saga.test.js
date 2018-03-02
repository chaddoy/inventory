/**
 * Tests for HomePage sagas
 */

import { put, takeEvery } from 'redux-saga/effects';

import { LOGIN, LOGIN_ERROR_MSG } from 'containers/LoginPage/constants';
import { setCurrentUser } from 'containers/App/actions';
import { loginUser, loginError } from 'containers/LoginPage/actions';

import watchLogin, { authenticateUser } from '../saga';

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
describe('authenticateUser Saga', () => {
  let authenticateUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    authenticateUserGenerator = authenticateUser(creds);
  });

  it('should dispatch the loginUser action if it requests the data successfully', () => {
    const putDescriptor = authenticateUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginUser()));
  });

  it('should dispatch the setCurrentUser action if it requests the data successfully', () => {
    authenticateUserGenerator.next();
    const putDescriptor = authenticateUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(setCurrentUser(response[0])));
  });

  it('should call the loginError action if the response errors', () => {
    const errorCreds = {
      username: 'wrongusername',
      password: 'wrongpassword',
    };
    authenticateUserGenerator = authenticateUser(errorCreds);
    const putDescriptor = authenticateUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginError(LOGIN_ERROR_MSG)));
  });
});

describe('watchLoginSaga Saga', () => {
  const watchLoginSaga = watchLogin();

  it('should start task to watch for LOGIN action', () => {
    const takeEveryDescriptor = watchLoginSaga.next().value;
    expect(takeEveryDescriptor).toEqual(takeEvery(LOGIN, authenticateUser));
  });
});
