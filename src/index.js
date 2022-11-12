import './style.css';
import magnifying from './magnifying.svg'

// Create DOM elements
const body = document.querySelector('body');
const main = document.createElement('div');
const left = document.createElement('div');
const right = document.createElement('div');
const description = document.createElement('div');
const city = document.createElement('div');
const currentTemp = document.createElement('div');
const maxTemp = document.createElement('div');
const minTemp = document.createElement('div');
const humidity = document.createElement('div');
const searchContainer = document.createElement('div');
const search = document.createElement('input');
const searchButton = new Image();
searchButton.src = magnifying;
search.placeholder = "Search Location..."
const wind = document.createElement('h2');
wind.textContent = 'Wind';
const windSpeed = document.createElement('div');
const windDirection = document.createElement('div');
const windGust = document.createElement('div');

//Append elements 
left.appendChild(description);
left.appendChild(city);
left.appendChild(currentTemp);
left.appendChild(maxTemp);
left.appendChild(minTemp);
left.appendChild(humidity);
left.appendChild(searchContainer)
searchContainer.append(search);
searchContainer.append(searchButton);

right.append(wind)
right.appendChild(windSpeed);
right.appendChild(windDirection);
right.appendChild(windGust);

main.appendChild(left);
main.appendChild(right);
body.appendChild(main);

// Add classes
main.classList.add('main');
description.classList.add('description');
city.classList.add('city');
currentTemp.classList.add('currentTemp');
maxTemp.classList.add('maxTemp');
minTemp.classList.add('minTemp');
humidity.classList.add('humidity');
wind.classList.add('wind');
windSpeed.classList.add('windSpeed');
windDirection.classList.add('windDirection');
windGust.classList.add('windGust');
searchButton.classList.add('searchButton');
searchContainer.classList.add('searchContainer');
left.classList.add('left');
right.classList.add('right');

// Create input and search elements
searchButton.addEventListener('click', fetchWeather);

// Initial city
async function fetchBaumholder() {
  const responseBaumholder = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=baumholder&appid=f551aa333efad9f396978ebc92ee0b3a&units=imperial`,
    { mode: 'cors' }
  );
  const dataBaumholder = await responseBaumholder.json();
  console.log(dataBaumholder);
	description.textContent = `Weather is ${dataBaumholder.weather[0].description}`;
	city.textContent = `${dataBaumholder.name}`;
	currentTemp.textContent = `Current: ${dataBaumholder.main.temp} *F`;
	maxTemp.textContent = `${dataBaumholder.main.temp_max} *F`;
	minTemp.textContent = `${dataBaumholder.main.temp_min} *F`;
	humidity.textContent = `Humidity: ${dataBaumholder.main.humidity}%`;
	windSpeed.textContent = `${dataBaumholder.wind.speed} mph`;
	windDirection.textContent = `${dataBaumholder.wind.deg} deg`;
	windGust.textContent = `gusting ${dataBaumholder.wind.gust} mph`;
}
fetchBaumholder();

// Searched city
async function fetchWeather() {
  console.clear();
  const responseCurrent = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=f551aa333efad9f396978ebc92ee0b3a&units=imperial`,
    { mode: 'cors' }
  );
  const currentData = await responseCurrent.json();
  console.log(currentData);
	description.textContent = `Weather is ${currentData.weather[0].description}`;
	city.textContent = `${currentData.name}`;
	currentTemp.textContent = `Current temperature: ${currentData.main.temp} deg F`;
	maxTemp.textContent = `${currentData.main.temp_max} deg F`;
	minTemp.textContent = `${currentData.main.temp_min} deg F`;
	humidity.textContent = `Humidity: ${currentData.main.humidity}%`;
	windSpeed.textContent = `${currentData.wind.speed} mph`;
	windDirection.textContent = `${currentData.wind.deg} deg`;
	windGust.textContent = `gusting ${currentData.wind.gust} mph`;
}

// current day with temperature, humidity, chance of rain, wind speed, wind gust, wind direction
// forecast with day, high temp, low temp, rain,
// --------------------------------
// Current weather by city
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// f551aa333efad9f396978ebc92ee0b3a <- API key
// &units=imperial

// current temp: weatherData.main.temp; weatherData.main.temp_max; weatherData.main.temp_min;
// current weather: weatherData.weather.description
// humidity; weatherData.main.humidity;
// wind: weatherData.wind.deg; weatherData.wind.gust; weatherData.wind.speed;

// -----------------------------------
// Daily forecast by city
// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
// f551aa333efad9f396978ebc92ee0b3a <- API key
// &units=imperial
// cnt is number of days

// location: location.name;
// wind: forecast.windDirection.deg; forecast.windSpeed.unit; forecast.windGust.gust;
// temp: forecast.temperature.max; forecast.temperature.min;
