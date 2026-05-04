import { INTRO } from "../content/essay";

export function Intro() {
  return (
    <section
      id="intro"
      className="section"
      data-palette="intro"
      aria-labelledby="intro-title"
    >
      <div className="section-inner">
        <header>
          <div className="section-index">01</div>
          <h2 id="intro-title" className="section-title">
            The question
          </h2>
        </header>

        <div className="section-prose">
          {INTRO.map((p, i) => (
            <p key={i}>{p.text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
