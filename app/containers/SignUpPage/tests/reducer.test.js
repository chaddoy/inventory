import { fromJS } from 'immutable';
import signUpPageReducer from '../reducer';

import {
  signUpUser,
  signUpUserSuccess,
  signUpUserError,
} from '../actions';

describe('signUpPageReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      signingUp: false,
      signUpError: null,
    });
  });

  it('returns the initial state', () => {
    expect(signUpPageReducer(undefined, {})).toEqual(state);
  });

  it('should handle the signUpUser action correctly', () => {
    const creds = {
      email: 'admin',
      password: 'admin',
    };
    const expectedResult = state
      .set('signingUp', true)
      .set('signUpError', null);
    expect(signUpPageReducer(state, signUpUser(creds)))
      .toEqual(expectedResult);
  });

  it('should handle the signUpUserSuccess action correctly', () => {
    const expectedResult = state
      .set('signingUp', false)
      .set('signUpError', null);
    expect(signUpPageReducer(state, signUpUserSuccess()))
      .toEqual(expectedResult);
  });

  it('should handle the signUpUserError action correctly', () => {
    const errorMsg = 'Something went wrong';
    const expectedResult = state
      .set('signingUp', false)
      .set('signUpError', errorMsg);
    expect(signUpPageReducer(state, signUpUserError(errorMsg)))
      .toEqual(expectedResult);
  });
});
