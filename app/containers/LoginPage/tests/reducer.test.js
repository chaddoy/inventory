import { fromJS } from 'immutable';

import loginPageReducer from '../reducer';
import {
  login,
  loginUser,
  loginError,
} from '../actions';

describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loggingIn: false,
      errorMsg: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the login action correctly', () => {
    const creds = {
      username: 'jbrennan',
      password: 'secret',
    };
    const expectedResult = state
      .set('loggingIn', true)
      .set('errorMsg', '');
    expect(loginPageReducer(state, login(creds))).toEqual(expectedResult);
  });

  it('should handle the loginUser action correctly', () => {
    const creds = {
      username: 'jbrennan',
      password: 'secret',
    };
    const expectedResult = state
      .set('loggingIn', false)
      .set('errorMsg', '');
    expect(loginPageReducer(state, loginUser(creds))).toEqual(expectedResult);
  });

  it('should handle the loginError action correctly', () => {
    const errorMsg = 'This is an error message.';
    const expectedResult = state
      .set('loggingIn', false)
      .set('errorMsg', errorMsg);
    expect(loginPageReducer(state, loginError(errorMsg))).toEqual(expectedResult);
  });
});
