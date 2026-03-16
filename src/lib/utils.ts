import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Résout un chemin d'asset en tenant compte du `base` Vite.
 * Fonctionne en local (base = "/") et en prod GitHub Pages (base = "/MyPortfolio/").
 * Usage : assetPath("images/hero.jpg") → "/MyPortfolio/images/hero.jpg"
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}