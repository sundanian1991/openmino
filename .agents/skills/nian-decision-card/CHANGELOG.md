# CHANGELOG

## 2026-06-19 · v3 — 契约对账与跨技能防御

### 新增

- **`references/contract-reconciliation.md`**：契约对账文档（P4 产出）
  - 字段消费对账：10 字段中 6 个明确消费，4 个有 gap
  - 枚举漂移对账：发现 nian-design 侧 14 处过时枚举
  - 硬规则对齐：CRAFT-RULES Rule 4 打破形态与 breakPoint.method 不完全对齐
  - 修复清单 + 验证方式

- **`--lint-all` 模式**：跨技能扫描 nian-design 侧文档
  - 补上"decision-card 校验不到下游文档漂移"的盲区
  - 扫描 nian-design 的 SKILL.md / CRAFT-RULES.md / checklist.md / DESIGN-SYSTEM-MAP.md / showcase-index.md
  - 白名单：含"Nothing Design""原始 26"的来源说明行跳过（历史事实）

### 修正（nian-design 侧 14 处元数据漂移）

- SKILL.md 6 处：26→32，S01-S29→S01-S28
- DESIGN-SYSTEM-MAP.md 5 处：同上 + 补 27-38 组件清单
- checklist.md 2 处：S01-S21→S01-S28，S01-S12→S01-S28
- showcase-index.md 1 处：S01-S21→S01-S28
- templates-v2/ 2 文件 5 处：26→32
- templates/ 和 templates-matrix/ HTML 各 1 处：26→32
- showcase/nian-components.md 和 .html 各 1 处：标注"原始 26 族，现已扩展至 32 族"

### 设计决策

- **`--lint-all` 把跨技能元数据漂移变成可自动发现的问题**：contract-reconciliation 暴露的盲区——decision-card 自身文档干净，但 nian-design 侧文档有 14 处漂移——现在用 `--lint-all` 自动扫描
- **白名单机制**：来源说明（"Nothing Design 26 组件族"是历史事实）不报，只报"声称当前枚举数"的漂移
- **契约对账作为 P4 轻量版**：不空跑完整 HTML，用对账表暴露契约 gap，比真跑一遍 nian-design 更高效

---

## 2026-06-19 · v2 — 闭环加固

### 新增

- **`scripts/validate-decision-card.py`**：决策卡硬校验脚本
  - 从 `nian-design/references/` 动态解析 layouts（S01-S28）/ components（32 族 + 4 子编号）/ VISUAL-STREAMS / tokens 枚举
  - 14 项校验：顶层字段、branch、visualStream、structuralStream、layoutSequence、heroType 映射、components.id、breakPoint 恰好 1 处、palette 三字段、dataCharts 与 branch 一致、embedSection 与 section 名一致、breakPoint.section 存在
  - 支持 `--strict`（WARN 也算 fail）和目录批量校验
  - **`--lint-self` 模式**：扫描技能文档元数据漂移（FM-05/FM-06 自动化防御）
  - Pulse 气质的 heroType 允许 Numeral简化 或 Split简化（与 schema 映射表一致）
  - 现有岐力决策卡校验 PASS

- **`evals/evals.json`**：8 条评测集
  - 覆盖数据分支（Numeral/Dashboard/Split）+ 文字分支（Statement/S2 叠加）+ 4 条边界（深色转浅色/上游缺置信度/气质混合/embedSection 一致）

- **`references/failure-modes.md`**：10 条失败模式库
  - 含症状/根因/规则/出处四段式
  - 规则可被校验脚本或 SKILL.md 引用
  - FM-05/FM-06 标注已被 `--lint-self` 自动化防御

- **`.claude/commands/viz.md`**：`/viz` 入口判断器 slash command
  - 3 个诊断问题路由到对应技能链
  - 只判断不执行，强制走完整链路（上游→decision-card→nian-design）

### 修正

- SKILL.md / schema.md / intake-text.md 的"26 族"→"32 族"、"S01-S29"→"S01-S28"，对齐 components.md/layouts.md 实际枚举（共 6 处残留，自审发现）
- SKILL.md 参考文件表补充 scripts/evals/failure-modes 三项
- SKILL.md 末尾新增"校验强制规则"段 + "元数据漂移自检"段

### 设计决策

- **校验脚本动态解析源文件，不硬编码枚举**：避免 schema 写死"26 族"但 components.md 实际 32 族的元数据漂移问题（本次审计发现并修正）
- **`--lint-self` 把元数据漂移变成可自动发现的问题**：FM-05/FM-06 从"人记得改描述"升级为"脚本自动报错"
- **`/viz` 只做路由不执行技能**：保持技能职责纯净，入口判断器不侵入技能边界
- **失败模式库追加不删**：每次踩坑追加 FM-XX，季度复盘检查哪些已被校验脚本覆盖

---

## 2026-06-13 · v1 — 初版

- 替代 nian-lenses，契约对齐 nian-design 施工输入
- SKILL.md / decision-card-schema.md / intake-text.md / intake-data.md
- output/决策卡-岐力SABC诊断.yaml 真实样例
