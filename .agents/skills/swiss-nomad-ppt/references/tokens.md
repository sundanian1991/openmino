# Digital Nomad Work Infrastructure — Design Tokens

> 所有可量化设计参数的精确定义，供其他AI直接引用实现。
> 基于12页截图逆向解析，覆盖Light/Dark双主题。
> **校正日期**：2026-06-13（对照原图逐色精修）

---

## 1. Colors 颜色系统

### 1.1 Primitive Colors（原始色）

| Token | Hex | RGB | 用途说明 |
|-------|-----|-----|----------|
| `black` | `#111111` | rgb(17,17,17) | 页面深黑背景（封面、Dark主题页） |
| `off-black` | `#1A1A1A` | rgb(26,26,26) | 正文文字色（Light主题）、卡片边框色 |
| `charcoal` | `#2A2A2A` | rgb(42,42,42) | Dark主题卡片背景、底层卡片（P08） |
| `dark-brown` | `#3A3228` | rgb(58,50,40) | P04编号03卡片特殊深棕底色 |
| `warm-gray` | `#555555` | rgb(85,85,85) | 柱状图中间灰柱（P10 $7.5B）、次级文字 |
| `mid-gray` | `#888888` | rgb(136,136,136) | Caption文字、标签、辅助说明 |
| `light-gray` | `#CCCCCC` | rgb(204,204,204) | 流程图连接线、Y轴虚线、分割线 |
| `faint-gray` | `#E0E0E0` | rgb(224,224,224) | 超大编号水印色（P11的"02.""03."） |
| `silver` | `#E8E8E8` | rgb(232,232,232) | 卡片边框色（1px）、表单边框 |
| `pale-gray` | `#F0F0F0` | rgb(240,240,240) | 浅灰卡片底色、流程图节点底色（P05/P08顶层卡） |
| `off-white` | `#F5F5F5` | rgb(245,245,245) | 页面次级白底 |
| `cream` | `#F2EDE4` | rgb(242,237,228) | P02整页米色背景 |
| `white` | `#FFFFFF` | rgb(255,255,255) | 页面主白底、Dark主题文字、流程节点白底 |
| `orange` | `#E85D2B` | rgb(232,93,43) | 全局唯一强调色：标签、高亮柱、球体、CTA节点、箭头图标 |
| `orange-deep` | `#C44A1A` | rgb(196,74,26) | 球体径向渐变边缘色 |
| `orange-bright` | `#F0652B` | rgb(240,101,43) | 球体径向渐变中心色 |
| `bar-gray-1` | `#777777` | rgb(119,119,119) | P10柱状图 $5.4B 柱子 |
| `bar-gray-2` | `#666666` | rgb(102,102,102) | P10柱状图 $6.1B 柱子 |
| `bar-gray-3` | `#555555` | rgb(85,85,85) | P10柱状图 $7.5B 柱子 |

### 1.2 Semantic Colors（语义色）

#### Light Theme
| Token | Value | 用途 |
|-------|-------|------|
| `bg-primary` | `#FFFFFF` | 页面主背景（P03-P05, P09, P11-P12） |
| `bg-secondary` | `#F2EDE4` | 米色主题页背景（P02） |
| `bg-card` | `#FFFFFF` | 卡片背景（标准白卡片） |
| `bg-card-muted` | `#F0F0F0` | 浅灰卡片/节点背景（P05流程节点、P08顶层卡） |
| `bg-card-warm` | `#F5F0E8` | 暖米卡片背景（P04编号02卡片） |
| `text-primary` | `#1A1A1A` | 标题、主要文字 |
| `text-secondary` | `#4A4A4A` | 正文段落 |
| `text-muted` | `#888888` | Caption、标签、辅助说明 |
| `text-watermark` | `#E0E0E0` | 超大编号装饰数字（P11的"02.""03."） |
| `border-default` | `rgba(0,0,0,0.08)` | 卡片默认边框（1px） |
| `border-divider` | `rgba(0,0,0,0.10)` | 列表分割线、阶段分隔线 |

