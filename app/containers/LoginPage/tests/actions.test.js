import {
  LOGIN,
  LOGIN_USER,
  LOGIN_ERROR,
} from '../constants';

import {
  login,
  loginUser,
  loginError,
} from '../actions';

describe('LoginPage Actions', () => {
  describe('login', () => {
    it('should return the correct type and credentials', () => {
      const creds = {
        username: 'jbrennan',
        password: 'secret',
      };
      const expectedResult = {
        type: LOGIN,
        ...creds,
      };
      expect(login(creds)).toEqual(expectedResult);
    });
  });

  describe('loginUser', () => {
    it('should return the correct type and user info', () => {
      const expectedResult = {
        type: LOGIN_USER,
      };
      expect(loginUser()).toEqual(expectedResult);
    });
  });

  describe('loginError', () => {
    it('should return the correct type and user info', () => {
      const errorMsg = 'This is an error message.';
      const expectedResult = {
        type: LOGIN_ERROR,
        errorMsg,
      };
      expect(loginError(errorMsg)).toEqual(expectedResult);
    });
  });
});
