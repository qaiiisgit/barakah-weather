import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
// import WeatherCard from '../components/WeatherCard';
// import ForecastCard from '../components/ForecastCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorCard from '../components/ErrorCard';
import CitySearch from '../components/CitySearch';

const SunriseSunset = ({ sunrise, sunset }) => {
    const format = (dt) => {
        if (!dt) return '--:--';
        const d = new Date(dt);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    //   return (
    //     <div className="glass-card rounded-3xl p-5 animate-slide-up">
    //       <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-4">Sun</h3>
    //       <div className="flex justify-around">
    //         <div className="text-center">
    //           <div className="text-3xl mb-2">🌅</div>
    //           <p className="text-white font-semibold">{format(sunrise)}</p>
    //           <p className="text-slate-500 text-xs mt-1">Sunrise</p>
    //         </div>
    //         <div className="flex items-center">
    //           <div className="h-0.5 w-20 bg-linear-to-r from-orange-400 to-sky-400 rounded-full" />
    //         </div>
    //         <div className="text-center">
    //           <div className="text-3xl mb-2">🌇</div>
    //           <p className="text-white font-semibold">{format(sunset)}</p>
    //           <p className="text-slate-500 text-xs mt-1">Sunset</p>
    //         </div>
    //       </div>
    //     </div>
    //   );

    return (
        <div className='glass-card rounded-3xl p-5 animate-slide-up'>
            <h3 className='text-slate-400 text-xs uppercase tracking-widest mb-4'>Sun</h3>
            <div className='flex justify-around'>
                <div className='text-center'>
                    <div className="text-3xl mb-2">🌅</div>
                    <p className='text-white font-semibold'>{format(sunrise)}</p>
                    <p className='text-slate-500 text-xs mt-1'>Sunrise</p>
                </div>
                <div className='flex items-center'>
                    <div className='h-0.5 w-20 bg-linear-to-r from-orange-400 to-sky-400 rounded-full' />
                </div>
                <div className="text-center">
                    <div className="text-3xl mb-2">🌇</div>
                    <p className="text-white font-semibold">{format(sunset)}</p>
                    <p className='text-slate-500 text-xs mt-1'>Sunset</p>
                </div>
            </div>
        </div>
    )
};

const WeatherScreen = ({ location, locationName, permissionDenied, onRequestLocation, onSetManualLocation }) => {
    const { weather, loading, error, refresh, lastFetched } = useWeather(location);
    const [showSearch, setShowSearch] = useState(false);

    const handleSelectCity = (lat, lon, name) => {
        onSetManualLocation(lat, lon, name);
    };

    if (!location && !loading) {
        return (
            <div className="px-4 pt-4 space-y-4">
                <div className="text-center py-8">
                    <div className="text-5xl mb-4">🌍</div>
                    <h2 className="text-white text-xl font-semibold mb-2">Set Your Location</h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Allow location access or search for your city to get weather data
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={onRequestLocation}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-2xl
                font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            📍 Use My Location
                        </button>
                        <button
                            onClick={() => setShowSearch(true)}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-2xl
                font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            🔍 Search City
                        </button>
                    </div>
                </div>

                {showSearch && (
                    <CitySearch
                        onSelectCity={handleSelectCity}
                        onClose={() => setShowSearch(false)}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="px-4 pt-2 pb-24 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pt-2">
                <div>
                    <h1 className="text-white text-xl font-bold">Barakah Weather</h1>
                    {lastFetched && (
                        <p className="text-slate-500 text-xs mt-0.5">
                            Updated {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowSearch(true)}
                        className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center
              justify-center text-slate-400 hover:text-white transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button
                        onClick={refresh}
                        className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center
              justify-center text-slate-400 hover:text-white transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {loading && <LoadingSpinner message="Fetching weather data..." />}

            {error && !loading && (
                <ErrorCard
                    message={error}
                    onRetry={refresh}
                    type="error"
                />
            )}

            {weather && !loading && (
                <>
                    <WeatherCard
                        current={weather.current}
                        daily={weather.daily}
                        locationName={locationName}
                    />

                    <SunriseSunset
                        sunrise={weather.daily.sunrise?.[0]}
                        sunset={weather.daily.sunset?.[0]}
                    />

                    <ForecastCard daily={weather.daily} />
                </>
            )}

            {showSearch && (
                <CitySearch
                    onSelectCity={handleSelectCity}
                    onClose={() => setShowSearch(false)}
                />
            )}
        </div>
    );
};

export default WeatherScreen;