#### Dark Theme
| Token | Value | 用途 |
|-------|-------|------|
| `bg-primary-dark` | `#111111` | 页面深黑背景（P01, P06-P08, P10） |
| `bg-card-dark` | `#2A2A2A` | Dark主题卡片背景（P08底层卡） |
| `bg-card-dark-elevated` | `#333333` | Dark主题中略亮的卡片 |
| `text-primary-dark` | `#FFFFFF` | 标题、主要文字 |
| `text-secondary-dark` | `rgba(255,255,255,0.60)` | 正文段落（刻意降低透明度） |
| `text-muted-dark` | `rgba(255,255,255,0.40)` | Caption、标签 |
| `border-dark` | `rgba(255,255,255,0.08)` | Dark主题边框 |
| `border-divider-dark` | `rgba(255,255,255,0.10)` | Dark主题分割线 |

### 1.3 Gradient（渐变）

| Token | Value | 用途 |
|-------|-------|------|
| `gradient-orb` | `radial-gradient(circle at 35% 35%, #F0652B 0%, #E85D2B 40%, #C44A1A 100%)` | 封面巨型球体 |
| `gradient-orb-glow` | `radial-gradient(circle at 40% 40%, rgba(240,101,43,0.12) 0%, transparent 70%)` | 球体周围柔光溢出 |

> **核心规则：整份PPT仅此一处使用渐变。其余全部纯色。**

---

## 2. Typography 字体系统

### 2.1 Font Families

| Token | Font Stack | 用途 |
|-------|-----------|------|
| `font-serif` | `"Playfair Display", Georgia, "Times New Roman", serif` | 封面Display标题（P01唯一使用位置） |
| `font-sans` | `"Inter", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", sans-serif` | 内页标题、正文、所有UI文字 |
| `font-mono` | `"SF Mono", "Roboto Mono", "Fira Code", monospace` | 数据代码、可选用于数据展示 |

> 中文fallback：PingFang SC → Hiragino Sans GB → Microsoft YaHei

### 2.2 Type Scale（字号阶梯）

以基准字号 `14px`（Body）为参照：

| Token | Size | Line Height | Letter Spacing | Weight | 用途 |
|-------|------|-------------|----------------|--------|------|
| `text-display` | 64px | 1.08 | -0.02em | 400 | 封面主标题（衬线） |
| `text-h1` | 36px | 1.2 | -0.01em | 700 | 页面大标题（无衬线粗体） |
| `text-h2` | 20px | 1.3 | 0 | 700 | 卡片标题、要点标题 |
| `text-h3` | 16px | 1.4 | 0 | 600 | 小节标题、列表标题、卡片副标题 |
| `text-body` | 14px | 1.6 | 0 | 400 | 正文段落 |
| `text-caption` | 12px | 1.4 | 0.01em | 400 | 标签、注释、来源、PillTag |
| `text-micro` | 11px | 1.4 | 0.02em | 400 | 极小标签（甘特图阶段头、流程图标签） |
| `text-number-xl` | 56px | 1.0 | -0.02em | 300 | 超大装饰编号（P11水印"02.""03."） |
| `text-number-lg` | 36px | 1.0 | -0.01em | 700 | 数据展示（P02的"+40%""+48%"） |
| `text-number-md` | 28px | 1.0 | 0 | 300 | 阶梯列表编号（P02的01-04） |
| `text-card-label` | 13px | 1.3 | 0 | 600 | 流程节点标签、卡片内标签 |

### 2.3 Font Weight

| Token | Value | 用途 |
|-------|-------|------|
| `font-light` | 300 | 装饰编号、极细标题 |
| `font-regular` | 400 | 正文、封面Display、Caption |
| `font-semibold` | 600 | 小节标题、要点标题、节点标签 |
| `font-bold` | 700 | 页面H1、卡片H2、数据数字 |

### 2.4 Typography Rules

