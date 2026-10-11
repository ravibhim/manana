import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { execFile } from 'child_process'
import { readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'

// Dev-only: cuts an audio clip out of a YouTube video with yt-dlp + ffmpeg.
// POST /api/clip { videoId, start, end } (seconds) -> audio/mpeg
function clipPlugin(): Plugin {
  return {
    name: 'clip',
    configureServer(server) {
      server.middlewares.use('/api/clip', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        let body = ''
        for await (const chunk of req) body += chunk
        const { videoId, start, end } = JSON.parse(body)

        const valid =
          typeof videoId === 'string' && /^[\w-]{6,20}$/.test(videoId) &&
          Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start
        if (!valid) {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'videoId, start and end (end > start) are required' }))
          return
        }

        const base = path.join(tmpdir(), `la-clip-${videoId}-${Date.now()}`)
        const outPath = `${base}.mp3`
        try {
          await new Promise<void>((resolve, reject) => {
            execFile('yt-dlp', [
              '-x', '--audio-format', 'mp3',
              '--download-sections', `*${start}-${end}`,
              '--force-keyframes-at-cuts',
              '--postprocessor-args', 'ffmpeg:-ac 1 -b:a 64k',
              '--no-playlist',
              '-o', `${base}.%(ext)s`,
              `https://www.youtube.com/watch?v=${videoId}`,
            ], { timeout: 300000 }, (err, _stdout, stderr) => {
              if (err) reject(new Error(stderr || err.message))
              else resolve()
            })
          })
          const mp3 = await readFile(outPath)
          await unlink(outPath).catch(() => {})
          res.setHeader('Content-Type', 'audio/mpeg')
          res.setHeader('Content-Length', mp3.length)
          res.end(mp3)
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: e instanceof Error ? e.message : 'Clip extraction failed' }))
        }
      })
    },
  }
}

export default defineConfig({
  server: { port: 5200, strictPort: true },
  plugins: [react(), clipPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
