# 贵藏风格电视机技术解释图 - Prompt 设计

## 主题：4K 画质技术拆解图

### 视觉结构
采用 **Multi-section grid (2x2)** 布局，将画布分为 4 个独立区域，每个区域展示一个技术模块。

### 配色
- 主强调色：IKB Blue `#002FA7`（技术感）
- 背景：off-white studio `#F5F5F0`
- 物体：黑色描边 + 浅灰物理表面

---

## 生成 Prompt

```
A clean Swiss editorial 3D illustration of a 4K TV display technology breakdown, split into 4 equal sections in a 2x2 grid layout, separated by thin dividers, off-white studio background (#F5F5F0), soft studio lighting, no dramatic shadows.

Top-left section: A thin flat-screen TV cross-section diagram showing pixel density. Labels in large horizontal Chinese text: "4K" (top-left), "830万像素" (top-right), "超高清" (bottom-center). Black ink outlines, light gray TV body, one vivid IKB blue accent (#002FA7) for pixel dots and arrows.

Top-right section: A color gamut comparison scene. Three overlapping color circles (sRGB, DCI-P3, Rec.2020) in 3D raised disks. Labels: "色域" (top-center), "广色域" (right edge), "10亿色" (bottom-center). IKB blue accent for highlight areas.

Bottom-left section: An HDR tone mapping diagram. A small 3D bar chart showing brightness levels from 0 to 1000 nits. Labels: "HDR" (top-left), "高动态" (top-right), "1000尼特" (bottom-center). IKB blue accent for bright bars.

Bottom-right section: An AI image processing pipeline. Three small 3D boxes in a left-to-right flow with arrows: "输入" → "AI优化" → "输出". Labels on each box. IKB blue accent for arrows and active processing box.

Overall rules:
- Full subject visible, generous safe margins on all sides
- Labels horizontal, large, high contrast, readable
- No crop, centered vertically
- 16:9 aspect ratio
- No logos, watermarks, fake app chrome
- Swiss editorial 3D style, like small physical models
```

---

## 调用参数

- **模型**：`HY-Image-3.0-Plus-4090-Tob-v1.0`
- **尺寸**：`1280x720`（16:9）
- **revise**：`true`（让模型优化 prompt）
- **云函数**：`generate-image`

---

## 预期效果

| 区域 | 内容 | 标签 |
|---|---|---|
| 左上 | 4K 像素密度剖面 | 4K、830万像素、超高清 |
| 右上 | 色域对比（sRGB/广色域） | 色域、广色域、10亿色 |
| 左下 | HDR 亮度柱状图 | HDR、高动态、1000尼特 |
| 右下 | AI 画质处理流程 | 输入、AI优化、输出 |

符合贵藏风格的"解释图"定位：有标签、有结构、有数据，不是纯装饰海报。
