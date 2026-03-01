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

export const NAV_LINKS = [
  { href: '#', label: 'Accueil' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'https://github.com/Atefoub', icon: 'Github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/antoine-mourin-0033ab233/', icon: 'Linkedin', label: 'LinkedIn' },
  { href: 'mailto:antoinem1pro@gmail.com', icon: 'Mail', label: 'Email' },
] as const;

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvzknqwk';

// Délais avant reset du statut du formulaire (ms)
export const FORM_RESET_DELAYS = {
  SUCCESS: 4000,
  ERROR: 3000,
} as const;

export const CAROUSEL_CONFIG = {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 3 },
} as const;

// Breakpoints utilisés par useResponsiveItemsCount (px)
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

// Nombre max de niveaux de délai d'animation pour la timeline
export const TIMELINE_MAX_DELAYS = 11;