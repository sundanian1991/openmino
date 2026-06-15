# Polywise.io Landing Page — Design System Document

> 来源：https://polywise.io  
> 提取日期：2026-06-06  
> 用途：结构复刻 + 风格迁移参考（用户偏好 Light / 暖白灰橙主题）

---

## 1. 页面结构（Sitemap）

整站为单页长滚动 Landing Page，共 **9 个逻辑区块**：

| # | 区块 | 核心内容 | 布局特征 |
|---|------|----------|----------|
| 1 | **Header / Nav** | Logo + Docs / Download / Contact + Github CTA | 固定顶部，backdrop-blur，高度占位 |
| 2 | **Hero / Banner** | 大标题 "Capture with Polywise's Linkcase" + 副标题 + 双 CTA + Discord 社区入口 | 居中，全宽背景，主视觉图 |
| 3 | **What's Polywise?** | H2 "What's Polywise?" + H3 "An Evolving System, Not a Record" + 描述段落 | 窄栏居中，纯文本区 |
| 4 | **Why Polywise** | H2 "Why Polywise" + H3 "Grow when chat with agents" + 4 个 SVG 图标 | 图文混排，图标阵列 |
| 5 | **Pain Points** | H2 "Pain Points" + 3 张卡片（Stateless AI / Fragmented context / Cloud lock-in）| 三列卡片，每张含标题+描述+SVG 插图 |
| 6 | **Features** | H2 "Features" + H3 "Core capabilities..." + Posts 截图展示 + 3 个 SVG feature icons | 图文区块，Feature slot 列表 |
| 7 | **FAQ** | H2 "FAQ" + H3 "Questions about Polywise" + 10 条手风琴问答 | 单列，问答展开/收起 |
| 8 | **CTA Banner** | H1 "Shape Your Context, Keep It Yours." + H2 "Product" + 社区链接 | 深色/高对比横幅，底部转化区 |
| 9 | **Footer** | 链接分组（Docs / Download / Github）+ Copyright | 极简，链接行 |

---

## 2. Design Tokens

### 2.1 颜色系统（原始 Dark 默认）

原始站点默认 `data-theme="dark"`，以下为完整 Token 表：

#### 语义色（Semantic）

| Token | Dark 值 | Light 值 | 说明 |
|-------|---------|----------|------|
| `--color_std` | `black` | `white` | 标准色（用于阴影等）|
| `--color_contrast` | `white` | `black` | 对比色 |
| `--color_text` | `#f7f8f8` | `#000000` | 主文本 |
| `--color_text_sub` | `rgba(247,248,248,0.72)` | `#363636` | 次级文本 |
| `--color_text_sublight` | `rgba(247,248,248,0.6)` | `#666` | 弱次级文本 |
| `--color_text_grey` | `rgba(247,248,248,0.48)` | `#888` | 灰色文本 |
| `--color_text_greylight` | `rgba(247,248,248,0.4)` | `#9a9a9a` | 浅灰文本 |
| `--color_text_light` | `rgba(247,248,248,0.3)` | `#aaa` | 更浅文本（placeholder 等）|
| `--color_text_softlight` | `rgba(247,248,248,0.24)` | `#ccc` | 最浅文本 |
| `--color_text_line` | `#888` | `#666` | 线条/分割线文本色 |

#### 背景色（Background）

| Token | Dark 值 | Light 值 |
|-------|---------|----------|
| `--color_bg` | `#080a0a` | `#ffffff` |
| `--color_bg_1` | `#1c1c1f` | `#f9f9f9` |
| `--color_bg_2` | `#28282c` | `#f0f0f0` |

#### 边框色（Border）

| Token | Dark 值 | Light 值 |
|-------|---------|----------|
| `--color_border` | `#23252a` | `#e6e6e6` |
| `--color_border_light` | `rgba(255,255,255,0.072)` | `rgba(0,0,0,0.06)` |
| `--color_border_soft` | `rgba(255,255,255,0.048)` | `rgba(0,0,0,0.042)` |

#### 功能色（Functional）

