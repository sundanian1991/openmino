export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS assets (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  type           TEXT NOT NULL DEFAULT 'Light',
  title          TEXT NOT NULL,
  insight        TEXT,
  summary        TEXT,
  key_points   TEXT,
  connections    TEXT,
  tags           TEXT,
  raw_content    TEXT,
  source_path    TEXT,
  source_type    TEXT,
  status         TEXT NOT NULL DEFAULT 'raw',
  evidence_level TEXT,
  is_contrarian  INTEGER DEFAULT 0,
  dimensions     TEXT,
  reasoning      TEXT,
  topic_id       INTEGER,
  timeline       TEXT,
  entities       TEXT,
  claims         TEXT,
  okf_type       TEXT,
  created_at     TEXT DEFAULT (datetime('now')),
  updated_at     TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS asset_links (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id    INTEGER NOT NULL,
  to_id      INTEGER NOT NULL,
  relation   TEXT NOT NULL,
  note       TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (from_id) REFERENCES assets(id),
  FOREIGN KEY (to_id)   REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS topics (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  description TEXT,
  parent_id   INTEGER,
  created_at  TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (parent_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS sources (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  path         TEXT UNIQUE NOT NULL,
  type         TEXT,
  hash         TEXT,
  last_scanned TEXT,
  asset_id     INTEGER,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS feedback (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id   INTEGER NOT NULL,
  content    TEXT,
  type       TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS kernel_entries (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  category        TEXT NOT NULL,
  judgment        TEXT NOT NULL,
  scenarios       TEXT,
  counterexamples TEXT,
  confidence      INTEGER DEFAULT 50,
  sort_order      INTEGER DEFAULT 0,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS writing_styles (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL UNIQUE,
  config     TEXT NOT NULL,
  is_preset  INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS asset_embeddings (
  asset_id  INTEGER PRIMARY KEY,
  embedding TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_topic ON assets(topic_id);
CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type);
CREATE INDEX IF NOT EXISTS idx_kernel_category ON kernel_entries(category);
CREATE INDEX IF NOT EXISTS idx_asset_links_from ON asset_links(from_id);
CREATE INDEX IF NOT EXISTS idx_asset_links_to ON asset_links(to_id);

-- 增量迁移：为旧库补列（新库已含）。SQLite 的 ADD COLUMN 不可 IF NOT EXISTS，
-- 用包在过程中的方式做幂等：列已存在时忽略报错。
`;

/**
 * 给已存在的旧库补 migration 列/表。每条都包 try/catch —— 列已存在时忽略报错。
 * 由 initDb 在 SCHEMA_SQL 之后执行。
 */
export const MIGRATION_SQL: string[] = [
  "ALTER TABLE assets ADD COLUMN summary TEXT",
  "ALTER TABLE assets ADD COLUMN key_points TEXT",
  "ALTER TABLE assets ADD COLUMN connections TEXT",
  "ALTER TABLE assets ADD COLUMN entities TEXT",
  "ALTER TABLE assets ADD COLUMN claims TEXT",
  "ALTER TABLE assets ADD COLUMN okf_type TEXT",
];
