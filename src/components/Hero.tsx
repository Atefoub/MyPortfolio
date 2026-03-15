import { ANIMATION_DELAYS, type ViewId } from '../lib/constants';
import Button from './Button';
import SocialLinks from './SocialLinks';

interface HeroProps {
  onNavigate: (view: ViewId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero-section px-4 sm:px-6 md:px-8 lg:px-16" id="hero">
      <div className="max-w-7xl w-full mx-auto h-full flex items-center">

        {/* ── Desktop : 2 colonnes côte à côte ── */}
        <div className="hero-desktop w-full animate-fade-in">
          <div className="hero-text-col">
            <div className="hero-block">
              <h1 className="hero-title font-bold tracking-tight leading-tight">
                Antoine Mourin
              </h1>
              <p className="hero-subtitle text-muted-foreground font-light mt-1.5">
                Développeur Full-Stack · 12 ans d'expérience en entreprise
              </p>
            </div>

            <div className={`hero-block animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              <p className="hero-body text-muted-foreground leading-relaxed">
                En formation{' '}
                <span className="text-foreground font-medium">
                  Concepteur Développeur d'Applications (RNCP 6)
                </span>{' '}
                à l'Ada Tech School de Nantes.
              </p>
              <p className="hero-body text-muted-foreground leading-relaxed mt-2">
                Mon métier de comptable m'a appris la{' '}
                <span className="text-foreground font-medium">rigueur</span>,
                le{' '}
                <span className="text-foreground font-medium">respect des délais</span>{' '}
                et le{' '}
                <span className="text-foreground font-medium">travail en équipe</span>.
                Je cherche à les mettre au service d'une équipe tech.
              </p>
            </div>

            <div className={`hero-block hero-cta animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
              <Button variant="primary" size="lg" onClick={() => onNavigate('projects')}>
                Voir mes projets
              </Button>
              <SocialLinks />
            </div>

            <div className={`hero-block flex flex-col hero-badges-gap animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
              <div className="hero-badge hero-badge-green">
                <span className="status-dot-wrap">
                  <span className="status-ping status-ping-green" />
                  <span className="status-dot status-dot-green" />
                </span>
                <span className="hero-badge-label">
                  Stage · 8 semaines · 08 juin – 24 juillet 2026
                </span>
              </div>
              <div className="hero-badge hero-badge-blue">
                <span className="status-dot-wrap">
                  <span className="status-ping status-ping-blue" />
                  <span className="status-dot status-dot-blue" />
                </span>
                <span className="hero-badge-label">
                  Alternance · sept. 2026 · 24 mois · RNCP 6
                </span>
              </div>
            </div>
          </div>

          <div className="hero-img-col">
            <HeroImage />
          </div>
        </div>

        {/* ── Mobile : tout centré ── */}
        <div className="hero-mobile w-full animate-fade-in">

          {/* Nom + sous-titre */}
          <div style={{ marginBottom: 'clamp(0.4rem, 1.2vh, 0.75rem)' }}>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              Antoine Mourin
            </h1>
            <p className="text-sm text-muted-foreground font-light mt-1">
              Développeur Full-Stack · 12 ans d'expérience en entreprise
            </p>
          </div>

          {/* Photo */}
          <div style={{ marginBottom: 'clamp(0.4rem, 1.2vh, 0.75rem)' }}>
            <HeroImageMobile />
          </div>

          {/* Texte */}
          <div className={`hero-block animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              En formation <span className="text-foreground font-medium">CDA (RNCP 6)</span>{' '}
              à l'Ada Tech School de Nantes.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5">
              Mon métier de comptable m'a appris la{' '}
              <span className="text-foreground font-medium">rigueur</span>,
              le <span className="text-foreground font-medium">respect des délais</span>{' '}
              et le <span className="text-foreground font-medium">travail en équipe</span>.
            </p>
          </div>

          {/* CTA */}
          <div className={`hero-block flex flex-col items-center gap-2 animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
            <Button variant="primary" size="lg" onClick={() => onNavigate('projects')}>
              Voir mes projets
            </Button>
            <SocialLinks size="sm" />
          </div>

          {/* Badges */}
          <div className={`flex flex-col gap-1.5 w-full animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
            <div className="hero-badge hero-badge-green">
              <span className="status-dot-wrap">
                <span className="status-ping status-ping-green" />
                <span className="status-dot status-dot-green" />
              </span>
              <span className="hero-badge-label">Stage · 8 sem. · 08 juin – 24 juil. 2026</span>
            </div>
            <div className="hero-badge hero-badge-blue">
              <span className="status-dot-wrap">
                <span className="status-ping status-ping-blue" />
                <span className="status-dot status-dot-blue" />
              </span>
              <span className="hero-badge-label">Alternance · sept. 2026 · 24 mois · RNCP 6</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* Photo mobile — carrée avec coins arrondis, style desktop réduit */
function HeroImageMobile() {
  return (
    <div className="hero-img-mobile-wrap">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)]" />
      </div>
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-accent/30 shadow-xl">
        <img
          src="./images/hero.jpg"
          alt="Antoine Mourin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background opacity-30 pointer-events-none" />
      </div>
    </div>
  );
}

/* Photo desktop */
function HeroImage() {
  return (
    <div className="hero-img-wrap">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)]" />
        <div className="hero-pulse-2 absolute rounded-full opacity-10 animate-pulse-soft bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] [animation-delay:1s]" />
      </div>
      <div className="relative w-full h-full hero-img-frame overflow-hidden border-accent/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
        <img
          src="./images/hero.jpg"
          alt="Antoine Mourin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background opacity-40 pointer-events-none" />
      </div>
      <div className="hero-glow-tr absolute bg-accent rounded-full opacity-20 blur-xl animate-pulse-soft" />
      <div className="hero-glow-bl absolute bg-sage rounded-full opacity-20 blur-xl animate-pulse-soft [animation-delay:1.5s]" />
    </div>
  );
}