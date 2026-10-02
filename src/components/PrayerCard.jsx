import React from 'react'

const PrayerCard = ({timings, nextPrayer, date}) => {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-slide-up">
      {/* Header */}
      {date && (
        <div className="px-5 py-4 bg-linear-to-r from-emerald-900/30 to-teal-900/30 border-b border-white/5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-400 text-xs uppercase tracking-widest font-medium">Prayer Times</p>
              <p className="text-slate-300 text-sm mt-0.5">{date.readable}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs">Hijri</p>
              <p className="text-slate-300 text-sm">{date.hijri?.day} {date.hijri?.month?.en} {date.hijri?.year}</p>
            </div>
          </div>
        </div>
  )} 
  
   {/* Prayers */}
      <div className="p-4 space-y-1">
        {PRAYER_NAMES.map((prayer) => {
          const isNext = nextPrayer?.key === prayer.key;
          const isPast = (() => {
            if (!timings[prayer.key]) return false;
            const [h, m] = timings[prayer.key].split(':').map(Number);
            const prayerMins = h * 60 + m;
            const now = new Date();
            const nowMins = now.getHours() * 60 + now.getMinutes();
            return prayerMins < nowMins && !isNext;
          })();

          return (
            <div
              key={prayer.key}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isNext
                  ? 'bg-linear-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 prayer-glow'
                  : prayer.isInfo
                  ? 'opacity-60'
                  : isPast
                  ? 'opacity-50'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xl transition-all duration-300 ${isNext ? 'scale-110' : ''}`}>
                  {prayer.icon}
                </span>
                <div>
                  <p className={`font-medium text-sm transition-colors ${
                    isNext ? 'text-emerald-400' :
                    isPast ? 'text-slate-500' : 'text-slate-200'
                  }`}>
                    {prayer.key}
                  </p>
                  <p className={`font-arabic text-xs ${
                    isNext ? 'text-emerald-500' : 'text-slate-600'
                  }`}>
                    {prayer.arabic}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isNext && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5
                    rounded-full border border-emerald-500/30 font-medium">
                    Next
                  </span>
                )}
                {isPast && !prayer.isInfo && (
                  <span className="text-xs text-slate-600">✓</span>
                )}
                <p className={`text-sm font-semibold tabular-nums ${
                  isNext ? 'text-emerald-300' :
                  isPast ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {timings[prayer.key] ? formatPrayerTime(timings[prayer.key]) : '--:--'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
  </div>
)
}

export default PrayerCard;
