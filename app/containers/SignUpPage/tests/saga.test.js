/**
 * Tests for HomePage sagas
 */

import { call, put, takeEvery } from 'redux-saga/effects';

import { auth } from 'utils/firebase';
import { signUpUserSuccess, signUpUserError } from '../actions';
import { SIGNUP_USER } from '../constants';
import watchSignUp, {
  registerUser,
  addUserToFireDB,
} from '../saga';

const user = {
  username: 'janedoe',
  firstName: 'Jane',
  middleName: 'Foo',
  lastName: 'Doe',
  address: 'matrix',
  gender: 'male',
  phoneNumber: '1234567890',
  email: 'janedoe@email.com',
  password: 'myPassword',
  confirmPassword: 'myPassword',
};

const johndoe = Object.assign({}, user, {
  username: 'johndoe',
  firstName: 'John',
  email: 'johndoe@email.com',
});

const users = {
  val: () => ({
    johndoe,
  }),
};

/* eslint-disable redux-saga/yield-effects */
describe('registerUser Saga', () => {
  let registerUserGenerator;

  beforeEach(() => {
    registerUserGenerator = registerUser({ user });

    const getUsersDescriptor = registerUserGenerator.next().value;
    expect(getUsersDescriptor).toMatchSnapshot();
  });

  it('should dispatch the signUpUserSuccess action if it requests the data successfully', () => {
    const callDBDescriptor = registerUserGenerator.next(users).value;
    expect(callDBDescriptor).toEqual(call(addUserToFireDB, user));

    const callAuthDescriptor = registerUserGenerator.next(users).value;
    expect(callAuthDescriptor).toEqual(call(
      auth.doCreateUserWithEmailAndPassword,
      user.email,
      user.password
    ));

    const putDescriptor = registerUserGenerator.next(user).value;
    expect(putDescriptor).toEqual(put(signUpUserSuccess('')));
  });

  it('should throw a message if email exists', () => {
    const putDescriptor = registerUserGenerator.next({
      val: () => ({
        janedoe: user,
      }),
    }).value;
    expect(putDescriptor).toEqual(put(signUpUserError('Email already exist')));
  });

  it('should throw a message if username exists', () => {
    const putDescriptor = registerUserGenerator.next({
      val: () => ({
        janedoe: Object.assign({}, user, {
          email: 'new@email.com',
        }),
      }),
    }).value;
    expect(putDescriptor).toEqual(put(signUpUserError('Username already exist')));
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
    const takeEveryDescriptor = watchSignUpSaga.next(user).value;
    expect(takeEveryDescriptor).toEqual(takeEvery(SIGNUP_USER, registerUser));
  });
});