| Token | 值 | 说明 |
|-------|-----|------|
| `--color_main` | `#ff0000` | 品牌主色（红）|
| `--color_warning` | `#ff8f00` | 警告 |
| `--color_success` | `#00c853` | 成功 |
| `--color_danger` | `#ff1744` | 危险/错误 |
| `--color_blue` | `#075cdd` | 链接/信息蓝 |
| `--color_blue_active` | `#3d87f5` | 激活态蓝 |

#### 背景模糊（Blur）

| Token | 值 |
|-------|-----|
| `--color_bg_blur` | `rgba(var(--color_bg_rgb), 0.48)` |
| `--blur` | `saturate(150%) blur(9px)` |
| `--blur_deep` | `saturate(150%) blur(24px)` |

#### 阴影系统（Shadow）

| Token | Dark 值 | Light 值 |
|-------|---------|----------|
| `--shadow` | `0 0 48px rgba(0,0,0,0.36)` | `0 0 30px rgba(0,0,0,0.072)` |
| `--shadow_left` | `-6px 6px 30px rgba(0,0,0,0.36)` | `-6px 6px 30px rgba(0,0,0,0.072)` |
| `--shadow_right` | `6px 0 30px rgba(0,0,0,0.36)` | `15px 0 30px rgba(0,0,0,0.072)` |
| `--shadow_top` | `0 6px 30px rgba(0,0,0,0.36)` | `0 0 30px rgba(0,0,0,0.072)` |
| `--shadow_card` | `0 1.5px 3px rgba(0,0,0,0.24)` | `0 1.5px 3px rgba(0,0,0,0.06)` |
| `--shadow_btn` | `0 0 24px rgba(0,0,0,0.9)` | `0 0 30px rgba(0,0,0,0.15)` |

### 2.2 字体系统（Typography）

| Token | 值 |
|-------|-----|
| `--font_family` | `"GoogleSans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif` |
| `--font_serif` | `Georgia, "Times New Roman", Times, serif` |
| `--font_mono` | `"GeistMono", monospace` |
| `--line_height` | `1.62` |
| `font-size` (base) | `14px` |

**字号层级（Tailwind 映射 + 自定义）**：

| 层级 | 类名 | 尺寸 | 行高 | 字重 | 用途 |
|------|------|------|------|------|------|
| Display | 自定义 H1 | ~48-64px | tight | 600-700 | Hero 主标题 |
| H2 | `.text-2xl` | `1.5rem` (21px) | `1.333` | 600 | 区块标题 |
| H3 | `.text-xl` | `1.25rem` (17.5px) | `1.4` | 500-600 | 区块副标题 |
| Body | base | `14px` | `1.62` | 400 | 正文 |
| Small | `.text-sm` | `0.875rem` (12.25px) | `1.428` | 400 | 辅助说明 |
| Caption | `.text-xs` | `0.75rem` (10.5px) | `1.333` | 400 | 标签、版权 |
| Mono | `.font-mono` | 继承 | 继承 | 400 | 代码、命令行 |

### 2.3 间距系统（Spacing）

| Token | 桌面端 | 移动端 (<=720px) | 说明 |
|-------|--------|------------------|------|
| `--limited_width` | `1120px` | `100%` | 最大内容宽 |
| `--limited_width_content` | `1024px` | `100%` | 内容区宽 |
| `--limited_width_small` | `870px` | `100%` | 窄内容区宽 |
| `--limited_padding` | `48px` | `18px` | 水平内边距 |
| `--editor_padding_y` | `1.2em` | — | 编辑器垂直内边距 |
| `--editor_padding_x` | `0` | — | 编辑器水平内边距 |

**区块间距特征**：
- 各 Section 之间使用 `section_wrap` + `limited_content_wrap` 约束
- 垂直间距未显式定义固定 token，实际通过 `padding-top/bottom` 或 `margin` 控制，目测约 **80-120px** 每区块
- Header 有 `header_placeholder` 占位，避免 fixed nav 遮挡内容

