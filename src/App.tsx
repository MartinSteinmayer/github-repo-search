import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import "./App.css";

const App: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<any[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  // comment
  const fetchRepos = async (username: string) => {
    try {
      // comment
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );


      // comment
      const reposWithLanguages = await Promise.all(
        response.data.map(async (repo: any) => {
          const languagesResponse = await axios.get(
            repo.languages_url,
            {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
              },
            }
          );
          return { ...repo, languages: Object.keys(languagesResponse.data) };
        })
      );

      setRepos(reposWithLanguages);
      setFilteredRepos(reposWithLanguages);
    } catch (error) {
      console.error("Error fetching repositories", error);
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
        repo.languages.some((language: string) =>
          language.toLowerCase().startsWith(languageFilter.toLowerCase())
        )
      );
    }

    setFilteredRepos(updatedRepos);
  };

  React.useEffect(() => {
    filterRepos();
  }, [nameFilter, languageFilter, repos]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        GitHub Repositories
      </h1>
      <SearchBar onSearch={fetchRepos} />
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border rounded px-4 py-2 mx-2"
        />
        <input
          type="text"
          placeholder="Filter by language"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="border rounded px-4 py-2 mx-2"
        />
      </div>
      <RepoList repos={filteredRepos} />
    </div>
  );
};

export default App;
