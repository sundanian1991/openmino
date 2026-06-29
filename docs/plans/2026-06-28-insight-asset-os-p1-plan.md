# Insight Asset OS · P1 骨架实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭起 Next.js 15 项目骨架，跑通 DB 初始化、设置页（LLM/vault/Kernel 配置）、LLM 客户端连通测试——形成一个能起服务、能配置、能验证 LLM 连通的最小可运行版本。

**Architecture:** 独立子目录 `insight-asset-os/`（自带 package.json，与仓库根 package.json 隔离）。Next.js App Router，页面用 Client Component + fetch 调 API（避免 better-sqlite3 在 SSR 预渲染时被调用）。DB 仅在 Route Handler 中访问。

**Tech Stack:** Next.js 15 / React 19 / TypeScript / Tailwind CSS / shadcn/ui / better-sqlite3 / 原生 fetch 调 OpenAI 兼容接口

**关联设计文档：** `docs/plans/2026-06-28-insight-asset-os-design.md`

---

## File Structure（本阶段产出文件）

| 文件 | 职责 |
|------|------|
| `insight-asset-os/package.json` | 依赖与脚本 |
| `insight-asset-os/tsconfig.json` | TS 配置 |
| `insight-asset-os/next.config.ts` | Next 配置 |
| `insight-asset-os/.gitignore` | 忽略 node_modules/data |
| `insight-asset-os/lib/db/schema.ts` | 建表 SQL |
| `insight-asset-os/lib/db/index.ts` | 连接单例 + 初始化 |
| `insight-asset-os/lib/db/queries.ts` | settings 读写查询层 |
| `insight-asset-os/lib/llm/client.ts` | OpenAI 兼容客户端 + Kernel 注入 |
| `insight-asset-os/lib/llm/test-connection.ts` | 连通测试逻辑 |
| `insight-asset-os/app/layout.tsx` | 根布局 + 侧边栏 |
| `insight-asset-os/app/page.tsx` | 仪表盘占位 |
| `insight-asset-os/app/settings/page.tsx` | 设置页 |
| `insight-asset-os/app/api/settings/route.ts` | GET/PUT 配置 |
| `insight-asset-os/app/api/llm-test/route.ts` | LLM 连通测试 |
| `insight-asset-os/lib/**/*.test.ts` | 单元测试 |

---

## 前置说明

- **Node 版本**：需 Node 18.18+（Next.js 15 要求）。先执行 `node -v` 确认。
- **better-sqlite3 原生模块**：macOS arm64 通常有预编译二进制，`npm install` 直接可用。若失败，运行 `npx node-gyp rebuild` 或降级 `sql.js`。
- **测试框架**：用 Vitest（比 Jest 对 ESM/TS 友好）。
- **shadcn/ui**：P1 只需少量组件（button/input/textarea/card/sonner 提示），手动引入 Radix + cva，或用 `npx shadcn@latest init`。本计划走手动引入路径以减少交互式脚手架不确定性。

---

## Task 1: 项目脚手架

**Files:**
- Create: `insight-asset-os/package.json`
- Create: `insight-asset-os/tsconfig.json`
- Create: `insight-asset-os/next.config.ts`
- Create: `insight-asset-os/.gitignore`

- [ ] **Step 1: 确认 Node 版本**

Run: `node -v`
Expected: v18.18.0 或更高。若低于，提示用户升级。

- [ ] **Step 2: 创建 package.json**

`insight-asset-os/package.json`:
```json
{
  "name": "insight-asset-os",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "better-sqlite3": "^11.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/better-sqlite3": "^7.6.12",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 3: 创建 tsconfig.json**

`insight-asset-os/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: 创建 next.config.ts 与 .gitignore**

`insight-asset-os/next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
```

`insight-asset-os/.gitignore`:
```
node_modules/
.next/
out/
data/
*.db
*.db-journal
.env*.local
next-env.d.ts
```

- [ ] **Step 5: 安装依赖**

Run: `cd insight-asset-os && npm install`
Expected: 安装成功，better-sqlite3 编译通过（无 node-gyp 错误）。若 better-sqlite3 失败，先 `npm install better-sqlite3 --build-from-source`。

