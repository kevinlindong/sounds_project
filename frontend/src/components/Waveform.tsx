import { useEffect, useRef } from "react";
import type { Track } from "../content/tracks";

interface Props {
  track: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function Waveform({ track, audioRef }: Props) {
  const playheadRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef(0);

  // Same playhead strategy as Spectrogram: mutate `left` directly each rAF
  // so the line tracks wall-clock time without React state batching.
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

  const src = `/waveforms/${track.id}-waveform.png`;

  return (
    <div
      className="waveform-viz"
      role="img"
      aria-label={`Waveform for ${track.artist} — ${track.title}`}
    >
      <img src={src} alt="" draggable={false} />
      <div ref={playheadRef} className="waveform-playhead" />
    </div>
  );
}
