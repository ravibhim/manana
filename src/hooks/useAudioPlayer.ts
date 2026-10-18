import { useCallback, useEffect, useRef, useState } from 'react'

// Only one clip plays at a time.
let current: HTMLAudioElement | null = null

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
    if (!resumeKey) return
    try { localStorage.setItem(resumeKey, String(t)) } catch { /* storage unavailable */ }
  }, [resumeKey])

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.preload = 'metadata'
    audioRef.current = audio

    const onMeta = () => {
      setDuration(audio.duration)
      let resume = 0
      try { resume = parseFloat(localStorage.getItem(resumeKey ?? '') ?? '0') || 0 } catch { /* ignore */ }
      if (resumeKey && resume > 0 && resume < audio.duration - 2) {
        audio.currentTime = resume
        setTime(resume)
      }
    }
    let lastSaved = 0
    const onTime = () => {
      setTime(audio.currentTime)
      if (Math.abs(audio.currentTime - lastSaved) >= 3) {
        lastSaved = audio.currentTime
        saveResume(audio.currentTime)
      }
    }
    const onEnded = () => { setPlaying(false); setTime(0); saveResume(0) }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      // Before metadata loads currentTime is 0, which would wipe the saved position.
      if (audio.readyState >= 1) saveResume(audio.currentTime)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      if (current === audio) current = null
      audioRef.current = null
      setPlaying(false)
      setTime(0)
      setDuration(0)
    }
  }, [src, resumeKey, saveResume])

  const skip = useCallback((delta: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), audio.duration || 0)
  }, [])

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

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist })
      navigator.mediaSession.setActionHandler('play', () => { audio.play() })
      navigator.mediaSession.setActionHandler('pause', () => { audio.pause() })
      navigator.mediaSession.setActionHandler('seekbackward', () => skip(-15))
      navigator.mediaSession.setActionHandler('seekforward', () => skip(15))
    }
  }, [title, artist, skip])

  return { time, duration, playing, toggle, seek }
}

export type Player = ReturnType<typeof useAudioPlayer>
