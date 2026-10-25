import { useEffect, useState } from 'react'
import { BOOK, VERSES, type ClipKind, type Token } from '../data/ddv'
import { useAudioPlayer, type Player } from '../hooks/useAudioPlayer'
import { commentaryResumeKey, STARTED_AFTER } from '../lib/progress'
import { formatTime } from '../lib/time'

interface VerseScreenProps {
  verseNumber: number
  /** Start this clip as soon as the screen opens (the user just tapped a button on the index page). */
  autoPlay?: ClipKind
  onNavigate: (verseNumber: number) => void
  onBack: () => void
}

/** The recitation is ~30s, so it is just a play/pause button whose background fills as it plays. */
function RecitationPill({ player }: { player: Player }) {
  const pct = player.duration ? (player.time / player.duration) * 100 : 0
  return (
    <button
      onClick={player.toggle}
      aria-label={player.playing ? 'Pause recitation' : 'Play recitation'}
      className="relative mx-auto flex items-center gap-3 overflow-hidden rounded-full bg-sand px-8 py-4 active:scale-95 transition-transform"
    >
      <span className="absolute inset-y-0 left-0 bg-sand-deep" style={{ width: `${pct}%` }} />
      <span className="relative text-3xl leading-none">{player.playing ? '❚❚' : '▶'}</span>
      <span className="relative text-lg font-medium">Recitation</span>
    </button>
  )
}

/** The commentary is long: it remembers where you were and can be seeked. */
function CommentaryCard({ player }: { player: Player }) {
  const pct = player.duration ? (player.time / player.duration) * 100 : 0
  const status = player.playing
    ? `${formatTime(player.time)} / ${formatTime(player.duration)}`
    : player.time > STARTED_AFTER
      ? `Resume · ${formatTime(player.time)} / ${formatTime(player.duration)}`
      : formatTime(player.duration)
  return (
    <div className="rounded-2xl bg-sand/60 px-5 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={player.toggle}
          aria-label={player.playing ? 'Pause commentary' : 'Play commentary'}
          className="h-14 w-14 shrink-0 rounded-full bg-ink text-lg text-paper active:scale-90 transition-transform"
        >
          {player.playing ? '❚❚' : '▶'}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs tracking-widest text-gold uppercase">Commentary</p>
          <p className="text-sm whitespace-nowrap text-ink/70">{status}</p>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={player.duration}
        step={0.5}
        value={player.time}
        onChange={e => player.seek(parseFloat(e.target.value))}
        aria-label="Commentary progress"
        className="seek mt-1 block w-full"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
    </div>
  )
}

export default function VerseScreen({ verseNumber, autoPlay, onNavigate, onBack }: VerseScreenProps) {
  const verse = VERSES.find(v => v.number === verseNumber)!
  const title = `${BOOK.title} · Verse ${verse.number}`
  const recitation = useAudioPlayer(verse.recitation?.src, { title: `${title} — Recitation`, artist: BOOK.lecturer })
  const commentary = useAudioPlayer(verse.commentary?.src, {
    title: `${title} — Commentary`,
    artist: BOOK.lecturer,
    resumeKey: commentaryResumeKey(verse.number),
  })
  useEffect(() => {
    if (autoPlay === 'commentary') commentary.toggle()
    if (autoPlay === 'recitation') recitation.toggle()
    // Deliberately only on open: later renders must not restart playback.
  }, [])
  const [activeWord, setActiveWord] = useState<Token | null>(null)

  const prev = VERSES.find(v => v.number === verseNumber - 1)
  const next = VERSES.find(v => v.number === verseNumber + 1)

  const navBtn = 'px-3 py-2 text-lg active:opacity-50 disabled:opacity-20'

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-xl flex-col px-6 pt-8 pb-20">
      <nav className="flex items-center justify-between text-ink/70">
        <button onClick={onBack} className="py-2 text-sm active:opacity-50">← Contents</button>
        <div className="flex items-center">
          <button className={navBtn} disabled={!prev} onClick={() => prev && onNavigate(prev.number)} aria-label="Previous verse">‹</button>
          <span className="w-24 text-center text-sm text-gold">Verse {verse.number} of {BOOK.totalVerses}</span>
          <button className={navBtn} disabled={!next} onClick={() => next && onNavigate(next.number)} aria-label="Next verse">›</button>
        </div>
      </nav>

      {/* The verse */}
      <section className="reader mt-10 text-center">
        {verse.recitation && <div className="flex"><RecitationPill player={recitation} /></div>}

        <div className="mt-8 devanagari text-[1.875rem] leading-[3rem]">
          {verse.lines.map((line, li) => (
            <p key={li}>
              {line.map((tok, ti) =>
                tok.m ? (
                  <button
                    key={ti}
                    onClick={() => setActiveWord(activeWord?.t === tok.t ? null : tok)}
                    className={`mx-[0.15em] rounded px-1 ${
                      activeWord?.t === tok.t
                        ? 'bg-gold/20'
                        : 'underline decoration-dotted decoration-gold/40 underline-offset-[0.5em]'
                    }`}
                  >
                    {tok.t}
                  </button>
                ) : (
                  <span key={ti} className="mx-[0.15em] text-ink/50">{tok.t}</span>
                ),
              )}
            </p>
          ))}
        </div>

        <p className="mt-6 whitespace-pre-line text-[1.0625rem] leading-7 text-ink/60 italic">
          {verse.transliteration}
        </p>
      </section>

      {/* Word meaning: only takes space once a word is tapped, pushing the content below down */}
      {activeWord && <div className="mt-6 flex items-center justify-center text-center">
        {activeWord.parts ? (
          <div className="text-[1.0625rem] leading-6">
            <p className="mb-2">{activeWord.m}</p>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {activeWord.parts.map((p, i) => (
                <li key={i}>
                  <span className="devanagari text-[1.25rem]">{p.t}</span>
                  <span className="mx-1.5 text-ink/40">—</span>
                  {p.m}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[1.0625rem] leading-6">
            <span className="devanagari text-[1.25rem]">{activeWord.t}</span>
            <span className="mx-2 text-ink/40">—</span>
            {activeWord.m}
          </p>
        )}
      </div>}

      {/* Audio */}
      {verse.commentary && <div className="mt-6"><CommentaryCard player={commentary} /></div>}

      {/* Translation */}
      <section className="mt-8">
        <h2 className="text-xs tracking-widest text-gold uppercase">Meaning</h2>
        <p className="mt-3 text-[1.0625rem] leading-7">{verse.translation}</p>
      </section>
    </div>
  )
}
