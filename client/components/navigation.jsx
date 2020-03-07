import React from 'react';
import NavigationEntry from './navigationEntry.jsx';
import { CarouselNavbarWrapper } from './stylesheet.jsx';


const Navigation = ({ total, index }) => (
  <CarouselNavbarWrapper>
    {total.map((ele, idx) =>
      <NavigationEntry idx={idx} key={idx} index={index} />
    )}
  </CarouselNavbarWrapper>
)


export default Navigation;
