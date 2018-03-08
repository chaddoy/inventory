/**
*
* LayoutSidebar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Menu } from 'antd';
import FontAwesome from 'react-fontawesome';

class LayoutSidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { navs } = this.props;
    return (
      <div>
        <div className="adminlayout-logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']}>
          {navs.map((nav) => (
            <Menu.Item key={nav.path}>
              <FontAwesome className="padding-10 pad-right" name={nav.icon} />
              <span className="nav-text">{nav.displayName}</span>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}

LayoutSidebar.propTypes = {
  navs: PropTypes.array.isRequired,
};

export default LayoutSidebar;
