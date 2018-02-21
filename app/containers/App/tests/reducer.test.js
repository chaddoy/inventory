import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  setCurrentUser,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loggedIn: false,
      user: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setCurrentUser action correctly', () => {
    const user = {
      firstName: 'James',
      lastName: 'Brennan',
    };
    const expectedResult = state
      .set('loggedIn', true)
      .set('user', user);
    expect(appReducer(state, setCurrentUser(user))).toEqual(expectedResult);
  });
});
