import React from 'react';
import Modal from 'react-modal';
import { CarouselEntryWrapper, CarouselEntryImg } from './stylesheet.jsx';


Modal.setAppElement('#imgcarousel');

class CarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    let modalDisplay;

    if (this.state.modalIsOpen) {
      modalDisplay = (
        <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="image modal">
          <button onClick={this.closeModal}> X </button>
          <img src={this.props.entry.small_url}></img>
       </Modal>
      )
    }

    return (
      <CarouselEntryWrapper>
        <CarouselEntryImg src={this.props.entry.small_url} alt={this.props.entry._id} onClick={this.openModal}>
        </CarouselEntryImg>
        {modalDisplay}
      </CarouselEntryWrapper>
    );
  }
}


export default CarouselEntry;
