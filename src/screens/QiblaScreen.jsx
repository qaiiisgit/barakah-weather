const QiblaScreen = ({ location, locationName }) => {
  const {
    qiblaDirection,
    compassHeading,
    arrowRotation,
    loading,
    error,
    compassSupported,
    compassPermission,
    requestCompassPermission,
    refresh,
  } = useQibla(location);