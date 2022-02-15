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
const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${lat}&lon=${lon}`;
const weatherData =  await axios.get(url);
console.log(url);
console.log(weatherData.data.data);
console.log("lat", "lon", lat, lon);

try{
const weatherArray = weatherData.data.data.map(day => new Forecast(day));
response.status(200).send(weatherArray);


} catch{error} {
    console.log(error);
    response.status(500).send('city not found');
    response.send('city not found');
}

})
app.get('/movies', async (request, response) => {
    let searchQuery= request.query.searchQuery;
    console.log(searchQuery);

    const url= `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${searchQuery}`
    try{
        const movieData = await axios.get(url);
        console.log(movieData.data.results);
        const movieData = movieData.data.results.map(movie => new Movie(day));
        response.status(200).send(movieArray);
        
        
        } catch{error} {
            console.log(error);
            response.status(500).send('movie not found');
            response.send('movie not found');
        }
        

})




function Forecast(day) {
    this.day = day.valid_date
    this.description = day.weather.description
}
function Movie(movie) {
    this.title = movie.title,
    this.overview= movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes= movie.vote_count,
  this.image_url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path, 
    this.popularity= movie.popularity,
    this.released_on = movie.release_date
        
         
        
    
}



app.use('*', (request, response) => response.status(404).send('that end point does not exist'));


app.listen(PORT, () => console.log(`listening on port ${PORT}`));