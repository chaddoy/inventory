/**
 * Tests for HomePage sagas
 */

import { put, takeEvery } from 'redux-saga/effects';

import { signUpUserSuccess, signUpUserError } from '../actions';
import { SIGNUP_USER } from '../constants';
import watchSignUp, { registerUser } from '../saga';

const creds = {
  email: 'email@email.com',
  password: 'myPassword',
};

/* eslint-disable redux-saga/yield-effects */
describe('registerUser Saga', () => {
  let registerUserGenerator;

  beforeEach(() => {
    registerUserGenerator = registerUser(creds);

    const callDescriptor = registerUserGenerator.next(creds).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the signUpUserSuccess action if it requests the data successfully', () => {
    const putDescriptor = registerUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(signUpUserSuccess('')));
  });

  it('should call the signUpUserError action if the response errors', () => {
    const response = { message: 'Something wnet wrong.' };
    const putDescriptor = registerUserGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(signUpUserError(response.message)));
  });
});

describe('watchSignUpSaga Saga', () => {
  const watchSignUpSaga = watchSignUp();

  it('should start task to watch for SIGNUP_USER action', () => {
    const takeEveryDescriptor = watchSignUpSaga.next(creds).value;
    expect(takeEveryDescriptor).toEqual(takeEvery(SIGNUP_USER, registerUser));
  });
});
