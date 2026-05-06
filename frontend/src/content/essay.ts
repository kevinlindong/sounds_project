/**
 * The essay prose, organised by section. Each export is an array of
 * paragraphs (or paragraph objects with optional headings/footnotes) so
 * the section components can lay them out without touching the writing.
 *
 * Total target: ~2400 words across the site.
 */

export interface EssayParagraph {
  text: string;
  pull?: string; // optional pull quote shown alongside
}

export const RESEARCH_QUESTION =
  "How does each successive cover in the “Dreams” chain add value to the song as a single distributed work, rather than compete with the original for a fixed audience?";

export const TITLE = "Dreams in Translation";

export const SUBTITLE =
  "A cover chain in four languages, three decades, and at least three cultures.";

export const INTRO: EssayParagraph[] = [
  {
    text: "“Dreams” is a song that exists in many forms. The Cranberries recorded the original, Faye Wong covered it in Cantonese, the Irish Women in Harmony covered it again decades later, and Hikari Mitsushima covered Wong’s Cantonese version. To better analyze these various tracks, I created this interactive comparative listening website that presents all four versions side by side with a parallel music player that tempo matches and vocally syncs the recordings so that recordings can be layered on top of each other.",
  },
  {
    text: "Cover songs are typically evaluated on a single axis, fidelity to the original. However, this project asks a different question. How does each successive cover in the “Dreams” chain add value to the song as a single distributed work, rather than compete with the original for a fixed audience?",
  },
];

export const CRANBERRIES_ANALYSIS: EssayParagraph[] = [
  {
    text: "“Dreams” was written by Dolores O’Riordan and Noel Hogan and first released in October 1992 as The Cranberries’ debut single, before reappearing as the second track on their 1993 album Everybody Else Is Doing It, So Why Can’t We? The Limerick band (Noel Hogan on guitar, his brother Mike on bass, Fergal Lawler on drums, and a recently recruited O’Riordan on vocals) had formed only a few years earlier, and “Dreams” is the song that established the album’s signature sound. Noel Hogan’s open-tuned electric guitar carries the chiming arpeggios under the verses; Mike Hogan’s bass and Lawler’s drums sit back in the mix. O’Riordan’s voice does the rest. She slides between modal chest tones and the keening, lilted yelp that became her trademark, then climaxes in a wordless syllable-storm that belongs to no language. The single sold modestly on first release; the song became an enduring hit only after the album’s broader success in 1993.",
  },
  {
    text: "The song is about the disorientation of falling in love for the first time, the moment when a new feeling makes the surface of ordinary life stop reading the way it used to. O’Riordan opens with a line that announces the speaker’s whole condition: “Oh, my life is changing every day, in every possible way.” It isn’t really a love song addressed to another person. It’s a song about the speaker discovering she has changed: “I know I felt like this before, but now I’m feeling it even more.” The chorus settles on a single refrain, “never quite as it seems,” that names the disorientation directly. The bridge stages the moment the speaker recognizes herself in the change: “And then I open up and see / the person fallin’ here is me / a different way to be.” Only in the final verse does she turn outward (“and now I tell you openly / you have my heart, so don’t hurt me”), but even there the song’s center of gravity is the change in “me,” not the “you.” The wordless syllable-storm at the climax reads as the moment language fails in front of feeling: the song breaks into pure vocalize because there are no more words for what it is trying to say.",
  },
];

