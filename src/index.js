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

let searchForm = document.querySelector("#search-form");
searchForm = addEventListener("submit", search);

function displayForecast() {
	let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
	let forecastHtml = "";

	days.forEach(function (day) {
		forecastHtml =
			forecastHtml +
			`
      
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max">
            78º
          </div>
          <div class="weather-forecast-temperature-min">69º</div>
        </div>
      </div>
    `;
	});

	let forecastElement = document.querySelector("#forecast");
	forecastElement.innerHTML = forecastHtml;
}

searchCity("Hawaii");
displayForecast();
