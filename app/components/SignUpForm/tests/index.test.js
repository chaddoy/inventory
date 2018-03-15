import React from 'react';
import { mount, shallow } from 'enzyme';
import { Form } from 'antd';

import SignUpForm from '../index';

describe('<SignUpForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      register: jest.fn(),
    };
  });

  it('should render component', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    expect(wrapper.find(Form)).toHaveLength(1);
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
      .toEqual('Two passwords that you enter is inconsistent!');
  });

  it('should force the `confirmPassword` field to validate', () => {
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({ password: 'myPassword' });
    wrapper.find('.signupform-confirm').first().simulate('blur', {
      target: { value: 'myConfirmPassword' },
    });
    wrapper.find('.signupform-password').simulate('change');
    expect(wrapper.find('.ant-form-explain').first().text())
      .toEqual('Please input your confirm password.');
  });

  it('should change `confirmDirty` state `onBlur`', () => {
    const wrapper = shallow(<SignUpForm {...props} />).shallow();
    wrapper.find('.signupform-confirm').first().simulate('blur', {
      target: { value: 'myConfirmPassword' },
    });
    expect(wrapper.state('confirmDirty')).toEqual(true);
  });

  it('should NOT call `register` if form is INVALID on `handleSubmit`', () => {
    const registerSpy = jest.spyOn(props, 'register');
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.find('form').first().simulate('submit');
    expect(registerSpy).toHaveBeenCalledTimes(0);
    registerSpy.mockReset();
    registerSpy.mockRestore();
  });
  //
  it('should call `register` if form is VALID on `handleSubmit`', () => {
    const registerSpy = jest.spyOn(props, 'register');
    const wrapper = mount(<SignUpForm {...props} />);
    wrapper.node.setFieldsValue({
      email: 'email@email.com',
      password: 'myPassword',
      confirmPassword: 'myPassword',
    });
    wrapper.find('form').first().simulate('submit');
    expect(registerSpy).toHaveBeenCalledTimes(1);
    registerSpy.mockReset();
    registerSpy.mockRestore();
  });
});
