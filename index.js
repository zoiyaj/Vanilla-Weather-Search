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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-container">
              <div class="weather-forecast-date">${day}</div>
               <div class="weather-forecast-icon"><img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                alt=""
                width="45"
              /></div>
              
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18° </span>
                <span class="weather-forecast-temperature-min">12°</span>
              </div></div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
