import React from 'react';
import { DisasterAlert, AlertSeverity } from '../types';
import { AlertTriangleIcon } from './Icons';

interface AlertCardProps {
  alert: DisasterAlert;
}

const getSeverityUI = (severity: AlertSeverity): { color: string; iconColor: string } => {
    switch (severity) {
        case 'Warning':
            return { color: 'border-red-500/50 bg-red-500/10', iconColor: 'text-red-400' };
        case 'Watch':
            return { color: 'border-yellow-500/50 bg-yellow-500/10', iconColor: 'text-yellow-400' };
        case 'Advisory':
        default:
            return { color: 'border-blue-500/50 bg-blue-500/10', iconColor: 'text-blue-400' };
    }
};

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const { color, iconColor } = getSeverityUI(alert.severity);

  return (
    <div className={`backdrop-blur-sm border rounded-xl p-6 shadow-lg transition-all duration-300 ${color}`}>
        <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center gap-3 ${iconColor}`}>
                <AlertTriangleIcon className="h-6 w-6" />
                <h3 className="text-lg font-bold text-white">{alert.title}</h3>
            </div>
            <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${color} ${iconColor}`}>
                {alert.severity}
            </span>
        </div>
        <div className="pl-9">
            <p className="font-semibold text-sm text-gray-300 mb-3">{alert.location}</p>
            <p className="text-gray-400 text-sm mb-4">{alert.description}</p>
            <p className="text-xs text-gray-500">Source: {alert.source}</p>
        </div>
    </div>
  );
};

export default AlertCard;