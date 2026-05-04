export interface LyricLine {
  primary: string;
  translation?: string;
  romanization?: string;
  /** Start time in seconds. Optional — when omitted, line is shown but not synced. */
  t?: number;
}

export interface Track {
  id: string;
  paletteKey: string;
  artist: string;
  artistRomanized?: string;
  title: string;
  titleTranslation?: string;
  year: number;
  origin: string;
  language: string;
  genre: string;
  audioSrc: string;
  /** Approximate duration in seconds (from ffprobe) */
  durationSec: number;
  /**
   * Timestamp (seconds) of the first sung lyric. Used to align tracks in the
   * parallel-playback view so all versions start at "verse 1" simultaneously
   * rather than absolute t=0 (which would compare instrumental intros).
   */
  vocalStart: number;
  /**
   * Time-stretch factor for the parallel-playback view. The four recordings
   * have natural tempos of 128.40 / 129.20 / 118.13 / 138.74 BPM (librosa beat
   * tracking at sr=44100, hop=128). Cranberries is the reference; the others
   * play at ref / their_BPM so the master timeline ticks at one common pulse
   * (~128.4 BPM). Combined with `preservesPitch=true` on the <audio> element,
   * pitch stays in each recording's original key while beats stay locked.
   */
  playbackRate?: number;
  /** Short excerpt for the inline section. */
  excerpt: LyricLine[];
  /**
   * Full lyrics with timestamps for the karaoke scroller. Timestamps are
   * structural estimates per song — verse / chorus boundaries listened-to
   * rather than linearly distributed, since these tracks have meaningful
   * instrumental sections (esp. the Cranberries' wordless yodel break).
   */
  fullLyrics: LyricLine[];
}

/**
 * Cantonese lyrics for 夢中人 (Wong 1994 / Mitsushima 2024). Lyric authorship:
 * 周禮茂 (Chow Lai Mou). Canonical lyric source: Genius. The song reuses the
 * Cranberries' melody but is a full Cantonese rewrite — only the song-form
 * repeats from O'Riordan, not the words.
 *
 * Structure: Verse 1 → Chorus → [la-la-la post-chorus, omitted] → Verse 2 →
 * Chorus → Verse 3 → [la-la-la outro, omitted]. Granular fragments (rather
 * than full lines) make karaoke highlighting feel tight; Wong's phrasing puts
 * long pauses between each three-character fragment of the verse.
 */
const CANTONESE_VERSE_1: Array<Omit<LyricLine, "t">> = [
  {
    primary: "夢中人",
    romanization: "mung4 zung1 jan4",
    translation: "Dream lover —",
  },
  {
    primary: "一分鐘抱緊",
    romanization: "jat1 fan1 zung1 pou5 gan2",
    translation: "for one minute, hold me close",
  },
  {
    primary: "接十分鐘的吻",
    romanization: "zip3 sap6 fan1 zung1 dik1 man5",
    translation: "and follow with a ten-minute kiss",
  },
  {
    primary: "陌生人",
    romanization: "mak6 sang1 jan4",
    translation: "Stranger —",
  },
  {
    primary: "怎樣走進內心",
    romanization: "zam2 joeng6 zau2 zeon3 noi6 sam1",
    translation: "how did you walk into my heart",
  },
  {
    primary: "製造這次興奮",
    romanization: "zai3 zou6 ze5 ci3 hing1 fan5",
    translation: "and manufacture this thrill?",
  },
];

