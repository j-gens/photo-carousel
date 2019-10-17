import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import sinon from 'sinon';
import toJson from 'enzyme-to-json';

import axios from 'axios';
import App from '../client/app.jsx';

configure({adapter: new Adapter()})

jest.mock('axios');

describe('App component', () => {

  it('renders without crashing given the required props', () => {
    const props = {
      currentMovie: '',
      carousel: [],
      carouselByFours: [],
      currentFour: [],
      currentIndex: 0
    }
    const images = [{_id: 1, small_url: 'https://hrr41-fec-krillin-imgs.s3-us-west-1.amazonaws.com/small0.jpg', movie: {id: 21210, title: 'Detective Pikachu'}}];
    const resp = {data: images};
    axios.get.mockResolvedValue(resp);

    const wrapper = shallow(<App {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})