- [ ] **Step 6: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: scaffold insight-asset-os next.js project"
```

---

## Task 2: Tailwind 配置与全局样式

**Files:**
- Create: `insight-asset-os/tailwind.config.ts`
- Create: `insight-asset-os/postcss.config.mjs`
- Create: `insight-asset-os/app/globals.css`
- Create: `insight-asset-os/lib/utils.ts`

- [ ] **Step 1: 创建 tailwind.config.ts**

`insight-asset-os/tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: 创建 postcss.config.mjs**

`insight-asset-os/postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 3: 创建 globals.css（暗色优先，本地工具风格）**

`insight-asset-os/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: 22 22 24;
  --fg: 229 229 231;
  --muted: 115 115 120;
  --border: 42 42 46;
  --accent: 96 165 250;
}

html, body {
  background-color: rgb(var(--bg));
  color: rgb(var(--fg));
  font-family: ui-sans-serif, system-ui, -apple-system, "PingFang SC", sans-serif;
}
```

- [ ] **Step 4: 创建 lib/utils.ts（cn 工具函数）**

`insight-asset-os/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add tailwind config and global styles"
```

---

## Task 3: DB 层 — Schema（TDD）

**Files:**
- Create: `insight-asset-os/lib/db/schema.ts`
- Create: `insight-asset-os/vitest.config.ts`
- Test: `insight-asset-os/lib/db/schema.test.ts`

- [ ] **Step 1: 创建 vitest.config.ts**

`insight-asset-os/vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 2: 写失败测试**

`insight-asset-os/lib/db/schema.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { SCHEMA_SQL } from "./schema";

describe("schema", () => {
  it("包含 assets 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS assets");
  });

  it("包含 topics 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS topics");
  });

  it("包含 sources 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS sources");
  });

  it("包含 feedback 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS feedback");
  });

  it("包含 settings 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS settings");
  });

  it("assets 表包含 evidence_level 字段", () => {
    expect(SCHEMA_SQL).toContain("evidence_level");
  });
});
```

- [ ] **Step 3: 运行测试确认失败**

Run: `cd insight-asset-os && npx vitest run lib/db/schema.test.ts`
Expected: FAIL — `Cannot find module './schema'`

- [ ] **Step 4: 实现 schema.ts**

`insight-asset-os/lib/db/schema.ts`:
```typescript
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS assets (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  type           TEXT NOT NULL DEFAULT 'Light',
  title          TEXT NOT NULL,
  insight        TEXT,
  tags           TEXT,
  raw_content    TEXT,
  source_path    TEXT,
  source_type    TEXT,
  status         TEXT NOT NULL DEFAULT 'raw',
  evidence_level TEXT,
  is_contrarian  INTEGER DEFAULT 0,
  dimensions     TEXT,
  topic_id       INTEGER,
  timeline       TEXT,
  created_at     TEXT DEFAULT (datetime('now')),
  updated_at     TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (topic_id) REFERENCES topics(id)
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

CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_topic ON assets(topic_id);
CREATE INDEX IF NOT EXISTS idx_assets_type ON assets(type);
`;
```

- [ ] **Step 5: 运行测试确认通过**

Run: `cd insight-asset-os && npx vitest run lib/db/schema.test.ts`
Expected: PASS（6 个测试全过）

- [ ] **Step 6: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add db schema sql with tests"
```

---

## Task 4: DB 层 — 连接单例与初始化（TDD）

**Files:**
- Create: `insight-asset-os/lib/db/index.ts`
- Test: `insight-asset-os/lib/db/index.test.ts`

- [ ] **Step 1: 写失败测试**

`insight-asset-os/lib/db/index.test.ts`:
```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getDb, initDb, resetDbForTest } from "./index";
import fs from "fs";
import path from "path";
import os from "os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-test-"));
const dbPath = path.join(tmpDir, "test.db");

describe("db index", () => {
  beforeEach(() => {
    resetDbForTest(dbPath);
  });

  afterEach(() => {
    resetDbForTest(dbPath);
  });

  it("initDb 创建所有表", () => {
    initDb(dbPath);
    const db = getDb();
    const tables = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      )
      .all() as { name: string }[];
    const names = tables.map((t) => t.name);
    expect(names).toContain("assets");
    expect(names).toContain("topics");
    expect(names).toContain("sources");
    expect(names).toContain("feedback");
    expect(names).toContain("settings");
  });

  it("initDb 幂等（重复调用不报错）", () => {
    initDb(dbPath);
    expect(() => initDb(dbPath)).not.toThrow();
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `cd insight-asset-os && npx vitest run lib/db/index.test.ts`
Expected: FAIL — `Cannot find module './index'`

- [ ] **Step 3: 实现 index.ts**

`insight-asset-os/lib/db/index.ts`:
```typescript
import Database from "better-sqlite3";
import type { Database as DBType } from "better-sqlite3";
import { SCHEMA_SQL } from "./schema";

