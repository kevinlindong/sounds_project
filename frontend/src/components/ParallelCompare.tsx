import { useEffect, useRef, useState } from "react";
import { TRACKS } from "../content/tracks";
import type { Track } from "../content/tracks";
import { useAudioAnalyser, resumeSharedAudioContext } from "../hooks/useAudioAnalyser";
import { DotMatrixVisualizer } from "./DotMatrixVisualizer";
import { Spectrogram } from "./Spectrogram";
import { Waveform } from "./Waveform";

type ViewMode = "dots" | "spectrogram" | "waveform";

interface LaneState {
  enabled: boolean;
  volume: number;
}

function fmt(t: number): string {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

interface LaneProps {
  track: Track;
  state: LaneState;
  onToggle: () => void;
  onVolume: (v: number) => void;
  /** Master timeline position relative to each track's vocalStart, or null when free-running. */
  syncedTime: number | null;
  isSyncedPlaying: boolean;
  registerAudio: (id: string, el: HTMLAudioElement | null) => void;
  viewMode: ViewMode;
}

/**
 * One track's lane: visualizer, enable toggle, volume, and palette accent.
 * The actual audio element is owned here but its play/pause is controlled
 * by the parent so all enabled lanes start together.
 */
function Lane({
  track,
  state,
  onToggle,
  onVolume,
  syncedTime,
  isSyncedPlaying,
  registerAudio,
  viewMode,
}: LaneProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { handleRef, ready } = useAudioAnalyser(audioRef);

  // Register the audio element with the parent so it can drive play/pause/sync.
  useEffect(() => {
    registerAudio(track.id, audioRef.current);
    return () => registerAudio(track.id, null);
  }, [track.id, registerAudio]);

  const rate = track.playbackRate ?? 1;

  // Mirror parent-driven currentTime when sync is requested.
  // syncedTime is master-timeline seconds; with a non-1 playbackRate the
  // audio advances at `rate` per master-second, so the corresponding
  // content-time is vocalStart + rate * syncedTime.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || syncedTime === null) return;
    const targetAbs = track.vocalStart + rate * syncedTime;
    if (Math.abs(el.currentTime - targetAbs) > 0.25) {
      el.currentTime = targetAbs;
    }
  }, [syncedTime, track.vocalStart, rate]);

  // Keep volume + playbackRate in sync with state.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = state.enabled ? state.volume : 0;
  }, [state.enabled, state.volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = rate;
    // Time-stretch without pitch shift so each recording stays in its own
    // key when sped up / slowed down to match the master pulse. Cast: the
    // legacy webkitPreservesPitch covers older Safari builds that pre-date
    // the unprefixed property.
    type WithLegacyPreserve = HTMLAudioElement & { webkitPreservesPitch?: boolean };
    el.preservesPitch = true;
    (el as WithLegacyPreserve).webkitPreservesPitch = true;
  }, [rate]);

  return (
    <div
      className={`compare-lane ${state.enabled ? "is-on" : "is-off"}`}
      data-palette={track.paletteKey}
    >
      <div className="compare-lane-head">
        <button
          type="button"
          onClick={onToggle}
          className="compare-toggle"
          aria-pressed={state.enabled}
          aria-label={`${state.enabled ? "Mute" : "Unmute"} ${track.artistRomanized || track.artist}`}
        >
          {state.enabled ? "● ON" : "○ OFF"}
        </button>
        <div className="compare-lane-title">
          <span className="compare-lane-artist">
            {track.artistRomanized || track.artist}
          </span>
          <span className="compare-lane-meta">
            {track.year} · {track.language.split(" ")[0]}
          </span>
        </div>
      </div>

      {viewMode === "dots" ? (
        <DotMatrixVisualizer
          handleRef={handleRef}
          isPlaying={state.enabled && isSyncedPlaying}
          cols={48}
          rows={8}
        />
      ) : viewMode === "waveform" ? (
        <Waveform track={track} audioRef={audioRef} />
      ) : (
        <Spectrogram track={track} audioRef={audioRef} />
      )}

      <div className="compare-lane-controls">
        <span className="compare-vol-label mono">VOL</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          disabled={!state.enabled}
          className="compare-vol"
          aria-label={`Volume for ${track.artistRomanized || track.artist}`}
        />
        <span className="compare-vol-readout mono">
          {Math.round(state.volume * 100)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={track.audioSrc}
        preload="auto"
        crossOrigin="anonymous"
        aria-label={`${track.artist} — ${track.title}`}
      />

      {!ready && <div className="compare-loading">loading…</div>}
    </div>
  );
}

export function ParallelCompare() {
  // Track which lanes are enabled and their volumes.
  const [lanes, setLanes] = useState<Record<string, LaneState>>(() =>
    Object.fromEntries(
      TRACKS.map((t) => [
        t.id,
        // Start with Cranberries + Faye Wong on so the comparison is meaningful by default.
        {
          enabled: t.id === "cranberries" || t.id === "fayewong",
          volume: t.id === "cranberries" || t.id === "fayewong" ? 0.7 : 0.7,
        },
      ]),
    ),
  );

  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [syncedTime, setSyncedTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("spectrogram");

  // Master timeline measures *post-vocalStart* time so all tracks line up at
  // "verse 1 enters" simultaneously. Use the track with the longest vocal
  // section as the reference.
  const maxDuration = Math.max(
    ...TRACKS.map((t) => t.durationSec - t.vocalStart),
  );

  const registerAudio = (id: string, el: HTMLAudioElement | null) => {
    audioRefs.current[id] = el;
  };

  const setLane = (id: string, patch: Partial<LaneState>) => {
    setLanes((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  // Track playing time from the first enabled track, expressed in master
  // (post-vocalStart) coordinates so the readout matches the scrubber.
  // Divide by playbackRate so the master clock ticks at wall-clock speed
  // even when the underlying audio is rate-shifted.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const enabled = TRACKS.find((t) => lanes[t.id]?.enabled);
      if (enabled) {
        const el = audioRefs.current[enabled.id];
        if (el) {
          const r = enabled.playbackRate ?? 1;
          setTime(Math.max(0, (el.currentTime - enabled.vocalStart) / r));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lanes]);

  const playAll = () => {
    // The shared AudioContext is created at mount (before any user gesture) so
    // browsers start it in "suspended" state. Audio routed through a
    // MediaElementSource stays silent until the context resumes — kick that
    // off here, inside the click handler, where a user gesture is guaranteed.
    void resumeSharedAudioContext();
    // Play *every* lane (disabled ones stay silent via volume=0) so toggling a
    // lane on mid-playback exposes audio that's already at the synced position
    // rather than starting cold from vocalStart.
    const promises = TRACKS.map((t) => {
      const el = audioRefs.current[t.id];
      return el ? el.play().catch(() => {}) : Promise.resolve();
    });
    setIsPlaying(true);
    void Promise.all(promises);
  };

  const pauseAll = () => {
    for (const track of TRACKS) {
      const el = audioRefs.current[track.id];
      if (el) el.pause();
    }
    setIsPlaying(false);
  };

  const syncStart = async () => {
    // Resume the AudioContext while we're still inside the click handler — if
    // we wait until after the setTimeout below, the gesture is gone and Safari
    // refuses to resume.
    void resumeSharedAudioContext();
    // Pause everyone, jump each track to its own vocalStart so they all start
    // at "verse 1 enters" simultaneously regardless of intro length, then play.
    pauseAll();
    for (const track of TRACKS) {
      const el = audioRefs.current[track.id];
      if (el) el.currentTime = track.vocalStart;
    }
    setSyncedTime(0);
    setTime(0);
    // Give React/audio a tick to apply the seek before kicking off play.
    await new Promise((r) => setTimeout(r, 30));
    playAll();
  };

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setSyncedTime(v);
    setTime(v);
    // Master scrubber is in master-timeline coordinates: each track jumps to
    // its own vocalStart + playbackRate * v (audio content advances at rate
    // per master-second).
    for (const track of TRACKS) {
      const el = audioRefs.current[track.id];
      if (!el) continue;
      const r = track.playbackRate ?? 1;
      const targetAbs = track.vocalStart + r * v;
      const max = el.duration || track.durationSec;
      el.currentTime = Math.min(targetAbs, max);
    }
  };

  // When a track ends individually, don't kill the others.
  useEffect(() => {
    const handlers: Array<() => void> = [];
    for (const track of TRACKS) {
      const el = audioRefs.current[track.id];
      if (!el) continue;
      const onEnded = () => {
        const stillPlaying = TRACKS.some((t) => {
          const other = audioRefs.current[t.id];
          return other && !other.paused && !other.ended;
        });
        if (!stillPlaying) setIsPlaying(false);
      };
      el.addEventListener("ended", onEnded);
      handlers.push(() => el.removeEventListener("ended", onEnded));
    }
    return () => handlers.forEach((h) => h());
  });

  const enabledCount = Object.values(lanes).filter((l) => l.enabled).length;

  return (
    <section
      id="compare"
      className="section"
      data-palette="synthesis"
      aria-labelledby="compare-title"
    >
      <div className="section-inner">
        <header>
          <div className="section-index">06</div>
          <h2 id="compare-title" className="section-title">
            Listen in parallel
          </h2>
          <p
            style={{
              color: "var(--fg-dim)",
              maxWidth: "62ch",
              fontSize: "1rem",
              marginTop: "1rem",
            }}
          >
            Toggle two or more tracks on and press <em>Sync &amp; Play</em>. The
            same melody, performed across thirty-two years and three languages,
            stacks into a single audible field — useful for hearing what
            translation actually preserves and what it rewrites. Adjust each
            lane&apos;s volume to bring different versions to the foreground.
          </p>
        </header>

        <div className="compare-toolbar">
          <button type="button" onClick={syncStart} disabled={enabledCount === 0}>
            ↻ Sync &amp; play
          </button>
          <button
            type="button"
            onClick={isPlaying ? pauseAll : playAll}
            disabled={enabledCount === 0}
            className="play-pause-btn"
          >
            {isPlaying ? "■ Pause" : "▶ Play"}
          </button>
          <div className="view-toggle" role="radiogroup" aria-label="Visualization mode">
            <span className="view-toggle-thumb" data-mode={viewMode} aria-hidden="true" />
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "spectrogram" ? "active" : ""}`}
              onClick={() => setViewMode("spectrogram")}
              role="radio"
              aria-checked={viewMode === "spectrogram"}
            >
              Spectrogram
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "waveform" ? "active" : ""}`}
              onClick={() => setViewMode("waveform")}
              role="radio"
              aria-checked={viewMode === "waveform"}
            >
              Waveform
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "dots" ? "active" : ""}`}
              onClick={() => setViewMode("dots")}
              role="radio"
              aria-checked={viewMode === "dots"}
            >
              Visualizer
            </button>
          </div>
          <div className="compare-time mono">
            {fmt(time)} / {fmt(maxDuration)}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={maxDuration}
          step={0.05}
          value={time}
          onChange={onScrub}
          aria-label="Sync timeline scrubber"
          className="compare-scrub"
        />

        <div className="compare-grid">
          {TRACKS.map((track) => (
            <Lane
              key={track.id}
              track={track}
              state={lanes[track.id]}
              onToggle={() => setLane(track.id, { enabled: !lanes[track.id].enabled })}
              onVolume={(v) => setLane(track.id, { volume: v })}
              syncedTime={syncedTime}
              isSyncedPlaying={isPlaying}
              registerAudio={registerAudio}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
