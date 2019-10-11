const express = require('express');
const db = require('../database/index.js')

const app = express();
app.use(express.static('public'));


app.get('/api/:movieId/imgs', (req, res) => {
  db.Carousel.find({ 'movie.id': req.params.movieId }, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});


//set up for future deployment:
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3100;
}
app.listen(port, () => console.log(`App is listening on port ${port}`));
