function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    " Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}
function showData(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.weather[0].main;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusDegree = tempretureElement.innerHTML;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = showDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute(
    "alt",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "6703553b0a2c80f0cf857a38e4c2a027";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  console.log(apiUrl);
  axios.get(apiUrl).then(showData);
}

function searchHandle(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#city-name");

  search(cityNameElement.value);
}

function getForecast(coordinates) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [" Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forcastDaily = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forcastDaily.forEach(function (forcastDaily, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-day">${formatForecastDay(
                  forcastDaily.dt
                )}</div>
               <img class="weather-forecast-img" src="https://openweathermap.org/img/wn/${
                 forcastDaily.weather[0].icon
               }@2x.png" > 
                <div class="weather-forecast-tempreture">
                  <span class="weather-forecast-tempreture-max">${Math.round(
                    forcastDaily.temp.max
                  )}°</span>
                  <span class="weather-forecast-tempreture-min">${Math.round(
                    forcastDaily.temp.min
                  )}°</span>
                </div>
              </div>
              
            `;
    }
  });
  forecastElement.innerHTML = forecastHTML + "</div>";
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchHandle);

search("kerman");
