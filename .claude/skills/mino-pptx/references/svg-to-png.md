# SVG to PNG 工作流

> 使用 Sharp 或 macOS 内置工具将高质量 SVG 图标栅格化为 PNG，解决 PptxGenJS 不支持 SVG 的问题

---

## 问题背景

**PptxGenJS 的局限**：
- 不支持直接嵌入 SVG 代码
- 用 `addShape` 模拟的图标质量远不如原生 SVG
- 手绘风格、复杂路径无法用基本形状表达

**解决方案**：
- 方案 A：使用 Sharp（Node.js 库）栅格化
- 方案 B：使用 macOS 内置 `qlmanage` 或 `rsvg-convert`
- 在 PPTX 中用 `addImage` 嵌入 PNG

---

## 方案 A：Sharp（推荐跨平台）

### 1. 安装依赖

```bash
npm install sharp
```

### 2. 核心 API

```javascript
const sharp = require('sharp');

async function svgToPng(svgString, outputPath, options = {}) {
  const { scale = 2, width, height } = options;

  // 如果指定了 width/height，使用它们
  // 否则按 scale 放大
  const resizeOptions = width && height
    ? { width: width * scale, height: height * scale }
    : undefined;

  await sharp(Buffer.from(svgString))
    .resize(resizeOptions)
    .png()
    .toFile(outputPath);

  return outputPath;
}
```

### 3. 使用示例

```javascript
// 手绘风格圆形图标
const circleIcon = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="20"
          fill="#FEFFFA" stroke="#0B0800" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

await svgToPng(circleIcon, 'imgs/icon-circle.png', { scale: 3 });

// 在 PPTX 中使用
slide.addImage({
  path: 'imgs/icon-circle.png',
  x: 1, y: 1, w: 1, h: 1
});
```

---

## 手绘风格图标规范

### 风格特征

| 属性 | 规格 | 说明 |
|------|------|------|
| **线条风格** | 手绘感、有机 | 非机械完美，有呼吸感 |
| **线条粗细** | 2-3px (24dp网格) | 保持一致性 |
| **端点** | `stroke-linecap: round` | 柔和、亲和 |
| **转角** | `stroke-linejoin: round` | 避免锐角 |
| **填充色** | `#FEFFFA` (暖白) | 手绘纸张感 |
| **墨线色** | `#0B0800` (深墨) | 或品牌主色 |

### SVG 模板

```html
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 填充层 -->
  <path d="..." fill="#FEFFFA" stroke="none"/>
  <!-- 墨线层 -->
  <path d="..." fill="none" stroke="#0B0800" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## 图标库

### 人形图标 (Soul)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 头部填充 -->
  <circle cx="24" cy="14" r="8" fill="#FEFFFA"/>
  <!-- 头部墨线 -->
  <circle cx="24" cy="14" r="8" fill="none" stroke="#E2725B" stroke-width="2.5"
          stroke-linecap="round"/>
  <!-- 身体填充 -->
  <path d="M12 42 Q24 30 36 42 L36 46 L12 46 Z" fill="#FEFFFA"/>
  <!-- 身体墨线 -->
  <path d="M12 42 Q24 30 36 42" fill="none" stroke="#E2725B" stroke-width="2.5"
        stroke-linecap="round"/>
</svg>
```

### 书本图标 (Memory)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 左页填充 -->
  <path d="M4 8 L22 12 L22 40 L4 36 Z" fill="#FEFFFA"/>
  <!-- 左页墨线 -->
  <path d="M4 8 L22 12 L22 40 L4 36 Z" fill="none" stroke="#E2725B" stroke-width="2.5"
        stroke-linejoin="round"/>
  <!-- 右页填充 -->
  <path d="M44 8 L26 12 L26 40 L44 36 Z" fill="#FEFFFA"/>
  <!-- 右页墨线 -->
  <path d="M44 8 L26 12 L26 40 L44 36 Z" fill="none" stroke="#E2725B" stroke-width="2.5"
        stroke-linejoin="round"/>
  <!-- 横线 -->
  <line x1="10" y1="22" x2="18" y2="24" stroke="#E2725B" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="10" y1="28" x2="16" y2="29.5" stroke="#E2725B" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### 文档图标 (Skills)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 文档填充 -->
  <path d="M10 4 L30 4 L38 12 L38 44 L10 44 Z" fill="#FEFFFA"/>
  <!-- 文档墨线 -->
  <path d="M10 4 L30 4 L38 12 L38 44 L10 44 Z" fill="none" stroke="#E2725B" stroke-width="2.5"
        stroke-linejoin="round"/>
  <!-- 折角 -->
  <path d="M30 4 L30 12 L38 12" fill="none" stroke="#E2725B" stroke-width="2"
        stroke-linejoin="round"/>
  <!-- 文字线 -->
  <line x1="16" y1="20" x2="32" y2="20" stroke="#E2725B" stroke-width="2" stroke-linecap="round"/>
  <line x1="16" y1="28" x2="28" y2="28" stroke="#E2725B" stroke-width="2" stroke-linecap="round"/>
  <line x1="16" y1="36" x2="24" y2="36" stroke="#E2725B" stroke-width="2" stroke-linecap="round"/>
