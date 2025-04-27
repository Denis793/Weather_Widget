const API_KEY = '034af4fcba616e18c230560269bd5054';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchWeather(city) {
  try {
    const response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status} (${response.statusText})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Помилка отримання даних з API:', error);

    return null;
  }
}
