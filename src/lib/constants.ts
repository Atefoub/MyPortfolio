// ═══════════════════════════════════════════════════════════════
// CONSTANTES & CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export const ANIMATION_DELAYS = {
  SHORT:  'animation-delay-200',
  MEDIUM: 'animation-delay-400',
  LONG:   'animation-delay-600',
} as const;

export const BUTTON_VARIANTS = {
  primary: 'bg-accent text-accent-foreground hover:scale-105 active:scale-95',
  ghost:   'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground',
  outline: 'bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
} as const;

export const BUTTON_SIZES = {
  sm: { padding: 'px-4 py-2',   paddingIcon: 'p-2',   text: 'text-xs',   icon: 'w-3.5 h-3.5' },
  md: { padding: 'px-6 py-2.5', paddingIcon: 'p-2.5', text: 'text-sm',   icon: 'w-4 h-4'     },
  lg: { padding: 'px-8 py-4',   paddingIcon: 'p-4',   text: 'text-base', icon: 'w-5 h-5'     },
} as const;

export type ViewId = 'hero' | 'parcours' | 'projets' | 'contact';

export const NAV_LINKS: ReadonlyArray<{ to: string; label: string; view: ViewId }> = [
  { to: '/',         label: 'Accueil',  view: 'hero'     },
  { to: '/parcours', label: 'Parcours', view: 'parcours' },
  { to: '/projets',  label: 'Projets',  view: 'projets'  },
  { to: '/contact',  label: 'Contact',  view: 'contact'  },
];

type SocialIcon = 'Github' | 'Linkedin' | 'Mail';

export const SOCIAL_LINKS: ReadonlyArray<{ href: string; icon: SocialIcon; label: string }> = [
  { href: 'https://github.com/Atefoub',                            icon: 'Github',   label: 'GitHub'   },
  { href: 'https://www.linkedin.com/in/antoine-mourin-0033ab233/', icon: 'Linkedin', label: 'LinkedIn' },
  { href: 'mailto:antoinem1pro@gmail.com',                         icon: 'Mail',     label: 'Email'    },
] as const;

export const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string) || '';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const CV_PATH = `${base}/images/projects/CV_Antoine_Mourin.pdf`;

export const FORM_RESET_DELAYS = {
  SUCCESS: 4000,
  ERROR:   3000,
} as const;

export const CAROUSEL_CONFIG = {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 2 },
} as const;

export const CAROUSEL_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
} as const;

export const PROJECT_CARD = {
  DESCRIPTION_CLAMP_THRESHOLD: 150,
  MAX_TECH_TAGS: 5,
} as const;

export const SWIPE_THRESHOLD = 50;
export const TIMELINE_MAX_DELAYS = 11;
export const TIMELINE_MAX_VISIBLE_SKILLS = 4;
export const TIMELINE_EXPANDED_MAX_HEIGHT = '800px';
export const SCROLL_THRESHOLD = 300;
export const NAV_MOBILE_BREAKPOINT = 768;
export const NAV_SCROLL_DELAY = 150;

export const JUGGLING_POPUP = {
  WIDTH:  200,
  HEIGHT: 280,
} as const;