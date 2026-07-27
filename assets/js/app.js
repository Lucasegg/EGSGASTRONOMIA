(() => {
  'use strict';

  const carouselCss = document.createElement('link');
  carouselCss.rel = 'stylesheet';
  carouselCss.href = 'assets/css/carousels.css?v=20260727-3';
  document.head.appendChild(carouselCss);

  const menuButton = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const form = document.querySelector('#orcamento-form');

  if (menuButton && links) {
    menuButton.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      links.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const flags = {
    br: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#009739"/><polygon points="15,2 27,10 15,18 3,10" fill="#FEDD00"/><circle cx="15" cy="10" r="4.6" fill="#012169"/></svg>',
    it: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/></svg>',
    fr: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/></svg>'
  };

  const cuisineSection = document.querySelector('#culinarias .grid');
  if (cuisineSection) {
    const cuisines = [
      {title:'Brasileira',icon:flags.br,dishes:[
        ['https://unsplash.com/photos/Xa03Ia9N9M4/download?force=true&w=1200','Churrasco e sabores brasileiros'],
        ['https://unsplash.com/photos/Qf5eVU2kRMA/download?force=true&w=1200','Preparo artesanal na brasa'],
        ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=82','Carnes e acompanhamentos regionais']
      ]},
      {title:'Italiana',icon:flags.it,dishes:[
        ['https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=1200&q=82','Spaghetti com molho e queijo'],
        ['https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=82','Massa italiana artesanal'],
        ['https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&w=1200&q=82','Pasta servida com elegância']
      ]},
      {title:'Francesa',icon:flags.fr,dishes:[
        ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=82','Prato francês contemporâneo'],
        ['https://images.unsplash.com/photo-1715249792894-43ad23412d3d?auto=format&fit=crop&w=1200&q=82','Alta gastronomia francesa'],
        ['https://images.unsplash.com/photo-1646296568685-96921900f23a?auto=format&fit=crop&w=1200&q=82','Menu francês refinado']
      ]},
      {title:'Vegetariana',icon:'🥗',dishes:[
        ['https://unsplash.com/photos/IGfIGP5ONV0/download?force=true&w=1200','Bowl vegetariano completo'],
        ['https://unsplash.com/photos/ZOBF_XwO9z4/download?force=true&w=1200','Salada fresca e colorida'],
        ['https://unsplash.com/photos/ewbCywt7f2U/download?force=true&w=1200','Vegetais e ingredientes naturais']
      ]},
      {title:'Personalizada',icon:'✨',dishes:[
        ['https://unsplash.com/photos/qtCky1ikayM/download?force=true&w=1200','Criação exclusiva para o evento'],
        ['https://unsplash.com/photos/cq1Hx5j1u9s/download?force=true&w=1200','Apresentação gastronômica autoral'],
        ['https://unsplash.com/photos/5HQAKnaR6YM/download?force=true&w=1200','Menu personalizado e sofisticado']
      ]}
    ];

    cuisineSection.className = 'cuisine-galleries';
    cuisineSection.innerHTML = cuisines.map((cuisine, cuisineIndex) => `
      <section class="cuisine-carousel" aria-labelledby="cuisine-${cuisineIndex}">
        <div class="carousel-heading">
          <div class="carousel-title"><span class="cuisine-symbol" aria-hidden="true">${cuisine.icon}</span><h3 id="cuisine-${cuisineIndex}">${cuisine.title}</h3></div>
          <div class="carousel-controls" aria-label="Controles do carrossel ${cuisine.title}"><button class="carousel-button carousel-prev" type="button" aria-label="Imagens anteriores">‹</button><button class="carousel-button carousel-next" type="button" aria-label="Próximas imagens">›</button></div>
        </div>
        <div class="carousel-track" tabindex="0" aria-label="Galeria ${cuisine.title}">
          ${cuisine.dishes.map((dish) => `<figure class="dish-card"><img class="dish-photo" src="${dish[0]}" alt="${dish[1]}" loading="lazy" referrerpolicy="no-referrer"><figcaption>${dish[1]}</figcaption></figure>`).join('')}
        </div>
      </section>`).join('');
  }

  document.querySelectorAll('.cuisine-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    carousel.querySelector('.carousel-prev')?.addEventListener('click', () => track.scrollBy({left:-Math.max(track.clientWidth*.85,260),behavior:'smooth'}));
    carousel.querySelector('.carousel-next')?.addEventListener('click', () => track.scrollBy({left:Math.max(track.clientWidth*.85,260),behavior:'smooth'}));
  });

  const galleryItems = [
    ['buffet-ingredientes.jpg','Buffet','Ingredientes e acompanhamentos para buffet'],
    ['entrada-gourmet.jpg','Pratos autorais','Entrada gourmet empanada'],
    ['parrilla.jpg','Churrasco','Parrilla e preparo na brasa'],
    ['marmitas-variadas.jpg','Marmitas','Marmitas variadas e equilibradas'],
    ['buffet-completo.jpg','Buffet','Buffet completo com saladas e acompanhamentos'],
    ['mini-burgers-gourmet.jpg','Hambúrgueres','Mini hambúrgueres gourmet'],
    ['mesa-evento.jpg','Eventos','Mesa completa preparada para evento'],
    ['choripan.jpg','Sanduíches','Choripan e mini sanduíches'],
    ['mini-hamburgueres.jpg','Hambúrgueres','Mini hambúrgueres artesanais'],
    ['rosas-de-maca.jpg','Sobremesas','Rosas de maçã com canela'],
    ['salada-caesar.jpg','Saladas','Salada Caesar com croutons'],
    ['torta-de-maca.jpg','Sobremesas','Torta de maçã decorada'],
    ['prato-autoral.jpg','Pratos autorais','Prato autoral com purê e cogumelos'],
    ['mesa-mini-lanches.jpg','Eventos','Mesa de mini lanches para evento'],
    ['buffet-arroz-saladas.jpg','Buffet','Arroz, saladas e acompanhamentos']
  ].map(([file, category, title]) => ({src:`assets/img/galeria/${file}`,category,title}));

  const pizzaItems = [
    {src:'assets/img/galeria/pizza-no-forno.jpg',category:'Eventos de Pizzas',title:'Pizza assada no forno'},
    {src:'assets/img/galeria/pizza-vegetariana.jpg',category:'Eventos de Pizzas',title:'Pizza vegetariana artesanal'},
    {src:'assets/img/galeria/pizza-frango.jpg',category:'Eventos de Pizzas',title:'Pizza de frango com queijo'}
  ];

  const portfolioGrid = document.querySelector('#portfolio-grid');
  const portfolioFilters = document.querySelector('#portfolio-filters');
  const portfolioEmpty = document.querySelector('#portfolio-empty');
  const portfolioMosaic = document.querySelector('#portfolio-mosaic');
  const lightbox = document.querySelector('#gallery-lightbox');
  let visibleItems = [...galleryItems];
  let lightboxIndex = 0;

  const escapeText = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  if (portfolioGrid && portfolioFilters) {
    const categories = ['Todos', ...new Set(galleryItems.map((item) => item.category))];
    portfolioFilters.innerHTML = categories.map((category, index) => `<button class="portfolio-filter${index === 0 ? ' active' : ''}" type="button" data-filter="${escapeText(category)}">${escapeText(category)}</button>`).join('');

    const updateEmptyState = () => {
      const loaded = [...portfolioGrid.querySelectorAll('.portfolio-card:not([hidden]) img')].some((img) => img.complete && img.naturalWidth > 0);
      portfolioEmpty?.classList.toggle('visible', !loaded);
    };

    const renderGallery = (category = 'Todos') => {
      visibleItems = category === 'Todos' ? [...galleryItems] : galleryItems.filter((item) => item.category === category);
      portfolioGrid.innerHTML = visibleItems.map((item, index) => `<figure class="portfolio-card" data-index="${index}" tabindex="0" role="button" aria-label="Abrir ${escapeText(item.title)}"><img src="${item.src}" alt="${escapeText(item.title)}" loading="lazy"><figcaption><strong>${escapeText(item.title)}</strong><small>${escapeText(item.category)}</small></figcaption></figure>`).join('');
      portfolioGrid.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => {
          img.closest('.portfolio-card')?.setAttribute('hidden', '');
          updateEmptyState();
        });
        img.addEventListener('load', updateEmptyState);
      });
      portfolioGrid.querySelectorAll('.portfolio-card').forEach((card) => {
        const open = () => openLightbox(Number(card.dataset.index || 0));
        card.addEventListener('click', open);
        card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
      });
      setTimeout(updateEmptyState, 500);
    };

    portfolioFilters.addEventListener('click', (event) => {
      const button = event.target.closest('.portfolio-filter');
      if (!button) return;
      portfolioFilters.querySelectorAll('.portfolio-filter').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderGallery(button.dataset.filter || 'Todos');
    });

    renderGallery();
  }

  if (portfolioMosaic) {
    const preferredTitles = ['Mesa completa preparada para evento','Buffet completo com saladas e acompanhamentos','Mini hambúrgueres gourmet','Torta de maçã decorada','Prato autoral com purê e cogumelos'];
    const highlights = preferredTitles.map((title) => galleryItems.find((item) => item.title === title)).filter(Boolean);
    portfolioMosaic.innerHTML = highlights.map((item) => `<figure class="mosaic-item"><img src="${item.src}" alt="${escapeText(item.title)}" loading="lazy"><span>${escapeText(item.title)}</span></figure>`).join('');
    portfolioMosaic.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.closest('.mosaic-item')?.remove()));
  }

  const showLightboxItem = () => {
    if (!lightbox || !visibleItems.length) return;
    const item = visibleItems[lightboxIndex];
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    if (image) { image.src = item.src; image.alt = item.title; }
    if (caption) caption.textContent = `${item.title} — ${item.category}`;
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    lightboxIndex = Math.max(0, Math.min(index, visibleItems.length - 1));
    showLightboxItem();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close')?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const moveLightbox = (direction) => {
    if (!visibleItems.length) return;
    lightboxIndex = (lightboxIndex + direction + visibleItems.length) % visibleItems.length;
    showLightboxItem();
  };

  document.querySelectorAll('.pizza-photo').forEach((card, index) => {
    const openPizza = () => {
      visibleItems = [...pizzaItems];
      openLightbox(index);
    };
    card.addEventListener('click', openPizza);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPizza();
      }
    });
  });

  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => moveLightbox(-1));
  lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => moveLightbox(1));
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  if (!form) return;
  const safeText = (value, maxLength) => String(value || '').replace(/[\u0000-\u001F\u007F]/g,' ').replace(/\s+/g,' ').trim().slice(0,maxLength);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const startedAt = Number(form.dataset.startedAt || Date.now());
    const honeypot = form.querySelector('#website');
    if ((honeypot && honeypot.value) || Date.now()-startedAt < 1200) return;
    const nome=safeText(document.querySelector('#nome')?.value,80), telefone=safeText(document.querySelector('#telefone')?.value,30), tipo=safeText(document.querySelector('#evento')?.value,60), detalhes=safeText(document.querySelector('#mensagem')?.value,600);
    if (!nome || !telefone || !tipo) return;
    const mensagem=[`Olá! Gostaria de solicitar um orçamento para ${tipo}.`,`Meu nome é ${nome}.`,`Telefone: ${telefone}.`,detalhes?`Detalhes: ${detalhes}`:''].filter(Boolean).join(' ');
    const url=new URL('https://wa.me/5511943599302'); url.searchParams.set('text',mensagem); window.open(url.toString(),'_blank','noopener,noreferrer');
  });
  form.dataset.startedAt=String(Date.now());
})();