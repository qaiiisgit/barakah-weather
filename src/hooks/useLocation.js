import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'barakah_location';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Handle storage errors silently
  }
};

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        'Unknown Location';
      const country = data.address?.country_code?.toUpperCase() || '';
      return `${city}${country ? ', ' + country : ''}`;
    } catch {
      return 'Your Location';
    }
  };

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        const name = await reverseGeocode(lat, lon);
        const locationData = { lat, lon, name, timestamp: Date.now() };

        setLocation({ lat, lon });
        setLocationName(name);
        saveToStorage(locationData);
        setLoading(false);
        setPermissionDenied(false);
      },
      (err) => {
        if (err.code === 1) {
          setPermissionDenied(true);
          setError('Location permission denied');
        } else {
          setError('Unable to detect location');
        }

        const stored = loadFromStorage();
        if (stored) {
          setLocation({ lat: stored.lat, lon: stored.lon });
          setLocationName(stored.name + ' (cached)');
        }
        setLoading(false);
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const setManualLocation = useCallback(async (lat, lon, name) => {
    const locationData = { lat, lon, name, timestamp: Date.now() };
    setLocation({ lat, lon });
    setLocationName(name);
    saveToStorage(locationData);
    setError(null);
    setPermissionDenied(false);
  }, []);

  useEffect(() => {
    const stored = loadFromStorage();
    const oneHour = 60 * 60 * 1000;

    if (stored && Date.now() - stored.timestamp < oneHour) {
      setLocation({ lat: stored.lat, lon: stored.lon });
      setLocationName(stored.name);
      setLoading(false);
    } else {
      detectLocation();
    }
  }, [detectLocation]);

  return {
    location,
    locationName,
    loading,
    error,
    permissionDenied,
    detectLocation,
    setManualLocation,
  };
};