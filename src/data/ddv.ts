// Sample content for screen design only. Source: "Drg-Drsya Viveka", Swami Nikhilananda
// (Sri Ramakrishna Asrama, Mysore, 1931), DDV.pdf. Transliteration is ours, not from the PDF.
// Audio clips live in public/audio; verses without clips simply show no player.

export interface Token {
  /** The word as it appears in the verse (may be a joined compound). */
  t: string
  /** Meaning shown when the word is tapped. Omitted for punctuation. */
  m?: string
}

export interface Verse {
  number: number
  /** Each inner array is one line of the verse. */
  lines: Token[][]
  transliteration: string
  translation: string
  /** Explanatory notes from the book. */
  notes: string[]
  recitationSrc?: string
  commentarySrc?: string
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
    notes: [
      'Form: the word implies all objects of sense perception.',
      'Eye: it stands for all the organs of perception such as nose, ears etc.',
      'Perceiver: the eye is perceiver only in a relative sense because it is itself perceived by the mind.',
      'It: the Atman or the innermost Self is the ultimate perceiver. If a perceiver of the Atman is sought, the enquiry will end in what is known as a regressus ad infinitum. Hence the Self is the ultimate Seer because no other seer is known to exist. The knowledge of the Knower is never absent.',
    ],
    recitationSrc: '/audio/ddv-1-recitation.mp3',
    commentarySrc: '/audio/ddv-1-commentary.mp3',
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
    notes: [
      'The forms etc. are objects which are varying. That which is constant and changeless is the perceiver. The different objects appear, no doubt, as distinct from one another. But they are perceived with their changes, because the eye, as perceiver, is a unity.',
      'The one characteristic of the objects is their changeability. The characteristic of the Seer is unchangeability. The objects change but their perceiver is constant.',
    ],
  },
]
