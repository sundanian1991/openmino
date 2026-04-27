# warm-editorial — 暖米色 PPT 风格指南

> 版本：2026-04-26 | 基于 html-ppt-skill + warm-editorial 主题 | 年老师认可

---

## 一、色彩体系

| 变量 | 色值 | 用途 |
|------|------|------|
| `--bg` | `#F5F0E8` | 页面背景（暖米色） |
| `--surface` | `#EDE8DD` | 卡片背景 |
| `--surface-2` | `#E5DFD4` | 次要卡片 / 弱化卡片 |
| `--text-1` | `#2C2825` | 主文本（深棕黑） |
| `--text-2` | `#6B6864` | 次要文本 |
| `--text-3` | `#9A9590` | 辅助文本 / 年份 / 标签 |
| `--accent` | `#C13531` | 强调色（中国红） |
| `--accent-2` | `#293C54` | 对比色（深蓝） |
| `--good` | `#1aaf6c` | 正面指标 |
| `--warn` | `#d97706` | 警告 |
| `--bad` | `#C13531` | 负面指标（同 accent） |
| `--grad` | `linear-gradient(135deg, #C13531, #293C54)` | 渐变强调 |

### 配色铁律

- **最多两色**：红 `#C13531` + 深蓝 `#293C54`，其余用 `#CDCECD` 灰化
- **禁止**：左边框彩色条（`border-left: 4px solid`）— 年老师反馈"非常 AI"
- **禁止**：渐变背景卡片、阴影叠加、发光效果
- **替代区分**：用小圆点（6px）放标题前，不用左边框

---

## 二、字体体系

| 变量 | 字体栈 | 用途 |
|------|--------|------|
| `--font-display` | `'Noto Serif SC', Georgia, serif` | 标题（宋体） |
| `--font-sans` | `'Noto Sans SC', -apple-system, sans-serif` | 正文（黑体） |
| `--font-mono` | `'JetBrains Mono', monospace` | 数字、代码、年份 |

### 字号层级

| 类 | 字号 | 字重 | 用途 |
|----|------|------|------|
| `.h1` | 72px | 800 | 封面大标题 |
| `.h2` | 54px（可内联调到 48-52px） | 700 | 页内标题 |
| `.h3` | 32px（卡片内可 18-24px） | 600 | 卡片标题 |
| `.h4` | 22px | 600 | 小标题 |
| `.kicker` | 14px | 600 + 0.08em | 英文标签（THESIS/FORCES） |
| `.lede` | 22px | 300 | 副标题 / 引言 |
| 正文 | 16-17px | 400 | 段落 |
| `.dim` | 同正文 | 400 | 颜色 `--text-2` |
| `.dim2` | 同正文 | 400 | 颜色 `--text-3` |

---

## 三、页面结构（固定骨架）

每页必须包含以下元素，顺序固定：

```html
<section class="slide" data-title="页面名称">
  <!-- 1. Kicker：英文分类标签 -->
  <p class="kicker">THESIS</p>

  <!-- 2. H2：中文标题 -->
  <h2 class="h2">标题文字</h2>

  <!-- 3. 副标题（可选） -->
  <p class="dim" style="margin-bottom:36px;font-size:18px">副标题</p>

  <!-- 4. 内容区：grid / flex / 自定义 -->
  <div class="grid g2">...</div>

  <!-- 5. Takeaway（可选，必须和上方内容等宽或同 max-width） -->
  <div class="takeaway-box" style="margin-top:20px;max-width:XXXpx;width:100%">
    结论句
  </div>
</section>
```

### 间距约定

| 位置 | 间距 | 说明 |
|------|------|------|
| kicker → h2 | 8px | 紧凑 |
| h2 → 副标题 | 8px | 紧凑 |
| 副标题 → 内容 | 36px | 宽松，制造呼吸感 |
| 内容 → takeaway | 20px | 适中 |
| 卡片之间 | 24px（base.css `.grid` gap） | 统一 |

---

## 四、卡片组件

### 4.1 基础卡片 `.card`

```html
<div class="card card-card">
  <h3 class="h3">标题</h3>
  <p>内容</p>
</div>
```

