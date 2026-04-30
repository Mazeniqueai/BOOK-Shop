// ============================================================
// SERVICE DE GESTION DES LIVRES (CRUD)
// Compatible Firebase Firestore ET mode démo (localStorage)
// ============================================================

const BooksService = {
  // Cache local
  _books: null,
  _listeners: [],

  // === INITIALISATION ===
  async init() {
    if (USE_FIREBASE && db) {
      // Écouter les changements en temps réel
      db.collection('books').orderBy('id').onSnapshot((snapshot) => {
        this._books = snapshot.docs.map(doc => ({
          ...doc.data(),
          _docId: doc.id
        }));
        this._notifyListeners();
      });
    } else {
      // Mode démo : charger depuis localStorage ou utiliser BOOKS par défaut
      const saved = localStorage.getItem('mamplus_books');
      if (saved) {
        try {
          this._books = JSON.parse(saved);
        } catch (e) {
          this._books = [...BOOKS];
          this._save();
        }
      } else {
        this._books = [...BOOKS];
        this._save();
      }
      this._notifyListeners();
    }
  },

  // === LECTURE ===
  async getAll() {
    if (this._books === null) {
      await this.init();
    }
    return this._books || [];
  },

  async getById(id) {
    const books = await this.getAll();
    return books.find(b => b.id === parseInt(id));
  },

  // === CRÉATION ===
  async create(bookData) {
    // Générer un nouvel ID
    const books = await this.getAll();
    const maxId = books.reduce((max, b) => Math.max(max, b.id), 0);
    const newBook = {
      ...bookData,
      id: maxId + 1
    };

    if (USE_FIREBASE && db) {
      await db.collection('books').add(newBook);
      // Le listener temps réel mettra à jour _books
    } else {
      this._books.push(newBook);
      this._save();
      this._notifyListeners();
    }

    return newBook;
  },

  // === MISE À JOUR ===
  async update(id, updates) {
    if (USE_FIREBASE && db) {
      const book = this._books.find(b => b.id === parseInt(id));
      if (book && book._docId) {
        const cleanUpdates = { ...updates };
        delete cleanUpdates._docId;
        await db.collection('books').doc(book._docId).update(cleanUpdates);
      }
    } else {
      const index = this._books.findIndex(b => b.id === parseInt(id));
      if (index !== -1) {
        this._books[index] = { ...this._books[index], ...updates, id: parseInt(id) };
        this._save();
        this._notifyListeners();
      }
    }
  },

  // === SUPPRESSION ===
  async delete(id) {
    if (USE_FIREBASE && db) {
      const book = this._books.find(b => b.id === parseInt(id));
      if (book && book._docId) {
        // Supprimer aussi le PDF associé si présent
        if (book.pdfUrl && storage) {
          try {
            const pdfRef = storage.refFromURL(book.pdfUrl);
            await pdfRef.delete();
          } catch (e) {
            console.warn('PDF non supprimé:', e);
          }
        }
        await db.collection('books').doc(book._docId).delete();
      }
    } else {
      this._books = this._books.filter(b => b.id !== parseInt(id));
      this._save();
      this._notifyListeners();
    }
  },

  // === UPLOAD DE PDF ===
  async uploadPdf(file, bookId, lang = 'fr') {
    if (USE_FIREBASE && storage) {
      const path = `books/${bookId}/${lang}/${file.name}`;
      const ref = storage.ref(path);
      const snapshot = await ref.put(file);
      const url = await snapshot.ref.getDownloadURL();
      return url;
    } else {
      // Mode démo : simulation
      return `[DEMO-${lang.toUpperCase()}] ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
  },

  // === RÉINITIALISATION (mode démo) ===
  async reset() {
    if (!USE_FIREBASE) {
      this._books = [...BOOKS];
      this._save();
      this._notifyListeners();
    }
  },

  // === PRIVÉ ===
  _save() {
    if (!USE_FIREBASE) {
      localStorage.setItem('mamplus_books', JSON.stringify(this._books));
    }
  },

  // === LISTENERS ===
  onChange(callback) {
    this._listeners.push(callback);
    if (this._books) callback(this._books);
  },

  _notifyListeners() {
    this._listeners.forEach(cb => cb(this._books || []));
  }
};

// Initialisation automatique
BooksService.init();
