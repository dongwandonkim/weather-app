const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=060ca68507c9fe216c88b42d587435d9&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      //console.log(body.current);
      const data = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain.`;
      const weatherIcon = body.current.weather_icons[0];
      const finalData = [
        {
          data,
          weatherIcon,
        },
      ];
      //console.log(weatherIcon);

      callback(undefined, finalData);
    }
  });
};

module.exports = forecast;
