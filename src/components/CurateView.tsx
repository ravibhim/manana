import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { formatTime, parseTime, parseVideoId } from '../lib/time'
import type { MediaKind } from '../lib/types'

// --- Minimal YouTube IFrame API wrapper (only what the curator needs) ---
interface YTPlayer {
  getCurrentTime(): number
  seekTo(seconds: number, allowSeekAhead: boolean): void
  loadVideoById(videoId: string): void
  destroy(): void
}
interface YTApi { Player: new (el: HTMLElement, opts: object) => YTPlayer }
declare global {
  interface Window { YT?: YTApi; onYouTubeIframeAPIReady?: () => void }
}

let ytReady: Promise<YTApi> | null = null
function loadYouTubeApi(): Promise<YTApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!ytReady) {
    ytReady = new Promise(resolve => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT!)
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    })
  }
  return ytReady
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

interface ClipState {
  video: string          // YouTube URL or id
  start: string
  end: string
  blob: Blob | null
  previewUrl: string | null
  status: string | null
}

const emptyClip = (): ClipState => ({ video: '', start: '', end: '', blob: null, previewUrl: null, status: null })

const inputCls = 'w-full rounded-lg border border-[#3d2b1f]/20 bg-white px-3 py-2'
const btnCls = 'rounded-lg bg-[#3d2b1f] px-4 py-2 text-sm text-[#faf7f2] disabled:opacity-40 active:scale-95 transition-transform'
const ghostBtnCls = 'rounded-lg border border-[#3d2b1f]/30 px-3 py-1.5 text-sm active:scale-95 transition-transform'

