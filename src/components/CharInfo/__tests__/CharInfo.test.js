import React from 'react';
import { shallow } from 'enzyme';
import CharInfo from './';

it('Test example', () => {
  const wrapper = shallow(<CharInfo />);
  expect(wrapper.is('ul')).toBeTruthy();
});
