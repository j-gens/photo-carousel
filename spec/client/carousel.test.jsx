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
  });
});

describe('CarouselEntry component: Modal behavior', () => {
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'imgmodal');
  global.document.querySelector('body').appendChild(modalRoot);

  const props = {
    entry: {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
    length: 4,
    animate: '',
  };
  const testState = {
    modalIsOpen: true,
    clickedPhoto: '/images/large0.jpg',
    currentPhoto: '/images/large0.jpg',
    currentIndex: 0,
    largeCarousel:[
      {_id: 1, large_url: '/images/large0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 2, large_url: '/images/large1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 3, large_url: '/images/large2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      {_id: 4, large_url: '/images/large3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
    ],
  };

  const wrapper = mount(<CarouselEntry {...props} />);

  it('opens modal when user clicks on component', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleClick').mockImplementation(() => {});

    wrapper.setProps({});
    wrapper.find('img').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('the modal toggles right and left when clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'modalClick');

    wrapper.setState(testState, () => {
      wrapper.update();

      wrapper.find('stylesheet__ModalButtonLeft').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);

      wrapper.find('stylesheet__ModalButtonRight').simulate('click');
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  it('closes the modal when the X button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'toggleModal');

    wrapper.setProps({});
    wrapper.find('stylesheet__ModalXButton').simulate('click');

    expect(spy).toHaveBeenCalled();
  })
});

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

    const wrapper = shallow(<Carousel {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

