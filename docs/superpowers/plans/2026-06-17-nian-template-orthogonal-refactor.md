# nian-design 模板系统正交重构 · 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 nian-design 的 388 个散乱 HTML 模板收敛为 ~20-27 个正交模板(9 气质底座 × 场景变体),建立"visualStream + scene 选模板,其余字段注入"的清晰契约。

**Architecture:** 三层正交架构。Layer A(visualStream + scene)选模板,Layer B(palette/components/breakPoint/dataCharts/heroType)注入参数,Layer C(structuralStream + layoutSequence)正交叠加。决策卡新增 `scene` 字段。

**Tech Stack:** Markdown(SKILL.md / INDEX.md / schema)、HTML(模板文件)、git mv(归档)。

**关联设计文档:** `docs/plans/2026-06-17-nian-template-orthogonal-refactor-design.md`

---

## 关键路径与约定

- 技能根:`/Users/sundanian/.agents/skills/nian-design/`(简称 `$N`)
- 决策卡技能:`/Users/sundanian/.agents/skills/nian-decision-card/`(简称 `$D`)
- 工作区根:`/Users/sundanian/Documents/projects/ai-agents/my-agent`
- 归档目录:`$N/references/_archive/`(新建)
- 新模板库:`$N/references/templates/`(复用现有路径,但清空重建子结构)

**禁止**:`--no-verify`、`reset --hard`、`push --force main`、`commit --amend`(AGENTS.md 规范)。

**归档原则**:全部用 `git mv` 保留历史,不删除。归档不等于废弃,评估失败的种子也归档。

---

## 文件结构(重构后)

```
$N/references/
  templates/                          ← 唯一模板库(目标 ~20-27)
    base/                             ← 9 气质底座(可选,精简骨架)
    variants/                         ← ~15 场景变体(主模板)
    structure/                        ← 2 结构型叠加
    INDEX.md                          ← 唯一索引
  _archive/                           ← 归档区
    templates-30/
    templates-matrix/
    templates-v2/
    legacy-root/
  layouts.md            ← 保留
  components.md         ← 保留
  VISUAL-STREAMS.md     ← 保留
  CRAFT-RULES.md        ← 保留
  philosophy.md         ← 保留
```

---

## Task 1:建立归档骨架并迁移 5 套冗余目录

**Files:**
- Create: `$N/references/_archive/`(目录)
- Move: `$N/references/templates-30/` → `$N/references/_archive/templates-30/`
- Move: `$N/references/templates-matrix/` → `$N/references/_archive/templates-matrix/`
- Move: `$N/references/templates-v2/` → `$N/references/_archive/templates-v2/`
- Move: `$N/references/templates/`(根杂烩) → `$N/references/_archive/legacy-root/`
- Test: `git status` 应显示纯 rename,无内容变更

**目的**:先消除编号冲突(S01/T01 撞名),让 `nian-templates/` 成为唯一存活模板源,后续评估无歧义。

- [ ] **Step 1: 创建归档目录**

```bash
mkdir -p "$N/references/_archive/legacy-root"
```

- [ ] **Step 2: 迁移 templates-30**

```bash
git mv "$N/references/templates-30" "$N/references/_archive/templates-30"
```

- [ ] **Step 3: 迁移 templates-matrix**

```bash
git mv "$N/references/templates-matrix" "$N/references/_archive/templates-matrix"
```

- [ ] **Step 4: 迁移 templates-v2**

```bash
git mv "$N/references/templates-v2" "$N/references/_archive/templates-v2"
```

- [ ] **Step 5: 迁移 templates/ 根杂烩(保留 nian-templates/ 子目录)**

`references/templates/` 下既有杂烩 HTML/MD,也有 `nian-templates/` 子目录(要保留)。先把 nian-templates 临时移出,再迁移其余。

```bash
# 把 nian-templates 暂存到 references/ 根
git mv "$N/references/templates/nian-templates" "$N/references/nian-templates-staging"
# 迁移其余全部到 legacy-root
git mv "$N/references/templates" "$N/references/_archive/legacy-root-templates"
# 恢复 nian-templates
git mv "$N/references/nian-templates-staging" "$N/references/nian-templates"
```

