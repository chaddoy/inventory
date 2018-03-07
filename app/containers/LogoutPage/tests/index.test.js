import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { unsetUserAuth } from 'containers/App/actions';
import { LogoutPage, mapDispatchToProps } from '../index';

describe('<LogoutPage />', () => {
  let props;

  beforeEach(() => {
    props = {
      logOut: jest.fn(),
      authenticated: true,
      user: {},
    };
  });

  it('should dispatch `logOut` on mount', () => {
    const logOutSpy = jest.spyOn(props, 'logOut');
    mountWithIntl(<LogoutPage {...props} />);
    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch `logOut` on mount', () => {
    props.authenticated = false;
    props.user = null;
    const wrapper = mountWithIntl(
      <Router>
        <LogoutPage {...props} />
      </Router>
    );
    expect(wrapper.find('.logoutpage-wrapper')).toHaveLength(0);
  });

  describe('mapDispatchToProps', () => {
    describe('logOut', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.logOut).toBeDefined();
      });

      it('should dispatch unsetUserAuth when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.logOut();
        expect(dispatch).toHaveBeenCalledWith(unsetUserAuth());
      });
    });
  });
});