const DEFAULT_DB_PATH = "data/insight.db";

let dbInstance: DBType | null = null;
let currentPath = DEFAULT_DB_PATH;

export function initDb(dbPath: string = DEFAULT_DB_PATH): DBType {
  currentPath = dbPath;
  // 确保目录存在
  const dir = dbPath.substring(0, dbPath.lastIndexOf("/"));
  if (dir && dir !== dbPath) {
    const fs = require("fs");
    fs.mkdirSync(dir, { recursive: true });
  }
  dbInstance = new Database(dbPath);
  dbInstance.pragma("journal_mode = WAL");
  dbInstance.exec(SCHEMA_SQL);
  return dbInstance;
}

export function getDb(): DBType {
  if (!dbInstance) {
    throw new Error("DB 未初始化，请先调用 initDb()");
  }
  return dbInstance;
}

/** 测试专用：重置连接，允许切换 db 路径 */
export function resetDbForTest(dbPath: string): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
  if (dbPath) {
    initDb(dbPath);
  }
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `cd insight-asset-os && npx vitest run lib/db/index.test.ts`
Expected: PASS（2 个测试全过）

- [ ] **Step 5: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add db connection singleton and init"
```

---

## Task 5: DB 层 — settings 查询层（TDD）

**Files:**
- Create: `insight-asset-os/lib/db/queries.ts`
- Test: `insight-asset-os/lib/db/queries.test.ts`

- [ ] **Step 1: 写失败测试**

`insight-asset-os/lib/db/queries.test.ts`:
```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resetDbForTest } from "./index";
import {
  getSetting,
  setSetting,
  getAllSettings,
  LLM_CONFIG_KEY,
  VAULT_PATH_KEY,
  KERNEL_KEY,
} from "./queries";
import fs from "fs";
import path from "path";
import os from "os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-q-"));
const dbPath = path.join(tmpDir, "test.db");