const CANTONESE_CHORUS: Array<Omit<LyricLine, "t">> = [
  {
    primary: "我仿似跟你熱戀過",
    romanization: "ngo5 fong2 ci5 gan1 nei5 jit6 lyun2 gwo3",
    translation: "I feel as if I've loved you passionately before",
  },
  {
    primary: "和你未似現在這樣近",
    romanization: "wo4 nei5 mei6 ci5 jin6 zoi6 ze5 joeng6 gan6",
    translation: "yet we have never been this close",
  },
  {
    primary: "思想開始過份",
    romanization: "si1 soeng2 hoi1 ci2 gwo3 fan6",
    translation: "my thoughts run beyond restraint",
  },
  {
    primary: "為何突然襲擊我",
    romanization: "wai6 ho4 dat6 jin4 zaap6 gik1 ngo5",
    translation: "why have you struck me so suddenly",
  },
  {
    primary: "來進入我悶透夢窩",
    romanization: "loi4 zeon3 jap6 ngo5 mun6 tau3 mung4 wo1",
    translation: "entering the stifled hollow of my dream",
  },
  {
    primary: "激起一股震撼",
    romanization: "gik1 hei2 jat1 gu2 zan3 ham6",
    translation: "stirring up a tremor of awe",
  },
];

const CANTONESE_VERSE_2: Array<Omit<LyricLine, "t">> = [
  {
    primary: "夢中人",
    romanization: "mung4 zung1 jan4",
    translation: "Dream lover —",
  },
  {
    primary: "多麼想變真",
    romanization: "do1 mo1 soeng2 bin3 zan1",
    translation: "how I wish you could be real",
  },
  {
    primary: "我在心裡不禁",
    romanization: "ngo5 zoi6 sam1 leoi5 bat1 gam1",
    translation: "my heart cannot help itself",
  },
  {
    primary: "夢中人",
    romanization: "mung4 zung1 jan4",
    translation: "Dream lover —",
  },
  {
    primary: "這分鐘我在等",
    romanization: "ze5 fan1 zung1 ngo5 zoi6 dang2",
    translation: "this minute I am waiting",
  },
  {
    primary: "你萬分鐘的吻",
    romanization: "nei5 maan6 fan1 zung1 dik1 man5",
    translation: "for your ten-thousand-minute kiss",
  },
];

const CANTONESE_VERSE_3: Array<Omit<LyricLine, "t">> = [
  {
    primary: "夢中尋",
    romanization: "mung4 zung1 cam4",
    translation: "Searching in dreams —",
  },
  {
    primary: "一分鐘抱緊",
    romanization: "jat1 fan1 zung1 pou5 gan2",
    translation: "for one minute, hold me close",
  },
  {
    primary: "我在心裡不禁",
    romanization: "ngo5 zoi6 sam1 leoi5 bat1 gam1",
    translation: "my heart cannot help itself",
  },
  {
    primary: "夢中人",
    romanization: "mung4 zung1 jan4",
    translation: "Dream lover —",
  },
  {
    primary: "這分鐘我在等",
    romanization: "ze5 fan1 zung1 ngo5 zoi6 dang2",
    translation: "this minute I am waiting",
  },
  {
    primary: "來製造心裡興奮 心興奮",
    romanization: "loi4 zai3 zou6 sam1 leoi5 hing1 fan5, sam1 hing1 fan5",
    translation: "to manufacture excitement within my heart, this heart-thrill",
  },
];

/** English lyrics shared by Cranberries (1992) and Irish Women in Harmony (2020). */
const ENGLISH_LYRICS: Array<Omit<LyricLine, "t">> = [
  { primary: "Oh, my life is changing every day," },
  { primary: "in every possible way." },
  { primary: "And oh, my dreams," },
  { primary: "it's never quite as it seems," },
  { primary: "never quite as it seems." },
  { primary: "I know I felt like this before," },
  { primary: "but now I'm feeling it even more," },
  { primary: "because it came from you." },
  { primary: "And then I open up and see" },
  { primary: "the person fallin' here is me," },
  { primary: "a different way to be." },
  { primary: "I want more, impossible to ignore," },
  { primary: "impossible to ignore." },
  { primary: "And they'll come true, impossible not to do," },
  { primary: "impossible not to do." },
  { primary: "And now I tell you openly," },
  { primary: "you have my heart so don't hurt me." },
  { primary: "You're what I couldn't find." },
  { primary: "A totally amazing mind," },
  { primary: "so understanding and so kind;" },
  { primary: "you're everything to me." },
  { primary: "Oh, my life is changing every day," },
  { primary: "in every possible way." },
  { primary: "And oh, my dreams," },
  { primary: "it's never quite as it seems —" },
  { primary: "'cause you're a dream to me," },
  { primary: "dream to me." },
];

