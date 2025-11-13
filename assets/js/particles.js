// Sistema de estrelas discretas para o fundo de todas as seções
class StarFieldSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.maxStars = 200; // Número de estrelas
    this.twinkleSpeed = 0.002; // Velocidade do brilho (twinkle)
    this.isLightMode = false;
    this.init();
  }

  init() {
    // Criar canvas
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      background: transparent;
    `;
    
    // Inserir canvas no início do body para garantir que fique atrás das seções
    if (document.body.firstChild) {
      document.body.insertBefore(this.canvas, document.body.firstChild);
    } else {
      document.body.appendChild(this.canvas);
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    
    // Verificar tema inicial
    this.checkTheme();
    
    // Criar estrelas
    this.createStars();
    
    // Event listeners
    window.addEventListener('resize', () => {
      this.resize();
      this.createStars();
    });
    
    // Observar mudanças no tema
    this.observeThemeChanges();
    
    // Iniciar animação
    this.animate();
  }

  checkTheme() {
    this.isLightMode = document.body.classList.contains('light-mode');
  }

  observeThemeChanges() {
    // Observar mudanças na classe do body
    const observer = new MutationObserver(() => {
      const wasLightMode = this.isLightMode;
      this.checkTheme();
      
      // Se o tema mudou, recriar as estrelas com o novo estilo
      if (wasLightMode !== this.isLightMode) {
        this.createStars();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  getStarColor() {
    if (this.isLightMode) {
      // Modo claro: cores escuras (azul escuro, cinza escuro, etc.)
      const colors = [
        { r: 30, g: 58, b: 138 },    // Azul escuro
        { r: 59, g: 130, b: 246 },   // Azul médio
        { r: 75, g: 85, b: 99 },     // Cinza azulado
        { r: 107, g: 114, b: 128 },  // Cinza
        { r: 37, g: 99, b: 235 }     // Azul profundo
      ];
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      return { ...color, base: color };
    } else {
      // Modo escuro: branco (padrão)
      return { r: 255, g: 255, b: 255, base: { r: 255, g: 255, b: 255 } };
    }
  }

  createStars() {
    this.stars = [];
    this.checkTheme();
    
    for (let i = 0; i < this.maxStars; i++) {
      const color = this.getStarColor();
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * (this.isLightMode ? 1.2 : 1.5) + (this.isLightMode ? 0.3 : 0.5), // Menores no modo claro
        opacity: Math.random() * (this.isLightMode ? 0.4 : 0.6) + (this.isLightMode ? 0.15 : 0.2), // Mais sutis no modo claro
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        color: color
      });
    }
  }

  animate() {
    // Limpar canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const currentTime = Date.now() * 0.001; // Tempo em segundos
    
    // Desenhar estrelas
    this.stars.forEach((star) => {
      // Efeito de brilho sutil (twinkle)
      const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
      const currentOpacity = star.opacity * twinkle;
      
      // Usar cor baseada no tema
      const { r, g, b } = star.color;
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
      
      // Estilo diferente para modo claro: estrelas com brilho mais suave
      if (this.isLightMode) {
        // Modo claro: estrelas com brilho suave ao redor
        if (star.size > 0.8 && currentOpacity > 0.3) {
          // Brilho externo mais suave
          const glowGradient = this.ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
          glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
          glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          this.ctx.fillStyle = glowGradient;
          this.ctx.beginPath();
          this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          this.ctx.fill();
        }
        
        // Desenhar estrela central
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Modo escuro: estilo original (branco)
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Algumas estrelas maiores com brilho adicional
        if (star.size > 1.2 && currentOpacity > 0.5) {
          this.ctx.shadowBlur = star.size * 2;
          this.ctx.shadowColor = `rgba(255, 255, 255, ${currentOpacity * 0.5})`;
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new StarFieldSystem());
} else {
  new StarFieldSystem();
}

