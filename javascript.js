document.addEventListener('DOMContentLoaded', () => {
  // --- SCROLLSPY COM ARIA-CURRENT = "PAGE" ---
const sections = document.querySelectorAll('main section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

function updateActiveNavOnScroll() {
  const scrollPosition = window.scrollY + 150; // Offset para detectar a secção com antecedência

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        const isCurrent = link.getAttribute('href') === `#${sectionId}`;

        if (isCurrent) {
          link.setAttribute('aria-current', 'page');
          link.classList.add('nav__link--active');
        } else {
          link.removeAttribute('aria-current');
          link.classList.remove('nav__link--active');
        }
      });
    }
  });
}

// Executa no scroll e na carga inicial
window.addEventListener('scroll', updateActiveNavOnScroll);
updateActiveNavOnScroll();
  // Configuração do Scroll Reveal via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null, // usa a janela do navegador (viewport)
    rootMargin: '0px 0px -80px 0px', // ativa a animação 80px antes de chegar totalmente à tela
    threshold: 0.15 // ativa quando 15% do elemento estiver visível
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona a classe que dispara a animação CSS
        entry.target.classList.add('active');
        
        // Deixa de observar o elemento após a animação ter acontecido
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplica o observador a cada elemento com a classe .reveal
  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });
});
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');
  const header = document.querySelector('.nav');

  // 1. Toggle do menu Mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--active');

      const dicionario = traducoes[idiomaAtual] || traducoes.pt;
      navToggle.setAttribute('aria-label', !isExpanded ? dicionario['nav.menu.close'] : dicionario['nav.menu.open']);
    });

    document.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');


      });
    });
  }

  // 2. Efeito Header & Botão "Voltar ao Topo"
  const backToTopBtn = document.getElementById('backToTop');
  let ultimoScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollAtual = window.scrollY;

    if (scrollAtual > 50) {
      header?.classList.add('nav--scrolled');
    } else {
      header?.classList.remove('nav--scrolled');
    }

    // Esconde a navbar ao descer, mostra ao subir (mantém visível perto do topo)
    if (scrollAtual > ultimoScrollY && scrollAtual > 150) {
      header?.classList.add('nav--hidden');
    } else {
      header?.classList.remove('nav--hidden');
    }
    ultimoScrollY = scrollAtual;

    if (scrollAtual > 300) {
      backToTopBtn?.classList.add('back-to-top--visible');
    } else {
      backToTopBtn?.classList.remove('back-to-top--visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. TRADUÇÕES (PT / EN)
  const traducoes = {
    pt: {
      'depoimentos.heading': 'Recomendações & Depoimentos',
      'depoimentos.card2.text': '"O Felizardo tem um domínio impressionante de React e Node.js. Além do código limpo, demonstrou muita proatividade e facilidade de comunicação durante toda a integração do projeto."',
      'depoimentos.card2.role': 'Desenvolvedor fullstack',
      'depoimentos.card3.text': '"Um profissional extremamente dedicado e atento aos detalhes de UI/UX. Conseguiu transformar nossos requisitos de negócio em uma interface moderna, rápida e totalmente responsiva."',
      'depoimentos.card3.role': 'UX Designer Senior',
      'nav.sobre': 'Sobre',
      'nav.skills': 'Skills',
      'nav.certificados': 'Certificados',
      'nav.projetos': 'Projetos',
      'nav.contacto': 'Contacto',
      'hero.eyebrow': 'Olá, eu sou',
      'hero.tagline': 'Criando experiências digitais incríveis com código limpo e design moderno',
      'hero.cta.hire': 'Contrate-me!',
      'hero.cta.cv': 'DOWNLOAD CV',
      'badge.available': 'Disponível para novos projetos',
      'badge.unavailable': 'Indisponível no momento',
      'stats.projects': 'Projetos',
      'stats.experience': 'Experiência',
      'stats.experience.number': '1 anos',
      'sobre.heading': 'Um pouco sobre mim e minha trajetória na programação',
      'sobre.p1': 'Sou Felizardo Lázaro Matola, um apaixonado por programação e tecnologia! Aos 21 anos, já tive a incrível oportunidade de participar de projetos que marcaram minha trajetória, como o desenvolvimento de uma aplicação pela Rocketseat em 2025. Essas experiências me ensinaram a importância de inovar e me desafiar constantemente.',
      'sobre.p2': 'Desenvolvo projetos para web há cerca de 1 anos, quando comecei a programar em HTML, CSS e JavaScript focado no front-end. Atualmente sou um desenvolvedor fullstack com experiência na criação de aplicações completas, com backends seguros e escaláveis e interfaces modernas e intuitivas. Meu maior objetivo é criar projetos que impactem de forma positiva a vida das pessoas.',
      'sobre.cta': 'Veja meus projetos',
      'cert.heading': 'Certificados e Formação',
      'cert1.title': 'Especialização Fullstack',
      'cert1.desc': 'Desenvolvi o meu portfólio profissional completo, tanto em Front-end como em Back-end, com algumas inovações, Node.js e arquiteturas modernas.',
      'cert2.title': 'Desenvolvimento Web Front-End',
      'cert2.desc': 'Domínio de fundamentos HTML5, CSS3 avançado, JavaScript assíncrono e boas práticas de UI/UX.',
      'cert3.title': 'Inovação da Tecnologia',
      'cert3.desc': 'Aprendi a desenvolver ideias inovadoras dentro da tecnologia.',
      'projetos.heading': 'Meus projetos',
      'skills.hard.heading': 'Hard Skills',
      'skills.soft.heading': 'Soft Skills',
      'skills.soft.continuous': 'Aprendizado contínuo',
      'skills.soft.communication': 'Comunicação',
      'skills.soft.proactivity': 'Proatividade',
      'skills.soft.teamwork': 'Trabalho em equipe',
      'skills.soft.organization': 'Organização',
      'exp.heading': 'Minha experiência',
      'exp1.title': 'Desenvolvedor Front End JR',
      'exp1.date': 'Maio 2025 - Janeiro 2026',
      'exp1.desc': 'Atuei na área de desenvolvimento front-end, focado na implementação e melhoria de interfaces e funcionalidades em projetos internos. Meu trabalho envolve colaboração com a equipe e integração com serviços internos de empresas.',
      'exp2.title': 'Designer Gráfico UX/UI',
      'exp2.company': 'Figma',
      'exp2.date': 'Janeiro 2025 - Dezembro 2025',
      'exp2.desc': 'Criando designs de interface e experiência do usuário para aplicativos e websites.',
      'exp3.title': 'Desenvolvedor Back End JR',
      'exp3.date': 'Janeiro 2026 - atualmente',
      'exp3.desc': 'Trabalhei em alguns projetos colaborativos para a implementação de novas funcionalidades, e melhorias em sistemas existentes.',
      'exp4.title': 'Técnico em Informática',
      'exp4.company': 'Universidade Católica de Moçambique',
      'exp4.date': 'Janeiro 2026 - atualmente',
      'exp4.desc': 'Adquirindo conhecimento sobre a tecnologia de informação e desenvolvimento de software.',
      'form.title': 'Envie uma mensagem',
      'form.send': 'Enviar Mensagem',
      'footer.email.label': 'Email',
      'footer.location.label': 'Localização',
      'footer.location.value': 'Moçambique',
      'footer.social.label': 'Redes sociais',
      'footer.criado': 'Criado e desenvolvido por',
      'nav.menu.open': 'Abrir menu',
      'nav.menu.close': 'Fechar menu',
      '404.message': 'Ops! A página ou recurso que procura não existe.',
      '404.back': 'Voltar ao Início'
      
      
    },
    en: {
      'depoimentos.heading': 'Testimonials & Recommendations',
      'depoimentos.card2.text': '"Felizardo has an impressive command of React and Node.js. Beyond clean code, he showed great proactivity and communication skills throughout the project integration."',
      'depoimentos.card2.role': 'Fullstack Developer',
      'depoimentos.card3.text': '"An extremely dedicated professional with great attention to UI/UX details. He transformed our business requirements into a modern, fast, and fully responsive interface."',
      'depoimentos.card3.role': 'Senior UX Designer',
      'nav.sobre': 'About',
      'nav.skills': 'Skills',
      'nav.certificados': 'Certificates',
      'nav.projetos': 'Projects',
      'nav.contacto': 'Contact',
      'hero.eyebrow': "Hi, I'm",
      'hero.tagline': 'Building incredible digital experiences with clean code and modern design',
      'hero.cta.hire': 'Hire Me!',
      'hero.cta.cv': 'DOWNLOAD CV',
      'badge.available': 'Available for new projects',
      'badge.unavailable': 'Currently unavailable',
      'stats.projects': 'Projects',
      'stats.experience': 'Experience',
      'stats.experience.number': '1 years',
      'sobre.heading': 'A bit about me and my journey in programming',
      'sobre.p1': "I'm Felizardo Lázaro Matola, passionate about programming and technology! At 21 years old, I've already had the amazing opportunity to take part in projects that shaped my path, such as building an application through Rocketseat in 2025. These experiences taught me the importance of constantly innovating and challenging myself.",
      'sobre.p2': "I've been building for the web for about 1 years, starting out with HTML, CSS and JavaScript focused on the front-end. Today I'm a fullstack developer experienced in building complete applications, with secure, scalable backends and modern, intuitive interfaces. My biggest goal is to create projects that have a positive impact on people's lives.",
      'sobre.cta': 'See my projects',
      'cert.heading': 'Certificates & Education',
      'cert1.title': 'Fullstack Specialization',
      'cert1.desc': 'End-to-end fullstack application development using React, Node.js, and modern software architectures.',
      'cert2.title': 'Front-End Web Development',
      'cert2.desc': 'Mastery of HTML5, advanced CSS3, asynchronous JavaScript, and best UI/UX practices.',
      'cert3.title': 'Technology Innovation',
      'cert3.desc': 'I learned how to come up with innovative ideas within technology.',
      'projetos.heading': 'My Projects',
      'skills.hard.heading': 'Hard Skills',
      'skills.soft.heading': 'Soft Skills',
      'skills.soft.continuous': 'Continuous learning',
      'skills.soft.communication': 'Communication',
      'skills.soft.proactivity': 'Proactivity',
      'skills.soft.teamwork': 'Teamwork',
      'skills.soft.organization': 'Organization',
      'exp.heading': 'My Experience',
      'exp1.title': 'Junior Front End Developer',
      'exp1.date': 'May 2025 - January 2026',
      'exp1.desc': "I worked in front-end development, focused on implementing and improving interfaces and features for internal projects. My work involved collaborating with the team and integrating internal company services.",
      'exp2.title': 'UX/UI Graphic Designer',
      'exp2.company': 'Figma',
      'exp2.date': 'January 2025 - December 2025',
      'exp2.desc': 'Creating interface and user experience designs for apps and websites.',
      'exp3.title': 'Junior Back End Developer',
      'exp3.date': 'January 2026 - present',
      'exp3.desc': 'I worked on a few collaborative projects implementing new features and improving existing systems.',
      'exp4.title': 'IT Technician',
      'exp4.company': 'Catholic University of Mozambique',
      'exp4.date': 'January 2026 - present',
      'exp4.desc': 'Gaining knowledge in information technology and software development.',
      'form.title': 'Send a message',
      'form.send': 'Send Message',
      'footer.email.label': 'Email',
      'footer.location.label': 'Location',
      'footer.location.value': 'Mozambique',
      'footer.social.label': 'Social media',
      'footer.criado': 'Created and developed by',
      'nav.menu.open': 'Open menu',
      'nav.menu.close': 'Close menu',
      '404.message': 'Oops! The page or resource you are looking for does not exist.',
      '404.back': 'Back to Home'
    }
  };

  const frasesPorIdioma = {
    pt: ['Felizardo Lázaro\nMatola', 'Resolução e\nInovação.', 'Desenvolvedor\nWeb'],
    en: ['Felizardo Lázaro\nMatola', 'Fullstack\nDeveloper', 'Web\nDeveloper']
  };

  const langButtons = document.querySelectorAll('.lang-switch__btn');
  const STORAGE_KEY = 'idiomaPortfolio';
  let idiomaAtual = localStorage.getItem(STORAGE_KEY) || 'pt';

  function traduzirPagina(lang) {
    const dicionario = traducoes[lang] || traducoes.pt;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const chave = el.getAttribute('data-i18n');
      if (dicionario[chave] !== undefined) {
        el.textContent = dicionario[chave];
      }
    });

    langButtons.forEach(btn => {
      const ativo = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', String(ativo));
    });

    if (navToggle) {
      const aberto = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-label', aberto ? dicionario['nav.menu.close'] : dicionario['nav.menu.open']);
    }

    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-MZ';
  }

  function salvarIdioma(lang) {
    idiomaAtual = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === idiomaAtual) return;
      salvarIdioma(lang);
      traduzirPagina(lang);
      reiniciarTypewriter();
      atualizarDisponibilidade();
    });
  });

  traduzirPagina(idiomaAtual);

  // 4. Typewriter
  const typewriterElement = document.getElementById('typewriter');
  let fraseIndex = 0, charIndex = 0, isDeleting = false, timeoutId = null;
  let typewriterTexto = null;

  // Monta a estrutura interna: um span só para o texto digitado + o cursor
  // logo em seguida, dentro do MESMO container. Assim o cursor sempre fica
  // colado no último caractere digitado, mesmo mudando de linha.
  function montarEstruturaTypewriter() {
    if (!typewriterElement) return;

    // Reaproveita um cursor já existente no HTML (se houver) em vez de duplicar
    const cursorExistente = typewriterElement.parentElement?.querySelector('.cursor')
      || document.querySelector('.cursor');

    typewriterElement.innerHTML = '';

    typewriterTexto = document.createElement('span');
    typewriterTexto.className = 'typewriter__texto';
    typewriterElement.appendChild(typewriterTexto);

    const cursor = cursorExistente || document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    if (!cursor.textContent) cursor.textContent = '|';
    typewriterElement.appendChild(cursor);
  }

  function digitarEfeito() {
    const frases = frasesPorIdioma[idiomaAtual] || frasesPorIdioma.pt;
    const fraseAtual = frases[fraseIndex % frases.length];

    if (isDeleting) {
      typewriterTexto.innerHTML = fraseAtual.substring(0, charIndex - 1).replace(/\n/g, '<br>');
      charIndex--;
    } else {
      typewriterTexto.innerHTML = fraseAtual.substring(0, charIndex + 1).replace(/\n/g, '<br>');
      charIndex++;
    }

    let velocidade = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === fraseAtual.length) {
      velocidade = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
      velocidade = 500;
    }

    timeoutId = setTimeout(digitarEfeito, velocidade);
  }

  function reiniciarTypewriter() {
    if (!typewriterElement) return;
    clearTimeout(timeoutId);
    fraseIndex = 0; charIndex = 0; isDeleting = false;
    typewriterTexto.innerHTML = '';
    fixarLarguraTypewriter();
    digitarEfeito();
  }

  // Trava a largura (maior linha) e a altura (2 linhas) do elemento com base
  // nas frases do idioma atual, assim o texto nunca "empurra" o cursor,
  // a foto ou qualquer outro elemento da página enquanto digita/apaga.
  function fixarLarguraTypewriter() {
    if (!typewriterElement) return;
    const frases = frasesPorIdioma[idiomaAtual] || frasesPorIdioma.pt;
    const estilo = window.getComputedStyle(typewriterElement);

    const medidor = document.createElement('span');
    medidor.style.visibility = 'hidden';
    medidor.style.position = 'absolute';
    medidor.style.display = 'inline-block';
    medidor.style.whiteSpace = 'nowrap';
    medidor.style.font = estilo.font;
    medidor.style.lineHeight = estilo.lineHeight;
    document.body.appendChild(medidor);

    let maiorLargura = 0;
    let maiorAltura = 0;

    frases.forEach(frase => {
      medidor.innerHTML = frase.replace(/\n/g, '<br>');
      maiorLargura = Math.max(maiorLargura, medidor.offsetWidth);
      maiorAltura = Math.max(maiorAltura, medidor.offsetHeight);
    });

    document.body.removeChild(medidor);

    // Pequena folga para o cursor piscante caber sem ser cortado
    typewriterElement.style.minWidth = (maiorLargura + 14) + 'px';
    typewriterElement.style.minHeight = maiorAltura + 'px';
  }

  if (typewriterElement) {
    montarEstruturaTypewriter();
    fixarLarguraTypewriter();
    digitarEfeito();

    // Quando a fonte customizada (Fraunces) terminar de carregar, a largura
    // do texto pode mudar em relação à fonte substituta usada na primeira
    // medição. Remedimos nesse momento para manter tudo estável.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fixarLarguraTypewriter);
    }
  }

  // 5. Disponibilidade
  const badgeDisponibilidade = document.getElementById('badge-disponibilidade');
  function atualizarDisponibilidade() {
    if (!badgeDisponibilidade) return;
    const ponto = badgeDisponibilidade.querySelector('.ponto-verde');
    const texto = badgeDisponibilidade.querySelector('.texto-status');
    const dicionario = traducoes[idiomaAtual] || traducoes.pt;

    const dataLimiteStr = badgeDisponibilidade.dataset.disponivelAte;
    const dataLimite = dataLimiteStr ? new Date(`${dataLimiteStr}T23:59:59`) : null;
    const agora = new Date();

    const disponivel = !dataLimite || agora <= dataLimite;

    if (!disponivel) {
      ponto.classList.add('ponto-offline');
      texto.textContent = dicionario['badge.unavailable'];
    } else {
      ponto.classList.remove('ponto-offline');
      texto.textContent = dicionario['badge.available'];
    }
  }

  atualizarDisponibilidade();

  // 6. FORMULÁRIO DE CONTACTO (Formspree AJAX)
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    formStatus.textContent = "Enviando...";
    formStatus.style.color = "#aaa";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "Mensagem enviada com sucesso!";
        formStatus.style.color = "#4CAF50";
        contactForm.reset();
      } else {
        throw new Error("Erro no envio");
      }
    } catch {
      formStatus.textContent = "Erro ao enviar. Tente novamente mais tarde.";
      formStatus.style.color = "#f44336";
    }
  });

  // 8. ESTADO/MODAL 404 PERSONALIZADO
  const modal404 = document.getElementById('modal404');
  const close404 = document.getElementById('close404');

  if (window.location.hash === '#404') {
    modal404?.classList.add('modal-404--open');
  }

  close404?.addEventListener('click', () => {
    modal404?.classList.remove('modal-404--open');
    window.location.hash = '';
  });

  // 9. HORA LOCAL EM TEMPO REAL (Beira / Maputo — fuso Africa/Maputo)
  const horaLocalTexto = document.getElementById('hora-local-texto');

  function atualizarHoraLocal() {
    if (!horaLocalTexto) return;
    const agora = new Date().toLocaleTimeString('pt-PT', {
      timeZone: 'Africa/Maputo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    horaLocalTexto.textContent = agora;
  }

  atualizarHoraLocal();
  setInterval(atualizarHoraLocal, 1000);