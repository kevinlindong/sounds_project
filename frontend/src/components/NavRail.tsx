import { useEffect, useState } from "react";

interface Item {
  id: string;
  label: string;
}

const ITEMS: Item[] = [
  { id: "landing", label: "00 · Open" },
  { id: "intro", label: "01 · Question" },
  { id: "cranberries-section", label: "02 · 1992" },
  { id: "fayewong-section", label: "03 · 1994" },
  { id: "irishwomen-section", label: "04 · 2020" },
  { id: "mitsushima-section", label: "05 · 2024" },
  { id: "compare", label: "06 · Compare" },
  { id: "synthesis", label: "07 · Synthesis" },
  { id: "bibliography", label: "09 · Sources" },
];

export function NavRail() {
  const [active, setActive] = useState<string>("landing");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let topId: string | null = null;
        let topRatio = -1;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > topRatio) {
            topRatio = entry.intersectionRatio;
            topId = (entry.target as HTMLElement).id;
          }
        });
        if (topId) setActive(topId);
      },
      { threshold: [0.2, 0.4, 0.6, 0.8], rootMargin: "-20% 0px -40% 0px" },
    );
    ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
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
          onClick={() => onClick(item.id)}
        >
          <span className="nav-rail-dot" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
