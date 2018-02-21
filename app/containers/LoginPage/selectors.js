import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = (state) => state.get('loginPage');

/**
 * Other specific selectors
 */

const makeSelectLoggingIn = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.get('loggingIn')
);

const makeSelectLoginErrorMsg = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.get('errorMsg')
);


/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.toJS()
);

export {
  selectLoginPageDomain,
  makeSelectLoggingIn,
  makeSelectLoginErrorMsg,
  makeSelectLoginPage,
};
