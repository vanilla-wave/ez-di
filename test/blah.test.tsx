import { shallow } from 'enzyme';
import * as React from 'react';
import { Thing } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Thing/>);

    expect(wrapper.exists('div')).toBeTruthy()
  });
});
