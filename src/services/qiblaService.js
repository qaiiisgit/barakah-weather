const BASE_URL = 'https://api.aladhan.com/v1';

export const fetchQiblaDirection = async (lat, lon) => {
  try {
    const params = new URLSearchParams({ latitude: lat, longitude: lon });
    const response = await fetch(`${BASE_URL}/qibla/${lat}/${lon}`);
    if (!response.ok) throw new Error(`Qibla API error: ${response.status}`);
    const data = await response.json();

    if (data.code !== 200) throw new Error(data.status || 'Qibla API error');

    return { success: true, direction: data.data.direction };
  } catch (error) {
    return { success: false, error: error.message };
  }
};