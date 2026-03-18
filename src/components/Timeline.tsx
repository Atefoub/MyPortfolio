import { useState, useRef, useEffect } from 'react';
import { timeline, type TimelineItem } from '../data/timeline';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';
import SectionHeader from './SectionHeader';

type FilterType = 'all' | 'formation' | 'experience';

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [animKey, setAnimKey] = useState(0);

  const filteredTimeline = timeline.filter((item) =>
    filter === 'all' ? true : item.type === filter,
  );

  const [selectedId, setSelectedId] = useState<number>(filteredTimeline[0]?.id ?? 1);

  const selectedItem =
    filteredTimeline.find((item) => item.id === selectedId) ?? filteredTimeline[0];

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    const first = timeline.find((item) =>
      newFilter === 'all' ? true : item.type === newFilter,
    );
    if (first) {
      setSelectedId(first.id);
      setAnimKey((k) => k + 1);
    }
  };

  const handleSelectItem = (id: number) => {
    if (id !== selectedId) {
      setSelectedId(id);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <section className="tl-root" id="parcours">
      <div className="tl-inner">

        {/* ── En-tête ── */}
        <div className="tl-header animate-fade-in">
          <SectionHeader
            title="Mon Parcours"
            icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            className="shrink-0"
          />
          <div className="tl-filters">
            {[
              { key: 'all',        label: 'Tout',       icon: null },
              { key: 'formation',  label: 'Formation',  icon: GraduationCap },
              { key: 'experience', label: 'Expérience', icon: Briefcase },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleFilterChange(key as FilterType)}
                className={cn(
                  'tl-filter-btn',
                  filter === key
                    ? key === 'all'
                      ? 'tl-filter-all'
                      : key === 'formation'
                        ? 'tl-filter-formation'
                        : 'tl-filter-experience'
                    : 'tl-filter-idle',
                )}
              >
                {Icon && <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Master-detail ── */}
        <div className="tl-body">

          {/* Liste */}
          <nav className="tl-list scrollbar-hide" aria-label="Parcours">
            <div className="tl-list-line" />
            <div className="tl-list-items">
              {filteredTimeline.map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={item.id === selectedItem?.id}
                  onSelect={() => handleSelectItem(item.id)}
                />
              ))}
            </div>
          </nav>

          {/* Détail */}
          <div className="tl-detail scrollbar-hide">
            {selectedItem && (
              <DetailPanel key={animKey} item={selectedItem} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Item de liste ── */
interface ListItemProps {
  item: TimelineItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function ListItem({ item, index, isSelected, onSelect }: ListItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isFormation = item.type === 'formation';

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isSelected]);

  return (
    <button
      ref={ref}
      onClick={onSelect}
      className={cn(
        'tl-item animate-slide-up',
        `timeline-delay-${Math.min(index, 10)}`,
        isSelected ? 'tl-item-active' : 'tl-item-idle',
      )}
    >
      {isSelected && <span className="tl-item-bar" />}

      <div className={cn(
        'tl-dot',
        isFormation ? 'timeline-formation' : 'timeline-experience',
        isSelected && 'scale-110',
      )}>
        {isFormation
          ? <GraduationCap className="w-3 h-3 text-white" />
          : <Briefcase className="w-3 h-3 text-white" />
        }
      </div>

      <div className="tl-item-text">
        <span className={cn(
          'tl-item-year',
          isFormation ? 'tl-year-formation' : 'tl-year-experience',
        )}>
          {item.year}
        </span>
        <p className={cn('tl-item-title', isSelected && 'text-accent')}>
          {item.title}
        </p>
        <p className="tl-item-org">{item.organization}</p>
      </div>
    </button>
  );
}

/* ── Panneau détail ── */
function DetailPanel({ item }: { item: TimelineItem }) {
  const isFormation = item.type === 'formation';
  const typeClass = isFormation ? 'timeline-formation' : 'timeline-experience';

  return (
    <div className={cn(
      'tl-detail-panel tl-detail-anim',
      isFormation ? 'timeline-card-formation' : 'timeline-card-experience',
    )}>
      <div className={cn('tl-band', typeClass)} />

      <div className="tl-detail-content">

        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('tl-badge-type text-white shadow-sm', typeClass)}>
            {isFormation
              ? <GraduationCap className="w-3 h-3" />
              : <Briefcase className="w-3 h-3" />
            }
            {isFormation ? 'Formation' : 'Expérience'}
          </span>
          <span className="tl-badge-year">
            <Calendar className="w-3 h-3" />
            {item.year}
          </span>
        </div>

        <div>
          <h2 className="tl-detail-title">{item.title}</h2>
          <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-accent" />
            <span className="text-xs sm:text-sm font-medium">{item.organization}</span>
          </div>
        </div>

        {item.shortDescription && (
          <p className="tl-short-desc">{item.shortDescription}</p>
        )}

        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <span key={skill} className={cn('tl-skill', typeClass)}>
                {skill}
              </span>
            ))}
          </div>
        )}

        {item.detailedDescription && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-1 h-4 rounded-full', typeClass, 'timeline-detail-bar')} />
              <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-foreground">
                Détails
              </h4>
            </div>
            <div className="tl-detail-block">
              {item.detailedDescription.split('•').map((point, i) => {
                const trimmed = point.trim();
                if (!trimmed) return null;
                return (
                  <p key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    {i > 0 && (
                      <span className={cn('w-1.5 h-1.5 rounded-full mt-1.5 shrink-0', typeClass, 'timeline-bullet')} />
                    )}
                    <span className="flex-1">{trimmed}</span>
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {item.achievements && item.achievements.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-1 h-4 rounded-full', typeClass, 'timeline-detail-bar')} />
              <Award className="w-3.5 h-3.5 text-muted-foreground" />
              <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-foreground">
                Réalisations clés
              </h4>
            </div>
            <div className="grid gap-1.5 sm:gap-2">
              {item.achievements.map((achievement, i) => (
                <div key={i} className={cn('tl-achievement', typeClass)}>
                  <span className={cn('tl-check text-white', typeClass)}>✓</span>
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