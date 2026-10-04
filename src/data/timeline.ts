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
    id: 7,
    year: "Juin - Juillet 2026",
    title: "Stage - Automatisation des convocations",
    organization: "Audencia (DTSI) - Nantes",
    type: "experience",
    shortDescription: "Stage de fin de formation à la Direction de la Transformation Digitale (DTSI) d'Audencia, pour la Direction Offres Entreprises. J'ai conçu et développé dans n8n un workflow qui envoie automatiquement les convocations aux participants des programmes Executive Education, à partir des exports Aurion et via l'API Microsoft Graph (Outlook).",
    detailedDescription: "Analyse du processus manuel existant avec l'équipe Offres Entreprises. • Workflow n8n : lecture des sessions issues d'Aurion, construction des e-mails et envoi via l'API Microsoft Graph, en s'appuyant sur OneDrive / SharePoint. • Envoi automatique à J-7, copie systématique à la boîte de l'équipe, cascade d'e-mails vers les participants et envoi en mode brouillon pour les sessions OPEN INTER. • Suivi des erreurs et mécanisme anti-renvoi dans Google Sheets, choisi plutôt que le nœud Excel de n8n, peu fiable sur un tenant SharePoint d'entreprise. • Correction d'un bug latent lié au nom d'un champ date dans les exports Aurion (Debut / Début). • Tests, documentation et transfert à l'équipe.",
    skills: [
      "n8n",
      "API Microsoft Graph",
      "Aurion",
      "OneDrive / SharePoint",
      "Google Sheets",
      "Automatisation de workflows",
      "Documentation technique"
    ],
    achievements: [
      "Workflow de convocations automatiques livré et documenté, en remplacement d'un envoi manuel",
      "Fiabilité : anti-renvoi, suivi des erreurs et copie systématique à l'équipe",
      "Projet présenté comme dossier professionnel pour le titre CDA (RNCP 6)"
    ]
  },
  {
    id: 1,
    year: "2025 - 2026",
    title: "Concepteur Développeur d'Applications (RNCP 6)",
    organization: "Ada Tech School - Nantes",
    type: "formation",
    shortDescription: "Après près de 20 ans en comptabilité, j'ai réalisé que ce qui m'animait vraiment, c'était de construire - pas seulement d'analyser. Automatiser des processus avec VBA et PowerAutomate chez Saunier Duval m'a donné un premier aperçu de ce que le code permet de créer : des outils concrets, utiles, qui changent le quotidien des équipes. Cette révélation m'a convaincu de franchir le pas et d'intégrer l'Ada Tech School de Nantes. J'y ai obtenu le titre de Concepteur Développeur d'Applications (RNCP 6). J'apporte une rigueur et une culture du résultat forgées en entreprise, combinées à une vraie appétence technique acquise sur le terrain. Mon objectif : rejoindre une équipe où je peux contribuer immédiatement, tout en continuant à progresser vite.",
    detailedDescription: "Formation intensive en développement web et mobile avec une approche pratique et collaborative. Méthodologies agiles, travail en équipe, et projets concrets du début à la fin. Titre professionnel Concepteur Développeur d'Applications (RNCP 6) obtenu en 2026.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Git",
      "Podman (conteneurs)",
      "CI/CD",
      "Tests unitaires",
      "API REST",
      "Tailwind CSS",
      "Vite",
      "Agile/Scrum"
    ],
    achievements: [
      "Obtention du titre professionnel Concepteur Développeur d'Applications (RNCP 6)",
      "Une dizaine de projets web, dont une application full-stack complète (JuggleFlow : React, Spring Boot, PostgreSQL)",
      "Maîtrise des méthodologies agiles et du travail en équipe",
      "Déploiement d'applications sur GitHub Pages, Netlify et Vercel, avec intégration continue GitHub Actions"
    ]
  },
  {
    id: 4,
    year: "2012 - aujourd'hui",
    title: "Comptable Fournisseurs & Trésorerie",
    organization: "Saunier Duval ECC - Nantes",
    type: "experience",
    shortDescription: "Plus de 12 ans en comptabilité fournisseurs et trésorerie sur SAP. Formation CDA suivie en 2025-2026 dans le cadre d'une Transition Pro, puis retour en poste.",
    detailedDescription: "Gestion complète du cycle comptable fournisseurs et trésorerie pour une filiale commerciale internationale. Utilisation quotidienne de SAP pour le traitement des factures, paiements, rapprochements bancaires et reporting financier. • Automatisation progressive des processus via le développement de scripts Python, VBA et Power Automate. • Collaboration étroite avec les équipes Finance, Achats et Commerciale pour optimiser les processus financiers. • Contribution active à la transformation digitale du département comptable.",
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
      "Automatisation de tâches répétitives en utilisant Power Automate",
      "Développement de scripts Python pour le traitement de données comptables volumineuses",
      "Formation et support des utilisateurs sur les nouveaux outils digitaux (Power Automate)",
      "Amélioration continue des processus comptables et des outils de reporting",
      "Transmission de connaissance pour externaliser la saisie comptable"
    ]
  },
  {
    id: 2,
    year: "2007 - 2012",
    title: "Assistant Comptable",
    organization: "Groupe Moninvest - Vertou",
    type: "experience",
    shortDescription: "Contrat de professionnalisation de 10 mois (Pigier Nantes) suivi d'un CDI au sein d'un groupe multi-sociétés. Prise en charge complète de la comptabilité fournisseurs et clients sur plusieurs entités.",
    detailedDescription: "Comptabilité fournisseurs et clients sur plusieurs sociétés du groupe : enregistrement de factures, règlements, rapprochements bancaires, relances clients, gestion des LCR et créances Dailly. • Paramétrage de la comptabilité d'une nouvelle société. • Création et alimentation de tableaux Excel pour l'analyse de l'activité. • Établissement des déclarations de TVA et contrôle annuel. • Suivi mensuel de l'activité d'une société du groupe : gestion du stock, des entrées matières et des en-cours de fabrication. • Établissement des déclarations d'échange de biens. • Préparation au bilan.",
    skills: [
      "SAGE 100 Comptabilité",
      "SAGE Moyens de paiement",
      "Excel avancé",
      "Comptabilité multi-sociétés",
      "Déclarations TVA",
      "Rapprochements bancaires",
      "Gestion des LCR",
      "DEB"
    ],
    achievements: [
      "Paramétrage complet de la comptabilité d'une nouvelle société du groupe",
      "Gestion autonome de la comptabilité fournisseurs et clients sur plusieurs entités",
      "Mise en place de tableaux de bord Excel pour le suivi mensuel de l'activité",
      "Évolution d'un contrat de professionnalisation vers un CDI"
    ]
  },
  {
    id: 3,
    year: "2007",
    title: "Formation Comptabilité & Informatique",
    organization: "Pigier - Nantes",
    type: "formation",
    shortDescription: "Contrat de professionnalisation de 10 mois pour approfondir mes compétences en comptabilité et en informatique de gestion, en alternance avec le Groupe Moninvest à Vertou.",
    skills: [
      "Comptabilité générale",
      "Comptabilité fournisseurs",
      "Comptabilité clients",
      "Excel",
      "Word",
      "Access",
      "SAGE 100"
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