const url = `https://api.openweathermap.org/data/2.5/forecast?lat=-34.076&lon=18.&units=metric&appid=6bd2ff36c364c6bbb99d41fb0e51bdf2`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const threeDayData = parseWeatherObjects(data);

            displayTodaysWeather(data);
            displayForecast(threeDayData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        alert(error);
    }
}

function parseWeatherObjects(data) {
    const middayForecasts = data.list.filter(forecastItem => {
        return forecastItem.dt_txt.includes("12:00:00");
    })

    return middayForecasts.slice(0, 4);
}

function displayForecast(data) {


    console.log(data);

    const tomorrow = document.querySelector("#forecast-day-2-name");
    const dayAfterTomorrow = document.querySelector("#forecast-day-3-name");
    const tomorrowImg = document.querySelector("#forecast-day2");
    const dayAfterTomorrowImg = document.querySelector("#forecast-day3");
    const tomorrowTemp = document.querySelector("#forecast-day2-temp");
    const dayAfterTomorrowTemp = document.querySelector("#forecast-day3-temp");
    const dayThreeFuture = document.querySelector("#forecast-day-4-name");
    const dayThreeFutureImg = document.querySelector("#forecast-day4");
    const dayThreeFutureTemp = document.querySelector("#forecast-day4-temp");

    data.forEach((forecastDay, index) => {
        const date = new Date(forecastDay.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const roundedTemp = `${Math.round(forecastDay.main.temp)}&deg;`;
        const iconSrc = `https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`;
        const description = forecastDay.weather[0].description;

        if (index === 0) {
            tomorrow.textContent = dayName;
            tomorrowTemp.innerHTML = roundedTemp;
            tomorrowImg.setAttribute("src", iconSrc);
            tomorrowImg.setAttribute("alt", description);
        } else if (index === 1) {
            dayAfterTomorrow.textContent = dayName;
            dayAfterTomorrowTemp.innerHTML = roundedTemp;
            dayAfterTomorrowImg.setAttribute("src", iconSrc);
            dayAfterTomorrowImg.setAttribute("alt", description);
        } else if (index === 2) {
            dayThreeFuture.textContent = dayName;
            dayThreeFutureTemp.innerHTML = roundedTemp;
            dayThreeFutureImg.setAttribute("src", iconSrc);
            dayThreeFutureImg.setAttribute("alt", description);
        }
    });

}

function displayTodaysWeather(data) {

    const temperature = document.querySelector('#temperature');
    const weatherIcon = document.querySelector('#weather-icon');
    const sky = document.querySelector('#sky');
    const wind = document.querySelector('#wind');
    const tempMinMax = document.querySelector("#temp-details");

    const current = data.list[0];

    temperature.innerHTML = `${Math.round(current.main.temp)}&deg;`;
    const iconsrc = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    let desc = current.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    tempMinMax.textContent = `H: ${current.main.temp_max} L: ${current.main.temp_min}`;
    sky.textContent = current.weather[0].main;
    wind.textContent = `${current.wind.speed}Km/h ${getWindDirection(current.wind.deg)}`;
}

function getWindDirection(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
}

apiFetch();