import React from 'react';
import { CarouselNavDot, CarouselNavDotRed } from './stylesheet.jsx';


const NavigationEntry = ({ index, idx }) => {
  if (index === idx) {
    return (
      <CarouselNavDotRed></CarouselNavDotRed>
    );
  }

  return (
    <CarouselNavDot></CarouselNavDot>
  );
}


export default NavigationEntry;
