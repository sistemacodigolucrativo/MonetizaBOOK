(() => {
  'use strict';

  // Barreira de fluxo para o site estático. Não representa verificação real de participação.
  const EXPECTED_GROUP = 'monetizabook';
  const GROUP_LINK = 'https://t.me/monetizabook';
  const ACCESS_KEY = 'monetizabook-library-confirmed-v1';
  const path = window.location.pathname;
  const isLibraryIndex = /\/biblioteca\/(?:index\.html)?$/.test(path);
  const isVolume = /\/biblioteca\/volumes\/\d{2}\//.test(path);

  const hasAccess = () => {
    try { return sessionStorage.getItem(ACCESS_KEY) === 'true'; } catch { return false; }
  };

  const setAccess = () => {
    try { sessionStorage.setItem(ACCESS_KEY, 'true'); } catch { /* sessão indisponível */ }
  };

  const normalize = (value) => value.trim().replace(/^@/, '').toLocaleLowerCase('pt-BR');

  const styles = `
    .mb-gate-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;background:rgba(7,22,45,.62);backdrop-filter:blur(7px)}
    .mb-gate-modal{width:min(100%,460px);padding:32px;border:1px solid rgba(255,255,255,.22);border-radius:24px;background:#fff;color:#10213a;box-shadow:0 24px 80px rgba(7,22,45,.28);text-align:left}
    .mb-gate-kicker{margin:0 0 8px;color:#0d5bd7;font-size:11px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
    .mb-gate-modal h2{margin:0 0 12px;font-size:clamp(24px,5vw,32px);line-height:1.1;letter-spacing:-.03em}
    .mb-gate-modal p{margin:0 0 20px;color:#5e6b7d;line-height:1.55}
    .mb-gate-modal label{display:block;margin-bottom:8px;font-size:13px;font-weight:800;color:#10213a}
    .mb-gate-input{width:100%;height:48px;padding:0 14px;border:1px solid #dce5ef;border-radius:12px;background:#f5f8fc;color:#10213a;font:inherit;outline:none}
    .mb-gate-input:focus{border-color:#0d5bd7;box-shadow:0 0 0 4px rgba(13,91,215,.13)}
    .mb-gate-error{min-height:20px;margin:8px 0 0;color:#c52d35;font-size:13px;font-weight:700}
    .mb-gate-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
    .mb-gate-actions button,.mb-gate-actions a{min-height:46px;padding:11px 16px;border:0;border-radius:12px;font:inherit;font-size:14px;font-weight:800;text-align:center;text-decoration:none;cursor:pointer}
    .mb-gate-confirm{flex:1 1 210px;background:linear-gradient(135deg,#0d5bd7,#18a8e8);color:#fff;box-shadow:0 10px 24px rgba(13,91,215,.2)}
    .mb-gate-cancel{flex:0 0 auto;background:#eef3f8;color:#10213a}
    .mb-gate-join{display:block;margin-top:18px;color:#0d5bd7;font-size:13px;font-weight:800;text-decoration:none}
    @media(max-width:520px){.mb-gate-modal{padding:24px;border-radius:20px}.mb-gate-actions{flex-direction:column}.mb-gate-actions button,.mb-gate-actions a{width:100%}.mb-gate-confirm{flex:0 0 auto}}
  `;

  const installStyles = () => {
    if (document.getElementById('mb-gate-styles')) return;
    const style = document.createElement('style');
    style.id = 'mb-gate-styles';
    style.textContent = styles;
    document.head.appendChild(style);
  };

  const openGate = () => {
    installStyles();
    document.querySelector('.mb-gate-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'mb-gate-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="mb-gate-modal">
        <p class="mb-gate-kicker">Acesso à biblioteca</p>
        <h2>CONFIRME SUA PARTICIPAÇÃO</h2>
        <p>Para acessar a biblioteca, informe abaixo o @ do nosso grupo no Telegram.</p>
        <form class="mb-gate-form">
          <label for="mb-group-id">@ do grupo</label>
          <input class="mb-gate-input" id="mb-group-id" name="group" type="text" inputmode="text" autocomplete="off" placeholder="@nomedogrupo" />
          <p class="mb-gate-error" role="alert" aria-live="polite"></p>
          <div class="mb-gate-actions">
            <button class="mb-gate-confirm" type="submit">CONFIRMAR E ACESSAR</button>
            <button class="mb-gate-cancel" type="button">Voltar</button>
          </div>
        </form>
        <a class="mb-gate-join" href="${GROUP_LINK}" target="_blank" rel="noopener noreferrer">Ainda não participa? Participar do grupo</a>
      </div>
    `;
    document.body.appendChild(overlay);

    const form = overlay.querySelector('.mb-gate-form');
    const input = overlay.querySelector('.mb-gate-input');
    const error = overlay.querySelector('.mb-gate-error');
    input.focus();

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (normalize(input.value) === EXPECTED_GROUP) {
        setAccess();
        overlay.remove();
        if (isLibraryIndex) {
          window.location.hash = '';
          window.history.replaceState({}, '', window.location.pathname);
        } else {
          window.location.href = 'biblioteca/index.html';
        }
      } else {
        error.textContent = 'Identificador incorreto. Confira o @ informado e tente novamente.';
        input.focus();
      }
    });

    overlay.querySelector('.mb-gate-cancel').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (event) => { if (event.target === overlay) overlay.remove(); });
  };

  const guardLinks = () => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const targetsLibrary = isLibraryIndex
        ? /(^|\/)volumes\/\d{2}\//.test(href)
        : /biblioteca\/index\.html/.test(href);
      if (!targetsLibrary) return;
      link.addEventListener('click', (event) => {
        if (!hasAccess()) { event.preventDefault(); openGate(); }
      });
    });
  };

  const enforceVolumeAccess = () => {
    if (!isVolume || hasAccess()) return;
    const base = path.split('/biblioteca/')[0] || '';
    window.location.replace(`${base}/biblioteca/index.html?access=required`);
  };

  const init = () => {
    enforceVolumeAccess();
    guardLinks();
    if (isLibraryIndex && !hasAccess()) {
      openGate();
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
