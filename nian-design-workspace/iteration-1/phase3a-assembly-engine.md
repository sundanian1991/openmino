# Phase 3A · 施工引擎 — Section拼接规则 + 组件注入规则

> 生成：2026-06-14 · 基于 R/H 107个文件结构提取 + components.md 26族组件

---

## 一、施工流程（5步）

### Step 0 · 取规格卡
从 36 张规格卡中取目标模板：
- 场景 + 深度 + 气质
- 骨架序列（5-9个section）
- 组件配额
- 配色方案
- 打破点

### Step 1 · 铺CSS基础
```css
/* 必须引入 */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* 必须Token */
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-strong: #C0C0B8;
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;
  --olive: #4A5D3A;
  --orange: #E55B2B;
  --earth: #8B7355;
  --glacier: #2A4A5A;
  --yellow: #FFD100;
  --error: #C62828;
  --success: #2E7D32;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

**场景色映射**：
| 场景 | primary | accent |
|------|---------|--------|
| 感知 | glacier(#2A4A5A) | orange |
| 决策 | earth(#8B7355) | orange |
| 计划 | olive(#4A5D3A) | yellow |
| 执行 | earth(#8B7355) | orange |
| 沉淀 | earth(#8B7355) | yellow |
| 对外 | olive(#4A5D3A) | yellow |

### Step 2 · 按骨架序列拼接Section

**核心规则**：
1. 每个 `<section>` 必须标注 `data-layout="Sxx"`
2. Section 之间用 1px border-bottom(--border) 分隔
3. 深浅底色交替规则：max连续2个浅色 → 1个深色

**底色交替模式**：
```
浅→浅→深→浅→深→浅→深  (7 section 标准)
浅→浅→深→浅→深           (5 section)
浅→深→浅→深→浅→深        (6 section)
```

**深色Section实现**：`background: var(--text-display); color: #fff;`

### Step 3 · 组件注入

从 components.md 按组件ID取HTML+CSS，注入到对应Section中。关键约束：
- 不修改组件CSS结构，只替换内容
- 深色背景时，组件用深色模式token（加-d后缀变体）
- 每Section内组件数 1-3 个

**组件→Section 典型映射**：
| 骨架 | 注入组件 |
|------|---------|
| S01 Cover | 23-DecoNumber(ghost) |
| S03 Numeral Hero | 01-Cards + 23-DecoNum |
| S05 Metric | 01-Cards + 11-Progress + 23-DecoNum |
| S06 RankBars | 04-Lists + 05-Tables + 12-Mini |
| S07 DataTable | 05-Tables |
| S09 Comparison | 17-DoDon't + 20-Asymmetric |
| S10 Pipeline | 16-FlowPipeline |
| S11 ImageText | 01-Cards + 26-StackedImg |
| S14 GridCards | 01-Cards + 13-Widgets |
| S15 Statement | 23-DecoNumber |
| S18 Closing | 23-DecoNumber + 14-Overlay |
| S21 Footer | 06-Nav + 07-Tags |
| S22 Bento | 01-Cards + 12-Mini + 13-Widgets |

### Step 4 · 打破点落实

每个模板恰好1处打破，来自规格卡定义。常见打破方法：
- **ghost水印**：`font-size:180px; opacity:0.04-0.06;` 装饰文字
- **斜切clip-path**：`clip-path: polygon(12% 0,100% 0,100% 100%,0 100%)`
- **超大数字**：JetBrains Mono 96-120px
- **打破色**：单元素用--orange/--yellow跳出体系
- **打破圆角**：某卡片用border-radius:16px打破4px规则
- **打破网格**：某Section用非12列网格

### Step 5 · 硬规则自检

```
[ ] Rule 1 · 三层金字塔：眯眼测试通过
[ ] Rule 2 · Type Budget：字号≤3/字重≤2/字体≤2
[ ] Rule 3 · Asymmetry：非50/50居中
[ ] Rule 4 · One-Break：恰好1处打破
[ ] Rule 5 · Visual Variety：≥3数据段时≥2形态
```

---

## 二、Section 深浅交替规则（详细）

### 2.1 7个Section标准交替（L3深度）

```
Section 1 (Hero)  : 深/浅取决于气质
Section 2 (数据)  : 浅 (--bg)
Section 3 (结构)  : 浅/深取决于骨架
Section 4 (数据)  : 深 (--text-display) ★强制深色
Section 5 (转场)  : 浅 (--surface)
Section 6 (收束1) : 深 (--text-display) ★强制深色
Section 7 (收束2) : 浅 (--bg)
```

### 2.2 深色Section启用条件
- **强制深色**：S15金句页、S18收束宣言
- **可选深色**：S01封面(Diagonal气质)、S03数据Hero(Dashboard气质)
- **禁止深色**：S07数据表格、S21页脚

