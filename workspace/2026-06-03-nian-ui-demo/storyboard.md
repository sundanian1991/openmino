# Storyboard — Claude Code 学习体系

> 2026-06-03 | nian-ui Phase 2
> 导演: Christopher Nolan（结构参考）| 场景色: Olive

---

## 2a. 站点级电影语法

### Page-shell logic

每页 = 一个 Nolan 电影场景。全屏视图段（100vh）之间用 `clip-path` 过渡，禁止传统页面切换。页码用点阵导航在左侧边缘显示。

### Navigation posture

- 左侧固定导航：垂直点阵指示器，5 颗点对应 5 页
- 点击点/滚轮平滑滚到对应页
- 无 Nav bar，无顶部 header。Nolan 不用"导航"打断沉浸感

### Framing rules

- 内容偏向左侧 60%，右侧 40% 留白或放数据
- 每页只有一个视觉焦点（Answer 层）
- 对角线构图代替横平竖直（Nolan 的 IMAX 画框感）

### Density cadence

- Hero 页：极度稀疏（1 个 Answer + 1 个 tagline）
- 组件页：密集 grid，但每格内部稀疏
- 工作流页：每屏一个步骤，step by step
- 结尾页：逐渐收窄 → Footer

### 循环材质

Dot-matrix 点阵装饰贯穿全站。每页顶部或关键数字处嵌入点阵 H 图案。

### Shell-ban list 检查

- ✅ 无卡片网格全覆盖
- ✅ 无时间线布局
- ✅ 无标签页切换
- ✅ 无填充图标

---

## 2b. 导演简报 — Christopher Nolan（nian 修订版）

### 一句话视觉主题

> 精密装置的世界。每个组件在精确的时间到位，整个系统如同钟表齿轮般咬合。

### 3 个 Signature 技法及 Web 翻译

| Nolan 技法 | Web 翻译 | 具体实现 |
|-----------|---------|---------|
| **Time manipulation** | 页面状态以时间感驱动：进入时先看到最终结论（Answer），滚动后展开上下文（Argument + Evidence） | 每页首屏先展示 Hero Answer，继续滚动揭示细节 |
| **IMAX scale** | Hero 文字极大（96-120px）、正文极小（14px），8:1 比值强制视觉层级 | Playfair Display 300 120px vs Inter 400 14px |
| **Rational structure** | 每个 section 是一个"齿轮"——只有放对位置才有意义。相邻 section 通过视觉边界区分 | 不同 section 使用不同的布局网格，避免节奏单一 |

### 颜色令牌（nian Olive）

```css
:root {
  --scene: var(--scene-olive);       /* #4A5D3A */
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;
}
```

### 字体方向（固定）

- Display: Playfair Display 300 (96-120px)
- H1-H3: Playfair Display / Inter
- Body: Inter 400 (16px → 14px 在 Hero 对应区域)
- Data: JetBrains Mono 500 (14px)
- Label: JetBrains Mono 500 (11px, ALL CAPS, 0.06em)

### 动效规则（nian-safe）

- 入场: `transform: translateY(20px) + opacity → 0 → clip-path` 组合
- 禁止: blur/shadow/gradient/bounce/parallax
- 缓动: `cubic-bezier(0.25, 0.1, 0.25, 1)` — Nolan 的机械精确感

---

## 2c. 三层金字塔叠加

| 层级 | 全站规则 |
|------|---------|
| **Answer** | 每页唯一结论。Playfair Display 96-120px。眯眼看应主导全屏。 |
| **Argument** | Answer 的支撑上下文。Inter body/`--text-primary`。紧贴 Answer 下方。 |
| **Evidence** | 元数据/技术参数/来源。JetBrains Mono/`--text-secondary` 以下，ALL CAPS。推到边缘放置。 |

---

## 2d. 页面级场景

### Page 1: Hero — 学习体系总览

- **场景主题**: 系统之门。从 CLI 到工作流的完整俯瞰。
- **签名构图**: Full-bleed 暗底色 Hero（唯一一次违反表面色——暗背景标记"打破规则"）。左侧超大文字，右侧点阵 H 装饰。
- **Hero dominance**: 120px Playfair Display 300。正文 14px Inter。8.5:1 比值。
- **Restraint**: 不展示任何组件名。不给导航。不给"了解更多"。就让一句话和点阵占据空间。
- **材料**: Hero 背景下沉底色（`--scene-bg`重版 + text-display），模拟 Nolan 开场字幕卡。
- **字体主题**: Display dominant。Playfair Display 300 独白。

