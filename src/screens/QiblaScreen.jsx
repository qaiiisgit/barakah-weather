import React from "react";
import { useQibla } from '../hooks/useQibla'
import ErrorCard from "../components/ErrorCard";



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

    if (!location) {
        return (
            <div className="px-4 pt-4">
                <ErrorCard type="permission" message="Please enable location access or search for a city to find the Qibla direction." />
            </div>
        );
    }

    return(
        <div className="px-4 pt-2 pb-24 space-y-4">
            {/*Header*/}
            <div className="pt-2">
                <h1 className="text-white text-xl font-bold">Qibla Direction</h1>
                <p className="text-slate-500 text-xs mt-0.5">{locationName}</p>
            </div>

            {loading && <LoadingSpinner message="Calculating Qibla direction..."/>}

            {error && !loading && (
                <ErrorCard message={error} onRetry={refresh} type="error"/>
            )}
            
        </div>
    )

}

export default QiblaScreen;