- **标题**：Sentence case（首字母大写，其余小写），不使用全大写。
- **长标题**：允许换行，每行不超过6个单词，保持视觉块状。
- **段落最大宽度**：约480px（约55-70字符），避免行长过长。
- **行高**：标题1.2，正文1.6，数据1.0，标签1.4。
- **对齐**：标题左对齐；描述段落左对齐；标签左对齐；图表元素居中对齐。

---

## 3. Spacing 间距系统

### 3.1 Spacing Scale（基于4px的倍数系统）

| Token | Value | 用途 |
|-------|-------|------|
| `space-1` | 4px | 微调、图标与文字间距 |
| `space-2` | 8px | 紧凑元素间距（甘特条之间、金字塔层之间） |
| `space-3` | 12px | 小内边距、标签padding、节点padding |
| `space-4` | 16px | 小网格gap、2×2卡片间距 |
| `space-5` | 20px | 卡片内边距（小）、节点内边距 |
| `space-6` | 24px | 标准卡片内边距、三列间距、流程节点间距 |
| `space-8` | 32px | 模块之间的小间距、标题行间距 |
| `space-10` | 40px | 中等模块间距、4:6/5:5分栏gap |
| `space-12` | 48px | 标题与描述之间的间距 |
| `space-16` | 64px | 大模块间距 |
| `space-20` | 80px | 页面左右边距（x轴） |
| `space-24` | 96px | 标题区与内容区之间的呼吸留白 |

### 3.2 Page Padding（页面边距）

| Token | Value | 用途 |
|-------|-------|------|
| `page-padding-x` | 80px | 页面左右边距（16:9宽度1920px时约占4.2%） |
| `page-padding-y` | 60px | 页面上边距（约占5.5%） |
| `page-padding-bottom` | 60px | 页面下边距 |

### 3.3 Layout Zones（信息区高度占比）

| Token | 占比 | 用途 |
|-------|------|------|
| `zone-header` | 25% | 标题区（大标题+描述） |
| `zone-breathing` | 15% | 呼吸留白区（纯空白，标题与内容的分隔） |
| `zone-content` | 60% | 内容区（图表、卡片、图片） |

---

## 4. Border Radius 圆角系统

| Token | Value | 用途 |
|-------|-------|------|
| `radius-none` | 0px | 摄影图片（P11/P12建筑图）、分割线 |
| `radius-sm` | 4px | 极小圆角（柱状图顶部） |
| `radius-md` | 8px | 流程图节点、甘特条、金字塔层、树状卡片 |
| `radius-lg` | 12px | 标准卡片、说明框、数据卡片 |
| `radius-xl` | 16px | 大卡片（2×2网格、三列卡片） |
| `radius-full` | 9999px | Pill标签、橙色圆节点（P05右侧File Storage/Clients）、球体 |

---

## 5. Borders & Strokes 边框与描边

### 5.1 Border Width

| Token | Value | 用途 |
|-------|-------|------|
| `border-width-none` | 0px | 无框卡片（深底卡片、米底卡片） |
| `border-width-hairline` | 0.5px | 三角形层级分割线（P06）、轨道线（P01） |
| `border-width-thin` | 1px | 卡片边框、分割线、圆形节点描边、流程连线 |
| `border-width-medium` | 1.5px | 图标stroke |
| `border-width-thick` | 2px | 强调图标、特殊分割线 |

### 5.2 Border Style

| Token | Value | 用途 |
|-------|-------|------|
| `border-solid` | solid | 默认 |
| `border-dashed` | dashed | Y轴刻度参考线（P10柱状图） |

---

## 6. Shadows 阴影系统

> **核心原则：整份PPT不使用任何阴影。**

| Token | Value | 用途 |
|-------|-------|------|
| `shadow-none` | none | **唯一值** |

信息层级通过颜色对比、间距、边框来建立，不依赖Z轴深度。

---

## 7. Grid System 网格系统

### 7.1 Base Grid（基础网格）

