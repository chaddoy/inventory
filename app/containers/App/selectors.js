import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const selectApp = (state) => state.get('app');

const makeSelectLoggedIn = () => createSelector(
  selectApp,
  (routeState) => routeState.get('loggedIn'),
);

export {
  makeSelectLocation,
  makeSelectLoggedIn,
};
