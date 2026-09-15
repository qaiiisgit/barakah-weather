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

}

export default QiblaScreen;