import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchQiblaDirection, calculateQiblaLocally } from '../services/qiblaService';

export const useQibla = (location) => {
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [compassHeading, setCompassHeading] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compassSupported, setCompassSupported] = useState(false);
  const [compassPermission, setCompassPermission] = useState('unknown');
  const smoothHeading = useRef(0);
  const animFrameRef = useRef(null);

  const loadQiblaDirection = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    const result = await fetchQiblaDirection(location.lat, location.lon);

    if (result.success) {
      setQiblaDirection(result.direction);
    } else {
      // Fallback to local calculation
      const localDirection = calculateQiblaLocally(location.lat, location.lon);
      setQiblaDirection(localDirection);
    }

    setLoading(false);
  }, [location]);

  useEffect(() => {
    loadQiblaDirection();
  }, [loadQiblaDirection]);

  // Web Compass API
//   const requestCompassPermission = useCallback(async () => {
//     if (typeof DeviceOrientationEvent !== 'undefined' &&
//       typeof DeviceOrientationEvent.requestPermission === 'function') {
//       try {
//         const permission = await DeviceOrientationEvent.requestPermission();
//         setCompassPermission(permission);
//         if (permission === 'granted') {
//           setCompassSupported(true);
//         }
//       } catch {
//         setCompassPermission('denied');
//       }
//     } else if (window.DeviceOrientationEvent) {
//       setCompassSupported(true);
//       setCompassPermission('granted');
//     } else {
//       setCompassPermission('not-supported');
//     }
//   }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      let heading = 0;

      if (event.webkitCompassHeading !== undefined) {
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }

      // Smooth the heading
      const diff = heading - smoothHeading.current;
      const normalizedDiff = ((diff + 180) % 360) - 180;
      smoothHeading.current = (smoothHeading.current + normalizedDiff * 0.1 + 360) % 360;

      setCompassHeading(Math.round(smoothHeading.current));
    };

    if (compassSupported) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [compassSupported]);

  const arrowRotation = qiblaDirection !== null
    ? (qiblaDirection - compassHeading + 360) % 360
    : null;

  return {
    qiblaDirection,
    compassHeading,
    arrowRotation,
    loading,
    error,
    compassSupported,
    compassPermission,
    requestCompassPermission,
    refresh: loadQiblaDirection,
  };
};