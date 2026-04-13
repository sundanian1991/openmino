# HTML Template — 经典杂志风格规范

> 生成 HTML 页面时，严格遵守以下规范。确保输出一致、美观、可读。

## 基本约束

- 单文件自包含（所有 CSS + JS 内联，无外部依赖）
- 纯 vanilla JS，无框架
- 文件大小控制在 200KB 以内
- 双击即可在浏览器中打开

## CSS 变量（必须使用）

```css
:root {
  --primary: #2563eb;
  --bg: #ffffff;
  --text-main: #333333;
  --text-heading: #111111;
  --text-light: #666666;
  --border: #e5e5e5;
  --card-bg: #ffffff;
  --hover-bg: #f9fafb;
}
```

## 字体

- 标题：`Georgia, 'Noto Serif SC', serif`
- 正文：`-apple-system, 'Noto Sans SC', 'PingFang SC', sans-serif`
- 不加载任何外部字体

## 字号规范

- h1（页面标题）：`3.2rem`（移动端 `2.4rem`）+ `letter-spacing: 1px`
- h2（章节标题）：`1.8rem`
- h3（卡片标题）：`1.15rem`
- 正文：`1rem`，`line-height: 1.75`
- 小字（meta 信息）：`0.85rem` - `0.95rem`

## 布局规范

- 主容器：`max-width: 900px`，`margin: 0 auto`，`padding: 0 1.5rem 4rem`
- 单列布局，垂直排列
- 卡片间距：`margin-bottom: 1.5rem`
- 章节间距：`margin-bottom: 3.5rem`
- 纯白背景 `#ffffff`（不是浅灰）

## 页面结构

```html
<body>
  <div class="container">
    <header class="page-header">
      <!-- h1 skill 名称 -->
      <!-- p.subtitle 一句话介绍 -->
      <!-- div.meta-row 基础指标 -->
    </header>

    <nav>
      <!-- Tab 按钮，sticky 定位 -->
    </nav>

    <!-- 每个 Tab 对应一个 section.tab -->
    <section class="tab active" data-tab="what">...</section>
    <section class="tab" data-tab="how">...</section>
    <section class="tab" data-tab="clever">...</section>
    <section class="tab" data-tab="hidden">...</section>
    <section class="tab" data-tab="build">...</section>
  </div>

  <script>
    // Tab 切换逻辑
  </script>
</body>
```

## 导航栏

- `position: sticky; top: 0`
- 白色背景，底部 1px 边框
- 按钮：无背景，底部 2px 透明边框
- 激活状态：蓝色文字 + 蓝色底边框
- 移动端可横向滚动

## 卡片样式

```css
.card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
```

带颜色标记的卡片（用于"如果你想造" Tab）：
- 可搬走用：左边框 `3px solid #16a34a`（绿）
- 别照搬：左边框 `3px solid #d97706`（橙）
- 可改进：左边框 `3px solid #2563eb`（蓝）
- 推荐对比：左边框 `3px solid #7c3aed`（紫）

## 流程步骤样式

- 左侧圆形编号（32px，2px 边框，圆角 50%）
- 高亮步骤：浅灰背景 + 蓝色编号边框
- 每步下方可选 `.note`：蓝色斜体小字，用于设计意图说明

## 隐性决策样式（"看不见的选择" Tab）

三栏结构：
- 上方两列并排：「作者选了」和「也可以选」（浅灰背景卡片）
- 下方一栏：「为什么选这个」（左侧蓝色 3px 边框 + 极浅蓝背景）

## 类比/洞察样式

- `.analogy`：蓝色斜体小字（用于生活类比）
- `.takeaway`：浅灰背景 + 左侧蓝色 3px 边框（用于总结性洞察）

## 对比演示页面额外结构

```html
<div class="compare-layout">
  <div class="compare-header">
    <!-- Skill A 名称 ←→ Skill B 名称 -->
    <!-- 维度切换 Tab -->
  </div>
  <div class="compare-body">
    <div class="panel-left">...</div>
    <div class="panel-right">...</div>
  </div>
  <div class="compare-insights">
    <!-- 差异洞察区 -->
  </div>
</div>
```

- 左右面板各占 50%
- 移动端变为上下堆叠
- 差异洞察区：底部独立区域，蓝色左边框

## JS 交互

```javascript
// Tab 切换（唯一需要的 JS）
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.tab[data-tab="${btn.dataset.tab}"]`).classList.add('active');
  });
});
```

## 禁止清单

- 无渐变背景
- 无 box-shadow 堆叠
- 无 hero section
- 无 Google Fonts 外部加载
- 无动画过渡（除 hover 时 color 变化）
- 无 emoji 作为装饰
- 无"卡片悬浮"效果
- 无深色主题

## 响应式断点

```css
@media (max-width: 768px) {
  .page-header h1 { font-size: 2.4rem; }
  .decision-row { flex-direction: column; }
  .compare-body { flex-direction: column; }
  /* nav 保持横向滚动 */
}
```
