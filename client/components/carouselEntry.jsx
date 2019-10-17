import React from 'react';
import axios from 'axios';
import { CarouselEntryWrapper, CarouselEntryImg } from './stylesheet.jsx';
import {Modal, Button} from 'react-bootstrap';


class CarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      clickedPhoto: '',
      currentPhoto: '',
      largeCarousel: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.findThePhoto = this.findThePhoto.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleClick() {
    this.setState({clickedPhoto: this.props.entry._id});

    axios.get(`/api/imglarge/${this.props.entry.movie.id}`)
    .then(response => {
      console.log(response);
      this.setState({largeCarousel: response.data})
    })
    .finally(() => {
      this.findThePhoto();
      this.toggleModal();
    })
    .catch(error => {
      console.log(error);
    })
  }

  findThePhoto() {
    for (let i = 0; i < this.state.largeCarousel.length; i++) {
      if (this.state.largeCarousel[i]._id === this.state.clickedPhoto) {
        this.setState({currentPhoto: this.state.largeCarousel[i].large_url});
      }
    }
  }

  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    let modalDisplay;

    if (this.state.modalIsOpen) {
      modalDisplay = (
        <>
          <Modal show={this.state.modalIsOpen} onHide={this.toggleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.toggleModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.toggleModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    }

    return (
      <CarouselEntryWrapper>
        <CarouselEntryImg src={this.props.entry.small_url} alt={this.props.entry._id} onClick={this.handleClick}>
        </CarouselEntryImg>
        {modalDisplay}
      </CarouselEntryWrapper>
    );
  }
}


export default CarouselEntry;
