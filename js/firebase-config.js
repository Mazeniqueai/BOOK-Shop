// ============================================================
// CONFIGURATION FIREBASE
// ============================================================
// Pour activer Firebase :
// 1. Allez sur https://console.firebase.google.com
// 2. Créez un projet (gratuit)
// 3. Activez : Authentication > Email/Password
// 4. Activez : Firestore Database (mode production)
// 5. Activez : Storage (pour les PDFs)
// 6. Settings > General > Your apps > Web app
// 7. Copiez la config ci-dessous
// ============================================================


const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC6zTeljJfWQxO7ap_kNgwDnNQQR1LM_F8",
  authDomain: "mampluslibraries.firebaseapp.com",
  projectId: "mampluslibraries",
  storageBucket: "mampluslibraries.firebasestorage.app",
  messagingSenderId: "54713670528",
  appId: "1:54713670528:web:780c316c38937c646d7f65",
  measurementId: "G-6X85K09P9S"
};

// Mode démo : si Firebase n'est pas configuré, on utilise le localStorage
// Cela permet de tester l'admin sans configurer Firebase tout de suite
const USE_FIREBASE = FIREBASE_CONFIG.apiKey !== "VOTRE_API_KEY_ICI";

// ============================================================
// ADMINS PAR DÉFAUT (mode démo - localStorage)
// ============================================================
// Une fois Firebase activé, créez les comptes dans la console Firebase
// Pour le mode démo, ces identifiants permettent de tester l'admin :
const DEMO_ADMINS = [
  {
    email: "admin@mamplus.com",
    password: "admin123",  // ⚠️ À changer impérativement en production
    name: "Administrateur Principal",
    role: "super_admin"
  },
  {
    email: "manager@mamplus.com",
    password: "manager123",
    name: "Manager",
    role: "admin"
  }
];

// Initialisation Firebase (si configuré)
let firebaseApp = null;
let auth = null;
let db = null;
let storage = null;

if (USE_FIREBASE && typeof firebase !== 'undefined') {
  try {
    firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    console.log('✓ Firebase initialisé');
  } catch (e) {
    console.warn('⚠ Firebase non disponible, mode démo activé', e);
  }
}
