import React from 'react';

const NAV_ITEMS = [
  {
    id: 'weather',
    label: 'Weather',
    icon: (active) => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    id: 'prayer',
    label: 'Prayer',
    icon: (active) => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'qibla',
    label: 'Qibla',
    icon: (active) => (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
];

const BottomNav = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="glass-card border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all duration-300 min-w-[80px] ${
                  isActive
                    ? 'text-sky-400 bg-sky-400/10'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
                aria-label={item.label}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                  {item.icon(isActive)}
                </div>
                <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                  isActive ? 'text-sky-400' : 'text-slate-500'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-0.5 bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;