export const FAYEWONG_ANALYSIS: EssayParagraph[] = [
  {
    text: "Faye Wong’s 夢中人 (“Dream Lover”) was released in 1994 on her album 胡思亂想 (“Random Thoughts”) and almost immediately migrated into Wong Kar-wai’s 1994 film Chungking Express. 夢中人 surfaces twice in the film: first during the sequence in which Wong’s character — a snack-bar worker who has fallen for a regular customer, Cop 663 — lets herself into his apartment and silently redecorates it, watering his plants, swapping his ex-girlfriend’s possessions for new ones, leaving traces he won’t recognize as hers; and again over the closing credits. The song is non-diegetic, attached not to a stereo or jukebox in the frame (as the film’s other pop songs all are) but to Faye’s interior life: it sounds the inside of her fantasy about a man whose actual apartment she is standing in but whose actual self she still cannot face. Oliver Wang has written about how decisively the film fused song and singer for the generation of Hong Kong viewers who encountered the recording through it (Wang). Structurally, the arrangement is The Cranberries’ (chord progression, melodic contour, the wordless climax all carried over intact), but the Cantonese lyric, written by 周禮茂 (Chow Lai Mou), is an entirely new text. The cover belongs to a long Cantopop tradition of 翻唱, adopting Western and Japanese melodies as carriers for Cantonese lyrics, which Yiu-Wai Chu and Eve Leung trace through the genre’s history (Chu and Leung).",
    pull: "The melody is Cranberries’. The Cantonese lyric keeps almost nothing of the English.",
  },
  {
    text: "Where O’Riordan’s English lyric describes a vague new feeling settling on a self in flux, Chow Lai Mou’s Cantonese rewrite is far more specific and embodied: 夢中人，一分鐘抱緊，接十分鐘的吻. “Dream lover, hold me close for one minute, follow with a ten-minute kiss.” The song is no longer about the disorientation of new love but about the temporal greed of romantic fantasy: a counted economy of intervals (one minute, ten minutes, ten thousand minutes) to spend with someone who is not really there. The chorus deepens the paradox: 我仿似跟你熱戀過，和你未似現在這樣近, “I feel as if I’ve loved you passionately before, yet we have never been this close.” That intimacy exists only in the speaker’s imagination, alongside her own “thoughts running beyond restraint.” The title-phrase 夢中人 (“the one in the dream”) belongs to classical Chinese love poetry centuries before Cantopop, but Chow places this archaic figure in modern Hong Kong: the addressee is not a goddess or distant beloved but a 陌生人 (“stranger”) who has somehow walked into the speaker’s heart and 製造 (“manufactured”) the thrill she now feels. The verb 製造 returns at the end of the song (“to manufacture excitement within my heart”), and the repetition signals the speaker’s own awareness that the feeling is being constructed by her own mind. Wong’s bone-dry, breathy delivery, closer to interior monologue than declaration, pushes that inwardness further: the dream lover is unreachable not because they are far away but because they may not exist. The film’s use of the song as non-diegetic interior sound mirrors that condition exactly — the song is heard only inside Faye’s head, just as the lover lives only inside it.",
  },
];

export const IRISHWOMEN_ANALYSIS: EssayParagraph[] = [
  {
    text: "In June 2020, three months into Ireland’s first COVID-19 lockdown, Irish songwriter RuthAnne Cunningham released a charity cover of “Dreams” by Irish Women in Harmony, a collective she had assembled in the preceding weeks of around forty Irish women vocalists across generations. The release was the inaugural project of the collective, with all proceeds directed to Safe Ireland, the country’s national policy and service hub for frontline domestic-violence services. Each singer cut her part from home on whatever recording equipment she had; the session was assembled remotely and mixed during lockdown. The release was timed deliberately. Domestic-violence calls in Ireland surged under stay-at-home orders, and the cover was conceived as both a fundraiser and a public acknowledgement of women confined with their abusers. The choice of “Dreams” carried its own weight: Dolores O’Riordan had died unexpectedly in January 2018, and the recording lives inside a double absence: the original singer who is no longer there to sing it, and the everyday public sphere from which all the vocalists were temporarily cut off.",
  },
  {
    text: "The English text is unchanged from O’Riordan’s 1992 lyric, but its meaning is reshaped by who is singing and how. The song is rebuilt around relay rather than solo: each soloist takes only a phrase or two before passing the line on, with no single voice carrying the song from start to finish, and voices stack in the choruses. Where O’Riordan’s 1992 vocal made the lyric an interior, single-voice meditation on private change (“I know I felt like this before / but now I’m feeling it even more”), the Irish Women’s structure makes those same lines a collective utterance, with each clause answered by a different voice. The “love love love” climax of the original, which O’Riordan sang as a single sustained vocalize, is restructured here into a layered passage with successive voices entering on staggered beats so the wordless syllable-storm becomes a literal stack of overlapping voices. O’Riordan’s absence is what the arrangement makes audible. The song’s signature solo voice is not replaced by another soloist but distributed across the collective, each woman taking a piece of a line one woman used to carry alone. Lines like “you have my heart, so don’t hurt me,” written as a private appeal, read with new force when delivered by a collective singing to a country in lockdown.",
  },
];

