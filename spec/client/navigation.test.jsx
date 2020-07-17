import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import NavigationEntry from '../../client/components/navigationEntry.jsx';
import Navigation from '../../client/components/navigation.jsx';

configure({adapter: new Adapter()})


describe('NavigationEntry component', () => {
  it('renders red state without crashing given the required props', () => {
    const props = {
      index: 0,
      idx: 0,
    };
    const wrapper = shallow(<NavigationEntry {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders gray state without crashing given the required props', () => {
    const props = {
      index: 0,
      idx: 2,
    };
    const wrapper = shallow(<NavigationEntry {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

describe('Navigation component', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      total: [
        {_id: 1, small_url: '/images/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 2, small_url: '/images/small1.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 3, small_url: '/images/small2.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
        {_id: 4, small_url: '/images/small3.jpg', movie: {id: 21210, title: 'Detective Pikachu'}},
      ],
      index: 0,
    };
    const wrapper = shallow(<Navigation {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
