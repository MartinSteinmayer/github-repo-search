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
    <div className="flex justify-center mb-6">
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter GitHub username" 
        className="border rounded px-4 py-2 mx-2"
      />
      <button 
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded px-4 py-2 mx-2 hover:bg-sky-700 transition ease-in-out duration-150"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
