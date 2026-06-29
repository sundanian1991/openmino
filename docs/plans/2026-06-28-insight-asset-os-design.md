# Insight Asset OS — 设计文档（MVP · 采集→整理闭环）

> **创建日期**：2026-06-28
> **状态**：设计已确认，待生成实现计划
> **范围**：MVP，聚焦「采集 → 整理」闭环
> **参考来源**：用户提供的产品规格（Insight Asset OS 架构与业务篇海报）+ `AGENT_TYPES_REFERENCE.md` + `SKILL.md`

---

## 一、目标与范围

### 产品定位（一句话）
一款本地优先的个人思想资产工作台，打开后读取本地文件夹，把零散经验（笔记/公众号/书摘/PDF/Word）整理成可调用的判断力资产。

### MVP 范围（已与用户确认）

| 维度 | 决策 |
|------|------|
| 功能范围 | **采集 → 整理** 闭环。写作输出、图谱、Kernel 自动重生 → **不做** |
| 技术形态 | **Next.js 15 Web 应用**（本地起 dev server，浏览器访问 localhost） |
| LLM | **可配置 OpenAI 兼容**，默认 GLM，设置页填 base_url + key + 模型 |
| 文件类型 | md/txt + 公众号(HTML/URL) + PDF + Word(docx)，解析器做齐 |
| 验收 | 采集→整理闭环可用：扫描→生成轻量卡→校准→升级资产卡→主题分类 |
| Insight Kernel | **做最简版**（设置页手填个人判断立场 + 注入所有 LLM system prompt），不做自动重生 |
| 项目位置 | 当前仓库根目录新建 `insight-asset-os/` 子目录 |

### 明确不做（YAGNI）
- ❌ 写作输出模块（写作骨架/改稿/发布）
- ❌ 多模态/试写/AI 味自检
- ❌ 图谱可视化
- ❌ Electron 桌面打包（用 Web 形态替代）
- ❌ Insight Kernel 自动重生（仅手动维护）
- ❌ 用户系统/多用户/云同步

---

## 二、架构

### 总体方案：Next.js + SQLite（方案 A）

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | Next.js 15 (App Router) + React 19 + TypeScript | 原规格指定；server 端可直接读文件系统 |
| 样式 | Tailwind CSS + shadcn/ui | 卡片/对话框/表格组件齐全，快速搭 UI |
| 数据库 | better-sqlite3 | 同步 API，Next.js server 端友好，贴近原规格"SQLite + vault" |
| PDF 解析 | pdf-parse | 轻量，纯 JS |
| Word 解析 | mammoth | docx → 纯文本/html 业界标准 |
| HTML/公众号 | cheerio | 解析本地导出的公众号 HTML |
| LLM | 原生 fetch 调 OpenAI 兼容接口 | 不引 SDK，减少依赖，兼容任意服务 |

### 选型权衡（为什么选 A）

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| **A. Next.js + SQLite（选）** | 结构化查询强、资产卡关系清晰、贴近原规格 | better-sqlite3 原生模块需编译 | ✅ |
| B. Next.js + 纯 Markdown vault | 人类可读、Obsidian 兼容 | 主题/关系查询弱、全文检索要自建 | ✗ |
| C. SQLite + vault 双存储 | 兼顾两者 | 复杂度翻倍，MVP 不需要 | ✗ |

### 四层架构（贴近原规格）

```
UI 层     | Next.js 页面：仪表盘 / 采集 / 资产库 / 资产详情 / 主题 / 设置
----------|------------------------------------------------------------------
业务层    | API 路由（scan/intake/upgrade/classify/assets/topics）+ lib/core
----------|------------------------------------------------------------------
数据层    | better-sqlite3 (insight.db) + lib/db 查询层
----------|------------------------------------------------------------------
LLM 层    | lib/llm：OpenAI 兼容客户端 + 4 个核心 prompt + Kernel 注入
```

---

## 三、数据模型

### 核心表（4 张 + 1 张配置）

```sql
-- assets：卡片主表（轻量卡 + 资产卡共用）
CREATE TABLE assets (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  type          TEXT NOT NULL DEFAULT 'Light',   -- Light | Asset
  title         TEXT NOT NULL,
  insight       TEXT,                            -- 核心洞察（一句话）
  tags          TEXT,                            -- JSON array
  raw_content   TEXT,                            -- 原文（采集时存）
  source_path   TEXT,
  source_type   TEXT,                            -- md | txt | pdf | docx | html | url
  status        TEXT NOT NULL DEFAULT 'raw',     -- raw | calibrating | ready | asset
  evidence_level TEXT,                           -- E0-E5（资产卡）
  is_contrarian INTEGER DEFAULT 0,               -- 反常识标记（资产卡）
  dimensions    TEXT,                            -- JSON（资产卡维度洞察）
  topic_id      INTEGER,
  timeline      TEXT,                            -- JSON 进化记录
  created_at    TEXT DEFAULT (datetime('now')),
  updated_at    TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (topic_id) REFERENCES topics(id)
);

-- topics：主题（支持层级）
CREATE TABLE topics (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  description TEXT,
  parent_id   INTEGER,
  created_at  TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (parent_id) REFERENCES topics(id)
);

-- sources：来源文件追踪（去重/增量扫描）
CREATE TABLE sources (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  path          TEXT UNIQUE NOT NULL,
  type          TEXT,
  hash          TEXT,
  last_scanned  TEXT,
  asset_id      INTEGER,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- feedback：反馈记录（MVP 预留表，闭环可用但暂不主动用）
CREATE TABLE feedback (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_id    INTEGER NOT NULL,
  content     TEXT,
  type        TEXT,                              -- client | self | other
  created_at  TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- settings：KV 配置（LLM 配置、vault 路径、Kernel 文本）
CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);
```

