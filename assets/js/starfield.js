// Campo de estrelas sutil inspirado em Star Wars
class StarField {
  constructor() {
    this.container = null;
    this.stars = [];
    this.starCount = 150;
    this.init();
  }

  init() {
    // Criar container para as estrelas
    this.container = document.createElement('div');
    this.container.className = 'star-field';
    document.body.insertBefore(this.container, document.body.firstChild);

    // Criar estrelas
    this.createStars();

    // Remover estrelas no tema claro
    this.observeTheme();
  }

  createStars() {
    for (let i = 0; i < this.starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Posição aleatória
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';

      // Tamanho variado
      const size = Math.random() * 2 + 0.5;
      star.style.width = size + 'px';
      star.style.height = size + 'px';

      // Delay de animação aleatório
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (Math.random() * 3 + 2) + 's';

      // Opacidade variada
      star.style.opacity = Math.random() * 0.7 + 0.3;

      this.container.appendChild(star);
      this.stars.push(star);
    }
  }

  observeTheme() {
    // Observer para mudanças de tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLightMode = document.body.classList.contains('light-mode');
          this.container.style.opacity = isLightMode ? '0' : '0.6';
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

// Inicializar apenas em desktop para melhor performance
if (window.innerWidth > 768) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new StarField());
  } else {
    new StarField();
  }
}
