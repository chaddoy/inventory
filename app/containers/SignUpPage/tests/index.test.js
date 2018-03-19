import React from 'react';
import { shallowWithIntl } from 'helpers/intl-enzyme-test-helper';

import SignUpForm from 'components/SignUpForm';
import { signUpUser } from '../actions';
import { SignUpPage, mapDispatchToProps } from '../index';

describe('<SignUpPage />', () => {
  let props;
  beforeEach(() => {
    props = {
      handleSignUp: jest.fn(),
      signuppage: {
        signingUp: false,
        signUpSuccess: false,
        signUpError: false,
        messageToUser: '',
      },
    };
  });

  it('should contain `SignUpForm` component', () => {
    const wrapper = shallowWithIntl(<SignUpPage {...props} />);
    const {
      signingUp,
      signUpSuccess,
      signUpError,
      messageToUser,
    } = props.signuppage;
    expect(wrapper.contains(
      <SignUpForm
        signUp={props.handleSignUp}
        saving={signingUp}
        isSuccess={signUpSuccess}
        hasError={signUpError}
        msgToUser={messageToUser}
      />
    )).toBe(true);
  });

  describe('mapDispatchToProps', () => {
    describe('handleSignUp', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.handleSignUp).toBeDefined();
      });

      it('should dispatch signUpUser when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const creds = {
          email: 'email@email.com',
          password: 'myPassword',
        };
        result.handleSignUp(creds);
        expect(dispatch).toHaveBeenCalledWith(signUpUser(creds));
      });
    });
  });
});
