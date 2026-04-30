# 📚 MAM++ — Plateforme de vente de livres numériques

> Plateforme professionnelle **multilingue** (FR/EN/ES) avec admin, multi-comptes et CI/CD.

![Status](https://img.shields.io/badge/status-production--ready-success)
![Version](https://img.shields.io/badge/version-3.0.0-blue)
![i18n](https://img.shields.io/badge/i18n-FR%20%7C%20EN%20%7C%20ES-orange)

---

## ✨ Fonctionnalités

### 🏪 Boutique publique
- 🎨 **Design éditorial moderne** avec logo MAM++
- 🌐 **Multilingue** : Français, Anglais, Espagnol (auto-détection navigateur)
- 📖 **Chaque livre disponible dans plusieurs langues** (au choix de l'utilisateur)
- 🚫 **Badge "Non disponible"** si le livre n'existe pas dans la langue choisie
- 🔍 Page produit dédiée avec **sélecteur de langue** par livre
- 🛒 Panier intelligent (mémorise la version linguistique choisie)
- 💳 4 moyens de paiement : Stripe, PayPal, Orange Money, MTN MoMo
- 📱 100% responsive

### 🔐 Espace Admin
- 🔑 Système de login multi-admins
- 📊 Dashboard avec statistiques temps réel
- ➕ Ajout de livres avec **traductions multiples** (onglets par langue)
- ✏️ Modification de chaque version linguistique
- 🗑️ Suppression sécurisée
- 🎨 Personnalisation des couleurs de couverture
- 📄 **Upload PDF par langue** (un PDF différent par version)
- 👥 Gestion d'équipe (création d'admins)

### 🚀 DevOps
- 🤖 CI/CD automatisé (GitHub Actions)
- 🌍 Déploiement automatique sur GitHub Pages
- 📊 Audits Lighthouse hebdomadaires

---

## 🌐 Système multilingue

### Comment ça fonctionne

1. **Auto-détection** : à la première visite, le site détecte la langue du navigateur
2. **Sélecteur visible** : un bouton dans le header (🇫🇷 FR ▾) permet de changer
3. **Persistance** : le choix est sauvegardé pour les visites suivantes
4. **Tous les livres affichés** : un livre non disponible dans la langue choisie est :
   - Affiché en version "atténuée" (semi-transparent)
   - Marqué d'un badge "Non disponible dans votre langue"
   - Avec drapeaux des langues disponibles
5. **Page produit** : sélecteur de langue spécifique au livre (si plusieurs versions)
6. **Avertissement** : si l'utilisateur consulte une version non disponible dans sa langue, un message lui propose les versions existantes

### Les 8 livres de démo
| Livre | 🇫🇷 FR | 🇬🇧 EN | 🇪🇸 ES |
|---|---|---|---|
| L'Ombre du Vent | ✅ | ✅ | ✅ |
| Les Jardins de Saturne | ✅ | ✅ | ❌ |
| Cuisine Méditerranéenne | ✅ | ✅ | ✅ |
| L'Art de la Productivité | ✅ | ✅ | ✅ |
| Mémoires d'une Voyageuse | ✅ | ✅ | ❌ |
| Code & Conscience | ✅ | ✅ | ✅ |
| Le Souffle des Pins | ✅ | ❌ | ❌ |
| Aquarelles & Émotions | ✅ | ✅ | ✅ |

Cela permet de tester le système avec différents cas de figure.

---

## 🚀 Démarrage rapide

### Tester localement

1. Téléchargez et décompressez le projet
2. Ouvrez `index.html` dans votre navigateur

Pour un test complet (recommandé) :
```bash
cd mamplus
python -m http.server 8000
```
→ `http://localhost:8000`

### Tester l'admin

URL : `http://localhost:8000/admin/login.html`

**Identifiants démo** :
- 👑 Super Admin : `admin@mamplus.com` / `admin123`
- 👤 Manager : `manager@mamplus.com` / `manager123`

⚠️ **Changez ces identifiants en production !**

---

## ✏️ Ajouter un livre multilingue

Dans le panneau admin, l'ajout/édition d'un livre comporte :

### 1. Informations communes
- Catégorie, prix, pages, année
- Couleurs de la couverture

### 2. Versions linguistiques (onglets 🇫🇷 / 🇬🇧 / 🇪🇸)
Pour chaque langue, vous pouvez :
- ✅ **Activer/désactiver** la disponibilité dans cette langue
- 📝 Saisir titre, auteur, format, descriptions
- 📄 Uploader le PDF (différent par langue)

**Vous n'êtes pas obligé** d'ajouter toutes les langues. Un livre peut être disponible uniquement en français : il sera marqué comme "non disponible" dans les autres langues.

---

## 🔥 Activer Firebase (production)

Le mode démo (localStorage) est parfait pour développer. Pour la production, activez Firebase :

1. Créez un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activez **Authentication** (Email/Password), **Firestore** et **Storage**
3. Récupérez votre config Web et collez-la dans `js/firebase-config.js`
4. Créez vos comptes admin dans la console Firebase
5. Configurez les règles de sécurité (voir section "Sécurité" plus bas)

Une fois la config réelle dans `firebase-config.js`, le site bascule automatiquement du mode démo au mode Firebase.

---

## 📁 Structure du projet

```
mamplus/
├── .github/workflows/         # CI/CD GitHub Actions
├── admin/                     # Panneau admin
│   ├── login.html
│   ├── dashboard.html         # Avec onglets multilingues
│   └── settings.html
├── css/
│   ├── style.css              # Styles publics + i18n
│   └── admin.css              # Styles admin
├── images/
│   ├── logo.svg
│   └── favicon.svg
├── js/
│   ├── i18n.js                # 🌐 Système de traduction
│   ├── data.js                # Livres avec traductions
│   ├── firebase-config.js
│   ├── auth.js
│   ├── books-service.js       # CRUD multilingue
│   ├── admin.js               # Logique admin multilingue
│   ├── main.js                # Logique publique multilingue
│   └── checkout.js
├── pages/
│   ├── livre.html
│   ├── checkout.html
│   └── confirmation.html
├── index.html
└── README.md
```

---

## 🌍 Ajouter une nouvelle langue (ex: Allemand)

### Étape 1 — Ajouter dans `js/i18n.js`
```javascript
const SUPPORTED_LANGUAGES = {
  fr: { ... },
  en: { ... },
  es: { ... },
  de: { code: 'de', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' }
};

const TRANSLATIONS = {
  fr: { ... },
  en: { ... },
  es: { ... },
  de: {
    'nav.catalog': 'Katalog',
    'nav.cart': 'Warenkorb',
    // ... copier les 93 clés depuis fr et traduire
  }
};
```

### Étape 2 — Ajouter dans le dashboard admin
Dans `admin/dashboard.html`, dupliquer un onglet de langue existant et changer les IDs en `-de`.

### Étape 3 — Ajouter dans `js/admin.js`
Modifier les tableaux `['fr', 'en', 'es']` en `['fr', 'en', 'es', 'de']`.

---

## 📤 Déployer sur GitHub Pages

1. Créer un dépôt public sur GitHub
2. Uploader **TOUS les fichiers** (y compris le dossier caché `.github/` !)
3. Settings → Pages → Source : **GitHub Actions**
4. Le déploiement se lance automatiquement
5. Site disponible sur `https://VOTRE_NOM.github.io/mamplus/`

Pour les mises à jour : modifiez les fichiers et faites un `git push` — le site se redéploie tout seul en 1-2 min.

---

## 🔐 Sécurité

### Règles Firestore (à configurer en mode Firebase)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{book} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Règles Storage
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /books/{bookId}/{lang}/{file} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Avant la mise en production
1. Activez Firebase
2. Supprimez `DEMO_ADMINS` de `firebase-config.js`
3. Changez tous les mots de passe par défaut
4. Configurez les règles de sécurité ci-dessus

---

## 💳 Activer les vrais paiements

- **CinetPay** ([cinetpay.com](https://cinetpay.com)) — Recommandé pour le Cameroun (CB + Orange + MTN en une API)
- **Stripe** — Cartes bancaires internationales
- **PayPal Smart Buttons** — Sans serveur
- **Gumroad/Sellfy** — Solution clé-en-main

---

## ❓ FAQ

**Q : Que se passe-t-il si un client veut un livre non disponible dans sa langue ?**
R : Le livre est affiché avec un badge "Non disponible". S'il clique dessus, il voit la liste des langues disponibles et peut consulter une autre version. Il peut quand même acheter le livre dans une autre langue.

**Q : Puis-je vendre des PDF différents par langue ?**
R : Oui ! Chaque traduction d'un livre a son propre PDF. Vous uploadez 1 PDF par langue depuis l'admin.

**Q : Le panier garde-t-il la trace de la langue choisie ?**
R : Oui. Si un client achète "L'Ombre du Vent" en anglais, il recevra la version anglaise. Il peut même avoir le même livre en plusieurs langues dans son panier (versions différentes).

**Q : Combien coûte Firebase ?**
R : Gratuit jusqu'à 50 000 lectures/jour, 20 000 écritures/jour, 5 GB de stockage.

---

## 🎯 Roadmap

- [ ] Comptes clients avec bibliothèque personnelle
- [ ] Système de coupons par région/langue
- [ ] Newsletter multilingue
- [ ] Avis des lecteurs
- [ ] Recommandations personnalisées
- [ ] Mode sombre

**Bonne vente avec MAM++ ! 📚🌍✨**
