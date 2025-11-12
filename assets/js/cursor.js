// Cursor personalizado interativo
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorFollower = null;
    this.init();
  }

  init() {
    // Criar elementos do cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursorFollower = document.createElement('div');
    this.cursorFollower.className = 'custom-cursor-follower';
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorFollower);
    
    // Esconder cursor padrão
    document.body.style.cursor = 'none';
    
    // Event listeners
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mousedown', () => this.onMouseDown());
    document.addEventListener('mouseup', () => this.onMouseUp());
    
    // Adicionar listeners para elementos interativos (usando event delegation)
    let hoveredElement = null;
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .card, .button, .stat-card, .certificate-card, .timeline-item');
      if (target && target !== hoveredElement) {
        hoveredElement = target;
        this.onHover();
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .card, .button, .stat-card, .certificate-card, .timeline-item');
      if (target && !target.contains(e.relatedTarget)) {
        hoveredElement = null;
        this.onLeave();
      }
    });
  }

  onMouseMove(e) {
    this.cursor.style.left = e.clientX + 'px';
    this.cursor.style.top = e.clientY + 'px';
    
    // Follower com delay
    setTimeout(() => {
      this.cursorFollower.style.left = e.clientX + 'px';
      this.cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  }

  onMouseDown() {
    this.cursor.classList.add('active');
    this.cursorFollower.classList.add('active');
  }

  onMouseUp() {
    this.cursor.classList.remove('active');
    this.cursorFollower.classList.remove('active');
  }

  onHover() {
    this.cursor.classList.add('hover');
    this.cursorFollower.classList.add('hover');
  }

  onLeave() {
    this.cursor.classList.remove('hover');
    this.cursorFollower.classList.remove('hover');
  }
}

// Inicializar apenas em desktop
if (window.innerWidth > 768) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CustomCursor());
  } else {
    new CustomCursor();
  }
}

