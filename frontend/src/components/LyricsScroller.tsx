import { useEffect, useRef, useState } from "react";
import type { LyricLine } from "../content/tracks";

interface Props {
  lines: LyricLine[];
  audioRef: React.RefObject<HTMLAudioElement | null>;
  showRomanization?: boolean;
  showTranslation?: boolean;
}

/**
 * Karaoke-style scrolling lyrics. Reads `audioRef.currentTime` on rAF and
 * highlights the active line based on each line's `t` timestamp. Auto-scrolls
 * the container so the active line stays roughly centered.
 */
export function LyricsScroller({
  lines,
  audioRef,
  showRomanization = true,
  showTranslation = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const tick = () => {
      const el = audioRef.current;
      if (el) {
        const now = el.currentTime;
        // find the last line whose t <= now
        let idx = -1;
        for (let i = 0; i < lines.length; i++) {
          const t = lines[i].t;
          if (t === undefined) continue;
          if (t <= now) idx = i;
          else break;
        }
        if (idx !== lastIdx) {
          lastIdx = idx;
          setActiveIdx(idx);
          // auto-scroll the active line into a comfortable centred view
          const wrap = wrapRef.current;
          const target = lineRefs.current[idx];
          if (wrap && target) {
            const wrapRect = wrap.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const offset =
              targetRect.top - wrapRect.top - wrap.clientHeight / 2 + target.clientHeight / 2;
            wrap.scrollBy({ top: offset, behavior: "smooth" });
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [audioRef, lines]);

  const onLineClick = (line: LyricLine) => {
    if (line.t === undefined) return;
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = line.t;
    if (el.paused) {
      void el.play();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="lyrics-scroller"
      aria-label="Synchronized lyrics"
    >
      <div className="lyrics-scroller-pad" aria-hidden="true" />
      {lines.map((line, i) => {
        const isActive = i === activeIdx;
        const isPast = i < activeIdx;
        const cls = ["lyrics-scroller-line"];
        if (isActive) cls.push("active");
        else if (isPast) cls.push("past");
        else cls.push("upcoming");

        return (
          <div
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={cls.join(" ")}
            onClick={() => onLineClick(line)}
            role={line.t !== undefined ? "button" : undefined}
            tabIndex={line.t !== undefined ? 0 : -1}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && line.t !== undefined) {
                e.preventDefault();
                onLineClick(line);
              }
            }}
          >
            <div className="lyrics-primary">{line.primary}</div>
            {showRomanization && line.romanization && (
              <div className="lyrics-romanization">{line.romanization}</div>
            )}
            {showTranslation && line.translation && (
              <div className="lyrics-translation">{line.translation}</div>
            )}
          </div>
        );
      })}
      <div className="lyrics-scroller-pad" aria-hidden="true" />
    </div>
  );
}
