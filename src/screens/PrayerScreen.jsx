import React, { useState } from 'react'
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import ErrorCard from '../components/ErrorCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CountdownTimer = ({ countdown, nextPrayer }) => {
  if (!countdown || !nextPrayer) return null;

  return (
    <div className="glass-card rounded-3xl p-6 bg-linear-to-br from-emerald-900/30
      via-teal-900/20 to-slate-900/30 border border-emerald-500/20 animate-fade-in">
      <div className="text-center">
        <p className="text-emerald-400 text-xs uppercase tracking-widest font-medium mb-2">
          Next Prayer
        </p>
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-2xl">{nextPrayer.icon}</span>
          <p className="text-white text-2xl font-bold ml-2">{nextPrayer.key}</p>
        </div>
        <p className="text-slate-400 font-arabic text-sm mb-5">{nextPrayer.arabic}</p>

      </div>
    </div>
  );
};

const PrayerScreen = ({ location, locationName }) => {
    const [method, setMethod] = useState(2);
    const [showMethodPicker, setShowMethodPicker] = useState(false);
    const { prayerData, nextPrayer, countdown, loading, error, refresh } = usePrayerTimes(location, method);

    if (!location) {
        return (
            <div className='px-4 pt-4'>
                <ErrorCard
                    type="permission" message="Please enable location access or search for a city to view prayer times" />
            </div>
        );
    }

    const dateInfo = prayerData?.date ? {
        readable: prayerData.date.readable, hijri: prayerData.date.hijri,
    } : null;


    return (
        <div className='px-4 pt-2 pb-24 space-y-4'>
            {/* Header */}
            <div className='flex items-center justify-between pt-2'>
                <div>
                    <h1 className='text-white text-xl font-bold'>Prayer Times</h1>
                    <p className='text-slate-500 text-xs mt-0.5 truncate max-w-45'>{locationName}</p>
                </div>
                <div className="flex gap-2"></div>
                <button
                    onClick={() => setShowMethodPicker(!showMethodPicker)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400
              hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg> Method
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


            {/* Method Picker */}
            {
                showMethodPicker && (
                    <div className='glass-card rounded-2xl p-4 border border-white/10 animate-slide-up'>
                        <p className='text-slate-400 text-xs uppercase tracking-wide mb-3'> Calculation Method </p>
                        <div className='space-y-1 max-h-48 overflow-auto'>
                            {CALCULATIONS_METHODS.map((m) => (
                                <button key={m.id}
                                    onClick={() => { setMethod(m.id); setShowMethodPicker(false); }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${method === m.id
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            {loading && <LoadingSpinner message='Calculating prayer times...' />}
            {error && !loading && (
                <ErrorCard message={error} onRetry={refresh} type='error' />
            )}

            {prayerData && !loading && (
                <>
                    <CountdownTimer countdown={countdown} nextPrayer={nextPrayer} />
                    <PrayerCard timings={prayerData.timings}
                        nextPrayer={nextPrayer}
                        date={dateInfo} />

                    {/* Islamic Quote */}
                    <div className="glass-card rounded-2xl p-5 text-center border border-white/5">
                        <p className="text-slate-400 text-xs font-arabic leading-relaxed mb-2">
                            "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا"
                        </p>
                        <p className="text-slate-500 text-xs">
                            "Indeed, prayer has been decreed upon the believers a decree of specified times."
                        </p>
                        <p className="text-slate-600 text-xs mt-1">— Quran 4:103</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default PrayerScreen
