import React from 'react';
import RepoItem from './RepoItem';

interface RepoListProps {
  repos: any[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <div>
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
