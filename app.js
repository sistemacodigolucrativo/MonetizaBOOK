import * as pdfjsLib from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/legacy/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/legacy/build/pdf.worker.mjs';

const data = window.MONETIZABOOK_DATA;
const sourceBytes = window.MONETIZABOOK_PDF_BYTES;

if (!data) throw new Error('Dados de navegação do MonetizaBOOK não foram carregados.');
if (!sourceBytes) throw new Error('Dados do PDF MonetizaBOOK não foram carregados.');

const canvas = document.getElementById('pageCanvas');
const context = canvas.getContext('2d', { alpha: false });
const shell = document.getElementById('pageShell');
const viewport = document.getElementById('pageViewport');
const linkLayer = document.getElementById('linkLayer');
const loading = document.getElementById('loading');
const loadError = document.getElementById('loadError');
const currentEl = document.getElementById('pageCurrent');
const totalEl = document.getElementById('pageTotal');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageButton = document.getElementById('pageButton');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const zoomReset = document.getElementById('zoomReset');
const tocButton = document.getElementById('tocButton');
const tocClose = document.getElementById('tocClose');
const tocPanel = document.getElementById('tocPanel');
const scrim = document.getElementById('scrim');
const tocList = document.getElementById('tocList');
const tocSearch = document.getElementById('tocSearch');
const pageDialog = document.getElementById('pageDialog');
const pageForm = document.getElementById('pageForm');
const pageInput = document.getElementById('pageInput');

let pdfDocument = null;
let currentPage = readPageFromHash();
let zoom = 1;
let renderGeneration = 0;
let renderTask = null;
const totalPages = data.pages;

totalEl.textContent = String(totalPages);
pageInput.max = String(totalPages);

function clampPage(value) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(totalPages, n));
}

function readPageFromHash() {
  const match = location.hash.match(/page=(\d+)/i);
  return clampPage(match ? match[1] : 1);
}

function targetCssWidth() {
  const sidePadding = window.innerWidth < 800 ? 24 : 64;
  return Math.min(840, Math.max(280, window.innerWidth - sidePadding)) * zoom;
}

function renderLinks(page) {
  linkLayer.replaceChildren();
  const links = data.meta[String(page)]?.links || [];

  for (const link of links) {
    const anchor = document.createElement('a');
    anchor.className = 'pdf-link';
    anchor.style.left = `${link.x * 100}%`;
    anchor.style.top = `${link.y * 100}%`;
    anchor.style.width = `${link.w * 100}%`;
    anchor.style.height = `${link.h * 100}%`;

    if (link.page) {
      anchor.href = `#page=${link.page}`;
      anchor.setAttribute('aria-label', `Ir para a página ${link.page}`);
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage(link.page, true);
      });
    } else if (link.uri) {
      anchor.href = link.uri;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.setAttribute('aria-label', 'Abrir fonte externa');
    }

    linkLayer.appendChild(anchor);
  }
}

async function renderPage(page) {
  if (!pdfDocument) return;
  const generation = ++renderGeneration;
  loading.hidden = false;
  loadError.hidden = true;

  if (renderTask) {
    try { renderTask.cancel(); } catch { /* sem ação */ }
    renderTask = null;
  }

  try {
    const pdfPage = await pdfDocument.getPage(page);
    if (generation !== renderGeneration) return;

    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const cssWidth = targetCssWidth();
    const cssScale = cssWidth / baseViewport.width;
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const renderViewport = pdfPage.getViewport({ scale: cssScale * outputScale });
    const cssHeight = baseViewport.height * cssScale;

    shell.style.width = `${Math.round(cssWidth)}px`;
    shell.style.height = `${Math.round(cssHeight)}px`;
    canvas.style.width = `${Math.round(cssWidth)}px`;
    canvas.style.height = `${Math.round(cssHeight)}px`;
    canvas.width = Math.max(1, Math.floor(renderViewport.width));
    canvas.height = Math.max(1, Math.floor(renderViewport.height));
    zoomReset.textContent = `${Math.round(zoom * 100)}%`;

    renderTask = pdfPage.render({ canvasContext: context, viewport: renderViewport });
    await renderTask.promise;
    if (generation !== renderGeneration) return;

    renderLinks(page);
    loading.hidden = true;
    renderTask = null;
  } catch (error) {
    if (error?.name === 'RenderingCancelledException') return;
    console.error('Falha ao renderizar o PDF:', error);
    if (generation === renderGeneration) {
      loading.hidden = true;
      loadError.hidden = false;
    }
  }
}

