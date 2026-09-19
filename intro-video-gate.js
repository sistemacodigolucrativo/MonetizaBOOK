(() => {
  'use strict';

  const STORAGE_KEY = 'monetizabook-intro-video-completed-v1';
  const VIDEO_ID = 'eKC5tKCe478';
  const YOUTUBE_API_SRC = 'https://www.youtube.com/iframe_api';
  const isCompleted = () => {
    try { return window.localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  };
  const markCompleted = () => {
    try { window.localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* storage indisponível */ }
  };

  const styles = `
    .mb-intro-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;overflow:auto;padding:24px;background:linear-gradient(145deg,rgba(7,22,45,.97),rgba(7,43,85,.96));color:#fff}
    .mb-intro-card{width:min(100%,760px);padding:clamp(22px,5vw,44px);border:1px solid rgba(255,255,255,.18);border-radius:28px;background:rgba(255,255,255,.08);box-shadow:0 24px 90px rgba(0,0,0,.35);text-align:center}
    .mb-intro-kicker{margin:0 0 10px;color:#7ed1ff;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}
    .mb-intro-card h1{margin:0 0 12px;font-size:clamp(28px,6vw,48px);line-height:1.08;letter-spacing:-.04em}
    .mb-intro-description{max-width:620px;margin:0 auto 24px;color:#d8e7f7;font-size:clamp(15px,2.5vw,18px);line-height:1.55}
    .mb-intro-player-shell{width:min(100%,640px);margin:0 auto 22px;aspect-ratio:9/16;max-height:min(68vh,570px);border:1px solid rgba(255,255,255,.2);border-radius:18px;overflow:hidden;background:#020b18;box-shadow:0 14px 40px rgba(0,0,0,.28)}
    .mb-intro-player-shell iframe{display:block;width:100%;height:100%;border:0}
    .mb-intro-status{min-height:25px;margin:0 0 14px;color:#b9cce2;font-size:14px;line-height:1.45}
    .mb-intro-button{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:13px 24px;border:0;border-radius:14px;background:#16a36f;color:#fff;font:inherit;font-size:16px;font-weight:900;line-height:1.3;box-shadow:0 12px 28px rgba(22,163,111,.3);cursor:pointer;transition:transform .18s ease,filter .18s ease}
    .mb-intro-button:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .mb-intro-button:focus-visible{outline:3px solid #7ed1ff;outline-offset:4px}
    .mb-intro-button[hidden]{display:none}
    .mb-intro-error{max-width:560px;margin:0 auto 16px;padding:14px 16px;border-radius:12px;background:rgba(255,224,224,.12);color:#ffd5d5;font-size:14px;line-height:1.5}
    .mb-intro-error[hidden]{display:none}
    @media(max-width:600px){.mb-intro-overlay{align-items:start;padding:16px}.mb-intro-card{margin:auto;padding:24px 16px;border-radius:22px}.mb-intro-player-shell{max-height:60vh;border-radius:14px}.mb-intro-button{width:100%}}
  `;

  const installStyles = () => {
    if (document.getElementById('mb-intro-gate-styles')) return;
    const style = document.createElement('style');
    style.id = 'mb-intro-gate-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  };

  const showSite = () => {
    document.documentElement.classList.add('mb-intro-complete');
    document.querySelector('.mb-intro-overlay')?.remove();
  };

  const createOverlay = () => {
    installStyles();
    const overlay = document.createElement('div');
    overlay.className = 'mb-intro-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'mb-intro-title');
    overlay.innerHTML = `
      <section class="mb-intro-card">
        <p class="mb-intro-kicker">Bem-vindo ao MonetizaBOOK</p>
        <h1 id="mb-intro-title">Assista ao vídeo de introdução</h1>
        <p class="mb-intro-description">Conheça rapidamente a proposta do MonetizaBOOK. Ao concluir o vídeo, o acesso ao conteúdo será liberado.</p>
        <div class="mb-intro-player-shell"><div id="mb-intro-player" aria-label="Vídeo introdutório do MonetizaBOOK"></div></div>
        <p class="mb-intro-status" data-intro-status aria-live="polite">Carregando o vídeo…</p>
        <p class="mb-intro-error" data-intro-error role="alert" hidden>Não foi possível carregar o vídeo agora. A página será liberada automaticamente.</p>
        <button class="mb-intro-button" data-intro-access type="button" hidden>ACESSAR GRATUITAMENTE</button>
      </section>
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  const loadYouTubeApi = () => new Promise((resolve, reject) => {
    if (window.YT?.Player) { resolve(); return; }
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      if (window.YT?.Player) resolve();
      else reject(new Error('YouTube API indisponível'));
    };
    const existing = document.querySelector(`script[src="${YOUTUBE_API_SRC}"]`);
    if (existing) {
      const timeout = window.setTimeout(() => reject(new Error('Tempo excedido ao carregar o YouTube')), 10000);
      const check = window.setInterval(() => {
        if (window.YT?.Player) { window.clearTimeout(timeout); window.clearInterval(check); resolve(); }
      }, 100);
      return;
    }
    const script = document.createElement('script');
    script.src = YOUTUBE_API_SRC;
    script.async = true;
    script.onerror = () => reject(new Error('Falha ao carregar a API do YouTube'));
    document.head.appendChild(script);
    window.setTimeout(() => reject(new Error('Tempo excedido ao carregar o YouTube')), 10000);
  });

  const showError = (overlay, message) => {
    const status = overlay.querySelector('[data-intro-status]');
    const error = overlay.querySelector('[data-intro-error]');
    status.textContent = 'O vídeo não pôde ser carregado.';
    error.textContent = message;
    error.hidden = false;
    window.setTimeout(showSite, 1800);
  };

  const init = async () => {
    if (isCompleted()) {
      showSite();
      return;
    }

    const overlay = createOverlay();
    const status = overlay.querySelector('[data-intro-status]');
    const accessButton = overlay.querySelector('[data-intro-access]');

    accessButton.addEventListener('click', () => {
      markCompleted();
      showSite();
    });

    try {
      await loadYouTubeApi();
      new window.YT.Player('mb-intro-player', {
        videoId: VIDEO_ID,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0
        },
        events: {
          onReady: () => { status.textContent = 'Reproduza o vídeo até o final para liberar o acesso.'; },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              status.textContent = 'Vídeo concluído. Seu acesso está liberado.';
              accessButton.hidden = false;
              markCompleted();
              accessButton.focus();
            }
          },
          onError: () => showError(overlay, 'O vídeo está indisponível para incorporação no momento. Você pode continuar para o conteúdo sem ficar bloqueado.')
        }
      });
    } catch {
      showError(overlay, 'O serviço de vídeo não respondeu. Você pode continuar para o conteúdo sem ficar bloqueado.');
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
