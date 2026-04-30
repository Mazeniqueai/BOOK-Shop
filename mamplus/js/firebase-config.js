// ============================================================
// CONFIGURATION FIREBASE — MAM++
// ============================================================
// Configuration de connexion au projet Firebase.
// Les clés ci-dessous sont publiques par design (Firebase Web).
// La sécurité est assurée par les règles Firestore et l'authentification.
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

// Détection du mode : Firebase actif si les clés sont renseignées
const USE_FIREBASE = FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey.length > 10;

// ============================================================
// COMPTES ADMINISTRATEURS
// ============================================================
// Les comptes admin sont gérés via la console Firebase Authentication.
// Ce tableau reste vide pour la sécurité en production.
// Pour ajouter un admin : Firebase Console > Authentication > Add user
// ============================================================

const DEMO_ADMINS = [];

// ============================================================
// INITIALISATION FIREBASE
// ============================================================

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
    console.log('Firebase initialise');
  } catch (e) {
    console.warn('Firebase non disponible, mode demo active', e);
  }
}
