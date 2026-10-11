import { useState } from 'react'
import { BOOK, VERSES } from '../data/ddv'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { formatTime } from '../lib/time'
import NowPlaying from './NowPlaying'
import { PlayPauseButton, Scrubber, SkipSpeedRow } from './PlayerControls'

interface VerseScreenProps {
  verseNumber: number
  onNavigate: (verseNumber: number) => void
  onBack: () => void
}

export default function VerseScreen({ verseNumber, onNavigate, onBack }: VerseScreenProps) {
  const verse = VERSES.find(v => v.number === verseNumber)!
  const title = `${BOOK.title} · Verse ${verse.number}`
  const recitation = useAudioPlayer(verse.recitation?.src, { title: `${title} — Recitation`, artist: BOOK.author })
  const commentary = useAudioPlayer(verse.commentary?.src, {
    title: `${title} — Commentary`,
    artist: 'Swami',
    resumeKey: `la-resume-ddv-${verse.number}-commentary`,
  })
  const [activeWord, setActiveWord] = useState<{ t: string; m: string } | null>(null)
  const [showRoman, setShowRoman] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const prev = VERSES.find(v => v.number === verseNumber - 1)
  const next = VERSES.find(v => v.number === verseNumber + 1)

  // Starting one clip stops the other.

  const navBtn = 'px-3 py-2 text-lg active:opacity-50 disabled:opacity-20'

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-xl flex-col px-6 pt-8 pb-20">
      <nav className="flex items-center justify-between text-[#3d2b1f]/70">
        <button onClick={onBack} className="py-2 text-sm active:opacity-50">← Contents</button>
        <div className="flex items-center">
          <button className={navBtn} disabled={!prev} onClick={() => prev && onNavigate(prev.number)} aria-label="Previous verse">‹</button>
          <span className="w-24 text-center text-sm text-[#8b6914]">Verse {verse.number} of {BOOK.totalVerses}</span>
          <button className={navBtn} disabled={!next} onClick={() => next && onNavigate(next.number)} aria-label="Next verse">›</button>
        </div>
      </nav>

      {/* The verse */}
      <section className="reader mt-10 text-center">
        <div className="devanagari text-[1.875rem] leading-[3rem]">
          {verse.lines.map((line, li) => (
            <p key={li}>
              {line.map((tok, ti) =>
                tok.m ? (
                  <button
                    key={ti}
                    onClick={() => setActiveWord(activeWord?.t === tok.t ? null : { t: tok.t, m: tok.m! })}
                    className={`mx-[0.15em] rounded px-1 ${
                      activeWord?.t === tok.t
                        ? 'bg-[#8b6914]/20'
                        : 'underline decoration-dotted decoration-[#8b6914]/40 underline-offset-[0.5em]'
                    }`}
                  >
                    {tok.t}
                  </button>
                ) : (
                  <span key={ti} className="mx-[0.15em] text-[#3d2b1f]/50">{tok.t}</span>
                ),
              )}
            </p>
          ))}
        </div>

        {showRoman && (
          <p className="mt-5 whitespace-pre-line text-[1.0625rem] leading-7 text-[#3d2b1f]/60 italic">
            {verse.transliteration}
          </p>
        )}
      </section>

      {/* Word meaning slot: fixed height so the page doesn't jump */}
      <div className="mt-6 flex h-16 items-center justify-center text-center">
        {activeWord ? (
          <p className="text-[1.0625rem] leading-6">
            <span className="devanagari text-[1.25rem]">{activeWord.t}</span>
            <span className="mx-2 text-[#3d2b1f]/40">—</span>
            {activeWord.m}
          </p>
        ) : (
          <p className="text-sm text-[#3d2b1f]/40">Tap an underlined word</p>
        )}
      </div>

      <button
        onClick={() => setShowRoman(!showRoman)}
        className="self-center text-xs text-[#3d2b1f]/40 active:opacity-50"
      >
        {showRoman ? 'Hide transliteration' : 'Show transliteration'}
      </button>

      {/* Recitation */}
      {verse.recitation && <section className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f0e6d4]/60 px-5 py-4">
        <PlayPauseButton player={recitation} label="recitation" />
        <div className="min-w-0 flex-1">
          <p className="font-medium">Recitation</p>
          <Scrubber player={recitation} label="Recitation" />
        </div>
      </section>}

      {/* Translation */}
      <section className="mt-10">
        <h2 className="text-xs tracking-widest text-[#8b6914] uppercase">Meaning</h2>
        <p className="mt-3 text-[1.0625rem] leading-7">{verse.translation}</p>
      </section>

      {/* Commentary */}
      {verse.commentary && <section className="mt-12 rounded-2xl bg-[#3d2b1f] px-5 py-5 text-[#faf7f2]">
        <div className="flex items-center gap-4">
          <button
            onClick={commentary.toggle}
            aria-label={commentary.playing ? 'Pause commentary' : 'Play commentary'}
            className="h-14 w-14 shrink-0 rounded-full bg-[#faf7f2] text-lg text-[#3d2b1f] active:scale-90 transition-transform"
          >
            {commentary.playing ? '❚❚' : '▶'}
          </button>
          <button onClick={() => setExpanded(true)} className="min-w-0 flex-1 text-left">
            <p className="font-medium">Swami’s commentary</p>
            <p className="text-sm text-[#faf7f2]/60">{formatTime(commentary.duration)} · tap to expand</p>
          </button>
        </div>
        <div className="mt-3 [&_input]:accent-[#c9a227] [&_div]:text-[#faf7f2]/60">
          <Scrubber player={commentary} label="Commentary" />
        </div>
        <div className="mt-3 [&_button]:bg-[#faf7f2]/15 [&_button]:text-[#faf7f2]">
          <SkipSpeedRow player={commentary} />
        </div>
      </section>}

      {expanded && (
        <NowPlaying
          verse={verse}
          player={commentary}
          onClose={() => setExpanded(false)}
        />
      )}
    </div>
  )
}