/** Apply a parallel array of timestamps to a lyrics list. */
function withTimes(
  lines: Array<Omit<LyricLine, "t">>,
  times: number[],
): LyricLine[] {
  return lines.map((line, i) => ({ ...line, t: times[i] }));
}

/**
 * Cranberries 1992 — timestamps from whisper.cpp medium-model ASR with
 * word-level timing (-ml 1 -sow). Each line's "t" is the moment its first
 * word starts. Phrase-repeat handling: line N+1 anchors to the *second*
 * occurrence of "impossible to ignore" / "impossible not to do", since
 * line N's timestamp is the start of "I want more, impossible…". The
 * sustained "love" yodel overlaps with line 12's tail, ~100–114s.
 */
const CRANBERRIES_TIMES = [
  // verse 1 ("Oh, my life is changing...") — line 1 pinned to the acoustic
  // "Oh" onset peak at 34.881s (librosa vocal-band onset; Whisper collapsed
  // the segment to 35.000 since it has no DTW alignment for the first
  // segment after a long silence). Subsequent lines from whisper.cpp medium
  // -ml 1 -sow word-level timestamps; line N anchors on the *first audible*
  // word — Whisper drops the unstressed pickup ("In", "And") on lines 1, 13,
  // 15, so we use the first word it captured.
  34.881, 43, 50, 54, 58, 63.54, 68.19, 73.61,
  // pre-chorus ("And then I open up...")
  78.46, 83.02, 88.42,
  // -- "love" yodel overlaps with line 12 tail ~100–114s --
  // chorus 1 ("I want more, impossible to ignore," / "impossible to ignore.")
  96.41, 115, 123.17, 133,
  // verse 2 ("And now I tell you openly...")
  138.03, 142.54, 147.36, 152.36, 157.49, 162.73,
  // final chorus / outro
  167.73, 176, 185, 189, 192, 195,
];

/**
 * Irish Women in Harmony 2020 — timestamps from whisper.cpp medium-model ASR
 * with word-level timing. Same phrase-repeat handling as Cranberries.
 * Vocal entry "Oh" at ~5s; the round-style "love" sustains between line 11
 * (~64s) and line 12 (~88s).
 */
const IRISH_WOMEN_TIMES = [
  // verse 1 — line 1 pinned to acoustic "Oh" onset at 4.866s (librosa
  // vocal-band onset). Whisper word-level had "Oh"/"All" entry at 4.56s,
  // confirming the previous 6.0 was ~1.1s late.
  4.866, 13, 22, 26, 30, 37, 43, 48,
  // pre-chorus
  53, 59, 64,
  // -- "love love love" round ~69–87s --
  // chorus 1
  88, 97, 103, 114,
  // verse 2
  119, 125, 130, 135, 141, 146,
  // final chorus / outro
  152, 160, 168, 175, 179, 182,
];

/**
 * Faye Wong 1994 — timestamps verified by whisper.cpp ASR (Mandarin-language
 * decode of Cantonese vocals; transcript characters are approximate but
 * timing is accurate). Structure: Verse 1 → Chorus → [la-la-la post-chorus
 * 88–108s, omitted] → Verse 2 → Chorus → Verse 3 → [la-la-la outro 194s+,
 * omitted].
 */
