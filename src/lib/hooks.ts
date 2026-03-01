import { useState, useEffect, useCallback } from 'react';
import { CAROUSEL_BREAKPOINTS, FORM_RESET_DELAYS } from './constants';

// ═══════════════════════════════════════════════════════════════
// CUSTOM HOOKS
// ═══════════════════════════════════════════════════════════════

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

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

export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = useCallback(async (data: Record<string, string>) => {
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
  }, [endpoint]);

  return { status, submit };
}