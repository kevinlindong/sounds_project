import { useEffect, useMemo, useRef } from "react";
import type { Track } from "../content/tracks";

interface Props {
  track: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function Spectrogram({ track, audioRef }: Props) {
  const playheadRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);

  // Write the playhead position directly to the DOM each frame. Going through
  // React state would batch into 60-Hz re-renders and force the CSS transition
  // to chase a moving target, which makes the line stutter; mutating style
  // imperatively keeps the motion locked to wall-clock time.
  useEffect(() => {
    const tick = () => {
      const el = audioRef.current;
      const head = playheadRef.current;
      if (el && head && el.duration > 0) {
        const progress = Math.min(1, el.currentTime / el.duration);
        head.style.left = `${progress * 100}%`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [audioRef]);

  const src = `/spectrograms/${track.id}-spectrogram.png`;

  // Frequency tick marks: 0, every 2 kHz up to fmax, then fmax itself —
  // sparse enough to stay readable in the 4-lane parallel-compare grid
  // while still giving an analytical reference (mid + cap).
  const ticks = useMemo(() => {
    const fmax = track.spectrogramFmax;
    const t: number[] = [0];
    for (let k = 2; k * 1000 <= fmax; k += 2) t.push(k * 1000);
    if (t[t.length - 1] !== fmax) t.push(fmax);
    return t;
  }, [track.spectrogramFmax]);

  return (
    <div className="spectrogram-viz" role="img" aria-label={`Spectrogram for ${track.artist} — ${track.title}, frequency axis 0 to ${track.spectrogramFmax} Hz`}>
      <img src={src} alt="" draggable={false} />
      <ul className="spectrogram-axis" aria-hidden="true">
        {ticks.map((hz, i) => {
          const isBottom = i === 0;
          const isTop = i === ticks.length - 1;
          const pct = (hz / track.spectrogramFmax) * 100;
          const label = hz === 0
            ? "0"
            : hz % 1000 === 0
              ? `${hz / 1000} kHz`
              : `${(hz / 1000).toFixed(1)} kHz`;
          // Anchor the bottom and top ticks to their respective edges so they
          // don't get clipped by overflow:hidden; center-align the rest on
          // their tick value.
          const style: React.CSSProperties = isBottom
            ? { bottom: 4 }
            : isTop
              ? { top: 4 }
              : { bottom: `${pct}%`, transform: "translateY(50%)" };
          return (
            <li key={hz} className="spectrogram-axis-tick" style={style}>
              {label}
            </li>
          );
        })}
      </ul>
      <div ref={playheadRef} className="spectrogram-playhead" />
    </div>
  );
}
