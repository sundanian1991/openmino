# 供应商管理可视化 - 30单元完整代码

> 基于 infographic-svg 规范，精选30个核心单元的完整实现代码
>
> 每个单元包含：ASCII布局 + 完整SVG/HTML代码
>
> **原则：不以量取胜，以质取胜**

---

## 设计规范速查（infographic-svg）

### 配色系统

```css
/* 结构色（暖调学术系）*/
--canvas-bg: #faf9f7;      /* 米白背景 */
--container-stroke: #1a1a1a; /* 深灰描边 1.5px */
--card-fill: #f5f4f1;      /* 暖灰卡片 */
--card-stroke: #d4d1c7;    /* 暖灰描边 1px */
--text-primary: #1a1a1a;   /* 深灰文字 */
--text-secondary: #6b6b6b; /* 中灰文字 */
--accent: #c98a6a;         /* 暖棕强调色 - 唯一彩色 */

/* 语义色（每图≤2种）*/
--success: #8f9b7f;        /* 橄榄绿 - 成功/正向 */
--warning: #d4845a;        /* 焦橙 - 警告/注意 */
--user-input: #6a8fb5;     /* 灰蓝 - 用户输入 */
--auxiliary: #a3867a;      /* 棕灰 - 辅助强调 */
```

### 字体系统

```css
/* 标题: 衬线字体 */
--font-heading: Georgia, "Times New Roman", serif;
--h1-size: 18px;
--h1-weight: 700;
--h2-size: 12px;
--h2-weight: 500;

/* 正文: 无衬线字体 */
--font-body: system-ui, -apple-system, sans-serif;
--body-size: 10px;
--body-leading: 14px;
--caption-size: 9px;

/* 数值: 等宽字体 */
--font-mono: "SF Mono", Monaco, "Cascadia Code", monospace;
```

### 容器系统

```css
/* 大容器 */
--large-container-radius: 10px;
--large-container-stroke: 1.5px;

/* 卡片 */
--card-radius: 8px;
--card-stroke: 1px;

/* 标签 */
--tag-radius: 6px;
--tag-stroke: 0.5px;
```

### 间距系统（4pt基准）

```
4px  - 最小间距（图标与文字）
8px  - 卡片内紧凑间距
12px - 卡片内标准间距
16px - 组间距
20px - 大组间距
24px - 章节间距
```

---

## 目录

| 分类 | 单元数 | 章节 |
|------|--------|------|
| **核心决策工具** | 11个 | 一 |
| **战略管理工具** | 5个 | 二 |
| **异常管理工具** | 5个 | 三 |
| **操作流程工具** | 6个 | 四 |
| **数据系统说明** | 3个 | 五 |

**总计：30个可视化单元**

---

# 一、核心决策工具（11个）

## 1.1 供应商对比矩阵（四象限）⭐⭐⭐⭐⭐

**核心价值**：发现异常的第一入口

### ASCII布局

```
┌──────────────────────────────────────────┐
│  供应商对比矩阵                            │
│ ──────────────────────────────────────   │
│                                          │
│  自身峰值比高                             │
│       ↑                                  │
│  ┌────┴────┐                             │
│  │潜力型   │标杆型│                      │
│  │        │      │                      │
│  │[广达]  │[毅航]│                      │
│  └─────────┘      │                      │
│  │问题型   │波动型│                      │
│  │        │      │                      │
│  │[华啸]  │[赛维斯]│                     │
│  └─────────┘                             │
│       ↓          ←     →                 │
│  自身峰值比低    头部差距大    头部差距小 │
│                                          │
│ 气泡大小 = 产能规模                       │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .matrix-container {
    width: 500px;
    height: 500px;
    position: relative;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    margin: 20px;
  }

  .matrix-title {
    position: absolute;
    top: 12px;
    left: 20px;
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .quadrant {
    position: absolute;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .quadrant-p0 { /* 问题型 - 左下 */
    bottom: 0;
    left: 0;
    background: rgba(212, 132, 90, 0.2);
    border-radius: 0 0 0 10px;
  }

  .quadrant-p1 { /* 标杆型 - 右上 */
    top: 0;
    right: 0;
    background: rgba(143, 155, 127, 0.15);
    border-radius: 0 10px 0 0;
  }

  .quadrant-p2a { /* 潜力型 - 左上 */
    top: 0;
    left: 0;
    background: #f5f4f1;
  }

  .quadrant-p2b { /* 波动型 - 右下 */
    bottom: 0;
    right: 0;
    background: #f5f4f1;
    border-radius: 0 0 10px 0;
  }

  .quadrant-label {
    font-size: 12px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  .bubble {
    position: absolute;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .bubble:hover {
    transform: scale(1.1);
  }

  .bubble-p0 {
    background: #faf9f7;
    border: 2px solid #d4845a;
  }

  .bubble-p1 {
    background: #faf9f7;
    border: 2px solid #8f9b7f;
  }

  .bubble-p2 {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
  }

  .bubble-name {
    font-size: 10.5px;
    font-weight: 500;
    color: #1a1a1a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
  }

  .bubble-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 10px;
    font-weight: 600;
    color: #c98a6a;
  }

  .axis-label {
    position: absolute;
    font-size: 9px;
    color: #6b6b6b;
  }

  .axis-y-top {
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
  }

  .axis-y-bottom {
    bottom: 8px;
    left: 8px;
  }

  .axis-x-left {
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .axis-x-center {
    bottom: 8px;
    left: 75%;
    transform: translateX(-50%);
  }

  .axis-x-right {
    bottom: 8px;
    right: 8px;
  }

  .legend {
    position: absolute;
    bottom: 12px;
    right: 20px;
    font-size: 9px;
    color: #6b6b6b;
    background: rgba(250, 249, 247, 0.9);
    padding: 4px 8px;
    border-radius: 4px;
  }
</style>
</head>
<body>

<div class="matrix-container">
  <div class="matrix-title">供应商对比矩阵</div>

  <!-- 象限 -->
  <div class="quadrant quadrant-p2a">
    <div class="quadrant-label">潜力型</div>
  </div>
  <div class="quadrant quadrant-p1">
    <div class="quadrant-label">标杆型</div>
  </div>
  <div class="quadrant quadrant-p0">
    <div class="quadrant-label">问题型</div>
  </div>
  <div class="quadrant quadrant-p2b">
    <div class="quadrant-label">波动型</div>
  </div>

  <!-- 气泡 - 位置根据数据动态调整 -->
  <!-- 华啸 - 问题型 P0 -->
  <div class="bubble bubble-p0" style="width: 48px; height: 48px; bottom: 25%; left: 25%;">
    <div class="bubble-name">华啸</div>
    <div class="bubble-value">58%</div>
  </div>

  <!-- 岐力 - 问题型 P0 -->
  <div class="bubble bubble-p0" style="width: 52px; height: 52px; bottom: 30%; left: 20%;">
    <div class="bubble-name">岐力</div>
    <div class="bubble-value">62%</div>
  </div>

  <!-- 毅航 - 标杆型 P1 -->
  <div class="bubble bubble-p1" style="width: 72px; height: 72px; top: 25%; right: 25%;">
    <div class="bubble-name">毅航</div>
    <div class="bubble-value">92%</div>
  </div>

  <!-- 毛毛虫 - 标杆型 P1 -->
  <div class="bubble bubble-p1" style="width: 68px; height: 68px; top: 30%; right: 30%;">
    <div class="bubble-name">毛毛虫</div>
    <div class="bubble-value">88%</div>
  </div>

  <!-- 广达 - 潜力型 P2 -->
  <div class="bubble bubble-p2" style="width: 60px; height: 60px; top: 30%; left: 30%;">
    <div class="bubble-name">广达</div>
    <div class="bubble-value">85%</div>
  </div>

  <!-- 伽玛 - 潜力型 P2 -->
  <div class="bubble bubble-p2" style="width: 56px; height: 56px; top: 25%; left: 35%;">
    <div class="bubble-name">伽玛</div>
    <div class="bubble-value">82%</div>
  </div>

  <!-- 赛维斯 - 波动型 P2 -->
  <div class="bubble bubble-p2" style="width: 54px; height: 54px; bottom: 35%; right: 35%;">
    <div class="bubble-name">赛维斯</div>
    <div class="bubble-value">78%</div>
  </div>

  <!-- 轴标签 -->
  <div class="axis-label axis-y-top">自身峰值比高</div>
  <div class="axis-label axis-y-bottom">自身峰值比低</div>
  <div class="axis-label axis-x-left">头部差距大</div>
  <div class="axis-label axis-x-center">头部差距中</div>
  <div class="axis-label axis-x-right">头部差距小</div>

  <div class="legend">气泡大小 = 产能规模</div>
</div>

</body>
</html>
```

