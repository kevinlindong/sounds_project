import { useEffect, useRef } from "react";
import type { Track } from "../content/tracks";

interface Props {
  track: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

function fmtTime(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
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

  const src = `${import.meta.env.BASE_URL}waveforms/${track.id}-waveform.png`;

  // Vocal-onset marker. The PNG already shows the bright vocal layer kicking
  // in here, but the explicit tick + timestamp anchors the listener so they
  // read each lane as "instrumental → vocals enter at 0:35" rather than
  // having to infer the boundary visually.
  const vocalStartPct = Math.max(0, Math.min(100, (track.vocalStart / track.durationSec) * 100));

  return (
    <div
      className="waveform-viz"
      role="img"
      aria-label={`Waveform for ${track.artist} — ${track.title}. Vocals enter at ${fmtTime(track.vocalStart)}.`}
    >
      <img src={src} alt="" draggable={false} />
      <div
        className="waveform-vocal-start"
        style={{ left: `${vocalStartPct}%` }}
        aria-hidden="true"
      >
        <span className="waveform-vocal-start-label">
          VOCALS · {fmtTime(track.vocalStart)}
        </span>
      </div>
      <div ref={playheadRef} className="waveform-playhead" />
    </div>
  );
}
