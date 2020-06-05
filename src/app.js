const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars template engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', { title: "Don's weather app", name: 'don kim' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'don kim' });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'don kim',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide an address',
    });
  }
  geocode(req.query.address, (err, { longitude, latitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(longitude, latitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      //console.log(forecastData[0].weatherIcon);
      res.send({
        address: req.query.address,
        location,
        forecast: forecastData[0].data,
        weatherIcon: forecastData[0].weatherIcon,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'don kim',
    message: 'Help article not found',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'don kim',
    message: 'Page not found',
  });
});
app.listen(port, () => {
  console.log(' server is running on port: ' + port);
});