| Token | Value |
|-------|-------|
| `grid-columns` | 12 |
| `grid-gutter` | 24px |
| `grid-margin` | 80px |

### 7.2 Common Layout Patterns（常用布局模式）

| Token | 结构 | Gap | 适用页面 |
|-------|------|-----|----------|
| `layout-4-6` | 左40%文字 + 右60%图形 | 40px | P03, P10 |
| `layout-5-5` | 左右各50% | 40px | P06, P12 |
| `layout-3-3-3` | 三等分列 | 24px | P11 |
| `layout-2-2-2-2` | 四等分（2×2网格） | 16px | P04 |
| `layout-full` | 标题区上30% + 内容区下70% | — | P05, P07, P08, P09 |

---

## 8. Sizing 尺寸规范

### 8.1 Component Sizes

| Component | Width | Height | Notes |
|-----------|-------|--------|-------|
| 数据卡片（Data Card） | auto | auto | padding 24px，最小宽160px |
| 流程图矩形节点（Flow Node） | auto | 40-44px | padding 12px 20px |
| 流程图圆形节点（Circle Node） | 48-60px | 48-60px | 直径，1px描边 |
| 橙色圆形节点（Orange Circle） | 80-100px | 80-100px | P05右侧File Storage/Clients，橙色实心 |
| Pill标签 | auto | auto | padding 4px 12px |
| 甘特条（Gantt Bar） | auto | 40px | 占据对应列宽，圆角8px |
| 柱状图柱子（Bar） | 56-64px | auto | 根据数据定高，无圆角或2px圆角 |
| 柱状图间距 | 24-32px | — | 柱子之间 |
| 金字塔层（Pyramid Layer） | 等比递减 | 40px | 底层100%，每层缩窄约15% |
| 三角形层级区域（Triangle） | 约400×350px | — | P06右区 |
| 装饰双色圆（DecorCircle） | 24px | 24px | 固定尺寸 |
| 小图标 | 16-20px | 16-20px | 线框风格，金字塔内/卡片内 |
| 中等图标 | 24px | 24px | 标准UI图标 |
| 卡片内图标容器 | 32-40px | 32-40px | 带细边框的方形/圆形图标底框（P11） |

### 8.2 Image Sizes

| Token | Aspect Ratio | 用途 |
|-------|--------------|------|
| `img-card-top` | 约16:10 | 卡片顶部图片（P11左列建筑摄影） |
| `img-full-height` | auto | 占满半页高度（P12右侧建筑图，约400-500px高） |

---

## 9. Z-Index 层级系统

| Token | Value | 用途 |
|-------|-------|------|
| `z-base` | 0 | 默认内容层 |
| `z-watermark` | -1 | 超大编号装饰（退后至内容后方） |
| `z-orb` | -2 | 封面球体（标题后方） |
| `z-orbit` | -3 | 轨道线（球体后方） |

---

## 10. Animation & Motion（如适用）

> 静态PPT输出可忽略。Web/交互版本参考：

| Token | Value | 用途 |
|-------|-------|------|
| `transition-fast` | 150ms ease-out | 按钮hover、状态切换 |
| `transition-base` | 300ms ease-in-out | 卡片展开、页面切换 |
| `transition-slow` | 500ms cubic-bezier(0.4, 0, 0.2, 1) | 大幅动效（球体浮现） |

---

## 11. Iconography 图标规范

### 11.1 Icon Style
- **Type**: Outline/Stroke（线框），无填充。
- **Stroke Width**: 1.5px（标准）/ 1px（极小）。
- **Stroke Linecap**: round。
- **Stroke Linejoin**: round。
- **Color**: 继承当前主题文字色（黑色/白色），仅在需要引导时使用橙色。

### 11.2 Icon Size Mapping

