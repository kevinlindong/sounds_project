import { useRef, useState, useEffect } from "react";
import type { Track } from "../content/tracks";
import type { EssayParagraph } from "../content/essay";
import { useAudioAnalyser } from "../hooks/useAudioAnalyser";
import { DotMatrixVisualizer } from "./DotMatrixVisualizer";
import { LyricsScroller } from "./LyricsScroller";
import { renderProse } from "../utils/renderProse";

interface Props {
  index: string;
  track: Track;
  prose: EssayParagraph[];
  id: string;
}

function fmt(t: number): string {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function Section({ index, track, prose, id }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { handleRef, ready, resume } = useAudioAnalyser(audioRef);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState<null | number>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    type WithLegacyPreserve = HTMLAudioElement & { webkitPreservesPitch?: boolean };
    el.playbackRate = 1;
    el.preservesPitch = true;
    (el as WithLegacyPreserve).webkitPreservesPitch = true;
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (scrubbing === null) setTime(el.currentTime);
    };
    const onMeta = () => setDuration(el.duration || track.durationSec);
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
  }, [scrubbing, track.durationSec]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    resume();
    if (el.paused) void el.play();
    else el.pause();
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setScrubbing(v);
    setTime(v);
  };

  const commitSeek = () => {
    const el = audioRef.current;
    if (el && scrubbing !== null) el.currentTime = scrubbing;
    setScrubbing(null);
  };

  const displayTime = scrubbing ?? time;
  const showTranslation = track.language.toLowerCase().includes("cantonese");

  return (
    <section
      id={id}
      className="section"
      data-palette={track.paletteKey}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-inner">
        <header>
          <div className="section-index">{index}</div>
          <div className="track-header">
            <div className="track-artist">
              {track.artist}
              {track.artistRomanized ? ` · ${track.artistRomanized}` : ""}
            </div>
            <h2 id={`${id}-title`} className="track-title">
              <em>{track.title}</em>
              {track.titleTranslation ? (
                <span className="track-title-translation"> — {track.titleTranslation}</span>
              ) : null}
            </h2>
            <div className="section-meta">
              <span>{track.year}</span>
              <span>{track.origin}</span>
              <span>{track.language}</span>
              <span>{track.genre}</span>
            </div>
          </div>
        </header>

        <div className="player">
          <DotMatrixVisualizer
            handleRef={handleRef}
            isPlaying={playing}
            ariaLabel={`Visualizer for ${track.artist} — ${track.title}`}
          />

          <div className="player-controls">
            <button
              type="button"
              onClick={toggle}
              disabled={!ready}
              aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
              className="player-btn"
            >
              {playing ? "■ Pause" : "▶ Play"}
            </button>

            <div className="player-scrub">
              <span className="player-time mono">{fmt(displayTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || track.durationSec || 0}
                step={0.01}
                value={displayTime}
                onChange={onSeek}
                onMouseUp={commitSeek}
                onTouchEnd={commitSeek}
                onKeyUp={commitSeek}
                aria-label={`Seek ${track.title}`}
                className="player-range"
              />
              <span className="player-time mono">
                {fmt(duration || track.durationSec)}
              </span>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={track.audioSrc}
            preload="metadata"
            crossOrigin="anonymous"
          />
        </div>

        <div className="section-inner two-col">
          <div className="section-prose">
            {prose.map((p, i) => (
              <p key={i}>{renderProse(p.text)}</p>
            ))}
          </div>

          <LyricsScroller
            lines={track.fullLyrics}
            audioRef={audioRef}
            showRomanization={false}
            showTranslation={showTranslation}
          />
        </div>
      </div>
    </section>
  );
}
