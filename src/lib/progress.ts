import { VERSES } from '../data/ddv'

/** A commentary counts as done once it has played to within this many seconds of the end. */
export const DONE_MARGIN = 5
/** Positions this small are accidental taps, not listening. */
export const STARTED_AFTER = 2

export const resumeKey = (verseNumber: number) => `la-resume-ddv-${verseNumber}-commentary`

export interface CommentaryCta {
  /** 'resume' continues the verse's commentary; 'listen' starts the verse with its recitation. */
  kind: 'resume' | 'listen'
  verse: number
  /** Seconds still to hear: commentary left for 'resume', recitation length for 'listen'. */
  left: number
}

function savedPosition(verseNumber: number): number {
  try { return parseFloat(localStorage.getItem(resumeKey(verseNumber)) ?? '0') || 0 } catch { return 0 }
}

/**
 * What the index page should offer next. Finds the latest verse whose commentary has been listened to:
 * resume it if unfinished, otherwise offer the recitation of the next verse.
 */
export function commentaryCta(): CommentaryCta | null {
  const withCommentary = VERSES.filter(v => v.commentary)
  const length = (v: (typeof VERSES)[number]) => v.commentary!.end - v.commentary!.start
  const position = new Map(withCommentary.map(v => [v.number, savedPosition(v.number)]))

  const latest = [...withCommentary].reverse().find(v => position.get(v.number)! > STARTED_AFTER)
  if (latest) {
    const pos = position.get(latest.number)!
    if (pos < length(latest) - DONE_MARGIN) return { kind: 'resume', verse: latest.number, left: length(latest) - pos }
  }
  // Having finished (or not started) commentary, offer to start the next verse from its recitation.
  const next = VERSES.find(v => v.recitation && v.number > (latest?.number ?? 0))
  return next ? { kind: 'listen', verse: next.number, left: next.recitation!.end - next.recitation!.start } : null
}
