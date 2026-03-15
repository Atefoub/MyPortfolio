import { useRef, useCallback, useState } from 'react';
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
} from 'lucide-react';
import { CAROUSEL_CONFIG, SWIPE_THRESHOLD } from '../lib/constants';
import { useCarousel, useResponsiveItemsCount } from '../lib/hooks';
import { cn } from '../lib/utils';
import Button from './Button';
import SectionHeader from './SectionHeader';
import LanguageFilter from './LanguageFilter';

const CARD_WIDTH_BY_ITEMS_COUNT: Record<1 | 2 | 3, string> = {
  1: 'w-full',
  2: 'w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)]',
  3: 'w-[calc(33.333%-0.75rem)] sm:w-[calc(33.333%-1rem)]',
};

export default function Projects() {
  const sortedProjects = getSortedProjects();

  const itemsToShow = useResponsiveItemsCount(CAROUSEL_CONFIG.itemsPerView);
  const { currentIndex, setCurrentIndex, goToNext, goToPrev, maxIndex } = useCarousel(
    sortedProjects,
    itemsToShow,
  );

  const translateX = `-${(currentIndex * 100) / itemsToShow}%`;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  return (
    <section
      id="projects"
      className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 bg-muted overflow-hidden"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <style>{`@media (min-width: 640px) { #projects { height: calc(100vh - 64px); } }`}</style>

      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0 py-4 sm:py-6 md:py-8">

        <div className="shrink-0">
          <SectionHeader title="Projets" className="mb-3 sm:mb-4 md:mb-5" />
        </div>

        {/* Layout : panneau latéral gauche (desktop) + carousel */}
        <div className="flex flex-1 min-h-0 gap-4 lg:gap-6">

          {/* ── Panneau langages — desktop uniquement ── */}
          <aside className="projects-sidebar hidden md:flex flex-col">
            <LanguageFilter />
          </aside>

          {/* ── Carousel ── */}
          <div className="flex flex-col flex-1 min-h-0 min-w-0">
            <div className="relative flex flex-col flex-1 min-h-0">

              {/* Boutons latéraux desktop */}
              <Button
                variant="primary"
                size="md"
                icon={<ChevronLeft />}
                onClick={goToPrev}
                disabled={currentIndex === 0}
                aria-label="Projet précédent"
                className="hidden sm:inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
              />
              <Button
                variant="primary"
                size="md"
                icon={<ChevronRight />}
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Projet suivant"
                className="hidden sm:inline-flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
              />

              {/* Carousel track */}
              <div
                className="overflow-hidden scrollbar-hide flex-1 min-h-0"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex gap-3 sm:gap-4 transition-transform duration-500 h-full"
                  style={{ transform: `translateX(${translateX})` }}
                >
                  {sortedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} itemsToShow={itemsToShow} />
                  ))}
                </div>
              </div>

              {/* Boutons mobile */}
              <div className="flex sm:hidden justify-center gap-4 mt-3 shrink-0">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  aria-label="Projet précédent"
                  className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Projet suivant"
                  className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-opacity active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Barre de progression */}
              <div className="shrink-0 mt-2 sm:mt-3">
                <ScrollBar currentIndex={currentIndex} maxIndex={maxIndex} onDotClick={setCurrentIndex} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, itemsToShow }: { project: ProjectType; itemsToShow: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardWidthClass = CARD_WIDTH_BY_ITEMS_COUNT[itemsToShow as 1 | 2 | 3] ?? 'w-full';

  const borderClass = project.inProgress
    ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
    : project.featured
      ? 'border-accent shadow-[0_0_0_2px_rgba(153,198,196,0.3)]'
      : 'border-border';

  return (
    <div className={cn('flip-card shrink-0 h-full', cardWidthClass)}>
      <div className={cn('flip-card-inner', isFlipped && 'flipped')}>

        {/* ── FACE AVANT ── */}
        <div
          className={cn(
            'flip-card-front rounded-lg border overflow-hidden cursor-pointer',
            borderClass,
          )}
          onClick={() => setIsFlipped(true)}
          role="button"
          aria-label={`Voir les détails de ${project.title}`}
        >
          <div className="relative w-full h-full">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Aucune image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <ProjectBadge inProgress={project.inProgress} featured={project.featured} />
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
              <h3 className="text-white font-bold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                {project.title}
              </h3>
              <p className="text-white/70 text-[9px] sm:text-[10px] mt-0.5">{project.date}</p>
            </div>
            <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full font-medium">
              Cliquer pour les détails
            </div>
          </div>
        </div>

        {/* ── FACE ARRIÈRE ── */}
        <div
          className={cn(
            'flip-card-back rounded-lg border overflow-hidden bg-background',
            borderClass,
          )}
        >
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Retourner la carte"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          <div className="h-full overflow-y-auto scrollbar-hide p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2">
            <div className="pr-7">
              <h3 className="text-[11px] sm:text-xs md:text-sm font-bold leading-snug text-foreground">
                {project.title}
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{project.date}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.inProgress && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-full text-[8px] sm:text-[9px] font-semibold">
                  <Loader2 className="w-2 h-2 animate-spin" />
                  En cours
                </span>
              )}
              {project.featured && !project.inProgress && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-accent/20 text-accent-foreground border border-accent/40 rounded-full text-[8px] sm:text-[9px] font-semibold">
                  <Star className="w-2 h-2 fill-current" />
                  Projet phare
                </span>
              )}
            </div>

            <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-1 sm:px-1.5 py-0.5 bg-muted text-[7px] sm:text-[8px] md:text-[9px] rounded-full text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.collaboration && (
              <p className="text-[8px] sm:text-[9px] italic text-muted-foreground border-l-2 border-accent/40 pl-1.5">
                {project.collaboration}
              </p>
            )}

            <div className="flex gap-2 mt-auto pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  Code
                </a>
              )}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  Démo
                </a>
              ) : (
                project.inProgress && (
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground">
                    <ExternalLink className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                    Démo bientôt
                  </span>
                )
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProjectBadge({ inProgress, featured }: { inProgress?: boolean; featured?: boolean }) {
  if (inProgress) {
    return (
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 shadow-lg animate-pulse">
        <Loader2 className="w-2 h-2 animate-spin" />
        En cours
      </div>
    );
  }
  if (featured) {
    return (
      <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 shadow-lg">
        <Star className="w-2 h-2 fill-current" />
        Projet phare
      </div>
    );
  }
  return null;
}

function ScrollBar({
  currentIndex,
  maxIndex,
  onDotClick,
}: {
  currentIndex: number;
  maxIndex: number;
  onDotClick: (index: number) => void;
}) {
  if (maxIndex === 0) return null;

  const thumbWidth = 100 / (maxIndex + 1);
  const thumbLeft = (currentIndex / maxIndex) * (100 - thumbWidth);

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
        <div
          className="absolute top-0 h-full bg-accent rounded-full transition-all duration-300"
          style={{
            width: `${thumbWidth}%`,
            left: `${thumbLeft}%`,
          }}
        />
      </div>
    </div>
  );
}