import React from 'react';
import { shallow } from 'enzyme';
import GameResult from './';

it('Test example', () => {
  const wrapper = shallow(<GameResult />);
  expect(wrapper.is('ul')).toBeTruthy();
});