- [ ] **Step 6: 验证**

```bash
# 应只剩 nian-templates/ 一个模板目录 + _archive/
ls "$N/references/" | grep -E "template|nian-template"
# 期望输出: _archive / nian-templates
```

- [ ] **Step 7: Commit**

```bash
git add -A "$N/references/"
git commit -m "refactor(nian-design): 归档5套冗余模板目录，仅留 nian-templates 作为种子源"
```

---

## Task 2:评估 30 个种子候选,产出评估清单

**Files:**
- Create: `$N/references/nian-templates/EVAL.md`(评估清单,临时文件)

**目的**:逐一评估 30 个 nian-templates 模板,决定哪些成为新体系种子、哪些归档。评估标准见设计文档 §4.1。

这是分析任务,不需要写代码。输出一份表格:每个模板 → 命中哪个新槽位 / 质量 / 决定(保留为种子/改造/归档)。

- [ ] **Step 1: 写评估脚本占位**

创建 `EVAL.md`,用如下表头:

```markdown
# nian-templates 30 模板评估

评估标准(每项 ✅/⚠️/❌):
- A. 气质对齐:Hero/节奏符合 VISUAL-STREAMS.md 克制规则
- B. 组件解耦:组件是槽位可替换,非硬编码
- C. token 化:用 CSS 变量,非硬编码色/字号
- D. 5 硬规则:无 box-shadow / 三层底色 / 无违规色条框

| 文件 | 目标槽位 | A | B | C | D | 决定 | 备注 |
|------|---------|---|---|---|---|------|------|
| S01-决策建议 | statement--decision | | | | | | |
| ... | | | | | | | |
```

- [ ] **Step 2: 逐个评估(分 3 批,每批 10 个)**

对每个模板执行:
1. 读文件,检查 Hero 区是否符合该气质克制规则
2. 检查是否有 `box-shadow`(grep)
3. 检查是否用 `var(--xxx)` token
4. 填入 EVAL.md 表格

命令模板(批量 grep 检查硬规则):

```bash
# 检查 box-shadow 违规
grep -l "box-shadow" "$N/references/nian-templates/"*.html || echo "无违规"
# 检查 token 化程度(用 var() 的数量)
for f in "$N/references/nian-templates/"*.html; do
  echo "$(basename $f): $(grep -c 'var(--' $f) vars"
done
```

- [ ] **Step 3: 汇总决定**

在 EVAL.md 末尾产出三组清单:
- `SEED`(直接作为新变体):列出 文件→新槽位
- `ADAPT`(需改造后用):列出 文件→新槽位 + 改造点
- `ARCHIVE`(归档):列出 文件

目标:`SEED + ADAPT` 覆盖 §2.3 矩阵的 15 个变体槽位 + 2 结构型。

- [ ] **Step 4: Commit**

```bash
git add "$N/references/nian-templates/EVAL.md"
git commit -m "docs(nian-design): 30模板评估清单，确定种子/改造/归档分组"
```

---

## Task 3:建立新模板目录结构

**Files:**
- Create: `$N/references/templates/base/`(空目录加 .gitkeep)
- Create: `$N/references/templates/variants/`
- Create: `$N/references/templates/structure/`

**注意**:`references/templates/` 这个路径在 Task 1 已被移空(内容进了 legacy-root)。现在重新创建为干净的子结构。

- [ ] **Step 1: 创建目录**

```bash
mkdir -p "$N/references/templates/base" \
         "$N/references/templates/variants" \
         "$N/references/templates/structure"
touch "$N/references/templates/base/.gitkeep" \
      "$N/references/templates/variants/.gitkeep" \
      "$N/references/templates/structure/.gitkeep"
```

- [ ] **Step 2: Commit**

```bash
git add "$N/references/templates/"
git commit -m "chore(nian-design): 建立新模板目录结构 base/variants/structure"
```

---

## Task 4:迁移种子模板到新槽位

