import { NavLink } from 'react-router';
import { Download, Home, BookOpen, FolderOpen, Mail } from 'lucide-react';
import { NAV_LINKS, CV_PATH, type ViewId } from '../lib/constants';
import { useDateTime } from '../lib/hooks';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const VIEW_ICONS: Record<ViewId, typeof Home> = {
  hero:     Home,
  parcours: BookOpen,
  projets:  FolderOpen,
  contact:  Mail,
};

function desktopClass(isActive: boolean): string {
  return cn(
    'relative text-sm font-medium transition-all duration-300 group flex items-center self-center',
    isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent',
  );
}

function bottomClass(isActive: boolean): string {
  return cn('bottom-nav-item', isActive && 'bottom-nav-item-active');
}

export default function Navigation() {
  const { date, time } = useDateTime();

  return (
    <>
      {/* ── Navbar desktop ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Gauche : DateTime + Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="datetime-block" aria-label="Date et heure">
                <span className="datetime-date">{date}</span>
                <span className="datetime-time">{time}</span>
              </div>
              <span className="datetime-rule" aria-hidden="true" />
              <Logo />
            </div>

            {/* Droite Desktop : liens + CV + toggle — tout sur la même ligne */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => desktopClass(isActive)}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        className={cn(
                          'absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full',
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}

              <a
                href={CV_PATH}
                download="CV_Antoine_Mourin.pdf"
                className="cv-btn-desktop"
                aria-label="Télécharger mon CV"
              >
                <Download className="w-3.5 h-3.5 cv-btn-icon" />
                <span>Mon CV</span>
              </a>

              {/* ThemeToggle sans min-height imposé par Button */}
              <div className="flex items-center self-center">
                <ThemeToggle />
              </div>
            </div>

            {/* Droite Mobile : uniquement ThemeToggle */}
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
          {NAV_LINKS.map(({ to, label, view }) => {
            const Icon = VIEW_ICONS[view];
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => bottomClass(isActive)}
              >
                {({ isActive }) => (
                  <>
                    <span className={cn('bottom-nav-icon-wrap', isActive && 'bottom-nav-icon-active')}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="bottom-nav-label">{label}</span>
                    {isActive && <span className="bottom-nav-indicator" />}
                  </>
                )}
              </NavLink>
            );
          })}

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