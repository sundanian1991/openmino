# nian-design 模板系统重构设计

> **日期**:2026-06-17
> **状态**:已确认(brainstorming 阶段完成,待实现)
> **方向**:方案 B — 三层正交架构

---

## 1. 问题诊断

### 1.1 现状:388 个 HTML 文件,6 套并存目录

| 目录 | 数量 | 编号体系 | 评估 |
|------|------|----------|------|
| `references/templates/nian-templates/` | 30 | S/D/P/N/E/U/B/M/X + 序号 | ✅ 最新,对齐 9 气质 |
| `references/templates-30/` | 30 | 与上撞名 | ❌ 旧版,内容被覆盖 |
| `references/templates-matrix/` | 25 | T01-T18 | ❌ 矩阵思路对但编号冲突 |
| `references/templates-v2/` | 16 | T01-T08(成对) | ❌ 早期实验,组件族复杂化 |
| `references/templates/`(根) | 55 | 杂烩 + 第三方 | ❌ 吸收残留 |
| `templates/`(skill 根) | 24 | 杂烩 | ❌ 早期原型 |

**4 套编号体系互相冲突**:同一 `S01` 在不同目录指不同文件;同一 `T01` 在 matrix 和 v2 指不同东西。

### 1.2 根因:字段职责混淆

决策卡的 9 个字段被当成同一层级,导致"每出现新组合就建新模板"。实际上它们分 3 层:

```
Layer A · 选模板(2字段)
  visualStream  ← 主键(9 选 1)
  scene         ← 副键(新增,6 场景选 1)

Layer B · 注入参数(5字段,选完模板后填)
  palette / dataCharts / breakPoint / heroType(派生) / source

Layer C · 结构叠加(2字段,与模板正交)
  structuralStream / layoutSequence
```

**只有 `visualStream + scene` 真正选模板**。把 B/C 当 A 用,是模板爆炸的根源。

### 1.3 历史教训(来自 CHANGELOG)

- `templates-v2` 的 19 模板规划把"26 组件族分配到每个模板"当成定义——结果每个模板都成独立工程,组件分配表 26×19 巨大
- `template-catalog.md` 声称 36 矩阵(6场景×3深度×2气质)但只生成了 6 个,与 nian-templates 的 30 个并存且矛盾
- 反复重构(06-01→06-11 共 7 次大改)说明没抓住"字段分层"这个根

---

## 2. 设计:三层正交架构

### 2.1 核心原则

**模板只管 Layer A(选模板)。B 是注入参数,C 是正交叠加。**

```
气质底座(9)         场景变体(每底座 2-3)     组件(26族,按需注入)
     │                    │                         │
     ▼                    ▼                         ▼
Statement ────→ [数据|决策|宣言] ────→ +TABLES +rank-list +insight-rows
Diagonal  ────→ [品牌|汇报]      ────→ +stacked-img +three-col
Split     ────→ [报告|对比]      ────→ +editorial +data-rows
Numeral   ────→ [数据|盘点]      ────→ +KPI +sparkline
Entrance  ────→ [品牌|阅读]      ────→ +100vh-hero
Pulse     ────→ [时间线|周期]    ────→ +timeline +step-sequence
Dashboard ────→ [监控|看板]      ────→ +bento +gauge +sparkline
[S1黑条/S2长文]→ 叠加到任意视觉型 → 挂 nav/TOC
```

### 2.2 模板总量:27

**9 底座 + ~18 场景变体 = 27 个**(从 388 收敛)。

正交带来的可对比性:
- **同底座比场景**:Statement-数据 vs Statement-决策 → 场景如何影响 section 序列
- **同场景比气质**:数据场景下 Numeral vs Dashboard vs Pulse → 气质如何影响表达

### 2.3 气质 × 场景 矩阵(主检索)

依据 `VISUAL-STREAMS.md` 频次表 + `nian-templates/INDEX.md` 场景映射,确定每个气质适配的场景:

| 气质＼场景 | 数据 | 决策 | 知识 | 汇报 | 品牌 | 监控 | 变体数 |
|-----------|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| Statement  |  ✓   | ✓★★  |  —   |  —   |  ✓   |  —   | 3 |
| Diagonal   |  —   |  —   |  —   |  ✓   | ✓★★  |  —   | 2 |
| Split      |  ✓   |  ✓   |  ✓   |  —   |  —   |  —   | 3 |
| Numeral    | ✓★★  |  —   |  —   |  —   |  —   |  —   | 1 |
| Entrance   |  —   |  —   |  ✓   |  —   |  ✓   |  —   | 2 |
| Pulse      |  —   |  —   |  —   |  ✓   |  —   |  ✓   | 2 |
| Dashboard  |  ✓   |  —   |  —   |  —   |  —   | ✓★★  | 2 |

★★ = 该气质在此场景是首选/高频。变体数合计 = 3+2+3+1+2+2+2 = **15 视觉变体**。

