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