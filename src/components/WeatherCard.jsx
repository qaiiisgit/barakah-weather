import React from 'react';
import { weatherCodes, getWindDirection } from '../services/weatherService';

const StatBadge = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-1 bg-white/5 rounded-2xl p-3 flex-1">
    <span className="text-lg">{icon}</span>
    <span className="text-slate-200 font-semibold text-sm">{value}</span>
    <span className="text-slate-500 text-xs">{label}</span>
  </div>
);

const WeatherCard = ({ current, daily, locationName }) => {
  const code = current.weather_code;
  const weather = weatherCodes[code] || { label: 'Unknown', icon: '🌡️' };
  const windDir = getWindDirection(current.wind_direction_10m);
  const todayMax = daily.temperature_2m_max[0];
  const todayMin = daily.temperature_2m_min[0];

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 glass-card
        bg-linear-to-br from-sky-900/40 via-blue-900/30 to-indigo-900/40">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-sky-400/5 rounded-full
          -translate-y-10 translate-x-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/5 rounded-full
          translate-y-8 -translate-x-8 blur-2xl" />

        <div className="relative z-10">
          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            <span className="text-slate-300 text-sm font-medium truncate">{locationName}</span>
          </div>

          {/* Main temp */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-8xl font-thin text-white leading-none mb-1">
                {Math.round(current.temperature_2m)}°
              </div>
              <div className="text-slate-300 text-sm ml-1">
                Feels like {Math.round(current.apparent_temperature)}°
              </div>
              <div className="text-slate-400 text-sm ml-1 mt-1">{weather.label}</div>
            </div>
            <div className="text-6xl mt-2">{weather.icon}</div>
          </div>

          {/* High/Low */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1 text-sm">
              <span className="text-red-400">↑</span>
              <span className="text-slate-300 font-medium">{Math.round(todayMax)}°</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-blue-400">↓</span>
              <span className="text-slate-300 font-medium">{Math.round(todayMin)}°</span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-2">
            <StatBadge icon="💧" label="Humidity" value={`${current.relative_humidity_2m}%`} />
            <StatBadge icon="💨" label="Wind" value={`${Math.round(current.wind_speed_10m)} km/h ${windDir}`} />
            <StatBadge icon="🌡️" label="Pressure" value={`${Math.round(current.surface_pressure)} hPa`} />
            <StatBadge icon="☀️" label="UV Index" value={Math.round(current.uv_index || 0)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;