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

                    {/* Compass */}
                    <div>
                        <CompassArrow
                            rotation={arrowRotation !== null ? arrowRotation : qiblaDirection}
                            qiblaDirection={qiblaDirection}
                            compassHeading={compassHeading}
                        />

                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-xs">
                                🕋 <span className="text-amber-400 font-medium">Kaaba</span>, Makkah Al-Mukarramah
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                                {Math.round(qiblaDirection)}° from North
                            </p>
                        </div>
                    </div>

                    {/* Compass permission */}
                    {!compassSupported && (
                        <div className="glass-card rounded-2xl p-5 border border-amber-500/20
              bg-amber-500/5 animate-fade-in">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🧭</span>
                                <div className="flex-1">
                                    <p className="text-amber-400 font-medium text-sm mb-1">
                                        {compassPermission === 'not-supported'
                                            ? 'Compass Not Available'
                                            : 'Enable Device Compass'}
                                    </p>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-3">
                                        {compassPermission === 'not-supported'
                                            ? 'Your device does not support compass. The arrow shows the Qibla bearing from North.'
                                            : 'Allow motion & orientation access to use your device compass for accurate Qibla direction.'}
                                    </p>
                                    {compassPermission !== 'not-supported' && compassPermission !== 'denied' && (
                                        <button
                                            onClick={requestCompassPermission}
                                            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400
                        rounded-xl text-sm font-medium border border-amber-500/30 transition-all"
                                        >
                                            Enable Compass
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {compassSupported && (
                        <div className="flex items-center gap-2 justify-center">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <p className="text-slate-500 text-xs">Live compass active</p>
                        </div>
                    )}

                    {/* Tip */}
                    <div className="glass-card rounded-2xl p-4 text-center border border-white/5">
                        <p className="text-slate-500 text-xs leading-relaxed">
                            💡 Hold your device flat and level for accurate compass readings.
                            Move away from metal objects and electronics.
                        </p>
                    </div>

                    {/* Islamic Quote */}
                    <div className="glass-card rounded-2xl p-5 text-center border border-white/5 mb-4">
                        <p className="text-slate-400 text-xs font-arabic leading-loose mb-2">
                            "وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ"
                        </p>
                        <p className="text-slate-500 text-xs">
                            "And from wherever you go out, turn your face toward al-Masjid al-Haram."
                        </p>
                        <p className="text-slate-600 text-xs mt-1">— Quran 2:149</p>
                    </div>
                </>
            )}

        </div>
    )

}

export default QiblaScreen;