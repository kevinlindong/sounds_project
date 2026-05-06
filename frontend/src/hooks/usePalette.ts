import { useEffect, useState } from "react";

/**
 * Tracks the most-visible section's palette key and writes it to
 * <body data-palette="..."> so palette-driven CSS variables cascade.
 *
 * Sections opt in by setting `data-palette` on a scrolled element.
 */
export function usePalette(initial = "landing"): string {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    // Restrict to top-level page sections. ParallelCompare lanes carry
    // `data-palette` for per-lane accent colors, and NavRail items carry it
    // to color each dot by destination — observing either would corrupt the
    // body palette (the rail is position:fixed so it's always intersecting,
    // and lanes would flicker as the compare grid scrolls into view).
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-palette]:not(.compare-lane):not(.nav-rail-item)",
      ),
    );
    if (els.length === 0) return;

    const visibility = new Map<HTMLElement, number>();
    els.forEach((el) => visibility.set(el, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target as HTMLElement, entry.intersectionRatio);
        });
        let topEl: HTMLElement | null = null;
        let topRatio = -1;
        visibility.forEach((ratio, el) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topEl = el;
          }
        });
        if (topEl && topRatio > 0.05) {
          const key = (topEl as HTMLElement).dataset.palette;
          if (key) setActive(key);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -25% 0px",
      },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.dataset.palette = active;
  }, [active]);

  return active;
}
