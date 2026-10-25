import { clipLength, VERSES, type ClipKind } from '../data/ddv'
import { formatTime } from './time'

/** A commentary counts as done once it has played to within this many seconds of the end. */
export const DONE_MARGIN = 5
/** Positions this small are accidental taps, not listening. */
export const STARTED_AFTER = 2

export const commentaryResumeKey = (verseNumber: number) => `la-resume-ddv-${verseNumber}-commentary`

export function readPosition(key: string): number {
  try { return parseFloat(localStorage.getItem(key) ?? '0') || 0 } catch { return 0 }
}

export function writePosition(key: string, seconds: number) {
  try { localStorage.setItem(key, String(seconds)) } catch { /* storage unavailable */ }
}

/** What the index page offers next, and which clip to start when it is tapped. */
export interface ListenCta {
  verse: number
  label: string
  play: ClipKind
  /** Time left to hear (resume) or the recitation length (listen). */
  detail: string
}

/**
 * Finds the latest verse whose commentary has been listened to: resume it if unfinished,
 * otherwise offer the recitation of the next verse.
 */
export function nextListenCta(): ListenCta | null {
  const heard = VERSES.flatMap(v => (v.commentary ? [{ verse: v.number, clip: v.commentary }] : []))
    .map(c => ({ ...c, position: readPosition(commentaryResumeKey(c.verse)) }))
    .filter(c => c.position > STARTED_AFTER)
  const latest = heard.at(-1)

  if (latest) {
    const left = clipLength(latest.clip) - latest.position
    if (left > DONE_MARGIN) {
      return { verse: latest.verse, label: 'Resume Commentary', play: 'commentary', detail: `${formatTime(left)} left` }
    }
  }
  const next = VERSES.flatMap(v => (v.recitation ? [{ verse: v.number, clip: v.recitation }] : []))
    .find(r => r.verse > (latest?.verse ?? 0))
  if (!next) return null
  return { verse: next.verse, label: 'Listen Recitation', play: 'recitation', detail: formatTime(clipLength(next.clip)) }
}
