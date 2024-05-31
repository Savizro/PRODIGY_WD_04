const apiKey = '9cf24ad9556bd1ce52393969818d0962';

function getWeather() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(null, lat, lon);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
}

function fetchWeatherData(location, lat = null, lon = null) {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (location) {
        url += `&q=${location}`;
    } else if (lat !== null && lon !== null) {
        url += `&lat=${lat}&lon=${lon}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}
