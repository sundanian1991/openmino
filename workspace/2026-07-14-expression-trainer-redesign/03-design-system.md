# 03 - 设计系统规范

> 语音表达与文档工作站 · 设计系统
> 版本：v1.0 · 日期：2026-07-14 · 定位：自用工具

---

## 目录

1. [设计理念](#1-设计理念)
2. [配色系统](#2-配色系统)
3. [字体系统](#3-字体系统)
4. [间距系统](#4-间距系统)
5. [圆角系统](#5-圆角系统)
6. [阴影系统](#6-阴影系统)
7. [组件规范](#7-组件规范)
8. [动画规范](#8-动画规范)
9. [技术选型](#9-技术选型)

---

## 1. 设计理念

### 1.1 核心比喻：手工陶器工作室

这个应用应该让人感觉像走进一间**手工陶器工作室**，而不是一台工业机器。

| 工业软件（反例） | 陶器工作室（本产品） |
|----------------|-------------------|
| 冷硬的蓝灰色、高对比 | 暖米白底、陶土橙点缀 |
| 锐利的直角、密集信息 | 柔和圆角、留白充足 |
| 一切精确、机械、冷 | 有质感、有温度、专注 |
| 强调效率与功能堆叠 | 强调"做一件事，做好它" |

### 1.2 三个设计关键词

1. **温暖（Warm）**：配色用暖色系（米白、陶土、琥珀），避免冷蓝灰。让长时间使用不冰冷。
2. **专注（Focused）**：大量留白，一次只突出一个核心动作（录制）。不堆砌功能入口。
3. **有质感（Tactile）**：克制的阴影、柔和的圆角、考究的字距，传递"手工打磨过"的精致感，而非系统默认 UI 的廉价感。

### 1.3 设计判断准则

做任何设计决定时问三个问题：
- 它**温暖**吗？（配色、文字语气）
- 它让人**专注**吗？（有没有抢走对核心动作的注意力）
- 它**有质感**吗？（间距、圆角、对齐是否考究）

三个都肯定才采用。任何一个否定就回炉。

---

## 2. 配色系统

### 2.1 中性色（基底）

| Token | HEX | RGB | 用途 |
|-------|-----|-----|------|
| `--bg-page` | `#FAF9F7` | rgb(250, 249, 247) | 页面背景。暖米白，整个应用的底色 |
| `--bg-card` | `#FFFEFC` | rgb(255, 254, 252) | 卡片背景。比页面略亮，制造层次 |
| `--text-primary` | `#2C2825` | rgb(44, 40, 37) | 文字主色。正文、标题，暖墨黑（非纯黑，避免刺眼） |
| `--text-secondary` | `#5A5450` | rgb(90, 84, 80) | 次要文字。副标题、说明文字 |
| `--text-tertiary` | `#8A8480` | rgb(138, 132, 128) | 辅助文字。时间戳、元信息、表头 |
| `--text-placeholder` | `#B0AAA6` | rgb(176, 170, 166) | 占位文字。输入框 placeholder、partial 字幕 |
| `--border` | `#E8E3DE` | rgb(232, 227, 222) | 分割线、卡片边框、输入框边 |

### 2.2 品牌色

| Token | HEX | RGB | 用途 |
|-------|-----|-----|------|
| `--primary` | `#C4956A` | rgb(196, 149, 106) | 主色。陶土橙。录制按钮、主 CTA、激活态、Tab 指示器 |
| `--primary-hover` | `#B58557` | rgb(181, 133, 87) | 主色 hover。略深的陶土橙 |
| `--primary-active` | `#A0734A` | rgb(160, 115, 74) | 主色 active（按下）。更深 |
| `--primary-soft` | `#F0E4D6` | rgb(240, 228, 214) | 主色低透明替代。选中态背景、徽章底色（用实色而非 rgba 保证一致） |
| `--secondary` | `#7A9E7E` | rgb(122, 158, 126) | 辅助色。鼠尾草绿。成功、有力表达、次要强调 |
| `--secondary-soft` | `#E3EDE4` | rgb(227, 237, 228) | 辅助色低透明替代。成功徽章底色 |

### 2.3 语义色（词库高亮）

这组颜色专门用于字幕和报告里的词库标注。每种对应一类表达问题或亮点，色相明确可辨。

| Token | HEX | RGB | 用途 | 高亮方式 |
|-------|-----|-----|------|---------|
| `--lex-filler` | `#D4847A` | rgb(212, 132, 122) | 填充词（嗯/啊/那个）。珊瑚红 | 文字底色，低透明 |
| `--lex-hedge` | `#E0A86B` | rgb(224, 168, 107) | 犹豫词（可能/大概）。暖琥珀 | 文字底色，低透明 |
| `--lex-vague` | `#D4B860` | rgb(212, 184, 96) | 笼统词（很好/不错）。沙金 | 文字底色，低透明 |
| `--lex-strong` | `#7A9E7E` | rgb(122, 158, 126) | 有力表达。鼠尾草绿（同 secondary） | 文字底色，低透明 |

**高亮背景的低透明实现**（实色方案，跨平台一致）：

| 词类 | 背景色（inline 高亮块） |
|------|----------------------|
| 填充词 | `#F5DCD8` |
| 犹豫词 | `#F7E8D2` |
| 笼统词 | `#F4ECCB` |
| 有力表达 | `#E3EDE4` |

（即对应语义色的极浅版本，保证文字本身仍清晰可读。）

### 2.4 状态色

| Token | HEX | RGB | 用途 |
|-------|-----|-----|------|
| `--success` | `#7A9E7E` | rgb(122, 158, 126) | 成功（同 secondary） |
| `--warning` | `#E0A86B` | rgb(224, 168, 107) | 警告（同 lex-hedge） |
| `--danger` | `#D4847A` | rgb(212, 132, 122) | 错误/危险（同 lex-filler） |
| `--info` | `#8A8480` | rgb(138, 132, 128) | 信息提示（中性灰） |

> 设计决策：状态色复用词库色，而非引入新的红绿黄蓝。这让整个应用色域收敛，维持"陶器工作室"的统一调性，避免变成花花绿绿的后台系统。珊瑚红替代警示红，鼠尾草绿替代成功绿，更柔和。

### 2.5 REC 录制色

录制中的 `● REC` 指示使用珊瑚红（`#D4847A`），而非传统鲜红。维持整体温润感，但仍足够醒目。

### 2.6 CSS 变量定义

所有颜色在 `:root` 定义为 CSS 变量，Tailwind config 通过 `var()` 引用：

```css
:root {
  --bg-page: #FAF9F7;
  --bg-card: #FFFEFC;
  --text-primary: #2C2825;
  /* ... 其余同上表 ... */
}
```

---

## 3. 字体系统

### 3.1 字体族

```css
font-family: -apple-system, "PingFang SC", "Inter", "Helvetica Neue", sans-serif;
```

| 顺序 | 字体 | 作用 |
|------|------|------|
| 1 | `-apple-system` | macOS 系统字体（英文、数字），原生感 |
| 2 | `"PingFang SC"` | macOS 中文字体，与系统英文搭配协调 |
| 3 | `"Inter"` | 跨平台英文 fallback（Windows/Linux） |
| 4 | `"Helvetica Neue"` | 进一步 fallback |
| 5 | `sans-serif` | 兜底 |

**等宽字体（用于代码/数据）：** `"SF Mono", "JetBrains Mono", "Consolas", monospace`。

### 3.2 字号阶（Type Scale）

基于 `rem`（1rem = 16px）。比例约 1.2（Major Third），但为字幕保留一个超大档。

| Token | rem | px (16基准) | 用途 |
|-------|-----|------------|------|
| `text-xs` | 0.75 | 12px | 标签内文字、徽章、极次要信息 |
| `text-sm` | 0.875 | 14px | 辅助文字、表头、tooltip、副标题说明 |
| `text-base` | 1 | 16px | 正文（段落、列表项） |
| `text-lg` | 1.125 | 18px | 强调正文、卡片标题 |
| `text-xl` | 1.25 | 20px | 小标题、按钮文字 |
| `text-2xl` | 1.5 | 24px | 区块标题 |
| `text-3xl` | 2 | 32px | 页面/模式标题 |
| `text-4xl` | 2.5 | 40px | 大标题（idle 模式名） |
| `text-subtitle` | 3.5 | 56px | **字幕专用**。录制中的实时字幕，最大且最醒目 |

### 3.3 字重

| Token | 数值 | 用途 |
|-------|------|------|
| `font-normal` | 400 | 正文 |
| `font-medium` | 500 | 次级强调、按钮、表头 |
| `font-semibold` | 600 | 卡片标题、小标题 |
| `font-bold` | 700 | 页面标题、强调数字、模式名 |

> 不用 800/900 超粗。陶器风格追求沉稳，不是冲击。

### 3.4 行高

| Token | 数值 | 用途 |
|-------|------|------|
| `leading-tight` | 1.3 | 标题（text-2xl 及以上） |
| `leading-normal` | 1.5 | 正文、列表 |
| `leading-relaxed` | 1.7 | 较长段落、说明文字 |
| `leading-subtitle` | 1.8 | **字幕专用**。大字号需要更松的行距，避免挤迫 |

### 3.5 字间距

| Token | 数值 | 用途 |
|-------|------|------|
| `tracking-tighter` | -0.02em | 大标题（text-3xl/4xl），收紧避免松散 |
| `tracking-normal` | 0 | 正文（默认） |
| `tracking-wide` | 0.025em | 全大写标签、徽章（如 REC、TAG） |
| `tracking-wide-cn` | 0.05em | 纯中文短标签（2-4 字），略微透气 |

---

## 4. 间距系统

基于 **4px 基线网格**。所有间距是 4 的倍数，保证对齐一致。

| Token | rem | px | 用途 |
|-------|-----|----|------|
| `space-1` | 0.25 | 4 | 最小间距。图标与文字间距、紧凑列表项内距 |
| `space-2` | 0.5 | 8 | 小间距。标签内边距、相邻小元素间距、按钮内图标间距 |
| `space-3` | 0.75 | 12 | 紧凑卡片内边距、表单项间距 |
| `space-4` | 1 | 16 | **基准间距**。按钮内边距、卡片内边距、列表项间距、段落间距 |
| `space-6` | 1.5 | 24 | 区块内间距。卡片之间、表单字段组之间、Tab 栏与内容之间 |
| `space-8` | 2 | 32 | 大区块间距。页面左右内边距、主要区块之间 |
| `space-12` | 3 | 48 | 页面级垂直分隔。idle 状态各元素之间 |
| `space-16` | 4 | 64 | 最大间距。页面顶部到首屏内容、大留白区 |

**使用规则：**
- 优先使用 token，不用硬编码 px。
- 相邻同质元素（如列表项）用 `space-2` 或 `space-4`。
- 不同质区块之间用 `space-6` 或 `space-8`。
- 页面级呼吸感靠 `space-12` / `space-16`。

---

## 5. 圆角系统

| Token | px | 用途 |
|-------|----|------|
| `radius-sm` | 8 | 小元素：标签、Tag、小按钮、徽章、复选框 |
| `radius-md` | 12 | 中元素：卡片、输入框、下拉框、普通按钮、统计条 |
| `radius-lg` | 16 | 大元素：面板、侧栏、模态内卡片、三栏对比的栏 |
| `radius-xl` | 24 | 最大：模态弹窗、全屏抽屉、录制按钮（圆形用 50%，但大模态用此） |
| `radius-full` | 9999 | 圆形：录制按钮、头像、圆点指示器、胶囊标签 |

**设计意图：** 不用直角（冷硬），也不用超大圆角（幼态）。8-16px 的圆角传递"温润但专业"。录制按钮是唯一的全圆，作为视觉焦点。

---

## 6. 阴影系统

阴影统一用 `rgba(44, 40, 37, ...)`（基于主文字色），让阴影带暖调，而非冷灰。

| Token | 值 | 用途 |
|-------|----|------|
| `shadow-sm` | `0 1px 3px rgba(44,40,37,0.06)` | 卡片静态态、输入框、分割浮层 |
| `shadow-md` | `0 4px 12px rgba(44,40,37,0.08)` | 卡片 hover、下拉菜单、toast、悬浮按钮 |
| `shadow-lg` | `0 8px 24px rgba(44,40,37,0.10)` | 模态弹窗、抽屉、录制按钮（idle 态，强化焦点） |
| `shadow-recording` | `0 0 0 0 rgba(212,132,122,0.5)` → 扩散 | 录制按钮的脉冲光环（动画，见动画规范） |

**阴影原则：**
- 默认用 `shadow-sm`，克制。不要所有东西都浮起来。
- hover 才升级到 `shadow-md`，制造"可交互"的暗示。
- `shadow-lg` 只给真正需要聚焦的浮层（模态、录制按钮）。
- 不用 `text-shadow`（字幕靠字号和颜色对比，不加阴影）。

---

## 7. 组件规范

### 7.1 按钮

四种类型 × 四种状态。

#### Primary（主按钮）
- 用途：核心 CTA（录制、保存、导出）。
- 背景：`--primary` (#C4956A)，文字：白色 (#FFFEFC)。
- 内边距：`12px 24px`，圆角 `radius-md` (12px)，字号 `text-base`，字重 `font-medium`。
- shadow-sm。
- **normal**：上述。
- **hover**：背景 → `--primary-hover` (#B58557)，shadow-md，过渡 150ms。
- **active**：背景 → `--primary-active` (#A0734A)，scale(0.98)，150ms。
- **disabled**：背景 → `--border` (#E8E3DE)，文字 → `--text-placeholder`，cursor not-allowed，无 shadow。

#### Secondary（次按钮）
- 用途：次要操作（再录一次、取消）。
- 背景：`--bg-card` (#FFFEFC)，文字：`--text-primary`，边框：1px `--border`。
- 其余尺寸同 primary。
- **hover**：背景 → `--primary-soft` (#F0E4D6)，边框 → `--primary`，文字不变深。
- **active**：背景更深一档，scale(0.98)。
- **disabled**：同 primary disabled 逻辑。

#### Ghost（幽灵按钮）
- 用途：工具栏图标按钮、低优先操作（展开/收起）。
- 背景：透明，文字：`--text-secondary`，无边框。
- 内边距：`8px 12px`（更紧凑）。
- **hover**：背景 → `--primary-soft` 低透明（#F7F0E8），文字 → `--text-primary`。
- **active**：背景略深，scale(0.97)。
- **disabled**：文字 → `--text-placeholder`，不可 hover。

#### Danger（危险按钮）
- 用途：删除、丢弃当前录制。
- 背景：`--danger` (#D4847A)，文字：白色。
- 尺寸同 primary。
- **hover**：背景 → `#C27368`（略深珊瑚红）。
- **active**：scale(0.98)。
- **disabled**：同 primary disabled。

### 7.2 录制按钮（特殊组件）

这是应用的视觉核心，三态：

#### idle 态
- 圆形，直径 120px，`radius-full`。
- 背景：`--primary` (#C4956A)，中心白色 ▶ 图标（32px）。
- shadow-lg（`0 8px 24px rgba(44,40,37,0.10)`），略大，强调焦点。
- **hover**：scale(1.03)，shadow 加深，250ms ease-out。
- **active**：scale(0.97)，150ms。

#### recording 态（脉冲）
- 直径不变，背景不变。
- 中心图标 ▶ → 白色方块（停止符号，24px），150ms 变形。
- **脉冲光环**（2 个错峰扩散）：
  - 每个光环：从按钮边缘 scale(1.0) → scale(1.4)，opacity 0.6 → 0。
  - 周期 2s，无限循环。
  - 光环色：`rgba(212,132,122,0.5)`（珊瑚红）。
  - 两个光环错开 1s 启动，形成连续涟漪。
- **按钮本体呼吸**：scale(1.0) → (1.05) → (1.0)，2s，与光环同步。

#### processing 态
- 直径不变。
- 中心图标 → 圆形加载（边框 3px，上半圈 `--primary`，下半圈透明，旋转 800ms/圈）。

### 7.3 卡片

- 背景：`--bg-card` (#FFFEFC)。
- 圆角：`radius-md` (12px)。
- 边框：1px `--border` (#E8E3DE)。
- shadow-sm。
- 内边距：`space-4` (16px) 至 `space-6` (24px)，视内容密度。
- **hover**（若可交互）：shadow-md，边框色 → `--primary`，200ms。

变体：
- **统计条卡片**：横向，高 64px，内含 4 个统计数字，等分。数字下方加 0.875rem 标签。
- **反馈卡片**（训练模式右栏）：标题 + 流式文字，内边距 `space-6`，最大高 100% 可滚动。
- **变更说明卡片**（报告模式右栏每条）：类型标签 + 三段（原文/改后/原因），内边距 `space-4`，条目间距 `space-3`。

### 7.4 标签 / Tag

#### 类型标签（变更说明用）
- 胶囊形（`radius-full`），内边距 `4px 12px`。
- 字号 `text-xs` (0.75rem)，字重 `font-medium`，字间距 `tracking-wide`。
- 五种类型对应五种配色（背景用 soft 版，文字用主色）：

| 类型 | 背景 | 文字 |
|------|------|------|
| 结构化 | `--primary-soft` (#F0E4D6) | `--primary` (#C4956A) |
| 删冗余 | `#F5DCD8` | `--lex-filler` (#D4847A) |
| 规范用语 | `--secondary-soft` (#E3EDE4) | `--secondary` (#7A9E7E) |
| 清晰化 | `#F7E8D2` | `--lex-hedge` (#E0A86B) |
| 去填充 | `#F4ECCB` | `--lex-vague` (#D4B860) |

#### 状态徽章
- REC 指示：珊瑚红圆点（8px）+ 「REC」字样，`tracking-wide`。闪烁动画（见动画规范）。
- AI 状态：绿/灰圆点 + 文字（云端/本地）。

### 7.5 输入框

- 背景：`--bg-card`。
- 边框：1px `--border`。
- 圆角：`radius-md` (12px)。
- 内边距：`10px 16px`。
- 字号 `text-base`，字色 `--text-primary`。
- placeholder：`--text-placeholder` (#B0AAA6)。
- **focus**：边框 → `--primary` (1.5px)，外发光 `0 0 0 3px rgba(196,149,106,0.15)`，150ms。
- **disabled**：背景 → `--bg-page`，文字 → `--text-tertiary`。
- **error**：边框 → `--danger`，外发光用 `rgba(212,132,122,0.15)`。

### 7.6 面板（侧栏）

- 左右栏背景：`--bg-card`。
- 边框：仅靠内容区一侧 1px `--border`（如右栏左边框）。
- 无圆角（贴边），或仅外侧 `radius-lg`。
- 内边距：`space-6` (24px)。
- 标题区：`text-lg` + `font-semibold`，下方 1px 分割线 `--border`。
- 内容区可滚动，自定义滚动条（细，8px，滑块 `--border`，hover 变 `--text-tertiary`）。

### 7.7 Tab 栏

- 水平排列，每个 Tab：内边距 `10px 20px`，字号 `text-base`，字重未激活 `font-medium`、激活 `font-semibold`。
- 未激活：文字 `--text-secondary`。
- 激活：文字 `--text-primary`，下方有 3px 圆角下划线指示器（`--primary`，`radius-full`）。
- 指示器位置切换：横向滑动 250ms ease-out（用 layout animation）。
- 禁用（后续模式）：文字 `--text-placeholder`，cursor not-allowed，hover tooltip「即将推出」。
- hover（可激活）：文字 → `--text-primary`，背景 → `--primary-soft`（圆角 `radius-md`），150ms。

### 7.8 统计条

- 横向卡片，4 等分，高 64px。
- 每格：上方数字（`text-2xl` / 1.5rem，`font-semibold`），下方标签（`text-xs` / 0.75rem，`--text-tertiary`）。
- 数字颜色按类型：填充词=珊瑚红、犹豫词=暖琥珀、笼统词=沙金、有力表达=鼠尾草绿。
- 数字变化：滚动动画（旧上滑出 + 新下滑入，300ms）。
- 格之间用 1px `--border` 竖线分隔。

### 7.9 字幕显示区

- 容器：居中，最大宽 720px（训练）/ 880px（报告），垂直滚动。
- 字幕文字：`text-subtitle` (3.5rem / 56px)，`leading-subtitle` (1.8)，`font-normal`，`tracking-tighter`。
- 颜色：
  - partial：`--text-placeholder` (#B0AAA6)。
  - final：`--text-primary` (#2C2825)。
- 词库高亮（仅训练模式 annotated）：inline 背景色块（见 2.3），文字色不变（仍 `--text-primary`），高亮块上下加 2px padding，圆角 `radius-sm`。
- 新段落进入：淡入 + translateY(4px→0)，200ms。
- 对齐：居中（text-align center）或左对齐（长文本时），可配。

### 7.10 报告展示区（训练结果）

- 雷达图：SVG，6 边形，网格线 `--border`，得分区域填充 `rgba(196,149,106,0.25)`，边线 `--primary`。
- 中心综合分：`text-3xl` (2rem)，`font-bold`，`--text-primary`。
- 维度标签：围绕雷达图，`text-sm`，`--text-secondary`。
- 优势列表：`✓` 前缀（`--secondary` 绿），`text-base`，行高 1.7。
- 改进列表：`△` 前缀（`--lex-hedge` 琥珀），`text-base`，行高 1.7，每条可展开看具体词。
- 原文回顾：默认收起，展开后是带高亮的完整转录，`text-base`，`leading-normal`。

### 7.11 三栏对比视图（报告结果）

- 三栏等高，各自垂直滚动，滚动同步可选（点击联动时同步滚动）。
- 栏标题：`text-lg`，`font-semibold`，下方 1px 分割线。标题旁可放计数（如「[8 处]」）。
- 左栏（原文标注）：只读，`text-base`，`leading-normal`。被 changes 涉及的句子加背景块 `rgba(196,149,106,0.15)`，左侧加 3px 陶土橙竖条。
- 中栏（正式文档）：Markdown 渲染，可编辑。编辑态：背景 → `--bg-page`，出现细边框。标题用对应 Markdown 层级（h1/h2/h3）。
- 右栏（变更说明）：编号列表，每条一个子卡片（见 7.3 变更说明卡片）。编号用带圈数字（①②③），`--text-tertiary`。
- 联动高亮：三栏中被选中的对应内容背景块加深为 `rgba(196,149,106,0.25)`，200ms 淡入。
- 底部总结条：全宽浅色卡片（背景 `--bg-card`，边框 `--border`），`text-sm`，`--text-secondary`，内边距 `space-4`。

---

## 8. 动画规范

### 8.1 时长

| Token | ms | 用途 |
|-------|----|------|
| `duration-fast` | 150 | 即时反馈：hover、active、颜色变化、小元素显隐 |
| `duration-normal` | 250 | 标准过渡：模式切换、面板展开、Tab 指示器移动、卡片显隐 |
| `duration-slow` | 400 | 大区域过渡：内容区整体切换、联动滚动定位 |

### 8.2 缓动函数

| Token | 值 | 用途 |
|-------|----|------|
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | **默认**。元素进入：快速出现，缓缓停。绝大多数过渡 |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | 双向过渡：位置移动、滑动 |
| `ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | 元素退出：缓缓启动再快速消失（少用） |
| `linear` | `linear` | 持续循环：加载旋转、进度条 |

> 设计决策：以 ease-out 为主。陶器风格追求"自然停落"的感觉，而非弹跳（spring）或机械（linear）。

### 8.3 具体动效规格

#### 录制按钮脉冲（recording 态）
- 光环：scale 1.0 → 1.4，opacity 0.6 → 0，周期 2s，`ease-out`，无限循环。两个光环错峰 1s。
- 按钮呼吸：scale 1.0 → 1.05 → 1.0，周期 2s，`ease-in-out`，与光环同步。
- REC 红点：opacity 1 → 0.3 → 1，周期 1s，`ease-in-out`。

#### 字幕淡入
- 新 final 段落：`opacity 0 → 1` + `translateY(4px → 0)`，200ms，`ease-out`。
- partial → final 颜色：`color` 过渡 150ms `ease-out`（灰 → 主色）。

#### 数字滚动（统计条）
- 旧数字：`opacity 1 → 0` + `translateY(0 → -8px)`，300ms，`ease-out`。
- 新数字：`opacity 0 → 1` + `translateY(8px → 0)`，300ms，`ease-out`（同时进行）。
- 数字瞬时高亮：变化瞬间文字色加深一档，150ms 回正。

#### 模式切换
- 旧内容：`opacity 1 → 0` + `translateX(0 → -24px)`，150ms，`ease-in`。
- 新内容：`opacity 0 → 1` + `translateX(24px → 0)`，250ms，`ease-out`。
- Tab 指示器：横向滑动到新位置，250ms，`ease-out`（用 Framer Motion `layoutId`）。

#### 三栏联动高亮
- 选中：背景块 `opacity 0 → 1`，200ms，`ease-out`。
- 取消：背景块 `opacity 1 → 0`，150ms。
- 自动滚动：`scrollIntoView({ behavior: 'smooth' })`，400ms。

#### Toast
- 出现：`opacity 0 → 1` + `translateY(-12px → 0)`，250ms，`ease-out`。
- 消失：`opacity 1 → 0` + `translateY(0 → -12px)`，200ms，`ease-in`。4 秒后自动消失。

#### 卡片 hover
- shadow：`shadow-sm → shadow-md`，200ms，`ease-out`。
- 边框色：`--border → --primary`，200ms。

#### 加载骨架屏
- 背景脉动：`opacity 0.6 → 1 → 0.6`，周期 1.5s，`ease-in-out`，无限循环。

#### 音量电平
- 高度：实时映射音量，无过渡（直接更新），保证响应。
- 颜色阈值：绿（正常）/ 琥珀（偏大）/ 珊瑚红（爆音）。

### 8.4 可访问性

```css
@media (prefers-reduced-motion: reduce) {
  *: {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

设置面板提供「减少动效」开关，等效上述。脉冲、滚动等强动效降级为瞬时切换。

---

## 9. 技术选型

### 9.1 技术栈与职责

| 技术 | 角色 | 为什么 |
|------|------|--------|
| **Radix UI** | 无样式行为组件（Dialog、Tooltip、Tabs、DropdownMenu 等的可访问性、焦点管理、键盘交互） | 只管行为不管样式，正好配合自定义设计系统。避免组件库自带样式覆盖我们的陶器风格 |
| **Tailwind CSS** | 样式实现（utility-first） | 设计 token 通过 config 注入，class 直接用 `bg-bg-card` `text-text-primary`，开发快且一致 |
| **Framer Motion** | 动画（脉冲、滚动数字、模式切换、联动高亮） | 声明式动画 + `layoutId` 做 Tab 指示器/联动，比手写 CSS 动画可靠 |

### 9.2 设计 Token 管理架构

三层管理，确保单一真相源：

```
┌─────────────────────────────────────────┐
│  Layer 1: CSS Variables (tailwind.css)   │
│  :root { --primary: #C4956A; ... }       │  ← 单一真相源
└──────────────────┬──────────────────────┘
                   │ 引用
┌──────────────────┴──────────────────────┐
│  Layer 2: Tailwind Config (tailwind.config.ts)│
│  colors: { primary: 'var(--primary)' }   │  ← 语义化命名
│  borderRadius: { md: '12px' }            │
│  spacing: { 1: '0.25rem' }               │
└──────────────────┬──────────────────────┘
                   │ 生成 utility class
┌──────────────────┴──────────────────────┐
│  Layer 3: 组件中使用                      │
│  <button className="bg-primary ...">     │  ← 开发者直接用
└─────────────────────────────────────────┘
```

**为什么 CSS 变量做真相源：**
- 未来要做暗色模式（虽然 MVP 浅色），只需覆盖 `:root` 变量，组件代码零改动。
- 运行时可动态调整（如用户自定义主色），无需重新构建。

### 9.3 Tailwind Config 关键配置（示意）

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // 中性
        'bg-page': 'var(--bg-page)',
        'bg-card': 'var(--bg-card)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-placeholder': 'var(--text-placeholder)',
        border: 'var(--border)',
        // 品牌
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          soft: 'var(--primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          soft: 'var(--secondary-soft)',
        },
        // 词库语义
        lex: {
          filler: 'var(--lex-filler)',
          hedge: 'var(--lex-hedge)',
          vague: 'var(--lex-vague)',
          strong: 'var(--lex-strong)',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        // 4px 网格已在 Tailwind 默认（1=0.25rem），此处补充大档
        12: '3rem',   // 48px
        16: '4rem',   // 64px
      },
      fontSize: {
        subtitle: ['3.5rem', { lineHeight: '1.8' }],  // 字幕专用
      },
      boxShadow: {
        sm: '0 1px 3px rgba(44,40,37,0.06)',
        md: '0 4px 12px rgba(44,40,37,0.08)',
        lg: '0 8px 24px rgba(44,40,37,0.10)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
}
```

### 9.4 Framer Motion 使用约定

- 复杂动画（脉冲、联动、模式切换）用 Framer Motion 的 `motion.*` + `variants`。
- 简单 hover/transition 用 Tailwind class（`transition-all duration-fast ease-out`）即可，不滥用 Framer。
- Tab 指示器、三栏联动高亮用 `layoutId` 实现自动过渡。

---

## 附录：设计 Token 速查卡

| 类别 | Token 数 | 关键代表 |
|------|---------|---------|
| 中性色 | 7 | bg-page #FAF9F7, text-primary #2C2825 |
| 品牌色 | 6 | primary #C4956A, secondary #7A9E7E |
| 词库语义色 | 4 (+4 soft) | filler #D4847A, strong #7A9E7E |
| 字号 | 9 | base 1rem, subtitle 3.5rem |
| 字重 | 4 | normal 400, bold 700 |
| 行高 | 4 | normal 1.5, subtitle 1.8 |
| 间距 | 8 | 4/8/12/16/24/32/48/64 px |
| 圆角 | 5 | sm 8, md 12, lg 16, xl 24, full |
| 阴影 | 4 | sm, md, lg, recording |
| 动效时长 | 3 | fast 150, normal 250, slow 400 ms |

---

*文档结束。上一篇：02-interaction-flow.md · 本系列：01 产品架构 / 02 交互流程 / 03 设计系统*
