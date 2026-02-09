import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ── Colonne gauche : Contenu texte ──────────────── */}
          <div className="space-y-8 animate-fade-in">

            {/* ── Titre principal ─────────────────────────────── */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold tracking-tight">
                Antoine Mourin
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
                Développeur Full-Stack en formation
              </p>
            </div>

            {/* ── Description ─────────────────────────────────── */}
            <div className="space-y-4 animate-slide-up animation-delay-200">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Apprenant développeur en formation{' '}
                <span className="text-foreground font-medium">
                  Concepteur Développeur d'Applications
                </span>{' '}
                (RNCP niveau 6) à l'Ada Tech School de Nantes.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Recherche active</span> : 
                Stage de 2 mois (juin 2026) et alternance 24 mois (sept. 2026) — 
                Ouvert aux opportunités tech, fintech et transformation digitale.
              </p>
            </div>

            {/* ── CTA + liens sociaux ─────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-slide-up animation-delay-400">

              {/* CTA principal */}
              <Button variant="primary" size="lg" icon={<ArrowDown />} onClick={scrollToProjects}>
                Voir mes projets
              </Button>

              {/* Icônes sociales */}
              <div className="flex gap-3">
                <Button
                  as="a"
                  variant="ghost"
                  size="md"
                  icon={<Github />}
                  href="https://github.com/Atefoub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                />
                <Button
                  as="a"
                  variant="ghost"
                  size="md"
                  icon={<Linkedin />}
                  href="https://www.linkedin.com/in/antoine-mourin-0033ab233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                />
                <Button
                  as="a"
                  variant="ghost"
                  size="md"
                  icon={<Mail />}
                  href="mailto:antoinem1pro@gmail.com"
                  aria-label="Email"
                />
              </div>
            </div>

            {/* ── Badge de disponibilité ────────────────────── */}
            <div className="flex flex-wrap gap-3 animate-slide-up animation-delay-600">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Disponible pour stage (juin 2026)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Alternance (sept. 2026 - 24 mois)
              </span>
            </div>
          </div>

          {/* ── Colonne droite : Image ──────────────────────── */}
          <div className="relative animate-slide-up animation-delay-300">
            <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto">
              {/* Cercles décoratifs en arrière-plan */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="absolute w-full h-full rounded-full opacity-20 animate-pulse-soft"
                  style={{
                    background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                  }}
                />
                <div 
                  className="absolute w-[90%] h-[90%] rounded-full opacity-10 animate-pulse-soft"
                  style={{
                    background: 'radial-gradient(circle, var(--color-sage) 0%, transparent 70%)',
                    animationDelay: '1s'
                  }}
                />
              </div>

              {/* Image avec effet glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent/50">
                <img 
                  src=".\images\hero.jpg" 
                  alt="Antoine Mourin - Développeur Full-Stack" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay dégradé subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Points décoratifs flottants */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 blur-xl animate-pulse-soft"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-sage rounded-full opacity-20 blur-xl animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}