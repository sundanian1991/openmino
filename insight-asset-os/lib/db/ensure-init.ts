import { initDb } from "./index";
import { seedPresetStyles } from "./queries";

let initialized = false;

/**
 * 确保数据库已初始化。在 Route Handler 中首次访问 DB 前调用。
 * 幂等：只在首次调用时执行 initDb + 种子数据。
 */
export function ensureDb(): void {
  if (!initialized) {
    initDb(process.env.INSIGHT_DB_PATH || "data/insight.db");
    seedPresetStyles();
    initialized = true;
  }
}
