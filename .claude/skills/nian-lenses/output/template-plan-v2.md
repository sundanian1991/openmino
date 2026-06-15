# 模板库建设方案（完整版）

---

## 体系全景

nian-design 现有可用的资源层：

| 层 | 资源 | 数量 | 说明 |
|:--:|------|:----:|------|
| 🎨 | **Visual Streams**（气质） | 9 种 | 7 视觉型 + 2 结构型。占主导的是 Statement(37%) / Diagonal(19%) / Split(16%) |
| 🏗️ | **Layouts**（骨架） | 28 种 | S01-S28，分 Hero/S04、数据/S05-S08、内容/S09-S14、收尾/S21-S28 |
| 🔧 | **Components**（组件族） | 26 族 | 新 `components.md`，亮色+深色双模式 |
| 🎬 | **Hero Types**（开屏） | 19 种 | 对比切割/水印衬底/数据驱动/动效渲染 四大类 |
| 📋 | **Scenes**（场景） | 6 层 | 感知→决策→计划→执行→沉淀→对外 |
| 📐 | **Format**（规格） | 3-4 级 | 轻量(3-4 sec) / 标准(5-7) / 丰富(7-10) / PPT(8-12 slide) |
| 🎨 | **Palette**（配色） | 4 种基调 | olive / earth / glacier / rock |

---

## 模板定义 = 7 个维度的组合

```
模板 = Scene(1/6) + VisualStream(1/9) + [Layouts序列] + [Components分配] + HeroType + Palette + Format
```

每个模板是一个完整的 HTML 文件，所有 section 用骨架代码填充，组件从 26 族中按需选取。

**示例：一个"数据报告·标准版·Statement 气质"模板的结构：**

```
Hero:      V4-Statement（S04 骨架）
Section1:  S05 指标卡网格 → 组件: Cards, StatRow, MiniCharts
Section2:  S07 数据表格   → 组件: Tables, Tags
Section3:  S09 对照双栏   → 组件: DataRows, Do/Don't, Callout
Section4:  S21 Callout    → 组件: DecorativeNumber, FlowPipeline
Section5:  S28 Footer
色调:      olive
打断:      Section3 的 DecorativeNumber
```

---

## 模板清单（草案 24 个）

### 数据报告类（Scene 感知层）

| ID | 气质 | Hero | 布局序列 | 组件族（标注新增覆盖） | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL01 | Numeral | V6 | S03+S05+S07+S21 | Cards,Buttons,StatRow,Tables,MiniCharts,DecoNum | olive | 轻量 |
| TL02 | Statement | V4 | S04+S05+S09+S07+S21 | Tags,Tables,DataRows,Progress,Widgets+DoDon't | olive | 标准 |
| TL03 | Dashboard | V6 | S14+S22+S05+S07+S21 | MiniCharts,Gauge,Sparkline,Segmented+TabPanel | glacier | 丰富 |
| TL04 | — | — | PPT 8 页 | Cards,Charts,FlowPipeline,DateNav+Accordion | olive | PPT |

### 品牌展示类（Scene 对外层）

| ID | 气质 | Hero | 布局序列 | 组件族 | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL05 | Entrance | Entrance | S01(沉浸)+S13+S15+S28 | Cards,Nav,Footer,DecoNum,PullQuote | darkgray | 标准 |
| TL06 | Statement | V4 | S04+S13+S09+S22 | ThreeColGrid,Nav,Toggles+Overlay | earth | 丰富 |
| TL07 | Diagonal | V1 | S01+S09+S15+S22 | Cards,FlowPipeline+Checklist+DecoNum | olive | 标准 |

### SOP/流程类（Scene 计划层）

| ID | 气质 | Hero | 布局序列 | 组件族 | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL08 | Split | V2 | S02+S10+S07+S21 | FlowPipeline,Tables,Callout+Checklist+Accordion | olive | 标准 |
| TL09 | Statement | V4 | S01+S10+S09+S21+S28 | Progress,Checklist,Accordion+DoDon't | earth | 丰富 |
| TL10 | Pulse | V6 | S03+S08+S10+S20 | Timeline,Progress,FlowPipeline+DateNav | glacier | PPT |

### 知识沉淀类（Scene 沉淀层）

| ID | 气质 | Hero | 布局序列 | 组件族 | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL11 | Statement | V4 | S04+S11+S13+S21+S28 | Cards,PullQuote,DataRows+FlipCard+DetailPanel | earth | 标准 |
| TL12 | Entrance | Entrance | S01(沉浸)+S15+S22+S25 | ThreeColGrid,DecoNum,BrandBlock+StackedImages | darkgray | 丰富 |
| TL13 | Diagonal | V1 | S01+S21+S13+S28 | Cards,Callout,FlowPipeline+StatePatterns | olive | 轻量 |

