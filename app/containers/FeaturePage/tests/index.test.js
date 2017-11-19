import React from 'react';
import { shallow } from 'enzyme';

import FeaturePage from '../index';

describe('<FeaturePage />', () => {
  it('should never re-render the component', () => {
    const renderedComponent = shallow(<FeaturePage />);
    const inst = renderedComponent.instance();
    expect(inst.shouldComponentUpdate()).toBe(false);
  });
});
