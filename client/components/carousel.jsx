import React from 'react';
import CarouselEntry from './carouselEntry.jsx';
import { CarouselLineWrapper } from './stylesheet.jsx';

const Carousel = (props) => (
  <CarouselLineWrapper>
    {props.lagger.map((lagger) =>
      <CarouselEntry entry={lagger} key={lagger._id} animate={props.animate} />
    )}
    {props.carousel.map((entry) =>
      <CarouselEntry entry={entry} key={entry._id} length={props.length} animate={props.animate} />
    )}
    {props.leader.map((leader) =>
      <CarouselEntry entry={leader} key={leader._id} animate={props.animate} />
    )}
  </CarouselLineWrapper>
)

export default Carousel;
