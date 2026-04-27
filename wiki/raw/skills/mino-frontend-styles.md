# 可选风格规范 — 8 种补充风格

> 完整的视觉设计规范，用于扩展 mino-frontend 的 4 种核心模式。

---

## ⚠️ Viewport Fitting 要求（所有风格通用）

**每个幻灯片必须精确适配视口，绝对不允许滚动。**

### 每张幻灯片内容密度限制

| 幻灯片类型 | 最大内容量 |
|-----------|----------|
| 标题页 | 1 个标题 + 1 个副标题 |
| 内容页 | 1 个标题 + 4-6 个要点（每行最多 2 行） |
| 卡片网格 | 1 个标题 + 6 个卡片（2x3 或 3x2） |
| 代码页 | 1 个标题 + 8-10 行代码 |
| 引用页 | 1 个引用（最多 3 行）+ 署名 |

**内容过多？→ 分拆成多张幻灯片。永不滚动。**

---

## 深色主题

### 1. Bold Signal

**气质：** 自信、大胆、现代、高冲击力

**布局：** 深色渐变背景上的彩色卡片。左上角编号，右上角导航，左下角标题。

**字体：**
- Display: `Archivo Black` (900)
- Body: `Space Grotesk` (400/500)

**色彩：**
```css
:root {
    --bg-primary: #1a1a1a;
    --bg-gradient: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    --card-bg: #FF5722;
    --text-primary: #ffffff;
    --text-on-card: #1a1a1a;
}
```

**标志性元素：**
- 粗体彩色卡片作为焦点（橙色、珊瑚色或鲜艳强调色）
- 大号分区数字（01、02 等）
- 带有激活/非激活透明度状态的导航面包屑
- 基于网格的精确对齐

---

### 2. Electric Studio

**气质：** 大胆、干净、专业、高对比度

**布局：** 分屏—上方白色，下方蓝色。角落有品牌标记。

**字体：**
- Display: `Manrope` (800)
- Body: `Manrope` (400/500)

**色彩：**
```css
:root {
    --bg-dark: #0a0a0a;
    --bg-white: #ffffff;
    --accent-blue: #4361ee;
    --text-dark: #0a0a0a;
    --text-light: #ffffff;
}
```

**标志性元素：**
- 双面板垂直分割
- 面板边缘的强调条
- 引用排版作为主角元素
- 极简、自信的留白

---

### 3. Creative Voltage

**气质：** 大胆、创意、活力、复古现代

**布局：** 分屏—左侧电光蓝，右侧深色。手写体装饰。

**字体：**
- Display: `Syne` (700/800)
- Mono: `Space Mono` (400/700)

**色彩：**
```css
:root {
    --bg-primary: #0066ff;
    --bg-dark: #1a1a2e;
    --accent-neon: #d4ff00;
    --text-light: #ffffff;
}
```

**标志性元素：**
- 电光蓝 + 霓虹黄对比
- 半调纹理图案
- 霓虹徽章/标注
- 用于创意装饰的手写字体

---

### 4. Dark Botanical

**气质：** 优雅、精致、艺术、高端

**布局：** 深色背景上的居中内容。角落有抽象柔和形状。

**字体：**
- Display: `Cormorant` (400/600) — 优雅衬线
- Body: `IBM Plex Sans` (300/400)

**色彩：**
```css
:root {
    --bg-primary: #0f0f0f;
    --text-primary: #e8e4df;
    --text-secondary: #9a9590;
    --accent-warm: #d4a574;
    --accent-pink: #e8b4b8;
    --accent-gold: #c9b896;
}
```

**标志性元素：**
- 抽象柔和渐变圆形（模糊、重叠）
- 暖色调强调（粉色、金色、陶土色）
- 细垂直强调线
- 斜体签名式排版
- **无插画—仅抽象 CSS 形状**

---

## 浅色主题

### 5. Notebook Tabs

**气质：** 编辑风、有序、优雅、触感

**布局：** 深色背景上的米白纸卡片。右侧边缘有彩色标签。

**字体：**
- Display: `Bodoni Moda` (400/700) — 经典编辑风
- Body: `DM Sans` (400/500)

