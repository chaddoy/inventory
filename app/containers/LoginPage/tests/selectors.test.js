import { fromJS } from 'immutable';

import {
  selectLoginPageDomain,
  makeSelectLoggingIn,
  makeSelectLoginErrorMsg,
  makeSelectLoginPage,
} from '../selectors';

describe('selectLoginPageDomain', () => {
  it('should select the LoginPage state', () => {
    const loginPageState = fromJS({
      loggingIn: false,
      errorMsg: '',
    });
    const mockedState = fromJS({
      loginPage: loginPageState,
    });
    expect(selectLoginPageDomain(mockedState)).toEqual(loginPageState);
  });
});

describe('makeSelectLoggingIn', () => {
  const selector = makeSelectLoggingIn();
  it('should select the loggingIn', () => {
    const mockedState = fromJS({
      loginPage: {
        loggingIn: false,
      },
    });
    expect(selector(mockedState)).toEqual(false);
  });
});

describe('makeSelectLoginErrorMsg', () => {
  const selector = makeSelectLoginErrorMsg();
  it('should select the errorMsg', () => {
    const mockedState = fromJS({
      loginPage: {
        errorMsg: 'This is an error message.',
      },
    });
    expect(selector(mockedState)).toEqual('This is an error message.');
  });
});

describe('makeSelectLoginPage', () => {
  const selector = makeSelectLoginPage();
  it('should select the loginPage', () => {
    const data = {
      loggingIn: false,
    };
    const mockedState = fromJS({
      loginPage: {
        ...data,
      },
    });
    expect(selector(mockedState)).toEqual(data);
  });
});
