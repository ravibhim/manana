// Accepts "757", "12:37" or "1:02:03" and returns seconds, or null if invalid.
export function parseTime(input: string): number | null {
  const s = input.trim()
  if (!s) return null
  const parts = s.split(':').map(p => p.trim())
  if (parts.length > 3 || parts.some(p => !/^\d+(\.\d+)?$/.test(p))) return null
  return parts.reduce((acc, p) => acc * 60 + parseFloat(p), 0)
}

export function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}

export function parseVideoId(input: string): string | null {
  const s = input.trim()
  if (/^[\w-]{11}$/.test(s)) return s
  try {
    const url = new URL(s)
    if (url.hostname === 'youtu.be') return url.pathname.slice(1) || null
    return url.searchParams.get('v')
  } catch {
    return null
  }
}
