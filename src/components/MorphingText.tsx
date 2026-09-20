import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/motion';
import { cn } from '../lib/utils';

const HOLD_MS = 4200;
const MOVE_MS = 720;
const FADE_MS = 480;

type Glyph = { key: string; char: string };

let glyphSeq = 0;

function tokenize(text: string): Glyph[] {
  return [...text].map((char) => ({
    key: `g-${glyphSeq++}`,
    char: char === ' ' ? '\u00a0' : char,
  }));
}

function nextGlyphs(prev: Glyph[], nextText: string): { keep: Glyph[]; exit: Glyph[] } {
  const nextChars = [...nextText].map((char) => (char === ' ' ? '\u00a0' : char));
  const used = new Set<number>();
  const keep: Glyph[] = nextChars.map((char) => {
    const idx = prev.findIndex((g, i) => !used.has(i) && g.char === char);
    if (idx >= 0) {
      used.add(idx);
      return prev[idx];
    }
    return { key: `g-${glyphSeq++}`, char };
  });
  const exit = prev.filter((_, i) => !used.has(i));
  return { keep, exit };
}

type Ghost = { key: string; char: string; x: number; y: number };

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
  const firstPaint = useRef(true);

  const snapshot = () => {
    const map = new Map<string, DOMRect>();
    lineRef.current?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el) => {
      map.set(el.dataset.glyph!, el.getBoundingClientRect());
    });
    rectsRef.current = map;
  };

  const glyphsRef = useRef(glyphs);
  glyphsRef.current = glyphs;

  const skipMorphOnMount = useRef(true);

  useEffect(() => {
    if (phrases.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  useEffect(() => {
    if (skipMorphOnMount.current) {
      skipMorphOnMount.current = false;
      return;
    }

    const next = phrases[index] ?? '';
    if (reduced) {
      setGlyphs(tokenize(next));
      setGhosts([]);
      return;
    }

    snapshot();
    const { keep, exit } = nextGlyphs(glyphsRef.current, next);
    const line = lineRef.current?.getBoundingClientRect();
    setGlyphs(keep);
    setGhosts(
      exit.flatMap((g) => {
        const r = rectsRef.current.get(g.key);
        if (!r || !line) return [];
        return [{ key: g.key, char: g.char, x: r.left - line.left, y: r.top - line.top }];
      }),
    );
  }, [index, phrases, reduced]);

  useLayoutEffect(() => {
    if (reduced || firstPaint.current) {
      firstPaint.current = false;
      snapshot();
      return;
    }

    const line = lineRef.current;
    if (!line) return;

    line.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el) => {
      const key = el.dataset.glyph!;
      const prev = rectsRef.current.get(key);
      const now = el.getBoundingClientRect();
      el.getAnimations().forEach((a) => a.cancel());

      if (prev) {
        const dx = prev.left - now.left;
        const dy = prev.top - now.top;
        if (dx !== 0 || dy !== 0) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
            { duration: MOVE_MS, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          );
        }
      } else {
        el.animate(
          [
            { opacity: 0, filter: 'blur(7px)', transform: 'translateY(10px)' },
            { opacity: 1, filter: 'blur(0px)', transform: 'none' },
          ],
          { duration: FADE_MS, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        );
      }
    });

    snapshot();
  }, [glyphs, reduced]);

  useEffect(() => {
    if (ghosts.length === 0) return;
    const id = window.setTimeout(() => setGhosts([]), FADE_MS);
    return () => window.clearTimeout(id);
  }, [ghosts]);

  const longest = phrases.reduce((a, b) => (a.length >= b.length ? a : b), '');

  return (
    <div className={cn('morph-text', className)} aria-live="polite" aria-atomic="true" data-morph-index={index}>
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
