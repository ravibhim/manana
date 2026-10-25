// Verse text, word meanings and translations: "Drg-Drsya Viveka", Swami Nikhilananda
// (Sri Ramakrishna Asrama, Mysore, 1931), DDV.pdf.
// Ours, not from the PDF: the transliteration and the compound breakdowns (`parts`). Both are our own
// analysis and still need a Sanskrit reader's review.
// Audio clips are cut from lecture recordings (see SOURCES.md). They live in public/audio and deploy
// with the app; verses without clips show no player.

export interface Token {
  /** The word as it appears in the verse (may be a joined compound). */
  t: string
  /** Meaning shown when the word is tapped. Omitted for punctuation. */
  m?: string
  /** Optional breakdown of a compound into its component words (split forms, so they may differ from the joined text). */
  parts?: { t: string; m: string }[]
}

/** An audio clip cut from a YouTube lecture. The source is kept so the clip can be re-cut. */
export interface Clip {
  src: string          // path under public/, e.g. /audio/ddv-1-recitation.mp3
  videoId: string      // YouTube video the clip was cut from
  start: number        // seconds into that video
  end: number
}

/** The two kinds of audio a verse can have. */
export type ClipKind = 'recitation' | 'commentary'

/** A line of the verse as plain text: its words and the danda, without the closing verse-number marker. */
export const lineText = (line: Token[]) => line.filter(t => t.m || t.t === '।').map(t => t.t).join(' ')

