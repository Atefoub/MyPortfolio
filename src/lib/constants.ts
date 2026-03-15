// ═══════════════════════════════════════════════════════════════
// CONSTANTES & CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const ANIMATION_DELAYS = {
  SHORT: 'animation-delay-200',
  MEDIUM: 'animation-delay-400',
  LONG: 'animation-delay-600',
} as const;

export const BUTTON_VARIANTS = {
  primary: 'bg-accent text-accent-foreground hover:scale-105 active:scale-95',
  ghost: 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground',
  outline: 'bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
} as const;

export const BUTTON_SIZES = {
  sm: { padding: 'px-4 py-2', paddingIcon: 'p-2', text: 'text-xs', icon: 'w-3.5 h-3.5' },
  md: { padding: 'px-6 py-2.5', paddingIcon: 'p-2.5', text: 'text-sm', icon: 'w-4 h-4' },
  lg: { padding: 'px-8 py-4', paddingIcon: 'p-4', text: 'text-base', icon: 'w-5 h-5' },
} as const;

// Vue identifiers — doivent correspondre aux `id` des sections
export type ViewId = 'hero' | 'parcours' | 'projects' | 'contact';

export const NAV_LINKS: ReadonlyArray<{ href: string; label: string; view: ViewId }> = [
  { href: '#',         label: 'Accueil',  view: 'hero'     },
  { href: '#parcours', label: 'Parcours', view: 'parcours' },
  { href: '#projects', label: 'Projets',  view: 'projects' },
  { href: '#contact',  label: 'Contact',  view: 'contact'  },
];

// Type union des icônes disponibles dans SocialLinks / iconMap
type SocialIcon = 'Github' | 'Linkedin' | 'Mail';

export const SOCIAL_LINKS: ReadonlyArray<{ href: string; icon: SocialIcon; label: string }> = [
  { href: 'https://github.com/Atefoub',                            icon: 'Github',   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/antoine-mourin-0033ab233/', icon: 'Linkedin', label: 'LinkedIn' },
  { href: 'mailto:antoinem1pro@gmail.com',                         icon: 'Mail',     label: 'Email'    },
] as const;

/**
 * Endpoint Formspree — défini dans `.env` (VITE_FORMSPREE_ENDPOINT).
 * Ne jamais hardcoder cette valeur ici pour éviter le spam.
 */
export const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string) || '';

// Chemin du CV — partagé entre Navigation et Contact
export const CV_PATH = '/images/projects/CV_Antoine_Mourin.pdf';

// Délais avant reset du statut du formulaire (ms)
export const FORM_RESET_DELAYS = {
  SUCCESS: 4000,
  ERROR:   3000,
} as const;

export const CAROUSEL_CONFIG = {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 2 },
} as const;

// Breakpoints utilisés par useResponsiveItemsCount et useIsMobile (px)
export const CAROUSEL_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
} as const;

// Seuils et limites pour les cartes projet
export const PROJECT_CARD = {
  /** Longueur de description à partir de laquelle le bouton "Voir plus" apparaît */
  DESCRIPTION_CLAMP_THRESHOLD: 150,
  /** Nombre max de tags technos affichés avant le badge "+N" */
  MAX_TECH_TAGS: 5,
} as const;

/** Seuil de déplacement horizontal (px) pour déclencher un swipe carousel */
export const SWIPE_THRESHOLD = 50;

// Nombre max de niveaux de délai d'animation pour la timeline
export const TIMELINE_MAX_DELAYS = 11;

/** Nombre de skills visibles dans une carte timeline avant expansion */
export const TIMELINE_MAX_VISIBLE_SKILLS = 4;

/** max-height CSS de la zone dépliable d'une carte timeline */
export const TIMELINE_EXPANDED_MAX_HEIGHT = '800px';

// Navigation — seuils et délais
/** Scroll (px) à partir duquel le FAB "Mon CV" devient visible */
export const SCROLL_THRESHOLD = 300;
/** Breakpoint (px) au-dessus duquel le menu mobile se ferme au resize */
export const NAV_MOBILE_BREAKPOINT = 768;
/** Délai (ms) entre le clic sur un lien nav et l'affichage de la vue */
export const NAV_SCROLL_DELAY = 150;

// Logo / popup JugglingLab
export const JUGGLING_POPUP = {
  /** Largeur de l'iframe JugglingLab (px) */
  WIDTH:  200,
  /** Hauteur de l'iframe JugglingLab (px) */
  HEIGHT: 280,
} as const;