export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  type: 'formation' | 'experience';
  shortDescription: string; // Description courte toujours visible
  detailedDescription?: string; // Description détaillée dans la section dépliable
  skills?: string[]; // Compétences/technologies sous forme de tags
  achievements?: string[]; // Réalisations clés (optionnel)
}

export const timeline: TimelineItem[] = [
  {
    id: 1,
    year: "2024 - 2026",
    title: "Concepteur Développeur d'Applications",
    organization: "Ada Tech School - Nantes",
    type: "formation",
    shortDescription: "Formation intensive RNCP niveau 6 (9 mois) axée sur le développement full-stack avec pédagogie par projets.",
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
      "Intégration d'APIs d'IA (OpenAI, Hugging Face) dans des projets concrets",
      "Déploiement et maintenance d'applications en production"
    ]
  },
  {
    id: 2,
    year: "Juin 2026",
    title: "Stage Développement Web & Mobile",
    organization: "Recherche active - 2 mois",
    type: "formation",
    shortDescription: "Recherche de stage pour consolider mes compétences techniques en environnement professionnel.",
    detailedDescription: "Opportunité pour mettre en pratique mes compétences en développement full-stack dans un contexte professionnel réel. Ouvert aux projets innovants dans la tech, fintech ou transformation digitale. Possibilité de prolongation en alternance.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "API REST",
      "PostgreSQL",
      "Git",
      "Agile"
    ]
  },
  {
    id: 3,
    year: "Sept. 2026 - Sept. 2028",
    title: "Alternance Concepteur Développeur d'Applications",
    organization: "RNCP niveau 7 - 24 mois",
    type: "formation",
    shortDescription: "Recherche d'alternance pour approfondir mes compétences en développement d'applications web et mobiles.",
    detailedDescription: "Formation avancée en alternance pour maîtriser l'architecture logicielle, les technologies modernes et contribuer à des projets innovants sur le long terme. Focus sur l'optimisation des performances, GraphQL, et l'intégration d'IA.",
    skills: [
      "Architecture logicielle",
      "GraphQL",
      "Microservices",
      "React Native",
      "DevOps",
      "Cloud (AWS/Azure)",
      "Optimisation performances",
      "IA/ML"
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
      "SQL",
      "Gestion de trésorerie",
      "Automatisation",
      "Processus financiers"
    ],
    achievements: [
      "Automatisation de tâches répétitives permettant un gain de 30% du temps de traitement",
      "Développement de scripts Python pour le traitement de données comptables volumineuses",
      "Migration et paramétrage de 3 entités comptables sur SAP",
      "Formation et support des utilisateurs sur les nouveaux outils digitaux",
      "Amélioration continue des processus comptables et des outils de reporting",
      "Gestion de la conformité RGPD pour les données financières"
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