export const clipLength = (clip: Clip) => clip.end - clip.start

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
  /** Recites and explains the verses in the audio clips. */
  lecturer: 'Swami Sarvapriyananda',
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
        {
          t: 'दृश्याधीवृत्तयस्साक्षी',
          m: 'the mind’s modifications are perceived; the Witness',
          parts: [
            { t: 'दृश्याः', m: 'are perceived' },
            { t: 'धी', m: 'of the mind' },
            { t: 'वृत्तयः', m: 'modifications' },
            { t: 'साक्षी', m: 'the Witness' },
          ],
        },
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
        {
          t: 'नीलपीतस्थूलसूक्ष्मह्रस्वदीर्घादि',
          m: 'blue, yellow, gross, subtle, short, long, etc.',
          parts: [
            { t: 'नील', m: 'blue' },
            { t: 'पीत', m: 'yellow' },
            { t: 'स्थूल', m: 'gross' },
            { t: 'सूक्ष्म', m: 'subtle' },
            { t: 'ह्रस्व', m: 'short' },
            { t: 'दीर्घ', m: 'long' },
            { t: 'आदि', m: 'etc.' },
          ],
        },
        { t: 'भेदतः', m: 'on account of such distinctions' },
        { t: '।' },
      ],
      [
        {
          t: 'नानाविधानि',
          m: 'various',
          parts: [
            { t: 'नाना', m: 'various' },
            { t: 'विधानि', m: 'kinds' },
          ],
        },
        { t: 'रूपाणि', m: 'forms' },
        {
          t: 'पश्येल्लोचनमेकधा',
          m: 'the eye perceives as one',
          parts: [
            { t: 'पश्येत्', m: 'perceives' },
            { t: 'लोचनम्', m: 'the eye' },
            { t: 'एकधा', m: 'as one' },
          ],
        },
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
        {
          t: 'आन्ध्यमान्द्यपटुत्वेषु',
          m: 'blindness, dullness and sharpness',
          parts: [
            { t: 'आन्ध्य', m: 'blindness' },
            { t: 'मान्द्य', m: 'dullness' },
            { t: 'पटुत्वेषु', m: 'in sharpness' },
          ],
        },
        {
          t: 'नेत्रधर्मेषु',
          m: 'characteristics of the eye',
          parts: [
            { t: 'नेत्र', m: 'of the eye' },
            { t: 'धर्मेषु', m: 'characteristics' },
          ],
        },
        {
          t: 'चैकधा',
          m: 'also, as a unity',
          parts: [
            { t: 'च', m: 'also' },
            { t: 'एकधा', m: 'as a unity' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'संकल्पयेन्मनः',
          m: 'the mind cognizes',
          parts: [
            { t: 'संकल्पयेत्', m: 'cognizes' },
            { t: 'मनः', m: 'the mind' },
          ],
        },
        {
          t: 'श्रोत्रत्वगादौ',
          m: 'to ears, skin, etc.',
          parts: [
            { t: 'श्रोत्र', m: 'ear' },
            { t: 'त्वक्', m: 'skin' },
            { t: 'आदौ', m: 'etc.' },
          ],
        },
        {
          t: 'योज्यतामिदम्',
          m: 'this applies',
          parts: [
            { t: 'योज्यताम्', m: 'let it be applied' },
            { t: 'इदम्', m: 'this' },
          ],
        },
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
        {
          t: 'संकल्पसंदेहौ',
          m: 'determination and doubt',
          parts: [
            { t: 'संकल्प', m: 'determination' },
            { t: 'संदेहौ', m: 'and doubt' },
          ],
        },
        {
          t: 'श्रद्धाश्रद्धे',
          m: 'faith and lack of faith',
          parts: [
            { t: 'श्रद्धा', m: 'faith' },
            { t: 'अश्रद्धे', m: 'and lack of faith' },
          ],
        },
        {
          t: 'धृतीतरे',
          m: 'steadiness and its opposite',
          parts: [
            { t: 'धृति', m: 'steadiness' },
            { t: 'इतरे', m: 'and its opposite' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'ह्रीर्धीर्भीरित्येवमादीन्',
          m: 'modesty, understanding, fear and such others',
          parts: [
            { t: 'ह्रीः', m: 'modesty' },
            { t: 'धीः', m: 'understanding' },
            { t: 'भीः', m: 'fear' },
            { t: 'इति', m: 'thus' },
            { t: 'एवमादीन्', m: 'and such others' },
          ],
        },
        {
          t: 'भासयत्येकधा',
          m: 'illumines, unified',
          parts: [
            { t: 'भासयति', m: 'illumines' },
            { t: 'एकधा', m: 'unified' },
          ],
        },
        { t: 'चितिः', m: 'Consciousness' },
        { t: '॥ ४ ॥' },
      ],
    ],
    transliteration:
      'kāmaḥ saṃkalpa-saṃdehau śraddhā-aśraddhe dhṛti-itare |\nhrīr dhīr bhīr ity evamādīn bhāsayaty ekadhā citiḥ || 4 ||',
    translation:
      'Consciousness illumines (such other mental states as) desire, determination and doubt, belief and non-belief, constancy and its opposite, modesty, understanding, fear and others, because it (Consciousness) is a unity.',
    recitation: { src: '/audio/ddv-4-recitation.mp3', videoId: 'm6kALQlK6-Q', start: 1060, end: 1093 },
    commentary: { src: '/audio/ddv-4-commentary.mp3', videoId: 'm6kALQlK6-Q', start: 1094, end: 1406 },
  },
  {
    number: 5,
    lines: [
      [
        {
          t: 'नोदेति',
          m: 'does not rise',
          parts: [
            { t: 'न', m: 'not' },
            { t: 'उदेति', m: 'rises' },
          ],
        },
        {
          t: 'नास्तमेत्येषा',
          m: 'this (Consciousness) does not set',
          parts: [
            { t: 'न', m: 'not' },
            { t: 'अस्तम्', m: 'setting' },
            { t: 'एति', m: 'goes to' },
            { t: 'एषा', m: 'this (Consciousness)' },
          ],
        },
        { t: 'न', m: 'not' },
        { t: 'वृद्धिं', m: 'increase' },
        { t: 'याति', m: 'undergoes' },
        { t: 'न', m: 'not' },
        { t: 'क्षयम्', m: 'decay' },
        { t: '।' },
      ],
      [
        { t: 'स्वयं', m: 'of itself' },
        {
          t: 'विभात्यथान्यानि',
          m: 'shines; on the other hand, other objects',
          parts: [
            { t: 'विभाति', m: 'shines' },
            { t: 'अथ', m: 'on the other hand' },
            { t: 'अन्यानि', m: 'other objects' },
          ],
        },
        {
          t: 'भासयेत्साधनं',
          m: 'illumines, aid (of other means)',
          parts: [
            { t: 'भासयेत्', m: 'illumines' },
            { t: 'साधनम्', m: 'aid (of other means)' },
          ],
        },
        { t: 'विना', m: 'without' },
        { t: '॥ ५ ॥' },
      ],
    ],
    transliteration:
      'nodeti nāstam etyeṣā na vṛddhiṃ yāti na kṣayam |\nsvayaṃ vibhāty athānyāni bhāsayet sādhanaṃ vinā || 5 ||',
    translation:
      'This Consciousness does neither rise nor set. It does not increase; nor does it suffer decay. Being self-luminous, it illumines everything else without any other aid.',
    recitation: { src: '/audio/ddv-5-recitation.mp3', videoId: 'm6kALQlK6-Q', start: 1425, end: 1456 },
    commentary: { src: '/audio/ddv-5-commentary.mp3', videoId: 'm6kALQlK6-Q', start: 1457, end: 1931 },
  },
  {
    number: 6,
    lines: [
      [
        {
          t: 'चिच्छायावेशतो',
          m: 'on account of the entering of the reflection of Consciousness',
          parts: [
            { t: 'चित्', m: 'Consciousness' },
            { t: 'छाया', m: 'reflection' },
            { t: 'आवेशतः', m: 'on account of entering' },
          ],
        },
        { t: 'बुद्धौ', m: 'in the Buddhi (intelligence)' },
        { t: 'भानं', m: 'appearance (of specific knowledge)' },
        { t: 'धीस्तु', m: 'intelligence, indeed' },
        { t: 'द्विधा', m: 'of two kinds' },
        { t: 'स्थिता', m: 'is' },
        { t: '।' },
      ],
      [
        {
          t: 'एकाहंकृतिरन्या',
          m: 'one is egoity, the other',
          parts: [
            { t: 'एका', m: 'one' },
            { t: 'अहंकृतिः', m: 'egoity' },
            { t: 'अन्या', m: 'the other' },
          ],
        },
        {
          t: 'स्यादंतःकरणरूपिणी',
          m: 'is of the nature of mind (mental faculties)',
          parts: [
            { t: 'स्यात्', m: 'is' },
            { t: 'अन्तःकरण', m: 'mind (inner organ)' },
            { t: 'रूपिणी', m: 'of the nature of' },
          ],
        },
        { t: '॥ ६ ॥' },
      ],
    ],
    transliteration:
      'cic-chāyāveśato buddhau bhānaṃ dhīs tu dvidhā sthitā |\nekāhaṃkṛtir anyā syād antaḥkaraṇa-rūpiṇī || 6 ||',
    translation:
      'Buddhi appears to possess luminosity on account of the reflection of Consciousness in it. Intelligence (Buddhi) is of two kinds. One is designated egoity, the other as mind (antahkarana).',
    recitation: { src: '/audio/ddv-6-recitation.mp3', videoId: 'Bxvc4eL3tag', start: 750, end: 783 },
    commentary: { src: '/audio/ddv-6-commentary.mp3', videoId: 'Bxvc4eL3tag', start: 783, end: 1620 },
  },
  {
    number: 7,
    lines: [
      [
        {
          t: 'छायाहंकारयोरैक्यं',
          m: 'identity of the reflection and egoism',
          parts: [
            { t: 'छाया', m: 'reflection' },
            { t: 'अहंकारयोः', m: 'and egoism, of' },
            { t: 'ऐक्यं', m: 'identity' },
          ],
        },
        {
          t: 'तप्तायःपिंडवन्मतं',
          m: 'is, in the opinion of the wise, like that of fire and the heated iron ball',
          parts: [
            { t: 'तप्त', m: 'heated' },
            { t: 'अयः', m: 'iron' },
            { t: 'पिण्डवत्', m: 'like a ball' },
            { t: 'मतम्', m: 'is held (in the opinion of the wise)' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'तदहंकारतादात्म्याद्',
          m: 'owing to identification with that egoism',
          parts: [
            { t: 'तत्', m: 'that' },
            { t: 'अहंकार', m: 'egoism' },
            { t: 'तादात्म्यात्', m: 'owing to identification' },
          ],
        },
        {
          t: 'देहश्चेतनतामगात्',
          m: 'the body has attained consciousness',
          parts: [
            { t: 'देहः', m: 'the body' },
            { t: 'चेतनताम्', m: 'consciousness' },
            { t: 'अगात्', m: 'has attained' },
          ],
        },
        { t: '॥ ७ ॥' },
      ],
    ],
    transliteration:
      'chāyāhaṃkārayor aikyaṃ taptāyaḥ-piṇḍavan mataṃ |\ntad-ahaṃkāra-tādātmyād dehaś cetanatām agāt || 7 ||',
    translation:
      'In the opinion of the wise, the identity of the reflection (of Consciousness) and of ego is like the identity of the fire and the (heated) iron ball. The body having been identified with the ego (which has already identified itself with the reflection of Consciousness) passes for a conscious entity.',
    recitation: { src: '/audio/ddv-7-recitation.mp3', videoId: 'Bxvc4eL3tag', start: 1628, end: 1659 },
    commentary: { src: '/audio/ddv-7-commentary.mp3', videoId: 'Bxvc4eL3tag', start: 1659, end: 2064 },
  },
  {
    number: 8,
    lines: [
      [
        { t: 'अहंकारस्य', m: 'of the ego' },
        { t: 'तादात्म्यं', m: 'identification' },
        {
          t: 'चिच्छायादेहसाक्षिभिः',
          m: 'with the reflection of Consciousness, body and Witness, respectively',
          parts: [
            { t: 'चित्', m: 'Consciousness' },
            { t: 'छाया', m: 'reflection' },
            { t: 'देह', m: 'body' },
            { t: 'साक्षिभिः', m: 'and Witness, respectively' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'सहजं',
          m: 'natural',
          parts: [
            { t: 'सह', m: 'together' },
            { t: 'जम्', m: 'born (natural)' },
          ],
        },
        {
          t: 'कर्मजं',
          m: 'due to past Karma',
          parts: [
            { t: 'कर्म', m: 'past Karma' },
            { t: 'जम्', m: 'born of' },
          ],
        },
        {
          t: 'भ्रान्तिजन्यं',
          m: 'due to ignorance',
          parts: [
            { t: 'भ्रान्ति', m: 'ignorance (delusion)' },
            { t: 'जन्यम्', m: 'born of' },
          ],
        },
        { t: 'च', m: 'and' },
        {
          t: 'त्रिविधं',
          m: 'of three kinds',
          parts: [
            { t: 'त्रि', m: 'three' },
            { t: 'विधम्', m: 'kinds' },
          ],
        },
        { t: 'क्रमात्', m: 'respectively' },
        { t: '॥ ८ ॥' },
      ],
    ],
    transliteration:
      'ahaṃkārasya tādātmyaṃ cic-chāyā-deha-sākṣibhiḥ |\nsahajaṃ karmajaṃ bhrāntijanyaṃ ca trividhaṃ kramāt || 8 ||',
    translation:
      'The identification of the ego with the reflection of Consciousness, the body and the Witness are of three kinds, namely, natural, due to (past) Karma, and due to ignorance, respectively.',
    recitation: { src: '/audio/ddv-8-recitation.mp3', videoId: 'Bxvc4eL3tag', start: 2076, end: 2107 },
    commentary: { src: '/audio/ddv-8-commentary.mp3', videoId: 'Bxvc4eL3tag', start: 2107, end: 2745 },
  },
  {
    number: 9,
    lines: [
      [
        {
          t: 'संबंधिनोस्सतोर्नास्ति',
          m: 'of the mutually related (ego and reflection), so long as they are taken to be real, there is no',
          parts: [
            { t: 'संबन्धिनोः', m: 'of the mutually related (ego and reflection)' },
            { t: 'सतोः', m: 'taken to be real' },
            { t: 'न', m: 'not' },
            { t: 'अस्ति', m: 'is' },
          ],
        },
        {
          t: 'निवृत्तिस्सहजस्य',
          m: 'annihilation of the natural (identification)',
          parts: [
            { t: 'निवृत्तिः', m: 'annihilation' },
            { t: 'सहजस्य', m: 'of the natural (identification)' },
          ],
        },
        { t: 'तु', m: 'certainly' },
        { t: '।' },
      ],
      [
        {
          t: 'कर्मक्षयात्',
          m: 'with the wearing away of (the result of) Karma',
          parts: [
            { t: 'कर्म', m: 'Karma' },
            { t: 'क्षयात्', m: 'from wearing away' },
          ],
        },
        {
          t: 'प्रबोधाच्च',
          m: 'and enlightenment',
          parts: [
            { t: 'प्रबोधात्', m: 'from enlightenment' },
            { t: 'च', m: 'and' },
          ],
        },
        { t: 'निवर्तेते', m: 'disappear' },
        {
          t: 'क्रमादुभे',
          m: 'the other two, respectively',
          parts: [
            { t: 'क्रमात्', m: 'respectively' },
            { t: 'उभे', m: 'the other two' },
          ],
        },
        { t: '॥ ९ ॥' },
      ],
    ],
    transliteration:
      'saṃbandhinos sator nāsti nivṛttis sahajasya tu |\nkarma-kṣayāt prabodhāc ca nivartete kramād ubhe || 9 ||',
    translation:
      'The mutual identification of the ego and the reflection of Consciousness, which is natural, does not cease so long as they are taken to be real. The other two identifications disappear after the wearing out of the result of Karma and the attainment of the knowledge of the highest Reality respectively.',
    recitation: { src: '/audio/ddv-9-recitation.mp3', videoId: 'Bxvc4eL3tag', start: 2746, end: 2775 },
    commentary: { src: '/audio/ddv-9-commentary.mp3', videoId: 'Bxvc4eL3tag', start: 2776, end: 3344 },
  },
  {
    number: 10,
    lines: [
      [
        {
          t: 'अहंकारलये',
          m: 'when (the thought of) ego disappears',
          parts: [
            { t: 'अहंकार', m: 'ego' },
            { t: 'लये', m: 'in disappearance' },
          ],
        },
        { t: 'सुप्तौ', m: 'in deep sleep' },
        {
          t: 'भवेद्देहोऽप्यचेतनः',
          m: 'the body also becomes unconscious',
          parts: [
            { t: 'भवेत्', m: 'becomes' },
            { t: 'देहः', m: 'the body' },
            { t: 'अपि', m: 'also' },
            { t: 'अचेतनः', m: 'unconscious' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'अहंकारविकासार्धस्वप्नस्',
          m: 'the half manifestation of the ego is the dream state',
          parts: [
            { t: 'अहंकार', m: 'ego' },
            { t: 'विकास', m: 'manifestation' },
            { t: 'अर्ध', m: 'half' },
            { t: 'स्वप्नः', m: 'the dream state' },
          ],
        },
        {
          t: 'सर्वस्तु',
          m: 'but the full (manifestation)',
          parts: [
            { t: 'सर्वः', m: 'full' },
            { t: 'तु', m: 'but' },
          ],
        },
        { t: 'जागरः', m: 'is the waking state' },
        { t: '॥ १० ॥' },
      ],
    ],
    transliteration:
      'ahaṃkāra-laye suptau bhaved deho ’py acetanaḥ |\nahaṃkāra-vikāsārdha-svapnas sarvas tu jāgaraḥ || 10 ||',
    translation:
      'In the state of deep sleep, when (the thought of) ego disappears, the body also becomes unconscious. The state in which there is the half manifestation of the ego is called the dream state and the full manifestation of the ego is the state of waking.',
    recitation: { src: '/audio/ddv-10-recitation.mp3', videoId: 'ASH1rD2jOXk', start: 839, end: 869 },
    commentary: { src: '/audio/ddv-10-commentary.mp3', videoId: 'ASH1rD2jOXk', start: 869, end: 1364 },
  },
  {
    number: 11,
    lines: [
      [
        {
          t: 'अंतःकरणवृत्तिश्च',
          m: 'the inner organ, which is nothing but a modification',
          parts: [
            { t: 'अंतःकरण', m: 'inner organ' },
            { t: 'वृत्तिः', m: 'modification' },
            { t: 'च', m: 'and' },
          ],
        },
        {
          t: 'चितिच्छायैक्यमागता',
          m: 'having attained identity with the reflection of Consciousness',
          parts: [
            { t: 'चिति', m: 'Consciousness' },
            { t: 'छाया', m: 'reflection' },
            { t: 'ऐक्यम्', m: 'identity' },
            { t: 'आगता', m: 'having attained' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'वासनाः', m: 'ideas' },
        {
          t: 'कल्पयेत्स्वप्ने',
          m: 'imagines in the dream',
          parts: [
            { t: 'कल्पयेत्', m: 'imagines' },
            { t: 'स्वप्ने', m: 'in the dream' },
          ],
        },
        {
          t: 'बोधेऽक्षैर्विषयान्बहिः',
          m: 'in the waking state, external objects with respect to the sense-organs',
          parts: [
            { t: 'बोधे', m: 'in the waking state' },
            { t: 'अक्षैः', m: 'with respect to the sense-organs' },
            { t: 'विषयान्', m: 'objects' },
            { t: 'बहिः', m: 'external' },
          ],
        },
        { t: '॥ ११ ॥' },
      ],
    ],
    transliteration:
      'antaḥkaraṇa-vṛttiś ca citi-cchāyaikyam āgatā |\nvāsanāḥ kalpayet svapne bodhe ’kṣair viṣayān bahiḥ || 11 ||',
    translation:
      'The inner organ (mind) which is itself but a modification (वृत्तिः) identifying itself with the reflection of Consciousness imagines (various) ideas in the dream. And the same inner organ (identifying itself with the body) imagines objects external to itself in the waking state with respect to the sense-organs.',
    recitation: { src: '/audio/ddv-11-recitation.mp3', videoId: 'ASH1rD2jOXk', start: 1365, end: 1394 },
    commentary: { src: '/audio/ddv-11-commentary.mp3', videoId: 'ASH1rD2jOXk', start: 1394, end: 1870 },
  },
  {
    number: 12,
    lines: [
      [
        {
          t: 'मनोऽहंकृत्युपादानं',
          m: 'the material cause of mind and egoism',
          parts: [
            { t: 'मनः', m: 'mind' },
            { t: 'अहंकृति', m: 'egoism' },
            { t: 'उपादानं', m: 'material cause' },
          ],
        },
        {
          t: 'लिंगमेकं',
          m: 'the subtle (body), one',
          parts: [
            { t: 'लिंगं', m: 'subtle (body)' },
            { t: 'एकं', m: 'one' },
          ],
        },
        {
          t: 'जडात्मकं',
          m: 'of the nature of insentiency',
          parts: [
            { t: 'जड', m: 'insentient' },
            { t: 'आत्मकं', m: 'of the nature of' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'अवस्थात्रयमन्वेति',
          m: 'attains the three states',
          parts: [
            { t: 'अवस्थात्रयं', m: 'the three states' },
            { t: 'अन्वेति', m: 'attains' },
          ],
        },
        { t: 'जायते', m: 'is born' },
        { t: 'म्रियते', m: 'dies' },
        { t: 'तथा', m: 'similarly' },
        { t: '॥ १२ ॥' },
      ],
    ],
    transliteration:
      'mano ’haṃkṛty-upādānaṃ liṃgam ekaṃ jaḍātmakaṃ |\navasthā-trayam anveti jāyate mriyate tathā || 12 ||',
    translation:
      'The subtle body which is the material cause of the mind and egoism is one and of the nature of insentiency. It moves in the three states and is born and it dies.',
  },
  {
    number: 13,
    lines: [
      [
        {
          t: 'शक्तिद्वयं',
          m: 'two powers',
          parts: [
            { t: 'शक्ति', m: 'power' },
            { t: 'द्वयं', m: 'two' },
          ],
        },
        { t: 'हि', m: 'without doubt' },
        { t: 'मायाया', m: 'of Māyā' },
        {
          t: 'विक्षेपावृतिरूपकं',
          m: 'of the nature of projecting (creating) and veiling',
          parts: [
            { t: 'विक्षेप', m: 'projecting' },
            { t: 'आवृति', m: 'veiling' },
            { t: 'रूपकं', m: 'of the nature of' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'विक्षेपशक्तिर्लिंगादि',
          m: 'the projecting power, from the subtle body',
          parts: [
            { t: 'विक्षेपशक्तिः', m: 'projecting power' },
            { t: 'लिंग', m: 'subtle body' },
            { t: 'आदि', m: 'from, beginning with' },
          ],
        },
        {
          t: 'ब्रह्माण्डांतं',
          m: 'to the (gross) universe',
          parts: [
            { t: 'ब्रह्माण्ड', m: 'universe' },
            { t: 'अंतं', m: 'up to' },
          ],
        },
        {
          t: 'जगत्सृजेत्',
          m: 'creates the world',
          parts: [
            { t: 'जगत्', m: 'world' },
            { t: 'सृजेत्', m: 'creates' },
          ],
        },
        { t: '॥ १३ ॥' },
      ],
    ],
    transliteration:
      'śakti-dvayaṃ hi māyāyā vikṣepāvṛti-rūpakaṃ |\nvikṣepa-śaktir liṃgādi brahmāṇḍāntaṃ jagat sṛjet || 13 ||',
    translation:
      'Two powers, undoubtedly, are predicated of Māyā, viz., those of projecting and veiling. The projecting power creates everything from the subtle body to the gross universe.',
  },
  {
    number: 14,
    lines: [
      [
        {
          t: 'सृष्टिर्नाम',
          m: 'creation is called',
          parts: [
            { t: 'सृष्टिः', m: 'creation' },
            { t: 'नाम', m: 'is called' },
          ],
        },
        {
          t: 'ब्रह्मरूपे',
          m: 'of the nature of Brahman',
          parts: [
            { t: 'ब्रह्म', m: 'Brahman' },
            { t: 'रूपे', m: 'of the nature of' },
          ],
        },
        {
          t: 'सच्चिदानंदवस्तुनि',
          m: 'in the entity which is Existence-Consciousness-Bliss',
          parts: [
            { t: 'सत्', m: 'existence' },
            { t: 'चित्', m: 'consciousness' },
            { t: 'आनंद', m: 'bliss' },
            { t: 'वस्तुनि', m: 'in the entity' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'अब्धौ', m: 'in the ocean' },
        {
          t: 'फेनादिवत्सर्वनामरूपप्रसारणा',
          m: 'the manifesting of all names and forms, like foams etc.',
          parts: [
            { t: 'फेनादिवत्', m: 'like foams etc.' },
            { t: 'सर्व', m: 'all' },
            { t: 'नाम', m: 'names' },
            { t: 'रूप', m: 'forms' },
            { t: 'प्रसारणा', m: 'manifesting' },
          ],
        },
        { t: '॥ १४ ॥' },
      ],
    ],
    transliteration:
      'sṛṣṭir nāma brahma-rūpe sac-cid-ānanda-vastuni |\nabdhau phenādivat sarva-nāma-rūpa-prasāraṇā || 14 ||',
    translation:
      'The manifesting of all names and forms in the entity which is Existence-Consciousness-Bliss and which is the same as Brahman, like the foams etc. in the ocean, is known as creation.',
  },
  {
    number: 15,
    lines: [
      [
        {
          t: 'अंतर्दृग्दृश्ययोर्भेदं',
          m: 'within, the distinction between the seer and the seen',
          parts: [
            { t: 'अंतः', m: 'within' },
            { t: 'दृग्दृश्ययोः', m: 'between the seer and the seen' },
            { t: 'भेदं', m: 'distinction' },
          ],
        },
        {
          t: 'बहिश्च',
          m: 'outside, also',
          parts: [
            { t: 'बहिः', m: 'outside' },
            { t: 'च', m: 'also' },
          ],
        },
        {
          t: 'ब्रह्मसर्गयोः',
          m: 'between Brahman and the created universe',
          parts: [
            { t: 'ब्रह्म', m: 'Brahman' },
            { t: 'सर्गयोः', m: 'between … and the created universe' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'आवृणोत्यपरा',
          m: 'conceals the other (power)',
          parts: [
            { t: 'आवृणोति', m: 'conceals' },
            { t: 'अपरा', m: 'the other' },
          ],
        },
        {
          t: 'शक्तिस्सा',
          m: 'this power',
          parts: [
            { t: 'शक्तिः', m: 'power' },
            { t: 'सा', m: 'this' },
          ],
        },
        { t: 'संसारस्य', m: 'of the phenomenal universe' },
        { t: 'कारणम्', m: 'cause (is)' },
        { t: '॥ १५ ॥' },
      ],
    ],
    transliteration:
      'antar-dṛg-dṛśyayor bhedaṃ bahiś ca brahma-sargayoḥ |\nāvṛṇoty aparā śaktis sā saṃsārasya kāraṇam || 15 ||',
    translation:
      'The other power (of Māyā) conceals the distinction between the perceiver and the perceived objects which are cognized within the body as well as the distinction between Brahman and the phenomenal universe which is perceived outside (one’s own body). This power is the cause of the phenomenal universe.',
  },
]