export const MITSUSHIMA_ANALYSIS: EssayParagraph[] = [
  {
    text: "In March 2024, the Japanese actress and singer Hikari Mitsushima (満島ひかり) performed 夢中人 live at the Megaport Music Festival in Kaohsiung, Taiwan. Mitsushima has been a performer in Japan since 1997, beginning as a teenage J-pop idol with the groups Folder and Folder5 before breaking through as an actress in the late 2000s with Sion Sono’s Love Exposure; she has named Faye Wong as her idol and muse, and the Megaport set was a public tribute to that. Her source is not The Cranberries’ English original but Wong’s 1994 Cantonese version: the song she covers is the Chungking Express recording, three decades after Wong sang it and four since O’Riordan wrote it. Mitsushima does not regularly sing in Cantonese, and her vowels are learned phonetically, with the careful precision of someone who has practiced the song word by word from the source recording.",
  },
  {
    text: "Because the lyric is identical to Wong’s, the song’s nominal subject is the same: the temporal greed of romantic fantasy, the dream-lover who exists only in the speaker’s imagination, the recurring verb 製造 (“to manufacture”) that registers the speaker’s awareness of her own constructed feeling. The lyric still moves from the verses’ yearning, 夢中人，多麼想變真 (“dream lover, how I wish you could be real”), through the chorus’s paradoxical near-intimacy, 我仿似跟你熱戀過，和你未似現在這樣近 (“I feel as if I’ve loved you passionately before, yet we have never been this close”), to the verse-three plea to 製造心裡興奮 (“manufacture excitement within my heart”). But Mitsushima’s relationship to those words is very different from Wong’s. She is not a Cantonese speaker, and the words she sings are sounds before they are meanings, learned by ear from the source recording. Where Wong delivers 陌生人，怎樣走進內心 (“Stranger, how did you walk into my heart”) as a Cantonese speaker addressing an imagined lover, Mitsushima delivers the same phrase with the added strangeness of a singer who has herself approached the language as a stranger. The festival setting compounds this: a Japanese performer singing Cantonese to a Taiwanese audience that mostly speaks Mandarin and Hokkien, not Cantonese either — the song travelling further from each of its native tongues with every step. The “manufactured” intimacy the lyric describes ends up describing the act of singing too. The dream-lover is unreachable; so, by another route, is the language the song is asking for it in.",
  },
];

export const SYNTHESIS_INTRO: EssayParagraph[] = [
  {
    text: "The Cranberries’ waveform shows what every later cover responds to. Dolores O’Riordan’s voice does not enter until the 0:35 mark, nearly thirty-five seconds of instrumentals after the start. When she finally does start singing, we can see it light up around 3200 Hz in the spectrogram. On the parallel player, every other vocal entry lands relative to this one. Even when a later cover changes the language, the genre, or the arrangement, this 1992 recording is the reference signal. The value The Cranberries add is foundational: a specific sonic signature that the chain measures itself against.",
  },
  {
    text: "Switch the player to Wong’s 夢中人, and the spectrogram visibly shifts. O’Riordan’s centroid is around 3200 Hz, while Wong’s is around 2400 Hz. This is mainly attributed to Cantopop’s softer production palette with cleaner guitars, polished vocal mixing, and less of the high-frequency bite that defines The Cranberries’ alt-rock arrangement. By looking at translations of the lyrics, we can also see that they have largely been replaced. Where O’Riordan sings about abstract self-discovery with “Oh my life is changing every day” (The Cranberries, 0:34), Wong’s version rewrites it to “Dream lover, hold me close for one more minute” (Wong, 0:34). The song stops being about uncertainty and becomes more about desire. Julie Sanders describes this kind of move as “a more decisive journey away from the informing source into a wholly new cultural product and domain” (Sanders, 26). Gloria Pak adds that such mimesis “aids the creative and recreative processes of identity as well as its naturalization” (Pak, 70). What Sanders calls a “domain” matters here in a specific historical sense. Wong’s version arrived fused to Wong Kar-wai’s Chungking Express at the height of Cantopop, three years before Hong Kong’s 1997 handover to China, a moment when local identity was the central cultural question, and Wong was one of its most notable faces. The rewrite naturalized “Dreams” into Hong Kong’s pop cultural vocabulary at exactly the moment that vocabulary was being defined. Wong is not competing with The Cranberries, but rather, she is constructing a Cantopop listenership that the song previously did not have.",
  },
  {
    text: "Where Wong rewrites the language, Irish Women in Harmony rewrite the singer. The vocal enters at around the 0:04 mark, about one eighth that of The Cranberries’ wait. The forty-voice round cuts the instrumental intro almost entirely. The spectrogram shows the stacking, with layered formants from many singers tracked separately, polished mixing replaced by domestic-recording artifacts. Released as a charity single for Safe Ireland’s domestic violence services during a documented surge in lockdown calls, the recording converts what would have been commercial value into social value. Michael Garber’s “cocreators” model treats popular songs as “works-in-process… open and fluid” (Garber, 177), with texts revised by performers. The round enacts that on a forty-voice scale, with O’Riordan’s solo lyric rewritten into collective address, sung as a country mourned her during the COVID lockdown.",
  },
  {
    text: "Mitsushima’s spectrogram is, paradoxically, the smoothest of the four. The 2024 performance has the cleanest formants in the chain, even though the singer does not natively speak the language she is performing in. That smoothness sits in tension with the audible content, which is vowels learned by ear without semantic access. Babette Babich names the dynamic. She describes how “what is learned is less the song itself… not the song per se, but a song qua cover” (Babich, 391). Her example of Anna Kendrick learning the Cup Song from a 2009 YouTube clip rather than the Carter Family original describes Mitsushima exactly (Babich, 391). She covers Wong, not The Cranberries. Lawrence Venuti’s argument that domesticating translation hides the translator’s labor (Venuti, 1) describes what the spectrogram exposes here. The smoothness puts the phonetic distance from meaning on display instead of hiding it. What Mitsushima adds is the song’s circulation across a third linguistic boundary, sung by someone who knows it only as a cover of a cover.",
  },
];

