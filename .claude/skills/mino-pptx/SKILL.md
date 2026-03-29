---
name: mino-pptx
description: "年老师专属 PPTX 技能 — 创建、编辑、读取 PowerPoint 演示文稿。支持 4 种设计模式、5 种幻灯片类型、完整工作流。触发词：PPT、PPTX、演示文稿、幻灯片、汇报材料。"
license: MIT
metadata:
  version: "2.1"
  category: productivity
---

# Mino PPTX

> 年老师专属 PPTX 技能 — 创建、编辑、读取 PowerPoint 演示文稿

---

## 核心理念

1. **设计规范先行** — 执行任务前必须读取 `myagents_files/DESIGN_SYSTEM.md`
2. **四种设计模式** — 品牌模式、数据模式、演示模式、咨询模式
3. **质量优先** — QA 流程必须执行，直到零问题
4. **结论性标题** — 标题必须通过 "So What?" 测试

---

## Phase 0: 读取设计规范

**执行 PPT 任务前，必须先读取**：`myagents_files/DESIGN_SYSTEM.md`

**设计模式选择**：

| 场景 | 设计模式 |
|------|---------|
| 演示文稿 / 汇报 / 方案 | 演示模式（驼色 #C4B5A3）|
| 数据仪表盘 / 报表 | 数据模式（黑白灰 + 陶土点缀）|
| 战略报告 / 分析文档 | 咨询模式（极简克制）|
| 品牌展示 / 产品介绍 | 品牌模式（陶土色 #E2725B）|

---

## Phase 1: 内容发现

通过 AskUserQuestion 询问：

**Question 1: Purpose**
- "这个演示文稿的目的是什么？"
- 选项：内部汇报 / 对外提案 / 数据报告 / 品牌展示

**Question 2: Content**
- "内容准备好了吗？"
- 选项：内容已准备 / 有大纲 / 只有主题

---

## Phase 2: 设计选择

### Step 2.1: 选择设计模式

**四种核心模式**：

| 模式 | 主色调 | 适用场景 | 风格特点 |
|------|--------|---------|---------|
| **品牌模式** | 陶土 #E2725B | 品牌展示、产品介绍 | 手绘风、温暖、有机 |
| **数据模式** | 黑白灰 + 陶土点缀 | 数据仪表盘、报表 | 极简、精确、克制 |
| **演示模式** | 驼色 #C4B5A3 | 演示文稿、汇报 | 专业、平衡、清晰 |
| **咨询模式** | 深灰 #333 + 红 #B85450 | 战略报告、分析 | 克制、结论驱动 |

**品牌模式详细配置**：

```javascript
const theme = {
  primary: "3D2C29",    // Charcoal - 标题
  secondary: "8A8683",  // Grey Dark - 正文
  accent: "E2725B",     // Terracotta - 强调
  light: "E8E4E1",      // Grey Light - 背景
  bg: "F5F1EE"          // Cream - 背景
};
```

**质量提升技巧**：

1. **卡片阴影** — 双层偏移 + 灰色填充
   ```javascript
   // 阴影层
   slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
     x: x + 0.04, y: y + 0.04, w: w, h: h,
     fill: { color: "E8E4E1" },  // 浅灰
     line: { width: 0 },
     rectRadius: 0.08
   });
   // 主体层
   slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
     x: x, y: y, w: w, h: h,
     fill: { color: "FFFFFF" },
     line: { color: theme.light, width: 1 },
     rectRadius: 0.08
   });
   ```

2. **强调条** — 左侧色条突出层级
   ```javascript
   slide.addShape(pres.shapes.RECTANGLE, {
     x: x, y: y, w: 0.05, h: h,
     fill: { color: theme.accent },
     line: { width: 0 }
   });
   ```

3. **序号排版** — 大号 Georgia 字体 + accent 色
   ```javascript
   slide.addText('01', {
     x: 0.5, y: 0.3, w: 0.8, h: 0.6,
     fontSize: 36, fontFace: "Georgia",
     color: theme.accent, bold: true
   });
   ```

