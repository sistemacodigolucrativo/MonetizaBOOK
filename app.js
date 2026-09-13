import * as pdfjsLib from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/legacy/build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@6.3.289/legacy/build/pdf.worker.mjs';

const EXPECTED_PAGES = 27;
const DEFAULT_PDF_URL = 'assets/MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf';

const reader = document.getElementById('reader');
const canvas = document.getElementById('pageCanvas');
const context = canvas.getContext('2d', { alpha: false });
const shell = document.getElementById('pageShell');
const viewport = document.getElementById('pageViewport');
const linkLayer = document.getElementById('linkLayer');
const loading = document.getElementById('loading');
const loadError = document.getElementById('loadError');
const loadErrorTitle = document.getElementById('loadErrorTitle');
const loadErrorMessage = document.getElementById('loadErrorMessage');
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

const configuredPdfUrl = reader?.dataset.pdfSrc?.trim() || DEFAULT_PDF_URL;
const pdfFileName = reader?.dataset.pdfFilename?.trim() || configuredPdfUrl.split('/').pop() || 'MonetizaBOOK.pdf';

let pdfDocument = null;
let totalPages = EXPECTED_PAGES;
let tocEntries = [];
let currentPage = readPageFromHash();
let zoom = 1;
let renderGeneration = 0;
let renderTask = null;
let resizeTimer = null;
const destinationCache = new Map();

totalEl.textContent = String(totalPages);
pageInput.max = String(totalPages);
setControlState(false);
preparePdfLinks(configuredPdfUrl, pdfFileName);

function setControlState(enabled) {
  [prevButton, nextButton, pageButton, zoomIn, zoomOut, zoomReset, tocButton].forEach((control) => {
    control.disabled = !enabled;
  });
}

function preparePdfLinks(url, filename) {
  document.querySelectorAll('[data-pdf-download]').forEach((anchor) => {
    anchor.href = url;
    anchor.download = filename;
    anchor.removeAttribute('aria-disabled');
  });

  document.querySelectorAll('[data-pdf-open]').forEach((anchor) => {
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.removeAttribute('aria-disabled');
  });
}

function showLoadError(title, message) {
  loading.hidden = true;
  loadError.hidden = false;
  if (loadErrorTitle) loadErrorTitle.textContent = title;
  if (loadErrorMessage) loadErrorMessage.textContent = message;
}

function clampPage(value) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(totalPages, n));
}

function readPageFromHash() {
  const match = location.hash.match(/page=(\d+)/i);
  const n = Number.parseInt(match?.[1] || '1', 10);
  return Math.max(1, Math.min(EXPECTED_PAGES, Number.isFinite(n) ? n : 1));
}

function targetCssWidth() {
  const sidePadding = window.innerWidth < 800 ? 24 : 64;
  return Math.min(840, Math.max(280, window.innerWidth - sidePadding)) * zoom;
}

async function resolveDestination(dest) {
  if (!dest || !pdfDocument) return null;
  const key = typeof dest === 'string' ? `name:${dest}` : JSON.stringify(dest);
  if (destinationCache.has(key)) return destinationCache.get(key);

  try {
    const explicit = typeof dest === 'string' ? await pdfDocument.getDestination(dest) : dest;
    if (!Array.isArray(explicit) || explicit.length === 0) return null;
    const target = explicit[0];
    let page = null;

    if (Number.isInteger(target)) {
      page = target + 1;
    } else if (target && typeof target === 'object') {
      page = (await pdfDocument.getPageIndex(target)) + 1;
    }

    if (page && page >= 1 && page <= totalPages) {
      destinationCache.set(key, page);
      return page;
    }
  } catch (error) {
    console.warn('Destino PDF não pôde ser resolvido:', error);
  }

  destinationCache.set(key, null);
  return null;
}

