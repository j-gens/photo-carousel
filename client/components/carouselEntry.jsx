import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CarouselEntryWrapper, CarouselEntryImg, ModalButtonRight, ModalButtonLeft, ModalBin, ModalImage, Modal, ModalHeader, ModalXButton, ModalCount, CarouselMoveRight, CarouselMoveLeft, ModalImageBin } from './stylesheet.jsx';


let port = process.env.PORT;
if (port == null || port == '') {
  port = 3100;
}

let host = process.env.HOST;
if (host == null || host == '') {
  host = 'http://localhost';
}


class CarouselEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      clickedPhoto: '',
      currentPhoto: '',
      currentIndex: 0,
      largeCarousel: []
    }
  }

  handleClick = () => {
    const { _id, movie: { title } } = this.props.entry;
    axios.get(`${host}:${port}/api/imglarge/?movietitle=${title}`)
    .then(response => {
      this.setState({largeCarousel: response.data,
        clickedPhoto: _id})
    })
    .finally(() => {
      this.findThePhoto();
    })
    .catch(error => {
      console.log(error);
    })
  }

  findThePhoto = () => {
    const { largeCarousel, clickedPhoto } = this.state;
    for (let i = 0; i < largeCarousel.length; i++) {
      if (largeCarousel[i]._id === clickedPhoto) {
        this.setState({currentPhoto: largeCarousel[i].large_url,
          currentIndex: i});
      }
    }
    this.toggleModal();
  }

  toggleModal = () => {
    const { modalIsOpen } = this.state;
    this.setState({modalIsOpen: !modalIsOpen});
  }

  modalClick = (event) => {
    const { largeCarousel, currentIndex } = this.state;
    const { value } = event.target;

    const maxLength = largeCarousel.length - 1;
    const upIndex = currentIndex + 1;
    const downIndex = currentIndex - 1;

    if (value === '>') {
      if (currentIndex === maxLength) {
        this.setState({currentPhoto: largeCarousel[0].large_url,
          currentIndex: 0})
      } else {
        this.setState({currentPhoto: largeCarousel[upIndex].large_url,
          currentIndex: upIndex})
      }
    }
    if (value === '<') {
      if (currentIndex === 0) {
        this.setState({currentPhoto: largeCarousel[maxLength].large_url,
          currentIndex: maxLength})
      } else {
        this.setState({currentPhoto: largeCarousel[downIndex].large_url,
          currentIndex: downIndex})
      }
    }
  }

  render() {
    const { modalIsOpen, currentIndex, currentPhoto } = this.state;
    const { length, animate, entry: { _id, small_url } }  = this.props;

    if (modalIsOpen) {
      return ReactDOM.createPortal(
        (
          <>
            <Modal>
                <ModalHeader>
                  <ModalCount>{currentIndex + 1} of {length}</ModalCount>
                  <ModalXButton onClick={this.toggleModal}> X </ModalXButton>
                </ModalHeader>
                <ModalBin>
                  <ModalButtonLeft value="<" onClick={this.modalClick}>{'<'}</ModalButtonLeft>
                    <ModalImage src={currentPhoto}></ModalImage>
                  <ModalButtonRight value=">" onClick={this.modalClick}>{'>'}</ModalButtonRight>
                </ModalBin>
            </Modal>
          </>
        ), document.getElementById('imgmodal'));
    }

    if (animate === 'right') {
      return (
        <CarouselMoveRight>
          <CarouselEntryImg src={small_url} alt={_id} />
        </CarouselMoveRight>
      );
    }

    if (animate === 'left') {
      return (
        <CarouselMoveLeft>
          <CarouselEntryImg src={small_url} alt={_id} />
        </CarouselMoveLeft>
      );
    }

    return (
      <CarouselEntryWrapper>
        <CarouselEntryImg src={small_url} alt={_id} onClick={this.handleClick} />
      </CarouselEntryWrapper>
    );

  }
}


export default CarouselEntry;
