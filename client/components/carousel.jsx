import React from 'react';
import CarouselEntry from './carouselEntry.jsx';
import { CarouselLineWrapper } from './stylesheet.jsx';


const Carousel = (props) => (
  <CarouselLineWrapper>
    {props.carousel.map((entry, index) =>
      <CarouselEntry entry={entry} index={index} />
    )}
  </CarouselLineWrapper>
)


export default Carousel;
