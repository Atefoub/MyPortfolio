import { useState, useRef, useEffect, useCallback } from 'react';
import { getSortedProjects, type Project as ProjectType } from '../data/projects';
import { ChevronLeft, ChevronRight, ExternalLink, Github, Star, Loader2, ChevronDown } from 'lucide-react';
import Button from './Button';
import { cn } from '../lib/utils';

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsPerView = { mobile: 1, tablet: 2, desktop: 3 };
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  const sortedProjects = getSortedProjects();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(itemsPerView.mobile);
      else if (window.innerWidth < 1024) setItemsToShow(itemsPerView.tablet);
      else setItemsToShow(itemsPerView.desktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView.desktop, itemsPerView.mobile, itemsPerView.tablet]);

  const maxIndex = Math.max(0, sortedProjects.length - itemsToShow);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth / itemsToShow;
      carouselRef.current.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
    }
  }, [currentIndex, itemsToShow]);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-muted" id="projects">
      <div className="max-w-7xl mx-auto">

        {/* ── Titre ───────────────────────────────────────────── */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold mb-4">Projets</h2>
          <div className="w-20 h-1 bg-accent"></div>
        </div>

        {/* ── Carrousel ───────────────────────────────────────── */}
        <div className="relative">

          {/* Flèche précédente */}
          <Button
            variant="primary"
            size="md"
            icon={<ChevronLeft />}
            onClick={goToPrev}
            disabled={currentIndex === 0}
            aria-label="Projet précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
          />

          {/* Flèche suivante */}
          <Button
            variant="primary"
            size="md"
            icon={<ChevronRight />}
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Projet suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
          />

          {/* Container des cartes */}
          <div ref={carouselRef} className="overflow-hidden scrollbar-hide">
            <div
              className="flex gap-6 transition-transform duration-500"
              style={{ transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)` }}
            >
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} itemsToShow={itemsToShow} />
              ))}
            </div>
          </div>

          {/* ── Indicateurs (dots) ──────────────────────────── */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller au groupe de projets ${index + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Carte projet ───────────────────────────────────────────────────────────

function ProjectCard({ project, itemsToShow }: { project: ProjectType; itemsToShow: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const cardWidthClass =
    itemsToShow === 1 ? 'w-full' : itemsToShow === 2 ? 'w-[calc(50%-0.75rem)]' : 'w-[calc(33.333%-1rem)]';

  return (
    <div
      className={cn(
        'shrink-0 bg-background rounded-lg overflow-hidden border transition-all duration-300 group flex flex-col',
        cardWidthClass,
        project.inProgress
          ? 'border-blue-500 ring-2 ring-blue-500/30'
          : project.featured
            ? 'border-accent ring-2 ring-accent/30'
            : 'border-border hover:border-accent',
      )}
    >
      {/* Image */}
      {project.image && (
        <div className="aspect-video bg-muted overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {project.inProgress ? (
            <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              En cours
            </div>
          ) : project.featured ? (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Projet phare
            </div>
          ) : null}
        </div>
      )}

      {/* Contenu */}
      <div className="p-6 space-y-4 flex flex-col flex-1">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{project.date}</p>
          
          {/* Description avec expand/collapse */}
          <div className="relative">
            <p 
              className={cn(
                "text-muted-foreground leading-relaxed transition-all duration-300",
                !isExpanded && "line-clamp-3"
              )}
            >
              {project.description}
            </p>
            
            {/* Bouton "Voir plus/moins" si la description est longue */}
            {project.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                {isExpanded ? (
                  <>
                    Voir moins
                    <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                  </>
                ) : (
                  <>
                    Voir plus
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Collaboration */}
        {project.collaboration && (
          <p className="text-xs italic text-muted-foreground">{project.collaboration}</p>
        )}

        {/* Liens texte (Code / Démo) — pas des boutons, des liens inline */}
        <div className="flex gap-3 pt-4 mt-auto">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Démo
            </a>
          )}
          {project.inProgress && !project.demo && (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="w-4 h-4" />
              Démo bientôt disponible
            </span>
          )}
        </div>
      </div>
    </div>
  );
}