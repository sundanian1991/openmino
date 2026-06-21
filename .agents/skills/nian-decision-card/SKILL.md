---
name: nian-decision-card
description: |
  nian-design 的承上启下决策层。输入上游内容（策展定题/视觉语言 或 数据叙事大纲/图表），
  输出一张结构化「决策卡」——决定 nian-design 整页的一切：气质、骨架、组件、Hero、配色、打破、数据图位置。
  决策卡字段严格对齐 nian-design 的施工输入。不施工，只决策。
  上游：curatorial-workflow（文字）/ viz-data-storytelling + viz-design（数据）。下游：nian-design 施工。
---

# nian-decision-card

> **我决定整页的一切，但我自己不画一像素。**
> 上游给我"内容讲什么"，我产出"整页怎么呈现"的决策卡，交给 nian-design 施工。

---

## 我的位置

```
内容进来
   │
   ├──文字──▶ curatorial-workflow 阶段1-3（定题+叙事+视觉语言）
   ├──数据──▶ viz-data-storytelling → viz-design（叙事大纲+图表素材）
   │                      │
   ▼                      ▼
            ★ nian-decision-card 在这 ★
                 读上游 → 出决策卡
                          │
                          ▼
                 nian-design（照决策卡施工 + 5硬规则）
```

**我只做决策，不施工。** nian-design 只认我输出的决策卡，不收上游原始内容。

---

## 我的独有职责（上游给不了，必须我来定）

上游两条链都到不了"组件层"。这三样是我的核心价值：

| 决策项 | 为什么上游给不了 | 我怎么定 |
|---|---|---|
| **组件清单** | 策展给视觉原则、viz 给图表，都不选 UI 组件 | 从 nian-design 38 组件族按气质+骨架选 |
| **Hero 类型** | 上游没有"Hero"概念 | 由气质决定（见气质→Hero 映射表） |
| **打破位置** | 策展隐含节奏但不点明位置 | 基于骨架+气质，指定"第 N 屏何处打破" |

---

## WORKFLOW — 3 步产出决策卡

### Step 1 · 读上游，判断分支

读入上游产物，判断是文字分支还是数据分支：

- **文字分支**（来自 curatorial-workflow 阶段1-3）：
  - 阶段1 定题说明（策展对象/目标观众/材料边界）→ 提供主题与受众
  - 阶段2 页面类型表+导航图 → 提供**骨架**与页面结构
  - 阶段3 视觉语言（设计参照系/字体层级/色彩系统/版式节奏）→ 提供**气质方向**与配色角色

- **数据分支**（来自 viz-data-storytelling + viz-design）：
  - 叙事大纲（Big Idea/受众/图表清单/三幕叙事）→ 提供骨架与每张图的叙事功能
  - viz-design storyboard/spec → 提供视觉重量（hero/medium/light）与图表产物

### Step 2 · 做三项核心决策

**决策 A · 选气质**（9 选 1-2，来自 VISUAL-STREAMS.md）

按上游内容性质选视觉型，按内容长度选结构型：

| 内容信号 | 选哪种气质 |
|---|---|
| 主张/价值观/决策开头 | Statement 宣言对齐 |
| 品牌展示/高调开屏 | Diagonal 斜切入场 |
| 对比/新旧/方案A vs B | Split 对分屏 |
| 单一震撼指标/季度业绩 | Numeral 数字开屏 |
| 数据密集（≥3指标） | Dashboard 看板 |
| 时间/阶段/周期 | Pulse 节奏脉动 |
| 沉浸式/故事入口 | Entrance 入场沉浸 |
| ≥1500字 + 需导航 | + S2 长文导航（结构型，叠加） |
| ≥3章节 + 持久导航 | + S1 黑条书签（结构型，叠加） |

**决策 B · 定骨架序列**（从 layouts.md S01-S28 选 N）

骨架序列 = 每个 section 的 data-layout 顺序。
- 文字分支：直接从阶段2页面类型表映射
- 数据分支：从三幕叙事映射（铺垫/冲突/决议 → 对应骨架族）

**决策 C · 选组件 + Hero + 打破**

- **Hero 类型**：由决策 A 的气质直接决定（见下表）
- **组件清单**：按骨架需要从 components.md 38 族选
- **打破位置**：指定"第 N 屏的某处"用 ghost 水印 / 超大数字 / accent 色

**气质 → Hero 映射表**（来自 VISUAL-STREAMS.md，不自行发明）：

| 气质 | Hero 类型 | 典型骨架 |
|---|---|---|
| Statement | V4-Statement（左大断言+右侧数据） | S04 Split Statement |
| Diagonal | V1-Diagonal（左5fr+右7fr切角） | S01 Hero Cover |
| Split | V2-Split（1fr 1fr） | S09 对照双栏 |
| Numeral | V6-Numeral（3-5个KPI横排） | S03 Hero Numeral |
| Entrance | 100vh整屏+居中大字 | 整页1个section延展 |
| Pulse | Numeral/Split简化 | S08时间线/S20闭环 |
| Dashboard | Numeral缩到60vh | S14格子卡/S22 Bento |

### Step 3 · 输出决策卡

产出一份 YAML 决策卡，字段严格对齐 nian-design 的施工输入（见 schema）。

---

## 决策卡 Schema

输出格式（nian-design 直接消费）：

