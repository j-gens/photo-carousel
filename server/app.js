const db = require('../database/index.js')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/api/imgsmall/', (req, res) => {
  console.log(req.query);
  db.getCarousel(req.query.movietitle, req.path, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


app.get('/api/imglarge/', (req, res) => {
  db.getCarousel(req.query.movietitle, req.path, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});


module.exports = app;
