import React from 'react';
import { shallow } from 'enzyme';

import { PublicLayout } from '../index';

describe('<PublicLayout />', () => {
  it('should render a component inside `PublicLayout`', () => {
    const wrapper = shallow(
      <PublicLayout>
        <div className="child-component">
          Test
        </div>
      </PublicLayout>
    );
    expect(wrapper.find('.child-component')).toHaveLength(1);
  });
});