const FAYEWONG_LINES = [
  ...CANTONESE_VERSE_1,
  ...CANTONESE_CHORUS,
  ...CANTONESE_VERSE_2,
  ...CANTONESE_CHORUS,
  ...CANTONESE_VERSE_3,
];
const FAYEWONG_TIMES = [
  // Verse 1 — line 1 pinned to acoustic 夢 onset at 33.611s (librosa vocal-
  // band onset peak). Matches the track's vocalStart so 夢中人 fires at
  // master t=0 in the parallel-playback view.
  33.611, 38, 41, 45, 53, 57,
  // Chorus 1 (62–89s)
  62, 66, 71, 76, 81, 86,
  // -- la-la-la post-chorus 89–108s, omitted --
  // Verse 2 (108–134s)
  108, 112, 115, 120, 127, 130,
  // Chorus 2 (137–164s)
  137, 141, 145, 149, 156, 160,
  // Verse 3 (167–193s) — listened-back corrections: 一分鐘抱緊 at 2:51,
  // 我在心裡不禁 at 2:55, 夢中人 at 3:02, 這分鐘我在等 at 3:06,
  // 來製造心裡興奮 心興奮 at 3:10.
  167, 171, 175, 182, 186, 190,
  // -- la-la-la outro 193s onwards, omitted --
];

/**
 * Mitsushima 2024 — whisper-medium hallucinated on this track (reverb-heavy
 * vocals defeat the ASR), so timestamps come from listened-back timing rather
 * than ASR. Mitsushima's pacing is progressively earlier than Wong's: V1 entry
 * gap is ~5s, V2 ~9s, V3 ~13s, so a fixed offset doesn't work — every line is
 * pinned individually. Same lyric structure since Mitsushima reproduces Wong's
 * Cantonese reading.
 */
const MITSUSHIMA_LINES = [
  ...CANTONESE_VERSE_1,
  ...CANTONESE_CHORUS,
  ...CANTONESE_VERSE_2,
  ...CANTONESE_CHORUS,
  ...CANTONESE_VERSE_3,
];
const MITSUSHIMA_VOCAL_START = 28.968;
const MITSUSHIMA_TIMES = [
  // Verse 1 — first line pinned to MITSUSHIMA_VOCAL_START so changing the
  // vocal-start constant also nudges the first lyric onset; the rest are
  // listened-back per-line because Mitsushima's pacing diverges from Wong's
  // (her V3 lands ~4s earlier in song-relative time, so a fixed offset
  // would drift visibly by the outro).
  MITSUSHIMA_VOCAL_START, 33, 36, 40, 46, 50,
  // Chorus 1 (55.6–77s) — listened-back.
  55.6, 59, 64, 69.8, 73, 77,
  // -- la-la-la post-chorus, omitted --
  // Verse 2 (98.8–119s) — listened-back.
  98.8, 102, 105, 113, 116, 119,
  // Chorus 2 (125–147s) — listened-back.
  125, 129, 133, 139, 143, 147,
  // Verse 3 (154–175s) — listened-back.
  154, 158, 161, 168, 172, 175,
  // -- la-la-la outro, omitted --
];

