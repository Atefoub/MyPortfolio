import { useGithubLanguages } from '../lib/useGithubLanguages';

const LANG_COLORS: Record<string, string> = {
  // Langages
  TypeScript:     '#3178c6',
  JavaScript:     '#f7df1e',
  Python:         '#3572A5',
  HTML:           '#e34c26',
  CSS:            '#563d7c',
  SCSS:           '#c6538c',
  Shell:          '#89e051',
  Makefile:       '#427819',
  Dockerfile:     '#384d54',
  Rust:           '#dea584',
  Go:             '#00ADD8',
  Java:           '#b07219',
  'C++':          '#f34b7d',
  C:              '#555555',
  Ruby:           '#701516',
  PHP:            '#4F5D95',
  // Frameworks & librairies
  React:          '#61dafb',
  'Vue.js':       '#41b883',
  Angular:        '#dd0031',
  'Node.js':      '#339933',
  Express:        '#68a063',
  Vite:           '#646cff',
  'Tailwind CSS': '#38bdf8',
  Bootstrap:      '#7952b3',
  Recharts:       '#22b5bf',
  'shadcn/ui':    '#18181b',
  'Lucide React': '#f97316',
  Plyr:           '#00b3e6',
  // BDD & backend
  PostgreSQL:     '#336791',
  Neon:           '#00e599',
  Prisma:         '#0c344b',
  'API REST':     '#99c6c4',
  GraphQL:        '#e10098',
  JWT:            '#d63aff',
  // DevOps & outils
  Git:            '#f05032',
  GitHub:         '#181717',
  Docker:         '#2496ed',
  'CI/CD':        '#fc6d26',
  Jest:           '#c21325',
  Cypress:        '#69d3a7',
  PWA:            '#5a0fc8',
  // Design & UI
  Figma:          '#f24e1e',
  Penpot:         '#7b61ff',
  Miro:           '#050038',
  Coolors:        '#3d5a80',
  // Outils métier
  SAP:            '#0faaff',
  'Power Automate':'#0066ff',
  VBA:            '#867db1',
  Obsidian:       '#7c3aed',
};

const DEFAULT_COLOR = '#99c6c4';

// Catégories manuelles tirées du CV + favoris
const CATEGORIES: { label: string; items: string[] }[] = [
  {
    label: 'Langages',
    items: ['TypeScript', 'JavaScript', 'Python', 'HTML', 'CSS', 'SCSS'],
  },
  {
    label: 'Frameworks & UI',
    items: ['React', 'Node.js', 'Express', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Lucide React', 'Bootstrap', 'Plyr'],
  },
  {
    label: 'Base de données & API',
    items: ['PostgreSQL', 'Neon', 'Prisma', 'API REST', 'GraphQL', 'JWT'],
  },
  {
    label: 'DevOps & Tests',
    items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Jest', 'Cypress', 'PWA'],
  },
  {
    label: 'Design & Outils',
    items: ['Figma', 'Penpot', 'Miro', 'Coolors', 'Obsidian'],
  },
  {
    label: 'Expertise métier',
    items: ['SAP', 'Power Automate', 'VBA'],
  },
];

function LangBadge({ name }: { name: string }) {
  const color = LANG_COLORS[name] ?? DEFAULT_COLOR;
  return (
    <span className="lang-display-badge" title={name}>
      <span className="lang-dot" style={{ background: color }} />
      {name}
    </span>
  );
}

export default function LanguageFilter() {
  const { languages, loading, error } = useGithubLanguages();

  return (
    <div className="shrink-0 mb-3 sm:mb-4 space-y-3">

      {/* Langages détectés GitHub */}
      <div>
        <p className="lang-section-label">Langages · GitHub</p>
        <div className="flex flex-wrap gap-1.5">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="lang-filter-skeleton" />
              ))
            : !error && languages.map(({ name }) => (
                <LangBadge key={name} name={name} />
              ))
          }
        </div>
        {!loading && !error && languages.length > 0 && (
          <div className="lang-bar mt-1.5">
            {languages.map(({ name, percent }) => (
              <div
                key={name}
                className="lang-bar-segment"
                style={{ width: `${percent}%`, background: LANG_COLORS[name] ?? DEFAULT_COLOR }}
                title={`${name} · ${percent}%`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Catégories manuelles */}
      {CATEGORIES.map(({ label, items }) => (
        <div key={label}>
          <p className="lang-section-label">{label}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((name) => (
              <LangBadge key={name} name={name} />
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}