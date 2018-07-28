import React from 'react';
import { shallow } from 'enzyme';
import QuizItem from './';

it('Test example', () => {
  const wrapper = shallow(<QuizItem />);
  expect(wrapper.is('ul')).toBeTruthy();
});
