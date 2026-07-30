(() => {
  'use strict';

  const backgroundCss = document.createElement('link');
  backgroundCss.rel = 'stylesheet';
  backgroundCss.href = 'assets/css/gastronomic-background.css?v=20260730-1';
  document.head.appendChild(backgroundCss);

  const removeDuplicatePortfolioImages = () => {
    document.querySelectorAll('#portfolio-grid .portfolio-card, #portfolio-mosaic .mosaic-item').forEach((card) => {
      const img = card.querySelector('img');
      if (img?.src.includes('mousse-de-limao-conjunto.jpg')) card.remove();
    });
  };

  const portfolioGrid = document.querySelector('#portfolio-grid');
  const portfolioMosaic = document.querySelector('#portfolio-mosaic');
  removeDuplicatePortfolioImages();
  [portfolioGrid, portfolioMosaic].filter(Boolean).forEach((node) => {
    new MutationObserver(removeDuplicatePortfolioImages).observe(node, {childList: true, subtree: true});
  });

  const escapeText = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  const setupRotatingMosaic = () => {
    if (!portfolioMosaic || portfolioMosaic.dataset.rotationReady === 'true') return;
    portfolioMosaic.dataset.rotationReady = 'true';

    const getGalleryPool = () => {
      const unique = new Map();
      document.querySelectorAll('#portfolio-grid .portfolio-card').forEach((card) => {
        if (card.hidden) return;
        const img = card.querySelector('img');
        const title = card.querySelector('figcaption strong')?.textContent?.trim() || img?.alt?.trim();
        if (img?.getAttribute('src') && title && !img.src.includes('mousse-de-limao-conjunto.jpg')) {
          unique.set(img.getAttribute('src'), {src:img.getAttribute('src'), title});
        }
      });
      return [...unique.values()];
    };

    const shuffle = (items) => {
      const copy = [...items];
      for (let index = copy.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
      }
      return copy;
    };

    const renderRandomMosaic = () => {
      const pool = getGalleryPool();
      if (pool.length < 5) return;
      const currentSources = new Set([...portfolioMosaic.querySelectorAll('img')].map((img) => img.getAttribute('src')));
      let selection = shuffle(pool).slice(0, 5);
      if (selection.every((item) => currentSources.has(item.src))) selection = shuffle(pool).slice(0, 5);

      portfolioMosaic.classList.add('is-refreshing');
      window.setTimeout(() => {
        portfolioMosaic.innerHTML = selection.map((item) => `<figure class="mosaic-item"><img src="${item.src}" alt="${escapeText(item.title)}" loading="lazy"><span>${escapeText(item.title)}</span></figure>`).join('');
        portfolioMosaic.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.closest('.mosaic-item')?.remove()));
        requestAnimationFrame(() => portfolioMosaic.classList.remove('is-refreshing'));
      }, 520);
    };

    window.setTimeout(renderRandomMosaic, 10000);
    window.setInterval(renderRandomMosaic, 10000);
  };

  setupRotatingMosaic();
  if (portfolioGrid) {
    new MutationObserver(setupRotatingMosaic).observe(portfolioGrid, {childList:true, subtree:true});
  }

  const pizzaGallery = document.querySelector('.pizza-gallery');
  if (!pizzaGallery) return;

  const fullPizzaPortfolio = [
    {src:'assets/img/galeria/pizza-no-forno.jpg', title:'Pizza assada no forno'},
    {src:'assets/img/galeria/pizza-vegetariana.jpg', title:'Pizza vegetariana artesanal'},
    {src:'assets/img/galeria/pizza-frango.jpg', title:'Pizza de frango com queijo'},
    {src:'assets/img/pizzas/pizza-quatro-queijos.jpg', title:'Pizza de quatro queijos'},
    {src:'assets/img/pizzas/pizza-tomate-e-queijo.jpg', title:'Pizza de tomate e queijo'},
    {src:'assets/img/pizzas/pizza-margherita-ao-vivo.jpg', title:'Pizza Margherita finalizada ao vivo'},
    {src:'assets/img/pizzas/pizza-parma-com-pesto.jpg', title:'Pizza de Parma com pesto'},
    {src:'assets/img/pizzas/pizza-couve-flor-e-bacon.jpg', title:'Pizza de couve-flor e bacon'},
    {src:'assets/img/pizzas/pizza-calabresa-artesanal.jpg', title:'Pizza artesanal de calabresa'},
    {src:'assets/img/pizzas/pizza-tomates-confitados.jpg', title:'Pizza com tomates confitados e manjericão'}
  ];

  const previewPizzaPortfolio = [
    fullPizzaPortfolio[0],
    fullPizzaPortfolio[8],
    fullPizzaPortfolio[9]
  ];

  const lightbox = document.querySelector('#gallery-lightbox');
  let pizzaLightboxActive = false;
  let pizzaLightboxIndex = 0;

  const showPizzaLightboxItem = () => {
    if (!lightbox || !fullPizzaPortfolio.length) return;
    const item = fullPizzaPortfolio[pizzaLightboxIndex];
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    if (image) {
      image.src = item.src;
      image.alt = item.title;
    }
    if (caption) caption.textContent = `${item.title} — Eventos de Pizzas`;
  };

  const openPizzaLightbox = (item, requestedIndex) => {
    if (!item || !lightbox) return;
    const resolvedIndex = Number.isInteger(requestedIndex)
      ? requestedIndex
      : fullPizzaPortfolio.findIndex((pizza) => pizza.src === item.src);
    pizzaLightboxIndex = resolvedIndex >= 0 ? resolvedIndex : 0;
    pizzaLightboxActive = true;
    showPizzaLightboxItem();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close')?.focus();
  };

  const movePizzaLightbox = (direction) => {
    pizzaLightboxIndex = (pizzaLightboxIndex + direction + fullPizzaPortfolio.length) % fullPizzaPortfolio.length;
    showPizzaLightboxItem();
  };

  const setupPizzaOnlyNavigation = () => {
    if (!lightbox || lightbox.dataset.pizzaNavigationReady === 'true') return;
    lightbox.dataset.pizzaNavigationReady = 'true';

    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', (event) => {
      if (!pizzaLightboxActive) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      movePizzaLightbox(-1);
    }, true);

    lightbox.querySelector('.lightbox-next')?.addEventListener('click', (event) => {
      if (!pizzaLightboxActive) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      movePizzaLightbox(1);
    }, true);

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', () => {
      pizzaLightboxActive = false;
    }, true);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) pizzaLightboxActive = false;
    }, true);

    document.addEventListener('keydown', (event) => {
      if (!pizzaLightboxActive || !lightbox.classList.contains('open')) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
        movePizzaLightbox(event.key === 'ArrowLeft' ? -1 : 1);
      } else if (event.key === 'Escape') {
        pizzaLightboxActive = false;
      }
    }, true);
  };

  const setupPizzaPortfolio = () => {
    if (pizzaGallery.dataset.compactReady === 'true') return;
    pizzaGallery.dataset.compactReady = 'true';
    setupPizzaOnlyNavigation();

    pizzaGallery.innerHTML = previewPizzaPortfolio.map((item, index) => `
      <figure class="pizza-photo" tabindex="0" role="button" data-pizza-index="${fullPizzaPortfolio.indexOf(item)}" aria-label="Abrir ${escapeText(item.title)}">
        ${index === 0 ? '<span class="pizza-badge">Feita na hora</span>' : ''}
        <img src="${item.src}" alt="${escapeText(item.title)}" loading="lazy">
        <figcaption>${escapeText(item.title)}</figcaption>
      </figure>`).join('');

    pizzaGallery.querySelectorAll('.pizza-photo').forEach((card) => {
      const open = () => {
        const index = Number(card.dataset.pizzaIndex || 0);
        openPizzaLightbox(fullPizzaPortfolio[index], index);
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      });
    });

    document.querySelector('.pizza-more-actions')?.remove();
    document.querySelector('.pizza-portfolio-modal')?.remove();

    const actions = document.createElement('div');
    actions.className = 'pizza-more-actions';
    actions.innerHTML = '<button class="pizza-see-more" type="button">VEJA MAIS</button>';
    pizzaGallery.insertAdjacentElement('afterend', actions);

    const modal = document.createElement('div');
    modal.className = 'pizza-portfolio-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Portfólio completo de pizzas');
    modal.innerHTML = `
      <div class="pizza-portfolio-dialog">
        <div class="pizza-portfolio-heading">
          <div><span>Eventos de Pizzas</span><h2>Portfólio de pizzas</h2></div>
          <button class="pizza-portfolio-close" type="button" aria-label="Fechar portfólio de pizzas">×</button>
        </div>
        <div class="pizza-portfolio-grid"></div>
      </div>`;
    document.body.appendChild(modal);

    const grid = modal.querySelector('.pizza-portfolio-grid');
    grid.innerHTML = fullPizzaPortfolio.map((item, index) => `
      <button class="pizza-portfolio-card" type="button" data-pizza-index="${index}" aria-label="Abrir ${escapeText(item.title)}">
        <img src="${item.src}" alt="${escapeText(item.title)}" loading="lazy">
        <span>${escapeText(item.title)}</span>
      </button>`).join('');

    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };
    const open = () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.pizza-portfolio-close')?.focus();
    };

    actions.querySelector('.pizza-see-more')?.addEventListener('click', open);
    modal.querySelector('.pizza-portfolio-close')?.addEventListener('click', close);
    modal.addEventListener('click', (event) => { if (event.target === modal) close(); });

    modal.querySelectorAll('.pizza-portfolio-card').forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.pizzaIndex || 0);
        close();
        openPizzaLightbox(fullPizzaPortfolio[index], index);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) close();
    });
  };

  setupPizzaPortfolio();
})();