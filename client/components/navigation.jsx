import React from 'react';
import NavigationEntry from './navigationEntry.jsx';
import { CarouselNavbarWrapper } from './stylesheet.jsx';


const Navigation = (props) => (
  <CarouselNavbarWrapper>
    {props.total.map((ele, idx) =>
      <NavigationEntry idx={idx} key={idx} index={props.index} />
    )}
  </CarouselNavbarWrapper>
)


export default Navigation;
