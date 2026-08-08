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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('nav--scrolled');
    } else {
      header?.classList.remove('nav--scrolled');
    }

    if (window.scrollY > 300) {
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
      'stats.experience.number': '2 anos',
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
      'exp1.title': 'Desenvolvedor Front End',
      'exp1.date': 'Maio 2025 - Janeiro 2025',
      'exp1.desc': 'Atuo na área de desenvolvimento front-end, focado na implementação e melhoria de interfaces e funcionalidades em projetos internos. Meu trabalho envolve colaboração com a equipe e integração com serviços internos da empresa.',
      'exp2.title': 'Back End',
      'exp2.company': 'Alura',
      'exp2.date': 'Janeiro 2025 - atualmente',
      'exp2.desc': 'Utilizo ferramentas modernas para a segurança e funcionalidades internos.',
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
      'stats.experience.number': '2 years',
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
      'exp1.date': 'May 2025 - Present',
      'exp1.desc': "I work in front-end development, focused on implementing and improving interfaces and features for internal projects. My work involves close collaboration with the team and integration with the company's internal services.",
      'exp2.title': 'Back End Developer',
      'exp2.company': 'Alura',
      'exp2.date': 'January 2026 - present',
      'exp2.desc': 'I use modern tools for security and internal features.',
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
    pt: ['Felizardo Lázaro Matola', 'Desenvolvedor Fullstack', 'Desenvolvedor Web'],
    en: ['Felizardo Lázaro Matola', 'Fullstack Developer', 'Web Developer']
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

  function digitarEfeito() {
    const frases = frasesPorIdioma[idiomaAtual] || frasesPorIdioma.pt;
    const fraseAtual = frases[fraseIndex % frases.length];

    if (isDeleting) {
      typewriterElement.textContent = fraseAtual.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = fraseAtual.substring(0, charIndex + 1);
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
    typewriterElement.textContent = '';
    digitarEfeito();
  }

  if (typewriterElement) digitarEfeito();

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

  // 6. SCROLL REVEAL (Animação Suave das Secções)
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('reveal--active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Executa na carga inicial

  // 7. FORMULÁRIO DE CONTACTO (Formspree AJAX)
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