### 2.4 圆角系统（Radius）

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius` | `6px` | 标准卡片、按钮 |
| `--radius_small` | `4px` | 小元素 |
| `--radius_small_1` | `2px` | 极小元素 |
| `--radius_small_2` | `1px` | 标签、细线 |
| `--radius_large` | `12px` | 大卡片、模态框 |
| `--radius_large_1` | `18px` | 更大容器 |
| `--radius_large_2` | `24px` | 超大容器 |

### 2.5 边框样式（Border）

| Token | 值 |
|-------|-----|
| `--border` | `1px solid var(--color_border_light)` |
| `--border_dashed` | `1px dashed var(--color_border_light)` |
| `--border_light` | `1px solid var(--color_border_soft)` |
| `--border_light_dashed` | `1px dashed var(--color_border_soft)` |
| `--border_deep` | `1px solid var(--color_border)` |
| `--border_deep_dashed` | `1px dashed var(--color_border)` |

---

## 3. 布局系统（Layout）

### 3.1 容器模型

```
┌─────────────────────────────────────────────┐
│  Viewport (100vw)                           │
│  ┌─────────────────────────────────────┐    │
│  │  limited_width (max 1120px)         │    │
│  │  ┌─────────────────────────────┐    │    │
│  │  │ limited_width_content       │    │    │
│  │  │ (max 1024px)                │    │    │
│  │  │                             │    │    │
│  │  │  [实际内容区]                │    │    │
│  │  │                             │    │    │
│  │  └─────────────────────────────┘    │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
     ↑ limited_padding (48px / 18px)
```

### 3.2 响应式断点

| 断点 | 宽度 | 关键变化 |
|------|------|----------|
| 桌面大屏 | >1200px | `--limited_width_content: 1024px` |
| 桌面 | 720px-1200px | 标准布局 |
| 平板/手机横屏 | <=1200px | `--limited_width_content: 100%` |
| 手机 | <=720px | `--limited_width: 100%`, `--limited_padding: 18px`, `--dirtree_width: 0` |

### 3.3 Grid & Flex 模式

- **Nav**: `flex` 横向，Logo 左 | 链接中 | CTA 右
- **Hero**: 垂直堆叠 `flex-col`，内容居中
- **Pain Points**: `grid-cols-2` (原始) 或 3 列卡片
- **Features**: `flex` / `grid` 混排
- **FAQ**: 单列 `flex-col`
- **CTA Banner**: `flex` 横向，文字左 + 链接右

---

## 4. 组件规范（Components）

### 4.1 Header / Navigation

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo SVG]    Docs    Download    Contact          [Github]  │
│                                                    rounded   │
│  backdrop-blur-md / bg-opacity                               │
└──────────────────────────────────────────────────────────────┘
```

- **定位**: `fixed top-0`, 全宽
- **高度**: 约 56-64px（由 `header_placeholder` 占位）
- **背景**: 半透明 + `backdrop-blur-md`
- **Logo**: SVG，圆角矩形（`rx="72"`），使用 `--color_bg` 填充
- **Nav Item**: 文字链接，无下划线，`clickable` 类（悬停态）
- **CTA Button (Github)**: `rounded-full`, `btn_download` + `btn_light`, 带 Icon

**Nav Item 样式**：
- 文字：`--color_text`
- 悬停：继承色或 `--color_text_sub`
- 无 active indicator（无下划线/背景高亮）

### 4.2 Hero / Banner

```
┌────────────────────────────────────────────┐
│                                            │
│         npm i polywise -g                  │
│         [命令行样式 / Mono 字体]            │
│                                            │
│         Capture                            │
│         with Polywise's                    │
│         Linkcase                           │
│                                            │
│    The open source agentic content system. │
│    Capture content, shape context, and     │
│    run agents on top of it.                │
│                                            │
│    [Read the docs]  [Download release]     │
│                                            │
│    [Join the Discord discussion group]     │
│                                            │
│         [linkcase.png 产品截图]             │
│                                            │
└────────────────────────────────────────────┘
```

