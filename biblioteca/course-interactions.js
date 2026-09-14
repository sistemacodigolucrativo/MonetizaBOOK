(() => {
  'use strict';
  const volume = document.body.dataset.courseVolume || 'unknown';
  const prefix = `monetizabook-volume-${volume}`;
  const read = key => {
    try { return localStorage.getItem(`${prefix}-${key}`) || ''; } catch { return ''; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(`${prefix}-${key}`, value); } catch {}
  };

  document.querySelectorAll('.checklist').forEach((list, listIndex) => {
    list.querySelectorAll(':scope > li').forEach((item, itemIndex) => {
      if (item.querySelector('input[type="checkbox"]')) return;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'local-checklist__input';
      checkbox.dataset.localChecklist = `${listIndex}-${itemIndex}`;
      checkbox.checked = read(`checklist-${listIndex}-${itemIndex}`) === '1';
      checkbox.setAttribute('aria-label', 'Marcar item do checklist como concluído');
      checkbox.addEventListener('change', () => write(`checklist-${listIndex}-${itemIndex}`, checkbox.checked ? '1' : '0'));
      item.prepend(checkbox);
      item.classList.toggle('is-checked', checkbox.checked);
      checkbox.addEventListener('change', () => item.classList.toggle('is-checked', checkbox.checked));
    });
  });

  document.querySelectorAll('.log-table td.blank').forEach((cell, index) => {
    const textarea = document.createElement('textarea');
    textarea.className = 'local-note';
    textarea.dataset.localNote = String(index);
    textarea.placeholder = 'Digite sua anotação…';
    textarea.value = read(`note-${index}`);
    const save = () => write(`note-${index}`, textarea.value);
    textarea.addEventListener('input', save);
    textarea.addEventListener('blur', save);
    cell.replaceChildren(textarea);
  });
})();
