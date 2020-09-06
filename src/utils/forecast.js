const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=9d4c9dc4a7cd225c9bbd222d9e14dfa9&query=' + latitude + ',' + longitude + '&units=m';

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined);
    } else if(body.error) {
      callback('Weather service was unable to find location!', undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + ". The current humidity is " + body.current.humidity + '%.');
    }
  });
}

module.exports = forecast;