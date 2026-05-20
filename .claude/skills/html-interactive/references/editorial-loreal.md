# Editorial Style: Loreal — 欧莱雅品牌风

> 适合：品牌产品文档、企业级方案展示、强调专业感与力量感的内容。黑红金三色体系，克制而强势。

---

## 设计系统

### 色彩变量

```css
:root {
  --black:    #1A1A1A;
  --pure:     #000000;
  --white:    #FFFFFF;
  --red:      #D70015;
  --red-dark: #A80010;
  --red-soft: #FFF0F1;
  --gray-50:  #F8F8F8;
  --gray-100: #F0F0F0;
  --gray-200: #E0E0E0;
  --gray-300: #CCCCCC;
  --gray-500: #888888;
  --gray-700: #555555;
  --gold:     #B8860B;
  --font-cn:  "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif;
  --font-en:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: "SF Mono", "Fira Code", Menlo, Monaco, monospace;
}
```

### 色彩使用规则

| 角色 | 色值 | 用途 |
|------|------|------|
| **正文** | `--black` #1A1A1A | 标题、正文、边框 |
| **强调** | `--red` #D70015 | 章节编号、关键词高亮、指标值、卡片顶线、标签 |
| **深强调** | `--red-dark` #A80010 | callout 内加粗文字 |
| **浅强调** | `--red-soft` #FFF0F1 | 警示/高风险区域背景 |
| **底色** | `--white` / `--gray-50` | 页面背景 / 区域背景 |
| **辅助** | `--gray-200` / `--gray-500` / `--gray-700` | 边框 / 次要文字 / 正文辅助 |
| **金色** | `--gold` #B8860B | 警告/注意标识（慎用，仅用于九宫格等特殊场景） |
| **黑底白字** | `--pure` / `--white` | 核心定位陈述、公式栏 |

**禁止**：紫色、蓝色、绿色作为主色。辅助色只用灰阶和金。图表用红+黑+灰三色系。

---

## 字体系统

| 场景 | 字体 | 大小 | 字重 |
|------|------|------|------|
| 大标题 | `--font-cn` | 2.4-3.2em | 600 |
| 章节标题 | `--font-cn` | 1.6em | 600 |
| 英文编号/标签 | `--font-en` | 0.65-0.7em | 600 |
| 正文 | `--font-cn` | 15px | 400 |
| 辅助文字 | `--font-cn` | 0.88em | 400 |
| 数值指标 | `--font-en` | 2.2-2.4em | 600 |
| 代码/数据 | `--font-mono` | 0.85em | 400 |

**行高**：正文 1.8，列表 1.6，标题 1.3-1.4

**字间距**：标题 0.04-0.08em，标签 0.1-0.2em

---

## 页面结构

### 封面页

- 全屏（min-height: 100vh），垂直居中
- 顶部 80px 红色横线（3px 高）
- 大标题：3em+，关键词用 `--red` 色
- 副标题：1.1em，灰色
- 底部元信息：0.82em 灰色，flex gap 32px
- 右侧装饰：超大半透明字母（opacity 0.04），纯装饰

### 目录

- 灰色背景块（`--gray-50` + border）
- 双栏布局（columns: 2）
- 每项：红色序号 + 标题，hover 变红

### 章节

- 顶部 2px 黑色边框
- 红色英文编号（Chapter 01/02/...）
- 中文标题 1.6em

---

## 核心组件

### 痛点/特性三列卡片

```css
.pain-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.pain-card { border: 1px solid var(--gray-200); padding: 24px; transition: border-color 0.15s; }
.pain-card:hover { border-color: var(--red); }
.pain-icon { font-family: var(--font-en); font-size: 2.4em; font-weight: 600; color: var(--red); opacity: 0.15; }
.pain-title { font-weight: 600; padding-bottom: 10px; border-bottom: 2px solid var(--black); }
```

### 双栏解决方案

```css
.solution-flow { display: flex; align-items: stretch; gap: 0; }
.solution-col { flex: 1; border: 2px solid var(--black); padding: 24px; }
.solution-col.highlight { background: var(--red); color: var(--white); border-color: var(--red); }
```

### 核心定位块（黑底白字）

