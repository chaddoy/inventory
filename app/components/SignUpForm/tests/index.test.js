import React from 'react';
import { mount, shallow } from 'enzyme';
import { Form } from 'antd';

import SignUpForm from '../index';

describe('<SignUpForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      signUp: jest.fn(),
    };
  });

  it('should render component', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    expect(wrapper.find(Form)).toHaveLength(1);
  });

  it('should inform user that the email is invalid', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({
      email: 'invalidEmail',
    });
    wrapper.find('.signupform-email').simulate('change');
    expect(wrapper.find('.ant-form-explain').first().text())
      .toEqual('Invalid email address');
  });

  it('should inform user that the passwords are not equal', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({
      email: 'email@email.com',
      password: 'myPassword',
      confirmPassword: 'myConfirmPassword',
    });
    wrapper.find('.signupform-confirm').first().simulate('blur', {
      target: { value: 'myConfirmPassword' },
    });
    wrapper.find('.signupform-password').simulate('change');
    expect(wrapper.find('.ant-form-explain').first().text())
      .toEqual('Passwords did not matched');
  });

  it('should force the `confirmPassword` field to validate', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({ password: 'myPassword' });
    wrapper.find('.signupform-confirm').first().simulate('blur', {
      target: { value: 'myConfirmPassword' },
    });
    wrapper.find('.signupform-password').simulate('change');
    expect(wrapper.find('.ant-form-explain').first().text())
      .toEqual('Please input your confirm password');
  });

  it('should change `confirmDirty` state `onBlur`', () => {
    const wrapper = shallow(<SignUpForm {...props} />).shallow();
    wrapper.find('.signupform-confirm').first().simulate('blur', {
      target: { value: 'myConfirmPassword' },
    });
    expect(wrapper.state('confirmDirty')).toEqual(true);
  });

  it('should NOT call `signUp` if form is INVALID on `handleSubmit`', () => {
    const signUpSpy = jest.spyOn(props, 'signUp');
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.find('form').first().simulate('submit');
    expect(signUpSpy).toHaveBeenCalledTimes(0);
    signUpSpy.mockReset();
    signUpSpy.mockRestore();
  });
  //
  it('should call `signUp` if form is VALID on `handleSubmit`', () => {
    const signUpSpy = jest.spyOn(props, 'signUp');
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({
      email: 'email@email.com',
      password: 'myPassword',
      confirmPassword: 'myPassword',
    });
    wrapper.find('form').first().simulate('submit');
    expect(signUpSpy).toHaveBeenCalledTimes(1);
    signUpSpy.mockReset();
    signUpSpy.mockRestore();
  });
});
