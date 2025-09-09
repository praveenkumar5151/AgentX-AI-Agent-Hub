# AI Agent Hub

A modern React application for managing and scheduling wellness events with calendar integration.

## Features

- **Event Management**: Display and organize different types of wellness events
- **Event Types**: Support for mindfulness, focus, exercise, and break activities
- **Calendar Integration**: Export events to calendar applications via ICS file download
- **Modern UI**: Dark theme with glassmorphism design and smooth animations
- **TypeScript**: Full type safety and enhanced developer experience

## Event Types

-  **Mindfulness**: Meditation and mental wellness activities
-  **Focus**: Deep work and concentration sessions
-  **Exercise**: Physical activities and movement
-  **Break**: Rest periods and downtime

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Custom Icons** for visual elements
- **ICS Calendar** export functionality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-agent-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:5173/](http://localhost:5173) to view the application in your browser.

## Usage

### Adding Events to Calendar

1. Browse the available events displayed as cards
2. Click the "Add to Calendar" button on any event
3. An ICS file will be downloaded automatically
4. Open the ICS file with your preferred calendar application (Google Calendar, Apple Calendar, Outlook, etc.)

### Event Card Features

Each event card displays:
- Event type with color-coded icon
- Event title and description
- Start and end times
- Interactive "Add to Calendar" button

### Adding New Event Types

1. Update the `EventType` type in `types/index.ts`
2. Add the new case in `getEventTypeUI` function in `EventCard.tsx`
3. Create or import the appropriate icon

### Styling

The project uses Tailwind CSS with a dark theme. Key design elements:
- Glassmorphism effects with backdrop blur
- Gradient backgrounds and borders
- Smooth hover transitions
- Color-coded event types

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Demo Link
https://www.youtube.com/watch?v=tt8D7X73TKw&t=2s
