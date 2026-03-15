import { useEffect } from 'react';
import { Download, Home, BookOpen, FolderOpen, Mail } from 'lucide-react';
import {
  NAV_LINKS,
  CV_PATH,
} from '../lib/constants';
import type { ViewId } from '../lib/constants';
import { useDateTime } from '../lib/hooks';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface NavigationProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

// Icônes pour la bottom bar mobile
const VIEW_ICONS: Record<ViewId, typeof Home> = {
  hero:     Home,
  parcours: BookOpen,
  projects: FolderOpen,
  contact:  Mail,
};

export default function Navigation({ activeView, onNavigate }: NavigationProps) {
  const { date, time } = useDateTime();

  // Plus besoin de bloquer le scroll pour le menu mobile
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleNavClick = (view: ViewId) => {
    onNavigate(view);
  };

  return (
    <>
      {/* ── Navbar desktop (inchangée) ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* ── Gauche : DateTime + Logo ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="datetime-block" aria-label="Date et heure">
                <span className="datetime-date">{date}</span>
                <span className="datetime-time">{time}</span>
              </div>
              <span className="datetime-rule" aria-hidden="true" />
              <Logo />
            </div>

            {/* ── Droite Desktop ── */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map(({ view, label }) => {
                const isActive = activeView === view;
                return (
                  <button
                    key={view}
                    onClick={() => handleNavClick(view)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative text-sm font-medium transition-all duration-300 group',
                      isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent',
                    )}
                  >
                    {label}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </button>
                );
              })}

              <a
                href={CV_PATH}
                download="CV_Antoine_Mourin.pdf"
                className="cv-btn-desktop"
                aria-label="Télécharger mon CV"
              >
                <Download className="w-3.5 h-3.5 cv-btn-icon" />
                <span>Mon CV</span>
              </a>

              <ThemeToggle />
            </div>

            {/* ── Droite Mobile : uniquement ThemeToggle ── */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom Navigation Bar (mobile uniquement) ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bottom-nav"
        aria-label="Navigation principale"
      >
        <div className="flex items-stretch">
          {NAV_LINKS.map(({ view, label }) => {
            const isActive = activeView === view;
            const Icon = VIEW_ICONS[view];
            return (
              <button
                key={view}
                onClick={() => handleNavClick(view)}
                aria-current={isActive ? 'page' : undefined}
                className={cn('bottom-nav-item', isActive && 'bottom-nav-item-active')}
              >
                <span className={cn('bottom-nav-icon-wrap', isActive && 'bottom-nav-icon-active')}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="bottom-nav-label">{label}</span>
                {isActive && <span className="bottom-nav-indicator" />}
              </button>
            );
          })}

          {/* Bouton CV compact */}
          <a
            href={CV_PATH}
            download="CV_Antoine_Mourin.pdf"
            aria-label="Télécharger mon CV"
            className="bottom-nav-cv"
          >
            <span className="bottom-nav-icon-wrap">
              <Download className="w-5 h-5" />
            </span>
            <span className="bottom-nav-label">CV</span>
          </a>
        </div>
      </nav>
    </>
  );
}