- **标题**: H1，大字号（~48-64px），`font-weight: 600/700`
- **副标题**: H2，次级色，`--color_text_sub`
- **命令行**: `.font-mono` 样式，类似 `npm i polywise -g`
- **CTA 组**:
  - 主按钮：`btn_app`，深色/实心
  - 次按钮：`btn_app`，浅色/边框
  - 每个按钮含标题 + 小字标签（如 "Document" / "Installs"）
- **社区链接**: 独立行，`opacity-60` -> `hover:opacity-100`
- **主视觉**: `linkcase.png` 产品界面截图，可能有阴影或边框

### 4.3 Section — 通用区块

所有内容区使用统一包裹：

```html
<section class="limited_content_wrap section_wrap">
  <!-- 内容 -->
</section>
```

- `section_wrap`: 控制垂直间距、可能的背景色切换
- `limited_content_wrap`: 约束最大宽度，水平居中，两侧 padding

### 4.4 What's Polywise — 介绍区

纯文本区块，结构极简：

```
┌────────────────────────────────────┐
│  What's Polywise?                  │
│  An Evolving System, Not a Record  │
│                                    │
│  [描述段落，约 2-3 行]              │
└────────────────────────────────────┘
```

- H2 + H3 紧密排列，H3 作为副标题
- 下方紧跟一段描述文字
- 无卡片、无图标、无背景色差异

### 4.5 Why Polywise — 价值主张区

```
┌────────────────────────────────────────────┐
│  Why Polywise                              │
│  Grow when chat with agents                │
│                                            │
│  [SVG 1]  [SVG 2]  [SVG 3]  [SVG 4]        │
│                                            │
└────────────────────────────────────────────┘
```

- 标题 + 副标题
- 下方 4 个 SVG 图标横向排列（可能为特性符号或品牌元素）
- 无文字标签（纯图标展示）

### 4.6 Pain Points — 痛点卡片

三列卡片布局：

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ [SVG 插图]  │  │ [SVG 插图]  │  │ [SVG 插图]  │
│             │  │             │  │             │
│ Stateless   │  │ Fragmented  │  │ Cloud       │
│ AI          │  │ context     │  │ lock-in     │
│             │  │             │  │             │
│ 描述文字...  │  │ 描述文字...  │  │ 描述文字...  │
└─────────────┘  └─────────────┘  └─────────────┘
```

- **卡片样式**:
  - 背景：`--color_bg_1` 或透明
  - 边框：可能使用 `--border` 或无边框
  - 圆角：`--radius` (6px) 或 `--radius_large` (12px)
  - 内边距：约 24-32px
- **插图**: SVG，位于卡片顶部，尺寸约 48-64px
- **标题**: H2 级别，卡片内标题
- **描述**: Body 文本，`--color_text_sub`

### 4.7 Features — 能力展示区

```
┌────────────────────────────────────────────┐
│  Features                                  │
│  Core capabilities for context,            │
│  retrieval, and execution                  │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │  [post.png 截图 / 产品界面展示]      │    │
│  └────────────────────────────────────┘    │
│                                            │
│  [Feature 1]  [Feature 2]  [Feature 3]     │
│                                            │
└────────────────────────────────────────────┘
```

- 标题区同通用 Section
- 大图展示：`post.png`，圆角，可能有阴影
- 底部 Feature slot：3 个特性项，每项含 SVG icon + 标题

### 4.8 FAQ — 手风琴问答

```
┌────────────────────────────────────────────┐
│  FAQ                                       │
│  Questions about Polywise                  │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │ Q: Polywise is the open source...  ▼ │    │
│  ├────────────────────────────────────┤    │
│  │ Q: You can save content...         ▼ │    │
│  ├────────────────────────────────────┤    │
│  │ Q: No. Writing is one use case...  ▼ │    │
│  └────────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

- **FAQ Item**:
  - 问题行：可点击展开
  - 答案区：展开后显示，`--color_text_sub`
  - 分隔线：可能使用 `--color_border_light`
  - 箭头/指示器：右侧 `▼` 或 chevron icon
