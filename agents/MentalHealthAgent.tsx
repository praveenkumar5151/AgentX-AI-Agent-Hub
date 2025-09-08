import React, { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';
import { findWellnessBreaks } from '../services/geminiService';
import Loader from '../components/Loader';
import EventCard from '../components/EventCard';
import { CalendarIcon, ZapIcon, AlertTriangleIcon, CheckCircleIcon } from '../components/Icons';

const MentalHealthAgent: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userSchedule, setUserSchedule] = useState<string>('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => setIsConnected(true);

  const handleSchedule = useCallback(async () => {
    if (!userSchedule.trim()) {
      setError('Please describe your schedule and goals.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEvents([]);

    try {
      const foundEvents = await findWellnessBreaks(userSchedule);
      setEvents(foundEvents);
    } catch (err) {
      console.error(err);
      setError('Failed to generate schedule. The AI model may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [userSchedule]);

  if (!isConnected) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your AI Assistant for Student Wellness</h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Avoid burnout. Connect your Google Calendar to let our AI agent find and schedule essential wellness and focus breaks tailored to your busy student life.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleConnect}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800"
          >
            <span className="relative flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              <CalendarIcon />
              Connect with Google Calendar
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Generate Your Wellness Schedule</h2>
          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/50 px-3 py-1 rounded-full">
            <CheckCircleIcon />
            <span>Securely connected via Descope</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4 text-sm">Describe your weekly schedule, classes, and work commitments. The more detail you provide, the better the suggestions will be.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={userSchedule}
            onChange={(e) => setUserSchedule(e.target.value)}
            placeholder="e.g., Classes MWF 9am-2pm, study group Tuesday evenings..."
            className="flex-grow bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            disabled={isLoading}
          />
          <button
            onClick={handleSchedule}
            disabled={isLoading || !userSchedule.trim()}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center gap-2 rounded-md bg-gray-800 w-full justify-center sm:w-auto px-6 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              {isLoading ? <Loader /> : <ZapIcon />}
              {isLoading ? 'Generating...' : 'Find Break Times'}
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
        {(events.length > 0 || isLoading) && <h3 className="text-xl font-semibold mb-4 text-gray-200">Suggested Wellness Breaks:</h3>}
        {events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => <EventCard key={index} event={event} />)}
          </div>
        )}
        {isLoading && <LoadingSkeletons />}
      </div>
    </div>
  );
};

const LoadingSkeletons: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 border border-white/10 rounded-xl p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            </div>
        ))}
    </div>
);

export default MentalHealthAgent;