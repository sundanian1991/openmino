# HTML PPT Studio（html-ppt-skill）

> Sources: html-ppt-skill, 26 files, 2026-04-28
> Raw:[SKILL](../../raw/skills/html-ppt-skill-SKILL.md); [README](../../raw/skills/html-ppt-skill-README.md); [README.zh-CN](../../raw/skills/html-ppt-skill-README.zh-CN.md); [layouts](../../raw/skills/html-ppt-skill-layouts.md); [themes](../../raw/skills/html-ppt-skill-themes.md); [animations](../../raw/skills/html-ppt-skill-animations.md); [full decks](../../raw/skills/html-ppt-skill-full-decks.md); [authoring](../../raw/skills/html-ppt-skill-authoring-guide.md); [presenter mode](../../raw/skills/html-ppt-skill-presenter-mode.md); [warm editorial](../../raw/skills/html-ppt-skill-warm-editorial-guide.md)
> [frontend-slides SKILL](../../raw/skills/frontend-slides-SKILL.md); [README](../../raw/skills/frontend-slides-README.md); [STYLE_PRESETS](../../raw/skills/frontend-slides-STYLE_PRESETS.md); [animation-patterns](../../raw/skills/frontend-slides-animation-patterns.md); [html-template](../../raw/skills/frontend-slides-html-template.md)

## 概述

HTML PPT Studio 是专业静态 HTML 演示文稿创作技能。模板系统驱动——一个主题文件=一个外观，一个布局文件=一种页面类型。所有页面共享 `assets/base.css` token 化设计系统。

## 核心架构

| 模块 | 数量 | 说明 |
|------|------|------|
| 主题系统 | 36 套 | `assets/themes/*.css`，T 键循环 |
| 布局库 | 31 种 | `templates/single-page/*.html` |
| 动画 | 27 CSS + 20 Canvas | `data-anim` / `data-fx` |
| 演讲者模式 | 内置 | S 键：当前页/下一页/逐字稿/计时器 |
| PNG 渲染 | render.sh | Headless Chrome 截图 |

## 工作流

### 1. 需求澄清 → 2. 创建 → 3. 逐页编写 → 4. 动画 → 5. 导出

```bash
./scripts/new-deck.sh my-talk    # 脚手架
./scripts/render.sh my-talk all  # 全 deck → PNG
```

**主题推荐**：商务/融资 → `pitch-deck-vc` | 技术 → `tokyo-night` / `dracula` | 小红书 → `xiaohongshu-white` | 学术 → `academic-paper` | 赛博 → `cyberpunk-neon`

**规则**：不从空白文件开始；用 token 颜色（`var(--text-1)`）不写 hex；不发明新布局。

## 演讲者模式（逐字稿）

适用：技术分享/演讲/课程。用 `presenter-mode-reveal` 模板，每页 `<aside class="notes">` 写 150-300 字。

三规则：加粗核心词作提示信号 | 每页 150-300 字 | 用口语不用书面语。

**禁止**：演讲者-only 文字放 `<div class="notes">`，不在幻灯片上。

## Full-Deck 模板

| 模板 | 风格 | 适用 |
|------|------|------|
| `xhs-white-editorial` | 白底杂志 | 小红书图文 |
| `graphify-dark-graph` | 暗底知识图谱 | 开发工具/数据发布 |
| `knowledge-arch-blueprint` | 奶油蓝图 | 系统架构/白皮书 |
| `hermes-cyber-terminal` | 暗终端 | CLI/Agent 评测 |
| `obsidian-claude-gradient` | GitHub 暗紫 | 开发者工作流 |
| `testing-safety-alert` | 红琥珀警示 | 安全/事件回顾 |
| `xhs-pastel-card` | 马卡龙慢生活 | 生活方式/情感 |
| `dir-key-nav-minimal` | 8 色极简 | 极简演讲 |
| `pitch-deck` | VC 风 | 融资 |
| `product-launch` | 暗英雄 | 产品发布 |
| `tech-sharing` | GitHub 暗色 | 技术分享 |
| `weekly-report` | 企业 KPI | 周报 |
| `xhs-post` | 3:4 竖版 | 小红书图文 |
| `course-module` | 温暖教学 | 在线课程 |
| `presenter-mode-reveal` | 演讲者模式 | 演讲/课程 |

## 键盘快捷键

| `←→Space` 翻页 | `F` 全屏 | `S` 演讲者模式 | `O` 总览 | `T` 循环主题 | `A` 循环动画 | `#/N` 深链接 |

## 动画推荐

封面 `rise-in` / `blur-in` | 正文 `fade-up` + `stagger-list` | 数据 `counter-up` | 章节 `perspective-zoom` | 收尾 `confetti-burst`。每页只选一个强调动画。

## 前端幻灯片（frontend-slides）

轻量方案，12 种预设风格。零依赖单 HTML 文件、Viewport 拟合（100vh 不可滚动）。通过 3 个风格预览让用户"看了再选"。支持 PPTX 转换和 Vercel 部署。
