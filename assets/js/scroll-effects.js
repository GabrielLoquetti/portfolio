// Efeitos de scroll sutis e profissionais
class ScrollEffects {
  constructor() {
    this.init();
  }

  init() {
    // Parallax suave no home
    this.initParallax();

    // Reveal animation para elementos
    this.initRevealAnimations();

    // Smooth hover effect nos cards
    this.initCardTilt();
  }

  initParallax() {
    const homeSection = document.querySelector('#home');
    const homeContent = document.querySelector('#home .wrapper');

    if (homeSection && homeContent) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < homeSection.offsetHeight) {
          homeContent.style.transform = `translateY(${rate}px)`;
        }
      });
    }
  }

  initRevealAnimations() {
    const revealElements = document.querySelectorAll('.card, #about img, .skill-box');

    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

        if (isVisible) {
          element.classList.add('reveal', 'active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executar na inicialização
  }

  initCardTilt() {
    if (window.innerWidth <= 768) return; // Apenas desktop

    const cards = document.querySelectorAll('#projects .card, #knowledge .card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ScrollEffects());
} else {
  new ScrollEffects();
}
