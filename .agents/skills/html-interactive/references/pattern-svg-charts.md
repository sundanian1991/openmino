# pattern-svg-charts — 内联 SVG 数据图表

> 适用于：柱状图、折线图、环形图、条形图、迷你图等数据可视化需求。
> 配色严格使用 SKILL.md 定义的 9 色 ramps，不用外部图表库。

---

## 核心原则

1. **纯 SVG，无依赖** — 不引入 Chart.js / D3 / ECharts
2. **9 色 ramps** — 从 SKILL.md 数据图表色板选色，每图最多 2-3 种
3. **数据标签必加** — 每个数据点要有数值标签，不靠 tooltip 补
4. **响应式** — SVG 用 `viewBox` + `width="100%"`，自适应容器
5. **hover 交互** — 数据点 hover 放大 + 显示完整数值

---

## 色板速查

> 语义分配规则：purple/teal/coral/pink → 一般分类；blue → 基准线；green → 正向；amber → 警告；red → 负向；gray → 辅助线。

常用色值（400/600 级别）：

| 语义 | 主色 | 辅色 |
|------|------|------|
| 分类 A | coral-400 `#D85A30` | coral-200 `#F0997B` |
| 分类 B | teal-400 `#1D9E75` | teal-200 `#5DCAA5` |
| 分类 C | purple-400 `#7F77DD` | purple-200 `#AFA9EC` |
| 正向 | green-400 `#639922` | green-200 `#97C459` |
| 负向 | red-400 `#E24B4A` | red-200 `#F09595` |
| 基准 | blue-400 `#378ADD` | blue-200 `#85B7EB` |
| 警告 | amber-400 `#BA7517` | amber-200 `#EF9F27` |
| 辅助 | gray-400 `#888780` | gray-200 `#B4B2A9` |

---

## 图表模板

### 1. 柱状图（Vertical Bar Chart）

```html
<figure class="chart">
  <figcaption class="chart-title">${结论式标题}</figcaption>
  <svg viewBox="0 0 600 300" width="100%">
    <!-- 网格线 -->
    <line x1="60" y1="40" x2="60" y2="250" stroke="var(--g200)" stroke-width="1"/>
    <!-- 水平参考线 -->
    <line x1="60" y1="100" x2="580" y2="100" stroke="var(--g100)" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="60" y1="175" x2="580" y2="175" stroke="var(--g100)" stroke-width="1" stroke-dasharray="4,4"/>
    <line x1="60" y1="250" x2="580" y2="250" stroke="var(--g200)" stroke-width="1"/>
    <!-- Y 轴标签 -->
    <text x="50" y="104" text-anchor="end" fill="var(--g500)" font-size="11">${值1}</text>
    <text x="50" y="179" text-anchor="end" fill="var(--g500)" font-size="11">${值2}</text>
    <text x="50" y="254" text-anchor="end" fill="var(--g500)" font-size="11">0</text>
    <!-- 柱子 — 每根宽度 40px，间距 20px -->
    <rect x="90"  y="${计算y}" width="40" height="${计算h}" rx="4" fill="#D85A30" class="bar"/>
    <rect x="150" y="${计算y}" width="40" height="${计算h}" rx="4" fill="#1D9E75" class="bar"/>
    <!-- 更多柱子... -->
    <!-- X 轴标签 -->
    <text x="110" y="272" text-anchor="middle" fill="var(--g500)" font-size="11">${标签1}</text>
    <!-- 数据标签（柱顶） -->
    <text x="110" y="${计算y-8}" text-anchor="middle" fill="var(--slate)" font-size="12" font-weight="600">${值}</text>
  </svg>
  <p class="chart-source">${来源}</p>
</figure>
```

**Y 轴计算**：`y = 250 - (value / maxValue) * 210`，`height = (value / maxValue) * 210`

### 2. 折线图（Line Chart）

```html
<figure class="chart">
  <figcaption class="chart-title">${标题}</figcaption>
  <svg viewBox="0 0 600 280" width="100%">
    <defs>
      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D85A30" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#D85A30" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- 面积填充 -->
    <polygon points="${计算所有点} ${最后一个x},250 ${第一个x},250"
      fill="url(#areaFill)"/>
    <!-- 折线 -->
    <polyline points="${计算所有点}" fill="none" stroke="#D85A30"
      stroke-width="2.5" stroke-linejoin="round"/>
    <!-- 数据点 -->
    <circle cx="${x}" cy="${y}" r="4" fill="#D85A30" class="data-point"/>
    <!-- 目标线（可选） -->
    <line x1="60" y1="${目标y}" x2="580" y2="${目标y}"
      stroke="#D85A30" stroke-width="1" stroke-dasharray="6,4" opacity="0.3"/>
    <text x="582" y="${目标y+4}" fill="var(--g500)" font-size="10">目标</text>
  </svg>
</figure>
```

**点计算**：`x = 60 + i * (520 / (n-1))`，`y = 250 - (value / maxValue) * 210`

### 3. 环形图（Donut Chart）

