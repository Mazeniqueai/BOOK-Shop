// ============================================================
// CATALOGUE DE LIVRES - SUPPORT MULTILINGUE
// ============================================================
// Chaque livre a un objet "translations" avec une entrée par langue.
// Si une langue n'est pas définie, le livre est marqué comme
// "non disponible" dans cette langue.
//
// Pour ajouter un livre dans une nouvelle langue, ajoutez simplement
// une entrée dans l'objet "translations".
// ============================================================

const BOOKS = [
  {
    id: 1,
    category: "Roman",
    price: 14.99,
    currency: "EUR",
    pages: 412,
    publishDate: "2024",
    cover: {
      gradient: "linear-gradient(135deg, #6b2737, #2c1015)",
      titleColor: "#e8d5a3"
    },
    // Traductions disponibles pour ce livre
    translations: {
      fr: {
        title: "L'Ombre du Vent",
        author: "Marina Lefèvre",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Un roman captivant qui mêle mystère et romance dans le Paris des années 1920.",
        description: "Dans le Paris bohème de l'entre-deux-guerres, une jeune libraire découvre un manuscrit oublié qui va bouleverser sa vie. Entre les ruelles pavées de Montmartre et les salons littéraires, elle se lance dans une enquête qui réveille les fantômes d'un passé que beaucoup voudraient garder enfoui.\n\nUne fresque magistrale qui célèbre l'amour des livres et le pouvoir des mots, portée par une écriture élégante et intemporelle."
      },
      en: {
        title: "The Shadow of the Wind",
        author: "Marina Lefèvre",
        language: "English",
        format: "PDF + EPUB",
        shortDescription: "A captivating novel blending mystery and romance in 1920s Paris.",
        description: "In the bohemian Paris of the interwar period, a young bookseller discovers a forgotten manuscript that will change her life. Between the cobbled streets of Montmartre and literary salons, she embarks on an investigation that awakens the ghosts of a past many would prefer to keep buried.\n\nA masterful tale celebrating the love of books and the power of words, carried by elegant and timeless writing."
      },
      es: {
        title: "La Sombra del Viento",
        author: "Marina Lefèvre",
        language: "Español",
        format: "PDF + EPUB",
        shortDescription: "Una novela cautivadora que mezcla misterio y romance en el París de los años 20.",
        description: "En el París bohemio de entreguerras, una joven librera descubre un manuscrito olvidado que cambiará su vida. Entre las calles empedradas de Montmartre y los salones literarios, se embarca en una investigación que despierta los fantasmas de un pasado que muchos preferirían mantener enterrado.\n\nUna obra magistral que celebra el amor por los libros y el poder de las palabras, llevada por una escritura elegante e intemporal."
      }
    }
  },
  {
    id: 2,
    category: "Science-Fiction",
    price: 12.50,
    currency: "EUR",
    pages: 356,
    publishDate: "2025",
    cover: {
      gradient: "linear-gradient(135deg, #4a4e7a, #1a1d3a)",
      titleColor: "#c9a961"
    },
    translations: {
      fr: {
        title: "Les Jardins de Saturne",
        author: "Antoine Verlaine",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Une épopée spatiale où l'humanité doit réapprendre à cultiver son humanité.",
        description: "En 2387, l'humanité a colonisé Saturne. Mais lorsque les jardins hydroponiques de Titan commencent à produire des plantes impossibles, la biologiste Iris Mendès comprend qu'elle a découvert quelque chose qui transcende la science.\n\nUn roman d'anticipation profondément humain qui interroge notre rapport à la nature, à la technologie et à ce qui nous définit comme espèce."
      },
      en: {
        title: "The Gardens of Saturn",
        author: "Antoine Verlaine",
        language: "English",
        format: "PDF + EPUB",
        shortDescription: "A space epic where humanity must relearn how to cultivate its humanity.",
        description: "In 2387, humanity has colonized Saturn. But when the hydroponic gardens of Titan begin to produce impossible plants, biologist Iris Mendès realizes she has discovered something that transcends science.\n\nA deeply human science fiction novel that questions our relationship with nature, technology, and what defines us as a species."
      }
      // Pas de version espagnole pour ce livre (test du système)
    }
  },
  {
    id: 3,
    category: "Cuisine",
    price: 19.90,
    currency: "EUR",
    pages: 248,
    publishDate: "2024",
    cover: {
      gradient: "linear-gradient(135deg, #b85c3a, #6b2718)",
      titleColor: "#f5f1e8"
    },
    translations: {
      fr: {
        title: "Cuisine Méditerranéenne",
        author: "Sofia Castellano",
        language: "Français",
        format: "PDF",
        shortDescription: "120 recettes authentiques de la côte amalfitaine à la Catalogne.",
        description: "Voyagez au cœur de la Méditerranée avec ce livre de recettes inspiré par trois générations de cuisiniers. Sofia Castellano partage les secrets de famille qui font la richesse de cette cuisine ensoleillée.\n\nDes risottos crémeux aux paellas safranées, en passant par les mezzés du Liban et les tagines marocains, chaque recette est expliquée pas à pas."
      },
      en: {
        title: "Mediterranean Cuisine",
        author: "Sofia Castellano",
        language: "English",
        format: "PDF",
        shortDescription: "120 authentic recipes from the Amalfi Coast to Catalonia.",
        description: "Travel to the heart of the Mediterranean with this cookbook inspired by three generations of cooks. Sofia Castellano shares family secrets that make this sunny cuisine so rich.\n\nFrom creamy risottos to saffron paellas, including Lebanese mezzes and Moroccan tagines, each recipe is explained step by step."
      },
      es: {
        title: "Cocina Mediterránea",
        author: "Sofia Castellano",
        language: "Español",
        format: "PDF",
        shortDescription: "120 recetas auténticas desde la Costa Amalfitana hasta Cataluña.",
        description: "Viaje al corazón del Mediterráneo con este libro de recetas inspirado en tres generaciones de cocineros. Sofia Castellano comparte los secretos de familia que hacen la riqueza de esta cocina soleada.\n\nDesde risottos cremosos hasta paellas con azafrán, pasando por mezzés libaneses y tagines marroquíes, cada receta se explica paso a paso."
      }
    }
  },
  {
    id: 4,
    category: "Développement",
    price: 16.00,
    currency: "EUR",
    pages: 198,
    publishDate: "2025",
    cover: {
      gradient: "linear-gradient(135deg, #1a1a1a, #3a3a3a)",
      titleColor: "#c9a961"
    },
    translations: {
      fr: {
        title: "L'Art de la Productivité",
        author: "Jean-Marc Dubois",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Méthodes éprouvées pour reprendre le contrôle de votre temps.",
        description: "Vous vous noyez sous les emails, les réunions et les tâches sans fin ? Ce livre propose une méthodologie complète pour transformer votre relation au travail et retrouver le sens de vos journées.\n\nL'auteur partage les stratégies concrètes qu'il enseigne dans les plus grandes entreprises."
      },
      en: {
        title: "The Art of Productivity",
        author: "Jean-Marc Dubois",
        language: "English",
        format: "PDF + EPUB",
        shortDescription: "Proven methods to regain control of your time.",
        description: "Are you drowning in emails, meetings, and endless tasks? This book offers a comprehensive methodology to transform your relationship with work and rediscover meaning in your days.\n\nThe author shares concrete strategies he teaches in major companies."
      },
      es: {
        title: "El Arte de la Productividad",
        author: "Jean-Marc Dubois",
        language: "Español",
        format: "PDF + EPUB",
        shortDescription: "Métodos probados para recuperar el control de su tiempo.",
        description: "¿Se está ahogando en emails, reuniones y tareas sin fin? Este libro propone una metodología completa para transformar su relación con el trabajo y recuperar el sentido de sus días.\n\nEl autor comparte las estrategias concretas que enseña en las grandes empresas."
      }
    }
  },
  {
    id: 5,
    category: "Voyage",
    price: 13.50,
    currency: "EUR",
    pages: 320,
    publishDate: "2024",
    cover: {
      gradient: "linear-gradient(135deg, #8a9a7a, #4a5a3a)",
      titleColor: "#faf7f0"
    },
    translations: {
      fr: {
        title: "Mémoires d'une Voyageuse",
        author: "Élise Cartier",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Trois ans, vingt-sept pays, une vie transformée.",
        description: "À 32 ans, Élise quitte tout pour partir seule sur les routes du monde. De la Mongolie à la Patagonie, des marchés de Marrakech aux temples du Kyoto, elle nous livre un récit de voyage poignant et lumineux."
      },
      en: {
        title: "Memoirs of a Traveler",
        author: "Élise Cartier",
        language: "English",
        format: "PDF + EPUB",
        shortDescription: "Three years, twenty-seven countries, a transformed life.",
        description: "At 32, Élise leaves everything to set out alone on the roads of the world. From Mongolia to Patagonia, from the markets of Marrakech to the temples of Kyoto, she delivers a poignant and luminous travel story."
      }
    }
  },
  {
    id: 6,
    category: "Technologie",
    price: 22.00,
    currency: "EUR",
    pages: 285,
    publishDate: "2025",
    cover: {
      gradient: "linear-gradient(135deg, #2c4858, #0f2027)",
      titleColor: "#c9a961"
    },
    translations: {
      fr: {
        title: "Code & Conscience",
        author: "Raphaël Moreau",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Réflexions philosophiques sur l'éthique de l'intelligence artificielle.",
        description: "À l'heure où l'IA bouleverse tous les pans de notre société, ce livre propose une réflexion approfondie et accessible sur les enjeux éthiques de cette révolution.\n\nRaphaël Moreau, philosophe et ingénieur, explore avec rigueur les questions fondamentales de notre époque."
      },
      en: {
        title: "Code & Conscience",
        author: "Raphaël Moreau",
        language: "English",
        format: "PDF + EPUB",
        shortDescription: "Philosophical reflections on the ethics of artificial intelligence.",
        description: "As AI disrupts every aspect of our society, this book offers an in-depth and accessible reflection on the ethical issues of this revolution.\n\nRaphaël Moreau, philosopher and engineer, rigorously explores the fundamental questions of our era."
      },
      es: {
        title: "Código y Conciencia",
        author: "Raphaël Moreau",
        language: "Español",
        format: "PDF + EPUB",
        shortDescription: "Reflexiones filosóficas sobre la ética de la inteligencia artificial.",
        description: "En un momento en que la IA transforma todos los aspectos de nuestra sociedad, este libro ofrece una reflexión profunda y accesible sobre los desafíos éticos de esta revolución.\n\nRaphaël Moreau, filósofo e ingeniero, explora con rigor las preguntas fundamentales de nuestra época."
      }
    }
  },
  {
    id: 7,
    category: "Roman",
    price: 11.99,
    currency: "EUR",
    pages: 288,
    publishDate: "2024",
    cover: {
      gradient: "linear-gradient(135deg, #5d6e4f, #2d3a25)",
      titleColor: "#e8d5a3"
    },
    translations: {
      fr: {
        title: "Le Souffle des Pins",
        author: "Camille Aubertin",
        language: "Français",
        format: "PDF + EPUB",
        shortDescription: "Une saga familiale au cœur des Landes, sur trois générations.",
        description: "Dans une maison forestière du sud-ouest, trois femmes se retrouvent après des années de silence. Mère, fille et petite-fille devront affronter les non-dits qui ont déchiré leur famille.\n\nUn roman intimiste et puissant qui interroge la transmission, le pardon et la force des liens du sang."
      }
      // Disponible uniquement en français (test du système)
    }
  },
  {
    id: 8,
    category: "Art",
    price: 24.50,
    currency: "EUR",
    pages: 176,
    publishDate: "2024",
    cover: {
      gradient: "linear-gradient(135deg, #c9a961, #8b7340)",
      titleColor: "#1a1a1a"
    },
    translations: {
      fr: {
        title: "Aquarelles & Émotions",
        author: "Marie-Hélène Béart",
        language: "Français",
        format: "PDF",
        shortDescription: "Apprenez l'aquarelle en 40 leçons progressives illustrées.",
        description: "Que vous soyez débutant ou amateur confirmé, ce manuel vous guide pas à pas dans la maîtrise de l'aquarelle. Avec plus de 200 illustrations originales, l'autrice partage ses techniques préférées."
      },
      en: {
        title: "Watercolors & Emotions",
        author: "Marie-Hélène Béart",
        language: "English",
        format: "PDF",
        shortDescription: "Learn watercolor with 40 progressive illustrated lessons.",
        description: "Whether you are a beginner or an experienced amateur, this manual guides you step by step in mastering watercolor. With over 200 original illustrations, the author shares her favorite techniques."
      },
      es: {
        title: "Acuarelas y Emociones",
        author: "Marie-Hélène Béart",
        language: "Español",
        format: "PDF",
        shortDescription: "Aprenda acuarela con 40 lecciones progresivas ilustradas.",
        description: "Tanto si es principiante como aficionado experimentado, este manual le guía paso a paso en el dominio de la acuarela. Con más de 200 ilustraciones originales, la autora comparte sus técnicas favoritas."
      }
    }
  }
];

