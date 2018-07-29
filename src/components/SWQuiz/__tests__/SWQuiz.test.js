import React from 'react';
import { shallow } from 'enzyme';
import SWQuiz from '../';

it('Test example', () => {
  const wrapper = shallow(<SWQuiz />);
  expect(wrapper.is('ul')).toBeTruthy();
});
