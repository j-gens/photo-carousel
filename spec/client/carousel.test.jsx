import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import axios from 'axios';

import CarouselEntry from '../../client/components/carouselEntry.jsx';
import Carousel from '../../client/components/carousel.jsx';

configure({adapter: new Adapter()})

jest.mock('axios');

describe('CarouselEntry component', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      entry: {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      length: 12,
      animate: '',
    };

    const wrapper = shallow(<CarouselEntry {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('renders left animation without crashing given the required props', () => {
    const props = {
      entry: {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      length: 12,
      animate: 'left',
    };

    const wrapper = shallow(<CarouselEntry {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('renders right animation without crashing given the required props', () => {
    const props = {
      entry: {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      length: 12,
      animate: 'right',
    };

    const wrapper = shallow(<CarouselEntry {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('opens modal when user clicks on component', () => {
    const props = {
      entry: {_id: 23, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      length: 12,
      animate: '',
    };
    const wrapper = mount(<CarouselEntry {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClick').mockImplementation(() => console.log('clicked!!!'));

    wrapper.setProps({});

    const thumbnail = wrapper.find('img');
    thumbnail.simulate('click');

    expect(spy).toHaveBeenCalled();
  })
})

describe('Modal behavior', () => {
  it('simulates left button click', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<stylesheet__ModalButtonLeft value="<" onClick={mockOnClick}> &gt; </stylesheet__ModalButtonLeft>);

    wrapper.find('stylesheet__ModalButtonLeft').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);
  })

  it('simulates right button click', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<stylesheet__ModalButtonRight value=">" onClick={mockOnClick}> &gt; </stylesheet__ModalButtonRight>);

    wrapper.find('stylesheet__ModalButtonRight').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);
  })
})


describe('Carousel component', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      carousel: [
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
    const wrapper = shallow(<Carousel {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})