- **交互**: 手风琴模式（一次展开一个，或允许多开）

### 4.9 CTA Banner — 底部转化条

```
┌──────────────────────────────────────────────────────────────┐
│  Shape Your Context,                                         │
│  Keep It Yours.                            [Product]         │
│                                                              │
│  [Discord] [Github] ...                                      │
└──────────────────────────────────────────────────────────────┘
```

- **背景**: `--color_bg_1` 或更深的 `--color_bg_2`
- **标题**: H1 级别，大字号，强调语气
- **右侧链接**: "Product" 等分类链接
- **底部**: 社区图标行（Discord / Github / 其他社交媒体）
- **社区 Icon**: `community_icon`, `community_link`，`opacity-60` -> `hover:opacity-100`

### 4.10 Footer

```
┌──────────────────────────────────────────────────────────────┐
│  Docs    Download    Github                                  │
│  © Polywise Inc.                                             │
└──────────────────────────────────────────────────────────────┘
```

- **布局**: 极简，水平链接行 + Copyright
- **链接样式**: `link_item` 类，无下划线
- **文字**: `.text-xs` 或更小，`--color_text_grey`

### 4.11 Button 变体

| 变体 | 类名 | 样式特征 | 用途 |
|------|------|----------|------|
| Primary | `btn_app` | 实心背景，圆角 | 主 CTA |
| Light | `btn_light` | 浅色/半透明背景 | 次 CTA |
| Download | `btn_download` | 圆角更大，带 Icon | Github 下载 |
| Menu | `btn_menu` | 小尺寸，移动端菜单 | 汉堡菜单 |
| Toggle | `btn_toggle` | 切换开关样式 | 主题切换 |

**按钮通用特征**：
- `clickable` 类：统一悬停态（可能有 `cursor: pointer` + 轻微透明度/缩放变化）
- 无粗边框，依赖背景色区分层级
- 圆角：`rounded-full` 用于 pill 形，`--radius` 用于矩形

---

## 5. 交互 & 动效

### 5.1 主题切换

- 支持 Light / Dark 双主题
- 切换方式：通过 `data-theme` 属性在 `<html>` 上切换
- 有过渡动画：`view-transition` API，动画时长 0.6s，`ease` 缓动，`clip-path` reveal 效果

```css
@keyframes reveal {
  from { clip-path: inset(var(--from)); }
}
::view-transition-new(root) {
  animation: reveal 0.6s ease;
}
```

### 5.2 滚动行为

- 隐藏滚动条：`::-webkit-scrollbar { width: 0; height: 0; }`
- 平滑滚动：默认浏览器行为

### 5.3 悬停态

| 元素 | 悬停效果 |
|------|----------|
| Nav Item | 颜色继承，可能微亮 |
| Link / Community Icon | `opacity: 0.6` -> `opacity: 1` |
| Button | 轻微亮度提升或阴影加深 |
| Card | 可能无变化，或轻微上浮 |

### 5.4 FAQ 展开

- 点击问题行 -> 答案区展开
- 可能有过渡动画：`height` 或 `max-height` 过渡
- 指示器旋转：chevron 从 `0deg` -> `180deg`

---

## 6. 用户偏好适配：Light / 暖白灰橙主题

用户明确表示排斥 Dark Mode，偏好 **Claude 博客暖白风格** 或 **贝恩灰橙(Bain-style)**。以下为基于原始结构、替换为用户偏好色的适配方案。

### 6.1 适配色板（建议）

| Token | 用户偏好值 | 来源 |
|-------|-----------|------|
| `--color_bg` | `#FAF8F5` | Claude 博客暖白背景 |
| `--color_bg_1` | `#FFF8F0` | 贝恩暖白 |
| `--color_bg_2` | `#F0EEEB` | 暖灰 |
| `--color_text` | `#1a1a1a` | 近黑主文本 |
| `--color_text_sub` | `#4a4a4a` | 深灰次级 |
| `--color_text_grey` | `#888888` | 中性灰 |
| `--color_main` | `#CC6B1E` | 用户指定暖橙主色 |
| `--color_border` | `#E6E2DE` | 暖灰边框 |
| `--color_border_light` | `rgba(0,0,0,0.06)` | 极浅边框 |

