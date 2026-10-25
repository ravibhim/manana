import { useEffect, useState } from 'react'
import type { AutoPlay } from '../App'
import { BOOK, VERSES } from '../data/ddv'
import { commentaryCta, type CommentaryCta } from '../lib/progress'
import { formatTime } from '../lib/time'

interface ContentsScreenProps {
  onSelect: (verseNumber: number, autoPlay?: AutoPlay) => void
}

export default function ContentsScreen({ onSelect }: ContentsScreenProps) {
  // Read after mount so the position saved when leaving a verse is already written.
  const [cta, setCta] = useState<CommentaryCta | null>(null)
  useEffect(() => setCta(commentaryCta()), [])

  return (
    <div className="mx-auto max-w-xl px-6 pt-14 pb-16">
      <header className="text-center">
        <h1 className="devanagari text-[2rem] leading-[2.75rem]">{BOOK.devanagari}</h1>
        <p className="mt-2 text-lg">{BOOK.title}</p>
        <p className="mt-1 text-sm text-[#3d2b1f]/60">{BOOK.subtitle}</p>
        <p className="mt-1 text-sm text-[#8b6914]">{BOOK.author}</p>
      </header>

      <ul className="mt-10 divide-y divide-[#3d2b1f]/10">
        {VERSES.map(v => (
          <li key={v.number}>
            <button
              onClick={() => onSelect(v.number)}
              className="flex w-full items-baseline gap-5 px-1 py-5 text-left active:bg-[#f0e6d4]/60 transition-colors"
            >
              <span className="w-6 shrink-0 text-right text-sm text-[#8b6914]">{v.number}</span>
              <span className="min-w-0">
                {v.lines.map((line, i) => (
                  <span key={i} className="devanagari block text-[1.125rem] leading-8">
                    {line.filter(t => t.m || t.t === '।').map(t => t.t).join(' ')}
                  </span>
                ))}
              </span>
            </button>
            {cta?.verse === v.number && (
              <button
                onClick={() => onSelect(cta.verse, cta.kind === 'resume' ? 'commentary' : 'recitation')}
                className="mb-5 ml-11 flex items-center gap-4 rounded-2xl bg-[#3d2b1f] px-4 py-3 text-left text-[#faf7f2] active:opacity-80 transition-opacity"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#faf7f2] text-[#3d2b1f]">▶</span>
                <span>
                  <span className="block font-medium">{cta.kind === 'resume' ? 'Resume Commentary' : 'Listen Recitation'}</span>
                  <span className="block text-sm text-[#faf7f2]/60">
                    {formatTime(cta.left)}{cta.kind === 'resume' && ' left'}
                  </span>
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm text-[#3d2b1f]/40">
        {VERSES.length} of {BOOK.totalVerses} verses added
      </p>
    </div>
  )
}