```html
<figure class="chart" style="text-align: center;">
  <figcaption class="chart-title">${标题}</figcaption>
  <svg width="240" height="240" viewBox="0 0 240 240">
    <!-- 周长 = 2 * π * r = 2 * 3.14159 * 90 ≈ 565.49 -->
    <!-- 每段: stroke-dasharray="段长 周长-段长" stroke-dashoffset="-累积偏移" -->
    <circle cx="120" cy="120" r="90" fill="none" stroke="var(--g100)" stroke-width="32"/>
    <circle cx="120" cy="120" r="90" fill="none" stroke="#D85A30" stroke-width="32"
      stroke-dasharray="${段长1} ${565.49-段长1}" stroke-dashoffset="0"
      transform="rotate(-90 120 120)"/>
    <circle cx="120" cy="120" r="90" fill="none" stroke="#1D9E75" stroke-width="32"
      stroke-dasharray="${段长2} ${565.49-段长2}" stroke-dashoffset="${-段长1}"
      transform="rotate(-90 120 120)"/>
    <!-- 中心文字 -->
    <text x="120" y="112" text-anchor="middle" fill="var(--slate)"
      font-size="32" font-weight="800">${总值}</text>
    <text x="120" y="134" text-anchor="middle" fill="var(--g500)"
      font-size="12">${标签}</text>
  </svg>
  <!-- 图例 -->
  <div class="chart-legend">
    <span><i style="background:#D85A30"></i>${分类A} ${百分比}%</span>
    <span><i style="background:#1D9E75"></i>${分类B} ${百分比}%</span>
  </div>
</figure>
```

**段长计算**：`段长 = (百分比 / 100) * 565.49`

### 4. 水平条形图（Horizontal Bar Chart）

```html
<figure class="chart">
  <figcaption class="chart-title">${标题}</figcaption>
  <div class="h-bar-chart">
    <div class="h-bar-row">
      <span class="h-bar-label">${标签}</span>
      <div class="h-bar-track">
        <div class="h-bar-fill" style="width: ${百分比}%; background: #D85A30;"></div>
      </div>
      <span class="h-bar-value">${值}</span>
    </div>
    <!-- 更多行... -->
  </div>
</figure>
```

```css
.h-bar-chart { display: flex; flex-direction: column; gap: 12px; }
.h-bar-row { display: flex; align-items: center; gap: 12px; }
.h-bar-label { min-width: 80px; font-size: 0.85em; text-align: right; color: var(--g700); }
.h-bar-track {
  flex: 1; height: 24px; background: var(--g100);
  border-radius: 6px; overflow: hidden;
}
.h-bar-fill {
  height: 100%; border-radius: 6px;
  transition: width 0.6s ease;
}
.h-bar-value { min-width: 50px; font-family: var(--mono); font-size: 0.85em; font-weight: 600; }
```

### 5. 迷你图（Sparkline）

```html
<!-- 内联在文本/表格中 -->
<svg width="60" height="20" viewBox="0 0 60 20" class="sparkline">
  <polyline points="${计算点}" fill="none" stroke="var(--olive)" stroke-width="1.5"/>
</svg>
```

**点计算**：`x = i * (60 / (n-1))`，`y = 20 - (value / maxValue) * 18`

---

## 通用 CSS

```css
.chart {
  margin: 2em 0;
}
.chart-title {
  font-size: 0.9em; font-weight: 700; color: var(--slate);
  margin-bottom: 8px;
}
.chart-source {
  font-size: 0.7em; color: var(--g500); text-align: right;
  margin-top: 4px;
}
.chart-legend {
  display: flex; gap: 16px; justify-content: center;
  margin-top: 12px; font-size: 0.8em; color: var(--g700);
}
.chart-legend i {
  display: inline-block; width: 10px; height: 10px;
  border-radius: 2px; margin-right: 4px; vertical-align: middle;
}
/* hover 交互 */
.data-point { transition: r 0.15s ease; cursor: pointer; }
.data-point:hover { r: 7; }
.bar { transition: opacity 0.15s ease; cursor: pointer; }
.bar:hover { opacity: 0.8; }
```

---

## 设计约束

1. **每图最多 2-3 种颜色** — 从 9 色 ramps 选，不混 ramp
2. **必须有数据标签** — 不让用户猜数字
3. **必须有标题** — 结论式标题（"增长 15%"而非"趋势"）
4. **必须有来源** — 右下角小字标注数据出处
5. **SVG viewBox 留安全边距** — 上 40px，下 50px（放 X 轴标签），左 60px（放 Y 轴），右 20px
6. **不用外部图标库** — 用纯 SVG
7. **hover 反馈** — 数据点放大 / 柱子变色 / 显示 tooltip

---

## 反模式

- 不引入 Chart.js / D3 / ECharts — 这是纯 SVG 模板
- 不用 3D 效果 / 渐变柱子 / 阴影 — 保持干净
- 不用超过 3 种颜色 — 分组多时用同色不同深浅
- 不省略数据标签 — "用户可以 hover 看"不是借口
- 不编造数据 — 所有数值必须有真实来源