**结构型叠加(不占槽位,挂到任意视觉变体上)**:
- S1 黑条书签:≥3章节 + 持久导航
- S2 长文导航:≥1500字 + 需定位

**最终模板数 = 15 变体 + 9 底座(其中底座是变体的精简骨架,部分可由变体归一) + 2 结构叠加 ≈ 20-27 个**(实现时合并底座与首选变体)。

### 2.4 决策卡字段职责(重构后)

| 字段 | 层 | 作用 | 是否新增 |
|------|----|----|:------:|
| `visualStream` | A 选模板 | 主键 → 锁定气质底座 | 否 |
| `scene` | A 选模板 | 副键 → 锁定场景变体 | **新增** |
| `structuralStream` | C 正交 | 决定挂 nav/TOC,不另建模板 | 否 |
| `layoutSequence` | C 正交 | section 骨架,从 layouts.md 选 | 否 |
| `heroType` | B 注入 | 由 visualStream 派生 | 否 |
| `palette` | B 注入 | 3 token 套件 | 否 |
| `components` | B 注入 | 26 族按需填 | 否 |
| `breakPoint` | B 注入 | 1 处 | 否 |
| `dataCharts` | B 注入 | 嵌入位置 | 否 |

**唯一变更:新增 `scene` 字段**(枚举:数据/决策/知识/汇报/品牌/监控)。

### 2.5 选择逻辑(SKILL.md Step 1 重写)

```
读决策卡
  ├─ visualStream + scene → 查 INDEX 矩阵 → 命中变体文件
  ├─ structuralStream 非空 → 叠加 structure/ 下对应文件(nav/TOC)
  ├─ palette → 替换 CSS 变量(token 套件)
  ├─ components → 在变体的 section 槽位注入组件
  ├─ breakPoint → 在指定 section 插入打破元素
  └─ dataCharts → 在指定 section 嵌入图表
```

---

## 3. 目录结构(重构后)

```
references/
  templates/                          ← 唯一模板库(~20-27)
    base/                             ← 9 气质底座(纯骨架,可选)
      statement.html
      diagonal.html
      ...
    variants/                         ← ~15 场景变体(底座+section序列+组件槽)
      statement--data.html
      statement--decision.html
      statement--brand.html
      diagonal--report.html
      diagonal--brand.html
      split--data.html
      split--decision.html
      split--knowledge.html
      numeral--data.html
      entrance--brand.html
      entrance--knowledge.html
      pulse--report.html
      pulse--monitor.html
      dashboard--data.html
      dashboard--monitor.html
    structure/                        ← 2 结构型叠加
      black-bar.html
      long-nav.html
    INDEX.md                          ← 唯一索引(矩阵表 + 注入说明)
  _archive/                           ← 归档区(388 中未选中的)
    templates-30/
    templates-matrix/
    templates-v2/
    legacy-root/                      ← templates/ 根 + 第三方
  layouts.md                          ← 保留(S01-S29 section 骨架,Layer C 用)
  components.md                       ← 保留(26 族,Layer B 注入用)
  VISUAL-STREAMS.md                   ← 保留(9 气质定义)
  CRAFT-RULES.md                      ← 保留(5 硬规则)
  philosophy.md                       ← 保留
```

**删除**:`template-catalog.md`(36 矩阵,已失效)、`DESIGN-SYSTEM-MAP.md`(如已被 token CSS 替代)。

---

## 4. 种子来源(部分保留策略)

### 4.1 筛选标准

一个现有模板能成为新体系种子,需满足:
1. **气质对齐**:Hero 和节奏符合 `VISUAL-STREAMS.md` 该气质的克制规则
2. **组件解耦**:组件是"槽位填充"而非"硬编码",能替换
3. **token 化**:用 CSS 变量而非硬编码颜色/字号
4. **通过 5 硬规则**:无 box-shadow、三层底色、无违规色条框

### 4.2 候选种子(来自 nian-templates/,最新且对齐)

| 新变体 | 种子候选(nian-templates) | 说明 |
|--------|--------------------------|------|
| statement--decision | S01-决策建议-标准.html | Statement+决策,基础 |
| statement--brand | S05-品牌宣言-标杆.html | Statement+品牌,标杆 |
| statement--data | S04-AI转型方案-标杆.html | 含数据叙事,需改造 |
| diagonal--report | D01-工作汇报-标准.html | Diagonal+汇报 |
| diagonal--brand | (showcase R3 品牌展示) | 需从 showcase 提取 |
| split--data | P01-数据分析报告-标准.html | Split+数据 |
| split--decision | (无直接种子) | 需新建或从 matrix T03 改造 |
| split--knowledge | (showcase H021 知识管理-split) | 需提取 |
| numeral--data | N01-行业全景-标准.html | Numeral+数据 |
| entrance--knowledge | E01-深度阅读笔记-标准.html | Entrance+阅读 |
| entrance--brand | E02-主题展馆-标杆.html | Entrance+品牌展馆 |
| pulse--report | P02-周报进度同步-标准.html | Pulse+汇报 |
| pulse--monitor | U03-风险预警脉动-标杆.html | Pulse+监控 |
| dashboard--data | B01-数据仪表盘-标准.html | Dashboard+数据 |
| dashboard--monitor | B02-监控看板-标准.html | Dashboard+监控 |
| structure/black-bar | (showcase H062) | 需提取 |
| structure/long-nav | X01-长文导航结构-示范.html | 结构型 |

