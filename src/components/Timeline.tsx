import { useState } from 'react';
import { timeline, type TimelineItem } from '../data/timeline';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../lib/utils';
import SectionHeader from './SectionHeader';

export default function Timeline() {
  const [openId, setOpenId] = useState<number | null>(timeline[0]?.id ?? null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="acc-root" id="parcours">
      <div className="acc-inner">

        {/* ── En-tête ── */}
        <div className="acc-header animate-fade-in">
          <SectionHeader
            title="Mon Parcours"
            icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          />
        </div>

        {/* ── Liste accordéon ── */}
        <div className="acc-list">
          {timeline.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              isLast={index === timeline.length - 1}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Item accordéon ── */
interface AccordionItemProps {
  item: TimelineItem;
  index: number;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}

// Typage explicite pour les CSS custom properties dynamiques.
// L'injection via style inline est la seule approche viable pour des
// valeurs calculées à l'exécution — aucune alternative statique possible.
interface AccordionCssVars extends React.CSSProperties {
  '--acc-accent': string;
  '--acc-gradient': string;
}

function AccordionItem({ item, index, isOpen, isLast, onToggle }: AccordionItemProps) {
  const isFormation = item.type === 'formation';
  const accentColor = isFormation ? '#83a08b' : '#738b69';
  const gradientEnd = isFormation ? '#99c6c4' : '#5a6e51';

  const hasDetail = !!(
    item.detailedDescription ||
    (item.achievements && item.achievements.length > 0)
  );

  const cssVars: AccordionCssVars = {
    '--acc-accent':   accentColor,
    '--acc-gradient': gradientEnd,
  };

  return (
    <div
      className={cn(
        'acc-item animate-slide-up',
        `timeline-delay-${Math.min(index, 10)}`,
        isOpen && 'acc-item-open',
      )}
      style={cssVars}
    >
      {/* ── Colonne spine (trait + point) ── */}
      <div className="acc-spine">
        <div className="acc-spine-dot acc-spine-dot-themed">
          {isFormation
            ? <GraduationCap className="w-3 h-3 text-white" />
            : <Briefcase className="w-3 h-3 text-white" />
          }
        </div>
        {!isLast && (
          <div className="acc-spine-line acc-spine-line-themed" />
        )}
      </div>

      {/* ── Carte ── */}
      <div className={cn('acc-card', isOpen && 'acc-card-open-themed')}>
        {/* Bande colorée top */}
        <div className="acc-card-band acc-card-band-themed" />

        {/* ── Header cliquable ── */}
        <button
          className="acc-card-header"
          onClick={onToggle}
          aria-expanded={Boolean(isOpen)}
        >
          <div className="acc-card-header-left">

            {/* Badges type + année */}
            <div className="acc-badges">
              <span className="acc-badge-type acc-badge-type-themed">
                {isFormation
                  ? <GraduationCap className="w-3 h-3" />
                  : <Briefcase className="w-3 h-3" />
                }
                {isFormation ? 'Formation' : 'Expérience'}
              </span>
              <span className="acc-badge-year">
                <Calendar className="w-3 h-3" />
                {item.year}
              </span>
            </div>

            {/* Titre */}
            <h3 className="acc-title">{item.title}</h3>

            {/* Organisation */}
            <div className="acc-org">
              <MapPin className="w-3 h-3 shrink-0 acc-org-icon-themed" />
              <span>{item.organization}</span>
            </div>

          </div>

          {/* Chevron */}
          <div className={cn('acc-chevron acc-chevron-themed', isOpen && 'acc-chevron-open')}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        {/* ── Corps expansible ── */}
        <div className={cn('acc-body', isOpen && 'acc-body-open')}>
          <div className="acc-body-inner">

            {/* Séparateur */}
            <div className="acc-sep acc-sep-themed" />

            {/* Description courte */}
            {item.shortDescription && (
              <p className="acc-short-desc acc-short-desc-themed">
                {item.shortDescription}
              </p>
            )}

            {/* Skills */}
            {item.skills && item.skills.length > 0 && (
              <div className="acc-skills">
                {item.skills.map((skill) => (
                  <span key={skill} className="acc-skill acc-skill-themed">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Détails */}
            {item.detailedDescription && (
              <div className="acc-section">
                <div className="acc-section-title">
                  <div className="acc-section-bar acc-section-bar-themed" />
                  <span>Détails</span>
                </div>
                <div className="acc-detail-block">
                  {item.detailedDescription.split('•').map((point, i) => {
                    const trimmed = point.trim();
                    if (!trimmed) return null;
                    return (
                      <p key={i} className="acc-detail-point">
                        {i > 0 && <span className="acc-bullet acc-bullet-themed" />}
                        <span>{trimmed}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Réalisations clés */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="acc-section">
                <div className="acc-section-title">
                  <div className="acc-section-bar acc-section-bar-themed" />
                  <Award className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Réalisations clés</span>
                </div>
                <div className="acc-achievements">
                  {item.achievements.map((achievement, i) => (
                    <div key={i} className="acc-achievement acc-achievement-themed">
                      <span className="acc-check acc-check-themed">✓</span>
                      <span className="acc-achievement-text">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasDetail && (
              <p className="acc-no-detail">Aucun détail supplémentaire disponible.</p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}