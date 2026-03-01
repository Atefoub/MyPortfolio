import { useState, useEffect, useCallback } from 'react';
import { CAROUSEL_BREAKPOINTS, FORM_RESET_DELAYS } from './constants';

// ═══════════════════════════════════════════════════════════════
// CUSTOM HOOKS
// ═══════════════════════════════════════════════════════════════

/**
 * Gestion du thème clair/sombre.
 *
 * Le choix de l'utilisateur est persisté dans localStorage.
 * Si aucun choix n'existe, on suit `prefers-color-scheme`.
 * Note : un flash (~50ms) peut apparaître au premier rendu si le thème
 * sauvegardé diffère du thème système — c'est le compromis sans script HTML.
 */
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}

export function useCarousel<T>(items: T[], itemsToShow: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - itemsToShow);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return { currentIndex, setCurrentIndex, goToNext, goToPrev, maxIndex };
}

export function useResponsiveItemsCount(breakpoints: { mobile: number; tablet: number; desktop: number }) {
  const [itemsToShow, setItemsToShow] = useState(breakpoints.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < CAROUSEL_BREAKPOINTS.MOBILE) {
        setItemsToShow(breakpoints.mobile);
      } else if (window.innerWidth < CAROUSEL_BREAKPOINTS.TABLET) {
        setItemsToShow(breakpoints.tablet);
      } else {
        setItemsToShow(breakpoints.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints.mobile, breakpoints.tablet, breakpoints.desktop]);

  return itemsToShow;
}

/**
 * Retourne true si la largeur de fenêtre est inférieure au breakpoint donné.
 * Se met à jour automatiquement au resize.
 */
export function useIsMobile(breakpoint: number): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Retourne la date et l'heure courantes au format français,
 * mises à jour chaque seconde.
 */
export function useDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const date = now.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const time = now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return { date, time };
}

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = useCallback(
    async (data: Record<string, string>) => {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          setStatus('success');
          setTimeout(() => setStatus('idle'), FORM_RESET_DELAYS.SUCCESS);
          return true;
        } else {
          setStatus('error');
          setTimeout(() => setStatus('idle'), FORM_RESET_DELAYS.ERROR);
          return false;
        }
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), FORM_RESET_DELAYS.ERROR);
        return false;
      }
    },
    [endpoint],
  );

  return { status, submit };
}