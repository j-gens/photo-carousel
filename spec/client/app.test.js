import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from 'axios';

import App from '../../client/app.jsx';

configure({adapter: new Adapter()})

jest.mock('axios');

describe('App component: basic functionality', () => {
  it('renders without crashing given the required props', () => {
    const images = [
      {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
    ];
    const resp = {data: images};
    axios.get.mockResolvedValue(resp);

    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('fetches data when component mounts', () => {
    const images = [
      {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 5, small_url: '/images/small4.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
    ];
    const resp = {data: images};
    axios.get.mockResolvedValue(resp);

    expect(axios.get).toHaveBeenCalledTimes(1);
  })
})

describe('App component: methods', () => {
  const initialState = {
    carousel: [
      {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 5, small_url: '/images/small4.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
    ],
    noMovies: false,
    carouselOfTetras: [
      [{_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},],
      [{_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 5, small_url: '/images/small4.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},],
    ],
    currentIndex: 0,
    leftIndex: 1,
    rightIndex: 1,
  }

  it('calls handleClick when simulating right button clicks', () => {
    const wrapper = mount(<App />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClick')

    wrapper.setState(initialState, () => {
      wrapper.update();
      wrapper.find('stylesheet__CarouselButtonRight').simulate('click');

      expect(spy).toHaveBeenCalled();
    })
  })

  it('calls handleClick when simulating left button clicks', () => {
    const wrapper = mount(<App />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClick')

    wrapper.setState(initialState, () => {
      wrapper.update();
      wrapper.find('stylesheet__CarouselButtonLeft').simulate('click');

      expect(spy).toHaveBeenCalled();
    })
  })
})

