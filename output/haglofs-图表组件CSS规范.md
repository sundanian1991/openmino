# haglofs 图表组件 CSS 规范

> 确保新图表组件的 CSS 与现有组件质感一致

---

## 1. 基础变量

```css
/* 从 token-root.css 继承 */
:root {
  /* 颜色 */
  --color-offwhite: #F5F5F0;
  --color-cream: #EDE8E0;
  --color-charcoal: #2A2A28;
  --color-black: #1A1A18;
  --color-forest: #2D5A3D;
  --color-moss: #4A7C5C;
  --color-signal-red: #D71921;
  --color-signal-orange: #E67E22;
  
  /* 文字 */
  --text-primary: #1A1A18;
  --text-secondary: #666660;
  --text-tertiary: #999990;
  --text-inverse: #F5F5F0;
  --text-inverse-2: rgba(245, 245, 240, 0.6);
  --text-inverse-3: rgba(245, 245, 240, 0.3);
  
  /* 边框 */
  --border-rest: #E8E4DC;
  --border-hover: #D0CCC4;
  
  /* 间距 */
  --s-xs: 4px;
  --s-sm: 8px;
  --s-md: 16px;
  --s-lg: 24px;
  --s-xl: 32px;
  
  /* Radius */
  --r-sm: 4px;
  --r-lg: 8px;
}
```

---

## 2. 通用图表容器

```css
/* 图表组件基础容器 */
.haglofs-chart {
  /* 布局 */
  width: 100%;
  padding: var(--s-lg);
  
  /* 质感 */
  background: var(--color-offwhite);
  border: 1px solid var(--border-rest);
  border-radius: 0px; /* 结构件：0px */
  
  /* 字体 */
  font-family: 'Inter', sans-serif;
}

/* 图表标题 */
.haglofs-chart__title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--s-md);
}

/* 图表容器（画布） */
.haglofs-chart__canvas {
  width: 100%;
  position: relative;
}
```

---

## 3. Line Chart 专用

```css
/* 折线图 */
.haglofs-line-chart {
  border-radius: 0px; /* 结构件 */
}

/* 网格线 */
.haglofs-line-chart .grid-line {
  stroke: var(--border-rest);
  stroke-width: 1px;
  stroke-dasharray: none; /* 实线，不用虚线 */
}

/* 数据线 */
.haglofs-line-chart .data-line {
  fill: none;
  stroke: var(--color-forest);
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 数据点 */
.haglofs-line-chart .data-point {
  fill: var(--color-offwhite);
  stroke: var(--color-forest);
  stroke-width: 2px;
  r: 4px;
}

/* 数据点 hover */
.haglofs-line-chart .data-point:hover {
  fill: var(--color-forest);
  r: 6px;
}

/* 坐标轴标签 */
.haglofs-line-chart .axis-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

/* 数据标签 */
.haglofs-line-chart .data-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-primary);
}
```

---

## 4. Area Chart 专用

```css
/* 面积图 */
.haglofs-area-chart {
  border-radius: 0px; /* 结构件 */
}

/* 填充区域 */
.haglofs-area-chart .area-fill {
  fill: var(--color-forest);
  opacity: 0.15; /* 哑光质感，低透明度 */
}

/* 边界线 */
.haglofs-area-chart .area-stroke {
  fill: none;
  stroke: var(--color-forest);
  stroke-width: 2px;
}
```

---

## 5. Bar Chart 专用

```css
/* 柱状图 */
.haglofs-bar-chart {
  border-radius: 0px; /* 结构件 */
}

/* 柱子 */
.haglofs-bar-chart .bar {
  fill: var(--color-forest);
  rx: 0px; /* 方角，不用圆角 */
}

/* 柱子 hover */
.haglofs-bar-chart .bar:hover {
  fill: var(--color-moss);
}

/* 柱间分隔线 */
.haglofs-bar-chart .bar-separator {
  stroke: var(--border-rest);
  stroke-width: 1px;
}
```

---

## 6. Donut Chart 专用

```css
/* 环形图 */
.haglofs-donut-chart {
  border-radius: var(--r-sm); /* 内容卡：4px */
  background: var(--color-offwhite);
}

/* 弧段 */
.haglofs-donut-chart .arc {
  fill: none;
  stroke-width: 24px; /* 固定宽度，不随尺寸变化 */
}

/* 中心文字 */
.haglofs-donut-chart .center-text {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 600;
  fill: var(--text-primary);
}

.haglofs-donut-chart .center-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  fill: var(--text-secondary);
}

/* 图例 */
.haglofs-donut-chart .legend-item {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  fill: var(--text-primary);
}

.haglofs-donut-chart .legend-dot {
  r: 4px;
}
```

---

## 7. 深底反相

```css
/* 深底通用反相（父级作用域） */
.section--dark .haglofs-chart {
  background: var(--color-charcoal);
  border-color: var(--border-rest); /* token-root .dark 机制自动覆写 */
}

.section--dark .haglofs-chart__title {
  color: var(--text-inverse);
}

/* Line Chart 深底专属（仅 1 条） */
.section--dark .haglofs-line-chart .data-line {
  stroke: var(--color-moss);
}

/* Donut Chart 深底专属（仅 1 条） */
.section--dark .haglofs-donut-chart .center-text {
  fill: var(--text-inverse);
}
```

---

## 8. 响应式

```css
/* 移动端适配 */
@media (max-width: 768px) {
  .haglofs-chart {
    padding: var(--s-md);
  }
  
  .haglofs-chart__title {
    font-size: 18px;
  }
  
  .haglofs-line-chart .axis-label,
  .haglofs-line-chart .data-label {
    font-size: 9px;
  }
}
```

---

## 9. 质感检查清单

CSS 写完后，逐项检查：

- [ ] 无渐变（linear-gradient/radial-gradient）
- [ ] 无阴影（box-shadow/text-shadow）
- [ ] 无 3D 效果（transform: perspective/rotateX/rotateY）
- [ ] 无圆角（除非是内容卡 4px）
- [ ] 字体角色正确（Playfair/Mono/Inter）
- [ ] 间距使用 token（--s-*）
- [ ] 颜色使用变量（var(--color-*)）
- [ ] 深底走通用机制（.section--dark）
- [ ] 专属规则 ≤2 条

