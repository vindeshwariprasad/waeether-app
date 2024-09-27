
const apiKey = 'e3e5e55f08f8cbd8cfddc0ebc93c76b6';
const weatherContainer = document.getElementById('weatherContainer');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const forecastContainer = document.getElementById('forecastContainer');
const recentCitiesDropdown = document.getElementById('recentCitiesDropdown');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const currentLocationButton = document.getElementById('currentLocationButton');

// Event listeners
searchButton.addEventListener('click', fetchWeatherByCity);
currentLocationButton.addEventListener('click', fetchWeatherByLocation);
recentCitiesDropdown.addEventListener('change', updateWeatherFromDropdown);

// Allow pressing "Enter" to trigger search
cityInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        fetchWeatherByCity();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    getWeather('Mumbai');
});

function fetchWeatherByCity() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    getWeather(city);
    addRecentCity(city);
    cityInput.value = ''; // Clear input after search
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, error => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    fetchWeather(url);
}

function fetchWeather(url) {
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please enter a valid city name.');
                } else {
                    throw new Error('Weather data not available.');
                }
            }
            return response.json();
        })
        .then(data => updateWeatherUI(data))
        .catch(error => alert(error.message)); // Show alert with appropriate error message
}

function updateWeatherUI(data) {
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
    temperature.innerHTML = `Temperature: ${data.main.temp}°C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    windSpeed.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    fetchForecast(data.coord.lat, data.coord.lon);
}

function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Forecast data not available');
            return response.json();
        })
        .then(data => updateForecastUI(data.list))
        .catch(error => alert(error.message));
}

function updateForecastUI(forecastList) {
    
    console.log('Forecast List:', forecastList); // Debugging line
    forecastContainer.innerHTML = '';

    // Create a map to store one forecast per day
    const dailyForecast = {};

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

        if (!dailyForecast[day]) {
            dailyForecast[day] = item;
        } else {
            // Compare existing forecast time with current item to find the closest to 12:00 PM
            const existingDate = new Date(dailyForecast[day].dt * 1000);
            const existingDiff = Math.abs(existingDate.getHours() - 12);
            const currentDiff = Math.abs(date.getHours() - 12);

            if (currentDiff < existingDiff) {
                dailyForecast[day] = item;
            }
        }
    });

    // Get the next 5 days
    const days = Object.keys(dailyForecast).slice(0, 5);

    if (days.length === 0) {
        forecastContainer.innerHTML = '<p class="text-red-500">No forecast data available.</p>';
        return;
    }

    days.forEach(day => {
        const item = dailyForecast[day];
        const forecastHTML = `
            <div class="bg-blue-500 p-6 rounded-lg text-white">
                <p class="text-xl font-semibold mb-2">${day}</p>
                <div class="flex justify-center mb-4">
                    ${getWeatherIcon(item.weather[0].icon)}
                </div>
                <p>Temp: ${item.main.temp}°C</p>
                <p>Wind: ${item.wind.speed} m/s</p>
                <p>Humidity: ${item.main.humidity}%</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastHTML;
    });
}

function getWeatherIcon(iconCode) {
    return `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;
}

function addRecentCity(city) {
    let recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

    // Remove the city if it already exists to prevent duplicates
    recentCities = recentCities.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add the city to the beginning of the array
    recentCities.unshift(city);

    // Keep only the latest 5 cities
    if (recentCities.length > 5) {
        recentCities.pop();
    }

    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    updateRecentCitiesDropdown();
}

function updateRecentCitiesDropdown() {
    const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

    if (recentCities.length === 0) {
        recentCitiesDropdown.classList.add('hidden');
        return;
    }

    recentCitiesDropdown.classList.remove('hidden');
    recentCitiesDropdown.innerHTML = '<option value="">Select a recently searched city</option>';

    recentCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        recentCitiesDropdown.appendChild(option);
    });
}

function updateWeatherFromDropdown() {
    const selectedCity = recentCitiesDropdown.value;
    if (selectedCity) {
        getWeather(selectedCity);
        addRecentCity(selectedCity); // Move the selected city to the top
    }
}

// Initialize the dropdown on page load
document.addEventListener('DOMContentLoaded', updateRecentCitiesDropdown);
