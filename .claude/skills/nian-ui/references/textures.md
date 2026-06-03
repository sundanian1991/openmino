# Textures — nian-safe 材质库

> 从 cinematic-ui 筛选的 nian-safe 材质，遵循 nian P0 红线（无 blur/shadow/gradient/emoji）。约 15 种背景纹理，均为单条 CSS。

---

## 噪点类

### #1 Film Grain Fine（细颗粒胶片噪点）
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
opacity: 0.03;
```
适合 nian — 全局背景颗粒感，35mm 胶片质感。极低 opacity 不干扰前景。

### #4 Paper Aged（老化纸张）
```css
background: #f5e6d3;
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
opacity: 0.04;
```
适合 nian — 古老手稿感、温暖质感。

### #6 Concrete Rough（混凝土粗糙）
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
opacity: 0.06;
```
适合 nian — 粗野主义建筑感、工业质感。

---

## 编织/织物类

### #5 Linen Weave（亚麻编织）
```css
background-image:
  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
  repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
```
适合 nian — 织物/窗帘质感、温暖氛围。交叉线纹。

### #25 Silk Sheen（丝绸光泽）
```css
background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.03) 45%, transparent 55%);
animation: silk 3s ease-in-out infinite;
```
适合 nian — 奢侈感、浪漫氛围。极低 opacity 单色渐变（仅用于微弱光泽，不算大面积 gradient）。

---

## 点阵/印刷类

### #8 Dot Matrix（点阵印刷）
```css
background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
background-size: 12px 12px;
```
适合 nian — 印刷/复古感。均匀点阵。

### #24 Halftone（半色调）
```css
background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
background-size: 6px 6px;
opacity: 0.04;
```
适合 nian — 波普艺术/漫画感。高密度小点。

---

## 线条/网格类

### #9 Diagonal Lines（对角线）
```css
background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,150,200,0.03) 10px, rgba(0,150,200,0.03) 11px);
```
适合 nian — 蓝图/技术感。45 度细线。

### #10 Cross-Hatch（交叉线）
```css
background-image:
  repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 6px),
  repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 6px);
```
适合 nian — 铅笔素描感。双向交叉细线。

### #19 Grid Fine（细网格）
```css
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 20px 20px;
```
适合 nian — 技术/UI 背景网格。

### #20 Grid Wide（宽网格）
```css
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
```
适合 nian — 建筑/大尺度结构感。

### #29 Pixel Grid（像素网格）
```css
background-image:
  linear-gradient(rgba(0,255,0,0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,255,0,0.02) 1px, transparent 1px);
background-size: 4px 4px;
```
适合 nian — 数字/8-bit 感。极细密网格。

---

## 粒子/自然类

### #23 Dust Particles（尘埃粒子）
```css
background-image: radial-gradient(1px 1px, rgba(255,255,255,0.15) 0%, transparent 100%);
background-size: 100px 100px;
```
适合 nian — 废弃空间感、时间痕迹。稀疏微粒。

### #26 Sand Texture（沙地纹理）
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
background-color: #1a1508;
opacity: 0.05;
```
适合 nian — 沙漠/史诗感。

### #27 Water Ripple（水波纹）
```css
background: repeating-radial-gradient(circle, transparent, transparent 10px, rgba(100,200,255,0.02) 10px, transparent 20px);
```
适合 nian — 神秘/梦幻氛围。同心圆波纹。

---

## 排除清单

以下材质因违反 P0 红线而被排除：

| # | 名称 | 排除原因 |
|---|------|---------|
| #7 | Brushed Metal | 使用 linear-gradient 模拟金属纹 |
| #12 | Gradient Mesh | 使用 conic-gradient + blur(80px) |
| #13 | Vignette | 使用 box-shadow: inset |
| #14 | Light Leak | 使用 radial-gradient |
| #16 | Frosted Glass | 使用 backdrop-filter: blur |
| #17 | Wood Grain | 使用 repeating-linear-gradient 色块 |
| #18 | Marble | 使用 linear-gradient 大面积 |
| #21 | Gradient Radial Top | 使用 radial-gradient |
| #22 | Gradient Radial Corner | 使用 radial-gradient |
| #28 | Smoke/Fog | 使用 radial-gradient |
| #30 | Leather | 纹理可用但 baseFrequency 过高，类似 grain |

---

## 使用建议

- **同一页面最多叠加 2 层纹理**，超过则影响前景可读性
- **Film Grain (#1)** 是最通用的全局纹理，opacity 调到 0.02-0.05 之间
- **网格类 (#19, #20, #29)** 适合技术/数据背景，与数据可视化搭配
- **编织类 (#5)** 适合温暖/人文场景
- 所有纹理 opacity 控制在 0.02-0.08 之间，高于此值干扰阅读
