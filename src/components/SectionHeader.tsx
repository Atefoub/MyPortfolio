import { type ReactNode } from 'react';
import { ANIMATION_DELAYS } from '../lib/constants';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export default function SectionHeader({ title, subtitle, icon, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-16 animate-fade-in ${className}`}>
      {icon && (
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
          {icon}
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {title}
          </span>
        </div>
      )}
      
      {!icon && (
        <>
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-4">{title}</h2>
          <div className="w-20 h-1 bg-accent" />
        </>
      )}
      
      {subtitle && (
        <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mt-6 ${ANIMATION_DELAYS.SHORT}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}