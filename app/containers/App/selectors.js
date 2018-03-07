import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const selectApp = (state) => state.get('app');

const makeSelectAuthenticating = () => createSelector(
  selectApp,
  (routeState) => routeState.get('authenticating'),
);

const makeSelectAuthenticated = () => createSelector(
  selectApp,
  (routeState) => routeState.get('authenticated'),
);

const makeSelectMessageToUser = () => createSelector(
  selectApp,
  (routeState) => routeState.get('messageToUser'),
);

const makeSelectUser = () => createSelector(
  selectApp,
  (routeState) => routeState.get('user'),
);

export {
  makeSelectLocation,
  makeSelectAuthenticating,
  makeSelectAuthenticated,
  makeSelectMessageToUser,
  makeSelectUser,
};
