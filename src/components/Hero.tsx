import { ANIMATION_DELAYS, type ViewId } from '../lib/constants';
import { assetPath } from '../lib/utils';
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

            {/* Bloc 1 — Nom + sous-titre */}
            <div className="hero-block">
              <h1 className="hero-title font-bold tracking-tight leading-tight">
                Antoine Mourin
              </h1>
              <p className="hero-subtitle font-light mt-3">
                Développeur Full-Stack · 15 ans d'expérience en entreprise
              </p>
            </div>

            {/* Bloc 2 — Corps */}
            <div className={`hero-block animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              <p className="hero-body leading-relaxed">
                En formation{' '}
                <span className="text-foreground font-semibold">
                  Concepteur Développeur d'Applications (RNCP 6)
                </span>{' '}
                à l'Ada Tech School de Nantes.
              </p>
              <p className="hero-body leading-relaxed mt-3">
                Mon métier de comptable m'a appris la{' '}
                <span className="text-foreground font-semibold">rigueur</span>
                {', '}le{' '}
                <span className="text-foreground font-semibold">respect des délais</span>{' '}
                et le{' '}
                <span className="text-foreground font-semibold">travail en équipe</span>.
                <br />Je cherche à les mettre au service d'une équipe tech.
              </p>
            </div>

            {/* Bloc 3 — CTA */}
            <div className={`hero-block hero-cta animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
              <Button variant="primary" size="lg" onClick={() => onNavigate('projects')}>
                Voir mes projets
              </Button>
              <SocialLinks />
            </div>

            {/* Bloc 4 — Badges */}
            <div className={`hero-block hero-badges animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
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
                  Alternance · sept. 2026 · 24 mois · RNCP 7
                </span>
              </div>
            </div>

          </div>

          <div className="hero-img-col">
            <HeroImage />
          </div>
        </div>

        {/* ── Mobile : full immersif ── */}
        <div className="hero-mobile-immersif animate-fade-in">
          <img
            src={assetPath('images/hero.jpg')}
            alt="Antoine Mourin"
            className="hero-immersif-photo"
          />
          <div className="hero-immersif-gradient" />
          <div className="hero-immersif-content">
            <p className={`hero-immersif-intro animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              En formation <strong>CDA (RNCP 6)</strong> · Ada Tech School de Nantes
            </p>
            <h1 className="hero-immersif-name animate-fade-in">
              Antoine Mourin
            </h1>
            <p className="hero-immersif-subtitle">
              Développeur Full-Stack · 12 ans d'expérience
            </p>
            <div className={`flex flex-col gap-2 animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
              <div className="hero-badge-immersif hero-badge-immersif-green">
                <span className="status-dot-wrap">
                  <span className="status-ping status-ping-green" />
                  <span className="status-dot status-dot-green" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">Stage · 8 semaines</span>
                  <span className="hero-badge-immersif-sub">08 juin – 24 juillet 2026</span>
                </div>
              </div>
              <div className="hero-badge-immersif hero-badge-immersif-blue">
                <span className="status-dot-wrap">
                  <span className="status-ping status-ping-blue" />
                  <span className="status-dot status-dot-blue" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold">Alternance · 24 mois · RNCP 7</span>
                  <span className="hero-badge-immersif-sub">Dès sept. 2026 · Nantes / Ancenis / Angers</span>
                </div>
              </div>
            </div>
            <div className={`animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
              <Button variant="primary" size="md" onClick={() => onNavigate('projects')}>
                Voir mes projets
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className="hero-img-wrap">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)]" />
        <div className="hero-pulse-2 absolute rounded-full opacity-10 animate-pulse-soft bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] [animation-delay:1s]" />
      </div>
      <div className="relative w-full h-full hero-img-frame overflow-hidden border-accent/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
        <img
          src={assetPath('images/hero.jpg')}
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