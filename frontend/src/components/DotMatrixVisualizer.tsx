import { useEffect, useRef } from "react";
import type { AnalyserHandle } from "../hooks/useAudioAnalyser";

interface Props {
  handleRef: React.RefObject<AnalyserHandle | null>;
  isPlaying: boolean;
  cols?: number;
  rows?: number;
  className?: string;
  ariaLabel?: string;
  colorWave?: boolean;
  mouseReact?: boolean;
}

const ACCENT_RGB: ReadonlyArray<readonly [number, number, number]> = [
  [184, 224, 168], // #b8e0a8 green
  [255, 77, 139], // #ff4d8b pink
  [244, 184, 96], // #f4b860 orange
  [231, 76, 94], // #e74c5e red
  [167, 139, 250], // #a78bfa purple
];

/**
 * 64x16 grid of dots. Each column is driven by one frequency bin from the
 * AnalyserNode. When silent (or paused), it falls back to a slow noise pattern
 * so the canvas never looks dead.
 */
export function DotMatrixVisualizer({
  handleRef,
  isPlaying,
  cols = 64,
  rows = 16,
  className,
  ariaLabel = "Dot matrix audio visualizer",
  colorWave = false,
  mouseReact = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const hoverRef = useRef(false);
  const hoverFadeRef = useRef(0);
  const stateRef = useRef({
    smoothed: new Float32Array(cols),
    phase: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };
    const onEnter = () => {
      hoverRef.current = true;
    };
    const onLeave = () => {
      hoverRef.current = false;
      mouseRef.current = null;
    };
    const interactive = mouseReact || colorWave;
    if (interactive) {
      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseenter", onEnter);
      wrap.addEventListener("mouseleave", onLeave);
    }

    const readVar = (name: string, fallback: string) => {
      const v = getComputedStyle(document.body).getPropertyValue(name).trim();
      return v || fallback;
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cellW = W / cols;
      const cellH = H / rows;
      const radius = Math.min(cellW, cellH) * 0.32;

      ctx2d.clearRect(0, 0, W, H);

      const dotColor = readVar("--dot-color", "#b8e0a8");
      const dotSecondary = readVar("--dot-color-secondary", dotColor);

      const handle = handleRef.current;
      const data = handle?.data;
      if (handle && data) {
        handle.analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>);
      }
      const binCount = data?.length ?? cols;

      const smoothed = stateRef.current.smoothed;
      stateRef.current.phase += 0.012;
      const phase = stateRef.current.phase;

      // Skip sub-bass bins (they dominate and saturate). Spread the rest across
      // the columns on a log curve so the visible spectrum is roughly even.
      const binStart = 4;
      const binEnd = Math.floor(binCount * 0.78);
      const binSpan = binEnd - binStart;
      for (let c = 0; c < cols; c++) {
        const t = c / (cols - 1);
        // log mapping so highs get reasonable real-estate without jamming bass left
        const logT = Math.log10(1 + t * 9);
        const binIdx = Math.min(
          binCount - 1,
          binStart + Math.floor(logT * binSpan),
        );
        const rawByte = data ? data[binIdx] / 255 : 0;
        // Soft compression so loud bass doesn't peg the visualizer; gain trim
        // so the meter sits in the middle of the grid at typical listening levels.
        const compressed = Math.pow(rawByte, 0.85) * 0.7;
        // Idle noise so silence still looks alive.
        const idle =
          0.06 +
          0.05 *
            (Math.sin(phase * 1.7 + c * 0.31) * 0.5 +
              Math.sin(phase * 0.9 - c * 0.18) * 0.5);
        const target = isPlaying ? Math.max(compressed, idle * 0.5) : idle;
        // Smoothed envelope follows target with falloff.
        const prev = smoothed[c];
        const k = target > prev ? 0.55 : 0.12;
        smoothed[c] = prev + (target - prev) * k;
      }

      const mouse = mouseReact ? mouseRef.current : null;
      const mouseRadius = Math.min(W, H) * 0.32;

      // Smooth hover fade: 0 = neutral white, 1 = full wave colors.
      const hoverTarget = hoverRef.current ? 1 : 0;
      hoverFadeRef.current += (hoverTarget - hoverFadeRef.current) * 0.12;
      const hoverFade = hoverFadeRef.current;
      const WHITE: [number, number, number] = [240, 240, 240];

      for (let c = 0; c < cols; c++) {
        const env = smoothed[c];
        // Determine how many rows light up from the bottom; brighter near the bottom.
        const lit = env * rows * 0.95;

        // Per-column wave color: each column cycles through accent colors with
        // an offset based on column index, producing a flowing wave across the grid.
        let waveA: [number, number, number] | null = null;
        let waveB: [number, number, number] | null = null;
        if (colorWave) {
          const cyclePhase =
            ((phase * 0.18 + c * 0.045) % 1 + 1) % 1; // 0..1
          const seg = cyclePhase * ACCENT_RGB.length;
          const idx = Math.floor(seg) % ACCENT_RGB.length;
          const tt = seg - Math.floor(seg);
          const ca = ACCENT_RGB[idx];
          const cb = ACCENT_RGB[(idx + 1) % ACCENT_RGB.length];
          waveA = [
            ca[0] * (1 - tt) + cb[0] * tt,
            ca[1] * (1 - tt) + cb[1] * tt,
            ca[2] * (1 - tt) + cb[2] * tt,
          ];
          // Slightly offset secondary so the row gradient remains visible.
          const cyclePhase2 = ((cyclePhase + 0.12) % 1 + 1) % 1;
          const seg2 = cyclePhase2 * ACCENT_RGB.length;
          const idx2 = Math.floor(seg2) % ACCENT_RGB.length;
          const tt2 = seg2 - Math.floor(seg2);
          const ca2 = ACCENT_RGB[idx2];
          const cb2 = ACCENT_RGB[(idx2 + 1) % ACCENT_RGB.length];
          waveB = [
            ca2[0] * (1 - tt2) + cb2[0] * tt2,
            ca2[1] * (1 - tt2) + cb2[1] * tt2,
            ca2[2] * (1 - tt2) + cb2[2] * tt2,
          ];
        }

        for (let r = 0; r < rows; r++) {
          const fromBottom = rows - 1 - r;
          const distance = lit - fromBottom;
          let intensity: number;
          if (distance >= 1) {
            intensity = 1;
          } else if (distance > 0) {
            intensity = distance;
          } else {
            // small ambient glow for unlit dots so the grid is always visible
            intensity = 0.08 + 0.04 * Math.sin(phase * 2 + c * 0.21 + r * 0.42);
          }

          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;

          // Mouse cursor influence: nearby dots brighten and grow.
          let mouseBoost = 0;
          if (mouse) {
            const dx = cx - mouse.x;
            const dy = cy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const falloff = 1 - dist / mouseRadius;
              mouseBoost = falloff * falloff * 0.85;
            }
          }
          const finalIntensity = Math.min(1, intensity + mouseBoost);
          const sizeBoost = 1 + mouseBoost * 0.7;

          const mix = fromBottom / rows;
          let fillStyle: string;
          if (waveA && waveB) {
            // White when not hovered, wave colors when hovered, lerp between.
            const waveR = waveA[0] * (1 - mix) + waveB[0] * mix;
            const waveG = waveA[1] * (1 - mix) + waveB[1] * mix;
            const waveBl = waveA[2] * (1 - mix) + waveB[2] * mix;
            const r = Math.round(WHITE[0] * (1 - hoverFade) + waveR * hoverFade);
            const g = Math.round(WHITE[1] * (1 - hoverFade) + waveG * hoverFade);
            const b = Math.round(WHITE[2] * (1 - hoverFade) + waveBl * hoverFade);
            const alpha = Math.max(0.05, Math.min(1, finalIntensity));
            fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } else {
            fillStyle = blendColor(dotColor, dotSecondary, mix, finalIntensity);
          }

          ctx2d.beginPath();
          ctx2d.fillStyle = fillStyle;
          ctx2d.arc(
            cx,
            cy,
            radius * (0.55 + 0.45 * finalIntensity) * sizeBoost,
            0,
            Math.PI * 2,
          );
          ctx2d.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (interactive) {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseenter", onEnter);
        wrap.removeEventListener("mouseleave", onLeave);
      }
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [cols, rows, handleRef, isPlaying, colorWave, mouseReact]);

  return (
    <div
      ref={wrapRef}
      className={className ? `dot-viz ${className}` : "dot-viz"}
      aria-label={ariaLabel}
      role="img"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

/**
 * Blend two hex colours and apply intensity (alpha + luminance scaling).
 * Works for #rgb, #rrggbb, and rgb()/rgba() inputs.
 */
function blendColor(a: string, b: string, mix: number, intensity: number): string {
  const ac = parseColor(a);
  const bc = parseColor(b);
  const r = Math.round(ac[0] * (1 - mix) + bc[0] * mix);
  const g = Math.round(ac[1] * (1 - mix) + bc[1] * mix);
  const bl = Math.round(ac[2] * (1 - mix) + bc[2] * mix);
  const alpha = Math.max(0.05, Math.min(1, intensity));
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

function blendRGB(
  a: [number, number, number],
  b: [number, number, number],
  mix: number,
  intensity: number,
): string {
  const r = Math.round(a[0] * (1 - mix) + b[0] * mix);
  const g = Math.round(a[1] * (1 - mix) + b[1] * mix);
  const bl = Math.round(a[2] * (1 - mix) + b[2] * mix);
  const alpha = Math.max(0.05, Math.min(1, intensity));
  return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
}

function parseColor(input: string): [number, number, number] {
  const s = input.trim();
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(",").map((x) => parseFloat(x.trim()));
    return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  }
  return [240, 230, 210];
}
