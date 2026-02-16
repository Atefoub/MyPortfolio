import { useRef, useEffect, useState } from 'react';
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
  const { currentIndex, setCurrentIndex, goToNext, goToPrev, maxIndex } = useCarousel(sortedProjects, itemsToShow);

  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.offsetWidth / itemsToShow;
      carouselRef.current.scrollTo({ left: currentIndex * itemWidth, behavior: 'smooth' });
      
      const container = carouselRef.current.querySelector('.carousel-container') as HTMLElement;
      if (container) {
        container.style.setProperty('--translate-x', `-${(currentIndex * 100) / itemsToShow}%`);
      }
    }
  }, [currentIndex, itemsToShow]);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-muted" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Projets" />

        <div className="relative">
          <Button
            variant="primary"
            size="md"
            icon={<ChevronLeft />}
            onClick={goToPrev}
            disabled={currentIndex === 0}
            aria-label="Projet précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
          />

          <Button
            variant="primary"
            size="md"
            icon={<ChevronRight />}
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Projet suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
          />

          <div ref={carouselRef} className="overflow-hidden scrollbar-hide">
            <div className="carousel-container flex gap-6 transition-transform duration-500">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} itemsToShow={itemsToShow} />
              ))}
            </div>
          </div>

          <CarouselDots currentIndex={currentIndex} maxIndex={maxIndex} onDotClick={setCurrentIndex} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, itemsToShow }: { project: ProjectType; itemsToShow: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const cardWidthClass = {
    1: 'w-full',
    2: 'w-[calc(50%-0.75rem)]',
    3: 'w-[calc(33.333%-1rem)]',
  }[itemsToShow];

  const borderClass = project.inProgress
    ? 'border-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
    : project.featured
      ? 'border-accent shadow-[0_0_0_2px_rgba(153,198,196,0.3)]'
      : 'border-border hover:border-accent';

  return (
    <div className={cn('shrink-0 bg-background rounded-lg overflow-hidden border transition-all duration-300 group flex flex-col', cardWidthClass, borderClass)}>
      {project.image && (
        <div className="aspect-video bg-muted overflow-hidden relative">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <ProjectBadge inProgress={project.inProgress} featured={project.featured} />
        </div>
      )}

      <div className="p-6 space-y-4 flex flex-col flex-1">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{project.date}</p>
          
          <div className="relative">
            <p className={cn("text-muted-foreground leading-relaxed transition-all duration-300", !isExpanded && "line-clamp-3")}>
              {project.description}
            </p>
            
            {project.description.length > 150 && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors font-medium">
                {isExpanded ? 'Voir moins' : 'Voir plus'}
                <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
              </button>
            )}
          </div>
        </div>

        <TechTags technologies={project.technologies} />
        {project.collaboration && <p className="text-xs italic text-muted-foreground">{project.collaboration}</p>}
        <ProjectLinks github={project.github} demo={project.demo} inProgress={project.inProgress} />
      </div>
    </div>
  );
}

function ProjectBadge({ inProgress, featured }: { inProgress?: boolean; featured?: boolean }) {
  if (inProgress) {
    return (
      <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg animate-pulse">
        <Loader2 className="w-3 h-3 animate-spin" />
        En cours
      </div>
    );
  }
  
  if (featured) {
    return (
      <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
        <Star className="w-3 h-3 fill-current" />
        Projet phare
      </div>
    );
  }
  
  return null;
}

function TechTags({ technologies }: { technologies: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.slice(0, 5).map((tech) => (
        <span key={tech} className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">{tech}</span>
      ))}
      {technologies.length > 5 && (
        <span className="px-3 py-1 bg-muted text-sm rounded-full text-muted-foreground">+{technologies.length - 5}</span>
      )}
    </div>
  );
}

function ProjectLinks({ github, demo, inProgress }: { github?: string; demo?: string; inProgress?: boolean }) {
  return (
    <div className="flex gap-3 pt-4 mt-auto">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Github className="w-4 h-4" />
          Code
        </a>
      )}
      {demo ? (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ExternalLink className="w-4 h-4" />
          Démo
        </a>
      ) : inProgress && (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="w-4 h-4" />
          Démo bientôt disponible
        </span>
      )}
    </div>
  );
}

function CarouselDots({ currentIndex, maxIndex, onDotClick }: { currentIndex: number; maxIndex: number; onDotClick: (index: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: maxIndex + 1 }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Aller au groupe de projets ${index + 1}`}
          className={cn('h-2 rounded-full transition-all duration-300', index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent')}
        />
      ))}
    </div>
  );
}