import { useCallback, useEffect, useRef, useState } from 'react'
import { DONE_MARGIN, readPosition, writePosition } from '../lib/progress'

// Only one clip plays at a time.
let current: HTMLAudioElement | null = null

const SKIP_SECONDS = 15
const SAVE_EVERY_SECONDS = 3

/** Lets the lock screen and headphones show the clip's title and control it. */
function registerMediaSession(audio: HTMLAudioElement, title: string, artist: string) {
  if (!('mediaSession' in navigator)) return
  const skipBy = (delta: number) => {
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), audio.duration || 0)
  }
  navigator.mediaSession.metadata = new MediaMetadata({ title, artist })
  navigator.mediaSession.setActionHandler('play', () => { audio.play() })
  navigator.mediaSession.setActionHandler('pause', () => { audio.pause() })
  navigator.mediaSession.setActionHandler('seekbackward', () => skipBy(-SKIP_SECONDS))
  navigator.mediaSession.setActionHandler('seekforward', () => skipBy(SKIP_SECONDS))
}

interface Options {
  /** Shown on the lock screen. */
  title: string
  artist: string
  /** When set, playback position is remembered across sessions under this key. */
  resumeKey?: string
}

export function useAudioPlayer(src: string | undefined, { title, artist, resumeKey }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)

  const saveResume = useCallback((t: number) => {
    if (resumeKey) writePosition(resumeKey, t)
  }, [resumeKey])

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.preload = 'metadata'
    audioRef.current = audio

    const onMeta = () => {
      setDuration(audio.duration)
      // A finished clip (within DONE_MARGIN of the end) starts over instead of resuming.
      const resume = resumeKey ? readPosition(resumeKey) : 0
      if (resume > 0 && resume < audio.duration - DONE_MARGIN) {
        audio.currentTime = resume
        setTime(resume)
      }
    }
    let lastSaved = 0
    const onTime = () => {
      setTime(audio.currentTime)
      if (Math.abs(audio.currentTime - lastSaved) >= SAVE_EVERY_SECONDS) {
        lastSaved = audio.currentTime
        saveResume(audio.currentTime)
      }
    }
    // Keep the end position (not 0) so the index page can tell this commentary was finished.
    const onEnded = () => { setPlaying(false); setTime(0); saveResume(audio.duration) }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    const listeners = { loadedmetadata: onMeta, timeupdate: onTime, ended: onEnded, play: onPlay, pause: onPause }
    for (const [type, listener] of Object.entries(listeners)) audio.addEventListener(type, listener)

    return () => {
      // Before metadata loads currentTime is 0, which would wipe the saved position.
      if (audio.readyState >= 1) saveResume(audio.currentTime)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      for (const [type, listener] of Object.entries(listeners)) audio.removeEventListener(type, listener)
      if (current === audio) current = null
      audioRef.current = null
      setPlaying(false)
      setTime(0)
      setDuration(0)
    }
  }, [src, resumeKey, saveResume])

  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t
    setTime(t)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    if (current && current !== audio) current.pause()
    current = audio
    audio.play().catch(() => setPlaying(false))
    registerMediaSession(audio, title, artist)
  }, [title, artist])

  return { time, duration, playing, toggle, seek }
}

export type Player = ReturnType<typeof useAudioPlayer>
