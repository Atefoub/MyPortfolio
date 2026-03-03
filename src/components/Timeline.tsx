import { useState } from 'react';
import { timeline, type TimelineItem } from '../data/timeline';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

import SectionHeader from './SectionHeader';

type FilterType = 'all' | 'formation' | 'experience';

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTimeline = timeline.filter((item) =>
    filter === 'all' ? true : item.type === filter,
  );

  const [selectedId, setSelectedId] = useState<number>(filteredTimeline[0]?.id ?? 1);

  const selectedItem = filteredTimeline.find((item) => item.id === selectedId)
    ?? filteredTimeline[0];

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    const first = timeline.find((item) =>
      newFilter === 'all' ? true : item.type === newFilter,
    );
    if (first) setSelectedId(first.id);
  };

  return (
    <section
      className="timeline-section px-4 sm:px-6 md:px-8 lg:px-12 timeline-viewport-section"
      id="parcours"
    >
      <div className="timeline-viewport-inner">

        {/* ── En-tête compact ── */}
        <div className="timeline-header-row">
          <SectionHeader
            icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />}
            title="Mon Histoire"
            subtitle="De la comptabilité au code — une reconversion portée par la passion de créer."
          />

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 animate-slide-up animation-delay-200">
            {[
              { key: 'all',        label: 'Tout',        icon: null },
              { key: 'formation',  label: 'Formation',   icon: GraduationCap },
              { key: 'experience', label: 'Expérience',  icon: Briefcase },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key as FilterType)}
                className={cn(
                  'timeline-filter-btn px-3 sm:px-4 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5',
                  filter === key
                    ? key === 'all'
                      ? 'timeline-filter-active-all'
                      : key === 'formation'
                        ? 'timeline-filter-active-formation'
                        : 'timeline-filter-active-experience'
                    : 'timeline-filter-inactive',
                )}
              >
                {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Layout master-detail ── */}
        <div className="timeline-master-detail">

          {/* ── Colonne gauche : liste ── */}
          <nav className="timeline-list scrollbar-hide" aria-label="Parcours">
            <div className="timeline-list-line" />
            <div className="space-y-2">
              {filteredTimeline.map((item, index) => (
                <TimelineListItem
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={item.id === selectedItem?.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          </nav>

          {/* ── Colonne droite : détail ── */}
          <div className="timeline-detail scrollbar-hide">
            {selectedItem && <TimelineDetail item={selectedItem} />}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Entrée dans la liste (colonne gauche)
──────────────────────────────────────────────── */

interface ListItemProps {
  item: TimelineItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function TimelineListItem({ item, index, isSelected, onSelect }: ListItemProps) {
  const isFormation = item.type === 'formation';
  const typeClass = isFormation ? 'timeline-formation' : 'timeline-experience';

  return (
    <button
      onClick={onSelect}
      className={cn(
        'timeline-list-item animate-slide-up w-full text-left',
        `timeline-delay-${Math.min(index, 10)}`,
        isSelected ? 'timeline-list-item-selected' : 'timeline-list-item-idle',
      )}
    >
      {/* Pastille */}
      <div className="relative shrink-0">
        <div className={cn(
          'timeline-list-dot',
          typeClass,
          isSelected ? 'scale-110' : '',
        )}>
          {isFormation
            ? <GraduationCap className="w-3 h-3 text-white" />
            : <Briefcase className="w-3 h-3 text-white" />
          }
        </div>
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn(
            'text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md',
            isFormation
              ? 'bg-sage/15 text-sage'
              : 'bg-olive/15 text-olive',
          )}>
            {item.year}
          </span>
        </div>
        <p className={cn(
          'text-xs sm:text-sm font-semibold leading-tight truncate transition-colors duration-200',
          isSelected ? 'text-accent' : 'text-foreground',
        )}>
          {item.title}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground truncate mt-0.5">
          {item.organization}
        </p>
      </div>

      {/* Flèche active */}
      <ArrowRight className={cn(
        'shrink-0 w-3.5 h-3.5 transition-all duration-200',
        isSelected ? 'text-accent opacity-100' : 'opacity-0',
      )} />
    </button>
  );
}

/* ────────────────────────────────────────────────
   Panneau de détail (colonne droite)
──────────────────────────────────────────────── */

interface DetailProps {
  item: TimelineItem;
}

function TimelineDetail({ item }: DetailProps) {
  const isFormation = item.type === 'formation';
  const typeClass = isFormation ? 'timeline-formation' : 'timeline-experience';

  return (
    <div
      key={item.id}
      className={cn(
        'timeline-detail-panel animate-fade-in',
        isFormation ? 'timeline-card-formation' : 'timeline-card-experience',
      )}
    >
      {/* Bande colorée */}
      <div className={cn('h-1 rounded-t-2xl', typeClass, 'timeline-card-band')} />

      <div className="p-4 sm:p-6 h-full overflow-y-auto scrollbar-hide space-y-4 sm:space-y-5">

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn(
            'timeline-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm',
            typeClass,
          )}>
            {isFormation
              ? <GraduationCap className="w-3 h-3" />
              : <Briefcase className="w-3 h-3" />
            }
            {isFormation ? 'Formation' : 'Expérience'}
          </span>
          <span className="timeline-year-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
            <Calendar className="w-3 h-3" />
            {item.year}
          </span>
        </div>

        {/* Titre */}
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground mb-2">
            {item.title}
          </h2>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
            <span className="text-xs sm:text-sm font-medium">{item.organization}</span>
          </div>
        </div>

        {/* Description courte */}
        {item.shortDescription && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed timeline-short-desc italic">
            {item.shortDescription}
          </p>
        )}

        {/* Skills */}
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className={cn(
                  'timeline-skill-tag px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-lg border transition-all duration-200 hover:scale-105',
                  typeClass,
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Détails */}
        {item.detailedDescription && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('timeline-detail-bar w-1 h-4 rounded-full', typeClass)} />
              <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-foreground">
                Détails
              </h4>
            </div>
            <div className="timeline-detail-block rounded-xl p-3 sm:p-4 border border-border/30 space-y-1.5">
              {item.detailedDescription.split('•').map((point, i) => {
                const trimmed = point.trim();
                if (!trimmed) return null;
                return (
                  <p key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
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

        {/* Réalisations */}
        {item.achievements && item.achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('timeline-detail-bar w-1 h-4 rounded-full', typeClass)} />
              <Award className="w-3.5 h-3.5 text-muted-foreground" />
              <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-foreground">
                Réalisations clés
              </h4>
            </div>
            <div className="grid gap-1.5 sm:gap-2">
              {item.achievements.map((achievement, i) => (
                <div
                  key={i}
                  className={cn(
                    'timeline-achievement flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01]',
                    typeClass,
                  )}
                >
                  <span className={cn(
                    'timeline-check inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 font-bold text-[9px] sm:text-xs text-white',
                    typeClass,
                  )}>
                    ✓
                  </span>
                  <span className="flex-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}