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
    recitation: { src: '/audio/ddv-1-recitation.mp3', videoId: 'jx7O2zDqi6I', start: 757, end: 789 },
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
    recitation: { src: '/audio/ddv-2-recitation.mp3', videoId: 'm6kALQlK6-Q', start: 564, end: 597 },
    commentary: { src: '/audio/ddv-2-commentary.mp3', videoId: 'm6kALQlK6-Q', start: 598, end: 741 },
  },
  {
    number: 3,
    lines: [
      [
        { t: 'आन्ध्यमान्द्यपटुत्वेषु', m: 'blindness, dullness and sharpness' },
        { t: 'नेत्रधर्मेषु', m: 'characteristics of the eye' },
        { t: 'चैकधा', m: 'also, as a unity' },
        { t: '।' },
      ],
      [
        { t: 'संकल्पयेन्मनः', m: 'the mind cognizes' },
        { t: 'श्रोत्रत्वगादौ', m: 'to ears, skin, etc.' },
        { t: 'योज्यतामिदम्', m: 'this applies' },
        { t: '॥ ३ ॥' },
      ],
    ],
    transliteration:
      'āndhya-māndya-paṭutveṣu netra-dharmeṣu caikadhā |\nsaṃkalpayen manaḥ śrotra-tvag-ādau yojyatām idam || 3 ||',
    translation:
      'Such characteristics of the eye as blindness, sharpness or dullness, the mind is able to cognize because it is a unity. This also applies to (whatever is perceived through) the ear, skin etc.',
    recitation: { src: '/audio/ddv-3-recitation.mp3', videoId: 'm6kALQlK6-Q', start: 759, end: 792 },
    commentary: { src: '/audio/ddv-3-commentary.mp3', videoId: 'm6kALQlK6-Q', start: 793, end: 1033 },
  },
  {
    number: 4,
    lines: [
      [
        { t: 'कामः', m: 'desire' },
        { t: 'संकल्पसंदेहौ', m: 'determination and doubt' },
        { t: 'श्रद्धाश्रद्धे', m: 'faith and want of faith' },
        { t: 'धृतीतरे', m: 'steadiness and its opposite' },
        { t: '।' },
      ],
      [
        { t: 'ह्रीर्धीर्भीरित्येवमादीन्', m: 'modesty, understanding, fear and such others' },
        { t: 'भासयेत्येकधा', m: 'illumines, unified' },
        { t: 'चितिः', m: 'Consciousness' },
        { t: '॥ ४ ॥' },
      ],
    ],
    transliteration:
      'kāmaḥ saṃkalpa-saṃdehau śraddhā-aśraddhe dhṛti-itare |\nhrīr dhīr bhīr ity evamādīn bhāsayety ekadhā citiḥ || 4 ||',
    translation:
      'Consciousness illumines (such other mental states as) desire, determination and doubt, belief and non-belief, constancy and its opposite, modesty, understanding, fear and others, because it (Consciousness) is a unity.',
    recitation: { src: '/audio/ddv-4-recitation.mp3', videoId: 'm6kALQlK6-Q', start: 1060, end: 1093 },
    commentary: { src: '/audio/ddv-4-commentary.mp3', videoId: 'm6kALQlK6-Q', start: 1094, end: 1406 },
  },
  {
    number: 5,
    lines: [
      [
        { t: 'नोदेति', m: 'does not rise' },
        { t: 'नास्तमेत्येषा', m: 'this (Consciousness) does not set' },
        { t: 'न', m: 'not' },
        { t: 'वृद्धिं', m: 'increase' },
        { t: 'याति', m: 'undergoes' },
        { t: 'न', m: 'not' },
        { t: 'क्षयम्', m: 'decay' },
        { t: '।' },
      ],
      [
        { t: 'स्वयं', m: 'of itself' },
        { t: 'विभात्यथान्यानि', m: 'shines; on the other hand, other objects' },
        { t: 'भासयेत्साधनं', m: 'illumines, aid (of other means)' },
        { t: 'विना', m: 'without' },
        { t: '॥ ५ ॥' },
      ],
    ],
    transliteration:
      'nodeti nāstam etyeṣā na vṛddhiṃ yāti na kṣayam |\nsvayaṃ vibhāty athānyāni bhāsayet sādhanaṃ vinā || 5 ||',
    translation:
      'This Consciousness does neither rise nor set. It does not increase; nor does it suffer decay. Being self-luminous, it illumines everything else without any other aid.',
  },
  {
    number: 6,
    lines: [
      [
        { t: 'चिच्छायावेशतो', m: 'on account of the entering of the reflection of Consciousness' },
        { t: 'बुद्धौ', m: 'in the Buddhi (intelligence)' },
        { t: 'भानं', m: 'appearance (of specific knowledge)' },
        { t: 'धीस्तु', m: 'intelligence, indeed' },
        { t: 'द्विधा', m: 'of two kinds' },
        { t: 'स्थिता', m: 'is' },
        { t: '।' },
      ],
      [
        { t: 'एकाहंकृतिरन्या', m: 'one is egoity, the other' },
        { t: 'स्यादंतःकरणरूपिणी', m: 'is of the nature of mind (mental faculties)' },
        { t: '॥ ६ ॥' },
      ],
    ],
    transliteration:
      'cic-chāyāveśato buddhau bhānaṃ dhīs tu dvidhā sthitā |\nekāhaṃkṛtir anyā syād antaḥkaraṇa-rūpiṇī || 6 ||',
    translation:
      'Buddhi appears to possess luminosity on account of the reflection of Consciousness in it. Intelligence (Buddhi) is of two kinds. One is designated egoity, the other as mind (antahkarana).',
  },
  {
    number: 7,
    lines: [
      [
        { t: 'छायाहंकारयोरैक्यं', m: 'identity of the reflection and egoism' },
        { t: 'तप्तायःपिंडवन्मतं', m: 'is, in the opinion of the wise, like that of fire and the heated iron ball' },
        { t: '।' },
      ],
      [
        { t: 'तदहंकारतादात्म्याद्', m: 'owing to identification with that egoism' },
        { t: 'देहश्चेतनतामगात्', m: 'the body has attained consciousness' },
        { t: '॥ ७ ॥' },
      ],
    ],
    transliteration:
      'chāyāhaṃkārayor aikyaṃ taptāyaḥ-piṇḍavan mataṃ |\ntad-ahaṃkāra-tādātmyād dehaś cetanatām agāt || 7 ||',
    translation:
      'In the opinion of the wise, the identity of the reflection (of Consciousness) and of ego is like the identity of the fire and the (heated) iron ball. The body having been identified with the ego (which has already identified itself with the reflection of Consciousness) passes for a conscious entity.',
  },
  {
    number: 8,
    lines: [
      [
        { t: 'अहंकारस्य', m: 'of the ego' },
        { t: 'तादात्म्यं', m: 'identification' },
        { t: 'चिच्छायादेहसाक्षिभिः', m: 'with the reflection of Consciousness, body and Witness, respectively' },
        { t: '।' },
      ],
      [
        { t: 'सहजं', m: 'natural' },
        { t: 'कर्मजं', m: 'due to past Karma' },
        { t: 'भ्रान्तिजन्यं', m: 'due to ignorance' },
        { t: 'च', m: 'and' },
        { t: 'त्रिविधं', m: 'of three kinds' },
        { t: 'क्रमात्', m: 'respectively' },
        { t: '॥ ८ ॥' },
      ],
    ],
    transliteration:
      'ahaṃkārasya tādātmyaṃ cic-chāyā-deha-sākṣibhiḥ |\nsahajaṃ karmajaṃ bhrāntijanyaṃ ca trividhaṃ kramāt || 8 ||',
    translation:
      'The identification of the ego with the reflection of Consciousness, the body and the Witness are of three kinds, namely, natural, due to (past) Karma, and due to ignorance, respectively.',
  },
  {
    number: 9,
    lines: [
      [
        { t: 'संबंधिनोस्सतोर्नास्ति', m: 'of the mutually related (ego and reflection), so long as they are taken to be real, there is no' },
        { t: 'निवृत्तिस्सहजस्य', m: 'annihilation of the natural (identification)' },
        { t: 'तु', m: 'certainly' },
        { t: '।' },
      ],
      [
        { t: 'कर्मक्षयात्', m: 'with the wearing away of (the result of) Karma' },
        { t: 'प्रबोधाच्च', m: 'and enlightenment' },
        { t: 'निवर्तेते', m: 'disappear' },
        { t: 'क्रमादुभे', m: 'the other two, respectively' },
        { t: '॥ ९ ॥' },
      ],
    ],
    transliteration:
      'saṃbandhinos sator nāsti nivṛttis sahajasya tu |\nkarma-kṣayāt prabodhāc ca nivartete kramād ubhe || 9 ||',
    translation:
      'The mutual identification of the ego and the reflection of Consciousness, which is natural, does not cease so long as they are taken to be real. The other two identifications disappear after the wearing out of the result of Karma and the attainment of the knowledge of the highest Reality respectively.',
  },
  {
    number: 10,
    lines: [
      [
        { t: 'अहंकारलये', m: 'when (the thought of) ego disappears' },
        { t: 'सुप्तौ', m: 'in deep sleep' },
        { t: 'भवेद्देहोऽप्यचेतनः', m: 'the body also becomes unconscious' },
        { t: '।' },
      ],
      [
        { t: 'अहंकारविकासार्धस्वप्नस्', m: 'the half manifestation of the ego is the dream state' },
        { t: 'सर्वस्तु', m: 'but the full (manifestation)' },
        { t: 'जागरः', m: 'is the waking state' },
        { t: '॥ १० ॥' },
      ],
    ],
    transliteration:
      'ahaṃkāra-laye suptau bhaved deho ’py acetanaḥ |\nahaṃkāra-vikāsārdha-svapnas sarvas tu jāgaraḥ || 10 ||',
    translation:
      'In the state of deep sleep, when (the thought of) ego disappears, the body also becomes unconscious. The state in which there is the half manifestation of the ego is called the dream state and the full manifestation of the ego is the state of waking.',
  },
]
