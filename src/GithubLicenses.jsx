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
    setSelectedLanguage('all'); // reset filters on new search
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

  // get unique languages from repos
  const languages = repositories.length > 0
    ? ['all', ...new Set(repositories.map(repo => repo.language).filter(Boolean))]
    : ['all'];

  // filter and sort repos
  const filteredRepositories = repositories
    .filter(repo => selectedLanguage === 'all' || repo.language === selectedLanguage)
    .sort((a, b) => {
      if (sortByRecent) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  // get license stats
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
    <div className="bg-background text-primary flex flex-col items-center justify-center min-h-screen p-4">
      <div className="font-bold text-5xl mb-4 text-center">
        GitHub License Checker
        <p className="text-accent text-center font-medium text-xl">Avoid legal complications in the open-source world; check which of your GitHub repositories are missing licenses</p>
      </div>

      <div className="github-licenses">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            className="border-1 border-solid px-4 py-2 rounded-md m-2"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            required
          />
          <button
            type="submit"
             className="bg-accent text-background px-4 py-2 rounded-md text-primary border-1 border-solid"          >
            Search Repositories
          </button>
        </form>

        {loading && <div>Loading repositories...</div>}
        {error && <div>Error: {error}</div>}

        {searchedUsername && !loading && !error && (
          <>
            <h2 className="font-bold text-center">
              Repositories for {''}
              <span className="text-accent">
                {searchedUsername}
              </span>
            </h2>

            {/* terminal displaying license stats */}
            <div className="license-stats border-2 border-solid border-accent p-4 my-8 bg-foreground rounded-xl">
              <h3 className="font-bold">Repository Statistics</h3>
              <p>Total Repositories: {filteredRepositories.length}</p>
              <div className="license-breakdown">
                <h4>License Breakdown:</h4>
                <ul>
                  {Object.entries(getLicenseStats(repositories).licenseBreakdown).map(([license, count]) => (
                    <li key={license} className="">
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
                  <option key={lang}
                          value={lang}
                          className=""
                  >
                    {lang === 'all' ? 'All Languages' : lang || 'No Language'}
                  </option>
                ))}
              </select>
            </div>

            {filteredRepositories.length > 0 ? (
              <ul>
                {filteredRepositories.map((repo) => (
                  <li key={repo.id} className="p-2 bg-foreground border-2 border-solid border-accent rounded-xl my-2">
                    <strong>{repo.name}</strong>: {' '}
                    {repo.license ? repo.license.name : <span className="text-accent">No license specified</span>}
                    <div className="repo-details text-sm">
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
    </div>
  );
};

export default GithubLicenses;