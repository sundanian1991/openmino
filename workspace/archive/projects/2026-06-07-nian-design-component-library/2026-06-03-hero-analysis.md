# Nian Design · Hero 组件对照分析

## 一、技能中已定义的 Hero 组件（有 CSS 类）

### 来源：visual-forms.md（6 个形态族）

| 编号 | CSS 类名 | 形态 | 说明 |
|------|---------|------|------|
| HF-01 | `.hero-statement`, `.hero-statement-text` | 全幅文字声明 | 96-120px Georgia 超大字，浅色背景 |
| HF-02 | `.hero-split`, `.hero-split-text`, `.hero-split-visual` | 左右分割视图 | 一侧文字叙事+另一侧视觉元素 |
| HF-03 | `.hero-numeral`, `.metric-card` | 数字网格 / LED 卡 | 方阵排列大数字卡片，2/3/4 列 |
| HF-04 | `.hero-dark`, `.hero-dark--glacier/--olive/--gray` | 暗色声明 | 深色背景全幅声明，仪式感强 |
| HF-05 | `.scale-jump` | 尺度跳跃 | 8px→200px 无过渡，超细大数字 |
| HF-06 | `.hero-seismic` | 地震波 | 工业精确 + 有机数学，OLED 暗底+正弦波 |

### 来源：components-ext.md（9 个场景组件）

| 编号 | CSS 类名 | 场景 | 视觉效果 |
|------|---------|------|---------|
| H1 | `.hero-split` | 品牌宣言/阅读+分析 | 双栏：左文字右深色面板+ghost 水印 |
| H2 | `.hero-pulse` | 数据分析中心 | 全屏深色+动画扫描线+三栏指标条 |
| H3 | `.hero-runway` | 时尚/产品 | 双栏：左声明右深色面板+ghost 年份 |
| H4 | `.hero-sky` | 航空/旅行 | 双栏：左文字右深蓝面板+航线标签 |
| H5 | `.hero-bottle` | 烈酒/包装 | 三栏：左文字+中瓶型线框+右年份 |
| H6 | `.hero-scoreboard` | 体育/竞赛 | 深色全屏+比分牌三栏布局 |
| H7 | `.hero-entrance` | 博物馆/展览 | 浅色留白+底部文字+圆形封印 |
| H8 | `.hero-infra` | 电信/基础设施 | 深色全屏+60px 网格线背景 |
| H9 | `.hero-reveal` | 汽车/产品发布 | 深色全屏+水平速度线+右下徽章 |

### 去重后总计：14 个唯一 CSS 组件

---

## 二、24 个 Showcase 变体 vs 14 个定义组件的对照

| # | Showcase 变体 | 来源文件 | 匹配 CSS 类 | 状态 |
|---|-------------|---------|-----------|------|
| S1 | 脉冲 Hero | haglofs-brand-analytics | `.hero-pulse` | ✅ 匹配，需修复文字对比度 |
| S2 | IKEA 分割 | ikea-democratic-design | `.hero-split` | ✅ 匹配 |
| S3 | SDL 分割+点阵 | sdl-design-principles | `.hero-split` (变体) | ✅ 匹配 |
| S4 | 图表 Hero | economist-deep-system | ❌ 无 | 🔴 自定义 |
| S5 | Volvo 揭幕 | volvo-heritage | `.hero-reveal` | ✅ 匹配，需修复装饰+文字 |
| S6 | Absolut 瓶型 | absolut-heritage | `.hero-bottle` | ✅ 匹配 |
| S7 | 岐力分割指标 | 岐力职场-绩效报告 | `.hero-split` (变体) | ✅ 匹配 |
| S8 | 监控 Hero | 电销异常IP分析 | ❌ 无 | 🔴 自定义 |
| S9 | 对角线切割 | 数据讲故事 | ❌ 无 | 🔴 自定义 |
| S10 | 大字 Hero | #001-industrial | `.hero-statement` | ✅ 匹配 |
| S11 | 数字+标题 | nian-with-brief | `.hero-numeral` | ✅ 匹配 |
| S12 | 暗色声明+地形 | component-showcase | `.hero-dark` | ✅ 匹配，需修复颜色 |
| S13 | Apple 圆环 | apple-activity-rings | ❌ 无 | 🔴 自定义 |
| S14 | Bloomberg 终端 | bloomberg-terminal | ❌ 无 | 🔴 自定义 |
| S15 | Ericsson 网格 | ericsson-infra | `.hero-infra` | ✅ 匹配，需修复颜色 |
| S16 | FT 粉彩仪表 | ft-pink-charts | ❌ 无 | 🔴 自定义 |
| S17 | 画廊入口 | haglofs-heritage-gallery | `.hero-entrance` | ✅ 匹配 |
| S19 | J.Lindeberg 分割 | j-lindeberg-performance | `.hero-runway` | ✅ 匹配 |
| S21 | Moderna 艺术中心 | moderna-museet | ❌ 无 | 🔴 自定义 |
| S22 | Spotify 渐变 | spotify-wrapped | ❌ 无 | 🔴 自定义 |
| S23 | 记分牌 | stadium-sport | `.hero-scoreboard` | ✅ 匹配 |
| V5 | 左斜切 | 组件品质标杆 | ❌ 无 | 🔴 自定义，需加装饰 |
| V6 | 水印为主 | 组件品质标杆 | ❌ 无 | 🔴 自定义 |
| V3 | 上下分割 | 组件品质标杆 | ❌ 无 | 🔴 自定义 |

