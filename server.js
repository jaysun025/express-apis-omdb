require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const app = express();
const API_KEY = process.env.API_KEY

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/results', (req, res) => {
  console.log('req.query.searchTerm')
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.searchTerm}`)
  .then(response => {
    res.render('results', {movies:response.data.Search})
  })
})

app.get("/results/:id", (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.params.id}`)
  .then(response => {
    res.render('show', {movie: response.data})
  })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
