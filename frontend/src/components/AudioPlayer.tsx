import { useEffect, useRef, useState } from "react";
import { useAudioAnalyser } from "../hooks/useAudioAnalyser";
import { DotMatrixVisualizer } from "./DotMatrixVisualizer";

interface Props {
  src: string;
  label: string;
}

function fmt(t: number): string {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function AudioPlayer({ src, label }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { handleRef, ready, resume } = useAudioAnalyser(audioRef);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState<null | number>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (scrubbing === null) setTime(el.currentTime);
    };
    const onMeta = () => setDuration(el.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [scrubbing]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    resume();
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setScrubbing(v);
    setTime(v);
  };

  const commitSeek = () => {
    const el = audioRef.current;
    if (el && scrubbing !== null) {
      el.currentTime = scrubbing;
    }
    setScrubbing(null);
  };

  const displayTime = scrubbing ?? time;

  return (
    <div className="player">
      <DotMatrixVisualizer
        handleRef={handleRef}
        isPlaying={playing}
        ariaLabel={`Dot matrix visualizer for ${label}`}
      />

      <div className="player-controls">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className="player-btn"
        >
          {playing ? "■ Pause" : "▶ Play"}
        </button>

        <div className="player-scrub">
          <span className="player-time mono">{fmt(displayTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={displayTime}
            onChange={onSeek}
            onMouseUp={commitSeek}
            onTouchEnd={commitSeek}
            onKeyUp={commitSeek}
            aria-label={`Seek ${label}`}
            className="player-range"
          />
          <span className="player-time mono">{fmt(duration)}</span>
        </div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} preload="metadata" crossOrigin="anonymous" />
    </div>
  );
}