### 统计：
- **✅ 已匹配（14个）**：S1/S2/S3/S5/S6/S7/S10/S11/S12/S15/S17/S19/S23 + 未在24中的 `.hero-sky` / `.scale-jump` / `.hero-seismic` / `.metric-card__hero`
- **🔴 自定义（10个）**：S4/S8/S9/S13/S14/S16/S21/S22/V5/V6/V3

---

## 三、建议合并方案

这 10 个自定义 Hero 中，部分值得创建 CSS 类并入技能：

| 变体 | 建议新类名 | 理由 | 优先级 |
|-----|-----------|------|--------|
| V5 左斜切 | `.hero-bevel` | clip-path 对角线切割，和 hero-split 互补 | ⭐⭐⭐ |
| V6 水印为主 | `.hero-watermark` | 纯视觉水印 Hero，极简风格 | ⭐⭐⭐ |
| S4 图表 Hero | `.hero-chart` | 内嵌图表作为 Hero 视觉 | ⭐⭐ |
| S9 对角线 | `.hero-diagonal` | 另一种切割方向，和 V5 类似 | ⭐⭐ |
| S8 监控 | `.hero-monitor` | 网格+数据监控风格 | ⭐⭐ |
| S13 Apple 圆环 | `.hero-rings` | SVG 圆环数据展示 | ⭐ |
| S14 Bloomberg | `.hero-terminal` | 等宽终端风格 | ⭐ |
| S16 FT 粉彩 | `.hero-dashboard` | 暖色调仪表盘 | ⭐ |
| S21 Moderna | `.hero-gallery` | 居中艺术风格（和 H7 重叠） | - |
| S22 Spotify | `.hero-gradient-text` | 渐变文字（破 Nian 禁制） | - |
| V3 上下分割 | `.hero-horizontal-split` | 上下分割（可并入 split 族） | ⭐⭐ |

---

## 四、需要修复的 6 个组件

| 组件 | 问题 | 修复方案 |
|------|------|---------|
| S1 hero-pulse | 深色底文字对比度不够 | 文字色从 `#fff` 改 `rgba(255,255,255,.95)`，指标条加大字号 |
| S5 hero-reveal | 太深+装饰不够 | 加水平条纹装饰，文字亮到 .95，加 olive 强调色 |
| S8 监控 | 颜色丑（glacier 蓝底+橘色不协调） | 改 olive 暖底+黄色高亮 |
| S12 hero-dark | 颜色丑（冰川蓝配复杂SVG） | 改 olive 暖底+简化SVG，加黄色点缀 |
| S15 hero-infra | 颜色丑（glacier 网格） | 改 olive 暖底+浅色节点 |
| V5 左斜切 | 缺装饰水印 | 加 ghost 大字+点阵装饰 |
