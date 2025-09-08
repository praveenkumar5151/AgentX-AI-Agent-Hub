// Types for Mental Health Scheduler
export type EventType = 'mindfulness' | 'focus' | 'break' | 'exercise';

export interface CalendarEvent {
  title: string;
  description: string;
  startTime: string; // e.g., "Wednesday, 3:00 PM"
  endTime: string; // e.g., "Wednesday, 3:30 PM"
  type: EventType;
}

// Types for Civic Engagement Assistant
export interface GitHubIssue {
  repository: string;
  title: string;
  url: string;
  number: number;
  labels: string[];
}

// Types for Disaster Alert Bot
export type AlertSeverity = 'Advisory' | 'Watch' | 'Warning';

export interface DisasterAlert {
    title: string;
    location: string;
    severity: AlertSeverity;
    description: string;
    source: string;
}