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
import { Switch, Route } from 'react-router-dom';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const userIsAuthenticated = connectedRouterRedirect({
   // The url to redirect user to if they fail
  redirectPath: '/login',
   // If selector is true, wrapper will not redirect
   // For example let's check that state contains user data
  authenticatedSelector: (state) => state.get('app').get('authenticated'),
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={userIsAuthenticated(HomePage)} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
