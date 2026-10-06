import React, { useState } from 'react';
import { useLocation } from './hooks/useLocation';
import WeatherScreen from './screens/WeatherScreen';
import PrayerScreen from './screens/PrayerScreen';
import QiblaScreen from './screens/QiblaScreen';
import BottomNav from './components/BottomNav';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('weather');
  const {
    location,
    locationName,
    loading: locationLoading,
    error: locationError,
    permissionDenied,
    detectLocation,
    setManualLocation,
  } = useLocation();

  const handleSetManualLocation = (lat, lon, name) => {
    setManualLocation(lat, lon, name);
  };

  const renderScreen = () => {
    const props = {
      location,
      locationName,
      permissionDenied,
      onRequestLocation: detectLocation,
      onSetManualLocation: handleSetManualLocation,
    };

    switch (activeScreen) {
      case 'weather':
        return <WeatherScreen {...props} />;
      case 'prayer':
        return <PrayerScreen {...props} />;
      case 'qibla':
        return <QiblaScreen {...props} />;
      default:
        return <WeatherScreen {...props} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg max-w-md mx-auto relative">
      {/* Status bar area */}
      <div className="h-safe-top" />

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 max-w-md mx-auto pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Initial location loading */}
      {locationLoading && !location && (
        <LoadingSpinner
          fullScreen
          message="Detecting your location..."
        />
      )}

      {/* Main content */}
      <main className="overflow-y-auto pb-20"
        style={{ minHeight: '100vh' }}>
        <div className="animate-fade-in">
          {renderScreen()}
        </div>
      </main>

      {/* Bottom Navigation */}
      {/* <BottomNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
      /> */}
    </div>
  );
};

export default App;