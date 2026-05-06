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
    text: "“Dreams” was written by Dolores O’Riordan and Noel Hogan and first released in October 1992 as The Cranberries’ debut single, before reappearing as the second track on their 1993 album Everybody Else Is Doing It, So Why Can’t We? The Limerick band (Noel Hogan on guitar, his brother Mike on bass, Fergal Lawler on drums, and a recently recruited O’Riordan on vocals) had formed only a few years earlier, and “Dreams” is the song that established the album’s signature sound. Noel Hogan’s open-tuned electric guitar carries the chiming arpeggios under the verses, with Mike Hogan’s bass and Lawler’s drums sitting back in the mix. O’Riordan’s voice does the rest. She slides between modal chest tones and the keening, lilted yelp that became her trademark, then climaxes in a wordless syllable-storm that belongs to no language. The single sold modestly on first release, becoming an enduring hit only after the album’s broader success in 1993.",
  },
  {
    text: "The song is about the disorientation of falling in love for the first time, the moment when a new feeling makes the surface of ordinary life stop reading the way it used to. It isn’t really a love song addressed to another person. It’s a song about the speaker discovering she has changed, told through lines like “I know I felt like this before, but now I’m feeling it even more.” The chorus settles on a single refrain, “never quite as it seems,” that names the disorientation directly. In the bridge, the speaker recognizes herself in the change, singing “And then I open up and see, the person fallin’ here is me, a different way to be.” Only in the final verse does she turn outward to sing “and now I tell you openly, you have my heart, so don’t hurt me,” but even there the song’s center of gravity is the change in “me,” not the “you.” The wordless syllable-storm at the climax reads as the moment language fails in front of feeling, the song breaking into pure vocalize because there are no more words for what it is trying to say.",
  },
];

export const FAYEWONG_ANALYSIS: EssayParagraph[] = [
  {
    text: "Faye Wong’s 夢中人 (Dream Lover) was released in 1994 on her album 胡思亂想 (Random Thoughts) and almost immediately migrated into Wong Kar-wai’s 1994 film Chungking Express. 夢中人 surfaces twice in the film, first during the sequence in which Wong’s character (a snack-bar worker who has fallen for a regular customer, Cop 663) lets herself into his apartment and silently redecorates it, watering his plants, swapping his ex-girlfriend’s possessions for new ones, leaving traces he won’t recognize as hers, and then again over the closing credits. The song is non-diegetic, attached not to a stereo or jukebox in the frame (as the film’s other pop songs all are) but to Faye’s interior life, sounding the inside of her fantasy about a man whose actual apartment she is standing in but whose actual self she still cannot face. Oliver Wang has written about how decisively the film fused song and singer for the generation of Hong Kong viewers who encountered the recording through it (Wang). Structurally, the arrangement keeps The Cranberries’ chord progression, melodic contour, and wordless climax intact, but the Cantonese lyric, written by 周禮茂 (Chow Lai Mou), is an entirely new text. The cover belongs to a long Cantopop tradition of 翻唱, adopting Western and Japanese melodies as carriers for Cantonese lyrics, which Yiu-Wai Chu and Eve Leung trace through the genre’s history (Chu and Leung).",
    pull: "The melody is Cranberries’. The Cantonese lyric keeps almost nothing of the English.",
  },
  {
    text: "In the opening verse of Chow Lai Mou’s rewrite, the speaker wants more and more time with the dream lover, a longing for someone who isn’t really there. The chorus deepens the paradox with 我仿似跟你熱戀過，和你未似現在這樣近 (I feel as if I’ve loved you passionately before, yet we have never been this close). That intimacy exists only in the speaker’s imagination, alongside her own thoughts running beyond restraint. The title-phrase 夢中人 (the one in the dream) belongs to classical Chinese love poetry centuries before Cantopop, but Chow places this archaic figure in modern Hong Kong, where the addressee is not a goddess or distant beloved but a 陌生人 (stranger) who has somehow walked into the speaker’s heart and 製造 (manufactured) the thrill she now feels. The verb 製造 returns at the end of the song (to manufacture excitement within my heart), and the repetition signals the speaker’s own awareness that the feeling is being constructed by her own mind. Wong’s bone-dry, breathy delivery, closer to interior monologue than declaration, pushes that inwardness further. The dream lover is unreachable not because they are far away but because they may not exist. The film’s use of the song as non-diegetic interior sound mirrors that condition exactly. The song is heard only inside Faye’s head, just as the lover lives only inside it.",
  },
];

