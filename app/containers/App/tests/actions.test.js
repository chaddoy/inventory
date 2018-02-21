import {
  SET_CURRENT_USER,
} from '../constants';

import {
  setCurrentUser,
} from '../actions';

describe('App Actions', () => {
  describe('setCurrentUser', () => {
    it('should return the correct type and user info', () => {
      const user = {
        firstName: 'James',
        lastName: 'Brennan',
      };
      const expectedResult = {
        type: SET_CURRENT_USER,
        user,
      };
      expect(setCurrentUser(user)).toEqual(expectedResult);
    });
  });
});