describe("settings queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(dbPath));

  it("getSetting 未设置时返回 null", () => {
    expect(getSetting("not_exist")).toBeNull();
  });

  it("setSetting/getSetting 往返", () => {
    setSetting("foo", "bar");
    expect(getSetting("foo")).toBe("bar");
  });

  it("setSetting 覆盖已存在值", () => {
    setSetting("foo", "1");
    setSetting("foo", "2");
    expect(getSetting("foo")).toBe("2");
  });

  it("导出的 key 常量正确", () => {
    expect(LLM_CONFIG_KEY).toBe("llm_config");
    expect(VAULT_PATH_KEY).toBe("vault_path");
    expect(KERNEL_KEY).toBe("insight_kernel");
  });

  it("getAllSettings 返回所有键值", () => {
    setSetting("a", "1");
    setSetting("b", "2");
    const all = getAllSettings();
    expect(all.a).toBe("1");
    expect(all.b).toBe("2");
  });
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `cd insight-asset-os && npx vitest run lib/db/queries.test.ts`
Expected: FAIL — `Cannot find module './queries'`

- [ ] **Step 3: 实现 queries.ts**

`insight-asset-os/lib/db/queries.ts`:
```typescript
import { getDb } from "./index";

export const LLM_CONFIG_KEY = "llm_config";
export const VAULT_PATH_KEY = "vault_path";
export const KERNEL_KEY = "insight_kernel";

export function getSetting(key: string): string | null {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  getDb()
    .prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, value);
}

export function getAllSettings(): Record<string, string> {
  const rows = getDb()
    .prepare("SELECT key, value FROM settings")
    .all() as { key: string; value: string }[];
  const result: Record<string, string> = {};
  for (const r of rows) result[r.key] = r.value;
  return result;
}

export interface LLMConfig {
  baseURL: string;
  apiKey: string;
  model: string;
}

export const DEFAULT_LLM_CONFIG: LLMConfig = {
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
  apiKey: "",
  model: "glm-4-plus",
};

export function getLLMConfig(): LLMConfig {
  const raw = getSetting(LLM_CONFIG_KEY);
  if (!raw) return { ...DEFAULT_LLM_CONFIG };
  try {
    return { ...DEFAULT_LLM_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_LLM_CONFIG };
  }
}

export function setLLMConfig(config: LLMConfig): void {
  setSetting(LLM_CONFIG_KEY, JSON.stringify(config));
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `cd insight-asset-os && npx vitest run lib/db/queries.test.ts`
Expected: PASS（5 个测试全过）

- [ ] **Step 5: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add settings query layer with llm config helpers"
```

---

## Task 6: LLM 客户端 + Kernel 注入（TDD）

**Files:**
- Create: `insight-asset-os/lib/llm/client.ts`
- Create: `insight-asset-os/lib/llm/kernel.ts`
- Test: `insight-asset-os/lib/llm/kernel.test.ts`
- Test: `insight-asset-os/lib/llm/client.test.ts`

- [ ] **Step 1: 写 kernel 注入失败测试**

`insight-asset-os/lib/llm/kernel.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { injectKernel } from "./kernel";

describe("injectKernel", () => {
  it("无 kernel 时原样返回", () => {
    expect(injectKernel("你是助手", "")).toBe("你是助手");
    expect(injectKernel("你是助手", null)).toBe("你是助手");
  });

  it("有 kernel 时追加立场段", () => {
    const result = injectKernel("你是助手", "判断1\n判断2");
    expect(result).toContain("你是助手");
    expect(result).toContain("判断1");
    expect(result).toContain("判断2");
    expect(result).toContain("个人判断立场");
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `cd insight-asset-os && npx vitest run lib/llm/kernel.test.ts`
Expected: FAIL — `Cannot find module './kernel'`

- [ ] **Step 3: 实现 kernel.ts**

`insight-asset-os/lib/llm/kernel.ts`:
```typescript
export function injectKernel(basePrompt: string, kernel: string | null | undefined): string {
  if (!kernel || !kernel.trim()) return basePrompt;
  return `${basePrompt}

## 个人判断立场（Insight Kernel）
${kernel.trim()}

请在输出中保持与上述立场一致的个人判断风格。`;
}
```

- [ ] **Step 4: 运行确认通过**

Run: `cd insight-asset-os && npx vitest run lib/llm/kernel.test.ts`
Expected: PASS（2 个测试）

- [ ] **Step 5: 写 client 失败测试（mock fetch）**

`insight-asset-os/lib/llm/client.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { chat, type LLMConfig } from "./client";

const config: LLMConfig = {
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
  apiKey: "test-key",
  model: "glm-4-plus",
};

describe("chat", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("调用正确的 endpoint 并返回内容", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: "你好" } }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );

    const result = await chat(
      [{ role: "user", content: "打招呼" }],
      config,
      "我的判断立场"
    );

    expect(result).toBe("你好");
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://open.bigmodel.cn/api/paas/v4/chat/completions");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.model).toBe("glm-4-plus");
    // kernel 应注入到 system message
    const sysMsg = body.messages.find((m: any) => m.role === "system");
    expect(sysMsg.content).toContain("我的判断立场");
  });

  it("HTTP 错误时抛出带状态码的异常", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "bad key" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
    );
    await expect(chat([{ role: "user", content: "hi" }], config)).rejects.toThrow(
      /401/
    );
  });
});
```

- [ ] **Step 6: 运行确认失败**

Run: `cd insight-asset-os && npx vitest run lib/llm/client.test.ts`
Expected: FAIL — `Cannot find module './client'`

- [ ] **Step 7: 实现 client.ts**

`insight-asset-os/lib/llm/client.ts`:
```typescript
import { injectKernel } from "./kernel";

