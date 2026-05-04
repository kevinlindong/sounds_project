import type { LyricLine } from "../content/tracks";

interface Props {
  lines: LyricLine[];
  showRomanization?: boolean;
}

export function Lyrics({ lines, showRomanization = true }: Props) {
  return (
    <div className="lyrics" aria-label="Lyrics excerpt">
      {lines.map((line, i) => (
        <div className="lyric-line" key={i}>
          <div className="lyric-primary">{line.primary}</div>
          {showRomanization && line.romanization && (
            <div className="lyric-romanization">{line.romanization}</div>
          )}
          {line.translation && (
            <div className="lyric-translation">{line.translation}</div>
          )}
        </div>
      ))}
    </div>
  );
}
