# Phase 1 实施计划：项目骨架 + 数据模型

## 范围

**Building**：一个可运行的 Electron + Next.js 15 App Router 桌面应用骨架。包含：Electron 主进程启动 Next.js 渲染服务、本地 MCP Server 暴露数据访问、SQLite + drizzle-orm schema 管理、OKF 兼容的 Markdown 文件读写、FTS5 全文索引。

**Not building**：LLM 调用、UI 页面（仪表盘/资产库/写作页）、Insight Kernel 注入、任何业务逻辑。

**V0.X 目标范围**：采集+整理闭环。Phase 1 只做数据层和基础设施，不做业务。

## 技术选型

| 层级 | 选型 | 原因 |
|------|------|------|
| 桌面框架 | Electron 32 + electron-builder | 你已定的技术栈，生产构建输出 dmg |
| 渲染进程 | Next.js 15 App Router (`output: 'standalone'`) | Electron 主进程动态端口启动 `next start --minimalMode` |
| 数据库 | better-sqlite3（同步驱动）+ drizzle-orm（schema 迁移） | 同步适合 Electron 主进程，drizzle 做 TypeScript 类型安全 |
| 数据服务 | MCP Server（主进程内 `localhost:8923`） | 对标 Linkly，标准协议，外部 Agent 可直接消费 |
| Markdown 解析 | gray-matter（frontmatter）+ unified/remark（body 解析） | 轻量，OKF 兼容 |
| 全文检索 | better-sqlite3 FTS5 + 自定义 BM25 加权 | 不引入外部搜索引擎，SQLite 内完成 |
| 包管理 | pnpm（monorepo: `packages/core`、`packages/db`、`packages/indexer`、`packages/llm`） | 你原架构 4 包，Phase 1 只实现 db 和 indexer |
| 语言 | TypeScript 全栈 | 前后端类型共享 |

## 项目结构

```
insight-asset-os/
├── electron/                    # Electron 主进程
│   ├── main.ts                 # 入口：窗口创建、Next.js 启动、MCP 启动
│   ├── preload.ts              # 安全 IPC 暴露（contextBridge）
│   ├── mcp-server.ts           # MCP Server（search/read/outline/grep/list）
│   └── tsconfig.json
├── app/                        # Next.js App Router（渲染进程）
│   ├── layout.tsx
│   ├── page.tsx                # 占位首页（Phase 1 空白）
│   ├── globals.css
│   └── (routes)/
├── packages/                   # monorepo 业务包
│   ├── core/                  # 共享类型、工具函数
│   │   ├── src/
│   │   │   ├── types.ts      # Card、Topic、Feedback 类型定义
│   │   │   └── utils.ts
│   │   └── package.json
│   ├── db/                    # SQLite 数据访问层
│   │   ├── src/
│   │   │   ├── schema.ts     # drizzle 表定义
│   │   │   ├── migrations/   # 迁移文件
│   │   │   ├── repository.ts # CRUD 操作封装
│   │   │   └── index.ts
│   │   └── package.json
│   ├── indexer/               # 全文检索 + 文档结构
│   │   ├── src/
│   │   │   ├── fts.ts         # FTS5 + BM25 加权
│   │   │   ├── outline.ts    # 文档结构提取（标题树）
│   │   │   └── index.ts
│   │   └── package.json
│   └── llm/                   # LLM 调用层（Phase 2 才实现）
│       ├── src/
│       └── package.json
├── data/                       # 用户数据目录（vault + SQLite）
│   └── .gitkeep
├── next.config.mjs
├── package.json                # 根 workspace
├── pnpm-workspace.yaml
├── electron-builder.yml        # electron-builder 配置
└── tsconfig.json
```

## 执行步骤

### T1：初始化 monorepo + Electron + Next.js 骨架

**输入**：空目录
**产出**：`pnpm dev` 能起 Electron 窗口，展示 Next.js 占位页

**具体动作**：

1. 用 `pnpm` 初始化根 `package.json`，配置 `pnpm-workspace.yaml`
2. `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"` 初始化 Next.js App Router
3. 手动创建 `electron/` 目录，安装依赖
4. 创建 `electron/main.ts`：开发模式加载 `localhost:3000`，生产模式用 `get-port-please` + `next start --minimalMode`
5. 创建 `electron/preload.ts`：`contextBridge` 空壳
6. 创建 `electron-builder.yml`：macOS dmg 输出
7. 添加 npm scripts

**自检清单**：
- [ ] `pnpm install` 无报错
- [ ] `pnpm dev` 能访问 `localhost:3000`
- [ ] `pnpm electron:dev` 能显示 Electron 窗口（加载 Next.js 页面）
- [ ] TypeScript 编译无错误
- [ ] `electron/main.ts` 生产模式逻辑完整

### T2：MCP Server 注册 + 数据目录初始化

**输入**：T1 骨架
**产出**：MCP Server 在 `localhost:8923` 可访问，数据目录在 `userData` 下创建

**具体动作**：

1. 在 `electron/mcp-server.ts` 创建 MCP Server（轻量 HTTP+JSON-RPC）
2. 注册 4 个 tools：`search`、`read`、`outline`、`grep`（初始返回空壳）
3. 在 `electron/main.ts` 的 `app.whenReady()` 中启动 MCP Server
4. 数据目录初始化：`userData/vault/` + `.okf_version` 文件

**自检清单**：
- [ ] MCP Server 在 `localhost:8923/mcp` 可访问
- [ ] 数据目录 `userData/vault/` 自动创建
- [ ] 启动日志打印端口号
- [ ] 关闭 Electron 窗口时 MCP Server 正确退出

### T3：SQLite schema + drizzle-orm + 迁移

