import { useRef, useCallback, useState, useEffect } from 'react';
import { type Project as ProjectType } from '../data/projects';
import { getSortedProjects } from '../lib/projectHelpers';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Star,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { SWIPE_THRESHOLD } from '../lib/constants';
import { cn } from '../lib/utils';
import SectionHeader from './SectionHeader';

/* ─── Hook : détecte si on est en mobile ────────────────────────────────── */
function useIsMobileView(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Composant principal ───────────────────────────────────────────────── */
export default function Projects() {
  const sortedProjects = getSortedProjects();
  const total = sortedProjects.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);

  const isMobile = useIsMobileView();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (animating) return;
      const next =
        dir === 'next'
          ? Math.min(currentIndex + 1, total - 1)
          : Math.max(currentIndex - 1, 0);
      if (next === currentIndex) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(next);
        setAnimating(false);
      }, 320);
    },
    [animating, currentIndex, total],
  );

  const goToNext = useCallback(() => navigate('next'), [navigate]);
  const goToPrev = useCallback(() => navigate('prev'), [navigate]);

  const goTo = useCallback(
    (i: number) => {
      if (i === currentIndex || animating) return;
      setDirection(i > currentIndex ? 'next' : 'prev');
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(i);
        setAnimating(false);
      }, 320);
    },
    [animating, currentIndex],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
      if (deltaY > Math.abs(deltaX)) return;
      if (deltaX > SWIPE_THRESHOLD) goToNext();
      else if (deltaX < -SWIPE_THRESHOLD) goToPrev();
      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goToNext, goToPrev],
  );

  const project = sortedProjects[currentIndex];

  /* ── Mobile : carousel simple, une carte à la fois ── */
  if (isMobile) {
    return (
      <section id="projects" className="projects-section-mobile flex flex-col px-4 bg-muted">
        <div className="w-full flex flex-col py-3 gap-3">
          <SectionHeader
            title="Projets"
            icon={<FolderOpen className="w-3.5 h-3.5" />}
          />
          <div
            className="w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <MobileCard project={project} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-center gap-4">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                aria-label="Projet précédent"
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center
                           disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="flex items-center text-xs text-muted-foreground font-medium">
                {currentIndex + 1} / {total}
              </span>
              <button
                onClick={goToNext}
                disabled={currentIndex >= total - 1}
                aria-label="Projet suivant"
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center
                           disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <ScrollBar currentIndex={currentIndex} total={total} onSeek={goTo} />
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop : diapo deux colonnes ── */
  const borderClass = project.inProgress
    ? 'border-blue-500'
    : project.featured
      ? 'border-accent'
      : 'border-border';

  const slideClass = animating
    ? direction === 'next'
      ? 'project-slide-exit-left'
      : 'project-slide-exit-right'
    : 'project-slide-enter';

  return (
    <section
      id="projects"
      className="projects-section flex flex-col px-6 md:px-8 lg:px-16 bg-muted overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0 py-4 md:py-6">

        {/* En-tête */}
        <div className="shrink-0 mb-4 flex items-center justify-between">
          <SectionHeader
            title="Projets"
            icon={<FolderOpen className="w-4 h-4" />}
          />
          <span className="text-sm font-semibold text-muted-foreground tabular-nums">
            <span className="text-foreground">{currentIndex + 1}</span>
            <span className="mx-1 opacity-40">/</span>
            {total}
          </span>
        </div>

        {/* Zone carousel */}
        <div
          className="relative flex-1 min-h-0 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flèche gauche */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0 || animating}
            aria-label="Projet précédent"
            className="project-nav-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Flèche droite */}
          <button
            onClick={goToNext}
            disabled={currentIndex >= total - 1 || animating}
            aria-label="Projet suivant"
            className="project-nav-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Diapo deux colonnes */}
          <div
            key={currentIndex}
            className={cn(
              'flex-1 min-h-0 rounded-xl border overflow-hidden bg-background',
              'grid grid-cols-[45%_55%]',
              borderClass,
              slideClass,
            )}
          >
            {/* Colonne gauche — image */}
            <div className="project-slide-img-col">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Aucune image</span>
                </div>
              )}
            </div>

            {/* Colonne droite — contenu */}
            <div className="project-slide-content-col overflow-y-auto scrollbar-hide p-6 md:p-8 flex flex-col gap-4">

              {/* Badges statut */}
              <div className="flex flex-wrap gap-2">
                {project.inProgress && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold">
                    <Loader2 className="w-3 h-3 animate-spin" /> En cours
                  </span>
                )}
                {project.featured && !project.inProgress && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent-foreground border border-accent/40 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3 fill-current" /> Projet phare
                  </span>
                )}
              </div>

              {/* Titre + date */}
              <div>
                <h2 className="text-2xl font-bold leading-tight text-foreground">
                  {project.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1.5">{project.date}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Collaboration */}
              {project.collaboration && (
                <p className="text-sm italic text-muted-foreground border-l-2 border-accent/50 pl-3">
                  {project.collaboration}
                </p>
              )}

              {/* Technos */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-muted text-xs font-medium rounded-full text-muted-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Liens */}
              <div className="flex gap-3 mt-auto pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-sm font-semibold text-accent-foreground hover:bg-sage hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" /> Démo
                  </a>
                ) : project.inProgress ? (
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                    <ExternalLink className="w-4 h-4" /> Démo bientôt
                  </span>
                ) : null}
              </div>

            </div>
          </div>

          {/* Scrollbar / pagination */}
          <div className="shrink-0 mt-3">
            <ScrollBar currentIndex={currentIndex} total={total} onSeek={goTo} />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Carte mobile (inchangée) ───────────────────────────────────────────── */
