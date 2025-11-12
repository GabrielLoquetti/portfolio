// Animação de ondas/conexões para a seção de contato
function createContactAnimation() {
  const contactSection = document.querySelector('#contact .col-b');
  if (!contactSection) return;

  // Remover cubos antigos
  const oldCubes = contactSection.querySelector('.container');
  if (oldCubes) oldCubes.remove();

  // Criar canvas para animação de ondas
  const canvas = document.createElement('canvas');
  canvas.className = 'contact-waves';
  canvas.width = 400;
  canvas.height = 400;
  contactSection.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId;

  // Ajustar tamanho do canvas
  function resizeCanvas() {
    const rect = contactSection.getBoundingClientRect();
    canvas.width = Math.min(400, rect.width || 400);
    canvas.height = Math.min(400, rect.height || 400);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Configuração das ondas
  const waves = [
    { y: canvas.height * 0.3, length: 0.02, amplitude: 30, speed: 0.02, color: 'rgba(0, 133, 111, 0.3)' },
    { y: canvas.height * 0.5, length: 0.015, amplitude: 40, speed: 0.015, color: 'rgba(0, 133, 111, 0.4)' },
    { y: canvas.height * 0.7, length: 0.025, amplitude: 25, speed: 0.025, color: 'rgba(0, 133, 111, 0.2)' }
  ];

  let time = 0;
  const particles = [];

  // Criar partículas
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.02;

    // Desenhar ondas
    waves.forEach((wave, index) => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);

      for (let x = 0; x < canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.length + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Preencher área abaixo da onda
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color.replace('0.3', '0.1').replace('0.4', '0.15').replace('0.2', '0.08');
      ctx.fill();
    });

    // Desenhar partículas
    particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Rebater nas bordas
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Desenhar partícula
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 133, 111, ${particle.opacity})`;
      ctx.fill();

      // Conectar partículas próximas
      particles.forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 133, 111, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Desenhar ícones de tecnologia flutuantes
    const techIcons = ['💻', '📧', '📱', '🌐'];
    techIcons.forEach((icon, i) => {
      const x = canvas.width / 2 + Math.cos(time + i * Math.PI / 2) * 80;
      const y = canvas.height / 2 + Math.sin(time + i * Math.PI / 2) * 80;
      
      ctx.font = '30px Arial';
      ctx.fillText(icon, x, y);
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pausar animação quando não visível (performance)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  });

  observer.observe(canvas);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createContactAnimation);
} else {
  createContactAnimation();
}

