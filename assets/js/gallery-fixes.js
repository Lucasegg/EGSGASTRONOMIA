(() => {
  'use strict';

  const backgroundCss = document.createElement('link');
  backgroundCss.rel = 'stylesheet';
  backgroundCss.href = 'assets/css/gastronomic-background.css?v=20260730-2';
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

  const previewItems = [
    {src:'assets/img/galeria/pizza-no-forno.jpg', title:'Pizza assada no forno', index:0},
    {src:'assets/img/pizzas/pizza-calabresa-artesanal.jpg', title:'Pizza artesanal de calabresa', index:8},
    {src:'assets/img/pizzas/pizza-tomates-confitados.jpg', title:'Pizza com tomates confitados e manjericão', index:9}
  ];

  const cards = [...pizzaGallery.querySelectorAll('.pizza-photo')].slice(0, 3);
  pizzaGallery.querySelectorAll('.pizza-photo:nth-child(n+4)').forEach((card) => card.remove());

  cards.forEach((card, position) => {
    const item = previewItems[position];
    if (!item) return;
    card.dataset.index = String(item.index);
    card.setAttribute('aria-label', `Abrir ${item.title}`);
    const image = card.querySelector('img');
    const caption = card.querySelector('figcaption');
    if (image) {
      image.src = item.src;
      image.alt = item.title;
    }
    if (caption) caption.textContent = item.title;
    card.querySelector('.pizza-badge')?.remove();
    if (position === 0) card.insertAdjacentHTML('afterbegin', '<span class="pizza-badge">Feita na hora</span>');
  });

  let moreArea = pizzaGallery.parentElement?.querySelector('.pizza-more-area');
  if (!moreArea) {
    moreArea = document.createElement('div');
    moreArea.className = 'pizza-more-area';
    moreArea.innerHTML = '<button class="btn pizza-view-more" type="button">VEJA MAIS</button>';
    pizzaGallery.insertAdjacentElement('afterend', moreArea);
  }

  moreArea.querySelector('.pizza-view-more')?.addEventListener('click', () => {
    pizzaGallery.querySelector('.pizza-photo')?.click();
  });
})();