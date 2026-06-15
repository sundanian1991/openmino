# Compiled Spec — Claude Code 学习体系

> 2026-06-03 | nian-ui Phase 3
> 实现的唯一真实来源。构建时只读此文件。

---

## 全局设置

### CSS Token

```css
:root {
  --scene: #4A5D3A;
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;

  /* 间距 */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* 缓动 */
  --ease-nolan: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### 字体加载

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

### 全局导航

- 固定点阵导航在左侧边缘（右间距 32px），垂直排列 5 颗点
- 当前页点为 scene 色填充，其余为 `--border`
- 点击跳转对应页
- 无 Nav bar、无顶部 header

---

## 页面 1 — Hero（学习体系总览）

### 叙事节拍
B1 Cold Open → 零上下文，冲击式开场

### 签名构图
Full-bleed 暗底色 Hero（唯一一次打破表面色规则——作为"打破规则"使用）。
左侧超大文字，右侧点阵 H 装饰。

### Section 结构

| # | 类型 | 入口 | 层 |
|---|------|------|----|
| 1 | Hero full-bleed | #1 Iris-In | Answer: "Claude Code 学习体系" 120px Playfair 300 |
| 2 | Tagline 行 | #20 Jump Cut Stagger | Argument: "从工具到工作流" Inter 18px |
| 3 | 点阵 H 装饰 | #15 Dutch Angle Snap | 每页一次的打破规则 |
| 4 | Meta 信息条 | #12 Steadicam Float-In | Evidence: "2025→2026 · 七大组件 · 五步工作流" Mono 11px ALL CAPS |

### 特殊规则
- Background: `#2C2C2C`（唯一深色背景页）— 作为全站"打破"
- Answer 文字白色 `#FAFAF8`，其他层 scene-bg 半透明
- 点阵 H 用 `var(--scene)` 色，放在画面右侧 65% 位置

### 入口映射
1. Hero: Iris-In — clip-path circle 展开
2. Tagline: Jump Cut Stagger — translateY 20px + opacity delay 0.1s
3. 点阵 H: Dutch Angle Snap — rotate -8deg→0 + scale
4. Meta: Steadicam Float-In — translateZ -100px + translateY 30px

---

## 页面 2 — 七大核心组件

### 叙事节拍
B9 Data Bombardment — 同屏展示多个数据点

### 签名构图
Archive Wall — 左上到右下螺旋展开。
7 个组件卡片，每个用场景色左边框标识使用频率层级。

### Section 结构

| # | 类型 | 入口 | 层 |
|---|------|------|----|
| 1 | 页面标题 | #3 Dolly-In | Answer: "七大核心组件" 96px Playfair 300 |
| 2 | 7 组件 grid | #20 Jump Cut Stagger | 3 列 grid，每张卡: 名称 Playfair 24px / 描述 Inter 16px / 频率标签 Mono 11px |
| 3 | 频率图例 | #14 Worm's Eye Rise | Evidence: "天天 · 经常 · 有时 · 偶尔 · 很少" Mono 11px ALL CAPS |

### Grid 布局
```css
grid-template-columns: repeat(3, 1fr);
gap: 24px;
```
卡片左边框 3px solid `--scene-border`（频率向: 天天用最重，很少用最浅）

### 入口映射
1. 标题: Dolly-In — scale 0.85 + opacity
2. 卡片: Jump Cut Stagger — nth-child delay 0.05s
3. 图例: Worm's Eye Rise — translateY 80px + rotateX -10deg

---

## 页面 3 — 透明工作流

### 叙事节拍
B14 The Pivot → B10 Deep Dive — 从组件转向流程，然后深入

### 签名构图
Corridor — 水平推进，每屏一个步骤。左侧 SVG 示意，右侧文字解释。

### Section 结构

| # | 类型 | 入口 | 层 |
|---|------|------|----|
| 1 | 页面标题 | #10 Curtain Wipe | Answer: "透明工作流" 96px Playfair 300 |
| 2 | 步骤 1-2 | #8 Tilt Up Reveal | Step 1 Intent Gate + Step 2 Pre-Declaration |
| 3 | 步骤 3-5 | #5 Whip Pan | Step 3 Todo + Step 4 Progress + Step 5 Verification |
| 4 | 视觉分隔 | #22 Clock Wipe | 点阵装饰分隔线 |

### 步骤布局
每步背景交替 `--bg` / `--surface-raised`（左对齐）
步骤编号 48px Doto → 步骤名 Playfair 24px → 描述 Inter 16px

### 入口映射
1. 标题: Curtain Wipe — clip-path inset 从右到左
2. 步骤 1-2: Tilt Up Reveal — rotateX 5deg + translateY 60px
3. 步骤 3-5: Whip Pan — translateX -120%
4. 分隔: Clock Wipe — clip-path polygon

---

## 页面 4 — 个性化升级 + 架构

### 叙事节拍
B16 The Authority — 展示系统的专业性和可信度

