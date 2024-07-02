import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    onSearch(username);
  };

  return (
    <div>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter GitHub username" 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
