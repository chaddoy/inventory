import { fromJS } from 'immutable';

import { makeSelectLocation, makeSelectAuthenticated } from 'containers/App/selectors';

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
