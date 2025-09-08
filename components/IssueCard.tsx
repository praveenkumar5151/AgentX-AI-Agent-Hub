import React from 'react';
import { GitHubIssue } from '../types';
import { GithubIcon, RepoIcon, TagIcon, ExternalLinkIcon } from './Icons';

interface IssueCardProps {
  issue: GitHubIssue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <RepoIcon />
          <span className="font-semibold">{issue.repository}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">#{issue.number} {issue.title}</h3>
        <div className="flex flex-wrap gap-2">
          {issue.labels.slice(0, 3).map((label) => (
            <span key={label} className="flex items-center gap-1 text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
              <TagIcon />
              {label}
            </span>
          ))}
        </div>
      </div>

      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 text-white bg-gray-700/50 hover:bg-gray-700 font-semibold mt-6 py-2 rounded-lg transition-colors"
      >
        <ExternalLinkIcon />
        View on GitHub
      </a>
    </div>
  );
};

export default IssueCard;