# pattern-ui-mockup — UI mockup / 仪表盘 / 卡片 / 表单

> 适用于：拟真界面展示、仪表盘原型、卡片布局、表单交互演示。

---

## 页面结构

```
<header>          标题 + 导航栏（模拟）
<section.hero>    核心仪表盘区域
<section.grid>    卡片/表单网格
<section.detail>  展开详情
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${标题}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <nav class="mock-nav"><!-- 模拟导航栏 --></nav>
  <header class="mock-header">
    <h1>${仪表盘标题}</h1>
  </header>

  <section class="dashboard-grid">
    <!-- 度量卡片 ×N -->
    <!-- 图表区 -->
  </section>

  <section class="card-grid">
    <!-- UI 卡片 / 表单 -->
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
.mock-nav {
  background: var(--paper);
  border-bottom: 1px solid var(--g200);
  padding: 10px 24px;
  display: flex; align-items: center; gap: 16px;
}
.mock-nav-logo {
  font-weight: 800; font-size: 1.1em; color: var(--clay);
}
.mock-nav-link {
  font-size: 0.85em; color: var(--g500);
  text-decoration: none; cursor: pointer;
}
.mock-nav-link:hover { color: var(--slate); }

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px; padding: 24px;
  max-width: 960px; margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; padding: 0 24px 24px;
  max-width: 960px; margin: 0 auto;
}
```

---

## 组件配方

### Gauge / Semicircle Meter

半圆仪表盘：SVG arc + 指针线 + 中心值 + 底部刻度。

```html
<svg width="320" height="190" viewBox="0 0 320 190">
  <!-- 背景弧 -->
  <path d="M 30 170 A 130 130 0 0 1 290 170" fill="none" stroke="var(--g100)" stroke-width="18" stroke-linecap="round"/>
  <!-- 填充弧（根据值调整终点） -->
  <path d="M 30 170 A 130 130 0 0 1 270 82" fill="none" stroke="var(--clay)" stroke-width="18" stroke-linecap="round"/>
  <line x1="160" y1="170" x2="256" y2="92" stroke="var(--slate)" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="160" cy="170" r="7" fill="var(--slate)"/>
  <text x="160" y="152" text-anchor="middle" fill="var(--slate)" font-size="44" font-weight="800">76</text>
  <text x="30" y="188" fill="var(--g500)" font-size="12">0</text>
  <text x="290" y="188" fill="var(--g500)" font-size="12">100</text>
</svg>
```

### Chat Bubbles

对话气泡：用户左对齐，agent 右对齐，不同背景色。

```css
.chat-bubble {
  background: var(--g100); border: 1px solid var(--g200);
  border-radius: 16px 16px 16px 4px; padding: 14px 18px;
  margin: 6px 0; max-width: 75%;
}
.chat-bubble.agent {
  background: rgba(217, 119, 87, 0.08); border-color: rgba(217, 119, 87, 0.2);
  border-radius: 16px 16px 4px 16px; margin-left: auto;
}
.chat-meta { font-size: 0.65em; color: var(--g500); margin-bottom: 4px; }
.chat-bubble.agent .chat-meta { color: var(--clay); text-align: right; }
```

### Terminal & Browser Mockups

终端模拟：顶部三色圆点 + URL/路径栏 + 等宽内容。
浏览器模拟：同终端顶部 + URL 输入框 + 内容区。

```css
.terminal, .browser {
  background: var(--g100); border: 1px solid var(--g200);
  border-radius: 12px; overflow: hidden;
}
.terminal-bar, .browser-bar {
  background: var(--g100); padding: 8px 14px;
  display: flex; gap: 6px; align-items: center;
}
.terminal-dot { width: 10px; height: 10px; border-radius: 50%; }
.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #febc2e; }
.terminal-dot.green { background: #28c840; }
.browser-url {
  background: var(--paper); border: 1px solid var(--g200);
  border-radius: 6px; padding: 4px 12px; color: var(--g500);
  font-size: 0.75em; flex: 1; margin-left: 8px;
}
.terminal-body {
  padding: 16px 20px; font-family: var(--mono); font-size: 0.75em; line-height: 1.8;
}
```

### Glassmorphism Cards

毛玻璃卡片：半透明背景 + backdrop-filter blur + 细边框。

```css
.glass {
  background: rgba(217, 119, 87, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(217, 119, 87, 0.15);
  border-radius: 16px; padding: 24px;
}
```

---

## 设计约束

1. **模拟真实 UI** — 导航栏、按钮、表单元素必须有交互反馈
2. **版心 ≤ 960px** — 不铺满屏幕
3. **仪表盘卡片 ≤ 6 个** — 太多则分组或 Tab 切换
4. **终端/浏览器 mockup 只用于展示** — 不实现真正的编辑功能
5. **毛玻璃效果注意性能** — 大面积使用可能影响渲染

---

## 反模式

- 不引入真实前端框架 — 这是模拟，不是真实应用
- 不实现完整的 CRUD 逻辑 — 按钮有 hover 反馈即可
- 不使用毛玻璃作为主要布局手段 — 仅用于装饰卡片
