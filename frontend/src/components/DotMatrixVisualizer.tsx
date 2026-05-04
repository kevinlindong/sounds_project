import { useEffect, useRef } from "react";
import type { AnalyserHandle } from "../hooks/useAudioAnalyser";

interface Props {
  handleRef: React.RefObject<AnalyserHandle | null>;
  isPlaying: boolean;
  cols?: number;
  rows?: number;
  className?: string;
  ariaLabel?: string;
}

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
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
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

      for (let c = 0; c < cols; c++) {
        const env = smoothed[c];
        // Determine how many rows light up from the bottom; brighter near the bottom.
        const lit = env * rows * 0.95;
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
          ctx2d.beginPath();
          ctx2d.fillStyle = blendColor(dotColor, dotSecondary, fromBottom / rows, intensity);
          ctx2d.arc(cx, cy, radius * (0.55 + 0.45 * intensity), 0, Math.PI * 2);
          ctx2d.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [cols, rows, handleRef, isPlaying]);

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
