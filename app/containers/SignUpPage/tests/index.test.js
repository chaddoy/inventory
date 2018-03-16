import React from 'react';
import { shallowWithIntl } from 'helpers/intl-enzyme-test-helper';

import SignUpForm from 'components/SignUpForm';
import { signUpUser } from '../actions';
import { SignUpPage, mapDispatchToProps } from '../index';

describe('<SignUpPage />', () => {
  it('should contain `SignUpForm` component', () => {
    const props = { handleSignUp: jest.fn() };
    const wrapper = shallowWithIntl(<SignUpPage {...props} />);
    expect(wrapper.contains(<SignUpForm signUp={props.handleSignUp} />)).toBe(true);
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
