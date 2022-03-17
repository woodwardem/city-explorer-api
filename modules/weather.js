'use strict';
const axios = require('axios');
let cache = require('./cache.js');

module.exports = getWeather;
function getWeather(lat, lon) {
    const key = 'weather-' + lat + lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
   
   
   //var URL = require('url').URL;
   
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = axios.get(url)
        .then(response => parseWeather(response.data));
      }
      
      return cache[key].data;
    }
    




   function parseWeather(weatherData) {
    try {
        //const weatherData =  axios.get(url);
        console.log(weatherData.data.data)
        const weatherArray = weatherData.data.data.map(day => new Forecast(day));
        //const weatherData = city.data.map(day => new Forecast(day));
        response.status(200).send(weatherArray);
return Promise.resolve(weatherArray);

    } catch ( error ) {
        console.log(error);
        response.status(500).send('city not found');
        
        return Promise.reject(error);
    }
   };



function Forecast(day) {
    this.day = day.valid_date
    this.description = day.weather.description
}







module.exports = getWeather;
