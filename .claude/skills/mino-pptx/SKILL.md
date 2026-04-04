---
name: mino-pptx
description: "年老师专属 PPTX 技能 — 创建、编辑、读取 PowerPoint 演示文稿。支持 14 种设计模式、5 种幻灯片类型、完整工作流。触发词：PPT、PPTX、演示文稿、幻灯片、汇报材料。"
license: MIT
metadata:
  version: "3.0"
  category: productivity
---

# Mino PPTX

> 年老师专属 PPTX 技能 — 创建、编辑、读取 PowerPoint 演示文稿

---

## 核心理念

1. **设计规范先行** — 执行任务前必须读取 `myagents_files/DESIGN_SYSTEM.md`
2. **14 种设计模式** — 风格层决定气质，色彩方案层决定配色
3. **质量优先** — QA 流程必须执行，直到零问题
4. **结论性标题** — 标题必须通过 "So What?" 测试

---

## Phase 0: 读取设计规范

**执行 PPT 任务前，必须先读取**：`myagents_files/DESIGN_SYSTEM.md`

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

**14 种设计模式速查**：

| # | 设计模式 | 主色调 | 气质 | 适用场景 |
|---|---------|--------|------|---------|
| 1 | **克制专业主义** ⭐ | `#E2725B` 陶土 | 克制、专业、权威 | 问题诊断、事件分析 |
| 2 | **品牌模式** | `#E2725B` 陶土 | 人文温度 × 技术精度 | 品牌内容、产品介绍 |
| 3 | **数据模式** | 黑白灰 + 陶土点缀 | 冷峻理性 | 报告、极简数据 |
| 4 | **金融时报** | `#0d7680` 青绿 | K 线语言、信赖感 | 仪表盘、金融数据 |
| 5 | **咨询模式** | `#333` + `#B85450` | So What 结论 | 战略演示、分析报告 |
| 6 | **自信宣言** | `#D4AF37` 金 | 高对比、冲击力 | Pitch、主题演讲 |
| 7 | **现代工坊** | `#6366f1` 靛蓝 | 干净、专业 | Agency 演示 |
| 8 | **分类标签** | `#475569` 板岩灰 | 编辑本、整理感 | 评审文档 |
| 9 | **柔和几何** | 粉彩色系 | 几何友好 | 产品介绍 |
| 10 | **趣味拼接** | 高饱和对比 | 双色分割 | 创意 Agency |
| 11 | **复古报刊** | `#78716c` 暖棕 | 怀旧、个性 | 个人品牌 |
| 12 | **极简现代** | `#dc2626` 瑞士红 | 极简、精确 | 企业数据 |
| 13 | **纸墨文学** | `#1c1917` 墨黑 | 文学、沉思 | 故事叙述 |
| 14 | **Anthropic 品牌** | `#d97757` | 官方品牌、人文 | 对外展示 |

> ⭐ 年老师默认风格

---

### Step 2.2: 设计模式详细参数

#### 1. 克制专业主义 ⭐

