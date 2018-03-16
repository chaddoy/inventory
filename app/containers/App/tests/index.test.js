import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { fromJS } from 'immutable';

import App, { AppRoute, authenticatedSelector } from '../index';

describe('<App />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(AppRoute).length).not.toBe(0);
  });

  it('should render `AppRoute`\'s `Component` inside `Layout`', () => {
    const Layout = (props) => <div className="layout">{props.children}</div>;
    const Component = () => <div className="component">Component</div>;
    Layout.propTypes = { children: PropTypes.object };
    const renderedComponent = mount(
      <Router>
        <AppRoute layout={Layout} component={Component} />
      </Router>
    );
    expect(renderedComponent.find('.component')).toHaveLength(1);
  });

  describe('authenticatedSelector', () => {
    it('should select `authenticated` state', () => {
      const state = fromJS({
        app: { authenticated: true },
      });
      expect(authenticatedSelector(state)).toBeTruthy();
    });
  });
});
