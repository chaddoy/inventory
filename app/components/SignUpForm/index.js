/**
*
* SignUpForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Col, Button } from 'antd';
// import styled from 'styled-components';

import { FORM_ITEM_LAYOUT } from './constants';

const FormItem = Form.Item;

class SignUpForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <FormItem {...FORM_ITEM_LAYOUT} label="Email">
          {getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }, {
              required: true,
              message: 'Please input your email.',
            }],
          })(
            <Input className="signupform-email" size="large" />
          )}
        </FormItem>

        <FormItem {...FORM_ITEM_LAYOUT} label="Password">
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Please input your password.',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input
              className="signupform-password"
              type="password"
              size="large"
            />
          )}
        </FormItem>

        <FormItem {...FORM_ITEM_LAYOUT} label="Confirm Password">
          {getFieldDecorator('confirmPassword', {
            rules: [{
              required: true,
              message: 'Please input your confirm password.',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input
              className="signupform-confirm"
              type="password"
              size="large"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        <FormItem>
          <Col xs={24} sm={24} md={0} lg={0}>
            <Button
              type="primary"
              htmlType="submit"
              className="pull-right"
              size="large"
              style={{ width: '100%' }}
            >
              Submit
            </Button>
          </Col>
          <Col xs={0} sm={0} md={24} lg={24}>
            <Button
              className="pull-right"
              type="primary"
              htmlType="submit"
              size="large"
            >
              Submit
            </Button>
          </Col>
        </FormItem>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  form: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

export default Form.create()(SignUpForm);
