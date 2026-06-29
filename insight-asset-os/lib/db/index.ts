import fs from "fs";
import path from "path";
import { createRequire } from "node:module";
import type { DatabaseSync } from "node:sqlite";
import { SCHEMA_SQL, MIGRATION_SQL } from "./schema";

// ESM 环境下用 createRequire 加载 node:sqlite，规避 Vite 5 把 node:
// scheme 当外部 URL 误解析的限制（静态 import 会被 Vite resolver 拒绝）。
const require = createRequire(import.meta.url);
const { DatabaseSync: DatabaseSyncCtor } = require("node:sqlite") as {
  DatabaseSync: typeof DatabaseSync;
};

const DEFAULT_DB_PATH = "data/insight.db";

let dbInstance: DatabaseSync | null = null;

export function initDb(dbPath: string = DEFAULT_DB_PATH): DatabaseSync {
  // 切换/重建前先关闭旧连接，避免句柄泄漏
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }

  // 确保目录存在（跨平台：用 path.dirname）
  const dir = path.dirname(dbPath);
  if (dir && dir !== ".") {
    fs.mkdirSync(dir, { recursive: true });
  }

  dbInstance = new DatabaseSyncCtor(dbPath);
  dbInstance.exec("PRAGMA journal_mode = WAL;");
  dbInstance.exec(SCHEMA_SQL);
  // 增量迁移：每条 ADD COLUMN 包 try/catch，列已存在时静默跳过
  for (const sql of MIGRATION_SQL) {
    try {
      dbInstance.exec(sql);
    } catch {
      // 列已存在 —— 正常情况，忽略
    }
  }
  return dbInstance;
}

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    throw new Error("DB 未初始化，请先调用 initDb()");
  }
  return dbInstance;
}

/** 测试专用：重置连接，允许切换 db 路径。传空串表示仅关闭。 */
export function resetDbForTest(dbPath: string): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
  if (dbPath) {
    // 删除已有文件确保每次打开的都是干净数据库
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    initDb(dbPath);
  }
}
