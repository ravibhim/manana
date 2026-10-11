import { formatTime } from '../lib/time'
import type { Player } from '../hooks/useAudioPlayer'

export function PlayPauseButton({ player, size = 'md', label }: { player: Player; size?: 'md' | 'lg'; label: string }) {
  const dim = size === 'lg' ? 'h-20 w-20 text-2xl' : 'h-14 w-14 text-lg'
  return (
    <button
      onClick={player.toggle}
      aria-label={player.playing ? `Pause ${label}` : `Play ${label}`}
      className={`${dim} shrink-0 rounded-full bg-[#3d2b1f] text-[#faf7f2] active:scale-90 transition-transform`}
    >
      {player.playing ? '❚❚' : '▶'}
    </button>
  )
}

export function Scrubber({ player, label }: { player: Player; label: string }) {
  return (
    <div>
      <input
        type="range"
        min={0}
        max={player.duration}
        step={0.5}
        value={player.time}
        onChange={e => player.seek(parseFloat(e.target.value))}
        aria-label={`${label} progress`}
        className="w-full accent-[#8b6914]"
      />
      <div className="flex justify-between text-xs text-[#3d2b1f]/60">
        <span>{formatTime(player.time)}</span>
        <span>−{formatTime(player.duration - player.time)}</span>
      </div>
    </div>
  )
}

export function SkipSpeedRow({ player, big }: { player: Player; big?: boolean }) {
  const pill = `${big ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'} rounded-full bg-[#f0e6d4] active:scale-90 transition-transform`
  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={() => player.skip(-15)} className={pill}>−15s</button>
      <button onClick={() => player.skip(15)} className={pill}>+15s</button>
      <button onClick={player.cycleSpeed} className={pill}>{player.speed}x</button>
    </div>
  )
}
