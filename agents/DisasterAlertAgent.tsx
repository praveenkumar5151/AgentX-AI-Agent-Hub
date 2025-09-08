import React, { useState, useCallback } from 'react';
import { DisasterAlert } from '../types';
import { getDisasterAlerts } from '../services/geminiService';
import Loader from '../components/Loader';
import AlertCard from '../components/AlertCard';
import { ZapIcon, AlertTriangleIcon } from '../components/Icons';

const DisasterAlertAgent: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    if (!location.trim()) {
      setError('Please enter a location to check for alerts.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAlerts([]);
    setSearched(true);

    try {
      const foundAlerts = await getDisasterAlerts(location);
      setAlerts(foundAlerts);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve alerts. The AI model may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Check for Active Alerts</h2>
        </div>
        <p className="text-gray-400 mb-4 text-sm">Enter a city, county, or state to find recent, active weather or disaster alerts from official sources.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., 'Miami, Florida' or 'Travis County, TX'"
            className="flex-grow bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !location.trim()}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-amber-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center gap-2 rounded-md bg-gray-800 w-full justify-center sm:w-auto px-6 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              {isLoading ? <Loader /> : <ZapIcon />}
              {isLoading ? 'Checking...' : 'Get Alerts'}
            </span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-3 bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
          <AlertTriangleIcon />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-8">
        {isLoading && <LoadingSkeletons />}
        {!isLoading && searched && alerts.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Active Alerts for "{location}":</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alerts.map((alert, index) => <AlertCard key={index} alert={alert} />)}
            </div>
          </>
        )}
         {!isLoading && searched && alerts.length === 0 && !error && (
            <div className="text-center bg-green-900/50 border border-green-500 text-green-300 p-6 rounded-lg">
                <h3 className="text-lg font-semibold">No Active Alerts Found</h3>
                <p className="mt-2 text-sm">There are currently no major active alerts for "{location}".</p>
            </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeletons: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 border border-white/10 rounded-xl p-6 animate-pulse">
                <div className="h-5 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);

export default DisasterAlertAgent;