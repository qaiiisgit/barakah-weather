const BASE_URL = 'https://api.aladhan.com/v1';

export const fetchPrayerTimes = async (lat, lon, method = 2) => {
  try {
    const today = new Date();
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      method,
      date,
    });
  
    const response = await fetch(`${BASE_URL}/timings/${date}?${params}`);
    if (!response.ok) throw new Error(`Prayer API error: ${response.status}`);
    const data = await response.json();

    if (data.code !== 200) throw new Error(data.status || 'Prayer API error');

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};