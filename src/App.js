import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });

    console.log(repositories);
  }, []);

  async function handleAddRepository() {
    const repoName = Date.now();

    const response = await api.post('/repositories', {
      title: `Repository ${repoName}`,
      url: `https://github/com/lucalix/${repoName}`,
      techs: ['Node', 'ReactJS', 'ReactNative']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // const response = await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
