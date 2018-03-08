/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const CHECK_USER_AUTH = 'app/App/CHECK_USER_AUTH';
export const SET_USER_AUTH = 'app/App/SET_USER_AUTH';
export const ERROR_USER_AUTH = 'app/App/ERROR_USER_AUTH';
export const UNSET_USER_AUTH = 'app/App/UNSET_USER_AUTH';

export const NAVS = [{
  path: '/',
  displayName: 'Dashboard',
  name: 'dashboard',
  icon: 'dashboard',
}, {
  path: '/users',
  displayName: 'Users',
  name: 'users',
  icon: 'user-o',
}];
