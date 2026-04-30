// ============================================================
// SERVICE D'AUTHENTIFICATION
// Compatible Firebase ET mode démo (localStorage)
// ============================================================

const AuthService = {
  currentUser: null,
  authStateListeners: [],
  _initialized: false,

  // === INITIALISATION ===
  init() {
    if (this._initialized) return;

    if (USE_FIREBASE) {
      // Mode Firebase : attendre que auth soit prêt
      if (typeof auth === 'undefined' || !auth) {
        // Firebase pas encore chargé, réessayer dans 200ms
        setTimeout(() => this.init(), 200);
        return;
      }

      this._initialized = true;

      auth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'super_admin'
          };
        } else {
          this.currentUser = null;
        }
        this.notifyListeners();
      });
    } else {
      // Mode démo (localStorage)
      this._initialized = true;
      const saved = localStorage.getItem('admin_session');
      if (saved) {
        try {
          this.currentUser = JSON.parse(saved);
        } catch (e) {
          this.currentUser = null;
        }
      }
      this.notifyListeners();
    }
  },

  // === CONNEXION ===
  async login(email, password) {
    if (USE_FIREBASE && auth) {
      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: result.user };
      } catch (error) {
        return {
          success: false,
          error: this.getErrorMessage(error.code)
        };
      }
    } else {
      // Mode démo
      const admin = (typeof DEMO_ADMINS !== 'undefined' ? DEMO_ADMINS : []).find(
        (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
      );

      if (admin) {
        const session = {
          uid: 'demo_' + admin.email,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          loginAt: new Date().toISOString()
        };
        this.currentUser = session;
        localStorage.setItem('admin_session', JSON.stringify(session));
        this.notifyListeners();
        return { success: true, user: session };
      }

      return {
        success: false,
        error: "Email ou mot de passe incorrect"
      };
    }
  },

  // === DECONNEXION ===
  async logout() {
    if (USE_FIREBASE && auth) {
      await auth.signOut();
    } else {
      this.currentUser = null;
      localStorage.removeItem('admin_session');
      this.notifyListeners();
    }
  },

  // === CREATION D'UN COMPTE ADMIN ===
  async createAdmin(email, password, name) {
    if (!this.isSuperAdmin()) {
      return { success: false, error: "Permission refusee" };
    }

    if (USE_FIREBASE && auth) {
      try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({ displayName: name });
        return { success: true, user: result.user };
      } catch (error) {
        return { success: false, error: this.getErrorMessage(error.code) };
      }
    } else {
      if (typeof DEMO_ADMINS === 'undefined') {
        return { success: false, error: "Mode demo non configure" };
      }
      if (DEMO_ADMINS.find((a) => a.email === email)) {
        return { success: false, error: "Cet email existe deja" };
      }
      DEMO_ADMINS.push({
        email,
        password,
        name,
        role: 'admin'
      });
      return { success: true };
    }
  },

  // === VERIFICATIONS ===
  isLoggedIn() {
    return this.currentUser !== null;
  },

  isSuperAdmin() {
    return this.currentUser && this.currentUser.role === 'super_admin';
  },

  // === LISTENERS ===
  onAuthChange(callback) {
    this.authStateListeners.push(callback);

    // Si pas encore initialise, attendre l'init
    if (!this._initialized) {
      // L'appel sera fait dans notifyListeners apres init
      return;
    }

    // Sinon, appeler avec l'etat actuel
    callback(this.currentUser);
  },

  notifyListeners() {
    this.authStateListeners.forEach((cb) => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('Erreur callback auth:', e);
      }
    });
  },

  // === PROTECTION DE PAGE ===
  requireAuth() {
    return new Promise((resolve) => {
      // Attendre l'initialisation et au moins une reponse de Firebase
      let attempts = 0;
      const maxAttempts = 30; // 9 secondes max

      const check = () => {
        attempts++;

        // Pas encore initialise -> attendre
        if (!this._initialized) {
          if (attempts >= maxAttempts) {
            window.location.href = getAdminPath() + 'login.html';
            resolve(false);
            return;
          }
          setTimeout(check, 300);
          return;
        }

        // En mode Firebase, attendre que onAuthStateChanged ait repondu au moins une fois
        if (USE_FIREBASE && auth) {
          // Si on a deja un user, c'est bon
          if (this.currentUser) {
            resolve(true);
            return;
          }
          // Sinon, attendre une reponse via onAuthStateChanged
          // (qui mettra a jour currentUser ou pas)
          // Attendre un petit moment puis verifier
          if (attempts < 10) {
            setTimeout(check, 300);
            return;
          }
          // Apres plusieurs essais sans connexion -> login
          window.location.href = getAdminPath() + 'login.html';
          resolve(false);
        } else {
          // Mode demo
          if (this.isLoggedIn()) {
            resolve(true);
          } else {
            window.location.href = getAdminPath() + 'login.html';
            resolve(false);
          }
        }
      };

      check();
    });
  },

  // === MESSAGES D'ERREUR ===
  getErrorMessage(code) {
    const messages = {
      'auth/user-not-found': "Aucun compte trouve avec cet email",
      'auth/wrong-password': "Mot de passe incorrect",
      'auth/invalid-credential': "Email ou mot de passe incorrect",
      'auth/invalid-email': "Email invalide",
      'auth/email-already-in-use': "Cet email est deja utilise",
      'auth/weak-password': "Mot de passe trop faible (min. 6 caracteres)",
      'auth/too-many-requests': "Trop de tentatives, reessayez plus tard",
      'auth/network-request-failed': "Probleme de connexion reseau"
    };
    return messages[code] || "Erreur de connexion";
  }
};

function getAdminPath() {
  return window.location.pathname.includes('/admin/') ? './' : 'admin/';
}

// ============================================================
// INITIALISATION DIFFEREE
// ============================================================
// Important : on attend que le DOM ET Firebase soient prets
// avant d'initialiser AuthService.

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => AuthService.init(), 100);
  });
} else {
  setTimeout(() => AuthService.init(), 100);
}
