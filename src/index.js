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

const currentWeather = document.querySelector(".weather-container");
const weekContainer = document.querySelector(".week-forecast");

window.addEventListener("load", handleCurrentLocation);

function handleCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&units=metric&appid=${API_KEY}`
  ).then((res) =>
    res.json().then((data) => {
      renderWeather(data);
      renderDay(data);
    })
  );
}

form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
  e.preventDefault();
  getWeather(e.target[0].value);
}

async function getWeather(city) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      renderWeather(data);
      renderDay(data);
    });
}

function renderWeather(data) {
  const date = new Date(data.list[0].dt);
  const currentDate = new Date();
  currentWeather.innerHTML = "";
  currentWeather.insertAdjacentHTML(
    "beforeend",
    `<div class="current-weather">
        <img alt="weather-icon" src="http://openweathermap.org/img/wn/${
          data.list[0].weather[0].icon
        }@2x.png">
          <div class="temperature"> <span id="temp">${data.list[0].main.temp.toFixed(
            0
          )} </span>
           <span class="units">
              <span class='unit unit-active unit-disabled' id="celcius"> °C </span> | <span class='unit' id="fahrenheit"> °F</span>
            </span>, ${data.list[0].weather[0].description}
          </div>
          <div id="location" class="location">${data.city.name}</div>
          </div>
           <div class="more-info-card">
              <div>Humidity: <span class="humidity">${
                data.list[0].main.humidity
              }</span></div>
          <div >Wind: <span class="wind">${
            data.list[0].wind.speed
          } km/h</span></div>
           </div>
           <div class="local-time">
          <div class="time">${currentDate.getHours()}: ${currentDate.getMinutes()}</div>
          <div class="day">${WEEK[date.getDay()]}</div>
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
      units.children[0].className = "unit unit-active unit-disabled";
      units.children[1].className += "unit";
    }
    if (e.target.id === "fahrenheit") {
      temp.innerHTML = ((+temp.innerHTML * 9) / 5 + 32).toFixed(1);
      units.children[1].className = "unit unit-active unit-disabled";
      units.children[0].className += "unit";
    }
  });
}

function renderDay(data) {
  clearForecast();

  const [current, ...restOfTheWeek] = data.list;

  const date = new Date(current.dt);
  let weekday = date.getDay();

  restOfTheWeek.forEach((day) => {
    weekday++;
    if (!WEEK[weekday]) weekday = 0;

    weekContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="day">
            <div class="title">${WEEK[weekday]}</div>
            <div class="day-icon"><img alt="weather-icon" src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png"></div>
            <div class="day-temp">
              <span class="morning"> ${Math.ceil(day.main.temp_min)} °C</span>
              <span class="evening">${Math.ceil(day.main.temp_max)} °C</span>
            </div>
          </div>`
    );
  });
}

function clearForecast() {
  while (weekContainer.firstChild) {
    weekContainer.removeChild(weekContainer.firstChild);
  }
}
