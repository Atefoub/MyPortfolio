import { useRef, useEffect, useState, useCallback } from 'react';
import { getSortedProjects, type Project as ProjectType } from '../data/projects';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star, Loader2, ChevronDown } from 'lucide-react';
import { CAROUSEL_CONFIG } from '../lib/constants';
import { useCarousel, useResponsiveItemsCount } from '../lib/hooks';
import { cn } from '../lib/utils';
import Button from './Button';
import SectionHeader from './SectionHeader';

export default function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sortedProjects = getSortedProjects();
  const itemsToShow = useResponsiveItemsCount(CAROUSEL_CONFIG.itemsPerView);
  const { currentIndex, setCurrentIndex, goToNext, goToPrev, maxIndex } = useCarousel(
    sortedProjects,
    itemsToShow,
  );

  // Translate carousel on index change
  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current.querySelector('.carousel-container') as HTMLElement;
      if (container) {
        container.style.setProperty('--translate-x', `-${(currentIndex * 100) / itemsToShow}%`);
      }
    }
  }, [currentIndex, itemsToShow]);

  // ── Touch / swipe support ──────────────────────────────────────
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

      // Ignore principalement les scrolls verticaux
      if (deltaY > Math.abs(deltaX)) return;

      const SWIPE_THRESHOLD = 50;
      if (deltaX > SWIPE_THRESHOLD) goToNext();
      else if (deltaX < -SWIPE_THRESHOLD) goToPrev();

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goToNext, goToPrev],
  );
  // ──────────────────────────────────────────────────────────────

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-muted" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projets" />

        <div className="relative">
          {/* Boutons latéraux — desktop uniquement */}
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

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="overflow-hidden scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="carousel-container flex gap-3 sm:gap-4 md:gap-6 transition-transform duration-500">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} itemsToShow={itemsToShow} />
              ))}
            </div>
          </div>

          {/* Boutons mobile — sous le carousel */}
          <div className="flex sm:hidden justify-center gap-4 mt-5">
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

          <CarouselDots currentIndex={currentIndex} maxIndex={maxIndex} onDotClick={setCurrentIndex} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, itemsToShow }: { project: ProjectType; itemsToShow: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardWidthClass = (
    { 1: 'w-full', 2: 'w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)]', 3: 'w-[calc(33.333%-0.75rem)] sm:w-[calc(33.333%-1rem)]' } as Record<
      number,
      string
    >
  )[itemsToShow] ?? 'w-full';

  const borderClass = project.inProgress
    ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
    : project.featured
      ? 'border-accent shadow-[0_0_0_2px_rgba(153,198,196,0.3)]'
      : 'border-border hover:border-accent';

  return (
    <div
      className={cn(
        'shrink-0 bg-background rounded-lg overflow-hidden border transition-all duration-300 group flex flex-col',
        cardWidthClass,
        borderClass,
      )}
    >
      {project.image && (
        <div className="aspect-video bg-muted overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <ProjectBadge inProgress={project.inProgress} featured={project.featured} />
        </div>
      )}

      <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 flex flex-col flex-1">
        <div>
          <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-1 group-hover:text-accent transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-2">
            {project.date}
          </p>
          <div className="relative">
            <p
              className={cn(
                'text-xs sm:text-sm text-muted-foreground leading-relaxed transition-all duration-300',
                !isExpanded && 'line-clamp-3',
              )}
            >
              {project.description}
            </p>
            {project.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent hover:text-accent/80 transition-colors font-medium"
              >
                {isExpanded ? 'Voir moins' : 'Voir plus'}
                <ChevronDown className={cn('w-3 h-3 transition-transform', isExpanded && 'rotate-180')} />
              </button>
            )}
          </div>
        </div>

        <TechTags technologies={project.technologies} />
        {project.collaboration && (
          <p className="text-[10px] sm:text-xs italic text-muted-foreground">{project.collaboration}</p>
        )}
        <ProjectLinks github={project.github} demo={project.demo} inProgress={project.inProgress} />
      </div>
    </div>
  );
}

function ProjectBadge({ inProgress, featured }: { inProgress?: boolean; featured?: boolean }) {
  if (inProgress) {
    return (
      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1 md:gap-1.5 shadow-lg animate-pulse">
        <Loader2 className="w-2.5 h-2.5 animate-spin" />
        En cours
      </div>
    );
  }
  if (featured) {
    return (
      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-accent text-accent-foreground px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1 shadow-lg">
        <Star className="w-2.5 h-2.5 fill-current" />
        Projet phare
      </div>
    );
  }
  return null;
}

function TechTags({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
      {technologies.slice(0, 5).map((tech) => (
        <span
          key={tech}
          className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-muted text-[10px] sm:text-xs rounded-full text-muted-foreground"
        >
          {tech}
        </span>
      ))}
      {technologies.length > 5 && (
        <span className="px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 bg-muted text-[10px] sm:text-xs rounded-full text-muted-foreground">
          +{technologies.length - 5}
        </span>
      )}
    </div>
  );
}

function ProjectLinks({
  github,
  demo,
  inProgress,
}: {
  github?: string;
  demo?: string;
  inProgress?: boolean;
}) {
  return (
    <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2 mt-auto">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          Code
        </a>
      )}
      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          Démo
        </a>
      ) : (
        inProgress && (
          <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm text-muted-foreground">
            <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            Démo bientôt
          </span>
        )
      )}
    </div>
  );
}

function CarouselDots({
  currentIndex,
  maxIndex,
  onDotClick,
}: {
  currentIndex: number;
  maxIndex: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-5 sm:mt-6 md:mt-8">
      {Array.from({ length: maxIndex + 1 }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Aller au groupe de projets ${index + 1}`}
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent',
          )}
        />
      ))}
    </div>
  );
}