### 卡片生命周期状态机

```
扫描入库        人工校准        升级资产        （可回退）
  raw  ──→  calibrating  ──→  ready  ──→  asset
                                              │
                                              ↓
                                          主题分类
                                          (topic_id)
```

---

## 四、核心流程

### 4.1 采集流程（文件夹 → 轻量卡）

```
设置页配 vault 路径 + LLM + Kernel
    ↓
采集页：POST /api/scan
    └─ 递归扫描目录 → 按类型分组返回文件清单
    ↓
勾选文件 → POST /api/intake（批量）
    ├─ indexer 按 source_type 分发解析
    │   ├─ md/txt → 直接读
    │   ├─ pdf    → pdf-parse
    │   ├─ docx   → mammoth
    │   └─ html   → cheerio（公众号正文）
    ├─ 长文截断（>8000 字取摘要段落）
    └─ llm.intake() → 生成 Light Card {title, insight, tags}
    ↓
写入 assets 表（status=raw）+ sources 表（去重）
    ↓
返回轻量卡列表
```

### 4.2 整理流程（轻量卡 → 资产卡）

```
资产库页：轻量卡列表（按 status/topic 筛选）
    ↓
[人工校准] 前端编辑 title/insight/tags
    └─ PATCH /api/assets/[id]（status → calibrating）
    ↓
[升级资产] POST /api/upgrade
    └─ llm.upgrade() → 标注 {反常识, E0-E5 证据等级, 维度洞察}
    └─ status → asset，落库
    ↓
[主题分类] POST /api/classify
    └─ llm.classify() → 匹配现有 topic 或建议新建 → 关联 topic_id
    ↓
资产卡详情页：完整信息 + 进化时间线
```

### 4.3 证据等级 E0-E5（原规格定义）

| 等级 | 含义 |
|------|------|
| E0 | 个人推测，无验证 |
| E1 | 单次观察 |
| E2 | 多次观察 |
| E3 | 有案例验证 |
| E4 | 多案例 + 反例检验 |
| E5 | 系统性验证，高置信 |

---

## 五、LLM 设计

### 5.1 4 个核心调用（贴近原规格的 19 个，MVP 精简）

| 调用 | 阶段 | 输入 | 输出 |
|------|------|------|------|
| `intake` | 采集 | 原文 + Kernel | 轻量卡 {title, insight, tags} |
| `upgrade` | 整理 | 轻量卡 + Kernel | 资产卡增强 {反常识, E0-E5, dimensions} |
| `classify` | 整理 | 资产卡 + 现有主题列表 + Kernel | topic_id（匹配 or 新建建议） |
| `kernel-check`（可选） | 整理 | 资产卡 + 当前 Kernel | 建议是否提炼为新 Kernel 条目 |

> calibrate（轻量卡校准）MVP 用前端编辑代替 LLM，降低调用量。

### 5.2 Insight Kernel 注入（最简版）

- 存储于 `settings` 表 `insight_kernel` 键，设置页文本框手填
- 格式：每行一条判断（MVP 不做四类分类，纯文本即可）
- 注入方式：所有 LLM 调用的 system prompt 末尾追加：

```
## 个人判断立场（Insight Kernel）
{用户填写的 Kernel 文本}

请在输出中保持与上述立场一致的个人判断风格。
```

### 5.3 LLM 客户端（OpenAI 兼容）

```typescript
// lib/llm/client.ts 核心结构
interface LLMConfig {
  baseURL: string;   // 默认 https://open.bigmodel.cn/api/paas/v4
  apiKey: string;
  model: string;     // 默认 glm-4-plus
}

async function chat(messages, config, kernel?): Promise<string>
// 用 fetch 调用 ${baseURL}/chat/completions
// 自动注入 kernel 到 system prompt
```

---