**依据**:Task 2 的 EVAL.md 中 `SEED` 和 `ADAPT` 组。本任务只做 `git mv` 重命名迁移,不做内容改造(改造在 Task 5)。

**命名规范**:`<气质小写>--<场景>.html`(变体)、`<气质小写>.html`(底座)。

- [ ] **Step 1: 迁移 SEED 组(直接种子)**

根据 EVAL.md,典型映射(实际按 EVAL 结果执行):

```bash
git mv "$N/references/nian-templates/S01-决策建议-标准.html" \
       "$N/references/templates/variants/statement--decision.html"
git mv "$N/references/nian-templates/S05-品牌宣言-标杆.html" \
       "$N/references/templates/variants/statement--brand.html"
git mv "$N/references/nian-templates/D01-工作汇报-标准.html" \
       "$N/references/templates/variants/diagonal--report.html"
git mv "$N/references/nian-templates/P01-数据分析报告-标准.html" \
       "$N/references/templates/variants/split--data.html"
git mv "$N/references/nian-templates/N01-行业全景-标准.html" \
       "$N/references/templates/variants/numeral--data.html"
git mv "$N/references/nian-templates/E01-深度阅读笔记-标准.html" \
       "$N/references/templates/variants/entrance--knowledge.html"
git mv "$N/references/nian-templates/B01-数据仪表盘-标准.html" \
       "$N/references/templates/variants/dashboard--data.html"
git mv "$N/references/nian-templates/B02-监控看板-标准.html" \
       "$N/references/templates/variants/dashboard--monitor.html"
git mv "$N/references/nian-templates/P02-周报进度同步-标准.html" \
       "$N/references/templates/variants/pulse--report.html"
git mv "$N/references/nian-templates/U03-风险预警脉动-标杆.html" \
       "$N/references/templates/variants/pulse--monitor.html"
git mv "$N/references/nian-templates/E02-主题展馆-标杆.html" \
       "$N/references/templates/variants/entrance--brand.html"
git mv "$N/references/nian-templates/X01-长文导航结构-示范.html" \
       "$N/references/templates/structure/long-nav.html"
```

- [ ] **Step 2: 迁移 ADAPT 组(改造候选,先移到 variants/ 占位)**

对于 EVAL 标记为 ADAPT 的模板,先复制(保留原文件做参考)到 variants/ 对应槽位名:

```bash
# 示例:split--decision 无直接种子,从 matrix T03 改造
# (实际按 EVAL,如 ADAPT 组为空则跳过此步)
```

- [ ] **Step 3: 归档 nian-templates/ 中未选中的**

```bash
git mv "$N/references/nian-templates" "$N/references/_archive/nian-templates-remaining"
```

- [ ] **Step 4: 验证槽位覆盖**

```bash
ls "$N/references/templates/variants/" | sort
# 应覆盖矩阵中标记 ✓ 的槽位
```

对照设计文档 §2.3 矩阵,缺失的槽位记录为"待新建"。

- [ ] **Step 5: Commit**

```bash
git add -A "$N/references/"
git commit -m "refactor(nian-design): 迁移种子模板到正交槽位，归档未选中模板"
```

---

## Task 5:标注缺失槽位并处理待新建项

**目的**:矩阵中某些槽位无种子(如 split--decision、diagonal--brand、split--knowledge)。需明确处理:从 showcase 提取 / 从近邻变体复制改造 / 标记暂缺。

**Files:**
- Create: `$N/references/templates/GAPS.md`(缺口清单)

- [ ] **Step 1: 对照矩阵找出缺口**

对照设计文档 §2.3,列出 variants/ 中缺失的槽位。预期缺口(按 EVAL 实际调整):
- `split--decision`
- `split--knowledge`
- `diagonal--brand`
- `statement--data`
- `entrance--brand`(若有种子则无缺口)

- [ ] **Step 2: 写 GAPS.md**

```markdown
# 模板缺口清单

以下槽位无直接种子,处理方案:

| 缺口槽位 | 来源 | 方案 |
|---------|------|------|
| split--decision | matrix T03-DECISION | 从 _archive 提取骨架,token 化后放入 |
| split--knowledge | showcase H021 | 从 showcase 提取 |
| diagonal--brand | showcase R3 | 从 showcase 提取 |
| statement--data | S04 改造 | 剥离 AI 转型特定内容,泛化数据叙事 |
```

