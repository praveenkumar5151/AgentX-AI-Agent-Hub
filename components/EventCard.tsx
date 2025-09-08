import React, { useState } from 'react';
import { CalendarEvent, EventType } from '../types';
import { BrainCircuitIcon, CoffeeIcon, SunIcon, BookOpenIcon, PlusIcon } from './Icons';

interface EventCardProps {
  event: CalendarEvent;
}

const getEventTypeUI = (type: EventType): { icon: React.ReactNode; color: string } => {
    switch (type) {
        case 'mindfulness':
            return { icon: <BrainCircuitIcon className="h-6 w-6"/>, color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' };
        case 'focus':
            return { icon: <BookOpenIcon />, color: 'border-purple-500/30 bg-purple-500/10 text-purple-300' };
        case 'exercise':
            return { icon: <SunIcon />, color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300' };
        case 'break':
        default:
            return { icon: <CoffeeIcon />, color: 'border-green-500/30 bg-green-500/10 text-green-300' };
    }
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { icon, color } = getEventTypeUI(event.type);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCalendar = () => {
    try {
      // Get today's date as base
      const today = new Date();
      const startDate = new Date(today);
      const endDate = new Date(today);
      
      // Parse start time (handle both "HH:MM" and "H:MM" formats)
      const startTime = event.startTime.replace(/[^\d:]/g, ''); // Remove any non-digit/colon chars
      const [startHour, startMinute = 0] = startTime.split(':').map(Number);
      
      // Parse end time
      const endTime = event.endTime.replace(/[^\d:]/g, '');
      const [endHour, endMinute = 0] = endTime.split(':').map(Number);
      
      // Set the times
      startDate.setHours(startHour, startMinute, 0, 0);
      endDate.setHours(endHour, endMinute, 0, 0);
      
      // If end time is before start time, assume it's next day
      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      // Format dates for ICS file (YYYYMMDDTHHMMSSZ)
      const formatDateForICS = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      };
      
      const startFormatted = formatDateForICS(startDate);
      const endFormatted = formatDateForICS(endDate);
      const now = formatDateForICS(new Date());
      
      // Create ICS file content
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Your App//Calendar//EN',
        'BEGIN:VEVENT',
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        `DTSTAMP:${now}`,
        `UID:${now}-${Math.random().toString(36).substr(2, 9)}@yourapp.com`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ''}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      
      // Create and download the ICS file
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setIsAdded(true);
      console.log('Calendar event file downloaded successfully');
    } catch (error) {
      console.error('Error creating calendar event:', error);
      alert('Error creating calendar event. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-teal-500/50 hover:shadow-teal-500/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${color}`}>
                {icon}
            </div>
            <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${color}`}>
                {event.type}
            </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
        <p className="font-mono text-sm text-teal-300 mb-3">{event.startTime} - {event.endTime}</p>
        <p className="text-gray-400 text-sm">{event.description}</p>
      </div>

      <button
        onClick={handleAddToCalendar}
        disabled={isAdded}
        className={`inline-flex items-center justify-center gap-2 text-white font-semibold mt-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
          isAdded 
            ? 'bg-green-600 cursor-default' 
            : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700'
        }`}
      >
        <PlusIcon/>
        {isAdded ? 'Added to Calendar' : 'Add to Calendar'}
      </button>
    </div>
  );
};

export default EventCard;