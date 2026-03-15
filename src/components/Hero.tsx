import { ANIMATION_DELAYS, type ViewId } from '../lib/constants';
import Button from './Button';
import SocialLinks from './SocialLinks';

interface HeroProps {
  onNavigate: (view: ViewId) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      className="hero-section px-4 sm:px-6 md:px-8 lg:px-16"
      id="hero"
    >
      <div className="max-w-7xl w-full mx-auto h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">

          {/* Image — premier sur mobile, second sur desktop */}
          <div className="order-1 lg:order-2 flex justify-center">
            <HeroImage />
          </div>

          {/* Texte */}
          <div className="order-2 lg:order-1 hero-text-col animate-fade-in">

            <div className="hero-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                Antoine Mourin
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light mt-1.5">
                Développeur Full-Stack · 15 ans d'expérience en entreprise
              </p>
            </div>

            <div className={`hero-block animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                En formation{' '}
                <span className="text-foreground font-medium">
                  Concepteur Développeur d'Applications (RNCP 6)
                </span>{' '}
                à l'Ada Tech School de Nantes.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-2">
                Mon métier de comptable m'a appris la{' '}
                <span className="text-foreground font-medium">rigueur</span>,
                le{' '}
                <span className="text-foreground font-medium">respect des délais</span>{' '}
                et le{' '}
                <span className="text-foreground font-medium">travail en équipe</span>.
                Je cherche à les mettre au service d'une équipe tech.
              </p>
            </div>

            <div
              className={`hero-block flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('projects')}
              >
                Voir mes projets
              </Button>
              <SocialLinks />
            </div>

            {/* Badges disponibilité */}
            <div className={`hero-block flex flex-col gap-2 animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
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
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className={`relative animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
      <div className="relative aspect-square w-48 sm:w-64 md:w-72 lg:w-full lg:max-w-sm xl:max-w-md mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)]" />
          <div className="absolute w-[90%] h-[90%] rounded-full opacity-10 animate-pulse-soft bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] [animation-delay:1s]" />
        </div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
          <img
            src="./images/hero.jpg"
            alt="Antoine Mourin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background opacity-40 pointer-events-none" />
        </div>

        <div className="absolute -top-3 -right-3 w-12 sm:w-16 h-12 sm:h-16 bg-accent rounded-full opacity-20 blur-xl animate-pulse-soft" />
        <div className="absolute -bottom-3 -left-3 w-10 sm:w-12 h-10 sm:h-12 bg-sage rounded-full opacity-20 blur-xl animate-pulse-soft [animation-delay:1.5s]" />
      </div>
    </div>
  );
}