```yaml
# ═══ nian-decision-card 输出 · nian-design 施工输入 ═══

branch: text | data                # 文字分支 / 数据分支

# ── 气质（决策A）──
visualStream: Statement            # 视觉型，来自 VISUAL-STREAMS.md 9种
structuralStream: S2-长文导航       # 结构型（可选，叠加），null 则不用

# ── 骨架（决策B）──
layoutSequence:                    # 每个 section 的骨架序列
  - { section: 封面, layout: S01, role: hero }
  - { section: 核心结论, layout: S04, role: statement }
  - { section: 证据展开, layout: S11, role: evidence }

# ── 组件 + Hero + 打破（决策C）──
heroType: V4-Statement             # 由气质决定，见映射表
components:                        # 从 components.md 38族选，每项含用途
  - { id: "03 TABLES", purpose: 供应商业绩排名 }
  - { id: "16 FLOW PIPELINE", purpose: 准入流程 }
  - { id: "12a Bar Chart", purpose: 月度趋势 }
breakPoint:                        # 打破位置（恰好1处）
  section: 核心结论
  method: ghost水印                # ghost水印 / 超大数字 / accent色 / 异形元素
  spec: { text: Q2, opacity: 0.04, font: Playfair }

# ── 配色 ──
palette:
  primary: olive                   # darkgray/olive/earth（Primary 80%）
  accent: yellow                   # yellow/orange（Accent 10%）
  baseMode: light                  # light（亮色）/ dark（深色）/ mix

# ── 数据图位置（仅数据分支）──
dataCharts:                        # null 则无
  - { chartId: 趋势图, embedSection: 证据展开, size: full, source: viz-design产物 }
  - { chartId: 排名图, embedSection: 核心结论, size: half }

# ── 上游溯源（便于 nian-design 对账）──
source:
  narrative: "上游叙事大纲路径或阶段2页面类型表"
  audience: 决策者 | 业务方 | 高管
```

**字段对齐承诺**：以上每个字段都是 nian-design Step 1 要读的输入，零缝隙、零翻译损耗。这是与旧 nian-lenses 体系的核心区别——契约从头设计，不是事后对接。

---

## 与旧 nian-lenses 的区别

| | nian-lenses（已废弃） | nian-decision-card（本技能） |
|---|---|---|
| 输出字段 | brandTone/componentSelections/visualMode | visualStream/layoutSequence/heroType/components |
| 与 nian-design 对齐 | ❌ 字段对不上，从未接通 | ✅ 逐字段对齐施工输入 |
| 决策方式 | 6透镜串行，重 | 3步决策，气质表驱动 |
| Hero/打破 | 模糊 | 显式字段 |

nian-lenses 的 supplier-alliance-decision-trace.json 可作为本技能 schema 的参考案例（内容分析→决策的承接思路），但其字段格式不再使用。

---

## 边界

**我做**：读上游、选气质、定骨架、选组件、定 Hero、定打破、安排数据图位置、定配色角色。
**我不做**：画 HTML、渲染图表、写 CSS、内容校对——那是 nian-design 和 viz-design 的事。
**我不收**：原始数据、未经策展的零散材料——上游技能负责拆解。

---

## 参考文件

| 文件 | 用途 |
|---|---|
| `references/decision-card-schema.md` | 决策卡字段完整定义与枚举值 |
| `references/intake-text.md` | 如何吃 curatorial-workflow 阶段1-3 产物 |
| `references/intake-data.md` | 如何吃 viz-data-storytelling + viz-design 产物 |
| `../nian-design/references/VISUAL-STREAMS.md` | 9种气质定义（选气质必读） |
| `../nian-design/references/layouts.md` | S01-S28 骨架（选骨架必读） |
| `../nian-design/references/components.md` | 38 组件族（选组件必读） |
| `references/failure-modes.md` | 失败模式库（施工踩坑规则化） |
| `references/contract-reconciliation.md` | 契约对账（与 nian-design 双向对齐记录） |
| `scripts/validate-decision-card.py` | 硬校验脚本（产出必跑） |
| `evals/evals.json` | 8 条评测集（覆盖双分支+边界） |

---

## 校验强制规则

决策卡产出后**必须**跑硬校验脚本，PASS 才能进 nian-design：

```bash
python3 scripts/validate-decision-card.py <决策卡.yaml>
# 或批量校验 output/ 目录
python3 scripts/validate-decision-card.py output/
# --strict 把 WARN 也当 FAIL
python3 scripts/validate-decision-card.py <file> --strict
```

脚本从 `nian-design/references/` 动态解析枚举（layouts/components/VISUAL-STREAMS），不依赖本技能 schema 写死的数字——避免元数据漂移。校验失败的决策卡是废卡，nian-design 不收。

### 元数据漂移自检

改了 `components.md` 或 `layouts.md` 后，跑两个 lint 检查描述是否过时：

```bash
# 扫描 decision-card 自身文档
python3 scripts/validate-decision-card.py --lint-self
# 跨技能扫描 nian-design 侧文档（契约对账防御盲区）
python3 scripts/validate-decision-card.py --lint-all
```

扫描 SKILL.md / schema.md / intake-*.md / nian-design 侧文档的"N族""S01-SXX"表述，与源文件实际枚举对比。漂移则报错。这是 FM-05/FM-06 的自动化防御。`--lint-all` 补上了"decision-card 校验不到下游文档漂移"的盲区（见 `references/contract-reconciliation.md`）。

---

*最后更新：2026-06-19 — v3，新增 contract-reconciliation/--lint-all，修正 nian-design 侧 14 处元数据漂移*
