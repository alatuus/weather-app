document.getElementById("search-btn")?.addEventListener("click", () => {
  const cityInput = document.getElementById("city") as HTMLInputElement | null;
  const city = cityInput?.value;

  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

function fetchWeather(city: string) {
  const API_KEY = "YOUR_API_KEY_HERE"; // Substitua pela sua chave de API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again.");
    });
}

function displayWeather(data: any) {
  const weatherInfoElement = document.getElementById("weather-info");
  if (!weatherInfoElement) {
    console.error("Weather info element not found!");
    return;
  }

  if (data.cod === 200) {
    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfoElement.innerHTML = weatherInfo;
  } else {
    weatherInfoElement.innerHTML = `<p>${data.message}</p>`;
  }
}