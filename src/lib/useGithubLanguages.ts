import { useState, useEffect } from 'react';

export interface LanguageStat {
  name: string;
  bytes: number;
  percent: number;
}

const GITHUB_USERNAME = 'Atefoub';

export function useGithubLanguages() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchLanguages() {
      try {
        // 1. Récupère tous les repos publics
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
          { headers: { Accept: 'application/vnd.github.v3+json' } },
        );
        if (!reposRes.ok) throw new Error('repos fetch failed');
        const repos: Array<{ name: string; languages_url: string; fork: boolean }> =
          await reposRes.json();

        // 2. Fetch les langages de chaque repo (en parallèle, on exclut les forks)
        const ownRepos = repos.filter((r) => !r.fork);
        const langMaps = await Promise.all(
          ownRepos.map((r) =>
            fetch(r.languages_url, {
              headers: { Accept: 'application/vnd.github.v3+json' },
            }).then((res) => res.json() as Promise<Record<string, number>>),
          ),
        );

        if (cancelled) return;

        // 3. Agrège les octets par langage
        const totals: Record<string, number> = {};
        for (const map of langMaps) {
          for (const [lang, bytes] of Object.entries(map)) {
            totals[lang] = (totals[lang] ?? 0) + bytes;
          }
        }

        // 4. Calcule les pourcentages et trie par taille décroissante
        const total = Object.values(totals).reduce((a, b) => a + b, 0);
        const stats: LanguageStat[] = Object.entries(totals)
          .map(([name, bytes]) => ({
            name,
            bytes,
            percent: Math.round((bytes / total) * 100),
          }))
          .sort((a, b) => b.bytes - a.bytes);

        setLanguages(stats);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLanguages();
    return () => {
      cancelled = true;
    };
  }, []);

  return { languages, loading, error };
}