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

    return (
        <div className="px-4 pt-2 pb-24 space-y-4">
            {/*Header*/}
            <div className="pt-2">
                <h1 className="text-white text-xl font-bold">Qibla Direction</h1>
                <p className="text-slate-500 text-xs mt-0.5">{locationName}</p>
            </div>

            {loading && <LoadingSpinner message="Calculating Qibla direction..." />}

            {error && !loading && (
                <ErrorCard message={error} onRetry={refresh} type="error" />
            )}

            {qiblaDirection !== null && !loading && (
                <>
                    {/*Direction Info */}
                    <div className="glass-card rounded-3xl p-5 bg-linear-to-br
            from-sky-900/30 via-indigo-900/20 to-slate-900/30 border border-sky-500/20">
                        <div className="flex justify-around text-center">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Qibla</p>
                                <p className="text-sky-400 text-2xl font-bold">
                                    {Math.round(qiblaDirection)}°
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    {getCompassLabel(qiblaDirection)}
                                </p>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Compass</p>
                                <p className="text-slate-200 text-2xl font-bold">
                                    {compassSupported ? `${Math.round(compassHeading)}°` : '--°'}
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">
                                    {compassSupported ? getCompassLabel(compassHeading) : 'Manual'}
                                </p>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Arrow</p>
                                <p className="text-amber-400 text-2xl font-bold">
                                    {Math.round(arrowRotation !== null ? arrowRotation : qiblaDirection)}°
                                </p>
                                <p className="text-slate-500 text-xs mt-0.5">Rotation</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )

}

export default QiblaScreen;