export function displayWeather(data, container) {
  container.innerHTML = '';

  if (!data || !data.city || !data.list || data.list.length === 0) {
    displayError(container, 'Місто не знайдено або немає доступних даних');
    return;
  }

  const today = data.list[0];
  const weatherIcon = `https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`;
  const { avgDayTemp, avgNightTemp } = calculateDayNightTemp(data.list);

  const todayHtml = `
      <h3 class="selected-location">Selected: ${data.city.name}, ${data.city.country}</h3>
      <div class="current-weather">
          <div class="current-weather_firstBlock">
              <p class="current-weather_temperature">${Math.round(avgDayTemp)}°C</p>
              <div class="firstBlock-description">
                  <p>${today.weather[0].main}</p>
                  <p>${Math.round(avgNightTemp)}°C</p>
              </div>
          </div>

          <div class="current-weather_description">
              <p>${today.weather[0].description}</p>
              <p>${data.city.name}, ${data.city.country}</p>
          </div>
          <img class="current-weather_img" src="${weatherIcon}" alt="${today.weather[0].description}" />
      </div>
  `;

  let forecastHtml = "<div class='forecast'>";

  for (let i = 1; i <= 4; i++) {
    const dailyForecast = data.list.slice(i * 8 - 8, i * 8);
    const { avgDayTemp, avgNightTemp } = calculateDayNightTemp(dailyForecast);

    if (dailyForecast.length > 0) {
      const item = dailyForecast[Math.floor(dailyForecast.length / 2)];
      const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

      forecastHtml += `
              <div class="weekday">
                  <p class="weekday-item">${new Date(item.dt_txt).toLocaleDateString('en', { weekday: 'short' })}</p>
                  <img class="forecast-img" src="${iconUrl}" alt="${item.weather[0].description}" />
                  <p class="weekday-description">${item.weather[0].description}</p>

                  <div class="day-temperature">
                      <p class="timeOfDay">Day</p>
                      <p class="weekday-temperature">${Math.round(avgDayTemp)}°C</p>
                      <p class="weekday-temperature">${Math.round(avgNightTemp)}°C</p>
                      <p class="timeOfDay">Night</p>
                  </div>
              </div>
          `;
    }
  }

  forecastHtml += '</div>';
  container.innerHTML = todayHtml + forecastHtml;
}

export function displayError(container, message) {
  container.innerHTML = `<p class='error-message'>${message}</p>`;
}

function calculateDayNightTemp(forecastList) {
  let dayTemps = [];
  let nightTemps = [];

  forecastList.forEach((entry) => {
    const hour = new Date(entry.dt * 1000).getHours();
    if (hour >= 6 && hour < 18) {
      dayTemps.push(entry.main.temp);
    } else {
      nightTemps.push(entry.main.temp);
    }
  });

  const avgDayTemp = dayTemps.length ? dayTemps.reduce((a, b) => a + b, 0) / dayTemps.length : 0;
  const avgNightTemp = nightTemps.length ? nightTemps.reduce((a, b) => a + b, 0) / nightTemps.length : 0;

  return { avgDayTemp, avgNightTemp };
}
