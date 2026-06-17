# Wiki Log

> 追加式时间线（ingest/query/lint）。只追加不删改。

## [2026-06-17] refactor | wiki-viz 原子化重构

从分册式（7 个 NN_主题.md）重构为卡帕西标准原子化结构（49 页）：
- concepts/ 18 页（理论骨架）
- entities/ 18 页（具体事物，枚举型保守聚合）
- synthesis/ 5 页（矩阵/决策树/禁忌）
- sources/ 8 页（每个 raw 一份摘要）
- 新增 SCHEMA.md、index.md、log.md
- 迁移卡帕西官方 wiki_lint.py / wiki_search.py
- 配置 SKIP_TOP_LEVEL_DIRS 跳过 raw/notes/scripts
- 旧 distill/ 待删除（重构验证后）

动机：旧分册式违反卡帕西标准（一页打包 10-20 概念、无 frontmatter、无 wikilink、lint 缺孤儿页/断链检查）。

## [2026-06-17] ingest | wiki-viz 首批 40 文件（旧分册式，已被重构取代）

历史记录：从 docs/ 摄取 40 个文件到 7 个分册。此形态已被本次重构取代，详见上一条。
