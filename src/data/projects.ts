export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  inProgress?: boolean;
  collaboration?: string;
}

export const projects: Project[] = [
  // 🚀 PROJET EN COURS
  {
    id: 11,
    title: "JuggleFlow - Application d'Apprentissage du Jonglage",
    description: "Progressive Web App (PWA) complète pour l'apprentissage structuré du jonglage. Parcours progressif avec système de gamification (badges, statistiques), animations en temps réel via l'API Juggling Lab, et mode hors ligne. Architecture full-stack pour les établissements scolaires avec conformité RGPD renforcée. Le projet s'appuie sur des recherches scientifiques démontrant les bienfaits cognitifs du jonglage.",
    technologies: [
      "React", "TypeScript", "Vite", "Node.js", "Express", "PostgreSQL",
      "Prisma", "PWA", "Workbox", "JWT", "Tailwind CSS", "API Juggling Lab",
      "Vitest", "Playwright"
    ],
    date: "Janvier 2026 - En cours",
    github: "https://github.com/Atefoub/JuggleFlow",
    image: "/images/projects/juggleflow.png",
    featured: true,
    inProgress: true,
  },

  // ⭐ PROJETS PHARES
  {
    id: 12,
    title: "Adaopte - Plateforme d'Adoption Animale",
    description: "Application web dédiée à l'adoption responsable d'animaux abandonnés. Développée à partir d'une maquette, elle propose une page d'accueil avec recherche filtrée, une page de liste avec filtres par type et localisation, une pagination, et une page bénévolat avec formulaire. Architecture orientée composants réutilisables, données typées en TypeScript (JSON local), filtrage optimisé avec useMemo, persistance des filtres via localStorage.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "JSON", "localStorage", "SQL", "useMemo"],
    date: "Janvier 2026",
    github: "https://github.com/Atefoub/adaopte",
    demo: "https://adaopte-blue.vercel.app",
    image: "/images/projects/screenshot_exercice_11_Adaopte.jpg",
    featured: true,
    collaboration: "Projet réalisé en collaboration avec Maëlle Aucher et Antoine Boinot (Promo Grace Hopper)",
  },
  {
    id: 5,
    title: "Quiz des Objets Insolites",
    description: "Quiz interactif avec timer, système de score, et historique des meilleurs résultats. Inclut mélange aléatoire des réponses, barre de progression, affichage d'explications, et sauvegarde localStorage. Design responsive avec animations.",
    technologies: ["HTML", "CSS", "JavaScript", "localStorage", "JSON"],
    date: "Octobre 2025",
    github: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/quiz_objets_insolites",
    demo: "https://atefoub.github.io/projet-quiz-antochloe-quiz-show/",
    image: "/images/projects/screenshot_exercice_5_quiz.jpg",
    collaboration: "Projet réalisé en collaboration avec Chloé Verglas",
  },
  {
    id: 6,
    title: "Parlez-vous le Morse ?",
    description: "Encodeur/décodeur de code Morse avec traduction bidirectionnelle (Latin ↔ Morse). Interface moderne avec panneau d'information sur l'histoire du code Morse et ses inventeurs. Design chaleureux aux tons orange/corail.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Novembre 2025",
    github: "https://github.com/Atefoub/parlez_vous_le_morse",
    demo: "https://atefoub.github.io/parlez_vous_le_morse/",
    image: "/images/projects/screenshot_exercice_6_parlez_vous_le_morse.jpg",
  },
  {
    id: 9,
    title: "Dataviz Cinéma à Paris",
    description: "Application de visualisation de données explorant l'activité cinématographique parisienne depuis 2016. Utilise l'API OpenData Paris (14 738 enregistrements). Visualisations interactives avec Recharts, design glassmorphism, et architecture modulaire.",
    technologies: ["React", "TypeScript", "Vite", "Recharts", "Tailwind CSS", "API OpenData"],
    date: "Nov-Déc 2025",
    github: "https://github.com/Atefoub/projet-dataviz",
    demo: "https://projet-dataviz-davanto.vercel.app/",
    image: "/images/projects/screenshot_exercice_9_projet_Dataviz.jpg",
    featured: true,
    collaboration: "Projet réalisé en collaboration avec David",
  },

  // AUTRES PROJETS
  {
    id: 1,
    title: "Bonjour Javascript",
    description: "Consolidation des compétences en JavaScript : manipulation de variables, fonctions avec paramètres, conditions, et intégration dans une page HTML. Utilisation des valeurs de retour pour un code dynamique et interactif.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Octobre 2025",
    github: "https://github.com/adatechschool/Exercices_individuels_Module_1/blob/main/01_bonjour_javascript.md",
    demo: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/bonjour_javascript",
    image: "/images/projects/screenshot_exercice_1_bonjour_javascript.jpg",
  },
  {
    id: 2,
    title: "Guess a Number",
    description: "Jeu interactif de devinette de nombres développé en JavaScript. Projet découpé en étapes progressives pour apprendre à structurer un projet en tâches simples. Focus sur la logique de jeu et l'interaction utilisateur.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Octobre 2025",
    github: "https://github.com/adatechschool/Exercices_individuels_Module_1/blob/main/02_guess_a_number.md",
    demo: "https://guess-a-number-atefoub.netlify.app/",
    image: "/images/projects/screenshot_exercice_2_guess_a_number.jpg",
  },
  {
    id: 3,
    title: "Flexbox Gallery",
    description: "Création d'une galerie responsive utilisant Flexbox. L'objectif était d'ajuster les propriétés CSS pour obtenir une vue galerie des éléments qui s'adaptent à toutes les tailles d'écran.",
    technologies: ["HTML", "CSS", "Flexbox"],
    date: "Octobre 2025",
    github: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/HTML_%20CSS_avanc%C3%A9_(responsive)/exercice-1",
    demo: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/HTML_%20CSS_avanc%C3%A9_(responsive)/exercice-1",
    image: "/images/projects/screenshot_exercice_3_paw_models.jpg",
  },
  {
    id: 4,
    title: "Base Apparel",
    description: "Reproduction d'un design responsive selon des maquettes précises. Mise en place d'états hover et focus, validation de formulaire avec messages d'erreur, et adaptation à différents écrans.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Octobre 2025",
    github: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/HTML_%20CSS_avanc%C3%A9_(responsive)/exercice-3",
    demo: "https://github.com/Atefoub/ADA/tree/main/exercices_individuels/HTML_%20CSS_avanc%C3%A9_(responsive)/exercice-3",
    image: "/images/projects/screenshot_exercice_4_flexbox_galery.jpg",
  },
  {
    id: 7,
    title: "Conjecture de Syracuse",
    description: "Exploration et visualisation de la conjecture de Syracuse (Collatz). Calculateur interactif avec visualisation graphique des trajectoires et statistiques détaillées (altitude maximale, temps de vol). Interface éducative et interactive.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Novembre 2025",
    github: "https://github.com/Atefoub/Paradoxe_Syracuse",
    demo: "https://atefoub.github.io/Paradoxe_Syracuse",
    image: "/images/projects/screenshot_exercice_7_conjecture_Syracuse.jpg",
  },
  {
    id: 8,
    title: "Générateur d'Attestation de Licence",
    description: "Application Python avec interface graphique pour générer automatiquement des attestations de licence en PDF. Inclut logo, informations administratives, signature, et formatage professionnel. Compilable en exécutable standalone.",
    technologies: ["Python", "Tkinter", "FPDF", "PyInstaller"],
    date: "Novembre 2025",
    github: "https://github.com/Atefoub/generateur-attestation-licence",
    image: "/images/projects/screenshot_exercice_8_attestation_licence.jpg",
  },
  {
    id: 10,
    title: "Mini Station Météo",
    description: "Application météo en temps réel utilisant l'API OpenWeatherMap. Recherche de ville, affichage des conditions actuelles, icônes dynamiques, conversion en Celsius, gestion d'erreurs, et design glassmorphisme avec animations fluides.",
    technologies: ["HTML", "CSS", "JavaScript", "API OpenWeatherMap", "localStorage"],
    date: "Décembre 2025",
    github: "https://github.com/Atefoub/mini_station_meteo",
    demo: "https://atefoub.github.io/mini_station_meteo/",
    image: "/images/projects/screenshot_exercice_10_mini_station_meteo.jpg",
  },
];