import { BIBLIOGRAPHY } from "../content/essay";

export function Bibliography() {
  return (
    <section
      id="bibliography"
      className="section"
      data-palette="bibliography"
      aria-labelledby="bibliography-title"
    >
      <div className="section-inner">
        <header>
          <div className="section-index">09</div>
          <h2 id="bibliography-title" className="section-title">
            Works Cited
          </h2>
        </header>

        <ul className="bib-list">
          {BIBLIOGRAPHY.map((entry, i) => (
            <li className="bib-item" key={i}>
              <div>
                {entry.cite.map((part, j) =>
                  typeof part === "string" ? (
                    <span key={j}>{part}</span>
                  ) : (
                    <em key={j}>{part.italic}</em>
                  ),
                )}
              </div>
              {entry.note && (
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--fg-faint)",
                    marginTop: "0.3rem",
                    fontStyle: "italic",
                  }}
                >
                  {entry.note}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
