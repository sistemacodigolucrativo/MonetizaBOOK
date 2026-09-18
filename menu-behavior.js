(() => {
  'use strict';
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-menu-btn');
  if (!nav || !toggle) return;
  const close = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.removeAttribute('onclick');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) close();
  });
  document.addEventListener('touchstart', (event) => {
    if (!nav.contains(event.target)) close();
  }, { passive: true });
  nav.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', close));
  window.addEventListener('resize', () => { if (window.innerWidth > 850) close(); }, { passive: true });
})();
