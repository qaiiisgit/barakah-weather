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

export const calculateQiblaLocally = (lat, lon) => {
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  const lat1 = (lat * Math.PI) / 180;
  const lat2 = (KAABA_LAT * Math.PI) / 180;
  const deltaLon = ((KAABA_LON - lon) * Math.PI) / 180;

  const y = Math.sin(deltaLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  return bearing;
};

export const getCompassLabel = (degrees) => {
  const directions = [
    { label: 'N', min: 337.5, max: 360 },
    { label: 'N', min: 0, max: 22.5 },
    { label: 'NE', min: 22.5, max: 67.5 },
    { label: 'E', min: 67.5, max: 112.5 },
    { label: 'SE', min: 112.5, max: 157.5 },
    { label: 'S', min: 157.5, max: 202.5 },
    { label: 'SW', min: 202.5, max: 247.5 },
    { label: 'W', min: 247.5, max: 292.5 },
    { label: 'NW', min: 292.5, max: 337.5 },
  ];

  return directions.find(d => degrees >= d.min && degrees < d.max)?.label || 'N';
};