/** Cards used in the synthesis grid: each maps a class concept to its work in the chain. */
export const SYNTHESIS_CARDS: Array<{ concept: string; source: string; body: string }> = [
  {
    concept: "Family resemblance / cluster concept",
    source: "Mosser, “‘Cover Songs’”; Magnus, A Philosophy of Cover Songs",
    body: "What holds the four versions together is not an essence but a Wittgensteinian cluster — melody, contour, the wordless climax — any of which a translator may keep or drop. Wong drops the lyric; the Irish round drops the soloist; Mitsushima drops the language she normally sings in. The cluster survives, but no single feature is essential to it.",
  },
  {
    concept: "Cover spectrum",
    source: "Kurt Mosser, “‘Cover Songs’: Ambiguity, Multivalence, Polysemy”",
    body: "Mosser’s typology lets us name what each cover is doing. Wong’s 夢中人 is a “major interpretation” — transformative enough to fork the chain. Irish Women in Harmony is a “minor interpretation” — fidelity to lyric, transformation of the social act of singing. Mitsushima is the hardest case: she covers a cover, and Mosser’s spectrum was built for a single source.",
  },
  {
    concept: "Mimesis as second nature",
    source: "Pak, The Ppongtchak Debate",
    body: "Pak argues that “mimesis... aids the creative and recreative processes of identity as well as its naturalization” (70). That is what makes Wong’s rewrite legible as cultural authorship rather than imitation: Cantopop in 1994 is not failing to be alt-rock; it is rebuilding a structure of feeling for Hong Kong audiences out of imported musical material.",
  },
  {
    concept: "Adaptation vs. appropriation",
    source: "Sanders, Adaptation and Appropriation",
    body: "Sanders separates adaptation, a “transpositional practice” (18) still in dialogue with its source, from appropriation, a “more decisive journey away from the informing source into a wholly new cultural product and domain” (26). She also notes that “infidelity” is itself “highly creative” (20). Wong’s 夢中人 is appropriation; Irish Women in Harmony is adaptation; Mitsushima is appropriation of an appropriation.",
  },
  {
    concept: "Translator as author",
    source: "Venuti, The Translator’s Invisibility",
    body: "Venuti argues that the translator is not a transparent conduit but an author in their own right (1). Mitsushima’s phonetic Cantonese makes that labor audible; Chow Lai Mou’s rewrite for Wong makes it artistic; the Irish Women in Harmony’s collective vocal makes it ethical. Each link in the chain demands credit for its translation work.",
  },
  {
    concept: "Distributed authorship",
    source: "Garber, “Some of These Days”",
    body: "Garber argues popular-song scholarship must “complicate ‘great man’ versions of history” (177); songs are “works-in-process… open and fluid,” their texts revised by performers “who act as cocreators” (177). The truth of creative dynamics, he writes, lies in “a confluence of multiple, often untraceable influences” (181). Mitsushima sourcing Wong, not Cranberries, enacts that confluence; the Irish round literalizes the cocreator claim with thirty-nine voices.",
  },
];

