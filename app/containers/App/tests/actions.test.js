import {
  SET_USER_AUTH,
} from '../constants';

import {
  setUserAuth,
} from '../actions';

describe('App Actions', () => {
  describe('setUserAuth', () => {
    it('should return the correct type and user info', () => {
      const user = {
        username: 'admin',
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
});