## 六、API 设计

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/settings` | 读取配置 |
| PUT | `/api/settings` | 更新配置（LLM/vault/Kernel） |
| POST | `/api/scan` | 扫描文件夹，返回文件清单 |
| POST | `/api/intake` | 批量采集 → 轻量卡 |
| GET | `/api/assets` | 卡片列表（支持 ?status=&topic_id= 筛选） |
| GET | `/api/assets/[id]` | 卡片详情 |
| PATCH | `/api/assets/[id]` | 更新卡片（校准/编辑） |
| POST | `/api/upgrade` | 升级为资产卡 |
| POST | `/api/classify` | 主题分类 |
| GET | `/api/topics` | 主题列表 |
| POST | `/api/topics` | 新建主题 |
| GET | `/api/stats` | 仪表盘统计数据 |

---

## 七、UI 页面（6 个）

| 页面 | 路径 | 核心内容 |
|------||------|---------|
| 仪表盘 | `/` | 资产统计（总数/在用/真实案例/待校准）+ 待办看板 |
| 采集 | `/intake` | 选文件夹 → 文件清单 → 批量生成轻量卡 |
| 资产库 | `/assets` | 卡片列表（筛选：状态/主题/类型/搜索） |
| 资产详情 | `/assets/[id]` | 完整信息 + 校准编辑 + 升级 + 分类 + 进化时间线 |
| 主题 | `/topics` | 主题树 + 每主题下的资产卡 |
| 设置 | `/settings` | LLM 配置 + vault 路径 + Insight Kernel 文本框 |

---

## 八、项目结构

```
insight-asset-os/
├── app/
│   ├── layout.tsx             # 根布局 + 侧边栏导航
│   ├── page.tsx               # 仪表盘
│   ├── intake/page.tsx        # 采集页
│   ├── assets/
│   │   ├── page.tsx           # 资产库列表
│   │   └── [id]/page.tsx      # 资产详情
│   ├── topics/page.tsx        # 主题管理
│   ├── settings/page.tsx      # 设置
│   └── api/                   # 见 API 设计
├── lib/
│   ├── db/
│   │   ├── schema.ts          # 建表 SQL
│   │   ├── index.ts           # 连接 + 初始化
│   │   └── queries.ts         # 查询层
│   ├── llm/
│   │   ├── client.ts          # OpenAI 兼容客户端
│   │   ├── prompts.ts         # 4 个 prompt 模板
│   │   └── kernel.ts          # Kernel 注入
│   ├── indexer/
│   │   ├── index.ts           # 分发器
│   │   ├── markdown.ts
│   │   ├── pdf.ts
│   │   ├── docx.ts
│   │   └── html.ts
│   └── core/
│       ├── intake.ts          # 采集业务逻辑
│       ├── upgrade.ts         # 升级业务逻辑
│       └── classify.ts        # 分类业务逻辑
├── data/                      # gitignore
│   ├── insight.db             # SQLite 数据库
│   └── vault/                 # （可选）导出的 markdown
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 九、分阶段交付计划

每阶段产出**可独立运行**的版本，验证后再进下一阶段。

### P1 · 骨架（基础可跑）
- Next.js 项目脚手架 + Tailwind + shadcn/ui
- DB schema + 初始化 + 查询层
- 设置页（LLM 配置 + vault 路径 + Kernel 文本框）
- LLM 客户端 + 连通测试
- **验证**：`npm run dev` 起服务，设置页能配 LLM 并测试连通

### P2 · 采集（文件夹 → 轻量卡）
- 4 个文件解析器（md/pdf/docx/html）
- 扫描页 + scan API
- intake API + 采集业务逻辑
- 轻量卡列表展示
- **验证**：选文件夹 → 生成轻量卡列表

### P3 · 整理（轻量卡 → 资产卡）
- 资产库列表页（筛选）
- 资产详情页 + 校准编辑
- upgrade API + 业务逻辑
- classify API + 主题管理页
- **验证**：轻量卡 → 校准 → 升级资产 → 分类 完整流转

### P4 · 体验增强（接近原产品）
- 仪表盘统计 + 待办看板
- 全文检索
- 导出 markdown
- 进化时间线展示
- **验证**：完整体验，接近原产品

---

## 十、风险与对策

| 风险 | 对策 |
|------|------|
| better-sqlite3 原生模块编译失败 | package.json 加 install 脚本（`npm rebuild`）；若失败降级 sql.js（纯 JS） |
| 长文超出 LLM 上下文 | indexer 层截断 >8000 字，取首尾 + 摘要段落 |
| 公众号 URL 导入（非本地文件） | P2 先支持本地 HTML；URL 导入用现有 webReader skill 作为后续增强 |
| LLM 输出格式不稳定 | prompt 强约束 JSON schema；客户端做解析容错 + 重试 1 次 |
| 主题分类发散（无限新建） | classify prompt 约束"优先匹配现有主题"；前端展示候选供人确认 |

---

## 十一、待办（下一步）

1. ✅ 本设计文档（已完成）
2. ⏭️ 调用 writing-plans 技能，生成 P1 阶段的详细实现计划
3. ⏭️ 按计划进入 P1 实现

---

*设计来源：用户提供的产品规格（Insight Asset OS 架构与业务篇海报）+ AGENT_TYPES_REFERENCE.md（子代理架构模式参考）+ SKILL.md（Agent 设计模式全景）。本设计为 MVP 精简复刻，不追求与原产品功能 1:1。*
