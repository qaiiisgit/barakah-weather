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
  
  </div>
)}

export default PrayerCard;
