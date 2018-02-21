/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLoggedIn } from 'containers/App/selectors';
import { makeSelectLoggingIn, makeSelectLoginErrorMsg } from './selectors';
import { login } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './styles';

const FormItem = Form.Item;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLogin(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Helmet>
          <title>LoginPage</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Form onSubmit={this.handleSubmit} className="loginpage-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input your username!',
              }],
              initialValue: '',
            })(
              <Input
                prefix={(
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                )}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input your Password!',
              }],
              initialValue: '',
            })(
              <Input
                prefix={(
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                )}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="loginpage-form-button"
            >
              Log in
            </Button>
            <a className="loginpage-form-forgot" href="">Forgot password</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggingIn: makeSelectLoggingIn(),
  errorMsg: makeSelectLoginErrorMsg(),
  loggedIn: makeSelectLoggedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLogin: (creds) => dispatch(login(creds)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Form.create()(LoginPage));
