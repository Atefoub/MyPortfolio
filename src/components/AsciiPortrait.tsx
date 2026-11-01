import { useEffect, useRef } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '../lib/motion';

const CHARS = ' .:-=+*#%@';
const CELL = 9;
const MAX_RADIUS = 0.26;
const LERP = 0.14;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let dw = w;
  let dh = h;
  let dx = 0;
  let dy = 0;
  if (ir > cr) {
    dw = h * ir;
    dx = (w - dw) / 2;
  } else {
    dh = w / ir;
    dy = (h - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function brightnessAt(data: Uint8ClampedArray, w: number, h: number, x: number, y: number): number {
  const ix = Math.max(0, Math.min(w - 1, x | 0));
  const iy = Math.max(0, Math.min(h - 1, y | 0));
  const i = (iy * w + ix) * 4;
  return (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
}

interface AsciiPortraitProps {
  src: string;
  alt: string;
}

export default function AsciiPortrait({ src, alt }: AsciiPortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sampleRef = useRef<HTMLCanvasElement | null>(null);
  const pixelsRef = useRef<ImageData | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, inside: false, radius: 0 });
  const rafRef = useRef(0);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!wrap || !canvas || !img) return;

    const sample = document.createElement('canvas');
    sampleRef.current = sample;
    const mouse = mouseRef.current;
    let running = false;
    let last = 0;

    const rebuildSample = () => {
      const w = Math.max(1, Math.round(wrap.clientWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight));
      if (!img.naturalWidth) return;
      sample.width = w;
      sample.height = h;
      const sctx = sample.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;
      sctx.clearRect(0, 0, w, h);
      drawCover(sctx, img, w, h);
      pixelsRef.current = sctx.getImageData(0, 0, w, h);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const ctx = canvas.getContext('2d');
      const pixels = pixelsRef.current;
      if (!ctx || !pixels) return;

      const w = sample.width;
      const h = sample.height;
      const dt = Math.min(32, now - last || 16);
      last = now;
      const t = now * 0.001;

      mouse.x += (mouse.tx - mouse.x) * LERP;
      mouse.y += (mouse.ty - mouse.y) * LERP;
      const targetR = mouse.inside ? MAX_RADIUS : 0;
      mouse.radius += (targetR - mouse.radius) * 0.12 * (dt / 16);

      ctx.clearRect(0, 0, w, h);
      if (mouse.radius < 0.004) {
        if (!mouse.inside) {
          running = false;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
        return;
      }

      const styles = getComputedStyle(wrap);
      const fg = styles.getPropertyValue('--color-foreground').trim() || '#35392e';
      const accent = styles.getPropertyValue('--color-accent').trim() || '#99c6c4';
      const bg = styles.getPropertyValue('--color-background').trim() || '#f5f7f5';

      const cx = mouse.x + Math.sin(t * 1.4) * 0.012;
      const cy = mouse.y + Math.cos(t * 1.1) * 0.01;
      const radius =
        mouse.radius * (1 + 0.07 * Math.sin(t * 2.2) + 0.04 * Math.sin(t * 3.6));
      const minSide = Math.min(w, h);
      const rPx = radius * minSide;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx * w, cy * h, rPx, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.globalAlpha = 0.82;
      ctx.fill();
      ctx.clip();
      ctx.globalAlpha = 1;

      ctx.font = `700 ${CELL}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const x0 = Math.max(0, Math.floor((cx * w - rPx) / CELL) - 1);
      const y0 = Math.max(0, Math.floor((cy * h - rPx) / CELL) - 1);
      const x1 = Math.min(w / CELL, Math.ceil((cx * w + rPx) / CELL) + 1);
      const y1 = Math.min(h / CELL, Math.ceil((cy * h + rPx) / CELL) + 1);

      for (let gy = y0; gy < y1; gy++) {
        for (let gx = x0; gx < x1; gx++) {
          const px = gx * CELL + CELL * 0.5;
          const py = gy * CELL + CELL * 0.5;
          const dx = (px - cx * w) / minSide;
          const dy = (py - cy * h) / minSide;
          const dist = Math.hypot(dx, dy);
          if (dist > radius) continue;

          const edge = Math.min(1, (radius - dist) / Math.max(0.04, radius * 0.35));
          const b = brightnessAt(pixels.data, pixels.width, pixels.height, px, py);
          const contrast = Math.max(0, Math.min(1, (0.9 - b) * 1.4));
          const ci = Math.min(CHARS.length - 1, Math.floor(contrast * (CHARS.length - 0.001)));
          ctx.globalAlpha = 0.4 + edge * 0.6;
          ctx.fillStyle = contrast > 0.45 ? fg : accent;
          ctx.fillText(CHARS[ci], px, py);
        }
      }

      ctx.restore();
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
      mouse.inside = true;
      start();
    };

    const onLeave = () => {
      mouse.inside = false;
      start();
    };

    const onResize = () => rebuildSample();

    if (img.complete) rebuildSample();
    img.addEventListener('load', rebuildSample);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      img.removeEventListener('load', rebuildSample);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled, src]);

  return (
    <div ref={wrapRef} className="ascii-portrait-wrap">
      <img ref={imgRef} src={src} alt={alt} className="w-full h-full object-cover" />
      {enabled && (
        <canvas ref={canvasRef} className="ascii-portrait-canvas" aria-hidden="true" />
      )}
    </div>
  );
}
