import { useState } from 'react';
import { CAROUSEL_BREAKPOINTS, JUGGLING_POPUP } from '../lib/constants';
import { useIsMobile } from '../lib/hooks';

export default function Logo() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile(CAROUSEL_BREAKPOINTS.MOBILE);

  const pattern = '531';
  const jugglingLabUrl = `https://jugglinglab.org/anim?pattern=${pattern};width=${JUGGLING_POPUP.WIDTH};height=${JUGGLING_POPUP.HEIGHT};fps=30;slowdown=2.0;border=0;showground=false;prop=ball`;

  const togglePopup = () => setIsOpen(!isOpen);

  // Positionnement popup selon taille écran
  const popupPositionStyle: React.CSSProperties = isMobile
    ? { position: 'fixed', top: '72px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }
    : { position: 'fixed', top: '72px', left: '16px', zIndex: 50 };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="relative group block focus:outline-none"
        aria-label="Afficher l'animation de jonglage"
      >
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          {/* Cercles pulsants — styles dans index.css (.pulse-ring-*) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-1" />
            <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-2" />
          </div>

          {/* Fond principal — styles dans index.css (.logo-background) */}
          <div
            className={`
              relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
              border-2 transition-all duration-300 logo-background
              group-hover:border-accent group-hover:scale-110
              ${isOpen ? 'border-accent scale-110' : 'border-border'}
            `}
          >
            <span
              className={`text-base sm:text-xl font-bold transition-all duration-300 group-hover:text-accent ${isOpen ? 'text-accent' : ''}`}
            >
              AM
            </span>
          </div>

          {/* Orbiting dots — styles dans index.css (.orbit-dot-*) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-1" />
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-2" />
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-3" />
          </div>
        </div>
      </button>

      {/* Popup — styles dans index.css (.popup-slide-in, .popup-gradient, .iframe-no-interaction) */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={togglePopup} />

          <div style={popupPositionStyle} className="popup-slide-in">
            <div className="relative bg-background border-2 border-accent rounded-xl shadow-2xl overflow-hidden">
              {/* Badge + bouton fermer */}
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

              {/* iFrame Juggling Lab */}
              <div
                className="relative popup-gradient rounded-t-lg overflow-hidden"
                style={{
                  width: JUGGLING_POPUP.WIDTH,
                  height: JUGGLING_POPUP.HEIGHT,
                  minWidth: JUGGLING_POPUP.WIDTH,
                  maxWidth: JUGGLING_POPUP.WIDTH,
                  minHeight: JUGGLING_POPUP.HEIGHT,
                  maxHeight: JUGGLING_POPUP.HEIGHT,
                }}
              >
                <iframe
                  src={jugglingLabUrl}
                  title="Juggling pattern 531"
                  className="w-full h-full border-0 iframe-no-interaction"
                  loading="eager"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              {/* Légende */}
              <div className="px-3 pb-2 pt-1.5 bg-muted/30 border-t border-border">
                <p className="text-xs text-center">
                  <span className="font-semibold text-foreground">Siteswap 531</span>
                </p>
                <p className="text-[9px] text-center text-muted-foreground mt-1 italic">
                  Powered by Juggling Lab
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}