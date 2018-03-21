import React from 'react';
import { mountWithIntl } from 'helpers/intl-enzyme-test-helper';

import { PrivateLayout } from '../index';

describe('<PrivateLayout />', () => {
  it('should render a Component inside `PrivateLayout`', () => {
    const wrapper = mountWithIntl(
      <PrivateLayout navs={[]}>
        <div className="child-component">
          Test
        </div>
      </PrivateLayout>
    );
    expect(wrapper.find('#component-wrapper').text()).toEqual('Test');
  });
});
