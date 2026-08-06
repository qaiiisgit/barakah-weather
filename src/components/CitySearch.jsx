import React, { useState, useRef, useEffect } from 'react';
import { searchCity } from '../services/weatherService';

const CitySearch = ({ onSelectCity, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    setSearchError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim() || value.length < 2) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      const result = await searchCity(value);
      if (result.success) {
        setResults(result.data);
      } else {
        setSearchError(result.error);
        setResults([]);
      }
      setSearching(false);
    }, 500);
  };

  const handleSelect = (city) => {
    onSelectCity(city.latitude, city.longitude,
      `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}, ${city.country}`
    );
    onClose();
  };

  return (
    // Please check the styling here
    <div className="fixed "
      onClick={onClose}>
      <div className="w-full max-w-md bg-slate-900 rounded-t-3xl p-6 pb-10 border border-white/10
        animate-slide-up"
        onClick={(e) => e.stopPropagation()}>

        {/* Handle */}
        <div className="w-12 h-1 bg-slate-600 rounded-full mx-auto mb-6" />

        <h2 className="text-white font-semibold text-lg mb-4">Search City</h2>

        {/* Input */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Type city name..."
            className="w-full bg-slate-800 text-white pl-10 pr-10 py-3 rounded-xl
              border border-slate-700 focus:border-sky-500 focus:outline-none
              focus:ring-2 focus:ring-sky-500/20 placeholder-slate-500 transition-all"
          />
          {searching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {query && !searching && (
            <button
              onClick={() => { setQuery(''); setResults([]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        {searchError && (
          <p className="text-red-400 ">{searchError}</p>                         //Please check the styling here
        )}

        {results.length > 0 && (
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {results.map((city, i) => (
              <button
                key={i}
                onClick={() => handleSelect(city)}
                className="w-full text-left px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50
                  border border-transparent hover:border-slate-600 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-white font-medium text-sm group-hover:text-sky-400 transition-colors">
                      {city.name}
                      {city.admin1 && <span className="text-slate-400">, {city.admin1}</span>}
                    </p>
                    <p className="text-slate-500 text-xs">{city.country} • {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && !searching && results.length === 0 && !searchError && (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-slate-400 text-sm">No cities found for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">🌍</div>
            <p className="text-slate-400 text-sm">Search for any city worldwide</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySearch;