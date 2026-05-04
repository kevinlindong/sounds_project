import { useEffect, useRef, useState } from "react";

let sharedCtx: AudioContext | null = null;
const sourceCache = new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>();

function getCtx(): AudioContext {
  if (!sharedCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedCtx = new Ctx();
  }
  return sharedCtx;
}

/**
 * Resume the shared AudioContext. Browsers start contexts in "suspended" state
 * when they're created outside a user gesture, and audio routed through a
 * MediaElementSource is silent until the context resumes — call this from any
 * user-gesture handler (play / sync) before kicking off playback.
 */
export function resumeSharedAudioContext(): Promise<void> {
  const ctx = sharedCtx;
  if (!ctx) return Promise.resolve();
  if (ctx.state === "suspended") return ctx.resume();
  return Promise.resolve();
}

export interface AnalyserHandle {
  ctx: AudioContext;
  analyser: AnalyserNode;
  data: Uint8Array;
}

/**
 * Wires an <audio> element into a shared AudioContext + AnalyserNode.
 * Returns a handle whose `data` array is refilled with frequency bytes
 * each animation frame inside the visualizer.
 */
export function useAudioAnalyser(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const handleRef = useRef<AnalyserHandle | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const ctx = getCtx();
    let source = sourceCache.get(el);
    if (!source) {
      source = ctx.createMediaElementSource(el);
      sourceCache.set(el, source);
    }
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.78;
    source.connect(analyser);
    analyser.connect(ctx.destination);

    const data = new Uint8Array(analyser.frequencyBinCount);
    handleRef.current = { ctx, analyser, data };
    setReady(true);

    return () => {
      try {
        analyser.disconnect();
      } catch {
        // already disconnected
      }
    };
  }, [audioRef]);

  const resume = () => {
    const ctx = handleRef.current?.ctx;
    if (ctx && ctx.state === "suspended") {
      void ctx.resume();
    }
  };

  return { handleRef, ready, resume };
}
