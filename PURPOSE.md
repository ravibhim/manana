# Manana

A personal tool for learning Advaita Vedanta through its texts, starting with *Drg-Drsya Viveka* (DDV).

The name is *manana*, reflection: the second stage of Vedanta study after hearing the teacher (*sravana*).

## Why

- Advance in the Advaita Vedanta learning journey
- Gain foundational clarity on who I am and who I am not
- Enjoy ancient wisdom

Meditation as a habit is a larger personal goal and is deliberately **not** a feature of this app.

## The idea

A new learning format that is convenient, easy and holistic. The unit is a **verse**. For each verse I can:

- **See it**: the verse at the center of the screen, calm and minimal, with the focus on the text
- **Hear it**: the Swami's recitation, a short clip (about 30 seconds) cut from his YouTube lecture
- **Unpack it**: tap a word to see its meaning
- **Understand it**: the translation, taken from the PDF
- **Listen to the Swami explain it**: the commentary for the verse, which can run many minutes, listened to passively. This is what makes learning relaxed.
- **Recite along**: with the Swami's recitation

Every verse is something to absorb and reflect on at my own pace. Nothing autoplays and nothing advances to the next verse by itself. The commentary waits for me to tap play.

## Principles

- **Verse-first and minimal.** Visual feel carried over from YouSing: warm, calm, focused on the text.
- **Works with the screen off.** Listening on walks, with lock-screen controls, ±15s skip, speed control, and resume where I stopped.
- **Hand-curated, not AI-generated.** This is not an AI product. Content comes from the book (the PDF) and the Swami's own lectures. I supply the timestamps through a simple curation form.
- **Only me, for now.** No accounts, no progress tracking, no word bank, no grammar layers, no word-by-word highlighting.
- **Generic format.** Text, then verse, then media. Nothing about it is specific to DDV, so other books can follow later.

## Lessons carried over from YouSing

YouSing (devotional songs, shelved) taught us what works: text at the center, tap-a-word meanings, audio-only playback so the screen can be off, and keeping the first version to one piece of content done well. What we are leaving behind: timing individual lyric lines and LLM-generated content.

## Sources

- `DDV.pdf`: *Drg-Drsya Viveka*, text with English translation and notes by Swami Nikhilananda (Sri Ramakrishna Asrama, Mysore, 1931)
- The Swami's YouTube lecture series on DDV. Verse recitation start times are in comments on the videos.

## Status

Working prototype of the verse screen for verse 1 with real recitation and commentary audio, tested with the screen locked. Verse 2 has text only.

**Data model:** deliberately simple. Verses live in one file (`src/data/ddv.ts`). Each audio clip records the YouTube video and start/end times it was cut from, so it can be re-cut. Audio files live in `public/audio/` and ship with the app: no database and no storage service. Listening position is kept in the browser.

**Not decided yet:** the curation experience (laptop only) and how to deploy the audio.
