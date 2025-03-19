import { useState, useEffect } from 'react';

const GithubLicenses = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortByRecent, setSortByRecent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedUsername(username);
    setSelectedLanguage('all'); // Reset filters on new search
    setSortByRecent(false);
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${searchedUsername}/repos`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        setRepositories(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchedUsername) {
      fetchRepositories();
    }
  }, [searchedUsername]);

  // Get unique languages from repositories
  const languages = repositories.length > 0
    ? ['all', ...new Set(repositories.map(repo => repo.language).filter(Boolean))]
    : ['all'];

  // Filter and sort repositories
  const filteredRepositories = repositories
    .filter(repo => selectedLanguage === 'all' || repo.language === selectedLanguage)
    .sort((a, b) => {
      if (sortByRecent) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  // Function to get license statistics
  const getLicenseStats = (repos) => {
    const stats = repos.reduce((acc, repo) => {
      const licenseName = repo.license ? repo.license.name : 'No License';
      acc[licenseName] = (acc[licenseName] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRepos: repos.length,
      licenseBreakdown: stats
    };
  };

  return (
    <div className="github-licenses">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <button type="submit">Search Repositories</button>
      </form>

      {loading && <div>Loading repositories...</div>}
      {error && <div>Error: {error}</div>}

      {searchedUsername && !loading && !error && (
        <>
          <h2>Repositories for {searchedUsername}</h2>

          {/* Add License Statistics */}
          <div className="license-stats">
            <h3>Repository Statistics</h3>
            <p>Total Repositories: {filteredRepositories.length}</p>
            <div className="license-breakdown">
              <h4>License Breakdown:</h4>
              <ul>
                {Object.entries(getLicenseStats(repositories).licenseBreakdown).map(([license, count]) => (
                  <li key={license}>
                    {license}: {count} repositories
                    ({((count / repositories.length) * 100).toFixed(1)}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="filters">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang || 'No Language'}
                </option>
              ))}
            </select>
          </div>

          {filteredRepositories.length > 0 ? (
            <ul>
              {filteredRepositories.map((repo) => (
                <li key={repo.id}>
                  <strong>{repo.name}</strong>: {' '}
                  {repo.license ? repo.license.name : 'No license specified'}
                  <div className="repo-details">
                    <small>
                      Language: {repo.language || 'Not specified'}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No repositories found matching the selected filters.</p>
          )}
        </>
      )}
    </div>
  );
};

export default GithubLicenses;