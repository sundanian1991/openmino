# CHANGELOG

## 2026-06-19 · v2 — 闭环加固

### 新增

- **`scripts/validate-decision-card.py`**：决策卡硬校验脚本
  - 从 `nian-design/references/` 动态解析 layouts（S01-S28）/ components（32 族 + 4 子编号）/ VISUAL-STREAMS / tokens 枚举
  - 14 项校验：顶层字段、branch、visualStream、structuralStream、layoutSequence、heroType 映射、components.id、breakPoint 恰好 1 处、palette 三字段、dataCharts 与 branch 一致、embedSection 与 section 名一致、breakPoint.section 存在
  - 支持 `--strict`（WARN 也算 fail）和目录批量校验
  - 现有岐力决策卡校验 PASS

- **`evals/evals.json`**：8 条评测集
  - 覆盖数据分支（Numeral/Dashboard/Split）+ 文字分支（Statement/S2 叠加）+ 4 条边界（深色转浅色/上游缺置信度/气质混合/embedSection 一致）

- **`references/failure-modes.md`**：10 条失败模式库
  - 含症状/根因/规则/出处四段式
  - 规则可被校验脚本或 SKILL.md 引用

- **`.claude/commands/viz.md`**：`/viz` 入口判断器 slash command
  - 3 个诊断问题路由到对应技能链
  - 只判断不执行，强制走完整链路（上游→decision-card→nian-design）

### 修正

- SKILL.md 与 schema.md 的"26 族"→"32 族"、"S01-S29"→"S01-S28"，对齐 components.md/layouts.md 实际枚举
- SKILL.md 参考文件表补充 scripts/evals/failure-modes 三项
- SKILL.md 末尾新增"校验强制规则"段，明确 PASS 才能进 nian-design

### 设计决策

- **校验脚本动态解析源文件，不硬编码枚举**：避免 schema 写死"26 族"但 components.md 实际 32 族的元数据漂移问题（本次审计发现并修正）
- **`/viz` 只做路由不执行技能**：保持技能职责纯净，入口判断器不侵入技能边界
- **失败模式库追加不删**：每次踩坑追加 FM-XX，季度复盘检查哪些已被校验脚本覆盖

---

## 2026-06-13 · v1 — 初版

- 替代 nian-lenses，契约对齐 nian-design 施工输入
- SKILL.md / decision-card-schema.md / intake-text.md / intake-data.md
- output/决策卡-岐力SABC诊断.yaml 真实样例
