import React from 'react';

interface RepoItemProps {
  repo: any;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <div>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a href={repo.html_url} target="_blank">View Repo</a>
    </div>
  );
};

export default RepoItem;
