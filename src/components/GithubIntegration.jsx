import React, { useState, useEffect } from 'react';
import { GitPullRequest, GitCommit, GitBranch, Search, ExternalLink, Github, RefreshCw } from 'lucide-react';

export default function GithubIntegration() {
  const [username, setUsername] = useState(localStorage.getItem('tracker_github_user') || 'torvalds');
  const [inputVal, setInputVal] = useState(username);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGithubData = async (user) => {
    if (!user.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=5`);
      if (!res.ok) {
        throw new Error('GitHub user not found or rate limited.');
      }
      const data = await res.json();
      setRepos(data);
      localStorage.setItem('tracker_github_user', user);
    } catch (err) {
      setError(err.message || 'Failed to fetch GitHub repos');
      // Fallback mock repos so the UI is always fully functional
      setRepos([
        { id: 1, name: 'linux', stargazers_count: 165000, language: 'C', html_url: 'https://github.com/torvalds/linux', description: 'Linux kernel source tree' },
        { id: 2, name: 'subsurface', stargazers_count: 2800, language: 'C++', html_url: 'https://github.com/torvalds/subsurface', description: 'Dive log program' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData(username);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setUsername(inputVal.trim());
    fetchGithubData(inputVal.trim());
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-slate-800/10 dark:bg-slate-700/50 text-slate-900 dark:text-white rounded-lg">
              <Github className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">GitHub Activity</h3>
          </div>
          <button
            onClick={() => fetchGithubData(username)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Refresh GitHub Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="GitHub username..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-md transition-all"
          >
            Load
          </button>
        </form>

        {error && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 bg-amber-500/10 p-2 rounded-lg">
            ⚠️ {error} Showing cached/fallback data.
          </p>
        )}

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {loading && repos.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">Loading repositories...</div>
          ) : repos.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">No repositories found for @{username}</div>
          ) : (
            repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block p-3 rounded-xl bg-white/40 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center space-x-1">
                    <span>{repo.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  {repo.language && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium">
                      {repo.language}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {repo.description || 'No description provided.'}
                </p>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
