function updateWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);
	let iconElement = document.querySelector(".icon");

	cityElement.innerHTML = response.data.city;
	timeElement.innerHTML = formatDate(date);
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windElement.innerHTML = `${response.data.wind.speed}mp/h`;
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
	temperatureElement.innerHTML = Math.round(temperature);

	getForecast(response.data.city);
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
	let apiKey = "038b4b87bf0ba9bc4t1cfabo6c3435d9";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=038b4b87bf0ba9bc4t1cfabo6c3435d9&units=imperial`;
	axios.get(apiUrl).then(updateWeather);
}

function search(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-input");
	searchCity(searchInput.value);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay()];
}

function getForecast(city) {
	let apiKey = "038b4b87bf0ba9bc4t1cfabo6c3435d9";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=038b4b87bf0ba9bc4t1cfabo6c3435d9&units=imperial`;
	axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	let forecastHtml = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			forecastHtml =
				forecastHtml +
				`
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max">
            ${Math.round(day.temperature.maximum)}º
          </div>
          <div class="weather-forecast-temperature-min">${Math.round(
						day.temperature.minimum
					)}º</div>
        </div>
      </div>
    `;
		}
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm = addEventListener("submit", search);

searchCity("Hawaii");
displayForecast("Hawaii");
