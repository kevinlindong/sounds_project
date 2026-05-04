/**
 * The essay prose, organised by section. Each export is an array of
 * paragraphs (or paragraph objects with optional headings/footnotes) so
 * the section components can lay them out without touching the writing.
 *
 * Total target: ~2200 words across the site.
 */

export interface EssayParagraph {
  text: string;
  pull?: string; // optional pull quote shown alongside
}

export const RESEARCH_QUESTION =
  "How does linguistic translation function as cultural recontextualization across the cover chain of The Cranberries' \u201cDreams\u201d (1992)?";

export const TITLE = "Dreams in Translation";

export const SUBTITLE =
  "A cover chain in four languages, three decades, and at least three cultures.";

export const INTRO: EssayParagraph[] = [
  {
    text: "In 1992 a young Limerick band recorded a song about not being able to read the future. Three decades later that song has been rewritten in Cantonese and starred in a Hong Kong film, returned to English as a 39-voice charity round during a global pandemic, and been re-performed in Cantonese by a Japanese actress who almost certainly does not speak it. The Cranberries' \u201cDreams\u201d became one of the most internationally promiscuous pop songs of its generation \u2014 not by virtue of any single hit cover but by accreting a cover chain whose translations are each different in kind.",
  },
  {
    text: "This project asks a single question across that chain: how does linguistic translation function as cultural recontextualization? Translation here is not just lyric-to-lyric transposition. It is also the swap of an alt-rock arrangement for a Cantopop one, the substitution of a soloist for a collective, the borrowing of one performer's phonetic mouth-shape by another. Across the four versions \u2014 The Cranberries (1992), Faye Wong\u2019s \u5922\u4e2d\u4eba (1994), Irish Women in Harmony (2020), and Hikari Mitsushima\u2019s 2024 reading of Wong\u2019s version \u2014 every crossing is a different translation event. Read together they ask whether a song\u2019s meaning lives in its lyrics, its melody, or in the cultural context where it is heard.",
  },
];

export const CRANBERRIES_ANALYSIS: EssayParagraph[] = [
  {
    text: "\u201cDreams\u201d opens The Cranberries\u2019 1993 debut Everybody Else Is Doing It, So Why Can\u2019t We? Sonically the track is a chime: Noel Hogan\u2019s ringing arpeggios, Mike Hogan\u2019s wandering bassline, and Fergal Lawler\u2019s loose backbeat hold up a vocal that does most of the song\u2019s emotional work. Dolores O\u2019Riordan switches between modal chest voice and the keening yodel-yelp she would make her trademark, and the song\u2019s climax is wordless \u2014 just her voice cresting into syllables that aren\u2019t any language at all. The lyric, when it does land, is about not being able to read what is happening: \u201cnever quite as it seems.\u201d",
  },
  {
    text: "Here, before any cover, a song\u2019s identity is already plural. Andrew Kania and P. D. Magnus, in different registers, both observe that what we call \u201ca song\u201d is rarely fixed at the moment of writing; it is a Wittgensteinian family of features whose centre of gravity shifts as later performers select among them. The wordless climax is a feature in this sense \u2014 something a cover could keep, drop, or invert. So is O\u2019Riordan\u2019s vocal accent, drawn loosely from Irish keening traditions and Sinead O\u2019Connor\u2019s phrasing. So is the song\u2019s \u201cnever quite as it seems\u201d structure: a melody that gestures at resolution without arriving. Each translator who comes next will choose which of these features to preserve and which to rebuild.",
  },
];

