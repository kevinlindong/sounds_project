import type { ReactNode } from "react";

const PATTERN = /(“Dreams”|"Dreams"|‘Dreams’|'Dreams'|“夢中人”|"夢中人"|夢中人|\bDreams\b)/g;

export function renderProse(text: string): ReactNode[] {
  const parts = text.split(PATTERN);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part === "Dreams" || part === "夢中人") {
      return <em key={i}>{part}</em>;
    }
    if (
      part === "“Dreams”" ||
      part === '"Dreams"' ||
      part === "‘Dreams’" ||
      part === "'Dreams'"
    ) {
      return <em key={i}>Dreams</em>;
    }
    if (part === "“夢中人”" || part === '"夢中人"') {
      return <em key={i}>{"夢中人"}</em>;
    }
    return part;
  });
}
