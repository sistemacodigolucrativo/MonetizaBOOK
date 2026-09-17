(() => {
  'use strict';

  const protectedSelectors = 'body, .book, .library-grid, .next-card, .progress-card, .toolbar';
  const editableSelector = 'input, textarea, select, [contenteditable="true"]';
  const controlSelector = `${editableSelector}, button, a, summary, label`;

  const isEditable = (target) => target instanceof Element && !!target.closest(editableSelector);
  const isControl = (target) => target instanceof Element && !!target.closest(controlSelector);
  const isProtectedContent = (target) => target instanceof Element && !!target.closest(protectedSelectors);

  const style = document.createElement('style');
  style.id = 'mb-copy-protection-styles';
  style.textContent = `
    .mb-copy-protected,
    .mb-copy-protected *,
    .mb-copy-protected .book,
    .mb-copy-protected .book *,
    .mb-copy-protected .library-grid,
    .mb-copy-protected .library-grid *,
    .mb-copy-protected .next-card,
    .mb-copy-protected .next-card *,
    .mb-copy-protected .progress-card,
    .mb-copy-protected .progress-card *,
    .mb-copy-protected .toolbar,
    .mb-copy-protected .toolbar * {
      -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }
    .mb-copy-protected input,
    .mb-copy-protected textarea,
    .mb-copy-protected select,
    .mb-copy-protected [contenteditable="true"],
    .mb-copy-protected .book input,
    .mb-copy-protected .book textarea,
    .mb-copy-protected .book select,
    .mb-copy-protected .book [contenteditable="true"],
    .mb-copy-protected .library-grid input,
    .mb-copy-protected .library-grid textarea,
    .mb-copy-protected .toolbar input,
    .mb-copy-protected .toolbar textarea,
    .mb-copy-protected .next-card input,
    .mb-copy-protected .next-card textarea,
    .mb-copy-protected .progress-card input,
    .mb-copy-protected .progress-card textarea {
      -webkit-user-select: text;
      user-select: text;
      -webkit-touch-callout: default;
    }
    @media print {
      .mb-copy-protected .book,
      .mb-copy-protected .library-grid,
      .mb-copy-protected .next-card,
      .mb-copy-protected .progress-card { visibility: hidden; }
    }
  `;
  document.head.appendChild(style);
  document.body.classList.add('mb-copy-protected');

  document.addEventListener('contextmenu', (event) => {
    if (isProtectedContent(event.target) && !isControl(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('selectstart', (event) => {
    if (isProtectedContent(event.target) && !isEditable(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('copy', (event) => {
    if (isProtectedContent(event.target) && !isEditable(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('cut', (event) => {
    if (isProtectedContent(event.target) && !isEditable(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('dragstart', (event) => {
    if (isProtectedContent(event.target) && !isControl(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('drop', (event) => {
    if (isProtectedContent(event.target) && !isEditable(event.target)) event.preventDefault();
  }, true);

  document.addEventListener('keydown', (event) => {
    const modifier = event.ctrlKey || event.metaKey;
    const protectedPage = !!document.querySelector(protectedSelectors);
    if (!protectedPage || isEditable(event.target)) return;

    const key = event.key.toLowerCase();
    const isCopyCutSelect = modifier && ['c', 'x', 'a'].includes(key);
    const isDevtoolsShortcut = key === 'f12' || (event.shiftKey && ['i', 'j', 'c'].includes(key));
    const isViewSource = modifier && key === 'u';
    const isSelectionArea = isProtectedContent(event.target) || event.target === document.body || event.target === document.documentElement;

    if (isDevtoolsShortcut || isViewSource || (isSelectionArea && isCopyCutSelect)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  window.addEventListener('dragover', (event) => {
    if (isProtectedContent(event.target) && !isEditable(event.target)) event.preventDefault();
  }, true);
})();
