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
      signUpSuccess: false,
      signUpError: false,
      messageToUser: '',
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
      .set('signUpSuccess', false)
      .set('signUpError', false)
      .set('messageToUser', '');
    expect(signUpPageReducer(state, signUpUser(creds)))
      .toEqual(expectedResult);
  });

  it('should handle the signUpUserSuccess action correctly', () => {
    const msgToUser = 'Something went wrong';
    const expectedResult = state
      .set('signingUp', false)
      .set('signUpSuccess', true)
      .set('signUpError', false)
      .set('messageToUser', msgToUser);
    expect(signUpPageReducer(state, signUpUserSuccess(msgToUser)))
      .toEqual(expectedResult);
  });

  it('should handle the signUpUserError action correctly', () => {
    const errorMsg = 'Something went wrong';
    const expectedResult = state
      .set('signingUp', false)
      .set('signUpSuccess', false)
      .set('signUpError', true)
      .set('messageToUser', errorMsg);
    expect(signUpPageReducer(state, signUpUserError(errorMsg)))
      .toEqual(expectedResult);
  });
});
