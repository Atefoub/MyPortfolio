import { type ReactNode } from 'react';
import { ANIMATION_DELAYS } from '../lib/constants';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * En-tête de section réutilisable.
 *
 * - Avec `icon` : affiche un badge pill coloré (style "Mon Histoire")
 * - Sans `icon` : affiche un h2 + barre accent (style "Projets", "Contact")
 * - `subtitle` : paragraphe descriptif optionnel sous le titre
 */
export default function SectionHeader({
  title,
  subtitle,
  icon,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 sm:mb-10 md:mb-16 animate-fade-in ${className}`}>
      {icon && (
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 rounded-full border border-accent/20">
          {icon}
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-accent">
            {title}
          </span>
        </div>
      )}

      {!icon && (
        <>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {title}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-accent" />
        </>
      )}

      {subtitle && (
        <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mt-3 sm:mt-4 animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}