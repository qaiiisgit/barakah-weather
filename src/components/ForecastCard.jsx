import React from 'react';
import { weatherCodes, formatDate } from '../services/weatherService';

const ForecastCard = ({ daily }) => {
  const days = daily.time.slice(0, 7);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wide">
          7-Day Forecast
        </h3>
        <span className="text-slate-500 text-xs">°C</span>
      </div>

      <div className="space-y-1">
        {days.map((dateStr, i) => {
          const { day, date, isToday, isFriday } = formatDate(dateStr);
          const code = daily.weather_code[i];
          const weather = weatherCodes[code] || { icon: '🌡️' };
          const max = Math.round(daily.temperature_2m_max[i]);
          const min = Math.round(daily.temperature_2m_min[i]);
          const allMax = daily.temperature_2m_max.map(Math.round);
          const allMin = daily.temperature_2m_min.map(Math.round);
          const globalMax = Math.max(...allMax);
          const globalMin = Math.min(...allMin);
          const barStart = ((min - globalMin) / (globalMax - globalMin)) * 100;
          const barWidth = ((max - min) / (globalMax - globalMin)) * 100;

          return (
            <div key={i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                isToday ? 'bg-sky-500/10' : 'hover:bg-white/5'
              }`}>
              {/* Day */}
              <div className="w-10">
                <p className={`text-sm font-medium ${
                  isFriday ? 'text-emerald-400' :
                  isToday ? 'text-sky-400' : 'text-slate-300'
                }`}>
                  {isToday ? 'Today' : day}
                </p>
                {isFriday && !isToday && (
                  <p className="text-emerald-500 text-xs">Juma</p>
                )}
              </div>

              {/* Icon */}
              <span className="text-xl w-8 text-center">{weather.icon}</span>

              {/* Temp range bar */}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-slate-400 text-xs w-7 text-right">{min}°</span>
                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-400 to-orange-400"
                    style={{
                      marginLeft: `${barStart}%`,
                      width: `${Math.max(barWidth, 10)}%`
                    }}
                  />
                </div>
                <span className="text-slate-300 text-xs w-7">{max}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;