export const TRACKS: Track[] = [
  {
    id: "cranberries",
    paletteKey: "cranberries",
    artist: "The Cranberries",
    title: "Dreams",
    year: 1992,
    origin: "Limerick, Ireland",
    language: "English",
    genre: "Alternative rock / dream pop",
    audioSrc: "/audio/01-cranberries-dreams.mp3",
    durationSec: 253.25,
    vocalStart: 35.21,
    playbackRate: 1.0,
    excerpt: [
      { primary: "Oh my life is changing every day," },
      { primary: "in every possible way." },
      { primary: "And oh my dreams, it's never quite as it seems," },
      { primary: "never quite as it seems." },
      { primary: "I know I felt like this before," },
      { primary: "but now I'm feeling it even more," },
      { primary: "because it came from you." },
    ],
    fullLyrics: withTimes(ENGLISH_LYRICS, CRANBERRIES_TIMES),
  },
  {
    id: "fayewong",
    paletteKey: "fayewong",
    artist: "王菲",
    artistRomanized: "Faye Wong",
    title: "夢中人",
    titleTranslation: "Dream Lover",
    year: 1994,
    origin: "Hong Kong",
    language: "Cantonese",
    genre: "Cantopop",
    audioSrc: "/audio/02-fayewong-mengzhongren.mp3",
    durationSec: 262.5,
    // Detected tempo 129.20 BPM — 0.62% faster than Cranberries' 128.40,
    // so playbackRate slows it to 128.40/129.20 = 0.99379 to match the
    // master pulse. (Wong's recording isn't a clone of the Cran backing
    // track even though they share the melody — the slight tempo offset
    // is real, not detection noise: cross-correlation against Cran's
    // onset envelope independently confirmed Wong as 1.1% faster.)
    //
    // vocalStart 33.611s = acoustic onset of 夢 (vocal-band STFT peak).
    vocalStart: 33.5,
    playbackRate: 0.99379,
    excerpt: [
      {
        primary: "夢中人 一分鐘抱緊",
        romanization: "mung4 zung1 jan4, jat1 fan1 zung1 pou5 gan2",
        translation: "Dream lover — for one minute, hold me close",
      },
      {
        primary: "接十分鐘的吻",
        romanization: "zip3 sap6 fan1 zung1 dik1 man5",
        translation: "and follow with a ten-minute kiss",
      },
      {
        primary: "陌生人 怎樣走進內心",
        romanization: "mak6 sang1 jan4, zam2 joeng6 zau2 zeon3 noi6 sam1",
        translation: "Stranger — how did you walk into my heart",
      },
      {
        primary: "製造這次興奮",
        romanization: "zai3 zou6 ze5 ci3 hing1 fan5",
        translation: "and manufacture this thrill?",
      },
    ],
    fullLyrics: withTimes(FAYEWONG_LINES, FAYEWONG_TIMES),
  },
  {
    id: "irishwomen",
    paletteKey: "irishwomen",
    artist: "Irish Women in Harmony",
    title: "Dreams",
    year: 2020,
    origin: "Ireland (collective)",
    language: "English",
    genre: "Charity collective / vocal harmony",
    audioSrc: "/audio/03-irishwomen-dreams.mp3",
    durationSec: 261.5,
    vocalStart: 6.25,
    playbackRate: 1.08694,
    excerpt: [
      { primary: "Oh my life is changing every day," },
      { primary: "in every possible way." },
      { primary: "And oh my dreams, it's never quite as it seems," },
      { primary: "never quite as it seems." },
      { primary: "(Sung as a 39-voice round, proceeds to SafeIreland)" },
    ],
    fullLyrics: withTimes(ENGLISH_LYRICS, IRISH_WOMEN_TIMES),
  },
  {
    id: "mitsushima",
    paletteKey: "mitsushima",
    artist: "満島ひかり",
    artistRomanized: "Hikari Mitsushima",
    title: "夢中人",
    titleTranslation: "Dream Lover",
    year: 2024,
    origin: "Japan (covering Wong's Cantonese version)",
    language: "Cantonese (sung by a Japanese performer)",
    genre: "Contemporary cover",
    audioSrc: "/audio/04-mitsushima-mengzhongren.mp3",
    durationSec: 257.8,
    // vocalStart sourced from MITSUSHIMA_VOCAL_START so that the first
    // Mitsushima lyric onset moves with it; subsequent lines are listened-back
    // per-line because her pacing diverges from Wong's by the outro.
    vocalStart: MITSUSHIMA_VOCAL_START,
    playbackRate: 0.92547,
    excerpt: [
      {
        primary: "夢中人 一分鐘抱緊",
        romanization: "mung4 zung1 jan4, jat1 fan1 zung1 pou5 gan2",
        translation: "Dream lover — for one minute, hold me close",
      },
      {
        primary: "接十分鐘的吻",
        romanization: "zip3 sap6 fan1 zung1 dik1 man5",
        translation: "and follow with a ten-minute kiss",
      },
      { primary: "(Mitsushima learns Cantonese phonetically, retracing Wong's 1994 vocal)" },
    ],
    fullLyrics: withTimes(MITSUSHIMA_LINES, MITSUSHIMA_TIMES),
  },
];

export const TRACKS_BY_ID: Record<string, Track> = TRACKS.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<string, Track>,
);
