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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Card, Row, Col } from 'antd';

import injectSaga from 'utils/injectSaga';
import {
  makeSelectAuthenticated,
  makeSelectAuthenticating,
} from 'containers/App/selectors';
import { checkUserAuth } from 'containers/App/actions';
import saga from './saga';
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

    if (this.props.authenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="loginpage-wrapper">
        <div className="loginpage">
          <Helmet>
            <title>Login</title>
            <meta name="description" content="Description of Login" />
          </Helmet>

          <Row>
            <Col xs={1} sm={4} md={6} lg={7} xl={9}></Col>
            <Col xs={22} sm={16} md={12} lg={10} xl={6}>
              <Card
                title="Login"
                style={{ margin: 'auto' }}
                bodyStyle={{ paddingBottom: '0px' }}
              >
                <Form onSubmit={this.handleSubmit} className="loginpage-form">
                  <FormItem>
                    {getFieldDecorator('email', {
                      rules: [{
                        required: true,
                        message: 'Please input your email',
                      }, {
                        type: 'email',
                        message: 'Invalid email address',
                      }],
                    })(
                      <Input
                        prefix={(
                          <Icon
                            type="mail"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        )}
                        placeholder="Email"
                        size="large"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true,
                        message: 'Please input your password',
                      }],
                    })(
                      <Input
                        prefix={(
                          <Icon
                            type="lock"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        )}
                        type="password"
                        placeholder="Password"
                        size="large"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginpage-form-button"
                      loading={this.props.authenticating}
                      size="large"
                    >
                      Log in
                    </Button>
                    <a className="loginpage-form-forgot" href="">
                      Forgot password
                    </a>
                  </FormItem>
                </Form>
              </Card>
            </Col>
            <Col xs={1} sm={4} md={6} lg={7} xl={9}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  authenticating: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticating: makeSelectAuthenticating(),
  authenticated: makeSelectAuthenticated(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLogin: (creds) => dispatch(checkUserAuth(creds)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(Form.create()(LoginPage));
