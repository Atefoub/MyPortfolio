import { useState } from 'react';
import { timeline, type TimelineItem } from '../data/timeline';
import { Briefcase, GraduationCap, ChevronDown, Calendar, MapPin, Award, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

type FilterType = 'all' | 'formation' | 'experience';

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredTimeline = timeline.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-background via-muted/30 to-background" id="parcours">
      <div className="max-w-6xl mx-auto">
        
        {/* ── En-tête avec identité forte ──────────────────────── */}
        <div className="mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">Mon Histoire</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Parcours
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            De la comptabilité au code : une reconversion vers le développement web, 
            portée par la passion de créer et d'innover.
          </p>
        </div>

        {/* ── Filtres élégants avec palette naturelle ──────────── */}
        <div className="flex flex-wrap gap-3 mb-16 animate-slide-up animation-delay-200">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden',
              filter === 'all'
                ? 'bg-accent text-accent-foreground shadow-xl shadow-accent/20 scale-105'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
            )}
          >
            {filter === 'all' && (
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent animate-pulse"></span>
            )}
            <span className="relative flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                filter === 'all' ? "bg-accent-foreground" : "bg-muted-foreground/40"
              )}></span>
              Tout voir
            </span>
          </button>

          <button
            onClick={() => setFilter('formation')}
            className={cn(
              'group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden',
              filter === 'formation'
                ? 'bg-[#83a08b] text-white shadow-xl shadow-[#83a08b]/30 scale-105'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
            )}
          >
            <span className="relative flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Formation
            </span>
          </button>

          <button
            onClick={() => setFilter('experience')}
            className={cn(
              'group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden',
              filter === 'experience'
                ? 'bg-[#738b69] text-white shadow-xl shadow-[#738b69]/30 scale-105'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
            )}
          >
            <span className="relative flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Expérience
            </span>
          </button>
        </div>

        {/* ── Timeline verticale à gauche ──────────────────────── */}
        <div className="relative">
          {/* Ligne verticale stylisée avec gradient */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent"></div>

          {/* Items */}
          <div className="space-y-12">
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
    </section>
  );
}

// ─── Composant Card Timeline avec palette naturelle ────────────────────────

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineCard({ item, index, isExpanded, onToggle }: TimelineCardProps) {
  const isFormation = item.type === 'formation';
  
  // Couleurs de la palette naturelle
  const primaryColor = isFormation ? '#83a08b' : '#738b69'; // Vert sauge / Vert olive
  const secondaryColor = isFormation ? '#99c6c4' : '#4f4d46'; // Turquoise / Gris verdâtre
  
  return (
    <div
      className="relative animate-slide-up pl-16"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ── Point sur la timeline avec animation ──────────────── */}
      <div className="absolute left-0 top-8 flex items-center justify-center">
        <div className="relative">
          {/* Cercle extérieur pulsant */}
          <div 
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: primaryColor }}
          ></div>
          
          {/* Cercle principal avec icône */}
          <div 
            className="relative w-12 h-12 rounded-full border-4 border-background shadow-2xl flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: primaryColor }}
          >
            {isFormation ? (
              <GraduationCap className="w-5 h-5 text-white" />
            ) : (
              <Briefcase className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* ── Card principale avec effet glassmorphism ──────────── */}
      <div 
        className={cn(
          "group relative bg-gradient-to-br from-background to-muted/30 rounded-2xl overflow-hidden border transition-all duration-500",
          isExpanded ? "shadow-2xl scale-[1.02]" : "shadow-lg hover:shadow-xl"
        )}
        style={{ 
          borderColor: `${primaryColor}33`,
        }}
      >
        
        {/* Bande décorative en haut */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ 
            background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` 
          }}
        ></div>

        {/* En-tête clickable */}
        <button
          onClick={onToggle}
          className="w-full p-8 text-left transition-all duration-300 hover:bg-accent/5"
        >
          <div className="flex items-start justify-between gap-6">
            
            <div className="flex-1 space-y-4">
              {/* Type + Année */}
              <div className="flex items-center gap-3 flex-wrap">
                <span 
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isFormation ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : (
                    <Briefcase className="w-3.5 h-3.5" />
                  )}
                  {isFormation ? 'Formation' : 'Expérience'}
                </span>
                
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-muted/80 backdrop-blur-sm text-foreground rounded-full text-xs font-semibold border border-border/50">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  {item.year}
                </span>
              </div>

              {/* Titre */}
              <h3 className="text-2xl md:text-3xl font-bold leading-tight transition-all duration-300 group-hover:text-accent">
                {item.title}
              </h3>

              {/* Organisation avec icône */}
              <div className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-base font-medium leading-relaxed">
                  {item.organization}
                </p>
              </div>

              {/* Description courte avec style */}
              {item.shortDescription && (
                <p className="text-base text-muted-foreground leading-relaxed border-l-4 border-accent/30 pl-4 italic">
                  {item.shortDescription}
                </p>
              )}

              {/* Tags de compétences avec couleurs naturelles */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.skills.slice(0, isExpanded ? undefined : 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-default border"
                      style={{
                        backgroundColor: `${primaryColor}1A`,
                        color: primaryColor,
                        borderColor: `${primaryColor}33`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {!isExpanded && item.skills.length > 6 && (
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted border border-border text-muted-foreground">
                      +{item.skills.length - 6} autres
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Icône dépliable stylisée */}
            <div 
              className={cn(
                "shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                isExpanded 
                  ? "text-white rotate-180"
                  : "bg-muted text-muted-foreground group-hover:bg-accent/20"
              )}
              style={isExpanded ? { backgroundColor: primaryColor } : {}}
            >
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </button>

        {/* Détails dépliables avec animation fluide */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-8 pb-8 pt-2 border-t border-border/50">
            
            {/* Description détaillée */}
            {item.detailedDescription && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Détails
                  </h4>
                </div>
                
                <div className="space-y-3 text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-5 border border-border/30">
                  {item.detailedDescription.split('•').map((point, i) => {
                    const trimmed = point.trim();
                    if (!trimmed) return null;
                    return (
                      <p key={i} className="flex items-start gap-3">
                        {i > 0 && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: primaryColor }}
                          ></span>
                        )}
                        <span className="flex-1">{trimmed}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Réalisations clés avec icônes */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-1 h-6 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  ></div>
                  <Award 
                    className="w-5 h-5"
                    style={{ color: primaryColor }}
                  />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Réalisations clés
                  </h4>
                </div>
                
                <div className="grid gap-3">
                  {item.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] border"
                      style={{
                        backgroundColor: `${primaryColor}0D`,
                        borderColor: `${primaryColor}33`
                      }}
                    >
                      <span 
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 font-bold text-xs text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        ✓
                      </span>
                      <span className="flex-1 text-muted-foreground leading-relaxed">
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
    </div>
  );
}