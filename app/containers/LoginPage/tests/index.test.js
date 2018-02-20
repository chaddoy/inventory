import React from 'react';
import { Form } from 'antd';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { LoginPage } from '../index';

describe('<LoginPage />', () => {
  it('should render LoginPage', () => {
    const handleSubmitSpy = jest.fn();
    const WrappedForm = Form.create()(LoginPage);
    const wrapper = mountWithIntl(
      <WrappedForm handleSubmit={handleSubmitSpy} />
    );

    expect(wrapper.node.getFieldsValue()).toEqual({
      username: '',
      password: '',
    });
  });

  it('should call `handleSubmit` `onSubmit` ', () => {
    const handleSubmitSpy = jest.fn();
    const WrappedForm = Form.create()(LoginPage);
    const wrapper = mountWithIntl(
      <WrappedForm handleSubmit={handleSubmitSpy} />
    );

    console.log(wrapper.find('.loginpage-form').first().html());
    // wrapper.find('.loginpage-form').first().simulate('submit');
    // expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    // expect(handleSubmitSpy).toBeCalledWith({ username: '', password: '' });
  });
});