### 6.2 风格迁移要点

| 维度 | 原始 (Polywise) | 迁移后 (用户偏好) |
|------|----------------|-------------------|
| 背景 | 极深 `#080a0a` | 暖白 `#FAF8F5` |
| 主色 | 正红 `#ff0000` | 暖橙 `#CC6B1E` |
| 阴影 | 重、扩散、深色 | 轻、收敛、暖灰 |
| 边框 | 极浅 rgba 白 | 极浅 rgba 黑 |
| 插图 | 暗色 SVG（白/灰）| 需反转为深灰/橙色调 |
| 按钮 | 深色实心 | 橙/白实心，或橙边框 |
| 质感 | 科技感、深色沉浸 | 纸质感、暖调阅读 |

### 6.3 需特别注意的反转点

1. **Logo SVG**: 原始使用 `fill="var(--color_bg)"`，Light 模式下需改为 `fill="var(--color_text)"` 或保持品牌色
2. **Pain Point SVGs**: `encrypted.svg`, `stacked-bar-chart.svg`, `cards.svg` — 暗色主题下为白/浅色线条，Light 下需变为深灰/橙色
3. **阴影方向**: Dark 模式下阴影向**内收/扩散**以模拟发光；Light 模式下阴影向**外扩散**模拟自然光照
4. **Blur 背景**: Nav 的 `backdrop-blur` 在 Light 下需配合 `bg-white/70` 或 `bg-[#FAF8F5]/70` 才能看清

---

## 7. 素材清单

| 素材 | 路径 | 类型 | 用途 |
|------|------|------|------|
| Logo | SVG inline | SVG | Nav + Favicon |
| Linkcase 产品图 | `/images/linkcase.png` | PNG | Hero 主视觉 |
| Encrypted 图标 | `/svgs/encrypted.svg` | SVG | Pain Point 1 |
| Stacked Bar Chart | `/svgs/stacked-bar-chart.svg` | SVG | Pain Point 2 |
| Cards 图标 | `/svgs/cards.svg` | SVG | Pain Point 3 |
| Post 截图 | `/images/post.png` | PNG | Features 展示 |
| Feature Icons | `/svgs/*.svg` | SVG | Features 列表 |

---

## 8. 技术栈备注

- **框架**: Next.js (App Router)，React Server Components
- **样式**: Tailwind CSS v4 (从 `--tw-*` 变量推断) + PostCSS
- **CSS 架构**: CSS Variables 主题系统 + 组件级 CSS 文件（按组件分片）
- **字体**: GoogleSans (自定义), GeistMono (自定义)
- **构建**: `_next/static` 输出，Vite/Rolldown (从 modulepreload 推断)
- **图标**: 内联 SVG + Icon Font (`icon_font.css`)

---

## 9. 复刻检查清单

- [ ] HTML 骨架：9 大区块顺序正确
- [ ] CSS Variables：完整映射 Dark/Light 两套 Token
- [ ] 字体加载：GoogleSans + GeistMono（或替换为系统字体回退）
- [ ] 容器系统：`limited_width` (1120px) + `limited_padding` (48px/18px)
- [ ] Nav：fixed, backdrop-blur, placeholder 占位
- [ ] Hero：H1 大标题 + 副标题 + 双 CTA + 命令行提示
- [ ] Pain Points：3 列卡片，标题+SVG+描述
- [ ] Features：大图 + 3 个 feature slot
- [ ] FAQ：手风琴，至少 10 条问答
- [ ] CTA Banner：H1 大标题 + 社区链接
- [ ] Footer：水平链接 + Copyright
- [ ] 响应式：<=720px 断点，padding 收缩，布局堆叠
- [ ] 主题切换：data-theme 切换 + view-transition 动画
- [ ] Light 主题适配：暖白灰橙色板替换
