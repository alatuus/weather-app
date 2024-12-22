document.getElementById("search-btn").addEventListener("click", function () {
    var city = document.getElementById("city").value;
    if (city) {
        fetchWeather(city);
    }
    else {
        alert("Please enter a city name!");
    }
});
function fetchWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(API_KEY, "&units=metric");
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) { return displayWeather(data); })
        .catch(function (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again.");
    });
}
function displayWeather(data) {
    if (data.cod === 200) {
        var weatherInfo = "<h2>".concat(data.name, ", ").concat(data.sys.country, "</h2>\n        <p>").concat(data.weather[0].description, "</p>\n        <p>Temperature: ").concat(data.main.temp, "\u00B0C</p>\n        <p>Humidity: ").concat(data.main.humidity, "%</p>\n        <p>Wind Speed: ").concat(data.wind.speed, " m/s</p>");
        document.getElementById("weather-info").innerHTML = weatherInfo;
    }
    else {
        document.getElementById("weather-info").innerHTML = "<p>".concat(data.message, "</p>");
    }
}
