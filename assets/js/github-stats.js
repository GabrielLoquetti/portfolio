// Estatísticas do GitHub
async function fetchGitHubStats() {
  const username = 'GabrielLoquetti';
  
  try {
    // Buscar dados do usuário
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();
    
    // Buscar repositórios
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await reposResponse.json();
    
    // Calcular estatísticas
    const stats = {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
      totalForks: reposData.reduce((acc, repo) => acc + repo.forks_count, 0),
      languages: getLanguages(reposData),
      recentActivity: reposData.slice(0, 6)
    };
    
    displayGitHubStats(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas do GitHub:', error);
    // Fallback caso a API falhe
    displayGitHubStatsFallback();
  }
}

function getLanguages(repos) {
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  return Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

function displayGitHubStats(stats) {
  const statsSection = document.getElementById('github-stats');
  if (!statsSection) return;
  
  statsSection.innerHTML = `
    <header>
      <h2>Estatísticas GitHub</h2>
    </header>
    <div class="content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-number" data-target="${stats.publicRepos}">0</div>
          <div class="stat-label">Repositórios</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-number" data-target="${stats.totalStars}">0</div>
          <div class="stat-label">Estrelas</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-number" data-target="${stats.followers}">0</div>
          <div class="stat-label">Seguidores</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🍴</div>
          <div class="stat-number" data-target="${stats.totalForks}">0</div>
          <div class="stat-label">Forks</div>
        </div>
      </div>
      
      ${stats.languages.length > 0 ? `
        <div class="languages-section">
          <h3>Linguagens Mais Usadas</h3>
          <div class="languages-list">
            ${stats.languages.map(([lang, count]) => `
              <div class="language-item">
                <span class="language-name">${lang}</span>
                <span class="language-count">${count} repos</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  // Animar números
  animateNumbers();
}

function displayGitHubStatsFallback() {
  const statsSection = document.getElementById('github-stats');
  if (!statsSection) return;
  
  statsSection.innerHTML = `
    <header>
      <h2>Estatísticas GitHub</h2>
    </header>
    <div class="content">
      <p>Visite meu <a href="https://github.com/GabrielLoquetti" target="_blank">GitHub</a> para ver meus projetos!</p>
    </div>
  `;
}

function animateNumbers() {
  const numbers = document.querySelectorAll('.stat-number');
  
  numbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        number.textContent = target;
        clearInterval(timer);
      } else {
        number.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchGitHubStats);
} else {
  fetchGitHubStats();
}

