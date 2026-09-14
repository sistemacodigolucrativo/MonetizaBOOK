(() => {
  'use strict';
  const DONE_KEY = 'monetizabook-course-completed-v1';
  const STARTED_KEY = 'monetizabook-course-started-v1';
  const volume = Number(document.body.dataset.courseVolume);
  const total = Number(document.body.dataset.courseTotal || 10);
  if (!Number.isInteger(volume) || volume < 1 || volume > total) return;
  const read = key => {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(raw) ? raw.map(Number).filter(n => Number.isInteger(n) && n >= 1 && n <= total) : [];
    } catch { return []; }
  };
  const write = (key, values) => {
    try { localStorage.setItem(key, JSON.stringify([...new Set(values)].sort((a,b)=>a-b))); } catch {}
  };
  const rememberStarted = n => {
    const started = read(STARTED_KEY);
    if (!started.includes(n)) { started.push(n); write(STARTED_KEY, started); }
  };
  const isDone = () => read(DONE_KEY).includes(volume);
  const render = () => {
    const done = isDone();
    document.querySelectorAll('[data-course-complete]').forEach(button => {
      button.textContent = done ? '✓ Volume concluído' : (button.closest('.course-finish') ? 'Marcar este volume como concluído' : 'Marcar concluído');
      button.classList.toggle('is-complete', done);
      button.setAttribute('aria-pressed', String(done));
    });
  };
  document.querySelectorAll('[data-course-complete]').forEach(button => {
    button.addEventListener('click', () => {
      let done = read(DONE_KEY);
      done = done.includes(volume) ? done.filter(n => n !== volume) : [...done, volume];
      write(DONE_KEY, done);
      render();
    });
  });
  const next = document.querySelector('[data-course-next]');
  if (next && volume < total) {
    next.addEventListener('click', () => {
      let done = read(DONE_KEY);
      if (!done.includes(volume)) { done.push(volume); write(DONE_KEY, done); }
      rememberStarted(volume + 1);
    });
  }
  rememberStarted(volume);
  render();
})();