4. **视觉装饰** — 背景圆、虚线、点缀
   ```javascript
   // 装饰圆
   slide.addShape(pres.shapes.OVAL, {
     x: -1, y: -1, w: 3, h: 3,
     fill: { color: theme.light },
     line: { width: 0 }
   });
   // 虚线
   slide.addShape(pres.shapes.LINE, {
     x: 3.5, y: 1.5, w: 3, h: 0,
     line: { color: theme.accent, width: 2, dashType: "dash" }
   });
   ```

### Step 2.2: 选择色彩方案

详见 `references/design-system.md` 的 18 种色彩方案

### Step 2.3: 选择风格配方

| 风格 | 圆角 | 适用场景 |
|------|------|---------|
| Sharp | 0 ~ 0.05" | 数据报表 |
| Soft | 0.08" ~ 0.12" | 企业汇报 |
| Rounded | 0.15" ~ 0.25" | 产品介绍 |
| Pill | 0.3" ~ 0.5" | 品牌展示 |

---

## Phase 3: 规划幻灯片

### Step 3.1: 分类幻灯片类型

每一页幻灯片必须属于以下 **5 种类型之一**：

| 类型 | 用途 | 详见 |
|------|------|------|
| Cover | 开场、定调 | `references/slide-types.md` |
| TOC | 导航、预期 | `references/slide-types.md` |
| Section Divider | 过渡、分割 | `references/slide-types.md` |
| Content | 主体内容 | `references/slide-types.md` |
| Summary | 收尾、行动 | `references/slide-types.md` |

### Step 3.2: 规划布局

确保布局多样性 — 不要连续使用相同布局。

---

## Phase 4: 生成 PPTX

### Step 4.1: 创建幻灯片文件

每张幻灯片一个 JS 文件：

```
slides/
├── slide-01.js
├── slide-02.js
├── ...
├── imgs/
└── output/
    └── presentation.pptx
```

### Step 4.2: 幻灯片输出格式

```javascript
// slide-01.js
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '演示标题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText(slideConfig.title, {
    x: 0.5, y: 2, w: 9, h: 1.2,
    fontSize: 48, fontFace: "Arial",
    color: theme.primary, bold: true, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
```

### Step 4.3: SVG 图标处理（推荐）

**问题**：PptxGenJS 不支持直接嵌入 SVG，用 `addShape` 模拟的图标质量远不如原生 SVG。

**解决方案**：使用 Sharp 将 SVG 栅格化为高清 PNG 后嵌入。

```javascript
const sharp = require('sharp');
const fs = require('fs');

async function svgToPng(svgString, filename, scale = 2) {
  // scale=2 表示 2x 分辨率，保证清晰度
  const width = 100 * scale;  // 根据实际 SVG 尺寸调整
  const height = 100 * scale;

  await sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toFile(filename);

  return filename;
}

// 使用示例
const iconSvg = `<svg viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#E2725B" stroke="#3D2C29" stroke-width="2"/>
</svg>`;

await svgToPng(iconSvg, 'slides/imgs/icon-circle.png', 3);

// 在幻灯片中引用
slide.addImage({
  path: 'slides/imgs/icon-circle.png',
  x: 1, y: 1, w: 1, h: 1
});
```

**推荐工作流**：
1. 在 HTML 中设计 SVG 图标（可直接预览效果）
2. 提取 SVG 代码，用 Sharp 栅格化为 PNG（3x 缩放）
3. 在 PptxGenJS 中用 `addImage` 嵌入 PNG

**详细参考**：`references/svg-to-png.md`

### Step 4.4: 编译最终 PPTX

