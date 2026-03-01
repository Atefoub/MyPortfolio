import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import {
  NAV_LINKS,
  CV_PATH,
  SCROLL_THRESHOLD,
  NAV_MOBILE_BREAKPOINT,
  NAV_SCROLL_DELAY,
} from '../lib/constants';
import { useDateTime } from '../lib/hooks';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { date, time } = useDateTime();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= NAV_MOBILE_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, NAV_SCROLL_DELAY);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* ── Gauche : DateTime + Logo ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Styles dans index.css (.datetime-block, .datetime-date, etc.) */}
              <div className="datetime-block" aria-label="Date et heure">
                <span className="datetime-date">{date}</span>
                <span className="datetime-time">{time}</span>
              </div>
              <span className="datetime-rule" aria-hidden="true" />
              <Logo />
            </div>

            {/* ── Droite Desktop ── */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="relative text-sm font-medium text-muted-foreground hover:text-accent transition-all duration-300 group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}

              {/* Styles dans index.css (.cv-btn-desktop) */}
              <a
                href={CV_PATH}
                download="CV - Antoine Mourin.pdf"
                className="cv-btn-desktop"
                aria-label="Télécharger mon CV"
              >
                <Download className="w-3.5 h-3.5 cv-btn-icon" />
                <span>Mon CV</span>
              </a>

              <ThemeToggle />
            </div>

            {/* ── Droite Mobile ── */}
            <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted transition-all duration-200"
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Menu mobile ── */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 top-14 sm:top-16 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute top-14 sm:top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden animate-slide-up">
              <div className="flex flex-col px-4 py-3 gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-accent hover:bg-muted transition-all duration-200"
                  >
                    {label}
                  </button>
                ))}

                {/* Styles dans index.css (.cv-btn-mobile-menu) */}
                <a
                  href={CV_PATH}
                  download="CV - Antoine Mourin.pdf"
                  className="cv-btn-mobile-menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <Download className="w-4 h-4" />
                  Télécharger mon CV
                </a>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* ── FAB mobile — styles dans index.css (.cv-fab) ── */}
      <a
        href={CV_PATH}
        download="CV - Antoine Mourin.pdf"
        aria-label="Télécharger mon CV"
        className={`cv-fab md:hidden ${scrolled ? 'cv-fab-visible' : 'cv-fab-hidden'}`}
      >
        <Download className="w-5 h-5" />
        <span className="cv-fab-label">CV</span>
      </a>
    </>
  );
}