/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import PublicLayout from 'containers/PublicLayout/Loadable';
import AdminLayout from 'containers/AdminLayout/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LogoutPage from 'containers/LogoutPage/Loadable';

import { NAVS } from './constants';

export const authenticatedSelector = (state) =>
  state.get('app').get('authenticated');

const userIsAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/login',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout navs={NAVS}>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default function App() {
  return (
    <div>
      <Switch>
        <AppRoute exact path="/login" layout={PublicLayout} component={LoginPage} />
        <AppRoute exact path="/" layout={AdminLayout} component={userIsAuthenticated(HomePage)} />
        <AppRoute exact path="/signup" layout={PublicLayout} component={SignUpPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <AppRoute path="" layout={PublicLayout} component={NotFoundPage} />
      </Switch>
    </div>
  );
}

AppRoute.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
};
