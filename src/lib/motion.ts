import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NAV_LINKS } from './constants';

export const MOTION = {
  VIEW_TRANSITION_MS: 520,
  BLOCK_REVEAL_MS: 700,
} as const;

function normalizePath(path: string): string {
  return path === '/' ? '/' : path.replace(/\/$/, '');
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersFinePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function canViewTransition(): boolean {
  return 'startViewTransition' in document && !prefersReducedMotion();
}

export function setNavDirection(fromPath: string, toPath: string): void {
  const routes = NAV_LINKS.map((link) => link.to);
  const fromI = routes.indexOf(normalizePath(fromPath));
  const toI = routes.indexOf(normalizePath(toPath));
  const dir = fromI === -1 || toI === -1 || toI >= fromI ? 'forward' : 'back';
  document.documentElement.dataset.navDir = dir;
}

export function viewNavOptions(): { viewTransition?: boolean } {
  return canViewTransition() ? { viewTransition: true } : {};
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = () => setFine(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return fine;
}

export function useViewNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (to: string) => {
      setNavDirection(pathname, to);
      void navigate(to, viewNavOptions());
    },
    [navigate, pathname],
  );
}
