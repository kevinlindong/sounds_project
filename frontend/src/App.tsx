import { Landing } from "./components/Landing";
import { Intro } from "./components/Intro";
import { Section } from "./components/Section";
import { Synthesis } from "./components/Synthesis";
import { Bibliography } from "./components/Bibliography";
import { NavRail } from "./components/NavRail";
import { ParallelCompare } from "./components/ParallelCompare";
import { usePalette } from "./hooks/usePalette";
import { TRACKS_BY_ID } from "./content/tracks";
import {
  CRANBERRIES_ANALYSIS,
  FAYEWONG_ANALYSIS,
  IRISHWOMEN_ANALYSIS,
  MITSUSHIMA_ANALYSIS,
} from "./content/essay";

export default function App() {
  usePalette("landing");

  return (
    <div className="app-shell">
      <NavRail />
      <Landing />
      <Intro />
      <Section
        index="02"
        id="cranberries-section"
        track={TRACKS_BY_ID.cranberries}
        prose={CRANBERRIES_ANALYSIS}
      />
      <Section
        index="03"
        id="fayewong-section"
        track={TRACKS_BY_ID.fayewong}
        prose={FAYEWONG_ANALYSIS}
      />
      <Section
        index="04"
        id="irishwomen-section"
        track={TRACKS_BY_ID.irishwomen}
        prose={IRISHWOMEN_ANALYSIS}
      />
      <Section
        index="05"
        id="mitsushima-section"
        track={TRACKS_BY_ID.mitsushima}
        prose={MITSUSHIMA_ANALYSIS}
      />
      <ParallelCompare />
      <Synthesis />
      <Bibliography />
    </div>
  );
}
