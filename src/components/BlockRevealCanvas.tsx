import { useEffect, useRef } from 'react';
import { MOTION } from '../lib/motion';

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform vec2 uRes;
uniform vec2 uImg0;
uniform vec2 uImg1;
uniform float uProgress;
uniform float uCover;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float parabola(float x, float k) {
  return pow(4.0 * x * (1.0 - x), k);
}

vec2 fitUV(vec2 uv, vec2 canvas, vec2 img) {
  float ca = canvas.x / max(canvas.y, 1.0);
  float ia = img.x / max(img.y, 1.0);
  vec2 scale = vec2(1.0);
  if (uCover > 0.5) {
    if (ia > ca) scale.x = ca / ia;
    else scale.y = ia / ca;
  } else {
    if (ia > ca) scale.y = ia / ca;
    else scale.x = ca / ia;
  }
  return (uv - 0.5) * scale + 0.5;
}

vec4 sampleFit(sampler2D tex, vec2 uv, vec2 img, float shift) {
  vec2 mapped = fitUV(uv + vec2(shift, 0.0), uRes, img);
  if (mapped.x < 0.0 || mapped.x > 1.0 || mapped.y < 0.0 || mapped.y > 1.0) {
    return vec4(0.0);
  }
  return texture2D(tex, mapped);
}

void main() {
  vec2 uv = vUv;
  float p = clamp(uProgress, 0.0, 1.0);
  float dt = parabola(p, 2.0);

  vec2 blockUv = floor(uv * 28.0) / 28.0;
  float n = hash(blockUv);
  float mask = step(n, p);

  vec2 displace = (vec2(n, hash(blockUv + 1.7)) - 0.5) * 2.0;
  vec2 warped = uv + displace * dt * 0.07;
  float rgb = dt * 0.014;

  vec4 a;
  a.r = sampleFit(uTex0, warped, uImg0, rgb).r;
  a.g = sampleFit(uTex0, warped, uImg0, 0.0).g;
  a.b = sampleFit(uTex0, warped, uImg0, -rgb).b;
  a.a = max(sampleFit(uTex0, warped, uImg0, 0.0).a, 0.001);

  vec4 b;
  b.r = sampleFit(uTex1, warped, uImg1, rgb).r;
  b.g = sampleFit(uTex1, warped, uImg1, 0.0).g;
  b.b = sampleFit(uTex1, warped, uImg1, -rgb).b;
  b.a = max(sampleFit(uTex1, warped, uImg1, 0.0).a, 0.001);

  gl_FragColor = mix(a, b, mask);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadTexture(
  gl: WebGLRenderingContext,
  src: string,
): Promise<{ tex: WebGLTexture; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const tex = gl.createTexture();
      if (!tex) {
        reject(new Error('texture'));
        return;
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      resolve({ tex, w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

interface BlockRevealCanvasProps {
  fromSrc: string;
  toSrc: string;
  cover: boolean;
  onComplete: () => void;
}

export default function BlockRevealCanvas({ fromSrc, toSrc, cover, onComplete }: BlockRevealCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      completeRef.current();
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      completeRef.current();
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      completeRef.current();
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uTex0 = gl.getUniformLocation(program, 'uTex0');
    const uTex1 = gl.getUniformLocation(program, 'uTex1');
    const uRes = gl.getUniformLocation(program, 'uRes');
    const uImg0 = gl.getUniformLocation(program, 'uImg0');
    const uImg1 = gl.getUniformLocation(program, 'uImg1');
    const uProgress = gl.getUniformLocation(program, 'uProgress');
    const uCover = gl.getUniformLocation(program, 'uCover');

    let raf = 0;
    let cancelled = false;
    let tex0: WebGLTexture | null = null;
    let tex1: WebGLTexture | null = null;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = Math.max(1, parent?.clientWidth ?? canvas.clientWidth);
      const h = Math.max(1, parent?.clientHeight ?? canvas.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, w, h);
    };

    const start = async () => {
      try {
        const [a, b] = await Promise.all([loadTexture(gl, fromSrc), loadTexture(gl, toSrc)]);
        if (cancelled) return;
        tex0 = a.tex;
        tex1 = b.tex;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, a.tex);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, b.tex);
        gl.uniform1i(uTex0, 0);
        gl.uniform1i(uTex1, 1);
        gl.uniform2f(uImg0, a.w, a.h);
        gl.uniform2f(uImg1, b.w, b.h);
        gl.uniform1f(uCover, cover ? 1 : 0);
        resize();

        const t0 = performance.now();
        const loop = (now: number) => {
          if (cancelled) return;
          const t = Math.min(1, (now - t0) / MOTION.BLOCK_REVEAL_MS);
          gl.uniform1f(uProgress, easeOutCubic(t));
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          if (t < 1) {
            raf = requestAnimationFrame(loop);
          } else {
            completeRef.current();
          }
        };
        raf = requestAnimationFrame(loop);
      } catch {
        if (!cancelled) completeRef.current();
      }
    };

    void start();
    window.addEventListener('resize', resize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (tex0) gl.deleteTexture(tex0);
      if (tex1) gl.deleteTexture(tex1);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (buf) gl.deleteBuffer(buf);
    };
  }, [fromSrc, toSrc, cover]);

  return <canvas ref={canvasRef} className="block-reveal-canvas" aria-hidden="true" />;
}
