import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_LINKS } from '../lib/constants';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const CV_PATH = '/images/projects/CV - Antoine Mourin.pdf';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détecte si on a scrollé pour afficher le FAB mobile
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
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
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Logo />

            {/* Liens desktop */}
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

              {/* ── Bouton CV desktop ── */}
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

            {/* Boutons mobile */}
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

        {/* Menu mobile */}
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

                {/* ── Lien CV dans le menu mobile ── */}
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

      {/* ── FAB mobile — apparaît après 300px de scroll ── */}
      <a
        href={CV_PATH}
        download="CV - Antoine Mourin.pdf"
        aria-label="Télécharger mon CV"
        className={`cv-fab md:hidden ${scrolled ? 'cv-fab-visible' : 'cv-fab-hidden'}`}
      >
        <Download className="w-5 h-5" />
        <span className="cv-fab-label">CV</span>
      </a>

      <style>{`
        /* ═══ BOUTON CV DESKTOP ═══ */
        .cv-btn-desktop {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--color-accent-foreground);
          background: var(--color-accent);
          border: 1.5px solid transparent;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }
        .cv-btn-desktop:hover {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 4px 18px rgba(153, 198, 196, 0.45);
          background: var(--color-sage);
        }
        .cv-btn-desktop:active {
          transform: scale(0.97);
        }
        /* Icône avec micro-animation au hover */
        .cv-btn-desktop:hover .cv-btn-icon {
          animation: cv-bounce 0.4s ease;
        }
        @keyframes cv-bounce {
          0%   { transform: translateY(0); }
          40%  { transform: translateY(3px); }
          70%  { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }

        /* ═══ BOUTON CV DANS LE MENU MOBILE ═══ */
        .cv-btn-mobile-menu {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--color-accent-foreground);
          background: var(--color-accent);
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .cv-btn-mobile-menu:hover {
          background: var(--color-sage);
          transform: translateX(4px);
        }

        /* ═══ FAB MOBILE ═══ */
        .cv-fab {
          position: fixed;
          bottom: 24px;
          right: 20px;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 13px 18px;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-accent-foreground);
          background: var(--color-accent);
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(153, 198, 196, 0.5), 0 1px 4px rgba(0,0,0,0.1);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.25s ease,
                      box-shadow 0.2s ease;
        }
        .cv-fab:hover {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 8px 32px rgba(153, 198, 196, 0.6);
        }
        .cv-fab:active {
          transform: scale(0.95);
        }
        .cv-fab-label {
          font-weight: 700;
          letter-spacing: 0.03em;
        }
        /* Apparition / disparition */
        .cv-fab-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .cv-fab-hidden {
          opacity: 0;
          transform: translateY(16px) scale(0.9);
          pointer-events: none;
        }

        /* ═══ Pulse subtil sur le FAB pour attirer l'œil ═══ */
        .cv-fab-visible::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: var(--color-accent);
          animation: fab-pulse 2.5s ease-out infinite;
          z-index: -1;
        }
        @keyframes fab-pulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}