| 维度 | 值 |
|------|-----|
| **主色调** | `#E2725B` 陶土（极少使用） |
| **气质** | 克制、专业、权威 |
| **适用场景** | 问题诊断、事件分析、内部汇报 |
| **推荐色彩方案** | design-system.md #18 Platinum / #2 Business |
| **字体配对** | system-ui / Arial |
| **圆角配方** | Sharp (0-0.05") |
| **标志性元素** | 3px 进度条 + 页码徽章 + 2.4px 陶土色顶部线 |
| **强调色用量** | 极少（进度条 + 焦点） |

```javascript
const theme = {
  primary: "111111",    // 标题
  secondary: "666666",  // 正文
  accent: "E2725B",     // 强调
  light: "E5E5E5",      // 边框
  bg: "FFFFFF"          // 背景
};
```

---

#### 2. 品牌模式

| 维度 | 值 |
|------|-----|
| **主色调** | `#E2725B` 陶土 |
| **气质** | 人文温度 × 技术精度 |
| **适用场景** | 品牌内容、产品介绍、对外展示 |
| **推荐色彩方案** | design-system.md #18 Platinum |
| **字体配对** | Cormorant Garamond（标题）+ DM Sans（正文） |
| **圆角配方** | Soft (0.08-0.12") |
| **标志性元素** | 手绘 SVG + 双层偏移边框 + 纸张纹理 |
| **强调色用量** | 中（点缀 + 图标填充） |

```javascript
const theme = {
  primary: "3D2C29",    // Charcoal - 标题
  secondary: "8A8683",  // Grey Dark - 正文
  accent: "E2725B",     // Terracotta - 强调
  light: "E8E4E1",      // Grey Light - 背景
  bg: "F5F1EE"          // Cream - 背景
};
```

---

#### 3. 数据模式

| 维度 | 值 |
|------|-----|
| **主色调** | 黑白灰 + `#E2725B` 点缀 |
| **气质** | 冷峻理性 |
| **适用场景** | 报告、极简数据、仪表盘 |
| **推荐色彩方案** | design-system.md #10 Education |
| **字体配对** | system-ui / Arial |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 2px 黑色表头线 + 条件格式 |
| **强调色用量** | 极少（1 处焦点） |

```javascript
const theme = {
  primary: "111111",    // 标题
  secondary: "666666",  // 正文
  accent: "E2725B",     // 强调
  light: "E5E5E5",      // 边框
  bg: "FFFFFF"          // 背景
};
```

---

#### 4. 金融时报

| 维度 | 值 |
|------|-----|
| **主色调** | `#0d7680` 青绿 |
| **气质** | K 线语言、信赖感 |
| **适用场景** | 仪表盘、金融数据、投资报告 |
| **推荐色彩方案** | design-system.md #15 Pure Tech Blue |
| **字体配对** | Georgia（标题）+ Helvetica（区块/大数字） |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 4px 青绿上边框 + 1px 间隙 KPI 网格 |
| **强调色用量** | 中（标题 + 品牌线） |

```javascript
const theme = {
  primary: "0d7680",    // 青绿
  secondary: "333333",  // 正文
  accent: "cc0000",     // 跌色
  light: "e0e0e0",      // 边框
  bg: "fff1e5"          // 金融时报背景
};
```

---

#### 5. 咨询模式

| 维度 | 值 |
|------|-----|
| **主色调** | `#333` + `#B85450` |
| **气质** | So What 结论驱动 |
| **适用场景** | 战略演示、分析报告、咨询报告 |
| **推荐色彩方案** | design-system.md #2 Business |
| **字体配对** | system-ui / Arial |
| **圆角配方** | Sharp (0") |
| **标志性元素** | So What 标题 + 面包屑导航 |
| **强调色用量** | 中（结论关键词） |

**So What 原则**：
- ❌ "2024年市场份额分布"
- ✅ "由于在低端市场渗透率不足，A公司市场份额已被B公司反超"

```javascript
const theme = {
  primary: "333333",    // 标题
  secondary: "666666",  // 正文
  accent: "B85450",     // 强调
  light: "D0D0D0",      // 边框
  bg: "F9F9F9"          // 背景
};
```

---

#### 6. 自信宣言

| 维度 | 值 |
|------|-----|
| **主色调** | `#D4AF37` 金 |
| **气质** | 高对比、冲击力 |
| **适用场景** | Pitch、主题演讲、发布会 |
| **推荐色彩方案** | design-system.md #18 Platinum |
| **字体配对** | system-ui bold / Arial |
| **圆角配方** | Pill (高度/2) |
| **标志性元素** | 巨大字号 + 黑底 + 金色分割线 |
| **强调色用量** | 低（金色点缀） |

```javascript
const theme = {
  primary: "FFFFFF",    // 标题（白底反白）
  secondary: "CCCCCC",  // 正文
  accent: "D4AF37",     // 金
  light: "333333",      // 边框
  bg: "000000"          // 黑底
};
```

---

#### 7. 现代工坊

| 维度 | 值 |
|------|-----|
| **主色调** | `#6366f1` 靛蓝 |
| **气质** | 干净、专业 |
| **适用场景** | Agency 演示、产品发布 |
| **推荐色彩方案** | design-system.md #7 Vibrant Tech |
| **字体配对** | Inter / Inter |
| **圆角配方** | Rounded (0.15-0.25") |
| **标志性元素** | 精确网格对齐 + 标签页导航 |
| **强调色用量** | 中（标题 + 按钮） |

```javascript
const theme = {
  primary: "1e1b4b",    // 深靛蓝
  secondary: "6366f1",  // 靛蓝
  accent: "f59e0b",     // 琥珀
  light: "e0e7ff",      // 浅靛蓝
  bg: "FFFFFF"          // 背景
};
```

---

#### 8. 分类标签

| 维度 | 值 |
|------|-----|
| **主色调** | `#475569` 板岩灰 |
| **气质** | 编辑本、整理感 |
| **适用场景** | 评审文档、分类整理 |
| **推荐色彩方案** | design-system.md #2 Business |
| **字体配对** | system-ui / Arial |
| **圆角配方** | Soft (0.05") |
| **标志性元素** | 标签页 + 分隔线 + 笔记本边距线 |
| **强调色用量** | 低（标签底色） |

```javascript
const theme = {
  primary: "1e293b",    // 深灰
  secondary: "475569",  // 板岩灰
  accent: "3b82f6",     // 蓝色标签
  light: "e2e8f0",      // 边框
  bg: "FFFFFF"          // 背景
};
```

---

#### 9. 柔和几何

| 维度 | 值 |
|------|-----|
| **主色调** | 粉彩色系 `#F8B4D9` |
| **气质** | 几何友好、柔和 |
| **适用场景** | 产品介绍、教育内容 |
| **推荐色彩方案** | design-system.md #5 Soft Creative |
| **字体配对** | Nunito / Nunito |
| **圆角配方** | Rounded (0.2") |
| **标志性元素** | 圆角色块 + 几何装饰图案 |
| **强调色用量** | 中（几何色块） |

```javascript
const theme = {
  primary: "4a5568",    // 深灰（文字）
  secondary: "718096",  // 正文灰
  accent: "F8B4D9",     // 粉色
  light: "FED7E2",      // 浅粉
  bg: "FFF8F0"          // 暖白
};
```

---

#### 10. 趣味拼接

| 维度 | 值 |
|------|-----|
| **主色调** | 高饱和对比 |
| **气质** | 双色分割、趣味 |
| **适用场景** | 创意 Agency、活动海报 |
| **推荐色彩方案** | design-system.md #17 Vibrant Orange Mint |
| **字体配对** | system-ui bold / system-ui |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 双色对角分割 + 粗边框 |
| **强调色用量** | 高（主视觉） |

```javascript
const theme = {
  primary: "FF6B6B",    // 珊瑚红
  secondary: "4ECDC4",  // 青绿
  accent: "FFE66D",     // 黄
  light: "F7FFF7",      // 浅色
  bg: "FFFFFF"          // 背景
};
```

---

#### 11. 复古报刊

| 维度 | 值 |
|------|-----|
| **主色调** | `#78716c` 暖棕 |
| **气质** | 怀旧、个性 |
| **适用场景** | 个人品牌、文化内容 |
| **推荐色彩方案** | design-system.md #8 Craft Artisan |
| **字体配对** | Playfair Display / system-ui |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 衬线标题 + 报纸分栏布局 |
| **强调色用量** | 低（复古棕） |

```javascript
const theme = {
  primary: "44403c",    // 深棕
  secondary: "78716c",  // 暖棕
  accent: "b45309",     // 琥珀
  light: "d6d3d1",      // 浅棕
  bg: "F5F0E8"          // 泛黄纸
};
```

---

#### 12. 极简现代

| 维度 | 值 |
|------|-----|
| **主色调** | `#dc2626` 瑞士红 |
| **气质** | 极简、精确 |
| **适用场景** | 企业数据、技术报告 |
| **推荐色彩方案** | design-system.md #2 Business |
| **字体配对** | Helvetica / Helvetica |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 红色细线 + 严格网格对齐 |
| **强调色用量** | 极少（1-2 处红线） |

```javascript
const theme = {
  primary: "171717",    // 黑
  secondary: "525252",  // 灰
  accent: "dc2626",     // 瑞士红
  light: "e5e5e5",      // 边框
  bg: "FFFFFF"          // 背景
};
```

---

#### 13. 纸墨文学

| 维度 | 值 |
|------|-----|
| **主色调** | `#1c1917` 墨黑 |
| **气质** | 文学、沉思 |
| **适用场景** | 故事叙述、深度内容 |
| **推荐色彩方案** | design-system.md #3 Nature |
| **字体配对** | Noto Serif SC / system-ui |
| **圆角配方** | Sharp (0") |
| **标志性元素** | 大面积留白 + 窄行宽单列 |
| **强调色用量** | 极少（墨色） |

```javascript
const theme = {
  primary: "1c1917",    // 墨黑
  secondary: "44403c",  // 深灰
  accent: "78716c",     // 暖灰
  light: "e7e5e4",      // 边框
  bg: "FAFAF8"          // 米白
};
```

---

#### 14. Anthropic 品牌

| 维度 | 值 |
|------|-----|
| **主色调** | `#d97757` |
| **气质** | 官方品牌、人文 |
| **适用场景** | 对外展示、品牌内容 |
| **推荐色彩方案** | design-system.md #18 Platinum |
| **字体配对** | Poppins（标题）+ Lora（正文） |
| **圆角配方** | Sharp (0") |
| **标志性元素** | Poppins 大标题 + Lora 正文 + 双字体对比 |
| **强调色用量** | 中（强调 + 按钮） |

```javascript
const theme = {
  primary: "141413",    // 深灰
  secondary: "b0aea5",  // 中灰
  accent: "d97757",     // 橙
  light: "e8e6dc",      // 浅灰
  bg: "faf9f5"          // 暖白
};
```

---

### Step 2.3: 选择色彩方案

设计模式选定后，可使用推荐色彩方案，或从 `references/design-system.md` 的 **18 种色彩方案**中选择。

**色彩方案速查**：

| # | 名称 | 主色 | 风格 | 适用场景 |
|---|------|------|------|---------|
| 1 | Modern & Wellness | `#006d77` | 清新舒缓 | 医疗、瑜伽、护肤 |
| 2 | Business & Authority | `#2b2d42` | 正式经典 | 年报、财务、政府 |
| 3 | Nature & Outdoors | `#606c38` | 质朴大地 | 户外、环保、农业 |
| 4 | Vintage & Academic | `#780000` | 经典学术 | 学术讲座、历史 |
| 5 | Soft & Creative | `#cdb4db` | 梦幻糖果 | 母婴、甜品、时尚 |
| 6 | Bohemian | `#ccd5ae` | 温柔哑光 | 婚礼、家居、有机 |
| 7 | Vibrant & Tech | `#8ecae6` | 高能运动 | 体育、健身房、创业 |
| 8 | Craft & Artisan | `#7f5539` | 质朴咖啡 | 咖啡、手工艺、烘焙 |
| 9 | Tech & Night | `#000814` | 深邃发光 | 科技发布、天文、夜经济 |
| 10 | Education & Charts | `#264653` | 清晰逻辑 | 统计报告、教育、市场分析 |
| 11 | Forest & Eco | `#dad7cd` | 单色渐变森林 | 景观设计、ESG、环保 |
| 12 | Elegant & Fashion | `#edafb8` | 莫兰迪调 | 高级时装、艺术画廊、美妆 |
| 13 | Art & Food | `#335c67` | 丰富复古海报 | 美食纪录片、艺术展览 |
| 14 | Luxury & Mysterious | `#22223b` | 冷紫调 | 珠宝、酒店、高端咨询 |
| 15 | Pure Tech Blue | `#03045e` | 未来洁净 | 云/AI、海洋、医院、清洁能源 |
| 16 | Coastal Coral | `#0081a7` | 清爽夏日 | 旅行、夏季活动、饮料品牌 |
| 17 | Vibrant Orange Mint | `#ff9f1c` | 明亮愉悦 | 儿童活动、促销海报、快消 |
| 18 | Platinum White Gold | `#0a0a0a` | 高端专业 | Agent 产品、企业网站、金融科技 |

---

### Step 2.4: 选择圆角配方

| 风格 | 圆角 | 适用场景 | 推荐设计模式 |
|------|------|---------|-------------|
| Sharp | 0 ~ 0.05" | 数据报表、专业报告 | 克制专业主义、数据模式、咨询模式、极简现代 |
| Soft | 0.08" ~ 0.12" | 企业汇报、产品介绍 | 品牌模式、分类标签 |
| Rounded | 0.15" ~ 0.25" | 产品介绍、营销内容 | 现代工坊、柔和几何 |
| Pill | 0.3" ~ 0.5" | 品牌展示、发布会 | 自信宣言 |

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
| **文字溢出检测** | 文本框内容是否超出边界（slides 方法论）|
| **字体兼容性检测** | 检查字体在目标系统是否存在（slides 方法论）|

**溢出修复策略**（来自 slides）：
1. 优先删冗余句，不盲目缩字号
2. 调整行高、间距
3. 字体不兼容时自动替换为安全字体

**原生图表检查**（来自 slides）：
| 检查项 | 要求 |
|--------|------|
| 图表类型 | 必须用 PptxGenJS addChart()，非图片嵌入 |
| 可编辑性 | 双击可修改数据 |
| 表格 | 必须用 addTable()，非图片嵌入 |

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

*版本：v3.0*
*更新：2026-03-31 — 扩展设计模式从 4 种到 14 种，对齐 mino-frontend 风格体系，新增色彩方案映射*