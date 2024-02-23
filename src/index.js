function updateWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city");

	cityElement.innerHTML = response.data.city;
	temperatureElement.innerHTML = Math.round(temperature);
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
