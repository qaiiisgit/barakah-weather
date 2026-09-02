import React, { useState } from 'react'
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import ErrorCard from '../components/ErrorCard';

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
        </div>
    )
}

export default PrayerScreen
