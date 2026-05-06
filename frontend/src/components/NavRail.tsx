import { useEffect, useRef, useState } from "react";

interface Item {
  id: string;
  label: string;
  palette: string;
}

const ITEMS: Item[] = [
  { id: "landing", label: "00 · Home", palette: "landing" },
  { id: "intro", label: "01 · The Question", palette: "intro" },
  { id: "cranberries-section", label: "02 · 1992", palette: "cranberries" },
  { id: "fayewong-section", label: "03 · 1994", palette: "fayewong" },
  { id: "irishwomen-section", label: "04 · 2020", palette: "irishwomen" },
  { id: "mitsushima-section", label: "05 · 2024", palette: "mitsushima" },
  { id: "compare", label: "06 · Listen in Parallel", palette: "compare" },
  { id: "synthesis", label: "07 · Synthesis", palette: "synthesis" },
  { id: "conclusion", label: "08 · Conclusion", palette: "synthesis" },
  { id: "bibliography", label: "09 · Works Cited", palette: "bibliography" },
];

export function NavRail() {
  const [active, setActive] = useState<string>("landing");
  // Persistent visibility map across observer callbacks. The observer only
  // reports sections whose intersection ratio changed, so picking the max
  // among the current entries (the prior implementation) loses the stable
  // section that's actually in view. Keeping every section's last-known
  // ratio in a Map and re-scanning the whole map on each callback gives a
  // stable "most-visible" pick.
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observed = ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    observed.forEach((el) => ratiosRef.current.set(el.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current.set((entry.target as HTMLElement).id, entry.intersectionRatio);
        });
        let topId: string | null = null;
        let topRatio = 0;
        ratiosRef.current.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });
        if (topId) setActive(topId);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -40% 0px" },
    );
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="nav-rail" aria-label="Section navigation">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-rail-item ${active === item.id ? "active" : ""}`}
          data-palette={item.palette}
          onClick={() => onClick(item.id)}
          title={item.label}
        >
          <span className="nav-rail-dot" />
          <span className="nav-rail-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
