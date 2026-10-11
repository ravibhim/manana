import type { Player } from '../hooks/useAudioPlayer'
import type { Verse } from '../data/ddv'
import { BOOK } from '../data/ddv'
import { PlayPauseButton, Scrubber, SkipSpeedRow } from './PlayerControls'

interface NowPlayingProps {
  verse: Verse
  player: Player
  onClose: () => void
}

// Full-screen commentary player: large, calm controls for listening on a walk.
export default function NowPlaying({ verse, player, onClose }: NowPlayingProps) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col bg-[#faf7f2] px-8 pt-10 pb-12">
      <button onClick={onClose} className="self-start text-sm text-[#3d2b1f]/60 active:opacity-50">⌄ Close</button>

      <div className="mt-6 text-center">
        <p className="text-sm tracking-wide text-[#8b6914]">Verse {verse.number}</p>
        <div className="devanagari mt-4 text-[1.375rem] leading-9 text-[#3d2b1f]/80">
          {verse.lines.map((line, i) => (
            <p key={i}>{line.map(t => t.t).join(' ')}</p>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-8">
        <div className="text-center">
          <p className="text-lg">Swami’s commentary</p>
          <p className="text-sm text-[#3d2b1f]/60">{BOOK.title}</p>
        </div>
        <Scrubber player={player} label="Commentary" />
        <div className="flex justify-center">
          <PlayPauseButton player={player} size="lg" label="commentary" />
        </div>
        <SkipSpeedRow player={player} big />
      </div>
    </div>
  )
}
