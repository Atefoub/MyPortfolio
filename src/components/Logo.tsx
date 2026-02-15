import { useState } from 'react';

export default function Logo() {
  const [isOpen, setIsOpen] = useState(false);

  // Configuration de l'URL Juggling Lab
  const pattern = '531';
  
  // URL avec dimensions réduites pour une popup compacte
  const jugglingLabUrl = `https://jugglinglab.org/anim?pattern=${pattern};width=200;height=280;fps=30;slowdown=2.0;border=0;showground=false;prop=ball`;

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
              className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-1"
            />
            <div 
              className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-2"
            />
          </div>

          {/* Fond principal avec bordure */}
          <div 
            className={`
              relative w-11 h-11 rounded-full flex items-center justify-center
              border-2 transition-all duration-300 logo-background
              group-hover:border-accent group-hover:scale-110
              ${isOpen ? 'border-accent scale-110' : 'border-border'}
            `}
          >
            {/* Lettres avec effet de couleur au hover */}
            <span className={`text-xl font-bold transition-all duration-300 group-hover:text-accent ${isOpen ? 'text-accent' : ''}`}>
              AM
            </span>
          </div>

          {/* Points décoratifs qui orbitent */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-1"
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-2"
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-3"
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

          .pulse-ring-1 {
            background: radial-gradient(circle, rgba(153, 198, 196, 0.3) 0%, transparent 70%);
            animation: pulse-ring 2s ease-out infinite;
          }

          .pulse-ring-2 {
            background: radial-gradient(circle, rgba(131, 160, 139, 0.2) 0%, transparent 70%);
            animation: pulse-ring 2s ease-out infinite 0.5s;
          }

          .logo-background {
            background: linear-gradient(135deg, var(--color-muted) 0%, var(--color-background) 100%);
          }

          .orbit-dot-1 {
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation: orbit 3s linear infinite;
          }

          .orbit-dot-2 {
            top: 50%;
            right: 10%;
            transform: translateY(-50%);
            animation: orbit 3s linear infinite 1s;
          }

          .orbit-dot-3 {
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation: orbit 3s linear infinite 2s;
          }
        `}</style>
      </button>

      {/* Popup avec l'animation Juggling Lab - TAILLE RÉDUITE */}
      {isOpen && (
        <>
          {/* Overlay pour fermer au clic extérieur */}
          <div 
            className="fixed inset-0 z-40"
            onClick={togglePopup}
          />
          
          {/* Popup en position fixe - DIMENSIONS RÉDUITES */}
          <div 
            className="fixed top-20 left-4 z-50 slide-in-animation"
          >
            {/* Container de l'animation - RÉDUIT */}
            <div className="relative bg-background border-2 border-accent rounded-xl shadow-2xl overflow-hidden">
              {/* Badge "531" avec bouton fermer */}
              <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                <div className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold shadow-lg">
                  531
                </div>
                <button
                  onClick={togglePopup}
                  className="w-6 h-6 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-border"
                  aria-label="Fermer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Animation Juggling Lab - Dimensions réduites et FIXES */}
              <div 
                className="relative popup-gradient popup-container rounded-t-lg overflow-hidden"
              >
                <iframe
                  src={jugglingLabUrl}
                  title="Juggling pattern 531"
                  className="w-full h-full border-0 iframe-no-interaction"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              {/* Légende avec informations - COMPACTE */}
              <div className="px-3 pb-2 pt-1.5 bg-muted/30 border-t border-border">
                <p className="text-xs text-center">
                  <span className="font-semibold text-foreground">Siteswap 531</span>
                </p>
                <p className="text-[9px] text-center text-muted-foreground mt-1 italic">
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

              .slide-in-animation {
                animation: slideInLeft 0.3s ease-out;
              }

              .popup-gradient {
                background: linear-gradient(135deg, var(--color-muted), var(--color-background));
                opacity: 0.95;
              }

              .popup-container {
                width: 200px;
                height: 280px;
                min-width: 200px;
                max-width: 200px;
                min-height: 280px;
                max-height: 280px;
              }

              .iframe-no-interaction {
                pointer-events: none;
                user-select: none;
              }
            `}</style>
          </div>
        </>
      )}
    </div>
  );
}