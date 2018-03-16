import { fromJS } from 'immutable';
import makeSelectSignUpPage,
{
  selectSignUpPageDomain,
  makeSelectSigningUp,
  makeSelectSignUpError,
} from '../selectors';

describe('selectSignUpPageDomain', () => {
  it('should select `signUpPage` state', () => {
    const signUpPage = fromJS({
      signingUp: false,
      signUpError: '',
    });
    const mockedState = fromJS({
      signUpPage,
    });
    expect(selectSignUpPageDomain(mockedState))
      .toEqual(signUpPage);
  });
});

describe('makeSelectSignUpPage', () => {
  it('should select `SignUpPage` state', () => {
    const state = {
      signingUp: false,
      signUpError: '',
    };
    const signUpPage = fromJS(state);
    const mockedState = fromJS({
      signUpPage,
    });
    expect(makeSelectSignUpPage()(mockedState))
      .toEqual(state);
  });
});

describe('makeSelectSigningUp', () => {
  it('should select the signUpPage/signingUp', () => {
    const signUpPage = fromJS({
      signingUp: false,
    });
    const mockedState = fromJS({
      signUpPage,
    });
    expect(makeSelectSigningUp()(mockedState)).toEqual(signUpPage.get('signingUp'));
  });
});

describe('makeSelectSignUpError', () => {
  it('should select the signUpPage/signUpError', () => {
    const signUpPage = fromJS({
      signUpError: '',
    });
    const mockedState = fromJS({
      signUpPage,
    });
    expect(makeSelectSignUpError()(mockedState)).toEqual(signUpPage.get('signUpError'));
  });
});