export const FAYEWONG_ANALYSIS: EssayParagraph[] = [
  {
    text: "Faye Wong\u2019s \u5922\u4e2d\u4eba (\u201cDream Lover\u201d) appeared on her 1994 album \u80e1\u601d\u4e82\u60f3 (Random Thoughts) and immediately migrated into Wong Kar-wai\u2019s film Chungking Express, where it plays in the foreground of a now-canonical sequence. The melody is Cranberries\u2019 \u2014 chord progression, contour, and that wordless climax intact. The Cantonese lyric, written by Albert Leung (\u6797\u5915), keeps almost nothing of the English. \u201cOh my life is changing every day\u201d becomes \u5922\u4e2d\u4eba\uff0c\u4e00\u5206\u9418\u62b1\u7dca \u2014 \u201cdream lover, hold me close for one minute.\u201d The Cranberries song was about uncertainty in the face of new feeling; Wong\u2019s is about the precise temporal greed of romantic fantasy: one minute, ten minutes, a handful of measured intervals. The \u201cdream\u201d in the title shifts from English psychology to Chinese poetic image \u2014 \u5922\u4e2d\u4eba is a phrase as old as classical Chinese love poetry.",
    pull: "The melody is Cranberries\u2019. The Cantonese lyric keeps almost nothing of the English.",
  },
  {
    text: "Read through Pak\u2019s account of mimesis in The Ppongtchak Debate, this kind of replacement is not imitation but \u201csecond nature.\u201d Pak argues that the Korean genre ppongtchak was condemned for absorbing Japanese enka elements only because critics mistook mimesis for inferiority. Drawing on Taussig, she insists that the mimetic faculty allows a culture to reconstruct identity through creative replication rather than degrade it. Wong\u2019s \u5922\u4e2d\u4eba does this work for 1990s Cantopop: it adopts Western rock\u2019s structural skeleton and rebuilds, in Cantonese, an emotional vocabulary that belongs to Hong Kong on the eve of the 1997 handover. The song\u2019s anxiety \u2014 about not having enough time \u2014 is one a Hong Kong audience read with their own ears.",
  },
  {
    text: "The version is also inseparable from its film. Walter Benjamin\u2019s claim that mechanical reproduction strips the artwork of aura while creating new forms of historical testimony is hard to apply naively to a recording, which has no original aura to lose. But Chungking Express does something stranger: it laminates the song to a specific image. When you hear Wong\u2019s vocal you almost cannot help seeing Faye \u2014 the Hong Kong snack-bar worker she plays \u2014 dancing alone behind the counter in a yellow t-shirt. After 1994 there is no Wong-version of this song that is independent of the film. Charles Mosser would call this a \u201cmajor interpretation\u201d in his cover spectrum: an interpretation transformative enough to reset what the song means. But Mosser\u2019s framework is just a name for the more interesting fact, which is that the chain has now bifurcated. From here, future covers can choose Cranberries as their source or they can choose Wong; the two are no longer the same option.",
  },
];

export const IRISHWOMEN_ANALYSIS: EssayParagraph[] = [
  {
    text: "In May 2020, two months into Ireland\u2019s first COVID lockdown, RuthAnne Cunningham assembled thirty-nine Irish women vocalists to record \u201cDreams\u201d as a charity single for SafeIreland, the country\u2019s national network of domestic-violence services. Two things make this version a specific kind of translation event. The first is linguistic: the English lyric returns home, twenty-six years after Wong rewrote it. The second is that Dolores O\u2019Riordan, who died in 2018, is no longer there to sing it; the song is rebuilt by a collective, in round form, with no single voice carrying the line.",
  },
  {
    text: "Mary Hall\u2019s work on covers of \u201cBlack Coffee\u201d argues that cover versions can carry \u201cechoes of previous musicians\u201d \u2014 that to hear a later performer is also to hear who came before. The Irish Women in Harmony recording is unusually direct about this. Each soloist takes a phrase or two before passing it on; the round structure makes audible the absence of any single Dolores. The song has not changed language, but it has changed grammar of attribution: from one woman to many, from individual yearning to collective care, from a 1992 alt-rock single to a 2020 pandemic-era charity object. The \u201cnever quite as it seems\u201d that O\u2019Riordan sang as private revelation now reads as collective acknowledgement that life under lockdown is unreadable. The English is the same English; the listening is not.",
  },
];

