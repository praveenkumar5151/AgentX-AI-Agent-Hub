import React from 'react';
import { ArrowLeftIcon } from './Icons';

interface HeaderProps {
  title: string;
  showBack: boolean;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  return (
    <header className="bg-transparent absolute top-0 left-0 right-0 z-10">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center gap-4">
          {showBack && (
            <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-full">
              <ArrowLeftIcon />
            </button>
          )}
          <h1 className="text-xl font-bold tracking-wider text-white">{title}</h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;