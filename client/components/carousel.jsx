import React from 'react';
import CarouselEntry from './carouselEntry.jsx';
import { CarouselLineWrapper } from './stylesheet.jsx';


const Carousel = ({ lagger, carousel, leader, ...otherProps }) => (
  <CarouselLineWrapper>
    {lagger.map((lagger) =>
      <CarouselEntry entry={lagger} key={lagger._id} {...otherProps} />
    )}
    {carousel.map((entry) =>
      <CarouselEntry entry={entry} key={entry._id} {...otherProps} />
    )}
    {leader.map((leader) =>
      <CarouselEntry entry={leader} key={leader._id} {...otherProps} />
    )}
  </CarouselLineWrapper>
);


export default Carousel;
