# 供应商管理知识库 Schema

> 本文件是此 wiki 的配置。进入本 wiki 时第一个读它，其约定覆盖 `llm-wiki` skill 的默认值。
> 与用户共同演进：发现反复出现的模式就加进来，不再适用就删。

## Wiki 位置

- Wiki 根：`wiki/`（本目录）
- 原文层：`raw/`（卡帕西标准是平级外部目录，本库放在 wiki 根内部，SCHEMA 显式声明）
- 健康判断层：`notes/`（冲突记录/待验证假设/已过时内容）
- 脚本：`scripts/`（wiki_lint + wiki_search + wiki_health_check）
- 重构期：`distill/`（旧分册，重构完成后删除；lint 已配置跳过）

## 页面类型

- `source`（`sources/`）— 每个 ingest 来源一份摘要页，引回 raw 原文
- `entity`（`entities/`）— 具体事物：供应商、制度文件、工具表单、考核指标、SOP
- `concept`（`concepts/`）— 思想/方法/框架：ABC 分级、合规红线、考核方法论、决策框架
- `synthesis`（`synthesis/`）— 跨切面分析：分层分级方案、述标评估、应急决策树

## Tag 分类法

- `制度` — 管理办法、准入清退、合规红线
- `考核` — ABC 分级、评估体系、指标
- `SOP` — 场景化操作流程
- `方法论` — 决策框架、深度调研、管理思路
- `工具` — 表单、检查清单、脚本
- `培训` — 联盟培训、备课、现场手册
- `转型` — AI 转型、知识库建设

## 页面大小

- 软上限：400 行 / ~2,000 词
- 硬上限：800 行。必须拆

## Frontmatter 要求

每页必含：`type`、`title`、`tags`、`created`、`updated`。

非 source 页加 `sources`。source 页加 `raw`、`ingested`、（`authors` 若适用）。

## Slug 命名约定

- **中文 slug**：文件名用中文（如 `concepts/ABC分级体系.md`），引用 `[[ABC分级体系]]`
- 保守聚合：同类 SOP、同类指标合并为一页（避免每条 SOP 一页的碎片化）
- source 页 slug 保留 SM/MT/TM 编码前缀，与 raw 文件名对齐

## 交叉链接

- 正文用 `[[slug]]` 双括号
- 每页至少 1 个入站链接
- frontmatter `sources:` 用裸 slug

## 索引结构

当前扁平 `index.md`。超 150 页或 300 行时分片到 `indexes/`。

## 与兄弟 wiki 的协作

- `../wiki-viz/`（数据可视化）：独立 schema。本库需要可视化规范时链接到 `../wiki-viz/`
- 业务规则归本库，可视化实现归 wiki-viz

## Lint 节奏

- 结构 lint：每次 ingest 后
- 语义 lint：每周或每 10 次 ingest
- 溯源检查（wiki_health_check.py）：与结构 lint 同步

## 用户偏好

- 业务规则必须可溯到 raw 原文（制度文件）
- synthesis 页用决策树和流程图，少用散文
- 冲突记录保留历史（解决后移到"已过时"，不删除）
