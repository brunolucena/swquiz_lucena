import React from 'react';
import { shallow } from 'enzyme';
import Ranking from './';

it('Test example', () => {
  const wrapper = shallow(<Ranking />);
  expect(wrapper.is('ul')).toBeTruthy();
});
