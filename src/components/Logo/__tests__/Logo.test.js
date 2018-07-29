import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../';

it('Test example', () => {
  const wrapper = shallow(<Logo />);
  expect(wrapper.is('section')).toBeTruthy();
});
