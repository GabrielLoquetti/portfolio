// Seção de certificados interativa
function createCertificates() {
  const certificates = [
    {
      title: 'Python',
      issuer: 'Curso em Vídeo',
      description: 'Fundamentos de Python e programação',
      icon: '🐍',
      color: '#3776AB'
    },
    {
      title: 'HTML5 e CSS3',
      issuer: 'Curso em Vídeo',
      description: 'Desenvolvimento web front-end',
      icon: '🌐',
      color: '#E34F26'
    },
    {
      title: 'JavaScript',
      issuer: 'Autodidata',
      description: 'Programação web interativa',
      icon: '⚡',
      color: '#F7DF1E'
    },
    {
      title: 'Laravel',
      issuer: 'Estudos Práticos',
      description: 'Framework PHP para desenvolvimento web',
      icon: '🔧',
      color: '#FF2D20'
    }
  ];

  const certificatesSection = document.getElementById('certificates');
  if (!certificatesSection) return;

  certificatesSection.innerHTML = `
    <div class="wrapper">
      <header>
        <h2>Certificados e Conquistas</h2>
      </header>
      <div class="content">
        <div class="certificates-grid">
          ${certificates.map((cert, index) => `
            <div class="certificate-card">
              <div class="certificate-icon" style="background: linear-gradient(135deg, ${cert.color}22, ${cert.color}44);">
                <span style="font-size: 4rem;">${cert.icon}</span>
              </div>
              <div class="certificate-content">
                <h3>${cert.title}</h3>
                <p class="certificate-issuer">${cert.issuer}</p>
                <p class="certificate-description">${cert.description}</p>
              </div>
              <div class="certificate-hover-effect"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Adicionar efeito de hover 3D
  const cards = certificatesSection.querySelectorAll('.certificate-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
  
  // Adicionar animações com ScrollReveal se disponível
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.certificate-card', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      interval: 150
    });
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createCertificates);
} else {
  createCertificates();
}

