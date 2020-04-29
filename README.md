# Review Aggregation App: Photo Carousel Service

* [Overview](https://github.com/j-gens/photo-carousel#overview)
* [Technologies](https://github.com/j-gens/photo-carousel#technologies)
* [Getting Started](https://github.com/j-gens/photo-carousel#getting-started)
* [License](https://github.com/j-gens/photo-carousel#license)

![alt hollywood sign](https://j-gens-portfolio.s3-us-west-1.amazonaws.com/review-gen.jpg)

## Overview

This photo carousel servicewas designed and written for a review-aggregation app for visual media.

#### Team Members

* Julia Gens - [j-gens](https://github.com/j-gens) - Photo Carousel Service
* Jenny Shamoo - [jshamoo](https://github.com/jshamoo) - Cast Photos Service
* Jonathan Yang - [jonyang221](https://github.com/jonyang221) - Audience Reviews Service
* Kai Dong - [Evillivekai](https://github.com/Evillivekai) - Critic Reviews Service
* Rob Nolan - [rlnolan15](https://github.com/rlnolan15) - Media Preview Service

#### My Contribution

* Designed and built media carousel service
* Resolved team integration conflicts via Webpack optimization
* Coordinated and deployed entire team’s modules on proxy server EC2 instance
* Utilized agile workflow practices on a 5-person remote team

## Technologies

* JavaScript
* React
* styled-components
* Node/Express
* MongoDB/Mongoose
* Webpack
* Babel
* Jest
* Enzyme
* SuperTest
* AWS (EC2, S3)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Installing

1. Clone the repository onto your local machine
```
$ git clone https://github.com/j-gens/photo-carousel.git
```
2. Change directories into the photo-carousel root directory
```
cd photo-carousel
```
3. Install the dependencies in a local node_modules folder
```
npm install
```
4. Seed your MongoDB database
```
npm run-script seed
```
5. Assemble the bundle within the public folder
```
npm run-script build
```
6. Start the server on your local machine
```
npm start
```
7. View in browser by going to [http://localhost:3100](http://localhost:3100)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/j-gens/photo-carousel/blob/master/LICENSE) file for details
