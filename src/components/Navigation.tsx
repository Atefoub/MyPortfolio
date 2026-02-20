import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../lib/constants';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fermer le menu au resize vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Laisser le temps au menu de se fermer avant le scroll
    setTimeout(() => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8">
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
            <ThemeToggle />
          </div>

          {/* Boutons mobile */}
          <div className="flex md:hidden items-center gap-2">
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
          {/* Overlay */}
          <div
            className="fixed inset-0 top-16 z-30 bg-foreground/20 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Panneau */}
          <div className="absolute top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border md:hidden animate-slide-up">
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className="text-left px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-accent hover:bg-muted transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}