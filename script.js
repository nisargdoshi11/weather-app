// const apiKey = 'ee2827fd459749e9b63135359240508'; // Your new WeatherAPI key
// const weatherInfo = document.getElementById('weather-info');
// const loadingIndicator = document.getElementById('loading');
// const historyList = document.getElementById('history-list');

// document.getElementById('search').addEventListener('click', () => {
//     const city = document.getElementById('city').value.trim();
//     if (city) {
//         fetchWeather(city);
//     }
// });

// document.getElementById('geo').addEventListener('click', () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             fetchWeatherByCoordinates(lat, lon);
//         }, () => {
//             showError('Unable to retrieve your location.');
//         });
//     } else {
//         showError('Geolocation is not supported by this browser.');
//     }
// });

// function fetchWeather(query) {
//     showLoading();
//     const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`;
//     console.log(`Fetching data from: ${url}`); // Log the URL for debugging
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log('API Response:', data); // Log the API response
//             if (data && data.location) {
//                 const weatherInfoHtml = `
//                     <h2>Weather in ${data.location.name}</h2>
//                     <p>Temperature: ${data.current.temp_c}°C</p>
//                     <p>Weather: ${data.current.condition.text}</p>
//                 `;
//                 weatherInfo.innerHTML = weatherInfoHtml;
//                 addToHistory(data.location.name);
//             } else {
//                 showError('City not found.');
//             }
//         })
//         .catch(() => showError('An error occurred while fetching data.'))
//         .finally(() => hideLoading());
// }

// function fetchWeatherByCoordinates(lat, lon) {
//     showLoading();
//     const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
//     console.log(`Fetching data from: ${url}`); // Log the URL for debugging
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log('API Response:', data); // Log the API response
//             if (data && data.location) {
//                 const weatherInfoHtml = `
//                     <h2>Weather in ${data.location.name}</h2>
//                     <p>Temperature: ${data.current.temp_c}°C</p>
//                     <p>Weather: ${data.current.condition.text}</p>
//                 `;
//                 weatherInfo.innerHTML = weatherInfoHtml;
//                 addToHistory(data.location.name);
//             } else {
//                 showError('Location not found.');
//             }
//         })
//         .catch(() => showError('An error occurred while fetching data.'))
//         .finally(() => hideLoading());
// }

// function showError(message) {
//     weatherInfo.innerHTML = `<p>${message}</p>`;
//     hideLoading();
// }

// function showLoading() {
//     loadingIndicator.classList.remove('hidden');
// }

// function hideLoading() {
//     loadingIndicator.classList.add('hidden');
// }

// function addToHistory(city) {
//     const listItem = document.createElement('li');
//     listItem.textContent = city;
//     listItem.addEventListener('click', () => {
//         document.getElementById('city').value = city;
//         fetchWeather(city);
//     });
//     historyList.appendChild(listItem);
// }


const apiKey = 'ee2827fd459749e9b63135359240508'; // Your new WeatherAPI key
const weatherInfo = document.getElementById('weather-info');
const loadingIndicator = document.getElementById('loading');
const historyList = document.getElementById('history-list');

document.getElementById('search').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
        fetchWeather(city);
    }
});

document.getElementById('geo').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoordinates(lat, lon);
        }, () => {
            showError('Unable to retrieve your location.');
        });
    } else {
        showError('Geolocation is not supported by this browser.');
    }
});

function fetchWeather(query) {
    showLoading();
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`;
    console.log(`Fetching data from: ${url}`); // Log the URL for debugging
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the API response
            if (data && data.location) {
                const weatherInfoHtml = `
                    <h2>Weather in ${data.location.name}</h2>
                    <p>Temperature: ${data.current.temp_c}°C</p>
                    <p>Weather: ${data.current.condition.text}</p>
                `;
                weatherInfo.innerHTML = weatherInfoHtml;
                addToHistory(data.location.name);
            } else {
                showError('City not found.');
            }
        })
        .catch(error => showError('An error occurred while fetching data: ' + error.message))
        .finally(() => hideLoading());
}

function fetchWeatherByCoordinates(lat, lon) {
    showLoading();
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    console.log(`Fetching data from: ${url}`); // Log the URL for debugging
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the API response
            if (data && data.location) {
                const weatherInfoHtml = `
                    <h2>Weather in ${data.location.name}</h2>
                    <p>Temperature: ${data.current.temp_c}°C</p>
                    <p>Weather: ${data.current.condition.text}</p>
                `;
                weatherInfo.innerHTML = weatherInfoHtml;
                addToHistory(data.location.name);
            } else {
                showError('Location not found.');
            }
        })
        .catch(error => showError('An error occurred while fetching data: ' + error.message))
        .finally(() => hideLoading());
}

function showError(message) {
    weatherInfo.innerHTML = `<p>${message}</p>`;
    hideLoading();
}

function showLoading() {
    loadingIndicator.classList.remove('hidden');
}

function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function addToHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        document.getElementById('city').value = city;
        fetchWeather(city);
    });
    historyList.appendChild(listItem);
}
