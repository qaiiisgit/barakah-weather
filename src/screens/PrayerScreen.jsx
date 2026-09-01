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
        <div>

        </div>
    )
}

export default PrayerScreen