export default function CurateView() {
  const [bookTitle, setBookTitle] = useState('Drig Drishya Viveka')
  const [author, setAuthor] = useState('')
  const [number, setNumber] = useState('1')
  const [text, setText] = useState('')
  const [transliteration, setTransliteration] = useState('')
  const [wordsText, setWordsText] = useState('')
  const [summary, setSummary] = useState('')
  const [clips, setClips] = useState<Record<MediaKind, ClipState>>({
    recitation: emptyClip(),
    commentary: emptyClip(),
  })
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // YouTube player used to read the current time for the start/end fields.
  const playerHost = useRef<HTMLDivElement>(null)
  const player = useRef<YTPlayer | null>(null)
  const [playerVideo, setPlayerVideo] = useState('')

  const verseId = `${slug(bookTitle)}-${number}`

  useEffect(() => {
    const id = parseVideoId(playerVideo)
    if (!id || !playerHost.current) return
    let cancelled = false
    loadYouTubeApi().then(YT => {
      if (cancelled) return
      if (player.current) {
        player.current.loadVideoById(id)
      } else {
        const el = document.createElement('div')
        playerHost.current!.appendChild(el)
        player.current = new YT.Player(el, { videoId: id, width: '100%', height: '100%' })
      }
    })
    return () => { cancelled = true }
  }, [playerVideo])

  const updateClip = (kind: MediaKind, patch: Partial<ClipState>) =>
    setClips(prev => ({ ...prev, [kind]: { ...prev[kind], ...patch } }))

  const useCurrentTime = (kind: MediaKind, field: 'start' | 'end') => {
    if (!player.current) return
    updateClip(kind, { [field]: formatTime(player.current.getCurrentTime()) })
    // Both clips usually come from the video that is loaded in the player.
    if (!clips[kind].video && playerVideo) updateClip(kind, { video: playerVideo })
  }

  const loadExisting = async () => {
    setMessage('Loading...')
    const { data, error } = await supabase
      .from('verses')
      .select('*, books(title, author), verse_words(*), verse_media(*)')
      .eq('id', verseId)
      .maybeSingle()
    if (error || !data) {
      setMessage(error ? `Load failed: ${error.message}` : 'No saved verse with this book and number')
      return
    }
    setAuthor(data.books.author ?? '')
    setText(data.text)
    setTransliteration(data.transliteration)
    setSummary(data.summary)
    setWordsText(
      [...data.verse_words]
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((w: { word: string; meaning: string }) => `${w.word} = ${w.meaning}`)
        .join('\n'),
    )
    setMessage('Loaded. Audio is kept unless you extract a new clip.')
  }

  const splitWords = () => {
    const existing = new Set(wordsText.split('\n').map(l => l.split('=')[0].trim()).filter(Boolean))
    const tokens = text.split(/\s+/).map(t => t.replace(/[।॥,;.\-–—'"()]/g, '')).filter(Boolean)
    const missing = [...new Set(tokens)].filter(t => !existing.has(t))
    setWordsText(prev => [prev.trim(), ...missing.map(t => `${t} = `)].filter(Boolean).join('\n'))
  }

  const extract = async (kind: MediaKind) => {
    const clip = clips[kind]
    const videoId = parseVideoId(clip.video)
    const start = parseTime(clip.start)
    const end = parseTime(clip.end)
    if (!videoId) return updateClip(kind, { status: 'Enter a valid YouTube URL' })
    if (start === null || end === null || end <= start) return updateClip(kind, { status: 'Enter a valid start and end (end after start)' })

    updateClip(kind, { status: 'Extracting... (may take a minute)' })
    const res = await fetch('/api/clip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, start, end }),
    })
    if (!res.ok) {
      const body = await res.text()
      let msg = body
      try { msg = JSON.parse(body).error } catch { /* plain text */ }
      return updateClip(kind, { status: `Failed: ${msg.slice(0, 300)}` })
    }
    const blob = await res.blob()
    if (clip.previewUrl) URL.revokeObjectURL(clip.previewUrl)
    updateClip(kind, {
      blob,
      previewUrl: URL.createObjectURL(blob),
      status: `Extracted ${formatTime(end - start)} (${(blob.size / 1e6).toFixed(1)} MB). Not saved yet.`,
    })
  }

  const parseWords = () =>
    wordsText
      .split('\n')
      .map(l => l.split('='))
      .map(([w, ...rest]) => ({ word: w.trim(), meaning: rest.join('=').trim() }))
      .filter(w => w.word && w.meaning)

  const save = async () => {
    const n = parseInt(number, 10)
    if (!bookTitle.trim() || !n || !text.trim()) return setMessage('Book, verse number and verse text are required')
    setSaving(true)
    try {
      const bookId = slug(bookTitle)
      const check = <T,>(r: { error: { message: string } | null } & T, what: string) => {
        if (r.error) throw new Error(`${what}: ${r.error.message}`)
      }

      check(await supabase.from('books').upsert({ id: bookId, title: bookTitle.trim(), author: author.trim() || null }), 'book')
      check(await supabase.from('verses').upsert({
        id: verseId, book_id: bookId, number: n,
        text: text.trim(), transliteration: transliteration.trim(), summary: summary.trim(),
      }), 'verse')

      check(await supabase.from('verse_words').delete().eq('verse_id', verseId), 'clear words')
      const words = parseWords().map((w, i) => ({ verse_id: verseId, word: w.word, meaning: w.meaning, sort_order: i + 1 }))
      if (words.length) check(await supabase.from('verse_words').insert(words), 'words')

      for (const kind of ['recitation', 'commentary'] as MediaKind[]) {
        const clip = clips[kind]
        if (!clip.blob) continue
        const path = `${verseId}-${kind}.mp3`
        check(await supabase.storage.from('verse-audio').upload(path, clip.blob, { contentType: 'audio/mpeg', upsert: true }), `upload ${kind}`)
        const url = `${supabase.storage.from('verse-audio').getPublicUrl(path).data.publicUrl}?v=${Date.now()}`
        check(await supabase.from('verse_media').upsert({
          verse_id: verseId, kind, audio_url: url,
          source_video_id: parseVideoId(clip.video)!,
          start_time: parseTime(clip.start)!, end_time: parseTime(clip.end)!,
        }, { onConflict: 'verse_id,kind' }), `save ${kind}`)
        updateClip(kind, { blob: null, status: 'Saved' })
      }
      setMessage(`Saved ${verseId}`)
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const clipSection = (kind: MediaKind, heading: string) => {
    const clip = clips[kind]
    return (
      <section className="space-y-2 rounded-xl bg-[#f0e6d4]/50 p-4">
        <h2 className="font-medium">{heading}</h2>
        <input
          className={inputCls} placeholder="YouTube URL"
          value={clip.video}
          onChange={e => { updateClip(kind, { video: e.target.value }); if (!playerVideo) setPlayerVideo(e.target.value) }}
        />
        {(['start', 'end'] as const).map(field => (
          <div key={field} className="flex items-center gap-2">
            <span className="w-12 text-sm capitalize">{field}</span>
            <input
              className={inputCls} placeholder="12:37"
              value={clip[field]}
              onChange={e => updateClip(kind, { [field]: e.target.value })}
            />
            <button className={ghostBtnCls} onClick={() => useCurrentTime(kind, field)}>Use player time</button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <button className={btnCls} onClick={() => extract(kind)}>Extract &amp; preview</button>
          {clip.status && <span className="text-sm">{clip.status}</span>}
        </div>
        {clip.previewUrl && <audio controls src={clip.previewUrl} className="w-full" />}
      </section>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-5 py-8">
      <h1 className="text-2xl font-semibold">Curate a verse</h1>

      <div className="flex gap-2">
        <input className={inputCls} placeholder="Book" value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
        <input className={inputCls} placeholder="Author (optional)" value={author} onChange={e => setAuthor(e.target.value)} />
        <input className={`${inputCls} w-24`} placeholder="#" value={number} onChange={e => setNumber(e.target.value)} />
        <button className={ghostBtnCls} onClick={loadExisting}>Load</button>
      </div>

      <label className="block space-y-1">
        <span className="text-sm">Verse text (Devanagari; one line per line of the verse)</span>
        <textarea className={`${inputCls} text-xl`} rows={4} value={text} onChange={e => setText(e.target.value)} />
      </label>
      <label className="block space-y-1">
        <span className="text-sm">Transliteration</span>
        <textarea className={inputCls} rows={3} value={transliteration} onChange={e => setTransliteration(e.target.value)} />
      </label>
      <label className="block space-y-1">
        <span className="flex items-center justify-between text-sm">
          Word meanings, one per line as <code>word = meaning</code>
          <button className={ghostBtnCls} onClick={splitWords}>Add words from verse</button>
        </span>
        <textarea className={inputCls} rows={6} value={wordsText} onChange={e => setWordsText(e.target.value)} />
      </label>
      <label className="block space-y-1">
        <span className="text-sm">Summary (from the PDF)</span>
        <textarea className={inputCls} rows={4} value={summary} onChange={e => setSummary(e.target.value)} />
      </label>

      <section className="space-y-2">
        <h2 className="font-medium">Player (for picking times)</h2>
        <input className={inputCls} placeholder="YouTube URL" value={playerVideo} onChange={e => setPlayerVideo(e.target.value)} />
        <div ref={playerHost} className="aspect-video w-full overflow-hidden rounded-lg bg-black/5 [&_iframe]:h-full [&_iframe]:w-full" />
      </section>

      {clipSection('recitation', 'Recitation clip')}
      {clipSection('commentary', 'Commentary clip')}

      <div className="flex items-center gap-3">
        <button className={btnCls} disabled={saving} onClick={save}>{saving ? 'Saving...' : 'Save verse'}</button>
        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  )
}
