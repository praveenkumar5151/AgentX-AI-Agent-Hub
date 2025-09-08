import React, { useState, useCallback } from 'react';
import { GitHubIssue } from '../types';
import { findGitHubIssues } from '../services/geminiService';
import Loader from '../components/Loader';
import IssueCard from '../components/IssueCard';
import { GithubIcon, ZapIcon, AlertTriangleIcon, CheckCircleIcon } from '../components/Icons';

const CivicEngagementAgent: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [interests, setInterests] = useState<string>('');
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => setIsConnected(true);

  const handleSearch = useCallback(async () => {
    if (!interests.trim()) {
      setError('Please enter your skills or interests.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIssues([]);

    try {
      const foundIssues = await findGitHubIssues(interests);
      setIssues(foundIssues);
    } catch (err) {
      console.error(err);
      setError('Failed to find issues. The AI model may be overloaded. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [interests]);

  if (!isConnected) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contribute to Open Source</h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Connect your GitHub account to let our AI agent find beginner-friendly issues that match your skills and passion for civic tech and open source.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleConnect}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-800"
          >
            <span className="relative flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              <GithubIcon />
              Connect with GitHub
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
          <h2 className="text-2xl font-bold text-white">Find Your First Issue</h2>
          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/50 px-3 py-1 rounded-full">
            <CheckCircleIcon />
            <span>Securely connected via Descope</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4 text-sm">Tell us about your programming languages, skills, or interests (e.g., "React, accessibility, Python, data visualization").</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., JavaScript, documentation, climate change..."
            className="flex-grow bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !interests.trim()}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center gap-2 rounded-md bg-gray-800 w-full justify-center sm:w-auto px-6 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0">
              {isLoading ? <Loader /> : <ZapIcon />}
              {isLoading ? 'Searching...' : 'Find Issues'}
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
        {(issues.length > 0 || isLoading) && <h3 className="text-xl font-semibold mb-4 text-gray-200">Suggested "Good First Issues":</h3>}
        {issues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {issues.map((issue) => <IssueCard key={issue.url} issue={issue} />)}
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
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-5 bg-gray-700 rounded w-full mb-3"></div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        ))}
    </div>
);

export default CivicEngagementAgent;