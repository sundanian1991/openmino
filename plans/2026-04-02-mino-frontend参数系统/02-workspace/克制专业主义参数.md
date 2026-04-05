# 克制专业主义参数系统 — 完整定义

> **风格定位**：克制、专业、权威
> **适用场景**：问题诊断、事件分析、战略演示、打印友好

---

## 一、完整 CSS 变量定义

```css
:root {
  /* ===========================================
     色彩系统（全局参数）
     =========================================== */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --bg: #FFFFFF;
  --surface: #FAFAFA;
  --border: #E5E5E5;
  --accent: #E2725B;
  --accent-light: rgba(226, 114, 91, 0.08);

  /* ===========================================
     字体层级系统（风格参数）
     =========================================== */
  /* T1: 页面标题 */
  --t1-size: clamp(1.75rem, 4vw, 2rem);
  --t1-weight: 700;
  --t1-line-height: 1.2;

  /* T2: 模块标题 */
  --t2-size: clamp(1.125rem, 2vw, 1.25rem);
  --t2-weight: 700;
  --t2-line-height: 1.3;

  /* T3: 卡片标题 */
  --t3-size: clamp(0.875rem, 1.5vw, 1rem);
  --t3-weight: 600;
  --t3-line-height: 1.4;

  /* T4: 正文 */
  --t4-size: clamp(0.8125rem, 1.3vw, 0.9rem);
  --t4-weight: 400;
  --t4-line-height: 1.6;

  /* T5: 辅助文字 */
  --t5-size: clamp(0.6875rem, 1vw, 0.75rem);
  --t5-weight: 400;
  --t5-line-height: 1.5;

  /* T6: 页码/标签 */
  --t6-size: clamp(0.625rem, 0.8vw, 0.7rem);
  --t6-weight: 500;
  --t6-line-height: 1;

  /* ===========================================
     间距系统（风格参数 + 内容参数调整）
     =========================================== */
  /* 4pt 基准 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;

  /* 页面级间距（标准密度） */
  --page-padding: clamp(1.5rem, 4vw, 2rem);
  --section-gap: clamp(1.5rem, 3vw, 2rem);
  --card-gap: var(--space-lg);
  --card-padding: var(--space-lg);

  /* ===========================================
     边框系统（风格参数）
     =========================================== */
  --border-thin: 1px solid var(--border);
  --border-thick: 2px solid var(--text-primary);
  --border-accent: 1px solid var(--accent);
  --border-radius-sm: 2px;
  --border-radius-md: 4px;

  /* 顶部装饰线 */
  --top-bar-height: 2.4px;
  --top-bar-color: var(--accent);

  /* ===========================================
     陶土色使用规则（内容参数）
     =========================================== */
  /* 页码徽章 */
  --page-badge-size: 24px;
  --page-badge-radius: 50%;

  /* 强调卡片 */
  --highlight-bg: var(--accent-light);
  --highlight-border: var(--accent);
}
```

---

## 二、密度调整参数

```css
/* 高密度（紧迫 × 扫视） */
.density-high {
  --page-padding: clamp(1rem, 3vw, 1.5rem);
  --section-gap: clamp(1rem, 2vw, 1.5rem);
  --card-gap: var(--space-md);
  --card-padding: var(--space-md);
}

/* 标准密度（中性 × 阅读） */
.density-standard {
  /* 使用默认值 */
}

/* 低密度（沉思 × 凝视） */
.density-low {
  --page-padding: clamp(2rem, 5vw, 3rem);
  --section-gap: clamp(2rem, 4vw, 3rem);
  --card-gap: var(--space-xl);
  --card-padding: var(--space-xl);
}
```

---

## 三、元素样式定义

### 3.1 页面结构

