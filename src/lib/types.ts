export type MediaKind = 'recitation' | 'commentary'

export interface VerseWord {
  word: string
  meaning: string
}

export interface VerseMedia {
  kind: MediaKind
  audioUrl: string
}

export interface Verse {
  id: string
  bookId: string
  bookTitle: string
  number: number
  text: string
  transliteration: string
  summary: string
  words: VerseWord[]
  media: VerseMedia[]
}

export interface VerseSummary {
  id: string
  bookTitle: string
  number: number
  transliteration: string
}
