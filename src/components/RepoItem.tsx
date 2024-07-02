import React from 'react';

interface RepoItemProps {
  repo: any;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-xl font-bold">{repo.name}</h3>
      <p className="text-gray-700">{repo.description}</p>
      <p className="text-gray-500">Languages: {repo.languages.join(', ')}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        View Repo
      </a>
    </div>
  );
};

export default RepoItem;
