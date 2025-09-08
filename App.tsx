import React, { useState } from 'react';
import Header from './components/Header';
import { BrainCircuitIcon, CodeIcon, AlertTriangleIcon, ArrowRightIcon } from './components/Icons';
import MentalHealthAgent from './agents/MentalHealthAgent';
import CivicEngagementAgent from './agents/CivicEngagementAgent';
import DisasterAlertAgent from './agents/DisasterAlertAgent';

type Agent = 'menu' | 'mental-health' | 'civic' | 'disaster';

const App: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<Agent>('menu');

  const agentConfig = {
    'mental-health': {
      title: 'Mental Health Scheduler',
      component: <MentalHealthAgent />,
    },
    'civic': {
      title: 'Civic Engagement Assistant',
      component: <CivicEngagementAgent />,
    },
    'disaster': {
      title: 'Disaster Alert Bot',
      component: <DisasterAlertAgent />,
    },
  };

  const renderContent = () => {
    if (activeAgent === 'menu') {
      return <AgentSelectionScreen onSelect={setActiveAgent} />;
    }
    return agentConfig[activeAgent].component;
  };

  const headerTitle = activeAgent === 'menu' ? 'AI Agent Hub' : agentConfig[activeAgent].title;
  const showBackButton = activeAgent !== 'menu';

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gray-900 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.3),rgba(255,255,255,0))]"></div>
      
      <Header 
        title={headerTitle} 
        showBack={showBackButton} 
        onBack={() => setActiveAgent('menu')} 
      />
      
      <main className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
        {renderContent()}
      </main>
    </div>
  );
};

const AgentSelectionScreen: React.FC<{ onSelect: (agent: Agent) => void }> = ({ onSelect }) => (
  <div className="text-center max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Choose Your Agent</h1>
    <p className="mt-6 text-lg leading-8 text-gray-300">
      Select an AI-powered assistant to help you with your specific needs. Each agent is tailored for a unique task, from personal wellness to community safety.
    </p>
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <AgentCard
        icon={<BrainCircuitIcon className="h-10 w-10 text-teal-300"/>}
        title="Mental Health Scheduler"
        description="Auto-schedules wellness breaks in your calendar to promote mental health for students."
        onClick={() => onSelect('mental-health')}
      />
      <AgentCard
        icon={<CodeIcon className="h-10 w-10 text-indigo-300"/>}
        title="Civic Engagement Assistant"
        description="Suggests beginner-friendly open-source GitHub issues based on your interests."
        onClick={() => onSelect('civic')}
      />
      <AgentCard
        icon={<AlertTriangleIcon className="h-10 w-10 text-amber-300"/>}
        title="Disaster Alert Bot"
        description="Posts real-time weather and disaster alerts for a specified location."
        onClick={() => onSelect('disaster')}
      />
    </div>
  </div>
);

const AgentCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left flex flex-col shadow-lg hover:border-white/20 transition-all duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm flex-grow">{description}</p>
        <button onClick={onClick} className="group inline-flex items-center justify-center gap-2 text-teal-300 font-semibold mt-6 py-2 rounded-lg transition-colors">
            Activate Agent
            <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
        </button>
    </div>
);


export default App;