| Token | Size | 用途 |
|-------|------|------|
| `icon-xs` | 12-14px | 金字塔内小图标、内联标记 |
| `icon-sm` | 16-18px | 卡片内图标（P11的方形边框内图标） |
| `icon-md` | 20-24px | 标准UI图标、流程节点图标 |
| `icon-lg` | 32px | 卡片标题旁图标 |

### 11.3 Special Icon Treatments
- **箭头图标（↘）**：橙色 `#E85D2B`，用于P12的2×2要点列表和P07的6个要点。
- **地球图标**：线框，白色，P01右下角。
- **流程图节点图标**：黑色/白色线框，20px，置于节点左侧或上方。
- **P11卡片图标**：置于32-40px的细边框方形/圆形容器内，1px边框。

---

## 12. Quick Reference Card（速查卡）

```
┌─────────────────────────────────────────────────────────────┐
│  LIGHT THEME                   DARK THEME                   │
├─────────────────────────────────────────────────────────────┤
│  bg:    #FFFFFF                #111111                      │
│  text:  #1A1A1A                #FFFFFF                      │
│  body:  #4A4A4A                rgba(255,255,255,0.6)        │
│  mute:  #888888                rgba(255,255,255,0.4)        │
│  card:  #FFFFFF / #F0F0F0      #2A2A2A                      │
│  border: rgba(0,0,0,0.08)      rgba(255,255,255,0.08)      │
│  accent: #E85D2B               #E85D2B                      │
├─────────────────────────────────────────────────────────────┤
│  FONT:  Sans-serif (Inter)     Sans-serif (Inter)           │
│  Cover: Serif (Playfair)       —                            │
├─────────────────────────────────────────────────────────────┤
│  RADIUS: 12px (card) / 8px (node) / 16px (large card)      │
│  SHADOW: none (never)                                       │
│  PADDING: 80px (page x) / 60px (page y) / 24px (card)      │
│  GAP:    24px (grid) / 16px (compact)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 13. Token Usage Matrix（令牌使用矩阵）

| 组件/页面 | bg | text-primary | text-secondary | border | radius | accent |
|-----------|----|--------------|----------------|--------|--------|--------|
| P01 Cover | `#111111` | `#FFFFFF` serif | `#FFFFFF` 70% | none | `50%` orb | `#E85D2B` gradient |
| P02 米色页 | `#F2EDE4` | `#1A1A1A` | `#4A4A4A` | `rgba(0,0,0,0.1)` | `12px` card | none |
| P03 工具系统 | `#FFFFFF` | `#1A1A1A` | `#4A4A4A` | `rgba(0,0,0,0.08)` | `12px` | `#E85D2B` top layer |
| P04 四宫格 | `#FFFFFF` | `#1A1A1A` | `#888888` | `1px #E8E8E8` | `16px` | none |
| P05 流程图 | `#FFFFFF` | `#1A1A1A` | `#888888` | `1px #CCCCCC` | `8px` | `#E85D2B` start node + 右侧圆 |
| P06 三角形 | `#111111` | `#FFFFFF` | `rgba(255,255,255,0.6)` | `0.5px rgba(255,255,255,0.15)` | none | none |
| P07 实践流程 | `#111111` | `#FFFFFF` | `rgba(255,255,255,0.6)` | `1px #CCCCCC` | `8px` | white nodes |
| P08 生态树 | `#111111` | `#FFFFFF` | `rgba(255,255,255,0.6)` | none | `8px` | `#E85D2B` mid bar |
| P09 路线图 | `#FFFFFF` | `#1A1A1A` | `#888888` | `1px #EEEEEE` | `8px` bar | `#E85D2B` Phase 2/3 |
| P10 柱状图 | `#111111` | `#FFFFFF` | `rgba(255,255,255,0.6)` | none | `2px` bar top | `#E85D2B` last bar |
| P11 三列卡 | `#FFFFFF` | `#1A1A1A` | `#888888` | `1px #E8E8E8` | `16px` | none |
| P12 总结 | `#FFFFFF` | `#1A1A1A` | `#888888` | none | none img | `#E85D2B` arrow icon |
