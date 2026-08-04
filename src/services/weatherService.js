const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

export const weatherCodes = {
  0: { label: 'Clear Sky', icon: '☀️' },
  1: { label: 'Mainly Clear', icon: '🌤️' },
  2: { label: 'Partly Cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Icy Fog', icon: '🌫️' },
  51: { label: 'Light Drizzle', icon: '🌦️' },
  53: { label: 'Drizzle', icon: '🌦️' },
  55: { label: 'Heavy Drizzle', icon: '🌧️' },
  61: { label: 'Slight Rain', icon: '🌧️' },
  63: { label: 'Rain', icon: '🌧️' },
  65: { label: 'Heavy Rain', icon: '🌧️' },
  71: { label: 'Slight Snow', icon: '🌨️' },
  73: { label: 'Snow', icon: '❄️' },
  75: { label: 'Heavy Snow', icon: '❄️' },
  77: { label: 'Snow Grains', icon: '🌨️' },
  80: { label: 'Slight Showers', icon: '🌦️' },
  81: { label: 'Showers', icon: '🌧️' },
  82: { label: 'Heavy Showers', icon: '⛈️' },
  85: { label: 'Snow Showers', icon: '🌨️' },
  86: { label: 'Heavy Snow Showers', icon: '❄️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm w/ Hail', icon: '⛈️' },
  99: { label: 'Heavy Thunderstorm', icon: '⛈️' },
};

export const fetchWeather = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'weather_code',
        'wind_speed_10m',
        'wind_direction_10m',
        'precipitation',
        'uv_index',
        'surface_pressure',
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'wind_speed_10m_max',
        'sunrise',
        'sunset',
      ].join(','),
      timezone: 'auto',
      forecast_days: 7,
    });

    const response = await fetch(`${BASE_URL}/forecast?${params}`);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const searchCity = async (cityName) => {
  try {
    const params = new URLSearchParams({
      name: cityName,
      count: 5,
      language: 'en',
      format: 'json',
    });

    const response = await fetch(`${GEOCODING_URL}/search?${params}`);
    if (!response.ok) throw new Error(`Geocoding API error: ${response.status}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return { success: false, error: 'City not found' };
    }

    return { success: true, data: data.results };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return {
    day: days[date.getDay()],
    date: `${date.getDate()} ${months[date.getMonth()]}`,
    isToday: new Date().toDateString() === date.toDateString(),
    isFriday: date.getDay() === 5,
  };
};