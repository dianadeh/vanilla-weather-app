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
}

function search(city) {
  let apiKey = "6703553b0a2c80f0cf857a38e4c2a027";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(showData);
}

function searchHandle(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#city-name");

  search(cityNameElement.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let celsius = document.querySelector("#tempreture");
  let toFahrenheit = (celsiusDegree * 9) / 5 + 32;
  celsius.innerHTML = Math.round(toFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheit = document.querySelector("#tempreture");
  fahrenheit.innerHTML = celsiusDegree;
}

let celsiusDegree = null;

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchHandle);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("kerman");
