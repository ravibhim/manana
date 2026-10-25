# Sources

Lecture recordings that the audio clips in `public/audio/` are cut from. The recordings themselves are third-party content: they are kept locally, never committed.

**Local copies:** `~/Documents/manana-sources/<videoId>.webm` (audio-only, best available stream, downloaded with `yt-dlp -f bestaudio`). Back this folder up like any other personal files.

| Video ID | Title | Uploader | Uploaded | Length | Verses | SHA-256 of local copy |
|---|---|---|---|---|---|---|
| [`jx7O2zDqi6I`](https://www.youtube.com/watch?v=jx7O2zDqi6I) | Introduction to Vedanta Part 1 - Swami Sarvapriyananda - January 12 2016 | Vedanta Society of Southern California | 2016-03-16 | 1:04:45 | 1 | `3df9b784b97c2e43b3c36ff1549f8a88cddb13760c0ca78853a5a11c167fb649` |
| [`m6kALQlK6-Q`](https://www.youtube.com/watch?v=m6kALQlK6-Q) | Introduction to Vedanta Part 2 - Swami Sarvapriyananda - January 19, 2016 | Vedanta Society of Southern California | 2016-03-03 | 1:05:27 | 2-5 | `fbf9da8177187452ea73eddc91c9d54992be6d951ebe56f4d19d8f231b45011b` |
| [`Bxvc4eL3tag`](https://www.youtube.com/watch?v=Bxvc4eL3tag) | Introduction to Vedanta Part 3 - Swami Sarvapriyananda - February 02 2016 | Vedanta Society of Southern California | 2016-03-03 | 1:03:25 | 6-9 | `502886d77c39d3c850c98668a3cdf229c25a93f14811c6388f9f0f8e01e614c6` |
| [`ASH1rD2jOXk`](https://www.youtube.com/watch?v=ASH1rD2jOXk) | Introduction to Vedanta Part 4 - Swami Sarvapriyananda - February 16 2016 | Vedanta Society of Southern California | 2016-03-03 | 1:04:14 | 10-12 | `445ff1d74c48fd79b36af101fa8e10374ad65704bfdd64b334c94af00ec262fa` |

The verse text, word meanings and translations come from `DDV.pdf` (Swami Nikhilananda, Sri Ramakrishna Asrama, Mysore, 1931), also kept locally.

## Re-cutting a clip

Each clip's `videoId`, `start` and `end` (seconds) are recorded in `src/data/ddv.ts`.

```
ffmpeg -i ~/Documents/manana-sources/<videoId>.webm -ss <start> -t <end-start> \
  -vn -ac 1 -ar 44100 -c:a libmp3lame -b:a 64k public/audio/ddv-<N>-<recitation|commentary>.mp3
```

If the local copy is lost, re-download with `yt-dlp --js-runtimes node -f bestaudio -o '~/Documents/manana-sources/%(id)s.%(ext)s' <url>` and compare the checksum above (it may differ if YouTube re-encoded the video).