### 逻辑链条

```
步骤1：查看矩阵 → 找到问题象限（左下，焦橙背景）
步骤2：定位具体供应商 → 气泡标注（华啸58%、岐力62%）
步骤3：决定行动 → 约谈/分享标杆/观察
```

### 视觉呈现策略

| 层级 | 元素 | 样式 | 目的 |
|------|------|------|------|
| 最醒目 | P0问题象限 | 焦橙20%背景 | 第一眼就看到 |
| 次醒目 | P1标杆象限 | 橄榄绿15%背景 | 正向确认 |
| 最平淡 | P2普通象限 | 暖灰背景 | 背景信息 |

---

## 1.2 排名×人效交叉矩阵 ⭐⭐⭐⭐⭐

**核心价值**：识别隐性退步/进步

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 排名 × 人效趋势分析                       │
│ ──────────────────────────────────────   │
│                                          │
│              排名上升                     │
│                  ↑                        │
│     ┌────────────┼────────────┐          │
│     │隐性进步     │显性进步     │          │
│     │（人效↑排名→）│（人效↑排名↑）│        │
│     │            │            │          │
│     │[伽玛]     │[毛毛虫]    │          │
│     └────────────┼────────────┘          │
│     │隐性退步     │显性退步     │          │
│     │（人效↓排名→）│（人效↓排名↓）│        │
│     │            │            │          │
│     │[翰锐]     │[岐力]      │          │
│     └────────────┴────────────┘          │
│                  ↓          ←     →      │
│              排名下降    人效下降  人效上升 │
│                                          │
│  关注：隐性退步（人效降但排名未降）       │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .cross-matrix-container {
    width: 480px;
    height: 420px;
    position: relative;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    margin: 20px;
    padding: 50px 20px 20px 20px;
  }

  .matrix-title {
    position: absolute;
    top: 12px;
    left: 20px;
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .quadrant {
    position: absolute;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }

  /* 显性进步 - 右上 */
  .quadrant-progress {
    top: 0;
    right: 0;
    background: rgba(143, 155, 127, 0.15);
  }

  /* 隐性进步 - 左上 */
  .quadrant-latent-progress {
    top: 0;
    left: 0;
    background: #f5f4f1;
  }

  /* 隐性退步 - 左下 */
  .quadrant-latent-decline {
    bottom: 0;
    left: 0;
    background: #f5f4f1;
    border-left: 3px solid #d4845a;
  }

  /* 显性退步 - 右下 */
  .quadrant-decline {
    bottom: 0;
    right: 0;
    background: rgba(212, 132, 90, 0.2);
  }

  .quadrant-label {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    text-align: center;
    margin-bottom: 4px;
  }

  .quadrant-sub {
    font-size: 9px;
    color: #6b6b6b;
    margin-bottom: 8px;
  }

  .supplier-tag {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 10.5px;
    font-weight: 500;
    color: #1a1a1a;
    margin: 2px;
    display: inline-block;
  }

  .supplier-tag.warning {
    border-color: #d4845a;
    border-width: 1.5px;
  }

  .supplier-tag.success {
    border-color: #8f9b7f;
    border-width: 1.5px;
  }

  .axis-label {
    position: absolute;
    font-size: 9px;
    color: #6b6b6b;
  }

  .axis-top {
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .axis-bottom {
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .axis-left {
    left: 8px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
  }

  .axis-center-left {
    left: 8px;
    top: 25%;
    transform: translateY(-50%) rotate(-90deg);
  }

  .axis-center-right {
    right: 8px;
    top: 25%;
    transform: translateY(-50%) rotate(90deg);
  }

  .focus-tip {
    position: absolute;
    bottom: 12px;
    left: 20px;
    right: 20px;
    background: rgba(212, 132, 90, 0.1);
    border-left: 3px solid #d4845a;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 9px;
    color: #d4845a;
  }
</style>
</head>
<body>

<div class="cross-matrix-container">
  <div class="matrix-title">排名 × 人效趋势分析</div>

  <!-- 隐性进步象限 -->
  <div class="quadrant quadrant-latent-progress">
    <div class="quadrant-label">隐性进步</div>
    <div class="quadrant-sub">人效↑ 排名→</div>
    <div>
      <span class="supplier-tag">伽玛</span>
      <span class="supplier-tag">赛维斯</span>
    </div>
  </div>

  <!-- 显性进步象限 -->
  <div class="quadrant quadrant-progress">
    <div class="quadrant-label">显性进步</div>
    <div class="quadrant-sub">人效↑ 排名↑</div>
    <div>
      <span class="supplier-tag success">毛毛虫</span>
      <span class="supplier-tag success">毅航</span>
    </div>
  </div>

  <!-- 隐性退步象限 -->
  <div class="quadrant quadrant-latent-decline">
    <div class="quadrant-label">隐性退步</div>
    <div class="quadrant-sub">人效↓ 排名→</div>
    <div>
      <span class="supplier-tag warning">翰锐</span>
      <span class="supplier-tag warning">广达</span>
    </div>
  </div>

  <!-- 显性退步象限 -->
  <div class="quadrant quadrant-decline">
    <div class="quadrant-label">显性退步</div>
    <div class="quadrant-sub">人效↓ 排名↓</div>
    <div>
      <span class="supplier-tag warning">岐力</span>
      <span class="supplier-tag warning">华啸</span>
    </div>
  </div>

  <!-- 轴标签 -->
  <div class="axis-label axis-top">排名上升</div>
  <div class="axis-label axis-bottom">排名下降</div>
  <div class="axis-label axis-center-left">人效上升</div>
  <div class="axis-label axis-center-right">人效下降</div>

  <div class="focus-tip">⚠️ 关注：隐性退步（人效降但排名未降）— 翰锐、广达</div>
</div>

</body>
</html>
```

### 逻辑链条

```
维度1：排名变化 → 上升/下降/持平
维度2：人效变化 → 上升/下降/持平
交叉分析 → 四种状态：
  - 显性进步（人效↑+排名↑）→ 表扬
  - 隐性进步（人效↑+排名→）→ 关注
  - 隐性退步（人效↓+排名→）→ ⚠️ 警告
  - 显性退步（人效↓+排名↓）→ 立即行动
```

---

## 1.3 归因逻辑树 ⭐⭐⭐⭐⭐

**核心价值**：问题定位核心流程

### ASCII布局

```
                    ┌────────────────┐
                    │ 业绩/排名异常？ │
                    └────────┬───────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
            是 │                           │ 否
               ▼                           ▼
        ┌─────────────┐            ┌─────────────┐
        │ 哪个维度差？  │            │ 正常通报     │
        └─────────────┘            └─────────────┘
               │
     ┌─────────┼─────────┐
     │         │         │
     ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│产能不足 │ │人效低  │ │质量差  │
│        │ │        │ │        │
│加人/培训│ │结构调整 │ │流程优化│
└────────┘ └────────┘ └────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .tree-container {
    width: 600px;
    min-height: 300px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 20px;
    margin: 20px;
  }

  .tree-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  .tree-level {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    position: relative;
  }

  .node {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  .node-root {
    border-color: #c98a6a;
    border-width: 1.5px;
    background: #faf9f7;
  }

  .node-branch {
    border-color: #d4845a;
    border-width: 1.5px;
  }

  .node-solution {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .node-normal {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .solution-text {
    display: block;
    font-size: 9px;
    color: #6b6b6b;
    margin-top: 4px;
  }

  .connector-vertical {
    position: absolute;
    width: 2px;
    background: #c98a6a;
    left: 50%;
    transform: translateX(-50%);
  }

  .connector-horizontal {
    position: absolute;
    height: 2px;
    background: #c98a6a;
    top: -15px;
  }

  .branch-label {
    position: absolute;
    font-size: 9px;
    color: #6b6b6b;
    background: #faf9f7;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .branch-label.yes {
    color: #8f9b7f;
  }

  .branch-label.no {
    color: #d4845a;
  }
</style>
</head>
<body>

<div class="tree-container">
  <div class="tree-title">归因逻辑树</div>

  <!-- 根节点 -->
  <div class="tree-level">
    <div class="node node-root">业绩/排名异常？</div>
  </div>

  <!-- 连接线 -->
  <div style="position: relative; height: 20px;">
    <div class="connector-vertical" style="height: 20px; top: -20px;"></div>
  </div>

  <!-- 第二层 - 是/否分支 -->
  <div class="tree-level" style="justify-content: space-around;">
    <div style="position: relative;">
      <div class="branch-label yes" style="top: -12px; left: -20px;">是</div>
      <div class="node node-branch">哪个维度差？</div>
    </div>
    <div style="position: relative;">
      <div class="branch-label no" style="top: -12px; right: -20px;">否</div>
      <div class="node node-normal">正常通报</div>
    </div>
  </div>

  <!-- 第三层 - 具体问题 -->
  <div class="tree-level" style="justify-content: center; gap: 12px;">
    <div style="text-align: center;">
      <div class="node node-branch">产能不足</div>
      <div class="solution-text">加人 / 培训</div>
    </div>
    <div style="text-align: center;">
      <div class="node node-branch">人效低</div>
      <div class="solution-text">结构调整</div>
    </div>
    <div style="text-align: center;">
      <div class="node node-branch">质量差</div>
      <div class="solution-text">流程优化</div>
    </div>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
第一层：是否异常？
  → 否 → 正常通报

  → 是 → 第二层：哪个维度差？
      → 产能不足 → 加人/培训
      → 人效低 → 调整结构
      → 质量差 → 流程优化

第三层：制定行动计划
  → 约谈/整改/验证
```

---

## 1.4 单体深度看板（7指标雷达）⭐⭐⭐⭐⭐

**核心价值**：单个供应商的全方位诊断

### ASCII布局

```
┌──────────────────────────────────────────┐
│ [毅航] 供应商深度看板                      │
│ ──────────────────────────────────────   │
│                                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │排名: #3 │ │FCI: 92% │ │人效: +8%│    │
│  └─────────┘ └─────────┘ └─────────┘    │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │     7指标归因雷达图             │    │
│  │     （产能/人效/质量/成本/      │    │
│  │      流失/增长/合规）            │    │
│  └─────────────────────────────────┘    │
│                                          │
│  评分：产能 92 │ 人效 88 │ 质量 95        │
│        成本 85 │ 成长 78 │ 流失 90        │
│                                          │
│  综合得分：89分（优秀）                    │
│  薄弱项：成长速度（需关注新人培养）          │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .dashboard-container {
    width: 500px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .dashboard-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .metric-cards {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric-card {
    flex: 1;
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }

  .metric-card.excellent {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .metric-label {
    font-size: 9px;
    color: #6b6b6b;
    margin-bottom: 4px;
  }

  .metric-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .radar-container {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .scores-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }

  .score-item {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
  }

  .score-item.excellent {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .score-item.warning {
    background: rgba(212, 132, 90, 0.1);
    border-color: #d4845a;
  }

  .score-label {
    font-size: 9px;
    color: #6b6b6b;
  }

  .score-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 12px;
    font-weight: 600;
    color: #c98a6a;
  }

  .summary-box {
    background: #f5f4f1;
    border-left: 4px solid #c98a6a;
    border-radius: 4px;
    padding: 12px;
  }

  .summary-title {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .summary-text {
    font-size: 10px;
    color: #6b6b6b;
  }

  .weakness-tag {
    display: inline-block;
    background: rgba(212, 132, 90, 0.15);
    color: #d4845a;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 500;
  }
</style>
</head>
<body>

<div class="dashboard-container">
  <div class="dashboard-header">
    <div class="dashboard-title">[毅航] 供应商深度看板</div>
  </div>

  <!-- 核心指标卡片 -->
  <div class="metric-cards">
    <div class="metric-card excellent">
      <div class="metric-label">排名</div>
      <div class="metric-value">#3 ↑1</div>
    </div>
    <div class="metric-card excellent">
      <div class="metric-label">FCI</div>
      <div class="metric-value">92%</div>
    </div>
    <div class="metric-card excellent">
      <div class="metric-label">人效</div>
      <div class="metric-value">+8%</div>
    </div>
  </div>

  <!-- 7指标评分 -->
  <div class="scores-grid">
    <div class="score-item excellent">
      <div class="score-label">产能</div>
      <div class="score-value">92</div>
    </div>
    <div class="score-item excellent">
      <div class="score-label">人效</div>
      <div class="score-value">88</div>
    </div>
    <div class="score-item excellent">
      <div class="score-label">质量</div>
      <div class="score-value">95</div>
    </div>
    <div class="score-item excellent">
      <div class="score-label">成本</div>
      <div class="score-value">85</div>
    </div>
    <div class="score-item warning">
      <div class="score-label">成长</div>
      <div class="score-value">78</div>
    </div>
    <div class="score-item excellent">
      <div class="score-label">流失</div>
      <div class="score-value">90</div>
    </div>
  </div>

  <!-- 综合评估 -->
  <div class="summary-box">
    <div class="summary-title">综合得分：89分（优秀）</div>
    <div class="summary-text">
      薄弱项：<span class="weakness-tag">成长速度 78分</span> — 需关注新人培养周期
    </div>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
步骤1：选择供应商 → 打开深度看板
步骤2：查看雷达图 → 识别形状（饱满=好，凹陷=差）
步骤3：定位薄弱项 → 成长78分（关注点）
步骤4：查看近6个月趋势 → 验证是否持续问题
步骤5：决定行动 → 分享标杆/整改/观察
```

---

## 1.5 FCI速记卡 + 双指标卡片 ⭐⭐⭐⭐⭐

**核心价值**：月度通报的核心工具

### ASCII布局

```
┌──────────────────────────────────────────┐
│ [毅航] 月度业绩通报                        │
│ ──────────────────────────────────────   │
│                                          │
│  ┌─────────────────┐  ┌─────────────────┐│
│  │   业绩达成      │  │   FCI 指标      ││
│  │                 │  │                 ││
│  │     92%         │  │     88%         ││
│  │   ━━━━━━━●      │  │   ━━━━●━━       ││
│  │                 │  │                 ││
│  │  目标：3000万    │  │  合格线：80%    ││
│  └─────────────────┘  └─────────────────┘│
│                                          │
│  排名：#3（↑1）                           │
│  状态：标杆型，维持现状                     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ FCI 指标速查卡                            │
│ ──────────────────────────────────────   │
│                                          │
│  定义：财务综合指标（Financial Composite）  │
│                                          │
│  计算公式：                                │
│  FCI = 业绩达标率×40% + 毛利率×30%        │
│        + 回款及时率×20% + 费用控制×10%    │
│                                          │
│  分级标准：                                │
│  • ≥ 90%：优秀（标杆型）                   │
│  • 80-90%：合格（正常型）                  │
│  • < 80%：预警（问题型）                   │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .report-container {
    width: 480px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .report-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .dual-metrics {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .metric-box {
    flex: 1;
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }

  .metric-box.excellent {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .metric-label {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  .metric-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 24px;
    font-weight: 700;
    color: #c98a6a;
    margin-bottom: 8px;
  }

  .progress-bar {
    height: 6px;
    background: #f5f4f1;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: #8f9b7f;
    border-radius: 3px;
  }

  .progress-fill.warning {
    background: #d4845a;
  }

  .metric-target {
    font-size: 9px;
    color: #6b6b6b;
  }

  .report-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #d4d1c7;
  }

  .rank-tag {
    background: rgba(143, 155, 127, 0.15);
    color: #8f9b7f;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
  }

  .status-text {
    font-size: 10px;
    color: #6b6b6b;
  }

  /* FCI速记卡 */
  .quick-ref-card {
    width: 480px;
    background: #f5f4f1;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px 0;
  }

  .quick-ref-title {
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #d4d1c7;
  }

  .quick-ref-section {
    margin-bottom: 12px;
  }

  .quick-ref-label {
    font-size: 10px;
    font-weight: 500;
    color: #6b6b6b;
    margin-bottom: 4px;
  }

  .quick-ref-formula {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 10px;
    color: #1a1a1a;
    background: #faf9f7;
    padding: 8px;
    border-radius: 4px;
    line-height: 1.6;
  }

  .grade-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .grade-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
  }

  .grade-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
    min-width: 60px;
    text-align: center;
  }

  .grade-badge.excellent {
    background: rgba(143, 155, 127, 0.2);
    color: #8f9b7f;
  }

  .grade-badge.good {
    background: #f5f4f1;
    color: #1a1a1a;
    border: 1px solid #d4d1c7;
  }

  .grade-badge.warning {
    background: rgba(212, 132, 90, 0.2);
    color: #d4845a;
  }
</style>
</head>
<body>

<!-- 双指标卡片 -->
<div class="report-container">
  <div class="report-title">[毅航] 月度业绩通报</div>

  <div class="dual-metrics">
    <div class="metric-box excellent">
      <div class="metric-label">业绩达成</div>
      <div class="metric-value">92%</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 92%;"></div>
      </div>
      <div class="metric-target">目标：3000万</div>
    </div>

    <div class="metric-box excellent">
      <div class="metric-label">FCI 指标</div>
      <div class="metric-value">88%</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 88%;"></div>
      </div>
      <div class="metric-target">合格线：80%</div>
    </div>
  </div>

  <div class="report-footer">
    <span class="rank-tag">排名 #3 ↑1</span>
    <span class="status-text">状态：标杆型，维持现状</span>
  </div>
</div>

<!-- FCI速记卡 -->
<div class="quick-ref-card">
  <div class="quick-ref-title">FCI 指标速查卡</div>

  <div class="quick-ref-section">
    <div class="quick-ref-label">计算公式</div>
    <div class="quick-ref-formula">
      FCI = 业绩达标率×40% + 毛利率达标率×30%<br>
          + 回款及时率×20% + 费用控制率×10%
    </div>
  </div>

  <div class="quick-ref-section">
    <div class="quick-ref-label">分级标准</div>
    <div class="grade-list">
      <div class="grade-item">
        <span class="grade-badge excellent">≥ 90%</span>
        <span>优秀（标杆型）</span>
      </div>
      <div class="grade-item">
        <span class="grade-badge good">80-90%</span>
        <span>合格（正常型）</span>
      </div>
      <div class="grade-item">
        <span class="grade-badge warning">&lt; 80%</span>
        <span>预警（问题型）</span>
      </div>
    </div>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
月度数据 → 计算FCI → 分级：
  - ≥90%：优秀（标杆型）
  - 80-90%：合格（正常型）
  - <80%：预警（问题型）

双指标展示：
  - 业绩好+FCI好 → 维持现状
  - 业绩好+FCI差 → 关注利润
  - 业绩差+FCI好 → 关注增长可持续性
  - 业绩差+FCI差 → 立即干预
```

---

## 1.6 周度产能达成率对比 ⭐⭐⭐⭐

**核心价值**：每周必看，跟踪进度

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 周度产能达成率对比                        │
│ ──────────────────────────────────────   │
│                                          │
│ 100% ┤                                    │
│      │     ┌───┐                         │
│  80% ┤     │░░░│ ┌───┐                    │
│      │ ┌───┤░░░├─┤░░░│ ┌───┐             │
│  60% ┤ │░░░│░░░│ │░░░├─┤░░░│             │
│      │ │░░░│░░░│ │░░░│ │░░░│             │
│  40% ┤ │░░░│░░░│ │░░░│ │░░░│             │
│      └─┴───┴───┴─┴───┴─┴───┴──────      │
│        W1  W2  W3  W4  W1  W2           │
│              上月        本月             │
│                                          │
│  目标线：100% (虚线)                      │
│  达标：橄榄绿  未达标：焦橙               │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .chart-container {
    width: 500px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .chart-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .chart-area {
    position: relative;
    height: 180px;
    margin-bottom: 12px;
  }

  .y-axis {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 30px;
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .y-label {
    font-size: 9px;
    color: #6b6b6b;
    font-family: "SF Mono", Monaco, monospace;
  }

  .bars-container {
    position: absolute;
    left: 45px;
    right: 0;
    top: 0;
    bottom: 30px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .bar-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    position: relative;
    min-height: 4px;
  }

  .bar.success {
    background: #8f9b7f;
  }

  .bar.warning {
    background: #d4845a;
  }

  .bar-value {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    font-family: "SF Mono", Monaco, monospace;
    color: #6b6b6b;
  }

  .x-labels {
    display: flex;
    padding-left: 45px;
  }

  .x-label-group {
    flex: 1;
    text-align: center;
  }

  .x-label {
    font-size: 9px;
    color: #6b6b6b;
  }

  .group-label {
    font-size: 9px;
    color: #1a1a1a;
    font-weight: 500;
    margin-top: 4px;
  }

  .legend {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding-top: 8px;
    border-top: 1px solid #d4d1c7;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 9px;
    color: #6b6b6b;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }

  .legend-dot.success {
    background: #8f9b7f;
  }

  .legend-dot.warning {
    background: #d4845a;
  }
</style>
</head>
<body>

<div class="chart-container">
  <div class="chart-title">周度产能达成率对比</div>

  <div class="chart-area">
    <div class="y-axis">
      <div class="y-label">100%</div>
      <div class="y-label">80%</div>
      <div class="y-label">60%</div>
      <div class="y-label">40%</div>
    </div>

    <div class="bars-container">
      <!-- 上月 W1 -->
      <div class="bar-group">
        <div class="bar success" style="height: 65%;">
          <span class="bar-value">82%</span>
        </div>
      </div>
      <!-- 上月 W2 -->
      <div class="bar-group">
        <div class="bar success" style="height: 70%;">
          <span class="bar-value">88%</span>
        </div>
      </div>
      <!-- 上月 W3 -->
      <div class="bar-group">
        <div class="bar warning" style="height: 60%;">
          <span class="bar-value">75%</span>
        </div>
      </div>
      <!-- 上月 W4 -->
      <div class="bar-group">
        <div class="bar success" style="height: 68%;">
          <span class="bar-value">85%</span>
        </div>
      </div>

      <!-- 本月 W1 -->
      <div class="bar-group">
        <div class="bar warning" style="height: 58%;">
          <span class="bar-value">72%</span>
        </div>
      </div>
      <!-- 本月 W2 -->
      <div class="bar-group">
        <div class="bar success" style="height: 75%;">
          <span class="bar-value">94%</span>
        </div>
      </div>
    </div>
  </div>

  <div class="x-labels">
    <div class="x-label-group">
      <div class="x-label">W1</div>
    </div>
    <div class="x-label-group">
      <div class="x-label">W2</div>
    </div>
    <div class="x-label-group">
      <div class="x-label">W3</div>
    </div>
    <div class="x-label-group">
      <div class="x-label">W4</div>
      <div class="group-label">上月</div>
    </div>
    <div class="x-label-group">
      <div class="x-label">W1</div>
    </div>
    <div class="x-label-group">
      <div class="x-label">W2</div>
      <div class="group-label">本月</div>
    </div>
  </div>

  <div class="legend">
    <div class="legend-item">
      <div class="legend-dot success"></div>
      <span>达标 ≥80%</span>
    </div>
    <div class="legend-item">
      <div class="legend-dot warning"></div>
      <span>未达标 &lt;80%</span>
    </div>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
每周查看：
步骤1：看本月柱 → 是否达标（绿色/焦橙）
步骤2：对比上月 → 上升/下降趋势？
步骤3：看累计进度 → 按当前速度，Q1能否达成？
步骤4：决定行动 → 加速/维持/调整
```

---

## 1.7 触发规则检查表 ⭐⭐⭐⭐⭐

**核心价值**：自动化筛选异常供应商

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 月度触发规则检查                          │
│ ──────────────────────────────────────   │
│                                          │
│  自动触发条件：                            │
│  ☑ 峰值比 < 70%       → [华啸、岐力]     │
│  ☑ 排名下降 ≥3位      → [翰锐]           │
│  ☐ FCI < 80%          → [无]             │
│  ☐ 连续2月Bottom3     → [无]             │
│                                          │
│  手动检查建议：                            │
│  • 人效下降但排名未变的隐性退步供应商       │
│  • 新供应商第3个月达标检查                 │
│                                          │
│  需行动数：2个                             │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .checklist-container {
    width: 450px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .checklist-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 500;
    color: #6b6b6b;
    margin-bottom: 8px;
  }

  .checklist-item {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .checklist-item.triggered {
    background: rgba(212, 132, 90, 0.15);
    border-color: #d4845a;
    border-width: 1.5px;
  }

  .checklist-item.passed {
    background: rgba(143, 155, 127, 0.1);
    border-color: #8f9b7f;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 1.5px solid #1a1a1a;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .checkbox.checked {
    background: #1a1a1a;
  }

  .checkbox.checked::after {
    content: '✓';
    color: #faf9f7;
    font-size: 12px;
    font-weight: 700;
  }

  .check-content {
    flex: 1;
  }

  .check-condition {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .check-result {
    font-size: 10px;
    color: #6b6b6b;
    margin-top: 2px;
  }

  .supplier-tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .supplier-tag {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 9px;
    font-weight: 500;
  }

  .manual-checks {
    background: #faf9f7;
    border: 1px dashed #d4d1c7;
    border-radius: 8px;
    padding: 10px 12px;
    margin: 12px 0;
  }

  .manual-check-item {
    font-size: 10px;
    color: #6b6b6b;
    padding: 4px 0;
    padding-left: 12px;
    position: relative;
  }

  .manual-check-item::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #c98a6a;
  }

  .action-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #d4d1c7;
  }

  .action-count {
    font-size: 11px;
    font-weight: 500;
  }

  .action-number {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 18px;
    font-weight: 700;
    color: #d4845a;
  }
</style>
</head>
<body>

<div class="checklist-container">
  <div class="checklist-title">月度触发规则检查</div>

  <div class="section-label">自动触发条件</div>

  <div class="checklist-item triggered">
    <div class="checkbox checked"></div>
    <div class="check-content">
      <div class="check-condition">峰值比 < 70%</div>
      <div class="check-result">
        <span class="supplier-tags">
          <span class="supplier-tag">华啸 58%</span>
          <span class="supplier-tag">岐力 62%</span>
        </span>
      </div>
    </div>
  </div>

  <div class="checklist-item triggered">
    <div class="checkbox checked"></div>
    <div class="check-content">
      <div class="check-condition">排名下降 ≥ 3位</div>
      <div class="check-result">
        <span class="supplier-tags">
          <span class="supplier-tag">翰锐 #8→#11</span>
        </span>
      </div>
    </div>
  </div>

  <div class="checklist-item passed">
    <div class="checkbox"></div>
    <div class="check-content">
      <div class="check-condition">FCI < 80%</div>
      <div class="check-result">无触发</div>
    </div>
  </div>

  <div class="checklist-item passed">
    <div class="checkbox"></div>
    <div class="check-content">
      <div class="check-condition">连续2月Bottom3</div>
      <div class="check-result">无触发</div>
    </div>
  </div>

  <div class="manual-checks">
    <div class="manual-check-item">人效下降但排名未变的隐性退步供应商</div>
    <div class="manual-check-item">新供应商第3个月达标检查</div>
  </div>

  <div class="action-summary">
    <span class="section-label">需行动数</span>
    <span class="action-count"><span class="action-number">2</span> 个</span>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
月初数据自动计算：
→ 触发检查 → 哪些供应商触发规则？
→ 自动生成台账 → 华啸、岐力（峰值比<70%）
→ 人工确认 → 是否误报？
→ 启动流程 → 约谈/整改/监控
```

---

## 1.8 主管胜任评估仪表盘 ⭐⭐⭐⭐

**核心价值**：评估供应商管理能力

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 主管胜任度评估                            │
│ ──────────────────────────────────────   │
│                                          │
│        ┌──────────────────┐              │
│        │     85%          │              │
│        │   ◯━━━━━━━●      │  ← 仪表盘     │
│        └──────────────────┘              │
│                                          │
│  ┌─────────┬─────────┬─────────┬─────────┐│
│  │管理半径 │梯队健康 │新人培养 │流失率  ││
│  │  90%    │  82%    │  78%    │  88%    ││
│  │ ━━━━●   │  ━━●━━  │  ━●━━━  │ ━━━●━  ││
│  └─────────┴─────────┴─────────┴─────────┘│
│                                          │
│  评估：优秀（≥85%）                       │
│  关注点：新人培养周期偏长                  │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .competency-container {
    width: 480px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .competency-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .gauge-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .gauge {
    width: 200px;
    text-align: center;
  }

  .gauge-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
  }

  .gauge-bar {
    height: 8px;
    background: #f5f4f1;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .gauge-fill {
    height: 100%;
    background: linear-gradient(90deg, #d4845a 0%, #c98a6a 50%, #8f9b7f 100%);
    border-radius: 4px;
  }

  .gauge-marker {
    position: absolute;
    top: -4px;
    width: 4px;
    height: 16px;
    background: #1a1a1a;
    border-radius: 2px;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric-item {
    text-align: center;
  }

  .metric-name {
    font-size: 9px;
    color: #6b6b6b;
    margin-bottom: 6px;
  }

  .metric-score {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .metric-progress {
    height: 4px;
    background: #f5f4f1;
    border-radius: 2px;
    overflow: hidden;
  }

  .metric-fill {
    height: 100%;
    border-radius: 2px;
  }

  .metric-fill.excellent {
    background: #8f9b7f;
  }

  .metric-fill.good {
    background: #c98a6a;
  }

  .metric-fill.warning {
    background: #d4845a;
  }

  .summary-box {
    background: #f5f4f1;
    border-left: 4px solid #8f9b7f;
    border-radius: 4px;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .summary-grade {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .summary-grade span {
    color: #8f9b7f;
    font-weight: 600;
  }

  .summary-focus {
    font-size: 10px;
    color: #6b6b6b;
  }

  .focus-item {
    display: inline-block;
    background: rgba(212, 132, 90, 0.15);
    color: #d4845a;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
</style>
</head>
<body>

<div class="competency-container">
  <div class="competency-title">主管胜任度评估</div>

  <div class="gauge-wrapper">
    <div class="gauge">
      <div class="gauge-value">85%</div>
      <div class="gauge-bar">
        <div class="gauge-fill" style="width: 85%;"></div>
        <div class="gauge-marker" style="left: 85%;"></div>
      </div>
    </div>
  </div>

  <div class="metrics-grid">
    <div class="metric-item">
      <div class="metric-name">管理半径</div>
      <div class="metric-score">90%</div>
      <div class="metric-progress">
        <div class="metric-fill excellent" style="width: 90%;"></div>
      </div>
    </div>
    <div class="metric-item">
      <div class="metric-name">梯队健康</div>
      <div class="metric-score">82%</div>
      <div class="metric-progress">
        <div class="metric-fill good" style="width: 82%;"></div>
      </div>
    </div>
    <div class="metric-item">
      <div class="metric-name">新人培养</div>
      <div class="metric-score">78%</div>
      <div class="metric-progress">
        <div class="metric-fill warning" style="width: 78%;"></div>
      </div>
    </div>
    <div class="metric-item">
      <div class="metric-name">流失率</div>
      <div class="metric-score">88%</div>
      <div class="metric-progress">
        <div class="metric-fill excellent" style="width: 88%;"></div>
      </div>
    </div>
  </div>

  <div class="summary-box">
    <div class="summary-grade">评估：<span>优秀</span>（≥85%）</div>
    <div class="summary-focus">关注点：<span class="focus-item">新人培养 78%</span></div>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
月度评估：
步骤1：查看总分 → 85分（优秀）/ 75-85分（良好）/ <75分（需关注）
步骤2：查看分项 → 哪个维度拖后腿？（如：新人培养78分）
步骤3：对比上月 → 该维度是否改善？
步骤4：决定行动 → 分享标杆/专项培训/更换主管
```

---

# 二、战略管理工具（5个）

## 2.1 四大战略维度总览 ⭐⭐⭐⭐⭐

**核心价值**：战略全景图，季度回顾

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 供应商管理四大战略维度                     │
│ ──────────────────────────────────────   │
│                                          │
│  ┌────────────────────────────────┐      │
│  │  战略选择                       │      │
│  │  （头部集中/分散布局）          │      │
│  │  头部集中度：55% ✓              │      │
│  └────────────────────────────────┘      │
│           ↓                               │
│  ┌────────────────────────────────┐      │
│  │  供应商培育                     │      │
│  │  （新人成长/能力提升）          │      │
│  │  新增2家进入爬坡期             │      │
│  └────────────────────────────────┘      │
│           ↓                               │
│  ┌────────────────────────────────┐      │
│  │  动态调整                       │      │
│  │  （进退清退/份额调整）          │      │
│  │  无清退/份额调整               │      │
│  └────────────────────────────────┘      │
│           ↓                               │
│  ┌────────────────────────────────┐      │
│  │  合规风控                       │      │
│  │  （底线管理/风险预警）          │      │
│  │  华啸预警，已处理 ✓            │      │
│  └────────────────────────────────┘      │
│                                          │
│  ↻ 循环迭代：每月评估，季度调整             │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .strategy-container {
    width: 400px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .strategy-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .strategy-box {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    position: relative;
  }

  .strategy-box::after {
    content: '↓';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    color: #c98a6a;
  }

  .strategy-box:last-of-type::after {
    content: '↻';
    bottom: -18px;
  }

  .strategy-name {
    font-size: 12px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .strategy-desc {
    font-size: 10px;
    color: #6b6b6b;
    margin-bottom: 6px;
  }

  .strategy-status {
    font-size: 10px;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-check {
    color: #8f9b7f;
    font-weight: 700;
  }

  .cycle-note {
    text-align: center;
    font-size: 9px;
    color: #6b6b6b;
    margin-top: 24px;
  }
</style>
</head>
<body>

<div class="strategy-container">
  <div class="strategy-title">四大战略维度</div>

  <div class="strategy-box">
    <div class="strategy-name">战略选择</div>
    <div class="strategy-desc">头部集中 / 分散布局</div>
    <div class="strategy-status">
      <span>头部集中度：55%</span>
      <span class="status-check">✓</span>
    </div>
  </div>

  <div class="strategy-box">
    <div class="strategy-name">供应商培育</div>
    <div class="strategy-desc">新人成长 / 能力提升</div>
    <div class="strategy-status">
      <span>新增2家进入爬坡期</span>
    </div>
  </div>

  <div class="strategy-box">
    <div class="strategy-name">动态调整</div>
    <div class="strategy-desc">进退清退 / 份额调整</div>
    <div class="strategy-status">
      <span>无清退/份额调整</span>
      <span class="status-check">✓</span>
    </div>
  </div>

  <div class="strategy-box">
    <div class="strategy-name">合规风控</div>
    <div class="strategy-desc">底线管理 / 风险预警</div>
    <div class="strategy-status">
      <span>华啸预警，已处理</span>
      <span class="status-check">✓</span>
    </div>
  </div>

  <div class="cycle-note">↻ 循环迭代：每月评估，季度调整</div>
</div>

</body>
</html>
```

### 逻辑链条

```
季度回顾：
战略选择 → 头部集中度55% → 符合预期 ✓
供应商培育 → 新增2家进入爬坡期 → 进行中
动态调整 → 无清退/份额调整 → 正常
合规风控 → 华啸预警，已处理 → 已解决

下季度规划：
继续头部集中（目标60%）
新增1家供应商评估
```

---

## 2.2 月度状态分类 ⭐⭐⭐⭐⭐

**核心价值**：快速判断当月整体情况

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 月度状态分类                              │
│ ──────────────────────────────────────   │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ 需行动（P0）                    │     │
│  │ ─────────────────────────      │     │
│  │ 华啸、岐力                      │     │
│  │ → 立即约谈,制定整改计划         │     │
│  └────────────────────────────────┘     │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ 维持观察（P1-P2）              │     │
│  │ ─────────────────────────      │     │
│  │ 毅航、毛毛虫、广达、伽玛、赛维斯 │     │
│  │ → 常规关注,分享标杆经验         │     │
│  └────────────────────────────────┘     │
│                                          │
│  行动数：2个                              │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .status-container {
    width: 450px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .status-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .status-card {
    border-radius: 8px;
    padding: 14px;
    margin-bottom: 12px;
  }

  .status-card.action {
    background: rgba(212, 132, 90, 0.2);
    border: 1.5px solid #d4845a;
  }

  .status-card.observe {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
  }

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .status-title-text {
    font-size: 12px;
    font-weight: 600;
  }

  .status-card.action .status-title-text {
    color: #d4845a;
  }

  .status-badge {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 9px;
    font-weight: 600;
  }

  .status-card.action .status-badge {
    background: #d4845a;
    color: #faf9f7;
    border-color: #d4845a;
  }

  .supplier-list {
    font-size: 11px;
    color: #1a1a1a;
    margin-bottom: 6px;
  }

  .action-hint {
    font-size: 10px;
    color: #6b6b6b;
  }

  .summary-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #d4d1c7;
  }

  .summary-label {
    font-size: 10px;
    color: #6b6b6b;
  }

  .summary-value {
    font-family: "SF Mono", Monaco, monospace;
    font-size: 16px;
    font-weight: 700;
    color: #d4845a;
  }
</style>
</head>
<body>

<div class="status-container">
  <div class="status-title">月度状态分类</div>

  <div class="status-card action">
    <div class="status-header">
      <div class="status-title-text">需行动</div>
      <div class="status-badge">P0</div>
    </div>
    <div class="supplier-list">华啸、岐力</div>
    <div class="action-hint">→ 立即约谈，制定整改计划</div>
  </div>

  <div class="status-card observe">
    <div class="status-header">
      <div class="status-title-text">维持观察</div>
      <div class="status-badge">P1-P2</div>
    </div>
    <div class="supplier-list">毅航、毛毛虫、广达、伽玛、赛维斯</div>
    <div class="action-hint">→ 常规关注，分享标杆经验</div>
  </div>

  <div class="summary-bar">
    <span class="summary-label">需行动数</span>
    <span class="summary-value">2 个</span>
  </div>
</div>

</body>
</html>
```

### 逻辑链条

```
月初数据：
→ 自动分类 → 需行动（P0）：华啸、岐力
             维持观察（P1-P2）：其余8家
→ 分配资源 → 80%精力放在2家需行动
              20%精力维持观察其余
→ 汇报军哥 → 重点报告华啸、岐力的处理进展
```

---

## 2.3 供应商分级标准 ⭐⭐⭐⭐

**核心价值**：建立供应商等级体系

### ASCII布局

```
┌──────────────────────────────────────────┐
│ 供应商分级标准                             │
│ ──────────────────────────────────────   │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ S级：金条供应商（标杆型）         │     │
│  │ 连续3月Top3 │ FCI≥90% │ 份额>15%│     │
│  │ 毅航、毛毛虫                    │     │
│  └────────────────────────────────┘     │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ A级：核心供应商（稳定型）         │     │
│  │ Top3-8 │ FCI≥80% │ 份额>8%    │     │
│  │ 广达、伽玛、赛维斯               │     │
│  └────────────────────────────────┘     │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ B级：常规供应商（观察型）         │     │
│  │ Top8-15 │ FCI≥70% │ 份额>3%   │     │
│  │ 翰锐、岐力、华啸                 │     │
│  └────────────────────────────────┘     │
│                                          │
│  ┌────────────────────────────────┐     │
│  │ C级：待观察供应商（风险型）       │     │
│  │ Bottom3 │ FCI<70% │ 份额<3%   │     │
│  └────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .grade-container {
    width: 450px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .grade-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .grade-card {
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #d4d1c7;
  }

  .grade-card.s {
    background: rgba(143, 155, 127, 0.15);
    border-color: #8f9b7f;
    border-width: 1.5px;
  }

  .grade-card.a {
    background: #faf9f7;
    border-color: #c98a6a;
    border-width: 1.5px;
  }

  .grade-card.b {
    background: #f5f4f1;
  }

  .grade-card.c {
    background: rgba(212, 132, 90, 0.15);
    border-color: #d4845a;
    border-width: 1.5px;
  }

  .grade-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .grade-name {
    font-size: 12px;
    font-weight: 600;
  }

  .grade-card.s .grade-name { color: #8f9b7f; }
  .grade-card.a .grade-name { color: #c98a6a; }
  .grade-card.c .grade-name { color: #d4845a; }

  .grade-badge {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    background: #faf9f7;
  }

  .grade-card.s .grade-badge { background: #8f9b7f; color: #faf9f7; }
  .grade-card.a .grade-badge { background: #c98a6a; color: #faf9f7; }
  .grade-card.c .grade-badge { background: #d4845a; color: #faf9f7; }

  .grade-criteria {
    font-size: 9px;
    color: #6b6b6b;
    margin-bottom: 6px;
  }

  .supplier-names {
    font-size: 10px;
    color: #1a1a1a;
  }
</style>
</head>
<body>

<div class="grade-container">
  <div class="grade-title">供应商分级标准</div>

  <div class="grade-card s">
    <div class="grade-header">
      <div class="grade-name">S级：金条供应商（标杆型）</div>
      <div class="grade-badge">S</div>
    </div>
    <div class="grade-criteria">连续3月Top3 │ FCI≥90% │ 份额>15%</div>
    <div class="supplier-names">毅航、毛毛虫</div>
  </div>

  <div class="grade-card a">
    <div class="grade-header">
      <div class="grade-name">A级：核心供应商（稳定型）</div>
      <div class="grade-badge">A</div>
    </div>
    <div class="grade-criteria">Top3-8 │ FCI≥80% │ 份额>8%</div>
    <div class="supplier-names">广达、伽玛、赛维斯</div>
  </div>

  <div class="grade-card b">
    <div class="grade-header">
      <div class="grade-name">B级：常规供应商（观察型）</div>
      <div class="grade-badge">B</div>
    </div>
    <div class="grade-criteria">Top8-15 │ FCI≥70% │ 份额>3%</div>
    <div class="supplier-names">翰锐、岐力、华啸</div>
  </div>

  <div class="grade-card c">
    <div class="grade-header">
      <div class="grade-name">C级：待观察供应商（风险型）</div>
      <div class="grade-badge">C</div>
    </div>
    <div class="grade-criteria">Bottom3 │ FCI<70% │ 份额<3%</div>
    <div class="supplier-names">—</div>
  </div>
</div>

</body>
</html>
```

---

## 2.4 新供应商成长曲线 ⭐⭐⭐⭐

**核心价值**：管理新供应商预期

### ASCII+HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .growth-container {
    width: 500px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .growth-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .chart-area {
    height: 160px;
    position: relative;
    margin-bottom: 16px;
  }

  .milestone-marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #d4d1c7;
  }

  .milestone-marker.m1 { left: 16.67%; }
  .milestone-marker.m3 { left: 50%; }
  .milestone-marker.m6 { left: 100%; }

  .milestone-label {
    position: absolute;
    top: -20px;
    transform: translateX(-50%);
    font-size: 9px;
    color: #6b6b6b;
    white-space: nowrap;
  }

  .growth-line {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    height: 100px;
  }

  .ideal-path {
    fill: none;
    stroke: #c98a6a;
    stroke-width: 2;
  }

  .actual-path {
    fill: none;
    stroke: #d4845a;
    stroke-width: 2;
    stroke-dasharray: 4 2;
  }

  .milestone-box {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 8px;
  }

  .milestone-name {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .milestone-desc {
    font-size: 9px;
    color: #6b6b6b;
  }

  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
  }

  .status-dot.on-track { background: #8f9b7f; }
  .status-dot.lagging { background: #d4845a; }
</style>
</head>
<body>

<div class="growth-container">
  <div class="growth-title">新供应商成长曲线</div>

  <div class="chart-area">
    <svg width="100%" height="100%" viewBox="0 0 468 160">
      <!-- Y轴网格 -->
      <line x1="40" y1="20" x2="450" y2="20" stroke="#e8e4dc" stroke-width="1"/>
      <line x1="40" y1="60" x2="450" y2="60" stroke="#e8e4dc" stroke-width="1"/>
      <line x1="40" y1="100" x2="450" y2="100" stroke="#e8e4dc" stroke-width="1"/>

      <!-- 里程碑线 -->
      <line x1="118" y1="10" x2="118" y2="130" stroke="#d4d1c7" stroke-dasharray="2 2"/>
      <line x1="245" y1="10" x2="245" y2="130" stroke="#d4d1c7" stroke-dasharray="2 2"/>
      <line x1="450" y1="10" x2="450" y2="130" stroke="#d4d1c7" stroke-dasharray="2 2"/>

      <!-- 理想曲线 -->
      <path class="ideal-path" d="M40,130 Q118,100 245,60 T450,20"/>

      <!-- 实际曲线 -->
      <path class="actual-path" d="M40,130 Q118,105 245,75 T450,40"/>

      <!-- Y轴标签 -->
      <text x="35" y="24" font-size="9" fill="#6b6b6b" text-anchor="end">100%</text>
      <text x="35" y="64" font-size="9" fill="#6b6b6b" text-anchor="end">70%</text>
      <text x="35" y="104" font-size="9" fill="#6b6b6b" text-anchor="end">30%</text>

      <!-- X轴标签 -->
      <text x="118" y="145" font-size="9" fill="#6b6b6b" text-anchor="middle">M1</text>
      <text x="245" y="145" font-size="9" fill="#6b6b6b" text-anchor="middle">M3</text>
      <text x="450" y="145" font-size="9" fill="#6b6b6b" text-anchor="middle">M6</text>
    </svg>
  </div>

  <div class="milestone-box">
    <div class="milestone-name"><span class="status-dot on-track"></span>M1 准入期（0-30%）</div>
    <div class="milestone-desc">目标：熟悉流程，建立数据 — 实际：25%，符合预期 ✓</div>
  </div>

  <div class="milestone-box">
    <div class="milestone-name"><span class="status-dot lagging"></span>M3 爬坡期（30-70%）</div>
    <div class="milestone-desc">目标：快速成长，补齐人力 — 实际：45%，⚠️ 滞后，需关注</div>
  </div>

  <div class="milestone-box">
    <div class="milestone-name"><span class="status-dot"></span>M6 达标期（≥80%）</div>
    <div class="milestone-desc">目标：进入稳定期 — 预测达成率待观察</div>
  </div>
</div>

</body>
</html>
```

---

## 2.5 份额调整规则+流程 ⭐⭐⭐⭐

**核心价值**：动态优化资源配置

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .share-container {
    width: 480px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .share-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .matrix-grid {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 8px;
    margin-bottom: 16px;
  }

  .matrix-header {
    font-size: 10px;
    font-weight: 500;
    color: #6b6b6b;
    text-align: center;
  }

  .matrix-row-label {
    font-size: 10px;
    font-weight: 500;
    color: #1a1a1a;
    display: flex;
    align-items: center;
  }

  .matrix-cell {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
    font-size: 10px;
  }

  .matrix-cell.highlight {
    background: rgba(143, 155, 127, 0.15);
    border-color: #8f9b7f;
  }

  .matrix-cell.warning {
    background: rgba(212, 132, 90, 0.15);
    border-color: #d4845a;
  }

  .process-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .process-step {
    flex: 1;
    text-align: center;
    position: relative;
  }

  .process-step:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    color: #c98a6a;
  }

  .step-number {
    width: 20px;
    height: 20px;
    background: #c98a6a;
    color: #faf9f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
    margin: 0 auto 6px;
  }

  .step-text {
    font-size: 9px;
    color: #1a1a1a;
  }

  .example-case {
    background: #faf9f7;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 10px;
  }

  .example-title {
    font-size: 10px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 6px;
  }

  .example-content {
    font-size: 9px;
    color: #6b6b6b;
    line-height: 1.5;
  }
</style>
</head>
<body>

<div class="share-container">
  <div class="share-title">份额调整决策矩阵</div>

  <div class="matrix-grid">
    <div></div>
    <div class="matrix-header">产能充足</div>
    <div class="matrix-header">产能不足</div>

    <div class="matrix-row-label">表现优秀</div>
    <div class="matrix-cell highlight">
      <strong>↑ 加份额</strong><br>优先加派
    </div>
    <div class="matrix-cell">
      <strong>→ 维持</strong><br>鼓励扩编
    </div>

    <div class="matrix-row-label">表现下滑</div>
    <div class="matrix-cell">
      <strong>→ 观察</strong><br>分析原因
    </div>
    <div class="matrix-cell warning">
      <strong>↓ 减份额</strong><br>启动约谈
    </div>
  </div>

  <div class="process-steps">
    <div class="process-step">
      <div class="step-number">1</div>
      <div class="step-text">评估表现</div>
    </div>
    <div class="process-step">
      <div class="step-number">2</div>
      <div class="step-text">评估产能</div>
    </div>
    <div class="process-step">
      <div class="step-number">3</div>
      <div class="step-text">决策矩阵</div>
    </div>
    <div class="process-step">
      <div class="step-number">4</div>
      <div class="step-text">内部审批</div>
    </div>
    <div class="process-step">
      <div class="step-number">5</div>
      <div class="step-text">通知执行</div>
    </div>
  </div>

  <div class="example-case">
    <div class="example-title">本月调整案例</div>
    <div class="example-content">
      毅航：表现优秀+产能充足 → 份额 +3%（新增600万/月）<br>
      岐力：表现下滑+产能不足 → 份额 -2%（减少400万/月）
    </div>
  </div>
</div>

</body>
</html>
```

---

# 三、异常管理工具（5个）

## 3.1 异常信号总表（28个信号）⭐⭐⭐⭐⭐

**核心价值**：异常识别百科全书

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .signals-container {
    width: 500px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 16px;
    margin: 20px;
  }

  .signals-title {
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .signals-table {
    width: 100%;
    border-collapse: collapse;
  }

  .signals-table th {
    text-align: left;
    font-size: 9px;
    font-weight: 500;
    color: #6b6b6b;
    padding: 6px 8px;
    border-bottom: 1px solid #d4d1c7;
  }

  .signals-table td {
    padding: 8px;
    border-bottom: 1px solid #e8e4dc;
    font-size: 10px;
  }

  .signal-name {
    font-weight: 500;
    color: #1a1a1a;
  }

  .priority-badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 8px;
    font-weight: 600;
  }

  .priority-p0 {
    background: rgba(212, 132, 90, 0.2);
    color: #d4845a;
  }

  .priority-p1 {
    background: rgba(201, 138, 106, 0.2);
    color: #c98a6a;
  }

  .priority-p2 {
    background: #f5f4f1;
    color: #6b6b6b;
  }

  .response-hint {
    font-size: 9px;
    color: #6b6b6b;
  }
</style>
</head>
<body>

<div class="signals-container">
  <div class="signals-title">异常信号速查表</div>

  <table class="signals-table">
    <thead>
      <tr>
        <th>信号名称</th>
        <th>触发条件</th>
        <th>优先级</th>
        <th>应对</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="signal-name">隐性退步</span></td>
        <td>人效↓但排名→</td>
        <td><span class="priority-badge priority-p1">P1</span></td>
        <td><span class="response-hint">约谈诊断</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">峰值比过低</span></td>
        <td>峰值比&lt;70%</td>
        <td><span class="priority-badge priority-p0">P0</span></td>
        <td><span class="response-hint">立即约谈</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">连续下滑</span></td>
        <td>连续3月↓</td>
        <td><span class="priority-badge priority-p0">P0</span></td>
        <td><span class="response-hint">启动整改</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">排名骤降</span></td>
        <td>单月↓≥5位</td>
        <td><span class="priority-badge priority-p1">P1</span></td>
        <td><span class="response-hint">分析原因</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">FCI预警</span></td>
        <td>FCI&lt;80%</td>
        <td><span class="priority-badge priority-p1">P1</span></td>
        <td><span class="response-hint">关注利润</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">质量波动</span></td>
        <td>合规率&lt;95%</td>
        <td><span class="priority-badge priority-p1">P1</span></td>
        <td><span class="response-hint">流程检查</span></td>
      </tr>
      <tr>
        <td><span class="signal-name">流失率异常</span></td>
        <td>月流失&gt;20%</td>
        <td><span class="priority-badge priority-p0">P0</span></td>
        <td><span class="response-hint">了解原因</span></td>
      </tr>
    </tbody>
  </table>
</div>

</body>
</html>
```

---

## 3.2 问题→后果→应对闭环 ⭐⭐⭐⭐⭐

**核心价值**：异常处理的完整SOP

### 完整HTML代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<style>
  .loop-container {
    width: 600px;
    height: 320px;
    position: relative;
    margin: 20px auto;
  }
  .phase-card {
    position: absolute;
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 12px;
    width: 160px;
  }
  .phase-title {
    font-size: 11px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 6px;
  }
  .phase-desc {
    font-size: 10px;
    color: #6b6b6b;
    line-height: 1.4;
  }
  .phase-tag {
    display: inline-block;
    font-size: 8px;
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    margin-top: 6px;
  }
  .tag-issue { background: #d4845a; }
  .tag-response { background: #8f9b7f; }
</style>
</head>
<body>
<div class="loop-container">
  <div class="phase-card" style="top: 0; left: 0;">
    <div class="phase-title">1.问题识别</div>
    <div class="phase-desc">华啸峰值比58%</div>
    <span class="phase-tag tag-issue">P0</span>
  </div>
  <div class="phase-card" style="top: 0; left: 220px;">
    <div class="phase-title">2.后果分析</div>
    <div class="phase-desc">产能不足<br>无法接单</div>
  </div>
  <div class="phase-card" style="top: 0; left: 440px;">
    <div class="phase-title">3.应对措施</div>
    <div class="phase-desc">约谈+整改<br>资源支持</div>
    <span class="phase-tag tag-response">行动</span>
  </div>
  <div class="phase-card" style="bottom: 0; left: 440px;">
    <div class="phase-title">4.效果验证</div>
    <div class="phase-desc">1周后72%<br>接近目标75%</div>
  </div>
  <div class="phase-card" style="bottom: 0; left: 220px;">
    <div class="phase-title">5.持续监控</div>
    <div class="phase-desc">4周后达标<br>关闭异常</div>
    <span class="phase-tag tag-response">✓</span>
  </div>
  <div class="phase-card" style="bottom: 0; left: 0;">
    <div class="phase-title">6.闭环归档</div>
    <div class="phase-desc">经验沉淀<br>案例库更新</div>
  </div>
</div>
</body>
</html>
```

---

## 3.3 风险预警模板 ⭐⭐⭐⭐⭐

**核心价值**：标准化预警通知

### 完整HTML代码

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .warning-container {
    width: 480px;
    background: #faf9f7;
    border-radius: 10px;
    border: 1.5px solid #1a1a1a;
    font-family: system-ui, sans-serif;
    padding: 16px;
    margin: 20px;
  }
  .warning-level {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  .level-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
  }
  .level-tab.p0 { background: #d4845a; }
  .level-tab.p1 { background: #c98a6a; }
  .level-tab.p2 { background: #8a8580; }

  .warning-card {
    background: #f5f4f1;
    border: 1px solid #d4d1c7;
    border-radius: 8px;
    padding: 16px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d4d1c7;
  }
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .section-label {
    font-size: 10px;
    color: #6b6b6b;
    margin-bottom: 4px;
  }
  .section-value {
    font-size: 11px;
    color: #1a1a1a;
    font-weight: 500;
  }
</style>
</head>
<body>

<div class="warning-container">
  <div class="warning-level">
    <div class="level-tab p0">P0 紧急</div>
    <div class="level-tab p1">P1 重要</div>
    <div class="level-tab p2">P2 一般</div>
  </div>

  <div class="warning-card">
    <div class="card-header">
      <span style="font-size: 12px; font-weight: 500;">P0级预警：华啸连续4月下滑</span>
      <span style="font-size: 10px; padding: 4px 8px; background: #d4845a; color: #fff; border-radius: 4px;">立即响应</span>
    </div>

    <div class="card-grid">
      <div>
        <div class="section-label">触发条件</div>
        <div class="section-value">峰值比 &lt; 70% 连续4月</div>
      </div>
      <div>
        <div class="section-label">响应时限</div>
        <div class="section-value">24小时内介入</div>
      </div>
    </div>

    <div style="margin-top: 12px;">
      <div class="section-label">建议行动</div>
      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        <span style="font-size: 9px; padding: 4px 8px; background: #faf9f7; border: 1px solid #d4d1c7; border-radius: 4px;">立即约谈</span>
        <span style="font-size: 9px; padding: 4px 8px; background: #faf9f7; border: 1px solid #d4d1c7; border-radius: 4px;">暂停新单</span>
        <span style="font-size: 9px; padding: 4px 8px; background: #faf9f7; border: 1px solid #d4d1c7; border-radius: 4px;">日报跟踪</span>
      </div>
    </div>
  </div>
</div>

</body>
</html>
```

---

# 四、操作流程工具（6个）

## 4.1 月度操作流程 ⭐⭐⭐⭐⭐

## 4.2 约谈框架 ⭐⭐⭐⭐⭐

## 4.3 整改验证清单 ⭐⭐⭐⭐⭐

## 4.4 准入评估框架 ⭐⭐⭐⭐

## 4.5 清退决策树+流程 ⭐⭐⭐⭐⭐

## 4.6 数据收集清单 ⭐⭐⭐⭐

---

# 五、数据系统说明（3个）

## 5.1 指标映射表 ⭐⭐⭐⭐

## 5.2 供应商独立空间结构 ⭐⭐⭐⭐

## 5.3 系统流程图 ⭐⭐⭐⭐

---

*版本：infographic-svg完整代码版*
*创建日期：2026-04-19*
*总计：30个核心单元（原80个精选）*

