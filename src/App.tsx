import { useState } from 'react'
import ContentsScreen from './components/ContentsScreen'
import VerseScreen from './components/VerseScreen'

export default function App() {
  const [verseNumber, setVerseNumber] = useState<number | null>(null)

  if (verseNumber === null) return <ContentsScreen onSelect={setVerseNumber} />
  return <VerseScreen key={verseNumber} verseNumber={verseNumber} onNavigate={setVerseNumber} onBack={() => setVerseNumber(null)} />
}
