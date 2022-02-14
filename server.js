'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { request, response } = require('express');
const weather = require('./data/weather.json');
const app = express();
const axios = require('axios');
app.use(cors());


//set the port variable
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
    response.send('hello from home route')
});

app.get('/weather', async (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;

// const city = weather.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase());
const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7lat=${lat}&lon=${lon}`;
const weatherData =  await axios.get(url);
console.log(url);
console.log(weatherData);
console.log("lat", "lon", lat, lon);

try{
console weatherArray = weatherData.data.data
response.status(200).send(weatherData.data.data);


} catch{error} {
    console.log(error);
    response.status(500).send('city not found');
    response.send('city not found');
}

})
function Forecast(day) {
    this.day = day.valid_date
    this.description = day.weather.description
}

app.use('*', (request, response) => response.status(404).send('that end point does not exist'));


app.listen(PORT, () => console.log(`listening on port ${PORT}`));