import React from 'react';
import { mount } from 'enzyme';

import { AdminLayout } from '../index';

describe('<AdminLayout />', () => {
  it('should render a Component inside `AdminLayout`', () => {
    const wrapper = mount(
      <AdminLayout>
        <div className="child-component">
          Test
        </div>
      </AdminLayout>
    );
    expect(wrapper.find('#component-wrapper').text()).toEqual('Test');
  });
});