```css
.positioning-block { background: var(--black); color: var(--white); padding: 40px; }
.positioning-block .pos-highlight { color: var(--red); font-weight: 600; }
```

### 能力三列卡片（红色顶线）

```css
.engine-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.engine-card { border-top: 3px solid var(--red); padding: 24px 20px; background: var(--gray-50); }
.engine-metric { display: inline-block; padding: 4px 10px; background: var(--red); color: var(--white); font-size: 0.78em; font-weight: 600; }
```

### 功能模块（带编号头部）

```css
.feature-block { border: 1px solid var(--gray-200); }
.feature-header { display: flex; align-items: center; gap: 14px; padding: 20px 24px; background: var(--gray-50); cursor: pointer; }
.feature-num { font-family: var(--font-en); font-size: 1.6em; font-weight: 600; color: var(--red); }
.feature-flow-item { padding: 8px 14px; border: 1.5px solid var(--black); font-size: 0.82em; font-weight: 600; }
.feature-flow-item.auto { background: var(--red); color: var(--white); border-color: var(--red); }
```

### 数据指标卡片

```css
.metrics-hero { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.metric-card { text-align: center; padding: 28px 16px; border: 1px solid var(--gray-200); position: relative; }
.metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--red); }
.metric-value { font-family: var(--font-en); font-size: 2.4em; font-weight: 600; color: var(--red); }
```

### 对比表格

```css
.comparison-table { width: 100%; border-collapse: collapse; }
.comparison-table thead th { border-top: 2px solid var(--black); border-bottom: 1px solid var(--black); background: var(--gray-50); }
.comparison-table .before { color: var(--gray-500); }
.comparison-table .after { color: var(--red); font-weight: 600; }
.comparison-table .boost { display: inline-block; padding: 2px 8px; background: var(--red); color: var(--white); font-weight: 600; }
```

### 三栏改善摘要

```css
.summary-bar { display: grid; grid-template-columns: repeat(3, 1fr); border: 2px solid var(--black); }
.summary-item { padding: 20px 24px; text-align: center; border-right: 1px solid var(--gray-200); }
.summary-value { font-family: var(--font-en); font-size: 1.4em; font-weight: 600; }
.summary-value .arrow { color: var(--red); }
```

### 未来方向双列卡片

```css
.future-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.future-card { border: 1px solid var(--gray-200); overflow: hidden; }
.future-card-header { padding: 20px 24px; border-bottom: 2px solid var(--black); background: var(--gray-50); }
.future-metric strong { color: var(--red); font-weight: 600; }
```

### Callout

```css
.callout { border-left: 4px solid var(--red); padding: 16px 20px; background: var(--gray-50); }
.callout strong { color: var(--red-dark); }
```

### 公式栏

```css
.formula-bar { background: var(--black); color: var(--white); padding: 24px 28px; display: flex; align-items: center; justify-content: center; gap: 12px; }
.formula-bar .op { color: var(--red); font-weight: 600; }
```

---

## 响应式

| 断点 | 变化 |
|------|------|
| ≤768px | 三列→单列，四列→两列，流程→纵向，封面装饰隐藏，目录单栏，间距收缩 |

---

## 硬约束

1. **配色严格**：主色只用黑+红+金，禁止蓝/紫/绿/渐变
2. **无 emoji**：零容忍
3. **版心 ≤ 960px**：padding 不小于 48px
4. **章节间距 80px+**：保证呼吸感
5. **封面全屏**：min-height 100vh
6. **数值用英文字体**：所有百分比/数字用 `--font-en`
7. **红色只做强调**：不大面积使用红色背景（定位块黑底除外）
8. **隔离线克制**：章节切换用 2px 黑线，section 内不用线
9. **图表用红+黑+灰三色系**：最多加金色做警告

---

## 风格气质

> 克制的力量感。黑底衬红，白底衬黑，金只点缀。像欧莱雅的品牌手册——不是花哨的奢华，而是精密的专业感。每个元素都有存在的理由，没有一根线是多余的。

---

*来源：供应商分级清退管理制度 v2（2026-05-14）+ Joyclaw 产品文档（2026-05-19）两次实产迭代。最后更新 2026-05-19*
