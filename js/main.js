// ================================
// LOGIQUE PRINCIPALE - MAM++ (multilingue)
// ================================

// === GESTION DU PANIER ===
const Cart = {
  items: [],

  init() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        this.items = [];
      }
    }
    this.updateUI();
  },

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  async add(bookId, lang) {
    const allBooks = await BooksService.getAll();
    const rawBook = allBooks.find(b => b.id === bookId);
    if (!rawBook) return;

    const language = lang || i18n.currentLang;
    const book = getBookInLanguage(rawBook, language);

    // L'utilisateur ajoute la version dans la langue choisie (ou fallback)
    const itemKey = `${book.id}_${book.isAvailableInCurrentLang ? language : 'fallback'}`;
    const existing = this.items.find(item => item.key === itemKey);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        key: itemKey,
        id: book.id,
        title: book.title,
        author: book.author,
        language: book.language,
        price: book.price,
        cover: book.cover,
        quantity: 1
      });
    }

    this.save();
    this.updateUI();
    showToast(`✓ "${book.title}" ${i18n.t('toast.added')}`);
  },

  remove(key) {
    this.items = this.items.filter(item => item.key !== key);
    this.save();
    this.updateUI();
  },

  updateQuantity(key, delta) {
    const item = this.items.find(i => i.key === key);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.remove(key);
    } else {
      this.save();
      this.updateUI();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemsCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  },

  updateUI() {
    const countEls = document.querySelectorAll('.cart-count');
    countEls.forEach(el => {
      const count = this.getItemsCount();
      el.textContent = count;
      el.dataset.count = count;
    });
    this.renderCartItems();
  },

  renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <p>${i18n.t('cart.empty')}</p>
          <a href="${getBasePath()}index.html" class="btn-secondary" onclick="closeCart()">${i18n.t('cart.discover')}</a>
        </div>
      `;
      if (totalEl) totalEl.textContent = formatPrice(0);
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-cover" style="background: ${item.cover.gradient};"></div>
        <div class="cart-item-info">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.author)} · ${escapeHtml(item.language || '')}</p>
          <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="Cart.updateQuantity('${item.key}', -1)" aria-label="−">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="Cart.updateQuantity('${item.key}', 1)" aria-label="+">+</button>
          </div>
          <button class="cart-remove" onclick="Cart.remove('${item.key}')">${i18n.t('cart.remove')}</button>
        </div>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
};

// === UTILITAIRES ===
function formatPrice(amount) {
  return `${amount.toFixed(2)} ${SHOP_CONFIG.currencySymbol}`;
}

function getBasePath() {
  return window.location.pathname.includes('/pages/') || window.location.pathname.includes('/admin/') ? '../' : './';
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// === PANIER (DRAWER) ===
function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// === MENU MOBILE ===
function toggleMenu() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

// === SÉLECTEUR DE LANGUE ===
function buildLanguageSelector() {
  const containers = document.querySelectorAll('.lang-selector');
  containers.forEach(container => {
    const current = SUPPORTED_LANGUAGES[i18n.currentLang];
    container.innerHTML = `
      <button class="lang-btn" onclick="toggleLangDropdown(this)" aria-label="Changer de langue">
        <span class="lang-flag">${current.flag}</span>
        <span class="lang-code">${current.code.toUpperCase()}</span>
        <span class="lang-arrow">▾</span>
      </button>
      <div class="lang-dropdown">
        ${Object.values(SUPPORTED_LANGUAGES).map(l => `
          <button class="lang-option ${l.code === i18n.currentLang ? 'active' : ''}" onclick="changeLang('${l.code}')">
            <span class="lang-flag">${l.flag}</span>
            <span class="lang-name">${l.nativeName}</span>
            ${l.code === i18n.currentLang ? '<span class="lang-check">✓</span>' : ''}
          </button>
        `).join('')}
      </div>
    `;
  });
}

function toggleLangDropdown(btn) {
  const dropdown = btn.nextElementSibling;
  const isOpen = dropdown.classList.contains('open');

  // Fermer tous les autres
  document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));

  if (!isOpen) {
    dropdown.classList.add('open');
    // Fermer en cliquant en dehors
    setTimeout(() => {
      document.addEventListener('click', closeLangDropdownOnce, { once: true });
    }, 10);
  }
}

function closeLangDropdownOnce(e) {
  if (!e.target.closest('.lang-selector')) {
    document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
  }
}

function changeLang(lang) {
  i18n.setLanguage(lang);
  buildLanguageSelector();
  // Re-render des composants dynamiques
  if (document.getElementById('books-grid')) renderBooks();
  if (document.getElementById('product-content')) renderProductPage();
  if (document.getElementById('filters')) renderFilters();
}

// === AFFICHAGE DE LA GRILLE DE LIVRES ===
async function renderBooks(filter = 'Tous') {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  const allBooks = await BooksService.getAll();
  const lang = i18n.currentLang;

  // Mapper avec la langue actuelle
  const booksLocalized = allBooks.map(b => getBookInLanguage(b, lang));

  // Filtrer par catégorie
  const filteredBooks = filter === 'Tous'
    ? booksLocalized
    : booksLocalized.filter(book => book.category === filter);

  if (filteredBooks.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--gray); padding: 3rem;">${i18n.t('catalog.empty')}</p>`;
    return;
  }

  grid.innerHTML = filteredBooks.map(book => {
    const unavailableBadge = !book.isAvailableInCurrentLang ? `
      <div class="lang-badge lang-badge--unavailable" title="${i18n.t('catalog.unavailable_lang')}">
        🌐 ${i18n.t('catalog.unavailable_lang')}
      </div>
    ` : '';

    const availableLangsBadges = book.availableLanguages.map(lc => {
      const langInfo = SUPPORTED_LANGUAGES[lc];
      if (!langInfo) return '';
      return `<span class="lang-pill ${lc === lang ? 'lang-pill--active' : ''}" title="${langInfo.nativeName}">${langInfo.flag}</span>`;
    }).join('');

    return `
      <a href="pages/livre.html?id=${book.id}" class="book-card ${!book.isAvailableInCurrentLang ? 'book-card--dimmed' : ''}">
        <div class="book-cover" style="background: ${book.cover.gradient};">
          <div class="book-cover-inner" style="color: ${book.cover.titleColor};">
            <div class="book-cover-author" style="color: ${book.cover.titleColor}; opacity: 0.85;">${escapeHtml(book.author)}</div>
            <div class="book-cover-decoration"></div>
            <div class="book-cover-title">${escapeHtml(book.title)}</div>
          </div>
          ${unavailableBadge}
        </div>
        <div class="book-info">
          <div class="book-category">${i18n.t('category.' + book.category, book.category)}</div>
          <div class="book-title">${escapeHtml(book.title)}</div>
          <div class="book-author">${escapeHtml(book.author)}</div>
          <div class="book-meta-row">
            <div class="book-price">${formatPrice(book.price)}</div>
            <div class="book-langs">${availableLangsBadges}</div>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// === FILTRES ===
function renderFilters() {
  const container = document.getElementById('filters');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const label = cat === 'Tous' ? i18n.t('category.all') : i18n.t('category.' + cat, cat);
    return `<button class="filter-btn ${cat === 'Tous' ? 'active' : ''}" data-filter="${cat}">${label}</button>`;
  }).join('');

  // Réattacher l'event listener (en gérant le ré-affichage)
  container.replaceWith(container.cloneNode(true));
  const newContainer = document.getElementById('filters');

  newContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    newContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderBooks(e.target.dataset.filter);
  });
}

// === PAGE PRODUIT ===
async function renderProductPage() {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'));
  const requestedLang = params.get('lang') || i18n.currentLang;
  const allBooks = await BooksService.getAll();
  const rawBook = allBooks.find(b => b.id === bookId);

  const container = document.getElementById('product-content');
  if (!container) return;

  if (!rawBook) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 1rem;">${i18n.t('product.not_found')}</h2>
        <p style="margin-bottom: 2rem; color: var(--gray);">${i18n.t('product.not_found_desc')}</p>
        <a href="../index.html" class="btn-primary">${i18n.t('product.back_to_catalog')}</a>
      </div>
    `;
    return;
  }

  const book = getBookInLanguage(rawBook, requestedLang);
  document.title = `${book.title} — ${SHOP_CONFIG.name}`;

  // Sélecteur de langue du livre (si multiple langues disponibles)
  let langSwitcherHtml = '';
  if (book.availableLanguages.length > 1) {
    langSwitcherHtml = `
      <div class="product-lang-switcher">
        <span class="product-lang-label">${i18n.t('product.available_languages')} :</span>
        <div class="product-lang-options">
          ${book.availableLanguages.map(lc => {
            const li = SUPPORTED_LANGUAGES[lc];
            if (!li) return '';
            const isActive = lc === requestedLang;
            return `
              <a href="?id=${book.id}&lang=${lc}" class="product-lang-pill ${isActive ? 'active' : ''}">
                <span>${li.flag}</span>
                <span>${li.nativeName}</span>
                ${isActive ? '<span class="lang-check">✓</span>' : ''}
              </a>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Avertissement si pas dans la langue demandée
  let unavailableWarning = '';
  if (!book.isAvailableInCurrentLang && requestedLang === i18n.currentLang) {
    unavailableWarning = `
      <div class="lang-warning">
        ⚠️ ${i18n.t('catalog.unavailable_lang')}.
        ${i18n.t('catalog.available_in')}
        ${book.availableLanguages.map(lc => {
          const li = SUPPORTED_LANGUAGES[lc];
          return li ? `<a href="?id=${book.id}&lang=${lc}">${li.flag} ${li.nativeName}</a>` : '';
        }).join(' · ')}
      </div>
    `;
  }

  container.innerHTML = `
    <nav class="breadcrumb">
      <a href="../index.html">${i18n.t('nav.catalog')}</a>
      <span>›</span>
      ${escapeHtml(book.title)}
    </nav>

    <div class="product-grid">
      <div class="product-cover-wrap">
        <div class="product-cover" style="background: ${book.cover.gradient};">
          <div class="book-cover-inner" style="color: ${book.cover.titleColor};">
            <div class="book-cover-author" style="color: ${book.cover.titleColor}; opacity: 0.85;">${escapeHtml(book.author)}</div>
            <div class="book-cover-decoration"></div>
            <div class="book-cover-title" style="font-size: 1.8rem;">${escapeHtml(book.title)}</div>
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="book-category">${i18n.t('category.' + book.category, book.category)}</div>
        <h1 class="product-title">${escapeHtml(book.title)}</h1>
        <div class="product-author">${i18n.t('product.by')} <strong>${escapeHtml(book.author)}</strong></div>

        ${unavailableWarning}
        ${langSwitcherHtml}

        <div class="product-price-wrap">
          <div class="product-price">${formatPrice(book.price)}</div>
          <div class="product-format">${escapeHtml(book.format || '')}</div>
        </div>

        <div class="product-description">
          <h3>${i18n.t('product.about')}</h3>
          ${(book.description || '').split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('')}
        </div>

        <div class="product-meta">
          <div class="meta-item">
            <span class="meta-label">${i18n.t('product.format')}</span>
            <span class="meta-value">${escapeHtml(book.format || '-')}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${i18n.t('product.pages')}</span>
            <span class="meta-value">${book.pages || '-'}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${i18n.t('product.language')}</span>
            <span class="meta-value">${escapeHtml(book.language || '-')}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${i18n.t('product.published')}</span>
            <span class="meta-value">${escapeHtml(book.publishDate || '-')}</span>
          </div>
        </div>

        <div class="product-actions">
          <button class="btn-primary" onclick="Cart.add(${book.id}, '${requestedLang}')">
            <span>${i18n.t('product.add_to_cart')}</span>
            <span>→</span>
          </button>
          <button class="btn-secondary" onclick="Cart.add(${book.id}, '${requestedLang}'); window.location.href='checkout.html';">
            ${i18n.t('product.buy_now')}
          </button>
        </div>
      </div>
    </div>
  `;
}

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  i18n.applyTranslations();
  buildLanguageSelector();

  if (document.getElementById('books-grid')) {
    renderFilters();
    renderBooks();
  }

  if (document.getElementById('product-content')) {
    renderProductPage();
  }

  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
});
