(() => {
  'use strict';

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