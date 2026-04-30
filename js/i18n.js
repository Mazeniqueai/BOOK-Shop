// ============================================================
// SYSTÈME DE TRADUCTION (i18n) - MAM++
// Langues supportées : Français, Anglais, Espagnol
// ============================================================

const SUPPORTED_LANGUAGES = {
  fr: { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  en: { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  es: { code: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'Español' }
};

const DEFAULT_LANGUAGE = 'fr';

// ============================================================
// TRADUCTIONS DE L'INTERFACE
// ============================================================
const TRANSLATIONS = {
  fr: {
    // Navigation
    'nav.catalog': 'Catalogue',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.admin': 'Admin',

    // Hero
    'hero.eyebrow': 'Librairie numérique • 2026',
    'hero.title': 'Des histoires qui',
    'hero.title_em': 'traversent',
    'hero.title_end': 'le temps.',
    'hero.subtitle': 'Une sélection rigoureuse de livres numériques pour les lecteurs exigeants. Téléchargement immédiat. Lisez où vous voulez, quand vous voulez.',
    'hero.cta': 'Explorer le catalogue',

    // Catalogue
    'catalog.subtitle': 'Notre catalogue',
    'catalog.title': 'Livres',
    'catalog.title_em': 'soigneusement',
    'catalog.title_end': 'choisis',
    'catalog.empty': 'Aucun livre dans cette catégorie pour le moment.',
    'catalog.unavailable_lang': 'Non disponible dans votre langue',
    'catalog.available_in': 'Disponible en :',

    // À propos
    'about.subtitle': 'Notre démarche',
    'about.title': 'Une librairie',
    'about.title_em': 'à taille humaine',
    'about.title_end': '.',
    'about.text1': 'Chez MAM++, nous croyons qu\'un bon livre se choisit avec attention. Nous sélectionnons chaque titre pour sa qualité d\'écriture, son originalité et sa capacité à nous faire grandir.',
    'about.text2': 'Tous nos livres sont disponibles en formats PDF et EPUB, sans DRM, pour que vous puissiez les lire sur tous vos appareils. Le téléchargement est instantané après l\'achat.',

    // Catégories
    'category.all': 'Tous',
    'category.Roman': 'Roman',
    'category.Science-Fiction': 'Science-Fiction',
    'category.Cuisine': 'Cuisine',
    'category.Développement': 'Développement',
    'category.Voyage': 'Voyage',
    'category.Technologie': 'Technologie',
    'category.Art': 'Art',
    'category.Autre': 'Autre',

    // Page produit
    'product.about': 'À propos de ce livre',
    'product.format': 'Format',
    'product.pages': 'Pages',
    'product.language': 'Langue',
    'product.published': 'Publication',
    'product.available_languages': 'Disponible en',
    'product.add_to_cart': 'Ajouter au panier',
    'product.buy_now': 'Acheter maintenant',
    'product.by': 'par',
    'product.not_found': 'Livre introuvable',
    'product.not_found_desc': 'Ce livre n\'existe pas ou a été retiré du catalogue.',
    'product.back_to_catalog': 'Retour au catalogue',

    // Panier
    'cart.title': 'Votre panier',
    'cart.empty': 'Votre panier est vide',
    'cart.discover': 'Découvrir les livres',
    'cart.total': 'Total',
    'cart.checkout': 'Passer commande',
    'cart.remove': 'Retirer',

    // Checkout
    'checkout.breadcrumb': 'Paiement',
    'checkout.title': 'Finaliser votre',
    'checkout.title_em': 'commande',
    'checkout.your_info': 'Vos informations',
    'checkout.firstname': 'Prénom',
    'checkout.lastname': 'Nom',
    'checkout.email': 'Email * (livraison du livre)',
    'checkout.phone': 'Téléphone',
    'checkout.country': 'Pays',
    'checkout.city': 'Ville',
    'checkout.select': 'Sélectionner...',
    'checkout.payment_method': 'Moyen de paiement',
    'checkout.summary': 'Récapitulatif',
    'checkout.subtotal': 'Sous-total',
    'checkout.shipping': 'Livraison',
    'checkout.shipping_free': 'Gratuite (numérique)',
    'checkout.total_to_pay': 'Total à payer',
    'checkout.pay_now': 'Payer maintenant',
    'checkout.processing': 'Traitement en cours...',
    'checkout.secure': '🔒 Paiement chiffré et sécurisé',

    // Confirmation
    'confirmation.thanks': 'Merci pour votre',
    'confirmation.thanks_em': 'commande',
    'confirmation.received': 'Votre paiement a bien été reçu.',
    'confirmation.email_sent': 'Un email de confirmation avec les liens de téléchargement vous a été envoyé à :',
    'confirmation.back': 'Retour à la librairie',
    'confirmation.print': 'Imprimer le reçu',

    // Footer
    'footer.tagline': 'La librairie numérique pour les esprits curieux. Des livres choisis avec soin, livrés instantanément.',
    'footer.catalog': 'Catalogue',
    'footer.help': 'Aide',
    'footer.legal': 'Légal',
    'footer.copyright': '© 2026 MAM++. Tous droits réservés.',
    'footer.designed': 'Conçu avec soin pour les amoureux des livres.',

    // Validation
    'validation.name_required': 'Veuillez renseigner votre nom complet',
    'validation.email_invalid': 'Email invalide',
    'validation.country_required': 'Veuillez sélectionner votre pays',
    'validation.payment_required': 'Veuillez choisir un moyen de paiement',
    'validation.card_invalid': 'Numéro de carte invalide',
    'validation.expiry_invalid': 'Date d\'expiration invalide',
    'validation.cvc_invalid': 'CVC invalide',
    'validation.orange_invalid': 'Numéro Orange Money invalide',
    'validation.mtn_invalid': 'Numéro MTN MoMo invalide',

    // Toast
    'toast.added': 'ajouté au panier'
  },

  en: {
    'nav.catalog': 'Catalog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.admin': 'Admin',

    'hero.eyebrow': 'Digital bookstore • 2026',
    'hero.title': 'Stories that',
    'hero.title_em': 'transcend',
    'hero.title_end': 'time.',
    'hero.subtitle': 'A carefully curated selection of digital books for discerning readers. Instant download. Read wherever, whenever you want.',
    'hero.cta': 'Browse the catalog',

    'catalog.subtitle': 'Our catalog',
    'catalog.title': 'Books',
    'catalog.title_em': 'thoughtfully',
    'catalog.title_end': 'selected',
    'catalog.empty': 'No books in this category yet.',
    'catalog.unavailable_lang': 'Not available in your language',
    'catalog.available_in': 'Available in:',

    'about.subtitle': 'Our approach',
    'about.title': 'A bookstore',
    'about.title_em': 'with a human touch',
    'about.title_end': '.',
    'about.text1': 'At MAM++, we believe a good book is chosen with care. We select each title for its writing quality, originality and ability to help us grow.',
    'about.text2': 'All our books are available in PDF and EPUB formats, DRM-free, so you can read them on all your devices. Instant download after purchase.',

    'category.all': 'All',
    'category.Roman': 'Novel',
    'category.Science-Fiction': 'Sci-Fi',
    'category.Cuisine': 'Cooking',
    'category.Développement': 'Development',
    'category.Voyage': 'Travel',
    'category.Technologie': 'Technology',
    'category.Art': 'Art',
    'category.Autre': 'Other',

    'product.about': 'About this book',
    'product.format': 'Format',
    'product.pages': 'Pages',
    'product.language': 'Language',
    'product.published': 'Published',
    'product.available_languages': 'Available in',
    'product.add_to_cart': 'Add to cart',
    'product.buy_now': 'Buy now',
    'product.by': 'by',
    'product.not_found': 'Book not found',
    'product.not_found_desc': 'This book does not exist or has been removed from the catalog.',
    'product.back_to_catalog': 'Back to catalog',

    'cart.title': 'Your cart',
    'cart.empty': 'Your cart is empty',
    'cart.discover': 'Discover books',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',

    'checkout.breadcrumb': 'Payment',
    'checkout.title': 'Complete your',
    'checkout.title_em': 'order',
    'checkout.your_info': 'Your information',
    'checkout.firstname': 'First name',
    'checkout.lastname': 'Last name',
    'checkout.email': 'Email * (book delivery)',
    'checkout.phone': 'Phone',
    'checkout.country': 'Country',
    'checkout.city': 'City',
    'checkout.select': 'Select...',
    'checkout.payment_method': 'Payment method',
    'checkout.summary': 'Summary',
    'checkout.subtotal': 'Subtotal',
    'checkout.shipping': 'Shipping',
    'checkout.shipping_free': 'Free (digital)',
    'checkout.total_to_pay': 'Total to pay',
    'checkout.pay_now': 'Pay now',
    'checkout.processing': 'Processing...',
    'checkout.secure': '🔒 Encrypted and secure payment',

    'confirmation.thanks': 'Thank you for your',
    'confirmation.thanks_em': 'order',
    'confirmation.received': 'Your payment has been received.',
    'confirmation.email_sent': 'A confirmation email with download links has been sent to:',
    'confirmation.back': 'Back to bookstore',
    'confirmation.print': 'Print receipt',

    'footer.tagline': 'The digital bookstore for curious minds. Carefully selected books, delivered instantly.',
    'footer.catalog': 'Catalog',
    'footer.help': 'Help',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2026 MAM++. All rights reserved.',
    'footer.designed': 'Crafted with care for book lovers.',

    'validation.name_required': 'Please enter your full name',
    'validation.email_invalid': 'Invalid email',
    'validation.country_required': 'Please select your country',
    'validation.payment_required': 'Please choose a payment method',
    'validation.card_invalid': 'Invalid card number',
    'validation.expiry_invalid': 'Invalid expiry date',
    'validation.cvc_invalid': 'Invalid CVC',
    'validation.orange_invalid': 'Invalid Orange Money number',
    'validation.mtn_invalid': 'Invalid MTN MoMo number',

    'toast.added': 'added to cart'
  },

  es: {
    'nav.catalog': 'Catálogo',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.cart': 'Carrito',
    'nav.admin': 'Admin',

    'hero.eyebrow': 'Librería digital • 2026',
    'hero.title': 'Historias que',
    'hero.title_em': 'trascienden',
    'hero.title_end': 'el tiempo.',
    'hero.subtitle': 'Una selección cuidada de libros digitales para lectores exigentes. Descarga inmediata. Lea donde quiera, cuando quiera.',
    'hero.cta': 'Explorar el catálogo',

    'catalog.subtitle': 'Nuestro catálogo',
    'catalog.title': 'Libros',
    'catalog.title_em': 'cuidadosamente',
    'catalog.title_end': 'seleccionados',
    'catalog.empty': 'No hay libros en esta categoría todavía.',
    'catalog.unavailable_lang': 'No disponible en su idioma',
    'catalog.available_in': 'Disponible en:',

    'about.subtitle': 'Nuestro enfoque',
    'about.title': 'Una librería',
    'about.title_em': 'a escala humana',
    'about.title_end': '.',
    'about.text1': 'En MAM++, creemos que un buen libro se elige con cuidado. Seleccionamos cada título por su calidad de escritura, originalidad y capacidad para hacernos crecer.',
    'about.text2': 'Todos nuestros libros están disponibles en formatos PDF y EPUB, sin DRM, para que pueda leerlos en todos sus dispositivos. Descarga inmediata después de la compra.',

    'category.all': 'Todos',
    'category.Roman': 'Novela',
    'category.Science-Fiction': 'Ciencia Ficción',
    'category.Cuisine': 'Cocina',
    'category.Développement': 'Desarrollo',
    'category.Voyage': 'Viaje',
    'category.Technologie': 'Tecnología',
    'category.Art': 'Arte',
    'category.Autre': 'Otro',

    'product.about': 'Sobre este libro',
    'product.format': 'Formato',
    'product.pages': 'Páginas',
    'product.language': 'Idioma',
    'product.published': 'Publicación',
    'product.available_languages': 'Disponible en',
    'product.add_to_cart': 'Añadir al carrito',
    'product.buy_now': 'Comprar ahora',
    'product.by': 'por',
    'product.not_found': 'Libro no encontrado',
    'product.not_found_desc': 'Este libro no existe o ha sido retirado del catálogo.',
    'product.back_to_catalog': 'Volver al catálogo',

    'cart.title': 'Su carrito',
    'cart.empty': 'Su carrito está vacío',
    'cart.discover': 'Descubrir libros',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar compra',
    'cart.remove': 'Quitar',

    'checkout.breadcrumb': 'Pago',
    'checkout.title': 'Finalizar su',
    'checkout.title_em': 'pedido',
    'checkout.your_info': 'Sus datos',
    'checkout.firstname': 'Nombre',
    'checkout.lastname': 'Apellido',
    'checkout.email': 'Email * (entrega del libro)',
    'checkout.phone': 'Teléfono',
    'checkout.country': 'País',
    'checkout.city': 'Ciudad',
    'checkout.select': 'Seleccionar...',
    'checkout.payment_method': 'Método de pago',
    'checkout.summary': 'Resumen',
    'checkout.subtotal': 'Subtotal',
    'checkout.shipping': 'Envío',
    'checkout.shipping_free': 'Gratis (digital)',
    'checkout.total_to_pay': 'Total a pagar',
    'checkout.pay_now': 'Pagar ahora',
    'checkout.processing': 'Procesando...',
    'checkout.secure': '🔒 Pago cifrado y seguro',

    'confirmation.thanks': 'Gracias por su',
    'confirmation.thanks_em': 'pedido',
    'confirmation.received': 'Su pago ha sido recibido.',
    'confirmation.email_sent': 'Un email de confirmación con los enlaces de descarga ha sido enviado a:',
    'confirmation.back': 'Volver a la librería',
    'confirmation.print': 'Imprimir recibo',

    'footer.tagline': 'La librería digital para mentes curiosas. Libros cuidadosamente seleccionados, entregados al instante.',
    'footer.catalog': 'Catálogo',
    'footer.help': 'Ayuda',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2026 MAM++. Todos los derechos reservados.',
    'footer.designed': 'Diseñado con cariño para los amantes de los libros.',

    'validation.name_required': 'Por favor, introduzca su nombre completo',
    'validation.email_invalid': 'Email inválido',
    'validation.country_required': 'Por favor, seleccione su país',
    'validation.payment_required': 'Por favor, elija un método de pago',
    'validation.card_invalid': 'Número de tarjeta inválido',
    'validation.expiry_invalid': 'Fecha de expiración inválida',
    'validation.cvc_invalid': 'CVC inválido',
    'validation.orange_invalid': 'Número Orange Money inválido',
    'validation.mtn_invalid': 'Número MTN MoMo inválido',

    'toast.added': 'añadido al carrito'
  }
};

// ============================================================
// SERVICE i18n
// ============================================================
const i18n = {
  currentLang: DEFAULT_LANGUAGE,
  listeners: [],

  // Détecte la langue préférée du navigateur
  detectBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage || 'fr').split('-')[0].toLowerCase();
    return SUPPORTED_LANGUAGES[browserLang] ? browserLang : DEFAULT_LANGUAGE;
  },

  // Initialise la langue (depuis localStorage ou navigateur)
  init() {
    const saved = localStorage.getItem('mamplus_lang');
    if (saved && SUPPORTED_LANGUAGES[saved]) {
      this.currentLang = saved;
    } else {
      this.currentLang = this.detectBrowserLanguage();
      localStorage.setItem('mamplus_lang', this.currentLang);
    }
    document.documentElement.lang = this.currentLang;
  },

  // Change la langue active
  setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('mamplus_lang', lang);
    document.documentElement.lang = lang;
    this.notifyListeners();
    // Re-rendre la page
    this.applyTranslations();
  },

  // Récupère une traduction
  t(key, fallback = '') {
    const lang = this.currentLang;
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || fallback || key;
  },

  // Applique les traductions à tous les éléments avec data-i18n
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.placeholder !== undefined && el.dataset.i18nAttr === 'placeholder') {
            el.placeholder = translation;
          } else {
            el.value = translation;
          }
        } else {
          el.textContent = translation;
        }
      }
    });

    // Pour les éléments avec data-i18n-html (qui peuvent contenir du HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      const translation = this.t(key);
      if (translation) el.innerHTML = translation;
    });

    // Pour les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const translation = this.t(key);
      if (translation) el.placeholder = translation;
    });

    // Notifier les pages dynamiques (catalogue, panier, etc.)
    this.notifyListeners();
  },

  // Listeners pour re-render des composants dynamiques
  onChange(callback) {
    this.listeners.push(callback);
  },

  notifyListeners() {
    this.listeners.forEach(cb => {
      try { cb(this.currentLang); } catch (e) { console.error(e); }
    });
  }
};

// Auto-initialisation
i18n.init();
