import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPrayerTimes, getNextPrayer, getCountdown } from '../services/prayerService';

export const usePrayerTimes = (location, method = 2) => {
  const [prayerData, setPrayerData] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  const loadPrayerTimes = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    const result = await fetchPrayerTimes(location.lat, location.lon, method);

    if (result.success) {
      setPrayerData(result.data);
      const next = getNextPrayer(result.data.timings);
      setNextPrayer(next);
    } else {
      setError(result.error);
    }

    setLoading(false);
  }, [location, method]);

  useEffect(() => {
    loadPrayerTimes();
  }, [loadPrayerTimes]);

  // Update next prayer & countdown every second
  useEffect(() => {
    if (!prayerData) return;

    const tick = () => {
      const next = getNextPrayer(prayerData.timings);
      setNextPrayer(next);
      if (next) {
        setCountdown(getCountdown(next.time));
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
  }, [prayerData]);

  // Refresh at midnight
  useEffect(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight - now;

    const timeout = setTimeout(() => {
      loadPrayerTimes();
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [loadPrayerTimes]);

  return { prayerData, nextPrayer, countdown, refresh: loadPrayerTimes };
  
};