export interface LLMConfig {
  baseURL: string;
  apiKey: string;
  model: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chat(
  messages: ChatMessage[],
  config: LLMConfig,
  kernel?: string
): Promise<string> {
  const finalMessages: ChatMessage[] = [...messages];
  // 若首条是 system 且有 kernel，注入；否则前置注入
  if (finalMessages.length > 0 && finalMessages[0].role === "system") {
    finalMessages[0] = {
      role: "system",
      content: injectKernel(finalMessages[0].content, kernel),
    };
  } else if (kernel && kernel.trim()) {
    finalMessages.unshift({
      role: "system",
      content: injectKernel("", kernel),
    });
  }

  const url = `${config.baseURL.replace(/\/$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: finalMessages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`LLM 请求失败 ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM 返回内容为空");
  }
  return content;
}
```

- [ ] **Step 8: 运行确认通过**

Run: `cd insight-asset-os && npx vitest run lib/llm/`
Expected: PASS（kernel 2 个 + client 2 个，共 4 个）

- [ ] **Step 9: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add llm client with kernel injection and tests"
```

---

## Task 7: LLM 连通测试逻辑（TDD）

**Files:**
- Create: `insight-asset-os/lib/llm/test-connection.ts`
- Test: `insight-asset-os/lib/llm/test-connection.test.ts`

- [ ] **Step 1: 写失败测试**

`insight-asset-os/lib/llm/test-connection.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { testConnection } from "./test-connection";
import { chat } from "./client";

vi.mock("./client", () => ({
  chat: vi.fn(),
}));

describe("testConnection", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("成功时返回 ok=true", async () => {
    (chat as ReturnType<typeof vi.fn>).mockResolvedValue("你好，我是助手");
    const result = await testConnection({
      baseURL: "https://x",
      apiKey: "k",
      model: "m",
    });
    expect(result.ok).toBe(true);
    expect(result.reply).toContain("你好");
  });

  it("失败时返回 ok=false 和错误信息", async () => {
    (chat as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("LLM 请求失败 401: bad"));
    const result = await testConnection({
      baseURL: "https://x",
      apiKey: "k",
      model: "m",
    });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("401");
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `cd insight-asset-os && npx vitest run lib/llm/test-connection.test.ts`
Expected: FAIL — `Cannot find module './test-connection'`

- [ ] **Step 3: 实现 test-connection.ts**

`insight-asset-os/lib/llm/test-connection.ts`:
```typescript
import { chat, type LLMConfig } from "./client";

export interface ConnectionResult {
  ok: boolean;
  reply?: string;
  error?: string;
}

export async function testConnection(config: LLMConfig): Promise<ConnectionResult> {
  try {
    const reply = await chat(
      [
        {
          role: "system",
          content: "你是一个连通测试助手。用一句简短中文回复确认你能正常工作。",
        },
        { role: "user", content: "ping" },
      ],
      config
    );
    return { ok: true, reply };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
```

- [ ] **Step 4: 运行确认通过**

Run: `cd insight-asset-os && npx vitest run lib/llm/test-connection.test.ts`
Expected: PASS（2 个测试）

- [ ] **Step 5: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add llm connection test helper"
```

---

## Task 8: 根布局与侧边栏

**Files:**
- Create: `insight-asset-os/app/layout.tsx`
- Create: `insight-asset-os/app/page.tsx`
- Create: `insight-asset-os/components/sidebar.tsx`

- [ ] **Step 1: 创建侧边栏组件**

`insight-asset-os/components/sidebar.tsx`:
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Inbox, Library, FolderTree, Settings } from "lucide-react";

const NAV = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/intake", label: "采集", icon: Inbox },
  { href: "/assets", label: "资产库", icon: Library },
  { href: "/topics", label: "主题", icon: FolderTree },
  { href: "/settings", label: "设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 border-r border-border flex flex-col">
      <div className="px-5 py-5 text-sm font-semibold tracking-wide text-fg">
        Insight Asset OS
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-white/5 text-accent"
                  : "text-muted hover:text-fg hover:bg-white/5"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: 创建根布局**

`insight-asset-os/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Insight Asset OS",
  description: "把零散经验变成可调用的判断力",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: 创建仪表盘占位页**

`insight-asset-os/app/page.tsx`:
```tsx
export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-2">仪表盘</h1>
      <p className="text-muted text-sm">
        把零散经验变成可调用的判断力。P1 阶段：请先到「设置」配置 LLM 与文件夹路径。
      </p>
    </div>
  );
}
```

- [ ] **Step 4: 验证 dev 启动**

Run: `cd insight-asset-os && npm run dev`
Expected: 服务在 http://localhost:3000 启动，页面显示侧边栏 + 仪表盘占位文本，无报错。手动在浏览器访问确认后 Ctrl+C 停止。

- [ ] **Step 5: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add root layout with sidebar navigation"
```

