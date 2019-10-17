import React from 'react';
import { configure, shallow } from 'enzyme';
import NavigationEntry from '../client/components/navigationEntry.jsx';
import App from '../client/app.jsx';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({adapter: new Adapter()})

describe('NavigationEntry component', () => {

  // it('should render in debug mode', () => {
  //   const component = shallow(<NavigationEntry debug />)
  //   expect(component).toMatchSnapshot();
  // })

  // it('renders only one red navigation dot', () => {
  //   const wrapper = shallow(<NavigationEntry />);
  //   expect(wrapper.find({prop: 'index'}).to.have.lengthOf(1));
  // })


})



describe('App component', () => {

  it('should render in debug mode', async () => {
    const component = shallow(<App />, {disableLifecycleMethods: true})

    expect(component).toMatchSnapshot();
  })

  it('simulates click events', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(<App />, {disableLifecycleMethods: true});
    wrapper.find('div.CarouselButtonRight').simulate('click');
    expect(handleClick).to.have.property('callCount', 1);
  });

})