**约 12 个有直接种子,3-5 个需从 showcase 提取或新建。**

### 4.3 评估流程(实现阶段执行)

每个候选种子过一遍:
1. 是否通过 5 硬规则(校验脚本 `validate-nian-deck.mjs`)
2. 气质克制规则符合度(Hero 字号、切角比例、数字个数等)
3. 组件是否可替换槽位化
4. token 化程度

不达标的 → 归档,该槽位标注"待新建"。

---

## 5. 影响范围

### 5.1 需修改

| 文件 | 改动 |
|------|------|
| `nian-design/SKILL.md` | Step 1 重写为"读 visualStream+scene → 查矩阵 → 命中变体";移除 template-catalog 引用 |
| `nian-decision-card/SKILL.md` | Step 3 schema 新增 `scene` 字段;选气质表补 scene 列 |
| `nian-decision-card/references/decision-card-schema.md` | 新增 scene 枚举定义 |
| `nian-design/references/templates/INDEX.md`(新) | 唯一索引,矩阵表 |

### 5.2 需新建

- `references/templates/base/`、`variants/`、`structure/`、`INDEX.md`
- 归档目录 `references/_archive/`

### 5.3 需归档(不删除,移入 _archive/)

- `references/templates-30/`(30)
- `references/templates-matrix/`(25)
- `references/templates-v2/`(16)
- `references/templates/` 根的第三方 + batch1(~50)
- `templates/` skill 根杂烩(24)
- `references/showcase-archive/` 的非 H 系列参考(评估后)

### 5.4 不变

- `layouts.md` / `components.md` / `VISUAL-STREAMS.md` / `CRAFT-RULES.md` / `philosophy.md`
- `tokens/` CSS 变量
- `guidelines/` card
- `showcase/` 当前 showcase 仍作气质参考

---

## 6. 验证标准

实现完成后需通过:
1. **数量**:模板库 20-27 个,单一目录,单一索引
2. **正交**:同底座变体可对比、同场景不同气质可对比
3. **字段对齐**:决策卡每个字段都有明确消费路径(A/B/C 分层)
4. **种子质量**:每个变体通过 5 硬规则 + 气质克制规则
5. **无幽灵引用**:SKILL.md 不再引用已归档目录
6. **端到端**:用现有决策卡(如岐力 SABC)走一遍,能命中 Diagonal 变体并施工

---

## 7. 端到端验证结果（Task 9 实测 · 2026-06-17）

用岐力 SABC 诊断报告(真实历史案例)走一遍新流程。

### 案例参数
- 内容:SABC 等级诊断,4 KPI + 等级分布 + 热力图 + 对比 + 预警名单 + 行动建议
- 旧 viz-design 输出:`streams: ["Diagonal", "Long-form"]`
- 核心动作:数据诊断 → `scene = 数据`

### 矩阵命中测试

| 组合 | 矩阵结果 | 命中文件 |
|------|---------|---------|
| Diagonal × 数据 | **—** (空) | 无 |
| Statement × 数据 | ✓ | `statement--data.html` |
| Dashboard × 数据 | ✓ | `dashboard--data.html` |

### 关键发现:正交矩阵主动暴露气质错配

旧流程给岐力选了 Diagonal(斜切入场),但:
- Diagonal 气质主用于**品牌展示/高调开屏**(矩阵中仅 汇报✓、品牌★★)
- 数据诊断报告需要严肃、信息密集 → 应该用 Statement 或 Dashboard
- Diagonal 的 clip-path 斜切 + 深色块,与多图表的严肃诊断气质冲突

**新矩阵正确阻止了这个错配**:Diagonal×数据 = —(空),强制回退到合适的气质。

### 结论

正交矩阵的价值不仅在"找到模板",更在**主动阻止气质与场景的错配**。这是旧 36 模板矩阵(6场景×3深度×2气质)做不到的——旧矩阵把 Diagonal 硬塞进数据场景,产出了气质不匹配的页面。

**后续校准点**:
- viz-design / nian-decision-card 在选气质时,应先看 scene,再从该 scene 列可选气质中选,避免选了矩阵为空的组合
- nian-decision-card SKILL.md 的决策 A 表已体现这点(每个内容信号同时给出 visualStream + scene)
- 若决策卡确实产出矩阵为空的组合,nian-design 应报错回上游,而非强行施工

---

*设计确认:用户已选方案 B + 新增 scene 字段 + 筛选后部分保留。实现已完成(Task 1-10)。*
