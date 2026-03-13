export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  type: 'formation' | 'experience';
  shortDescription: string;
  detailedDescription?: string;
  skills?: string[];
  achievements?: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: 1,
    year: "2025 - 2026",
    title: "Concepteur Développeur d'Applications",
    organization: "Ada Tech School - Nantes",
    type: "formation",
    shortDescription: "Après 15 ans en comptabilité, j'ai réalisé que ce qui m'animait vraiment, c'était de construire — pas seulement d'analyser. Automatiser des processus avec Python et VBA chez Saunier Duval m'a donné un premier aperçu de ce que le code permet de créer : des outils concrets, utiles, qui changent le quotidien des équipes. Cette révélation m'a convaincu de franchir le pas et d'intégrer l'Ada Tech School de Nantes pour une formation intensive en développement full-stack. J'y apporte une rigueur et une culture du résultat forgées en entreprise, combinées à une vraie appétence technique acquise sur le terrain. Mon objectif : rejoindre une équipe où je peux contribuer immédiatement, tout en continuant à progresser vite.",
    detailedDescription: "Formation intensive en développement web et mobile avec une approche pratique et collaborative. Méthodologies agiles, travail en équipe, et projets concrets du début à la fin.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Git",
      "Docker",
      "CI/CD",
      "Tests unitaires",
      "API REST",
      "Tailwind CSS",
      "Vite",
      "Agile/Scrum"
    ],
    achievements: [
      "Développement de 10+ projets full-stack de A à Z",
      "Maîtrise des méthodologies agiles et du travail en équipe",
      "Déploiement et maintenance d'applications en production"
    ]
  },
  {
    id: 4,
    year: "2012 - 2024",
    title: "Comptable Fournisseurs & Trésorerie",
    organization: "Saunier Duval ECC - Nantes",
    type: "experience",
    shortDescription: "12 ans d'expérience en gestion comptable et financière avec expertise SAP. Responsable du traitement complet de la comptabilité fournisseurs et trésorerie.",
    detailedDescription: "Gestion complète du cycle comptable fournisseurs et trésorerie pour une filiale commerciale internationale. Utilisation quotidienne de SAP pour le traitement des factures, paiements, rapprochements bancaires et reporting financier. • Automatisation progressive des processus via développement de scripts Python, VBA et Power Automate. • Collaboration étroite avec les équipes Finance, Achats et Commercial pour optimiser les processus financiers. • Contribution active à la transformation digitale du département comptable.",
    skills: [
      "SAP (FI/MM)",
      "Python",
      "VBA",
      "Power Automate",
      "Excel avancé",
      "Gestion de trésorerie",
      "Automatisation",
      "Processus financiers"
    ],
    achievements: [
      "Automatisation de tâches répétitives en utilisant Powerautomate",
      "Développement de scripts Python pour le traitement de données comptables volumineuses",
      "Formation et support des utilisateurs sur les nouveaux outils digitaux (Powerautomate)",
      "Amélioration continue des processus comptables et des outils de reporting",
      "Transmission de connaissance pour externaliser la saisie comptable"
    ]
  },
  {
    id: 5,
    year: "2006 - 2007",
    title: "BTS Comptabilité et Gestion des Organisations",
    organization: "La Joliverie - Saint-Sébastien-sur-Loire",
    type: "formation",
    shortDescription: "Formation en comptabilité et gestion d'entreprise avec spécialisation en systèmes d'information.",
    detailedDescription: "Formation complète en gestion d'entreprise avec un focus sur la maîtrise des outils informatiques de gestion. Apprentissage des fondamentaux de la comptabilité, du contrôle de gestion et des systèmes d'information.",
    skills: [
      "Comptabilité générale",
      "Gestion financière",
      "SAP",
      "Suite Office",
      "Bases de données",
      "Contrôle de gestion"
    ]
  },
  {
    id: 6,
    year: "2004",
    title: "Bac STT Gestion",
    organization: "Lycée Saint Joseph - Ancenis",
    type: "formation",
    shortDescription: "Formation initiale en gestion et comptabilité avec introduction à l'informatique de gestion.",
    skills: [
      "Comptabilité",
      "Gestion",
      "Bureautique",
      "Économie"
    ]
  }
];