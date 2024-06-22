function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#currentHumidity");
  humidityElement = response.data.temperature.humidity;
  currentHumidity.innerHTML = humidityElement + "%";

  let windElement = document.querySelector("#currentWind");
  windElement = response.data.wind.speed;
  currentWind.innerHTML = windElement + "km/h";

  let conditionElement = document.querySelector("#atmosphere");
  conditionElement = response.data.condition.description;
  atmosphere.innerHTML = conditionElement;

  let iconElement = document.querySelector("#icon");

  iconElement = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
  icon.innerHTML = iconElement;
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp + 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(response, city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl);
  console.log(response.data);
  let max = Math.round(response.data.daily.temperature.maximum);
  let forecastHtml =
    forecastHtml +
    `
    <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(days.time)}</div>
               <div class="weather-forecast-icon"><img
                src="${day.condition.icon_url}" class="weather-forecast-icon"
                width="45"
              /></div>
              
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${max}°</strong> </span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div></div>`;

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml = `
    <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDate(day.time)}</div>
               <div class="weather-forecast-icon"><img
                src="${day.condition.icon_url}" class="weather-forecast-icon"
                width="45"
              /></div>
              
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>${max}°</strong> </span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div></div>`;
      let forecastElement = document.querySelector("#forecast");
      forecastElement.innerHTML = forecastHtml;
    }
  });
}

getForecast("Paris");
