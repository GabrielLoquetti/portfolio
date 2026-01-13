// Animação de Holograma 3D - Tema Star Wars
class HologramAnimation {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Selecionar o container (col-b do home)
    this.container = document.querySelector('#home .col-b');

    if (!this.container) return;

    // Criar estrutura do holograma
    this.createHologram();
  }

  createHologram() {
    const hologramHTML = `
      <div class="hologram-container">
        <div class="hologram-scanner"></div>

        <!-- Círculo de dados orbitando -->
        <div class="data-orbit">
          <div class="data-point" style="--delay: 0s; --orbit: 0deg"></div>
          <div class="data-point" style="--delay: 0.5s; --orbit: 60deg"></div>
          <div class="data-point" style="--delay: 1s; --orbit: 120deg"></div>
          <div class="data-point" style="--delay: 1.5s; --orbit: 180deg"></div>
          <div class="data-point" style="--delay: 2s; --orbit: 240deg"></div>
          <div class="data-point" style="--delay: 2.5s; --orbit: 300deg"></div>
        </div>

        <!-- Cubo 3D central -->
        <div class="hologram-cube">
          <div class="cube-face cube-front">
            <div class="face-grid"></div>
          </div>
          <div class="cube-face cube-back">
            <div class="face-grid"></div>
          </div>
          <div class="cube-face cube-left">
            <div class="face-grid"></div>
          </div>
          <div class="cube-face cube-right">
            <div class="face-grid"></div>
          </div>
          <div class="cube-face cube-top">
            <div class="face-grid"></div>
          </div>
          <div class="cube-face cube-bottom">
            <div class="face-grid"></div>
          </div>
        </div>

        <!-- Anéis de energia -->
        <div class="energy-ring ring-1"></div>
        <div class="energy-ring ring-2"></div>
        <div class="energy-ring ring-3"></div>

        <!-- Partículas flutuantes -->
        <div class="floating-particles">
          ${this.createParticles(20)}
        </div>

        <!-- Texto de dados animado -->
        <div class="hologram-data">
          <div class="data-line">SYSTEM.INIT</div>
          <div class="data-line" style="animation-delay: 0.5s">LOADING_PROFILE...</div>
          <div class="data-line" style="animation-delay: 1s">STATUS: ONLINE</div>
        </div>
      </div>
    `;

    this.container.innerHTML = hologramHTML;
  }

  createParticles(count) {
    let particlesHTML = '';
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const delay = Math.random() * 3;
      const duration = Math.random() * 3 + 2;
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;

      particlesHTML += `
        <div class="particle" style="
          width: ${size}px;
          height: ${size}px;
          left: ${50 + x}%;
          top: ${50 + y}%;
          animation-delay: ${delay}s;
          animation-duration: ${duration}s;
        "></div>
      `;
    }
    return particlesHTML;
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new HologramAnimation());
} else {
  new HologramAnimation();
}
