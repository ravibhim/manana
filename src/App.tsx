import { useEffect, useRef, useState } from 'react'
import ContentsScreen from './components/ContentsScreen'
import VerseScreen from './components/VerseScreen'
import { VERSES, type ClipKind } from './data/ddv'

/** The address is the source of truth for the screen: `#/` is the index, `#/verse/5` is verse 5. */
function verseFromHash(): number | null {
  const match = location.hash.match(/^#\/verse\/(\d+)$/)
  const verse = match ? Number(match[1]) : null
  return VERSES.some(v => v.number === verse) ? verse : null
}

interface Route {
  verse: number | null
  /** Set only when the user just tapped a play button; never kept across a refresh. */
  autoPlay?: ClipKind
}

export default function App() {
  const [route, setRoute] = useState<Route>({ verse: verseFromHash() })
  const pendingPlay = useRef<{ verse: number; clip: ClipKind }>(undefined)

  useEffect(() => {
    const onHashChange = () => {
      const verse = verseFromHash()
      const play = pendingPlay.current
      pendingPlay.current = undefined
      setRoute({ verse, autoPlay: play?.verse === verse ? play.clip : undefined })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const open = (verse: number | null, autoPlay?: ClipKind) => {
    if (verse !== null && autoPlay) pendingPlay.current = { verse, clip: autoPlay }
    location.hash = verse === null ? '#/' : `#/verse/${verse}`
  }

  if (route.verse === null) return <ContentsScreen onSelect={open} />
  return (
    <VerseScreen
      key={route.verse}
      verseNumber={route.verse}
      autoPlay={route.autoPlay}
      onNavigate={open}
      onBack={() => open(null)}
    />
  )
}
