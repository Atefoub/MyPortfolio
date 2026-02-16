import { ArrowDown } from 'lucide-react';
import { ANIMATION_DELAYS } from '../lib/constants';
import Button from './Button';
import SocialLinks from './SocialLinks';

const AVAILABILITY_BADGES = [
  { color: 'green', label: 'Disponible pour stage (juin 2026)' },
  { color: 'blue', label: 'Alternance (sept. 2026 - 24 mois)' },
];

export default function Hero() {
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenu texte */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold tracking-tight">Antoine Mourin</h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
                Développeur Full-Stack en formation
              </p>
            </div>

            <div className={`space-y-4 animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Apprenant développeur en formation{' '}
                <span className="text-foreground font-medium">Concepteur Développeur d'Applications</span>{' '}
                (RNCP niveau 6) à l'Ada Tech School de Nantes.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Recherche active</span> : Stage de 2 mois (juin 2026) et alternance 24 mois (sept. 2026)
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-slide-up ${ANIMATION_DELAYS.MEDIUM}`}>
              <Button variant="primary" size="lg" icon={<ArrowDown />} onClick={scrollToProjects}>
                Voir mes projets
              </Button>
              <SocialLinks />
            </div>

            <div className={`flex flex-wrap gap-3 animate-slide-up ${ANIMATION_DELAYS.LONG}`}>
              {AVAILABILITY_BADGES.map(({ color, label }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 rounded-full text-sm font-medium border border-${color}-500/20`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <HeroImage />
        </div>
      </div>
    </section>
  );
}

function HeroImage() {
  return (
    <div className={`relative animate-slide-up ${ANIMATION_DELAYS.SHORT}`}>
      <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_70%)]" />
          <div className="absolute w-[90%] h-[90%] rounded-full opacity-10 animate-pulse-soft bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] [animation-delay:1s]" />
        </div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
          <img src="./images/hero.jpg" alt="Antoine Mourin" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-40 pointer-events-none" />
        </div>

        <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 blur-xl animate-pulse-soft" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-sage rounded-full opacity-20 blur-xl animate-pulse-soft [animation-delay:1.5s]" />
      </div>
    </div>
  );
}