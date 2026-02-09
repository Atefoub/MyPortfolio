import { useState } from 'react';

export default function Logo() {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration de l'URL Juggling Lab
  const pattern = '531';
  
  // URL fonctionnelle avec dimensions agrandies pour afficher l'animation complète
  const jugglingLabUrl = `https://jugglinglab.org/anim?pattern=${pattern};width=300;height=400;fps=30;slowdown=2.0;border=0;showground=false;prop=ball`;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={togglePopup}
        className="relative group block focus:outline-none"
        aria-label="Afficher l'animation de jonglage"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Cercles pulsants en arrière-plan */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(153, 198, 196, 0.3) 0%, transparent 70%)',
                animation: 'pulse-ring 2s ease-out infinite'
              }}
            />
            <div 
              className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(131, 160, 139, 0.2) 0%, transparent 70%)',
                animation: 'pulse-ring 2s ease-out infinite 0.5s'
              }}
            />
          </div>

          {/* Fond principal avec bordure */}
          <div 
            className={`
              relative w-11 h-11 rounded-full flex items-center justify-center
              border-2 transition-all duration-300
              group-hover:border-accent group-hover:scale-110
              ${isOpen ? 'border-accent scale-110' : ''}
            `}
            style={{
              borderColor: isOpen ? 'var(--color-accent)' : 'var(--color-border)',
              background: 'linear-gradient(135deg, var(--color-muted) 0%, var(--color-background) 100%)',
            }}
          >
            {/* Lettres avec effet de couleur au hover */}
            <span className={`text-xl font-bold transition-all duration-300 group-hover:text-accent ${isOpen ? 'text-accent' : ''}`}>
              AM
            </span>
          </div>

          {/* Points décoratifs qui orbitent */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent"
              style={{
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'orbit 3s linear infinite'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent"
              style={{
                top: '50%',
                right: '10%',
                transform: 'translateY(-50%)',
                animation: 'orbit 3s linear infinite 1s'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent"
              style={{
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'orbit 3s linear infinite 2s'
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes pulse-ring {
            0% {
              transform: scale(0.9);
              opacity: 0.6;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          @keyframes orbit {
            0%, 100% {
              transform: rotate(0deg) translateX(20px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(20px) rotate(-360deg);
            }
          }
        `}</style>
      </button>

      {/* Popup avec l'animation Juggling Lab - POSITIONNEMENT FIXE */}
      {isOpen && (
        <>
          {/* Overlay pour fermer au clic extérieur */}
          <div 
            className="fixed inset-0 z-40"
            onClick={togglePopup}
          />
          
          {/* Popup en position fixe pour garantir qu'elle soit entièrement visible */}
          <div 
            className="fixed top-20 left-4 z-50"
            style={{
              animation: 'slideInLeft 0.3s ease-out'
            }}
          >
            {/* Container de l'animation - AGRANDI pour afficher l'animation complète */}
            <div className="relative bg-background border-2 border-accent rounded-xl shadow-2xl overflow-hidden">
              {/* Badge "531" avec bouton fermer */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <div className="px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-bold shadow-lg">
                  531
                </div>
                <button
                  onClick={togglePopup}
                  className="w-7 h-7 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-border"
                  aria-label="Fermer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Animation Juggling Lab - Dimensions agrandies */}
              <div className="relative w-[300px] h-[400px] bg-gradient-to-br from-muted/30 to-background rounded-t-lg overflow-hidden">
                <iframe
                  src={jugglingLabUrl}
                  title="Juggling pattern 531"
                  className="w-full h-full border-0"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              {/* Légende avec informations */}
              <div className="px-4 pb-3 pt-2 bg-muted/30 border-t border-border">
                <p className="text-xs text-center">
                  <span className="font-semibold text-foreground">Siteswap 531</span>
                </p>
                <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
                  Powered by Juggling Lab
                </p>
              </div>
            </div>

            <style>{`
              @keyframes slideInLeft {
                from {
                  opacity: 0;
                  transform: translateX(-20px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
            `}</style>
          </div>
        </>
      )}
    </div>
  );
}