```css
.slide {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  scroll-snap-align: start;
  position: relative;
  padding: var(--page-padding);
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

/* 顶部装饰线 */
.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-bar-height);
  background: var(--top-bar-color);
}

/* 页码徽章 */
.page-number {
  position: absolute;
  bottom: var(--space-lg);
  right: var(--space-lg);
  width: var(--page-badge-size);
  height: var(--page-badge-size);
  border-radius: var(--page-badge-radius);
  background: var(--accent);
  color: white;
  font-size: var(--t6-size);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 3.2 卡片样式

```css
.card {
  background: var(--bg);
  border: var(--border-thin);
  border-radius: var(--border-radius-md);
  padding: var(--card-padding);
}

.card.highlight {
  background: var(--highlight-bg);
  border: var(--border-accent);
}

.card-title {
  font-size: var(--t3-size);
  font-weight: var(--t3-weight);
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.card-content {
  font-size: var(--t4-size);
  color: var(--text-secondary);
  line-height: var(--t4-line-height);
}
```

### 3.3 表格样式

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--t5-size);
}

.data-table th {
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  border-bottom: var(--border-thick);
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: var(--border-thin);
  color: var(--text-secondary);
  vertical-align: top;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background: var(--surface);
}
```

### 3.4 列表样式

```css
.list-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-size: var(--t4-size);
  color: var(--text-secondary);
}

.list-item::before {
  content: "";
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  margin-top: 0.5em;
  flex-shrink: 0;
}
```

---

## 四、陶土色使用场景

### 场景 1：顶部装饰线（所有非封面页）

```html
<div class="top-bar"></div>
```

### 场景 2：页码徽章（所有非封面页）

```html
<div class="page-number">2</div>
```

### 场景 3：强调卡片（结论/行动建议）

```html
<div class="card highlight">
  <div class="card-title">核心结论</div>
  <div class="card-content">...</div>
</div>
```

### 场景 4：列表项圆点（列表中每项）

```css
.list-item::before {
  content: "";
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}
```

### 场景 5：关键词强调（正文中）

```html
<span style="color: var(--accent); font-weight: 600;">关键数字</span>
```

---

## 五、六层决策 → 参数选择映射

| 六层决策 | 输出 | 参数选择 |
|---------|------|---------|
| **L1 内容元素** | 数据/流程/清单/洞察 | 决定可视化级别 |
| **L2 情绪气质** | 紧迫/中性/庆祝/沉思 | 决定密度 + 陶土色用量 |
| **L3 阅读方式** | 扫视/阅读/凝视 | 决定字号层级差 |
| **L4 密度版式** | 高/标准/低 + 版式 | 选择间距参数 |
| **L5 可视化** | 级别 + 形式 | 选择边框和装饰 |
| **L6 焦点选择** | 陶土色位置 | 选择陶土色使用场景 |

---

## 六、执行稳定性检查清单

### 参数一致性检查

- [ ] 所有页面使用相同的 CSS 变量定义
- [ ] T1-T6 字号值在所有文件中一致
- [ ] 页面 padding 在同一密度级别下一致
- [ ] 边框粗细符合规则（1px 卡片，2px 表头）

### 陶土色规则检查

- [ ] 一页只有一处陶土色强调（紧迫情绪可放宽）
- [ ] 陶土色不用于装饰性元素
- [ ] 陶土色用在了正确的优先级位置

### 密度一致性检查

- [ ] 同一演示文稿的所有页面使用相同密度
- [ ] 密度选择符合情绪 × 阅读方式矩阵

---

## 七、与其他风格的参数对比

| 参数 | 克制专业主义 | 金融时报 | 咨询模式 |
|------|------------|---------|---------|
| **主色** | 黑白灰 | 青绿 `#0d7680` | 深灰 `#333` |
| **焦点色** | 陶土色 `#E2725B` | 青绿 | 低饱和红 `#B85450` |
| **T1 基准值** | 28px | 28px | 32px |
| **卡片边框** | 1px 浅灰 | 1px 浅灰 | 无边框 |
| **顶部装饰** | 2.4px 陶土色线 | 4px 青绿线 | 无 |
| **页码样式** | 24px 陶土色圆形 | 右下角灰色 | 左下角灰色 |

---

*可直接复制到 SKILL.md 的 Phase 2.5 参数系统章节*