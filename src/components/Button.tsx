import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { cn } from '../lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────

/** Variantes visuelles du bouton */
type Variant = 'primary' | 'ghost' | 'outline';

/** Tailles disponibles */
type Size = 'sm' | 'md' | 'lg';

/** Props de base communes à <button> et <a> */
interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  /** Ajoute un spinner et désactive le bouton automatiquement */
  isLoading?: boolean;
  /** Icône à gauche du label (ou seule si pas de children) */
  icon?: ReactNode;
  /** Classes supplémentaires */
  className?: string;
}

/**
 * Props polymorphiques : si `as="a"` on récupère les attributs de <a>,
 * sinon ceux de <button>. Le type `as` est optionnel et vaut "button" par défaut.
 */
type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps> & {
    as?: T;
  };

// ─── Styles par variante & taille ───────────────────────────────────────────

const variantStyles: Record<Variant, string> = {
  /** CTA principal : fond accent, texte clair, scale au hover */
  primary:
    'bg-accent text-accent-foreground hover:scale-105 active:scale-95',

  /** Bouton subtil : fond muted, transition vers accent au hover (icônes sociales, theme toggle) */
  ghost:
    'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground',

  /** Bouton bordé : transparent avec bord, utilisé pour les flèches carrousel */
  outline:
    'bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
};

const sizeStyles: Record<Size, { padding: string; paddingIcon: string; text: string; icon: string }> = {
  sm: { 
    padding: 'px-4 py-2',
    paddingIcon: 'p-2',
    text: 'text-xs',
    icon: 'w-3.5 h-3.5'
  },
  md: { 
    padding: 'px-6 py-2.5',
    paddingIcon: 'p-2.5',
    text: 'text-sm',
    icon: 'w-4 h-4'
  },
  lg: { 
    padding: 'px-8 py-4',
    paddingIcon: 'p-4',
    text: 'text-base',
    icon: 'w-5 h-5'
  },
};

// ─── Composant ──────────────────────────────────────────────────────────────

function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps<T>) {
  const Component = (as ?? 'button') as ElementType;
  const isIconOnly = !children; // mode icône unique (pas de label)

  // ─── Classes assemblées ───────────────────────────────────────
  const classes = cn(
    // Base commune
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300',
    // Variante
    variantStyles[variant],
    // Taille : padding adapté selon mode icône-seul ou avec label
    isIconOnly
      ? sizeStyles[size].paddingIcon // Padding uniforme spécifique à chaque taille
      : sizeStyles[size].padding,
    // Taille du texte (uniquement si label présent)
    !isIconOnly && sizeStyles[size].text,
    // États désactivés
    (disabled || isLoading) && 'opacity-50 cursor-not-allowed hover:scale-100',
    // Classes extérieures
    className,
  );

  // ─── Contenu interne ──────────────────────────────────────────
  const content = (
    <>
      {/* Spinner en cours d'envoi */}
      {isLoading ? (
        <span
          className={cn(
            'inline-block border-2 border-current border-t-transparent rounded-full animate-spin',
            sizeStyles[size].icon
          )}
        />
      ) : (
        icon && (
          <span className={cn('inline-flex items-center justify-center shrink-0', sizeStyles[size].icon)}>
            {icon}
          </span>
        )
      )}

      {/* Label (masqué pendant le chargement si présent) */}
      {children && <span>{isLoading ? 'Envoi…' : children}</span>}
    </>
  );

  // ─── Rendu polymorphique ──────────────────────────────────────
  // Pour un <a> on ne passe pas `disabled` (attribut HTML invalide sur <a>)
  const componentProps =
    Component === 'a'
      ? { className: classes, ...props }
      : { className: classes, disabled: disabled || isLoading, ...props };

  return <Component {...componentProps}>{content}</Component>;
}

export default Button;