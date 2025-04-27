import { fetchWeather } from './api.js';
import { displayWeather, displayError } from './render.js';

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('search');
  const weatherContainer = document.getElementById('weather');

  async function handleSearch(city) {
    const weatherData = await fetchWeather(city);

    if (weatherData) {
      displayWeather(weatherData, weatherContainer);
    } else {
      displayError(weatherContainer, `<p class="error">Місто не знайдено або немає доступних даних</p>`);
    }
  }

  searchInput.addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
      const city = event.target.value.trim();

      if (city) {
        handleSearch(city);
      }
    }
  });

  handleSearch('Kyiv');
});
