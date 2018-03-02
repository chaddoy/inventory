/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CURRENT_USER,
} from './constants';

const initialState = fromJS({
  authenticated: false,
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return state
        .set('authenticated', true)
        .set('user', action.user);

    default:
      return state;
  }
}

export default appReducer;
