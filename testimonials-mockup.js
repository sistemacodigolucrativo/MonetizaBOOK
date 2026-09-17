(() => {
  'use strict';

  const testimonials = [
    { initials: 'AM', name: 'Ana Martins', role: 'Criadora de conteúdo', tone: 'blue', text: 'O que mais gostei foi transformar um monte de ideias soltas em uma rotina simples de publicação. A trilha deixa claro o que estudar e o que testar primeiro.' },
    { initials: 'RS', name: 'Rafael Santos', role: 'Pequeno empreendedor', tone: 'cyan', text: 'A abordagem é pé no chão. Em vez de prometer resultado rápido, o material mostra como construir uma presença que faça sentido para o público.' },
    { initials: 'JL', name: 'Juliana Lima', role: 'Social media', tone: 'violet', text: 'A biblioteca progressiva é muito prática para consultar no dia a dia. Volto aos capítulos quando preciso revisar posicionamento, conteúdo e métricas.' },
    { initials: 'CO', name: 'Carlos Oliveira', role: 'Educador independente', tone: 'green', text: 'Finalmente encontrei uma explicação acessível sobre originalidade e consistência. O conteúdo ajuda a tomar decisões melhores sem depender de hacks.' },
    { initials: 'BS', name: 'Bianca Souza', role: 'Profissional em transição', tone: 'orange', text: 'O formato gratuito torna mais fácil começar. A organização dos volumes dá uma sensação de caminho, sem transformar o aprendizado em algo pesado.' },
    { initials: 'DM', name: 'Diego Martins', role: 'Produtor de vídeos', tone: 'navy', text: 'Gostei da transparência sobre monetização. Saber o que depende da Meta e o que depende da nossa aplicação evita expectativas irreais.' }
  ];

  const section = document.querySelector('[data-testimonials-mockup]');
  if (!section) return;

  section.innerHTML = `
    <div class="wrap">
      <div class="head testimonials-head">
        <span class="eyebrow" style="color:var(--blue)">EXPERIÊNCIAS EM DESTAQUE</span>
        <h2>Uma trilha que cabe na vida real.</h2>
        <p>Exemplos de como a comunidade pode ser percebida por diferentes perfis de criadores.</p>
        <span class="mockup-disclaimer">Mockup de desenvolvimento • depoimentos ilustrativos, ainda não são avaliações reais</span>
      </div>
      <div class="testimonials-carousel" aria-roledescription="carrossel" aria-label="Exemplos ilustrativos de depoimentos">
        <div class="testimonial-viewport">
          <div class="testimonial-track"></div>
        </div>
      </div>
      <div class="testimonial-footer">
        <button class="testimonial-control prev" type="button" aria-label="Ver depoimentos anteriores">‹</button>
        <div class="testimonial-dots" role="tablist" aria-label="Selecionar depoimento"></div>
        <span class="testimonial-counter" aria-live="polite"></span>
        <button class="testimonial-control next" type="button" aria-label="Ver próximos depoimentos">›</button>
      </div>
      <div class="testimonial-toast" role="status" aria-live="polite" aria-atomic="true" hidden>
        <span class="toast-mark" aria-hidden="true">✦</span>
        <div><strong>NOVA AVALIAÇÃO DE CONTEÚDO RECEBIDA</strong><span class="toast-context">Uma nova avaliação 5 estrelas foi recebida</span><b class="toast-reviewer">Mariana Costa <span aria-label="5 estrelas">★★★★★</span></b><small>aguardando para avaliação</small></div>
        <button type="button" class="toast-close" aria-label="Fechar notificação">×</button>
      </div>
    </div>`;

  const track = section.querySelector('.testimonial-track');
  const dots = section.querySelector('.testimonial-dots');
  const counter = section.querySelector('.testimonial-counter');
  const viewport = section.querySelector('.testimonial-viewport');
  let index = 0;
  let startX = null;

  testimonials.forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', `Depoimento ilustrativo ${i + 1} de ${testimonials.length}`);
    card.innerHTML = `
      <div class="testimonial-card-top">
        <div class="testimonial-avatar avatar-${item.tone}" aria-hidden="true">${item.initials}</div>
        <span class="testimonial-rating">Avaliado como <strong>👍</strong></span>
      </div>
      <div class="testimonial-person"><h3>${item.name}</h3><span>${item.role}</span></div>
      <p class="testimonial-copy">“${item.text}”</p>`;
    track.appendChild(card);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Mostrar depoimento ${i + 1}`);
    dot.addEventListener('click', () => { index = i; update(); });
    dots.appendChild(dot);
  });

  const visibleCount = () => window.innerWidth >= 980 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = () => Math.max(0, testimonials.length - visibleCount());

  function update() {
    index = Math.min(index, maxIndex());
    const card = track.querySelector('.testimonial-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = index * (card.getBoundingClientRect().width + gap);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    section.querySelector('.prev').disabled = index === 0;
    section.querySelector('.next').disabled = index === maxIndex();
    [...dots.children].forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
    counter.textContent = `${index + 1}–${Math.min(index + visibleCount(), testimonials.length)} de ${testimonials.length}`;
  }

  section.querySelector('.prev').addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
  section.querySelector('.next').addEventListener('click', () => { index = Math.min(maxIndex(), index + 1); update(); });
  viewport.addEventListener('pointerdown', (event) => { startX = event.clientX; viewport.setPointerCapture?.(event.pointerId); });
  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 42) index = delta < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
    startX = null;
    update();
  });
  window.addEventListener('resize', update, { passive: true });

  const toast = section.querySelector('.testimonial-toast');
  const closeToast = section.querySelector('.toast-close');
  const showToast = () => {
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  };
  const hideToast = () => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => { toast.hidden = true; }, 220);
  };
  closeToast.addEventListener('click', hideToast);
  window.setTimeout(showToast, 4200);
  update();
})();