function MobileCard({ project }: { project: ProjectType }) {
  const borderClass = project.inProgress
    ? 'border-blue-500'
    : project.featured
      ? 'border-accent'
      : 'border-border';

  return (
    <div className={cn('rounded-xl border overflow-hidden bg-background', borderClass)}>
      {project.image ? (
        <div className="w-full" style={{ aspectRatio: '16/9' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain bg-muted"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full bg-muted flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
          <span className="text-muted-foreground text-xs">Aucune image</span>
        </div>
      )}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {project.inProgress && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-full text-[9px] font-semibold">
              <Loader2 className="w-2.5 h-2.5 animate-spin" /> En cours
            </span>
          )}
          {project.featured && !project.inProgress && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent-foreground border border-accent/40 rounded-full text-[9px] font-semibold">
              <Star className="w-2.5 h-2.5 fill-current" /> Projet phare
            </span>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold leading-snug text-foreground">{project.title}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{project.date}</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
        {project.collaboration && (
          <p className="text-[10px] italic text-muted-foreground border-l-2 border-accent/40 pl-2">
            {project.collaboration}
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 bg-muted text-[9px] rounded-full text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-0.5">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <Github className="w-3.5 h-3.5" /> Code
            </a>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-xs font-medium text-accent-foreground hover:bg-sage hover:text-white transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> Démo
            </a>
          ) : project.inProgress ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
              <ExternalLink className="w-3.5 h-3.5" /> Démo bientôt
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ─── Scrollbar / pagination ────────────────────────────────────────────── */
function ScrollBar({
  currentIndex,
  total,
  onSeek,
}: {
  currentIndex: number;
  total: number;
  onSeek: (i: number) => void;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbRef.current || total <= 1) return;
    const maxIndex = total - 1;
    const w = 100 / total;
    const l = (currentIndex / maxIndex) * (100 - w);
    thumbRef.current.style.width = `${w}%`;
    thumbRef.current.style.left = `${l}%`;
  }, [currentIndex, total]);

  if (total <= 1) return null;

  return (
    <div className="px-2">
      <div
        className="relative h-1.5 bg-border rounded-full cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          onSeek(Math.max(0, Math.min(Math.round(ratio * (total - 1)), total - 1)));
        }}
      >
        <div
          ref={thumbRef}
          className="absolute top-0 h-full bg-accent rounded-full transition-all duration-300"
        />
      </div>
    </div>
  );
}