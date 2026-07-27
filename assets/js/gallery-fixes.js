(() => {
  'use strict';

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

  const pizzaGallery = document.querySelector('.pizza-gallery');
  if (!pizzaGallery) return;

  const setupPizzaPortfolio = () => {
    const cards = [...pizzaGallery.querySelectorAll('.pizza-photo')];
    if (!cards.length || pizzaGallery.dataset.compactReady === 'true') return;
    pizzaGallery.dataset.compactReady = 'true';

    cards.forEach((card, index) => {
      card.classList.toggle('pizza-preview-hidden', index >= 3);
    });

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
    grid.innerHTML = cards.map((card, index) => {
      const img = card.querySelector('img');
      const caption = card.querySelector('figcaption')?.textContent || img?.alt || 'Pizza artesanal';
      return `<button class="pizza-portfolio-card" type="button" data-pizza-index="${index}" aria-label="Abrir ${caption}"><img src="${img?.getAttribute('src') || ''}" alt="${img?.alt || caption}" loading="lazy"><span>${caption}</span></button>`;
    }).join('');

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
        cards[index]?.click();
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('open')) close();
    });
  };

  setupPizzaPortfolio();
  new MutationObserver(setupPizzaPortfolio).observe(pizzaGallery, {childList: true});
})();
