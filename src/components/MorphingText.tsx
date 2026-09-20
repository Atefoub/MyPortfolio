import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/motion';
import { cn } from '../lib/utils';

const HOLD_MS = 3600;
const MOVE_MS = 760;
const FADE_MS = 420;
const MATCH_RADIUS = 8;

type Glyph = { key: string; char: string };
type Ghost = { key: string; char: string; x: number; y: number };

let glyphSeq = 0;

function toChars(text: string): string[] {
  return [...text].map((char) => (char === ' ' ? '\u00a0' : char));
}

function tokenize(text: string): Glyph[] {
  return toChars(text).map((char) => ({ key: `g-${glyphSeq++}`, char }));
}

function readText(glyphs: Glyph[]): string {
  return glyphs.map((g) => (g.char === '\u00a0' ? ' ' : g.char)).join('');
}

/** Prefer nearby identical letters so the morph stays readable. */
function nextGlyphs(prev: Glyph[], nextText: string): { keep: Glyph[]; exit: Glyph[] } {
  const nextChars = toChars(nextText);
  const used = new Set<number>();
  const keep: Glyph[] = nextChars.map((char, newIdx) => {
    let best = -1;
    let bestDist = Infinity;
    for (let i = 0; i < prev.length; i++) {
      if (used.has(i) || prev[i].char !== char) continue;
      const dist = Math.abs(i - newIdx);
      if (dist > MATCH_RADIUS) continue;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    if (best >= 0) {
      used.add(best);
      return prev[best];
    }
    return { key: `g-${glyphSeq++}`, char };
  });
  const exit = prev.filter((_, i) => !used.has(i));
  return { keep, exit };
}

function capture(line: HTMLElement | null): Map<string, DOMRect> {
  const map = new Map<string, DOMRect>();
  line?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el) => {
    const key = el.dataset.glyph;
    if (key) map.set(key, el.getBoundingClientRect());
  });
  return map;
}

export default function MorphingText({
  phrases,
  className,
}: {
  phrases: readonly string[];
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [glyphs, setGlyphs] = useState<Glyph[]>(() => tokenize(phrases[0] ?? ''));
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const rectsRef = useRef<Map<string, DOMRect>>(new Map());
  const glyphsRef = useRef(glyphs);
  const pendingFlip = useRef(false);
  glyphsRef.current = glyphs;

  useEffect(() => {
    if (phrases.length < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  useEffect(() => {
    const next = phrases[index] ?? '';
    if (readText(glyphsRef.current) === next) return;

    rectsRef.current = capture(lineRef.current);

    if (reduced) {
      pendingFlip.current = false;
      setGhosts([]);
      setGlyphs(tokenize(next));
      return;
    }

    const { keep, exit } = nextGlyphs(glyphsRef.current, next);
    const box = lineRef.current?.getBoundingClientRect();
    pendingFlip.current = true;
    setGlyphs(keep);
    setGhosts(
      exit.flatMap((g) => {
        const r = rectsRef.current.get(g.key);
        if (!r || !box) return [];
        return [{
          key: `out-${g.key}-${glyphSeq++}`,
          char: g.char,
          x: r.left - box.left,
          y: r.top - box.top,
        }];
      }),
    );
  }, [index, phrases, reduced]);

  useLayoutEffect(() => {
    if (!pendingFlip.current) return;
    pendingFlip.current = false;
    const line = lineRef.current;
    if (!line) return;

    line.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el) => {
      const key = el.dataset.glyph;
      if (!key) return;
      const prev = rectsRef.current.get(key);
      const now = el.getBoundingClientRect();
      try {
        el.getAnimations().forEach((a) => a.cancel());
        if (prev) {
          const dx = prev.left - now.left;
          const dy = prev.top - now.top;
          if (dx !== 0 || dy !== 0) {
            el.animate(
              [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: 'translate(0px, 0px)' },
              ],
              { duration: MOVE_MS, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
            );
          }
        } else {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'translate(0px, 0px)' },
            ],
            { duration: FADE_MS, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          );
        }
      } catch {
        // Some browsers reject WAAPI on detached nodes; the new letters still show.
      }
    });
  }, [glyphs]);

  useEffect(() => {
    if (ghosts.length === 0) return undefined;
    const id = window.setTimeout(() => setGhosts([]), FADE_MS);
    return () => window.clearTimeout(id);
  }, [ghosts]);

  const longest = phrases.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <div
      className={cn('morph-text', className)}
      aria-live="polite"
      aria-atomic="true"
      data-morph-index={index}
    >
      <span className="morph-text-sizer" aria-hidden="true">
        {longest}
      </span>
      <div ref={lineRef} className="morph-text-line">
        {glyphs.map((g) => (
          <span key={g.key} data-glyph={g.key} className="morph-char">
            {g.char}
          </span>
        ))}
        {ghosts.map((g) => (
          <span
            key={g.key}
            className="morph-char morph-char-exit"
            style={{ left: g.x, top: g.y }}
            aria-hidden="true"
          >
            {g.char}
          </span>
        ))}
      </div>
    </div>
  );
}