function goToPage(page, pushHistory = false) {
  const target = clampPage(page);
  currentPage = target;
  currentEl.textContent = String(target);
  prevButton.disabled = target === 1;
  nextButton.disabled = target === totalPages;
  document.title = `MonetizaBOOK - Página ${target} de ${totalPages}`;
  canvas.setAttribute('aria-label', `Página ${target} de ${totalPages} do e-book MonetizaBOOK - Dúvidas Frequentes`);

  const hash = `#page=${target}`;
  if (pushHistory) history.pushState({ page: target }, '', hash);
  else history.replaceState({ page: target }, '', hash);

  viewport.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  void renderPage(target);
}

function setZoom(next) {
  zoom = Math.max(0.75, Math.min(1.75, Math.round(next * 100) / 100));
  void renderPage(currentPage);
}

function buildToc(query = '') {
  const normalized = query.trim().toLocaleLowerCase('pt-BR');
  const fragment = document.createDocumentFragment();

  for (const item of data.toc) {
    if (normalized && !item.title.toLocaleLowerCase('pt-BR').includes(normalized)) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `toc-item level-${Math.min(item.level, 2)}`;
    button.dataset.page = String(item.page);

    const title = document.createElement('span');
    title.textContent = item.title;
    const page = document.createElement('span');
    page.className = 'toc-page';
    page.textContent = item.page;
    button.append(title, page);
    button.addEventListener('click', () => {
      closeToc();
      goToPage(item.page, true);
    });
    fragment.appendChild(button);
  }

  tocList.replaceChildren(fragment);
}

function openToc() {
  tocPanel.classList.add('open');
  tocPanel.setAttribute('aria-hidden', 'false');
  scrim.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeToc() {
  tocPanel.classList.remove('open');
  tocPanel.setAttribute('aria-hidden', 'true');
  scrim.hidden = true;
  document.body.style.overflow = '';
}

prevButton.addEventListener('click', () => goToPage(currentPage - 1, true));
nextButton.addEventListener('click', () => goToPage(currentPage + 1, true));
zoomIn.addEventListener('click', () => setZoom(zoom + 0.15));
zoomOut.addEventListener('click', () => setZoom(zoom - 0.15));
zoomReset.addEventListener('click', () => setZoom(1));
tocButton.addEventListener('click', openToc);
tocClose.addEventListener('click', closeToc);
scrim.addEventListener('click', closeToc);
tocSearch.addEventListener('input', () => buildToc(tocSearch.value));

document.querySelectorAll('.toc-shortcuts [data-page]').forEach((button) => {
  button.addEventListener('click', () => {
    closeToc();
    goToPage(button.dataset.page, true);
  });
});

pageButton.addEventListener('click', () => {
  pageInput.value = String(currentPage);
  if (typeof pageDialog.showModal === 'function') {
    pageDialog.showModal();
    setTimeout(() => pageInput.select(), 0);
  } else {
    const answer = window.prompt(`Ir para a página (1-${totalPages})`, String(currentPage));
    if (answer) goToPage(answer, true);
  }
});

pageForm.addEventListener('submit', (event) => {
  if (event.submitter?.value === 'confirm') goToPage(pageInput.value, true);
});

window.addEventListener('popstate', () => goToPage(readPageFromHash(), false));
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => void renderPage(currentPage), 120);
}, { passive: true });
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') goToPage(currentPage - 1, true);
  if (event.key === 'ArrowRight') goToPage(currentPage + 1, true);
  if (event.key === 'Escape') closeToc();
});

async function start() {
  buildToc();
  currentEl.textContent = String(currentPage);
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  try {
    const workerBytes = sourceBytes.slice();
    const loadingTask = pdfjsLib.getDocument({ data: workerBytes });
    pdfDocument = await loadingTask.promise;
    if (pdfDocument.numPages !== totalPages) {
      throw new Error(`PDF com ${pdfDocument.numPages} páginas; esperado: ${totalPages}.`);
    }
    goToPage(currentPage, false);
  } catch (error) {
    console.error('Falha ao carregar o e-book:', error);
    loading.hidden = true;
    loadError.hidden = false;
  }
}

void start();