**输入**：T2 数据目录
**产出**：4 张表可建表、可 CRUD、迁移文件可追踪

**具体动作**：

1. 安装 `better-sqlite3` + `drizzle-orm` + `drizzle-kit`
2. 在 `packages/db/src/schema.ts` 定义表结构（`light_cards`、`asset_cards`、`topics`、`feedback`）
3. 配置 `drizzle.config.ts`
4. 生成并应用迁移
5. `packages/db/src/repository.ts` 实现 CRUD 封装
6. 在 MCP Server 中实现 `db:*` tools

**关键字段**：
- Light Card：`title`、`insight`、`tags`、`source_url`、`source_type`、`raw_content`、`status`
- Asset Card：`title`、`insight`、`counter_intuition`、`evidence_level`（E0-E5）、`confidence`（0-100）、`topic_id`、`source_card_id`、`status`
- Topic：`name`、`slug`、`description`、`kernel`（JSON string）
- Feedback：`asset_id`、`type`（client_reaction / follow_up / highlight）、`content`

**自检清单**：
- [ ] 4 张表迁移执行成功
- [ ] drizzle-kit 运行无报错
- [ ] repository CRUD 方法可编译通过
- [ ] MCP `db:create` tool 能正常写入
- [ ] schema 类型定义完整（每个字段有注释）

### T4：OKF 兼容的 Markdown 文件操作

**输入**：T3 数据库 schema + T2 数据目录
**产出**：`vault/` 目录下能读写 OKF 兼容的 Markdown，`index.md` 自动生成

**具体动作**：

1. 安装 `gray-matter` + `unified/remark`
2. 在 `packages/core/src/types.ts` 定义 OKF Frontmatter 类型
3. 在 `packages/core/src/md-utils.ts` 实现 Markdown 读写工具
4. 文件存储路径：`vault/{type}/{id}.md`，按类型分组
5. 文件命名用 `id`（非中文 title）
6. 在 MCP Server 添加 `vault:read`、`vault:write`、`vault:export` tools
7. 实现边车 `index.md` 生成器（扫描 vault 下所有文件，按 type 分组）

**自检清单**：
- [ ] Markdown 文件写入后 frontmatter 格式正确
- [ ] `index.md` 生成包含所有概念，分组正确
- [ ] body 中的 Markdown 格式保留
- [ ] 文件路径用 id，可 diff、可 git 追踪
- [ ] `vault:export` 能生成完整 OKF bundle

### T5：FTS5 全文索引 + 文档结构提取

**输入**：T3 SQLite schema + T4 Markdown 文件
**产出**：按关键词搜索资产、按文档结构预览内容

**具体动作**：

1. 在 `packages/indexer/src/fts.ts` 实现 FTS5 虚拟表 + BM25 加权
2. 在 `packages/indexer/src/outline.ts` 实现文档结构提取（标题树）
3. 在 MCP Server 实现 `search`、`outline`、`grep` tool

**BM25 权重**：title 2.0，insight 1.5，body 1.0

**自检清单**：
- [ ] FTS5 表创建成功，INSERT 触发器正常
- [ ] `search` 返回结果包含 score 排序
- [ ] `outline` 只提取标题，不加载全文
- [ ] `grep` 正则匹配正确
- [ ] 跨表搜索（Light + Asset 同时）支持

## 不变的部分（Phase 1 不碰）

- `packages/llm/`（LLM 调用层）——留到 Phase 2
- 任何 UI 页面（仪表盘、资产库、写作页）——留到 Phase 2
- 任何 LLM prompt 模板
- Insight Kernel 注入机制
- 写作骨架、改稿、反馈等业务流程
- 流式输出
- 向量索引（本地嵌入模型）——T5 只做 FTS5，不做向量

## 关键决策

1. **MCP 而非 IPC**：数据访问走 MCP 标准协议，外部 Agent（Claude Code、Codex）可直接消费。Linkly 验证了这个模式可行。
2. **SQLite 和 Markdown 双轨**：SQLite 做快速检索和增删改查，Markdown 做 OKF 兼容导出和边车索引。不是实时双向同步——写入时两轨同时写，读取时以 SQLite 为准。
3. **文件命名用 `id` 不用 `title`**：避免中文文件名在 diff、git、shell 中的编码问题。
4. **Electron 主进程启动 Next.js**：对标 `nextjs_approuter_electron` 的 `minimalMode` 机制，但自己实现，不依赖不再维护的 boilerplate。

## 风险

| 风险 | 假设 | 降级方案 |
|------|------|------|
| Next.js standalone 在 Electron 内 HMR 不可用 | 开发时 `next dev` 独立启动，Electron 加载 `localhost:3000` | 如果不正常，切 `electron-reload` 或放弃 HMR |
| `better-sqlite3` 在 Electron 主进程中需要原生编译 | macOS + Node.js 20+ 支持 | 如果编译失败，切 `sql.js`（纯 WASM） |
| MCP Server 在主进程中，主进程崩溃则服务挂 | 主进程只做启动编排，业务逻辑在 packages 里 | MCP Server 抽到独立子进程 |
| `@modelcontextprotocol/sdk` 可能过重 | 自己实现轻量 HTTP+JSON-RPC，约 200 行 | 不依赖外部 SDK |

## 验证计划

每个 T 完成后：
- `pnpm dev` 能起 Electron 窗口
- `pnpm type-check` 无错误
- MCP 工具调用返回正确结果

Phase 1 整体完成后：
- 一个完整的 Electron 应用能启动
- `pnpm electron:build` 能输出 dmg
- MCP Server 的 `search`、`read`、`outline`、`grep` 4 个 tool 都能正常返回
- `vault/` 目录下 OKF 兼容的 Markdown 文件可用