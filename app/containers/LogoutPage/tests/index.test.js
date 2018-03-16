import React from 'react';
import { shallow } from 'enzyme';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';
import { Redirect } from 'react-router-dom';

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
    logOutSpy.mockReset();
    logOutSpy.mockRestore();
  });

  it('should dispatch `logOut` on mount', () => {
    const newProps = Object.assign({}, props, {
      authenticated: false,
      user: null,
    });
    const wrapper = shallow(<LogoutPage {...newProps} />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
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
