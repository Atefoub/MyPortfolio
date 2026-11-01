import { type ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
  className?: string;
}

export default function SectionHeader({ title, icon, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-1.5 animate-fade-in ${className}`}>
      <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 rounded-full border border-accent/20 w-fit">
        <span className="inline-flex items-center justify-center text-accent w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0">
          {icon}
        </span>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent">
          {title}
        </span>
      </div>
    </div>
  );
}