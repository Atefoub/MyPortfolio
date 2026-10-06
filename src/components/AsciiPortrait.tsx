import { useEffect, useRef } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '../lib/motion';

const CHARS = ' .:-=+*#%@';
const CELL = 8;
const MAX_RADIUS = 0.4;
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
  const mouseRef = useRef({ x: 0.5, y: 0.42, tx: 0.5, ty: 0.42, inside: false, radius: 0 });
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

    const buffer = document.createElement('canvas');
    const mouse = mouseRef.current;
    let running = false;
    let last = 0;
    let asciiReady = false;

    const drawFrame = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !asciiReady) return;
      const w = buffer.width;
      const h = buffer.height;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(buffer, 0, 0);
      if (mouse.radius < 0.004) return;

      const cx = mouse.x * w;
      const cy = mouse.y * h;
      const r = mouse.radius * Math.min(w, h);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const g = ctx.createRadialGradient(cx, cy, r * 0.42, cx, cy, r);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(0.7, 'rgba(0,0,0,0.92)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const paintAscii = () => {
      const w = Math.max(1, Math.round(wrap.clientWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight));
      if (!img.naturalWidth || w < 2 || h < 2) return;

      const sample = document.createElement('canvas');
      sample.width = w;
      sample.height = h;
      const sctx = sample.getContext('2d', { willReadFrequently: true });
      if (!sctx) return;
      drawCover(sctx, img, w, h);
      const pixels = sctx.getImageData(0, 0, w, h);

      buffer.width = w;
      buffer.height = h;
      const bctx = buffer.getContext('2d');
      if (!bctx) return;

      const styles = getComputedStyle(wrap);
      const fg = styles.getPropertyValue('--ascii-fg').trim() || '#f6f1e4';
      const dim = styles.getPropertyValue('--ascii-dim').trim() || '#d6ff4a';
      const plate = styles.getPropertyValue('--ascii-plate').trim() || '#14181f';

      bctx.fillStyle = plate;
      bctx.fillRect(0, 0, w, h);
      bctx.font = `600 ${CELL}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';

      for (let y = CELL * 0.5; y < h; y += CELL) {
        for (let x = CELL * 0.5; x < w; x += CELL) {
          const b = brightnessAt(pixels.data, pixels.width, pixels.height, x, y);
          const contrast = Math.max(0, Math.min(1, (0.92 - b) * 1.35));
          const ci = Math.min(CHARS.length - 1, Math.floor(contrast * (CHARS.length - 0.001)));
          bctx.globalAlpha = 0.28 + contrast * 0.72;
          bctx.fillStyle = contrast > 0.52 ? fg : dim;
          bctx.fillText(CHARS[ci], x, y);
        }
      }
      bctx.globalAlpha = 1;
      asciiReady = true;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame();
    };

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = Math.min(32, now - last || 16);
      last = now;
      mouse.x += (mouse.tx - mouse.x) * LERP;
      mouse.y += (mouse.ty - mouse.y) * LERP;
      const targetR = mouse.inside ? MAX_RADIUS : 0;
      mouse.radius += (targetR - mouse.radius) * 0.14 * (dt / 16);
      drawFrame();
      const settled =
        Math.abs(mouse.radius - targetR) < 0.004 &&
        Math.hypot(mouse.tx - mouse.x, mouse.ty - mouse.y) < 0.002;
      if (settled && !mouse.inside) {
        running = false;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
        mouse.radius = 0;
        drawFrame();
      }
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

    if (img.complete) paintAscii();
    img.addEventListener('load', paintAscii);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', paintAscii);
    const obs = new MutationObserver(paintAscii);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      img.removeEventListener('load', paintAscii);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', paintAscii);
      obs.disconnect();
    };
  }, [enabled, src]);

  return (
    <div ref={wrapRef} className="ascii-portrait-wrap">
      <img ref={imgRef} src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      {enabled && (
        <canvas ref={canvasRef} className="ascii-portrait-canvas" aria-hidden="true" />
      )}
    </div>
  );
}