export const IRISHWOMEN_ANALYSIS: EssayParagraph[] = [
  {
    text: "In June 2020, three months into Ireland’s first COVID-19 lockdown, Irish songwriter RuthAnne Cunningham assembled a collective of around thirty-nine Irish women vocalists across generations under the name Irish Women in Harmony, and their first project together was a cover of Dreams. Each singer cut her part from home on whatever recording equipment she had, and the session was assembled remotely and mixed during lockdown. The choice of song carried its own weight. Dolores O’Riordan had died unexpectedly in January 2018, and the recording lives inside a double absence. The original singer is no longer there to sing it, and all the vocalists are temporarily cut off from the everyday public sphere.",
  },
  {
    text: "The English text is unchanged from O’Riordan’s 1992 lyric, but its meaning is reshaped by who is singing and how. The song is rebuilt around relay, with each soloist taking only a phrase or two before passing the line on, no single voice carrying the song from start to finish, and voices stacking in the choruses. Lines like “I know I felt like this before, but now I’m feeling it even more” get split between singers who have never recorded in the same room, with each clause answered by a different voice. The “love love love” climax of the original, which O’Riordan sang as a single sustained vocalize, is restructured here into a layered passage with successive voices entering on staggered beats so the wordless syllable-storm becomes a literal stack of overlapping voices. A private appeal like “you have my heart, so don’t hurt me” arrives in the song’s last verse not as one voice’s plea but as a chorus’s, a small structural shift that decisively changes who is asking, and of whom.",
  },
];

export const MITSUSHIMA_ANALYSIS: EssayParagraph[] = [
  {
    text: "In March 2024, the Japanese actress and singer Hikari Mitsushima (満島ひかり) performed 夢中人 live at the Megaport Music Festival in Kaohsiung, Taiwan. Mitsushima has been a performer in Japan since 1997, beginning as a teenage J-pop idol with the groups Folder and Folder5 before breaking through as an actress in the late 2000s with Sion Sono’s Love Exposure. She has named Faye Wong as her idol and muse, and the Megaport set was a public tribute to that idol, three decades after Wong sang the song into the Chungking Express soundtrack and four since O’Riordan first wrote it.",
  },
  {
    text: "Because the lyric is identical to Wong’s, the song carries the same nominal subject, the temporal greed of romantic fantasy, the dream-lover who exists only in the speaker’s imagination, and the recurring verb 製造 (to manufacture) that registers the speaker’s awareness of her own constructed feeling. The lyric still moves from the verses’ yearning, 夢中人，多麼想變真 (dream lover, how I wish you could be real), through the chorus’s paradoxical near-intimacy, 我仿似跟你熱戀過，和你未似現在這樣近 (I feel as if I’ve loved you passionately before, yet we have never been this close), to the verse-three plea to 製造心裡興奮 (manufacture excitement within my heart). But Mitsushima’s relationship to those words is not Wong’s. Where Wong delivers 陌生人，怎樣走進內心 (Stranger, how did you walk into my heart) as a Cantonese speaker addressing an imagined lover, Mitsushima delivers the same phrase as a singer who has herself approached the language as a stranger. The festival setting compounds this. A Japanese performer sings Cantonese to a Taiwanese audience that mostly speaks Mandarin and Hokkien, not Cantonese either, and the song travels further from each of its native tongues with every step. The “manufactured” intimacy the lyric describes ends up describing the act of singing too. The dream-lover is unreachable, and by another route, so is the language the song is asking for it in.",
  },
];

export const SYNTHESIS_INTRO: EssayParagraph[] = [
  {
    text: "The Cranberries’ waveform shows what every later cover responds to. Dolores O’Riordan’s voice does not enter until the 0:34 mark, nearly thirty-four seconds of instrumentals after the start. When she finally does start singing, we can see it light up between 2000 and 4000 Hz in the spectrogram. On the parallel player, every other vocal entry lands relative to this one. Even when a later cover changes the language, the genre, or the arrangement, this 1992 recording is the reference signal. The value The Cranberries add is foundational: a specific sonic signature that the chain measures itself against.",
  },
  {
    text: "Switch the player to Wong’s 夢中人, and the spectrogram visibly shifts. While O’Riordan’s centroid is around 3200 Hz, Wong’s is around 2400 Hz. This is mainly attributed to Cantopop’s softer production palette with cleaner guitars, polished vocal mixing, and less of the high-frequency bite that defines The Cranberries’ alt-rock arrangement. By looking at translations of the lyrics, we can also see that they have largely been replaced. Where O’Riordan sings about abstract self-discovery with “Oh my life is changing every day, in every possible way” (The Cranberries, 0:34), Wong’s version rewrites it to “Dream lover, for one minute, hold me close, and follow with a 10-minute kiss” (Wong, 0:34). The song stops being about uncertainty and becomes more about desire. Julie Sanders describes this kind of move as “a more decisive journey away from the informing source into a wholly new cultural product and domain” (Sanders, 26). Gloria Pak adds that such mimesis ‘aids the creative and recreative processes of identity as well as its naturalization’ (Pak, 70). For Wong, that identity work happened in a specific historical domain. Wong’s version arrived fused to Wong Kar-wai’s Chungking Express at the height of Cantopop, three years before Hong Kong’s 1997 handover to China, a moment when local identity was the central cultural question, and Wong was one of its most notable faces. The rewrite naturalized Dreams into Hong Kong’s pop cultural vocabulary at exactly the moment that vocabulary was being defined. Wong is not competing with The Cranberries, but rather, she is constructing a Cantopop listenership that the song has never had.",
  },
  {
    text: "Where Wong rewrites the language, Irish Women in Harmony rewrite the singer. In their version, the vocal enters at around the 0:04 mark, about one-eighth of The Cranberries’ wait. The thirty-nine voice round cuts the instrumental intro almost entirely. The spectrogram shows the stacking, with layered formants from many singers tracked separately, polished mixing replaced by domestic-recording artifacts. Released as a charity single for Safe Ireland’s domestic violence services during a documented surge in lockdown calls, the recording converts what would have been commercial value into social value. Michael Garber’s “cocreators” model treats popular songs as “works-in-process… open and fluid” (Garber, 177), with texts revised by performers. The round enacts that on a thirty-nine voice scale, with O’Riordan’s solo lyric rewritten into collective address, sung as a country mourned her during the COVID lockdown.",
  },
  {
    text: "Mitsushima’s spectrogram is, paradoxically, the smoothest of the four. The 2024 performance has the cleanest formants in the chain, even though the singer does not natively speak the language she is performing in. That smoothness sits in tension with the audible content, which is vowels learned by ear without semantic access. Babette Babich names the dynamic. She describes how “what is learned is less the song itself… not the song per se, but a song qua cover” (Babich, 391). Her example of Anna Kendrick learning the Cup Song from a 2009 YouTube clip rather than the Carter Family original describes Mitsushima exactly (Babich, 391). She covers Wong, not The Cranberries. Lawrence Venuti’s argument that domesticating translation hides the translator’s labor (Venuti, 1) describes what the spectrogram exposes here. The smoothness puts the phonetic distance from meaning on display instead of hiding it. What Mitsushima adds is the song’s circulation across a third linguistic boundary, sung by someone who knows it only as a cover of a cover.",
  },
];

