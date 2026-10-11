import { BOOK, VERSES } from '../data/ddv'

interface ContentsScreenProps {
  onSelect: (verseNumber: number) => void
}

export default function ContentsScreen({ onSelect }: ContentsScreenProps) {
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
                <span className="devanagari block truncate text-[1.125rem] leading-8">
                  {v.lines[0].filter(t => t.m).map(t => t.t).join(' ')}
                </span>
                <span className="mt-0.5 block truncate text-sm text-[#3d2b1f]/60">{v.translation}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm text-[#3d2b1f]/40">
        {VERSES.length} of {BOOK.totalVerses} verses added
      </p>
    </div>
  )
}
