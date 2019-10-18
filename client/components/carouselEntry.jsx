import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CarouselEntryWrapper, CarouselEntryImg, ModalButtonRight, ModalButtonLeft, ModalBin, ModalImage, Modal, ModalHeader } from './stylesheet.jsx';


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

      return ReactDOM.createPortal(
        ( <>
            <Modal>
                <ModalHeader>
                  <button onClick={this.toggleModal}> X </button>
                </ModalHeader>
                <ModalBin>
                  <ModalButtonLeft value="<">{'<'}</ModalButtonLeft>
                  <ModalImage src={this.state.currentPhoto}></ModalImage>
                  <ModalButtonRight value=">">{'>'}</ModalButtonRight>
                </ModalBin>
            </Modal>
          </> ), document.getElementById('imgmodal'))


      modalDisplay = (
        <>
        <Modal>
            <div>
              <button onClick={this.toggleModal}> X </button>
            </div>
            <ModalBin>
              <ModalButtonLeft value="<">{'<'}</ModalButtonLeft>
              <ModalImage src={this.state.currentPhoto}></ModalImage>
              <ModalButtonRight value=">">{'>'}</ModalButtonRight>
            </ModalBin>
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
