import { projects, type Project } from '../data/projects';

/**
 * Retourne les projets triés selon l'ordre d'affichage du carousel :
 * 1. Projets `inProgress` en premier
 * 2. Projets `featured` ensuite, triés par `id` décroissant (le plus récent en tête)
 * 3. Tous les autres projets, triés par `id` croissant (ordre chronologique)
 */
export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.inProgress && !b.inProgress) return -1;
    if (!a.inProgress && b.inProgress) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.featured && b.featured) return b.id - a.id;
    return a.id - b.id;
  });
}

/**
 * Filtre les projets par technologie (insensible à la casse).
 */
export function getProjectsByTech(tech: string): Project[] {
  return getSortedProjects().filter((p) =>
    p.technologies.some((t) => t.toLowerCase() === tech.toLowerCase()),
  );
}

/**
 * Retourne uniquement les projets mis en avant.
 */
export function getFeaturedProjects(): Project[] {
  return getSortedProjects().filter((p) => p.featured);
}