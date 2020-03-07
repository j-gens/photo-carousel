import React from 'react';
import axios from 'axios';

import Navigation from './components/navigation.jsx';
import Carousel from './components/carousel.jsx';
import { CarouselBodyWrapper, CarouselHeaderWrapper, CarouselHeaderRed, CarouselNavbarBin, CarouselBinWrapper, Button, CarouselButtonLeft, CarouselButtonRight, CarouselViewAllWrapper, CarouselViewAllLink, PlayNiceWrapper, NoMovies } from './components/stylesheet.jsx';


let port = process.env.PORT;
if (port == null || port == '') {
  port = 3100;
}

let host = process.env.HOST;
if (host == null || host == '') {
  host = 'http://localhost';
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: '',
      noMovies: true,


      carousel: [],

      animate: '',

      currentIndex: 0,


      carouselByFours: [],
      currentFour: [],
      leadingFour: [],
      laggingFour: [],


      currentDisplayIndex: {start: 0, end: 3},
      rightDirectionIndex: {start: 0, end: 3},
      leftDirectionIndex: {start: 0, end: 3},

    }
  }

  //currently hardcoded to get specific movie
  componentDidMount = () => this.fetch('sleeping beauty');

  componentWillUnmount = () => { /* for testing purposes */ };

  //will be used to get both thumbnails and large images
  fetch = (params) => {
    params = window.location.search.slice(12) || params;
    axios.get(`${host}:${port}/api/imgsmall/?movietitle=${params}`)
    .then((response) => {
      this.setState({carousel: response.data}, () => this.isResEmpty());
    })
    .catch(error => {
      console.log(error);
    })
  }

  isResEmpty = () => {
    const { carousel } = this.state;
    if (carousel.length > 0) {
      this.setState({
        noMovies: false,
        currentMovie: carousel[0].movie.title
        }, () => this.groupImagesByFours());
    }
  }
  //this function breaks the images into an array of arrays
    //inner arrays have four images each in them
    //if movie has < 4 images total then add in 'blank' image as placeholder
  groupImagesByFours = () => {
    const { carousel } = this.state;

    const genericImage = {
      _id: "placeholder",
      small_url: "https://hrr41-fec-krillin-imgs.s3-us-west-1.amazonaws.com/ph-thumb.gif"
    };

    if (carousel.length <= 4) {
      while (carousel.length < 4) {
        this.setState({
          carousel: carousel.push(genericImage)
        });
      }

      return;
    }

    if (carousel.length % 4 !== 0) {



    }




    // let selectedFour = [];
    // var allGroupsOfFour = [];
    // var lagFour = [];
    // var leadFour = [];


    // if (carousel.length <= 4) {
    //   selectedFour = carousel.slice();
    //   while (selectedFour.length < 4) {
    //     selectedFour.push(genericImage);
    //   }

    //   this.setState({
    //     carouselByFours: carouselByFours.push(selectedFour),
    //     currentFour: selectedFour,
    //     leadingFour: selectedFour,
    //     laggingFour: selectedFour
    //   });
    // }

    // else {
    //   let i = 0;
    //   while (i < carousel.length) {
    //     selectedFour = carousel.slice(i, i + 4);
    //     if (selectedFour.length < 4) {
    //       selectedFour = carousel.slice(-4);
    //     }
    //     allGroupsOfFour.push(selectedFour);
    //     i = i + 4;
    //   }
    //   if (allGroupsOfFour.length === 1) {
    //     lagFour = allGroupsOfFour[0];
    //     leadFour = allGroupsOfFour[0];
    //   } else {
    //     lagFour = allGroupsOfFour[allGroupsOfFour.length - 1];
    //     leadFour = allGroupsOfFour[1];
    //   }
    //   this.setState({carouselByFours: allGroupsOfFour,
    //     currentFour: allGroupsOfFour[0],
    //     laggingFour: lagFour,
    //     leadingFour: leadFour});
    // }
  }

  leadingOrLagging = (index) => {
    var maxLength = this.state.carouselByFours.length - 1;
    var upIndex = this.state.currentIndex + 1;
    var downIndex = this.state.currentIndex - 1;

    if (index === maxLength) {
      this.setState({leadingFour: this.state.carouselByFours[0]});
      if (this.state.carouselByFours[downIndex]) {
        this.setState({laggingFour: this.state.carouselByFours[downIndex]});
      }
    } else if (index === 0) {
      this.setState({laggingFour: this.state.carouselByFours[maxLength]});
      if (this.state.carouselByFours[upIndex]) {
        this.setState({leadingFour: this.state.carouselByFours[upIndex]});
      }
    } else {
      if (this.state.carouselByFours[upIndex]) {
        this.setState({leadingFour: this.state.carouselByFours[upIndex]});
      }
      if (this.state.carouselByFours[downIndex]) {
        this.setState({laggingFour: this.state.carouselByFours[downIndex]});
      }
    }

  }

  //change currentFour displayed (cycle through carousel)
  handleClick = (event) => {
    const { carouselByFours, currentIndex } = this.state;
    const { value } = event.target;
    // var maxLength = this.state.carouselByFours.length - 1;
    // var upIndex = this.state.currentIndex + 1;
    // var downIndex = this.state.currentIndex - 1;

    if (value === '>') {
      if (currentIndex === carouselByFours.length - 1) {
        this.setState({animate: 'right'});
        setTimeout(() => {this.setState({currentFour: carouselByFours[0],
          currentIndex: 0, animate: ''})}, 200)
      } else {
        this.setState({animate: 'right'});
        setTimeout(() => {this.setState({currentFour: carouselByFours[upIndex],
          currentIndex: upIndex, animate: ''})}, 200);
      }
    }
    if (value === '<') {
      if (currentIndex === 0) {
        this.setState({animate: 'left'});
        setTimeout(() => {this.setState({currentFour: carouselByFours[maxLength],
          currentIndex: maxLength, animate: ''})}, 200);
      } else {
        this.setState({animate: 'left'});
        setTimeout(() => {this.setState({currentFour: carouselByFours[downIndex], currentIndex: downIndex, animate: ''})}, 200);
      }
    }
    this.leadingOrLagging(currentIndex);
  }

  render = () => {
    const { noMovies, currentMovie, carousel, carouselByFours } = this.state;

    if (noMovies) {
      return (
        <PlayNiceWrapper>
          <NoMovies>
            <p>
              Oops!  It looks like that movie is not in our database... why don't you try searching for one of these instead?
            </p>
            <p>
              Detective Pikachu, Lion King, Frozen, Brave, The Rescuers, Sleeping Beauty, Robin Hood, Shrek, Lego Batman, Hercules, Mulan
            </p>
            <p>
              Try searching by adding '/?movietitle={'{movie}'}' to the end of address bar above!
            </p>
          </NoMovies>
        </PlayNiceWrapper>
      );
    }

    return (
      <PlayNiceWrapper>
        <CarouselBodyWrapper>
          <CarouselHeaderWrapper>
            <CarouselHeaderRed>
              <em>{currentMovie.toUpperCase()}</em> PHOTOS
            </CarouselHeaderRed>
            <CarouselNavbarBin>
              <Navigation total={carouselByFours} index={this.state.currentIndex} />
            </CarouselNavbarBin>
          </CarouselHeaderWrapper>
          <CarouselBinWrapper>
            <CarouselButtonLeft value="<" onClick={this.handleClick}> {'<'} </CarouselButtonLeft>
            <Carousel carousel={this.state.currentFour}
            length={this.state.carousel.length}
            animate={this.state.animate}
            leader={this.state.leadingFour}
            lagger={this.state.laggingFour} />
            <CarouselButtonRight value=">" onClick={this.handleClick}> {'>'} </CarouselButtonRight>
          </CarouselBinWrapper>
          <CarouselViewAllWrapper>
            <CarouselViewAllLink>
              Total Photos ({carousel.length})
            </CarouselViewAllLink>
          </CarouselViewAllWrapper>
        </CarouselBodyWrapper>
      </PlayNiceWrapper>
    );
  }
}


export default App;
