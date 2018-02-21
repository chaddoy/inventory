import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'antd';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { login } from '../actions';
import { LoginPage, mapDispatchToProps } from '../index';

describe('<LoginPage />', () => {
  it('should render LoginPage', () => {
    const WrappedForm = Form.create()(LoginPage);
    const wrapper = mountWithIntl(
      <WrappedForm />
    );

    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should display empty fields error message', () => {
    const WrappedForm = Form.create()(LoginPage);
    const wrapper = mountWithIntl(
      <WrappedForm />
    );

    wrapper.find('.loginpage-form').first().simulate('submit');
    expect(wrapper.find('.ant-form-explain')
      .first().text()).toEqual('Please input your username!');
    expect(wrapper.find('.ant-form-explain')
      .last().text()).toEqual('Please input your Password!');
  });

  it('should call `onLogin` if credentials are valid', () => {
    const onLoginSpy = jest.fn();
    const WrappedForm = Form.create()(LoginPage);
    const wrapper = mountWithIntl(
      <WrappedForm onLogin={onLoginSpy} />
    );

    wrapper.node.setFieldsInitialValue({
      username: 'jbrennan',
      password: 'secret',
    });
    wrapper.find('.loginpage-form').first().simulate('submit');
    expect(onLoginSpy).toHaveBeenCalledTimes(1);
  });

  it.skip('should redirect to homepage if logged in already', () => {
    const WrappedForm = Form.create()(LoginPage);
    const loggedIn = true;
    const wrapper = shallow(
      <WrappedForm loggedIn={loggedIn} />
    );
    expect(wrapper.find('form')).toHaveLength(0);
  });

  describe('mapDispatchToProps', () => {
    describe('onLogin', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onLogin).toBeDefined();
      });

      it('should dispatch login when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const creds = {
          username: 'jbrennan',
          password: 'secret',
        };
        result.onLogin(creds);
        expect(dispatch).toHaveBeenCalledWith(login(creds));
      });
    });
  });
});
