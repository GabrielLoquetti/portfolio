// Timeline interativa da jornada profissional
function createTimeline() {
  const timelineData = [
    {
      year: '2023',
      title: 'Início dos Estudos',
      description: 'Comecei minha jornada em Desenvolvimento de Sistemas',
      icon: '🎓'
    },
    {
      year: '2024',
      title: 'Primeiros Projetos',
      description: 'Desenvolvimento de projetos em Python, HTML, CSS e JavaScript',
      icon: '💻'
    },
    {
      year: '2024',
      title: 'Frameworks',
      description: 'Aprendizado de Laravel, React e Node.js',
      icon: '⚛️'
    },
    {
      year: '2025',
      title: 'Projeto TCC',
      description: 'Desenvolvimento do xNeedWare - Projeto de conclusão de curso',
      icon: '🚀'
    }
  ];

  const timelineSection = document.getElementById('timeline');
  if (!timelineSection) return;

  timelineSection.innerHTML = `
    <div class="wrapper">
      <header>
        <h2>Minha Jornada</h2>
      </header>
      <div class="content">
        <div class="timeline-container">
          ${timelineData.map((item, index) => `
            <div class="timeline-item">
              <div class="timeline-marker">
                <span class="timeline-icon">${item.icon}</span>
              </div>
              <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Adicionar animações com ScrollReveal se disponível
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.timeline-item', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      interval: 200
    });
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createTimeline);
} else {
  createTimeline();
}

