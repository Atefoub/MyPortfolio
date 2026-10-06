import { Link } from 'react-router';
import { ExternalLink, Github } from 'lucide-react';
import { projects, type Project as ProjectType } from '../data/projects';
import { cn } from '../lib/utils';
import SectionHeader from './SectionHeader';

const CASE_IDS = [100, 101, 13] as const;

export default function Projects() {
  const cases = CASE_IDS
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is ProjectType => Boolean(p));
  const caseIds = new Set<number>(CASE_IDS);
  const others = projects
    .filter((p) => !caseIds.has(p.id) && !p.exercise)
    .sort((a, b) => b.id - a.id);
  const exercises = projects.filter((p) => p.exercise);

  return (
    <section id="projects" className="work-page">
      <div className="work-inner">
        <SectionHeader
          index="03 — Sélection"
          title="Projets"
          lede="Trois travaux où il y avait un vrai problème à résoudre. Le reste est plus bas, sans faire écran."
        />

        <div className="case-list">
          {cases.map((project, index) => (
            <CaseStudy key={project.id} project={project} index={index} flip={index % 2 === 1} />
          ))}
        </div>

        <div className="archive-block">
          <h2 className="archive-title">À côté</h2>
          <p className="archive-lede">
            Des projets plus courts, déjà en ligne.
          </p>
          <ul className="archive">
            {others.map((project) => (
              <ArchiveRow key={project.id} project={project} />
            ))}
          </ul>

          {exercises.length > 0 && (
            <details className="exercise-fold">
              <summary>
                Exercices de formation
                <span className="exercise-count">{exercises.length}</span>
              </summary>
              <ul className="archive">
                {exercises.map((project) => (
                  <ArchiveRow key={project.id} project={project} compact />
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({
  project,
  index,
  flip,
}: {
  project: ProjectType;
  index: number;
  flip: boolean;
}) {
  const stack = project.technologies.slice(0, 6).join('  ·  ');
  const extra = project.technologies.length - 6;

  return (
    <article className={cn('case-layout', flip && 'case-layout-flip')}>
      <div className="case-visual">
        {project.image ? (
          <img className="case-img" src={project.image} alt={project.title} />
        ) : (
          <div className="case-mark">
            <p className="case-mark-kicker">Audencia · DTSI</p>
            <p className="case-mark-figure">J-7</p>
            <p className="case-mark-caption">Le délai avant lequel les convocations partent seules.</p>
          </div>
        )}
      </div>

      <div>
        <p className="case-kicker">
          0{index + 1}
          {'  ·  '}
          {project.inProgress ? 'En cours' : project.date}
        </p>
        <h2 className="case-title">{project.title}</h2>
        <p className="case-lead">{project.lead ?? project.description}</p>
        {project.notes && project.notes.length > 0 && (
          <ul className="case-notes">
            {project.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
        {project.collaboration && <p className="case-collab">{project.collaboration}</p>}
        <p className="case-stack">
          {stack}
          {extra > 0 ? `  ·  +${extra}` : ''}
        </p>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ArchiveRow({ project, compact = false }: { project: ProjectType; compact?: boolean }) {
  return (
    <li className="archive-row">
      <span className="archive-date">{project.date}</span>
      <div>
        <h3 className="archive-name">{project.title}</h3>
        {!compact && (
          <p className="archive-line">{project.lead ?? project.description}</p>
        )}
      </div>
      <span className="archive-links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer">Démo</a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">Code</a>
        )}
      </span>
    </li>
  );
}

function ProjectLinks({ project }: { project: ProjectType }) {
  return (
    <div className="case-links">
      {project.demo && (
        <a className="case-link case-link-solid" href={project.demo} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4" />
          Démo
        </a>
      )}
      {project.github && (
        <a
          className={cn('case-link', project.demo ? 'case-link-ghost' : 'case-link-solid')}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" />
          Code
        </a>
      )}
      {project.internalPath && (
        <Link className="case-link case-link-solid" to={project.internalPath}>
          Voir dans le parcours
        </Link>
      )}
      {project.inProgress && !project.demo && (
        <span className="case-link case-link-ghost">Démo bientôt</span>
      )}
    </div>
  );
}
