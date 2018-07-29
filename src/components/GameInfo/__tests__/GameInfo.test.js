import React from 'react';
import { shallow } from 'enzyme';
import GameInfo from './';

it('Test example', () => {
  const wrapper = shallow(<GameInfo />);
  expect(wrapper.is('ul')).toBeTruthy();
});