### 2.3 Section间过渡
- 连续2个浅色Section后必须插入深色Section
- 深色→浅色过渡不用分隔线
- 浅色→深色过渡用 `border-bottom: 1px solid var(--border)`

---

## 三、组件注入规则（详细）

### 3.1 组件取用原则
1. 从 `components.md` 取完整HTML+CSS（包含亮色/深色双模式）
2. 替换占位内容为真实业务数据
3. 保留组件class命名，不发明新class

### 3.2 深色模式适配
当Section背景为 `var(--text-display)` 时：
- 组件背景用 `var(--surface-d, #2C2C2C)`
- 文字色用 `var(--text-primary-d, #E0E0E0)`
- 边框色用 `var(--border-d, #3A3A3A)`
- Brand色映射：olive→olive-d(#6A9A5A), earth→earth-d(#A08060)

### 3.3 每Section组件上限
| Section类型 | 最多组件数 |
|------------|:--:|
| Hero | 2 |
| 数据段 | 3 |
| 结构段 | 3 |
| 转场段 | 1 |
| 收束段 | 2 |

---

## 四、Section种子库索引

### 4.1 Hero段种子（从R/H取最佳）

| 模式 | 种子来源 | 行数 | 说明 |
|------|---------|:--:|------|
| H1 Statement | R5-金条赛马规则 §hero | ~80 | 业务场景Statement标杆 |
| H2 Diagonal | R4-风险预警-标杆 §hero | ~90 | 斜切+ghost RISK水印 |
| H3 Dashboard | R7-Apple运动环-v2 §hero | ~60 | 深色卡片+环形图 |
| H4 Split | R1-数据分析报告-split §hero | ~70 | 左文右数据 |
| H5 Entrance | R5-深度阅读 §portal | ~50 | 100vh整屏入口 |
| H6 Pulse | R1-数据叙事-pulse §hero | ~60 | 脉动时间线Hero |
| H7 Numeral | H019-操作手册-numeral §hero | ~50 | 数字+单位Hero |
| H8 黑条书签 | H062-Haglofs早期v2 | ~100 | 64px竖排导航 |

### 4.2 数据段种子

| 模式 | 种子来源 | 说明 |
|------|---------|------|
| D1 Metric | R4-风险预警 §metrics(4列KPI) | 90行CSS+HTML |
| D2 RankBars | R4-风险预警 §seg-list(分档柱) | 80行CSS+HTML |
| D3 DataTable | R5-金条赛马规则 §table区域 | 100行CSS+HTML |
| D4 GridCards | R6-最佳实践库 §bento-grid | 120行CSS+HTML |
| D5 Bento | R4-项目里程碑 §bento | 100行CSS+HTML |
| D6 Evidence | R5-深度阅读 §quote-array | 60行CSS+HTML |

### 4.3 结构段种子

| 模式 | 种子来源 | 说明 |
|------|---------|------|
| T1 Comparison | R2-方案选型评估 §compare | 120行CSS+HTML |
| T2 Pipeline | R5-供应商准入SOP §flow | 80行CSS+HTML |
| T3 ImageText | R5-深度阅读 §annotated | 70行CSS+HTML |
| T4 ThreeForces | R5-结算异常处理SOP §three-cards | 90行CSS+HTML |
| T5 SystemDiag | 从R/H提取(新) | 待抽取 |
| T6 Loop | 从R/H提取(新) | 待抽取 |
| T7 ProgressSteps | 从R/H提取(新) | 待抽取 |

### 4.4 转场/收束段种子

| 模式 | 种子来源 | 说明 |
|------|---------|------|
| G1 Statement | R4-风险预警 §statement | 50行CSS+HTML |
| G2 WhyNow | 从R/H提取(新) | 待抽取 |
| C1 Closing | R4-风险预警 §statement | 复用G1 + 增强 |
| C2 Footer | R4-风险预警 §footer | 40行CSS+HTML |
| C3 BrandSig | 从R/H提取(新) | 待抽取 |

---

## 五、Batch 1 施工清单（6个L3模板）

| # | 模板ID | 场景 | 气质 | 骨架序列 | 种子文件 |
|---|--------|------|------|---------|---------|
| 01 | P3-ST | 感知 | Statement | H1→D1→D2→D3→G1→C1→C2 | 新建 |
| 02 | D3-ST | 决策 | Statement | H1→D1→T1→D3→G1→C1→C2 | 新建 |
| 03 | N3-ST | 计划 | Statement | H1→T2→T3→D3→G1→C1→C2 | 新建 |
| 04 | X3-ST | 执行 | Statement | H3→D1→T2→D3→G1→C1→C2 | 新建 |
| 05 | C3-ST | 沉淀 | Statement | H1→T3→T1→T5→G1→C1→C2 | 新建 |
| 06 | E3-ST | 对外 | Statement | H1→H4→T3→Z1→G1→C1→C2 | 新建 |

---

*Phase 3A 施工引擎完成 · 进入 Batch 1 模板生成*
