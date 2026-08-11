import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from '../services/weatherService';

export const useWeather = (location) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const loadWeather = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    const result = await fetchWeather(location.lat, location.lon);

    if (result.success) {
      setWeather(result.data);
      setLastFetched(new Date());
    } else {
      setError(result.error);
    }

    setLoading(false);
  }, [location]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Auto refresh every 30 minutes
  useEffect(() => {
    if (!location) return;
    const interval = setInterval(loadWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location, loadWeather]);

  return { weather, refresh: loadWeather, lastFetched };
};