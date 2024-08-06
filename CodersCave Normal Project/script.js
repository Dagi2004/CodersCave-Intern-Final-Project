function getWeather() {
  const apiKey = "e64b65956aab3e23cb897b33a1f193e9";
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city");
    return;
  }
  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeather)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather", error);
      alert("Error fetching current weather. Please try again.");
    });

  fetch(forecastWeather)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly weather forecast", error);
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temperature-div");
  const weatherDivInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecast = document.getElementById("hourForecast");
  weatherDivInfo.innerHTML = "";
  hourlyForecast.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherDivInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
      `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherDivInfo.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecast = document.getElementById("hourForecast");
  const nextforecastList = hourlyData.slice(0, 8);
  hourlyForecast.innerHTML = "";
  nextforecastList.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // convert unix timestamp into js
    const hour = dateTime.getHours();
    const temp = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const hourlyItemHTML = `
       <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temp}°C</span>
            </div>
        `;

    hourlyForecast.innerHTML += hourlyItemHTML;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
