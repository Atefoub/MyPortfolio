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
  RotateCcw,
  FolderOpen,
} from 'lucide-react';
import { CAROUSEL_CONFIG, SWIPE_THRESHOLD } from '../lib/constants';
import { useCarousel, useResponsiveItemsCount } from '../lib/hooks';
import { cn } from '../lib/utils';
import SectionHeader from './SectionHeader';
import LanguageFilter from './LanguageFilter';

export default function Projects() {
  const sortedProjects = getSortedProjects();
  const itemsToShow = useResponsiveItemsCount(CAROUSEL_CONFIG.itemsPerView);
  const { currentIndex, setCurrentIndex, goToNext, goToPrev, maxIndex } = useCarousel(
    sortedProjects,
    itemsToShow,
  );

  // Mesure la largeur réelle du viewport carousel
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (!viewportRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const GAP = 16; // px — gap-4
  const cardWidth = viewportWidth > 0
    ? (viewportWidth - GAP * (itemsToShow - 1)) / itemsToShow
    : 0;
  const trackOffset = currentIndex * (cardWidth + GAP);

  // Swipe touch
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (deltaY > Math.abs(deltaX)) return;
    if (deltaX > SWIPE_THRESHOLD) goToNext();
    else if (deltaX < -SWIPE_THRESHOLD) goToPrev();
    touchStartX.current = null;
    touchStartY.current = null;
  }, [goToNext, goToPrev]);

  return (
    <section
      id="projects"
      className="projects-section flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 bg-muted overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0 py-2 sm:py-4 md:py-8">

        <div className="shrink-0 mb-2 sm:mb-3 md:mb-5">
          <SectionHeader
            title="Projets"
            icon={<FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          />
        </div>

        <div className="flex flex-1 min-h-0 gap-4 lg:gap-6">

          {/* Sidebar langages — desktop uniquement */}
          <aside className="projects-sidebar hidden md:flex flex-col">
            <LanguageFilter />
          </aside>

          {/* Colonne carousel */}
          <div className="flex flex-col flex-1 min-h-0 min-w-0">

            {/* Zone relative pour positionner les boutons */}
            <div className="relative flex-1 min-h-0">

              {/* Bouton gauche desktop */}
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                aria-label="Projet précédent"
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20
                           w-8 h-8 rounded-full bg-accent text-accent-foreground
                           items-center justify-center shadow-md
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Bouton droit desktop */}
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Projet suivant"
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20
                           w-8 h-8 rounded-full bg-accent text-accent-foreground
                           items-center justify-center shadow-md
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:scale-110 active:scale-95 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Viewport — overflow hidden, remplit l'espace disponible */}
              <div
                ref={viewportRef}
                className="absolute inset-0 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Track en pixels — garantit l'absence de débordement */}
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    gap: `${GAP}px`,
                    transform: `translateX(-${trackOffset}px)`,
                  }}
                >
                  {sortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      cardWidth={cardWidth}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Contrôles sous le carousel */}
            <div className="shrink-0 mt-2 sm:mt-3 flex flex-col gap-2">
              {/* Flèches mobile */}
              <div className="flex sm:hidden justify-center gap-4">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  aria-label="Projet précédent"
                  className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center
                             disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Projet suivant"
                  className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center
                             disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Barre de progression */}
              <ScrollBar
                currentIndex={currentIndex}
                maxIndex={maxIndex}
                onDotClick={setCurrentIndex}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Carte projet ──────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  cardWidth,
}: {
  project: ProjectType;
  cardWidth: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const borderClass = project.inProgress
    ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
    : project.featured
      ? 'border-accent shadow-[0_0_0_2px_rgba(153,198,196,0.3)]'
      : 'border-border';

  return (
    <div
      className="pcard-root shrink-0 h-full"
      style={{ width: `${cardWidth}px` }}
    >
      <div className={cn('pcard-inner', isFlipped && 'pcard-flipped')}>

        {/* ── Face avant ── */}
        <div
          className={cn('pcard-face rounded-lg border cursor-pointer', borderClass)}
          onClick={() => setIsFlipped(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(true)}
          aria-label={`Voir les détails de ${project.title}`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="pcard-img"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Aucune image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          <ProjectBadge inProgress={project.inProgress} featured={project.featured} />

          <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-medium">
            Cliquer pour les détails
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
            <h3 className="text-white font-bold text-xs sm:text-sm leading-snug drop-shadow line-clamp-2">
              {project.title}
            </h3>
            <p className="text-white/70 text-[9px] sm:text-[10px] mt-0.5">{project.date}</p>
          </div>
        </div>

        {/* ── Face arrière ── */}
        <div className={cn('pcard-face pcard-back rounded-lg border bg-background', borderClass)}>
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-accent text-accent-foreground
                       flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Retourner la carte"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <div className="absolute inset-0 overflow-y-auto scrollbar-hide p-2 sm:p-3 flex flex-col gap-1.5">
            <div className="pr-7">
              <h3 className="text-[11px] sm:text-xs font-bold leading-snug text-foreground">
                {project.title}
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{project.date}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.inProgress && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-full text-[8px] font-semibold">
                  <Loader2 className="w-2 h-2 animate-spin" /> En cours
                </span>
              )}
              {project.featured && !project.inProgress && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-accent/20 text-accent-foreground border border-accent/40 rounded-full text-[8px] font-semibold">
                  <Star className="w-2 h-2 fill-current" /> Projet phare
                </span>
              )}
            </div>

            <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-0.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-1 sm:px-1.5 py-0.5 bg-muted text-[7px] sm:text-[8px] rounded-full text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>

            {project.collaboration && (
              <p className="text-[8px] italic text-muted-foreground border-l-2 border-accent/40 pl-1.5">
                {project.collaboration}
              </p>
            )}

            <div className="flex gap-2 mt-auto pt-1">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-3 h-3" /> Code
                </a>
              )}
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3 h-3" /> Démo
                </a>
              ) : project.inProgress ? (
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground">
                  <ExternalLink className="w-3 h-3" /> Démo bientôt
                </span>
              ) : null}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProjectBadge({ inProgress, featured }: { inProgress?: boolean; featured?: boolean }) {
  if (inProgress) return (
    <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-[8px] font-semibold flex items-center gap-1 shadow-lg animate-pulse">
      <Loader2 className="w-2 h-2 animate-spin" /> En cours
    </div>
  );
  if (featured) return (
    <div className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full text-[8px] font-semibold flex items-center gap-1 shadow-lg">
      <Star className="w-2 h-2 fill-current" /> Projet phare
    </div>
  );
  return null;
}

/* ─── Barre de progression ──────────────────────────────────────────────── */
function ScrollBar({
  currentIndex,
  maxIndex,
  onDotClick,
}: {
  currentIndex: number;
  maxIndex: number;
  onDotClick: (index: number) => void;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbRef.current || maxIndex === 0) return;
    const thumbWidth = 100 / (maxIndex + 1);
    const thumbLeft = (currentIndex / maxIndex) * (100 - thumbWidth);
    thumbRef.current.style.width = `${thumbWidth}%`;
    thumbRef.current.style.left = `${thumbLeft}%`;
  }, [currentIndex, maxIndex]);

  if (maxIndex === 0) return null;

  return (
    <div className="px-2">
      <div
        className="relative h-1.5 bg-border rounded-full cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          const index = Math.round(ratio * maxIndex);
          onDotClick(Math.max(0, Math.min(index, maxIndex)));
        }}
      >
        <div ref={thumbRef} className="absolute top-0 h-full bg-accent rounded-full transition-all duration-300" />
      </div>
    </div>
  );
}