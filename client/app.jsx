import React from 'react';
import axios from 'axios';
import Navigation from './components/navigation.jsx';
import Carousel from './components/carousel.jsx';
import { CarouselBodyWrapper, CarouselHeaderWrapper, CarouselHeaderRed, CarouselHeaderTitle, CarouselNavbarBin, CarouselBinWrapper, Button, CarouselButtonLeft, CarouselButtonRight, CarouselViewAllWrapper, CarouselViewAllLink, CarTitle } from './components/stylesheet.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: '',
      carousel: [],
      carouselByFours: [],
      currentFour: [],
      currentIndex: 0,
      animate: '',
      leadingFour: [],
      laggingFour: []
    }

    this.fetch = this.fetch.bind(this);
    this.groupImagesByFours = this.groupImagesByFours.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //currently hardcoded to get specific movie
  componentDidMount() {
    this.fetch('imgsmall', 21211);
  }

  componentWillUnmount() {
    //for testing purposes
  }

  //will be used to get both thumbnails and large images
  fetch(url, params) {
    axios.get(`/api/${url}/${params}`)
    .then(response => {
      console.log(response);
      this.setState({carousel: response.data})
    })
    .finally(() => {
      this.setState({currentMovie: this.state.carousel[0].movie.title});
      this.groupImagesByFours(this.state.carousel);
    })
    .catch(error => {
      console.log(error);
    })
  }

  //this function breaks the images into an array of arrays
    //inner arrays have four images each in them
    //if movie has < 4 images total then add in 'blank' image as placeholder
  groupImagesByFours(carousel) {
    var count = carousel.length;
    var selectedFour = [];
    var allGroupsOfFour = [];

    var lagFour = [];
    var leadFour = [];

    var genericImage= {"_id": "placeholder",
      "small_url": "https://hrr41-fec-krillin-imgs.s3-us-west-1.amazonaws.com/ph-thumb.gif"};
    if (carousel.length < 4) {
      selectedFour = carousel.slice();
      while (selectedFour.length < 4) {
        selectedFour.push(genericImage);
      }
      allGroupsOfFour.push(selectedFour);
    }

    var i = 0;
    while (i < count) {
      selectedFour = carousel.slice(i, i + 4);
      if (selectedFour.length < 4) {
        selectedFour = carousel.slice(-4);
      }
      allGroupsOfFour.push(selectedFour);
      i = i + 4;
    }

    if (allGroupsOfFour.length === 1) {
      lagFour.push(selectedFour);
      leadFour.push(selectedFour);
    } else {
      lagFour.push(allGroupsOfFour[allGroupsOfFour.length - 1]);
      leadFour.push(allGroupsOfFour[1]);
    }

    this.setState({carouselByFours: allGroupsOfFour,
      currentFour: allGroupsOfFour[0],
      laggingFour: lagFour,
      leadingFour: leadFour});
  }

  //change currentFour displayed (cycle through carousel)
  handleClick(event) {
    var maxLength = this.state.carouselByFours.length - 1;
    var upIndex = this.state.currentIndex + 1;
    var downIndex = this.state.currentIndex - 1;

    if (event.target.value === '>') {
      if (this.state.currentIndex === maxLength) {
        this.setState({animate: 'right'});
        setTimeout(() => {this.setState({currentFour: this.state.carouselByFours[0],
          currentIndex: 0, animate: ''})}, 250);
      } else {
        this.setState({animate: 'right'});
        setTimeout(() => {this.setState({currentFour: this.state.carouselByFours[upIndex],
          currentIndex: upIndex, animate: ''})}, 250);
      }
    }
    if (event.target.value === '<') {
      if (this.state.currentIndex === 0) {
        this.setState({animate: 'left'});
        setTimeout(() => {this.setState({currentFour: this.state.carouselByFours[maxLength],
          currentIndex: maxLength, animate: ''})}, 250);
      } else {
        this.setState({animate: 'left'});
        setTimeout(() => {this.setState({currentFour: this.state.carouselByFours[downIndex],
          currentIndex: downIndex, animate: ''})}, 250);
      }
    }
  }

  render() {
    return (
      <CarouselBodyWrapper>
        <CarouselHeaderWrapper>
          <CarouselHeaderRed>
            <CarouselHeaderTitle>
              <CarTitle>{this.state.currentMovie.toUpperCase()}</CarTitle> PHOTOS
            </CarouselHeaderTitle>
          </CarouselHeaderRed>
          <CarouselNavbarBin>
            <Navigation total={this.state.carouselByFours} index={this.state.currentIndex} />
          </CarouselNavbarBin>
        </CarouselHeaderWrapper>
        <CarouselBinWrapper>
          <CarouselButtonLeft value="<" onClick={this.handleClick}> {'<'} </CarouselButtonLeft>
          <Carousel carousel={this.state.currentFour} length={this.state.carousel.length}
          animate={this.state.animate} lead={this.state.leadingFour} lag={this.state.laggingFour} />
          <CarouselButtonRight value=">" onClick={this.handleClick}> {'>'} </CarouselButtonRight>
        </CarouselBinWrapper>
        <CarouselViewAllWrapper>
          <CarouselViewAllLink href="http://www.google.com">View All Photos ({this.state.carousel.length})
          </CarouselViewAllLink>
        </CarouselViewAllWrapper>
      </CarouselBodyWrapper>
    );
  }
}


export default App;
