-- LearnAdvait: books -> verses -> words / media clips.
-- Shares a Supabase project with YouSing; table names do not overlap.

CREATE TABLE books (
  id     TEXT PRIMARY KEY,
  title  TEXT NOT NULL,
  author TEXT
);

CREATE TABLE verses (
  id              TEXT PRIMARY KEY,
  book_id         TEXT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  number          INTEGER NOT NULL,
  text            TEXT NOT NULL,
  transliteration TEXT NOT NULL DEFAULT '',
  summary         TEXT NOT NULL DEFAULT '',
  UNIQUE (book_id, number)
);
CREATE INDEX idx_verses_book_id ON verses(book_id);

CREATE TABLE verse_words (
  id         SERIAL PRIMARY KEY,
  verse_id   TEXT NOT NULL REFERENCES verses(id) ON DELETE CASCADE,
  word       TEXT NOT NULL,
  meaning    TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);
CREATE INDEX idx_verse_words_verse_id ON verse_words(verse_id);

CREATE TABLE verse_media (
  id              SERIAL PRIMARY KEY,
  verse_id        TEXT NOT NULL REFERENCES verses(id) ON DELETE CASCADE,
  kind            TEXT NOT NULL CHECK (kind IN ('recitation', 'commentary')),
  audio_url       TEXT NOT NULL,
  source_video_id TEXT NOT NULL,
  start_time      REAL NOT NULL,
  end_time        REAL NOT NULL,
  UNIQUE (verse_id, kind)
);

-- Personal tool, no auth yet: open policies (same stance as YouSing).
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE verse_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE verse_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public all" ON books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all" ON verses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all" ON verse_words FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all" ON verse_media FOR ALL USING (true) WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('verse-audio', 'verse-audio', true);
CREATE POLICY "verse-audio insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'verse-audio');
CREATE POLICY "verse-audio select" ON storage.objects FOR SELECT USING (bucket_id = 'verse-audio');
CREATE POLICY "verse-audio update" ON storage.objects FOR UPDATE USING (bucket_id = 'verse-audio');
