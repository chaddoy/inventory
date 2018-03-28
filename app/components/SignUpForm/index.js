/**
*
* SignUpForm
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Alert, Input, Col, Button, Icon, Divider, Radio } from 'antd';
// import styled from 'styled-components';

import { FORM_ITEM_LAYOUT, SUCCESS_MSG, SUCCESS_DESC } from './constants';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SignUpForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signUp(values);
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
    const validLength = value && value.length >= 6;
    if (validLength && value !== form.getFieldValue('password')) {
      callback('Passwords did not matched');
    } else {
      callback();
    }
  }

  displayErrorMsg = (hasError, msgToUser) => (
    hasError
      ? (<Alert
        className="text-center"
        message={msgToUser}
        type="error"
      />)
      : null
  )

  render() {
    const { form, saving, isSuccess, hasError, msgToUser } = this.props;
    const { getFieldDecorator } = form;

    if (isSuccess) {
      return (
        <div className="padding-10 pad-bottom">
          <Alert
            message={SUCCESS_MSG}
            description={SUCCESS_DESC}
            type="success"
            showIcon
          />
          <br />
          <Link to="/login" className="padding-10 pad-bottom">
            <Button className="pull-right" type="primary" size="large">
              Login <Icon type="right" />
            </Button>
            <div className="clearfix"></div>
          </Link>
        </div>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Username"
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your first name' },
            ],
          })(
            <Input className="signupform-username" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="First name"
          hasFeedback
        >
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'Please input your first name' },
            ],
          })(
            <Input className="signupform-firstName" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Middle name"
          hasFeedback
        >
          {getFieldDecorator('middleName')(
            <Input className="signupform-middleName" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Last name"
          hasFeedback
        >
          {getFieldDecorator('lastName', {
            rules: [
              { required: true, message: 'Please input your last name' },
            ],
          })(
            <Input className="signupform-lastName" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Radio.Button"
        >
          {getFieldDecorator('gender', {
            rules: [
              { required: true, message: 'Please input your gender' },
            ],
          })(
            <RadioGroup size="large">
              <RadioButton value="male">Male</RadioButton>
              <RadioButton value="female">Female</RadioButton>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Address"
          hasFeedback
        >
          {getFieldDecorator('address', {
            rules: [
              { required: true, message: 'Please input your last name' },
            ],
          })(
            <Input className="signupform-address" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Phone number"
          hasFeedback
        >
          {getFieldDecorator('phoneNumber', {
            rules: [
              { required: true, message: 'Please input your last name' },
              { validator: this.validateToNextPassword },
            ],
          })(
            <Input className="signupform-phoneNumber" size="large" />
          )}
        </FormItem>

        <Divider orientation="right">Login credentials</Divider>
        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Email"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'Invalid email address' },
              { required: true, message: 'Please input your email' },
            ],
          })(
            <Input className="signupform-email" size="large" />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password' },
              { min: 6, message: 'Password should be at least 6 characters' },
              { validator: this.validateToNextPassword },
            ],
          })(
            <Input
              className="signupform-password"
              type="password"
              size="large"
            />
          )}
        </FormItem>

        <FormItem
          {...FORM_ITEM_LAYOUT}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirmPassword', {
            rules: [
              { required: true, message: 'Please input your confirm password' },
              { min: 6, message: 'Password should be at least 6 characters' },
              { validator: this.compareToFirstPassword },
            ],
          })(
            <Input
              className="signupform-confirm"
              type="password"
              size="large"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>

        {this.displayErrorMsg(hasError, msgToUser)}

        <br />

        <FormItem>
          <Col xs={24} sm={24} md={0} lg={0}>
            <Button
              type="primary"
              htmlType="submit"
              className="pull-right"
              size="large"
              style={{ width: '100%' }}
              loading={saving}
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
              loading={saving}
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
  signUp: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  msgToUser: PropTypes.string,
};

export default Form.create()(SignUpForm);
