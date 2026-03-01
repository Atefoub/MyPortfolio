import { useState } from 'react';
import { timeline, type TimelineItem } from '../data/timeline';
import {
  Briefcase,
  GraduationCap,
  ChevronDown,
  Calendar,
  MapPin,
  Award,
  Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { TIMELINE_MAX_DELAYS, TIMELINE_MAX_VISIBLE_SKILLS, TIMELINE_EXPANDED_MAX_HEIGHT } from '../lib/constants';
import SectionHeader from './SectionHeader';

type FilterType = 'all' | 'formation' | 'experience';

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredTimeline = timeline.filter((item) =>
    filter === 'all' ? true : item.type === filter,
  );

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 timeline-section"
      id="parcours"
    >
      <div className="max-w-6xl mx-auto">

        {/* En-tête — composant partagé, mode "icon" */}
        <SectionHeader
          icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-accent" />}
          title="Mon Histoire"
          subtitle="De la comptabilité au code : une reconversion vers le développement web, portée par la passion de créer et d'innover."
        />

        {/* Titre principal affiché sous le badge (hors SectionHeader car style spécifique) */}
        <div className="-mt-4 sm:-mt-6 md:-mt-8 mb-8 sm:mb-10 md:mb-16">
          <h2 className="timeline-title text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Parcours</h2>
          <div className="w-16 sm:w-20 h-1 bg-accent" />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8 sm:mb-10 md:mb-16 animate-slide-up animation-delay-200">
          {[
            { key: 'all', label: 'Tout voir', icon: null },
            { key: 'formation', label: 'Formation', icon: GraduationCap },
            { key: 'experience', label: 'Expérience', icon: Briefcase },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={cn(
                'relative px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-300 overflow-hidden flex items-center gap-1.5 sm:gap-2',
                filter === key
                  ? key === 'all'
                    ? 'bg-accent text-accent-foreground shadow-xl scale-105'
                    : key === 'formation'
                      ? 'bg-[#83a08b] text-white shadow-xl scale-105'
                      : 'bg-[#738b69] text-white shadow-xl scale-105'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50',
              )}
            >
              {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />}
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line absolute left-4 sm:left-5 md:left-6 top-0 bottom-0 w-px" />

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {filteredTimeline.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isExpanded={expandedItems.has(item.id)}
                onToggle={() => toggleExpand(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-section {
          background: linear-gradient(
            135deg,
            var(--color-background) 0%,
            rgba(232, 237, 233, 0.3) 50%,
            var(--color-background) 100%
          );
        }
        .timeline-title {
          background: linear-gradient(90deg, var(--color-foreground) 0%, rgba(53, 57, 46, 0.6) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .timeline-line {
          background: linear-gradient(
            180deg,
            var(--color-accent) 0%,
            var(--color-border) 50%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ item, index, isExpanded, onToggle }: TimelineCardProps) {
  const isFormation = item.type === 'formation';
  const typeClass = isFormation ? 'timeline-formation' : 'timeline-experience';

  const cardClasses = cn(
    'relative rounded-xl md:rounded-2xl overflow-hidden border transition-all duration-500 timeline-card',
    typeClass,
    isExpanded ? 'shadow-2xl scale-[1.005] sm:scale-[1.01] md:scale-[1.02]' : 'shadow-lg hover:shadow-xl',
  );

  return (
    <div
      className={cn(
        'relative animate-slide-up pl-10 sm:pl-12 md:pl-16',
        `timeline-delay-${Math.min(index, TIMELINE_MAX_DELAYS - 1)}`,
      )}
    >
      {/* Point timeline */}
      <div className="absolute left-0 top-5 sm:top-6 md:top-8 flex items-center justify-center">
        <div className="relative">
          <div className={cn('timeline-ping absolute inset-0 rounded-full animate-ping opacity-30', typeClass)} />
          <div
            className={cn(
              'timeline-circle relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-4 border-background shadow-2xl flex items-center justify-center',
              typeClass,
            )}
          >
            {isFormation ? (
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            ) : (
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Card */}
      <div className={cardClasses}>
        <div className={cn('timeline-card-band absolute top-0 left-0 right-0 h-1', typeClass)} />

        <button
          onClick={onToggle}
          className="w-full p-3 sm:p-4 md:p-8 text-left transition-all duration-300 hover:bg-accent/5"
        >
          <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-6">
            <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4 min-w-0">

              {/* Badges type + année */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  className={cn(
                    'timeline-badge inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg text-white',
                    typeClass,
                  )}
                >
                  {isFormation ? (
                    <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  ) : (
                    <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  )}
                  {isFormation ? 'Formation' : 'Expérience'}
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 bg-muted/80 text-foreground rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold border border-border/50">
                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                  {item.year}
                </span>
              </div>

              {/* Titre */}
              <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold leading-tight">
                {item.title}
              </h3>

              {/* Organisation */}
              <div className="flex items-start gap-1.5 sm:gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                  {item.organization}
                </p>
              </div>

              {/* Description courte */}
              {item.shortDescription && (
                <p className="text-[10px] sm:text-xs md:text-base text-muted-foreground leading-relaxed border-l-4 border-accent/30 pl-2 sm:pl-3 md:pl-4 italic">
                  {item.shortDescription}
                </p>
              )}

              {/* Skills */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                  {item.skills.slice(0, isExpanded ? undefined : TIMELINE_MAX_VISIBLE_SKILLS).map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'timeline-skill-tag px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-lg border',
                        typeClass,
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                  {!isExpanded && item.skills.length > TIMELINE_MAX_VISIBLE_SKILLS && (
                    <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs font-semibold rounded-lg bg-muted border border-border text-muted-foreground">
                      +{item.skills.length - TIMELINE_MAX_VISIBLE_SKILLS} autres
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Chevron */}
            <div
              className={cn(
                'shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isExpanded
                  ? cn('text-white rotate-180', typeClass)
                  : 'bg-muted text-muted-foreground',
              )}
            >
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </button>

        {/* Détails dépliables */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-in-out',
            isExpanded ? 'timeline-expanded opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="px-3 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-8 pt-2 border-t border-border/50">

            {item.detailedDescription && (
              <div className="mt-3 sm:mt-4 md:mt-6 space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className={cn('timeline-detail-bar w-1 h-4 sm:h-5 md:h-6 rounded-full', typeClass)} />
                  <h4 className="font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-foreground">
                    Détails
                  </h4>
                </div>
                <div className="space-y-1.5 sm:space-y-2 md:space-y-3 text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-2.5 sm:p-3 md:p-5 border border-border/30">
                  {item.detailedDescription.split('•').map((point, i) => {
                    const trimmed = point.trim();
                    if (!trimmed) return null;
                    return (
                      <p key={i} className="flex items-start gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
                        {i > 0 && (
                          <span className={cn('timeline-bullet w-1.5 h-1.5 rounded-full mt-1.5 shrink-0', typeClass)} />
                        )}
                        <span className="flex-1">{trimmed}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {item.achievements && item.achievements.length > 0 && (
              <div className="mt-3 sm:mt-4 md:mt-6 space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <div className={cn('timeline-detail-bar w-1 h-4 sm:h-5 md:h-6 rounded-full', typeClass)} />
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <h4 className="font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-foreground">
                    Réalisations clés
                  </h4>
                </div>
                <div className="grid gap-1.5 sm:gap-2 md:gap-3">
                  {item.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={cn(
                        'timeline-achievement flex items-start gap-2 md:gap-3 p-2.5 sm:p-3 md:p-4 rounded-xl border',
                        typeClass,
                      )}
                    >
                      <span
                        className={cn(
                          'timeline-check inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full shrink-0 font-bold text-[9px] sm:text-xs text-white',
                          typeClass,
                        )}
                      >
                        ✓
                      </span>
                      <span className="flex-1 text-[10px] sm:text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Délais d'animation par index */
        ${Array.from({ length: TIMELINE_MAX_DELAYS }, (_, i) =>
          `.timeline-delay-${i} { animation-delay: ${i * 100}ms; }`
        ).join('\n')}

        .timeline-expanded { max-height: ${TIMELINE_EXPANDED_MAX_HEIGHT}; }

        /* ── Styles partagés par les deux types ── */
        .timeline-card { background: linear-gradient(135deg, var(--color-background), rgba(232,237,233,0.3)); }

        /* ── Formation ── */
        .timeline-formation.timeline-card        { border-color: rgba(131,160,139,0.2); }
        .timeline-formation.timeline-ping,
        .timeline-formation.timeline-circle,
        .timeline-formation.timeline-badge,
        .timeline-formation.timeline-detail-bar,
        .timeline-formation.timeline-bullet,
        .timeline-formation.timeline-check       { background-color: #83a08b; }
        .timeline-formation.timeline-card-band   { background: linear-gradient(90deg, #83a08b, #99c6c4); }
        .timeline-formation.timeline-skill-tag   { background-color: rgba(131,160,139,0.1); color: #83a08b; border-color: rgba(131,160,139,0.2); }
        .timeline-formation.timeline-achievement { background-color: rgba(131,160,139,0.05); border-color: rgba(131,160,139,0.2); }

        /* ── Expérience ── */
        .timeline-experience.timeline-card        { border-color: rgba(115,139,105,0.2); }
        .timeline-experience.timeline-ping,
        .timeline-experience.timeline-circle,
        .timeline-experience.timeline-badge,
        .timeline-experience.timeline-detail-bar,
        .timeline-experience.timeline-bullet,
        .timeline-experience.timeline-check       { background-color: #738b69; }
        .timeline-experience.timeline-card-band   { background: linear-gradient(90deg, #738b69, #4f4d46); }
        .timeline-experience.timeline-skill-tag   { background-color: rgba(115,139,105,0.1); color: #738b69; border-color: rgba(115,139,105,0.2); }
        .timeline-experience.timeline-achievement { background-color: rgba(115,139,105,0.05); border-color: rgba(115,139,105,0.2); }
      `}</style>
    </div>
  );
}