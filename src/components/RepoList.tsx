import React from 'react';
import RepoItem from './RepoItem';

interface RepoListProps {
  repos: any[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
