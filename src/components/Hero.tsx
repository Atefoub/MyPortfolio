import { ArrowDown } from 'lucide-react';
import { ANIMATION_DELAYS } from '../lib/constants';
import Button from './Button';
import SocialLinks from './SocialLinks';

export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

          {/* Image — premier sur mobile, second sur desktop */}
          <div className="order-1 lg:order-2 flex justify-center">
            <HeroImage />
          </div>

          {/* Texte */}
          <div className="order-2 lg:order-1 space-y-5 sm:space-y-6 md:space-y-8 animate-fade-in">

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Antoine Mourin
              </h1>
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
                Développeur Full-Stack en formation
              </p>
            </div>

            <div className={`space-y-2 sm:space-y-3 animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Apprenant développeur en formation{' '}
                <span className="text-foreground font-medium">
                  Concepteur Développeur d'Applications
                </span>{' '}
                (RNCP niveau 6) à l'Ada Tech School de Nantes.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Recherche active</span> : Stage de 2 mois
                (juin 2026) et alternance 24 mois (sept. 2026)
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}
            >
              <Button variant="primary" size="lg" icon={<ArrowDown />} onClick={scrollToProjects}>
                Voir mes projets
              </Button>
              <SocialLinks />
            </div>

            {/* Badges disponibilité — wrappables sur mobile */}
            <div className={`flex flex-col gap-2 sm:gap-3 animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
              <div className="hero-badge hero-badge-green">
                <span className="hero-badge-dot-wrapper">
                  <span className="hero-badge-ping hero-badge-ping-green" />
                  <span className="hero-badge-dot hero-badge-dot-green" />
                </span>
                <span className="hero-badge-label">
                  Stage 8 semaines · 08 juin – 24 juillet 2026
                </span>
              </div>

              <div className="hero-badge hero-badge-blue">
                <span className="hero-badge-dot-wrapper">
                  <span className="hero-badge-ping hero-badge-ping-blue" />
                  <span className="hero-badge-dot hero-badge-dot-blue" />
                </span>
                <span className="hero-badge-label">Alternance · sept. 2026 – 24 mois</span>
              </div>
            </div>

            <style>{`
              .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 8px 14px;
                border-radius: 9999px;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.01em;
                border-width: 1.5px;
                border-style: solid;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                cursor: default;
                /* CORRIGÉ : wrap sur mobile */
                white-space: normal;
                word-break: break-word;
                max-width: 100%;
                width: fit-content;
              }
              /* nowrap dès 480px, les textes sont courts */
              @media (min-width: 480px) {
                .hero-badge {
                  padding: 10px 18px;
                  font-size: 0.85rem;
                  white-space: nowrap;
                }
              }
              .hero-badge:hover { transform: translateY(-2px); }

              .hero-badge-green {
                background: rgba(34, 197, 94, 0.12);
                border-color: rgba(34, 197, 94, 0.45);
                color: #16a34a;
              }
              .dark .hero-badge-green {
                color: #4ade80;
                background: rgba(34, 197, 94, 0.15);
                border-color: rgba(34, 197, 94, 0.4);
              }
              .hero-badge-green:hover { box-shadow: 0 4px 20px rgba(34, 197, 94, 0.25); }

              .hero-badge-blue {
                background: rgba(59, 130, 246, 0.12);
                border-color: rgba(59, 130, 246, 0.45);
                color: #2563eb;
              }
              .dark .hero-badge-blue {
                color: #60a5fa;
                background: rgba(59, 130, 246, 0.15);
                border-color: rgba(59, 130, 246, 0.4);
              }
              .hero-badge-blue:hover { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.25); }

              .hero-badge-dot-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 10px;
                height: 10px;
                flex-shrink: 0;
              }
              .hero-badge-ping {
                position: absolute;
                inset: 0;
                border-radius: 9999px;
                animation: hero-ping 1.6s ease-out infinite;
              }
              .hero-badge-ping-green { background: #22c55e; }
              .hero-badge-ping-blue  { background: #3b82f6; }

              .hero-badge-dot {
                position: relative;
                width: 10px;
                height: 10px;
                border-radius: 9999px;
                flex-shrink: 0;
              }
              .hero-badge-dot-green { background: #22c55e; }
              .hero-badge-dot-blue  { background: #3b82f6; }

              @keyframes hero-ping {
                0%   { transform: scale(1);   opacity: 0.7; }
                70%  { transform: scale(2.2); opacity: 0; }
                100% { transform: scale(2.2); opacity: 0; }
              }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className={`relative animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
      {/* Taille fixe par breakpoint pour éviter les débordements */}
      <div className="relative aspect-square w-52 sm:w-72 md:w-80 lg:w-full lg:max-w-md xl:max-w-lg mx-auto">
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

        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-accent rounded-full opacity-20 blur-xl animate-pulse-soft" />
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-sage rounded-full opacity-20 blur-xl animate-pulse-soft [animation-delay:1.5s]" />
      </div>
    </div>
  );
}