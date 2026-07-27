(() => {
  'use strict';

  const carouselCss = document.createElement('link');
  carouselCss.rel = 'stylesheet';
  carouselCss.href = 'assets/css/carousels.css?v=20260727-1';
  document.head.appendChild(carouselCss);

  const menuButton = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const form = document.querySelector('#orcamento-form');

  if (menuButton && links) {
    menuButton.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const cuisineSection = document.querySelector('#culinarias .grid');
  if (cuisineSection) {
    const cuisines = [
      {
        title: 'Brasileira', icon: '🇧🇷', prefix: 'br',
        dishes: [['🍛', 'Feijoada e acompanhamentos'], ['🥘', 'Moqueca brasileira'], ['🍖', 'Carnes e sabores regionais']]
      },
      {
        title: 'Italiana', icon: '🇮🇹', prefix: 'it',
        dishes: [['🍝', 'Massas artesanais'], ['🍕', 'Clássicos italianos'], ['🍚', 'Risotos cremosos']]
      },
      {
        title: 'Francesa', icon: '🇫🇷', prefix: 'fr',
        dishes: [['🥐', 'Panificação e entradas'], ['🍲', 'Pratos clássicos franceses'], ['🍮', 'Sobremesas refinadas']]
      },
      {
        title: 'Vegetariana', icon: '🥗', prefix: 'veg',
        dishes: [['🥗', 'Saladas completas'], ['🥙', 'Pratos leves e criativos'], ['🍲', 'Preparos quentes vegetarianos']]
      },
      {
        title: 'Personalizada', icon: '✨', prefix: 'personal',
        dishes: [['🍽️', 'Menu exclusivo'], ['🥂', 'Experiência para celebrações'], ['👨‍🍳', 'Criação sob medida']]
      }
    ];

    cuisineSection.className = 'cuisine-galleries';
    cuisineSection.innerHTML = cuisines.map((cuisine, cuisineIndex) => `
      <section class="cuisine-carousel" aria-labelledby="cuisine-${cuisineIndex}">
        <div class="carousel-heading">
          <div class="carousel-title"><span class="icon" aria-hidden="true">${cuisine.icon}</span><h3 id="cuisine-${cuisineIndex}">${cuisine.title}</h3></div>
          <div class="carousel-controls" aria-label="Controles do carrossel ${cuisine.title}">
            <button class="carousel-button carousel-prev" type="button" aria-label="Imagens anteriores">‹</button>
            <button class="carousel-button carousel-next" type="button" aria-label="Próximas imagens">›</button>
          </div>
        </div>
        <div class="carousel-track" tabindex="0" aria-label="Galeria ${cuisine.title}">
          ${cuisine.dishes.map((dish, index) => `
            <figure class="dish-card">
              <div class="dish-visual dish-${cuisine.prefix}-${index + 1}" role="img" aria-label="${dish[1]}"><span aria-hidden="true">${dish[0]}</span></div>
              <figcaption>${dish[1]}</figcaption>
            </figure>`).join('')}
        </div>
      </section>`).join('');
  }

  document.querySelectorAll('.cuisine-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    carousel.querySelector('.carousel-prev')?.addEventListener('click', () => {
      track.scrollBy({ left: -Math.max(track.clientWidth * 0.85, 260), behavior: 'smooth' });
    });

    carousel.querySelector('.carousel-next')?.addEventListener('click', () => {
      track.scrollBy({ left: Math.max(track.clientWidth * 0.85, 260), behavior: 'smooth' });
    });
  });

  if (!form) return;

  const safeText = (value, maxLength) => String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const startedAt = Number(form.dataset.startedAt || Date.now());
    const elapsed = Date.now() - startedAt;
    const honeypot = form.querySelector('#website');
    if ((honeypot && honeypot.value) || elapsed < 1200) return;

    const nome = safeText(document.querySelector('#nome')?.value, 80);
    const telefone = safeText(document.querySelector('#telefone')?.value, 30);
    const tipo = safeText(document.querySelector('#evento')?.value, 60);
    const detalhes = safeText(document.querySelector('#mensagem')?.value, 600);
    if (!nome || !telefone || !tipo) return;

    const mensagem = [
      `Olá! Gostaria de solicitar um orçamento para ${tipo}.`,
      `Meu nome é ${nome}.`,
      `Telefone: ${telefone}.`,
      detalhes ? `Detalhes: ${detalhes}` : ''
    ].filter(Boolean).join(' ');

    const url = new URL('https://wa.me/5511943599302');
    url.searchParams.set('text', mensagem);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  });

  form.dataset.startedAt = String(Date.now());
})();