---

## Task 9: Settings API 路由

**Files:**
- Create: `insight-asset-os/app/api/settings/route.ts`
- Create: `insight-asset-os/lib/db/ensure-init.ts`

- [ ] **Step 1: 创建 DB 确保初始化 helper**

`insight-asset-os/lib/db/ensure-init.ts`:
```typescript
import { initDb } from "./index";

let initialized = false;

export function ensureDb(): void {
  if (!initialized) {
    initDb(process.env.INSIGHT_DB_PATH || "data/insight.db");
    initialized = true;
  }
}
```

- [ ] **Step 2: 创建 settings route**

`insight-asset-os/app/api/settings/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import {
  getAllSettings,
  setSetting,
  LLM_CONFIG_KEY,
  VAULT_PATH_KEY,
  KERNEL_KEY,
  getLLMConfig,
  setLLMConfig,
  type LLMConfig,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  ensureDb();
  const llm = getLLMConfig();
  const vaultPath = getAllSettings()[VAULT_PATH_KEY] ?? "";
  const kernel = getAllSettings()[KERNEL_KEY] ?? "";
  // 出于安全，返回时遮蔽 apiKey
  return NextResponse.json({
    llm: { ...llm, apiKey: llm.apiKey ? llm.apiKey.slice(0, 4) + "****" : "" },
    llmApiKeySet: Boolean(llm.apiKey),
    vaultPath,
    insightKernel: kernel,
  });
}

export async function PUT(req: NextRequest) {
  ensureDb();
  const body = await req.json();
  const { llm, vaultPath, insightKernel } = body as {
    llm?: Partial<LLMConfig> & { apiKey?: string };
    vaultPath?: string;
    insightKernel?: string;
  };

  if (llm) {
    const current = getLLMConfig();
    const merged: LLMConfig = {
      baseURL: llm.baseURL ?? current.baseURL,
      model: llm.model ?? current.model,
      // apiKey 若为空或含 **** 表示不改
      apiKey:
        llm.apiKey && !llm.apiKey.includes("****")
          ? llm.apiKey
          : current.apiKey,
    };
    setLLMConfig(merged);
  }
  if (typeof vaultPath === "string") setSetting(VAULT_PATH_KEY, vaultPath);
  if (typeof insightKernel === "string") setSetting(KERNEL_KEY, insightKernel);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add settings api route"
```

---

## Task 10: LLM 连通测试 API 路由

**Files:**
- Create: `insight-asset-os/app/api/llm-test/route.ts`

- [ ] **Step 1: 创建 llm-test route**

`insight-asset-os/app/api/llm-test/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getLLMConfig, KERNEL_KEY, getAllSettings } from "@/lib/db/queries";
import { testConnection } from "@/lib/llm/test-connection";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  // 支持用请求体里的临时配置测试（未保存前先测）
  const current = getLLMConfig();
  const config = {
    baseURL: body.baseURL ?? current.baseURL,
    apiKey: body.apiKey && !body.apiKey.includes("****") ? body.apiKey : current.apiKey,
    model: body.model ?? current.model,
  };

  if (!config.apiKey) {
    return NextResponse.json(
      { ok: false, error: "未配置 API Key，请先填写" },
      { status: 400 }
    );
  }

  const kernel = getAllSettings()[KERNEL_KEY] ?? undefined;
  const result = await testConnection(config);
  return NextResponse.json(result);
}
```

- [ ] **Step 2: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add llm connection test api route"
```

---

## Task 11: 设置页 UI

**Files:**
- Create: `insight-asset-os/app/settings/page.tsx`

- [ ] **Step 1: 创建设置页**

`insight-asset-os/app/settings/page.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";

interface SettingsData {
  llm: { baseURL: string; apiKey: string; model: string };
  llmApiKeySet: boolean;
  vaultPath: string;
  insightKernel: string;
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [savedHint, setSavedHint] = useState(false);

