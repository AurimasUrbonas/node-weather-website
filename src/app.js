const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'me enterprises'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'me enterprises'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'u ned help?',
    title: 'Help',
    name: 'me enterprises'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'no address rprovided'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'u must provice a search term.'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'help article not found!',
    name: 'me enterprises'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'page not found!',
    name: 'me enterprises'
  });
});

// Run server on port
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
  console.log('http://localhost:3000');
});