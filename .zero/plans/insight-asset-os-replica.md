# Insight Asset OS 复刻 — 实施计划

> 本地优先的个人思想资产工作台，嵌入现有 my-agent Skill 体系

---

## 一、Context

**触发原因**：年老师拿到 Insight Asset OS（Vincent 的产品）完整架构文档，希望复刻其核心能力——读取本地文件夹、对内容做 LLM 分类和洞察提取、输出带个人判断立场的结构化知识。

**核心约束**：
- 所有数据本地存储，不上云
- 兼容任意 OpenAI 兼容 LLM（DeepSeek/Ollama/Qwen/GLM）
- 核心流程「采集→整理→输出」三步闭环
- Insight Kernel 自动注入到所有 LLM 调用的 system prompt

**当前项目定位**：my-agent 是 AI Agent 协作工作区（Claude/Codex 双规则体系），已有 173+ Skill、KaaS 知识库 MCP、供应商管理全套工具。用户确认选择**完整独立应用**形态（Next.js 15 + Electron 32），与源产品技术栈对齐，不嵌入现有 Skill 体系。

**用户确认的策略**：
- 分阶段逐步推进（Phase 0-4，每阶段有可验证产出）
- 全自动 Kernel 生成（从资产卡反推，不做手动录入）
- 规则+LLM 双级分类（文件类型预筛→LLM 语义分类）

## 二、架构决策

### 决策 1：形态选择 — 完整独立桌面应用

**理由（用户明确选择）**：
- 用户要求「完整独立应用」，需要桌面窗口、可视化 UI、独立打开使用
- 和源产品 Insight Asset OS 技术栈对齐：Next.js 15 (App Router) + Electron 32
- 独立项目部署，不耦合 my-agent 的 Agent 调用体系
- 核心价值是「本地文件夹→LLM 分类→洞察输出」的全链路产品，不只是后台管道

**技术栈确定**：Next.js 15 App Router + Electron 32 + SQLite (better-sqlite3) + Tailwind CSS + TypeScript

### 决策 2：数据层 — SQLite + vault/*.md，保留原架构

