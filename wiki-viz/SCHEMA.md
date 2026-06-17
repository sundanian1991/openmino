# 数据可视化知识库 Schema

> 本文件是此 wiki 的配置。进入本 wiki 时第一个读它，其约定覆盖 `llm-wiki` skill 的默认值。
> 与用户共同演进：发现反复出现的模式就加进来，不再适用就删。

## Wiki 位置

- Wiki 根：`wiki-viz/`（本目录）
- 原文层：`raw/`（卡帕西标准是平级外部目录，本库放在 wiki 根内部，SCHEMA 显式声明）
- 二进制原件：`raw/originals/`（HTML/SVG/xlsx）
- 健康判断层：`notes/`（冲突记录/待验证假设/已过时内容）
- 脚本：`scripts/`（wiki_lint + wiki_search + wiki_health_check）

> 说明：`raw/`、`notes/`、`scripts/` 在 wiki 根内部，wiki_lint.py 的 `SKIP_TOP_LEVEL_DIRS` 已配置跳过。

## 页面类型

本 wiki 使用四类标准页面，各有专属子目录：

- `source`（`sources/`）— 每个 ingest 来源一份摘要页，引回 raw 原文
- `entity`（`entities/`）— 具体事物：图表类型、样板、案例、token 系统、工具
- `concept`（`concepts/`）— 思想/方法/框架：前认知属性、格式塔、构图原则、配色理论
- `synthesis`（`synthesis/`）— 跨切面分析：构图×叙事矩阵、选型决策树、搭配禁忌

## Tag 分类法

保持小而克制：

- `原则` — 底层理论（前认知、格式塔、编码、配色）
- `构图` — 空间布局与叙事编排
- `模式` — 图表手法与形态
- `选型` — 决策树与适用场景
- `复刻` — 麦肯锡/极简信息图复刻
- `规范` — 供应商可视化专属体系
- `工具` — widget、脚本、开发规格
- `token` — 色阶/字号/间距等设计 token

## 页面大小

- 软上限：400 行 / ~2,000 词。接近时考虑拆分。
- 硬上限：800 行。必须拆。

## Frontmatter 要求

每页必含：`type`、`title`、`tags`、`created`、`updated`。

非 source 页加 `sources`（列出依据的 source 页 slug，裸 slug 不用 `[[]]`）。
source 页加：`authors`（若适用）、`raw`（指向 raw 文件路径）、`ingested`（日期）。

## Slug 命名约定

- **中文 slug**：文件名用中文（如 `concepts/前认知属性.md`），引用用 `[[前认知属性]]`
- 保守聚合：枚举型实体按功能组合并（如 `entities/构图模板.md` 含 13 种），避免每图一页的 stub 泛滥
- source 页 slug 保留 VZ 编码前缀：`sources/VZ-2026-001-可视化原则总纲.md`（与 raw 文件名对齐）

## 交叉链接

- 正文用 `[[slug]]` 双括号引用其他页（可带别名 `[[slug|显示文字]]`）
- 每页至少 1 个入站链接（避免孤儿页，wiki_lint 会检查）
- frontmatter 的 `sources:` 用裸 slug（`VZ-2026-001-可视化原则总纲`），不用双括号

## 索引结构

当前扁平：单 `index.md` 列全部页面，每页一行 `[[slug]] — 单句摘要`。
当页数超 150 或 index.md 超 300 行时，分片到 `indexes/<type>.md`。

## 与兄弟 wiki 的协作

- `../wiki/`（供应商管理）：独立 schema、独立编码。本库 `规范` 类页面引用供应商业务规则时，链接到 `../../wiki/`（相对路径，非 wikilink）
- `raw/` 原文归一处：兄弟 wiki 需要本库素材时用链接引用，不复制文件

## Lint 节奏

- 结构 lint（wiki_lint.py）：每次 ingest 后
- 语义 lint：每周或每 10 次 ingest
- 溯源检查（wiki_health_check.py）：与结构 lint 同步，互补（lint 查结构，health 查来源覆盖率/冲突/raw 完整性）

## 用户偏好

- 暖色学术风格：羊皮纸底色、衬线+无衬线分层、装饰克制（反 AI 味）
- 每个概念页末尾加"相关概念"段，列出 `[[wikilink]]`
- synthesis 页优先用表格和决策树，少用长段落
