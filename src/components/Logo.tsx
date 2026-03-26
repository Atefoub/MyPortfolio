import { useState, useEffect, useRef } from 'react';
import { CAROUSEL_BREAKPOINTS, JUGGLING_POPUP } from '../lib/constants';
import { useIsMobile } from '../lib/hooks';

const PATTERNS = [
  { code: '531', name: 'Five-Three-One', balls: 3 },
  { code: '441', name: 'Four-Four-One',  balls: 3 },
  { code: '7',   name: 'Fontaine 7',     balls: 7 },
  { code: '645', name: 'Six-Four-Five',  balls: 5 },
  { code: '3',   name: 'Cascade',        balls: 3 },
];

function jugglingUrl(code: string) {
  return `https://jugglinglab.org/anim?pattern=${code};width=${JUGGLING_POPUP.WIDTH};height=${JUGGLING_POPUP.HEIGHT};fps=30;slowdown=2.0;border=0;showground=false;startpaused=false`;
}

/* ── Sous-composant isolé : gère son propre état loading ── */
function IframeWithSkeleton({ src, pattern }: { src: string; pattern: typeof PATTERNS[0] }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="popup-iframe-wrap">
      {loading && (
        <div className="popup-skeleton">
          <div className="popup-skeleton-arc" />
          <div className="popup-skeleton-ball popup-skeleton-ball-1" />
          <div className="popup-skeleton-ball popup-skeleton-ball-2" />
          <div className="popup-skeleton-ball popup-skeleton-ball-3" />
          <div className="popup-skeleton-label">Chargement…</div>
        </div>
      )}
      <iframe
        src={src}
        title={`Juggling pattern ${pattern.code}`}
        width={JUGGLING_POPUP.WIDTH}
        height={JUGGLING_POPUP.HEIGHT}
        className="popup-iframe"
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}
        loading="eager"
        sandbox="allow-scripts allow-same-origin"
        scrolling="no"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export default function Logo() {
  const [isOpen, setIsOpen]             = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);
  const isMobile = useIsMobile(CAROUSEL_BREAKPOINTS.MOBILE);

  const preloadRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const currentPattern = PATTERNS[patternIndex];

  // Préconnexion Juggling Lab au montage
  useEffect(() => {
    const link = document.createElement('link');
    link.rel  = 'preconnect';
    link.href = 'https://jugglinglab.org';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleNextPattern = () => {
    setPatternIndex((prev) => {
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * PATTERNS.length);
      return next;
    });
  };

  const popupPositionStyle: React.CSSProperties = {
    position:  'fixed',
    top:       isMobile ? '72px' : '68px',
    left:      '50%',
    transform: 'translateX(-50%)',
    zIndex:    50,
  };

  return (
    <div className="relative">

      {/* ── Iframes cachées : préchargement silencieux de tous les patterns ── */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {PATTERNS.map((p) => (
          <iframe
            key={p.code}
            ref={(el) => { preloadRefs.current[p.code] = el; }}
            src={jugglingUrl(p.code)}
            title={`preload-${p.code}`}
            width={JUGGLING_POPUP.WIDTH}
            height={JUGGLING_POPUP.HEIGHT}
            sandbox="allow-scripts allow-same-origin"
            loading="eager"
            scrolling="no"
          />
        ))}
      </div>

      {/* ── Bouton AM ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative group block focus:outline-none"
        aria-label="Afficher l'animation de jonglage"
      >
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-1" />
            <div className="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-ring-2" />
          </div>
          <div className={`
            relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center
            border-2 transition-all duration-300 logo-background
            group-hover:border-accent group-hover:scale-110
            ${isOpen ? 'border-accent scale-110' : 'border-border'}
          `}>
            <span className={`text-base sm:text-xl font-bold transition-all duration-300 group-hover:text-accent ${isOpen ? 'text-accent' : ''}`}>
              AM
            </span>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-1" />
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-2" />
            <div className="absolute w-1 h-1 rounded-full bg-accent orbit-dot-3" />
          </div>
        </div>
      </button>

      {/* ── Popup ── */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div style={popupPositionStyle} className="popup-enter">
            <div className="popup-premium-wrapper">
              <div className="popup-premium-card">

                <div className="popup-premium-shine" />

                {/* Bouton fermer */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="popup-close-btn"
                  aria-label="Fermer"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Zone iframe + skeleton — remonté à chaque changement de pattern via key */}
                <IframeWithSkeleton
                  key={currentPattern.code}
                  src={jugglingUrl(currentPattern.code)}
                  pattern={currentPattern}
                />

                {/* Légende */}
                <div className="popup-legend">
                  <div className="popup-badges">
                    <span className="popup-badge-code">{currentPattern.code}</span>
                    <span className="popup-badge-name">{currentPattern.name}</span>
                    <span className="popup-badge-balls">● {currentPattern.balls} balles</span>
                  </div>

                  <button onClick={handleNextPattern} className="popup-pattern-btn">
                    <span className="popup-pattern-btn-dice">🎲</span>
                    Autre pattern
                  </button>

                  <p className="popup-powered">Powered by Juggling Lab</p>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}