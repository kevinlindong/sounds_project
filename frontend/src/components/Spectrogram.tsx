import { useEffect, useRef } from "react";
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

  return (
    <div className="spectrogram-viz" role="img" aria-label={`Spectrogram for ${track.artist} — ${track.title}`}>
      <img src={src} alt="" draggable={false} />
      <div ref={playheadRef} className="spectrogram-playhead" />
    </div>
  );
}
