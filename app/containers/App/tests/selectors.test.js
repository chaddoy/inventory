import { fromJS } from 'immutable';

import {
  makeSelectLocation,
  makeSelectAuthenticating,
  makeSelectAuthenticated,
  makeSelectMessageToUser,
} from 'containers/App/selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(makeSelectLocation()(mockedState)).toEqual(route.get('location').toJS());
  });
});

describe('makeSelectAuthenticating', () => {
  it('should select the app/authenticating', () => {
    const app = fromJS({
      authenticating: false,
    });
    const mockedState = fromJS({
      app,
    });
    expect(makeSelectAuthenticating()(mockedState)).toEqual(app.get('authenticating'));
  });
});

describe('makeSelectAuthenticated', () => {
  it('should select the app/authenticated', () => {
    const app = fromJS({
      authenticated: false,
    });
    const mockedState = fromJS({
      app,
    });
    expect(makeSelectAuthenticated()(mockedState)).toEqual(app.get('authenticated'));
  });
});

describe('makeSelectMessageToUser', () => {
  it('should select the app/messageToUser', () => {
    const app = fromJS({
      messageToUser: false,
    });
    const mockedState = fromJS({
      app,
    });
    expect(makeSelectMessageToUser()(mockedState)).toEqual(app.get('messageToUser'));
  });
});
