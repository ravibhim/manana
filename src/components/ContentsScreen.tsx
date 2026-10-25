import { useEffect, useState } from 'react'
import { BOOK, lineText, VERSES, type ClipKind } from '../data/ddv'
import { nextListenCta, type ListenCta } from '../lib/progress'

interface ContentsScreenProps {
  onSelect: (verseNumber: number, autoPlay?: ClipKind) => void
}

export default function ContentsScreen({ onSelect }: ContentsScreenProps) {
  // Read after mount so the position saved when leaving a verse is already written.
  const [cta, setCta] = useState<ListenCta | null>(null)
  useEffect(() => setCta(nextListenCta()), [])

  return (
    <div className="mx-auto max-w-xl px-6 pt-14 pb-16">
      <header className="text-center">
        <h1 className="devanagari text-[2rem] leading-[2.75rem]">{BOOK.devanagari}</h1>
        <p className="mt-2 text-lg">{BOOK.title}</p>
        <p className="mt-1 text-sm text-ink/60">{BOOK.subtitle}</p>
        <p className="mt-1 text-sm text-gold">{BOOK.author}</p>
        <img
          src={BOOK.lecturerPhoto.src}
          alt={BOOK.lecturer}
          className="mx-auto mt-6 h-16 w-16 rounded-full object-cover"
        />
        <p className="mt-3 text-sm">Recitation and commentary by {BOOK.lecturer}</p>
      </header>

      <ul className="mt-10 divide-y divide-ink/10">
        {VERSES.map(v => (
          <li key={v.number}>
            <button
              onClick={() => onSelect(v.number)}
              className="flex w-full items-baseline gap-5 px-1 py-5 text-left active:bg-sand/60 transition-colors"
            >
              <span className="w-6 shrink-0 text-right text-sm text-gold">{v.number}</span>
              <span className="min-w-0">
                {v.lines.map((line, i) => (
                  <span key={i} className="devanagari block text-[1.125rem] leading-8">
                    {lineText(line)}
                  </span>
                ))}
              </span>
            </button>
            {cta?.verse === v.number && (
              <button
                onClick={() => onSelect(cta.verse, cta.play)}
                className="mb-5 ml-11 flex items-center gap-4 rounded-2xl bg-ink px-4 py-3 text-left text-paper active:opacity-80 transition-opacity"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-ink">▶</span>
                <span>
                  <span className="block font-medium">{cta.label}</span>
                  <span className="block text-sm text-paper/60">{cta.detail}</span>
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm text-ink/40">
        {VERSES.length} of {BOOK.totalVerses} verses added
      </p>
    </div>
  )
}
