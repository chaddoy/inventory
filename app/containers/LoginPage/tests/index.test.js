import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form } from 'antd';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { checkUserAuth } from 'containers/App/actions';
import { LoginPage, mapDispatchToProps } from '../index';

describe('<LoginPage />', () => {
  let WrappedForm;
  let wrapper;
  const props = {
    onLogin: jest.fn(),
    authenticated: false,
    authenticating: false,
  };

  beforeEach(() => {
    WrappedForm = Form.create()(LoginPage);
    wrapper = mountWithIntl(
      <WrappedForm {...props} />
    );
  });

  it('should render LoginPage', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('should display empty fields error message', () => {
    wrapper.find('.loginpage-form').first().simulate('submit');
    expect(wrapper.find('.ant-form-explain')
      .first().text()).toEqual('Please input your username!');
    expect(wrapper.find('.ant-form-explain')
      .last().text()).toEqual('Please input your Password!');
  });

  it('should call `onLogin` if credentials are valid', () => {
    wrapper.node.setFieldsInitialValue({
      username: 'jbrennan',
      password: 'secret',
    });
    wrapper.find('.loginpage-form').first().simulate('submit');
    expect(props.onLogin).toHaveBeenCalledTimes(1);
  });

  it('should redirect to homepage if logged in already', () => {
    const newProps = Object.assign(props, { authenticated: true });
    wrapper = mountWithIntl(
      <Router>
        <WrappedForm {...newProps} />
      </Router>
    );
    expect(wrapper.find('.loginpage-form').first()).toHaveLength(0);
  });
});

describe('mapDispatchToProps', () => {
  describe('onLogin', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.onLogin).toBeDefined();
    });

    it('should dispatch checkUserAuth when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const creds = {
        username: 'jbrennan',
        password: 'secret',
      };
      result.onLogin(creds);
      expect(dispatch).toHaveBeenCalledWith(checkUserAuth(creds));
    });
  });
});
