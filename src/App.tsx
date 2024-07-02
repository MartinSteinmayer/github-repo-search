import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepoList from './components/RepoList';
import './App.css';

const App: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const fetchRepos = async (username: string) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      // print the response to the console
      console.log(response);
      
      setRepos(response.data);
      setFilteredRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories', error);
    }
  };

  const filterRepos = () => {
    let updatedRepos = repos;

    
    if (nameFilter) {
      updatedRepos = updatedRepos.filter(repo => 
        repo.name.toLowerCase().startsWith(nameFilter.toLowerCase())
      );
    }

    if (languageFilter) {
      updatedRepos = updatedRepos.filter(repo => 
        repo.language && repo.language.toLowerCase().startsWith(languageFilter.toLowerCase())
      );
    }

    setFilteredRepos(updatedRepos);
  };

  React.useEffect(() => {
    filterRepos();
  }, [nameFilter, languageFilter, repos]);

  return (
    <div className="App">
      <h1>GitHub Repositories</h1>
      <SearchBar onSearch={fetchRepos} />
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        />
      </div>
      <RepoList repos={filteredRepos} />
    </div>
  );
};

export default App;
