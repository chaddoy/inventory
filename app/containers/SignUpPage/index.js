/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Row, Col } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import SignUpForm from 'components/SignUpForm';

import { signUpUser } from './actions';
import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="Description of SignUpPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Row>
          <Col xs={1} sm={1} md={1} lg={2} xl={6}></Col>
          <Col xs={22} sm={22} md={22} lg={20} xl={12}>
            <Card
              title="Register"
              style={{ margin: 'auto' }}
              bodyStyle={{ paddingBottom: '0px' }}
            >
              <SignUpForm
                signUp={this.props.handleSignUp}
              />
            </Card>
          </Col>
          <Col xs={1} sm={1} md={1} lg={2} xl={6}></Col>
        </Row>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signuppage: makeSelectSignUpPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSignUp: (creds) => dispatch(signUpUser(creds)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpPage', reducer });
const withSaga = injectSaga({ key: 'signUpPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignUpPage);