export const MITSUSHIMA_ANALYSIS: EssayParagraph[] = [
  {
    text: "In 2024, the Japanese actress and singer Hikari Mitsushima released a performance of \u5922\u4e2d\u4eba \u2014 not Cranberries\u2019 \u201cDreams\u201d but Faye Wong\u2019s Cantonese version. To my ear (and I would want to confirm this with a Cantonese-speaking listener) Mitsushima\u2019s vowels are learned phonetically rather than spoken; they have the careful precision of someone who has practiced the song word by word from a recording. This is itself a translation: a phonetic mimicry of Wong\u2019s mouth, by a performer who has chosen to inhabit Wong\u2019s 1994 version rather than Cranberries\u2019 1992 one.",
  },
  {
    text: "Julie Sanders distinguishes adaptation \u2014 a dialogic engagement with a source \u2014 from appropriation, which makes a more sustained claim on embedded source material. Mitsushima\u2019s recording is appropriation in this richer sense: she does not adapt Cranberries via Wong; she chooses Wong\u2019s recording as her source and treats Cranberries\u2019 song as a more distant ancestor. Marjorie Garber\u2019s analysis of \u201cSome of These Days\u201d through its many performers argues that authorship in popular song is distributed across versions; we hear a song through everybody who has sung it. By 2024, when Mitsushima sings \u5922\u4e2d\u4eba, the song\u2019s authorship has been distributed forward as well as backward. Her source is not the original \u2014 it is the chain itself, with Wong as its centre of gravity.",
  },
];

export const SYNTHESIS_INTRO: EssayParagraph[] = [
  {
    text: "Stacked together, the four versions describe a cover chain whose translations are each operationally different. The English-to-Cantonese move is wholesale lyric replacement plus genre transformation; the Cantonese-to-English move is a return that is not a return, because what comes back is a collective and a charity context; the Cantonese-to-Cantonese move is phonetic mimicry across Asia and a rerouting of source. The chain does not loop. It spirals.",
  },
  {
    text: "Linguistic translation does not, in any of these crossings, just \u201ckeep\u201d or \u201close\u201d the original meaning \u2014 the Cranberries\u2019 \u201cnever quite as it seems\u201d, Wong\u2019s \u201cone-minute embrace and ten-minute kiss\u201d, the Irish women\u2019s communal round, Mitsushima\u2019s phonetic homage are all different objects. Each crossing produces a culturally specific text whose relation to the previous one is more like translation in literary studies than translation in software: less mapping, more authoring. The lesson is that the question \u201cwhere does the song\u2019s meaning live?\u201d is the wrong question to ask of a chain like this. Meaning here is not located in lyrics, melody, or context as separable items \u2014 it lives in the friction between them as the song moves.",
  },
];

/** Cards used in the synthesis grid: each maps a class concept to its work in the chain. */
export const SYNTHESIS_CARDS: Array<{ concept: string; source: string; body: string }> = [
  {
    concept: "Family resemblance",
    source: "Magnus, A Philosophy of Cover Songs",
    body: "What holds the four versions together is not an essence but a cluster of features \u2014 melody, contour, the wordless climax \u2014 any of which a translator may keep or drop. Wong drops the lyric; the Irish round drops the soloist; Mitsushima drops the language she normally sings in. The cluster survives.",
  },
  {
    concept: "Polysemy / cover spectrum",
    source: "Mosser, Cover Songs: Ambiguity, Multivalence, Polysemy",
    body: "Mosser\u2019s typology lets us name what each cover is doing. Wong\u2019s \u5922\u4e2d\u4eba is a \u201cmajor interpretation\u201d \u2014 transformative enough to fork the chain. Irish Women in Harmony is a \u201cminor interpretation\u201d \u2014 fidelity to the lyric, transformation of the social act of singing. Mitsushima is harder to type because she covers a cover.",
  },
  {
    concept: "Mimetic faculty / second nature",
    source: "Pak, The Ppongtchak Debate",
    body: "Pak\u2019s argument that mimesis can produce \u201csecond nature\u201d rather than degrade an original is what makes Wong\u2019s rewrite legible as cultural authorship. Cantopop in 1994 is not failing to be alt-rock; it is rebuilding a structure of feeling for Hong Kong audiences out of imported musical material.",
  },
  {
    concept: "Recording consciousness",
    source: "Zak, Covers, Copies, Recording Consciousness",
    body: "For Zak the cover\u2019s identity lives partly in production choices, not just composition. The four versions sound radically different at the level of room, mic, and arrangement \u2014 alt-rock studio, Cantopop polish, lockdown home-vocal layering, contemporary minimalist. Each \u201csounds like\u201d its moment in a way no notation captures.",
  },
  {
    concept: "Distributed authorship",
    source: "Garber, Some of These Days",
    body: "Garber argues popular-song authorship is distributed across performers. Mitsushima\u2019s 2024 \u5922\u4e2d\u4eba demonstrates the principle live: her source is Wong, not Cranberries. By the fourth link in the chain, the question \u201cwhose song is this?\u201d has more than one defensible answer.",
  },
  {
    concept: "Schizophonic mimesis",
    source: "Feld, Pygmy Pop",
    body: "Feld\u2019s term names what happens when a sound circulates separated from its origin and attribution. Each cover here travels with credit to The Cranberries; even so, by 2024 the Cranberries\u2019 song reaches Mitsushima only via Wong. \u201cFidelity\u201d to the source is a different operation in each crossing, and not always to the same source.",
  },
];

