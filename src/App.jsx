import { useState } from 'react';
import Search from './components/Search';
import Profile from './components/Profile';
import Repos from './components/Repos';
import { analyzeReposWithGemini } from './llm';
import ReactMarkdown from 'react-markdown';
import './App.css';


function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [aiSummaries, setAiSummaries] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGitHubUser = async (username) => {
    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);
    setAiSummaries([]);

    try {
      const profileRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      if (!profileRes.ok) {
        setError('User not found. Please check the username and try again.');
        setLoading(false);
        return;
      }
      const profile = await profileRes.json();

      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      if (!repoRes.ok) {
        setError('Could not fetch repositories for this user.');
        setLoading(false);
        return;
      }
      const reposData = await repoRes.json();

      const topRepos = reposData
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      setUserData(profile);
      setRepos(topRepos);

      // 🧠 AI Analysis for each repo
      const summaries = [];
      for (const repo of topRepos) {
        const summary = await analyzeReposWithGemini([repo]);
        summaries.push(summary);
      }
      setAiSummaries(summaries);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub User Search </h1>
      <Search onSearch={fetchGitHubUser} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {userData && <Profile data={userData} />}
      {repos.length > 0 && (
        <div className="repos">
          <ul>
            {repos.map((repo, idx) => (
              <li key={repo.id} className="repo-card">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                <p>{repo.description}</p>
                <div className="repo-meta">
                  ⭐ {repo.stargazers_count} &nbsp; | &nbsp; 📝 {repo.language}
                </div>
                {aiSummaries[idx] && (
                  <div className="ai-summary">
                    <strong>AI Analysis:</strong>
                    <ReactMarkdown>{aiSummaries[idx]}</ReactMarkdown>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