- 默认圆角 18px，阴影柔和
- 内边距 26px 28px（base.css）
- 卡片内需要更多间距时加 `style="padding:32px 36px"`

### 4.2 弱化卡片 `.card-soft`

```html
<div class="card card-soft">次要内容</div>
```

背景用 `--surface-2`，视觉上比 `.card` 后退一步。

### 4.3 描边卡片 `.card-outline`

```html
<div class="card card-outline">强调边界的内容</div>
```

透明背景 + 1.5px 粗边框，用于需要轮廓但不需要填充的场景。

### 4.4 卡片内对齐技巧

**等宽两列**：用 `.grid.g2` + `align-items:stretch`

```html
<div class="grid g2" style="align-items:stretch">
  <div class="card card-card" style="display:flex;flex-direction:column">
    <!-- 内容 -->
    <div style="flex:1"></div>  <!-- 较短卡片用 spacer 填充 -->
  </div>
  <div class="card card-card" style="display:flex;flex-direction:column">
    <!-- 内容 -->
  </div>
</div>
```

**取宽**：加 `style="max-width:1100px;width:100%"`

**居中**：外层用 `style="display:flex;flex-direction:column;align-items:center;gap:28px;width:100%"`

### 4.5 卡片标题区分（禁止左边框）

**正确做法** — 6px 圆点放标题前：

```html
<div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:16px">
  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#C13531"></span>
  <h3 class="h3" style="color:#C13531;font-size:24px;margin:0">热度侧</h3>
</div>
```

**错误做法**（禁止）：
```html
<div class="card card-card" style="border-left:4px solid #C13531">  <!-- AI 味 -->
```

---

## 五、数据展示组件

### 5.1 大数字统计

```html
<div class="stat-big">10B</div>
<div class="stat-label">Token 消耗</div>
```

- `--stat-big`: 72px, JetBrains Mono, 700, accent 色
- 适合展示关键 KPI、核心数字

### 5.2 价格对比

```html
<div class="price-brand">品牌名</div>
<p class="dim2 mono" style="font-size:13px;margin-bottom:16px">计量方式</p>
<div class="price-num">2,400</div>
<div class="price-unit">单位</div>
```

- 品牌名 16px 加粗
- 数字 48px JetBrains Mono 700
- 单位 14px 灰色

### 5.3 圆点列表

```html
<div class="bullet-item">
  <span class="bullet-dot" style="background:#C13531"></span>
  <span class="bullet-text">要点文字 <span class="mono highlight-text">数据高亮</span></span>
</div>
```

- 圆点 8px 圆
- 文字 17px, line-height 1.6
- 数据用 `.highlight-text`（红色加粗）或 `.mono`

### 5.4 时间线

```html
<div class="timeline-row">
  <span class="timeline-dot"></span>
  <span class="timeline-year">2024 Q4</span>
  <span class="timeline-label">事件名</span>
  <span class="timeline-desc">描述文字</span>
</div>
```

- 圆点 12px，三种变体：默认(红)、blue(蓝)、gray(灰)
- 年份用 Mono，15px

### 5.5 流程步骤（圆形节点）

```html
<div class="flow-steps">
  <div class="flow-step">
    <div class="flow-circle">Coding</div>
    <div class="flow-label">获客入口</div>
    <div style="font-size:13px;color:var(--text-3)">补充说明</div>
  </div>
  <span class="flow-arrow">→</span>
  <!-- 更多 step -->
</div>
```

- 圆形 80px，四色变体：红/蓝/灰/深
- 箭头 24px 灰色

### 5.6 数字检查清单

```html
<div class="checklist-item">
  <span class="check-num">1</span>
  <div>
    <div class="check-text"><strong>标题</strong></div>
    <div class="check-desc">描述文字</div>
  </div>
</div>
```

- 编号 32px 圆形，accent 背景白字

### 5.7 类比行（过去 → 未来）

```html
<div class="analogy-row">
  <div class="analogy-past">
    <div class="analogy-year">2009</div>
    <div class="analogy-title">过去的事</div>
    <div class="analogy-desc">描述</div>
  </div>
  <span class="analogy-arrow">→</span>
  <div class="analogy-future">
    <div class="analogy-year" style="color:var(--accent)">2024</div>
    <div class="analogy-title">现在的事</div>
    <div class="analogy-desc">描述</div>
  </div>
</div>
```

