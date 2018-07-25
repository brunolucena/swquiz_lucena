import React from 'react';
import { shallow } from 'enzyme';
import Timer from '../';

it('Test example', () => {
  const wrapper = shallow(<Timer />);
  expect(wrapper.is('ul')).toBeTruthy();
});
