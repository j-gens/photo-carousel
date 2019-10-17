import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { CarouselEntryWrapper, CarouselEntryImg } from './stylesheet.jsx';


Modal.setAppElement('#imgcarousel');

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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      this.openModal();
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
        contentLabel="image carousel modal">
          <div>
            <button onClick={this.closeModal}> X </button>
          </div>
          <div>
            <img src={this.state.currentPhoto}></img>
          </div>
       </Modal>
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
