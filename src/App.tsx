import { useState } from 'react'
import ContentsScreen from './components/ContentsScreen'
import VerseScreen from './components/VerseScreen'

export type AutoPlay = 'recitation' | 'commentary'

export default function App() {
  const [open, setOpen] = useState<{ verse: number; autoPlay?: AutoPlay } | null>(null)

  if (open === null) return <ContentsScreen onSelect={(verse, autoPlay) => setOpen({ verse, autoPlay })} />
  return (
    <VerseScreen
      key={open.verse}
      verseNumber={open.verse}
      autoPlay={open.autoPlay}
      onNavigate={verse => setOpen({ verse })}
      onBack={() => setOpen(null)}
    />
  )
}
