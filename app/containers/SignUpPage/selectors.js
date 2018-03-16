import { createSelector } from 'reselect';

/**
 * Direct selector to the signUpPage state domain
 */
const selectSignUpPageDomain = (state) => state.get('signUpPage');

/**
 * Other specific selectors
 */
const makeSelectSigningUp = () => createSelector(
  selectSignUpPageDomain,
  (substate) => substate.get('signingUp')
);

const makeSelectSignUpError = () => createSelector(
  selectSignUpPageDomain,
  (substate) => substate.get('signUpError')
);

/**
 * Default selector used by SignUpPage
 */

const makeSelectSignUpPage = () => createSelector(
  selectSignUpPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSignUpPage;
export {
  selectSignUpPageDomain,
  makeSelectSigningUp,
  makeSelectSignUpError,
};