### 决策分析类（Scene 决策层）

| ID | 气质 | Hero | 布局序列 | 组件族 | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL14 | Numeral | V6 | S03+S05+S09+S07+S21 | StatRow,Tables,Widgets+AsymTable+TabPanel | olive | 标准 |
| TL15 | Split | V2 | S02+S09+S06+S21 | DoDon't,DataRows,Progress+Segmented+Inputs | glacier | 丰富 |
| TL16 | Dashboard | V6 | S14+S22+S05+S07 | MiniCharts,Gauge,Tags+Overlay+TabPanel | rock | PPT |

### 对外传播类（Scene 对外层）

| ID | 气质 | Hero | 布局序列 | 组件族 | 色调 | 格式 |
|:--:|:----:|:----:|---------|----------------------|:----:|:----:|
| TL17 | Entrance | Entrance | S01(沉浸)+S22+S25+S28 | BrandBlock,Nav,DecoNum+FlipCard+StackedImages | darkgray | 标准 |
| TL18 | Statement | V4 | S04+S13+S15+S28 | ThreeColGrid,Nav,Footer+Toggles+StatePatterns | olive | 轻量 |
| TL19 | Diagonal | V1 | S01+S09+S15+S22 | Cards,FlowPipeline,Callout+DoDon't+Accordion | earth | 丰富 |

### 补充覆盖（确保低频组件出现）

| 组件族 | 频次目标 | 主要在哪些模板 |
|--------|:--------:|---------------|
| 01 Cards | 15+ | 全部 |
| 02 Buttons | 8+ | TL02,TL08,TL15 |
| 03 Inputs | 4+ | TL15,TL18 |
| 04 Data Rows | 12+ | TL02,TL14 |
| 05 Tables | 8+ | TL02,TL09,TL14 |
| 06 Navigation | 12+ | TL05-TL08,TL17-TL19 |
| 07 Tags | 6+ | TL02,TL09,TL16 |
| 08 Segmented | 4+ | TL03,TL15 |
| 09 Date Nav | 3+ | TL04,TL10 |
| 10 Toggles | 4+ | TL06,TL18 |
| 11 Progress | 8+ | TL09,TL10,TL15 |
| 12 Mini Charts | 8+ | TL01,TL03,TL16 |
| 13 Widgets | 6+ | TL01,TL02,TL16 |
| 14 Overlays | 3+ | TL06,TL16 |
| 15 State Patterns | 3+ | TL13,TL18 |
| 16 Flow Pipeline | 8+ | TL04,TL08,TL10 |
| 17 Do/Don't | 4+ | TL02,TL09,TL15 |
| 18 Tab Panel | 3+ | TL03,TL14 |
| 19 Accordion | 3+ | TL04,TL09 |
| 20 Asym Table | 2+ | TL14 |
| 21 Detail Panel | 2+ | TL11 |
| 22 Checklist | 4+ | TL08,TL09 |
| 23 Decorative Num | 8+ | TL01,TL05,TL12 |
| 24 Three-Col Grid | 6+ | TL06,TL12,TL18 |
| 25 Flip Card | 2+ | TL11 |
| 26 Stacked Images | 2+ | TL12,TL17 |

---

## 执行顺序

### Phase 1：核心 10 个（第一批）
TL01-TL05, TL08, TL11, TL14, TL17, TL18
→ 覆盖数据报告 + 品牌展示 + SOP + 决策 四大核心场景
→ 组件覆盖率：约 18/26 族

### Phase 2：扩充 8 个（第二批）
TL06, TL07, TL09, TL12, TL15, TL19 + TL10, TL16
→ 补全品牌丰富版 + 知识沉淀 + PPT 版
→ 覆盖 26 族全部

### Phase 3：补齐 6 个（第三批）
TL13, TL04, TL03 + 低频组件定向分配
→ 确保各组件使用次数方差 < 3

---

## 产出物

```
references/templates-v2/
├── template-matrix.md        ← 完整的 24 模板定义矩阵
├── TL01-数据报告-轻量.html
├── TL02-数据报告-标准.html
├── TL03-数据报告-丰富.html
├── TL04-数据报告-PPT.html
├── TL05-品牌展示-标准.html
...（共 24 个 HTML）
└── component-coverage.md     ← 组件使用覆盖率报告
```

---

这个方案你看方向对不对？对的话我写完整的 `template-matrix.md`，然后我们分 3 批生成 HTML。
