// ============================================================
// SERVICE D'AUTHENTIFICATION
// Compatible Firebase ET mode démo (localStorage)
// ============================================================

const AuthService = {
  currentUser: null,
  authStateListeners: [],

  // === INITIALISATION ===
  init() {
    if (USE_FIREBASE && auth) {
      // Mode Firebase
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'admin'
          };
        } else {
          this.currentUser = null;
        }
        this.notifyListeners();
      });
    } else {
      // Mode démo (localStorage)
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
      // Mode Firebase
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
      const admin = DEMO_ADMINS.find(
        a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
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

  // === DÉCONNEXION ===
  async logout() {
    if (USE_FIREBASE && auth) {
      await auth.signOut();
    } else {
      this.currentUser = null;
      localStorage.removeItem('admin_session');
      this.notifyListeners();
    }
  },

  // === CRÉATION D'UN COMPTE ADMIN (uniquement super_admin) ===
  async createAdmin(email, password, name) {
    if (!this.isSuperAdmin()) {
      return { success: false, error: "Permission refusée" };
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
      // Mode démo : ajout en mémoire (perdu au rechargement)
      if (DEMO_ADMINS.find(a => a.email === email)) {
        return { success: false, error: "Cet email existe déjà" };
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

  // === VÉRIFICATIONS ===
  isLoggedIn() {
    return this.currentUser !== null;
  },

  isSuperAdmin() {
    return this.currentUser?.role === 'super_admin';
  },

  // === LISTENERS ===
  onAuthChange(callback) {
    this.authStateListeners.push(callback);
    // Appel immédiat avec l'état actuel
    callback(this.currentUser);
  },

  notifyListeners() {
    this.authStateListeners.forEach(cb => cb(this.currentUser));
  },

  // === PROTECTION DE PAGE ===
  requireAuth() {
    // Attendre un court instant pour laisser Firebase initialiser
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.isLoggedIn()) {
          window.location.href = getAdminPath() + 'login.html';
          resolve(false);
        } else {
          resolve(true);
        }
      }, 300);
    });
  },

  // === MESSAGES D'ERREUR ===
  getErrorMessage(code) {
    const messages = {
      'auth/user-not-found': "Aucun compte trouvé avec cet email",
      'auth/wrong-password': "Mot de passe incorrect",
      'auth/invalid-email': "Email invalide",
      'auth/email-already-in-use': "Cet email est déjà utilisé",
      'auth/weak-password': "Mot de passe trop faible (min. 6 caractères)",
      'auth/too-many-requests': "Trop de tentatives, réessayez plus tard",
      'auth/network-request-failed': "Problème de connexion réseau"
    };
    return messages[code] || "Erreur de connexion";
  }
};

function getAdminPath() {
  return window.location.pathname.includes('/admin/') ? './' : 'admin/';
}

// Auto-initialisation
AuthService.init();