async function renderLinks(pdfPage, baseViewport, generation) {
  try {
    const annotations = await pdfPage.getAnnotations({ intent: 'display' });
    if (generation !== renderGeneration) return;
    const fragment = document.createDocumentFragment();

    for (const annotation of annotations) {
      if (annotation.subtype !== 'Link' || !Array.isArray(annotation.rect)) continue;
      const externalUrl = annotation.url || annotation.unsafeUrl || null;
      const internalPage = externalUrl ? null : await resolveDestination(annotation.dest);
      if (!externalUrl && !internalPage) continue;
      if (generation !== renderGeneration) return;

      const rect = baseViewport.convertToViewportRectangle(annotation.rect);
      const left = Math.min(rect[0], rect[2]) / baseViewport.width;
      const top = Math.min(rect[1], rect[3]) / baseViewport.height;
      const width = Math.abs(rect[2] - rect[0]) / baseViewport.width;
      const height = Math.abs(rect[3] - rect[1]) / baseViewport.height;

      const anchor = document.createElement('a');
      anchor.className = 'pdf-link';
      anchor.style.left = `${left * 100}%`;
      anchor.style.top = `${top * 100}%`;
      anchor.style.width = `${width * 100}%`;
      anchor.style.height = `${height * 100}%`;

      if (internalPage) {
        anchor.href = `#page=${internalPage}`;
        anchor.setAttribute('aria-label', `Ir para a página ${internalPage}`);
        anchor.addEventListener('click', (event) => {
          event.preventDefault();
          goToPage(internalPage, true);
        });
      } else {
        anchor.href = externalUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.setAttribute('aria-label', 'Abrir fonte externa');
      }

      fragment.appendChild(anchor);
    }

    linkLayer.replaceChildren(fragment);
  } catch (error) {
    if (generation !== renderGeneration) return;
    console.warn('Camada de links do PDF não pôde ser renderizada; mantendo a página visível:', error);
    linkLayer.replaceChildren();
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

    loading.hidden = true;
    renderTask = null;

    // A camada de links é um aprimoramento. Uma anotação problemática nunca deve
    // invalidar a página já renderizada do PDF integral.
    await renderLinks(pdfPage, baseViewport, generation);
  } catch (error) {
    if (error?.name === 'RenderingCancelledException') return;
    console.error('Falha ao renderizar o PDF:', error);
    if (generation === renderGeneration) {
      showLoadError('Falha ao renderizar o PDF.', 'O PDF integral foi carregado, mas esta página não pôde ser desenhada pelo leitor. Use “Abrir o PDF diretamente” como alternativa.');
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

async function buildOutlineEntries() {
  const outline = await pdfDocument.getOutline();
  const entries = [];

  async function walk(items, level) {
    for (const item of items || []) {
      const page = await resolveDestination(item.dest);
      if (page) entries.push({ level, title: item.title || `Página ${page}`, page });
      if (item.items?.length) await walk(item.items, level + 1);
    }
  }

  await walk(outline || [], 1);
  return entries;
}

function renderToc(query = '') {
  const normalized = query.trim().toLocaleLowerCase('pt-BR');
  const fragment = document.createDocumentFragment();

  for (const item of tocEntries) {
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
tocSearch.addEventListener('input', () => renderToc(tocSearch.value));

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
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => void renderPage(currentPage), 120);
}, { passive: true });
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') goToPage(currentPage - 1, true);
  if (event.key === 'ArrowRight') goToPage(currentPage + 1, true);
  if (event.key === 'Escape') closeToc();
});

async function loadIntegralPdf(url) {
  // O arquivo é pequeno (~130 KB). Baixá-lo inteiro antes de iniciar o PDF.js
  // evita requisições Range/streaming que podem falhar em WebViews móveis.
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Falha HTTP ${response.status} ao carregar ${url}.`);
  }

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength < 1024) {
    throw new Error(`PDF recebido é pequeno demais (${buffer.byteLength} bytes).`);
  }

  const bytes = new Uint8Array(buffer);
  const signature = String.fromCharCode(...bytes.subarray(0, 5));
  if (signature !== '%PDF-') {
    throw new Error('O arquivo recebido não possui assinatura PDF válida.');
  }

  return bytes;
}

async function start() {
  currentEl.textContent = String(currentPage);

  try {
    const pdfBytes = await loadIntegralPdf(configuredPdfUrl);
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    pdfDocument = await loadingTask.promise;
    totalPages = pdfDocument.numPages;
    totalEl.textContent = String(totalPages);
    pageInput.max = String(totalPages);

    if (totalPages !== EXPECTED_PAGES) {
      throw new Error(`PDF com ${totalPages} páginas; esperado: ${EXPECTED_PAGES}.`);
    }

    currentPage = clampPage(currentPage);

    // Sumário e destinos são recursos auxiliares; falhas neles não impedem a leitura.
    try {
      tocEntries = await buildOutlineEntries();
      renderToc();
    } catch (error) {
      console.warn('Sumário interno do PDF não pôde ser carregado:', error);
      tocEntries = [];
      renderToc();
    }

    setControlState(true);
    goToPage(currentPage, false);
  } catch (error) {
    console.error('Falha ao carregar o e-book:', error);
    showLoadError(
      'Não foi possível carregar o PDF integral.',
      `O leitor tentou baixar o arquivo completo em ${configuredPdfUrl}, mas o carregamento falhou. Use “Abrir o PDF diretamente” ou tente novamente.`
    );
  }
}

void start();
