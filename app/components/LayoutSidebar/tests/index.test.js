import React from 'react';
import { shallow } from 'enzyme';
import FontAwesome from 'react-fontawesome';

import LayoutSidebar from '../index';

const navs = [{
  path: '/',
  displayName: 'Display Name',
  icon: 'user-o',
}];

describe('<LayoutSidebar />', () => {
  it('should display 1 sidebar', () => {
    const wrapper = shallow(<LayoutSidebar navs={navs} />);
    expect(wrapper.find(FontAwesome)).toHaveLength(1);
  });
});