### Page 2: 七大核心组件

- **场景主题**: 工具库。Claude Code 的装备墙。
- **签名构图**: Archive Wall — 左上到右下螺旋展开 7 个组件卡片。每个卡片用场景色左边框标识频率层级。
- **Hero dominance**: "七大组件" 96px Playfair Display。下方 3 列 grid。
- **Restraint**: 不展示所有组件细节。只给名称、一句描述、使用频率（天天/经常/有时/偶尔/很少）。不看说明书就认识工具。
- **材料**: 白色表面卡。`--surface` 背景，`--border-visible` 左边框。
- **字体主题**: Display (组件名) → Body (描述) → Mono (频率标签)。三层金字塔在此页物理可见。

### Page 3: 透明工作流

- **场景主题**: 时间机器。5 步，每步一屏，Nolan 式推进。
- **签名构图**: Corridor — 水平推进，每屏一个步骤。左侧表示意（SVG 流程图），右侧解释。
- **Hero dominance**: 步骤编号 48px Playfair Display + 步骤名。同时是 Answer。
- **Restraint**: 每步只给 1 个句子 + 1 个图示。不给多余示例。Nolan 不会在第一步解释第十步。
- **材料**: 每步背景交替 `--bg` / `--surface-raised`，模拟时间跳跃。
- **字体主题**: Mono 主导。JetBrains Mono 500 的 0.06em 标签标注步骤名，Inter 给出解释。

### Page 4: 个性化升级 + 架构

- **场景主题**: 控制中心。系统如何适配你。
- **签名构图**: Split — 左 60% CLAUDE.md 分层示意图，右 40% Hooks 自动化列表。
- **Hero dominance**: "体系适配" 96px。下方 split 展示架构和自动化。
- **Restraint**: 不列所有 hook。只展示 status-bar.js + transparent-thinking 两个关键钩子。
- **材料**: 代码风格展示 — 文件树用 Mono 字体、`--space-sm` 缩进模拟目录结构。Nolan 喜欢显示系统内部运作。
- **字体主题**: Mono 主导。文件路径、hook 名全部 Mono。

### Page 5: 学习路径 + 掌握指标

- **场景主题**: 终点即起点。学习路径闭环。
- **签名构图**: Corridor（纵向）+ Metric Grid。上方纵向 5 步学习路径，下方 4 个掌握指标。
- **Hero dominance**: "掌握" 96px。下方是镜像路径。
- **Restraint**: 指标不配图，纯数字 + Mono 标签。Nolan 会让数字自己说话。
- **材料**: Dot-matrix 装饰数字，Doto 字体。
- **字体主题**: Display (掌握) → Body (路径描述) → Mono (指标值)。三层金字塔再次物理可见。

---

## 2e. 反趋同检查

| 检查项 | 结果 |
|--------|------|
| 节拍序列是否匹配导演模板 | ✅ Nolan Default Arc: B1→B9→B14→B10→B16→B21→B22 |
| 节拍数量是否在导演典型范围 | ✅ 7 拍，Nolan 范围 5-7 |
| 每段是否有镜头参考和互动参考 | ✅ 见各页面级场景 |
| 至少 2 个 section 在结构上异于默认营销布局 | ✅ Page 2 Archive Wall 螺旋布局、Page 3 每步一屏 corridor |
| 首页和内页不重用相同 shell | ✅ 每页签名构图不同（Hero full-bleed / Archive Wall / Corridor / Split / Metric Grid） |
| 相同功能在不同页使用不同原型 | ✅ Data 类：Page 2 用 grid，Page 5 用 metric 列表 |
| 禁止节拍未使用 | ✅ B6/B12/B17 未使用 |

---

## 2f. 叙事节拍映射

| # | 页面 | 节拍 | 功能 | 构图 |
|---|------|------|------|------|
| 1 | Hero | B1 Cold Open | Hero #26 Data Punch | Full-bleed 暗底 + 点阵 |
| 2 | 七大组件 | B9 Data Bombardment | Data Dashboard #11 / Stats #24 | Archive Wall grid |
| 3 | 工作流 | B14 Pivot → B10 Deep Dive | Process/Steps #8 → Scroll Story #41 | Corridor 每步一屏 |
| 4 | 个性化 | B16 Authority | About/Mission #47 + Stats #24 | Split 60/40 |
| 5 | 学习路径 | B21 Mission → B22 Farewell | Newsletter CTA #32 → Footer #48 | Vertical Corridor + Metric Grid |
