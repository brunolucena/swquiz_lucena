import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../';

it('Test example', () => {
  const wrapper = shallow(<Pagination />);
  expect(wrapper.is('ul')).toBeTruthy();
});
