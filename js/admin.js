// ============================================================
// ADMIN DASHBOARD - MAM++ multilingue
// ============================================================

let currentEditingBookId = null;
let currentDeletingBookId = null;
// pdfLinks : liens externes (Google Drive, Dropbox, etc.) au lieu d'upload
let pdfLinks = { fr: '', en: '', es: '' };
let currentLangTab = 'fr';

document.addEventListener('DOMContentLoaded', async () => {
  const ok = await AuthService.requireAuth();
  if (!ok) return;

  renderSidebarUser();
  renderFirebaseStatus();

  BooksService.onChange((books) => {
    renderAdminBooks(books);
    renderStats(books);
  });

  await BooksService.init();
});

function renderSidebarUser() {
  const user = AuthService.currentUser;
  if (!user) return;
  const c = document.getElementById('sidebar-user');
  if (!c) return;
  c.innerHTML = `
    <div class="sidebar-user-name">${user.name}</div>
    <div class="sidebar-user-email">${user.email}</div>
    <span class="sidebar-user-role">${user.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
  `;
}

function renderFirebaseStatus() {
  const el = document.getElementById('firebase-status');
  if (!el) return;
  if (USE_FIREBASE) {
    el.classList.add('live');
    el.querySelector('.status-label').textContent = 'Firebase actif';
  } else {
    el.classList.add('demo');
    el.querySelector('.status-label').textContent = 'Mode démo';
  }
}

