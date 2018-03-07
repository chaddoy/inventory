/**
 *
 * LogoutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectAuthenticated,
  makeSelectUser,
} from 'containers/App/selectors';
import { unsetUserAuth } from 'containers/App/actions';

import messages from './messages';

export class LogoutPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    if (!this.props.user && !this.props.authenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="logoutpage-wrapper">
        <Helmet>
          <title>Logging out...</title>
          <meta name="description" content="Description of LogoutPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

LogoutPage.propTypes = {
  logOut: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authenticated: makeSelectAuthenticated(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(unsetUserAuth()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(LogoutPage);
