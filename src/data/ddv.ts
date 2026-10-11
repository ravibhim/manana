// Sample content for screen design only. Source: "Drg-Drsya Viveka", Swami Nikhilananda
// (Sri Ramakrishna Asrama, Mysore, 1931), DDV.pdf. Transliteration is ours, not from the PDF.
// Audio clips live in public/audio and deploy with the app; verses without clips show no player.

export interface Token {
  /** The word as it appears in the verse (may be a joined compound). */
  t: string
  /** Meaning shown when the word is tapped. Omitted for punctuation. */
  m?: string
}

/** An audio clip cut from a YouTube lecture. The source is kept so the clip can be re-cut. */
export interface Clip {
  src: string          // path under public/, e.g. /audio/ddv-1-recitation.mp3
  videoId: string      // YouTube video the clip was cut from
  start: number        // seconds into that video
  end: number
}

export interface Verse {
  number: number
  /** Each inner array is one line of the verse. */
  lines: Token[][]
  transliteration: string
  translation: string
  recitation?: Clip
  commentary?: Clip
}

export const BOOK = {
  title: 'Drg-Drsya Viveka',
  devanagari: 'दृग्दृश्य विवेकः',
  subtitle: 'An inquiry into the nature of the Seer and the Seen',
  author: 'Swami Nikhilananda',
  totalVerses: 46,
}

export const VERSES: Verse[] = [
  {
    number: 1,
    lines: [
      [
        { t: 'रूपं', m: 'form' },
        { t: 'दृश्यं', m: 'is perceived' },
        { t: 'लोचनं', m: 'eye' },
        { t: 'दृक्', m: 'is the perceiver' },
        { t: 'तद्दृश्यं', m: 'that (the eye) is perceived' },
        { t: 'दृक्तु', m: 'but the perceiver is' },
        { t: 'मानसं', m: 'the mind' },
        { t: '।' },
      ],
      [
        { t: 'दृश्याधीवृत्तयस्साक्षी', m: 'the mind’s modifications are perceived; the Witness' },
        { t: 'दृगेव', m: 'verily the perceiver' },
        { t: 'न', m: 'is not' },
        { t: 'तु', m: 'but' },
        { t: 'दृश्यते', m: 'perceived' },
        { t: '॥ १ ॥' },
      ],
    ],
    transliteration:
      'rūpaṃ dṛśyaṃ locanaṃ dṛk tad dṛśyaṃ dṛk tu mānasaṃ |\ndṛśyā dhī-vṛttayaḥ sākṣī dṛg eva na tu dṛśyate || 1 ||',
    translation:
      'The form is perceived and the eye is its perceiver. It (the eye) is perceived and the mind is its perceiver. The mind with its modifications is perceived and the Witness (the Self) is verily the perceiver. But It (the Witness) is not perceived (by any other).',
    recitation: { src: '/audio/ddv-1-recitation.mp3', videoId: 'jx7O2zDqi6I', start: 757, end: 790 },
    commentary: { src: '/audio/ddv-1-commentary.mp3', videoId: 'jx7O2zDqi6I', start: 806, end: 2792 },
  },
  {
    number: 2,
    lines: [
      [
        { t: 'नीलपीतस्थूलसूक्ष्मह्रस्वदीर्घादि', m: 'blue, yellow, gross, subtle, short, long, etc.' },
        { t: 'भेदतः', m: 'on account of such distinctions' },
        { t: '।' },
      ],
      [
        { t: 'नानाविधानि', m: 'various' },
        { t: 'रूपाणि', m: 'forms' },
        { t: 'पश्येल्लोचनमेकधा', m: 'the eye perceives as one' },
        { t: '॥ २ ॥' },
      ],
    ],
    transliteration:
      'nīla-pīta-sthūla-sūkṣma-hrasva-dīrghādi bhedataḥ |\nnānā-vidhāni rūpāṇi paśyel locanam ekadhā || 2 ||',
    translation:
      'The forms (objects of perception) appear as various on account of such distinctions as blue, yellow, gross, subtle, short, long etc. The eye, on the other hand, sees them, itself remaining one and the same.',
  },
]