**理由**：
- SQLite 单文件、零配置、本地优先，和产品定位一致
- FTS5 全文检索是核心体验（搜索已有资产）
- vault/*.md 作为人类可读的备份层，和 Obsidian 生态兼容

**实现方式**：用 `better-sqlite3`（Node.js 原生绑定），不依赖 Electron

### 决策 3：LLM 层 — 自行封装 OpenAI 兼容 SDK 抽象层

**理由**：独立应用不依赖 my-agent 的 LLM 调用入口，需要自己封装统一接口。支持 DeepSeek/Ollama/Qwen/GLM 任意 OpenAI 兼容服务。Kernel 注入走 prompt 模板拼接 + system prompt 动态组装。

**实现方式**：`packages/llm/` 独立包，封装 OpenAI SDK + 多供应商适配。每个调用点注入 Kernel 上下文。

### 决策 4：分阶段交付，先数据管道再 UI

**理由**：数据模型和 LLM 管道是核心，UI 是外挂。先让管道跑通，再补可视化。

## 三、技术栈

| 层 | 技术 | 理由 |
|----|------|------|
| **UI** | Next.js 15 App Router + Electron 32 + Tailwind CSS | 和源产品对齐，桌面端原生体验 |
| **数据** | SQLite (better-sqlite3) + vault/*.md | 本地优先，FTS5 全文检索，9 表设计 |
| **LLM 管道** | 自建 `packages/llm`（OpenAI SDK 兼容层 + prompt 模板引擎） | 独立应用不依赖 my-agent，19 个注入点自动拼接 Kernel |
| **文件扫描** | Node.js fs + glob + gray-matter（frontmatter 解析） | 本地文件夹递归扫描 + 类型识别 |
| **输出** | React 组件（仪表盘/写作/资产库/图谱/设置）+ 流式 SSE | Next.js 原生渲染 + Server Components |
| **构建** | Electron Forge + Vite | 桌面应用打包（Win/Mac/Linux） |
| **项目结构** | monorepo (packages/core, packages/db, packages/llm, packages/indexer, app/) | 源产品的 4 包架构 + UI 层 |

## 四、项目结构（独立应用，monorepo）

```
insight-asset-os/                     # 项目根目录（独立仓库）
├── app/                              # Next.js 15 App Router（UI 层）
│   ├── layout.tsx                    # 根布局（Electron 壳内渲染）
│   ├── page.tsx                      # 仪表盘首页
│   ├── dashboard/
│   │   ├── page.tsx                  # 资产统计 + 待办看板 + 写作复盘
│   │   └── components/              # 仪表盘组件（统计卡片/看板列表/图表）
│   ├── assets/
│   │   ├── page.tsx                  # 资产库列表（LightCard + AssetCard 双视图）
│   │   ├── [id]/page.tsx            # 资产卡详情（含进化时间线）
│   │   └── components/              # 卡片组件、滤镜、搜索
│   ├── write/
│   │   ├── page.tsx                  # 写作工作台（主题选择→骨架→改稿→发布）
│   │   └── components/              # 编辑器、Kernel 注入面板、改稿侧栏
│   ├── kernel/
│   │   ├── page.tsx                  # Insight Kernel 管理（四类视图）
│   │   └── components/              # Kernel 卡片、自动生成建议
│   ├── graph/page.tsx                # 知识图谱可视化（主题-资产-反馈关系图）
│   ├── settings/
│   │   └── page.tsx                  # 设置（LLM 配置、写作风格、数据路径）
│   └── manual/page.tsx              # 操作手册（5 分钟上手 + 核心概念 + FAQ）
├── packages/
│   ├── core/                         # @insight/core — 类型定义 + 工具函数
│   │   ├── types.ts                  # LightCard/AssetCard/Topic/Kernel/Feedback/WritingStyle
│   │   ├── constants.ts              # E0-E5 等级定义、4 类 Kernel 分类枚举
│   │   └── utils.ts                  # ID 生成、时间格式化、Markdown 处理
│   ├── db/                          # @insight/db — SQLite 数据层
│   │   ├── schema.sql               # 9 表 DDL + FTS5 索引 + WAL 配置
│   │   ├── connection.ts             # better-sqlite3 连接管理（单例）
│   │   ├── repositories/             # 每表一个 Repository（CRUD + 查询）
│   │   │   ├── light-cards.ts
│   │   │   ├── asset-cards.ts
│   │   │   ├── topics.ts
│   │   │   ├── kernels.ts
│   │   │   ├── outputs.ts
│   │   │   ├── feedbacks.ts
│   │   │   ├── writing-styles.ts
│   │   │   └── scan-history.ts
│   │   └── migrations/              # 数据库迁移脚本
│   ├── llm/                         # @insight/llm — LLM 管道
│   │   ├── client.ts                # OpenAI 兼容 SDK 封装（支持 DeepSeek/Ollama/Qwen/GLM）
│   │   ├── prompt-templates.ts     # 所有注入点的 prompt 模板（19 个调用场景）
│   │   ├── kernel-injector.ts      # Kernel 自动注入引擎（拼接到 system prompt）
│   │   ├── intake.ts               # 采集：公众号/笔记/URL → 轻量卡
│   │   ├── calibrate.ts             # 校准：轻量卡 → 资产卡（反常识 + E0-E5）
│   │   ├── promote.ts              # 升级：证据等级提升（E0→E1→...→E5）
│   │   ├── classify.ts              # 分类：自动主题归类（LLM 语义匹配）
│   │   ├── scaffold.ts             # 输出：写作骨架生成（5 sections）
│   │   ├── review.ts                # 改稿：选中段落 + 指令 → 改写建议
│   │   ├── taste-check.ts          # AI 味自检：检测机械化表达
│   │   ├── kernel-generator.ts    # Kernel 自动生成：从资产卡反推个人判断
│   │   └── style-extractor.ts     # 风格提取：从样本反推写作风格配置
│   ├── indexer/                     # @insight/indexer — 文件索引与全文检索
│   │   ├── file-scanner.ts         # 本地文件夹扫描（递归 + 类型分桶 + 缓存）
│   │   ├── fts-indexer.ts          # FTS5 全文检索索引管理
│   │   └── metadata-extractor.ts   # 文件元数据提取（frontmatter/日期/标签）
│   └── vault/                      # @insight/vault — 本地文件系统管理
│       ├── vault-manager.ts          # vault/*.md 文件 CRUD + 目录结构
│       └── sync.ts                   # DB ↔ vault 双向同步
└── electron/
    ├── main.ts                       # Electron 主进程（窗口管理 + IPC）
    ├── preload.ts                   # 预加载脚本（暴露 DB/FS API 给渲染进程）
    └── forge.config.ts             # Electron Forge 打包配置

# 数据存储（运行时生成，不提交 Git）
vault/                              # 用户 Markdown 资产库
├── light-cards/                     # 轻量卡 Markdown 文件
├── asset-cards/                   # 资产卡 Markdown 文件
└── outputs/                        # 输出记录

data/                               # SQLite 数据库文件
└── insight.db                      # 主数据库（9 表 + FTS5 + WAL）
```

### 关键数据模型（SQLite 9 表）

```sql
-- 轻量卡（采集阶段产物）
light_cards (id, title, insight, tags, source_url, source_type, created_at, updated_at)

-- 资产卡（整理阶段产物）
asset_cards (id, light_card_id, title, counter_intuition, evidence_level, topic_ids, status, kernel_id, evolution_log, created_at)

-- 主题
topics (id, name, description, kernel_id, card_count, output_count, created_at)

-- Insight Kernel
kernels (id, category, statement, applicable_scenarios, counter_examples, confidence, created_at, updated_at)

-- 输出记录
outputs (id, topic_id, card_ids, kernel_id, sections, feedback, published_at)

-- 反馈
feedbacks (id, asset_id, reaction_type, detail, created_at)

-- 写作风格配置
writing_styles (id, name, config_yaml, is_default, created_at)

-- 全文检索索引
fts_index (content, source_type, source_id)

-- 文件夹扫描记录
scan_history (id, folder_path, file_count, classified_count, status, created_at)
```

### Insight Kernel 四类分类

| 类别 | 含义 | 示例 |
|------|------|------|
| **底层信念** | 长期价值主张/哲学立场 | "数据比直觉可靠，但直觉决定数据看什么方向" |
| **反常识判断** | 反对主流叙事的判断 | "供应商管理不是压价，是找能一起扛风险的伙伴" |
| **擅长问题域** | 被验证过能力的领域 | "产能分析、SABC 诊断、培训体系设计" |
| **想挑战的常识** | 想消灭/重塑的行业套话 | "不是所有供应商都需要年度评级，轻量供应商用轻量管理" |

## 五、分阶段交付计划

### Phase 0：项目骨架 + 数据层奠基（3-4 天）

**目标**：独立仓库初始化 + monorepo 结构 + SQLite 9 表建表 + 类型体系

**可验证产出**：
- `packages/core/types.ts` 完整类型定义（LightCard/AssetCard/Topic/Kernel/Feedback/WritingStyle/E0-E5 枚举）
- `packages/db/schema.sql` 9 表 DDL + FTS5 索引 + WAL 实操
- `packages/db/` 每个 Repository 的 CRUD 单测通过
- `packages/vault/vault-manager.ts` 能创建/读取/写入 vault 目录结构
- `packages/llm/client.ts` OpenAI 兼容 SDK 封装，对接至少 2 个供应商的 API 调用测试
- Next.js 15 项目骨架跑通（`npm run dev` 可打开仪表盘空页面）
- Electron 主进程骨架跑通（`npm run electron` 可打开桌面窗口）

**不做**：LLM 业务调用、文件夹扫描、任何 UI 页面内容

### Phase 1：采集管道 + 仪表盘 UI（4-5 天）

**目标**：文件夹扫描 → 规则分桶（文件类型）→ LLM 语义提取 → 生成轻量卡 → 仪表盘首页可操作

**可验证产出**：
- `packages/indexer/file-scanner.ts` 扫描任意本地文件夹，递归 + 按类型分桶（.md/.txt/.pdf/.docx/图片/URL），首次全量 + 后续增量（mtime 对比）
- `packages/llm/intake.ts` 对 Markdown/文本/URL 内容调用 LLM，提取 title + insight + tags，自动关联主题
- `app/page.tsx`（仪表盘首页）完整渲染：待办看板（待校准/可输出/待反馈三栏）+ 资产统计卡片 + 写作复盘 30 天趋势
- 端到端演示：选择本地文件夹 → 扫描 → 生成 10+ 轻量卡 → 存入 SQLite → 首页看板实时刷新
- `packages/llm/prompt-templates.ts` 完成采集阶段 3 个模板（intake/calibrate/classify）

**不做**：资产卡升级、Kernel 自动生成、写作功能、知识图谱

### Phase 2：整理管道 + 资产库 UI（4-5 天）

**目标**：轻量卡 → LLM 校准 + 证据等级 → 资产卡 + 主题分类 + 全自动 Kernel 生成 + 资产库完整交互

**可验证产出**：
- `packages/llm/calibrate.ts` 对轻量卡做 LLM 校准，生成资产卡（反常识字段 + E0-E5 证据等级自动评分）
- `packages/llm/classify.ts` 自动主题分类（LLM 语义匹配 + 相似度聚合），支持人工确认
- `packages/llm/kernel-generator.ts` **全自动 Kernel 生成**：从 50+ 张资产卡中提取模式 → 自动分类为 4 类 Kernel（底层信念/反常识/擅长问题域/想挑战的常识）→ 置信度自动标注
- `packages/llm/kernel-injector.ts` Kernel 自动注入引擎：每次 LLM 调用前动态拼接当前用户 Kernel 到 system prompt（按调用点类型选择相关 Kernel，做摘要压缩 ≤500 tokens）
- `app/assets/page.tsx` 资产库列表（LightCard + AssetCard 双视图切换 + 搜索 + 分类筛选）
- `app/assets/[id]/page.tsx` 资产卡详情页（含完整进化时间线、关联主题、Kernel 引用、右侧操作面板）
- `app/kernel/page.tsx` Kernel 管理界面（四类分类视图 + 单条详情 + 置信度分布 + 自动生成建议）
- 端到端演示：100 张轻量卡 → 自动分类 → 升级为资产卡 → Kernel 自动生成 → 资产库可检索

**不做**：写作工作台、输出阶段、知识图谱、改稿、AI 味自检

### Phase 3：输出管道 + 写作工作台（4-5 天）

**目标**：主题 → 写作骨架（5 sections）→ 流式改稿 → AI 味自检 → 风格提取 → 完整输出工作台

**可验证产出**：
- `packages/llm/scaffold.ts` 基于主题 + 3-5 张关联资产卡 + Kernel 自动注入 → 生成 5 sections 写作骨架（含每个 section 的论点+论据+数据锚点）
- `app/write/page.tsx` 写作工作台完整 UI：左侧主题选择 → 中间骨架编辑器 → 右侧改稿面板 + Kernel 注入面板
- `packages/llm/review.ts` 流式改稿（选中段落 + 自然语言改稿指令 → 流式 SSE 返回改写建议 + reasoning）
- `packages/llm/taste-check.ts` AI 味自检（检测 5 类典型问题：套话/过渡词/空洞总结/机械排比/过度解释），输出结构化诊断报告
- `packages/llm/style-extractor.ts` 从用户已有样本（3+ 篇输出稿）反推写作风格配置（YAML 格式，5 维度）
- `app/settings/page.tsx` 写作风格配置界面（5 维度面板 + 3 种预设风格切换 + 样本导入/导出 + 试写预览）
- 端到端演示：选主题 → 关联 3-5 张卡 → 生成骨架 → 注入 Kernel → 流式改稿 → AI 味自检 → 输出终稿

**不做**：知识图谱、操作手册、Electron 打包优化

### Phase 4：知识图谱 + 操作手册 + 反馈闭环（3-4 天）

**目标**：知识图谱（资产-主题-Kernel 关系）+ 操作手册 + 反馈升级闭环 + Electron 打包

**可验证产出**：
- `app/graph/page.tsx` 知识图谱可视化：D3.js 力导向图，节点 = 资产卡/主题/Kernel，边 = 引用/关联/升级关系。支持缩放、拖拽、点击聚焦
- `app/manual/page.tsx` 操作手册：5 分钟上手路径 + 核心概念卡片 + v1.4 新功能讲解 + FAQ + 故障排查
- 反馈升级闭环：`packages/llm/promote.ts` 支持反馈触发证据等级自动升级（E0 → E5），Kernel 置信度自动调整
- `packages/llm/prompt-templates.ts` 完成全部 19 个注入点模板（采集 4 + 整理 4 + 输出 9 + 对话 2）
- Electron 打包：`npm run make` 输出 Win/Mac/Linux 三平台安装包
- 端到端全流程演示：选本地文件夹 → 扫描 → 生成轻量卡 → 升级资产卡 → Kernel 自动生成 → 写作骨架 → 改稿 → 发布 → 反馈 → 资产升级闭环

**不做**：性能优化、灰度发布、A/B 测试、云端同步

## 六、关键风险与应对

| 风险 | 等级 | 应对 |
|------|------|------|
| **Insight Kernel 自动注入的 Token 优化** | 高 | Kernel 做摘要压缩（≤500 tokens），不直接把全文塞 system prompt；19 个注入点按需选择，不全量注入。每次调用只注入该场景相关的 2-3 个 Kernel |
| **全自动 Kernel 生成的质量** | 高 | 从资产卡反推 Kernel 的 LLM 质量依赖足够样本量（≥30 张资产卡）。Phase 2 先做生成+人工审核双通道，不直接全自动覆盖。Kernel 置信度（0-100）自动标注低信度条 |
| **资产升级闭环（反馈→重生成）** | 中 | Phase 3 先做手动触发，Phase 4 再做自动化；增量学习机制用定期重构而非实时更新。反馈触发证据等级升级需要≥3 条反馈才启动 |
| **LLM 多供应商兼容** | 低 | 自行封装 OpenAI SDK 兼容层，统一 interface。DeepSeek/Ollama/Qwen/GLM 各测一遍 API 连通性 |
| **SQLite FTS5 中文分词** | 中 | FTS5 自带分词对中文一般，接入结巴分词（nodejieba）做索引侧分词，搜索时用 like 兜底 |
| **本地文件夹大文件量扫描性能** | 低 | 首次全量扫描后增量更新（mtime 对比），不做每次全量。数据库做索引缓存，避免重复扫描 |
| **证据等级 E0-E5 的评分一致性** | 中 | LLM 评分有随机性，评分逻辑用结构化 prompt（E0=未验证/E3=单案例验证/E5=多案例+数据验证），减少主观偏差。人工校准兜底 |
| **Electron + Next.js 构建链路复杂性** | 中 | Electron 主进程 + Next.js 渲染进程的 IPC 通信需要额外配置。用 electron-serve 简化 Next.js 静态文件加载，主进程只做文件系统和数据库操作 |

## 七、文件清单（总计约 25 个核心文件）

```
# 技能入口
.agents/skills/insight-asset-os/SKILL.md       # Skill 定义（被 Agent 发现）

# 核心库（6 个）
.agents/skills/insight-asset-os/core/types.ts     # 类型定义
.agents/skills/insight-asset-os/core/db.ts        # SQLite 管理
.agents/skills/insight-asset-os/core/vault.ts     # vault 文件系统
.agents/skills/insight-asset-os/core/kernel.ts    # Kernel CRUD
.agents/skills/insight-asset-os/core/classifier.ts # 分类器
.agents/skills/insight-asset-os/core/config.ts    # 配置（LLM provider、路径）

# LLM 管道（9 个）
.agents/skills/insight-asset-os/llm/intake.ts
.agents/skills/insight-asset-os/llm/calibrate.ts
.agents/skills/insight-asset-os/llm/promote.ts
.agents/skills/insight-asset-os/llm/classify.ts
.agents/skills/insight-asset-os/llm/scaffold.ts
.agents/skills/insight-asset-os/llm/review.ts
.agents/skills/insight-asset-os/llm/taste-check.ts
.agents/skills/insight-asset-os/llm/kernel-generator.ts
.agents/skills/insight-asset-os/llm/prompt-templates.ts

# 索引器（3 个）
.agents/skills/insight-asset-os/indexer/file-scanner.ts
.agents/skills/insight-asset-os/indexer/fts-indexer.ts
.agents/skills/insight-asset-os/indexer/metadata-extractor.ts

# 输出（3 个）
.agents/skills/insight-asset-os/outputs/html-report.ts
.agents/skills/insight-asset-os/outputs/md-card.ts
.agents/skills/insight-asset-os/outputs/export.ts

# CLI（4 个）
.agents/skills/insight-asset-os/cli/scan.ts
.agents/skills/insight-asset-os/cli/classify.ts
.agents/skills/insight-asset-os/cli/kernel.ts
.agents/skills/insight-asset-os/cli/report.ts
```

## 八、与现有 Skill 体系的协同（独立应用不耦合，但可参考）

本产品作为独立应用，不直接调用 my-agent 的 Skill。但与以下已有能力存在参考关系：

| 现有能力 | 参考价值 | 何时参考 |
|---------|---------|---------|
| **KaaS KB** | 知识库检索（PRD/规范）的 MCP 调用模式 | LLM 管道设计时参考 MCP 工具调用规范 |
| **agent-pattern-selector** | Agent 架构决策（13 种模式 + 4 种协作架构） | 产品内 AI 助手模块的架构设计（如改稿、自检、路由） |
| **beautiful-article** | reacticle 组件协议 + HTML 长文生成 | 写作工作台的编辑器组件选型 |
| **data-agent-datasource** | dataAgent SQL 查询 MCP | 数据层设计参考 SQLite 查询模式 |
| **supplier-training-toolkit** | 供应商培训全流程工具包 | 操作手册的流程设计（5 分钟上手 → 核心概念 → FAQ） |
| **doc-markdown-converter** | 多格式→Markdown 转换 | 文件索引器的格式转换（PDF/DOCX/PPTX/EPUB → Markdown） |

## 九、下一步行动

**Phase 0 启动条件**：
- [x] 计划已确认
- [x] 技术形态：完整独立应用（Next.js 15 + Electron 32）
- [x] 分阶段节奏：5 个 Phase 逐步推进
- [x] Kernel 策略：全自动生成（LLM 从资产卡反推）
- [x] 分类策略：规则+LLM 双级分类

**立即执行项**：
- [ ] 创建独立项目仓库 `insight-asset-os`（路径待确认：当前工作区下新目录？还是独立仓库？）
- [ ] 初始化 monorepo 结构（`app/` + `packages/core` + `packages/db` + `packages/llm` + `packages/indexer` + `packages/vault` + `electron/`）
- [ ] `packages/db/schema.sql` 9 表 DDL + FTS5 索引
- [ ] `packages/core/types.ts` 完整类型定义
- [ ] Next.js 15 项目骨架（`app/layout.tsx` + `app/page.tsx` 空仪表盘）
- [ ] Electron 主进程骨架（`electron/main.ts` + `electron/preload.ts`）

**第一个用户可见产出**：Phase 0 完成时，`npm run electron` 可打开一个空桌面窗口，`npm run dev` 可看到 Next.js 仪表盘空页面，数据库 9 表已建好。