// ============================================================
// HELPER : Récupérer un livre dans une langue donnée
// ============================================================
// Retourne un objet "aplati" prêt à utiliser, avec :
// - les propriétés communes (id, price, cover, etc.)
// - les propriétés traduites (title, author, description...)
// - availableLanguages : liste des langues disponibles pour ce livre
// - isAvailableInCurrentLang : true si le livre existe dans la langue demandée
//
// Si le livre n'existe pas dans la langue demandée, retourne quand même
// les infos de base + une traduction de fallback.
// ============================================================
function getBookInLanguage(book, lang) {
  const availableLanguages = Object.keys(book.translations || {});
  const isAvailableInCurrentLang = availableLanguages.includes(lang);

  // Trouver la meilleure traduction disponible
  let translation;
  if (isAvailableInCurrentLang) {
    translation = book.translations[lang];
  } else if (book.translations.fr) {
    translation = book.translations.fr;
  } else if (book.translations.en) {
    translation = book.translations.en;
  } else {
    // Prendre la première disponible
    translation = book.translations[availableLanguages[0]] || {};
  }

  return {
    ...book,
    ...translation,
    availableLanguages,
    isAvailableInCurrentLang,
    // Garder une référence brute des traductions pour l'admin
    _translations: book.translations
  };
}

// ============================================================
// CATÉGORIES (clés - les libellés sont traduits)
// ============================================================
const CATEGORIES = ["Tous", "Roman", "Science-Fiction", "Cuisine", "Développement", "Voyage", "Technologie", "Art"];

// ============================================================
// CONFIGURATION DE LA BOUTIQUE
// ============================================================
const SHOP_CONFIG = {
  name: "MAM++",
  tagline: "La librairie numérique des esprits curieux",
  email: "contact@mamplus.com",
  currency: "EUR",
  currencySymbol: "€",
  taxRate: 0,
  payment: {
    stripe: { publishableKey: "pk_test_VOTRE_CLE_STRIPE_ICI" },
    paypal: { clientId: "VOTRE_CLIENT_ID_PAYPAL_ICI" },
    mobileMoney: {
      orange: { merchantNumber: "VOTRE_NUMERO_ORANGE" },
      mtn: { merchantNumber: "VOTRE_NUMERO_MTN" }
    }
  }
};