export const CONCLUSION: EssayParagraph[] = [
  {
    text: "Each cover in the “Dreams” chain added something the others did not, and the parallel player makes those differences specific. The Cranberries supplied the baseline. Wong opened the song to a new language and a new city at a specific historical moment. Irish Women in Harmony converted it into social value during lockdown. Mitsushima added a phonetic, transnational layer. One case study cannot prove the pattern, but the parallel player suggests a hypothesis worth scaling. Covers are not derivative copies racing for an original’s audience. They are distributed authors building cumulative value across partially independent registers. The lyric “Never quite as it seems,” sung in 1992 as a private revelation, turns out to have been a description of how a song’s value travels throughout time and culture.",
  },
];

export type CiteSegment = string | { italic: string };

export const BIBLIOGRAPHY: Array<{
  cite: CiteSegment[];
  note?: string;
}> = [
  {
    cite: [
      "Babich, Babette. “Musical ‘Covers’ and the Culture Industry: From Antiquity to the Age of Digital Reproducibility.” ",
      { italic: "Research in Phenomenology" },
      ", vol. 48, no. 3, 2018, pp. 385–407.",
    ],
  },
  {
    cite: [
      "Chu, Yiu-Wai, and Eve Leung. “Remapping Hong Kong Popular Music: Covers, Localisation and the Waning Hybridity of Cantopop.” ",
      { italic: "Popular Music" },
      ", vol. 32, no. 1, 2013, pp. 65–78.",
    ],
  },
  {
    cite: [
      "Garber, Michael. “‘Some of These Days’ and the Study of the Great American Songbook.” ",
      { italic: "Journal of the Society for American Music" },
      ", vol. 4, no. 2, 2010, pp. 175–214.",
    ],
  },
  {
    cite: [
      "Irish Women in Harmony. “The Cranberries ‘Dreams’ | The Late Late Show | RTÉ One.” ",
      { italic: "YouTube" },
      ", uploaded by The Late Late Show, 4 Sept. 2020, www.youtube.com/watch?v=oT8XyXaIvZI.",
    ],
  },
  {
    cite: [
      "Mitsushima, Hikari. “滿島光 - 夢中人，大港開唱live，原唱 王菲 - 字幕CC.” ",
      { italic: "YouTube" },
      ", uploaded by Tony Song 湯尼之歌, 31 Mar. 2024, www.youtube.com/watch?v=8hBh4BU1K4E.",
    ],
  },
  {
    cite: [
      "Pak, Gloria Lee. “On the Mimetic Faculty: A Critical Study of the 1984 Ppongtchak Debate and Post-Colonial Mimesis.” ",
      { italic: "Korean Pop Music: Riding the Wave" },
      ", edited by Keith Howard, Global Oriental, 2006, pp. 62–71.",
    ],
  },
  {
    cite: [
      "Sanders, Julie. ",
      { italic: "Adaptation and Appropriation" },
      ". Routledge, 2006.",
    ],
  },
  {
    cite: [
      "The Cranberries. “The Cranberries - Dreams (Dir: Peter Scammell) (Official Music Video).” ",
      { italic: "YouTube" },
      ", uploaded by TheCranberriesTV, 16 June 2009, www.youtube.com/watch?v=Yam5uK6e-bQ.",
    ],
  },
  {
    cite: [
      "Venuti, Lawrence. ",
      { italic: "The Translator’s Invisibility: A History of Translation" },
      ". Routledge, 1995. ",
      { italic: "Baruch College Blogs" },
      ", files.blogs.baruch.cuny.edu/wp-content/blogs.dir/3506/files/2014/09/Venuti-on-Translation.pdf.",
    ],
  },
  {
    cite: [
      "Wang, Oliver. “A Cantopop Dream Girl’s First Film Reverie.” ",
      { italic: "The Criterion Collection: Current" },
      ", 21 Oct. 2019, www.criterion.com/current/posts/6640-a-cantopop-dream-girl-s-first-film-reverie.",
    ],
  },
  {
    cite: [
      "Wong, Faye. “王菲 Faye Wong -《夢中人》(Official Music Video) [HD].” ",
      { italic: "YouTube" },
      ", uploaded by FayeWongVEVO, 23 June 2019, www.youtube.com/watch?v=hN2jOHeI5tc.",
    ],
  },
];
