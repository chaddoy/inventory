/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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

export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSignUp, signuppage } = this.props;
    const {
      signingUp,
      signUpSuccess,
      signUpError,
      messageToUser,
    } = signuppage;

    return (
      <div>
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="Description of SignUpPage" />
        </Helmet>

        <Row>
          <Col xs={1} sm={1} md={1} lg={2} xl={6}></Col>
          <Col xs={22} sm={22} md={22} lg={20} xl={12}>
            <Card
              title="Register"
              style={{ margin: 'auto', marginTop: '20px' }}
              bodyStyle={{ paddingBottom: '0px' }}
            >
              <SignUpForm
                signUp={handleSignUp}
                saving={signingUp}
                isSuccess={signUpSuccess}
                hasError={signUpError}
                msgToUser={messageToUser}
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
  signuppage: PropTypes.object.isRequired,
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
