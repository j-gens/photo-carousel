import React from 'react';
import Modal from 'react-modal';
import { CarouselEntryWrapper, CarouselEntryImg } from './stylesheet.jsx';


class CarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <CarouselEntryWrapper>
        <CarouselEntryImg src={props.entry.small_url} alt={props.entry._id} >
        </CarouselEntryImg>
      </CarouselEntryWrapper>
    );
  }
}


export default CarouselEntry;
