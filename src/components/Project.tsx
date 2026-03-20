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

  // Largeur du viewport carousel (desktop uniquement — mobile utilise width naturelle)
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!viewportRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const GAP = 16;
  const cardWidth = viewportWidth > 0
    ? (viewportWidth - GAP * (itemsToShow - 1)) / itemsToShow
    : 0;
  const trackOffset = currentIndex * (cardWidth + GAP);

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

  // ── Mobile : carousel simple, une carte à la fois, hauteur naturelle ──
  if (isMobile) {
    const project = sortedProjects[currentIndex];
    return (
      <section id="projects" className="projects-section-mobile flex flex-col px-4 bg-muted">
        <div className="w-full flex flex-col py-3 gap-3">

          <SectionHeader
            title="Projets"
            icon={<FolderOpen className="w-3.5 h-3.5" />}
          />

          {/* Carte mobile */}
          <div
            className="w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <MobileCard project={project} />
          </div>

          {/* Contrôles */}
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
                {currentIndex + 1} / {sortedProjects.length}
              </span>
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
            <ScrollBar currentIndex={currentIndex} maxIndex={maxIndex} onDotClick={setCurrentIndex} />
          </div>

        </div>
      </section>
    );
  }

  // ── Desktop : carousel avec flip cards ──
  return (
    <section
      id="projects"
      className="projects-section flex flex-col px-6 md:px-8 lg:px-16 bg-muted overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 min-h-0 py-4 md:py-8">

        <div className="shrink-0 mb-3 md:mb-5">
          <SectionHeader
            title="Projets"
            icon={<FolderOpen className="w-4 h-4" />}
          />
        </div>

        <div className="flex flex-1 min-h-0 gap-6">

          <aside className="projects-sidebar hidden md:flex flex-col">
            <LanguageFilter />
          </aside>

          <div className="flex flex-col flex-1 min-h-0 min-w-0">
            <div className="relative flex-1 min-h-0">

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

              <div
                ref={viewportRef}
                className="absolute inset-0 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ gap: `${GAP}px`, transform: `translateX(-${trackOffset}px)` }}
                >
                  {sortedProjects.map((project) => (
                    <DesktopFlipCard
                      key={project.id}
                      project={project}
                      cardWidth={cardWidth}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 mt-3 flex flex-col gap-2">
              <ScrollBar currentIndex={currentIndex} maxIndex={maxIndex} onDotClick={setCurrentIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Carte mobile : image entière + tout le texte ──────────────────────── */
function MobileCard({ project }: { project: ProjectType }) {
  const borderClass = project.inProgress
    ? 'border-blue-500'
    : project.featured
      ? 'border-accent'
      : 'border-border';

  return (
    <div className={cn('rounded-xl border overflow-hidden bg-background', borderClass)}>

      {/* Image — ratio 16/9, entière, pas croppée sur les côtés */}
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

      {/* Détails */}
      <div className="p-3 flex flex-col gap-2">

        {/* Badges statut */}
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

        {/* Titre + date */}
        <div>
          <h3 className="text-sm font-bold leading-snug text-foreground">{project.title}</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{project.date}</p>
        </div>

        {/* Description complète */}
        <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Collaboration */}
        {project.collaboration && (
          <p className="text-[10px] italic text-muted-foreground border-l-2 border-accent/40 pl-2">
            {project.collaboration}
          </p>
        )}

        {/* Technos — toutes affichées */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 bg-muted text-[9px] rounded-full text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {/* Liens */}
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

/* ─── Flip card desktop ─────────────────────────────────────────────────── */
function DesktopFlipCard({ project, cardWidth }: { project: ProjectType; cardWidth: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const borderClass = project.inProgress
    ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
    : project.featured
      ? 'border-accent shadow-[0_0_0_2px_rgba(153,198,196,0.3)]'
      : 'border-border';

  return (
    <div className="pcard-root shrink-0 h-full" style={{ width: `${cardWidth}px` }}>
      <div className={cn('pcard-inner', isFlipped && 'pcard-flipped')}>

        <div
          className={cn('pcard-face rounded-lg border cursor-pointer', borderClass)}
          onClick={() => setIsFlipped(true)}
          role="button" tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(true)}
          aria-label={`Voir les détails de ${project.title}`}
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="pcard-img" loading="lazy" />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Aucune image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          <ProjectBadge inProgress={project.inProgress} featured={project.featured} />
          <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">
            Cliquer pour les détails
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-white font-bold text-sm leading-snug drop-shadow line-clamp-2">{project.title}</h3>
            <p className="text-white/70 text-[10px] mt-0.5">{project.date}</p>
          </div>
        </div>

        <div className={cn('pcard-face pcard-back rounded-lg border bg-background', borderClass)}>
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-accent text-accent-foreground
                       flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Retourner la carte"
          >
            <span className="text-xs">↩</span>
          </button>
          <div className="absolute inset-0 overflow-y-auto scrollbar-hide p-3 flex flex-col gap-2">
            <div className="pr-7">
              <h3 className="text-xs font-bold leading-snug text-foreground">{project.title}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">{project.date}</p>
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
            <p className="text-[10px] text-muted-foreground leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-0.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-1.5 py-0.5 bg-muted text-[8px] rounded-full text-muted-foreground">{tech}</span>
              ))}
            </div>
            {project.collaboration && (
              <p className="text-[8px] italic text-muted-foreground border-l-2 border-accent/40 pl-1.5">{project.collaboration}</p>
            )}
            <div className="flex gap-2 mt-auto pt-1">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-3 h-3" /> Code
                </a>
              )}
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3 h-3" /> Démo
                </a>
              ) : project.inProgress ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
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

function ScrollBar({ currentIndex, maxIndex, onDotClick }: {
  currentIndex: number; maxIndex: number; onDotClick: (i: number) => void;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!thumbRef.current || maxIndex === 0) return;
    const w = 100 / (maxIndex + 1);
    const l = (currentIndex / maxIndex) * (100 - w);
    thumbRef.current.style.width = `${w}%`;
    thumbRef.current.style.left = `${l}%`;
  }, [currentIndex, maxIndex]);
  if (maxIndex === 0) return null;
  return (
    <div className="px-2">
      <div className="relative h-1.5 bg-border rounded-full cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          onDotClick(Math.max(0, Math.min(Math.round(ratio * maxIndex), maxIndex)));
        }}>
        <div ref={thumbRef} className="absolute top-0 h-full bg-accent rounded-full transition-all duration-300" />
      </div>
    </div>
  );
}