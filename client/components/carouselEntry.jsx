import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CarouselEntryWrapper, CarouselEntryImg, ModalButtonRight, ModalButtonLeft, ModalBin, ModalImage, Modal, ModalHeader, ModalXButton, ModalCount, CarouselMoveRight, CarouselMoveLeft, ModalImageBin } from './stylesheet.jsx';


//for deployment -- also will need to update in ../app.jsx
const port = 3100;
const host = 'http://localhost';


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
    const { entry: { _id, movie: { title } } } = this.props;
    this.setState({clickedPhoto: _id});

    axios.get(`${host}:${port}/api/imglarge/?movietitle=${title}`)
    .then(response => {
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

  findThePhoto = () => {
    const { largeCarousel, clickedPhoto } = this.state;
    for (let i = 0; i < largeCarousel.length; i++) {
      if (largeCarousel[i]._id === clickedPhoto) {
        this.setState({currentPhoto: largeCarousel[i].large_url, currentIndex: i});
      }
    }
  }

  toggleModal = () => {
    const { modalIsOpen } = this.state;
    this.setState({modalIsOpen: !modalIsOpen});
  }

  modalClick = (event) => {
    var maxLength = this.state.largeCarousel.length - 1;
    var upIndex = this.state.currentIndex + 1;
    var downIndex = this.state.currentIndex - 1;

    if (event.target.value === '>') {
      if (this.state.currentIndex === maxLength) {
        this.setState({currentPhoto: this.state.largeCarousel[0].large_url,
          currentIndex: 0})
      } else {
        this.setState({currentPhoto: this.state.largeCarousel[upIndex].large_url,
          currentIndex: upIndex})
      }
    }
    if (event.target.value === '<') {
      if (this.state.currentIndex === 0) {
        this.setState({currentPhoto: this.state.largeCarousel[maxLength].large_url,
          currentIndex: maxLength})
      } else {
        this.setState({currentPhoto: this.state.largeCarousel[downIndex].large_url,
          currentIndex: downIndex})
      }
    }
  }

  render() {
    const { modalIsOpen, currentIndex, currentPhoto } = this.state;
    const { length, animate, entry: { _id, small_url } }  = this.props;

    if (modalIsOpen) {
      return ReactDOM.createPortal(
        ( <>
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
          <CarouselEntryImg src={small_url}
          alt={_id} >
          </CarouselEntryImg>
        </CarouselMoveRight>
      );
    } else if (animate === 'left') {
      return (
        <CarouselMoveLeft>
          <CarouselEntryImg src={small_url}
          alt={_id} >
          </CarouselEntryImg>
        </CarouselMoveLeft>
      );
    } else {
      return (
        <CarouselEntryWrapper>
          <CarouselEntryImg src={small_url}
          alt={_id} onClick={this.handleClick}>
          </CarouselEntryImg>
        </CarouselEntryWrapper>
      );
    }
  }
}

export default CarouselEntry;
