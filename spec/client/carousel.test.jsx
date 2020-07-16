import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import axios from 'axios';
import CarouselEntry from '../../client/components/carouselEntry.jsx';
import Carousel from '../../client/components/carousel.jsx';

configure({adapter: new Adapter()})

jest.mock('axios');

describe('carouselEntry component', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      entry: [
        {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      ],
      length: 12,
      animate: '',
    };
    const wrapper = shallow(<CarouselEntry {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})


describe('carousel component', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      entry: [
        {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      ],
      length: 12,
      animate: '',
      leader: [
        {_id: 5, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 6, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 7, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 8, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      ],
      lagger: [
        {_id: 9, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 10, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 11, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 12, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      ],
    };
    const wrapper = shallow(<CarouselEntry {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})