function renderAdminBooks(books) {
  const grid = document.getElementById('admin-books-grid');
  if (!grid) return;

  if (!books || books.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--gray);">
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">📚 Aucun livre dans le catalogue</p>
        <button class="btn-add" onclick="openAddBookModal()">
          <span class="btn-add-icon">+</span><span>Ajouter votre premier livre</span>
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = books.map(book => {
    const langs = Object.keys(book.translations || {});
    const langFlags = langs.map(lc => {
      const li = SUPPORTED_LANGUAGES[lc];
      return li ? `<span title="${li.nativeName}">${li.flag}</span>` : '';
    }).join('');

    // Récupérer le titre/auteur (priorité fr, sinon en, sinon premier)
    const display = book.translations.fr || book.translations.en || book.translations[langs[0]] || {};

    return `
      <div class="admin-book-card">
        <div class="admin-book-cover" style="background: ${book.cover.gradient};">
          <div class="admin-book-cover-mini" style="color: ${book.cover.titleColor};">
            <div class="title">${escapeHtmlAdmin(display.title || 'Sans titre')}</div>
            <div class="author">${escapeHtmlAdmin(display.author || '')}</div>
          </div>
        </div>
        <div class="admin-book-info">
          <h3>${escapeHtmlAdmin(display.title || 'Sans titre')}</h3>
          <div class="author">${escapeHtmlAdmin(display.author || '')}</div>
          <div class="meta">
            <span>📂 ${escapeHtmlAdmin(book.category)}</span>
            <span class="price">${book.price.toFixed(2)} €</span>
          </div>
          <div style="margin-top: 0.4rem; display: flex; gap: 0.3rem; align-items: center; font-size: 0.95rem;">
            ${langFlags}
            <span style="font-size: 0.75rem; color: var(--gray); margin-left: 0.3rem;">${langs.length} ${langs.length > 1 ? 'langues' : 'langue'}</span>
          </div>
        </div>
        <div class="admin-book-actions">
          <button class="btn-action btn-edit" onclick="openEditBookModal(${book.id})">✏️ Modifier</button>
          <button class="btn-action btn-delete" onclick="openDeleteModal(${book.id})">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderStats(books) {
  if (!books) return;
  document.getElementById('stat-total').textContent = books.length;
  document.getElementById('stat-categories').textContent = new Set(books.map(b => b.category)).size;
  if (books.length > 0) {
    const avg = books.reduce((s, b) => s + b.price, 0) / books.length;
    document.getElementById('stat-avg-price').textContent = avg.toFixed(2) + ' €';
  } else {
    document.getElementById('stat-avg-price').textContent = '0 €';
  }
  const multi = books.filter(b => Object.keys(b.translations || {}).length > 1).length;
  document.getElementById('stat-multilang').textContent = multi;
}

// === MODAL : OUVRIR POUR AJOUT ===
function openAddBookModal() {
  currentEditingBookId = null;
  pdfLinks = { fr: '', en: '', es: '' };

  document.getElementById('modal-title').innerHTML = 'Nouveau <em>livre</em>';
  document.getElementById('save-book-btn').textContent = 'Ajouter le livre';
  document.getElementById('book-form').reset();
  document.getElementById('book-id').value = '';

  // Reset checkboxes : seulement FR coché par défaut
  document.getElementById('enable-fr').checked = true;
  document.getElementById('enable-en').checked = false;
  document.getElementById('enable-es').checked = false;

  togglePanelDisplay('fr', true);
  togglePanelDisplay('en', false);
  togglePanelDisplay('es', false);

  setColorValue('cover-color-1', '#6b2737');
  setColorValue('cover-color-2', '#2c1015');
  setColorValue('cover-title-color', '#e8d5a3');

  // Vider le champ image de couverture
  const coverImageInput = document.getElementById('cover-image-url');
  if (coverImageInput) coverImageInput.value = '';

  // Vider les champs de lien PDF
  ['fr', 'en', 'es'].forEach(lc => {
    const linkInput = document.getElementById('pdf-link-' + lc);
    if (linkInput) linkInput.value = '';
    const display = document.getElementById('pdf-name-' + lc);
    if (display) {
      display.classList.remove('has-file');
      display.textContent = '';
    }
  });

  switchLangTab('fr');
  updateLangBadges();
  updatePreview();
  document.getElementById('book-modal').classList.add('open');
}

// === MODAL : OUVRIR POUR ÉDITION ===
async function openEditBookModal(bookId) {
  const book = await BooksService.getById(bookId);
  if (!book) return;

  currentEditingBookId = bookId;
  pdfLinks = { fr: '', en: '', es: '' };

  document.getElementById('modal-title').innerHTML = 'Modifier le <em>livre</em>';
  document.getElementById('save-book-btn').textContent = 'Enregistrer';
  document.getElementById('book-id').value = book.id;
  document.getElementById('book-category').value = book.category || 'Roman';
  document.getElementById('book-price').value = book.price || '';
  document.getElementById('book-pages').value = book.pages || '';
  document.getElementById('book-publish-date').value = book.publishDate || '';

  const colors = extractGradientColors(book.cover?.gradient || '');
  setColorValue('cover-color-1', colors[0] || '#6b2737');
  setColorValue('cover-color-2', colors[1] || '#2c1015');
  setColorValue('cover-title-color', book.cover?.titleColor || '#e8d5a3');

  // Pré-remplir le champ image de couverture avec l'URL existante
  const coverImageInput = document.getElementById('cover-image-url');
  if (coverImageInput) coverImageInput.value = book.cover?.imageUrl || '';

  // Remplir les traductions
  ['fr', 'en', 'es'].forEach(lc => {
    const t = book.translations?.[lc];
    const enabled = !!t;
    document.getElementById('enable-' + lc).checked = enabled;
    togglePanelDisplay(lc, enabled);

    if (t) {
      document.getElementById('title-' + lc).value = t.title || '';
      document.getElementById('author-' + lc).value = t.author || '';
      document.getElementById('format-' + lc).value = t.format || 'PDF + EPUB';
      document.getElementById('short-' + lc).value = t.shortDescription || '';
      document.getElementById('desc-' + lc).value = t.description || '';

      // Pré-remplir le champ "lien PDF" avec l'URL existante
      const linkInput = document.getElementById('pdf-link-' + lc);
      if (linkInput) linkInput.value = t.pdfUrl || '';

      const display = document.getElementById('pdf-name-' + lc);
      if (display) {
        if (t.pdfUrl) {
          display.textContent = '🔗 Lien actuel enregistré';
          display.classList.add('has-file');
        } else {
          display.classList.remove('has-file');
          display.textContent = '';
        }
      }
    } else {
      ['title', 'author', 'short', 'desc'].forEach(f => {
        const el = document.getElementById(f + '-' + lc);
        if (el) el.value = '';
      });
      const linkInput = document.getElementById('pdf-link-' + lc);
      if (linkInput) linkInput.value = '';
      const display = document.getElementById('pdf-name-' + lc);
      if (display) {
        display.classList.remove('has-file');
        display.textContent = '';
      }
    }
  });

  // Activer le premier onglet disponible
  const firstAvailable = ['fr', 'en', 'es'].find(lc => book.translations?.[lc]) || 'fr';
  switchLangTab(firstAvailable);
  updateLangBadges();
  updatePreview();

  document.getElementById('book-modal').classList.add('open');
}

function closeBookModal() {
  document.getElementById('book-modal').classList.remove('open');
  currentEditingBookId = null;
  pdfLinks = { fr: '', en: '', es: '' };
}

// === ONGLETS LANGUES ===
function switchLangTab(lang) {
  currentLangTab = lang;
  document.querySelectorAll('.lang-tab').forEach(t => t.classList.toggle('active', t.dataset.lang === lang));
  document.querySelectorAll('.lang-panel').forEach(p => p.classList.toggle('active', p.dataset.langPanel === lang));
}

function toggleLangPanel(lang) {
  const enabled = document.getElementById('enable-' + lang).checked;
  togglePanelDisplay(lang, enabled);
  updateLangBadges();
}

function togglePanelDisplay(lang, show) {
  const fields = document.getElementById('fields-' + lang);
  if (fields) {
    fields.style.display = show ? 'block' : 'none';
  }
}

function updateLangBadges() {
  ['fr', 'en', 'es'].forEach(lc => {
    const badge = document.getElementById('badge-' + lc);
    const enabled = document.getElementById('enable-' + lc).checked;
    if (badge) {
      badge.textContent = enabled ? '✓' : '';
      badge.className = 'lang-tab-badge' + (enabled ? ' active' : '');
    }
  });
}

// === SAUVEGARDER ===
async function saveBook() {
  const btn = document.getElementById('save-book-btn');
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Enregistrement...';

  try {
    const category = document.getElementById('book-category').value;
    const price = parseFloat(document.getElementById('book-price').value);

    if (isNaN(price) || price < 0) {
      alert('⚠ Prix invalide');
      btn.disabled = false; btn.textContent = originalText; return;
    }

    // Collecter les traductions activées
    const translations = {};
    const enabledLangs = [];

    for (const lc of ['fr', 'en', 'es']) {
      const enabled = document.getElementById('enable-' + lc).checked;
      if (!enabled) continue;

      const title = document.getElementById('title-' + lc).value.trim();
      const author = document.getElementById('author-' + lc).value.trim();
      const desc = document.getElementById('desc-' + lc).value.trim();

      if (!title || !author || !desc) {
        alert(`⚠ Pour la langue "${SUPPORTED_LANGUAGES[lc].nativeName}", veuillez remplir au minimum : titre, auteur et description.`);
        switchLangTab(lc);
        btn.disabled = false; btn.textContent = originalText; return;
      }

      // Récupérer le lien PDF (Google Drive, Dropbox, etc.)
      const linkInput = document.getElementById('pdf-link-' + lc);
      const pdfLink = linkInput ? linkInput.value.trim() : '';

      // Validation simple du lien (doit commencer par http:// ou https://)
      if (pdfLink && !/^https?:\/\//i.test(pdfLink)) {
        alert(`⚠ Le lien PDF pour "${SUPPORTED_LANGUAGES[lc].nativeName}" doit commencer par http:// ou https://`);
        switchLangTab(lc);
        btn.disabled = false; btn.textContent = originalText; return;
      }

      translations[lc] = {
        title,
        author,
        language: SUPPORTED_LANGUAGES[lc].nativeName,
        format: document.getElementById('format-' + lc).value,
        shortDescription: document.getElementById('short-' + lc).value.trim() || desc.slice(0, 150),
        description: desc
      };

      // Ajouter le lien PDF s'il est fourni
      if (pdfLink) {
        translations[lc].pdfUrl = pdfLink;
        translations[lc].pdfFilename = 'Lien externe';
      }

      enabledLangs.push(lc);
    }

    if (enabledLangs.length === 0) {
      alert('⚠ Vous devez activer au moins une langue');
      btn.disabled = false; btn.textContent = originalText; return;
    }

    const color1 = document.getElementById('cover-color-1').value;
    const color2 = document.getElementById('cover-color-2').value;

    // Récupérer le lien de l'image de couverture
    const coverImageInput = document.getElementById('cover-image-url');
    const coverImageUrl = coverImageInput ? coverImageInput.value.trim() : '';

    // Validation du lien d'image (si fourni)
    if (coverImageUrl && !/^https?:\/\//i.test(coverImageUrl)) {
      alert('⚠ Le lien de l\'image de couverture doit commencer par http:// ou https://');
      btn.disabled = false; btn.textContent = originalText; return;
    }

    const coverData = {
      gradient: `linear-gradient(135deg, ${color1}, ${color2})`,
      titleColor: document.getElementById('cover-title-color').value
    };

    // Si une image est fournie, l'ajouter
    if (coverImageUrl) {
      coverData.imageUrl = coverImageUrl;
    }

    const bookData = {
      category,
      price,
      currency: 'EUR',
      pages: parseInt(document.getElementById('book-pages').value) || 0,
      publishDate: document.getElementById('book-publish-date').value.trim() || new Date().getFullYear().toString(),
      cover: coverData,
      translations
    };

    if (currentEditingBookId) {
      // En mode édition : conserver les pdfUrl existants si l'utilisateur a laissé le champ vide
      const existing = await BooksService.getById(currentEditingBookId);
      for (const lc of enabledLangs) {
        const linkInput = document.getElementById('pdf-link-' + lc);
        const pdfLink = linkInput ? linkInput.value.trim() : '';
        // Si pas de nouveau lien fourni, garder l'ancien
        if (!pdfLink && existing.translations?.[lc]?.pdfUrl) {
          translations[lc].pdfUrl = existing.translations[lc].pdfUrl;
          translations[lc].pdfFilename = existing.translations[lc].pdfFilename || 'Lien externe';
        }
      }
      await BooksService.update(currentEditingBookId, bookData);
    } else {
      await BooksService.create(bookData);
    }

    showAdminToast(currentEditingBookId ? '✓ Livre modifié' : '✓ Livre ajouté');
    closeBookModal();
  } catch (e) {
    console.error(e);
    alert('⚠ Erreur : ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// === SUPPRESSION ===
async function openDeleteModal(bookId) {
  const book = await BooksService.getById(bookId);
  if (!book) return;
  currentDeletingBookId = bookId;
  const display = book.translations?.fr || book.translations?.en || Object.values(book.translations || {})[0] || {};
  document.getElementById('delete-book-title').textContent = display.title || 'ce livre';
  document.getElementById('delete-modal').classList.add('open');

  document.getElementById('confirm-delete-btn').onclick = async () => {
    const btn = document.getElementById('confirm-delete-btn');
    btn.disabled = true;
    btn.textContent = 'Suppression...';
    try {
      await BooksService.delete(bookId);
      showAdminToast('✓ Livre supprimé');
      closeDeleteModal();
    } catch (e) {
      alert('⚠ Erreur : ' + e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Oui, supprimer';
    }
  };
}

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.remove('open');
  currentDeletingBookId = null;
}

// === LIEN PDF (Google Drive, Dropbox, etc.) ===
function handlePdfLinkChange(lang) {
  const input = document.getElementById('pdf-link-' + lang);
  const display = document.getElementById('pdf-name-' + lang);
  if (!input || !display) return;

  const url = input.value.trim();

  if (!url) {
    pdfLinks[lang] = '';
    display.classList.remove('has-file');
    display.textContent = '';
    return;
  }

  // Validation : doit être une URL valide
  if (!/^https?:\/\//i.test(url)) {
    display.textContent = '⚠ Le lien doit commencer par http:// ou https://';
    display.classList.remove('has-file');
    pdfLinks[lang] = '';
    return;
  }

  pdfLinks[lang] = url;

  // Détection du service utilisé pour un retour visuel
  let service = '🔗 Lien externe';
  if (url.includes('drive.google.com')) service = '📁 Google Drive';
  else if (url.includes('dropbox.com')) service = '📦 Dropbox';
  else if (url.includes('onedrive') || url.includes('1drv')) service = '☁ OneDrive';
  else if (url.includes('mega.nz')) service = '🟥 Mega';
  else if (url.includes('wetransfer')) service = '✈ WeTransfer';

  display.textContent = service + ' — lien enregistré ✓';
  display.classList.add('has-file');
}

// Garder l'ancien nom pour compatibilité au cas où le HTML n'est pas encore mis à jour
function handlePdfSelect(lang) {
  console.warn('handlePdfSelect est obsolète. Utilisez le champ "lien PDF".');
}

// === APERÇU LIVE ===
function updatePreview() {
  // Affiche le titre/auteur de l'onglet actif
  const lc = currentLangTab;
  const titleInput = document.getElementById('title-' + lc);
  const authorInput = document.getElementById('author-' + lc);

  const title = titleInput?.value || 'Titre du livre';
  const author = authorInput?.value || 'Auteur';
  const color1 = document.getElementById('cover-color-1').value;
  const color2 = document.getElementById('cover-color-2').value;
  const titleColor = document.getElementById('cover-title-color').value;

  // Vérifier s'il y a une image de couverture
  const imageInput = document.getElementById('cover-image-url');
  const imageUrl = imageInput ? imageInput.value.trim() : '';

  const preview = document.getElementById('cover-preview');
  const titleEl = document.getElementById('preview-title');
  const authorEl = document.getElementById('preview-author');

  if (preview) {
    if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
      // Mode image : afficher l'image de couverture
      preview.style.background = `url('${imageUrl}') center/cover no-repeat`;
      preview.style.color = 'transparent';
      // Cacher le titre/auteur quand on a une vraie image
      if (titleEl) titleEl.style.display = 'none';
      if (authorEl) authorEl.style.display = 'none';
    } else {
      // Mode dégradé : couleurs personnalisées
      preview.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
      preview.style.color = titleColor;
      if (titleEl) titleEl.style.display = '';
      if (authorEl) authorEl.style.display = '';
    }
  }

  if (titleEl) titleEl.textContent = title;
  if (authorEl) authorEl.textContent = author;
}

// === COULEURS ===
function setColorValue(colorId, value) {
  document.getElementById(colorId).value = value;
  document.getElementById(colorId + '-text').value = value;
}

function syncColorInput(colorId, textId) {
  document.getElementById(textId).value = document.getElementById(colorId).value;
}

function syncColorText(textId, colorId) {
  const value = document.getElementById(textId).value;
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    document.getElementById(colorId).value = value;
  }
}

function extractGradientColors(gradient) {
  if (!gradient) return ['#6b2737', '#2c1015'];
  const matches = gradient.match(/#[0-9a-fA-F]{6}/g);
  return matches || ['#6b2737', '#2c1015'];
}

async function logout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    await AuthService.logout();
    window.location.href = 'login.html';
  }
}

function escapeHtmlAdmin(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showAdminToast(message) {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookModal();
    closeDeleteModal();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'book-modal') closeBookModal();
  if (e.target.id === 'delete-modal') closeDeleteModal();
});

