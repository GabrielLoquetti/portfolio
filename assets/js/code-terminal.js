// Terminal de código animado para a seção home
function createCodeTerminal() {
  const codeSnippets = [
    {
      language: 'python',
      code: `def hello_world():
    print("Hello, World!")
    return "Gabriel Marin"`,
      color: '#3776AB'
    },
    {
      language: 'javascript',
      code: `const developer = {
  name: "Gabriel Marin",
  skills: ["Full-Stack", "Python", "JavaScript"],
  passion: "Criar soluções inovadoras"
};`,
      color: '#F7DF1E'
    },
    {
      language: 'html',
      code: `<!DOCTYPE html>
<html>
  <head>
    <title>Portfolio</title>
  </head>
  <body>
    <h1>Desenvolvedor Full-Stack</h1>
  </body>
</html>`,
      color: '#E34F26'
    }
  ];

  const colB = document.querySelector('#home .col-b');
  if (!colB) return;

  // Remover imagens antigas
  const oldImages = colB.querySelectorAll('img');
  oldImages.forEach(img => img.remove());

  // Criar terminal
  colB.innerHTML = `
    <div class="code-terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-btn close"></span>
          <span class="terminal-btn minimize"></span>
          <span class="terminal-btn maximize"></span>
        </div>
        <div class="terminal-title">terminal — gabriel@portfolio</div>
      </div>
      <div class="terminal-body">
        <div class="code-line">
          <span class="code-prompt">$</span>
          <span class="code-text typing-text"></span>
          <span class="cursor-blink">|</span>
        </div>
      </div>
    </div>
  `;

  // Animar texto digitando
  let currentSnippet = 0;
  let currentChar = 0;
  const typingElement = colB.querySelector('.typing-text');
  
  function typeCode() {
    if (currentSnippet >= codeSnippets.length) {
      currentSnippet = 0;
    }
    
    const snippet = codeSnippets[currentSnippet];
    const text = snippet.code;
    
    if (currentChar < text.length) {
      typingElement.textContent = text.substring(0, currentChar + 1);
      currentChar++;
      setTimeout(typeCode, 50);
    } else {
      setTimeout(() => {
        typingElement.textContent = '';
        currentChar = 0;
        currentSnippet++;
        typeCode();
      }, 3000);
    }
  }

  // Iniciar animação após um delay
  setTimeout(typeCode, 1000);

  // Animar ícones flutuantes
  const icons = colB.querySelectorAll('.tech-icon');
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createCodeTerminal);
} else {
  createCodeTerminal();
}

