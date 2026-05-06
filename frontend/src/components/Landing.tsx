import { useEffect, useRef } from "react";
import { DotMatrixVisualizer } from "./DotMatrixVisualizer";
import type { AnalyserHandle } from "../hooks/useAudioAnalyser";
import { TITLE, SUBTITLE, RESEARCH_QUESTION } from "../content/essay";
import { renderProse } from "../utils/renderProse";

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
        <div className="landing-eyebrow">CORE-UA 730 Final Project — Kevin Dong</div>
        <h1 id="landing-title" className="landing-title">
          {(() => {
            const words = TITLE.split(" ");
            let charIdx = 0;
            const renderChars = (text: string) =>
              Array.from(text).map((ch) => {
                const idx = charIdx++;
                return (
                  <span
                    key={idx}
                    className="title-char"
                    style={{ ["--i" as string]: idx } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                );
              });
            return words.flatMap((word, wi, arr) => {
              const isLast = wi === arr.length - 1;
              const chars = renderChars(word);
              const wrapped = isLast ? (
                <span key={`w${wi}`} className="accent">
                  {chars}
                </span>
              ) : word === "Dreams" ? (
                <em key={`w${wi}`}>{chars}</em>
              ) : (
                <span key={`w${wi}`}>{chars}</span>
              );
              if (isLast) return [wrapped];
              charIdx++;
              return [wrapped, " "];
            });
          })()}
        </h1>

        <DotMatrixVisualizer
          handleRef={fakeRef}
          isPlaying={false}
          className="hero"
          ariaLabel="Decorative dot matrix"
          colorWave
          mouseReact
        />

        <p className="landing-question">
          <strong>{renderProse(RESEARCH_QUESTION)}</strong>
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