- `analogy-past`：灰色文字（`--text-2`），视觉上退后
- `analogy-future`：深色文字（`--text-1`），视觉上前置
- 箭头 24px 灰色
- 行间距 `margin-bottom:14px`，卡片内边距 `padding:20px 28px`

### 5.8 Takeaway 结论框

```html
<div class="takeaway-box">结论文字</div>
```

- 背景 `rgba(193,53,49,.08)` 淡红
- 圆角 12px，内边距 20px 40px
- 字体 `--font-display` 600, 18px
- **宽度必须和上方内容对齐**：加 `max-width` + `width:100%` + `margin-left:auto;margin-right:auto`

### 5.9 Pill 标签

```html
<span class="pill" style="background:rgba(193,53,49,.12);color:#C13531;border:none">标签</span>
```

- 圆角 999px，12px 字号
- 红色系用 `rgba(193,53,49,.12)` 背景 + `#C13531` 文字
- 蓝色系用 `rgba(41,60,84,.10)` 背景 + `#293C54` 文字
- 灰色系用 `rgba(154,149,144,.12)` 背景 + `#9A9590` 文字

---

## 六、布局模板速查

| 场景 | 方案 |
|------|------|
| 三列等宽卡片 | `.grid.g3` |
| 两列对比 | `.grid.g2` |
| 四列等宽 | `.grid.g4` |
| 垂直堆叠 | `style="display:flex;flex-direction:column;gap:0"` + 管道分隔符 |
| 水平居中 | 外层 `display:flex;flex-direction:column;align-items:center` |
| 不等高卡片对齐 | `align-items:stretch` + `flex-direction:column` + `<div style="flex:1"></div>` |
| 满屏横向流程 | `.flow-steps` + 圆形节点 |
| 波特五力 | CSS Grid `grid-template-columns:1fr 1fr 1fr` + `grid-column/row` 跨越 |

---

## 七、SVG 图标

卡片顶部图标统一用 48x48 viewBox，2.5px stroke：

```html
<svg class="card-icon" viewBox="0 0 48 48" fill="none" stroke="#C13531" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- 手绘线条 -->
</svg>
```

- 线条几何形，不引图标库
- 颜色与卡片主题一致
- `.card-icon` 类：40x40，margin-bottom 12px

---

## 八、导航与交互

- **← →** 翻页
- **T** 切换主题（warm-editorial → editorial-serif → midcentury → sunset-warm）
- **F** 全屏
- **O** 总览网格
- **S** 演讲者模式（带逐字稿、计时器、下一页预览）
- 进度条底部自动更新

---

## 九、常见陷阱

| 问题 | 原因 | 解法 |
|------|------|------|
| 上下留白不均 | 内容区太短/太长 | 用 `margin-top`/`margin-bottom` 精确控制各段间距 |
| 卡片宽度不一致 | takeaway 没设 max-width | takeaway 的 max-width 必须和上方内容区一致 |
| 两列卡片底部不齐 | 内容条数不同 | `align-items:stretch` + 短卡片加 `<div style="flex:1"></div>` |
| 标题和卡片重叠 | 副标题 margin-bottom 太小 | kicker→h2 8px, h2→副标题 8px, 副标题→内容 36px |
| 左侧拥挤 | kicker 和 h2 默认左对齐无 padding | `.slide` 默认 padding 72px 96px 已处理 |
| "AI 味"太重 | 左边框彩色条、渐变、阴影堆叠 | 圆点替代左边框，纯色不渐变，无阴影卡片 |

---

## 十、文件路径

| 文件 | 路径 |
|------|------|
| 当前 PPT | `workspace/AI定价演变/ppt/index.html` |
| 基础样式 | `.claude/skills/html-ppt-skill/assets/base.css` |
| 暖色主题 | `.claude/skills/html-ppt-skill/assets/themes/warm-editorial.css` |
| 运行时 | `.claude/skills/html-ppt-skill/assets/runtime.js` |
| 技能文档 | `.claude/skills/html-ppt-skill/SKILL.md` |

---

*2026-04-26 — 基于年老师 5 轮反馈迭代定型*
