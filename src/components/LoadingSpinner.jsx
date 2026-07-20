import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-sky-400/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin" />
          <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="mt-6 text-slate-400 text-sm font-medium animate-pulse">{message}</p>
        <p className="mt-2 text-slate-600 text-xs font-arabic">بسم الله الرحمن الرحيم</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-3 border-sky-400/20" />
        <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-sky-400 animate-spin"
          style={{ borderWidth: '3px' }} />
      </div>
      <p className="mt-4 text-slate-400 text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;