- [ ] **Step 3: 对每个缺口执行处理**

对每个缺口,选最低成本方案:
- **方案 a(优先)**:从 `_archive/` 找最近的旧模板,`git mv` 到 variants/,后续 Task 7 改造
- **方案 b**:从 `showcase/` 提取关键 section
- **方案 c**:复制近邻变体作为起点

```bash
# 示例:split--decision 从 archive matrix T03
git mv "$N/references/_archive/templates-matrix/T03-Diagonal-DECISION.html" \
       "$N/references/templates/variants/split--decision.html"
# 注意:T03 实际是 Diagonal 不是 Split,需按 EVAL 校正
```

- [ ] **Step 4: Commit**

```bash
git add -A "$N/references/templates/"
git commit -m "feat(nian-design): 补齐矩阵缺口槽位，记录来源方案"
```

---

## Task 6:编写新 INDEX.md(唯一索引)

**Files:**
- Create: `$N/references/templates/INDEX.md`

这是整个重构的核心交付物——替代失效的 `template-catalog.md`,成为 SKILL.md Step 1 的唯一检索入口。

- [ ] **Step 1: 写 INDEX.md**

内容结构:

```markdown
# nian-design 模板索引

> 唯一模板库。按 **气质(主)× 场景(副)** 检索。
> 选模板只看决策卡的 visualStream + scene 两个字段。
> 其余字段(palette/components/breakPoint/dataCharts)是注入参数,不改模板。

---

## 气质 × 场景 矩阵(主检索)

| 气质＼场景 | 数据 | 决策 | 知识 | 汇报 | 品牌 | 监控 |
|-----------|:----:|:----:|:----:|:----:|:----:|:----:|
| Statement  |  ✓   | ✓★★  |  —   |  —   |  ✓   |  —   |
| Diagonal   |  —   |  —   |  —   |  ✓   | ✓★★  |  —   |
| Split      |  ✓   |  ✓   |  ✓   |  —   |  —   |  —   |
| Numeral    | ✓★★  |  —   |  —   |  —   |  —   |  —   |
| Entrance   |  —   |  —   |  ✓   |  —   |  ✓   |  —   |
| Pulse      |  —   |  —   |  —   |  ✓   |  —   |  ✓   |
| Dashboard  |  ✓   |  —   |  —   |  —   |  —   | ✓★★  |

★★ = 首选。

## 文件清单

### variants/ — 场景变体(主模板)

| 文件 | 气质 | 场景 | 种子来源 |
|------|------|------|---------|
| statement--decision.html | Statement | 决策 | S01 |
| statement--brand.html | Statement | 品牌 | S05 |
| ... | | | |

### structure/ — 结构型叠加(挂到任意变体)

| 文件 | 用途 | 启用条件 |
|------|------|---------|
| long-nav.html | 长文导航 TOC | ≥1500字 + 需定位 |
| black-bar.html | 黑条书签 | ≥3章节 + 持久导航 |

---

## 选择流程(nian-design Step 1)

1. 读决策卡 `visualStream` → 锁定气质行
2. 读决策卡 `scene` → 锁定场景列
3. 行列交叉 → 命中 variants/ 下的变体文件
4. 若 `structuralStream` 非空 → 叠加 structure/ 下对应文件
5. 注入 palette / components / breakPoint / dataCharts

## 注入字段说明

| 字段 | 怎么用 |
|------|--------|
| palette | 替换模板的 CSS 变量(token 套件) |
| components | 在变体的 section 槽位填入 components.md 的 26 族 |
| breakPoint | 在指定 section 插入打破元素(恰好 1 处) |
| dataCharts | 在指定 section 嵌入图表 |
| heroType | 由 visualStream 派生,校验模板 Hero 一致即可 |

---

*最后更新:2026-06-17 · 正交重构*
```

- [ ] **Step 2: 验证矩阵与文件一致**

