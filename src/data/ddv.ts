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
    recitation: { src: '/audio/ddv-12-recitation.mp3', videoId: 'ASH1rD2jOXk', start: 1871, end: 1900 },
    commentary: { src: '/audio/ddv-12-commentary.mp3', videoId: 'ASH1rD2jOXk', start: 1900, end: 3041 },
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
    recitation: { src: '/audio/ddv-13-recitation.mp3', videoId: 'AiDa_7Blimg', start: 461, end: 491 },
    commentary: { src: '/audio/ddv-13-commentary.mp3', videoId: 'AiDa_7Blimg', start: 492, end: 1388 },
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
    recitation: { src: '/audio/ddv-14-recitation.mp3', videoId: 'AiDa_7Blimg', start: 1390, end: 1419 },
    commentary: { src: '/audio/ddv-14-commentary.mp3', videoId: 'AiDa_7Blimg', start: 1419, end: 2717 },
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
    recitation: { src: '/audio/ddv-15-recitation.mp3', videoId: 'AiDa_7Blimg', start: 2717, end: 2745 },
    commentary: { src: '/audio/ddv-15-commentary.mp3', videoId: 'AiDa_7Blimg', start: 2745, end: 3136 },
  },
  {
    number: 16,
    lines: [
      [
        { t: 'साक्षिणः', m: 'of the Witness' },
        { t: 'पुरतो', m: 'in immediate proximity' },
        { t: 'भाति', m: 'shines' },
        { t: 'लिंगं', m: 'the subtle body' },
        { t: 'देहेन', m: 'with the (physical) body' },
        { t: 'संयुतम्', m: 'related' },
        { t: '।' },
      ],
      [
        {
          t: 'चितिच्छाया',
          m: 'the reflection of Consciousness',
          parts: [
            { t: 'चिति', m: 'Consciousness' },
            { t: 'छाया', m: 'reflection' },
          ],
        },
        {
          t: 'समावेशाज्जीवस्स्याद्व्यावहारिकः',
          m: 'on account of being affected by it, the embodied self becomes empirical',
          parts: [
            { t: 'समावेशात्', m: 'on account of being affected by it' },
            { t: 'जीवः', m: 'embodied self' },
            { t: 'स्यात्', m: 'becomes' },
            { t: 'व्यावहारिकः', m: 'empirical' },
          ],
        },
        { t: '॥ १६ ॥' },
      ],
    ],
    transliteration:
      'sākṣiṇaḥ purato bhāti liṃgaṃ dehena saṃyutam |\nciti-cchāyā samāveśāj jīvas syād vyāvahārikaḥ || 16 ||',
    translation:
      'The subtle body (Lingam) which exists in close proximity to the Witness (Sākshin) identifying itself with the gross body becomes the embodied empirical self, on account of its being affected by the reflection of Consciousness.',
    recitation: { src: '/audio/ddv-16-recitation.mp3', videoId: 'QOheqKTZxt4', start: 1756, end: 1784 },
    commentary: { src: '/audio/ddv-16-commentary.mp3', videoId: 'QOheqKTZxt4', start: 1788, end: 2133 },
  },
  {
    number: 17,
    lines: [
      [
        { t: 'अस्य', m: 'of this (the empirical self)' },
        {
          t: 'जीवत्वमारोपात्साक्षिण्यप्यवभासते',
          m: 'the nature of being a Jiva appears also in the Sākshin, through superimposition',
          parts: [
            { t: 'जीवत्वं', m: 'the nature of being a Jiva' },
            { t: 'आरोपात्', m: 'through superimposition' },
            { t: 'साक्षिणि', m: 'in the Sākshin' },
            { t: 'अपि', m: 'also' },
            { t: 'अवभासते', m: 'appears' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'आवृतौ', m: 'of the veiling power' },
        { t: 'तु', m: 'but' },
        { t: 'विनष्टायां', m: 'by the annihilation' },
        { t: 'भेदे', m: 'the difference' },
        {
          t: 'भातेऽपयाति',
          m: 'having become clear, disappears',
          parts: [
            { t: 'भाते', m: 'having become clear' },
            { t: 'अपयाति', m: 'disappears' },
          ],
        },
        { t: 'तत्', m: 'that (the idea of being Jiva)' },
        { t: '॥ १७ ॥' },
      ],
    ],
    transliteration:
      'asya jīvatvam āropāt sākṣiṇy apy avabhāsate |\nāvṛtau tu vinaṣṭāyāṃ bhede bhāte ’payāti tat || 17 ||',
    translation:
      'The character of an embodied self appears through false superimposition in the Sākshin also. With the disappearance of the veiling power, the distinction (between the seer and the object) becomes clear and with it the Jiva character of the Sākshin (Witness) disappears.',
    recitation: { src: '/audio/ddv-17-recitation.mp3', videoId: 'QOheqKTZxt4', start: 2136, end: 2164 },
    commentary: { src: '/audio/ddv-17-commentary.mp3', videoId: 'QOheqKTZxt4', start: 2164, end: 4004.72 },
  },
  {
    number: 18,
    lines: [
      [
        { t: 'तथा', m: 'similarly' },
        {
          t: 'सर्गब्रह्मणोश्च',
          m: 'of the phenomenal universe and Brahman, and',
          parts: [
            { t: 'सर्ग', m: 'phenomenal universe' },
            { t: 'ब्रह्मणोः', m: 'and Brahman, of' },
            { t: 'च', m: 'and' },
          ],
        },
        {
          t: 'भेदमावृत्य',
          m: 'concealing the distinction',
          parts: [
            { t: 'भेदं', m: 'distinction' },
            { t: 'आवृत्य', m: 'concealing' },
          ],
        },
        { t: 'तिष्ठति', m: 'exists' },
        { t: '।' },
      ],
      [
        { t: 'या', m: 'which' },
        {
          t: 'शक्तिस्तद्वशाद्ब्रह्म',
          m: 'the power; through its influence, Brahman',
          parts: [
            { t: 'शक्तिः', m: 'power' },
            { t: 'तद्वशात्', m: 'through its influence' },
            { t: 'ब्रह्म', m: 'Brahman' },
          ],
        },
        {
          t: 'विकृतत्वेन',
          m: 'as being of the nature of modification',
          parts: [
            { t: 'विकृत', m: 'modification' },
            { t: 'त्वेन', m: 'as being of the nature of' },
          ],
        },
        { t: 'भासते', m: 'appears' },
        { t: '॥ १८ ॥' },
      ],
    ],
    transliteration:
      'tathā sarga-brahmaṇoś ca bhedam āvṛtya tiṣṭhati |\nyā śaktis tad-vaśād brahma vikṛtatvena bhāsate || 18 ||',
    translation:
      'Similarly, Brahman, through the influence of the power that conceals the distinction between It and the phenomenal universe, appears as endowed with the attributes of change.',
    recitation: { src: '/audio/ddv-18-recitation.mp3', videoId: 'wmdxSh84EI8', start: 875, end: 902 },
    commentary: { src: '/audio/ddv-18-commentary.mp3', videoId: 'wmdxSh84EI8', start: 902, end: 1219 },
  },
  {
    number: 19,
    lines: [
      [
        {
          t: 'अत्राप्यावृतिनाशेन',
          m: 'in this case also, with the destruction of the veiling power',
          parts: [
            { t: 'अत्र', m: 'in this case' },
            { t: 'अपि', m: 'also' },
            { t: 'आवृति', m: 'veiling power' },
            { t: 'नाशेन', m: 'with the destruction' },
          ],
        },
        { t: 'विभाति', m: 'becomes clear' },
        {
          t: 'ब्रह्मसर्गयोः',
          m: 'of Brahman and the phenomenal universe',
          parts: [
            { t: 'ब्रह्म', m: 'Brahman' },
            { t: 'सर्गयोः', m: 'and the phenomenal universe, of' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'भेदस्तयोर्विकारस्स्यात्सर्गेन',
          m: 'the distinction between the two; change exists in the phenomenal universe, not',
          parts: [
            { t: 'भेदः', m: 'distinction' },
            { t: 'तयोः', m: 'between those two' },
            { t: 'विकारः', m: 'change' },
            { t: 'स्यात्', m: 'exists' },
            { t: 'सर्गे', m: 'in the phenomenal universe' },
            { t: 'न', m: 'not' },
          ],
        },
        { t: 'ब्रह्मणि', m: 'in Brahman' },
        { t: 'क्वचित्', m: 'ever' },
        { t: '॥ १९ ॥' },
      ],
    ],
    transliteration:
      'atrāpy āvṛti-nāśena vibhāti brahma-sargayoḥ |\nbhedas tayor vikāras syāt sarge na brahmaṇi kvacit || 19 ||',
    translation:
      'In this case also, the distinction between Brahman and the phenomenal universe becomes clear with the disappearance of the veiling power. Therefore change is perceived in the phenomenal universe, but never in Brahman.',
    recitation: { src: '/audio/ddv-19-recitation.mp3', videoId: 'wmdxSh84EI8', start: 1219, end: 1247 },
    commentary: { src: '/audio/ddv-19-commentary.mp3', videoId: 'wmdxSh84EI8', start: 1247, end: 1736 },
  },
  {
    number: 20,
    lines: [
      [
        { t: 'अस्ति', m: '(it) exists' },
        { t: 'भाति', m: '(it) shines (becomes cognizable)' },
        { t: 'प्रियं', m: '(it is) dear' },
        { t: 'रूपं', m: 'form' },
        {
          t: 'नामचेत्यंशपञ्चकम्',
          m: 'name, and thus all these five aspects',
          parts: [
            { t: 'नाम', m: 'name' },
            { t: 'च', m: 'and' },
            { t: 'इति', m: 'thus' },
            { t: 'अंशपञ्चकं', m: 'these five aspects' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'आद्यत्रयं', m: 'the first three' },
        {
          t: 'ब्रह्मरूपं',
          m: 'characteristics of Brahman',
          parts: [
            { t: 'ब्रह्म', m: 'Brahman' },
            { t: 'रूपं', m: 'characteristics' },
          ],
        },
        {
          t: 'जगद्रूपं',
          m: 'characteristics of the universe',
          parts: [
            { t: 'जगत्', m: 'universe' },
            { t: 'रूपं', m: 'characteristics' },
          ],
        },
        { t: 'ततो', m: 'the next' },
        { t: 'द्वयम्', m: 'two' },
        { t: '॥ २० ॥' },
      ],
    ],
    transliteration:
      'asti bhāti priyaṃ rūpaṃ nāma-cety-aṃśa-pañcakam |\nādya-trayaṃ brahma-rūpaṃ jagad-rūpaṃ tato dvayam || 20 ||',
    translation:
      'Every entity has five characteristics, viz., existence, cognizability, attractiveness, form and name. Of these, the first three belong to Brahman and the next two to the world.',
    recitation: { src: '/audio/ddv-20-recitation.mp3', videoId: 'wmdxSh84EI8', start: 1736, end: 1763 },
    commentary: { src: '/audio/ddv-20-commentary.mp3', videoId: 'wmdxSh84EI8', start: 1763, end: 3167 },
  },
  {
    number: 21,
    lines: [
      [
        {
          t: 'खवाय्वग्निजलोर्वीषु',
          m: 'in the Ākāsha (ether), air, fire, water and earth',
          parts: [
            { t: 'ख', m: 'Ākāsha (ether)' },
            { t: 'वायु', m: 'air' },
            { t: 'अग्नि', m: 'fire' },
            { t: 'जल', m: 'water' },
            { t: 'उर्वीषु', m: 'and earth, in' },
          ],
        },
        {
          t: 'देवतिर्यङ्नरादिषु',
          m: 'in gods, animals and men etc.',
          parts: [
            { t: 'देव', m: 'gods' },
            { t: 'तिर्यक्', m: 'animals' },
            { t: 'नर', m: 'men' },
            { t: 'आदिषु', m: 'etc., in' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'अभिन्नास्सच्चिदानंदाः',
          m: 'the attributes of Existence, Consciousness and Bliss, common to all',
          parts: [
            { t: 'अभिन्नाः', m: 'common (undivided)' },
            { t: 'सत्', m: 'existence' },
            { t: 'चित्', m: 'consciousness' },
            { t: 'आनंदाः', m: 'and bliss' },
          ],
        },
        { t: 'भिद्येते', m: 'differ' },
        {
          t: 'रूपनामनी',
          m: 'forms and names',
          parts: [
            { t: 'रूप', m: 'form' },
            { t: 'नामनी', m: 'and name' },
          ],
        },
        { t: '॥ २१ ॥' },
      ],
    ],
    transliteration:
      'kha-vāyv-agni-jalorvīṣu deva-tiryaṅ-narādiṣu |\nabhinnās sac-cid-ānandāḥ bhidyete rūpa-nāmanī || 21 ||',
    translation:
      'The attributes of Existence, Consciousness and Bliss are equally present in the Ākāsha (ether), air, fire, water and earth as well as in gods, animals and men etc. Names and forms make one differ from the other.',
    recitation: { src: '/audio/ddv-21-recitation.mp3', videoId: 'bx9n8vccx38', start: 731, end: 759 },
    commentary: { src: '/audio/ddv-21-commentary.mp3', videoId: 'bx9n8vccx38', start: 759, end: 1195 },
  },
  {
    number: 22,
    lines: [
      [
        { t: 'उपेक्ष्य', m: 'being indifferent' },
        {
          t: 'नामरूपे',
          m: 'to name and form',
          parts: [
            { t: 'नाम', m: 'name' },
            { t: 'रूपे', m: 'and form' },
          ],
        },
        { t: 'द्वे', m: 'two' },
        {
          t: 'सच्चिदानंदतत्परः',
          m: 'being devoted to Satchidānanda',
          parts: [
            { t: 'सत्', m: 'existence' },
            { t: 'चित्', m: 'consciousness' },
            { t: 'आनंद', m: 'bliss' },
            { t: 'तत्परः', m: 'being devoted to that' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'समाधिं', m: 'concentration' },
        { t: 'सर्वदा', m: 'always' },
        {
          t: 'कुर्याद्हृदये',
          m: 'should practise, in the heart',
          parts: [
            { t: 'कुर्यात्', m: 'should practise' },
            { t: 'हृदये', m: 'in the heart' },
          ],
        },
        {
          t: 'वाऽथवा',
          m: 'either … or',
          parts: [
            { t: 'वा', m: 'either' },
            { t: 'अथवा', m: 'or' },
          ],
        },
        { t: 'बहिः', m: 'outside' },
        { t: '॥ २२ ॥' },
      ],
    ],
    transliteration:
      'upekṣya nāma-rūpe dve sac-cid-ānanda-tat-paraḥ |\nsamādhiṃ sarvadā kuryād hṛdaye vā ’thavā bahiḥ || 22 ||',
    translation:
      'Having become indifferent to name and form and being devoted to Satchidānanda, one should always practise concentration either within the heart or outside.',
    recitation: { src: '/audio/ddv-22-recitation.mp3', videoId: 'bx9n8vccx38', start: 1195, end: 1223 },
    commentary: { src: '/audio/ddv-22-commentary.mp3', videoId: 'bx9n8vccx38', start: 1223, end: 1437 },
  },
  {
    number: 23,
    lines: [
      [
        { t: 'सविकल्पो', m: 'Savikalpa (in which ideas are present)' },
        { t: 'निर्विकल्पः', m: 'Nirvikalpa (in which ideas do not exist)' },
        {
          t: 'समाधिर्द्विविधो',
          m: 'concentration (Samādhi) is of two kinds',
          parts: [
            { t: 'समाधिः', m: 'concentration (Samādhi)' },
            { t: 'द्विविधः', m: 'of two kinds' },
          ],
        },
        { t: 'हृदि', m: 'within the heart' },
        { t: '।' },
      ],
      [
        {
          t: 'दृश्यशब्दानुवेधेन',
          m: 'according to its association with a cognizable object or a sound',
          parts: [
            { t: 'दृश्य', m: 'cognizable object' },
            { t: 'शब्द', m: 'sound' },
            { t: 'अनुवेधेन', m: 'by association' },
          ],
        },
        { t: 'सविकल्पः', m: 'Savikalpa (in which ideas are present)' },
        {
          t: 'पुनर्द्विधा',
          m: 'again of two kinds',
          parts: [
            { t: 'पुनः', m: 'again' },
            { t: 'द्विधा', m: 'of two kinds' },
          ],
        },
        { t: '॥ २३ ॥' },
      ],
    ],
    transliteration:
      'savikalpo nirvikalpaḥ samādhir dvividho hṛdi |\ndṛśya-śabdānuvedhena savikalpaḥ punar dvidhā || 23 ||',
    translation:
      'Two kinds of Samādhi to be practised in the heart (within one’s self) are known as Savikalpa and Nirvikalpa. Savikalpa Samādhi is again divided into two classes, according to its association with a cognizable object or a sound (as an object).',
    recitation: { src: '/audio/ddv-23-recitation.mp3', videoId: 'bx9n8vccx38', start: 1437, end: 1464 },
    commentary: { src: '/audio/ddv-23-commentary.mp3', videoId: 'bx9n8vccx38', start: 1464, end: 1679 },
  },
  {
    number: 24,
    lines: [
      [
        {
          t: 'कामाद्याश्चित्तगा',
          m: 'desire etc., centred in the mind',
          parts: [
            { t: 'कामाद्याः', m: 'desire etc.' },
            { t: 'चित्तगाः', m: 'centred in the mind' },
          ],
        },
        {
          t: 'दृश्यास्तत्साक्षित्वेन',
          m: '(cognizable) objects, as their Witness',
          parts: [
            { t: 'दृश्याः', m: '(cognizable) objects' },
            { t: 'तत्', m: 'their' },
            { t: 'साक्षित्वेन', m: 'as Witness' },
          ],
        },
        { t: 'चेतनम्', m: 'Consciousness' },
        { t: '।' },
      ],
      [
        {
          t: 'ध्यायेद्दृश्यानुविद्धोऽयं',
          m: 'should meditate; this is combined with cognizable objects',
          parts: [
            { t: 'ध्यायेत्', m: 'should meditate' },
            { t: 'दृश्यानुविद्धः', m: 'combined with cognizable objects' },
            { t: 'अयं', m: 'this' },
          ],
        },
        {
          t: 'समाधिस्सविकल्पकः',
          m: 'concentration in which ideas are present',
          parts: [
            { t: 'समाधिः', m: 'concentration' },
            { t: 'सविकल्पकः', m: 'in which ideas are present' },
          ],
        },
        { t: '॥ २४ ॥' },
      ],
    ],
    transliteration:
      'kāmādyāś citta-gā dṛśyās tat-sākṣitvena cetanam |\ndhyāyed dṛśyānuviddho ’yaṃ samādhis savikalpakaḥ || 24 ||',
    translation:
      'Desire etc. centred in the mind are to be treated as (cognizable) objects. Meditate on Consciousness as their Witness. This is what is called Savikalpa Samādhi associated with (cognizable) objects.',
    recitation: { src: '/audio/ddv-24-recitation.mp3', videoId: 'bx9n8vccx38', start: 1679, end: 1708 },
    commentary: { src: '/audio/ddv-24-commentary.mp3', videoId: 'bx9n8vccx38', start: 1708, end: 2481 },
  },
  {
    number: 25,
    lines: [
      [
        {
          t: 'असंगस्सच्चिदानंदस्स्वप्रभो',
          m: 'unattached, Existence-Consciousness-Bliss, self-luminous',
          parts: [
            { t: 'असंगः', m: 'unattached' },
            { t: 'सत्', m: 'existence' },
            { t: 'चित्', m: 'consciousness' },
            { t: 'आनंदः', m: 'bliss' },
            { t: 'स्वप्रभः', m: 'self-luminous' },
          ],
        },
        {
          t: 'द्वैतवर्जितः',
          m: 'free from duality',
          parts: [
            { t: 'द्वैत', m: 'duality' },
            { t: 'वर्जितः', m: 'free from' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'अस्मीति',
          m: '(I) am — thus',
          parts: [
            { t: 'अस्मि', m: 'am' },
            { t: 'इति', m: 'thus' },
          ],
        },
        {
          t: 'शब्दविद्धोऽयं',
          m: 'this is associated with words',
          parts: [
            { t: 'शब्दविद्धः', m: 'associated with words' },
            { t: 'अयं', m: 'this' },
          ],
        },
        {
          t: 'समाधिस्सविकल्पकः',
          m: 'Savikalpaka Samādhi',
          parts: [
            { t: 'समाधिः', m: 'concentration (Samādhi)' },
            { t: 'सविकल्पकः', m: 'in which ideas are present' },
          ],
        },
        { t: '॥ २५ ॥' },
      ],
    ],
    transliteration:
      'asaṅgas sac-cid-ānandas sva-prabho dvaita-varjitaḥ |\nasmīti śabda-viddho ’yaṃ samādhis savikalpakaḥ || 25 ||',
    translation:
      'I am Existence-Consciousness-Bliss, unattached, self-luminous and free from duality. This is known as the (other kind of) Savikalpa Samādhi associated with sound (object).',
    recitation: { src: '/audio/ddv-25-recitation.mp3', videoId: 'bx9n8vccx38', start: 2481, end: 2508 },
    commentary: { src: '/audio/ddv-25-commentary.mp3', videoId: 'bx9n8vccx38', start: 2508, end: 3369 },
  },
  {
    number: 26,
    lines: [
      [
        {
          t: 'स्वानुभूतिरसावेशाद्',
          m: 'on account of complete absorption in the bliss of realization of the Self',
          parts: [
            { t: 'स्वानुभूति', m: 'realization of the Self' },
            { t: 'रस', m: 'bliss' },
            { t: 'आवेशाद्', m: 'on account of absorption' },
          ],
        },
        {
          t: 'दृश्यशब्दावुपेक्ष्यतु',
          m: 'but, being indifferent to both the perceived objects and sounds',
          parts: [
            { t: 'दृश्यशब्दौ', m: 'both the perceived objects and sounds' },
            { t: 'उपेक्ष्य', m: 'being indifferent to' },
            { t: 'तु', m: 'but' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'निर्विकल्पस्समाधिस्स्यान्निवातास्थितदीपवत्',
          m: 'Nirvikalpa Samādhi is absorption free from ideas, like a flame in a place free from wind',
          parts: [
            { t: 'निर्विकल्पः', m: 'free from ideas (Nirvikalpa)' },
            { t: 'समाधिः', m: 'absorption (Samādhi)' },
            { t: 'स्यात्', m: 'is' },
            { t: 'निवातास्थितदीपवत्', m: 'like a flame in a place free from wind' },
          ],
        },
        { t: '॥ २६ ॥' },
      ],
    ],
    transliteration:
      'svānubhūti-rasāveśād dṛśya-śabdāv upekṣya tu |\nnirvikalpas samādhis syān nivātāsthita-dīpavat || 26 ||',
    translation:
      'But the Nirvikalpa Samādhi is that in which the mind becomes steady like the (unflickering flame of a) light kept in a place free from wind and in which the student becomes indifferent to both objects and sounds on account of his complete absorption in the bliss of the realization of the Self.',
  },
  {
    number: 27,
    lines: [
      [
        { t: 'हृदीव', m: 'as in the heart' },
        {
          t: 'बाह्यदेशेऽपि',
          m: 'in the external region as well',
          parts: [
            { t: 'बाह्य', m: 'external' },
            { t: 'देशे', m: 'in the region' },
            { t: 'अपि', m: 'also' },
          ],
        },
        {
          t: 'यस्मिन्कस्मिंश्च',
          m: 'in any whatsoever',
          parts: [
            { t: 'यस्मिन्', m: 'in whichever' },
            { t: 'कस्मिन्', m: 'in any' },
            { t: 'च', m: 'and' },
          ],
        },
        { t: 'वस्तुनि', m: 'object' },
        { t: '।' },
      ],
      [
        {
          t: 'समाधिराद्यस्सन्मात्रान्नामरूपपृथक्कृतिः',
          m: 'the first kind of Samādhi is possible; from Pure Existence, the separation of names and forms',
          parts: [
            { t: 'समाधिः', m: 'concentration (Samādhi)' },
            { t: 'आद्यः', m: 'of the first kind' },
            { t: 'सन्मात्रात्', m: 'from the Pure Existence (Brahman)' },
            { t: 'नामरूपपृथक्कृतिः', m: 'the separation of names and forms' },
          ],
        },
        { t: '॥ २७ ॥' },
      ],
    ],
    transliteration:
      'hṛdīva bāhya-deśe ’pi yasmin kasmiṃś ca vastuni |\nsamādhir ādyas san-mātrān nāma-rūpa-pṛthak-kṛtiḥ || 27 ||',
    translation:
      'The first kind of Samādhi is possible with the help of any external object as it is with the help of an internal object. In that Samādhi the name and form are separated from what is Pure Existence (Brahman).',
  },
  {
    number: 28,
    lines: [
      [
        {
          t: 'अखंडैकरसं',
          m: 'of the same nature (always) and unlimited',
          parts: [
            { t: 'अखंड', m: 'unlimited' },
            { t: 'एक', m: 'one' },
            { t: 'रसं', m: 'nature (essence)' },
          ],
        },
        { t: 'वस्तु', m: 'entity' },
        {
          t: 'सच्चिदानन्दलक्षणम्',
          m: 'characterised by Existence-Consciousness-Bliss',
          parts: [
            { t: 'सत्', m: 'existence' },
            { t: 'चित्', m: 'consciousness' },
            { t: 'आनन्द', m: 'bliss' },
            { t: 'लक्षणम्', m: 'characterised by' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'इत्यविच्छिन्नचिंतेयं',
          m: 'thus, such uninterrupted reflection',
          parts: [
            { t: 'इति', m: 'thus' },
            { t: 'अविच्छिन्न', m: 'uninterrupted' },
            { t: 'चिंता', m: 'reflection' },
            { t: 'इयं', m: 'such' },
          ],
        },
        {
          t: 'समाधिर्मध्यमो',
          m: 'the middle (intermediate) Samādhi',
          parts: [
            { t: 'समाधिः', m: 'concentration (Samādhi)' },
            { t: 'मध्यमः', m: 'middle' },
          ],
        },
        { t: 'भवेत्', m: 'is' },
        { t: '॥ २८ ॥' },
      ],
    ],
    transliteration:
      'akhaṃḍaika-rasaṃ vastu sac-cid-ānanda-lakṣaṇam |\nity avicchinna-ciṃteyaṃ samādhir madhyamo bhavet || 28 ||',
    translation:
      'The entity which is (always) of the same nature and unlimited (by time, space etc.) and which is characterised by Existence-Consciousness-Bliss, is verily Brahman. Such uninterrupted reflection is called the intermediate absorption, that is, the Savikalpaka Samādhi associated with sound (object).',
  },
  {
    number: 29,
    lines: [
      [
        {
          t: 'स्तब्धीभावो',
          m: 'insensibility (to external objects)',
          parts: [
            { t: 'स्तब्धी', m: 'insensible' },
            { t: 'भावः', m: 'state' },
          ],
        },
        {
          t: 'रसास्वादात्तृतीयः',
          m: 'from the experience of Bliss, the third (kind of Samādhi)',
          parts: [
            { t: 'रसास्वादात्', m: 'from the experience of Bliss' },
            { t: 'तृतीयः', m: 'the third (kind of Samādhi)' },
          ],
        },
        {
          t: 'पूर्ववन्मतः',
          m: 'as in the previous instance, described',
          parts: [
            { t: 'पूर्ववत्', m: 'as in the previous instance' },
            { t: 'मतः', m: 'described' },
          ],
        },
        { t: '।' },
      ],
      [
        {
          t: 'एतैस्समाधिभिष्षड्भिर्नयेत्कालं',
          m: 'by these six kinds of Samādhi, should spend time',
          parts: [
            { t: 'एतैः', m: 'by these' },
            { t: 'समाधिभिः', m: 'kinds of Samādhi' },
            { t: 'षड्भिः', m: 'six' },
            { t: 'नयेत्', m: 'should spend' },
            { t: 'कालं', m: 'time' },
          ],
        },
        { t: 'निरंतरम्', m: 'always' },
        { t: '॥ २९ ॥' },
      ],
    ],
    transliteration:
      'stabdhī-bhāvo rasāsvādāt tṛtīyaḥ pūrvavan mataḥ |\netais samādhibhiṣ ṣaḍbhir nayet kālaṃ nirantaram || 29 ||',
    translation:
      'The insensibility of the mind (to external objects) as before, on account of the experience of Bliss, is designated as the third kind of Samādhi (Nirvikalpaka). The practitioner should uninterruptedly spend his time in these six kinds of Samādhi.',
  },
  {
    number: 30,
    lines: [
      [
        {
          t: 'देहाभिमाने',
          m: 'in the attachment to the body',
          parts: [
            { t: 'देह', m: 'body' },
            { t: 'अभिमाने', m: 'in the attachment' },
          ],
        },
        { t: 'गलिते', m: 'with the disappearance' },
        { t: 'विज्ञाते', m: 'with the realization' },
        {
          t: 'परमात्मनि',
          m: 'of the Supreme Self',
          parts: [
            { t: 'परम', m: 'Supreme' },
            { t: 'आत्मनि', m: 'in the Self' },
          ],
        },
        { t: '।' },
      ],
      [
        { t: 'यत्र', m: 'to whatever (object)' },
        { t: 'यत्र', m: 'to whatever (object)' },
        { t: 'मनो', m: 'mind' },
        { t: 'याति', m: 'goes' },
        { t: 'तत्र', m: 'there' },
        { t: 'तत्र', m: 'there' },
        { t: 'समाधयः', m: 'absorptions (Samādhi)' },
        { t: '॥ ३० ॥' },
      ],
    ],
    transliteration:
      'dehābhimāne galite vijñāte paramātmani |\nyatra yatra mano yāti tatra tatra samādhayaḥ || 30 ||',
    translation:
      'With the disappearance of the attachment to the body and with the realization of the Supreme Self, to whatever object the mind is directed one experiences Samādhi.',
  },
]