export const CONCLUSION: EssayParagraph[] = [
  {
    text: "The Cranberries\u2019 \u201cDreams\u201d makes an unusual case for what cover songs do because the chain refuses to consolidate. Wong does not displace Cranberries; the Irish women do not return to a 1992 ground; Mitsushima does not loop back to English. The song\u2019s afterlife is a series of culturally specific reauthorings whose linguistic moves \u2014 English to Cantonese, Cantonese to English, Cantonese to Cantonese-by-a-non-speaker \u2014 are each doing a different kind of work. Cusic\u2019s defence of cover songs claims that covers are how music sustains meaning across generations and cultures. The Dreams chain takes the claim further: the cover chain is not a sustaining of one meaning but a generation of new ones, each indexed to the language and listening community that received it. \u201cNever quite as it seems\u201d turns out, in retrospect, to have been a description of how the song would travel.",
  },
  {
    text: "What I am confident about: the four versions exist; the linguistic moves are real; the framing of each one through Magnus, Pak, Hall, Garber, and Feld is defensible from the texts. What I would like to learn more about: the precise circumstances of Mitsushima\u2019s recording (live vs. studio, intended audience), the depth of Wong\u2019s collaboration with Albert Leung on the 1994 lyric, and whether subsequent covers \u2014 in Mandarin, Tagalog, Vietnamese \u2014 already exist in the chain that I have missed.",
  },
];

export const BIBLIOGRAPHY: Array<{
  cite: string;
  note?: string;
}> = [
  {
    cite: "Benjamin, Walter. \u201cThe Work of Art in the Age of Mechanical Reproduction.\u201d 1936.",
    note: "Used to think about Chungking Express as a co-text that fixes Wong\u2019s vocal to an image.",
  },
  {
    cite: "Chu, Yiu-Wai, and Eve Leung. \u201cRemapping Hong Kong Popular Music: Covers, Localisation and the Waning Hybridity of Cantopop.\u201d Popular Music, vol. 32, no. 1, 2013, pp. 65\u201378.",
    note: "Background on Cantopop\u2019s relationship to imported source material in the 1990s.",
  },
  {
    cite: "Cusic, Don. \u201cIn Defense of Cover Songs.\u201d Popular Music and Society, 2005.",
  },
  {
    cite: "Feld, Steven. \u201cA Sweet Lullaby for World Music.\u201d Public Culture, 2000. (Cited in class as \u201cPygmy Pop.\u201d)",
    note: "Used for schizophonic mimesis \u2014 the gap between a sound and its travel.",
  },
  {
    cite: "Garber, Marjorie. \u201cSome of These Days.\u201d Modern Language Quarterly, 2010.",
  },
  {
    cite: "Hall, Mary. \u201cCovers of \u2018Black Coffee.\u2019\u201d 2018.",
  },
  {
    cite: "Magnus, P. D. A Philosophy of Cover Songs. Open Book Publishers, 2022.",
  },
  {
    cite: "Mosser, Charles. \u201cCover Songs: Ambiguity, Multivalence, Polysemy.\u201d Popular Musicology Online, 2008.",
  },
  {
    cite: "Pak, Roald Maliangkay. \u201cThe Ppongtchak Debate.\u201d In Korean Pop Music: Riding the Wave, 2006.",
    note: "Used to defend Wong\u2019s replacement-lyric as cultural authorship rather than imitation.",
  },
  {
    cite: "Sanders, Julie. Adaptation and Appropriation. Routledge, 2006. (Chapters 1\u20132.)",
  },
  {
    cite: "Wang, Oliver. \u201cA Cantopop Dream Girl\u2019s First Film Reverie.\u201d The Criterion Collection: Current, 2019.",
  },
  {
    cite: "Zak, Albin J. \u201cCovers, Copies, and Recording Consciousness.\u201d 2021.",
  },
];