```bash
# INDEX 里列的每个文件都应存在
for f in $(grep -oE '[a-z]+--[a-z]+\.html' "$N/references/templates/INDEX.md"); do
  test -f "$N/references/templates/variants/$f" || echo "缺失: $f"
done
```

- [ ] **Step 3: Commit**

```bash
git add "$N/references/templates/INDEX.md"
git commit -m "docs(nian-design): 新唯一索引 INDEX.md，气质×场景正交矩阵"
```

---

## Task 7:删除失效的 template-catalog.md 引用

**Files:**
- Modify: `$N/SKILL.md`(移除 template-catalog 引用,改为指向新 INDEX)
- Delete: `$N/references/template-catalog.md`(归档,不删)

- [ ] **Step 1: 在 SKILL.md 中找出所有 template-catalog 引用**

```bash
grep -n "template-catalog" "$N/SKILL.md"
```

- [ ] **Step 2: 替换引用**

把 SKILL.md 里 Step 1 的模板选择逻辑改为指向 `references/templates/INDEX.md`,选择逻辑按 Task 6 的 INDEX "选择流程" 小节。

- [ ] **Step 3: 归档 template-catalog.md**

```bash
git mv "$N/references/template-catalog.md" "$N/references/_archive/template-catalog.md"
```

- [ ] **Step 4: 验证无幽灵引用**

```bash
# SKILL.md 不应再引用已归档文件
grep -nE "template-catalog|templates-30|templates-matrix|templates-v2" "$N/SKILL.md" && echo "仍有幽灵引用" || echo "OK"
```

- [ ] **Step 5: Commit**

```bash
git add -A "$N/"
git commit -m "refactor(nian-design): SKILL.md 指向新 INDEX，归档失效 template-catalog"
```

---

## Task 8:决策卡新增 scene 字段

**Files:**
- Modify: `$D/SKILL.md`(Step 3 schema + 选气质表)
- Modify: `$D/references/decision-card-schema.md`(scene 枚举定义)

- [ ] **Step 1: 在 decision-card-schema.md 新增 scene 定义**

在 schema 文件的字段定义区,`visualStream` 之后加入:

```markdown
## scene

**类型**:枚举(必填)
**作用**:与 visualStream 共同决定模板(副键)。
**枚举值**:
- `数据` — 数据报告/分析/盘点
- `决策` — 决策建议/方案选型/评估
- `知识` — 知识管理/阅读笔记/学习地图
- `汇报` — 工作汇报/周报/里程碑
- `品牌` — 品牌展示/宣言/定位
- `监控` — 实时监控/预警/看板

**选择依据**:看内容核心动作。数据为主→数据;要在选项间抉择→决策;传递知识→知识;同步进度→汇报;塑造形象→品牌;持续盯指标→监控。
```

- [ ] **Step 2: 在 nian-decision-card SKILL.md Step 3 的 YAML schema 加入 scene**

在 `visualStream` 字段下一行加:

```yaml
scene: 数据                       # 场景,与 visualStream 共同选模板
```

- [ ] **Step 3: 在选气质表(Step 2 决策A)补 scene 列**

把现有的"内容信号→气质"表扩展为同时给出推荐 scene:

```markdown
| 内容信号 | visualStream | scene |
|---|---|---|
| 主张/价值观/决策开头 | Statement | 决策 或 品牌 |
| 品牌展示/高调开屏 | Diagonal | 品牌 |
| 对比/新旧/方案A vs B | Split | 决策 |
| 单一震撼指标 | Numeral | 数据 |
| 数据密集(≥3指标) | Dashboard | 数据 或 监控 |
| 时间/阶段/周期 | Pulse | 汇报 或 监控 |
| 沉浸式/故事入口 | Entrance | 品牌 或 知识 |
```

- [ ] **Step 4: Commit**

```bash
git add "$D/SKILL.md" "$D/references/decision-card-schema.md"
git commit -m "feat(nian-decision-card): 新增 scene 字段，与 visualStream 共同选模板"
```

---

## Task 9:端到端验证(用现有决策卡走一遍)