**色彩：**
```css
:root {
    --bg-outer: #2d2d2d;
    --bg-page: #f8f6f1;
    --text-primary: #1a1a1a;
    --tab-1: #98d4bb; /* 薄荷 */
    --tab-2: #c7b8ea; /* 薰衣草 */
    --tab-3: #f4b8c5; /* 粉色 */
    --tab-4: #a8d8ea; /* 天空 */
    --tab-5: #ffe6a7; /* 奶油 */
}
```

**标志性元素：**
- 带微妙阴影的纸张容器
- 右侧边缘的彩色分区标签（垂直文本）
- 左侧的装订孔装饰
- 标签文本必须随视口缩放：`font-size: clamp(0.5rem, 1vh, 0.7rem)`

---

### 6. Pastel Geometry

**气质：** 友好、有序、现代、亲和

**布局：** 粉彩背景上的白色卡片。右侧边缘有垂直药丸。

**字体：**
- Display: `Plus Jakarta Sans` (700/800)
- Body: `Plus Jakarta Sans` (400/500)

**色彩：**
```css
:root {
    --bg-primary: #c8d9e6;
    --card-bg: #faf9f7;
    --pill-pink: #f0b4d4;
    --pill-mint: #a8d4c4;
    --pill-sage: #5a7c6a;
    --pill-lavender: #9b8dc4;
    --pill-violet: #7c6aad;
}
```

**标志性元素：**
- 带柔和阴影的圆角卡片
- **右侧边缘的垂直药丸**，高度不同（类似标签）
- 一致的药丸宽度，高度：短 → 中 → 高 → 中 → 短
- 角落的下载/操作图标

---

### 7. Split Pastel

**气质：** 俏皮、现代、友好、创意

**布局：** 双色垂直分割（左侧桃色，右侧薰衣草）。

**字体：**
- Display: `Outfit` (700/800)
- Body: `Outfit` (400/500)

**色彩：**
```css
:root {
    --bg-peach: #f5e6dc;
    --bg-lavender: #e4dff0;
    --text-dark: #1a1a1a;
    --badge-mint: #c8f0d8;
    --badge-yellow: #f0f0c8;
    --badge-pink: #f0d4e0;
}
```

**标志性元素：**
- 分割背景色
- 带图标的俏皮徽章药丸
- 右侧面板上的网格图案叠加
- 圆角 CTA 按钮

---

### 8. Vintage Editorial

**气质：** 风趣、自信、编辑风、个性驱动

**布局：** 米色背景上的居中内容。抽象几何形状作为装饰。

**字体：**
- Display: `Fraunces` (700/900) — 独特衬线
- Body: `Work Sans` (400/500)

**色彩：**
```css
:root {
    --bg-cream: #f5f3ee;
    --text-primary: #1a1a1a;
    --text-secondary: #555;
    --accent-warm: #e8d4c0;
}
```

**标志性元素：**
- 抽象几何形状（圆形轮廓 + 线条 + 点）
- 粗边框 CTA 框
- 风趣、对话式文案风格
- **无插画—仅几何 CSS 形状**

---

## 字体配对快速参考

| 风格 | Display 字体 | Body 字体 | 来源 |
|------|-------------|-----------|------|
| Bold Signal | Archivo Black | Space Grotesk | Google |
| Electric Studio | Manrope | Manrope | Google |
| Creative Voltage | Syne | Space Mono | Google |
| Dark Botanical | Cormorant | IBM Plex Sans | Google |
| Notebook Tabs | Bodoni Moda | DM Sans | Google |
| Pastel Geometry | Plus Jakarta Sans | Plus Jakarta Sans | Google |
| Split Pastel | Outfit | Outfit | Google |
| Vintage Editorial | Fraunces | Work Sans | Google |

---

## 禁止使用的通用 AI 模式

**字体：** Inter、Roboto、Arial、系统字体作为 Display 字体

**色彩：** `#6366f1`（通用靛蓝）、白色背景上的紫色渐变

**布局：** 一切居中、通用英雄区、相同的卡片网格

**装饰：** 写实插画、无意义的毛玻璃效果、无目的的阴影

---

## 字体引入模板

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">

<!-- Fontshare（用于 Clash Display, Satoshi 等）-->
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=satoshi@400,500&display=swap">
```
