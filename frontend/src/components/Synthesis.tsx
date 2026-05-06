import { SYNTHESIS_INTRO, SYNTHESIS_CARDS, CONCLUSION } from "../content/essay";
import { renderProse } from "../utils/renderProse";

export function Synthesis() {
  return (
    <>
      <section
        id="synthesis"
        className="section"
        data-palette="synthesis"
        aria-labelledby="synthesis-title"
      >
        <div className="section-inner">
          <header>
            <div className="section-index">07</div>
            <h2 id="synthesis-title" className="section-title">
              Synthesis
            </h2>
          </header>

          <div className="section-prose">
            {SYNTHESIS_INTRO.map((p, i) => (
              <p key={i}>{renderProse(p.text)}</p>
            ))}
          </div>

          <div className="synthesis-grid" aria-label="Class concepts applied to the chain">
            {SYNTHESIS_CARDS.map((card, i) => (
              <div className="synthesis-card" key={i}>
                <h4>{card.concept}</h4>
                <div className="src">{card.source}</div>
                <p>{renderProse(card.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="conclusion"
        className="section"
        data-palette="synthesis"
        aria-labelledby="conclusion-title"
      >
        <div className="section-inner">
          <header>
            <div className="section-index">08</div>
            <h2 id="conclusion-title" className="section-title">
              The conclusion
            </h2>
          </header>

          <div className="section-prose">
            {CONCLUSION.map((p, i) => (
              <p key={i}>{renderProse(p.text)}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
