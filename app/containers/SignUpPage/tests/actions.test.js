
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserError,
} from '../actions';
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
} from '../constants';

describe('SignUpPage actions', () => {
  describe('signUpUser', () => {
    it('has a type of SIGNUP_USER', () => {
      const email = 'email@email.com';
      const password = 'myPassword';
      const expected = {
        type: SIGNUP_USER,
        email,
        password,
      };
      expect(signUpUser({ email, password })).toEqual(expected);
    });
  });

  describe('signUpUserSuccess', () => {
    it('has a type of SIGNUP_USER', () => {
      const expected = {
        type: SIGNUP_USER_SUCCESS,
      };
      expect(signUpUserSuccess()).toEqual(expected);
    });
  });

  describe('signUpUserError', () => {
    it('has a type of SIGNUP_USER', () => {
      const errorMsg = 'Something went wrong.';
      const expected = {
        type: SIGNUP_USER_ERROR,
        errorMsg,
      };
      expect(signUpUserError(errorMsg)).toEqual(expected);
    });
  });
});