/** Cards used in the synthesis grid: each maps a class concept to its work in the chain. */
export const SYNTHESIS_CARDS: Array<{ concept: string; source: string; body: string }> = [
  {
    concept: "Mimesis as second nature",
    source: "Pak, The Ppongtchak Debate",
    body: "Pak argues that “Mimesis... aids the creative and recreative processes of identity as well as its naturalization” (Pak, 70). That is what makes Wong’s rewrite legible as cultural authorship rather than imitation: Cantopop in 1994 is not failing to be alt-rock. It is rebuilding a structure of feeling for Hong Kong audiences out of imported musical material.",
  },
  {
    concept: "Adaptation vs. appropriation",
    source: "Sanders, Adaptation and Appropriation",
    body: "Sanders separates adaptation, a “transpositional practice” (Sanders, 18) still in dialogue with its source, from appropriation, a “more decisive journey away from the informing source into a wholly new cultural product and domain” (Sanders, 26). She also notes that “the most creative acts of adaptation and appropriation” take place “at the very point of infidelity” (Sanders, 20). Wong’s 夢中人 is appropriation, Irish Women in Harmony is adaptation, and Mitsushima is appropriation of an appropriation.",
  },
  {
    concept: "Translator as author",
    source: "Venuti, The Translator’s Invisibility",
    body: "Venuti argues that translators are not transparent conduits but authors in their own right (Venuti, 1). The Dreams chain bears this out three different ways. Mitsushima’s phonetic Cantonese makes that labor audible. Chow Lai Mou’s rewrite for Wong is closer to plain authorship, since the Cantonese lyric is genuinely new writing. The Irish round turns translation into collective ethical work. None of these covers is a transparent medium.",
  },
  {
    concept: "Distributed authorship",
    source: "Garber, “Some of These Days”",
    body: "Garber argues that popular-song scholarship needs to ‘complicate “great man” versions of history’ (Garber, 177). Songs, he writes, are ‘works-in-process… open and fluid’ (Garber, 177), revised by performers who act as cocreators. Creative work, in his account, runs through ‘a confluence of multiple, often untraceable influences’ (Garber, 185). The Dreams chain shows that confluence in two different forms. Mitsushima sources Wong, not Cranberries, and the Irish round puts thirty-nine cocreators on a single track.",
  },
];

export const CONCLUSION: EssayParagraph[] = [
  {
    text: "Each cover in the Dreams chain added something the others did not, and the parallel player makes those differences specific. The Cranberries supplied the baseline. Wong opened the song to a new language and a new city at a specific historical moment. Irish Women in Harmony converted it into social value during lockdown. Mitsushima added a phonetic, transnational layer. Foundational sonic reference, linguistic cultural translation, social mobilization, and phonetic transnational circulation do not compete because they do not overlap, which is why the chain accumulates value rather than redistributing it. One case study cannot prove the pattern, but the parallel player suggests a hypothesis worth scaling. Covers are not derivative copies racing for an original’s audience. They are distributed authors building cumulative value across partially independent registers. The lyric “Never quite as it seems”, sung in 1992 as a private revelation, turns out to have been a description of how a song’s value transcends both time and culture.",
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