  async function load() {
    const res = await fetch("/api/settings");
    setData(await res.json());
  }
  useEffect(() => {
    load();
  }, []);

  async function save() {
    setSaving(true);
    setSavedHint(false);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        llm: data?.llm,
        vaultPath: data?.vaultPath,
        insightKernel: data?.insightKernel,
      }),
    });
    setSaving(false);
    setSavedHint(true);
    await load();
    setTimeout(() => setSavedHint(false), 2000);
  }

  async function testLlm() {
    setTesting(true);
    setTestResult(null);
    const res = await fetch("/api/llm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data?.llm ?? {}),
    });
    const result = await res.json();
    setTesting(false);
    setTestResult(
      result.ok ? `✓ 连通成功：${result.reply}` : `✗ 失败：${result.error}`
    );
  }

  function update(field: "baseURL" | "apiKey" | "model", value: string) {
    setData((d) => (d ? { ...d, llm: { ...d.llm, [field]: value } } : d));
  }

  if (!data) return <div className="p-8 text-muted">加载中…</div>;

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <h1 className="text-2xl font-semibold">设置</h1>

      <section className="space-y-4">
        <h2 className="text-base font-medium border-b border-border pb-2">
          LLM 服务
        </h2>
        <Field label="Base URL">
          <input
            className="input"
            value={data.llm.baseURL}
            onChange={(e) => update("baseURL", e.target.value)}
          />
        </Field>
        <Field label="API Key">
          <input
            type="password"
            className="input"
            placeholder={data.llmApiKeySet ? "已设置（不改可留空）" : ""}
            value={data.llm.apiKey}
            onChange={(e) => update("apiKey", e.target.value)}
          />
        </Field>
        <Field label="模型">
          <input
            className="input"
            value={data.llm.model}
            onChange={(e) => update("model", e.target.value)}
          />
        </Field>
        <div className="flex items-center gap-3">
          <button onClick={testLlm} disabled={testing} className="btn-secondary">
            {testing ? "测试中…" : "测试连通"}
          </button>
          {testResult && (
            <span className="text-sm text-muted">{testResult}</span>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium border-b border-border pb-2">
          文件夹路径（Vault）
        </h2>
        <Field label="本地文件夹绝对路径">
          <input
            className="input"
            placeholder="/Users/you/Documents/notes"
            value={data.vaultPath}
            onChange={(e) =>
              setData((d) => (d ? { ...d, vaultPath: e.target.value } : d))
            }
          />
        </Field>
        <p className="text-xs text-muted">
          采集时会递归扫描该目录下的 md/txt/pdf/docx/html 文件。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-medium border-b border-border pb-2">
          Insight Kernel（个人判断立场）
        </h2>
        <textarea
          className="input min-h-[120px] font-mono text-sm"
          placeholder={"每行一条你的核心判断，例如：\n管理是放大器，不是解决方案\n供应商的核心能力是响应速度，不是成本"}
          value={data.insightKernel}
          onChange={(e) =>
            setData((d) =>
              d ? { ...d, insightKernel: e.target.value } : d
            )
          }
        />
        <p className="text-xs text-muted">
          这些判断会注入到所有 LLM 调用，让输出保持你的个人风格。
        </p>
      </section>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? "保存中…" : "保存设置"}
        </button>
        {savedHint && (
          <span className="text-sm text-accent">✓ 已保存</span>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: rgb(30 30 33);
          border: 1px solid rgb(var(--border));
          border-radius: 6px;
          padding: 8px 12px;
          color: rgb(var(--fg));
          outline: none;
        }
        .input:focus {
          border-color: rgb(var(--accent));
        }
        .btn-primary {
          background: rgb(var(--accent));
          color: #0a0a0a;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 6px;
        }
        .btn-primary:disabled {
          opacity: 0.5;
        }
        .btn-secondary {
          background: transparent;
          border: 1px solid rgb(var(--border));
          color: rgb(var(--fg));
          padding: 8px 16px;
          border-radius: 6px;
        }
        .btn-secondary:disabled {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-muted mb-1.5">{label}</label>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: 验证页面加载**

Run: `cd insight-asset-os && npm run dev`
Expected: 浏览器访问 http://localhost:3000/settings 能看到三个分区（LLM / Vault / Kernel），输入框可编辑。Ctrl+C 停止。

- [ ] **Step 3: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: add settings page with llm test and kernel input"
```

---

## Task 12: P1 端到端验证与全量测试

**Files:**
- Create: `insight-asset-os/README.md`

- [ ] **Step 1: 运行全量单元测试**

Run: `cd insight-asset-os && npm test`
Expected: 所有测试通过（schema 6 + db index 2 + queries 5 + kernel 2 + client 2 + test-connection 2 = 19 个）

- [ ] **Step 2: 端到端验证**

Run: `cd insight-asset-os && npm run dev`

手动验证清单：
1. 访问 http://localhost:3000 → 看到仪表盘占位 + 侧边栏
2. 点「设置」→ 看到 LLM/Vault/Kernel 三个分区
3. 填入真实 GLM API Key（baseURL 用默认，model 用 glm-4-plus）
4. 点「测试连通」→ 看到 ✓ 连通成功 + LLM 回复
5. 在 Kernel 框随便填一条 → 点「保存设置」→ 看到 ✓ 已保存
6. 刷新页面 → Kernel 内容仍在（持久化生效）
7. Ctrl+C 停止

- [ ] **Step 3: 创建 README**

`insight-asset-os/README.md`:
```markdown
# Insight Asset OS

本地优先的个人思想资产工作台 —— 把零散经验变成可调用的判断力。

## 当前阶段：P1 骨架

- ✅ Next.js 15 项目骨架
- ✅ SQLite 数据库（better-sqlite3）
- ✅ 设置页：LLM 配置 + Vault 路径 + Insight Kernel
- ✅ LLM 客户端（OpenAI 兼容，默认 GLM）+ 连通测试
- ⏭️ P2 采集（文件夹 → 轻量卡）
- ⏭️ P3 整理（轻量卡 → 资产卡）
- ⏭️ P4 体验增强

## 开发

\`\`\`bash
npm install
npm run dev      # http://localhost:3000
npm test         # 单元测试
\`\`\`

## 配置

1. 打开「设置」页
2. 填写 LLM 的 Base URL / API Key / 模型（默认 GLM）
3. 点「测试连通」验证
4. 填写 Vault 文件夹路径
5. 可选：填写 Insight Kernel（个人判断立场）

## 技术栈

Next.js 15 · React 19 · TypeScript · Tailwind · better-sqlite3 · OpenAI 兼容 LLM
```

- [ ] **Step 4: Commit**

```bash
git add insight-asset-os/
git commit -m "feat: complete p1 skeleton with readme and e2e verification"
```

---

## Self-Review

**1. Spec 覆盖（P1 部分）：**
- ✅ Next.js 15 项目骨架 → Task 1-2
- ✅ DB schema（5 表）→ Task 3
- ✅ DB 连接 + 初始化 → Task 4
- ✅ settings 查询层 + LLM 配置 helper → Task 5
- ✅ LLM 客户端 + Kernel 注入 → Task 6
- ✅ LLM 连通测试 → Task 7
- ✅ 设置页 UI（LLM/Vault/Kernel）→ Task 8-11
- ✅ 端到端验证 → Task 12

**2. 占位符扫描：** 无 TBD/TODO；每个代码步骤含完整代码；测试含真实断言。

**3. 类型一致性：** `LLMConfig` 在 queries.ts、client.ts、test-connection.ts、route.ts 中字段名一致（baseURL/apiKey/model）；`ConnectionResult`（ok/reply/error）在 test-connection.ts 与 route.ts 一致。

**4. P2-P4 大纲（到达时细化）：**
- **P2 采集**：4 个 indexer（md/pdf/docx/html）+ scan API + intake API + 轻量卡列表页
- **P3 整理**：资产库列表 + 详情页 + 校准编辑 + upgrade API + classify API + 主题页
- **P4 体验**：仪表盘统计 + 待办看板 + 全文检索 + 导出 md + 进化时间线

---

## Execution Handoff

Plan complete and saved to `docs/plans/2026-06-28-insight-asset-os-p1-plan.md`. 两种执行方式：

1. **Subagent-Driven（推荐）** — 每个 Task 派发独立子代理，任务间审查，快速迭代
2. **Inline Execution** — 在当前会话直接执行，批量执行 + 检查点审查

请选择执行方式。
