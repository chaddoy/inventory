import { fromJS } from 'immutable';

import { makeSelectLocation, makeSelectLoggedIn } from 'containers/App/selectors';

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

describe('makeSelectLoggedIn', () => {
  it('should select the app/loggedIn', () => {
    const app = fromJS({
      loggedIn: false,
    });
    const mockedState = fromJS({
      app,
    });
    expect(makeSelectLoggedIn()(mockedState)).toEqual(app.get('loggedIn'));
  });
});
