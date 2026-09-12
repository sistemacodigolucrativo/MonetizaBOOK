(() => {
  'use strict';

  const parts = window.MONETIZABOOK_PDF_PARTS || [];
  const errorBox = document.getElementById('loadError');
  const loading = document.getElementById('loading');

  function showError(message) {
    console.error(message);
    if (loading) loading.hidden = true;
    if (errorBox) errorBox.hidden = false;
  }

  if (!parts.length) {
    showError('Os dados do PDF não foram carregados.');
    return;
  }

  try {
    const binary = atob(parts.join(''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

    const blob = new Blob([bytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    window.MONETIZABOOK_PDF_BYTES = bytes;
    window.MONETIZABOOK_PDF_BLOB_URL = blobUrl;

    document.querySelectorAll('[data-pdf-download]').forEach((anchor) => {
      anchor.href = blobUrl;
      anchor.download = 'MonetizaBOOK_Duvidas_Frequentes_Premium_2026.pdf';
      anchor.removeAttribute('aria-disabled');
    });

    document.querySelectorAll('[data-pdf-open]').forEach((anchor) => {
      anchor.href = blobUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.removeAttribute('aria-disabled');
    });

    window.addEventListener('pagehide', () => URL.revokeObjectURL(blobUrl), { once: true });
  } catch (error) {
    showError(`Falha ao reconstruir o PDF: ${error?.message || error}`);
  }
})();