**目的**:用真实的决策卡(岐力 SABC,visualStream=Diagonal + scene 应为数据/决策)走完选择流程,确认能命中模板。

- [ ] **Step 1: 取岐力决策卡的 visualStream**

从 `$N/output/路径A-viz-design-输出-岐力.json` 的 `decisions_for_nian.streams` 读出:`["Diagonal", "Long-form"]`。

- [ ] **Step 2: 推导 scene**

岐力 SABC 诊断 → 核心是数据诊断 → `scene = 数据` 或 `决策`。决策卡新流程应输出 `scene: 数据`(诊断报告)。

- [ ] **Step 3: 查 INDEX 矩阵**

Diagonal × 数据 → 矩阵中 Diagonal 行数据列是 `—`(空)。

**这是预期内的发现**:Diagonal 主用于品牌/汇报,不适合纯数据诊断。正确处理应该是:
- 该案例实际更接近 Dashboard(数据密集)或 Split(对比)
- 或者:Diagonal 作为视觉 + 叠加结构型,数据靠注入

记录这个发现,说明矩阵需要在实际使用中校准。

- [ ] **Step 4: 写验证报告**

在 `docs/plans/` 下追加验证结论到设计文档,记录:
- 哪些 (气质,场景) 组合命中了模板
- 哪些组合矩阵标空但实际需求存在 → 需要补槽位或调整矩阵

- [ ] **Step 5: Commit**

```bash
git add docs/plans/
git commit -m "test(nian-design): 端到端验证选择流程，记录矩阵校准点"
```

---

## Task 10:更新 CHANGELOG 与清理

**Files:**
- Modify: `$N/CHANGELOG.md`(追加 2026-06-17 条目)
- Delete: `$N/references/nian-templates-staging`(如存在残留)

- [ ] **Step 1: CHANGELOG 追加**

```markdown
| 2026-06-17 | 388 模板散乱在 6 套冲突目录，字段职责混淆导致模板爆炸 | 三层正交重构：388→~20-27。气质×场景矩阵选模板，其余字段注入。决策卡新增 scene 字段。5 套冗余目录归档。 |
```

- [ ] **Step 2: 最终验证**

```bash
# 1. 模板库单一目录
ls "$N/references/templates/"
# 期望: base/ variants/ structure/ INDEX.md

# 2. 无幽灵引用
grep -rE "template-catalog|templates-30|templates-matrix|templates-v2|nian-templates-staging" "$N/SKILL.md" && echo "FAIL" || echo "OK"

# 3. 决策卡有 scene
grep -n "scene:" "$D/SKILL.md" && echo "OK"

# 4. 归档完整
ls "$N/references/_archive/"
```

- [ ] **Step 3: Commit**

```bash
git add "$N/CHANGELOG.md"
git commit -m "docs(nian-design): CHANGELOG 记录正交重构"
```

---

## Self-Review 结论

**Spec coverage(设计文档对照)**:
- §1 诊断 → Task 1 归档解决目录冲突 ✅
- §2.1-2.3 三层架构 + 矩阵 → Task 3-6 建立新结构 + INDEX ✅
- §2.4 字段职责 → Task 8 决策卡新增 scene ✅
- §2.5 选择逻辑 → Task 6 INDEX 选择流程 + Task 7 SKILL.md ✅
- §3 目录结构 → Task 1+3+4 ✅
- §4 种子筛选 → Task 2+4+5 ✅
- §5 影响范围 → Task 7(SKILL)+8(决策卡)✅
- §6 验证标准 → Task 9+10 ✅

**已知风险**:
- Task 2 评估是人工判断,30 个文件需逐个读,耗时。可派子代理并行加速。
- Task 5 缺口处理依赖 showcase 提取,可能需要额外新建模板。
- Task 9 发现的"Diagonal×数据 矩阵为空"提示矩阵需在使用中校准,属预期。

**未覆盖(故意 YAGNI)**:
- base/ 底座目录:暂留空(.gitkeep),是否需要独立底座文件待使用验证后再定。变体本身已含底座骨架。
- 旧 showcase-archive 的整理:本次不动,属下一阶段。