</svg>
```

### 天平图标 (判断)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 底座填充 -->
  <rect x="18" y="38" width="12" height="4" rx="1" fill="#FEFFFA"/>
  <!-- 底座墨线 -->
  <rect x="18" y="38" width="12" height="4" rx="1" fill="none" stroke="#E2725B" stroke-width="2"/>
  <!-- 支柱 -->
  <line x1="24" y1="10" x2="24" y2="38" stroke="#E2725B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- 横梁 -->
  <line x1="6" y1="16" x2="42" y2="16" stroke="#E2725B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- 左托盘 -->
  <ellipse cx="10" cy="22" rx="6" ry="3" fill="#FEFFFA" stroke="#E2725B" stroke-width="2"/>
  <!-- 右托盘 -->
  <ellipse cx="38" cy="22" rx="6" ry="3" fill="#FEFFFA" stroke="#E2725B" stroke-width="2"/>
  <!-- 悬挂线 -->
  <line x1="10" y1="16" x2="10" y2="19" stroke="#E2725B" stroke-width="1.5"/>
  <line x1="38" y1="16" x2="38" y2="19" stroke="#E2725B" stroke-width="1.5"/>
</svg>
```

### 大脑图标 (学习)

```svg
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <!-- 大脑轮廓填充 -->
  <path d="M24 4 C14 4 8 12 8 22 C8 32 14 40 24 40 C34 40 40 32 40 22 C40 12 34 4 24 4 Z"
        fill="#FEFFFA"/>
  <!-- 大脑轮廓墨线 -->
  <path d="M24 4 C14 4 8 12 8 22 C8 32 14 40 24 40 C34 40 40 32 40 22 C40 12 34 4 24 4 Z"
        fill="none" stroke="#6B7F5A" stroke-width="2.5" stroke-linecap="round"/>
  <!-- 中线 -->
  <path d="M24 10 Q26 22 24 34" fill="none" stroke="#6B7F5A" stroke-width="2" stroke-linecap="round"/>
  <!-- 左脑沟回 -->
  <path d="M14 16 Q18 20 16 28" fill="none" stroke="#6B7F5A" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18 14 Q20 18 18 24" fill="none" stroke="#6B7F5A" stroke-width="1.5" stroke-linecap="round"/>
  <!-- 右脑沟回 -->
  <path d="M34 16 Q30 20 32 28" fill="none" stroke="#6B7F5A" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M30 14 Q28 18 30 24" fill="none" stroke="#6B7F5A" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

---

## 批量处理脚本

```javascript
// scripts/generate-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const icons = {
  'icon-soul': `<svg viewBox="0 0 48 48">...</svg>`,
  'icon-skills': `<svg viewBox="0 0 48 48">...</svg>`,
  'icon-memory': `<svg viewBox="0 0 48 48">...</svg>`,
  // ... 更多图标
};

async function generateAllIcons(outputDir = 'slides/imgs') {
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [name, svg] of Object.entries(icons)) {
    const outputPath = path.join(outputDir, `${name}.png`);
    await sharp(Buffer.from(svg))
      .resize(144, 144)  // 48 * 3 = 144px (3x)
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${outputPath}`);
  }
}

generateAllIcons().catch(console.error);
```

---

## 质量对比

| 方案 | 分辨率 | 清晰度 | 手绘感 | 适用场景 |
|------|--------|--------|--------|---------|
| addShape 模拟 | 依赖 PPTX | 中等 | 差 | 简单几何 |
| SVG → PNG (1x) | 48px | 低 | 好 | 不推荐 |
| SVG → PNG (2x) | 96px | 中 | 好 | 普通场景 |
| SVG → PNG (3x) | 144px | 高 | 好 | 推荐默认 |
| SVG → PNG (4x) | 192px | 极高 | 好 | 大尺寸图标 |

---

## 注意事项

1. **缩放比例**：推荐 3x，平衡文件大小和清晰度
2. **尺寸一致性**：所有图标使用相同的 viewBox（推荐 48x48）
3. **颜色替换**：生成前可动态替换 SVG 中的颜色变量
4. **批量生成**：建议用脚本一次性生成所有图标

---

## 方案 B：macOS 内置工具（零依赖）

### 使用 qlmanage

macOS 内置的 Quick Look 可以将 SVG 转换为 PNG：

```bash
# 单个文件转换（3x = 216px）
qlmanage -t -s 216 -o . icon.svg
# 输出：icon.svg.png

# 批量转换脚本
for svg in *.svg; do
  qlmanage -t -s 216 -o . "$svg"
  mv "${svg}.png" "${svg%.svg}.png"
done
```

### 使用 rsvg-convert（需安装）

```bash
# 安装
brew install librsvg

# 转换（3x 缩放）
rsvg-convert -w 216 -h 216 icon.svg -o icon.png

# 批量转换
for svg in *.svg; do
  rsvg-convert -w 216 -h 216 "$svg" -o "${svg%.svg}.png"
done
```

### macOS 脚本示例

```bash
#!/bin/bash
# svg2png.sh - 使用 macOS 内置工具批量转换

SCALE=3
SIZE=$((72 * SCALE))  # 216px

generate_icon() {
    local name=$1
    local svg=$2

    echo "$svg" > /tmp/${name}.svg
    qlmanage -t -s $SIZE -o /tmp /tmp/${name}.svg 2>/dev/null
    mv /tmp/${name}.svg.png ${name}.png

    echo "✓ ${name}.png"
}

# 使用示例
generate_icon "icon-soul" '<svg viewBox="0 0 72 72">...</svg>'
```

---

## 方案对比

| 方案 | 依赖 | 跨平台 | 质量控制 | 推荐场景 |
|------|------|--------|---------|---------|
| Sharp | npm | ✅ | 精确 | 生产环境、跨平台 |
| qlmanage | macOS | ❌ | 一般 | 快速原型、macOS 开发 |
| rsvg-convert | brew | ✅ | 精确 | 生产环境、命令行 |

---

*版本：v1.1*
*更新：2026-03-23 — 新增 macOS 方案*