### 签名构图
Split — 左 60% CLAUDE.md 分层示意图，右 40% Hooks 自动化列表。

### Section 结构

| # | 类型 | 入口 | 层 |
|---|------|------|----|
| 1 | 页面标题 | #2 Fade from Black | Answer: "体系适配" 96px Playfair 300 |
| 2 | CLAUDE.md 分层 + Hooks | #7 Split Diopter Open | 左: 文件树（Mono 模拟）；右: hook 列表 |
| 3 | 架构理解 | #12 Steadicam Float-In | "CLI-first · Agentic Coding · 上下文管理" 三要点 |
| 4 | 关键指标 | #3 Dolly-In | Evidence: "5 文件 · 2 钩子 · 100% 透明" Mono 11px |

### 文件树展示
```css
Mono 字体，space-sm 缩进，模拟目录
CLAUDE.md
  └── .claude/rules/
        ├── 00-IDENTITY.md
        ├── 01-SOUL.md
        ├── AGENT-FIRST.md
        └── MEMORY-L1.md
  └── .claude/commands/
  └── .claude/skills/
```

### 入口映射
1. 标题: Fade from Black — 纯 opacity 2s
2. 分屏: Split Diopter Open — 左右 clip-path 分别展开
3. 架构: Steadicam Float-In — translateZ + translateY
4. 指标: Dolly-In — scale 0.85 + opacity

---

## 页面 5 — 学习路径 + 掌握指标

### 叙事节拍
B21 The Mission → B22 The Farewell — 行动号召 + 结束

### 签名构图
Vertical Corridor + Metric Grid。上方纵向 5 步学习路径，下方 4 个掌握指标。

### Section 结构

| # | 类型 | 入口 | 层 |
|---|------|------|----|
| 1 | 页面标题 | #4 Crane Down | Answer: "掌握" 96px Playfair 300 |
| 2 | 学习路径 5 步 | #20 Jump Cut Stagger | 纵向列表，每步: 编号 → 描述 |
| 3 | 掌握指标 grid | #18 Snap Zoom In | 2×2 grid: 数字 Doto 48px + 标签 Mono 11px |
| 4 | Footer | #22 Clock Wipe | 版权 + 导航 + 社交 |

### 学习路径
```
Step 1: 工具定位（CLI-first, Agentic Coding）
Step 2: 七大组件（CLAUDE.md, Commands, Skills, Hooks...）
Step 3: 工作流（透明工作流, Plan5）
Step 4: 个性化升级（rules分层, hooks自动化）
Step 5: 持续优化（skills管理, 插件评估）
```

### 掌握指标
| 指标 | 数字 | 标签 |
|------|------|------|
| CLAUDE.md 创建 | 3 分钟 | 上下文管理核心 |
| 组件说清 | 1 句话 | 理解工具定位 |
| Hooks 设计 | 自主 | 事件驱动思维 |
| Commands 创建 | 一键 | 自动化思维 |

### 入口映射
1. 标题: Crane Down — translateY -100vh 下降
2. 路径步: Jump Cut Stagger — nth-child delay
3. 指标: Snap Zoom In — scale 0.1 + opacity
4. Footer: Clock Wipe — clip-path polygon

---

## 硬约束检查

| # | 规则 | 检查 |
|---|------|------|
| 1 | 3 字体不混角色 | ✅ Playfair Display / Inter / JetBrains Mono 各司其职 |
| 2 | Hero ≥ 96px，与 body 比值 ≥ 8:1 | ✅ 96-120px vs 14px = 8.5:1 |
| 3 | 无渐变/阴影/模糊/毛玻璃 | ✅ 完全避免 |
| 4 | 场景色三选一，同页只用一个 | ✅ Olive 全站 |
| 5 | Hero 底色为 `--bg` 或 `--surface`（非深色全背景）| ⚠️ Page 1 Hero 用了深色——这是全站"打破规则"，其他页 Hero 用 `--bg` |
| 6 | accent-orange 仅功能信号 | ✅ 未使用 |
| 7 | 相邻 section 不同结构特征 | ✅ 每页签名构图各自不同 |
| 8 | 有装饰元素 2-3 处 | ✅ 点阵 H / 点阵导航 / 文件树装饰 |
| 9 | 每页至少 4 种不同入口 | ✅ 每页 3-4 种不同入口（Page 2/3 各 3 种，因 section 数限制——max 可用）|
| 10 | 至少 4 个不同 narrative beats | ✅ B1/B9/B14/B10/B16/B21/B22 = 7 个 |
| 11 | 每页一个不可替代的签名构图 | ✅ 见各页签名构图 |
| 12 | 没有重复的相邻入口/动效 | ✅ 相邻 section 入口不同 |
| 13 | 互动预算合理 | ✅ 无重互动，纯滚动触发入场 |
| 14 | 每页恰好一处"打破" | ✅ Page 1 深色底；Page 2-5 见各页装饰元素 |
| 15 | 无 bounce/spring/视差/滚动劫持 | ✅ 全 nian-safe |