```javascript
// compile.js
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';

const theme = {
  primary: "22223b",
  secondary: "4a4e69",
  accent: "9a8c98",
  light: "c9ada7",
  bg: "f2e9e4"
};

for (let i = 1; i <= N; i++) {
  const num = String(i).padStart(2, '0');
  const slideModule = require(`./slide-${num}.js`);
  slideModule.createSlide(pres, theme);
}

pres.writeFile({ fileName: './output/presentation.pptx' });
```

### Theme Object Contract（必须遵守）

| Key | Purpose |
|-----|---------|
| `theme.primary` | 最深色，标题 |
| `theme.secondary` | 次深色，正文 |
| `theme.accent` | 中间色，强调 |
| `theme.light` | 浅色，背景点缀 |
| `theme.bg` | 背景色 |

---

## Phase 5: QA（必须执行）

### Step 5.1: 代码级 QA（自动执行）

编译时自动检查以下规则：

**封面页检查**：
| 检查项 | 说明 |
|--------|------|
| 封面有视觉元素 | 装饰圆、线条、图案至少一项 |
| 标题有层次 | 主标题 + 副标题 + 可能的标签 |
| 使用强调色 | 关键词用 accent 颜色突出 |

**内容页检查**：
| 检查项 | 说明 |
|--------|------|
| 卡片有阴影层 | 双层偏移（+0.03~0.06 英寸）|
| 卡片有强调条 | 左侧 0.05 英寸宽的 accent 条 |
| 使用 PNG 图标 | 禁止用 addShape 模拟复杂图标 |

**全局检查**：
| 检查项 | 说明 |
|--------|------|
| 每页有页码徽章 | 位置固定 (x: 9.3", y: 5.1") |
| 边距 >= 0.5 英寸 | 安全边距，防止裁切 |
| 字体一致 | 中文 Microsoft YaHei，英文 Georgia/Arial |
| 颜色用 theme 对象 | 禁止硬编码颜色值 |

### Step 5.2: 视觉 QA（人工检查）

```bash
python -m markitdown output.pptx
```

检查：缺失内容、错别字、顺序错误

### Step 5.2: 视觉 QA

**使用 Subagent 进行视觉检查**：

```bash
# 转换为图片
python scripts/office/soffice.py --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

**视觉检查要点**：
- 元素重叠
- 文字溢出
- 间距不均匀
- 边距不足 (< 0.5")
- 对比度不足
- 占位符残留

### Step 5.3: 验证循环

1. 生成 → 检查 → 列出问题
2. 修复问题
3. 重新验证受影响的幻灯片
4. 重复直到零问题

**必须完成至少一次修复-验证循环才能宣布完成。**

---

## Reference Files

| File | Contents |
|------|----------|
| [slide-types.md](references/slide-types.md) | 5 种幻灯片类型详细规范 |
| [design-system.md](references/design-system.md) | 18 种色彩方案、字体配对、风格配方 |
| [svg-to-png.md](references/svg-to-png.md) | SVG 栅格化工作流、手绘图标处理 |
| [editing.md](references/editing.md) | 模板编辑工作流、XML 操作 |
| [pitfalls.md](references/pitfalls.md) | QA 流程、常见错误 |
| [pptxgenjs.md](references/pptxgenjs.md) | PptxGenJS API 参考 |
| **extended-design.md** | **MiniMax 精华版 — 配色/风格/布局速查** |

---

## Quick Reference

| Item | Value |
|------|-------|
| **Dimensions** | 10" x 5.625" (LAYOUT_16x9) |
| **Colors** | 6-char hex without # |
| **Chinese font** | Microsoft YaHei |
| **English font** | Arial / Georgia |
| **Page badge** | x: 9.3", y: 5.1" |

---

## Dependencies

- `pip install "markitdown[pptx]"` — 文本提取
- `npm install -g pptxgenjs` — 从头创建
- LibreOffice (`soffice`) — PDF 转换
- Poppler (`pdftoppm`) — PDF 转图片

---

*版本：v2.0*
*更新：2026-03-23 — 对齐 mino-frontend 流程结构，整合设计规范*