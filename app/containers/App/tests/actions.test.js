import {
  CHECK_USER_AUTH,
  SET_USER_AUTH,
  ERROR_USER_AUTH,
  UNSET_USER_AUTH,
} from '../constants';

import {
  checkUserAuth,
  setUserAuth,
  errUserAuth,
  unsetUserAuth,
} from '../actions';

describe('App Actions', () => {
  describe('checkUserAuth', () => {
    it('should return the correct type and credentials', () => {
      const email = 'email';
      const password = 'password';
      const expectedResult = {
        type: CHECK_USER_AUTH,
        email,
        password,
      };
      expect(checkUserAuth({ email, password })).toEqual(expectedResult);
    });
  });

  describe('setUserAuth', () => {
    it('should return the correct type and user info', () => {
      const user = {
        email: 'admin',
        password: 'secret',
        firstName: 'Abraham',
        lastName: 'Maslow',
      };
      const expectedResult = {
        type: SET_USER_AUTH,
        user,
      };
      expect(setUserAuth(user)).toEqual(expectedResult);
    });
  });

  describe('errUserAuth', () => {
    it('should return the correct type and error message', () => {
      const errorMsg = 'Error message';
      const expectedResult = {
        type: ERROR_USER_AUTH,
        errorMsg,
      };
      expect(errUserAuth(errorMsg)).toEqual(expectedResult);
    });
  });

  describe('unsetUserAuth', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: UNSET_USER_AUTH,
      };
      expect(unsetUserAuth()).toEqual(expectedResult);
    });
  });
});
