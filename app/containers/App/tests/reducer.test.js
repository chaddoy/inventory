import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  checkUserAuth,
  setUserAuth,
  errUserAuth,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      authenticating: false,
      authenticated: false,
      messageToUser: '',
      user: null,
    });

    class LocalStorageMock {
      constructor() {
        this.store = {};
      }

      clear() {
        this.store = {};
      }

      getItem(key) {
        return this.store[key] || null;
      }

      setItem(key, value) {
        this.store[key] = value.toString();
      }

      removeItem(key) {
        delete this.store[key];
      }
    }

    global.localStorage = new (LocalStorageMock)();
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the checkUserAuth action correctly', () => {
    const creds = {
      username: 'admin',
      password: 'admin',
    };
    const expectedResult = state
      .set('authenticating', true)
      .set('authenticated', false);
    expect(appReducer(state, checkUserAuth(creds))).toEqual(expectedResult);
  });

  it('should handle the setUserAuth action correctly', () => {
    const user = {
      firstName: 'James',
      lastName: 'Brennan',
    };
    const expectedResult = state
      .set('authenticated', true)
      .set('user', user);
    expect(appReducer(state, setUserAuth(user))).toEqual(expectedResult);
  });

  it('should handle the errUserAuth action correctly', () => {
    const errorMsg = 'Error message goes here.';
    const expectedResult = state
      .set('messageToUser', errorMsg)
      .set('authenticating', false)
      .set('authenticated', false);
    expect(appReducer(state, errUserAuth(errorMsg))).toEqual(expectedResult);
  });
});
