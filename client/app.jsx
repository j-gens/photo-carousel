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
      noMovies: true,
      carousel: [],
      currentMovie: '',
      animate: '',
      carouselOfTetras: [],
      currentIndex: 0,
      leftIndex: 0,
      rightIndex: 0,
    }
  }

  componentDidMount = () => this.fetch('sleeping beauty');

  componentWillUnmount = () => { /* for testing purposes */ };

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
      this.setState({currentMovie: carousel[0].movie.title}, () => this.groupCarouselByFours());
    }
  }

  groupCarouselByFours = () => {
    const { carousel } = this.state;
    let selectedTetra = [];
    let allTetras = [];
    let leftI = 0;
    let rightI = 0;
    const genericImage = {
      _id: "placeholder",
      small_url: "https://hrr41-fec-krillin-imgs.s3-us-west-1.amazonaws.com/ph-thumb.gif"
    };
    if (carousel.length <= 4) {
      selectedTetra = carousel.slice();
      while (selectedTetra.length < 4) {
        selectedTetra.push(genericImage);
      }
      allTetras.push(selectedTetra);
      this.setState({noMovies: false, carouselOfTetras: allTetras});
      return;
    }
    for (let i = 0; i < carousel.length; i = i + 4) {
      selectedTetra = carousel.slice(i, i + 4);
      if (selectedTetra.length < 4) {
        selectedTetra = carousel.slice(-4);
      }
      allTetras.push(selectedTetra);
    }
    if (allTetras.length > 1) {
      leftI = allTetras.length - 1;
      rightI = 1;
    }
    this.setState({
      noMovies: false,
      carouselOfTetras: allTetras,
      leftIndex: leftI,
      rightIndex: rightI,
    });
  }

  determineStateIndexes = () => {
    const { carouselOfTetras, currentIndex, leftIndex, rightIndex } = this.state;
    if (carouselOfTetras.length === 1) return;
    if (currentIndex === carouselOfTetras.length - 1) {
      this.setState({rightIndex: 0, leftIndex: currentIndex - 1});
      return;
    }
    if (currentIndex === 0) {
      this.setState({rightIndex: currentIndex + 1, leftIndex: carouselOfTetras.length - 1});
      return;
    }
    this.setState({rightIndex: currentIndex + 1, leftIndex: currentIndex - 1});
  }

  handleClick = (event) => {
    const { carouselOfTetras, currentIndex } = this.state;
    const { value } = event.target;
    if (value === '>') {
      this.setState({animate: 'right'});
      if (currentIndex === carouselOfTetras.length - 1) {
        setTimeout(() => this.setState({currentIndex: 0, animate: ''}), 200)
      } else {
        setTimeout(() => this.setState({currentIndex: currentIndex + 1, animate: ''}), 200);
      }
    }
    if (value === '<') {
      this.setState({animate: 'left'});
      if (currentIndex === 0) {
        setTimeout(() => this.setState({currentIndex: carouselOfTetras.length - 1, animate: ''}), 200);
      } else {
        setTimeout(() => this.setState({currentIndex: currentIndex - 1, animate: ''}), 200);
      }
    }
    this.determineStateIndexes();
  }

  render = () => {
    const { noMovies, currentMovie, carousel, carouselOfTetras, animate, currentIndex, leftIndex, rightIndex } = this.state;
    const lagger = carouselOfTetras[leftIndex];
    const leader = carouselOfTetras[rightIndex];
    const current = carouselOfTetras[currentIndex];

    console.log('left ', leftIndex, 'right ', rightIndex, 'current ', currentIndex);

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
              <Navigation total={carouselOfTetras} index={currentIndex} />
            </CarouselNavbarBin>
          </CarouselHeaderWrapper>
          <CarouselBinWrapper>
            <CarouselButtonLeft value="<" onClick={this.handleClick}> {'<'} </CarouselButtonLeft>
            <Carousel carousel={current}
            length={carousel.length}
            animate={animate}
            leader={leader}
            lagger={lagger} />
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
