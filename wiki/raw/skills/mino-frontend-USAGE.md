# 手绘图标库使用说明

> 品牌模式专用图标库 — 100个供应商管理场景图标

---

## 快速开始

### 1. 预览图标

打开 `icon-preview.html` 查看所有图标效果。

### 2. 生成图标

```bash
# 进入技能目录
cd .claude/skills/mino-frontend/assets

# 生成全部100个图标（需要 Quiver API Key）
node generate-icons.js --all

# 生成指定分类
node generate-icons.js --category 供应商管理
node generate-icons.js --category 业务运营
node generate-icons.js --category 数据分析
node generate-icons.js --category 沟通协作
node generate-icons.js --category 文档管理
node generate-icons.js --category 状态标识

# 生成指定图标
node generate-icons.js --icons 准入,评估,合同
```

### 3. 使用图标

生成的 SVG 文件存放在 `icons/` 目录，可直接复制使用：

```html
<!-- 方法1：直接内嵌 -->
<svg viewBox="0 0 48 48">
  <path class="hand-drawn" d="..."/>
</svg>

<!-- 方法2：引用文件 -->
<img src="icons/onboarding.svg" width="48" height="48">

<!-- 方法3：CSS 背景图 -->
<style>
.icon {
  background-image: url('icons/onboarding.svg');
  background-size: contain;
  width: 48px;
  height: 48px;
}
</style>
```

---

## 图标分类

| 分类 | 数量 | 示例 |
|------|------|------|
| 供应商管理 | 20 | 准入、评估、清退、谈判、合同、风险、合规... |
| 业务运营 | 25 | 产能、质量、效率、成本、人力、培训... |
| 数据分析 | 20 | KPI、排名、趋势、预警、仪表盘、洞察... |
| 沟通协作 | 15 | 会议、汇报、反馈、决策、复盘... |
| 文档管理 | 10 | 制度、流程、清单、模板... |
| 状态标识 | 10 | 进行中、已完成、待处理、延期、重点... |

---

## 手绘风格规范

### CSS 基础类

```css
/* 手绘线条风格 */
.hand-drawn {
  fill: none;
  stroke: #3D2C29;           /* Charcoal */
  stroke-width: 2.5;
  stroke-linecap: round;     /* 圆角端点 */
  stroke-linejoin: round;    /* 圆角转角 */
}

/* 手绘填充风格 */
.hand-drawn-fill {
  fill: #E2725B;             /* Terracotta */
  stroke: none;
}
```

### 使用示例

```html
<!-- 纯线条图标 -->
<svg viewBox="0 0 48 48">
  <circle class="hand-drawn" cx="24" cy="24" r="18"/>
</svg>

<!-- 带填充的图标 -->
<svg viewBox="0 0 48 48">
  <circle class="hand-drawn-fill" cx="24" cy="24" r="18"/>
  <circle class="hand-drawn" cx="24" cy="24" r="18"/>
</svg>
```

### 颜色变量

```css
:root {
  /* 主色调 */
  --terracotta: #E2725B;      /* 陶土色 - 填充 */
  --charcoal: #3D2C29;        /* 炭灰色 - 线条 */

  /* 可选 */
  --terracotta-deep: #CA6641; /* 深陶土色 */
  --sage: #8BA87A;            /* 鼠尾草绿 */
}
```

---

## 扩展图标

### 方法1：手动创建

参考 `icon-preview.html` 中的示例，遵循手绘风格规范：

1. 使用 `stroke-linecap: round` 和 `stroke-linejoin: round`
2. 线条粗细 2-3px
3. 48x48 viewBox
4. 填充用 Terracotta，线条用 Charcoal

### 方法2：使用 Quiver API

```javascript
const response = await fetch('https://api.quiver.ai/v1/svgs/generations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'arrow-preview',
    prompt: 'A hand-drawn icon of [你的描述]',
    instructions: 'Hand-drawn aesthetic, organic imperfect lines, warm and friendly. Use rounded line caps and joins. Line width 2-3px. Color: #3D2C29 for strokes, #E2725B for fills.',
  }),
});
const { data } = await response.json();
// data[0].svg 包含 SVG 字符串
```

### 方法3：调用 hand-drawn-svg 技能

```
/hand-drawn-svg 画一个手绘风格的[描述]
```

---

## 文件结构

```
assets/
├── icons-vocabulary.md    # 词汇库定义
├── generate-icons.js      # 生成脚本
├── icon-preview.html      # 预览页面
├── USAGE.md               # 本文件
└── icons/                 # 生成的图标文件
    ├── onboarding.svg
    ├── evaluation.svg
    ├── ...
    └── index.json         # 图标索引
```

---

## 常见问题

### Q: 图标生成失败？

检查：
1. Quiver API Key 是否正确
2. 网络连接是否正常
3. API 是否有速率限制

### Q: 如何批量下载？

在 `icon-preview.html` 中点击"下载SVG"按钮。

### Q: 如何自定义颜色？

修改 CSS 变量：

```css
:root {
  --terracotta: YOUR_COLOR;
  --charcoal: YOUR_COLOR;
}
```

或在 SVG 中直接修改 `stroke` 和 `fill` 属性。

---

*创建时间：2026-03-23*
*版本：v1.0*