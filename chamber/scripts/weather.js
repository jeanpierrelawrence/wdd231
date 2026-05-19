const areaName = document.querySelector('#area');
const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const sky = document.querySelector('#sky');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const url = `https://api.openweathermap.org/data/2.5/weather?lat=-34.076&lon=18.84&units=metric&appid=6bd2ff36c364c6bbb99d41fb0e51bdf2`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data)
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        alert(error);
    }
}

function displayResults(data) {

    areaName.textContent = data.name;
    temperature.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    sky.textContent = data.weather[0].main;
    wind.textContent = `${data.wind.speed}Km/h ${getWindDirection(data.wind.deg)}`;
    humidity.textContent = `${data.main.humidity}%`;
}

function getWindDirection(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
}

apiFetch();