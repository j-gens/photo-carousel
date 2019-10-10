const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carousel');


let carouselSchema = new mongoose.Schema({
  _id: Number,
  small_url: String,
  large_url: String,
  movie: {id: Number, title: String}
});

let Carousel = mongoose.model('Carousel', carouselSchema);


