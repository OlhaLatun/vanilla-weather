const API_KEY = "943216857682093a1e6ba773a9600c97";
const WEEK = [
  "Monday",
  "Tuestday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

window.addEventListener("load", handleCurrentLocation);

function handleCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  ).then((res) => res.json().then((data) => renderWeather(data)));
}

const currentWeather = document.querySelector(".weather-container");

form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
  e.preventDefault();
  getWeather(e.target[0].value);
}

async function getWeather(city) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      renderWeather(data);
    });
}

function renderWeather({ main, name, weather, sys }) {
  const date = new Date();
  currentWeather.innerHTML = "";
  currentWeather.insertAdjacentHTML(
    "beforeend",
    `<div class="current-weather">
        <img alt="weather-icon" src="http://openweathermap.org/img/wn/${
          weather[0].icon
        }@2x.png">
          <div class="temperature"> <span id="temp">${main.temp.toFixed(
            0
          )} </span>
           <span class="units">
              <span class='unit unit-active' id="celcius"> °C </span> | <span class='unit' id="fahrenheit"> °F</span>
            </span>, ${weather[0].description}
          </div>
          <div id="location" class="location">${name}, ${sys.country}</div> 
          </div>
           <div class="local-time">
          <div class="time">${date.getHours()}: ${date.getMinutes()}</div>
          <div class="day">${WEEK[date.getDay() - 1]}</div>
        </div>`
  );

  handleUnits();
}

function handleUnits() {
  const units = document.querySelector(".units");
  const temp = document.querySelector("#temp");

  units.addEventListener("click", (e) => {
    if (e.target.id === "celcius") {
      temp.innerHTML = (((+temp.innerHTML - 32) * 5) / 9).toFixed(1);
      units.children[0].className = "unit unit-active";
      units.children[1].className += "unit";
    }
    if (e.target.id === "fahrenheit") {
      temp.innerHTML = ((+temp.innerHTML * 9) / 5 + 32).toFixed(1);
      units.children[1].className = "unit unit-active";
      units.children[0].className += "unit";
    }
  });
}
