import React from 'react';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { AdminLayout } from '../index';

describe('<AdminLayout />', () => {
  it('should render a Component inside `AdminLayout`', () => {
    const wrapper = mountWithIntl(
      <AdminLayout>
        <div className="child-component">
          Test
        </div>
      </AdminLayout>
    );
    expect(wrapper.find('#component-wrapper').text()).toEqual('Test');
  });
});
