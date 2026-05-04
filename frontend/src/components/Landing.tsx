import { useEffect, useRef } from "react";
import { DotMatrixVisualizer } from "./DotMatrixVisualizer";
import type { AnalyserHandle } from "../hooks/useAudioAnalyser";
import { TITLE, SUBTITLE, RESEARCH_QUESTION } from "../content/essay";

export function Landing() {
  // Landing visualizer is purely decorative — no audio source attached.
  // It uses the idle-flicker fallback in DotMatrixVisualizer.
  const fakeRef = useRef<AnalyserHandle | null>(null);

  useEffect(() => {
    fakeRef.current = null;
  }, []);

  return (
    <section
      id="landing"
      className="landing"
      data-palette="landing"
      aria-labelledby="landing-title"
    >
      <div className="landing-inner">
        <div className="landing-eyebrow">A music studies final project</div>
        <h1 id="landing-title" className="landing-title">
          {TITLE.split(" ").map((word, i, arr) => (
            <span key={i}>
              {i === arr.length - 1 ? <span className="accent">{word}</span> : word}
              {i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <DotMatrixVisualizer
          handleRef={fakeRef}
          isPlaying={false}
          className="hero"
          ariaLabel="Decorative dot matrix"
        />

        <p className="landing-question">
          <strong>{RESEARCH_QUESTION}</strong>
        </p>

        <p className="landing-question" style={{ color: "var(--fg-dim)" }}>
          {SUBTITLE}
        </p>

        <div className="landing-meta">
          <span>The Cranberries · 1992</span>
          <span>王菲 · 1994</span>
          <span>Irish Women in Harmony · 2020</span>
          <span>満島ひかり · 2024</span>
        </div>
      </div>

      <div className="scroll-hint">scroll ↓</div>
    </section>
  );
}
