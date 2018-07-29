import React from 'react';
import { shallow } from 'enzyme';
import GameLoading from './';

it('Test example', () => {
  const wrapper = shallow(<GameLoading />);
  expect(wrapper.is('ul')).toBeTruthy();
});
