# 其他 PPT 技能（guizang-ppt-skill + presentation-skill）

> Sources: guizang-ppt-skill, presentation-skill, 2026-04-28
> Created: 2026-04-27
> Raw:[guizang SKILL](../../raw/skills/guizang-ppt-skill-SKILL.md); [checklist](../../raw/skills/guizang-ppt-skill-checklist.md); [components](../../raw/skills/guizang-ppt-skill-components.md); [layouts](../../raw/skills/guizang-ppt-skill-layouts.md); [themes](../../raw/skills/guizang-ppt-skill-themes.md); [frontend-slides SKILL](../../raw/skills/frontend-slides-SKILL.md)

## 1. guizang-ppt-skill

### 概述

生成"电子杂志 × 电子墨水"风格的横向翻页网页 PPT（单 HTML 文件）。

### SKILL.md

```
---
name: magazine-web-ppt
description: 生成"电子杂志 × 电子墨水"风格的横向翻页网页 PPT（单 HTML 文件），含 WebGL 流体背景、衬线标题 + 非衬线正文、章节幕封、数据大字报、图片网格等模板。当用户需要制作分享 / 演讲 / 发布会风格的网页 PPT，或提到"杂志风 PPT"、"horizontal swipe deck"、"editorial magazine"、"e-ink presentation"时使用。
---

# Magazine Web Ppt

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 PPT，视觉基调是：

- **电子杂志 + 电子墨水**混血风格
- **WebGL 流体 / 等高线 / 色散背景**（hero 页可见）
- **衬线标题（Noto Serif SC + Playfair Display）+ 非衬线正文（Noto Sans SC + Inter）+ 等宽元数据（IBM Plex Mono）**
- **Lucide 线性图标**（不用 emoji）
- **横向左右翻页**（键盘 ← →、滚轮、触屏滑动、底部圆点、ESC 索引）
- **主题平滑插值**：翻到 hero 页时颜色和 shader 柔顺过渡

这个 skill 的美学不是"商务 PPT"，也不是"消费互联网 UI"——它像 *Monocle* 杂志贴上了代码后的样子。

## 何时使用

**合适的场景**：
- 线下分享 / 行业内部讲话 / 私享会
- AI 新产品发布 / demo day
- 带有强烈个人风格的演讲
- 需要"一次做完，不用翻页工具"的网页版 slides

**不合适的场景**：
- 大段表格数据、图表叠加（用常规 PPT）
- 培训课件（信息密度不够）
- 需要多人协作编辑（这是静态 HTML）

## 工作流

### Step 1 · 需求澄清(**动手前必做**)

**如果用户已经给了完整的大纲 + 图片**,可以跳过直接进 Step 2。

**如果用户只给了主题或一个模糊想法**,用这 6 个问题逐个对齐后再动手。不要基于猜测就开始写 slide——一旦结构定错,后期翻修代价很高:

#### 6 问澄清清单

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **受众是谁?分享场景?**(行业内部 / 商业发布 / demo day / 私享会) | 决定语言风格和深度 |
| 2 | **分享时长?** | 15 分钟 ≈ 10 页,30 分钟 ≈ 20 页,45 分钟 ≈ 25-30 页 |
| 3 | **有没有原始素材?**(文档 / 数据 / 旧 PPT / 文章链接) | 有素材就基于素材,没有就帮他搭 |
| 4 | **有没有图片?放在哪?** | 详见下方"图片约定" |
| 5 | **想要哪套主题色?** | 见 `references/themes.md`,5 套预设挑一 |
| 6 | **有没有硬约束?**(必须包含 XX 数据 / 不能出现 YY) | 避免返工 |

#### 大纲协助(如果用户没有大纲)

用"叙事弧"模板搭骨架,再填内容:

```
钩子(Hook)       → 1 页   : 抛一个反差 / 问题 / 硬数据让人停下来
定调(Context)    → 1-2 页 : 说明背景 / 你是谁 / 为什么讲这个
主体(Core)       → 3-5 页 : 核心内容,用 Layout 4/5/6/9/10 穿插
转折(Shift)      → 1 页   : 打破预期 / 提出新观点
收束(Takeaway)   → 1-2 页 : 金句 / 悬念问题 / 行动建议
```

叙事弧 + 页数规划 + 主题节奏表(见 `layouts.md`),**三张表对齐后**再进 Step 2。

大纲建议保存为 `项目记录.md` 或 `大纲-v1.md`,便于后续迭代。

#### 图片约定(告知用户)

在动手前向用户说清:

- **文件夹位置**:`项目/XXX/ppt/images/` 下(和 `index.html` 同级)
- **命名规范**:`{页号}-{语义}.{ext}`,例如 `01-cover.jpg` / `03-figma.jpg` / `05-dashboard.png`
  - 页号补零便于排序
  - 语义用英文,短、具体、和内容对应
- **规格建议**:
  - 单张 ≥ 1600px 宽(避免大屏模糊)
  - JPG 用于照片/截图,PNG 用于透明 UI/图表
  - 总大小控制在 10MB 内(影响翻页流畅度)
- **如何替换**:保持**同名覆盖**最稳(HTML 里不用改路径);如果文件名变了,记得全局搜 `images/旧名` 改成新名
- **没图怎么办**:和用户对齐,可以先用占位色块生成结构,等图片后期补;但要告知 layout 4/5/10 等图文混排页没图就没法验证视觉效果

### Step 2 · 拷贝模板

从 `assets/template.html` 拷贝一份到目标位置（通常是 `项目/XXX/ppt/index.html`），同时在同级建一个 `images/` 文件夹准备接图片。

```bash
mkdir -p "项目/XXX/ppt/images"
cp "<SKILL_ROOT>/assets/template.html" "项目/XXX/ppt/index.html"
```

`template.html` 是一个**完整可运行**的文件——CSS、WebGL shader、翻页 JS、字体/图标 CDN 全已预设好，只有 `<main id="deck">` 里面是 3 个示例 slide（封面、章节幕封、空白填充页）。

#### 2.1 · 必改占位符（**容易漏**）

拷贝后立刻改掉以下占位符，否则浏览器 Tab 会显示"[必填] 替换为 PPT 标题"这种尴尬文字：

| 位置 | 原始 | 需改为 |
|------|------|--------|
| `<title>` | `[必填] 替换为 PPT 标题 · Deck Title` | 实际 deck 标题(如 `一种新的工作方式 · Luke Wroblewski`) |

每次拷贝完 template.html 第一件事:grep 一下"[必填]" 确认全部替换完。

#### 2.2 · 选定主题色(5 套预设 · 不允许自定义)

本 skill **只允许从 5 套精心调配的预设里选一套**,不接受用户自定义 hex 值——颜色搭配错了画面瞬间变丑,保护美学比给自由更重要。

| # | 主题 | 适合 |
|---|------|------|
| 1 | 🖋 墨水经典 | 通用 / 商业发布 / 不知道选啥的默认 |
| 2 | 🌊 靛蓝瓷 | 科技 / 研究 / 数据 / 技术发布会 |
| 3 | 🌿 森林墨 | 自然 / 可持续 / 文化 / 非虚构 |
| 4 | 🍂 牛皮纸 | 怀旧 / 人文 / 文学 / 独立杂志 |
| 5 | 🌙 沙丘 | 艺术 / 设计 / 创意 / 画廊 |

**操作**:
1. 基于内容主题推荐一套,或直接问用户选哪一套
2. 打开 `references/themes.md`,找到对应主题的 `:root` 块
3. **整体替换** `assets/template.html`(已拷贝版本)开头 `:root{` 块里标有"主题色"注释的那几行(`--ink` / `--ink-rgb` / `--paper` / `--paper-rgb` / `--paper-tint` / `--ink-tint`)
4. 其他 CSS 都走 `var(--...)`,无需任何其他改动

**硬规则**:
- 一份 deck 只用一套主题,不要中途换色
- 不要接受用户给的任意 hex 值——委婉拒绝并展示 5 套让选
- 不要混搭(例如 ink 取墨水经典、paper 取沙丘)——会彻底违和

### Step 3 · 填充内容

#### 3.0 · 预检:类名必须在 template.html 里有定义（**最重要**）

**这是所有生成问题的源头**。layouts.md 的骨架使用了很多类名(`h-hero` / `h-xl` / `stat-card` / `pipeline` / `grid-2-7-5` 等),如果 `assets/template.html` 的 `<style>` 里没有对应定义,浏览器会 fallback 到默认样式——大标题变成非衬线、数据卡片挤成一团、pipeline 糊成一行、图片堆到页面底部。

**在写任何 slide 代码之前:**

1. **先 Read `assets/template.html`**(至少读到 `<style>` 块末尾)
2. **对照 layouts.md 的 Pre-flight 列表**,确认你要用的每个类都在 `<style>` 里存在
3. 如果某个类缺失:**在 template.html 的 `<style>` 里补上**,不要在每个 slide 里 inline 重写
4. **template.html 是唯一的类名来源**——不要发明新类名,如需自定义用 `style="..."` inline

常见容易遗漏的类(必须预先确认存在):
`h-hero` / `h-xl` / `h-sub` / `h-md` / `lead` / `kicker` / `meta-row` / `stat-card` / `stat-label` / `stat-nb` / `stat-unit` / `stat-note` / `pipeline-section` / `pipeline-label` / `pipeline` / `step` / `step-nb` / `step-title` / `step-desc` / `grid-2-7-5` / `grid-2-6-6` / `grid-2-8-4` / `grid-3-3` / `grid-6` / `grid-3` / `grid-4` / `frame` / `frame-img` / `img-cap` / `callout` / `callout-src` / `chrome` / `foot`

#### 3.0.5 · 规划主题节奏（**和类预检同等重要**)

**在挑布局之前**,必须先列出每一页的主题 class(`hero dark` / `hero light` / `light` / `dark`)并写到文档或草稿里对齐。详细规则看 `references/layouts.md` 开头的"主题节奏规划"一节。

**强制规则**:

- 每页 section 必须带 `light` / `dark` / `hero light` / `hero dark` 之一,不要只写 `hero`
- 连续 3 页以上同主题 = 视觉疲劳,不允许
- 8 页以上必须有 ≥1 个 `hero dark` + ≥1 个 `hero light`
- 整个 deck 不能只有 `light` 正文页,必须有 `dark` 正文页制造呼吸
- 每 3-4 页插入 1 个 hero 页(封面/幕封/问题/大引用)

**生成后自检**:`grep 'class="slide' index.html` 列出所有主题,人工确认节奏合理再交付。

#### 3.1 · 挑布局

**不要从零写 slide**。打开 `references/layouts.md`,里面有 10 种现成布局骨架,每种都是完整可粘贴的 `<section>` 代码块:

| Layout | 用途 |
|---|---|
| 1. 开场封面 | 第 1 页 |
| 2. 章节幕封 | 每幕开场 |
| 3. 数据大字报 | 抛硬数据 |
| 4. 左文右图(Quote + Image) | 身份反差 / 故事 |
| 5. 图片网格 | 多图对比 / 截图实证 |
| 6. 两列流水线(Pipeline) | 工作流程 |
| 7. 悬念收束 / 问题页 | 幕末 / 收尾 |
| 8. 大引用页(Big Quote) | 衬线金句 / takeaway |
| 9. 并列对比(Before / After) | 旧模式 vs 新模式 |
| 10. 图文混排(Lead Image + Side Text) | 信息密集的图文页 |

选对应 layout,粘过去,改文案和图片路径即可。**务必先完成 3.0 预检**。

#### 3.2 · 图片比例规范

永远用**标准比例**,不要用原图奇葩比例(如 `2592/1798`):

| 场景 | 推荐比例 |
|------|---------|
| 左文右图 主图 | 16:10 或 4:3 + `max-height:56vh` |
| 图片网格(多图对比) | **固定 `height:26vh`**,不用 aspect-ratio |
| 左小图 + 右文字 | 1:1 或 3:2 |
| 全屏主视觉 | 16:9 + `max-height:64vh` |
| 图文混排小插图 | 3:2 或 3:4 |

**图片绝不使用 `align-self:end`**——会滑到 cell 底被浏览器工具栏遮挡。用 grid 容器 + `align-items:start`(template 已预设)让图片贴顶即可;左列若想贴底,用 flex column + `justify-content:space-between`。

组件细节(字体、颜色、网格、图标、callout、stat-card 等)在 `references/components.md`。

### Step 4 · 对照检查清单自检

生成完一定要打开 `references/checklist.md`，逐项对照。里面总结了**真实迭代过程中踩过的所有坑**，P0 级别的问题（emoji、图片撑破、标题换行、字体分工）必须全部通过。

特别要注意的几条：

1. **大标题必须是衬线字体**——如果显示成非衬线,99% 是 Step 3.0 预检没做,`h-hero` 类在 template.html 里缺失
2. **图片网格里只用 `height:Nvh`,不用 `aspect-ratio`**(会撑破)
3. **图片不能堆到页面底部**——不要用 `align-self:end`,用 grid + `align-items:start`(见 Step 3.2)
4. **图片只能用标准比例**(16:10 / 4:3 / 3:2 / 1:1 / 16:9),不要复制原图的奇葩比例
5. **中文大标题 ≤ 5 字且 `nowrap`**(避免 1 字 1 行)
6. **用 Lucide,不用 emoji**
7. **标题用衬线,正文用非衬线,元数据用等宽**

### Step 5 · 本地预览

直接在浏览器打开 `index.html` 就行。macOS 下：

```bash
open "项目/XXX/ppt/index.html"
```

不需要本地服务器。图片走相对路径 `images/xxx.png`。

### Step 6 · 迭代

根据用户反馈修改——模板的 CSS 已经高度参数化，90% 的调整都是改 inline style（字号 `font-size:Xvw` / 高度 `height:Yvh` / 间距 `gap:Zvh`）。

---

## 资源文件导览

```
magazine-web-ppt/
├── SKILL.md              ← 你正在读
├── assets/
│   └── template.html     ← 完整的可运行模板（种子文件）
└── references/
    ├── components.md     ← 组件手册（字体、色、网格、图标、callout、stat、pipeline...）
    ├── layouts.md        ← 10 种页面布局骨架（可直接粘贴）
    ├── themes.md         ← 5 套主题色预设（只能选不能自定义）
    └── checklist.md      ← 质量检查清单（P0/P1/P2/P3 分级）
```

**加载顺序建议**：
1. 先读完 `SKILL.md`(这个文件)了解整体
2. Step 1 需求澄清完成后,读 `themes.md` 帮用户选定一套主题色
3. **动手前 Read `assets/template.html` 的 `<style>` 块**——这是类名的唯一来源,缺类会导致整页样式崩
4. 读 `layouts.md` 挑布局(顶部有 Pre-flight 类名清单和主题节奏规划)
5. 细节调整时读 `components.md` 查组件
6. 生成后读 `checklist.md` 自检(顶部 P0-0 规则强制预检)

## 核心设计原则（哲学）

> 这些原则是"一人公司"分享 PPT 的 5 轮迭代总结出来的。违反其中任何一条，视觉感都会垮。

1. **克制优于炫技** — WebGL 背景只在 hero 页透出，普通页几乎看不见
2. **结构优于装饰** — 不用阴影、不用浮动卡片、不用 padding box，一切信息靠**大字号 + 字体对比 + 网格留白**
3. **内容层级由字号和字体共同定义** — 最大衬线 = 主标题，中衬线 = 副标，大非衬线 = lead，小非衬线 = body，等宽 = 元数据
4. **图片是第一公民** — 图片只裁底部，保证顶部和左右完整；网格用 `height:Nvh` 固定，不要用 `aspect-ratio` 撑
5. **节奏靠 hero 页** — hero 和 non-hero 交替，才不累眼睛
6. **术语统一** — Skills 就是 Skills，不要中英混合翻译

## 参考作品

本 skill 的视觉基调参考了：

- 歸藏 "一人公司：被 AI 折叠的组织" 分享（2026-04-22，27 页）
- *Monocle* 杂志的版式
- YC 总裁 Garry Tan "Thin Harness, Fat Skills" 那篇博客的 demo

可以把它们当做风格锚点。
```

### 模板（assets/template.html）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[必填] 替换为 PPT 标题 · Deck Title</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@300;400;500;600&family=Noto+Serif+SC:wght@300;400;500;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root{
    /* ============ 主题色(默认:🖋 墨水经典) ============
       切换主题:从 references/themes.md 复制对应的 :root 块
       整体替换这几行(--ink / --ink-rgb / --paper / --paper-rgb)
       其他地方散落的 rgba() 都走 var(--ink-rgb) / var(--paper-rgb),无需逐处改 */
    --ink:#0a0a0b;
    --ink-rgb:10,10,11;
    --paper:#f1efea;
    --paper-rgb:241,239,234;
    --paper-tint:#e8e5de;
    --ink-tint:#18181a;

    /* ============ 字体(跨主题固定) ============ */
    --mono:"IBM Plex Mono",ui-monospace,monospace;
    --serif-en:"Playfair Display","Source Serif 4",Georgia,serif;
    --serif-body-en:"Source Serif 4",Georgia,serif;
    --serif-zh:"Noto Serif SC",source-han-serif-sc,serif;
    --sans-zh:"Noto Sans SC",source-han-sans-sc,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%;overflow:hidden;background:var(--ink);color:var(--paper);font-family:var(--sans-zh);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}

  /* ============ WebGL 双背景 ============ */
  canvas.bg{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;display:block;transition:opacity 1.2s ease}
  canvas#bg-light{opacity:0}
  canvas#bg-dark{opacity:1}
  body.light-bg canvas#bg-light{opacity:1}
  body.light-bg canvas#bg-dark{opacity:0}

  /* ============ Deck 容器 + 翻页 ============ */
  /* width: NSLIDES * 100vw，会在 JS 里动态矫正 */
  #deck{position:fixed;inset:0;width:10000vw;height:100vh;display:flex;flex-wrap:nowrap;transition:transform .9s cubic-bezier(.77,0,.175,1);z-index:10;will-change:transform}
  .slide{width:100vw;height:100vh;flex:0 0 100vw;position:relative;padding:6vh 6vw 10vh 6vw;display:flex;flex-direction:column;overflow:hidden}
  .slide.light{color:var(--ink)}
  .slide.dark{color:var(--paper)}

  /* 默认页：遮罩较厚，保证文字可读 */
  .slide::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;transition:background .7s ease}
  .slide.light::before{background:rgba(var(--paper-rgb),.78);backdrop-filter:blur(3px)}
  .slide.dark::before{background:rgba(var(--ink-rgb),.78);backdrop-filter:blur(3px)}
  /* Hero 页：遮罩大幅降低，让 WebGL 背景明显透出 */
  .slide.hero.light::before{background:rgba(var(--paper-rgb),.16);backdrop-filter:none}
  .slide.hero.dark::before{background:rgba(var(--ink-rgb),.12);backdrop-filter:none}
  /* Hero 页顶底微弱渐隐，保证 chrome/foot 区域可读 */
  .slide.hero::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none}
  .slide.hero.light::after{background:linear-gradient(180deg,rgba(var(--paper-rgb),.28) 0%,rgba(var(--paper-rgb),0) 14%,rgba(var(--paper-rgb),0) 86%,rgba(var(--paper-rgb),.28) 100%)}
  .slide.hero.dark::after{background:linear-gradient(180deg,rgba(var(--ink-rgb),.32) 0%,rgba(var(--ink-rgb),0) 14%,rgba(var(--ink-rgb),0) 86%,rgba(var(--ink-rgb),.32) 100%)}

  /* ============ Magazine chrome：顶部 meta + 底部 foot ============ */
  .chrome{display:flex;justify-content:space-between;align-items:flex-start;font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.7}
  .chrome .left,.chrome .right{display:flex;gap:2.4em;align-items:center}
  .chrome .sep{width:40px;height:1px;background:currentColor;opacity:.4}
  .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.55}
  .foot .title{font-family:var(--serif-zh);font-weight:400;letter-spacing:.05em;text-transform:none;opacity:.75;font-size:13px}

  .tag{display:inline-block;font-family:var(--mono);font-size:11px;letter-spacing:.24em;text-transform:uppercase;padding:6px 14px;border:1px solid currentColor;opacity:.85}
  .rule{width:100%;height:1px;background:currentColor;opacity:.25;margin:3vh 0}
  .rule.v{width:1px;height:100%;margin:0}

  /* ============ 字体规则 ============
     · 衬线（Noto Serif SC / Playfair）：大标题、重点金句、数字
     · 非衬线（Noto Sans SC）：正文描述、body、补充说明
     · 等宽（IBM Plex Mono）：kicker、meta 小标签、foot 右侧
  */
  .kicker{font-family:var(--mono);font-size:12px;letter-spacing:.3em;text-transform:uppercase;opacity:.6;margin-bottom:2.6vh}
  .display{font-family:var(--serif-en);font-weight:700;font-size:11vw;line-height:.92;letter-spacing:-.025em}
  .display-zh{font-family:var(--serif-zh);font-weight:700;font-size:7.8vw;line-height:1.04;letter-spacing:-.005em}
  .h1-zh{font-family:var(--serif-zh);font-weight:700;font-size:4.6vw;line-height:1.12;letter-spacing:-.005em}
  .h2-zh{font-family:var(--serif-zh);font-weight:600;font-size:3.2vw;line-height:1.2;letter-spacing:0}
  .h3-zh{font-family:var(--serif-zh);font-weight:500;font-size:1.9vw;line-height:1.35}
  .body-zh{font-family:var(--sans-zh);font-weight:400;font-size:max(15px,1.22vw);line-height:1.75;opacity:.82;letter-spacing:.01em}
  .body-serif{font-family:var(--serif-zh);font-weight:400;font-size:max(15px,1.3vw);line-height:1.65;opacity:.88}
  .lead{font-family:var(--serif-zh);font-weight:400;font-size:1.9vw;line-height:1.4;opacity:.85}
  .meta{font-family:var(--mono);font-size:max(11px,.88vw);letter-spacing:.16em;text-transform:uppercase;opacity:.6}
  .big-num{font-family:var(--serif-en);font-weight:800;font-size:10vw;line-height:.85;letter-spacing:-.03em;font-feature-settings:"tnum"}
  .mid-num{font-family:var(--serif-en);font-weight:700;font-size:5.5vw;line-height:.88;letter-spacing:-.02em;font-feature-settings:"tnum"}
  .ghost{font-family:var(--serif-en);font-weight:900;font-size:34vw;line-height:.8;opacity:.06;letter-spacing:-.04em;position:absolute;font-feature-settings:"tnum"}
  em{font-style:italic;font-family:var(--serif-en)}
  .en{font-family:var(--serif-en);font-style:italic;font-weight:500}

  /* ============ 布局工具 ============ */
  .col{display:flex;flex-direction:column;gap:2.4vh}
  .row{display:flex;align-items:center;gap:3vw}
  .grid-6{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:4vw 6vw;flex:1;align-content:center;padding:2vh 0}
  .grid-9{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:3vh 4vw;flex:1;align-content:center}
  .grid-4{display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:4vh 6vw;flex:1;align-content:center}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:4vw;flex:1;align-content:center}
  .split{display:grid;grid-template-columns:1fr 1fr;gap:4vw;flex:1;align-items:center}
  .split-55{display:grid;grid-template-columns:55fr 45fr;gap:5vw;flex:1;align-items:stretch}
  .fill{flex:1}
  .center{align-items:center;justify-content:center;text-align:center}
  .bottom-left{position:absolute;left:6vw;bottom:9vh;max-width:50vw}
  .bottom-right{position:absolute;right:6vw;bottom:9vh;max-width:50vw;text-align:right}
  .top-right{position:absolute;right:6vw;top:6vh;text-align:right}

  /* ============ Stat（数字矩阵） ============ */
  .stat{display:flex;flex-direction:column;gap:1vh;align-items:flex-start}
  .stat .n{font-family:var(--serif-en);font-weight:800;font-size:8vw;line-height:.88;letter-spacing:-.03em;font-feature-settings:"tnum"}
  .stat .l{font-family:var(--sans-zh);font-size:max(13px,1.05vw);opacity:.7;margin-top:1vh;font-weight:400;line-height:1.5}
  .stat .m{font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.5;margin-bottom:.2vh}

  /* ============ Callout（引用框） ============ */
  .callout{padding:3vh 2.4vw;border-left:3px solid currentColor;position:relative;font-family:var(--serif-zh);font-size:max(15px,1.2vw);line-height:1.55;opacity:.92}
  .slide.light .callout{background:rgba(var(--ink-rgb),.05)}
  .slide.dark .callout{background:rgba(var(--paper-rgb),.06)}
  .callout .cite{display:block;margin-top:1.6vh;font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.6}
  .callout .q-big{font-family:var(--serif-zh);font-weight:600;font-size:max(17px,1.6vw);line-height:1.42}

  /* ============ Platform（平台卡） ============ */
  .plat{display:flex;flex-direction:column;justify-content:flex-end;padding:2vh 0;border-top:1px solid currentColor;border-color:rgba(127,127,127,.35)}
  .plat .name{font-family:var(--serif-zh);font-weight:700;font-size:1.8vw;margin-bottom:.6vh}
  .plat .nb{font-family:var(--serif-en);font-weight:700;font-size:3.2vw;letter-spacing:-.02em;line-height:1;font-feature-settings:"tnum"}
  .plat .sub{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.55;margin-top:.6vh}
  .plat .fill{font-family:var(--sans-zh);font-weight:300;font-size:2.4vw;opacity:.28;letter-spacing:-.01em;line-height:1}

  /* ============ Rowline（表格行） ============ */
  .rowline{display:grid;grid-template-columns:1fr 2fr 1fr;gap:2vw;padding:2.2vh 0;border-top:1px solid currentColor;align-items:center;border-color:rgba(127,127,127,.25)}
  .rowline:last-child{border-bottom:1px solid currentColor;border-color:rgba(127,127,127,.25)}
  .rowline .k{font-family:var(--serif-zh);font-weight:700;font-size:1.7vw}
  .rowline .v{font-family:var(--sans-zh);font-weight:400;font-size:max(14px,1.2vw);opacity:.85;line-height:1.55}
  .rowline .m{font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.6;justify-self:end}

  /* ============ Pillar（支柱卡片） ============ */
  .pillar{display:flex;flex-direction:column;gap:1.8vh}
  .pillar .ic{font-family:var(--serif-en);font-style:italic;font-size:2.6vw;opacity:.45;font-weight:400}
  .pillar .ic svg{width:2.8vw;height:2.8vw;stroke-width:1.2;opacity:.7}
  .pillar .t{font-family:var(--serif-zh);font-weight:700;font-size:2.4vw;line-height:1.1}
  .pillar .d{font-family:var(--sans-zh);font-weight:400;font-size:max(14px,1.1vw);opacity:.76;line-height:1.6}

  /* ============ Signature / Highlight ============ */
  .sign{font-family:var(--serif-en);font-style:italic;font-weight:500;font-size:2vw;opacity:.7}
  .hi{position:relative;display:inline}
  .slide.dark .hi::after{content:"";position:absolute;left:-.1em;right:-.1em;bottom:-.05em;height:.28em;background:rgba(var(--paper-rgb),.15);z-index:-1}
  .slide.light .hi::after{content:"";position:absolute;left:-.1em;right:-.1em;bottom:-.05em;height:.28em;background:rgba(var(--ink-rgb),.08);z-index:-1}

  /* ============ Icons（Lucide via CDN） ============ */
  .ico{width:1em;height:1em;display:inline-block;vertical-align:-.12em;stroke:currentColor;fill:none;stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}
  .ico-lg,.ico-md,.ico-sm{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round}
  .ico-lg{width:2.6vw;height:2.6vw;stroke-width:1.2;display:inline-block}
  .ico-md{width:1.8vw;height:1.8vw;stroke-width:1.3;display:inline-block;vertical-align:-.4em}
  .ico-sm{width:1.1vw;height:1.1vw;stroke-width:1.4;display:inline-block;vertical-align:-.15em;opacity:.7}

  /* ============ 图片占位（虚线框，提示设计师位置） ============ */
  .img-slot{border:1.5px dashed rgba(127,127,127,.4);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1vh;padding:2vh 2vw;font-family:var(--mono);font-size:10px;letter-spacing:.28em;text-transform:uppercase;opacity:.55;position:relative;aspect-ratio:16/9;width:100%;max-height:56vh;margin-inline:auto;box-sizing:border-box}
  .img-slot::before{content:"";position:absolute;inset:8px;border:1px solid currentColor;opacity:.2}
  .img-slot .plus{font-size:2vw;font-weight:300;opacity:.5;letter-spacing:0}
  .img-slot .label{position:relative;z-index:2;text-align:center}
  .img-slot.r-4x3{aspect-ratio:4/3}
  .img-slot.r-3x2{aspect-ratio:3/2}
  .img-slot.r-1x1{aspect-ratio:1/1}

  /* ============ 图片实填框（关键：固定高度 + 只裁底部） ============
     重要约束：高度用内联 height:Nvh 精确控制，不要用 aspect-ratio（会撑破布局）
     object-position:top center 保证严禁裁剪顶部和左右，只裁剪底部
  */
  .frame-img{overflow:hidden;position:relative;background:rgba(0,0,0,.04);box-sizing:border-box;width:100%;border-radius:4px}
  .slide.dark .frame-img{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.12)}
  .frame-img > img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
  .frame-cap{display:flex;justify-content:space-between;align-items:baseline;gap:1vw;margin-top:.8vh;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;opacity:.72}
  .frame-cap .pf{font-family:var(--serif-zh);font-weight:600;font-size:max(13px,1vw);letter-spacing:.04em;text-transform:none;opacity:.94}
  .frame-cap .nb{font-family:var(--serif-en);font-style:italic;font-size:max(15px,1.2vw);letter-spacing:.02em;text-transform:none;opacity:.88}
  .frame-cap .idx{font-family:var(--mono);opacity:.5}
  figure.tile{display:flex;flex-direction:column;margin:0;min-width:0}
  figure.tile > .frame-img{flex:0 0 auto}

  /* ============ 导航 ============ */
  #nav{position:fixed;left:50%;bottom:2.6vh;transform:translateX(-50%);z-index:30;display:flex;gap:10px;padding:8px 14px;border-radius:999px;background:rgba(0,0,0,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
  #nav .dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);cursor:pointer;transition:all .3s ease;border:0;padding:0}
  #nav .dot:hover{background:rgba(255,255,255,.5);transform:scale(1.15)}
  #nav .dot.active{background:rgba(255,255,255,.95);width:22px;border-radius:999px}
  body.light-bg #nav{background:rgba(255,255,255,.25)}
  body.light-bg #nav .dot{background:rgba(var(--ink-rgb),.25)}
  body.light-bg #nav .dot.active{background:rgba(var(--ink-rgb),.9)}
  #hint{position:fixed;bottom:3vh;right:3vw;z-index:30;font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;opacity:.4;mix-blend-mode:difference;color:#aaa}

  /* ============================================================
     ============ LAYOUTS API · 面向 agent 的类（v2）============
     所有 layouts.md 中的骨架都基于下面这套命名。
     如果你在 layouts.md 里看到某个类，它必须在下面有定义。
     ============================================================ */

  /* ---------- .frame：每页主内容容器 ---------- */
  .frame{flex:1;display:flex;flex-direction:column;min-height:0}
  /* 当 .frame 同时加了 grid 类时，grid 的 display:grid 覆盖 flex */
  .frame.grid-2-7-5,
  .frame.grid-2-6-6,
  .frame.grid-2-8-4,
  .frame.grid-3-3,
  .frame.grid-6{display:grid}

  /* ---------- 标题层级（API 名称，衬线为主） ---------- */
  .h-hero{
    font-family:var(--serif-zh);
    font-weight:900;
    font-size:10vw;
    line-height:.96;
    letter-spacing:-.02em;
  }
  .h-xl{
    font-family:var(--serif-zh);
    font-weight:700;
    font-size:6.2vw;
    line-height:1.08;
    letter-spacing:-.01em;
  }
  .h-sub{
    font-family:var(--serif-zh);
    font-weight:500;
    font-size:3.1vw;
    line-height:1.25;
    letter-spacing:0;
    opacity:.7;
  }
  .h-md{
    font-family:var(--serif-zh);
    font-weight:600;
    font-size:2.3vw;
    line-height:1.3;
  }
  /* 英文标题专用（Playfair 衬线） */
  .h-hero-en,.h-xl-en{font-family:var(--serif-en);letter-spacing:-.025em}

  /* ---------- lead 引语 ---------- */
  .lead{
    font-family:var(--serif-zh);
    font-weight:400;
    font-size:1.75vw;
    line-height:1.5;
    opacity:.86;
  }

  /* ---------- meta-row 底部元数据 ---------- */
  .meta-row{
    display:flex;
    gap:1.2em;
    align-items:baseline;
    flex-wrap:wrap;
    font-family:var(--mono);
    font-size:max(12px,.92vw);
    letter-spacing:.16em;
    text-transform:uppercase;
    opacity:.6;
  }

  /* ---------- stat-card（数据大字报用） ---------- */
  .stat-card{
    display:flex;
    flex-direction:column;
    gap:.8vh;
    align-items:flex-start;
    padding-top:1.6vh;
    border-top:1px solid currentColor;
    border-color:rgba(127,127,127,.3);
  }
  .stat-card .stat-label{
    font-family:var(--mono);
    font-size:max(10px,.78vw);
    letter-spacing:.24em;
    text-transform:uppercase;
    opacity:.55;
  }
  .stat-card .stat-nb{
    font-family:var(--serif-en);
    font-weight:800;
    font-size:5.8vw;
    line-height:.9;
    letter-spacing:-.03em;
    font-feature-settings:"tnum";
    margin-top:.4vh;
  }
  .stat-card .stat-nb .stat-unit{
    font-family:var(--serif-zh);
    font-weight:500;
    font-size:.38em;
    letter-spacing:0;
    opacity:.72;
    margin-left:.14em;
  }
  .stat-card .stat-note{
    font-family:var(--sans-zh);
    font-weight:400;
    font-size:max(13px,1.05vw);
    line-height:1.5;
    opacity:.72;
    margin-top:.6vh;
  }
  /* 当 stat-card 用于 grid-4（2x2），数字可以更大 */
  .grid-4 .stat-card .stat-nb{font-size:7.5vw}
  /* 当只有 3 个，字也可以稍大 */
  .grid-3 .stat-card .stat-nb{font-size:6.8vw}

  /* ---------- pipeline（流水线） ---------- */
  .pipeline-section{
    margin-top:4.4vh;
    padding-top:2.8vh;
    border-top:1px dashed rgba(127,127,127,.32);
  }
  .pipeline-section:first-of-type{
    border-top:0;
    padding-top:0;
    margin-top:3vh;
  }
  .pipeline-label{
    font-family:var(--mono);
    font-size:max(11px,.85vw);
    letter-spacing:.24em;
    text-transform:uppercase;
    opacity:.62;
    margin-bottom:2.2vh;
  }
  .pipeline{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:1.2vw;
  }
  .pipeline[data-cols="3"]{grid-template-columns:repeat(3,1fr)}
  .pipeline[data-cols="4"]{grid-template-columns:repeat(4,1fr)}
  .pipeline[data-cols="6"]{grid-template-columns:repeat(6,1fr)}
  .step{
    display:flex;
    flex-direction:column;
    gap:.8vh;
    padding-top:1.4vh;
    border-top:1px solid currentColor;
    border-color:rgba(127,127,127,.35);
  }
  .step-nb{
    font-family:var(--serif-en);
    font-style:italic;
    font-weight:500;
    font-size:1.15vw;
    opacity:.45;
  }
  .step-title{
    font-family:var(--sans-zh);
    font-weight:700;
    font-size:1.55vw;
    letter-spacing:.01em;
    line-height:1.2;
  }
  .step-desc{
    font-family:var(--sans-zh);
    font-weight:400;
    font-size:max(12px,.95vw);
    line-height:1.45;
    opacity:.72;
  }

  /* ---------- 网格（layouts.md 所用） ---------- */
  /* 这些类独立挂到任何容器上都能生效，不依赖 .frame 复合选择器 */
  .grid-2-7-5{display:grid;grid-template-columns:7fr 5fr;gap:3vw 4vh;align-items:start}
  .grid-2-6-6{display:grid;grid-template-columns:1fr 1fr;gap:3vw 4vh;align-items:start}
  .grid-2-8-4{display:grid;grid-template-columns:8fr 4fr;gap:3vw 4vh;align-items:start}
  .grid-3-3{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    grid-auto-rows:minmax(0,1fr);
    gap:2.4vh 2vw;
  }
  /* grid-6 已在旧样式里定义为 3x2，这里仅补 align */

  /* ---------- 图片 frame-img（layouts.md 主命名） ---------- */
  /* 在旧样式里已定义，这里补 img-cap 命名别名与增强 */
  figure.frame-img{margin:0;display:flex;flex-direction:column;min-width:0}
  .img-cap{
    display:block;
    margin-top:.8vh;
    font-family:var(--mono);
    font-size:max(10px,.8vw);
    letter-spacing:.22em;
    text-transform:uppercase;
    opacity:.6;
  }
  /* callout src 命名别名 */
  .callout-src{
    display:block;
    margin-top:1.6vh;
    font-family:var(--mono);
    font-size:11px;
    letter-spacing:.2em;
    text-transform:uppercase;
    opacity:.6;
  }

  /* ---------- chrome & foot 补位（layouts.md 简单写法） ---------- */
  .chrome{font-family:var(--mono);font-size:max(11px,.78vw);letter-spacing:.2em;text-transform:uppercase;opacity:.62}
  .foot{font-family:var(--mono);font-size:max(11px,.78vw);letter-spacing:.18em;text-transform:uppercase;opacity:.5}

  /* ---------- 响应式降级 ---------- */
  @media (max-width:900px){
    .display{font-size:16vw}
    .display-zh{font-size:12vw}
    .h1-zh{font-size:7vw}
    .h-hero{font-size:14vw}
    .h-xl{font-size:9vw}
    .pipeline{grid-template-columns:repeat(2,1fr)}
    .grid-2-7-5,.grid-2-6-6,.grid-2-8-4{grid-template-columns:1fr}
  }
</style>
</head>
<body>

<canvas id="bg-dark" class="bg"></canvas>
<canvas id="bg-light" class="bg"></canvas>
<div id="hint">← → 翻页 · ESC 索引</div>

<div id="deck">

<!-- ============================================================
     SLIDES 插入区 · 在此处填充所有 <section class="slide ..."> 页面
     每页模板参考 references/page-patterns.md
     页面组件参考 references/components.md
     ============================================================ -->

<!-- SLIDES_HERE -->

</div>

<div id="nav"></div>

<script>
/* =============== WebGL 双背景 ===============
   深色页：Holographic Dispersion（全息色散 · 钛金暗流）—— 彩虹微扰、鼠标径向涟漪
   浅色页：Spiral Vortex（旋转涡流 · 银色珍珠）—— domain-warp 流动、无中心
   修改风格请参考 references/webgl-backgrounds.md
*/
const VS = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;

const FS_DARK = `precision highp float;
uniform vec2 u_resolution;uniform float u_time;uniform vec2 u_mouse;
vec3 palette(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.28318*(c*t+d));}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=uv*2.0-1.0;p.x*=u_resolution.x/u_resolution.y;
  vec2 m=u_mouse*2.0-1.0;m.x*=u_resolution.x/u_resolution.y;
  float md=length(p-m);
  float mr=sin(md*15.0-u_time*4.0)*exp(-md*3.0);p+=mr*0.08;
  vec2 p0=p;
  for(float i=1.0;i<4.0;i++){
    p.x+=0.1/i*sin(i*3.0*p.y+u_time*0.4)+0.05;
    p.y+=0.1/i*cos(i*2.0*p.x+u_time*0.3)-0.05;
  }
  float r=length(p);float ang=atan(p.y,p.x);
  vec3 a=vec3(0.12,0.12,0.13);
  vec3 b=vec3(0.03,0.04,0.05);
  vec3 c=vec3(1.0,1.0,1.0);
  vec3 d=vec3(0.1,0.2,0.4);
  vec3 col=palette(r*1.5+p0.x*0.5+u_time*0.1,a,b,c,d);
  float disp=sin(r*25.0-u_time*1.5+ang*2.0)*0.5+0.5;
  col+=vec3(disp*0.015,disp*0.01,disp*0.02);
  float hi=pow(sin(p.x*4.0+p.y*3.0+u_time)*0.5+0.5,8.0);
  col+=hi*0.08;
  vec3 base=vec3(0.05,0.05,0.06);
  col=mix(base,col,0.85);
  gl_FragColor=vec4(col,1.0);
}`;

const FS_LIGHT = `precision highp float;
uniform vec2 u_resolution;uniform float u_time;uniform vec2 u_mouse;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  float a=hash(i),b=hash(i+vec2(1,0));
  float c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v=0.0,a=0.5;
  mat2 m=mat2(0.80,0.60,-0.60,0.80);
  for(int i=0;i<5;i++){v+=a*noise(p);p=m*p*2.02;a*=0.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution.xy;
  vec2 p=uv;p.x*=u_resolution.x/u_resolution.y;
  vec2 m=u_mouse;m.x*=u_resolution.x/u_resolution.y;
  vec2 md=p-m;float dl=length(md);
  p+=normalize(md+vec2(0.0001))*exp(-dl*5.0)*0.03;
  vec2 q=vec2(fbm(p*1.8+u_time*0.07),fbm(p*1.8+vec2(5.2,1.3)+u_time*0.06));
  vec2 r=vec2(fbm(p*2.0+q*1.3+vec2(1.7,9.2)+u_time*0.05),
              fbm(p*2.0+q*1.3+vec2(8.3,2.8)+u_time*0.04));
  float f=fbm(p*2.2+r*1.5);
  vec3 silverDark=vec3(0.86,0.85,0.84);
  vec3 paper=vec3(0.955,0.945,0.925);
  vec3 col=mix(silverDark,paper,f);
  float ph=r.x*2.2+u_time*0.35;
  col+=vec3(0.78,0.62,0.92)*sin(ph)*0.055;
  col+=vec3(0.55,0.72,0.95)*sin(ph*0.8+2.0)*0.05;
  float hl=smoothstep(0.48,0.92,f);
  col+=hl*0.06;
  gl_FragColor=vec4(col,1.0);
}`;

const mouse={x:0.5,y:0.5};
addEventListener('mousemove',e=>{mouse.x=e.clientX/innerWidth;mouse.y=e.clientY/innerHeight});

function bootGL(canvasId, fsSrc){
  const canvas=document.getElementById(canvasId);
  const gl=canvas.getContext('webgl',{alpha:false,antialias:true});
  if(!gl) return ()=>false;
  const mk=(t,s)=>{const sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);return sh};
  const prog=gl.createProgram();
  gl.attachShader(prog,mk(gl.VERTEX_SHADER,VS));
  gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,fsSrc));
  gl.linkProgram(prog);gl.useProgram(prog);
  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(prog,'position');
  gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const lRes=gl.getUniformLocation(prog,'u_resolution');
  const lT=gl.getUniformLocation(prog,'u_time');
  const lM=gl.getUniformLocation(prog,'u_mouse');
  const resize=()=>{
    const d=Math.min(window.devicePixelRatio||1,2);
    canvas.width=innerWidth*d;canvas.height=innerHeight*d;
    gl.viewport(0,0,canvas.width,canvas.height);
  };
  addEventListener('resize',resize);resize();
  return (tSec)=>{
    gl.uniform2f(lRes,canvas.width,canvas.height);
    gl.uniform1f(lT,tSec);
    gl.uniform2f(lM,mouse.x,1-mouse.y);
    gl.drawArrays(gl.TRIANGLES,0,6);
    return true;
  };
}
const drawDark=bootGL('bg-dark',FS_DARK);
const drawLight=bootGL('bg-light',FS_LIGHT);
const t0=Date.now();
(function loop(){
  const t=(Date.now()-t0)/1000;
  drawDark(t);drawLight(t);
  requestAnimationFrame(loop);
})();

// =============== 导航（翻页 / 圆点 / 键盘 / 滚轮 / 触屏） ===============
const deck=document.getElementById('deck');
const slides=deck.querySelectorAll('.slide');
const nav=document.getElementById('nav');
let idx=0,total=slides.length,lock=false;

// 关键：矫正 deck 宽度为 total * 100vw，否则翻页会错位
deck.style.width=(total*100)+'vw';

slides.forEach((s,i)=>{
  const b=document.createElement('button');
  b.className='dot';b.dataset.i=i;b.setAttribute('aria-label','Page '+(i+1));
  b.onclick=()=>go(i);
  nav.appendChild(b);
});

function go(n){
  if(lock)return;
  idx=Math.max(0,Math.min(total-1,n));
  deck.style.transform=`translateX(${-idx*100}vw)`;
  nav.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===idx));
  /* 主题切换：优先读 data-theme，其次从 class（light/dark）推断 */
  const el=slides[idx];
  const th=el.dataset.theme || (el.classList.contains('light')?'light':(el.classList.contains('dark')?'dark':'dark'));
  document.body.classList.toggle('light-bg',th==='light');
  lock=true;setTimeout(()=>lock=false,700);
}

/* =============== ESC 索引视图 =============== */
let overviewOn=false;
const ov=document.createElement('div');
ov.id='overview';
ov.style.cssText='position:fixed;inset:0;z-index:100;background:rgba(var(--ink-rgb),.92);backdrop-filter:blur(12px);display:none;overflow-y:auto;padding:4vh 4vw';
document.body.appendChild(ov);

function buildOverview(){
  ov.innerHTML='';
  const grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:2vh 1.6vw;max-width:90vw;margin:0 auto';
  slides.forEach((s,i)=>{
    const card=document.createElement('div');
    card.style.cssText='cursor:pointer;border-radius:6px;overflow:hidden;border:2px solid '+(i===idx?'rgba(var(--paper-rgb),.8)':'rgba(var(--paper-rgb),.15)')+';transition:border-color .2s';
    card.onmouseenter=()=>card.style.borderColor='rgba(var(--paper-rgb),.6)';
    card.onmouseleave=()=>card.style.borderColor=i===idx?'rgba(var(--paper-rgb),.8)':'rgba(var(--paper-rgb),.15)';
    const wrap=document.createElement('div');
    wrap.style.cssText='width:100%;aspect-ratio:16/9;overflow:hidden;position:relative;pointer-events:none;background:'+(s.classList.contains('light')?'var(--paper)':'var(--ink)');
    const clone=s.cloneNode(true);
    clone.style.cssText='width:100vw;height:100vh;transform:scale('+(1/4.5)+');transform-origin:top left;position:absolute;top:0;left:0;pointer-events:none';
    wrap.appendChild(clone);
    const label=document.createElement('div');
    label.style.cssText='padding:6px 10px;font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--paper);opacity:.7';
    label.textContent=(i+1)+' / '+total;
    card.appendChild(wrap);
    card.appendChild(label);
    card.onclick=()=>{toggleOverview();go(i)};
    grid.appendChild(card);
  });
  ov.appendChild(grid);
}

function toggleOverview(){
  overviewOn=!overviewOn;
  if(overviewOn){buildOverview();ov.style.display='block';}
  else{ov.style.display='none';}
}

addEventListener('keydown',e=>{
  if(e.key==='Escape'){e.preventDefault();toggleOverview();return;}
  if(overviewOn)return;
  if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '||e.key==='ArrowDown')go(idx+1);
  if(e.key==='ArrowLeft'||e.key==='PageUp'||e.key==='ArrowUp')go(idx-1);
  if(e.key==='Home')go(0);
  if(e.key==='End')go(total-1);
});

let wheelTO=null,wheelAcc=0;
addEventListener('wheel',e=>{
  wheelAcc+=e.deltaY+e.deltaX;
  if(Math.abs(wheelAcc)>50){go(idx+(wheelAcc>0?1:-1));wheelAcc=0;}
  clearTimeout(wheelTO);wheelTO=setTimeout(()=>wheelAcc=0,150);
},{passive:true});

let tx=0,ty=0;
addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{
  const dx=(e.changedTouches[0].clientX-tx);
  const dy=(e.changedTouches[0].clientY-ty);
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))go(idx+(dx<0?1:-1));
},{passive:true});

go(0);
</script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
</body>
</html>
```

### 参考资料

#### checklist.md

```
# 质量检查清单（Checklist）

这个清单来自"一人公司"分享 PPT 的真实迭代过程。每一条都是踩过坑之后总结的，按重要性排序。

生成 PPT 前，先通读一遍；生成后，逐项自检。

---

## 🔴 P0 · 一定不能犯的错

### 0. 生成前必须通过的类名校验(最重要)

**现象**：直接把 layouts.md 的骨架粘到新 HTML,结果样式全部丢失——大标题变成非衬线、数据大字报字体小得像正文、pipeline 多页糊成一坨、图片堆到浏览器底部。

**根因**：如果 `template.html` 的 `<style>` 里没有这些类的定义,浏览器就 fallback 到默认样式。

**做法**：
- **生成 PPT 前,必须先 `Read` `assets/template.html`**,确认 layouts.md 里用到的类都已定义
- 最常见遗漏的类:`h-hero / h-xl / h-sub / h-md / lead / meta-row / stat-card / stat-label / stat-nb / stat-unit / stat-note / pipeline-section / pipeline-label / pipeline / step / step-nb / step-title / step-desc / grid-2-7-5 / grid-2-6-6 / grid-2-8-4 / grid-3-3 / frame / img-cap / callout-src`
- 如果某个类确实缺了,**在 template.html 的 `<style>` 里补上**,不要在每页 inline 重写
- 生成后打开浏览器,如果看到"大标题是非衬线"或"pipeline 步骤挤在一行",几乎 100% 是这个问题

### 1. 不要用 emoji 作图标

**现象**：在中式杂志风格里用 emoji（🎯 💡 ✅）会立刻破坏格调。

**做法**：用 Lucide 图标库，CDN 方式引用：

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
...
<i data-lucide="target" class="ico-md"></i>
...
<script>lucide.createIcons();</script>
```

常用图标名：`target / palette / search-check / compass / share-2 / crown / check-circle / x-circle / plus / arrow-right / grid-2x2 / network`

### 2. 图片只允许裁底部，左右和顶部绝对不能切

**现象**：用 `aspect-ratio` 撑图，网格会在父容器不足时堆叠或切掉图片关键信息（比如截图上部的标题栏）。

**做法**：图片容器用**固定 height + overflow hidden**，图片走 `object-fit:cover + object-position:top`：

```html
<figure class="frame-img" style="height:26vh">
  <img src="screenshot.png">
</figure>
```

CSS 里 `.frame-img img` 已经预设 `object-position:top`，只裁底。

**绝不用这种写法**（会在网格中撑破容器）：

```html
<!-- 坏例 -->
<figure class="frame-img" style="aspect-ratio: 16/9">...</figure>
```

**例外**：单张主视觉（非网格内）可以用 `aspect-ratio + max-height`，因为父容器会兜底。

### 2b. 亮页面配暗 WebGL = 灰蒙蒙(主题切换没生效)

**现象**:所有 light 页面背景都像蒙了一层灰,甚至 hero light 也灰。

**根因**:JS 根据 slide 的主题切换两张 canvas 的 opacity。如果整个 deck 开场是 hero dark,而没有任何机制能把 bg 切到 light,body 永远不加 `light-bg` 类,`canvas#bg-dark` 一直在上面。

**做法**:
- 模板里 `go()` 函数已改为从 `classList` 推断主题(`light` / `dark`),所以 **slide 必须明确带 `light` 或 `dark` 类**。不要漏写,更不要用其他自定义主题名
- hero 页用 `hero light` / `hero dark`,正文页用 `light` / `dark`。只写 `hero` 不带主题色是坏的
- 一个 deck 里必须至少有一个 **非 hero 的 light 页**,确保 body 有机会加 `light-bg`

### 2b-2. 整个 deck 全是 light,没有节奏

**现象**:除封面 `hero dark` 外,其余所有页面默认写 `light`——视觉平淡,没有呼吸感,白花花一片。

**根因**:layouts.md 的骨架默认全写 `light`,如果只是粘贴骨架不调整主题,就会全亮。

**做法**:
- **生成前画"主题节奏表"**:每一页写清 `hero dark` / `hero light` / `light` / `dark` 中的哪一个,对齐后再写代码
- **硬规则**:连续 3 页以上同主题 = 不允许;8 页以上必须有 ≥1 `hero dark` + ≥1 `hero light`;不能全是 `light` 正文页——必须有 `dark` 正文页
- **按布局选主题**(详见 layouts.md 开头"主题节奏规划"):
  - 左文右图(Layout 4)、大引用(Layout 8)、图文混排(Layout 10)→ **`light` / `dark` 交替**
  - 大字报、图片网格、Pipeline、对比页 → `light`(截图/数字/流程需要亮底)
  - 封面、问题页 → `hero dark`
  - 章节幕封 → `hero dark` 与 `hero light` 交替
- **生成后自检**:`grep 'class="slide' index.html`,目视确认节奏有交错

### 2c. chrome 和 kicker 不要写同一句话

**现象**:左上角 `.chrome` 写"Design First · 设计先行",同一页里 `.kicker` 又写"Phase 01 · 设计阶段"——同义翻译,AI 味浓。

**做法**:
- **chrome = 杂志页眉 / 导航标签**:跨多页可相同(如 "Act II · Workflow"、"Data · Result"、"lukew.com · 2026.04")
- **kicker = 本页独一份的引导句**:短、有钩子、是大标题的"小前缀"(如 "BUT"、"一个人,做了什么。"、"The Question")
- 一个描述栏目,一个描述这一页——绝不互相翻译

### 3. 大标题字号不能超过屏宽 / 单字数

**现象**：中文大标题字号设太大（比如 13vw），结果每行只容 1 个字，强制换行非常难看。

**做法**：
- `h-hero`（最大）：10vw，**且标题长度 ≤ 5 字**
- `h-xl`（次大）：6vw-7vw
- 长标题用 `<br>` 手工断行，不要依赖自动换行
- 必要时加 `white-space:nowrap`

**示例**：`我不是程序员。`（6 字）用 `h-xl` 7.2vw + nowrap，一行排完。

### 4. 字体分工：标题衬线、正文非衬线

**做法**：
- 大标题、重点 quote、数字大字 → **衬线字体**（Noto Serif SC + Playfair Display + Source Serif）
- 正文、描述、pipeline 步骤名 → **非衬线字体**（Noto Sans SC + Inter）
- 元数据、代码、标签 → **等宽字体**（IBM Plex Mono + JetBrains Mono）

所有字体用 Google Fonts CDN 引入，模板里已预设。

### 4b. 图片不要用 `align-self:end` 贴底

**现象**：左文右图布局里,为了让右列图片和左列 callout 底部对齐,在 `<figure>` 上加 `align-self:end`。结果:
- 如果父容器不是 grid(比如类名没定义),`align-self` 完全失效,图片掉到文档流最下面被浏览器底栏遮挡
- 即使是 grid,图片会在 cell 里贴底,低分屏上仍然被 `.foot` 和 `#nav` 圆点遮挡

**做法**:
- 图文混排**必须用 `.frame.grid-2-7-5`**(或 `.grid-2-6-6`/`.grid-2-8-4`)
- 右列 `<figure class="frame-img">` 用 **标准比例 16/10 或 4/3 + max-height:56vh**,自然贴顶即可
- 要让左列 callout 看起来"贴底",给**左列**加 flex column + `justify-content:space-between`,不要动右列

### 4c. 图片不要用原图奇葩比例

**现象**:`aspect-ratio: 2592/1798` 这种从原图复制的比例,在不同屏幕下撑出奇怪的空白或溢出。

**做法**:无论原图什么比例,占位器固定用标准比例 **16/10 / 4/3 / 3/2 / 1/1 / 16/9**。图片自动 `object-fit:cover + object-position:top`,顶部不裁,底部裁掉一点无伤大雅。

### 5. 不要给图片加厚边框 / 阴影

**现象**：为了"高级感"加了强阴影或黑框，瞬间变成商务 PPT。

**做法**：最多 1-4px 的微圆角 + **极淡的底噪**（已在模板里）。不要加 `box-shadow`，不要加 `border`（除非 1px 极淡的灰）。

---

## 🟡 P1 · 排版节奏

### 6. Hero 页和非 hero 页要交替

**推荐节奏**（25-30 页）：
```
Hero Cover → Act Divider (hero) → 3-4 pages non-hero → Act Divider (hero)
→ 4-5 pages non-hero → Hero Question → ... → Hero Close
```

连续 2 页以上 hero 会让人疲劳，连续 4 页以上 non-hero 会让节奏死。

### 7. 大字报页和密集页要交替

大字报（big numbers / hero question）和密集页（pipeline / image grid）交替出现，听众眼睛才不累。

### 8. 同一概念的英文/中文用法要统一

**现象**：一会儿写 "Skills"，一会儿写 "技能"，一会儿写 "薄承载厚技能"，全篇不一致。

**做法**：
- 术语优先用**英文单词**（Skills / Harness / Pipeline / Workflow），这些都是圈内熟悉词
- **别硬翻译**，硬翻译反而生硬
- 整个 deck 里同一个词 1 个写法

### 9. 底部 chrome 的页码要一致

用 `XX / 总页数` 的格式（比如 `05 / 27`）。**不要在右上角加动态页码**（会和 `.chrome` 重复）。

---

## 🟢 P2 · 视觉打磨

### 10. WebGL 背景的遮罩透明度

**dark hero**：遮罩 12-15%（WebGL 明显透出）
**light hero**：遮罩 16-20%（WebGL 隐约可见，不抢字）
**普通 light/dark 页**：遮罩 92-95%（几乎不透）

如果页面文字非常少（hero question），遮罩可以再薄些；如果正文密集，必须加厚遮罩确保可读。

### 11. Light hero 的 shader 不能有强中心点

**现象**：Spiral Vortex、径向涟漪在 light 主题下太显眼，像 Windows 98 屏保。

**做法**：light hero 用 FBM 域扭曲驱动的无中心流动，底色保持银/纸色（接近 #F0F0F0 / #FBF8F3），彩虹偏色 subtle（0.05 以下）。

### 12. Dark hero 允许更多视觉冲击

Dark hero 可以用 Holographic Dispersion（钛金色散）等带中心结构的 shader，因为黑底能容纳更多视觉信息。

### 13. 左文右图的对齐

- 左列的文字组 `justify-content:space-between`：标题贴顶，引用框贴底
- 右列图片 `align-self:end`：和左列的底部元素对齐
- 网格整体 `align-items:start`（不是 `center` / `end`）

### 14. 图片的微弱圆角

所有 `.frame-img` 和 `.frame-img img` 都加 `border-radius:4px`，视觉上"柔和"但不软。**不要超过 8px**，否则像消费 app UI。

---

## 🔵 P3 · 操作细节

### 15. 图片路径用相对路径

图片放在 `images/` 文件夹下，HTML 里用相对路径 `images/xxx.png`，不要用绝对路径。

### 16. 页码在 `.chrome` 里写死

JS 会动态算总页数并扩展底部翻页圆点，但 `.chrome` 里的 `XX / N` 是写死的。加页/删页时要手工改 N。

### 17. 翻页导航要保留

模板默认支持：← → / 滚轮 / 触屏滑动 / 底部圆点 / Home·End。不要删 JS 里的导航逻辑。

### 18. 不要用 `height:100vh` 硬设，用 `min-height:80vh`

`100vh` 会让内容刚好卡满屏幕，但浏览器工具栏、标签栏会吃掉一部分高度，导致内容溢出。用 `min-height:80vh + align-content:center` 更稳。

---

## 🧪 最终自检清单

生成完 PPT 后，逐项对照这个清单（勾一下）：

```
预检(生成前)
  □ 已读过 template.html 的 <style>,确认所需类都存在
  □ 已决定每页用哪个 Layout(1-10)
  □ 已画出"主题节奏表":每页明确 hero dark / hero light / light / dark
  □ 节奏表满足硬规则:无连续 3 页同主题 / 有 ≥1 hero dark + ≥1 hero light(8 页以上) / 至少有 1 个 dark 正文页
  □ `<title>` 已改为实际 deck 标题(grep "[必填]" 应无结果)

内容
  □ 每一幕的页数比例合理(不会头重脚轻)
  □ 没有使用 emoji 作图标
  □ Skills / Harness 等术语用法统一
  □ 每页的 kicker + 标题 + 正文 三级信息清晰

排版
  □ 所有大标题没有出现 1 字 1 行的换行
  □ 图片网格用 height:Nvh 而非 aspect-ratio
  □ 图片只裁底部，顶部和左右完整
  □ 衬线/非衬线字体分工符合模板
  □ Pipeline 多组之间有明显分隔

视觉
  □ hero 页和 non-hero 页交替
  □ WebGL 背景在 hero 页可见
  □ 图片有微弱圆角
  □ 没有沉重的阴影和边框

交互
  □ ← → 翻页正常
  □ 底部圆点数量与总页数匹配
  □ chrome 里的页码和实际页号一致
  □ ESC 键触发索引视图（如果保留）
```

全勾完，才是合格的 PPT。
```

#### components.md

```
# 组件参考 · Components

这是 `magazine-web-ppt` skill 的组件手册。template.html 已经定义好了所有样式，这里只写"这个组件长什么样、怎么用"。

## 目录

- [基础 Slide 外壳](#基础-slide-外壳)
- [字体 Typography](#字体-typography)
- [Chrome & Foot](#chrome--foot)
- [Callout 引用框](#callout-引用框)
- [Stat 数字矩阵](#stat-数字矩阵)
- [Platform 平台卡](#platform-平台卡)
- [Rowline 表格行](#rowline-表格行)
- [Pillar 支柱卡](#pillar-支柱卡)
- [Tag & Kicker](#tag--kicker)
- [Figure 图片框](#figure-图片框)
- [Icons 图标](#icons-图标)
- [Ghost 巨型背景字](#ghost-巨型背景字)
- [Highlight 荧光标记](#highlight-荧光标记)

---

## 基础 Slide 外壳

每一页都是一个 `<section class="slide ...">`。必须包含 `data-theme` 属性（`light` 或 `dark`），JS 翻页时会根据这个属性切换背景。

```html
<section class="slide light" data-theme="light">   <!-- 浅色页 -->
<section class="slide dark" data-theme="dark">     <!-- 深色页 -->
<section class="slide light hero" data-theme="light">  <!-- Hero 页：浅色 + 薄遮罩透出 WebGL -->
<section class="slide dark hero" data-theme="dark">    <!-- Hero 页：深色 + 薄遮罩 -->
```

**light vs dark 的使用：交替使用**，每 2-3 页切换一次主题，避免连续超过 3 页同色。翻页时 WebGL 背景会自动在两个 shader 之间渐变过渡。

**hero 类的使用**：只给视觉主导的页面加（封面、金句页、章节过渡、结尾）。加 `hero` 后遮罩降到 12-16%，WebGL 背景会大幅透出，所以不要在 hero 页上放太多文字。

---

## 字体 Typography

字体分工是本模板最重要的规则，严禁混用。

| Class | 用途 | 字体 |
|---|---|---|
| `.display` | 超大号英文（Hero 页） | Playfair Display 700, 11vw |
| `.display-zh` | 超大号中文标题 | Noto Serif SC 700, 7.8vw |
| `.h1-zh` | 页面主标题 | Noto Serif SC 700, 4.6vw |
| `.h2-zh` | 副标题 | Noto Serif SC 600, 3.2vw |
| `.h3-zh` | 流水线步骤标题 | Noto Serif SC 500, 1.9vw |
| `.lead` | 引导段（比 body 大） | Noto Serif SC 400, 1.9vw |
| `.body-zh` | **正文/描述（非衬线）** | Noto Sans SC 400, 1.22vw |
| `.body-serif` | 正文（衬线） | Noto Serif SC 400, 1.3vw |
| `.kicker` | 小节提示（标题上方） | IBM Plex Mono, 12px uppercase |
| `.meta` | 元信息标签 | IBM Plex Mono, 0.88vw uppercase |
| `.big-num` | 巨型数字 | Playfair Display 800, 10vw |
| `.mid-num` | 中号数字 | Playfair Display 700, 5.5vw |

**核心规则**：
- **衬线**（`serif-zh` / `serif-en`）：标题、重点金句、数字 —— 用于"视觉重音"
- **非衬线**（`sans-zh`）：正文描述、大段阅读内容 —— 用于"信息密度"
- **等宽**（`mono`）：kicker、meta、foot 的英文标签 —— 用于"装饰节奏"

**强调技巧**：
- `<em class="en">英文词</em>` —— 把英文词渲染成 Playfair Display 斜体（很好看）
- `<em style="opacity:.65">短语</em>` —— 让标题后半段淡出，制造节奏

---

## Chrome & Foot

每一页的顶部和底部的元信息条。几乎所有页都应该有。

```html
<div class="chrome">
  <div class="left">
    <span>第一幕 · 硬数据</span>
    <span class="sep"></span>
    <span>Act I</span>
  </div>
  <div class="right"><span>02 / 27</span></div>
</div>

<!-- ... 页面主体 ... -->

<div class="foot">
  <div class="title">项目名 · CodePilot　|　github.com/codepilot</div>
  <div>Act I · Dev Numbers</div>
</div>
```

**规则**：
- `chrome.right` 总是放页码 `NN / TOTAL` （TOTAL 为总页数）
- `foot.title` 是中文说明，`foot.right` 是英文 act 标记
- chrome 和 foot 共同构成杂志感的"页眉页脚"

---

## Callout 引用框

展示金句 / 关键观点 / 他人引言。

```html
<div class="callout" style="max-width:80vw">
  <div class="q-big">"这东西在三年前，<br>需要一个十人团队做一年。"</div>
  <span class="cite">— 一个观察者的判断</span>
</div>
```

变体：
- 不带 cite：去掉 `<span class="cite">` 即可
- 带英文金句：`<em class="en">"Thin Harness, Fat Skills."</em>`
- 在 hero 页使用：外层加 `style="position:relative;z-index:2"`（避免被背景遮罩盖住）

---

## Stat 数字矩阵

展示数据指标，常与 `.grid-6` / `.grid-4` 配合。

```html
<div class="grid-6">
  <div class="stat">
    <span class="m">Duration</span>
    <span class="n">64<em style="font-size:.4em;opacity:.5;font-style:normal"> 天</em></span>
    <span class="l">从 0 到现在</span>
  </div>
  <!-- ... 更多 stat ... -->
</div>
```

三段式结构：`.m` 等宽小标签 → `.n` 巨型数字 → `.l` 描述说明。数字后的单位用 `<em>` 缩小到 0.4em，opacity 0.5。

**常用布局容器**：
- `.grid-6` — 3×2 网格（最常用，6 个 stat）
- `.grid-4` — 2×2 网格（4 个 stat）
- `.grid-3` — 3 等分单行（3 个 stat / pillar）

---

## Platform 平台卡

展示社交平台 / 渠道 + 粉丝数。

```html
<div class="plat">
  <div class="sub">Weibo</div>
  <div class="name">微博</div>
  <div class="nb">289K</div>
</div>
```

可选第四行（补充说明）：
```html
<div class="body-zh" style="font-size:max(11px,.8vw);opacity:.5;margin-top:.6vh">
  含小绿书同步
</div>
```

**"Also On" 变体**（补充平台）：
```html
<div class="plat" style="border-top-style:dashed;opacity:.72">
  <div class="sub">Also On</div>
  <div class="body-zh" style="font-weight:600;margin-top:.8vh">
    B 站　·　知乎
  </div>
</div>
```

---

## Rowline 表格行

列表式内容，每行一个条目。

```html
<div class="rowline">
  <div class="k">CLAUDE.md</div>
  <div class="v">你该怎么做事 —— 行为规则 + 工作偏好 + 禁止事项</div>
  <div class="m">EMPLOYEE · HANDBOOK</div>
</div>
```

三列结构：`.k` 衬线关键词 · `.v` 正文描述 · `.m` 等宽标签（右对齐）。第一个和最后一个 rowline 自动加上下边框。

**变体：2 列**：`style="grid-template-columns:1fr 3fr"` 去掉 `.m` 列。

---

## Pillar 支柱卡

三支柱结构，常用于"概念并列"类型页面。

```html
<div class="grid-3">
  <div class="pillar">
    <div class="ic">01</div>
    <div class="t">三层<br>文档体系</div>
    <div class="d">CLAUDE.md<br>+ 项目知识库<br>+ 护栏文件</div>
  </div>
  <!-- ... 更多 pillar ... -->
</div>
```

**带图标的 pillar（用于强调性页面）**：
```html
<div class="pillar" style="padding:4vh 2vw;border:1px solid currentColor;border-color:rgba(10,10,11,.2)">
  <div class="ic"><i data-lucide="compass" class="ico-lg"></i></div>
  <div class="t">判断力</div>
  <div class="d">决策和方向的权威。<br>取舍、品味、方向感。</div>
</div>
```

`.ic` 可以是序号（`01 / 02 / 03` 或 `A. / B. / C.`），也可以是 Lucide 图标。

---

## Tag & Kicker

**Kicker** 是标题上方的小提示文字（等宽、全大写、小字号）：
```html
<div class="kicker">过去 64 天 · 开发篇</div>
<div class="h1-zh">一个人，做了什么。</div>
```

**Tag** 是独立的标签胶囊（带边框）：
```html
<div style="display:flex;gap:1.6vw;flex-wrap:wrap">
  <div class="tag">早上 10 点起床</div>
  <div class="tag">周二 / 四下午健身</div>
  <div class="tag">晚上照样看剧 · 玩游戏</div>
</div>
```

---

## Figure 图片框

**这是本模板最容易踩坑的组件，务必遵守以下规则**。

### 基础结构

```html
<figure class="tile">
  <div class="frame-img" style="height:26vh">
    <img src="图片素材/xxx.png" alt="说明">
  </div>
  <figcaption class="frame-cap">
    <span class="pf">推特 · Twitter</span>
    <span class="nb">137K</span>
  </figcaption>
</figure>
```

### 关键约束（血泪经验，不要违反）

1. **必须用 `height:Nvh` 固定高度**，不要用 `aspect-ratio`。
   - 原因：用 aspect-ratio 在网格里会撑破父容器，导致图片堆叠。
   - 推荐尺寸：`height:18vh` (紧凑条形) / `22vh` (标准网格) / `26vh` (突出展示) / `28vh` (大图)。

2. **`object-position:top center`（已在 CSS 里设好）**，只允许裁掉底部。
   - 严禁裁剪左右和顶部 —— 这是图片的核心身份信息区。

3. **网格里多张图时，用内联 grid 而不是 `grid-3`**：
   ```html
   <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1vh 1.2vw">
     <figure class="tile">...</figure>
     <figure class="tile">...</figure>
     <figure class="tile">...</figure>
   </div>
   ```

4. **图片与布局其他部分对齐**：figure 单独加 `align-self:end` 让图片贴底。

### Frame Caption 变体

```html
<!-- 标准：左 figure 名，右数字 -->
<figcaption class="frame-cap">
  <span class="pf">推特 · Twitter</span>
  <span class="nb">137K</span>
</figcaption>

<!-- 带编号 -->
<figcaption class="frame-cap">
  <span class="idx">01</span>
  <span class="pf">AI 润色</span>
  <span>Polish</span>
</figcaption>
```

### 图片占位（设计阶段占位符）

图片还没有就位时，用虚线框占位：
```html
<div class="img-slot r-4x3">  <!-- r-4x3 / r-16x9(default) / r-3x2 / r-1x1 -->
  <span class="plus">+</span>
  <span class="label">GitHub 截图位置</span>
</div>
```

---

## Icons 图标

**严禁使用 emoji**。用 Lucide via CDN（template.html 已引入）。

```html
<i data-lucide="compass" class="ico-lg"></i>     <!-- 大图标（pillar 用） -->
<i data-lucide="target" class="ico-md"></i>      <!-- 中图标（列表项用） -->
<i data-lucide="check-circle" class="ico-sm"></i>  <!-- 小图标（inline 用） -->
```

**常用 Lucide 图标名**（按含义分组）：

- 判断类：`compass`, `target`, `crosshair`, `search-check`
- 关系类：`share-2`, `users`, `network`, `link`, `handshake`
- 品牌类：`crown`, `gem`, `award`, `star`, `badge-check`
- 流程类：`workflow`, `route`, `arrow-right-left`, `repeat`
- 数据类：`grid-2x2`, `bar-chart-3`, `trending-up`, `activity`
- 审美类：`palette`, `brush`, `eye`, `sparkles`
- 对错类：`check-circle`, `x-circle`, `check`, `x`
- 方向类：`arrow-right`, `arrow-up-right`, `corner-down-right`

**图标与文字 inline 组合**：
```html
<div class="h3-zh" style="display:flex;align-items:center;gap:.8em">
  <i data-lucide="target" class="ico-md"></i>
  判断 — 什么值得写
</div>
```

---

## Ghost 巨型背景字

用作"装饰性背景字"，极低透明度，营造杂志感。

```html
<div class="ghost" style="right:-6vw;top:-8vh">BUT</div>
<div class="ghost" style="left:-8vw;bottom:-18vh;font-style:italic">Harness</div>
```

- 字号 34vw，opacity 0.06
- 常用定位：`right:-6vw;top:-8vh`（右上超出）/ `left:-8vw;bottom:-18vh`（左下超出）
- 内容：英文单词或数字（章节序号 01/02/03、关键词 BUT/NOW/HERE）

**注意**：使用 ghost 的页面里，其他内容要加 `position:relative;z-index:2` 避免被压到下面。

---

## Highlight 荧光标记

行内短语的"荧光笔"效果：

```html
<span class="hi">不是</span>
<span class="hi">一次性爆发</span>
```

在文字底部生成一条半透明高亮条。深色主题用亮条，浅色主题用暗条（CSS 已处理）。

**适合场景**：只对关键 1-3 个词使用，不要大面积用。
```

#### layouts.md

```
# 页面布局库（Layouts）

本文档收录 10 种最常用的页面布局骨架。每种都是一个完整可粘贴的 `<section class="slide ...">...</section>` 代码块，直接替换文案/图片即可使用。

---

## ⚠️ 生成前必读（Pre-flight）

### A. 类名必须来自 template.html

layouts.md 使用的所有类（`h-hero` / `h-xl` / `h-sub` / `h-md` / `lead` / `meta-row` / `stat-card` / `stat-label` / `stat-nb` / `stat-unit` / `stat-note` / `pipeline-section` / `pipeline-label` / `pipeline` / `step` / `step-nb` / `step-title` / `step-desc` / `grid-2-7-5` / `grid-2-6-6` / `grid-2-8-4` / `grid-3-3` / `grid-6` / `grid-3` / `grid-4` / `frame` / `frame-img` / `img-cap` / `callout` / `callout-src` / `kicker`）都在 `assets/template.html` 的 `<style>` 块里预定义。

**不要发明新类名**。如果必须自定义，用 `style="..."` inline 写。生成前若不确定某个类是否存在，grep template.html 确认。

### B. 图片比例规范（非常重要）

**永远用标准比例**，不要用原图 `aspect-ratio: 2592/1798` 这种奇葩比例：

| 场景 | 推荐比例 | 写法 |
|------|---------|------|
| 左文右图 主图 | 16:10 或 4:3 | `aspect-ratio:16/10; max-height:54vh` |
| 图片网格（多图对比） | 统一 | **固定 `height:26vh`，不用 aspect-ratio** |
| 左小图 + 右文字 | 1:1 或 3:2 | `aspect-ratio:1/1; max-width:40vw` |
| 全屏主视觉 | 16:9 | `aspect-ratio:16/9; max-height:64vh` |
| 图文混排小插图 | 3:2 | `aspect-ratio:3/2; max-width:30vw` |

图片必须包在 `<figure class="frame-img">` 里，里面的 `<img>` 会自动 `object-fit:cover + object-position:top center`，只裁底部，不裁顶/左/右。

### C. 图片定位准则（避免图片堆到页面最底部、被浏览器工具栏遮挡）

**错误做法**（已踩坑，不要再犯）：
- 在非 grid 容器里用 `align-self:end`：`align-self` 在 flex/grid 之外完全无效，图片会掉到文档流末尾堆底
- 用 `position:absolute + bottom:0` 把图"固定"到底：会被底部 `.foot` 和 `#nav` 圆点遮挡
- 单张图片只写 `height:N vh` 不限 `max-height`：在低分屏会撑出视口

**正确做法**：
- 图文混排**必须用 `.frame.grid-2-7-5`**（或 `.grid-2-6-6` / `.grid-2-8-4`）的 grid 结构
- grid 容器默认 `align-items:start`（已在 template 中设置），图片自然贴到 cell 顶端
- 如果需要"图片底对齐左列 callout"：**左列用 flex column + `justify-content:space-between`**（让 callout 自己贴左列底），**右列 figure 直接保持 align-items:start 即可**，不要加 `align-self:end`
- 所有 grid 父容器建议加 inline `style="padding-top:6vh"`，给标题区留呼吸空间

### D. 主题色与主题节奏

- 主题色从 `references/themes.md` 的 5 套预设里选一套,不允许自定义 hex 值
- 主题节奏(每页用 light / dark / hero light / hero dark 哪一个)在下文"主题节奏规划"一节有硬规则,生成前必读
- 两件事都要在挑布局之前决定,避免返工

---

## 0. 基础结构（所有 slide 都一样）

```html
<section class="slide [light|dark|hero light|hero dark]">
  <div class="chrome">
    <div>上下文标签 · 子标签</div>
    <div>ACT · 页号 / 总页数</div>
  </div>
  <!-- 主内容 -->
  <div class="foot">
    <div>页码说明 · Page Description</div>
    <div>— · —</div>
  </div>
</section>
```

- 非 hero 页建议加 `light` 或 `dark` 主题；hero 页加 `hero light` 或 `hero dark`（参与 WebGL 主题插值）
- `chrome` 和 `foot` 是可选但推荐保留的上下左右四角元数据
- **hero 页用于章节封面/开场/收束/转场**，非 hero 页用于正文

### ⚠️ chrome 和 kicker 不要写同一句话

这是最常见的内容重复问题。两者在语义上完全不同的维度：

| 位置 | 角色 | 内容性质 | 例子 |
|------|------|---------|------|
| `.chrome` 左上 | **杂志页眉 / 导航元数据** | 稳定的"栏目名"或"章节分类"，跨多页可以相同 | "Act II · Workflow" / "Data · Result" / "lukew.com · 2026.04" |
| `.chrome` 右上 | **页号 + 幕号** | 固定格式 | "Act II · 15 / 25" |
| `.kicker` | **这一页独一份的引导句** | 是大标题的"小前缀"，像杂志大标题上方的一行话，每页都应不同 | "BUT" / "一个人,做了什么。" / "Phase 01 · 设计阶段" |

**反例**（已踩坑）：chrome 写"设计先行 · Design First"，kicker 又写"Phase 01 · 设计阶段"——意思重复，读者一眼就觉得 AI 生成的。

**正确做法**：chrome 是**栏目标签**（稳定、跨页可复用），kicker 是**本页钩子**（短句、有戏剧性），两者互为补充，不互相翻译。

### ⚠️ 主题节奏规划（必读 · 生成前必做)

**核心机制**:每页 `<section>` 必须带 `light` / `dark` / `hero light` / `hero dark` 之一。JS 根据 class 推断主题,决定 body 加不加 `light-bg`,从而切换暗/亮两张 WebGL canvas 哪张在前。不带主题或写自定义名 = fallback 出错。

#### 按布局的主题默认值

| Layout | 默认主题 | 原因 |
|---|---|---|
| 1. 开场封面 | `hero dark` | 开场仪式感,暗底强冲击 |
| 2. 章节幕封 | `hero dark` 与 `hero light` **必须交替** | 呼吸节奏 |
| 3. 大字报(数据) | `light` | 数字需纸白底;多幕连发时可偶插 `dark` |
| 4. 左文右图 | **`light` / `dark` 交替** | 正文节奏主力 |
| 5. 图片网格 | `light` | 截图需亮底 |
| 6. Pipeline | `light` | 流程图需清晰 |
| 7. 问题页 | `hero dark` | 强视觉冲击默认 |
| 8. 大引用 | **`dark` 优先**,偶用 `light` | 金句仪式感靠暗底 |
| 9. 对比页 | `light` | 双列需清晰 |
| 10. 图文混排 | **`light` / `dark` 交替** | 节奏 |

#### 节奏硬规则(生成后 grep 自检)

- ❌ **禁止**连续 3 页以上相同主题(包括 light 堆叠和 dark 堆叠)
- ❌ **禁止**8 页以上的 deck 没有至少 1 个 `hero dark` + 1 个 `hero light`
- ❌ **禁止**整个 deck 只有 `light` 正文页没有任何 `dark` 正文页——会显得平淡、没呼吸
- ✅ **推荐**每 3-4 页插入 1 个 hero(封面/幕封/问题/大引用)

#### 8 页节奏模板(可直接套用)

| 页 | 主题 | 布局 | 备注 |
|---|---|---|---|
| 1 | `hero dark` | 封面 | 开场 |
| 2 | `light` | 大字报 | 数据抛出 |
| 3 | `dark` | 左文右图 | 对比/故事 |
| 4 | `light` | Pipeline | 流程 |
| 5 | `hero light` | 章节幕封 | 呼吸 |
| 6 | `dark` | 左文右图 or 大引用 | |
| 7 | `hero dark` | 问题页 | 悬念收束 |
| 8 | `light` | 大引用/结尾 | 收尾 |

**先画这张表对齐,再动手写 slide**。跳过规划直接粘骨架 = 全是 light。

---

## Layout 1: 开场封面（Hero Cover）

```html
<section class="slide hero dark">
  <div class="chrome">
    <div>A Talk · 2026.04.22</div>
    <div>Vol.01</div>
  </div>
  <div class="frame" style="display:grid; gap:4vh; align-content:center; min-height:80vh">
    <div class="kicker">私享会 · 李继刚</div>
    <h1 class="h-hero">一人公司</h1>
    <h2 class="h-sub">被 AI 折叠的组织</h2>
    <p class="lead" style="max-width:60vw">
      一个 AI 创作者 —— 在 64 天里做了 11 万行代码、在 9 个平台上持续输出，生活节奏几乎没有被改变。
    </p>
    <div class="meta-row">
      <span>歸藏 Guizang</span><span>·</span><span>独立创作者 / CodePilot 作者</span>
    </div>
  </div>
  <div class="foot">
    <div>一场关于 AI · 组织 · 个体的分享</div>
    <div>— 2026 —</div>
  </div>
</section>
```

**要点**：
- 用 `hero dark` 让 WebGL 背景在大部分区域透出
- `h-hero` 是最大字号（10vw），这里作标题主视觉
- 用 `min-height:80vh + align-content:center` 让内容整体垂直居中
- 不需要 `.chrome` 里写页码，封面页自成一体

---

## Layout 2: 章节幕封（Act Divider）

```html
<section class="slide hero light">
  <div class="chrome">
    <div>第一幕 · 硬数据</div>
    <div>Act I · 01 / 25</div>
  </div>
  <div class="frame" style="display:grid; gap:6vh; align-content:center; min-height:80vh">
    <div class="kicker">Act I</div>
    <h1 class="h-hero" style="font-size:8.5vw">硬数据</h1>
    <p class="lead" style="max-width:55vw">
      先看数字，再谈方法。
    </p>
  </div>
  <div class="foot">
    <div>第一幕引子</div>
    <div>— · —</div>
  </div>
</section>
```

**要点**：
- 极简，只需要 kicker + 大标题 + 一行引语
- 两个幕的封面可以交替 `hero light` / `hero dark`，制造节奏
- `h-hero` 字号可以从 10vw 调到 8.5vw 适配长短

---

## Layout 3: 数据大字报（Big Numbers Grid）

```html
<section class="slide light">
  <div class="chrome">
    <div>过去 64 天 · 开发篇</div>
    <div>Act I / Dev · 02 / 25</div>
  </div>
  <div class="frame" style="padding-top:6vh">
    <div class="kicker">一个人，做了什么。</div>
    <h2 class="h-xl">过去 64 天</h2>
    <p class="lead" style="margin-bottom:5vh">从 0 到开源 CodePilot。</p>

    <div class="grid-6" style="margin-top:6vh">
      <div class="stat-card">
        <div class="stat-label">Duration</div>
        <div class="stat-nb">64 <span class="stat-unit">天</span></div>
        <div class="stat-note">从 0 到现在</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Lines of Code</div>
        <div class="stat-nb">110K+</div>
        <div class="stat-note">一行行写到 11 万+</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">GitHub Stars</div>
        <div class="stat-nb">5,166</div>
        <div class="stat-note">一个开源仓库</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Downloads</div>
        <div class="stat-nb">41K+</div>
        <div class="stat-note">装到了几万台电脑里</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">AI Providers</div>
        <div class="stat-nb">19</div>
        <div class="stat-note">跨平台接入</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Commits</div>
        <div class="stat-nb">608+</div>
        <div class="stat-note">没有协作者</div>
      </div>
    </div>
  </div>
  <div class="foot">
    <div>项目 · CodePilot　|　github.com/codepilot</div>
    <div>Act I · Dev Numbers</div>
  </div>
</section>
```

**要点**：
- 3×2 或 4×2 网格最稳（见 `.grid-6`）
- 每个 `stat-card` 结构固定：label（英文小字）→ nb（大字数字）→ note（注释）
- 数字建议 2-3 位字符（太长会溢出），用 K / M 简写
- 留 5vh 以上的上方缓冲，让标题区先抢眼球

---

## Layout 4: 左文右图（Quote + Image）

```html
<section class="slide light">
  <div class="chrome">
    <div>身份反差 · The Twist</div>
    <div>03 / 25</div>
  </div>
  <div class="frame grid-2-7-5" style="padding-top:6vh">
    <!-- 左列：标题 + 正文 + callout，flex column 让 callout 贴列底 -->
    <div style="display:flex; flex-direction:column; justify-content:space-between; gap:3vh">
      <div>
        <div class="kicker">BUT</div>
        <h2 class="h-xl" style="white-space:nowrap; font-size:7.2vw">
          我不是程序员。
        </h2>
        <p class="lead" style="margin-top:3vh">
          大学毕业之后再也没写过一行代码。过去十年做的是 UI 设计和 AI 特效。
        </p>
      </div>
      <div class="callout">
        "这东西在三年前，<br>
        需要一个十人团队做一年。"
        <div class="callout-src">— 一个观察者的判断</div>
      </div>
    </div>
    <!-- 右列：图片用标准 16/10 比例 + max-height，不要 align-self:end -->
    <figure class="frame-img" style="aspect-ratio:16/10; max-height:56vh">
      <img src="images/codepilot.png" alt="CodePilot 产品截图">
      <figcaption class="img-cap">CodePilot · 产品截图</figcaption>
    </figure>
  </div>
  <div class="foot">
    <div>Page 03 · 我不是程序员</div>
    <div>— · —</div>
  </div>
</section>
```

**要点**：
- 用 `grid-2-7-5`（左 7 份、右 5 份），`align-items:start` 已在 template 预设
- **左列**用 flex column + `justify-content:space-between`：标题贴顶，callout 自然贴底
- **右列图片** **不要加 `align-self:end`**。会让图片滑到 cell 底部，低分屏下被浏览器工具栏遮挡
- 图片必须用 **标准比例 16/10 或 4/3 + `max-height:56vh`**，不要用原图奇葩比例（`2592/1798` 这种）

---

## Layout 5: 图片网格（多图对比）

```html
<section class="slide light">
  <div class="chrome">
    <div>平台粉丝实证</div>
    <div>Act I / Ops · 05 / 27</div>
  </div>
  <div class="frame" style="padding-top:5vh">
    <div class="kicker">Proof · 粉丝实证</div>
    <h2 class="h-xl">10 个平台 · 6 张截图</h2>

    <div class="grid-3-3" style="margin-top:4vh">
      <figure class="frame-img" style="height:26vh">
        <img src="images/weibo.png" alt="微博 289K">
        <figcaption class="img-cap">微博 · 289K</figcaption>
      </figure>
      <figure class="frame-img" style="height:26vh">
        <img src="images/twitter.png" alt="推特 137K">
        <figcaption class="img-cap">推特 · 137K</figcaption>
      </figure>
      <figure class="frame-img" style="height:26vh">
        <img src="images/wechat.png" alt="公众号 96K">
        <figcaption class="img-cap">公众号 · 96K</figcaption>
      </figure>
      <figure class="frame-img" style="height:26vh">
        <img src="images/jike.png" alt="即刻 26K">
        <figcaption class="img-cap">即刻 · 26K</figcaption>
      </figure>
      <figure class="frame-img" style="height:26vh">
        <img src="images/xhs.png" alt="小红书 19K">
        <figcaption class="img-cap">小红书 · 19K</figcaption>
      </figure>
      <figure class="frame-img" style="height:26vh">
        <img src="images/douyin.png" alt="抖音 10K">
        <figcaption class="img-cap">抖音 · 10K</figcaption>
      </figure>
    </div>
  </div>
  <div class="foot">
    <div>截图时间 · 2026.04</div>
    <div>Page 05 · 粉丝实证</div>
  </div>
</section>
```

**要点**：
- 关键：每个 `frame-img` 必须写死 `height:NNvh`（不要用 `aspect-ratio`），否则网格会撑破
- 图片会自动 `object-fit:cover + object-position:top`，只裁底部
- 用 `.grid-3-3`（3×2）或 `.grid-3`（3×1）承载

---

## Layout 6: 两列流水线（Pipeline）

```html
<section class="slide light">
  <div class="chrome">
    <div>我的工作流 · Workflow</div>
    <div>Act II · 15 / 27</div>
  </div>
  <div class="frame">
    <div class="kicker">Pipeline · 流水线</div>
    <h2 class="h-xl">两条流水线</h2>

    <!-- 第一组：文本侧 -->
    <div class="pipeline-section">
      <div class="pipeline-label">文本侧 · Text Pipeline</div>
      <div class="pipeline">
        <div class="step">
          <div class="step-nb">01</div>
          <div class="step-title">Draft</div>
          <div class="step-desc">AI 帮我起草初稿</div>
        </div>
        <div class="step">
          <div class="step-nb">02</div>
          <div class="step-title">Polish</div>
          <div class="step-desc">AI 润色去 AI 味</div>
        </div>
        <div class="step">
          <div class="step-nb">03</div>
          <div class="step-title">Morph</div>
          <div class="step-desc">AI 变形成推特 / 小红书</div>
        </div>
        <div class="step">
          <div class="step-nb">04</div>
          <div class="step-title">Illustrate</div>
          <div class="step-desc">AI 生成信息图</div>
        </div>
        <div class="step">
          <div class="step-nb">05</div>
          <div class="step-title">Distribute</div>
          <div class="step-desc">一键分发 9 平台</div>
        </div>
      </div>
    </div>

    <!-- 第二组：视频侧 -->
    <div class="pipeline-section">
      <div class="pipeline-label">视觉 · 视频侧 · Video Pipeline</div>
      <div class="pipeline">
        <div class="step">
          <div class="step-nb">06</div>
          <div class="step-title">Cut</div>
          <div class="step-desc">AI 帮我剪辑</div>
        </div>
        <div class="step">
          <div class="step-nb">07</div>
          <div class="step-title">Wrap</div>
          <div class="step-desc">AI 帮我包装</div>
        </div>
        <div class="step">
          <div class="step-nb">08</div>
          <div class="step-title">Cover</div>
          <div class="step-desc">AI 生成封面</div>
        </div>
      </div>
    </div>
  </div>
  <div class="foot">
    <div>Page 15 · 我的内容工厂</div>
    <div>Workflow</div>
  </div>
</section>
```

**要点**：
- 用 `.pipeline-section` 分组 + `.pipeline-label` 作组标题
- 两组之间用 3.6vh 的间距 + 顶部细分隔线（已在 CSS 中预设）
- 每个 step 是固定的 nb → title → desc 结构
- 步骤数不限但单行最好 ≤5 个，否则换到第二 pipeline

---

## Layout 7: 悬念收束 / 问题页（Hero Question）

```html
<section class="slide hero dark">
  <div class="chrome">
    <div>留给你的问题</div>
    <div>24 / 27</div>
  </div>
  <div class="frame" style="display:grid; gap:8vh; align-content:center; min-height:80vh">
    <div class="kicker">The Question</div>
    <h1 class="h-hero" style="font-size:7vw; line-height:1.15">
      你的公司里，<br>
      哪些岗位本来就<br>
      不该由人来做？
    </h1>
    <p class="lead" style="max-width:50vw">
      这个问题，不是技术问题，是架构问题。
    </p>
  </div>
  <div class="foot">
    <div>Page 24 · The Question</div>
    <div>— · —</div>
  </div>
</section>
```

**要点**：
- Hero 页留白越多越好，只放一个问题
- `h-hero` 字号视长度调整（7vw 适合 3 行，10vw 适合 1 行）
- 用 `<br>` 手工断行，确保断点在语义处
- 尾巴可以再给一行 `lead` 作为点破

---

## Layout 8: 大引用页（Big Quote · 衬线金句）

```html
<section class="slide light">
  <div class="chrome">
    <div>The Takeaway · 核心金句</div>
    <div>18 / 25</div>
  </div>
  <div class="frame" style="display:grid; gap:5vh; align-content:center; min-height:80vh">
    <div class="kicker">Quote · 金句</div>
    <blockquote style="font-family:var(--serif-zh); font-weight:700; font-size:5.8vw; line-height:1.2; letter-spacing:-.01em; max-width:72vw">
      "没有交接,<br>所有人都在构建。"
    </blockquote>
    <p class="lead" style="max-width:55vw; opacity:.65">
      Without the handoff, everyone builds.<br>
      And that makes all the difference.
    </p>
    <div class="meta-row">
      <span>— Luke Wroblewski</span><span>·</span><span>2026.04.16</span>
    </div>
  </div>
  <div class="foot">
    <div>Page 18 · 金句</div>
    <div>— · —</div>
  </div>
</section>
```

**要点**：
- 整页留白,只放一个大引用 + 出处
- `<blockquote>` 用 inline style 单独放大（5-6vw）,不要用 `h-hero`（那是页面主标题的命名）
- 下面跟随英文原文（lead · opacity:.65）制造层级
- 配 `meta-row` 写出处 · 日期

---

## Layout 9: 并列对比（A vs B · 旧 vs 新）

```html
<section class="slide light">
  <div class="chrome">
    <div>旧 vs 新 · The Shift</div>
    <div>12 / 25</div>
  </div>
  <div class="frame" style="padding-top:5vh">
    <div class="kicker">Before / After · 范式转变</div>
    <h2 class="h-xl" style="margin-bottom:4vh">从交接到共建</h2>

    <div class="grid-2-6-6" style="gap:5vw 4vh">
      <!-- 左列：旧 -->
      <div style="padding:3vh 2vw; border-left:3px solid currentColor; opacity:.55">
        <div class="kicker" style="opacity:.9">Before · 旧模式</div>
        <h3 class="h-md" style="margin-top:2vh">设计 → 开发 → 交接</h3>
        <ul style="margin-top:3vh; padding-left:1.2em; display:flex; flex-direction:column; gap:1.4vh; font-family:var(--sans-zh); font-size:max(14px,1.1vw); line-height:1.55">
          <li>设计师在 Figma 做稿</li>
          <li>开发者盯着文件翻译像素</li>
          <li>反复 PR 沟通对齐</li>
          <li>非技术人员无法触碰代码</li>
        </ul>
      </div>
      <!-- 右列:新 -->
      <div style="padding:3vh 2vw; border-left:3px solid currentColor">
        <div class="kicker" style="opacity:.9">After · 新模式</div>
        <h3 class="h-md" style="margin-top:2vh">同工具 · 并行 · 共建</h3>
        <ul style="margin-top:3vh; padding-left:1.2em; display:flex; flex-direction:column; gap:1.4vh; font-family:var(--sans-zh); font-size:max(14px,1.1vw); line-height:1.55">
          <li>三个角色同时在 Intent 工作</li>
          <li>agents.md 作为共享上下文</li>
          <li>代理处理对齐 / 冲突 / 动画</li>
          <li>任何人都能安全贡献代码</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="foot">
    <div>Page 12 · 范式转变</div>
    <div>Before / After</div>
  </div>
</section>
```

**要点**：
- 用 `.grid-2-6-6`（1:1）左右分半
- 左列 `opacity:.55` 做"旧"的视觉弱化,右列满亮度做"新"的突出
- 两列都用 `border-left:3px solid` + `padding-left` 做引用块感
- 每列结构统一:`kicker` → `h-md` → `<ul>` 要点,节奏一致

---

## Layout 10: 图文混排（Lead Image + Side Text）

```html
<section class="slide light">
  <div class="chrome">
    <div>Design First · 设计先行</div>
    <div>08 / 16</div>
  </div>
  <div class="frame grid-2-8-4" style="padding-top:6vh">
    <!-- 左列:大段正文 + 引用 -->
    <div>
      <div class="kicker">Phase 01 · 设计阶段</div>
      <h2 class="h-xl" style="margin-top:1vh; margin-bottom:3vh">设计先行 · 2 周</h2>

      <p class="lead" style="margin-bottom:3vh">
        在 Figma 中完成视觉探索与设计系统,网格 / 排版 / 颜色变量 / 可复用组件,桌面和移动端稿件几轮反馈迭代。
      </p>

      <p style="font-family:var(--sans-zh); font-size:max(14px,1.15vw); line-height:1.75; opacity:.78; margin-bottom:2.4vh">
        两周之内,视觉风格、粗略结构、方向性内容全部稳定。这是扎实的传统设计流程——在这里还没什么新鲜事。
      </p>

      <div class="callout" style="margin-top:3vh">
        "This phase was pretty standard.<br>Just a solid Web design process."
        <div class="callout-src">— Luke Wroblewski</div>
      </div>
    </div>
    <!-- 右列:辅助图 · 竖版或方形 -->
    <figure class="frame-img" style="aspect-ratio:3/4; max-height:60vh">
      <img src="images/figma.png" alt="Figma design system">
      <figcaption class="img-cap">Figma · Design System</figcaption>
    </figure>
  </div>
  <div class="foot">
    <div>Page 08 · Design First</div>
    <div>约 2 周</div>
  </div>
</section>
```

**要点**：
- `.grid-2-8-4`(8:4) 让正文占主导,图片作辅助
- 左列包含多种信息层级:kicker → 大标题 → lead → 正文段落 → callout(引用)
- 右列图片用 **竖版 3:4** 或方形 1:1,避免和左列文本竞争注意力
- 这种布局适合**页面信息量偏大**的场景(不像 Layout 4 只有一句金句)

---

## 附录：常用网格模板

| 类名 | 配比 | 用途 |
|---|---|---|
| `.grid-2-6-6` | 6:6（1:1） | 对半分 |
| `.grid-2-7-5` | 7:5 | 文字为主 + 辅助图 |
| `.grid-2-8-4` | 8:4（2:1） | 大段文字 + 小图/数据 |
| `.grid-3` | 1:1:1 | 3 项并列（案例/截图） |
| `.grid-3-3` | 3×2 | 6 图矩阵 |
| `.grid-6` | 3×2 | 6 个数据卡片 |

所有网格都预留 `gap: 3vw 4vh`（水平 3vw、竖直 4vh），可以单独覆写。

---

## 页面节奏建议

一场 25-30 页的分享，推荐以下节奏：

1. **Hero Cover**（第 1 页）
2. **Act Divider**（第一幕开场，hero light 或 hero dark）
3. **Big Numbers**（抛硬数据制造冲击）
4. **Quote + Image**（讲身份反差/挂钩）
5. **Image Grid**（证据支撑）
6. **Hero Question**（幕收束，留悬念）
7. ... 第二幕、第三幕同样节奏 ...
8. **Hero Close**（最后一页，问题或致谢）

hero 页与 non-hero 页应该 **2-3 : 1 比例交错**，不要连续超过 3 页 non-hero，也不要连续超过 2 页 hero。
```

#### themes.md

```
# 主题色预设（Themes）

5 套精心调配的主题色板,保证"电子杂志 × 电子墨水"的美学不垮。**不允许用户自定义颜色——色彩搭配错了画面瞬间变丑**,只从以下预设中挑选。

---

## 使用方法

1. 问用户选哪套(或基于内容推荐一套)
2. 打开 `assets/template.html` 的 `<style>` 块
3. 找到开头的 `:root{` 块
4. **整体替换**标有"主题色"注释的那几行 `--ink` / `--ink-rgb` / `--paper` / `--paper-rgb` / `--paper-tint` / `--ink-tint`
5. 其他 CSS 都走 `var(--...)`,无需任何其他改动

---

## 🖋 墨水经典 (Monocle 默认)

**适合**:通用分享、商业发布、科技产品、任何场景都安全的默认选择。
**调性**:纯墨黑 + 暖米白,杂志感最强,Monocle / Apricot / A Book Apart 风。

```css
--ink:#0a0a0b;
--ink-rgb:10,10,11;
--paper:#f1efea;
--paper-rgb:241,239,234;
--paper-tint:#e8e5de;
--ink-tint:#18181a;
```

---

## 🌊 靛蓝瓷 (Indigo Porcelain)

**适合**:科技/研究/数据分享、工程师文化、深度内容、技术发布会。
**调性**:深靛蓝 + 瓷白,冷静、理性、有深度,像学术期刊或蓝印花瓷器。

```css
--ink:#0a1f3d;
--ink-rgb:10,31,61;
--paper:#f1f3f5;
--paper-rgb:241,243,245;
--paper-tint:#e4e8ec;
--ink-tint:#152a4a;
```

---

## 🌿 森林墨 (Forest Ink)

**适合**:自然/可持续/文化/非虚构内容、户外品牌、环保主题。
**调性**:深森林绿 + 象牙,沉稳、有呼吸感,像旧版《国家地理》。

```css
--ink:#1a2e1f;
--ink-rgb:26,46,31;
--paper:#f5f1e8;
--paper-rgb:245,241,232;
--paper-tint:#ece7da;
--ink-tint:#253d2c;
```

---

## 🍂 牛皮纸 (Kraft Paper)

**适合**:怀旧/人文/阅读/历史/文学分享、独立杂志、手作品牌。
**调性**:深棕 + 暖米,像牛皮信封或老笔记本,温暖、有年代感。

```css
--ink:#2a1e13;
--ink-rgb:42,30,19;
--paper:#eedfc7;
--paper-rgb:238,223,199;
--paper-tint:#e0d0b6;
--ink-tint:#3a2a1d;
```

---

## 🌙 沙丘 (Dune)

**适合**:艺术/设计/创意/时尚分享、画廊手册、审美优先的私享会。
**调性**:炭灰 + 沙色,克制、高级、中性,像沙漠黄昏或建筑设计图册。

```css
--ink:#1f1a14;
--ink-rgb:31,26,20;
--paper:#f0e6d2;
--paper-rgb:240,230,210;
--paper-tint:#e3d7bf;
--ink-tint:#2d2620;
```

---

## 推荐选择参考

| 如果是... | 推荐主题 |
|---|---|
| 不知道选啥 / 第一次用 | 🖋 墨水经典 |
| AI / 技术 / 产品发布 | 🌊 靛蓝瓷 |
| 内容 / 行业观察 / 文化 | 🌿 森林墨 |
| 书评 / 生活方式 / 人文 | 🍂 牛皮纸 |
| 设计 / 艺术 / 品牌 | 🌙 沙丘 |

---

## 切换原则

- **一份 deck 只用一套主题**,不要中途换色
- WebGL shader 的默认主色(钛金色散 / 银色流动)适配所有 5 套(经测试可接受)
- `currentColor` 驱动的 border / icon 会跟随 section 的 text color 自动适配,无需额外调整
- 选定主题后,`<title>` 文字和 `chrome` 文案可以强化该主题的语义(例如牛皮纸配"Vol.03 · 秋"这种)

## ❌ 不要做的事

- ❌ **不允许混搭**(例如 ink 取墨水经典的,paper 取沙丘的)——会彻底违和
- ❌ **不允许用户随便给一个 hex 值**——需委婉拒绝并展示 5 套预设让选
- ❌ **不要直接修改 template.html 其他地方的颜色**——所有散落 rgba 都走 var,改 :root 一处即可

选定主题后在 skill 对话中告诉用户:"用 🖋 墨水经典 / 🌊 靛蓝瓷 ..."并在 deck 项目记录里备注,方便后续迭代时保持一致。
```

---

## 2. presentation-skill

### 概述

演讲脚本 + PPT 一键生成器。输入主题自动生成演讲稿和可播放演示文稿。

### SKILL.md

```
---
name: presentation
description: 演讲脚本 + PPT 一键生成器。输入主题自动生成演讲稿和可播放的 HTML 幻灯片（支持点击/自动播放、键盘控制、导出 PDF）。使用 awesome-design-md 62 种品牌级设计风格。触发词："/ppt"、"做PPT"、"演讲稿"、"presentation"、"幻灯片"、"做个演示"
---

# Presentation — 演讲脚本 + PPT 一键生成

输入一个主题，自动生成演讲脚本和品牌级设计质感的 HTML 幻灯片。支持 62 种世界级品牌设计风格，一键切换。

## 触发词

- "/ppt"
- "做PPT"
- "做个PPT"
- "演讲稿"
- "presentation"
- "幻灯片"
- "做个演示"
- "演示文稿"

## 输入

| 参数 | 必须 | 说明 |
|------|------|------|
| **主题** | 是 | 演讲/演示的主题 |
| **风格** | 否 | 设计风格名称（不指定则引导选择） |
| **时长** | 否 | 目标演讲时长，默认 10 分钟 |
| **语言** | 否 | 脚本语言，默认中文 |
| **页数** | 否 | 幻灯片页数，默认根据时长自动计算（约 1 页/分钟） |

## 工作流程

```
引导选风格 → 生成演讲脚本 → 设计幻灯片 → 输出 HTML → 浏览器预览
```

---

### Step 1：引导用户选择设计风格

如果用户未指定风格，展示风格选择菜单。按场景分类推荐：

```
🎨 请选择你喜欢的 PPT 设计风格：

━━━ 科技 / AI ━━━
 1. claude     — 温暖陶土色调，学术优雅
 2. vercel     — 极简黑白，Geist 字体
 3. linear     — 超精简紫色调，专业感
 4. stripe     — 标志性紫色渐变，精致
 5. nvidia     — 绿黑能量感，技术力量
 6. spacex     — 纯黑白未来主义

━━━ 商务 / 企业 ━━━
 7. apple      — 苹果级留白，极致优雅
 8. notion     — 温暖极简，知识感
 9. ibm        — 企业级蓝色系统
10. superhuman — 高端暗色，键盘优先
11. hashicorp  — 企业级黑白清洁

━━━ 创意 / 设计 ━━━
12. figma      — 多彩活泼，专业中带趣味
13. framer     — 大胆黑蓝，运动感
14. airbnb     — 温暖珊瑚色，摄影驱动
15. spotify    — 鲜绿暗色，大胆排版
16. nike       — 黑白对比，全大写 Futura

━━━ 金融 / 数据 ━━━
17. coinbase   — 信赖蓝，机构感
18. revolut    — 暗色渐变卡片，金融精确
19. binance    — 币安黄+黑，交易桌紧迫感

━━━ 汽车 / 奢华 ━━━
20. ferrari    — 明暗对比，法拉利红点缀
21. tesla      — 极简摄影，激进减法
22. lamborghini — 纯黑+金色，奢华感
23. bmw        — 暗色精密，德式工程美学

输入编号或名称即可，也可以说"帮我选"让我根据主题推荐。
```

**智能推荐**：如果用户说"帮我选"，根据主题自动匹配：
- 技术分享 → vercel / linear / claude
- 产品发布 → apple / stripe / framer
- 商业提案 → notion / ibm / superhuman
- 创意展示 → figma / airbnb / spotify
- 数据报告 → coinbase / posthog / sentry
- 教育培训 → claude / notion / mintlify

### Step 2：获取设计规范

根据用户选择的风格，从 awesome-design-md 仓库获取对应的 DESIGN.md：

```
https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/designs/{slug}/DESIGN.md
```

从 DESIGN.md 中提取以下关键设计变量：

| 要素 | 用途 |
|------|------|
| **配色系统** | CSS 变量定义（primary, accent, surface, text 等） |
| **字体层级** | 标题/正文/标注的 font-family, size, weight, line-height |
| **阴影系统** | 卡片/按钮的 box-shadow 层级 |
| **圆角规范** | border-radius 体系 |
| **间距规范** | spacing scale |

### Step 3：生成演讲脚本

根据主题和时长，生成结构化演讲脚本：

```markdown
# 演讲脚本：{主题}

预计时长：{N} 分钟
幻灯片数：{M} 页

---

## 第 1 页 — 开场（封面）
**幻灯片内容**：标题 + 副标题 + 演讲者
**演讲词**：
> （此处是完整的口语化演讲词，自然、有感染力，不是干巴巴的要点罗列）

**时长**：1 分钟
**提示**：[开场节奏建议、肢体语言提示]

---

## 第 2 页 — 问题引入
**幻灯片内容**：一个引人思考的问题/数据
**演讲词**：
> ...

...以此类推
```

**脚本质量要求**：
- 演讲词必须是**完整的口语句子**，不是关键词列表
- 开头要有**钩子**（故事/数据/提问），不要自我介绍开场
- 每页有**一个核心观点**，不堆砌
- 转场自然，页与页之间有过渡句
- 结尾有**行动号召**（CTA）

### Step 4：生成 HTML 幻灯片

生成一个**单文件** HTML，包含完整的幻灯片播放器。

#### 4.1 整体结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{演讲标题}</title>
  <!-- Google Fonts（根据 DESIGN.md 指定的字体） -->
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
  <style>
    /* === 设计系统变量（来自 DESIGN.md） === */
    :root { ... }
    /* === 幻灯片引擎样式 === */
    /* === 幻灯片内容样式 === */
    /* === 控制栏样式 === */
    /* === 打印/PDF 样式 === */
  </style>
</head>
<body>
  <!-- 幻灯片容器 -->
  <div class="slides-container">
    <div class="slide active" data-index="0">...</div>
    <div class="slide" data-index="1">...</div>
    ...
  </div>
  <!-- 控制栏 -->
  <div class="controls">...</div>
  <!-- 演讲者备注面板 -->
  <div class="speaker-notes">...</div>
  <script>/* 播放引擎 */</script>
</body>
</html>
```

#### 4.2 幻灯片引擎（JavaScript）

必须实现以下功能：

**导航控制**：
```javascript
// 键盘控制
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':          // 空格
    case 'Enter':
      nextSlide(); break;
    case 'ArrowLeft':
    case 'ArrowUp':
      prevSlide(); break;
    case 'f':
    case 'F':
      toggleFullscreen(); break;
    case 'a':
    case 'A':
      toggleAutoplay(); break;
    case 'n':
    case 'N':
      toggleNotes(); break;
    case 'Escape':
      exitFullscreen(); break;
    case 'p':
    case 'P':
      exportPDF(); break;
  }
});

// 点击控制：点击幻灯片右半边 → 下一页，左半边 → 上一页
// 触摸滑动：支持移动端左右滑动切换
```

**自动播放**：
```javascript
let autoplayInterval = null;
let autoplaySpeed = 5000; // 默认 5 秒/页

function toggleAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    updateAutoplayButton('▶ Auto');
  } else {
    autoplayInterval = setInterval(nextSlide, autoplaySpeed);
    updateAutoplayButton('⏸ Pause');
  }
}
```

**全屏模式**：
```javascript
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
```

**PDF 导出**：
```javascript
function exportPDF() {
  // 显示所有幻灯片用于打印
  document.body.classList.add('print-mode');
  window.print();
  document.body.classList.remove('print-mode');
}
```

#### 4.3 控制栏 UI

底部控制栏（非全屏时可见，全屏时悬停底部显示）：

```
┌────────────────────────────────────────────────────┐
│  ◀  │  3 / 12  │  ▶  │  ▶ Auto  │  ⛶ Full  │  📥 PDF  │  📝 Notes  │
└────────────────────────────────────────────────────┘
```

- **进度条**：页码指示器 + 可点击的进度条
- **自动播放按钮**：切换自动播放，显示当前状态
- **全屏按钮**：进入/退出全屏
- **PDF 按钮**：触发打印/导出 PDF
- **备注按钮**：显示/隐藏演讲者备注

控制栏样式使用当前设计风格的 accent 色。

#### 4.4 幻灯片切换动画

默认使用淡入滑动效果：

```css
.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.slide.prev {
  opacity: 0;
  transform: translateX(-30px);
}
```

#### 4.5 打印 / PDF 样式

```css
@media print {
  /* 打印模式：每页一张幻灯片 */
  .controls, .speaker-notes, .download-bar { display: none !important; }

  .slides-container {
    position: static;
    overflow: visible;
  }

  .slide {
    position: relative !important;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
    page-break-after: always;
    width: 100vw;
    height: 100vh;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
}
```

#### 4.6 幻灯片内容设计原则

每张幻灯片的内容遵循以下设计原则：

**文字极简**：
- 标题：最多 1 行
- 内容：最多 3-5 个要点，每个要点一行
- 绝不放大段文字，演讲词放在备注里

**视觉层级清晰**：
- 大标题突出核心观点
- 数字/数据用超大字号呈现
- 图标使用 emoji 或 SVG inline，不依赖外部图片

**常用页面类型**：

| 类型 | 布局 | 适用场景 |
|------|------|----------|
| **封面** | 居中大标题 + 副标题 + 演讲者 | 第 1 页 |
| **章节页** | 居中章节标题 + 装饰元素 | 章节分隔 |
| **观点页** | 大字号核心观点 + 小字补充 | 关键论点 |
| **列表页** | 标题 + 3-5 条要点（带图标） | 罗列要点 |
| **数据页** | 超大数字 + 说明文字 | 数据冲击 |
| **对比页** | 左右/上下两栏对比 | Before/After |
| **引用页** | 大段引言 + 出处 | 名言/用户反馈 |
| **CTA 页** | 行动号召 + 联系方式 | 结尾 |

#### 4.7 演讲者备注面板

侧边滑出面板，显示当前页的完整演讲词：

```css
.speaker-notes {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 350px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  background: rgba(0,0,0,0.95);
  color: #fff;
  padding: 24px;
  overflow-y: auto;
  z-index: 1000;
}

.speaker-notes.open {
  transform: translateX(0);
}
```

#### 4.8 响应式适配

```css
/* 幻灯片容器保持 16:9 比例 */
.slides-container {
  width: 100vw;
  height: 100vh;
  max-width: 1920px;
  max-height: 1080px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* 内容自适应缩放 */
.slide {
  padding: 60px 80px;
}

@media (max-width: 768px) {
  .slide { padding: 30px 40px; }
  .slide h1 { font-size: 2em; }
  .controls { font-size: 14px; }
}
```

### Step 5：输出与交付

1. **演讲脚本**保存为 `{主题}_演讲脚本.md`
2. **HTML 幻灯片**保存为 `{主题}_slides.html`
3. 两个文件都保存到**用户当前工作目录**
4. 用 `open {主题}_slides.html` 在浏览器中预览
5. 告知用户操作方式：

```
✅ 演讲脚本和幻灯片已生成！

📄 演讲脚本：{主题}_演讲脚本.md
🎬 HTML 幻灯片：{主题}_slides.html（已在浏览器中打开）

操作指南：
  → / ← / Space    翻页
  F                 全屏
  A                 自动播放（5秒/页）
  N                 显示演讲者备注
  P                 导出 PDF（浏览器打印）
  点击右半屏         下一页
  点击左半屏         上一页

需要调整内容、风格或页数吗？
```

## 风格获取失败的降级方案

如果无法从 GitHub 获取 DESIGN.md：

1. 使用内置的通用设计变量（基于 Stripe 风格的中性渐变方案）
2. 告知用户获取失败，已使用默认风格
3. 默认配色：深色背景 `#0a0a0a`，白色文字，渐变 accent

## 注意事项

- HTML 是**单文件**，不依赖本地资源
- 外部依赖仅限：Google Fonts CDN
- 幻灯片保持 **16:9** 比例
- 每页内容**极简**，详细内容放演讲者备注
- 动画轻量，不卡顿
- 打印 PDF 时隐藏所有控制元素
- 如果主题是英文，脚本默认用英文；中文主题默认中文
```

### README.md

```
# 🎙️ Presentation Skill — 演讲脚本 + PPT 一键生成

> 输入一个主题，一键生成演讲脚本 + 品牌级 HTML 幻灯片。  
> 支持 62 种世界级品牌设计风格，基于 [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)。

**[👉 在线演示：5种风格的苏格拉底《申辩篇》PPT](https://orangeviolin.github.io/presentation-skill/)**

---

## 效果预览

<table>
<tr>
<td align="center"><a href="https://orangeviolin.github.io/presentation-skill/greek-academy.html"><img src="https://img.shields.io/badge/🏛️-古希腊学院风-c5a55a?style=for-the-badge" /></a></td>
<td align="center"><a href="https://orangeviolin.github.io/presentation-skill/sunny-cards.html"><img src="https://img.shields.io/badge/☀️-阳光明媚风-e67e22?style=for-the-badge" /></a></td>
<td align="center"><a href="https://orangeviolin.github.io/presentation-skill/state-enterprise.html"><img src="https://img.shields.io/badge/🏢-国企汇报风-900000?style=for-the-badge" /></a></td>
</tr>
<tr>
<td align="center"><a href="https://orangeviolin.github.io/presentation-skill/ted-talk.html"><img src="https://img.shields.io/badge/🎤-TED演讲风-e62b1e?style=for-the-badge" /></a></td>
<td align="center"><a href="https://orangeviolin.github.io/presentation-skill/chinese-ink.html"><img src="https://img.shields.io/badge/🎨-水墨中国风-c23b22?style=for-the-badge" /></a></td>
<td align="center"><em>...共 62 种品牌风格</em></td>
</tr>
</table>

> 点击徽章即可在线播放完整幻灯片，支持键盘翻页、全屏、自动播放、演讲者备注和 PDF 导出。

---

## 特性

- 🎨 **62 种品牌级设计风格** — Apple、Stripe、Ferrari、Nike、SpaceX、Notion、Linear... 基于真实品牌设计系统
- 📝 **演讲脚本 + 幻灯片一体化** — 同时生成完整口语化演讲词和可播放的 HTML 幻灯片
- 🎮 **完整幻灯片播放器** — 键盘控制 / 点击翻页 / 触摸滑动 / 全屏演示 / 自动播放
- 📋 **演讲者备注** — 侧边栏显示完整演讲词，边看边讲
- 📥 **PDF 导出** — 浏览器打印，每页一张幻灯片，`@media print` 自动适配
- 🖼️ **SVG 插图** — 每页内联矢量插图，不依赖外部图片，放大不模糊
- 🎯 **零依赖** — 单文件 HTML，离线可用（仅 Google Fonts 走 CDN）
- 📱 **响应式** — 16:9 比例，移动端自适应

---

## 快速开始

### 在 Claude Code 中使用

将 `SKILL.md` 放入你的 Claude Code skills 目录（`~/.claude/skills/presentation/`），然后：

```
/ppt 苏格拉底的申辩
```

或者：

```
做个PPT 讲讲我们的Q2规划
```

### 指定风格

```
/ppt 产品发布会 风格:apple
```

不指定风格时，skill 会展示风格选择菜单，也可以说"帮我推荐"自动匹配。

### 触发词

| 触发词 | 说明 |
|-------|------|
| `/ppt` | 生成演讲稿 + HTML 幻灯片 |
| `做PPT` / `做个PPT` | 同上 |
| `演讲稿` | 同上 |
| `presentation` | 同上 |
| `幻灯片` / `做个演示` | 同上 |

---

## 操作指南

生成的 HTML 幻灯片支持以下操作：

| 快捷键 | 功能 |
|--------|------|
| `→` / `←` / `Space` | 翻页 |
| `F` | 全屏演示 |
| `A` | 自动播放（5-8秒/页） |
| `N` | 显示/隐藏演讲者备注 |
| `P` | 导出 PDF（浏览器打印） |
| 点击右半屏 | 下一页 |
| 点击左半屏 | 上一页 |
| 触摸左右滑动 | 翻页（移动端） |

---

## 输出文件

每次生成两个文件：

```
{主题}_演讲脚本.md    # 完整口语化演讲词（每页该说什么）
{主题}_slides.html    # 可播放的 HTML 幻灯片
```

HTML 文件可以直接：
- 浏览器打开播放
- 发微信/邮件分享
- `Ctrl+P` 导出 PDF
- 部署到任意静态托管

---

## 风格一览

### 内置差异化风格（苏格拉底《申辩篇》示例）

| 风格 | 在线预览 | 视觉特色 |
|------|----------|----------|
| 古希腊学院风 | [▶ 播放](https://orangeviolin.github.io/presentation-skill/greek-academy.html) | 大理石纹理、希腊回纹边框、月桂冠/猫头鹰/天平 SVG、Playfair Display 衬线 |
| 阳光明媚·卡片风 | [▶ 播放](https://orangeviolin.github.io/presentation-skill/sunny-cards.html) | 暖米色底、彩色圆角卡片、emoji 图标装饰、Noto Sans SC |
| 国企汇报风 | [▶ 播放](https://orangeviolin.github.io/presentation-skill/state-enterprise.html) | 深红渐变顶栏、编号红圈面板、统计大数字卡片、warning-box |
| TED 演讲风 | [▶ 播放](https://orangeviolin.github.io/presentation-skill/ted-talk.html) | 黑底聚光灯、200号字冲击数字、一页一观点、红色 accent |
| 水墨中国风 | [▶ 播放](https://orangeviolin.github.io/presentation-skill/chinese-ink.html) | 宣纸底、墨山水 SVG、朱红印章、竖排文字、半文言语气 |

### awesome-design-md 品牌风格（62种）

通过 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 可以使用以下品牌风格：

| 类别 | 品牌 |
|------|------|
| AI 平台 | Claude, Cohere, ElevenLabs, Mistral AI, Ollama, Replicate, xAI... |
| 开发工具 | Cursor, Expo, Vercel, Warp, Raycast, Superhuman... |
| 设计工具 | Figma, Framer, Miro, Webflow, Airtable, Clay... |
| 金融科技 | Stripe, Coinbase, Revolut, Binance, Wise... |
| 消费品牌 | Apple, Nike, Spotify, Airbnb, Uber, Shopify... |
| 汽车 | Tesla, Ferrari, BMW, Lamborghini, Renault... |
| 更多 | Notion, Linear, MongoDB, Supabase, SpaceX, IBM, NVIDIA... |

安装任意品牌设计系统：

```bash
npx getdesign@latest add <brand-name>
```

---

## 技术实现

- **单文件 HTML** — 所有 CSS、JS、SVG 内联，无外部依赖
- **设计系统驱动** — 从 awesome-design-md 获取完整设计 token（配色、字体、阴影、间距）
- **内联 SVG 插图** — 根据内容生成矢量插图，不依赖外部图片
- **CSS 动画** — 轻量 fade + translateX 滑动切换
- **打印优化** — `@media print` 规则确保 PDF 导出质量，每页一张幻灯片

---

## 项目结构

```
presentation-skill/
├── README.md          # 本文件
├── SKILL.md           # Claude Code skill 定义（放入 ~/.claude/skills/presentation/）
├── examples/          # 示例 HTML 幻灯片（可下载）
│   ├── greek-academy.html
│   ├── sunny-cards.html
│   ├── state-enterprise.html
│   ├── ted-talk.html
│   └── chinese-ink.html
└── docs/              # GitHub Pages 在线演示
    ├── index.html
    └── *.html
```

---

## 安装

1. 在 Claude Code 的 skills 目录下创建文件夹：

```bash
mkdir -p ~/.claude/skills/presentation
```

2. 复制 SKILL.md：

```bash
cp SKILL.md ~/.claude/skills/presentation/
```

3. 重启 Claude Code，即可使用 `/ppt` 命令。

---

## 致谢

### [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

本项目的设计系统基于 awesome-design-md 开源项目。

awesome-design-md 收集了 62 个世界级品牌的完整设计系统文档（DESIGN.md），涵盖配色、字体、阴影、间距等全套设计 token。每一个 DESIGN.md 都是对真实品牌网站的精心逆向工程，质量极高。

**感谢 VoltAgent 团队的杰出工作，让 AI 生成品牌级 UI 成为可能。**

### 苏格拉底

感谢苏格拉底在公元前 399 年的那场演讲——2425 年后，它依然是人类历史上最伟大的法庭辩护，也是我们最好的测试用例。

> "离别的时刻已经到来。我去赴死，你们去生活。哪一个更好，只有神知道。"

---

## License

MIT

## 作者

**01fish** — AI 自媒体创作者

*01fish，陪你听故事*
```

### 文档（docs/）


=== FILE: .claude/skills/presentation-skill/docs/chinese-ink.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底 · 水墨中国风</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
/* ========== RESET & BASE ========== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --rice-paper: #f7f3eb;
  --rice-paper-text: #f0ead6;
  --ink-black: #1a1a18;
  --vermillion: #c23b22;
  --indigo: #2c4a6e;
  --gold: #b8860b;
  --diluted-ink: #6b6355;
  --font-display: 'Noto Serif SC', 'Songti SC', serif;
  --font-body: 'Noto Sans SC', 'PingFang SC', sans-serif;
}

html { font-size: 16px; }

body {
  font-family: var(--font-body);
  background: var(--ink-black);
  color: var(--ink-black);
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ========== PAPER TEXTURE ========== */
.paper-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

.paper-texture-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

/* ========== SLIDE ENGINE ========== */
.slide-deck {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.slide {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0; left: 0;
  display: none;
  overflow: hidden;
  padding: 60px 80px;
}

.slide.active { display: flex; }

.slide.light {
  background: var(--rice-paper);
  color: var(--ink-black);
}

.slide.dark {
  background: var(--ink-black);
  color: var(--rice-paper-text);
}

.slide.vermillion-bg {
  background: var(--vermillion);
  color: var(--rice-paper-text);
}

/* Ink wash effect on dark slides */
.slide.dark::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(44,74,110,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(26,26,24,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(194,59,34,0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.slide > * { position: relative; z-index: 2; }

/* ========== TYPOGRAPHY ========== */
.display-text {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.05em;
}

.display-xl {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 900;
  line-height: 1.3;
}

.display-xxl {
  font-family: var(--font-display);
  font-size: 120px;
  font-weight: 900;
  line-height: 1.1;
}

.body-text {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.9;
  color: var(--ink-black);
}

.body-text.on-dark { color: var(--rice-paper-text); }

.diluted { color: var(--diluted-ink); }
.vermillion { color: var(--vermillion); }
.gold-text { color: var(--gold); }
.indigo-text { color: var(--indigo); }

.spaced-chars { letter-spacing: 0.4em; }

/* ========== VERTICAL TEXT ========== */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-display);
}

.vertical-sidebar {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: 0.3em;
  opacity: 0.3;
  z-index: 2;
}

.vertical-sidebar.left {
  right: auto;
  left: 40px;
}

.vertical-sidebar.on-dark { color: var(--rice-paper-text); }

/* ========== SVG COMPONENTS ========== */

/* Seal stamp */
.seal-stamp {
  position: absolute;
  bottom: 50px;
  right: 60px;
  z-index: 10;
}

/* Ink mountains */
.ink-mountains {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  opacity: 0.5;
}

.ink-mountains.higher { opacity: 0.25; }

/* Enso circle */
.enso-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== BRUSH STROKE DIVIDER ========== */
.brush-divider {
  width: 200px;
  height: 8px;
  margin: 20px 0;
}

.brush-divider-long {
  width: 400px;
  height: 6px;
  margin: 24px 0;
}

/* ========== HANGING SCROLL ========== */
.hanging-scroll {
  background: rgba(247,243,235,0.06);
  border: 1px solid rgba(240,234,214,0.1);
  border-radius: 3px;
  padding: 32px 28px;
  position: relative;
}

.hanging-scroll::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--vermillion), var(--vermillion), transparent);
  border-radius: 2px;
}

.hanging-scroll.on-light {
  background: rgba(26,26,24,0.03);
  border: 1px solid rgba(26,26,24,0.08);
}

.hanging-scroll.on-light::before {
  background: linear-gradient(90deg, transparent, var(--vermillion), var(--vermillion), transparent);
}

/* ========== CARDS ========== */
.ink-card {
  background: rgba(247,243,235,0.05);
  border: 1px solid rgba(240,234,214,0.08);
  border-radius: 3px;
  padding: 28px 24px;
  position: relative;
}

.ink-card.on-light {
  background: rgba(26,26,24,0.02);
  border: 1px solid rgba(26,26,24,0.08);
  box-shadow: 0 2px 12px rgba(26,26,24,0.04);
}

.ink-card .card-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  display: block;
}

/* ========== INK SPLASH ========== */
.ink-splash {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(26,26,24,0.06) 0%, rgba(26,26,24,0.02) 30%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.ink-splash.dark-splash {
  background: radial-gradient(ellipse at center, rgba(240,234,214,0.04) 0%, rgba(240,234,214,0.01) 30%, transparent 70%);
}

/* ========== QUOTE BLOCK ========== */
.quote-block {
  border-left: 3px solid var(--vermillion);
  padding-left: 24px;
  margin: 16px 0;
}

/* ========== DOT MARKERS ========== */
.seal-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--vermillion);
  border-radius: 1px;
  margin-right: 10px;
  vertical-align: middle;
}

/* ========== LOGIC FLOW ========== */
.logic-flow {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--font-display);
  font-size: 18px;
}

.logic-flow .arrow { opacity: 0.4; }

/* ========== NAVIGATION ========== */
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(128,128,128,0.15);
  z-index: 1000;
}

.nav-progress {
  height: 100%;
  background: var(--vermillion);
  transition: width 0.4s ease;
}

.slide-counter {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(128,128,128,0.5);
  z-index: 1000;
}

/* ========== SPEAKER NOTES ========== */
.speaker-notes {
  display: none;
}

.show-notes .speaker-notes {
  display: block;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  max-height: 180px;
  overflow-y: auto;
  background: rgba(26,26,24,0.92);
  color: var(--rice-paper-text);
  padding: 20px 28px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.8;
  z-index: 999;
  backdrop-filter: blur(8px);
}

/* ========== ANIMATIONS ========== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes brushIn {
  from { transform: scaleX(0); transform-origin: left; }
  to { transform: scaleX(1); transform-origin: left; }
}

.slide.active .anim-fade { animation: fadeIn 0.8s ease both; }
.slide.active .anim-up { animation: fadeInUp 0.7s ease both; }
.slide.active .anim-up-d1 { animation: fadeInUp 0.7s ease 0.15s both; }
.slide.active .anim-up-d2 { animation: fadeInUp 0.7s ease 0.3s both; }
.slide.active .anim-up-d3 { animation: fadeInUp 0.7s ease 0.45s both; }
.slide.active .anim-up-d4 { animation: fadeInUp 0.7s ease 0.6s both; }
.slide.active .anim-up-d5 { animation: fadeInUp 0.7s ease 0.75s both; }

/* ========== PRINT CSS ========== */
@media print {
  body { overflow: visible; background: white; }
  .slide {
    display: flex !important;
    position: relative !important;
    page-break-after: always;
    height: auto;
    min-height: 100vh;
  }
  .nav-bar, .nav-progress, .slide-counter { display: none !important; }
  .speaker-notes { display: none !important; }
  .ink-mountains { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}

/* ========== LAYOUT HELPERS ========== */
.flex-col { display: flex; flex-direction: column; }
.flex-row { display: flex; flex-direction: row; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-1 { flex: 1; }
.gap-16 { gap: 16px; }
.gap-24 { gap: 24px; }
.gap-32 { gap: 32px; }
.gap-40 { gap: 40px; }
.gap-48 { gap: 48px; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.text-center { text-align: center; }
.relative { position: relative; }
.mt-8 { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.ml-auto { margin-left: auto; }
</style>
</head>
<body>

<!-- ========== SVG DEFINITIONS ========== -->
<svg style="position:absolute;width:0;height:0" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Seal Stamp -->
  <symbol id="seal-stamp" viewBox="0 0 80 80">
    <rect x="2" y="2" width="76" height="76" rx="2" fill="none" stroke="#c23b22" stroke-width="3"/>
    <rect x="6" y="6" width="68" height="68" rx="1" fill="#c23b22" opacity="0.9"/>
    <text x="40" y="30" text-anchor="middle" fill="#f0ead6" font-family="Noto Serif SC, serif" font-size="16" font-weight="700">苏格拉底</text>
    <text x="40" y="52" text-anchor="middle" fill="#f0ead6" font-family="Noto Serif SC, serif" font-size="16" font-weight="700">之印</text>
    <!-- Border decoration -->
    <line x1="14" y1="10" x2="66" y2="10" stroke="#f0ead6" stroke-width="0.5" opacity="0.4"/>
    <line x1="14" y1="70" x2="66" y2="70" stroke="#f0ead6" stroke-width="0.5" opacity="0.4"/>
  </symbol>

  <!-- Ink Mountains -->
  <symbol id="ink-mountains-1" viewBox="0 0 1920 300">
    <path d="M0 300 L0 220 Q120 180 200 200 Q300 140 420 180 Q500 120 600 160 Q720 80 840 140 Q920 100 1000 130 Q1100 60 1200 110 Q1320 50 1440 100 Q1520 70 1600 120 Q1700 90 1800 140 Q1880 120 1920 150 L1920 300 Z" fill="currentColor" opacity="0.4"/>
    <path d="M0 300 L0 250 Q180 220 300 240 Q420 200 540 230 Q660 180 780 220 Q900 160 1020 200 Q1140 170 1260 210 Q1380 180 1500 220 Q1620 190 1740 230 Q1840 210 1920 240 L1920 300 Z" fill="currentColor" opacity="0.6"/>
    <path d="M0 300 L0 270 Q240 250 480 265 Q720 240 960 260 Q1200 245 1440 270 Q1680 255 1920 275 L1920 300 Z" fill="currentColor" opacity="0.8"/>
  </symbol>

  <!-- Brush Stroke -->
  <symbol id="brush-stroke" viewBox="0 0 200 8">
    <path d="M0 4 Q10 1 30 3 Q50 6 80 4 Q110 1 140 3 Q160 6 180 4 Q195 2 200 4" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M20 4 Q60 7 100 4 Q140 1 180 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
  </symbol>

  <!-- Brush Stroke Long -->
  <symbol id="brush-stroke-long" viewBox="0 0 400 6">
    <path d="M0 3 Q20 0.5 60 2.5 Q100 5 160 3 Q220 0.5 280 3 Q340 5.5 380 3 Q395 1.5 400 3" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.5"/>
  </symbol>

  <!-- Enso Circle -->
  <symbol id="enso" viewBox="0 0 200 200">
    <path d="M100 15 Q170 15 180 80 Q190 150 120 185 Q50 195 20 130 Q5 80 40 35 Q65 15 95 15" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M95 15 Q93 14 90 16" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.5"/>
  </symbol>

  <!-- Bamboo -->
  <symbol id="bamboo" viewBox="0 0 60 300">
    <line x1="30" y1="0" x2="30" y2="300" stroke="currentColor" stroke-width="2" opacity="0.15"/>
    <line x1="30" y1="60" x2="30" y2="62" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <line x1="30" y1="130" x2="30" y2="132" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <line x1="30" y1="200" x2="30" y2="202" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <!-- leaves -->
    <path d="M30 55 Q45 35 55 20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <path d="M30 55 Q48 40 60 30" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M30 125 Q15 105 5 90" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <path d="M30 125 Q12 110 2 95" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M30 195 Q45 175 55 160" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
  </symbol>

  <!-- Plum Blossom -->
  <symbol id="plum-blossom" viewBox="0 0 40 40">
    <circle cx="20" cy="12" r="5" fill="currentColor" opacity="0.12"/>
    <circle cx="12" cy="22" r="5" fill="currentColor" opacity="0.1"/>
    <circle cx="28" cy="22" r="5" fill="currentColor" opacity="0.1"/>
    <circle cx="15" cy="32" r="4" fill="currentColor" opacity="0.08"/>
    <circle cx="25" cy="32" r="4" fill="currentColor" opacity="0.08"/>
    <circle cx="20" cy="22" r="2" fill="var(--vermillion)" opacity="0.2"/>
  </symbol>

  <!-- Horse (ink style) -->
  <symbol id="horse" viewBox="0 0 200 160">
    <path d="M40 120 Q30 90 50 70 Q55 55 50 40 Q52 30 60 25 Q65 20 70 25 Q72 35 68 45 Q75 50 85 55 Q100 50 120 55 Q140 50 155 60 Q165 65 170 80 Q175 95 170 110 Q168 120 160 125" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M85 55 Q80 75 75 95 Q72 110 70 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <path d="M120 55 Q125 75 130 95 Q132 110 135 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <path d="M155 60 Q160 75 155 90 Q152 105 150 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <!-- tail -->
    <path d="M40 120 Q25 110 15 130 Q10 140 20 145" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- mane -->
    <path d="M60 25 Q55 15 60 10" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.3"/>
    <path d="M65 22 Q60 12 63 7" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.25"/>
  </symbol>

  <!-- Gadfly -->
  <symbol id="gadfly" viewBox="0 0 80 60">
    <ellipse cx="40" cy="35" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
    <ellipse cx="40" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.35"/>
    <!-- wings -->
    <ellipse cx="25" cy="25" rx="14" ry="6" fill="currentColor" opacity="0.1" transform="rotate(-20 25 25)"/>
    <ellipse cx="55" cy="25" rx="14" ry="6" fill="currentColor" opacity="0.1" transform="rotate(20 55 25)"/>
    <!-- legs -->
    <line x1="35" y1="42" x2="30" y2="52" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
    <line x1="40" y1="43" x2="40" y2="54" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
    <line x1="45" y1="42" x2="50" y2="52" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  </symbol>
</defs>
</svg>

<div class="slide-deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide dark active paper-texture-dark" data-slide="1" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Vertical sidebar right -->
  <div class="vertical-sidebar on-dark" style="font-size:28px;letter-spacing:0.5em;opacity:0.25;right:50px;">申辩篇</div>
  <!-- Bamboo left -->
  <svg style="position:absolute;left:30px;top:0;height:100%;width:60px;color:var(--rice-paper-text)"><use href="#bamboo"/></svg>

  <div class="text-center anim-up" style="z-index:2;">
    <div class="display-xxl spaced-chars" style="color:var(--rice-paper-text);margin-bottom:32px;">我 的 申 辩</div>
    <svg class="brush-divider-long anim-up-d1" style="color:var(--rice-paper-text);margin:0 auto 28px;"><use href="#brush-stroke-long"/></svg>
    <div class="anim-up-d2" style="font-family:var(--font-display);font-size:22px;color:var(--rice-paper-text);letter-spacing:0.3em;opacity:0.7;">苏格拉底 · 致雅典公民法庭</div>
    <div class="anim-up-d3 mt-16" style="font-family:var(--font-body);font-size:15px;color:var(--diluted-ink);letter-spacing:0.2em;">公元前三九九年 · 吾年七十</div>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.12;height:200px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="70" height="70"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】以沉默开场，环顾四方。缓缓开口，如老者回忆往事。这是一个七十岁老人一生中唯一一次走进法庭——他来赴的不是审判，是命运。声音低沉，有岁月的重量。
  </div>
</div>

<!-- ==================== SLIDE 2: 开场 ==================== -->
<div class="slide light paper-texture" data-slide="2" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="vertical-sidebar" style="opacity:0.12;font-size:18px;">开场白</div>

  <svg class="brush-divider anim-up" style="color:var(--ink-black);"><use href="#brush-stroke"/></svg>

  <div class="quote-block anim-up-d1 mt-24" style="max-width:900px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:22px;line-height:2;">雅典的公民们——我的控告者说得天花乱坠，却几乎没说过一句真话。</p>
  </div>

  <p class="body-text anim-up-d2 mt-24" style="max-width:860px;font-size:18px;line-height:2;">他们最可笑的说法是让你们提防我的"雄辩"。我连法庭话术都不会。除非"雄辩"就是"说真话"——那我承认。</p>

  <p class="body-text anim-up-d3 mt-24" style="max-width:860px;font-size:18px;line-height:2;color:var(--diluted-ink);">吾年七十，初登法庭。请以待客之道，容我以素语道真言。</p>

  <!-- Ink splash -->
  <div class="ink-splash" style="right:-50px;top:60px;width:400px;height:400px;"></div>
  <div class="ink-splash" style="left:-80px;bottom:40px;width:250px;height:250px;"></div>

  <div class="speaker-notes">
    【演讲备注】语调平静，近乎自嘲。苏格拉底从一开始就在拆解修辞——他说自己不善言辞，实则这正是最精妙的修辞。停顿让听者思考：什么是真正的雄辩？真话本身即雄辩。七十年来第一次站在这里，老者的谦卑与锋芒并存。
  </div>
</div>

<!-- ==================== SLIDE 3: 明暗之敌 ==================== -->
<div class="slide light paper-texture" data-slide="3" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:36px;margin-bottom:40px;">明暗之敌</div>

  <div class="flex-row gap-40 w-full anim-up-d1" style="max-width:1100px;">
    <!-- 暗敌 scroll -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--indigo);letter-spacing:0.15em;display:block;margin-bottom:16px;">暗 敌</span>
      <p class="body-text" style="font-size:16px;line-height:2;">二十四年来的流言蜚语。阿里斯托芬的《云》。从你们年幼时便已根深蒂固。</p>
      <p class="body-text mt-16" style="font-size:17px;line-height:2;font-family:var(--font-display);color:var(--indigo);">我今日所战者，非三人——<br>乃影也。</p>
    </div>
    <!-- 明敌 scroll -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--vermillion);letter-spacing:0.15em;display:block;margin-bottom:16px;">明 敌</span>
      <p class="body-text" style="font-size:16px;line-height:2;">美勒托斯代表诗人，安尼托斯代表工匠与政客，莱孔代表修辞家。</p>
      <p class="body-text mt-16" style="font-size:17px;line-height:2;font-family:var(--font-display);color:var(--vermillion);">三人者，三怒也。</p>
    </div>
  </div>

  <!-- Plum blossom decorations -->
  <svg style="position:absolute;right:80px;top:80px;width:60px;height:60px;color:var(--ink-black);"><use href="#plum-blossom"/></svg>

  <div class="speaker-notes">
    【演讲备注】此处分辨敌之明暗，是苏格拉底的战略眼光。暗敌比明敌更可怕——二十四年的偏见已成为雅典人的潜意识。他在对抗的不是三个人，而是整座城的无形之墙。声调在说"乃影也"时低沉下来，有千钧之力。
  </div>
</div>

<!-- ==================== SLIDE 4: 神谕 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="4" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Enso circle background -->
  <svg class="anim-fade" style="position:absolute;width:420px;height:420px;color:var(--rice-paper-text);opacity:0.12;"><use href="#enso"/></svg>

  <div style="max-width:700px;text-align:center;z-index:2;">
    <div class="display-text anim-up" style="font-size:32px;color:var(--rice-paper-text);margin-bottom:36px;">神 谕</div>

    <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2.2;">吾友凯瑞丰，性急之人，往德尔斐问神：</p>
    <p class="body-text on-dark anim-up-d2 mt-8" style="font-family:var(--font-display);font-size:20px;line-height:2;">天下有比苏格拉底更智慧的人否？</p>

    <div class="anim-up-d3 mt-32" style="font-family:var(--font-display);font-size:48px;color:var(--gold);letter-spacing:0.3em;">神曰：无</div>

    <p class="body-text on-dark anim-up-d4 mt-32" style="font-size:17px;line-height:2.2;opacity:0.8;">我闻之大惑。我明明一无所知——但神不妄言。<br>于是我决心以行求证，遍访智者，以驳神谕。</p>

    <p class="anim-up-d5 mt-24" style="font-family:var(--font-display);font-size:19px;color:var(--vermillion);letter-spacing:0.1em;">此一念，改吾一生。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是全篇的转折枢纽。苏格拉底并非狂妄自认智慧——他困惑，他质疑，他用行动去验证。"神曰：无"三字要重读，如雷贯耳。而后的叙述语调转为平静的回忆，一个老人在回望改变命运的那一刻。最后一句如棒喝。
  </div>
</div>

<!-- ==================== SLIDE 5: 问道三途 ==================== -->
<div class="slide light paper-texture" data-slide="5" style="flex-direction:column;justify-content:center;padding:60px 80px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:40px;">问道三途</div>

  <div class="flex-row gap-32 w-full anim-up-d1" style="max-width:1200px;">
    <!-- Card 1 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🏛</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问政客</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">名高者愚甚。彼不知而自以为知；吾不知亦不自以为知——一线之差，吾胜之。</p>
    </div>
    <!-- Card 2 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🪶</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问诗人</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">以神来之笔写诗，却不解其意。如巫如卜，言美而不知所云。更以诗才自诩全知。</p>
    </div>
    <!-- Card 3 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🔨</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问工匠</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">技艺确实精湛——此吾所不及。然亦因技而骄，以为万事皆通。</p>
    </div>
  </div>

  <!-- Brush line bottom -->
  <svg class="brush-divider-long anim-up-d2 mt-32" style="color:var(--ink-black);"><use href="#brush-stroke-long"/></svg>

  <div class="speaker-notes">
    【演讲备注】三类人，三种愚——政客的自大、诗人的无知、工匠的越界。苏格拉底的发现惊人地一致：每个人都在自己不懂的领域自以为懂。语调从好奇转向无奈，他本想证明神错了，却一路证明神是对的。
  </div>
</div>

<!-- ==================== SLIDE 6: 神谕之真义 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="6" style="flex-direction:column;justify-content:center;padding:60px 140px 60px 100px;">
  <!-- Large vertical sidebar -->
  <div class="vertical-sidebar left on-dark anim-fade" style="font-size:64px;letter-spacing:0.8em;opacity:0.08;left:40px;">知无知</div>

  <div style="max-width:800px;margin-left:60px;">
    <!-- Central hanging scroll quote -->
    <div class="hanging-scroll anim-up" style="margin-bottom:36px;">
      <p class="body-text on-dark" style="font-family:var(--font-display);font-size:20px;line-height:2.2;">唯神为真智。人之智，微乎其微。神以我为喻——知己无知者，乃人中最智也。</p>
    </div>

    <!-- Three points -->
    <div class="flex-col gap-16 anim-up-d2">
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">以我为镜——非赞我，乃示人</span>
      </div>
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">真智属神——人不过近之而已</span>
      </div>
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">自知无知，始为智——此苏格拉底悖论之核</span>
      </div>
    </div>

    <p class="body-text on-dark anim-up-d3 mt-32" style="font-size:15px;opacity:0.6;">为践此命，吾弃万事，甘居赤贫。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底哲学最核心的命题。"知无知"三字如禅宗公案，需留白让听者自悟。三个要点层层递进：神谕不是夸我，而是用我做教材；真正的智慧不属于人；唯有承认无知才能接近智慧。最后一句轻描淡写——赤贫，是他为真理付出的代价。
  </div>
</div>

<!-- ==================== SLIDE 7: 怨从何来 ==================== -->
<div class="slide light paper-texture" data-slide="7" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:32px;">怨从何来</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p class="body-text" style="font-size:18px;line-height:2.2;">每揭一人之伪，即增一人之怨。彼不怨己，反怨我曰：<span style="font-family:var(--font-display);color:var(--vermillion);">"此苏格拉底者，误人子弟之徒也！"</span></p>
  </div>

  <p class="body-text anim-up-d2 mt-24" style="font-size:17px;line-height:2;max-width:820px;">更有甚者——汝家子弟效我审人，使怨者愈众。</p>

  <!-- Ink splash -->
  <div class="ink-splash" style="right:100px;top:120px;width:350px;height:350px;"></div>

  <!-- Warning scroll -->
  <div class="hanging-scroll on-light anim-up-d3 mt-40" style="max-width:600px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:18px;line-height:2;color:var(--vermillion);text-align:center;">此三人之诉，实众怨之合也。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】苏格拉底揭示了控告的真相——不是三个人的怨恨，而是整个被戳穿的虚荣群体的报复。年轻人模仿他质问长辈，长辈们把怒火归咎于他。这是先知永恒的宿命：说真话的人成为真话的替罪羊。
  </div>
</div>

<!-- ==================== SLIDE 8: 庭辩：驯马之问 ==================== -->
<div class="slide light paper-texture" data-slide="8" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:32px;">庭辩：驯马之问</div>

  <!-- Horse SVG -->
  <svg class="anim-fade" style="position:absolute;right:80px;top:50%;transform:translateY(-50%);width:200px;height:160px;color:var(--ink-black);opacity:0.5;"><use href="#horse"/></svg>

  <div style="max-width:780px;">
    <!-- Dialogue -->
    <div class="anim-up-d1 mb-24" style="border-bottom:1px solid rgba(26,26,24,0.08);padding-bottom:20px;">
      <p class="body-text" style="font-size:16px;"><span style="color:var(--indigo);font-weight:700;">我问：</span>"若我为害，谁为益？"</p>
      <p class="body-text mt-8" style="font-size:16px;"><span style="color:var(--vermillion);font-weight:700;">美勒托斯：</span>"全雅典皆益，独汝为害！"</p>
    </div>
    <div class="anim-up-d2 mb-24" style="border-bottom:1px solid rgba(26,26,24,0.08);padding-bottom:20px;">
      <p class="body-text" style="font-size:16px;"><span style="color:var(--indigo);font-weight:700;">我问：</span>"马亦如此乎？一驯马师善之，众人皆善之乎？"</p>
      <p class="body-text mt-8" style="font-size:16px;"><span style="color:var(--vermillion);font-weight:700;">美勒托斯：</span>"非也，唯驯马师能善之。"</p>
    </div>
    <div class="anim-up-d3">
      <p class="body-text" style="font-family:var(--font-display);font-size:18px;line-height:2;color:var(--ink-black);">然则一人害众人善，岂非悖论？</p>
    </div>
  </div>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="60" height="60"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】经典的苏格拉底式诘问！他用驯马的类比让美勒托斯自相矛盾：既然驯马需要专家，教育难道不需要？怎么可能全城都是教育专家，只有一个人在害人？对话要演出节奏感，美勒托斯的回答越来越慌，苏格拉底的追问越来越锐利。
  </div>
</div>

<!-- ==================== SLIDE 9: 庭辩：骡子之论 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="9" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--rice-paper-text);margin-bottom:32px;">庭辩：骡子之论</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2;max-width:800px;">控书称我"信奉神灵之事"，又称我"不信神"。</p>

  <!-- Logic flow -->
  <div class="logic-flow anim-up-d2 mt-32" style="color:var(--rice-paper-text);">
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">信神灵之事</span>
    <span class="arrow">→</span>
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">必信精灵</span>
    <span class="arrow">→</span>
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">精灵乃神之属</span>
    <span class="arrow">→</span>
    <span style="background:rgba(194,59,34,0.2);padding:8px 16px;border-radius:3px;border:1px solid var(--vermillion);">既信又不信？</span>
  </div>

  <div class="hanging-scroll anim-up-d3 mt-40" style="max-width:700px;">
    <p class="body-text on-dark" style="font-family:var(--font-display);font-size:20px;line-height:2;text-align:center;">此犹言：骡子存在，而马驴不存在。<br><span style="color:var(--vermillion);">美勒托斯，汝之控书，戏言耳。</span></p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底的逻辑绝杀。他用最简单的三段论拆解控诉的荒谬：你说我信鬼神之事却不信神？那就像说骡子存在但马和驴不存在。逻辑链要一步步展开，让听者自己得出结论。最后的评语轻蔑而精准——"戏言耳"，杀人不用刀。
  </div>
</div>

<!-- ==================== SLIDE 10: 牛虻 ==================== -->
<div class="slide light paper-texture" data-slide="10" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:36px;color:var(--vermillion);margin-bottom:36px;">牛 虻</div>

  <!-- Gadfly SVG -->
  <svg class="anim-fade" style="position:absolute;right:120px;top:100px;width:120px;height:90px;color:var(--ink-black);"><use href="#gadfly"/></svg>

  <div class="hanging-scroll on-light anim-up-d1" style="max-width:800px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:19px;line-height:2.2;">
      雅典者，骏马也——高贵而怠惰。<br>
      吾者，牛虻也——神遣之以叮咬而唤醒之。<br>
      <span style="color:var(--vermillion);">汝杀吾，则继续沉睡。<br>除非神再遣一虻。</span>
    </p>
  </div>

  <p class="body-text anim-up-d2 mt-32" style="font-size:17px;line-height:2;max-width:760px;color:var(--diluted-ink);">吾之贫穷，即吾之证。非受神遣者，谁甘自苦如此？</p>

  <!-- Ink splash accent -->
  <div class="ink-splash" style="left:-60px;bottom:80px;width:300px;height:300px;background:radial-gradient(ellipse at center, rgba(194,59,34,0.04) 0%, transparent 60%);"></div>

  <div class="speaker-notes">
    【演讲备注】牛虻之喻是苏格拉底最著名的自我定位。他不是为了惹恼城邦，而是为了唤醒它。这段话的力量在于：他把自己的死和城邦的沉睡联系在一起。杀了牛虻，骏马就在舒适中堕落。声调坦然，没有求饶，只有冷静的警告。贫穷是他的证据——谁会为了找人麻烦而甘愿一贫如洗？
  </div>
</div>

<!-- ==================== SLIDE 11: 两次不从 ==================== -->
<div class="slide light paper-texture" data-slide="11" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:40px;">两次不从</div>

  <div class="flex-row gap-40 w-full anim-up-d1" style="max-width:1100px;">
    <!-- Story 1 -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:16px;">民主之世 · 前406年</span>
      <p class="body-text" style="font-size:16px;line-height:2;">将军审判，违法集审。吾为执政团唯一反对者。虽以死胁之，不改其志。</p>
    </div>
    <!-- Story 2 -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--vermillion);letter-spacing:0.1em;display:block;margin-bottom:16px;">暴政之世 · 前404年</span>
      <p class="body-text" style="font-size:16px;line-height:2;">三十僭主令吾捕人赴死。余四人往，吾独归。若僭主不覆，吾今不在矣。</p>
    </div>
  </div>

  <!-- Bottom banner -->
  <div class="anim-up-d2 mt-48 text-center" style="width:100%;">
    <svg class="brush-divider-long" style="color:var(--ink-black);margin:0 auto 16px;"><use href="#brush-stroke-long"/></svg>
    <p style="font-family:var(--font-display);font-size:20px;letter-spacing:0.15em;color:var(--ink-black);">无论何世，吾只从正义。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】两个故事，两种政体，同一个苏格拉底。民主时代他违抗多数暴政，暴政时代他违抗少数暴政。他不是反对哪种制度——他只忠于正义本身。"吾独归"四字极其震撼：四个人去执行不义之命，他转身走了。这种勇气超越了制度之争。
  </div>
</div>

<!-- ==================== SLIDE 12: 不泣不求 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="12" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:32px;color:var(--rice-paper-text);margin-bottom:24px;">不泣不求</div>

  <p class="body-text on-dark anim-up-d1 mt-8" style="font-size:18px;line-height:2;max-width:800px;">吾有三子。然不携来泣于庭前。</p>

  <div class="flex-row gap-32 mt-40 anim-up-d2" style="max-width:900px;">
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">耻</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">七十之年，何颜为此</p>
    </div>
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">辱</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">使雅典为天下笑</p>
    </div>
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">悖</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">汝等誓以法裁，非以情施。<br>吾以"不虔"受审，岂可逼汝违誓？</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】古希腊法庭常见被告携妻儿哭泣求情。苏格拉底拒绝这么做，理由极其锐利：耻——一个七十岁的哲学家哭着求饶？辱——让雅典显得像个靠眼泪判案的地方？悖——你们发过誓依法裁决，我若煽情，就是在逼你们违背誓言。这是尊严的最高形式。
  </div>
</div>

<!-- ==================== SLIDE 13: 判：有罪 ==================== -->
<div class="slide vermillion-bg paper-texture-dark" data-slide="13" style="flex-direction:column;align-items:center;justify-content:center;">
  <div class="anim-up text-center">
    <div class="display-xxl" style="color:var(--rice-paper-text);font-size:140px;letter-spacing:0.2em;">有罪</div>
  </div>

  <p class="anim-up-d2 mt-32" style="font-family:var(--font-display);font-size:24px;color:rgba(240,234,214,0.7);letter-spacing:0.1em;">三十票之差。</p>

  <!-- Ink splash accent -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 70%, rgba(26,26,24,0.15) 0%, transparent 50%);pointer-events:none;z-index:1;"></div>

  <div class="speaker-notes">
    【演讲备注】全场静默。仅两个字，如当头棒喝。五百零一人投票，二百八十对二百二十一。三十票之差——如此微弱的多数，定一个人的罪。这页要停留足够长，让沉默说话。
  </div>
</div>

<!-- ==================== SLIDE 14: 何以罚我 ==================== -->
<div class="slide light paper-texture" data-slide="14" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:28px;">何以罚我</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p class="body-text" style="font-size:18px;line-height:2.2;">吾为城邦之恩人。当何报之？<span style="font-family:var(--font-display);color:var(--gold);font-weight:700;">在公堂免费用餐</span>——如奥林匹亚冠军然。</p>
  </div>

  <p class="body-text anim-up-d2 mt-16" style="font-size:16px;line-height:2;max-width:800px;color:var(--diluted-ink);">盖冠军予汝幸福之幻，吾予汝幸福之实。</p>

  <!-- Four rejections -->
  <div class="flex-row gap-24 mt-40 anim-up-d3" style="max-width:1000px;">
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">死</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">未知善恶</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">囚</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">沦为奴隶</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">逐</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">何处不被追随</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">默</div>
      <p class="body-text" style="font-size:14px;color:var(--vermillion);">违神命</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底最惊世骇俗的时刻：被判有罪后，按雅典法律他可以自提处罚。他提出——在公堂免费用餐！这不是挑衅，而是逻辑：如果他真的对城邦有贡献，理应受到奖赏。四种刑罚一一拒绝，每一种都不可接受。死——未知不可畏；囚——不如死；逐——到哪都一样；沉默——等于放弃使命。
  </div>
</div>

<!-- ==================== SLIDE 15: 千古一言 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="15" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Enso -->
  <svg class="anim-fade" style="position:absolute;width:500px;height:500px;color:var(--gold);opacity:0.08;"><use href="#enso"/></svg>

  <div class="text-center" style="z-index:2;max-width:700px;">
    <!-- Vertical large text -->
    <div class="anim-up" style="writing-mode:vertical-rl;font-family:var(--font-display);font-size:52px;font-weight:900;color:var(--gold);letter-spacing:0.4em;line-height:1.8;margin:0 auto 32px;display:inline-block;">未经审视的人生不值得过</div>
  </div>

  <p class="anim-up-d2 mt-16" style="font-family:var(--font-body);font-size:14px;color:var(--diluted-ink);letter-spacing:0.05em;text-align:center;">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</p>

  <div class="anim-up-d3 mt-40" style="max-width:600px;text-align:center;">
    <p class="body-text on-dark" style="font-size:17px;line-height:2.2;">日省吾身，论德辩善——此人生之至善也。<br><span style="color:var(--vermillion);">令我噤声？断不可能。</span></p>
  </div>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="65" height="65"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】整场申辩的核心，两千四百年来最有力量的一句话。竖排大字金色呈现，如同刻碑。希腊语原文轻轻呈现，提醒我们这句话穿越了语言和时间。苏格拉底不是在辩护——他在宣告一种生存方式。沉默等于死亡，不是肉体的死亡，而是灵魂的。
  </div>
</div>

<!-- ==================== SLIDE 16: 判：死刑 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="16" style="flex-direction:column;align-items:center;justify-content:center;">
  <div class="anim-up text-center">
    <div class="display-xxl" style="color:var(--rice-paper-text);font-size:160px;letter-spacing:0.3em;">死刑</div>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.1;height:220px;"><use href="#ink-mountains-1"/></svg>

  <div class="speaker-notes">
    【演讲备注】比"有罪"更沉重的沉默。两个字填满整个空间。山水在底部若隐若现——大地沉默，天命已定。不需要多说一个字。停留，呼吸，让死亡的重量降临。
  </div>
</div>

<!-- ==================== SLIDE 17: 致判我死者 ==================== -->
<div class="slide light paper-texture" data-slide="17" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:32px;">致判我死者</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p style="font-family:var(--font-display);font-size:22px;line-height:2;color:var(--ink-black);">吾宁以吾道而死，不以汝道而生。</p>
  </div>

  <div class="ink-card on-light anim-up-d2 mt-32" style="max-width:800px;">
    <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">赛跑之喻</span>
    <p class="body-text" style="font-size:16px;line-height:2;">避死不难，避不义难——不义快于死。死追及吾，不义追及汝。</p>
  </div>

  <p class="body-text anim-up-d3 mt-32" style="font-size:17px;line-height:2;max-width:800px;">吾死之后，更多更年轻的质问者将至。<span style="color:var(--vermillion);font-family:var(--font-display);">杀人不能塞批评之口——唯改过能免之。</span></p>

  <div class="speaker-notes">
    【演讲备注】死刑宣判后，苏格拉底没有崩溃，而是从容地对判他死刑的人说出了最冷静的预言。赛跑的比喻精妙绝伦：你们逃避不义比我逃避死亡更难，因为不义跑得比死亡更快。最后的警告如谶语：杀了我只会引来更多质问者。历史证明他是对的——他的死催生了整个西方哲学传统。
  </div>
</div>

<!-- ==================== SLIDE 18: 论死 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="18" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--rice-paper-text);margin-bottom:24px;">论 死</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:17px;line-height:2;max-width:800px;opacity:0.7;">吾之代蒙今日全程沉默——此吉兆也。</p>

  <div class="flex-row gap-40 mt-40 anim-up-d2" style="max-width:1000px;">
    <!-- Path 1 -->
    <div class="hanging-scroll flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:16px;">其一 · 无梦之眠</span>
      <p class="body-text on-dark" style="font-size:16px;line-height:2;">若死即永眠——选汝一生中最安之夜，波斯王亦寥寥可数。</p>
      <p class="body-text on-dark mt-12" style="font-size:16px;line-height:2;color:var(--gold);">永恒若一夜好眠，何惧之有？</p>
    </div>
    <!-- Path 2 -->
    <div class="hanging-scroll flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--gold);letter-spacing:0.1em;display:block;margin-bottom:16px;">其二 · 灵魂远行</span>
      <p class="body-text on-dark" style="font-size:16px;line-height:2;">若死后至彼世——可见荷马、赫西俄德！可继续问道！</p>
      <p class="body-text on-dark mt-12" style="font-size:16px;line-height:2;color:var(--gold);">且彼处不以问道罪人。</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】面对死亡，苏格拉底展现了哲学家最高的境界——用逻辑化解恐惧。两条路都不坏：如果死是永眠，那是最好的睡眠；如果死后有来世，那他终于可以和荷马对话，而且不会因为提问被处死。"代蒙沉默"是关键细节——苏格拉底的内心之声在他即将做坏事时会发出警告，今天全程没有发声，说明赴死并非坏事。
  </div>
</div>

<!-- ==================== SLIDE 19: 最后的话 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="19" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--gold);margin-bottom:36px;">最后的话</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2.2;max-width:800px;">善人无论生死，不受真恶。神不弃之。</p>

  <div class="quote-block anim-up-d2 mt-32" style="max-width:800px;border-left-color:var(--gold);">
    <p class="body-text on-dark" style="font-size:17px;line-height:2.2;">吾之遗请：待吾子长大，若逐利忘德，若妄自尊大——请如吾之折磨汝，折磨彼等。</p>
  </div>

  <!-- Final golden line -->
  <div class="anim-up-d3 mt-48 text-center" style="width:100%;">
    <p style="font-family:var(--font-display);font-size:32px;font-weight:900;color:var(--gold);line-height:1.8;letter-spacing:0.1em;">
      行矣。吾赴死，汝赴生。<br>孰善孰恶，唯神知之。
    </p>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.08;height:180px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="65" height="65"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】全篇最后的话语，每一个字都是永恒。"善人不受真恶"——这是苏格拉底终极的信仰。遗请不是为自己，而是为儿子——请像我折磨你们一样折磨他们，让他们追求德性而非财富。最后两句金字必须慢读，如告别，如遗言，如千古不灭的回声。"唯神知之"——把最终的判断交给超越人世的存在，这是最大的谦卑，也是最大的骄傲。
  </div>
</div>

<!-- ==================== SLIDE 20: 尾页 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="20" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Bamboo right -->
  <svg style="position:absolute;right:50px;top:0;height:100%;width:60px;color:var(--rice-paper-text);"><use href="#bamboo"/></svg>

  <div class="text-center anim-up" style="z-index:2;">
    <p style="font-family:var(--font-display);font-size:28px;color:var(--rice-paper-text);letter-spacing:0.3em;opacity:0.8;">苏格拉底的申辩</p>
    <svg class="brush-divider anim-up-d1" style="color:var(--rice-paper-text);margin:24px auto;"><use href="#brush-stroke"/></svg>
    <p class="anim-up-d2" style="font-family:var(--font-body);font-size:16px;color:var(--diluted-ink);letter-spacing:0.15em;">柏拉图记述</p>
    <p class="anim-up-d3 mt-24" style="font-family:var(--font-body);font-size:13px;color:var(--diluted-ink);opacity:0.5;">公元前三九九年 · 雅典</p>
  </div>

  <!-- Plum blossom decorations -->
  <svg style="position:absolute;left:80px;top:120px;width:50px;height:50px;color:var(--rice-paper-text);"><use href="#plum-blossom"/></svg>
  <svg style="position:absolute;left:120px;bottom:200px;width:35px;height:35px;color:var(--rice-paper-text);"><use href="#plum-blossom"/></svg>

  <!-- Ink mountains -->
  <svg class="ink-mountains higher" style="color:var(--rice-paper-text);height:160px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal -->
  <svg class="seal-stamp anim-up-d3" width="70" height="70"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】万语千言归于沉寂。如水墨画留白——最后一页不需要多余的文字。柏拉图记述了这一切，两千四百年后我们依然在聆听。这就是哲学的力量——肉体消亡，思想永存。
  </div>
</div>

</div><!-- /slide-deck -->

<!-- ========== NAVIGATION ========== -->
<div class="nav-bar"><div class="nav-progress" id="navProgress"></div></div>
<div class="slide-counter" id="slideCounter"></div>

<!-- ========== SLIDE ENGINE JS ========== -->
<script>
(function() {
  'use strict';

  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let isAnimating = false;

  const navProgress = document.getElementById('navProgress');
  const slideCounter = document.getElementById('slideCounter');

  function updateUI() {
    navProgress.style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
    slideCounter.textContent = (currentSlide + 1) + ' / ' + totalSlides;

    // Adapt counter color
    const active = slides[currentSlide];
    if (active.classList.contains('dark') || active.classList.contains('vermillion-bg')) {
      slideCounter.style.color = 'rgba(240,234,214,0.35)';
    } else {
      slideCounter.style.color = 'rgba(26,26,24,0.3)';
    }
  }

  function goToSlide(n) {
    if (n < 0 || n >= totalSlides || n === currentSlide || isAnimating) return;
    isAnimating = true;

    slides[currentSlide].classList.remove('active');
    slides[currentSlide].style.display = 'none';
    currentSlide = n;
    slides[currentSlide].style.display = 'flex';

    // Trigger reflow for animations
    void slides[currentSlide].offsetWidth;
    slides[currentSlide].classList.add('active');

    updateUI();
    setTimeout(() => { isAnimating = false; }, 500);
  }

  function next() { goToSlide(currentSlide + 1); }
  function prev() { goToSlide(currentSlide - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); goToSlide(0); break;
      case 'End':
        e.preventDefault(); goToSlide(totalSlides - 1); break;
      case 'n':
        document.body.classList.toggle('show-notes'); break;
      case 'f':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(()=>{});
        } else {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Click navigation
  document.addEventListener('click', function(e) {
    if (e.target.closest('.speaker-notes')) return;
    const x = e.clientX / window.innerWidth;
    if (x > 0.5) next(); else prev();
  });

  // Touch
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  // Mouse wheel
  let wheelTimeout;
  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) next(); else prev();
    }, 80);
  }, { passive: false });

  // Hash navigation
  function handleHash() {
    const hash = parseInt(location.hash.replace('#', ''));
    if (hash >= 1 && hash <= totalSlides) {
      goToSlide(hash - 1);
    }
  }
  window.addEventListener('hashchange', handleHash);

  // Init
  slides.forEach((s, i) => {
    if (i !== 0) { s.style.display = 'none'; s.classList.remove('active'); }
  });
  handleHash();
  updateUI();
})();
</script>

</body>
</html>

=== FILE: .claude/skills/presentation-skill/docs/greek-academy.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --marble: #f8f5f0;
  --dark: #2a2a1e;
  --gold: #c5a55a;
  --olive: #6b7c3e;
  --terracotta: #c06030;
  --text-dark: #2a2a1e;
  --text-light: #f0ead6;
  --text-secondary: #6b6355;
  --parchment: #f3e8d0;
  --shadow: rgba(42,42,30,0.1);
  --radius: 4px;
  --font-heading: 'Playfair Display', 'Georgia', serif;
  --font-body: 'Crimson Text', 'Georgia', serif;
}

/* ============================================================
   RESET & BASE
   ============================================================ */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html, body { width:100%; height:100%; overflow:hidden; background:#1a1a12; font-family: var(--font-body); }

/* ============================================================
   GREEK KEY BORDER PATTERN (CSS only)
   ============================================================ */
.greek-key-border {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
}
.greek-key-border::before {
  content: '';
  position: absolute; inset: 12px;
  border: 2px solid var(--gold);
  border-radius: var(--radius);
}
.greek-key-border::after {
  content: '';
  position: absolute; inset: 20px;
  border: 1px solid rgba(197,165,90,0.3);
  border-radius: var(--radius);
}

/* Meander pattern strip */
.meander-top, .meander-bottom {
  position: absolute; left: 30px; right: 30px; height: 8px; z-index: 3;
  background:
    repeating-linear-gradient(90deg,
      var(--gold) 0px, var(--gold) 4px,
      transparent 4px, transparent 8px,
      var(--gold) 8px, var(--gold) 12px,
      transparent 12px, transparent 16px
    );
  mask: repeating-linear-gradient(90deg, #000 0px, #000 12px, transparent 12px, transparent 16px);
  -webkit-mask: repeating-linear-gradient(90deg, #000 0px, #000 12px, transparent 12px, transparent 16px);
  opacity: 0.5;
}
.meander-top { top: 15px; }
.meander-bottom { bottom: 15px; }

/* ============================================================
   CORNER ORNAMENTS (light slides)
   ============================================================ */
.slide--light .corner-ornament { display: block; }
.corner-ornament {
  display: none;
  position: absolute; width: 40px; height: 40px; z-index: 4;
  opacity: 0.35;
}
.corner-ornament::before, .corner-ornament::after {
  content: ''; position: absolute; background: var(--gold);
}
.corner-ornament--tl { top: 24px; left: 24px; }
.corner-ornament--tl::before { width: 20px; height: 2px; top:0; left:0; }
.corner-ornament--tl::after  { width: 2px; height: 20px; top:0; left:0; }
.corner-ornament--tr { top: 24px; right: 24px; }
.corner-ornament--tr::before { width: 20px; height: 2px; top:0; right:0; }
.corner-ornament--tr::after  { width: 2px; height: 20px; top:0; right:0; }
.corner-ornament--bl { bottom: 24px; left: 24px; }
.corner-ornament--bl::before { width: 20px; height: 2px; bottom:0; left:0; }
.corner-ornament--bl::after  { width: 2px; height: 20px; bottom:0; left:0; }
.corner-ornament--br { bottom: 24px; right: 24px; }
.corner-ornament--br::before { width: 20px; height: 2px; bottom:0; right:0; }
.corner-ornament--br::after  { width: 2px; height: 20px; bottom:0; right:0; }

/* ============================================================
   NOISE TEXTURE (marble slides)
   ============================================================ */
.slide--light::before {
  content: '';
  position: absolute; inset: 0; z-index: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

/* ============================================================
   SLIDE SYSTEM
   ============================================================ */
.slides-container {
  width: 100vw; height: 100vh;
  position: relative; overflow: hidden;
}
.slide {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: clamp(40px, 5vh, 80px) clamp(60px, 8vw, 160px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transform: translateX(40px);
}
.slide.active {
  opacity: 1; visibility: visible;
  transform: translateX(0);
  z-index: 1;
}
.slide.prev {
  opacity: 0; visibility: hidden;
  transform: translateX(-40px);
}

.slide--light {
  background: var(--marble);
  color: var(--text-dark);
}
.slide--dark {
  background: var(--dark);
  color: var(--text-light);
}
.slide--dark .greek-key-border::before { border-color: rgba(197,165,90,0.5); }
.slide--dark .greek-key-border::after  { border-color: rgba(197,165,90,0.15); }
.slide--dark .meander-top, .slide--dark .meander-bottom { opacity: 0.3; }

/* ============================================================
   SLIDE INNER CONTENT
   ============================================================ */
.slide-inner {
  position: relative; z-index: 1;
  max-width: 1100px; width: 100%;
  text-align: left;
}
.slide-inner.center { text-align: center; }

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1, h2, h3 { font-family: var(--font-heading); font-weight: 700; line-height: 1.2; }
h1 { font-size: clamp(36px, 4vw, 56px); margin-bottom: 0.3em; }
h2 { font-size: clamp(28px, 3vw, 42px); margin-bottom: 0.4em; }
h3 { font-size: clamp(20px, 2vw, 28px); margin-bottom: 0.3em; font-weight: 600; }
p, li { font-size: clamp(15px, 1.5vw, 18px); line-height: 1.8; margin-bottom: 0.5em; }
.small { font-size: clamp(13px, 1.2vw, 15px); }
.secondary { color: var(--text-secondary); }
.slide--dark .secondary { color: rgba(240,234,214,0.6); }
.gold { color: var(--gold); }
.terracotta { color: var(--terracotta); }
.olive-text { color: var(--olive); }
.italic { font-style: italic; }

/* Section number */
.section-num {
  font-family: var(--font-heading);
  font-size: clamp(14px, 1.2vw, 16px);
  color: var(--gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 400;
}

/* ============================================================
   QUOTE / SCROLL BLOCK
   ============================================================ */
.scroll-quote {
  background: linear-gradient(135deg, var(--parchment) 0%, #efe3cc 100%);
  border: 1px solid rgba(197,165,90,0.3);
  border-radius: 6px;
  padding: clamp(16px, 2vw, 28px) clamp(20px, 3vw, 36px);
  margin: 16px 0;
  position: relative;
  color: var(--text-dark);
  box-shadow: 0 4px 20px var(--shadow), inset 0 1px 0 rgba(255,255,255,0.5);
}
.scroll-quote::before, .scroll-quote::after {
  content: '';
  position: absolute; left: 8px; right: 8px; height: 12px;
  background: radial-gradient(ellipse at center, rgba(197,165,90,0.15) 0%, transparent 70%);
}
.scroll-quote::before { top: -6px; }
.scroll-quote::after  { bottom: -6px; }
.scroll-quote p { font-style: italic; font-size: clamp(16px, 1.6vw, 20px); line-height: 1.7; }

/* Big quote */
.big-quote {
  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  line-height: 1.4;
  color: var(--gold);
  text-align: center;
  margin: 20px 0;
}

/* ============================================================
   CARDS
   ============================================================ */
.card-grid { display: grid; gap: 16px; margin: 16px 0; }
.card-grid--2 { grid-template-columns: 1fr 1fr; }
.card-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.card-grid--4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
@media (max-width: 900px) {
  .card-grid--2, .card-grid--3, .card-grid--4 { grid-template-columns: 1fr; }
}

.card {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(197,165,90,0.2);
  border-radius: var(--radius);
  padding: clamp(14px, 1.5vw, 22px);
  box-shadow: 0 2px 12px var(--shadow);
}
.slide--dark .card {
  background: rgba(255,255,255,0.06);
  border-color: rgba(197,165,90,0.2);
}

.insight-card {
  background: linear-gradient(135deg, rgba(197,165,90,0.12) 0%, rgba(107,124,62,0.08) 100%);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius);
  padding: clamp(12px, 1.5vw, 20px);
  margin: 12px 0;
}
.slide--dark .insight-card {
  background: linear-gradient(135deg, rgba(197,165,90,0.15) 0%, rgba(107,124,62,0.1) 100%);
}

/* ============================================================
   TWO-COLUMN LAYOUT
   ============================================================ */
.two-col {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
}
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }

.col-divider {
  display: flex; align-items: center; justify-content: center;
}

/* ============================================================
   LOGIC CHAIN / STEPS
   ============================================================ */
.logic-chain { list-style: none; counter-reset: logic; }
.logic-chain li {
  counter-increment: logic;
  padding: 8px 0 8px 40px;
  position: relative;
  border-left: 2px solid rgba(197,165,90,0.3);
  margin-left: 15px;
}
.logic-chain li::before {
  content: counter(logic);
  position: absolute; left: -15px; top: 6px;
  width: 28px; height: 28px;
  background: var(--gold); color: var(--dark);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-heading); font-weight: 700; font-size: 14px;
}

/* ============================================================
   VERDICT / LARGE LABEL
   ============================================================ */
.verdict {
  font-family: var(--font-heading);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 900;
  color: var(--terracotta);
  text-align: center;
  margin: 20px 0;
  text-shadow: 0 2px 20px rgba(192,96,48,0.3);
}
.slide--dark .verdict { color: var(--terracotta); }

.part-label {
  font-family: var(--font-heading);
  font-size: clamp(16px, 1.5vw, 20px);
  color: var(--gold);
  letter-spacing: 4px;
  text-align: center;
  margin-top: 12px;
}

/* ============================================================
   SVG STYLING
   ============================================================ */
.svg-icon { display: inline-block; vertical-align: middle; }
.svg-icon--lg { width: clamp(80px, 10vw, 140px); height: auto; margin: 12px auto; display: block; }
.svg-icon--md { width: clamp(50px, 6vw, 80px); height: auto; }
.svg-icon--sm { width: clamp(30px, 4vw, 50px); height: auto; }
.svg-icon--inline { width: 24px; height: 24px; margin-right: 6px; vertical-align: -4px; }
.svg-center { text-align: center; }

/* ============================================================
   SLIDE NUMBER & PROGRESS
   ============================================================ */
.slide-number {
  position: fixed; bottom: 12px; right: 24px;
  font-family: var(--font-heading); font-size: 14px;
  color: rgba(197,165,90,0.6); z-index: 100;
}
.progress-bar {
  position: fixed; bottom: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--olive));
  transition: width 0.4s ease; z-index: 100;
}

/* ============================================================
   CONTROLS UI
   ============================================================ */
.controls {
  position: fixed; top: 12px; right: 16px; z-index: 200;
  display: flex; gap: 8px;
}
.controls button {
  background: rgba(42,42,30,0.7); border: 1px solid rgba(197,165,90,0.3);
  color: var(--text-light); padding: 6px 10px; border-radius: var(--radius);
  cursor: pointer; font-family: var(--font-body); font-size: 13px;
  transition: background 0.2s;
}
.controls button:hover { background: rgba(197,165,90,0.3); }
.controls button.active { background: var(--gold); color: var(--dark); }

/* Speaker notes panel */
.notes-panel {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(42,42,30,0.95); color: var(--text-light);
  padding: 16px 24px; font-size: 14px; line-height: 1.6;
  transform: translateY(100%); transition: transform 0.3s ease;
  z-index: 150; max-height: 30vh; overflow-y: auto;
  border-top: 2px solid var(--gold);
}
.notes-panel.visible { transform: translateY(0); }

/* ============================================================
   PRINT STYLES
   ============================================================ */
@media print {
  body { overflow: visible; background: white; }
  .slide {
    position: relative !important; opacity: 1 !important; visibility: visible !important;
    transform: none !important; page-break-after: always; page-break-inside: avoid;
    width: 100%; min-height: 100vh;
  }
  .controls, .slide-number, .progress-bar, .notes-panel { display: none !important; }
  .greek-key-border::before { border-color: #999 !important; }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 768px) {
  .slide { padding: 30px 24px; }
  .two-col { grid-template-columns: 1fr; gap: 16px; }
  .card-grid--2, .card-grid--3, .card-grid--4 { grid-template-columns: 1fr; }
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.slide.active .anim-in {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}
.slide.active .anim-in:nth-child(1) { animation-delay: 0.1s; }
.slide.active .anim-in:nth-child(2) { animation-delay: 0.25s; }
.slide.active .anim-in:nth-child(3) { animation-delay: 0.4s; }
.slide.active .anim-in:nth-child(4) { animation-delay: 0.55s; }
.slide.active .anim-in:nth-child(5) { animation-delay: 0.7s; }
</style>
</head>
<body>

<div class="slides-container" id="slidesContainer">

<!-- ============================================================
     SLIDE 1 — 封面
     ============================================================ -->
<div class="slide slide--dark active" data-notes="这是我苏格拉底一生中最重要的一天。公元前399年，我站在由五百零一位公民组成的法庭前。我已经七十岁了，从未上过法庭。今天，我要为自己的一生做一次彻底的辩护。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Laurel Wreath SVG -->
    <div class="svg-center anim-in">
      <svg class="svg-icon--lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.9">
          <!-- Left branch -->
          <path d="M100 170 C60 160, 30 130, 25 90" stroke="#c5a55a" stroke-width="2" fill="none"/>
          <ellipse cx="38" cy="130" rx="12" ry="6" transform="rotate(-30 38 130)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="30" cy="115" rx="12" ry="6" transform="rotate(-40 30 115)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="26" cy="100" rx="11" ry="5.5" transform="rotate(-55 26 100)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="28" cy="85" rx="11" ry="5.5" transform="rotate(-65 28 85)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="34" cy="72" rx="10" ry="5" transform="rotate(-75 34 72)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="42" cy="60" rx="10" ry="5" transform="rotate(-80 42 60)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="52" cy="50" rx="10" ry="5" transform="rotate(-85 52 50)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="64" cy="42" rx="9" ry="5" transform="rotate(10 64 42)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="78" cy="36" rx="9" ry="5" transform="rotate(20 78 36)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="90" cy="33" rx="9" ry="5" transform="rotate(30 90 33)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Right branch -->
          <path d="M100 170 C140 160, 170 130, 175 90" stroke="#c5a55a" stroke-width="2" fill="none"/>
          <ellipse cx="162" cy="130" rx="12" ry="6" transform="rotate(30 162 130)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="170" cy="115" rx="12" ry="6" transform="rotate(40 170 115)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="174" cy="100" rx="11" ry="5.5" transform="rotate(55 174 100)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="172" cy="85" rx="11" ry="5.5" transform="rotate(65 172 85)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="166" cy="72" rx="10" ry="5" transform="rotate(75 166 72)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="158" cy="60" rx="10" ry="5" transform="rotate(80 158 60)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="148" cy="50" rx="10" ry="5" transform="rotate(85 148 50)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="136" cy="42" rx="9" ry="5" transform="rotate(-10 136 42)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="122" cy="36" rx="9" ry="5" transform="rotate(-20 122 36)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="110" cy="33" rx="9" ry="5" transform="rotate(-30 110 33)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Ribbon -->
          <path d="M95 170 L90 190 M105 170 L110 190" stroke="#c5a55a" stroke-width="1.5" fill="none"/>
        </g>
      </svg>
    </div>
    <h1 class="anim-in" style="font-size:clamp(42px,5vw,64px); color:var(--text-light); margin-top:12px;">我的申辩</h1>
    <p class="anim-in" style="font-family:var(--font-heading); font-size:clamp(20px,2.5vw,30px); color:var(--gold); letter-spacing:6px; margin-bottom:24px;">ἈΠΟΛΟΓΊΑ</p>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px); color:var(--text-light); opacity:0.8;">苏格拉底 &middot; 致雅典公民法庭</p>
    <p class="anim-in small" style="color:rgba(240,234,214,0.5); margin-top:12px;">公元前399年 &middot; 我生命的第七十个年头</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 2 — 开场
     ============================================================ -->
<div class="slide slide--light" data-notes="我的开场策略是以退为进。声称自己不善言辞，实际上是在建立信任。对比控告者的花言巧语和我的朴素真话，让陪审团放下戒心。这是我七十年来第一次踏进法庭——这本身就说明了我从未违法。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">I &middot; 开场</div>
    <!-- Owl SVG -->
    <div class="anim-in" style="margin-bottom:12px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="26" r="18" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="23" cy="23" r="5" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <circle cx="37" cy="23" r="5" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <circle cx="23" cy="23" r="2" fill="#c5a55a"/>
        <circle cx="37" cy="23" r="2" fill="#c5a55a"/>
        <path d="M27 30 L30 34 L33 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M20 12 L23 18 M40 12 L37 18" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M22 40 L22 50 M30 42 L30 52 M38 40 L38 50" stroke="#6b7c3e" stroke-width="1"/>
      </svg>
    </div>
    <h2 class="anim-in">雅典的公民们</h2>
    <div class="scroll-quote anim-in">
      <p>"我不知道你们是否被我的控告者说动了。但我要告诉你们——他们几乎没说过一句真话。"</p>
    </div>
    <p class="anim-in">"他们说你们要当心被我的'雄辩'所欺骗。这是他们最无耻的说法——除非他们所说的雄辩是指真理的力量。"</p>
    <p class="anim-in">"我已经七十岁了，这是我第一次上法庭。请像对待一个外邦人一样包容我的说话方式。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">我的策略</strong> —— 用"不会说话"来赢得你们的信任</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 3 — 两种敌人
     ============================================================ -->
<div class="slide slide--light" data-notes="我面对的是两波敌人：一波是多年以来散布谣言的人，尤其是阿里斯托芬的喜剧；另一波是今天站在法庭上的三个人。前者比后者更可怕，因为谣言已经渗透了你们的童年记忆。我无法传唤影子来对峙。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">II &middot; 两种敌人</div>
    <h2 class="anim-in">我必须对抗两种力量</h2>
    <div class="two-col anim-in">
      <div class="card">
        <!-- Pillar SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="24" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <rect x="10" y="12" width="20" height="38" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <line x1="14" y1="12" x2="14" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <line x1="20" y1="12" x2="20" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <line x1="26" y1="12" x2="26" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <rect x="8" y="50" width="24" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <rect x="6" y="4" width="28" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
          </svg>
        </div>
        <h3 class="terracotta">看不见的敌人</h3>
        <p>"多年来，有些人一直在散布关于我的谣言。阿里斯托芬在《云》里把我演成一个'在空中行走'的怪人。这些流言从你们还是孩子的时候就开始影响你们了。"</p>
        <p class="secondary italic">"我没法传唤这些人——我只能与影子搏斗。"</p>
      </div>
      <div class="card">
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="24" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <rect x="10" y="12" width="20" height="38" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <line x1="14" y1="12" x2="14" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <line x1="20" y1="12" x2="20" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <line x1="26" y1="12" x2="26" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <rect x="8" y="50" width="24" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <rect x="6" y="4" width="28" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
          </svg>
        </div>
        <h3 class="olive-text">今天的控告者</h3>
        <p>"美勒托斯代表诗人，安尼托斯代表工匠和政客，莱孔代表修辞家——我得罪了所有人。"</p>
      </div>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 4 — 我不是什么人
     ============================================================ -->
<div class="slide slide--light" data-notes="我需要先澄清身份。我不是自然哲学家，不是智者学派。卡利亚斯的故事很有趣——他花大价钱请智者来教他的儿子，可我连一个铜板都没收过。我的贫穷就是最好的证据。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">III &middot; 自我澄清</div>
    <h2 class="anim-in">我不是什么人</h2>
    <!-- Horse SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q30 30, 50 25 Q60 23, 65 28 L70 22 L75 18 L73 25 L68 30 Q72 35, 70 45 L75 60 L72 62 L68 48 L60 60 L57 62 L55 48 L45 58 L42 60 L44 46 L35 58 L32 60 L36 45 Q28 50, 25 55Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="1.5" fill="#c5a55a"/>
        <path d="M75 18 Q80 14, 78 10 M75 18 Q82 16, 84 12" stroke="#c5a55a" stroke-width="1" fill="none"/>
      </svg>
    </div>
    <p class="anim-in">"他们说我研究天上地下的事物——那是阿那克萨哥拉的学说，不是我的。他们说我像智者学派一样收费教学——<strong>我从未收过一个铜板。</strong>"</p>
    <div class="scroll-quote anim-in">
      <p><strong class="gold">卡利亚斯的故事：</strong>"雅典首富卡利亚斯在智者身上花了大量金钱。我问他：如果你的儿子是马驹，你会请驯马师；他们是人，你请谁来教？他说帕罗斯岛的伊温诺斯，收费5弥那。"</p>
    </div>
    <p class="anim-in italic secondary">"如果我也有那种智慧，我一定会非常骄傲。但事实是——我没有。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 5 — 神谕
     ============================================================ -->
<div class="slide slide--dark" data-notes="凯瑞丰是我童年的朋友，性格急躁冲动。他跑去德尔斐问了那个改变我一生的问题。神谕说没有人比我更有智慧——这让我困惑不已。我知道自己无知，但神不会说谎。于是我踏上了验证神谕的旅程，这个旅程最终把我推向了法庭。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">IV &middot; 德尔斐神谕</div>
    <!-- Temple SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,10 170,50 30,50" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="80" y1="50" x2="80" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="120" y1="50" x2="120" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="150" y1="50" x2="150" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <rect x="30" y="120" width="140" height="6" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <rect x="25" y="126" width="150" height="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="40" y="46" width="120" height="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Flame -->
        <ellipse cx="100" cy="90" rx="6" ry="12" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <ellipse cx="100" cy="86" rx="3" ry="6" fill="#c5a55a" opacity="0.3"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">神 谕</h2>
    <div class="scroll-quote anim-in">
      <p>"我的童年好友凯瑞丰——你们都认识他，那个性子急躁的人——他跑去德尔斐神庙，问女祭司：<strong>'有没有人比苏格拉底更有智慧？'</strong>"</p>
      <p>"神谕的回答是：<strong style="color:var(--terracotta);">没有。</strong>"</p>
    </div>
    <p class="anim-in">"我听到这个消息时困惑极了。我知道自己一无所知——但神不会说谎。所以我决定用一个方法来检验：<strong>找到一个比我更有智慧的人，去反驳神谕。</strong>"</p>
    <p class="anim-in big-quote" style="font-size:clamp(20px,2.2vw,28px);">"这个决定改变了我的一生。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 6 — 审问政客
     ============================================================ -->
<div class="slide slide--light" data-notes="我去找的第一个人是一位声名显赫的政客。谈话之后我发现他其实不懂装懂。当我试着指出这一点时，他恨上了我。但我从中悟到了一个关键的道理——无知本身不可怕，可怕的是不自知的无知。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">V &middot; 审问政客</div>
    <!-- Scales of Justice SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="8" x2="30" y2="52" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="10" y1="18" x2="50" y2="18" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M6 32 L10 18 L14 32" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M4 32 Q10 38, 16 32" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M46 28 L50 18 L54 28" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M44 28 Q50 34, 56 28" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="24" y="52" width="12" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <circle cx="30" cy="8" r="3" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
      </svg>
    </div>
    <h2 class="anim-in">审问政客</h2>
    <p class="anim-in">"我首先去找了一位以智慧闻名的政客。交谈之后我发现——他并非真正有智慧，尽管很多人这么认为，他自己也深信不疑。"</p>
    <p class="anim-in">"我试图向他解释这一点。结果？<strong class="terracotta">他恨我了</strong>，在场的人也跟着恨我。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">关键领悟：</strong>"我离开时心想：我们都不知道什么真正美好的事物。但我比他强一点——因为<strong>他不知道却自以为知道；而我不知道，也不自以为知道。</strong>就这一点微小的差别，我似乎比他有智慧。"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 7 — 审问诗人与工匠
     ============================================================ -->
<div class="slide slide--light" data-notes="诗人靠灵感写作，就像占卜者说出美妙的话却不理解含义。工匠确实有真才实学，但他们的问题和诗人一样：因为精通一个领域，就以为自己在所有领域都是专家。我的调查越深入，得罪的人就越多。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">VI &middot; 审问诗人与工匠</div>
    <h2 class="anim-in">继续验证</h2>
    <div class="two-col anim-in">
      <div class="card">
        <!-- Lyre SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 50 L15 20 Q15 8, 25 5 Q35 8, 35 20 L35 50" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
            <line x1="15" y1="50" x2="35" y2="50" stroke="#c5a55a" stroke-width="2"/>
            <line x1="20" y1="15" x2="20" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="25" y1="12" x2="25" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="30" y1="15" x2="30" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="15" y1="20" x2="35" y2="20" stroke="#c5a55a" stroke-width="1"/>
          </svg>
        </div>
        <h3 class="gold">诗 人</h3>
        <p>"我拿他们最得意的作品来问他们是什么意思。结果在座的任何人都比他们自己更能解释。诗人写诗靠的是灵感，不是智慧——他们就像占卜者，说出美妙的话却不理解其含义。"</p>
        <p class="secondary italic">"更糟的是，他们因为会写诗，就以为自己什么都懂。"</p>
      </div>
      <div class="card">
        <!-- Hammer/Anvil SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="42" width="26" height="8" rx="2" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="8" y="50" width="34" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="20" y="18" width="10" height="24" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="14" y="10" width="22" height="10" rx="2" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
          </svg>
        </div>
        <h3 class="olive-text">工 匠</h3>
        <p>"工匠确实知道很多我不知道的东西——这一点我承认。但他们的毛病和诗人一样：因为精通手艺，就以为自己在所有高深问题上都是专家。"</p>
      </div>
    </div>
    <div class="scroll-quote anim-in" style="margin-top:12px;">
      <p>"我问自己：我宁愿像现在这样一无所知但自知，还是像他们那样有些知识但盲目自大？答案是：<strong>保持现状。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 8 — 神谕的真相
     ============================================================ -->
<div class="slide slide--dark" data-notes="经过对政客、诗人、工匠的审问，我终于理解了神谕的含义。神不是在赞美我的智慧，而是用我的名字做一个例证：真正的智慧属于神，人类的智慧微不足道。我唯一的优势是知道自己无知。为了完成神赋予我的使命，我放弃了一切，活在赤贫之中。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">VII &middot; 神谕的真相</div>
    <!-- Large Owl SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="70" rx="40" ry="45" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <circle cx="65" cy="60" r="12" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="95" cy="60" r="12" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="65" cy="60" r="5" fill="#c5a55a" opacity="0.4"/>
        <circle cx="95" cy="60" r="5" fill="#c5a55a" opacity="0.4"/>
        <circle cx="65" cy="60" r="2.5" fill="#c5a55a"/>
        <circle cx="95" cy="60" r="2.5" fill="#c5a55a"/>
        <path d="M75 75 L80 82 L85 75" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <path d="M55 35 L62 48 M105 35 L98 48" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 90 Q45 100, 50 108 L55 105 Q52 98, 55 90" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <path d="M110 90 Q115 100, 110 108 L105 105 Q108 98, 105 90" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <path d="M65 112 L65 130 M75 115 L75 135 M85 115 L85 135 M95 112 L95 130" stroke="#c5a55a" stroke-width="1.2"/>
        <!-- Olive branch around owl -->
        <path d="M30 130 Q50 110, 80 140 Q110 110, 130 130" fill="none" stroke="#6b7c3e" stroke-width="1" opacity="0.5"/>
      </svg>
    </div>
    <div class="big-quote anim-in">"只有神是真正有智慧的。人类的智慧微不足道。"</div>
    <div class="scroll-quote anim-in" style="max-width:800px; margin:16px auto;">
      <p>"神谕的意思是：最有智慧的人，是像我苏格拉底这样，知道自己的智慧实际上毫无价值的人。"</p>
    </div>
    <div class="card-grid card-grid--3 anim-in" style="max-width:800px; margin:16px auto;">
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">①</p>
        <p>神不是在赞美我<br>而是用我做一个例证</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">②</p>
        <p>真正的智慧<br>只属于神</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">③</p>
        <p>我的"优势"仅仅在于<br><strong>我知道自己无知</strong></p>
      </div>
    </div>
    <p class="anim-in secondary" style="margin-top:12px;">"为了服务于神的这个使命，我放弃了一切世俗事务，生活在赤贫之中。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 9 — 为什么你们恨我
     ============================================================ -->
<div class="slide slide--light" data-notes="每次揭穿一个人，我就多一个敌人。更糟糕的是，雅典的年轻人开始模仿我——那些富家子弟闲着没事，跟在我后面看我审问人，然后他们自己也去审问别人。这让被审问的人更加恼火，于是他们把矛头指向我。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">VIII &middot; 仇恨的根源</div>
    <!-- Angry crowd SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#c06030" stroke-width="1.2" fill="none">
          <circle cx="20" cy="12" r="6"/><line x1="20" y1="18" x2="20" y2="35"/><line x1="20" y1="35" x2="15" y2="48"/><line x1="20" y1="35" x2="25" y2="48"/><line x1="20" y1="24" x2="12" y2="30"/><line x1="20" y1="24" x2="28" y2="20"/>
          <circle cx="45" cy="10" r="6"/><line x1="45" y1="16" x2="45" y2="33"/><line x1="45" y1="33" x2="40" y2="48"/><line x1="45" y1="33" x2="50" y2="48"/><line x1="45" y1="22" x2="37" y2="18"/><line x1="45" y1="22" x2="53" y2="28"/>
          <circle cx="70" cy="12" r="6"/><line x1="70" y1="18" x2="70" y2="35"/><line x1="70" y1="35" x2="65" y2="48"/><line x1="70" y1="35" x2="75" y2="48"/><line x1="70" y1="24" x2="62" y2="20"/><line x1="70" y1="24" x2="78" y2="28"/>
          <circle cx="95" cy="10" r="6"/><line x1="95" y1="16" x2="95" y2="33"/><line x1="95" y1="33" x2="90" y2="48"/><line x1="95" y1="33" x2="100" y2="48"/><line x1="95" y1="22" x2="87" y2="28"/><line x1="95" y1="22" x2="103" y2="18"/>
        </g>
      </svg>
    </div>
    <h2 class="anim-in">为什么你们恨我</h2>
    <p class="anim-in">"每次我揭穿一个人的虚假智慧，他就会感到羞辱，然后把怒气撒在我身上。他们大喊：<strong class="terracotta">'这个该死的苏格拉底，青年的败坏者！'</strong>被问到我到底教了什么坏东西，他们答不上来。"</p>
    <p class="anim-in">"更让他们恼火的是——你们的孩子开始模仿我。那些富家子弟没事可做，跟在我后面，看我审问那些自命不凡的人，觉得很有趣。然后他们也开始去审问别人。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">"这就是为什么今天有三个人站在那里控告我。"</strong></p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 10 — 法庭交锋：驯马师
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是我反击美勒托斯的第一个回合。我用驯马师类比来证明他的指控荒谬——不可能全雅典都在改善青年，唯独我一人在腐蚀。就像马一样，改善需要专业知识，多数人只会造成伤害。而且如果我真的腐蚀了身边的人，他们反过来会伤害我——我又不是傻子。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">IX &middot; 法庭交锋</div>
    <!-- Horse SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q30 30, 50 25 Q60 23, 65 28 L70 22 L75 18 L73 25 L68 30 Q72 35, 70 45 L75 60 L72 62 L68 48 L60 60 L57 62 L55 48 L45 58 L42 60 L44 46 L35 58 L32 60 L36 45 Q28 50, 25 55Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="1.5" fill="#c5a55a"/>
        <path d="M75 18 Q80 14, 78 10 M75 18 Q82 16, 84 12" stroke="#c5a55a" stroke-width="1" fill="none"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">驯马师类比</h2>
    <p class="anim-in">"让我来当面质问美勒托斯。"</p>
    <ol class="logic-chain anim-in">
      <li>我问：如果我是腐蚀者，<strong>谁是改善者？</strong></li>
      <li>美勒托斯答：法律、法官、元老、全体公民——<strong>整个雅典都在改善青年，只有我在腐蚀！</strong></li>
      <li>我的反击：对于马，是一个驯马师能让它变好，还是所有人都能？</li>
      <li>答案：<strong>少数专家</strong>能改善，多数人反而会伤害。</li>
      <li>结论：认为一个人腐蚀而所有人改善——<strong class="terracotta">这完全是胡说八道。</strong></li>
    </ol>
    <p class="anim-in secondary italic" style="margin-top:12px;">"而且，如果我真的腐蚀了身边的人，他们会反过来伤害我——我为什么要做对自己不利的事？"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 11 — 法庭交锋：逻辑陷阱
     ============================================================ -->
<div class="slide slide--dark" data-notes="第二回合更精彩。美勒托斯一方面说我是无神论者，另一方面控告书又说我信奉神灵之事。这是一个明显的自相矛盾。我用了骡子的比喻——这就像承认骡子存在却否认马和驴的存在。这个逻辑陷阱让美勒托斯当场哑口无言。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">X &middot; 逻辑陷阱</div>
    <!-- Net/Trap SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 L40 50 L70 10" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="10" y1="10" x2="70" y2="10" stroke="#c5a55a" stroke-width="2"/>
        <line x1="18" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="26" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="34" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="46" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="54" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="62" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="15" y1="20" x2="65" y2="20" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="22" y1="30" x2="58" y2="30" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="30" y1="40" x2="50" y2="40" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">自相矛盾</h2>
    <p class="anim-in">"美勒托斯说我是'彻底的无神论者'，说我认为太阳是石头、月亮是泥土。美勒托斯，你搞错了——那是阿那克萨哥拉的学说，在剧场花一个德拉克马就能听到。"</p>
    <div class="card anim-in" style="margin:12px 0;">
      <p style="text-align:center; margin-bottom:8px;"><strong class="gold">逻辑推导链：</strong></p>
      <p style="text-align:center;">控告书说我"信奉神灵之事" <span class="gold">&rarr;</span> 能信神灵之事而不信精灵吗？<span class="gold">&rarr;</span> <strong>不能</strong> <span class="gold">&rarr;</span> 精灵是神或神的后代 <span class="gold">&rarr;</span> 因此你说我不信神，又说我信神 <span class="gold">&rarr;</span> <strong class="terracotta">自相矛盾！</strong></p>
    </div>
    <div class="scroll-quote anim-in">
      <p>"这就像说：<strong>承认骡子存在，却否认马和驴的存在。</strong>美勒托斯，你写这份控告书，只是因为你找不到真正的罪名来指控我。"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 12 — 牛虻
     ============================================================ -->
<div class="slide slide--light" data-notes="牛虻的比喻是整篇申辩中最著名的段落之一。我把自己比作一只被神赐给雅典的牛虻，把雅典比作一匹高贵但懒惰的大马。我整天叮咬这匹马，让它保持清醒。如果你们拍死我，你们可以继续沉睡——除非神再派来一只。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XI &middot; 牛虻</div>
    <!-- Gadfly SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(80,60)">
          <!-- Body -->
          <ellipse cx="0" cy="0" rx="18" ry="10" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="22" cy="-2" rx="8" ry="6" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Head -->
          <circle cx="32" cy="-4" r="5" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <line x1="37" y1="-6" x2="42" y2="-12" stroke="#c5a55a" stroke-width="1"/>
          <line x1="36" y1="-8" x2="40" y2="-16" stroke="#c5a55a" stroke-width="1"/>
          <!-- Stinger -->
          <line x1="37" y1="-2" x2="44" y2="0" stroke="#c06030" stroke-width="1.5"/>
          <!-- Wings -->
          <ellipse cx="-5" cy="-18" rx="20" ry="10" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.6" transform="rotate(-15)"/>
          <ellipse cx="5" cy="-20" rx="18" ry="8" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.6" transform="rotate(10)"/>
          <!-- Legs -->
          <line x1="-10" y1="8" x2="-18" y2="20" stroke="#c5a55a" stroke-width="1"/>
          <line x1="-2" y1="9" x2="-6" y2="22" stroke="#c5a55a" stroke-width="1"/>
          <line x1="8" y1="8" x2="6" y2="22" stroke="#c5a55a" stroke-width="1"/>
          <line x1="16" y1="5" x2="18" y2="18" stroke="#c5a55a" stroke-width="1"/>
          <!-- Eye -->
          <circle cx="34" cy="-5" r="1.5" fill="#c5a55a"/>
        </g>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">我就是那只牛虻</h2>
    <div class="scroll-quote anim-in">
      <p>"如果你们杀了我，你们不容易找到我的继任者。请允许我用一个滑稽的比喻——<strong>我就像一只牛虻，被神赐给了这个城邦。而雅典就像一匹高贵的骏马，因为体型庞大而行动迟缓。</strong>我就是整天叮在你们身上的那只牛虻，唤醒你们、说服你们、责备你们。"</p>
    </div>
    <p class="anim-in">"你们可以一巴掌拍死我，然后在余生中继续沉睡。除非神再派来另一只牛虻。"</p>
    <p class="anim-in secondary italic">"如果你们不信我是神派来的，看看我的贫穷就知道了——有谁会为了自讨苦吃而放弃一切？"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 13 — 我的两次抗命
     ============================================================ -->
<div class="slide slide--light" data-notes="这两个故事证明我不是空谈正义，而是真正用生命去实践。在民主制度下，我拒绝违法的集体审判；在暴政之下，我拒绝逮捕无辜者。两次我都差点丧命。无论政体如何变化，我只服从一个主人——正义。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XII &middot; 两次抗命</div>
    <!-- Shield SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 5 L45 15 L45 35 Q45 50, 25 58 Q5 50, 5 35 L5 15 Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M25 12 L38 19 L38 34 Q38 45, 25 51 Q12 45, 12 34 L12 19 Z" fill="none" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
        <line x1="25" y1="20" x2="25" y2="45" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
        <line x1="15" y1="30" x2="35" y2="30" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
      </svg>
    </div>
    <h2 class="anim-in">我用生命实践正义</h2>
    <div class="two-col anim-in">
      <div class="card">
        <h3 class="olive-text">民主下的不义（公元前406年）</h3>
        <p>"阿吉纽西海战后，你们要集体审判十位将军——这违反法律。我当时恰好是执政团成员，<strong>我是唯一一个投反对票的人。</strong>你们威胁要逮捕我。但我宁可冒生命危险，也不参与违法行为。"</p>
      </div>
      <div class="card">
        <h3 class="terracotta">暴政下的不义（公元前404年）</h3>
        <p>"三十僭主命令我和另外四人去逮捕萨拉米斯的莱昂处死。其他四个人去了。而我——<strong>悄悄回了家。</strong>如果僭主没有很快倒台，我现在就不会站在这里了。"</p>
      </div>
    </div>
    <div class="insight-card anim-in" style="text-align:center; margin-top:12px;">
      <p style="margin:0; font-size:clamp(16px,1.6vw,20px);"><strong class="gold">"无论是民主还是暴政，我只服从一个主人——正义。"</strong></p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 14 — 我不会求饶
     ============================================================ -->
<div class="slide slide--light" data-notes="这是古希腊法庭上常见的做法——被告把妻儿带上来哭泣求情。但我拒绝这样做。我有三个儿子，一个快成年了，两个还小。但我认为用同情来影响判决既有损我的尊严，也是在逼法官违背誓言。当我因为'不虔诚'受审时，我怎能做出不虔诚的事？">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XIII &middot; 尊严</div>
    <!-- Dignified figure SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="14" r="8" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 22 L30 50" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 30 L15 42" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 30 L45 42" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 50 L20 72" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 50 L40 72" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Robe -->
        <path d="M22 28 Q18 40, 15 55 Q25 52, 30 50 Q35 52, 45 55 Q42 40, 38 28" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.5"/>
      </svg>
    </div>
    <h2 class="anim-in">我不会求饶</h2>
    <p class="anim-in">"我有三个儿子——一个快成年了，两个还年幼。但我不会把他们带上来哭哭啼啼地求你们开恩。"</p>
    <div class="card-grid card-grid--3 anim-in">
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">①</p>
        <p>"到了我这个年纪，做那种事太丢人了"</p>
      </div>
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">②</p>
        <p>"那会让雅典在外邦人面前显得可笑"</p>
      </div>
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">③</p>
        <p>"你们宣誓是依法审判，不是施舍同情。如果我求你们法外开恩，那不就是在逼你们违背誓言吗？"</p>
      </div>
    </div>
    <div class="scroll-quote anim-in" style="margin-top:12px;">
      <p>"当我自己正因'不虔诚'受审时，我怎能做出如此不虔诚的事？<strong>我把命运交给你们和神。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 15 — VERDICT
     ============================================================ -->
<div class="slide slide--dark" data-notes="五百零一位陪审员投票。有罪票仅比无罪票多出约三十票——也就是说如果有十五六个人改变想法，我就获释了。这个微小的差距说明控告的理由并不充分。如果没有安尼托斯和莱孔的参与，美勒托斯连五分之一的票都拿不到——那样他自己反而要被罚款。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Scales SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--md" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="5" x2="40" y2="50" stroke="#c5a55a" stroke-width="2"/>
        <line x1="10" y1="15" x2="70" y2="15" stroke="#c5a55a" stroke-width="2"/>
        <path d="M4 30 L10 15 L16 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M2 30 Q10 38, 18 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M64 25 L70 15 L76 25" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M62 25 Q70 32, 78 25" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="32" y="50" width="16" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="40" cy="5" r="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
      </svg>
    </div>
    <div class="verdict anim-in">判决：有罪</div>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px);">"仅以约30票之差。如果安尼托斯和莱孔没有参与，美勒托斯连五分之一的票都拿不到。"</p>
    <div class="part-label anim-in" style="margin-top:24px;">P A R T &nbsp; I I &nbsp; &mdash; &nbsp; 量 刑</div>
  </div>
</div>

<!-- ============================================================
     SLIDE 16 — 我该受什么"罚"？
     ============================================================ -->
<div class="slide slide--light" data-notes="按雅典法律，被判有罪后被告可以提出量刑建议。我的建议令法庭震惊——我说我应该在普里塔尼厄姆免费用餐，就像奥林匹亚冠军一样。这不是傲慢，而是我真诚地认为自己是雅典的恩人。然后我逐一排除了其他可能的刑罚。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XIV &middot; 量刑建议</div>
    <!-- Olive Wreath SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 70 C20 65, 8 45, 10 25" stroke="#6b7c3e" stroke-width="1.5" fill="none"/>
        <path d="M40 70 C60 65, 72 45, 70 25" stroke="#6b7c3e" stroke-width="1.5" fill="none"/>
        <ellipse cx="14" cy="50" rx="8" ry="4" transform="rotate(-25 14 50)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="11" cy="38" rx="8" ry="4" transform="rotate(-45 11 38)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="14" cy="28" rx="7" ry="3.5" transform="rotate(-65 14 28)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="66" cy="50" rx="8" ry="4" transform="rotate(25 66 50)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="69" cy="38" rx="8" ry="4" transform="rotate(45 69 38)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="66" cy="28" rx="7" ry="3.5" transform="rotate(65 66 28)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="22" cy="20" rx="7" ry="3.5" transform="rotate(-80 22 20)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="58" cy="20" rx="7" ry="3.5" transform="rotate(80 58 20)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="32" cy="14" rx="7" ry="3.5" transform="rotate(10 32 14)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="48" cy="14" rx="7" ry="3.5" transform="rotate(-10 48 14)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
      </svg>
    </div>
    <h2 class="anim-in">我该受什么"罚"？</h2>
    <p class="anim-in">"按规矩，现在我要提出一个量刑建议。好吧，让我想想——一个穷人，是你们的恩人，需要闲暇来教导你们，他该得到什么？"</p>
    <div class="scroll-quote anim-in">
      <p>"答案很简单：<strong>在普里塔尼厄姆免费用餐</strong>——就像奥林匹亚冠军一样。而且我比他们更有资格，因为奥林匹亚冠军只给你们幸福的表象，而我给你们<strong class="gold">真实的幸福。</strong>"</p>
    </div>
    <div class="card-grid card-grid--4 anim-in">
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">死刑</p>
        <p class="small">"我不知道死是好是坏"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">监禁</p>
        <p class="small">"给官吏当奴隶？"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">流放</p>
        <p class="small">"到哪里年轻人都会跟着我"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">沉默</p>
        <p class="small">"那是对神的违抗"</p>
      </div>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 17 — 未经审视的人生
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是整篇申辩中最著名的一句话——未经审视的人生不值得过。这不是一句空洞的格言，而是我用一生来实践的信念。审视自己和他人，谈论美德——这是人最大的善。最终我的朋友们替我凑了三十弥那作为罚金，但法庭不接受。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">XV &middot; 最著名的话</div>
    <!-- Lantern SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--md" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 15 Q25 5, 30 3 Q35 5, 35 15" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="20" y="15" width="20" height="35" rx="3" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="20" y1="22" x2="40" y2="22" stroke="#c5a55a" stroke-width="0.8" opacity="0.5"/>
        <line x1="20" y1="43" x2="40" y2="43" stroke="#c5a55a" stroke-width="0.8" opacity="0.5"/>
        <ellipse cx="30" cy="32" rx="4" ry="6" fill="#c5a55a" opacity="0.3"/>
        <ellipse cx="30" cy="30" rx="2" ry="3" fill="#c5a55a" opacity="0.6"/>
        <rect x="22" y="50" width="16" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <line x1="30" y1="53" x2="30" y2="60" stroke="#c5a55a" stroke-width="1.2"/>
        <rect x="25" y="60" width="10" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
      </svg>
    </div>
    <div class="big-quote anim-in" style="margin:20px 0;">"未经审视的人生不值得过"</div>
    <p class="anim-in" style="font-family:var(--font-heading); color:rgba(240,234,214,0.5); font-style:italic; font-size:clamp(14px,1.4vw,18px);">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</p>
    <div class="scroll-quote anim-in" style="max-width:800px; margin:20px auto;">
      <p>"每天谈论美德，审视自己和他人——这是人最大的善。你们让我闭嘴？那不可能。"</p>
    </div>
    <p class="anim-in secondary">"最终，我的朋友们——柏拉图、克里托、克里托布鲁斯、阿波罗多洛斯——替我凑了<strong>30弥那</strong>作为罚金。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 18 — SENTENCE
     ============================================================ -->
<div class="slide slide--dark" data-notes="法庭拒绝了罚金方案，判处死刑。据说第二次投票中，判死刑的票数比第一次判有罪的票数还多——可能是因为我的'免费用餐'建议激怒了更多陪审员。但我不后悔。宁可坦然面对死亡，也不愿卑躬屈膝。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Hemlock Cup SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 40 Q35 90, 60 95 Q85 90, 85 40" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="30" y1="40" x2="90" y2="40" stroke="#c5a55a" stroke-width="2"/>
        <ellipse cx="60" cy="40" rx="30" ry="6" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M60 95 L60 105" stroke="#c5a55a" stroke-width="2"/>
        <ellipse cx="60" cy="108" rx="15" ry="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Liquid -->
        <path d="M42 60 Q42 85, 60 88 Q78 85, 78 60" fill="#c5a55a" opacity="0.15"/>
        <ellipse cx="60" cy="60" rx="22" ry="4" fill="#c5a55a" opacity="0.2"/>
        <!-- Steam -->
        <path d="M50 32 Q48 25, 52 20" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M60 30 Q58 22, 62 16" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M70 32 Q68 25, 72 20" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
      </svg>
    </div>
    <div class="verdict anim-in">判决：死刑</div>
    <div class="part-label anim-in">P A R T &nbsp; I I I &nbsp; &mdash; &nbsp; 最 后 的 话</div>
  </div>
</div>

<!-- ============================================================
     SLIDE 19 — 致判我死刑的人
     ============================================================ -->
<div class="slide slide--light" data-notes="面对死刑判决，我没有沉默，而是对判我死刑的人说出了最后的警告。赛跑的比喻深刻而美丽——死亡追上了我，因为我老了跑得慢；但不义追上了你们，因为不义比死亡跑得更快。我还做出了预言：杀我不能堵住批评的嘴，只会招来更多更年轻的质问者。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XVI &middot; 致判我死刑的人</div>
    <!-- Pointing figure SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="10" r="6" fill="none" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="16" x2="15" y2="35" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="35" x2="10" y2="48" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="35" x2="20" y2="48" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="22" x2="50" y2="18" stroke="#c06030" stroke-width="1.5"/>
        <circle cx="52" cy="18" r="2" fill="#c06030"/>
      </svg>
    </div>
    <h2 class="anim-in">致判我死刑的人</h2>
    <div class="scroll-quote anim-in">
      <p>"<strong>我宁愿以我自己的方式说话而死，也不愿以你们的方式说话而活。</strong>"</p>
    </div>
    <div class="card anim-in" style="margin:12px 0;">
      <h3 class="gold">赛跑比喻</h3>
      <p>"逃避死亡并不难，难的是逃避不义——因为<strong class="terracotta">不义比死亡跑得更快。</strong>我年老体衰，较慢的跑者——死亡——追上了我。而你们年轻力壮，但较快的跑者——不义——已经追上了你们。"</p>
    </div>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">预言：</strong>"我即将死去，在这个时刻，人被赋予预言的能力：在我之后，会有更多、更年轻的控告者来质问你们。<strong>杀人不能堵住批评的嘴——改善自己才是唯一的出路。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 20 — 论死亡
     ============================================================ -->
<div class="slide slide--dark" data-notes="这段关于死亡的论述是整篇申辩中最动人的部分。我的神灵之声——那个从小伴随我的内心声音——今天全程沉默。它连小事都会阻止我，但今天一声不吭。这意味着发生在我身上的事是好的。然后我提出了死亡的两种可能，两种都不可怕。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XVII &middot; 论死亡</div>
    <!-- Fork in road SVG -->
    <div class="anim-in svg-center" style="margin-bottom:12px;">
      <svg class="svg-icon--md" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 65 L50 35" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 35 L20 8" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 35 L80 8" stroke="#c5a55a" stroke-width="2"/>
        <circle cx="50" cy="35" r="3" fill="#c5a55a"/>
        <!-- Left: moon (sleep) -->
        <path d="M14 8 Q8 2, 14 -2 Q22 4, 14 8Z" fill="none" stroke="#c5a55a" stroke-width="1.2" transform="translate(2,4)"/>
        <!-- Right: sun (afterlife) -->
        <circle cx="82" cy="8" r="5" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <line x1="82" y1="0" x2="82" y2="-3" stroke="#c5a55a" stroke-width="0.8"/><line x1="82" y1="16" x2="82" y2="19" stroke="#c5a55a" stroke-width="0.8"/>
        <line x1="74" y1="8" x2="71" y2="8" stroke="#c5a55a" stroke-width="0.8"/><line x1="90" y1="8" x2="93" y2="8" stroke="#c5a55a" stroke-width="0.8"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">两条路，都不可怕</h2>
    <p class="anim-in">"我的神灵之声今天全程沉默——从我出门，到上庭，到此刻。它连小事都会阻止我，但今天一声不吭。这说明什么？<strong>发生在我身上的事，是好的。</strong>"</p>
    <div class="two-col anim-in" style="margin-top:12px;">
      <div class="card">
        <h3 class="gold" style="text-align:center;">无梦之眠</h3>
        <p>"如果死亡是完全无意识的状态——选出你一生中连梦都没有的安睡之夜，即使波斯大王也找不出几个。如果永恒就是这样一个夜晚，<strong>那死亡真是赚到了。</strong>"</p>
      </div>
      <div class="card">
        <h3 class="gold" style="text-align:center;">灵魂的迁徙</h3>
        <p>"如果死后是前往另一个世界——我可以遇见弥诺斯、荷马、赫西俄德！与他们交谈、向他们提问——<strong>那该是多么无穷的喜悦！</strong>"</p>
      </div>
    </div>
    <p class="anim-in" style="text-align:center; margin-top:12px; color:var(--gold); font-style:italic;">"而且最重要的是——在那个世界，他们不会因为一个人提问就判他死刑。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 21 — 最后的话
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是苏格拉底最后的遗言。他请求雅典人善待他的儿子——如果他们偏离了美德的道路，请像他折磨雅典人一样折磨他们。最后那句'哪一个更好，只有神知道'是全篇的最后一句话，也是西方哲学史上最优雅的告别。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">XVIII &middot; 永别</div>
    <!-- Hemlock + Olive SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Cup -->
        <path d="M55 35 Q55 80, 80 85 Q105 80, 105 35" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="110" y2="35" stroke="#c5a55a" stroke-width="1.5"/>
        <ellipse cx="80" cy="35" rx="30" ry="5" fill="none" stroke="#c5a55a" stroke-width="1"/>
        <path d="M80 85 L80 95" stroke="#c5a55a" stroke-width="1.5"/>
        <ellipse cx="80" cy="98" rx="12" ry="3" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Olive branch draped over cup -->
        <path d="M40 30 Q60 20, 80 25 Q100 20, 120 30" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <ellipse cx="50" cy="26" rx="6" ry="3" transform="rotate(-15 50 26)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="65" cy="22" rx="6" ry="3" transform="rotate(-5 65 22)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="95" cy="22" rx="6" ry="3" transform="rotate(5 95 22)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="110" cy="26" rx="6" ry="3" transform="rotate(15 110 26)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <!-- Small olives -->
        <circle cx="57" cy="24" r="2" fill="#6b7c3e" opacity="0.4"/>
        <circle cx="103" cy="24" r="2" fill="#6b7c3e" opacity="0.4"/>
      </svg>
    </div>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px); max-width:700px; margin:0 auto 16px;">"要记住一件事：<strong>好人无论在生前还是死后，都不会遭受真正的恶。</strong>神不会忽视他。"</p>
    <p class="anim-in" style="font-size:clamp(15px,1.4vw,18px); max-width:700px; margin:0 auto 20px; opacity:0.85;">"我有一个最后的请求——等我的儿子长大了，如果他们更在乎金钱而非美德，如果他们假装很了不起其实一无是处——请像我折磨你们一样折磨他们。"</p>
    <div class="big-quote anim-in" style="font-size:clamp(22px,2.8vw,36px); max-width:800px; margin:16px auto;">"离别的时刻已经到来。我们各走各路——我去赴死，你们去生活。哪一个更好，只有神知道。"</div>
  </div>
</div>

</div><!-- /slides-container -->

<!-- ============================================================
   CONTROLS
   ============================================================ -->
<div class="controls">
  <button onclick="toggleAutoplay()" id="btnAutoplay" title="自动播放 (A)">&#9654; 自动</button>
  <button onclick="toggleNotes()" id="btnNotes" title="演讲者备注 (N)">备注</button>
  <button onclick="goFullscreen()" title="全屏 (F)">全屏</button>
</div>

<div class="slide-number" id="slideNumber">1 / 21</div>
<div class="progress-bar" id="progressBar"></div>
<div class="notes-panel" id="notesPanel"></div>

<script>
// ============================================================
// SLIDE ENGINE
// ============================================================
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;
let autoplayInterval = null;
let notesVisible = false;

function showSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    if (i === index) s.classList.add('active');
    else if (i < index) s.classList.add('prev');
  });
  currentSlide = index;
  document.getElementById('slideNumber').textContent = (index + 1) + ' / ' + totalSlides;
  document.getElementById('progressBar').style.width = ((index + 1) / totalSlides * 100) + '%';
  updateNotes();
}

function nextSlide() { showSlide(Math.min(currentSlide + 1, totalSlides - 1)); }
function prevSlide() { showSlide(Math.max(currentSlide - 1, 0)); }

function updateNotes() {
  const note = slides[currentSlide].getAttribute('data-notes') || '';
  document.getElementById('notesPanel').textContent = note;
}

function toggleNotes() {
  notesVisible = !notesVisible;
  document.getElementById('notesPanel').classList.toggle('visible', notesVisible);
  document.getElementById('btnNotes').classList.toggle('active', notesVisible);
}

function toggleAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    document.getElementById('btnAutoplay').classList.remove('active');
  } else {
    autoplayInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) nextSlide();
      else { clearInterval(autoplayInterval); autoplayInterval = null; document.getElementById('btnAutoplay').classList.remove('active'); }
    }, 8000);
    document.getElementById('btnAutoplay').classList.add('active');
  }
}

function goFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
  else if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
  else if (e.key === 'f' || e.key === 'F') goFullscreen();
  else if (e.key === 'n' || e.key === 'N') toggleNotes();
  else if (e.key === 'a' || e.key === 'A') toggleAutoplay();
  else if (e.key === 'Escape') {
    if (autoplayInterval) toggleAutoplay();
    if (notesVisible) toggleNotes();
  }
});

// Click navigation
document.addEventListener('click', (e) => {
  if (e.target.closest('.controls') || e.target.closest('.notes-panel')) return;
  const x = e.clientX / window.innerWidth;
  if (x > 0.5) nextSlide(); else prevSlide();
});

// Touch support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { if (dx < 0) nextSlide(); else prevSlide(); }
});

// Initialize
showSlide(0);
</script>

</body>
</html>

=== FILE: .claude/skills/presentation-skill/docs/index.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>苏格拉底申辩篇 — 5种风格PPT在线演示</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Noto Sans SC', sans-serif; background: #0f1f18; color: #f0ead6; min-height: 100vh; }
  .hero { text-align: center; padding: 80px 20px 40px; }
  .hero h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 16px; }
  .hero p { font-size: 1.1rem; opacity: 0.7; max-width: 600px; margin: 0 auto 32px; line-height: 1.8; }
  .badge { display: inline-block; background: #C44536; color: #fff; padding: 6px 16px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; }
  .grid { max-width: 1100px; margin: 0 auto; padding: 40px 20px 80px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; text-decoration: none; color: inherit; }
  .card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .card-preview { height: 200px; position: relative; overflow: hidden; }
  .card-preview iframe { width: 1920px; height: 1080px; border: none; transform: scale(0.18); transform-origin: 0 0; pointer-events: none; }
  .card-body { padding: 20px; }
  .card-body h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
  .card-body p { font-size: 0.9rem; opacity: 0.6; line-height: 1.6; }
  .card-tags { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
  .tag { padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; background: rgba(255,255,255,0.1); }
  .footer { text-align: center; padding: 40px 20px; opacity: 0.4; font-size: 0.85rem; }
  .footer a { color: #C44536; text-decoration: none; }
</style>
</head>
<body>
  <div class="hero">
    <h1>苏格拉底的申辩篇<br>5种风格 PPT 在线演示</h1>
    <p>点击任意卡片，即可在浏览器中播放完整幻灯片。支持键盘翻页、全屏演示、自动播放、演讲者备注和PDF导出。</p>
    <span class="badge">基于 awesome-design-md · 已开源</span>
  </div>
  <div class="grid">
    <a class="card" href="greek-academy.html" target="_blank">
      <div class="card-preview"><iframe src="greek-academy.html" loading="lazy"></iframe></div>
      <div class="card-body">
        <h3>🏛️ 古希腊学院风</h3>
        <p>大理石纹理、希腊回纹边框、月桂冠SVG、Playfair Display 衬线体</p>
        <div class="card-tags"><span class="tag">学术演讲</span><span class="tag">历史主题</span><span class="tag">21页</span></div>
      </div>
    </a>
    <a class="card" href="sunny-cards.html" target="_blank">
      <div class="card-preview"><iframe src="sunny-cards.html" loading="lazy"></iframe></div>
      <div class="card-body">
        <h3>☀️ 阳光明媚 · 卡片风</h3>
        <p>暖米色底、彩色圆角卡片、emoji图标装饰、Noto Sans SC</p>
        <div class="card-tags"><span class="tag">课堂分享</span><span class="tag">团队培训</span><span class="tag">21页</span></div>
      </div>
    </a>
    <a class="card" href="state-enterprise.html" target="_blank">
      <div class="card-preview"><iframe src="state-enterprise.html" loading="lazy"></iframe></div>
      <div class="card-body">
        <h3>🏢 国企汇报风</h3>
        <p>深红渐变、编号红圈面板、统计卡片、warning-box、正式严肃</p>
        <div class="card-tags"><span class="tag">述职报告</span><span class="tag">政府项目</span><span class="tag">21页</span></div>
      </div>
    </a>
    <a class="card" href="ted-talk.html" target="_blank">
      <div class="card-preview"><iframe src="ted-talk.html" loading="lazy"></iframe></div>
      <div class="card-body">
        <h3>🎤 TED 演讲风</h3>
        <p>黑底聚光灯、巨大冲击数字、一页一观点、戏剧性揭示</p>
        <div class="card-tags"><span class="tag">公开演讲</span><span class="tag">思想传播</span><span class="tag">21页</span></div>
      </div>
    </a>
    <a class="card" href="chinese-ink.html" target="_blank">
      <div class="card-preview"><iframe src="chinese-ink.html" loading="lazy"></iframe></div>
      <div class="card-body">
        <h3>🎨 水墨中国风</h3>
        <p>宣纸底、墨山水SVG、朱红印章、竖排文字、半文言语气</p>
        <div class="card-tags"><span class="tag">文化主题</span><span class="tag">国风场景</span><span class="tag">20页</span></div>
      </div>
    </a>
  </div>
  <div class="footer">
    <p>设计系统基于 <a href="https://github.com/VoltAgent/awesome-design-md" target="_blank">VoltAgent/awesome-design-md</a> · 由 <a href="https://github.com/OrangeViolin/01fish-assistant" target="_blank">01fish</a> 制作</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/presentation-skill/docs/state-enterprise.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>关于本人无罪的申辩报告 — 苏格拉底</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
/* ===== RESET & BASE ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; }
body {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f6f4f2;
  color: #1f1f1f;
  line-height: 1.78;
  font-weight: 400;
  font-size: 1.02rem;
  overflow: hidden;
}

/* ===== DESIGN TOKENS ===== */
:root {
  --accent: #900000;
  --accent2: #c00000;
  --soft-red: rgba(144, 0, 0, 0.08);
  --soft-gold: #efe7df;
  --text: #1f1f1f;
  --text2: #666666;
  --border: #d9d9d9;
  --page-bg: #f6f4f2;
  --slide-bg: #ffffff;
  --radius: 18px;
  --radius-sm: 14px;
  --radius-pill: 999px;
  --shadow: 0 16px 40px rgba(0,0,0,0.06);
}

/* ===== SLIDE ENGINE ===== */
.deck { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
.slide {
  position: absolute; top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: none; flex-direction: column;
  padding: 0;
  background: var(--page-bg);
}
.slide.active { display: flex; }
.slide-inner {
  width: min(1120px, 92vw);
  max-height: 88vh;
  margin: auto;
  background: var(--slide-bg);
  border: 1px solid var(--border);
  border-radius: 26px;
  box-shadow: var(--shadow);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2.4rem 3rem 2rem;
}
.slide-inner::-webkit-scrollbar { width: 4px; }
.slide-inner::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ===== TOP RULE ===== */
.top-rule {
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 26px 26px 0 0;
}

/* ===== SLIDE NUMBER ===== */
.slide-number {
  position: absolute; top: 18px; right: 28px;
  font-size: 0.82rem; font-weight: 500; color: var(--text2);
  z-index: 10;
}

/* ===== EYEBROW ===== */
.eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; font-weight: 700; color: var(--accent);
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 0.6rem;
}
.eyebrow::before {
  content: ''; display: inline-block;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
}

/* ===== HEADINGS ===== */
h1 { font-size: 3.2rem; font-weight: 900; line-height: 1.18; color: var(--text); margin-bottom: 0.5rem; }
h2 { font-size: 2.12rem; font-weight: 800; line-height: 1.28; color: var(--text); margin-bottom: 0.6rem; }
h3 { font-size: 1.05rem; font-weight: 700; color: var(--accent); margin-bottom: 0.4rem; }

/* ===== CLAIM BOX ===== */
.claim-box {
  border-left: 5px solid var(--accent);
  background: linear-gradient(135deg, var(--soft-red), rgba(144,0,0,0.02));
  padding: 1.2rem 1.5rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin: 1rem 0;
  font-size: 1.15rem; font-weight: 700; line-height: 1.7;
}
.claim-box .red { color: var(--accent); }

/* ===== CARD ===== */
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem 1.3rem;
  background: #fff;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
.card-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 0.6rem;
}
.card-index {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.82rem; font-weight: 700; flex-shrink: 0;
}

/* ===== TAG ===== */
.tag {
  display: inline-block;
  background: var(--soft-gold);
  color: var(--accent);
  font-size: 0.75rem; font-weight: 700;
  padding: 3px 12px;
  border-radius: var(--radius-pill);
}

/* ===== STAT ===== */
.stat {
  text-align: center; padding: 0.8rem 0.5rem;
}
.stat-number {
  font-size: 2.3rem; font-weight: 900; color: var(--accent);
  line-height: 1.2;
}
.stat-label {
  font-size: 0.82rem; color: var(--text2); font-weight: 500;
  margin-top: 2px;
}

/* ===== WARNING BOX ===== */
.warning-box {
  border-left: 5px solid var(--accent2);
  background: linear-gradient(135deg, rgba(192,0,0,0.06), rgba(192,0,0,0.01));
  padding: 1rem 1.3rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin: 1rem 0;
  font-size: 0.95rem;
}
.warning-box strong { color: var(--accent); }

/* ===== GRIDS ===== */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.8rem 0; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 0.8rem 0; }

/* ===== AGENDA ===== */
.agenda-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eee;
}
.agenda-item:last-child { border-bottom: none; }
.agenda-index {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}

/* ===== TWO COLUMN COMPARE ===== */
.compare-col {
  padding: 1rem 1.2rem;
  border-radius: var(--radius-sm);
}
.compare-col.red-side { border-left: 4px solid var(--accent); background: var(--soft-red); }
.compare-col.gray-side { border-left: 4px solid var(--border); background: #f9f9f9; }
.compare-col h3 { margin-bottom: 0.5rem; }
.compare-col ul { padding-left: 1.2rem; }
.compare-col li { margin-bottom: 0.4rem; font-size: 0.95rem; }

/* ===== FLOW DIAGRAM ===== */
.flow {
  display: flex; align-items: center; justify-content: center; gap: 0;
  margin: 1rem 0; flex-wrap: wrap;
}
.flow-step {
  background: var(--soft-red);
  color: var(--accent); font-weight: 700;
  padding: 0.6rem 1.2rem; border-radius: var(--radius-sm);
  font-size: 0.95rem;
}
.flow-arrow {
  font-size: 1.3rem; color: var(--accent); padding: 0 0.3rem;
}

/* ===== NUMBERED ARGUMENT ===== */
.arg-step {
  display: flex; gap: 12px; align-items: flex-start;
  margin-bottom: 0.6rem;
}
.arg-num {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;
}
.arg-text { font-size: 0.95rem; }

/* ===== COVER SPECIFICS ===== */
.cover-meta { display: flex; gap: 1rem; margin: 1rem 0; flex-wrap: wrap; }
.meta-card {
  flex: 1; min-width: 200px;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
}
.meta-card h3 { margin-bottom: 0.4rem; }
.cover-subtitle {
  font-size: 1.1rem; color: var(--text2); font-weight: 400;
  margin-bottom: 1rem;
}

/* ===== BIG QUOTE ===== */
.big-quote {
  font-size: 1.8rem; font-weight: 900; color: var(--accent);
  text-align: center; padding: 1.5rem 1rem;
  line-height: 1.5;
}
.big-quote .greek {
  display: block; font-size: 1rem; font-weight: 400; color: var(--text2);
  margin-top: 0.5rem;
}

/* ===== SUMMARY TABLE ===== */
.summary-table {
  width: 100%; border-collapse: collapse; margin: 0.8rem 0;
  font-size: 0.88rem;
}
.summary-table th {
  background: var(--accent); color: #fff; font-weight: 700;
  padding: 0.6rem 0.8rem; text-align: left;
}
.summary-table td {
  padding: 0.55rem 0.8rem; border-bottom: 1px solid #eee;
}
.summary-table tr:nth-child(even) td { background: #fafafa; }
.summary-table tr:hover td { background: var(--soft-red); }

/* ===== SPEAKER NOTES ===== */
.speaker-notes {
  display: none;
}
body.show-notes .speaker-notes {
  display: block;
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #1a1a1a; color: #eee;
  padding: 1rem 2rem; font-size: 0.88rem;
  max-height: 25vh; overflow-y: auto;
  z-index: 1000; line-height: 1.6;
  border-top: 3px solid var(--accent);
}

/* ===== VERDICT HIGHLIGHT ===== */
.verdict-box {
  background: var(--accent);
  color: #fff;
  text-align: center;
  padding: 2rem;
  border-radius: var(--radius);
  margin: 1rem 0;
}
.verdict-box .stat-number { color: #fff; font-size: 3rem; }
.verdict-box .stat-label { color: rgba(255,255,255,0.8); font-size: 1rem; }

/* ===== PROGRESS BAR ===== */
#progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: var(--accent); z-index: 9999;
  transition: width 0.3s;
}

/* ===== CONTROLS HINT ===== */
.controls-hint {
  position: fixed; bottom: 16px; right: 20px;
  font-size: 0.72rem; color: var(--text2);
  background: rgba(255,255,255,0.9);
  padding: 4px 12px; border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  z-index: 900;
}

/* ===== TRANSITION DIVIDER ===== */
.part-divider {
  text-align: center; padding: 1rem 0;
  border-top: 2px solid var(--border);
  margin-top: 1.2rem;
}
.part-divider span {
  display: inline-block;
  background: var(--soft-gold);
  color: var(--accent);
  font-weight: 700; font-size: 0.9rem;
  padding: 0.4rem 1.4rem;
  border-radius: var(--radius-pill);
}

/* ===== PRINT CSS ===== */
@media print {
  body { overflow: visible; background: #fff; }
  .deck { position: static; width: auto; height: auto; overflow: visible; }
  .slide {
    display: flex !important; position: static;
    width: 100%; height: auto; min-height: 0;
    page-break-after: always; page-break-inside: avoid;
    margin: 0; padding: 0;
  }
  .slide-inner {
    width: 100%; max-height: none; margin: 0;
    box-shadow: none; border: 1px solid #ddd;
    border-radius: 0; padding: 1.5rem 2rem;
    page-break-inside: avoid;
  }
  #progress, .controls-hint { display: none; }
  .speaker-notes { display: none !important; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 800px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  h1 { font-size: 2.2rem; }
  h2 { font-size: 1.5rem; }
  .slide-inner { padding: 1.5rem 1.2rem; }
  .big-quote { font-size: 1.3rem; }
  .flow { gap: 0.3rem; }
}
</style>
</head>
<body>

<div id="progress"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide active" data-notes="各位陪审员同志们，本人苏格拉底，今天就控方对本人提出的指控，做一次正式的申辩汇报。请各位耐心听完全部内容后再做判断。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">01 / 21</div>
  <div class="eyebrow">雅典人民法庭 · 公元前399年</div>
  <h1>关于本人无罪的<br>申辩报告</h1>
  <p class="cover-subtitle">汇报人：苏格拉底 &nbsp;|&nbsp; 陪审团：501名雅典公民</p>
  <div class="cover-meta">
    <div class="meta-card">
      <h3>指控事项</h3>
      <p style="font-size:0.92rem;">1. 腐蚀雅典青年<br>2. 不信城邦诸神<br>3. 引入新的神灵</p>
    </div>
    <div class="meta-card">
      <h3>汇报结构</h3>
      <div class="agenda-item"><div class="agenda-index">I</div><div><strong>辩护工作汇报</strong><br><span style="color:var(--text2);font-size:0.85rem;">案件背景、旧指控澄清、神谕调查、实地调查、仇恨成因、逐条反驳、社会功能定位、政治立场</span></div></div>
      <div class="agenda-item"><div class="agenda-index">II</div><div><strong>量刑意见</strong><br><span style="color:var(--text2);font-size:0.85rem;">量刑建议、核心价值主张</span></div></div>
      <div class="agenda-item"><div class="agenda-index">III</div><div><strong>总结陈词</strong><br><span style="color:var(--text2);font-size:0.85rem;">致控方警告、死亡分析、最后请求</span></div></div>
    </div>
  </div>
</div>
<div class="speaker-notes">各位陪审员同志们，本人苏格拉底，年七十，第一次站在法庭之上。今天就控方对本人提出的指控，做一次正式的、系统的申辩汇报。本人恳请各位耐心听完全部汇报内容后，再做最终判断。本人不善法庭辞令，只会用日常朴素的语言说话，请各位关注事实本身，而非言辞技巧。</div>
</div>

<!-- ==================== SLIDE 2: 案件背景 ==================== -->
<div class="slide" data-notes="首先介绍案件基本情况。本案表面是宗教指控，实质是对本人长期从事哲学审问工作的报复。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">02 / 21</div>
  <div class="eyebrow">一、案件背景</div>
  <h2>案件基本情况概述</h2>
  <div class="claim-box">本案控方三人代表三个利益群体，实质是对本人<span class="red">哲学工作的报复性诉讼</span></div>
  <div class="grid-3">
    <div class="card"><div class="stat"><div class="stat-number">70岁</div><div class="stat-label">被告年龄</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">501人</div><div class="stat-label">陪审团规模</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">0次</div><div class="stat-label">此前涉诉记录</div></div></div>
  </div>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">原告</div></div>
      <h3>迈勒图斯</h3>
      <p style="font-size:0.9rem;">代表<strong>诗人群体</strong>。本人曾指出诗人并不真正理解自己所写的内容，引起该群体强烈不满。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">支持者</div></div>
      <h3>安尼图斯</h3>
      <p style="font-size:0.9rem;">代表<strong>工匠与政客群体</strong>。本人揭示其所谓专业知识的局限性，触及其核心利益。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">支持者</div></div>
      <h3>吕孔</h3>
      <p style="font-size:0.9rem;">代表<strong>演说家群体</strong>。本人的审问方式动摇了修辞术的权威地位。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">首先请允许本人介绍案件基本情况。本人年已七十，平生第一次站在法庭上。控方三人——迈勒图斯、安尼图斯、吕孔——分别代表诗人、工匠政客和演说家三个群体。他们提出的宗教指控只是表面文章，真正的动机是对本人长年从事哲学审问工作的报复。本人此前从未涉及任何诉讼。</div>
</div>

<!-- ==================== SLIDE 3: 旧指控澄清 ==================== -->
<div class="slide" data-notes="在回应正式指控之前，必须先澄清长期流传的不实传言。这些传言比正式指控更加危险。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">03 / 21</div>
  <div class="eyebrow">二、旧指控澄清</div>
  <h2>关于长期不实指控的澄清</h2>
  <div class="grid-2">
    <div class="compare-col red-side">
      <h3>不实指控内容</h3>
      <ul>
        <li>"苏格拉底研究天上地下的事物"——此为<strong>阿那克萨哥拉</strong>的研究领域，与本人无关</li>
        <li>"苏格拉底收费教授学生"——此为<strong>智者学派</strong>（高尔吉亚、普罗迪库斯等）的做法，本人从未收取分文</li>
        <li>"苏格拉底能把弱论证变成强论证"——纯属虚构</li>
      </ul>
    </div>
    <div class="compare-col gray-side">
      <h3>实际情况</h3>
      <ul>
        <li>本人从未从事自然科学研究，也无此方面的专长</li>
        <li>本人从未收取任何教学费用，贫穷状态即为明证</li>
        <li>本人只是通过提问揭示对话者自身知识的不足，而非传授任何"技术"</li>
      </ul>
    </div>
  </div>
  <div class="warning-box">
    <strong>重要背景：</strong>上述不实指控源自阿里斯托芬喜剧<strong>《云》</strong>（公元前423年），已误导公众长达<strong>24年</strong>。这些匿名的"旧控告者"比今天在座的正式控方更加危险，因为陪审员诸位从小就听着这些说法长大，根深蒂固，难以辩驳。
  </div>
</div>
<div class="speaker-notes">在回应今天的正式指控之前，本人必须先处理一个更棘手的问题——长期以来在公众中流传的不实传言。阿里斯托芬在喜剧《云》中把本人塑造成一个研究天文、收费教学的人物，这完全是文学虚构。但这部戏上演了二十四年，在座诸位很多人从小就受其影响。这些匿名的旧控告者比今天的原告更为危险。</div>
</div>

<!-- ==================== SLIDE 4: 德尔斐神谕调查 ==================== -->
<div class="slide" data-notes="这是理解本人全部哲学工作的关键。凯瑞丰去德尔斐问神，神说没有人比我更有智慧。我花了大量时间调查此事。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">04 / 21</div>
  <div class="eyebrow">三、神谕调查</div>
  <h2>德尔斐神谕调查报告</h2>
  <p style="margin-bottom:0.8rem;color:var(--text2);">以下是本人哲学工作的起源，请各位务必了解：</p>
  <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>事件起因</strong>——本人好友凯瑞丰（已故，其兄弟可作证）前往德尔斐神庙，询问是否有人比苏格拉底更有智慧。</div></div>
  <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>神谕回答</strong>——皮提亚女祭司回答：<strong>没有人比苏格拉底更有智慧。</strong></div></div>
  <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>本人困惑</strong>——本人深知自己既无大智也无小智，神的回答令本人百思不得其解。但神不会说谎，其中必有深意。</div></div>
  <div class="arg-step"><div class="arg-num">4</div><div class="arg-text"><strong>启动调查</strong>——本人决定通过系统性走访各类"有智之人"，尝试找出一个确实比本人更有智慧的人，以此理解（或反证）神谕的含义。</div></div>
  <div class="arg-step"><div class="arg-num">5</div><div class="arg-text"><strong>调查持续多年</strong>——本人依次访问了政客、诗人、工匠三大群体，结果见下页。</div></div>
  <div class="claim-box">经调查，神谕的真正含义是：<span class="red">承认自己无知的人，比自以为有知的人更有智慧。</span>所谓"苏格拉底最智慧"，不过是因为本人是唯一知道自己不知道的人。</div>
</div>
<div class="speaker-notes">这是理解本人全部哲学工作的关键背景。本人好友凯瑞丰——一位热情的人——前往德尔斐神庙问神，是否有人比苏格拉底更有智慧。神回答说没有。我感到极为困惑，因为我自知一无所知。但神不可能说谎。于是我决定进行系统调查，试图找到一个确实比我更有智慧的人来反证神谕。</div>
</div>

<!-- ==================== SLIDE 5: 实地调查结果 ==================== -->
<div class="slide" data-notes="经过对三类人群的系统调查，本人发现所谓有智慧的人都存在同一个问题：在自己不懂的领域自以为懂。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">05 / 21</div>
  <div class="eyebrow">四、实地调查结果</div>
  <h2>三类人群调查结果报告</h2>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">01</div><div class="tag">调查对象</div></div>
      <h3>政客群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>声誉最高者实际上最缺乏智慧。他们自认为通晓一切，但经本人追问后暴露出对核心问题的无知。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>将政治声望误认为真正的知识</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">02</div><div class="tag">调查对象</div></div>
      <h3>诗人群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>诗人创作出优秀作品，但无法解释自己的创作。他们靠天赋与灵感，而非知识。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>因创作才能而自认为在其他领域也最有智慧</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">03</div><div class="tag">调查对象</div></div>
      <h3>工匠群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>工匠确实掌握本人不具备的技能，这一点本人充分肯定。但他们因此自认为在一切大事上都有见识。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>技术专长导致的跨领域自信膨胀</p>
    </div>
  </div>
  <div class="card" style="margin-top:1rem;background:var(--soft-red);">
    <div class="stat" style="padding:0.6rem 0;">
      <div class="stat-label" style="font-size:1rem;font-weight:700;color:var(--accent);">调查总结论</div>
      <div style="font-size:1.05rem;margin-top:0.3rem;">三类人群均存在同一通病：<strong style="color:var(--accent);">在自己不懂的领域自以为懂。</strong>而本人的优势仅在于——本人不会在自己不懂的事情上假装懂得。</div>
    </div>
  </div>
</div>
<div class="speaker-notes">经过对政客、诗人、工匠三个群体的系统性走访调查，本人得出如下结论：他们在各自领域确实有所建树，但无一例外地犯了同一个错误——因为在某一方面有专长，便自认为在所有方面都有智慧。本人的唯一优势，不过是不在自己不懂的事情上假装懂得而已。</div>
</div>

<!-- ==================== SLIDE 6: 仇恨成因 ==================== -->
<div class="slide" data-notes="正是这种调查工作，为本人招来了广泛的仇恨。被审问者感到难堪，于是将怒气转向本人。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">06 / 21</div>
  <div class="eyebrow">五、仇恨成因</div>
  <h2>公众敌意成因分析</h2>
  <p style="margin-bottom:1rem;">本人遭受指控的根本原因，可用以下因果链说明：</p>
  <div class="flow">
    <div class="flow-step">本人开展哲学审问</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">揭穿对方无知</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">对方当众难堪</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">转为仇恨本人</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">联合提起控告</div>
  </div>
  <div class="warning-box" style="margin-top:1.2rem;">
    <strong>加剧因素：</strong>一些富家子弟——他们有大量闲暇——喜欢跟随本人，模仿本人的审问方式去盘问他人。被他们盘问的人<strong>不怪这些年轻人，反而把账算到本人头上</strong>，指控"苏格拉底腐蚀青年"。
  </div>
  <div class="grid-2">
    <div class="card">
      <h3>仇恨的本质</h3>
      <p style="font-size:0.92rem;">并非本人做了什么坏事，而是被审问者<strong>无法接受自己被证明为无知</strong>的事实。攻击本人比承认自己无知要容易得多。</p>
    </div>
    <div class="card">
      <h3>指控的套路</h3>
      <p style="font-size:0.92rem;">凡是无法在辩论中胜过本人的人，都会搬出一套现成的说辞："<strong>苏格拉底研究天上地下的事、不信神、把弱论证变成强论证</strong>"——因为这是攻击一切哲学家的万能模板。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">现在各位应该明白本人为何招致如此广泛的仇恨了。这不是因为本人做了什么恶事，而是因为揭穿他人的无知本身就会引发敌意。被审问的人宁可攻击审问者，也不愿承认自己的无知。加上一些年轻人模仿我的做法去盘问他人，被盘问者把账算到我头上——这就是所谓"腐蚀青年"指控的真正来源。</div>
</div>

<!-- ==================== SLIDE 7: 反驳一 ==================== -->
<div class="slide" data-notes="现在正式进入对控方指控的逐条反驳。第一项：腐蚀青年。本人使用驯马师类比进行反证。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">07 / 21</div>
  <div class="eyebrow">六、指控反驳（一）</div>
  <h2>指控一：腐蚀青年</h2>
  <div class="claim-box">本人以<span class="red">"驯马师反证法"</span>证明：如果只有本人一人在腐蚀青年，那本指控不合逻辑</div>
  <div style="margin:1rem 0;">
    <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>提问迈勒图斯：</strong>谁能改善青年？——迈勒图斯回答：法律、陪审员、议员、公民大会成员……即所有雅典人。</div></div>
    <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>驯马师类比：</strong>以马匹训练为例——只有少数专业驯马师能改善马匹，而大多数人与马接触反而会败坏它们。</div></div>
    <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>推论：</strong>如果所有人都能改善青年而只有本人一人在败坏他们，这在逻辑上极不可能。真实情况恰恰相反——少数人有益，多数人有害。</div></div>
    <div class="arg-step"><div class="arg-num">4</div><div class="arg-text"><strong>进一步追问：</strong>如果本人确实在腐蚀青年，是有意还是无意？若无意，应私下劝告而非起诉；若有意——本人不会故意败坏与自己朝夕相处的人，因为被败坏的人必将反过来伤害本人。</div></div>
  </div>
  <div class="card" style="background:var(--soft-red);text-align:center;">
    <div class="stat">
      <div class="stat-number" style="font-size:1.6rem;">结论：指控一不成立</div>
      <div class="stat-label" style="font-size:0.9rem;">控方既无法说明本人如何腐蚀青年，也无法出示任何受害者证词</div>
    </div>
  </div>
</div>
<div class="speaker-notes">现在正式反驳第一项指控。我问迈勒图斯谁能改善青年，他说除了我以外所有雅典人都能。但这就像说只有一个人会败坏马匹而所有其他人都能训练马匹——事实恰恰相反，只有少数专业驯马师能改善马匹。而且，如果我是故意腐蚀青年，那我岂不是在故意伤害与自己朝夕相处的人？这对我有什么好处？</div>
</div>

<!-- ==================== SLIDE 8: 反驳二 ==================== -->
<div class="slide" data-notes="第二项指控：不信城邦诸神。本人通过揭露控方证词中的逻辑矛盾来反驳。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">08 / 21</div>
  <div class="eyebrow">六、指控反驳（二）</div>
  <h2>指控二：不信城邦之神</h2>
  <div class="claim-box">控方自相矛盾——既指控本人<span class="red">"不信神"</span>，又指控本人<span class="red">"引入新的神灵"</span></div>
  <div style="margin:1rem 0;">
    <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>控方主张A：</strong>苏格拉底是彻底的无神论者，完全不信任何神。</div></div>
    <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>控方主张B：</strong>苏格拉底引入新的精灵/神灵（daimonia）。</div></div>
    <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>逻辑推演：</strong>A与B互相矛盾——一个完全不信神的人怎么可能同时引入新的神灵？这就像说一个人既不相信马的存在，又在从事与马相关的活动。</div></div>
  </div>
  <div class="warning-box">
    <strong>骡子类比：</strong>迈勒图斯，你说有人相信骡子的存在却不相信马和驴的存在，这可能吗？同理，如果本人相信精灵（daimonia）的活动，而精灵是神的后代——<strong>那本人怎么可能不相信神的存在？</strong>这就像相信骡子存在却否认马和驴的存在一样荒谬。
  </div>
  <div class="card" style="background:var(--soft-red);text-align:center;">
    <div class="stat">
      <div class="stat-number" style="font-size:1.6rem;">结论：指控二自相矛盾</div>
      <div class="stat-label" style="font-size:0.9rem;">控方是在戏弄法庭，用自相矛盾的指控来考验陪审团的智力</div>
    </div>
  </div>
</div>
<div class="speaker-notes">第二项指控存在致命的逻辑矛盾。迈勒图斯一方面说我完全不信任何神，另一方面又说我引入了新的神灵。这两个主张不可能同时为真。我用骡子的类比来说明：如果一个人承认精灵的存在，精灵是神的后代，那他怎么可能否认神的存在？这就像相信骡子存在却否认马和驴的存在一样荒谬。</div>
</div>

<!-- ==================== SLIDE 9: 牛虻职能 ==================== -->
<div class="slide" data-notes="本人的社会功能定位：神派驻雅典城邦的牛虻。本人以贫穷、全职投入、零报酬为证据。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">09 / 21</div>
  <div class="eyebrow">七、社会功能定位</div>
  <h2>牛虻职能说明</h2>
  <div class="claim-box">本人系神派驻雅典城邦的<span class="red">"牛虻"</span>——负责唤醒、监督与批评。雅典就像一匹高大但因肥胖而行动迟缓的骏马，需要一只牛虻不断叮咬它，使它保持警醒。</div>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">证据</div></div>
      <h3>贫穷证据</h3>
      <p style="font-size:0.9rem;">本人长期处于极度贫困状态。如果本人的动机是谋取私利，为何会让自己沦落至此？一个图谋不轨的人不会主动选择贫穷。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">证据</div></div>
      <h3>全职投入</h3>
      <p style="font-size:0.9rem;">本人放弃一切私人事务，不关心财产、不追求官职，全部精力用于<strong>逐一走访市民</strong>，劝勉他们关注灵魂的卓越而非身外之物。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">证据</div></div>
      <h3>零报酬</h3>
      <p style="font-size:0.9rem;">本人从未向任何人收取费用。任何人都可以来听本人谈话，无论贫富。本人对所有人一视同仁，既不偏向穷人，也不讨好富人。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>请注意：</strong>如果你们杀死我，受损的不是我，而是你们自己。你们不容易再找到一个像我这样的人——一个被神赐予城邦的人。而<strong>处死一只牛虻很容易，但此后你们将在昏睡中度过余生</strong>。
  </div>
</div>
<div class="speaker-notes">本人的社会功能可以用一个比喻来说明：雅典城邦如同一匹高大肥硕却因此行动迟缓的骏马，本人就是神派来叮咬它、让它保持清醒的牛虻。证据就是我的贫穷、我对私人事务的忽视、以及从未向任何人收费。杀死我对你们没有好处——处死一只牛虻很容易，但之后你们就再也没人来叫醒了。</div>
</div>

<!-- ==================== SLIDE 10: 政治立场 ==================== -->
<div class="slide" data-notes="本人始终坚持正义原则，不论面对民主派还是寡头派的压力。以两个具体事件为证。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">10 / 21</div>
  <div class="eyebrow">八、政治立场</div>
  <h2>政治立场与实际行动</h2>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-index">案例一</div><div class="tag">民主政体时期</div></div>
      <h3>阿基努赛将军审判事件</h3>
      <p style="font-size:0.9rem;">公民大会不经合法程序，要将十位将军集体定罪处死。本人时任轮值主席团成员（Prytaneis），是<strong>唯一一个</strong>投票反对违法审判的人。尽管公众威胁要逮捕和处死本人，本人仍坚持<strong>法律程序正义</strong>，拒绝向暴民压力屈服。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">案例二</div><div class="tag">寡头政体时期</div></div>
      <h3>莱昂逮捕事件</h3>
      <p style="font-size:0.9rem;">三十僭主执政期间，命令本人与另外四人前往逮捕萨拉米斯人莱昂，意图将其处死以没收财产。另外四人服从了命令，<strong>本人独自回家</strong>，拒绝参与不义之事。此事本可能让本人丧命，若非僭主政权很快被推翻。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>核心原则：</strong>本人不参与任何违背正义的行为，<strong>无论命令来自民主政体还是寡头政体</strong>。正因如此，本人一生避免参与政治——因为一个真正坚持正义的人如果从政，必然会很快被杀。本人只能以私人身份为城邦服务。
  </div>
</div>
<div class="speaker-notes">两个具体事例可以证明本人的政治立场。在民主政体下的将军审判事件中，我是唯一一个坚持合法程序、反对集体定罪的人。在寡头政体下的莱昂事件中，三十僭主命令我去逮捕无辜者，我独自回家拒绝执行。这两件事说明，无论面对什么政权，我都坚持正义原则。也正因如此，我选择不从政——从政的正义之人活不长。</div>
</div>

<!-- ==================== SLIDE 11: 求饶问题 ==================== -->
<div class="slide" data-notes="有人会问为什么我不像其他被告那样哭泣求饶、带上妻儿博取同情。本人在此说明原因。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">11 / 21</div>
  <div class="eyebrow">九、程序合规性声明</div>
  <h2>关于求饶问题的立场声明</h2>
  <p style="margin-bottom:1rem;color:var(--text2);">本人不会采用常见的求饶手段（哭泣、携子女上庭、博取同情），理由如下：</p>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">理由</div></div>
      <h3>有损城邦声誉</h3>
      <p style="font-size:0.9rem;">本人年已七十，若在法庭上做出失态之举，将有损雅典的声誉。外邦人会认为雅典最优秀的公民竟与普通人无异。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">理由</div></div>
      <h3>违背陪审员职责</h3>
      <p style="font-size:0.9rem;">陪审员的职责是<strong>依据法律和事实做出公正判断</strong>，而非被被告的眼泪所动。用情感操纵陪审团是对司法制度的不敬。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">理由</div></div>
      <h3>不合本人信仰</h3>
      <p style="font-size:0.9rem;">本人相信神的存在，而用不正当手段影响司法就是在<strong>教导陪审员不敬神</strong>——这反而坐实了"不信神"的指控。</p>
    </div>
  </div>
  <div class="claim-box" style="margin-top:1rem;">
    本人将自己的案件完全交付各位陪审员和神明，请各位<span class="red">按照对城邦和各位自身最好的方式</span>做出判决。无论结果如何，本人和各位都不会有遗憾。
  </div>
</div>
<div class="speaker-notes">有人会奇怪我为什么不像其他被告那样哭泣求饶。原因有三：第一，这有损城邦声誉；第二，陪审员的职责是依法判断，不是被眼泪左右；第三，用不正当手段影响司法等于不敬神，反而坐实了对我的指控。我把命运交给各位和神明，按最正义的方式做出判断即可。</div>
</div>

<!-- ==================== SLIDE 12: 判决结果 ==================== -->
<div class="slide" data-notes="第一轮投票结果：有罪。但票差很小，如果仅30票改变，本人就会被宣告无罪。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">12 / 21</div>
  <div class="eyebrow">判决结果</div>
  <h2>第一轮投票结果</h2>
  <div class="verdict-box">
    <div class="stat">
      <div class="stat-number">有 罪</div>
      <div class="stat-label">501名陪审员投票结果</div>
    </div>
  </div>
  <div class="grid-3">
    <div class="card"><div class="stat"><div class="stat-number">约280</div><div class="stat-label">有罪票</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">约221</div><div class="stat-label">无罪票</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">30票</div><div class="stat-label">如仅此数改变即可无罪</div></div></div>
  </div>
  <div class="warning-box">
    <strong>本人回应：</strong>票差如此之小，令本人颇感意外。本人原以为差距会大得多。如果安尼图斯和吕孔没有加入起诉，迈勒图斯甚至无法获得五分之一的票数——那样他就要被罚款一千德拉克马了。
  </div>
  <div class="part-divider"><span>进入 Part II ——量刑意见阶段</span></div>
</div>
<div class="speaker-notes">陪审团投票的结果是有罪，但票差出乎我的意料地小——如果仅有三十票改变立场，我就会被宣告无罪。这说明控方的论证远非令人信服。接下来进入量刑阶段，按照雅典法律，被告有权提出自己认为合适的刑罚建议。</div>
</div>

<!-- ==================== SLIDE 13: 量刑建议 ==================== -->
<div class="slide" data-notes="按照法律，本人现在需要对自己提出量刑建议。本人认为自己应受到的待遇是：在普里塔尼厄姆用餐。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">13 / 21</div>
  <div class="eyebrow">十、量刑建议</div>
  <h2>被告方量刑建议</h2>
  <div class="claim-box">本人认为自己真正应得的"处罚"是：<span class="red">在普里塔尼厄姆（城邦公餐厅）终身免费用餐</span>——这是雅典给予奥运冠军和城邦英雄的待遇。</div>
  <p style="margin:0.8rem 0;font-size:0.95rem;">本人比奥运冠军更有资格享此待遇——奥运冠军让你们<strong>感觉</strong>幸福，本人让你们<strong>真正</strong>幸福。且本人一贫如洗，确实需要这顿餐食。</p>
  <h3 style="margin-top:1rem;">替代方案逐一排除</h3>
  <div class="grid-2">
    <div class="card">
      <h3>监禁 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">在监狱中成为十一人委员会的奴隶？为何要选择确定的恶？</p>
    </div>
    <div class="card">
      <h3>流放 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">如果本城邦都无法容忍本人的谈话，外邦又怎会容忍？本人到哪里都会继续做同样的事。</p>
    </div>
    <div class="card">
      <h3>沉默不言 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">要本人停止哲学探索，等于要本人停止生活。"未经审视的人生不值得过。"</p>
    </div>
    <div class="card">
      <h3>罚款30弥那 <span class="tag" style="background:#e8f5e9;color:#2e7d32;">可接受</span></h3>
      <p style="font-size:0.9rem;">本人的朋友们——柏拉图、克里托、克里托布洛斯、阿波罗多洛斯——愿意为本人担保，支付<strong>30弥那</strong>罚款。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">按雅典法律，本人需要提出自己认为合适的量刑建议。我认为对我最公正的"处罚"应该是在城邦公餐厅终身用餐——奥运冠军的待遇。因为我比奥运冠军更有资格。当然，如果必须选择一个惩罚，我排除监禁、流放和沉默——我到了朋友们愿意担保的30弥那罚款。</div>
</div>

<!-- ==================== SLIDE 14: 核心价值 ==================== -->
<div class="slide" data-notes="这是本人全部哲学工作的核心主张。未经审视的人生不值得过。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">14 / 21</div>
  <div class="eyebrow">十一、核心价值观</div>
  <h2>核心价值主张</h2>
  <div class="big-quote">
    "未经审视的人生<br>不值得过"
    <span class="greek">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</span>
  </div>
  <div class="grid-2">
    <div class="card">
      <h3>内涵说明</h3>
      <p style="font-size:0.92rem;">人之为人的最高价值，不在于财富、声望或权力，而在于<strong>持续不断地审视自己和他人</strong>——追问什么是正义、什么是善、什么是美德。放弃这种审视，等于放弃了人之为人的本质。</p>
    </div>
    <div class="card">
      <h3>实践方式</h3>
      <p style="font-size:0.92rem;">本人每日在市场、体育馆、街头与人谈话，不传授知识（本人没有知识可传授），而是<strong>通过提问</strong>帮助对方审视自己的信念和假设。这是一种精神助产术——帮助他人自己生出真理。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>正是这一信念，</strong>使本人不可能接受"保持沉默换取活命"的交易。因为沉默的苏格拉底已不再是苏格拉底——<strong>不如死。</strong>
  </div>
</div>
<div class="speaker-notes">这是本人全部哲学工作的核心。未经审视的人生不值得过。我不可能为了活命而放弃审视，因为那样的生活不值得过。我每天所做的事情——与人对话、提问、审视——这就是我存在的全部意义。让我停止这些，不如让我去死。</div>
</div>

<!-- ==================== SLIDE 15: 死刑判决 ==================== -->
<div class="slide" data-notes="第二轮投票结果：死刑。而且支持死刑的票数比第一轮支持有罪的还多。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">15 / 21</div>
  <div class="eyebrow">量刑结果</div>
  <h2>第二轮投票结果</h2>
  <div class="verdict-box" style="background:linear-gradient(135deg, #900000, #600000);">
    <div class="stat">
      <div class="stat-number">死 刑</div>
      <div class="stat-label">陪审团最终判决</div>
    </div>
  </div>
  <div class="warning-box">
    <strong>本人观察：</strong>第二轮投票中支持死刑的票数甚至<strong>超过了</strong>第一轮支持有罪的票数。这说明本人在量刑阶段的发言——特别是提议在公餐厅用餐——进一步激怒了部分陪审员。但本人不后悔，因为本人不会为了讨好任何人而说违心的话。
  </div>
  <div class="claim-box">
    如果本人愿意哭泣、哀求、说各种不配本人身份的话，或许可以脱罪。但本人宁愿<span class="red">以自己的方式为自己辩护后死去</span>，也不愿以不义的方式活下来。在战场上和法庭上道理相同——<strong>一个人应当思考如何正义地行动，而非不择手段地逃避死亡。</strong>
  </div>
  <div class="part-divider"><span>进入 Part III ——总结陈词</span></div>
</div>
<div class="speaker-notes">最终判决是死刑，而且投死刑票的人比投有罪票的还多——说明我在量刑阶段的态度进一步激怒了一些人。但我不后悔。我宁愿以正义的方式为自己辩护后死去，也不愿以卑劣的手段换取生存。在战场上如此，在法庭上也如此。现在进入最后的总结陈词。</div>
</div>

<!-- ==================== SLIDE 16: 致控方 ==================== -->
<div class="slide" data-notes="现在本人要对投票判本人有罪的人说一番话——这不是咒骂，而是预言。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">16 / 21</div>
  <div class="eyebrow">十二、致控方</div>
  <h2>致投有罪票诸位的警告</h2>
  <div class="warning-box" style="border-left-width:6px;">
    <strong>预言：</strong>在本人死后，将有<strong>更多、更年轻</strong>的审问者站出来，他们是本人此前一直在约束的人。他们会更加尖锐地审问你们，而你们会更加恼怒。<br><br>
    你们以为杀死本人就能逃避审视？<strong>这是不可能的。</strong>逃避审视最可靠的方法不是堵住别人的嘴，而是<strong>让自己变得更好</strong>。
  </div>
  <div class="card" style="margin-top:1rem;">
    <h3>赛跑比喻</h3>
    <p style="font-size:0.95rem;">本人不是因为<strong>跑不过死亡</strong>而死——死亡跑得慢，谁都跑得过。本人是因为跑不过<strong>邪恶</strong>——邪恶比死亡跑得快。今天，本人被判处死刑（较慢的惩罚），而控方诸位则被<strong>真理</strong>判处了邪恶与不义（较快且更沉重的惩罚）。<strong>双方各领其罚</strong>——这或许是应当的。</p>
  </div>
</div>
<div class="speaker-notes">致判本人有罪的诸位：本人要做一个预言。杀了我之后，审问者不会减少，反而会更多。你们以为杀人能解决问题，但逃避审视的唯一办法是让自己变得更好。记住：我不是跑不过死亡而死——死亡跑得慢。我是跑不过邪恶。你们也各有各的惩罚要领受。</div>
</div>

<!-- ==================== SLIDE 17: 死亡分析 ==================== -->
<div class="slide" data-notes="对于投本人无罪票的朋友们，本人想谈谈对死亡的理性分析。代蒙的沉默是一个重要信号。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">17 / 21</div>
  <div class="eyebrow">十三、死亡分析</div>
  <h2>关于死亡的理性分析</h2>
  <div class="card" style="background:var(--soft-gold);margin-bottom:1rem;">
    <h3>关键证据：代蒙（daimonion）的沉默</h3>
    <p style="font-size:0.95rem;">本人内心的神圣声音——代蒙——平时在本人即将做错事时总会发出警告。但今天，无论是出门时、上法庭时、还是发言过程中，<strong>代蒙始终保持沉默</strong>。这强烈暗示：<strong>今天发生在本人身上的事并非坏事。</strong></p>
  </div>
  <h3 style="margin-bottom:0.6rem;">死亡的两种可能——比较分析</h3>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-index">A</div><div class="tag">情景分析</div></div>
      <h3>完全的虚无</h3>
      <p style="font-size:0.9rem;">死亡如同<strong>无梦的深睡</strong>——没有任何感知。回想你一生中睡得最沉、完全没有做梦的那一夜，那是何等安宁？如果死亡就是这样永恒的无梦之眠，那它甚至比人生中大多数日夜都<strong>更加美好</strong>。即使是波斯大王也无法指出比无梦之眠更快乐的日子。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">B</div><div class="tag">情景分析</div></div>
      <h3>灵魂迁往他处</h3>
      <p style="font-size:0.9rem;">如果死亡是灵魂迁往另一个世界——那里有真正公正的审判者（弥诺斯、拉达曼提斯等），有荷马、赫西俄德、奥德修斯——<strong>那将是何等的福分！</strong>本人将能在冥界继续审问特洛伊战争的英雄们，考察他们的智慧。最妙的是——<strong>冥界的人不会因为提问而判你死刑。</strong></p>
    </div>
  </div>
  <div class="claim-box">两种情况下死亡都不是坏事。因此，<span class="red">对于一个好人而言，无论生死都不会有真正的恶</span>——诸神不会忽略他的事务。</div>
</div>
<div class="speaker-notes">对于投无罪票的朋友们，我想理性地分析一下死亡。首先一个重要信号：我的代蒙今天始终沉默，说明今天发生的事不是坏事。死亡要么是彻底的虚无——如无梦之眠，那其实很美好；要么是灵魂去往另一个世界——那里我可以继续审问英雄们的智慧，而且不会因此被判死刑。所以无论哪种情况，死亡对好人而言都不是恶。</div>
</div>

<!-- ==================== SLIDE 18: 最后请求 ==================== -->
<div class="slide" data-notes="这是本人最后的请求。关于我的儿子们，请各位像本人审问你们那样审问他们。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">18 / 21</div>
  <div class="eyebrow">十四、总结陈词</div>
  <h2>最后请求与嘱托</h2>
  <p style="margin-bottom:0.8rem;">在离别之前，本人只有一个请求：</p>
  <div class="claim-box" style="font-size:1.25rem;">
    当本人的儿子们长大成人后，如果他们追求财富或其他虚浮之物胜于追求美德，请各位<span class="red">像本人审问你们那样审问他们</span>。<br><br>
    如果他们自以为有了不起其实并没有，请责备他们——就像本人责备你们一样——<span class="red">因为他们不关心应该关心的事，却在无价值的事物上自以为了不起</span>。
  </div>
  <div class="grid-3">
    <div class="card" style="text-align:center;">
      <h3>对陪审团</h3>
      <p style="font-size:0.9rem;">本人对判本人有罪的人和判本人无罪的人都不怀恨意。</p>
    </div>
    <div class="card" style="text-align:center;">
      <h3>对控方</h3>
      <p style="font-size:0.9rem;">你们伤害的不是本人。没有人能伤害一个好人。</p>
    </div>
    <div class="card" style="text-align:center;">
      <h3>对后世</h3>
      <p style="font-size:0.9rem;">本人将此案的审判交予神明和时间。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">在最后，本人只有一个请求：当我的三个儿子长大后，如果他们追求财富胜于美德，请各位像我审问你们那样去审问他们。如果他们自以为了不起却其实平庸，请责备他们。这就是我全部的请求。</div>
</div>

<!-- ==================== SLIDE 19: 附录 ==================== -->
<div class="slide" data-notes="以下是本次申辩中所有核心论据的汇总表。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">19 / 21</div>
  <div class="eyebrow">附录</div>
  <h2>核心论据汇总表</h2>
  <table class="summary-table">
    <thead>
      <tr><th style="width:5%;">序号</th><th style="width:22%;">论题</th><th style="width:38%;">核心论据</th><th style="width:35%;">论证方法</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>旧指控澄清</td><td>本人非自然哲学家，不收费教学</td><td>事实陈述 + 证人可证</td></tr>
      <tr><td>2</td><td>神谕来源</td><td>德尔斐神谕称无人比本人更有智慧</td><td>历史事实 + 证人（凯瑞丰之兄弟）</td></tr>
      <tr><td>3</td><td>智慧的含义</td><td>承认无知即最大智慧</td><td>系统调查三类人群后的归纳推理</td></tr>
      <tr><td>4</td><td>仇恨成因</td><td>揭穿无知导致被审问者报复</td><td>因果分析</td></tr>
      <tr><td>5</td><td>反驳"腐蚀青年"</td><td>驯马师类比证明不合逻辑</td><td>类比论证 + 反证法</td></tr>
      <tr><td>6</td><td>反驳"不信神"</td><td>控方主张自相矛盾</td><td>逻辑矛盾证明 + 骡子类比</td></tr>
      <tr><td>7</td><td>牛虻使命</td><td>本人系神派驻城邦的督察</td><td>贫穷、零报酬、全职投入为证</td></tr>
      <tr><td>8</td><td>政治清白</td><td>两次冒死坚持正义</td><td>将军审判 + 莱昂事件两个案例</td></tr>
      <tr><td>9</td><td>拒绝求饶</td><td>正义优先于生存</td><td>职责论证 + 品格论证</td></tr>
      <tr><td>10</td><td>死亡非恶</td><td>无梦之眠或灵魂迁居均非坏事</td><td>穷举分析（两种可能均利好）</td></tr>
    </tbody>
  </table>
</div>
<div class="speaker-notes">此表汇总了本次申辩中的全部核心论据及论证方法，供各位陪审员回顾参考。</div>
</div>

<!-- ==================== SLIDE 20: 结语 ==================== -->
<div class="slide" data-notes="离别的时刻到了。这是苏格拉底最后的话。">
<div class="slide-inner" style="display:flex;flex-direction:column;justify-content:center;min-height:60vh;">
  <div class="top-rule"></div>
  <div class="slide-number">20 / 21</div>
  <div class="eyebrow">结语</div>
  <div class="big-quote" style="font-size:2.2rem;padding:2rem 1rem;">
    离别的时刻已经到来。<br>
    我去赴死，你们去生活。<br>
    <span style="color:var(--accent);font-weight:900;">哪一个更好，只有神知道。</span>
    <span class="greek" style="font-size:1.1rem;margin-top:1rem;">
      ἀλλὰ γὰρ ἤδη ὥρα ἀπιέναι,<br>
      ἐμοὶ μὲν ἀποθανουμένῳ, ὑμῖν δὲ βιωσομένοις·<br>
      ὁπότεροι δὲ ἡμῶν ἔρχονται ἐπὶ ἄμεινον πρᾶγμα, ἄδηλον παντὶ πλὴν ἢ τῷ θεῷ.
    </span>
  </div>
  <div style="text-align:center;margin-top:2rem;color:var(--text2);font-size:0.95rem;">
    <div style="display:inline-block;border-top:2px solid var(--border);padding-top:1rem;">
      汇报人：苏格拉底 &nbsp;|&nbsp; 雅典人民法庭 &nbsp;|&nbsp; 公元前399年<br>
      <span style="font-size:0.82rem;">本报告内容基于柏拉图《申辩篇》(Ἀπολογία Σωκράτους) 整理</span>
    </div>
  </div>
</div>
<div class="speaker-notes">离别的时刻到了。我去赴死，你们去生活。至于哪一个更好，除了神以外，谁也不知道。这是本人最后的话。谢谢各位。</div>
</div>

<!-- ==================== SLIDE 21: 致谢页 ==================== -->
<div class="slide" data-notes="感谢各位听完本人的完整汇报。">
<div class="slide-inner" style="display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:60vh;">
  <div class="top-rule"></div>
  <div class="slide-number">21 / 21</div>
  <div style="text-align:center;">
    <div class="eyebrow" style="justify-content:center;margin-bottom:1rem;">雅典人民法庭 · 公元前399年</div>
    <h1 style="font-size:2.8rem;margin-bottom:0.5rem;">申辩完毕</h1>
    <p style="font-size:1.2rem;color:var(--text2);margin-bottom:2rem;">谨呈各位陪审员审阅</p>
    <div class="grid-3" style="max-width:600px;">
      <div class="stat">
        <div class="stat-number">21</div>
        <div class="stat-label">汇报页数</div>
      </div>
      <div class="stat">
        <div class="stat-number">14</div>
        <div class="stat-label">论证章节</div>
      </div>
      <div class="stat">
        <div class="stat-number">10</div>
        <div class="stat-label">核心论据</div>
      </div>
    </div>
    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid var(--border);">
      <p style="font-size:0.88rem;color:var(--text2);">
        汇报人：苏格拉底 &nbsp;|&nbsp; 职务：雅典公民、哲学工作者<br>
        <span style="font-size:0.82rem;">基于柏拉图《申辩篇》整理 · 国企汇报风格呈现</span>
      </p>
    </div>
  </div>
</div>
<div class="speaker-notes">感谢各位陪审员听完本人的完整汇报。全部21页，14个论证章节，10条核心论据。本人已尽自己的责任，剩下的交给各位和诸神。</div>
</div>

</div><!-- end deck -->

<div class="controls-hint">← → 翻页 &nbsp;|&nbsp; N 演讲备注 &nbsp;|&nbsp; F 全屏 &nbsp;|&nbsp; P 打印</div>

<script>
(function(){
  const deck = document.getElementById('deck');
  const slides = deck.querySelectorAll('.slide');
  const progress = document.getElementById('progress');
  let current = 0;
  const total = slides.length;

  function goTo(n) {
    if (n < 0 || n >= total) return;
    slides[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    progress.style.width = ((current + 1) / total * 100) + '%';
    // Update hash
    history.replaceState(null, '', '#' + (current + 1));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    else if (e.key === 'n' || e.key === 'N') { document.body.classList.toggle('show-notes'); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    else if (e.key === 'p' || e.key === 'P') { window.print(); }
  });

  // Click navigation
  deck.addEventListener('click', function(e) {
    const rect = deck.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width * 0.5) next();
    else prev();
  });

  // Touch
  let touchStartX = 0;
  deck.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; });
  deck.addEventListener('touchend', function(e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
  });

  // Hash navigation
  function readHash() {
    const h = parseInt(location.hash.replace('#', ''), 10);
    if (h >= 1 && h <= total) goTo(h - 1);
  }
  window.addEventListener('hashchange', readHash);
  readHash();

  // Init progress
  progress.style.width = ((current + 1) / total * 100) + '%';
})();
</script>
</body>
</html>

=== FILE: .claude/skills/presentation-skill/docs/sunny-cards.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
/* ============ RESET & BASE ============ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #f5f0e8; font-family: 'Noto Sans SC', sans-serif; color: #2d2d2d; }

/* ============ DESIGN TOKENS ============ */
:root {
  --bg: #f5f0e8;
  --slide-bg: #ffffff;
  --yellow: #fff8e1;
  --blue: #e8f4fd;
  --green: #e8f5e9;
  --rose: #fce4ec;
  --purple: #f3e5f5;
  --orange: #e67e22;
  --teal: #00897b;
  --coral: #e74c3c;
  --accent-blue: #2196f3;
  --text: #2d2d2d;
  --text2: #666666;
  --radius: 16px;
  --radius-lg: 26px;
  --shadow: 0px 8px 30px rgba(0,0,0,0.06);
  --shadow-card: 0px 4px 16px rgba(0,0,0,0.05);
}

/* ============ SLIDE CONTAINER ============ */
.deck { width: 100vw; height: 100vh; position: relative; }
.slide {
  display: none; position: absolute; inset: 0;
  padding: 40px 60px;
  background: var(--bg);
  overflow-y: auto;
}
.slide.active { display: flex; flex-direction: column; }
.slide-inner {
  max-width: 1100px; width: 100%; margin: 0 auto;
  background: var(--slide-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: 48px 56px;
  flex: 1;
  overflow-y: auto;
  display: flex; flex-direction: column;
}

/* ============ TYPOGRAPHY ============ */
h1 { font-size: 42px; font-weight: 900; line-height: 1.3; margin-bottom: 16px; }
h2 { font-size: 32px; font-weight: 900; line-height: 1.3; margin-bottom: 20px; }
h3 { font-size: 22px; font-weight: 700; line-height: 1.4; margin-bottom: 12px; }
p, li { font-size: 16px; font-weight: 400; line-height: 1.8; color: var(--text); }
.secondary { color: var(--text2); }
.small { font-size: 14px; }

/* ============ CARDS ============ */
.card {
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-card);
}
.card-yellow { background: var(--yellow); }
.card-blue { background: var(--blue); }
.card-green { background: var(--green); }
.card-rose { background: var(--rose); }
.card-purple { background: var(--purple); }
.card-white { background: #fff; border: 1.5px solid #eee; }

.card-border-left {
  border-left: 5px solid var(--orange);
}
.card-border-coral { border-left-color: var(--coral); }
.card-border-teal { border-left-color: var(--teal); }
.card-border-blue { border-left-color: var(--accent-blue); }
.card-border-purple { border-left-color: #9c27b0; }

/* ============ BADGES / PILLS ============ */
.badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  margin: 4px 4px 4px 0;
}
.badge-orange { background: var(--orange); color: #fff; }
.badge-teal { background: var(--teal); color: #fff; }
.badge-coral { background: var(--coral); color: #fff; }
.badge-blue { background: var(--accent-blue); color: #fff; }
.badge-purple { background: #9c27b0; color: #fff; }
.badge-outline { background: transparent; border: 2px solid var(--orange); color: var(--orange); }
.badge-yellow { background: #f9a825; color: #fff; }
.badge-green { background: #43a047; color: #fff; }

/* ============ QUOTE CARD ============ */
.quote-card {
  background: var(--yellow);
  border-radius: var(--radius);
  padding: 28px 32px;
  margin: 16px 0;
  position: relative;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.8;
}
.quote-card::before {
  content: '❝';
  font-size: 48px;
  position: absolute;
  top: 8px; left: 16px;
  opacity: 0.25;
}

/* ============ STAT CARD ============ */
.stat-card {
  text-align: center;
  padding: 20px;
  border-radius: var(--radius);
  background: var(--blue);
}
.stat-card .num { font-size: 42px; font-weight: 900; color: var(--accent-blue); }
.stat-card .label { font-size: 14px; color: var(--text2); margin-top: 4px; }

/* ============ FLOW / TIMELINE ============ */
.flow-step {
  display: flex; align-items: flex-start; gap: 14px;
  margin-bottom: 12px;
  padding: 12px 16px;
  background: #fff; border-radius: 12px;
  box-shadow: var(--shadow-card);
}
.flow-step .icon { font-size: 28px; flex-shrink: 0; }
.flow-step .text { font-size: 15px; line-height: 1.7; }
.flow-arrow { text-align: center; font-size: 22px; color: var(--orange); margin: 4px 0; }

/* ============ GRID HELPERS ============ */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.grid4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
.flex-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.flex-col { display: flex; flex-direction: column; gap: 12px; }
.gap-sm { gap: 8px; }
.gap-lg { gap: 20px; }
.mt { margin-top: 16px; }
.mt-lg { margin-top: 28px; }
.mb { margin-bottom: 16px; }
.center { text-align: center; }
.flex1 { flex: 1; }

/* ============ CALLOUT ============ */
.callout {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 16px 20px;
  border-radius: var(--radius);
  background: var(--green);
  margin: 12px 0;
}
.callout.warning { background: var(--rose); }
.callout .icon { font-size: 24px; flex-shrink: 0; }

/* ============ SLIDE NUMBER ============ */
.slide-num {
  position: fixed; bottom: 20px; right: 32px;
  font-size: 13px; color: var(--text2);
  z-index: 100;
  background: rgba(255,255,255,0.8);
  padding: 4px 12px;
  border-radius: 20px;
}

/* ============ CONTROLS ============ */
.controls {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px; z-index: 200;
  background: rgba(255,255,255,0.9);
  padding: 8px 16px;
  border-radius: 30px;
  box-shadow: var(--shadow);
}
.controls button {
  border: none; background: var(--orange); color: #fff;
  padding: 8px 18px; border-radius: 20px;
  font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: inherit;
  transition: background 0.2s;
}
.controls button:hover { background: #d35400; }
.controls button.outline {
  background: transparent; border: 2px solid var(--orange);
  color: var(--orange);
}
.controls button.outline:hover { background: var(--orange); color: #fff; }

/* ============ SPEAKER NOTES TOGGLE ============ */
.speaker-notes {
  display: none;
  margin-top: auto;
  padding: 16px 20px;
  background: #f0ebe3;
  border-radius: 12px;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.7;
  border-top: 2px dashed #ddd;
}
.speaker-notes.show { display: block; }
.speaker-notes::before { content: '🎙 演讲笔记：'; font-weight: 700; color: var(--text); }

/* ============ PROGRESS BAR ============ */
.progress-bar {
  position: fixed; top: 0; left: 0; height: 4px;
  background: var(--orange);
  z-index: 300;
  transition: width 0.3s ease;
}

/* ============ COVER SPECIAL ============ */
.cover-emoji { font-size: 80px; display: block; margin-bottom: 12px; }
.cover-title { font-size: 64px; font-weight: 900; letter-spacing: 4px; }
.cover-subtitle { font-size: 20px; color: var(--text2); margin-top: 12px; }

/* ============ BIG QUOTE ============ */
.big-quote {
  font-size: 30px; font-weight: 900; line-height: 1.6;
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, var(--yellow), var(--green));
  border-radius: 20px;
  margin: 20px 0;
}

/* ============ SVG DECORATIONS ============ */
.deco-columns {
  position: absolute; bottom: 20px; right: 40px; opacity: 0.08;
}

/* ============ PRINT ============ */
@media print {
  body { overflow: visible; background: #fff; }
  .deck { height: auto; }
  .slide { display: flex !important; position: relative; page-break-after: always; height: 100vh; }
  .slide-inner { box-shadow: none; border: 1px solid #eee; }
  .controls, .slide-num, .progress-bar { display: none !important; }
  .speaker-notes { display: block !important; }
}

/* ============ RESPONSIVE ============ */
@media (max-width: 800px) {
  .slide { padding: 16px; }
  .slide-inner { padding: 24px 20px; }
  h1 { font-size: 28px; }
  h2 { font-size: 24px; }
  .grid2, .grid3, .grid4 { grid-template-columns: 1fr; }
  .cover-title { font-size: 36px; }
  .cover-emoji { font-size: 56px; }
  .big-quote { font-size: 22px; padding: 20px; }
}
</style>
</head>
<body>

<div class="progress-bar" id="progressBar"></div>
<div class="slide-num" id="slideNum"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide" data-notes="欢迎各位。今天我以苏格拉底第一人称来讲述这个两千四百年前的法庭故事。这不仅是一次辩护，更是西方哲学史上最重要的时刻之一。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center; position: relative;">
    <svg class="deco-columns" width="200" height="180" viewBox="0 0 200 180">
      <line x1="30" y1="20" x2="30" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="70" y1="20" x2="70" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="110" y1="20" x2="110" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="150" y1="20" x2="150" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="10" y1="16" x2="170" y2="16" stroke="#2d2d2d" stroke-width="4" stroke-linecap="round"/>
      <path d="M10 16 Q90 0 170 16" stroke="#2d2d2d" stroke-width="3" fill="none"/>
      <line x1="10" y1="164" x2="170" y2="164" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
    </svg>
    <span class="cover-emoji">🏛️</span>
    <div class="cover-title">我的申辩</div>
    <div class="cover-subtitle">苏格拉底 · 雅典人民法庭 · 公元前399年</div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange">👴 70岁</span>
      <span class="badge badge-teal">⚖️ 第一次上法庭</span>
      <span class="badge badge-blue">👥 501名陪审员</span>
      <span class="badge badge-coral">⏱ 限时申辩</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 2: 今天的故事 ==================== -->
<div class="slide" data-notes="先让大家了解今天的结构。整个申辩分三部分，对应雅典法庭的三个阶段。指控看起来吓人，但逻辑漏洞百出。">
  <div class="slide-inner">
    <h2>📋 今天的故事</h2>
    <div class="grid2 mt">
      <div>
        <h3>三幕结构</h3>
        <div class="card card-yellow">
          <strong>Part I</strong> 🛡️ 我的辩护<br>
          <span class="small secondary">回应指控，讲述真相</span>
        </div>
        <div class="card card-blue">
          <strong>Part II</strong> ⚖️ 你们要怎么罚我<br>
          <span class="small secondary">量刑辩论</span>
        </div>
        <div class="card card-purple">
          <strong>Part III</strong> 🕊️ 最后几句话<br>
          <span class="small secondary">临终遗言</span>
        </div>
      </div>
      <div>
        <h3>🚨 指控内容</h3>
        <div class="card card-rose card-border-left card-border-coral">
          <strong>指控 ①</strong><br>
          <span style="font-size:24px;">😈</span> 腐蚀青年<br>
          <span class="small secondary">"带坏雅典的年轻人"</span>
        </div>
        <div class="card card-rose card-border-left card-border-coral">
          <strong>指控 ②</strong><br>
          <span style="font-size:24px;">🚫</span> 不信城邦之神<br>
          <span class="small secondary">"引入新的神灵"</span>
        </div>
        <div class="callout warning mt">
          <span class="icon">⚠️</span>
          <div><strong>原告：</strong>美勒托斯（诗人）、安尼托斯（政客）、莱孔（修辞家）</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 3: 我的开场白 ==================== -->
<div class="slide" data-notes="苏格拉底开场就用反讽——说自己不会说话，实际上是高级修辞策略。这种'不修辞的修辞'贯穿全文。">
  <div class="slide-inner">
    <h2>🎭 我的开场白</h2>
    <div class="quote-card">
      雅典的公民们，我的控告者说得天花乱坠——但几乎没说过一句真话。
    </div>
    <div class="card card-blue mt">
      <p>😤 他们最无耻的说法是让你们提防我的"雄辩"——拜托，<strong>我连法庭话术都不会！</strong></p>
    </div>
    <div class="card card-green">
      <p>🤷 除非"雄辩"就是"说真话"，那我认了。</p>
    </div>
    <div class="callout mt">
      <span class="icon">💡</span>
      <div>
        <strong>苏格拉底的策略</strong><br>
        用"不会说话"来赢得信任。越说自己不懂修辞，越让人觉得他说的是真话。<br>
        <span class="badge badge-teal mt">反讽大师</span>
        <span class="badge badge-orange">以退为进</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 4: 看不见的敌人 vs 看得见的敌人 ==================== -->
<div class="slide" data-notes="苏格拉底区分了两类敌人。看不见的敌人更危险，因为多年谣言已经深入人心。阿里斯托芬的喜剧《云》把他丑化成空谈自然哲学的骗子。">
  <div class="slide-inner">
    <h2>👻 看不见的敌人 vs 看得见的敌人</h2>
    <div class="grid2 mt">
      <div class="card card-purple card-border-left card-border-purple" style="min-height: 220px;">
        <h3>👻 看不见的敌人</h3>
        <p>🎭 阿里斯托芬的《云》把我演成怪人——在天上走路、研究虫子</p>
        <p class="mt">📢 多年积累的谣言，从你们小时候就开始了</p>
        <div class="quote-card" style="font-size:15px; padding: 14px 18px; margin-top: 12px;">
          我只能与影子搏斗——连对手的名字都叫不出来。
        </div>
        <span class="badge badge-coral mt">更危险</span>
      </div>
      <div class="card card-blue card-border-left card-border-blue" style="min-height: 220px;">
        <h3>👁️ 看得见的敌人</h3>
        <div class="flex-col gap-sm mt">
          <div class="card card-white">🪶 <strong>美勒托斯</strong> — 诗人<br><span class="small secondary">代表被我得罪的诗人们</span></div>
          <div class="card card-white">🏛️ <strong>安尼托斯</strong> — 政客<br><span class="small secondary">代表被我得罪的政客们</span></div>
          <div class="card card-white">📜 <strong>莱孔</strong> — 修辞家<br><span class="small secondary">代表被我得罪的演说家们</span></div>
        </div>
        <span class="badge badge-blue mt">面对面的对手</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 5: 德尔斐神谕 ==================== -->
<div class="slide" data-notes="这是整个申辩的转折点。苏格拉底用神谕来解释他为什么到处找人辩论——不是为了炫耀，而是为了验证神的话。">
  <div class="slide-inner">
    <h2>🏛️ 德尔斐神谕</h2>
    <div class="flex-col mt">
      <div class="flow-step">
        <span class="icon">🏃</span>
        <div class="text">好友<strong>凯瑞丰</strong>跑去德尔斐神庙——这家伙做什么都冲动</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <span class="icon">🙋</span>
        <div class="text">问女祭司：<strong>"有没有人比苏格拉底更聪明？"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow);">
        <span class="icon">🔮</span>
        <div class="text"><strong style="font-size:18px;">神谕："没有。"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <span class="icon">😱</span>
        <div class="text">我的反应：<strong>"这不可能！我明明什么都不知道！"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--green);">
        <span class="icon">🔍</span>
        <div class="text">我的决定：去找一个比我聪明的人来<strong>反驳神谕</strong></div>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🤔</span>
      <div>但神不会说谎——所以一定是我理解错了。让我去调查调查。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 6: 我的调查报告 ==================== -->
<div class="slide" data-notes="苏格拉底依次拜访三类人。每次都发现同一个规律：他们在自己的领域确实有能力，但都犯了同一个错——以为自己无所不知。">
  <div class="slide-inner">
    <h2>🔍 我的调查报告</h2>
    <div class="grid3 mt">
      <div class="card card-blue">
        <div style="font-size:36px; text-align:center;">🏛️</div>
        <h3 class="center">政客</h3>
        <p>自以为有智慧，其实一无所知。</p>
        <div class="callout" style="background:#d4edfc; margin-top:12px; padding:10px 14px;">
          <div class="small">我比他强一点——至少<strong>我知道自己不知道</strong>。</div>
        </div>
        <div class="center mt"><span class="badge badge-blue">自知之明 +1</span></div>
      </div>
      <div class="card card-yellow">
        <div style="font-size:36px; text-align:center;">🪶</div>
        <h3 class="center">诗人</h3>
        <p>写得好但解释不了自己的作品。靠灵感不靠智慧。</p>
        <div class="callout" style="background:#fff0c4; margin-top:12px; padding:10px 14px;">
          <div class="small">因为会写诗就以为<strong>什么都懂</strong>。</div>
        </div>
        <div class="center mt"><span class="badge badge-yellow">灵感 ≠ 智慧</span></div>
      </div>
      <div class="card card-green">
        <div style="font-size:36px; text-align:center;">🔨</div>
        <h3 class="center">工匠</h3>
        <p>手艺确实好——我承认。但也因为手艺好就以为自己是万事通。</p>
        <div class="callout" style="background:#c8e6c9; margin-top:12px; padding:10px 14px;">
          <div class="small"><strong>技术好 ≠ 全知</strong></div>
        </div>
        <div class="center mt"><span class="badge badge-green">专长陷阱</span></div>
      </div>
    </div>
    <div class="card card-rose mt center" style="padding:16px;">
      <span style="font-size:20px;">📊</span> 调查结论 → <strong>"名声越大的人，智慧越少"</strong>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 7: 神谕的真相 ==================== -->
<div class="slide" data-notes="这是苏格拉底哲学的核心——苏格拉底式无知。他不是说自己什么都不知道，而是说他知道人类智慧的局限性。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🦉 神谕的真相</h2>
    <div style="font-size:72px; margin: 8px 0;">🦉</div>
    <div class="big-quote">
      只有神有真正的智慧。<br>人类的智慧微不足道。<br>最聪明的人是像我这样——<br><strong>知道自己其实什么都不知道的人。</strong>
    </div>
    <div class="flex-row mt" style="justify-content:center;">
      <span class="badge badge-orange">① 神用我做例证</span>
      <span class="badge badge-teal">② 真智慧属于神</span>
      <span class="badge badge-blue">③ 我只比别人多一点自知之明</span>
    </div>
    <div class="card card-rose mt center">
      💰 <strong>代价：赤贫。</strong> 我忙着替神干活，完全无暇谋生。
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 8: 为什么你们恨我 ==================== -->
<div class="slide" data-notes="苏格拉底分析了自己不受欢迎的原因。被他揭穿的人恼羞成怒，加上年轻人模仿他到处质问长辈，让情况雪上加霜。">
  <div class="slide-inner">
    <h2>😡 为什么你们恨我</h2>
    <div class="card card-yellow mt">
      <p>😤 每次我揭穿一个人，他就恨我。他们说不出我到底做了什么坏事，就搬出那些<strong>老套指控</strong>：</p>
      <div class="flex-row mt gap-sm">
        <span class="badge badge-coral">"研究天上的东西"</span>
        <span class="badge badge-coral">"研究地下的东西"</span>
        <span class="badge badge-coral">"不信神"</span>
        <span class="badge badge-coral">"颠倒黑白"</span>
      </div>
    </div>
    <div class="card card-blue mt">
      <p>👦 更糟的是——<strong>你们的孩子开始模仿我</strong>去审问人。</p>
      <p>然后那些被审问的人把气撒到我头上：</p>
      <p style="font-style:italic; color: var(--coral);">"都是苏格拉底教坏的！"</p>
    </div>
    <div class="callout warning mt">
      <span class="icon">🚨</span>
      <div>
        <strong>这就是今天这场审判的真正原因。</strong><br>
        不是什么"腐蚀青年"或"不敬神"——而是<strong>面子挂不住</strong>。
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 9: 法庭交锋：驯马师陷阱 ==================== -->
<div class="slide" data-notes="这是苏格拉底式反诘法的经典展示。他用马的类比让美勒托斯的指控不攻自破——不可能所有人都能改善青年而只有一个人在腐蚀。">
  <div class="slide-inner">
    <h2>🐴 法庭交锋：驯马师陷阱</h2>
    <div class="flex-col mt">
      <div class="flow-step" style="background: var(--blue);">
        <span class="icon">1️⃣</span>
        <div class="text">我问美勒托斯：<strong>谁是青年的改善者？</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--rose);">
        <span class="icon">2️⃣</span>
        <div class="text">他答：<strong>所有雅典人！</strong>只有我一个人在腐蚀！</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow);">
        <span class="icon">3️⃣</span>
        <div class="text">我的反击：那<strong>马</strong>呢？是所有人都能训好马，还是只有<strong>专业驯马师</strong>？</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--green);">
        <span class="icon">4️⃣</span>
        <div class="text">答案：当然是<strong>少数专家</strong>。</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow); border: 2px solid var(--orange);">
        <span class="icon">5️⃣</span>
        <div class="text"><strong>结论：一个人腐蚀、所有人改善？荒谬！</strong></div>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🎯</span>
      <div>而且如果我腐蚀了身边的人，他们反过来会伤害我——<strong>我为什么要害自己？</strong>如果是无意的，应该私下教育我而不是告上法庭。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 10: 逻辑陷阱：不信神？ ==================== -->
<div class="slide" data-notes="苏格拉底用严密的逻辑推理让美勒托斯自相矛盾。控告书本身就承认他信某种神灵，却又说他不信——这是逻辑上的不可能。">
  <div class="slide-inner">
    <h2>🪤 逻辑陷阱：不信神？</h2>
    <div class="card card-blue mt">
      <h3>逻辑推演链</h3>
      <div class="flex-col mt gap-sm">
        <div class="card card-white" style="padding:12px 16px;">📜 控告书说我<strong>"信奉神灵之事"</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-white" style="padding:12px 16px;">🤔 能信神灵之事而不信精灵？→ <strong>不能</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-white" style="padding:12px 16px;">✨ 精灵 = 神 或 <strong>神的后代</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-yellow" style="padding:12px 16px; border: 2px solid var(--coral);">
          💥 所以你说我不信神，又说我信神 → <strong>自相矛盾！</strong>
        </div>
      </div>
    </div>
    <div class="card card-green mt">
      <span style="font-size:28px;">🫏</span>
      <p class="mt"><strong>苏格拉底的类比：</strong>"这就像说骡子存在，但马和驴不存在——有这种道理吗？"</p>
    </div>
    <div class="card card-rose mt center">
      <strong>裁决：</strong>"美勒托斯，你找不到真正的罪名来告我。"
      <span class="badge badge-coral" style="margin-left:8px;">指控破产</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 11: 我是一只牛虻 ==================== -->
<div class="slide" data-notes="牛虻比喻是《申辩》中最著名的段落之一。苏格拉底将自己定位为城邦的觉醒者——不是敌人，而是最忠诚的服务者。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🐝 我是一只牛虻</h2>
    <div style="font-size:72px; margin: 8px 0;">🐝</div>
    <div class="big-quote" style="background: linear-gradient(135deg, var(--yellow), var(--blue));">
      雅典是一匹高贵但懒惰的骏马。<br>
      我是神派来叮它的<strong>牛虻</strong>。
    </div>
    <div class="grid2 mt">
      <div class="card card-rose">
        <p>😴 你们可以一巴掌拍死我，然后继续睡大觉——</p>
        <p class="mt"><strong>除非神再派一只来。</strong></p>
      </div>
      <div class="card card-green">
        <p>💰 不信？看看我的穷就知道了。</p>
        <p class="mt"><strong>谁会为了自讨苦吃而放弃一切？</strong></p>
        <p class="small secondary mt">我没有从任何人那里收过一分钱。</p>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 12: 我的两次抗命 ==================== -->
<div class="slide" data-notes="这两个故事展示了苏格拉底的一致性——无论当权者是民主还是暴政，他都坚持正义，哪怕冒生命危险。">
  <div class="slide-inner">
    <h2>⚔️ 我的两次抗命</h2>
    <div class="grid2 mt-lg">
      <div class="card card-blue card-border-left card-border-blue" style="min-height:200px;">
        <span class="badge badge-blue">🏛️ 民主政体下</span>
        <span class="badge badge-outline" style="border-color:var(--accent-blue); color:var(--accent-blue);">406 BC</span>
        <h3 class="mt">阿吉纽西将军审判案</h3>
        <p>他们要违法集体审判十位将军。</p>
        <p class="mt"><strong>我是执政团唯一的反对者。</strong></p>
        <p class="mt" style="color:var(--coral);">被威胁逮捕也不改口。</p>
      </div>
      <div class="card card-rose card-border-left card-border-coral" style="min-height:200px;">
        <span class="badge badge-coral">👑 暴政下</span>
        <span class="badge badge-outline" style="border-color:var(--coral); color:var(--coral);">404 BC</span>
        <h3 class="mt">三十僭主的命令</h3>
        <p>让我和另外四个人去抓萨拉米斯人莱昂回来处死。</p>
        <p class="mt">其他四个人去了。<strong>我？我回家了。</strong></p>
        <p class="mt" style="color:var(--coral);">差点因此送命。</p>
      </div>
    </div>
    <div class="card card-yellow mt center" style="padding:16px;">
      ⚖️ <strong>无论民主还是暴政，我只听正义的。</strong>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 13: 我不会求饶 ==================== -->
<div class="slide" data-notes="苏格拉底拒绝用感情戏码来博取同情。这在当时的雅典法庭非常罕见——大多数被告都会带家人来哭。">
  <div class="slide-inner">
    <h2>😤 我不会求饶</h2>
    <div class="card card-yellow mt">
      <p style="font-size:18px;">👨‍👦‍👦 我有三个儿子。但我<strong>不会</strong>把他们带来哭给你们看。</p>
    </div>
    <h3 class="mt-lg">为什么？三个理由：</h3>
    <div class="grid3 mt">
      <div class="card card-rose" style="text-align:center;">
        <div style="font-size:36px;">① 😳</div>
        <p class="mt"><strong>丢人</strong></p>
        <p class="small secondary">一个七十岁的人，跪在那里嚎哭？不体面。</p>
      </div>
      <div class="card card-blue" style="text-align:center;">
        <div style="font-size:36px;">② 🏛️</div>
        <p class="mt"><strong>丢雅典的人</strong></p>
        <p class="small secondary">外邦人会说："雅典所谓的贤者也不过如此。"</p>
      </div>
      <div class="card card-purple" style="text-align:center;">
        <div style="font-size:36px;">③ ⚖️</div>
        <p class="mt"><strong>丢你们的人</strong></p>
        <p class="small secondary">你们宣誓依法审判。让我哭着求你们违背誓言？而我自己正因"不虔诚"受审？</p>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🎯</span>
      <div>如果我靠哭来说服你们——那恰好证明了我在教你们<strong>不敬神</strong>。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 14: 判决：有罪 ==================== -->
<div class="slide" data-notes="501人投票，大约280对221。仅30票之差。苏格拉底自己也注意到了——如果翻转30票就无罪了。这为第二阶段的量刑辩论做了铺垫。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <span class="badge badge-coral" style="font-size:16px; padding: 8px 24px;">Part I 结束</span>
    <h1 class="mt-lg" style="font-size:56px; color: var(--coral);">⚖️ 判决：有罪</h1>
    <div class="grid3 mt-lg" style="max-width:600px;">
      <div class="stat-card" style="background: var(--rose);">
        <div class="num" style="color:var(--coral);">~280</div>
        <div class="label">有罪票</div>
      </div>
      <div class="stat-card" style="background: var(--green);">
        <div class="num" style="color:#43a047;">~221</div>
        <div class="label">无罪票</div>
      </div>
      <div class="stat-card" style="background: var(--yellow);">
        <div class="num" style="color:var(--orange);">~30</div>
        <div class="label">票差</div>
      </div>
    </div>
    <div class="card card-yellow mt-lg" style="max-width:600px;">
      <p>🤔 如果只翻转 <strong>30票</strong>，我就自由了。</p>
      <p class="small secondary mt">有趣的是——如果没有安尼托斯和莱孔加入，美勒托斯连五分之一的票都拿不到，还得交罚款。</p>
    </div>
    <div class="mt-lg">
      <span class="badge badge-blue" style="font-size:16px; padding: 8px 24px;">进入 Part II → 量刑辩论</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 15: 我该受什么"罚" ==================== -->
<div class="slide" data-notes="量刑阶段，苏格拉底的建议震惊了所有人——他要求的是奖赏而不是惩罚。在普里坦内翁免费用餐是雅典最高荣誉之一。">
  <div class="slide-inner">
    <h2>🍽️ 我该受什么"罚"</h2>
    <div class="card card-yellow mt">
      <p style="font-size:18px;">🏆 我是你们的恩人。我建议：<strong>在普里坦内翁公共食堂免费用餐</strong>——比奥林匹亚冠军更有资格！</p>
      <p class="small secondary mt">他们给你短暂的快乐，我给你真正的幸福。而且——他们不缺钱，我缺。</p>
    </div>
    <h3 class="mt-lg">我拒绝的"选项"：</h3>
    <div class="grid4 mt">
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>死刑</strong></p>
        <p class="small secondary">我不知道死亡是好是坏</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>监禁</strong></p>
        <p class="small secondary">做监狱的奴隶？</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>流放</strong></p>
        <p class="small secondary">别处也容不下我</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>沉默</strong></p>
        <p class="small secondary">那不叫活着</p>
      </div>
    </div>
    <div class="card card-green mt center">
      <p>💰 <strong>最终提议：30弥那罚款</strong>（柏拉图、克里托等朋友们担保）</p>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 16: 未经审视的人生 ==================== -->
<div class="slide" data-notes="这是西方哲学史上最著名的格言之一。苏格拉底用它来解释为什么他不可能选择沉默——对他来说，不思考等于不活着。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <div style="font-size:56px; margin-bottom:16px;">💡</div>
    <div style="font-size:40px; font-weight:900; line-height:1.5; max-width:800px;">
      未经审视的人生<br>不值得过。
    </div>
    <div class="mt" style="font-size:16px; color: var(--text2); font-style:italic; letter-spacing: 1px;">
      ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ
    </div>
    <div class="card card-yellow mt-lg" style="max-width:700px; text-align:left;">
      <p>🗣️ 每天谈论美德、审视自己和他人——<strong>这是人最大的善</strong>。</p>
      <p class="mt">让我闭嘴？不可能。这就像让鱼离开水。</p>
    </div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange" style="font-size:14px; padding:6px 16px;">哲学史最强金句</span>
      <span class="badge badge-teal" style="font-size:14px; padding:6px 16px;">2400年后仍在引用</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 17: 判决：死刑 ==================== -->
<div class="slide" data-notes="第二次投票，支持死刑的人反而比第一次判有罪的更多。苏格拉底的'傲慢'量刑建议激怒了很多本来同情他的陪审员。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <span class="badge badge-coral" style="font-size:16px; padding: 8px 24px;">Part II 结束</span>
    <h1 class="mt-lg" style="font-size:64px; color: var(--coral);">☠️ 判决：死刑</h1>
    <div class="card card-rose mt-lg" style="max-width:600px;">
      <p>第二次投票中，判死刑的票数比判有罪时<strong>反而更多</strong>。</p>
      <p class="small secondary mt">我的"免费用餐"建议显然惹恼了一些人。但我不后悔。</p>
    </div>
    <div class="mt-lg">
      <span class="badge badge-purple" style="font-size:16px; padding: 8px 24px;">进入 Part III → 最后的话</span>
    </div>
    <svg width="120" height="3" class="mt-lg"><line x1="0" y1="1.5" x2="120" y2="1.5" stroke="var(--coral)" stroke-width="2" stroke-dasharray="6,4"/></svg>
    <p class="secondary mt" style="font-size:14px;">方式：饮下毒芹汁（因等候宗教节日推迟约30天执行）</p>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 18: 致判我死刑的人 ==================== -->
<div class="slide" data-notes="苏格拉底的最后演说分两部分——先对投票判他死刑的人说，再对投无罪票的人说。这一页是前者，语气从容但带有预言的力量。">
  <div class="slide-inner">
    <h2>🏃 致判我死刑的人</h2>
    <div class="big-quote" style="font-size:24px;">
      我宁愿以我的方式说话而死，<br>也不愿以你们的方式说话而活。
    </div>
    <div class="grid2 mt">
      <div class="card card-blue card-border-left card-border-blue">
        <h3>🏃 赛跑比喻</h3>
        <p><strong>不义</strong>比死亡跑得更快。</p>
        <p class="mt">死亡追上了我这个老头——这不难。</p>
        <p class="mt" style="color:var(--coral);"><strong>但不义追上了你们——这才可怕。</strong></p>
      </div>
      <div class="card card-rose card-border-left card-border-coral">
        <h3>🔮 预言</h3>
        <p>我死后，<strong>更多更年轻的人</strong>会来质问你们。</p>
        <p class="mt">杀人堵不住嘴。</p>
        <p class="mt" style="color:var(--teal);"><strong>改善自己吧——这才是唯一的出路。</strong></p>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 19: 论死亡 ==================== -->
<div class="slide" data-notes="苏格拉底对死亡的两种可能性的分析是整部《申辩》最温柔的部分。他用逻辑把恐惧化解为好奇——无论哪种情况，死亡都不是坏事。">
  <div class="slide-inner">
    <h2>💤 论死亡</h2>
    <div class="callout mt">
      <span class="icon">🤫</span>
      <div>我的<strong>神灵之声</strong>今天全程沉默——它通常会阻止我做错事。所以今天发生的一切，<strong>一定是件好事</strong>。</div>
    </div>
    <h3 class="mt-lg">死亡的两种可能：</h3>
    <div class="grid2 mt">
      <div class="card card-blue" style="min-height:200px;">
        <div style="font-size:42px; text-align:center;">😴</div>
        <h3 class="center">无梦之眠</h3>
        <p>永恒不过是一个安详的夜晚。</p>
        <div class="quote-card" style="font-size:14px; padding:12px 16px; margin-top:12px;">
          波斯大王数遍自己的一生，都找不出几个这样无梦的好觉。
        </div>
        <div class="center mt"><span class="badge badge-blue">赚了</span></div>
      </div>
      <div class="card card-yellow" style="min-height:200px;">
        <div style="font-size:42px; text-align:center;">✨</div>
        <h3 class="center">灵魂迁徙</h3>
        <p>去另一个世界——遇见<strong>荷马</strong>！<strong>赫西俄德</strong>！<strong>奥德修斯</strong>！</p>
        <p class="mt">还能继续提问——</p>
        <p style="color:var(--teal);"><strong>最棒的是，那边不会因为提问就判死刑。</strong></p>
        <div class="center mt"><span class="badge badge-yellow">更赚了</span></div>
      </div>
    </div>
    <div class="card card-green mt center">
      <strong>结论：无论哪种情况，死亡都不是坏事。</strong> 所以，请别替我悲伤。
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 20: 最后的话 ==================== -->
<div class="slide" data-notes="苏格拉底的最后遗言。他没有绝望，没有愤怒，只是平静地托付了自己的孩子。最后那句'哪一个更好，只有神知道'是完美的收束。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🕊️ 最后的话</h2>
    <div class="big-quote" style="font-size:24px; background: linear-gradient(135deg, var(--green), var(--blue));">
      好人无论生死<br>都不会遭受真正的恶。<br>神不会忽视他的事。
    </div>
    <div class="card card-yellow mt" style="max-width:700px;">
      <p>🙏 <strong>我的最后请求：</strong></p>
      <p class="mt">等我儿子长大了，如果他们追逐金钱而忽视美德，如果他们自以为了不起——</p>
      <p class="mt" style="color:var(--orange);"><strong>请像我折磨你们一样折磨他们。</strong></p>
    </div>
    <div class="mt-lg" style="max-width:700px;">
      <div style="font-size:28px; font-weight:900; line-height:1.8; text-align:center; padding: 24px; background: linear-gradient(135deg, var(--yellow), var(--rose)); border-radius: 20px;">
        离别的时刻已经到来。<br>
        我去赴死，你们去生活。<br>
        <span style="color:var(--teal);">哪一个更好，只有神知道。</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 21: 谢谢 ==================== -->
<div class="slide" data-notes="感谢大家的聆听。苏格拉底的申辩是人类思想史上最动人的文献之一。两千四百年后的今天，他的问题依然值得我们每个人思考。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <div style="font-size:72px; margin-bottom:16px;">🙏</div>
    <h1 style="font-size:48px;">谢谢</h1>
    <p class="secondary mt" style="font-size:18px;">Thank You</p>
    <svg width="80" height="3" class="mt"><line x1="0" y1="1.5" x2="80" y2="1.5" stroke="var(--orange)" stroke-width="2"/></svg>
    <div class="quote-card mt-lg" style="max-width:600px; text-align:left; font-size:16px;">
      我知道我一无所知。<br>
      <span class="small secondary" style="font-style:italic;">— 苏格拉底 (c. 470–399 BC)</span>
    </div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange">📖 柏拉图记录</span>
      <span class="badge badge-teal">🏛️ 雅典 399 BC</span>
      <span class="badge badge-blue">🦉 哲学永恒</span>
    </div>
    <p class="small secondary mt-lg">按 N 查看演讲笔记 · 按 ←→ 或点击按钮翻页 · 按 F 全屏</p>
    <div class="speaker-notes"></div>
  </div>
</div>

</div><!-- /deck -->

<!-- ============ CONTROLS ============ -->
<div class="controls">
  <button class="outline" onclick="goTo(0)" title="第一页">⏮</button>
  <button onclick="prev()" title="上一页">← 上一页</button>
  <button onclick="next()" title="下一页">下一页 →</button>
  <button class="outline" onclick="goTo(totalSlides-1)" title="最后一页">⏭</button>
  <button class="outline" onclick="toggleNotes()" title="演讲笔记 (N)">🎙</button>
  <button class="outline" onclick="toggleFullscreen()" title="全屏 (F)">⛶</button>
</div>

<script>
// ============ SLIDE ENGINE ============
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let current = 0;
let notesVisible = false;

function showSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  current = Math.max(0, Math.min(n, totalSlides - 1));
  slides[current].classList.add('active');
  document.getElementById('slideNum').textContent = (current + 1) + ' / ' + totalSlides;
  document.getElementById('progressBar').style.width = ((current + 1) / totalSlides * 100) + '%';
  // Update hash
  history.replaceState(null, '', '#' + (current + 1));
}

function next() { showSlide(current + 1); }
function prev() { showSlide(current - 1); }
function goTo(n) { showSlide(n); }

function toggleNotes() {
  notesVisible = !notesVisible;
  document.querySelectorAll('.speaker-notes').forEach(n => {
    n.classList.toggle('show', notesVisible);
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Populate speaker notes from data attribute
slides.forEach(slide => {
  const note = slide.getAttribute('data-notes');
  const noteEl = slide.querySelector('.speaker-notes');
  if (note && noteEl) {
    noteEl.textContent = note;
    // Re-add the ::before pseudo via keeping the element
  }
});

// Keyboard
document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
      e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
      e.preventDefault(); prev(); break;
    case 'Home': e.preventDefault(); goTo(0); break;
    case 'End': e.preventDefault(); goTo(totalSlides - 1); break;
    case 'n': case 'N': toggleNotes(); break;
    case 'f': case 'F': if(!e.ctrlKey && !e.metaKey) toggleFullscreen(); break;
  }
});

// Touch / swipe
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
});

// Hash navigation
function initFromHash() {
  const hash = parseInt(location.hash.replace('#', ''));
  if (hash >= 1 && hash <= totalSlides) { showSlide(hash - 1); }
  else { showSlide(0); }
}
initFromHash();
</script>
</body>
</html>

=== FILE: .claude/skills/presentation-skill/docs/ted-talk.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底 | TED演讲风</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
<style>
/* ========== RESET & BASE ========== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-dark: #1a1a1a;
  --bg-red: #c0392b;
  --accent: #e62b1e;
  --text-white: #ffffff;
  --text-dark: #1a1a1a;
  --warm-white: #f5f5f5;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html, body {
  font-family: var(--font);
  background: var(--bg-dark);
  color: var(--text-white);
  overflow: hidden;
  height: 100%;
  width: 100%;
}

/* ========== SLIDE ENGINE ========== */
.deck {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.slide {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 100px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
  overflow: hidden;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

.slide.bg-dark {
  background: var(--bg-dark);
}

.slide.bg-red {
  background: var(--bg-red);
}

.slide.bg-spotlight {
  background: radial-gradient(ellipse at 50% 40%, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%);
}

.slide.bg-spotlight-intense {
  background: radial-gradient(ellipse at 50% 45%, #333 0%, #1a1a1a 40%, #0a0a0a 100%);
}

/* ========== TYPOGRAPHY ========== */
.display-huge {
  font-size: clamp(48px, 7vw, 120px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.display-large {
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.display-medium {
  font-size: clamp(28px, 3.5vw, 56px);
  font-weight: 900;
  line-height: 1.1;
}

.body-text {
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 300;
  line-height: 1.7;
}

.body-large {
  font-size: clamp(18px, 2.2vw, 32px);
  font-weight: 300;
  line-height: 1.6;
}

.small-text {
  font-size: clamp(12px, 1.2vw, 18px);
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.6;
}

.stat-number {
  font-size: clamp(80px, 12vw, 180px);
  font-weight: 900;
  line-height: 1;
  color: var(--accent);
}

/* ========== DECORATIVE ========== */
.red-underline {
  border-bottom: 4px solid var(--accent);
  padding-bottom: 4px;
  display: inline;
}

.red-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--accent);
}

.red-bar-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: var(--accent);
}

.red-quote {
  color: var(--accent);
  font-size: 1.5em;
  font-weight: 900;
  vertical-align: top;
  line-height: 0.8;
}

.divider {
  width: 80px;
  height: 4px;
  background: var(--accent);
  margin: 24px 0;
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.max-w { max-width: 900px; }
.max-w-wide { max-width: 1100px; }
.mt-sm { margin-top: 16px; }
.mt-md { margin-top: 32px; }
.mt-lg { margin-top: 48px; }
.mb-sm { margin-bottom: 16px; }
.mb-md { margin-bottom: 32px; }
.op-50 { opacity: 0.5; }
.op-70 { opacity: 0.7; }

/* Animated elements */
.slide .fade-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide.active .fade-item {
  opacity: 1;
  transform: translateY(0);
}

.slide.active .fade-item:nth-child(1) { transition-delay: 0.1s; }
.slide.active .fade-item:nth-child(2) { transition-delay: 0.3s; }
.slide.active .fade-item:nth-child(3) { transition-delay: 0.5s; }
.slide.active .fade-item:nth-child(4) { transition-delay: 0.7s; }
.slide.active .fade-item:nth-child(5) { transition-delay: 0.9s; }
.slide.active .fade-item:nth-child(6) { transition-delay: 1.1s; }

/* Three-column stats */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1100px;
}

.stat-card {
  text-align: center;
  padding: 30px 20px;
  border-left: 3px solid var(--accent);
}

.stat-card .label {
  font-size: clamp(20px, 2.5vw, 36px);
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--accent);
}

.stat-card .desc {
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.85;
}

/* Two-column split */
.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
  max-width: 1000px;
}

.split-card {
  padding: 30px;
  border-top: 4px solid var(--accent);
}

.split-card h3 {
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
  margin-bottom: 16px;
}

.split-card p {
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 300;
  line-height: 1.6;
  opacity: 0.85;
}

/* SVG icons */
.icon-container {
  margin-bottom: 30px;
}

.icon-container svg {
  width: 80px;
  height: 80px;
  stroke: var(--text-white);
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-container.large svg {
  width: 120px;
  height: 120px;
}

/* ========== NAV ========== */
.nav {
  position: fixed;
  bottom: 24px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 100;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.nav:hover { opacity: 1; }

.nav button {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.nav button:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.slide-counter {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  font-variant-numeric: tabular-nums;
}

/* Progress bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  transition: width 0.4s ease;
  z-index: 200;
}

/* Speaker notes toggle */
.notes-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.95);
  color: rgba(255,255,255,0.8);
  padding: 20px 40px;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 150;
  border-top: 2px solid var(--accent);
  max-height: 30vh;
  overflow-y: auto;
}

.notes-panel.visible {
  transform: translateY(0);
}

.notes-panel .notes-title {
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ========== PRINT CSS ========== */
@media print {
  .deck { height: auto; overflow: visible; }
  .slide {
    position: relative !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    page-break-after: always;
    page-break-inside: avoid;
    height: 100vh;
    min-height: 100vh;
  }
  .nav, .progress-bar, .notes-panel { display: none !important; }
  @page {
    size: 16in 9in landscape;
    margin: 0;
  }
}

/* ========== 16:9 ASPECT RATIO ========== */
@media (max-aspect-ratio: 16/9) {
  .slide { padding: 40px 60px; }
}
</style>
</head>
<body>

<div class="progress-bar" id="progressBar"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide bg-spotlight active" data-notes="（深呼吸）欢迎各位。我是苏格拉底。一个石匠的儿子，一个助产士的儿子。今天，我要在这里做我人生中最后一次演讲。不是因为我选择了这个舞台——而是因为501个人把我推到了这里。">
  <div class="text-center max-w">
    <div class="fade-item small-text mb-md" style="letter-spacing:0.3em; text-transform:uppercase;">A Final Talk</div>
    <div class="fade-item display-huge mb-md">我的申辩</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large op-70">苏格拉底 &nbsp;|&nbsp; 雅典 · 公元前399年</div>
    <div class="fade-item small-text mt-md" style="opacity:0.4; font-style:italic;">"一个70岁老人的最后演讲"</div>
  </div>
  <div class="red-bar"></div>
</div>

<!-- ==================== SLIDE 2: Hook ==================== -->
<div class="slide bg-dark" data-notes="开场要一击命中。不要解释背景，不要铺垫。直接说出最戏剧性的事实：我从来没上过法庭，但今天要决定我的生死。让观众的心跳漏一拍。">
  <div class="text-center max-w">
    <div class="fade-item display-large" style="margin-bottom:48px;">今天，我第一次走进法庭。</div>
    <div class="fade-item body-large op-70">我70岁了。从未打过官司。<br>但今天，<span class="red-underline">501个人要决定我的生死</span>。</div>
  </div>
</div>

<!-- ==================== SLIDE 3: The accusation ==================== -->
<div class="slide bg-dark" data-notes="两项指控听起来很严重，但我要告诉你们真正的原因——不是什么腐蚀青年、不信神。真正的原因是：我让太多有权势的人在公众面前丢了脸。权力最怕的不是反抗，是被揭穿。">
  <div class="text-center max-w">
    <div class="fade-item stat-number mb-sm">2</div>
    <div class="fade-item display-medium mb-md">两项指控</div>
    <div class="fade-item" style="display:flex; gap:60px; justify-content:center; margin-bottom:40px;">
      <div class="body-large" style="border-left:3px solid var(--accent); padding-left:20px;">① 腐蚀青年</div>
      <div class="body-large" style="border-left:3px solid var(--accent); padding-left:20px;">② 不信城邦之神</div>
    </div>
    <div class="fade-item body-text op-70" style="font-style:italic;">但真正的原因？<span class="red-underline">我说了太多真话。</span></div>
  </div>
</div>

<!-- ==================== SLIDE 4: The invisible enemy ==================== -->
<div class="slide bg-dark" data-notes="阿里斯托芬在《云》里把我写成了一个在天上研究云彩的疯老头。整个雅典都在笑。24年了，谣言比真相跑得快一万倍。今天我对抗的不是三个原告，而是整个城市24年的偏见。这才是最可怕的敌人。">
  <div class="text-center max-w">
    <div class="fade-item icon-container">
      <!-- Theater mask SVG -->
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="38" r="26" />
        <circle cx="30" cy="32" r="5" />
        <circle cx="50" cy="32" r="5" />
        <path d="M30 48 Q40 56 50 48" />
        <path d="M14 28 Q20 12 40 10 Q60 12 66 28" stroke-width="2" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">24年前，一个喜剧作家把我写成了小丑。</div>
    <div class="fade-item body-large mb-md op-70">从那以后，谣言从未停止。</div>
    <div class="fade-item body-large" style="color:var(--accent);">今天我不是在和三个人战斗——<br>我是在和<span class="red-underline">影子</span>战斗。</div>
  </div>
</div>

<!-- ==================== SLIDE 5: The oracle ==================== -->
<div class="slide bg-red" data-notes="（语气变得神秘、庄重）凯勒丰——我最好的朋友，一个热情到有点疯的人——他跑去德尔斐问阿波罗神。神的回答改变了一切。我不敢相信。我，苏格拉底，一个光脚走在雅典街头的老头，怎么可能是最有智慧的人？但神不会说谎。所以我决定去找出这句话的真正含义。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md" style="opacity:0.9;">有一天，我最好的朋友跑去问神：</div>
    <div class="fade-item body-large mb-md" style="font-style:italic; opacity:0.85;">"有没有人比苏格拉底更聪明？"</div>
    <div class="fade-item" style="height:40px;"></div>
    <div class="fade-item display-large mb-md">神说：没有。</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large op-70" style="font-style:italic;">这句话改变了我的一生。</div>
  </div>
  <div class="red-bar-top" style="background:rgba(255,255,255,0.2);"></div>
</div>

<!-- ==================== SLIDE 6: My mission ==================== -->
<div class="slide bg-dark" data-notes="（加速，充满能量）我不信。真的不信。所以我做了一件在当时看来很合理但后来证明很危险的事——我决定证明神是错的。我去找了雅典最有名望的人。政客、诗人、工匠。我和他们对话。我问问题。结果呢？">
  <div class="text-center max-w">
    <div class="fade-item display-medium mb-md">我不相信。</div>
    <div class="fade-item body-large mb-md op-70">所以我决定证明神是错的。</div>
    <div class="fade-item body-large mb-md">我去找了最有权势的人、<br>最有才华的人、最有技术的人。</div>
    <div class="fade-item" style="height:30px;"></div>
    <div class="fade-item display-medium" style="color:var(--accent);">结果——</div>
  </div>
</div>

<!-- ==================== SLIDE 7: What I found ==================== -->
<div class="slide bg-dark" data-notes="（摇头，带着悲伤的幽默）政客们什么都不懂但觉得自己什么都懂。诗人写出了伟大的作品却解释不了自己在写什么——他们靠灵感，不靠理解。工匠确实有真本事，但因为擅长一件事就觉得自己擅长所有事。规律太明显了：名声越大，越不愿意承认自己的无知。">
  <div class="text-center max-w-wide">
    <div class="fade-item stat-grid">
      <div class="stat-card">
        <div class="label">政客</div>
        <div class="desc">自以为无所不知<br><span style="color:var(--accent);">→ 实际一无所知</span></div>
      </div>
      <div class="stat-card">
        <div class="label">诗人</div>
        <div class="desc">靠灵感写作<br><span style="color:var(--accent);">→ 解释不了自己的作品</span></div>
      </div>
      <div class="stat-card">
        <div class="label">工匠</div>
        <div class="desc">手艺精湛<br><span style="color:var(--accent);">→ 但以为自己什么都懂</span></div>
      </div>
    </div>
    <div class="fade-item mt-lg display-medium" style="font-style:italic; opacity:0.7;">名声越大，智慧越少。</div>
  </div>
</div>

<!-- ==================== SLIDE 8: The paradox ==================== -->
<div class="slide bg-spotlight-intense" data-notes="（停顿很长。让这句话悬在空中。）这就是一切的核心。我不是因为知道的多才被神说最有智慧——而是因为我是唯一一个知道自己不知道的人。这听起来像悖论，但这是人类最深刻的真理之一。所有的傲慢、所有的暴政，都始于一个人确信自己绝对正确。">
  <div class="text-center max-w">
    <div class="fade-item display-large" style="line-height:1.2;">
      <span class="red-quote">"</span>我唯一知道的，<br>就是我一无所知。<span class="red-quote">"</span>
    </div>
    <div class="fade-item body-large mt-lg op-70" style="max-width:700px; margin:40px auto 0;">
      这就是为什么神说我最有智慧。<br>不是因为我知道得多——<br>而是因为<span class="red-underline">只有我知道自己不知道</span>。
    </div>
  </div>
</div>

<!-- ==================== SLIDE 9: Why they hate me ==================== -->
<div class="slide bg-dark" data-notes="（语气逐渐加重，像在数罪状一样，但数的是别人的仇恨）每一次揭穿，就多一个敌人。然后年轻人开始模仿我——他们去质问长辈，质问权威。长辈们怒了。但他们不怪自己无知，他们怪我。'苏格拉底腐蚀了我的孩子！'——不，是你的无知暴露了。">
  <div class="text-left max-w" style="padding-left:10%;">
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px;">每次我揭穿一个人——</div>
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px; color:var(--accent);">他就恨我。</div>
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px;">然后你们的孩子开始学我。</div>
    <div class="fade-item body-large" style="border-left:3px solid var(--accent); padding-left:24px; color:var(--accent);">然后更多人恨我。</div>
  </div>
</div>

<!-- ==================== SLIDE 10: The horse trainer ==================== -->
<div class="slide bg-dark" data-notes="（转向讽刺，轻松的语气）美勒托斯站在这里说全雅典都在教育青年，只有我一个人在腐蚀。我就问了一个简单的问题——马。养马的人都知道，不是随便谁都能训好马的，只有专业的驯马师可以。大多数人碰马反而会毁了马。人难道比马简单？一个人腐蚀全城改善——这不荒谬吗？">
  <div class="text-center max-w">
    <div class="fade-item icon-container">
      <!-- Horse SVG -->
      <svg viewBox="0 0 80 80">
        <path d="M15 55 L20 35 Q25 20 35 18 L40 10 L42 18 Q50 16 55 22 L60 20 L58 28 Q65 35 63 45 L65 55" />
        <line x1="25" y1="55" x2="22" y2="72" />
        <line x1="35" y1="55" x2="33" y2="72" />
        <line x1="52" y1="55" x2="50" y2="72" />
        <line x1="60" y1="55" x2="58" y2="72" />
        <circle cx="52" cy="24" r="2" fill="white" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">美勒托斯说整个雅典都在改善青年，只有我在腐蚀。</div>
    <div class="fade-item body-text mb-md op-70">我问他：马呢？<br>是所有人都能训好马，还是只有专业驯马师？</div>
    <div class="fade-item body-text mb-md op-50">他答不上来了。</div>
    <div class="fade-item body-large" style="color:var(--accent); font-weight:700;">一个人腐蚀，全城改善？荒谬。</div>
  </div>
</div>

<!-- ==================== SLIDE 11: The logic trap ==================== -->
<div class="slide bg-dark" data-notes="（像律师一样锐利）美勒托斯在控告书里亲手写的：苏格拉底信奉'神灵之事'。同时又控告我不信神。你不能同时说一个人信神灵的事又不信神——这就像说骡子存在但马和驴不存在。逻辑上完全不成立。这不是审判，这是一场闹剧。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md">你的控告书说我<span class="red-underline">"信奉神灵之事"</span>。</div>
    <div class="fade-item body-large mb-md">同时又说我<span class="red-underline">不信神</span>。</div>
    <div class="fade-item body-text mb-md op-70" style="font-style:italic;">美勒托斯，这就像说——<br>骡子存在，但马和驴不存在。</div>
    <div class="fade-item display-medium mt-md" style="color:var(--accent);">自相矛盾。</div>
  </div>
</div>

<!-- ==================== SLIDE 12: The gadfly ==================== -->
<div class="slide bg-red" data-notes="（声音变得庄严，像在宣读使命）这是我最重要的比喻。雅典是一匹好马——高贵、强壮、但因为太大太舒服而变得迟钝懒惰。神派我来当一只牛虻——不停地叮它，让它保持清醒。你们当然可以一巴掌拍死我。但之后呢？你们会继续沉睡。神不会再轻易派来第二只牛虻了。">
  <div class="text-center max-w">
    <div class="fade-item icon-container large">
      <!-- Gadfly SVG -->
      <svg viewBox="0 0 120 120">
        <ellipse cx="60" cy="60" rx="20" ry="12" />
        <ellipse cx="60" cy="55" rx="8" ry="6" />
        <path d="M40 52 Q25 35 30 25" />
        <path d="M80 52 Q95 35 90 25" />
        <path d="M40 58 Q20 50 15 42" />
        <path d="M80 58 Q100 50 105 42" />
        <line x1="55" y1="49" x2="50" y2="40" />
        <line x1="65" y1="49" x2="70" y2="40" />
        <line x1="60" y1="72" x2="60" y2="85" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">雅典是一匹高贵的骏马。<br>体型庞大，行动迟缓。</div>
    <div class="fade-item display-medium mb-md">我是神派来叮它的牛虻。</div>
    <div class="fade-item body-large mb-sm op-70">你们可以拍死我。</div>
    <div class="fade-item body-large" style="font-weight:700;">但之后——谁来叫醒你们？</div>
  </div>
</div>

<!-- ==================== SLIDE 13: Two acts of courage ==================== -->
<div class="slide bg-dark" data-notes="（坚定、自豪但不炫耀）两次。两次我用行动证明了我不是只会说。民主政体下，所有人投票要处死十位将军——违法的。我是唯一一个投反对票的人。暴政下，三十僭主命令我去抓人。我转身回家了。无论什么制度，无论谁掌权，我只听一个声音——正义。">
  <div class="text-center max-w-wide">
    <div class="fade-item display-medium mb-lg">两次勇气</div>
    <div class="fade-item split-grid">
      <div class="split-card">
        <h3>民主之下</h3>
        <p>所有人都说处死将军。<br><strong style="color:var(--accent);">我一个人说不。</strong></p>
      </div>
      <div class="split-card">
        <h3>暴政之下</h3>
        <p>命令我去抓人。<br><strong style="color:var(--accent);">我回家了。</strong></p>
      </div>
    </div>
    <div class="fade-item body-large mt-lg op-70" style="font-style:italic;">无论什么制度，我只听正义的。</div>
  </div>
</div>

<!-- ==================== SLIDE 14: I will not beg ==================== -->
<div class="slide bg-dark" data-notes="（克制的情感，眼中有泪但声音不抖）我有三个儿子。最小的还很小。我完全可以把他们带到这里，让他们哭，让他们跪——陪审团一定会心软。很多人就是这么做的。但我不会。因为你们宣了誓——依法审判。法庭不是施舍同情的地方。我尊重你们的誓言，即使你们自己不尊重。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md">我有三个儿子。</div>
    <div class="fade-item body-large mb-md op-70">但我不会把他们带来哭给你们看。</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large">因为你们宣誓<span class="red-underline">依法审判</span>——<br>不是施舍同情。</div>
  </div>
</div>

<!-- ==================== SLIDE 15: GUILTY ==================== -->
<div class="slide bg-red" data-notes="（沉默。长沉默。然后平静地说）有罪。差30票。如果30个人改变主意——我就无罪。30个人。在501人中。这说明什么？说明今天的审判从一开始就不是关于证据的。是关于情绪的。关于24年累积的偏见。">
  <div class="text-center">
    <div class="fade-item display-huge" style="font-size:clamp(80px,15vw,200px); letter-spacing:0.1em;">有罪</div>
    <div class="fade-item body-large mt-lg op-70">30票之差。</div>
  </div>
</div>

<!-- ==================== SLIDE 16: My "punishment" ==================== -->
<div class="slide bg-dark" data-notes="（苦笑，带着挑衅的幽默）你们问我觉得自己该受什么罚？好吧。我认真想了想。我一辈子放弃赚钱的机会，穷到今天还得朋友帮忙凑罚款，就为了让你们变得更好。所以我的刑罚应该是——在普利坦尼昂免费吃饭。像奥运冠军一样。因为冠军给你们幸福的假象，我给你们真正的清醒。至于罚款——30弥那，朋友们替我出了。我自己？身无分文。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md" style="opacity:0.6;">你们问我该受什么罚？</div>
    <div class="fade-item display-medium mb-md" style="line-height:1.3;">我的建议：<span style="color:var(--accent);">免费吃饭。</span></div>
    <div class="fade-item body-large mb-md op-70">在公共食堂。像奥林匹亚冠军一样。</div>
    <div class="fade-item body-text op-70" style="font-style:italic;">因为冠军给你们幸福的假象——<br>我给你们<span class="red-underline">真的</span>。</div>
    <div class="fade-item small-text mt-lg" style="opacity:0.4;">最终罚金：30弥那。朋友们替我出的。</div>
  </div>
</div>

<!-- ==================== SLIDE 17: THE quote ==================== -->
<div class="slide bg-spotlight-intense" data-notes="（这是最重要的一句话。说得很慢，每一个字都像石头一样掷出去。让它在大厅里回响。）未经审视的人生不值得过。这不是一句鸡汤。这是我用一生——现在，用我的死——换来的真理。如果你今天只记住一句话，请记住这一句。">
  <div class="text-center">
    <div class="fade-item" style="margin-bottom:20px;">
      <span class="red-quote" style="font-size:clamp(40px,6vw,100px);">"</span>
    </div>
    <div class="fade-item display-huge" style="margin-bottom:16px;">未经审视的人生</div>
    <div class="fade-item display-huge" style="color:var(--accent);">不值得过。</div>
    <div class="fade-item" style="margin-top:20px;">
      <span class="red-quote" style="font-size:clamp(40px,6vw,100px);">"</span>
    </div>
    <div class="fade-item small-text mt-md" style="opacity:0.3; font-style:italic;">ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</div>
  </div>
</div>

<!-- ==================== SLIDE 18: DEATH ==================== -->
<div class="slide bg-red" data-notes="（声音没有颤抖。平静。这就是他们的决定。）死刑。他们选择了最重的惩罚。但请注意——我没有求饶，没有逃跑，没有假装忏悔。我站着接受了判决。不是因为我认为他们是对的。而是因为逃跑意味着承认我做错了。我没有。">
  <div class="text-center">
    <div class="fade-item display-huge" style="font-size:clamp(100px,18vw,260px); letter-spacing:0.15em;">死刑</div>
  </div>
</div>

<!-- ==================== SLIDE 19: To my condemners ==================== -->
<div class="slide bg-dark" data-notes="（对着判我有罪的人，但没有愤怒，是一种超越的慈悲）你们以为杀了我就安静了？不。我死后会有更多年轻人站出来质问你们。他们比我年轻，比我无情，比我更不会给你们面子。封住一个人的嘴，不如反省自己的灵魂。这是我给你们的最后忠告。">
  <div class="text-left max-w" style="padding-left:5%;">
    <div class="fade-item body-large mb-md">我不怕死。我怕的是<span class="red-underline">不义</span>。</div>
    <div class="fade-item body-large mb-md op-70">不义比死亡跑得更快。<br>死亡追上了我——不义追上了你们。</div>
    <div class="fade-item divider"></div>
    <div class="fade-item body-large mb-md">我死后，更多人会来质问你们。<br>他们更年轻，更无情。</div>
    <div class="fade-item body-large" style="color:var(--accent); font-weight:700;">杀人堵不住嘴。改善自己吧。</div>
  </div>
</div>

<!-- ==================== SLIDE 20: On death ==================== -->
<div class="slide bg-dark" data-notes="（语气变得温暖、哲学性的，甚至有些调皮）死亡是什么？只有两种可能。第一种：什么都没有。像一场无梦的深眠。你告诉我——你人生中睡得最好的那一晚是不是什么梦都没做？如果永恒不过就是这样一个好觉——那简直赚了。第二种呢？灵魂去了另一个地方。我能遇见荷马！遇见赫西俄德！我可以继续问问题！而且最棒的是——那里不会因为你提问就判你死刑。（笑）">
  <div class="text-center max-w-wide">
    <div class="fade-item display-medium mb-lg">两种可能——</div>
    <div class="fade-item split-grid">
      <div class="split-card" style="text-align:center;">
        <h3 style="font-size:clamp(28px,3vw,48px); margin-bottom:20px;">无梦的长眠</h3>
        <p>永恒不过是一个好觉。<br><br><strong style="color:var(--accent); font-size:1.2em;">赚了。</strong></p>
      </div>
      <div class="split-card" style="text-align:center;">
        <h3 style="font-size:clamp(28px,3vw,48px); margin-bottom:20px;">灵魂的旅行</h3>
        <p>遇见荷马！继续提问！<br><br><strong style="color:var(--accent); font-size:1.2em;">而且——那边不会因为提问就判死刑。</strong></p>
      </div>
    </div>
  </div>
</div>

<!-- ==================== SLIDE 21: Farewell ==================== -->
<div class="slide bg-spotlight" data-notes="（最后一次面对所有人。声音平静如水。一个用一生追求真理的人，在死亡面前的平静不是装出来的——是真正活明白了。）好人不会遭受真正的恶。无论生死。这是我最后说的话。然后我转身离开。走向监狱。走向那杯毒堇汁。你们继续生活。哪一个更好？我不知道。你们也不知道。只有神知道。这就是人的处境。谢谢。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-lg op-70">好人无论生死都不会遭受真正的恶。</div>
    <div class="fade-item display-large" style="line-height:1.2; margin-bottom:32px;">
      离别的时刻已经到来。<br>
      我去赴死，你们去生活。
    </div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large" style="color:var(--accent); font-style:italic;">
      <span class="red-underline">哪一个更好，只有神知道。</span>
    </div>
  </div>
  <div class="red-bar"></div>
</div>

</div><!-- /deck -->

<!-- NAV -->
<nav class="nav" id="nav">
  <button id="btnPrev" aria-label="Previous slide">&#9664;</button>
  <span class="slide-counter" id="slideCounter">1 / 21</span>
  <button id="btnNext" aria-label="Next slide">&#9654;</button>
  <button id="btnNotes" aria-label="Toggle notes" style="font-size:12px;">N</button>
</nav>

<!-- NOTES PANEL -->
<div class="notes-panel" id="notesPanel">
  <div class="notes-title">Speaker Notes</div>
  <div id="notesContent"></div>
</div>

<script>
(function() {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;

  const counter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const notesPanel = document.getElementById('notesPanel');
  const notesContent = document.getElementById('notesContent');
  let notesVisible = false;

  function go(index) {
    if (index < 0 || index >= total) return;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + total;
    progressBar.style.width = ((current + 1) / total * 100) + '%';
    // Update notes
    const note = slides[current].getAttribute('data-notes') || '';
    notesContent.textContent = note;
  }

  function next() { go(current + 1); }
  function prev() { go(current - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(total - 1); break;
      case 'n':
      case 'N':
        notesVisible = !notesVisible;
        notesPanel.classList.toggle('visible', notesVisible);
        break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(()=>{});
        } else {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Click nav
  document.getElementById('btnNext').addEventListener('click', next);
  document.getElementById('btnPrev').addEventListener('click', prev);
  document.getElementById('btnNotes').addEventListener('click', function() {
    notesVisible = !notesVisible;
    notesPanel.classList.toggle('visible', notesVisible);
  });

  // Touch swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }
  }, { passive: true });

  // Init
  go(0);
})();
</script>

</body>
</html>


### 示例（examples/）


=== FILE: .claude/skills/presentation-skill/examples/chinese-ink.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底 · 水墨中国风</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
/* ========== RESET & BASE ========== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --rice-paper: #f7f3eb;
  --rice-paper-text: #f0ead6;
  --ink-black: #1a1a18;
  --vermillion: #c23b22;
  --indigo: #2c4a6e;
  --gold: #b8860b;
  --diluted-ink: #6b6355;
  --font-display: 'Noto Serif SC', 'Songti SC', serif;
  --font-body: 'Noto Sans SC', 'PingFang SC', sans-serif;
}

html { font-size: 16px; }

body {
  font-family: var(--font-body);
  background: var(--ink-black);
  color: var(--ink-black);
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ========== PAPER TEXTURE ========== */
.paper-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

.paper-texture-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  pointer-events: none;
  z-index: 1;
}

/* ========== SLIDE ENGINE ========== */
.slide-deck {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.slide {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0; left: 0;
  display: none;
  overflow: hidden;
  padding: 60px 80px;
}

.slide.active { display: flex; }

.slide.light {
  background: var(--rice-paper);
  color: var(--ink-black);
}

.slide.dark {
  background: var(--ink-black);
  color: var(--rice-paper-text);
}

.slide.vermillion-bg {
  background: var(--vermillion);
  color: var(--rice-paper-text);
}

/* Ink wash effect on dark slides */
.slide.dark::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(44,74,110,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(26,26,24,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(194,59,34,0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.slide > * { position: relative; z-index: 2; }

/* ========== TYPOGRAPHY ========== */
.display-text {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.05em;
}

.display-xl {
  font-family: var(--font-display);
  font-size: 72px;
  font-weight: 900;
  line-height: 1.3;
}

.display-xxl {
  font-family: var(--font-display);
  font-size: 120px;
  font-weight: 900;
  line-height: 1.1;
}

.body-text {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.9;
  color: var(--ink-black);
}

.body-text.on-dark { color: var(--rice-paper-text); }

.diluted { color: var(--diluted-ink); }
.vermillion { color: var(--vermillion); }
.gold-text { color: var(--gold); }
.indigo-text { color: var(--indigo); }

.spaced-chars { letter-spacing: 0.4em; }

/* ========== VERTICAL TEXT ========== */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--font-display);
}

.vertical-sidebar {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: 0.3em;
  opacity: 0.3;
  z-index: 2;
}

.vertical-sidebar.left {
  right: auto;
  left: 40px;
}

.vertical-sidebar.on-dark { color: var(--rice-paper-text); }

/* ========== SVG COMPONENTS ========== */

/* Seal stamp */
.seal-stamp {
  position: absolute;
  bottom: 50px;
  right: 60px;
  z-index: 10;
}

/* Ink mountains */
.ink-mountains {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  opacity: 0.5;
}

.ink-mountains.higher { opacity: 0.25; }

/* Enso circle */
.enso-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== BRUSH STROKE DIVIDER ========== */
.brush-divider {
  width: 200px;
  height: 8px;
  margin: 20px 0;
}

.brush-divider-long {
  width: 400px;
  height: 6px;
  margin: 24px 0;
}

/* ========== HANGING SCROLL ========== */
.hanging-scroll {
  background: rgba(247,243,235,0.06);
  border: 1px solid rgba(240,234,214,0.1);
  border-radius: 3px;
  padding: 32px 28px;
  position: relative;
}

.hanging-scroll::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--vermillion), var(--vermillion), transparent);
  border-radius: 2px;
}

.hanging-scroll.on-light {
  background: rgba(26,26,24,0.03);
  border: 1px solid rgba(26,26,24,0.08);
}

.hanging-scroll.on-light::before {
  background: linear-gradient(90deg, transparent, var(--vermillion), var(--vermillion), transparent);
}

/* ========== CARDS ========== */
.ink-card {
  background: rgba(247,243,235,0.05);
  border: 1px solid rgba(240,234,214,0.08);
  border-radius: 3px;
  padding: 28px 24px;
  position: relative;
}

.ink-card.on-light {
  background: rgba(26,26,24,0.02);
  border: 1px solid rgba(26,26,24,0.08);
  box-shadow: 0 2px 12px rgba(26,26,24,0.04);
}

.ink-card .card-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  display: block;
}

/* ========== INK SPLASH ========== */
.ink-splash {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(26,26,24,0.06) 0%, rgba(26,26,24,0.02) 30%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.ink-splash.dark-splash {
  background: radial-gradient(ellipse at center, rgba(240,234,214,0.04) 0%, rgba(240,234,214,0.01) 30%, transparent 70%);
}

/* ========== QUOTE BLOCK ========== */
.quote-block {
  border-left: 3px solid var(--vermillion);
  padding-left: 24px;
  margin: 16px 0;
}

/* ========== DOT MARKERS ========== */
.seal-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--vermillion);
  border-radius: 1px;
  margin-right: 10px;
  vertical-align: middle;
}

/* ========== LOGIC FLOW ========== */
.logic-flow {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--font-display);
  font-size: 18px;
}

.logic-flow .arrow { opacity: 0.4; }

/* ========== NAVIGATION ========== */
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(128,128,128,0.15);
  z-index: 1000;
}

.nav-progress {
  height: 100%;
  background: var(--vermillion);
  transition: width 0.4s ease;
}

.slide-counter {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(128,128,128,0.5);
  z-index: 1000;
}

/* ========== SPEAKER NOTES ========== */
.speaker-notes {
  display: none;
}

.show-notes .speaker-notes {
  display: block;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  max-height: 180px;
  overflow-y: auto;
  background: rgba(26,26,24,0.92);
  color: var(--rice-paper-text);
  padding: 20px 28px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.8;
  z-index: 999;
  backdrop-filter: blur(8px);
}

/* ========== ANIMATIONS ========== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes brushIn {
  from { transform: scaleX(0); transform-origin: left; }
  to { transform: scaleX(1); transform-origin: left; }
}

.slide.active .anim-fade { animation: fadeIn 0.8s ease both; }
.slide.active .anim-up { animation: fadeInUp 0.7s ease both; }
.slide.active .anim-up-d1 { animation: fadeInUp 0.7s ease 0.15s both; }
.slide.active .anim-up-d2 { animation: fadeInUp 0.7s ease 0.3s both; }
.slide.active .anim-up-d3 { animation: fadeInUp 0.7s ease 0.45s both; }
.slide.active .anim-up-d4 { animation: fadeInUp 0.7s ease 0.6s both; }
.slide.active .anim-up-d5 { animation: fadeInUp 0.7s ease 0.75s both; }

/* ========== PRINT CSS ========== */
@media print {
  body { overflow: visible; background: white; }
  .slide {
    display: flex !important;
    position: relative !important;
    page-break-after: always;
    height: auto;
    min-height: 100vh;
  }
  .nav-bar, .nav-progress, .slide-counter { display: none !important; }
  .speaker-notes { display: none !important; }
  .ink-mountains { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}

/* ========== LAYOUT HELPERS ========== */
.flex-col { display: flex; flex-direction: column; }
.flex-row { display: flex; flex-direction: row; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-1 { flex: 1; }
.gap-16 { gap: 16px; }
.gap-24 { gap: 24px; }
.gap-32 { gap: 32px; }
.gap-40 { gap: 40px; }
.gap-48 { gap: 48px; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.text-center { text-align: center; }
.relative { position: relative; }
.mt-8 { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.ml-auto { margin-left: auto; }
</style>
</head>
<body>

<!-- ========== SVG DEFINITIONS ========== -->
<svg style="position:absolute;width:0;height:0" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Seal Stamp -->
  <symbol id="seal-stamp" viewBox="0 0 80 80">
    <rect x="2" y="2" width="76" height="76" rx="2" fill="none" stroke="#c23b22" stroke-width="3"/>
    <rect x="6" y="6" width="68" height="68" rx="1" fill="#c23b22" opacity="0.9"/>
    <text x="40" y="30" text-anchor="middle" fill="#f0ead6" font-family="Noto Serif SC, serif" font-size="16" font-weight="700">苏格拉底</text>
    <text x="40" y="52" text-anchor="middle" fill="#f0ead6" font-family="Noto Serif SC, serif" font-size="16" font-weight="700">之印</text>
    <!-- Border decoration -->
    <line x1="14" y1="10" x2="66" y2="10" stroke="#f0ead6" stroke-width="0.5" opacity="0.4"/>
    <line x1="14" y1="70" x2="66" y2="70" stroke="#f0ead6" stroke-width="0.5" opacity="0.4"/>
  </symbol>

  <!-- Ink Mountains -->
  <symbol id="ink-mountains-1" viewBox="0 0 1920 300">
    <path d="M0 300 L0 220 Q120 180 200 200 Q300 140 420 180 Q500 120 600 160 Q720 80 840 140 Q920 100 1000 130 Q1100 60 1200 110 Q1320 50 1440 100 Q1520 70 1600 120 Q1700 90 1800 140 Q1880 120 1920 150 L1920 300 Z" fill="currentColor" opacity="0.4"/>
    <path d="M0 300 L0 250 Q180 220 300 240 Q420 200 540 230 Q660 180 780 220 Q900 160 1020 200 Q1140 170 1260 210 Q1380 180 1500 220 Q1620 190 1740 230 Q1840 210 1920 240 L1920 300 Z" fill="currentColor" opacity="0.6"/>
    <path d="M0 300 L0 270 Q240 250 480 265 Q720 240 960 260 Q1200 245 1440 270 Q1680 255 1920 275 L1920 300 Z" fill="currentColor" opacity="0.8"/>
  </symbol>

  <!-- Brush Stroke -->
  <symbol id="brush-stroke" viewBox="0 0 200 8">
    <path d="M0 4 Q10 1 30 3 Q50 6 80 4 Q110 1 140 3 Q160 6 180 4 Q195 2 200 4" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M20 4 Q60 7 100 4 Q140 1 180 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
  </symbol>

  <!-- Brush Stroke Long -->
  <symbol id="brush-stroke-long" viewBox="0 0 400 6">
    <path d="M0 3 Q20 0.5 60 2.5 Q100 5 160 3 Q220 0.5 280 3 Q340 5.5 380 3 Q395 1.5 400 3" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.5"/>
  </symbol>

  <!-- Enso Circle -->
  <symbol id="enso" viewBox="0 0 200 200">
    <path d="M100 15 Q170 15 180 80 Q190 150 120 185 Q50 195 20 130 Q5 80 40 35 Q65 15 95 15" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
    <path d="M95 15 Q93 14 90 16" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.5"/>
  </symbol>

  <!-- Bamboo -->
  <symbol id="bamboo" viewBox="0 0 60 300">
    <line x1="30" y1="0" x2="30" y2="300" stroke="currentColor" stroke-width="2" opacity="0.15"/>
    <line x1="30" y1="60" x2="30" y2="62" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <line x1="30" y1="130" x2="30" y2="132" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <line x1="30" y1="200" x2="30" y2="202" stroke="currentColor" stroke-width="5" opacity="0.2"/>
    <!-- leaves -->
    <path d="M30 55 Q45 35 55 20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <path d="M30 55 Q48 40 60 30" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M30 125 Q15 105 5 90" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
    <path d="M30 125 Q12 110 2 95" stroke="currentColor" stroke-width="1" fill="none" opacity="0.1"/>
    <path d="M30 195 Q45 175 55 160" stroke="currentColor" stroke-width="1" fill="none" opacity="0.12"/>
  </symbol>

  <!-- Plum Blossom -->
  <symbol id="plum-blossom" viewBox="0 0 40 40">
    <circle cx="20" cy="12" r="5" fill="currentColor" opacity="0.12"/>
    <circle cx="12" cy="22" r="5" fill="currentColor" opacity="0.1"/>
    <circle cx="28" cy="22" r="5" fill="currentColor" opacity="0.1"/>
    <circle cx="15" cy="32" r="4" fill="currentColor" opacity="0.08"/>
    <circle cx="25" cy="32" r="4" fill="currentColor" opacity="0.08"/>
    <circle cx="20" cy="22" r="2" fill="var(--vermillion)" opacity="0.2"/>
  </symbol>

  <!-- Horse (ink style) -->
  <symbol id="horse" viewBox="0 0 200 160">
    <path d="M40 120 Q30 90 50 70 Q55 55 50 40 Q52 30 60 25 Q65 20 70 25 Q72 35 68 45 Q75 50 85 55 Q100 50 120 55 Q140 50 155 60 Q165 65 170 80 Q175 95 170 110 Q168 120 160 125" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M85 55 Q80 75 75 95 Q72 110 70 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <path d="M120 55 Q125 75 130 95 Q132 110 135 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <path d="M155 60 Q160 75 155 90 Q152 105 150 125" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
    <!-- tail -->
    <path d="M40 120 Q25 110 15 130 Q10 140 20 145" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
    <!-- mane -->
    <path d="M60 25 Q55 15 60 10" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.3"/>
    <path d="M65 22 Q60 12 63 7" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.25"/>
  </symbol>

  <!-- Gadfly -->
  <symbol id="gadfly" viewBox="0 0 80 60">
    <ellipse cx="40" cy="35" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
    <ellipse cx="40" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.35"/>
    <!-- wings -->
    <ellipse cx="25" cy="25" rx="14" ry="6" fill="currentColor" opacity="0.1" transform="rotate(-20 25 25)"/>
    <ellipse cx="55" cy="25" rx="14" ry="6" fill="currentColor" opacity="0.1" transform="rotate(20 55 25)"/>
    <!-- legs -->
    <line x1="35" y1="42" x2="30" y2="52" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
    <line x1="40" y1="43" x2="40" y2="54" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
    <line x1="45" y1="42" x2="50" y2="52" stroke="currentColor" stroke-width="0.8" opacity="0.2"/>
  </symbol>
</defs>
</svg>

<div class="slide-deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide dark active paper-texture-dark" data-slide="1" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Vertical sidebar right -->
  <div class="vertical-sidebar on-dark" style="font-size:28px;letter-spacing:0.5em;opacity:0.25;right:50px;">申辩篇</div>
  <!-- Bamboo left -->
  <svg style="position:absolute;left:30px;top:0;height:100%;width:60px;color:var(--rice-paper-text)"><use href="#bamboo"/></svg>

  <div class="text-center anim-up" style="z-index:2;">
    <div class="display-xxl spaced-chars" style="color:var(--rice-paper-text);margin-bottom:32px;">我 的 申 辩</div>
    <svg class="brush-divider-long anim-up-d1" style="color:var(--rice-paper-text);margin:0 auto 28px;"><use href="#brush-stroke-long"/></svg>
    <div class="anim-up-d2" style="font-family:var(--font-display);font-size:22px;color:var(--rice-paper-text);letter-spacing:0.3em;opacity:0.7;">苏格拉底 · 致雅典公民法庭</div>
    <div class="anim-up-d3 mt-16" style="font-family:var(--font-body);font-size:15px;color:var(--diluted-ink);letter-spacing:0.2em;">公元前三九九年 · 吾年七十</div>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.12;height:200px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="70" height="70"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】以沉默开场，环顾四方。缓缓开口，如老者回忆往事。这是一个七十岁老人一生中唯一一次走进法庭——他来赴的不是审判，是命运。声音低沉，有岁月的重量。
  </div>
</div>

<!-- ==================== SLIDE 2: 开场 ==================== -->
<div class="slide light paper-texture" data-slide="2" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="vertical-sidebar" style="opacity:0.12;font-size:18px;">开场白</div>

  <svg class="brush-divider anim-up" style="color:var(--ink-black);"><use href="#brush-stroke"/></svg>

  <div class="quote-block anim-up-d1 mt-24" style="max-width:900px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:22px;line-height:2;">雅典的公民们——我的控告者说得天花乱坠，却几乎没说过一句真话。</p>
  </div>

  <p class="body-text anim-up-d2 mt-24" style="max-width:860px;font-size:18px;line-height:2;">他们最可笑的说法是让你们提防我的"雄辩"。我连法庭话术都不会。除非"雄辩"就是"说真话"——那我承认。</p>

  <p class="body-text anim-up-d3 mt-24" style="max-width:860px;font-size:18px;line-height:2;color:var(--diluted-ink);">吾年七十，初登法庭。请以待客之道，容我以素语道真言。</p>

  <!-- Ink splash -->
  <div class="ink-splash" style="right:-50px;top:60px;width:400px;height:400px;"></div>
  <div class="ink-splash" style="left:-80px;bottom:40px;width:250px;height:250px;"></div>

  <div class="speaker-notes">
    【演讲备注】语调平静，近乎自嘲。苏格拉底从一开始就在拆解修辞——他说自己不善言辞，实则这正是最精妙的修辞。停顿让听者思考：什么是真正的雄辩？真话本身即雄辩。七十年来第一次站在这里，老者的谦卑与锋芒并存。
  </div>
</div>

<!-- ==================== SLIDE 3: 明暗之敌 ==================== -->
<div class="slide light paper-texture" data-slide="3" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:36px;margin-bottom:40px;">明暗之敌</div>

  <div class="flex-row gap-40 w-full anim-up-d1" style="max-width:1100px;">
    <!-- 暗敌 scroll -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--indigo);letter-spacing:0.15em;display:block;margin-bottom:16px;">暗 敌</span>
      <p class="body-text" style="font-size:16px;line-height:2;">二十四年来的流言蜚语。阿里斯托芬的《云》。从你们年幼时便已根深蒂固。</p>
      <p class="body-text mt-16" style="font-size:17px;line-height:2;font-family:var(--font-display);color:var(--indigo);">我今日所战者，非三人——<br>乃影也。</p>
    </div>
    <!-- 明敌 scroll -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--vermillion);letter-spacing:0.15em;display:block;margin-bottom:16px;">明 敌</span>
      <p class="body-text" style="font-size:16px;line-height:2;">美勒托斯代表诗人，安尼托斯代表工匠与政客，莱孔代表修辞家。</p>
      <p class="body-text mt-16" style="font-size:17px;line-height:2;font-family:var(--font-display);color:var(--vermillion);">三人者，三怒也。</p>
    </div>
  </div>

  <!-- Plum blossom decorations -->
  <svg style="position:absolute;right:80px;top:80px;width:60px;height:60px;color:var(--ink-black);"><use href="#plum-blossom"/></svg>

  <div class="speaker-notes">
    【演讲备注】此处分辨敌之明暗，是苏格拉底的战略眼光。暗敌比明敌更可怕——二十四年的偏见已成为雅典人的潜意识。他在对抗的不是三个人，而是整座城的无形之墙。声调在说"乃影也"时低沉下来，有千钧之力。
  </div>
</div>

<!-- ==================== SLIDE 4: 神谕 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="4" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Enso circle background -->
  <svg class="anim-fade" style="position:absolute;width:420px;height:420px;color:var(--rice-paper-text);opacity:0.12;"><use href="#enso"/></svg>

  <div style="max-width:700px;text-align:center;z-index:2;">
    <div class="display-text anim-up" style="font-size:32px;color:var(--rice-paper-text);margin-bottom:36px;">神 谕</div>

    <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2.2;">吾友凯瑞丰，性急之人，往德尔斐问神：</p>
    <p class="body-text on-dark anim-up-d2 mt-8" style="font-family:var(--font-display);font-size:20px;line-height:2;">天下有比苏格拉底更智慧的人否？</p>

    <div class="anim-up-d3 mt-32" style="font-family:var(--font-display);font-size:48px;color:var(--gold);letter-spacing:0.3em;">神曰：无</div>

    <p class="body-text on-dark anim-up-d4 mt-32" style="font-size:17px;line-height:2.2;opacity:0.8;">我闻之大惑。我明明一无所知——但神不妄言。<br>于是我决心以行求证，遍访智者，以驳神谕。</p>

    <p class="anim-up-d5 mt-24" style="font-family:var(--font-display);font-size:19px;color:var(--vermillion);letter-spacing:0.1em;">此一念，改吾一生。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是全篇的转折枢纽。苏格拉底并非狂妄自认智慧——他困惑，他质疑，他用行动去验证。"神曰：无"三字要重读，如雷贯耳。而后的叙述语调转为平静的回忆，一个老人在回望改变命运的那一刻。最后一句如棒喝。
  </div>
</div>

<!-- ==================== SLIDE 5: 问道三途 ==================== -->
<div class="slide light paper-texture" data-slide="5" style="flex-direction:column;justify-content:center;padding:60px 80px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:40px;">问道三途</div>

  <div class="flex-row gap-32 w-full anim-up-d1" style="max-width:1200px;">
    <!-- Card 1 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🏛</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问政客</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">名高者愚甚。彼不知而自以为知；吾不知亦不自以为知——一线之差，吾胜之。</p>
    </div>
    <!-- Card 2 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🪶</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问诗人</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">以神来之笔写诗，却不解其意。如巫如卜，言美而不知所云。更以诗才自诩全知。</p>
    </div>
    <!-- Card 3 -->
    <div class="ink-card on-light flex-1">
      <div style="font-size:28px;margin-bottom:8px;">🔨</div>
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">问工匠</span>
      <p class="body-text" style="font-size:15px;line-height:1.9;">技艺确实精湛——此吾所不及。然亦因技而骄，以为万事皆通。</p>
    </div>
  </div>

  <!-- Brush line bottom -->
  <svg class="brush-divider-long anim-up-d2 mt-32" style="color:var(--ink-black);"><use href="#brush-stroke-long"/></svg>

  <div class="speaker-notes">
    【演讲备注】三类人，三种愚——政客的自大、诗人的无知、工匠的越界。苏格拉底的发现惊人地一致：每个人都在自己不懂的领域自以为懂。语调从好奇转向无奈，他本想证明神错了，却一路证明神是对的。
  </div>
</div>

<!-- ==================== SLIDE 6: 神谕之真义 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="6" style="flex-direction:column;justify-content:center;padding:60px 140px 60px 100px;">
  <!-- Large vertical sidebar -->
  <div class="vertical-sidebar left on-dark anim-fade" style="font-size:64px;letter-spacing:0.8em;opacity:0.08;left:40px;">知无知</div>

  <div style="max-width:800px;margin-left:60px;">
    <!-- Central hanging scroll quote -->
    <div class="hanging-scroll anim-up" style="margin-bottom:36px;">
      <p class="body-text on-dark" style="font-family:var(--font-display);font-size:20px;line-height:2.2;">唯神为真智。人之智，微乎其微。神以我为喻——知己无知者，乃人中最智也。</p>
    </div>

    <!-- Three points -->
    <div class="flex-col gap-16 anim-up-d2">
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">以我为镜——非赞我，乃示人</span>
      </div>
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">真智属神——人不过近之而已</span>
      </div>
      <div class="flex-row gap-16" style="align-items:center;">
        <span class="seal-dot"></span>
        <span class="body-text on-dark" style="font-size:17px;">自知无知，始为智——此苏格拉底悖论之核</span>
      </div>
    </div>

    <p class="body-text on-dark anim-up-d3 mt-32" style="font-size:15px;opacity:0.6;">为践此命，吾弃万事，甘居赤贫。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底哲学最核心的命题。"知无知"三字如禅宗公案，需留白让听者自悟。三个要点层层递进：神谕不是夸我，而是用我做教材；真正的智慧不属于人；唯有承认无知才能接近智慧。最后一句轻描淡写——赤贫，是他为真理付出的代价。
  </div>
</div>

<!-- ==================== SLIDE 7: 怨从何来 ==================== -->
<div class="slide light paper-texture" data-slide="7" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:32px;">怨从何来</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p class="body-text" style="font-size:18px;line-height:2.2;">每揭一人之伪，即增一人之怨。彼不怨己，反怨我曰：<span style="font-family:var(--font-display);color:var(--vermillion);">"此苏格拉底者，误人子弟之徒也！"</span></p>
  </div>

  <p class="body-text anim-up-d2 mt-24" style="font-size:17px;line-height:2;max-width:820px;">更有甚者——汝家子弟效我审人，使怨者愈众。</p>

  <!-- Ink splash -->
  <div class="ink-splash" style="right:100px;top:120px;width:350px;height:350px;"></div>

  <!-- Warning scroll -->
  <div class="hanging-scroll on-light anim-up-d3 mt-40" style="max-width:600px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:18px;line-height:2;color:var(--vermillion);text-align:center;">此三人之诉，实众怨之合也。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】苏格拉底揭示了控告的真相——不是三个人的怨恨，而是整个被戳穿的虚荣群体的报复。年轻人模仿他质问长辈，长辈们把怒火归咎于他。这是先知永恒的宿命：说真话的人成为真话的替罪羊。
  </div>
</div>

<!-- ==================== SLIDE 8: 庭辩：驯马之问 ==================== -->
<div class="slide light paper-texture" data-slide="8" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:32px;">庭辩：驯马之问</div>

  <!-- Horse SVG -->
  <svg class="anim-fade" style="position:absolute;right:80px;top:50%;transform:translateY(-50%);width:200px;height:160px;color:var(--ink-black);opacity:0.5;"><use href="#horse"/></svg>

  <div style="max-width:780px;">
    <!-- Dialogue -->
    <div class="anim-up-d1 mb-24" style="border-bottom:1px solid rgba(26,26,24,0.08);padding-bottom:20px;">
      <p class="body-text" style="font-size:16px;"><span style="color:var(--indigo);font-weight:700;">我问：</span>"若我为害，谁为益？"</p>
      <p class="body-text mt-8" style="font-size:16px;"><span style="color:var(--vermillion);font-weight:700;">美勒托斯：</span>"全雅典皆益，独汝为害！"</p>
    </div>
    <div class="anim-up-d2 mb-24" style="border-bottom:1px solid rgba(26,26,24,0.08);padding-bottom:20px;">
      <p class="body-text" style="font-size:16px;"><span style="color:var(--indigo);font-weight:700;">我问：</span>"马亦如此乎？一驯马师善之，众人皆善之乎？"</p>
      <p class="body-text mt-8" style="font-size:16px;"><span style="color:var(--vermillion);font-weight:700;">美勒托斯：</span>"非也，唯驯马师能善之。"</p>
    </div>
    <div class="anim-up-d3">
      <p class="body-text" style="font-family:var(--font-display);font-size:18px;line-height:2;color:var(--ink-black);">然则一人害众人善，岂非悖论？</p>
    </div>
  </div>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="60" height="60"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】经典的苏格拉底式诘问！他用驯马的类比让美勒托斯自相矛盾：既然驯马需要专家，教育难道不需要？怎么可能全城都是教育专家，只有一个人在害人？对话要演出节奏感，美勒托斯的回答越来越慌，苏格拉底的追问越来越锐利。
  </div>
</div>

<!-- ==================== SLIDE 9: 庭辩：骡子之论 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="9" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--rice-paper-text);margin-bottom:32px;">庭辩：骡子之论</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2;max-width:800px;">控书称我"信奉神灵之事"，又称我"不信神"。</p>

  <!-- Logic flow -->
  <div class="logic-flow anim-up-d2 mt-32" style="color:var(--rice-paper-text);">
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">信神灵之事</span>
    <span class="arrow">→</span>
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">必信精灵</span>
    <span class="arrow">→</span>
    <span style="background:rgba(240,234,214,0.08);padding:8px 16px;border-radius:3px;">精灵乃神之属</span>
    <span class="arrow">→</span>
    <span style="background:rgba(194,59,34,0.2);padding:8px 16px;border-radius:3px;border:1px solid var(--vermillion);">既信又不信？</span>
  </div>

  <div class="hanging-scroll anim-up-d3 mt-40" style="max-width:700px;">
    <p class="body-text on-dark" style="font-family:var(--font-display);font-size:20px;line-height:2;text-align:center;">此犹言：骡子存在，而马驴不存在。<br><span style="color:var(--vermillion);">美勒托斯，汝之控书，戏言耳。</span></p>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底的逻辑绝杀。他用最简单的三段论拆解控诉的荒谬：你说我信鬼神之事却不信神？那就像说骡子存在但马和驴不存在。逻辑链要一步步展开，让听者自己得出结论。最后的评语轻蔑而精准——"戏言耳"，杀人不用刀。
  </div>
</div>

<!-- ==================== SLIDE 10: 牛虻 ==================== -->
<div class="slide light paper-texture" data-slide="10" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:36px;color:var(--vermillion);margin-bottom:36px;">牛 虻</div>

  <!-- Gadfly SVG -->
  <svg class="anim-fade" style="position:absolute;right:120px;top:100px;width:120px;height:90px;color:var(--ink-black);"><use href="#gadfly"/></svg>

  <div class="hanging-scroll on-light anim-up-d1" style="max-width:800px;">
    <p class="body-text" style="font-family:var(--font-display);font-size:19px;line-height:2.2;">
      雅典者，骏马也——高贵而怠惰。<br>
      吾者，牛虻也——神遣之以叮咬而唤醒之。<br>
      <span style="color:var(--vermillion);">汝杀吾，则继续沉睡。<br>除非神再遣一虻。</span>
    </p>
  </div>

  <p class="body-text anim-up-d2 mt-32" style="font-size:17px;line-height:2;max-width:760px;color:var(--diluted-ink);">吾之贫穷，即吾之证。非受神遣者，谁甘自苦如此？</p>

  <!-- Ink splash accent -->
  <div class="ink-splash" style="left:-60px;bottom:80px;width:300px;height:300px;background:radial-gradient(ellipse at center, rgba(194,59,34,0.04) 0%, transparent 60%);"></div>

  <div class="speaker-notes">
    【演讲备注】牛虻之喻是苏格拉底最著名的自我定位。他不是为了惹恼城邦，而是为了唤醒它。这段话的力量在于：他把自己的死和城邦的沉睡联系在一起。杀了牛虻，骏马就在舒适中堕落。声调坦然，没有求饶，只有冷静的警告。贫穷是他的证据——谁会为了找人麻烦而甘愿一贫如洗？
  </div>
</div>

<!-- ==================== SLIDE 11: 两次不从 ==================== -->
<div class="slide light paper-texture" data-slide="11" style="flex-direction:column;justify-content:center;padding:60px 100px;">
  <div class="display-text anim-up" style="font-size:32px;margin-bottom:40px;">两次不从</div>

  <div class="flex-row gap-40 w-full anim-up-d1" style="max-width:1100px;">
    <!-- Story 1 -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:16px;">民主之世 · 前406年</span>
      <p class="body-text" style="font-size:16px;line-height:2;">将军审判，违法集审。吾为执政团唯一反对者。虽以死胁之，不改其志。</p>
    </div>
    <!-- Story 2 -->
    <div class="hanging-scroll on-light flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--vermillion);letter-spacing:0.1em;display:block;margin-bottom:16px;">暴政之世 · 前404年</span>
      <p class="body-text" style="font-size:16px;line-height:2;">三十僭主令吾捕人赴死。余四人往，吾独归。若僭主不覆，吾今不在矣。</p>
    </div>
  </div>

  <!-- Bottom banner -->
  <div class="anim-up-d2 mt-48 text-center" style="width:100%;">
    <svg class="brush-divider-long" style="color:var(--ink-black);margin:0 auto 16px;"><use href="#brush-stroke-long"/></svg>
    <p style="font-family:var(--font-display);font-size:20px;letter-spacing:0.15em;color:var(--ink-black);">无论何世，吾只从正义。</p>
  </div>

  <div class="speaker-notes">
    【演讲备注】两个故事，两种政体，同一个苏格拉底。民主时代他违抗多数暴政，暴政时代他违抗少数暴政。他不是反对哪种制度——他只忠于正义本身。"吾独归"四字极其震撼：四个人去执行不义之命，他转身走了。这种勇气超越了制度之争。
  </div>
</div>

<!-- ==================== SLIDE 12: 不泣不求 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="12" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:32px;color:var(--rice-paper-text);margin-bottom:24px;">不泣不求</div>

  <p class="body-text on-dark anim-up-d1 mt-8" style="font-size:18px;line-height:2;max-width:800px;">吾有三子。然不携来泣于庭前。</p>

  <div class="flex-row gap-32 mt-40 anim-up-d2" style="max-width:900px;">
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">耻</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">七十之年，何颜为此</p>
    </div>
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">辱</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">使雅典为天下笑</p>
    </div>
    <div class="ink-card flex-1">
      <div style="font-family:var(--font-display);font-size:28px;color:var(--vermillion);text-align:center;margin-bottom:12px;">悖</div>
      <p class="body-text on-dark" style="font-size:15px;line-height:1.9;text-align:center;">汝等誓以法裁，非以情施。<br>吾以"不虔"受审，岂可逼汝违誓？</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】古希腊法庭常见被告携妻儿哭泣求情。苏格拉底拒绝这么做，理由极其锐利：耻——一个七十岁的哲学家哭着求饶？辱——让雅典显得像个靠眼泪判案的地方？悖——你们发过誓依法裁决，我若煽情，就是在逼你们违背誓言。这是尊严的最高形式。
  </div>
</div>

<!-- ==================== SLIDE 13: 判：有罪 ==================== -->
<div class="slide vermillion-bg paper-texture-dark" data-slide="13" style="flex-direction:column;align-items:center;justify-content:center;">
  <div class="anim-up text-center">
    <div class="display-xxl" style="color:var(--rice-paper-text);font-size:140px;letter-spacing:0.2em;">有罪</div>
  </div>

  <p class="anim-up-d2 mt-32" style="font-family:var(--font-display);font-size:24px;color:rgba(240,234,214,0.7);letter-spacing:0.1em;">三十票之差。</p>

  <!-- Ink splash accent -->
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 70%, rgba(26,26,24,0.15) 0%, transparent 50%);pointer-events:none;z-index:1;"></div>

  <div class="speaker-notes">
    【演讲备注】全场静默。仅两个字，如当头棒喝。五百零一人投票，二百八十对二百二十一。三十票之差——如此微弱的多数，定一个人的罪。这页要停留足够长，让沉默说话。
  </div>
</div>

<!-- ==================== SLIDE 14: 何以罚我 ==================== -->
<div class="slide light paper-texture" data-slide="14" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:28px;">何以罚我</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p class="body-text" style="font-size:18px;line-height:2.2;">吾为城邦之恩人。当何报之？<span style="font-family:var(--font-display);color:var(--gold);font-weight:700;">在公堂免费用餐</span>——如奥林匹亚冠军然。</p>
  </div>

  <p class="body-text anim-up-d2 mt-16" style="font-size:16px;line-height:2;max-width:800px;color:var(--diluted-ink);">盖冠军予汝幸福之幻，吾予汝幸福之实。</p>

  <!-- Four rejections -->
  <div class="flex-row gap-24 mt-40 anim-up-d3" style="max-width:1000px;">
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">死</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">未知善恶</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">囚</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">沦为奴隶</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">逐</div>
      <p class="body-text" style="font-size:14px;color:var(--diluted-ink);">何处不被追随</p>
    </div>
    <div class="ink-card on-light flex-1 text-center">
      <div style="font-family:var(--font-display);font-size:22px;margin-bottom:8px;">默</div>
      <p class="body-text" style="font-size:14px;color:var(--vermillion);">违神命</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】这是苏格拉底最惊世骇俗的时刻：被判有罪后，按雅典法律他可以自提处罚。他提出——在公堂免费用餐！这不是挑衅，而是逻辑：如果他真的对城邦有贡献，理应受到奖赏。四种刑罚一一拒绝，每一种都不可接受。死——未知不可畏；囚——不如死；逐——到哪都一样；沉默——等于放弃使命。
  </div>
</div>

<!-- ==================== SLIDE 15: 千古一言 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="15" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Enso -->
  <svg class="anim-fade" style="position:absolute;width:500px;height:500px;color:var(--gold);opacity:0.08;"><use href="#enso"/></svg>

  <div class="text-center" style="z-index:2;max-width:700px;">
    <!-- Vertical large text -->
    <div class="anim-up" style="writing-mode:vertical-rl;font-family:var(--font-display);font-size:52px;font-weight:900;color:var(--gold);letter-spacing:0.4em;line-height:1.8;margin:0 auto 32px;display:inline-block;">未经审视的人生不值得过</div>
  </div>

  <p class="anim-up-d2 mt-16" style="font-family:var(--font-body);font-size:14px;color:var(--diluted-ink);letter-spacing:0.05em;text-align:center;">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</p>

  <div class="anim-up-d3 mt-40" style="max-width:600px;text-align:center;">
    <p class="body-text on-dark" style="font-size:17px;line-height:2.2;">日省吾身，论德辩善——此人生之至善也。<br><span style="color:var(--vermillion);">令我噤声？断不可能。</span></p>
  </div>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="65" height="65"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】整场申辩的核心，两千四百年来最有力量的一句话。竖排大字金色呈现，如同刻碑。希腊语原文轻轻呈现，提醒我们这句话穿越了语言和时间。苏格拉底不是在辩护——他在宣告一种生存方式。沉默等于死亡，不是肉体的死亡，而是灵魂的。
  </div>
</div>

<!-- ==================== SLIDE 16: 判：死刑 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="16" style="flex-direction:column;align-items:center;justify-content:center;">
  <div class="anim-up text-center">
    <div class="display-xxl" style="color:var(--rice-paper-text);font-size:160px;letter-spacing:0.3em;">死刑</div>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.1;height:220px;"><use href="#ink-mountains-1"/></svg>

  <div class="speaker-notes">
    【演讲备注】比"有罪"更沉重的沉默。两个字填满整个空间。山水在底部若隐若现——大地沉默，天命已定。不需要多说一个字。停留，呼吸，让死亡的重量降临。
  </div>
</div>

<!-- ==================== SLIDE 17: 致判我死者 ==================== -->
<div class="slide light paper-texture" data-slide="17" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;margin-bottom:32px;">致判我死者</div>

  <div class="quote-block anim-up-d1" style="max-width:860px;">
    <p style="font-family:var(--font-display);font-size:22px;line-height:2;color:var(--ink-black);">吾宁以吾道而死，不以汝道而生。</p>
  </div>

  <div class="ink-card on-light anim-up-d2 mt-32" style="max-width:800px;">
    <span class="card-label" style="font-family:var(--font-display);font-size:14px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:12px;">赛跑之喻</span>
    <p class="body-text" style="font-size:16px;line-height:2;">避死不难，避不义难——不义快于死。死追及吾，不义追及汝。</p>
  </div>

  <p class="body-text anim-up-d3 mt-32" style="font-size:17px;line-height:2;max-width:800px;">吾死之后，更多更年轻的质问者将至。<span style="color:var(--vermillion);font-family:var(--font-display);">杀人不能塞批评之口——唯改过能免之。</span></p>

  <div class="speaker-notes">
    【演讲备注】死刑宣判后，苏格拉底没有崩溃，而是从容地对判他死刑的人说出了最冷静的预言。赛跑的比喻精妙绝伦：你们逃避不义比我逃避死亡更难，因为不义跑得比死亡更快。最后的警告如谶语：杀了我只会引来更多质问者。历史证明他是对的——他的死催生了整个西方哲学传统。
  </div>
</div>

<!-- ==================== SLIDE 18: 论死 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="18" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--rice-paper-text);margin-bottom:24px;">论 死</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:17px;line-height:2;max-width:800px;opacity:0.7;">吾之代蒙今日全程沉默——此吉兆也。</p>

  <div class="flex-row gap-40 mt-40 anim-up-d2" style="max-width:1000px;">
    <!-- Path 1 -->
    <div class="hanging-scroll flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--indigo);letter-spacing:0.1em;display:block;margin-bottom:16px;">其一 · 无梦之眠</span>
      <p class="body-text on-dark" style="font-size:16px;line-height:2;">若死即永眠——选汝一生中最安之夜，波斯王亦寥寥可数。</p>
      <p class="body-text on-dark mt-12" style="font-size:16px;line-height:2;color:var(--gold);">永恒若一夜好眠，何惧之有？</p>
    </div>
    <!-- Path 2 -->
    <div class="hanging-scroll flex-1">
      <span class="card-label" style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--gold);letter-spacing:0.1em;display:block;margin-bottom:16px;">其二 · 灵魂远行</span>
      <p class="body-text on-dark" style="font-size:16px;line-height:2;">若死后至彼世——可见荷马、赫西俄德！可继续问道！</p>
      <p class="body-text on-dark mt-12" style="font-size:16px;line-height:2;color:var(--gold);">且彼处不以问道罪人。</p>
    </div>
  </div>

  <div class="speaker-notes">
    【演讲备注】面对死亡，苏格拉底展现了哲学家最高的境界——用逻辑化解恐惧。两条路都不坏：如果死是永眠，那是最好的睡眠；如果死后有来世，那他终于可以和荷马对话，而且不会因为提问被处死。"代蒙沉默"是关键细节——苏格拉底的内心之声在他即将做坏事时会发出警告，今天全程没有发声，说明赴死并非坏事。
  </div>
</div>

<!-- ==================== SLIDE 19: 最后的话 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="19" style="flex-direction:column;justify-content:center;padding:60px 120px;">
  <div class="display-text anim-up" style="font-size:30px;color:var(--gold);margin-bottom:36px;">最后的话</div>

  <p class="body-text on-dark anim-up-d1" style="font-size:18px;line-height:2.2;max-width:800px;">善人无论生死，不受真恶。神不弃之。</p>

  <div class="quote-block anim-up-d2 mt-32" style="max-width:800px;border-left-color:var(--gold);">
    <p class="body-text on-dark" style="font-size:17px;line-height:2.2;">吾之遗请：待吾子长大，若逐利忘德，若妄自尊大——请如吾之折磨汝，折磨彼等。</p>
  </div>

  <!-- Final golden line -->
  <div class="anim-up-d3 mt-48 text-center" style="width:100%;">
    <p style="font-family:var(--font-display);font-size:32px;font-weight:900;color:var(--gold);line-height:1.8;letter-spacing:0.1em;">
      行矣。吾赴死，汝赴生。<br>孰善孰恶，唯神知之。
    </p>
  </div>

  <!-- Ink mountains -->
  <svg class="ink-mountains" style="color:var(--rice-paper-text);opacity:0.08;height:180px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal stamp -->
  <svg class="seal-stamp anim-up-d4" width="65" height="65"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】全篇最后的话语，每一个字都是永恒。"善人不受真恶"——这是苏格拉底终极的信仰。遗请不是为自己，而是为儿子——请像我折磨你们一样折磨他们，让他们追求德性而非财富。最后两句金字必须慢读，如告别，如遗言，如千古不灭的回声。"唯神知之"——把最终的判断交给超越人世的存在，这是最大的谦卑，也是最大的骄傲。
  </div>
</div>

<!-- ==================== SLIDE 20: 尾页 ==================== -->
<div class="slide dark paper-texture-dark" data-slide="20" style="flex-direction:column;align-items:center;justify-content:center;">
  <!-- Bamboo right -->
  <svg style="position:absolute;right:50px;top:0;height:100%;width:60px;color:var(--rice-paper-text);"><use href="#bamboo"/></svg>

  <div class="text-center anim-up" style="z-index:2;">
    <p style="font-family:var(--font-display);font-size:28px;color:var(--rice-paper-text);letter-spacing:0.3em;opacity:0.8;">苏格拉底的申辩</p>
    <svg class="brush-divider anim-up-d1" style="color:var(--rice-paper-text);margin:24px auto;"><use href="#brush-stroke"/></svg>
    <p class="anim-up-d2" style="font-family:var(--font-body);font-size:16px;color:var(--diluted-ink);letter-spacing:0.15em;">柏拉图记述</p>
    <p class="anim-up-d3 mt-24" style="font-family:var(--font-body);font-size:13px;color:var(--diluted-ink);opacity:0.5;">公元前三九九年 · 雅典</p>
  </div>

  <!-- Plum blossom decorations -->
  <svg style="position:absolute;left:80px;top:120px;width:50px;height:50px;color:var(--rice-paper-text);"><use href="#plum-blossom"/></svg>
  <svg style="position:absolute;left:120px;bottom:200px;width:35px;height:35px;color:var(--rice-paper-text);"><use href="#plum-blossom"/></svg>

  <!-- Ink mountains -->
  <svg class="ink-mountains higher" style="color:var(--rice-paper-text);height:160px;"><use href="#ink-mountains-1"/></svg>

  <!-- Seal -->
  <svg class="seal-stamp anim-up-d3" width="70" height="70"><use href="#seal-stamp"/></svg>

  <div class="speaker-notes">
    【演讲备注】万语千言归于沉寂。如水墨画留白——最后一页不需要多余的文字。柏拉图记述了这一切，两千四百年后我们依然在聆听。这就是哲学的力量——肉体消亡，思想永存。
  </div>
</div>

</div><!-- /slide-deck -->

<!-- ========== NAVIGATION ========== -->
<div class="nav-bar"><div class="nav-progress" id="navProgress"></div></div>
<div class="slide-counter" id="slideCounter"></div>

<!-- ========== SLIDE ENGINE JS ========== -->
<script>
(function() {
  'use strict';

  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let isAnimating = false;

  const navProgress = document.getElementById('navProgress');
  const slideCounter = document.getElementById('slideCounter');

  function updateUI() {
    navProgress.style.width = ((currentSlide + 1) / totalSlides * 100) + '%';
    slideCounter.textContent = (currentSlide + 1) + ' / ' + totalSlides;

    // Adapt counter color
    const active = slides[currentSlide];
    if (active.classList.contains('dark') || active.classList.contains('vermillion-bg')) {
      slideCounter.style.color = 'rgba(240,234,214,0.35)';
    } else {
      slideCounter.style.color = 'rgba(26,26,24,0.3)';
    }
  }

  function goToSlide(n) {
    if (n < 0 || n >= totalSlides || n === currentSlide || isAnimating) return;
    isAnimating = true;

    slides[currentSlide].classList.remove('active');
    slides[currentSlide].style.display = 'none';
    currentSlide = n;
    slides[currentSlide].style.display = 'flex';

    // Trigger reflow for animations
    void slides[currentSlide].offsetWidth;
    slides[currentSlide].classList.add('active');

    updateUI();
    setTimeout(() => { isAnimating = false; }, 500);
  }

  function next() { goToSlide(currentSlide + 1); }
  function prev() { goToSlide(currentSlide - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); goToSlide(0); break;
      case 'End':
        e.preventDefault(); goToSlide(totalSlides - 1); break;
      case 'n':
        document.body.classList.toggle('show-notes'); break;
      case 'f':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(()=>{});
        } else {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Click navigation
  document.addEventListener('click', function(e) {
    if (e.target.closest('.speaker-notes')) return;
    const x = e.clientX / window.innerWidth;
    if (x > 0.5) next(); else prev();
  });

  // Touch
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  // Mouse wheel
  let wheelTimeout;
  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) next(); else prev();
    }, 80);
  }, { passive: false });

  // Hash navigation
  function handleHash() {
    const hash = parseInt(location.hash.replace('#', ''));
    if (hash >= 1 && hash <= totalSlides) {
      goToSlide(hash - 1);
    }
  }
  window.addEventListener('hashchange', handleHash);

  // Init
  slides.forEach((s, i) => {
    if (i !== 0) { s.style.display = 'none'; s.classList.remove('active'); }
  });
  handleHash();
  updateUI();
})();
</script>

</body>
</html>

=== FILE: .claude/skills/presentation-skill/examples/greek-academy.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
<style>
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --marble: #f8f5f0;
  --dark: #2a2a1e;
  --gold: #c5a55a;
  --olive: #6b7c3e;
  --terracotta: #c06030;
  --text-dark: #2a2a1e;
  --text-light: #f0ead6;
  --text-secondary: #6b6355;
  --parchment: #f3e8d0;
  --shadow: rgba(42,42,30,0.1);
  --radius: 4px;
  --font-heading: 'Playfair Display', 'Georgia', serif;
  --font-body: 'Crimson Text', 'Georgia', serif;
}

/* ============================================================
   RESET & BASE
   ============================================================ */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html, body { width:100%; height:100%; overflow:hidden; background:#1a1a12; font-family: var(--font-body); }

/* ============================================================
   GREEK KEY BORDER PATTERN (CSS only)
   ============================================================ */
.greek-key-border {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
}
.greek-key-border::before {
  content: '';
  position: absolute; inset: 12px;
  border: 2px solid var(--gold);
  border-radius: var(--radius);
}
.greek-key-border::after {
  content: '';
  position: absolute; inset: 20px;
  border: 1px solid rgba(197,165,90,0.3);
  border-radius: var(--radius);
}

/* Meander pattern strip */
.meander-top, .meander-bottom {
  position: absolute; left: 30px; right: 30px; height: 8px; z-index: 3;
  background:
    repeating-linear-gradient(90deg,
      var(--gold) 0px, var(--gold) 4px,
      transparent 4px, transparent 8px,
      var(--gold) 8px, var(--gold) 12px,
      transparent 12px, transparent 16px
    );
  mask: repeating-linear-gradient(90deg, #000 0px, #000 12px, transparent 12px, transparent 16px);
  -webkit-mask: repeating-linear-gradient(90deg, #000 0px, #000 12px, transparent 12px, transparent 16px);
  opacity: 0.5;
}
.meander-top { top: 15px; }
.meander-bottom { bottom: 15px; }

/* ============================================================
   CORNER ORNAMENTS (light slides)
   ============================================================ */
.slide--light .corner-ornament { display: block; }
.corner-ornament {
  display: none;
  position: absolute; width: 40px; height: 40px; z-index: 4;
  opacity: 0.35;
}
.corner-ornament::before, .corner-ornament::after {
  content: ''; position: absolute; background: var(--gold);
}
.corner-ornament--tl { top: 24px; left: 24px; }
.corner-ornament--tl::before { width: 20px; height: 2px; top:0; left:0; }
.corner-ornament--tl::after  { width: 2px; height: 20px; top:0; left:0; }
.corner-ornament--tr { top: 24px; right: 24px; }
.corner-ornament--tr::before { width: 20px; height: 2px; top:0; right:0; }
.corner-ornament--tr::after  { width: 2px; height: 20px; top:0; right:0; }
.corner-ornament--bl { bottom: 24px; left: 24px; }
.corner-ornament--bl::before { width: 20px; height: 2px; bottom:0; left:0; }
.corner-ornament--bl::after  { width: 2px; height: 20px; bottom:0; left:0; }
.corner-ornament--br { bottom: 24px; right: 24px; }
.corner-ornament--br::before { width: 20px; height: 2px; bottom:0; right:0; }
.corner-ornament--br::after  { width: 2px; height: 20px; bottom:0; right:0; }

/* ============================================================
   NOISE TEXTURE (marble slides)
   ============================================================ */
.slide--light::before {
  content: '';
  position: absolute; inset: 0; z-index: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

/* ============================================================
   SLIDE SYSTEM
   ============================================================ */
.slides-container {
  width: 100vw; height: 100vh;
  position: relative; overflow: hidden;
}
.slide {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: clamp(40px, 5vh, 80px) clamp(60px, 8vw, 160px);
  opacity: 0; visibility: hidden;
  transition: opacity 0.6s ease, transform 0.6s ease;
  transform: translateX(40px);
}
.slide.active {
  opacity: 1; visibility: visible;
  transform: translateX(0);
  z-index: 1;
}
.slide.prev {
  opacity: 0; visibility: hidden;
  transform: translateX(-40px);
}

.slide--light {
  background: var(--marble);
  color: var(--text-dark);
}
.slide--dark {
  background: var(--dark);
  color: var(--text-light);
}
.slide--dark .greek-key-border::before { border-color: rgba(197,165,90,0.5); }
.slide--dark .greek-key-border::after  { border-color: rgba(197,165,90,0.15); }
.slide--dark .meander-top, .slide--dark .meander-bottom { opacity: 0.3; }

/* ============================================================
   SLIDE INNER CONTENT
   ============================================================ */
.slide-inner {
  position: relative; z-index: 1;
  max-width: 1100px; width: 100%;
  text-align: left;
}
.slide-inner.center { text-align: center; }

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1, h2, h3 { font-family: var(--font-heading); font-weight: 700; line-height: 1.2; }
h1 { font-size: clamp(36px, 4vw, 56px); margin-bottom: 0.3em; }
h2 { font-size: clamp(28px, 3vw, 42px); margin-bottom: 0.4em; }
h3 { font-size: clamp(20px, 2vw, 28px); margin-bottom: 0.3em; font-weight: 600; }
p, li { font-size: clamp(15px, 1.5vw, 18px); line-height: 1.8; margin-bottom: 0.5em; }
.small { font-size: clamp(13px, 1.2vw, 15px); }
.secondary { color: var(--text-secondary); }
.slide--dark .secondary { color: rgba(240,234,214,0.6); }
.gold { color: var(--gold); }
.terracotta { color: var(--terracotta); }
.olive-text { color: var(--olive); }
.italic { font-style: italic; }

/* Section number */
.section-num {
  font-family: var(--font-heading);
  font-size: clamp(14px, 1.2vw, 16px);
  color: var(--gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  font-weight: 400;
}

/* ============================================================
   QUOTE / SCROLL BLOCK
   ============================================================ */
.scroll-quote {
  background: linear-gradient(135deg, var(--parchment) 0%, #efe3cc 100%);
  border: 1px solid rgba(197,165,90,0.3);
  border-radius: 6px;
  padding: clamp(16px, 2vw, 28px) clamp(20px, 3vw, 36px);
  margin: 16px 0;
  position: relative;
  color: var(--text-dark);
  box-shadow: 0 4px 20px var(--shadow), inset 0 1px 0 rgba(255,255,255,0.5);
}
.scroll-quote::before, .scroll-quote::after {
  content: '';
  position: absolute; left: 8px; right: 8px; height: 12px;
  background: radial-gradient(ellipse at center, rgba(197,165,90,0.15) 0%, transparent 70%);
}
.scroll-quote::before { top: -6px; }
.scroll-quote::after  { bottom: -6px; }
.scroll-quote p { font-style: italic; font-size: clamp(16px, 1.6vw, 20px); line-height: 1.7; }

/* Big quote */
.big-quote {
  font-family: var(--font-heading);
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 700;
  line-height: 1.4;
  color: var(--gold);
  text-align: center;
  margin: 20px 0;
}

/* ============================================================
   CARDS
   ============================================================ */
.card-grid { display: grid; gap: 16px; margin: 16px 0; }
.card-grid--2 { grid-template-columns: 1fr 1fr; }
.card-grid--3 { grid-template-columns: 1fr 1fr 1fr; }
.card-grid--4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
@media (max-width: 900px) {
  .card-grid--2, .card-grid--3, .card-grid--4 { grid-template-columns: 1fr; }
}

.card {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(197,165,90,0.2);
  border-radius: var(--radius);
  padding: clamp(14px, 1.5vw, 22px);
  box-shadow: 0 2px 12px var(--shadow);
}
.slide--dark .card {
  background: rgba(255,255,255,0.06);
  border-color: rgba(197,165,90,0.2);
}

.insight-card {
  background: linear-gradient(135deg, rgba(197,165,90,0.12) 0%, rgba(107,124,62,0.08) 100%);
  border-left: 3px solid var(--gold);
  border-radius: var(--radius);
  padding: clamp(12px, 1.5vw, 20px);
  margin: 12px 0;
}
.slide--dark .insight-card {
  background: linear-gradient(135deg, rgba(197,165,90,0.15) 0%, rgba(107,124,62,0.1) 100%);
}

/* ============================================================
   TWO-COLUMN LAYOUT
   ============================================================ */
.two-col {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
}
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }

.col-divider {
  display: flex; align-items: center; justify-content: center;
}

/* ============================================================
   LOGIC CHAIN / STEPS
   ============================================================ */
.logic-chain { list-style: none; counter-reset: logic; }
.logic-chain li {
  counter-increment: logic;
  padding: 8px 0 8px 40px;
  position: relative;
  border-left: 2px solid rgba(197,165,90,0.3);
  margin-left: 15px;
}
.logic-chain li::before {
  content: counter(logic);
  position: absolute; left: -15px; top: 6px;
  width: 28px; height: 28px;
  background: var(--gold); color: var(--dark);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-heading); font-weight: 700; font-size: 14px;
}

/* ============================================================
   VERDICT / LARGE LABEL
   ============================================================ */
.verdict {
  font-family: var(--font-heading);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 900;
  color: var(--terracotta);
  text-align: center;
  margin: 20px 0;
  text-shadow: 0 2px 20px rgba(192,96,48,0.3);
}
.slide--dark .verdict { color: var(--terracotta); }

.part-label {
  font-family: var(--font-heading);
  font-size: clamp(16px, 1.5vw, 20px);
  color: var(--gold);
  letter-spacing: 4px;
  text-align: center;
  margin-top: 12px;
}

/* ============================================================
   SVG STYLING
   ============================================================ */
.svg-icon { display: inline-block; vertical-align: middle; }
.svg-icon--lg { width: clamp(80px, 10vw, 140px); height: auto; margin: 12px auto; display: block; }
.svg-icon--md { width: clamp(50px, 6vw, 80px); height: auto; }
.svg-icon--sm { width: clamp(30px, 4vw, 50px); height: auto; }
.svg-icon--inline { width: 24px; height: 24px; margin-right: 6px; vertical-align: -4px; }
.svg-center { text-align: center; }

/* ============================================================
   SLIDE NUMBER & PROGRESS
   ============================================================ */
.slide-number {
  position: fixed; bottom: 12px; right: 24px;
  font-family: var(--font-heading); font-size: 14px;
  color: rgba(197,165,90,0.6); z-index: 100;
}
.progress-bar {
  position: fixed; bottom: 0; left: 0; height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--olive));
  transition: width 0.4s ease; z-index: 100;
}

/* ============================================================
   CONTROLS UI
   ============================================================ */
.controls {
  position: fixed; top: 12px; right: 16px; z-index: 200;
  display: flex; gap: 8px;
}
.controls button {
  background: rgba(42,42,30,0.7); border: 1px solid rgba(197,165,90,0.3);
  color: var(--text-light); padding: 6px 10px; border-radius: var(--radius);
  cursor: pointer; font-family: var(--font-body); font-size: 13px;
  transition: background 0.2s;
}
.controls button:hover { background: rgba(197,165,90,0.3); }
.controls button.active { background: var(--gold); color: var(--dark); }

/* Speaker notes panel */
.notes-panel {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(42,42,30,0.95); color: var(--text-light);
  padding: 16px 24px; font-size: 14px; line-height: 1.6;
  transform: translateY(100%); transition: transform 0.3s ease;
  z-index: 150; max-height: 30vh; overflow-y: auto;
  border-top: 2px solid var(--gold);
}
.notes-panel.visible { transform: translateY(0); }

/* ============================================================
   PRINT STYLES
   ============================================================ */
@media print {
  body { overflow: visible; background: white; }
  .slide {
    position: relative !important; opacity: 1 !important; visibility: visible !important;
    transform: none !important; page-break-after: always; page-break-inside: avoid;
    width: 100%; min-height: 100vh;
  }
  .controls, .slide-number, .progress-bar, .notes-panel { display: none !important; }
  .greek-key-border::before { border-color: #999 !important; }
}

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 768px) {
  .slide { padding: 30px 24px; }
  .two-col { grid-template-columns: 1fr; gap: 16px; }
  .card-grid--2, .card-grid--3, .card-grid--4 { grid-template-columns: 1fr; }
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.slide.active .anim-in {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}
.slide.active .anim-in:nth-child(1) { animation-delay: 0.1s; }
.slide.active .anim-in:nth-child(2) { animation-delay: 0.25s; }
.slide.active .anim-in:nth-child(3) { animation-delay: 0.4s; }
.slide.active .anim-in:nth-child(4) { animation-delay: 0.55s; }
.slide.active .anim-in:nth-child(5) { animation-delay: 0.7s; }
</style>
</head>
<body>

<div class="slides-container" id="slidesContainer">

<!-- ============================================================
     SLIDE 1 — 封面
     ============================================================ -->
<div class="slide slide--dark active" data-notes="这是我苏格拉底一生中最重要的一天。公元前399年，我站在由五百零一位公民组成的法庭前。我已经七十岁了，从未上过法庭。今天，我要为自己的一生做一次彻底的辩护。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Laurel Wreath SVG -->
    <div class="svg-center anim-in">
      <svg class="svg-icon--lg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.9">
          <!-- Left branch -->
          <path d="M100 170 C60 160, 30 130, 25 90" stroke="#c5a55a" stroke-width="2" fill="none"/>
          <ellipse cx="38" cy="130" rx="12" ry="6" transform="rotate(-30 38 130)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="30" cy="115" rx="12" ry="6" transform="rotate(-40 30 115)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="26" cy="100" rx="11" ry="5.5" transform="rotate(-55 26 100)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="28" cy="85" rx="11" ry="5.5" transform="rotate(-65 28 85)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="34" cy="72" rx="10" ry="5" transform="rotate(-75 34 72)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="42" cy="60" rx="10" ry="5" transform="rotate(-80 42 60)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="52" cy="50" rx="10" ry="5" transform="rotate(-85 52 50)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="64" cy="42" rx="9" ry="5" transform="rotate(10 64 42)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="78" cy="36" rx="9" ry="5" transform="rotate(20 78 36)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="90" cy="33" rx="9" ry="5" transform="rotate(30 90 33)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Right branch -->
          <path d="M100 170 C140 160, 170 130, 175 90" stroke="#c5a55a" stroke-width="2" fill="none"/>
          <ellipse cx="162" cy="130" rx="12" ry="6" transform="rotate(30 162 130)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="170" cy="115" rx="12" ry="6" transform="rotate(40 170 115)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="174" cy="100" rx="11" ry="5.5" transform="rotate(55 174 100)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="172" cy="85" rx="11" ry="5.5" transform="rotate(65 172 85)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="166" cy="72" rx="10" ry="5" transform="rotate(75 166 72)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="158" cy="60" rx="10" ry="5" transform="rotate(80 158 60)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="148" cy="50" rx="10" ry="5" transform="rotate(85 148 50)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="136" cy="42" rx="9" ry="5" transform="rotate(-10 136 42)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="122" cy="36" rx="9" ry="5" transform="rotate(-20 122 36)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="110" cy="33" rx="9" ry="5" transform="rotate(-30 110 33)" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Ribbon -->
          <path d="M95 170 L90 190 M105 170 L110 190" stroke="#c5a55a" stroke-width="1.5" fill="none"/>
        </g>
      </svg>
    </div>
    <h1 class="anim-in" style="font-size:clamp(42px,5vw,64px); color:var(--text-light); margin-top:12px;">我的申辩</h1>
    <p class="anim-in" style="font-family:var(--font-heading); font-size:clamp(20px,2.5vw,30px); color:var(--gold); letter-spacing:6px; margin-bottom:24px;">ἈΠΟΛΟΓΊΑ</p>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px); color:var(--text-light); opacity:0.8;">苏格拉底 &middot; 致雅典公民法庭</p>
    <p class="anim-in small" style="color:rgba(240,234,214,0.5); margin-top:12px;">公元前399年 &middot; 我生命的第七十个年头</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 2 — 开场
     ============================================================ -->
<div class="slide slide--light" data-notes="我的开场策略是以退为进。声称自己不善言辞，实际上是在建立信任。对比控告者的花言巧语和我的朴素真话，让陪审团放下戒心。这是我七十年来第一次踏进法庭——这本身就说明了我从未违法。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">I &middot; 开场</div>
    <!-- Owl SVG -->
    <div class="anim-in" style="margin-bottom:12px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="26" r="18" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="23" cy="23" r="5" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <circle cx="37" cy="23" r="5" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <circle cx="23" cy="23" r="2" fill="#c5a55a"/>
        <circle cx="37" cy="23" r="2" fill="#c5a55a"/>
        <path d="M27 30 L30 34 L33 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M20 12 L23 18 M40 12 L37 18" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M22 40 L22 50 M30 42 L30 52 M38 40 L38 50" stroke="#6b7c3e" stroke-width="1"/>
      </svg>
    </div>
    <h2 class="anim-in">雅典的公民们</h2>
    <div class="scroll-quote anim-in">
      <p>"我不知道你们是否被我的控告者说动了。但我要告诉你们——他们几乎没说过一句真话。"</p>
    </div>
    <p class="anim-in">"他们说你们要当心被我的'雄辩'所欺骗。这是他们最无耻的说法——除非他们所说的雄辩是指真理的力量。"</p>
    <p class="anim-in">"我已经七十岁了，这是我第一次上法庭。请像对待一个外邦人一样包容我的说话方式。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">我的策略</strong> —— 用"不会说话"来赢得你们的信任</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 3 — 两种敌人
     ============================================================ -->
<div class="slide slide--light" data-notes="我面对的是两波敌人：一波是多年以来散布谣言的人，尤其是阿里斯托芬的喜剧；另一波是今天站在法庭上的三个人。前者比后者更可怕，因为谣言已经渗透了你们的童年记忆。我无法传唤影子来对峙。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">II &middot; 两种敌人</div>
    <h2 class="anim-in">我必须对抗两种力量</h2>
    <div class="two-col anim-in">
      <div class="card">
        <!-- Pillar SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="24" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <rect x="10" y="12" width="20" height="38" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <line x1="14" y1="12" x2="14" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <line x1="20" y1="12" x2="20" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <line x1="26" y1="12" x2="26" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.4"/>
            <rect x="8" y="50" width="24" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
            <rect x="6" y="4" width="28" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
          </svg>
        </div>
        <h3 class="terracotta">看不见的敌人</h3>
        <p>"多年来，有些人一直在散布关于我的谣言。阿里斯托芬在《云》里把我演成一个'在空中行走'的怪人。这些流言从你们还是孩子的时候就开始影响你们了。"</p>
        <p class="secondary italic">"我没法传唤这些人——我只能与影子搏斗。"</p>
      </div>
      <div class="card">
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="24" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <rect x="10" y="12" width="20" height="38" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <line x1="14" y1="12" x2="14" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <line x1="20" y1="12" x2="20" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <line x1="26" y1="12" x2="26" y2="50" stroke="#6b7c3e" stroke-width="0.5" opacity="0.4"/>
            <rect x="8" y="50" width="24" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
            <rect x="6" y="4" width="28" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.2"/>
          </svg>
        </div>
        <h3 class="olive-text">今天的控告者</h3>
        <p>"美勒托斯代表诗人，安尼托斯代表工匠和政客，莱孔代表修辞家——我得罪了所有人。"</p>
      </div>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 4 — 我不是什么人
     ============================================================ -->
<div class="slide slide--light" data-notes="我需要先澄清身份。我不是自然哲学家，不是智者学派。卡利亚斯的故事很有趣——他花大价钱请智者来教他的儿子，可我连一个铜板都没收过。我的贫穷就是最好的证据。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">III &middot; 自我澄清</div>
    <h2 class="anim-in">我不是什么人</h2>
    <!-- Horse SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q30 30, 50 25 Q60 23, 65 28 L70 22 L75 18 L73 25 L68 30 Q72 35, 70 45 L75 60 L72 62 L68 48 L60 60 L57 62 L55 48 L45 58 L42 60 L44 46 L35 58 L32 60 L36 45 Q28 50, 25 55Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="1.5" fill="#c5a55a"/>
        <path d="M75 18 Q80 14, 78 10 M75 18 Q82 16, 84 12" stroke="#c5a55a" stroke-width="1" fill="none"/>
      </svg>
    </div>
    <p class="anim-in">"他们说我研究天上地下的事物——那是阿那克萨哥拉的学说，不是我的。他们说我像智者学派一样收费教学——<strong>我从未收过一个铜板。</strong>"</p>
    <div class="scroll-quote anim-in">
      <p><strong class="gold">卡利亚斯的故事：</strong>"雅典首富卡利亚斯在智者身上花了大量金钱。我问他：如果你的儿子是马驹，你会请驯马师；他们是人，你请谁来教？他说帕罗斯岛的伊温诺斯，收费5弥那。"</p>
    </div>
    <p class="anim-in italic secondary">"如果我也有那种智慧，我一定会非常骄傲。但事实是——我没有。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 5 — 神谕
     ============================================================ -->
<div class="slide slide--dark" data-notes="凯瑞丰是我童年的朋友，性格急躁冲动。他跑去德尔斐问了那个改变我一生的问题。神谕说没有人比我更有智慧——这让我困惑不已。我知道自己无知，但神不会说谎。于是我踏上了验证神谕的旅程，这个旅程最终把我推向了法庭。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">IV &middot; 德尔斐神谕</div>
    <!-- Temple SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <polygon points="100,10 170,50 30,50" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="50" y1="50" x2="50" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="80" y1="50" x2="80" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="120" y1="50" x2="120" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <line x1="150" y1="50" x2="150" y2="120" stroke="#c5a55a" stroke-width="2"/>
        <rect x="30" y="120" width="140" height="6" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <rect x="25" y="126" width="150" height="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="40" y="46" width="120" height="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Flame -->
        <ellipse cx="100" cy="90" rx="6" ry="12" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <ellipse cx="100" cy="86" rx="3" ry="6" fill="#c5a55a" opacity="0.3"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">神 谕</h2>
    <div class="scroll-quote anim-in">
      <p>"我的童年好友凯瑞丰——你们都认识他，那个性子急躁的人——他跑去德尔斐神庙，问女祭司：<strong>'有没有人比苏格拉底更有智慧？'</strong>"</p>
      <p>"神谕的回答是：<strong style="color:var(--terracotta);">没有。</strong>"</p>
    </div>
    <p class="anim-in">"我听到这个消息时困惑极了。我知道自己一无所知——但神不会说谎。所以我决定用一个方法来检验：<strong>找到一个比我更有智慧的人，去反驳神谕。</strong>"</p>
    <p class="anim-in big-quote" style="font-size:clamp(20px,2.2vw,28px);">"这个决定改变了我的一生。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 6 — 审问政客
     ============================================================ -->
<div class="slide slide--light" data-notes="我去找的第一个人是一位声名显赫的政客。谈话之后我发现他其实不懂装懂。当我试着指出这一点时，他恨上了我。但我从中悟到了一个关键的道理——无知本身不可怕，可怕的是不自知的无知。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">V &middot; 审问政客</div>
    <!-- Scales of Justice SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="8" x2="30" y2="52" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="10" y1="18" x2="50" y2="18" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M6 32 L10 18 L14 32" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M4 32 Q10 38, 16 32" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M46 28 L50 18 L54 28" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M44 28 Q50 34, 56 28" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="24" y="52" width="12" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <circle cx="30" cy="8" r="3" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
      </svg>
    </div>
    <h2 class="anim-in">审问政客</h2>
    <p class="anim-in">"我首先去找了一位以智慧闻名的政客。交谈之后我发现——他并非真正有智慧，尽管很多人这么认为，他自己也深信不疑。"</p>
    <p class="anim-in">"我试图向他解释这一点。结果？<strong class="terracotta">他恨我了</strong>，在场的人也跟着恨我。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">关键领悟：</strong>"我离开时心想：我们都不知道什么真正美好的事物。但我比他强一点——因为<strong>他不知道却自以为知道；而我不知道，也不自以为知道。</strong>就这一点微小的差别，我似乎比他有智慧。"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 7 — 审问诗人与工匠
     ============================================================ -->
<div class="slide slide--light" data-notes="诗人靠灵感写作，就像占卜者说出美妙的话却不理解含义。工匠确实有真才实学，但他们的问题和诗人一样：因为精通一个领域，就以为自己在所有领域都是专家。我的调查越深入，得罪的人就越多。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">VI &middot; 审问诗人与工匠</div>
    <h2 class="anim-in">继续验证</h2>
    <div class="two-col anim-in">
      <div class="card">
        <!-- Lyre SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 50 L15 20 Q15 8, 25 5 Q35 8, 35 20 L35 50" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
            <line x1="15" y1="50" x2="35" y2="50" stroke="#c5a55a" stroke-width="2"/>
            <line x1="20" y1="15" x2="20" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="25" y1="12" x2="25" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="30" y1="15" x2="30" y2="48" stroke="#c5a55a" stroke-width="0.8"/>
            <line x1="15" y1="20" x2="35" y2="20" stroke="#c5a55a" stroke-width="1"/>
          </svg>
        </div>
        <h3 class="gold">诗 人</h3>
        <p>"我拿他们最得意的作品来问他们是什么意思。结果在座的任何人都比他们自己更能解释。诗人写诗靠的是灵感，不是智慧——他们就像占卜者，说出美妙的话却不理解其含义。"</p>
        <p class="secondary italic">"更糟的是，他们因为会写诗，就以为自己什么都懂。"</p>
      </div>
      <div class="card">
        <!-- Hammer/Anvil SVG -->
        <div class="svg-center" style="margin-bottom:8px;">
          <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="42" width="26" height="8" rx="2" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="8" y="50" width="34" height="4" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="20" y="18" width="10" height="24" rx="1" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
            <rect x="14" y="10" width="22" height="10" rx="2" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
          </svg>
        </div>
        <h3 class="olive-text">工 匠</h3>
        <p>"工匠确实知道很多我不知道的东西——这一点我承认。但他们的毛病和诗人一样：因为精通手艺，就以为自己在所有高深问题上都是专家。"</p>
      </div>
    </div>
    <div class="scroll-quote anim-in" style="margin-top:12px;">
      <p>"我问自己：我宁愿像现在这样一无所知但自知，还是像他们那样有些知识但盲目自大？答案是：<strong>保持现状。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 8 — 神谕的真相
     ============================================================ -->
<div class="slide slide--dark" data-notes="经过对政客、诗人、工匠的审问，我终于理解了神谕的含义。神不是在赞美我的智慧，而是用我的名字做一个例证：真正的智慧属于神，人类的智慧微不足道。我唯一的优势是知道自己无知。为了完成神赋予我的使命，我放弃了一切，活在赤贫之中。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">VII &middot; 神谕的真相</div>
    <!-- Large Owl SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="70" rx="40" ry="45" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <circle cx="65" cy="60" r="12" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="95" cy="60" r="12" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="65" cy="60" r="5" fill="#c5a55a" opacity="0.4"/>
        <circle cx="95" cy="60" r="5" fill="#c5a55a" opacity="0.4"/>
        <circle cx="65" cy="60" r="2.5" fill="#c5a55a"/>
        <circle cx="95" cy="60" r="2.5" fill="#c5a55a"/>
        <path d="M75 75 L80 82 L85 75" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <path d="M55 35 L62 48 M105 35 L98 48" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 90 Q45 100, 50 108 L55 105 Q52 98, 55 90" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <path d="M110 90 Q115 100, 110 108 L105 105 Q108 98, 105 90" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <path d="M65 112 L65 130 M75 115 L75 135 M85 115 L85 135 M95 112 L95 130" stroke="#c5a55a" stroke-width="1.2"/>
        <!-- Olive branch around owl -->
        <path d="M30 130 Q50 110, 80 140 Q110 110, 130 130" fill="none" stroke="#6b7c3e" stroke-width="1" opacity="0.5"/>
      </svg>
    </div>
    <div class="big-quote anim-in">"只有神是真正有智慧的。人类的智慧微不足道。"</div>
    <div class="scroll-quote anim-in" style="max-width:800px; margin:16px auto;">
      <p>"神谕的意思是：最有智慧的人，是像我苏格拉底这样，知道自己的智慧实际上毫无价值的人。"</p>
    </div>
    <div class="card-grid card-grid--3 anim-in" style="max-width:800px; margin:16px auto;">
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">①</p>
        <p>神不是在赞美我<br>而是用我做一个例证</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">②</p>
        <p>真正的智慧<br>只属于神</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="gold" style="font-size:20px; font-weight:700;">③</p>
        <p>我的"优势"仅仅在于<br><strong>我知道自己无知</strong></p>
      </div>
    </div>
    <p class="anim-in secondary" style="margin-top:12px;">"为了服务于神的这个使命，我放弃了一切世俗事务，生活在赤贫之中。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 9 — 为什么你们恨我
     ============================================================ -->
<div class="slide slide--light" data-notes="每次揭穿一个人，我就多一个敌人。更糟糕的是，雅典的年轻人开始模仿我——那些富家子弟闲着没事，跟在我后面看我审问人，然后他们自己也去审问别人。这让被审问的人更加恼火，于是他们把矛头指向我。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">VIII &middot; 仇恨的根源</div>
    <!-- Angry crowd SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#c06030" stroke-width="1.2" fill="none">
          <circle cx="20" cy="12" r="6"/><line x1="20" y1="18" x2="20" y2="35"/><line x1="20" y1="35" x2="15" y2="48"/><line x1="20" y1="35" x2="25" y2="48"/><line x1="20" y1="24" x2="12" y2="30"/><line x1="20" y1="24" x2="28" y2="20"/>
          <circle cx="45" cy="10" r="6"/><line x1="45" y1="16" x2="45" y2="33"/><line x1="45" y1="33" x2="40" y2="48"/><line x1="45" y1="33" x2="50" y2="48"/><line x1="45" y1="22" x2="37" y2="18"/><line x1="45" y1="22" x2="53" y2="28"/>
          <circle cx="70" cy="12" r="6"/><line x1="70" y1="18" x2="70" y2="35"/><line x1="70" y1="35" x2="65" y2="48"/><line x1="70" y1="35" x2="75" y2="48"/><line x1="70" y1="24" x2="62" y2="20"/><line x1="70" y1="24" x2="78" y2="28"/>
          <circle cx="95" cy="10" r="6"/><line x1="95" y1="16" x2="95" y2="33"/><line x1="95" y1="33" x2="90" y2="48"/><line x1="95" y1="33" x2="100" y2="48"/><line x1="95" y1="22" x2="87" y2="28"/><line x1="95" y1="22" x2="103" y2="18"/>
        </g>
      </svg>
    </div>
    <h2 class="anim-in">为什么你们恨我</h2>
    <p class="anim-in">"每次我揭穿一个人的虚假智慧，他就会感到羞辱，然后把怒气撒在我身上。他们大喊：<strong class="terracotta">'这个该死的苏格拉底，青年的败坏者！'</strong>被问到我到底教了什么坏东西，他们答不上来。"</p>
    <p class="anim-in">"更让他们恼火的是——你们的孩子开始模仿我。那些富家子弟没事可做，跟在我后面，看我审问那些自命不凡的人，觉得很有趣。然后他们也开始去审问别人。"</p>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">"这就是为什么今天有三个人站在那里控告我。"</strong></p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 10 — 法庭交锋：驯马师
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是我反击美勒托斯的第一个回合。我用驯马师类比来证明他的指控荒谬——不可能全雅典都在改善青年，唯独我一人在腐蚀。就像马一样，改善需要专业知识，多数人只会造成伤害。而且如果我真的腐蚀了身边的人，他们反过来会伤害我——我又不是傻子。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">IX &middot; 法庭交锋</div>
    <!-- Horse SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 55 Q30 30, 50 25 Q60 23, 65 28 L70 22 L75 18 L73 25 L68 30 Q72 35, 70 45 L75 60 L72 62 L68 48 L60 60 L57 62 L55 48 L45 58 L42 60 L44 46 L35 58 L32 60 L36 45 Q28 50, 25 55Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="72" cy="24" r="1.5" fill="#c5a55a"/>
        <path d="M75 18 Q80 14, 78 10 M75 18 Q82 16, 84 12" stroke="#c5a55a" stroke-width="1" fill="none"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">驯马师类比</h2>
    <p class="anim-in">"让我来当面质问美勒托斯。"</p>
    <ol class="logic-chain anim-in">
      <li>我问：如果我是腐蚀者，<strong>谁是改善者？</strong></li>
      <li>美勒托斯答：法律、法官、元老、全体公民——<strong>整个雅典都在改善青年，只有我在腐蚀！</strong></li>
      <li>我的反击：对于马，是一个驯马师能让它变好，还是所有人都能？</li>
      <li>答案：<strong>少数专家</strong>能改善，多数人反而会伤害。</li>
      <li>结论：认为一个人腐蚀而所有人改善——<strong class="terracotta">这完全是胡说八道。</strong></li>
    </ol>
    <p class="anim-in secondary italic" style="margin-top:12px;">"而且，如果我真的腐蚀了身边的人，他们会反过来伤害我——我为什么要做对自己不利的事？"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 11 — 法庭交锋：逻辑陷阱
     ============================================================ -->
<div class="slide slide--dark" data-notes="第二回合更精彩。美勒托斯一方面说我是无神论者，另一方面控告书又说我信奉神灵之事。这是一个明显的自相矛盾。我用了骡子的比喻——这就像承认骡子存在却否认马和驴的存在。这个逻辑陷阱让美勒托斯当场哑口无言。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">X &middot; 逻辑陷阱</div>
    <!-- Net/Trap SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 L40 50 L70 10" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="10" y1="10" x2="70" y2="10" stroke="#c5a55a" stroke-width="2"/>
        <line x1="18" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="26" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="34" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="46" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="54" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="62" y1="10" x2="40" y2="50" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="15" y1="20" x2="65" y2="20" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="22" y1="30" x2="58" y2="30" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
        <line x1="30" y1="40" x2="50" y2="40" stroke="#c5a55a" stroke-width="0.5" opacity="0.5"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">自相矛盾</h2>
    <p class="anim-in">"美勒托斯说我是'彻底的无神论者'，说我认为太阳是石头、月亮是泥土。美勒托斯，你搞错了——那是阿那克萨哥拉的学说，在剧场花一个德拉克马就能听到。"</p>
    <div class="card anim-in" style="margin:12px 0;">
      <p style="text-align:center; margin-bottom:8px;"><strong class="gold">逻辑推导链：</strong></p>
      <p style="text-align:center;">控告书说我"信奉神灵之事" <span class="gold">&rarr;</span> 能信神灵之事而不信精灵吗？<span class="gold">&rarr;</span> <strong>不能</strong> <span class="gold">&rarr;</span> 精灵是神或神的后代 <span class="gold">&rarr;</span> 因此你说我不信神，又说我信神 <span class="gold">&rarr;</span> <strong class="terracotta">自相矛盾！</strong></p>
    </div>
    <div class="scroll-quote anim-in">
      <p>"这就像说：<strong>承认骡子存在，却否认马和驴的存在。</strong>美勒托斯，你写这份控告书，只是因为你找不到真正的罪名来指控我。"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 12 — 牛虻
     ============================================================ -->
<div class="slide slide--light" data-notes="牛虻的比喻是整篇申辩中最著名的段落之一。我把自己比作一只被神赐给雅典的牛虻，把雅典比作一匹高贵但懒惰的大马。我整天叮咬这匹马，让它保持清醒。如果你们拍死我，你们可以继续沉睡——除非神再派来一只。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XI &middot; 牛虻</div>
    <!-- Gadfly SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(80,60)">
          <!-- Body -->
          <ellipse cx="0" cy="0" rx="18" ry="10" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <ellipse cx="22" cy="-2" rx="8" ry="6" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <!-- Head -->
          <circle cx="32" cy="-4" r="5" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
          <line x1="37" y1="-6" x2="42" y2="-12" stroke="#c5a55a" stroke-width="1"/>
          <line x1="36" y1="-8" x2="40" y2="-16" stroke="#c5a55a" stroke-width="1"/>
          <!-- Stinger -->
          <line x1="37" y1="-2" x2="44" y2="0" stroke="#c06030" stroke-width="1.5"/>
          <!-- Wings -->
          <ellipse cx="-5" cy="-18" rx="20" ry="10" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.6" transform="rotate(-15)"/>
          <ellipse cx="5" cy="-20" rx="18" ry="8" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.6" transform="rotate(10)"/>
          <!-- Legs -->
          <line x1="-10" y1="8" x2="-18" y2="20" stroke="#c5a55a" stroke-width="1"/>
          <line x1="-2" y1="9" x2="-6" y2="22" stroke="#c5a55a" stroke-width="1"/>
          <line x1="8" y1="8" x2="6" y2="22" stroke="#c5a55a" stroke-width="1"/>
          <line x1="16" y1="5" x2="18" y2="18" stroke="#c5a55a" stroke-width="1"/>
          <!-- Eye -->
          <circle cx="34" cy="-5" r="1.5" fill="#c5a55a"/>
        </g>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">我就是那只牛虻</h2>
    <div class="scroll-quote anim-in">
      <p>"如果你们杀了我，你们不容易找到我的继任者。请允许我用一个滑稽的比喻——<strong>我就像一只牛虻，被神赐给了这个城邦。而雅典就像一匹高贵的骏马，因为体型庞大而行动迟缓。</strong>我就是整天叮在你们身上的那只牛虻，唤醒你们、说服你们、责备你们。"</p>
    </div>
    <p class="anim-in">"你们可以一巴掌拍死我，然后在余生中继续沉睡。除非神再派来另一只牛虻。"</p>
    <p class="anim-in secondary italic">"如果你们不信我是神派来的，看看我的贫穷就知道了——有谁会为了自讨苦吃而放弃一切？"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 13 — 我的两次抗命
     ============================================================ -->
<div class="slide slide--light" data-notes="这两个故事证明我不是空谈正义，而是真正用生命去实践。在民主制度下，我拒绝违法的集体审判；在暴政之下，我拒绝逮捕无辜者。两次我都差点丧命。无论政体如何变化，我只服从一个主人——正义。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XII &middot; 两次抗命</div>
    <!-- Shield SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 5 L45 15 L45 35 Q45 50, 25 58 Q5 50, 5 35 L5 15 Z" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M25 12 L38 19 L38 34 Q38 45, 25 51 Q12 45, 12 34 L12 19 Z" fill="none" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
        <line x1="25" y1="20" x2="25" y2="45" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
        <line x1="15" y1="30" x2="35" y2="30" stroke="#c5a55a" stroke-width="0.8" opacity="0.4"/>
      </svg>
    </div>
    <h2 class="anim-in">我用生命实践正义</h2>
    <div class="two-col anim-in">
      <div class="card">
        <h3 class="olive-text">民主下的不义（公元前406年）</h3>
        <p>"阿吉纽西海战后，你们要集体审判十位将军——这违反法律。我当时恰好是执政团成员，<strong>我是唯一一个投反对票的人。</strong>你们威胁要逮捕我。但我宁可冒生命危险，也不参与违法行为。"</p>
      </div>
      <div class="card">
        <h3 class="terracotta">暴政下的不义（公元前404年）</h3>
        <p>"三十僭主命令我和另外四人去逮捕萨拉米斯的莱昂处死。其他四个人去了。而我——<strong>悄悄回了家。</strong>如果僭主没有很快倒台，我现在就不会站在这里了。"</p>
      </div>
    </div>
    <div class="insight-card anim-in" style="text-align:center; margin-top:12px;">
      <p style="margin:0; font-size:clamp(16px,1.6vw,20px);"><strong class="gold">"无论是民主还是暴政，我只服从一个主人——正义。"</strong></p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 14 — 我不会求饶
     ============================================================ -->
<div class="slide slide--light" data-notes="这是古希腊法庭上常见的做法——被告把妻儿带上来哭泣求情。但我拒绝这样做。我有三个儿子，一个快成年了，两个还小。但我认为用同情来影响判决既有损我的尊严，也是在逼法官违背誓言。当我因为'不虔诚'受审时，我怎能做出不虔诚的事？">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XIII &middot; 尊严</div>
    <!-- Dignified figure SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="14" r="8" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 22 L30 50" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 30 L15 42" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 30 L45 42" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 50 L20 72" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M30 50 L40 72" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Robe -->
        <path d="M22 28 Q18 40, 15 55 Q25 52, 30 50 Q35 52, 45 55 Q42 40, 38 28" fill="none" stroke="#c5a55a" stroke-width="1" opacity="0.5"/>
      </svg>
    </div>
    <h2 class="anim-in">我不会求饶</h2>
    <p class="anim-in">"我有三个儿子——一个快成年了，两个还年幼。但我不会把他们带上来哭哭啼啼地求你们开恩。"</p>
    <div class="card-grid card-grid--3 anim-in">
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">①</p>
        <p>"到了我这个年纪，做那种事太丢人了"</p>
      </div>
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">②</p>
        <p>"那会让雅典在外邦人面前显得可笑"</p>
      </div>
      <div class="card">
        <p class="gold" style="font-size:18px; font-weight:700;">③</p>
        <p>"你们宣誓是依法审判，不是施舍同情。如果我求你们法外开恩，那不就是在逼你们违背誓言吗？"</p>
      </div>
    </div>
    <div class="scroll-quote anim-in" style="margin-top:12px;">
      <p>"当我自己正因'不虔诚'受审时，我怎能做出如此不虔诚的事？<strong>我把命运交给你们和神。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 15 — VERDICT
     ============================================================ -->
<div class="slide slide--dark" data-notes="五百零一位陪审员投票。有罪票仅比无罪票多出约三十票——也就是说如果有十五六个人改变想法，我就获释了。这个微小的差距说明控告的理由并不充分。如果没有安尼托斯和莱孔的参与，美勒托斯连五分之一的票都拿不到——那样他自己反而要被罚款。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Scales SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--md" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="5" x2="40" y2="50" stroke="#c5a55a" stroke-width="2"/>
        <line x1="10" y1="15" x2="70" y2="15" stroke="#c5a55a" stroke-width="2"/>
        <path d="M4 30 L10 15 L16 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M2 30 Q10 38, 18 30" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M64 25 L70 15 L76 25" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M62 25 Q70 32, 78 25" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="32" y="50" width="16" height="4" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <circle cx="40" cy="5" r="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
      </svg>
    </div>
    <div class="verdict anim-in">判决：有罪</div>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px);">"仅以约30票之差。如果安尼托斯和莱孔没有参与，美勒托斯连五分之一的票都拿不到。"</p>
    <div class="part-label anim-in" style="margin-top:24px;">P A R T &nbsp; I I &nbsp; &mdash; &nbsp; 量 刑</div>
  </div>
</div>

<!-- ============================================================
     SLIDE 16 — 我该受什么"罚"？
     ============================================================ -->
<div class="slide slide--light" data-notes="按雅典法律，被判有罪后被告可以提出量刑建议。我的建议令法庭震惊——我说我应该在普里塔尼厄姆免费用餐，就像奥林匹亚冠军一样。这不是傲慢，而是我真诚地认为自己是雅典的恩人。然后我逐一排除了其他可能的刑罚。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XIV &middot; 量刑建议</div>
    <!-- Olive Wreath SVG -->
    <div class="anim-in svg-center" style="margin-bottom:8px;">
      <svg class="svg-icon--md" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 70 C20 65, 8 45, 10 25" stroke="#6b7c3e" stroke-width="1.5" fill="none"/>
        <path d="M40 70 C60 65, 72 45, 70 25" stroke="#6b7c3e" stroke-width="1.5" fill="none"/>
        <ellipse cx="14" cy="50" rx="8" ry="4" transform="rotate(-25 14 50)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="11" cy="38" rx="8" ry="4" transform="rotate(-45 11 38)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="14" cy="28" rx="7" ry="3.5" transform="rotate(-65 14 28)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="66" cy="50" rx="8" ry="4" transform="rotate(25 66 50)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="69" cy="38" rx="8" ry="4" transform="rotate(45 69 38)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="66" cy="28" rx="7" ry="3.5" transform="rotate(65 66 28)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="22" cy="20" rx="7" ry="3.5" transform="rotate(-80 22 20)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="58" cy="20" rx="7" ry="3.5" transform="rotate(80 58 20)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="32" cy="14" rx="7" ry="3.5" transform="rotate(10 32 14)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="48" cy="14" rx="7" ry="3.5" transform="rotate(-10 48 14)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
      </svg>
    </div>
    <h2 class="anim-in">我该受什么"罚"？</h2>
    <p class="anim-in">"按规矩，现在我要提出一个量刑建议。好吧，让我想想——一个穷人，是你们的恩人，需要闲暇来教导你们，他该得到什么？"</p>
    <div class="scroll-quote anim-in">
      <p>"答案很简单：<strong>在普里塔尼厄姆免费用餐</strong>——就像奥林匹亚冠军一样。而且我比他们更有资格，因为奥林匹亚冠军只给你们幸福的表象，而我给你们<strong class="gold">真实的幸福。</strong>"</p>
    </div>
    <div class="card-grid card-grid--4 anim-in">
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">死刑</p>
        <p class="small">"我不知道死是好是坏"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">监禁</p>
        <p class="small">"给官吏当奴隶？"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">流放</p>
        <p class="small">"到哪里年轻人都会跟着我"</p>
      </div>
      <div class="card" style="text-align:center;">
        <p class="terracotta" style="font-weight:700;">沉默</p>
        <p class="small">"那是对神的违抗"</p>
      </div>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 17 — 未经审视的人生
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是整篇申辩中最著名的一句话——未经审视的人生不值得过。这不是一句空洞的格言，而是我用一生来实践的信念。审视自己和他人，谈论美德——这是人最大的善。最终我的朋友们替我凑了三十弥那作为罚金，但法庭不接受。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">XV &middot; 最著名的话</div>
    <!-- Lantern SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--md" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 15 Q25 5, 30 3 Q35 5, 35 15" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <rect x="20" y="15" width="20" height="35" rx="3" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="20" y1="22" x2="40" y2="22" stroke="#c5a55a" stroke-width="0.8" opacity="0.5"/>
        <line x1="20" y1="43" x2="40" y2="43" stroke="#c5a55a" stroke-width="0.8" opacity="0.5"/>
        <ellipse cx="30" cy="32" rx="4" ry="6" fill="#c5a55a" opacity="0.3"/>
        <ellipse cx="30" cy="30" rx="2" ry="3" fill="#c5a55a" opacity="0.6"/>
        <rect x="22" y="50" width="16" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <line x1="30" y1="53" x2="30" y2="60" stroke="#c5a55a" stroke-width="1.2"/>
        <rect x="25" y="60" width="10" height="3" rx="1" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
      </svg>
    </div>
    <div class="big-quote anim-in" style="margin:20px 0;">"未经审视的人生不值得过"</div>
    <p class="anim-in" style="font-family:var(--font-heading); color:rgba(240,234,214,0.5); font-style:italic; font-size:clamp(14px,1.4vw,18px);">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</p>
    <div class="scroll-quote anim-in" style="max-width:800px; margin:20px auto;">
      <p>"每天谈论美德，审视自己和他人——这是人最大的善。你们让我闭嘴？那不可能。"</p>
    </div>
    <p class="anim-in secondary">"最终，我的朋友们——柏拉图、克里托、克里托布鲁斯、阿波罗多洛斯——替我凑了<strong>30弥那</strong>作为罚金。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 18 — SENTENCE
     ============================================================ -->
<div class="slide slide--dark" data-notes="法庭拒绝了罚金方案，判处死刑。据说第二次投票中，判死刑的票数比第一次判有罪的票数还多——可能是因为我的'免费用餐'建议激怒了更多陪审员。但我不后悔。宁可坦然面对死亡，也不愿卑躬屈膝。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <!-- Hemlock Cup SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 40 Q35 90, 60 95 Q85 90, 85 40" fill="none" stroke="#c5a55a" stroke-width="2"/>
        <line x1="30" y1="40" x2="90" y2="40" stroke="#c5a55a" stroke-width="2"/>
        <ellipse cx="60" cy="40" rx="30" ry="6" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <path d="M60 95 L60 105" stroke="#c5a55a" stroke-width="2"/>
        <ellipse cx="60" cy="108" rx="15" ry="4" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Liquid -->
        <path d="M42 60 Q42 85, 60 88 Q78 85, 78 60" fill="#c5a55a" opacity="0.15"/>
        <ellipse cx="60" cy="60" rx="22" ry="4" fill="#c5a55a" opacity="0.2"/>
        <!-- Steam -->
        <path d="M50 32 Q48 25, 52 20" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M60 30 Q58 22, 62 16" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M70 32 Q68 25, 72 20" stroke="#c5a55a" stroke-width="0.8" fill="none" opacity="0.4"/>
      </svg>
    </div>
    <div class="verdict anim-in">判决：死刑</div>
    <div class="part-label anim-in">P A R T &nbsp; I I I &nbsp; &mdash; &nbsp; 最 后 的 话</div>
  </div>
</div>

<!-- ============================================================
     SLIDE 19 — 致判我死刑的人
     ============================================================ -->
<div class="slide slide--light" data-notes="面对死刑判决，我没有沉默，而是对判我死刑的人说出了最后的警告。赛跑的比喻深刻而美丽——死亡追上了我，因为我老了跑得慢；但不义追上了你们，因为不义比死亡跑得更快。我还做出了预言：杀我不能堵住批评的嘴，只会招来更多更年轻的质问者。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="corner-ornament corner-ornament--tl"></div>
  <div class="corner-ornament corner-ornament--tr"></div>
  <div class="corner-ornament corner-ornament--bl"></div>
  <div class="corner-ornament corner-ornament--br"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XVI &middot; 致判我死刑的人</div>
    <!-- Pointing figure SVG -->
    <div class="anim-in" style="margin-bottom:8px;">
      <svg class="svg-icon--sm" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="10" r="6" fill="none" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="16" x2="15" y2="35" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="35" x2="10" y2="48" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="35" x2="20" y2="48" stroke="#c06030" stroke-width="1.5"/>
        <line x1="15" y1="22" x2="50" y2="18" stroke="#c06030" stroke-width="1.5"/>
        <circle cx="52" cy="18" r="2" fill="#c06030"/>
      </svg>
    </div>
    <h2 class="anim-in">致判我死刑的人</h2>
    <div class="scroll-quote anim-in">
      <p>"<strong>我宁愿以我自己的方式说话而死，也不愿以你们的方式说话而活。</strong>"</p>
    </div>
    <div class="card anim-in" style="margin:12px 0;">
      <h3 class="gold">赛跑比喻</h3>
      <p>"逃避死亡并不难，难的是逃避不义——因为<strong class="terracotta">不义比死亡跑得更快。</strong>我年老体衰，较慢的跑者——死亡——追上了我。而你们年轻力壮，但较快的跑者——不义——已经追上了你们。"</p>
    </div>
    <div class="insight-card anim-in">
      <p style="margin:0;"><strong class="gold">预言：</strong>"我即将死去，在这个时刻，人被赋予预言的能力：在我之后，会有更多、更年轻的控告者来质问你们。<strong>杀人不能堵住批评的嘴——改善自己才是唯一的出路。</strong>"</p>
    </div>
  </div>
</div>

<!-- ============================================================
     SLIDE 20 — 论死亡
     ============================================================ -->
<div class="slide slide--dark" data-notes="这段关于死亡的论述是整篇申辩中最动人的部分。我的神灵之声——那个从小伴随我的内心声音——今天全程沉默。它连小事都会阻止我，但今天一声不吭。这意味着发生在我身上的事是好的。然后我提出了死亡的两种可能，两种都不可怕。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner">
    <div class="section-num anim-in">XVII &middot; 论死亡</div>
    <!-- Fork in road SVG -->
    <div class="anim-in svg-center" style="margin-bottom:12px;">
      <svg class="svg-icon--md" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 65 L50 35" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 35 L20 8" stroke="#c5a55a" stroke-width="2"/>
        <path d="M50 35 L80 8" stroke="#c5a55a" stroke-width="2"/>
        <circle cx="50" cy="35" r="3" fill="#c5a55a"/>
        <!-- Left: moon (sleep) -->
        <path d="M14 8 Q8 2, 14 -2 Q22 4, 14 8Z" fill="none" stroke="#c5a55a" stroke-width="1.2" transform="translate(2,4)"/>
        <!-- Right: sun (afterlife) -->
        <circle cx="82" cy="8" r="5" fill="none" stroke="#c5a55a" stroke-width="1.2"/>
        <line x1="82" y1="0" x2="82" y2="-3" stroke="#c5a55a" stroke-width="0.8"/><line x1="82" y1="16" x2="82" y2="19" stroke="#c5a55a" stroke-width="0.8"/>
        <line x1="74" y1="8" x2="71" y2="8" stroke="#c5a55a" stroke-width="0.8"/><line x1="90" y1="8" x2="93" y2="8" stroke="#c5a55a" stroke-width="0.8"/>
      </svg>
    </div>
    <h2 class="anim-in" style="color:var(--gold);">两条路，都不可怕</h2>
    <p class="anim-in">"我的神灵之声今天全程沉默——从我出门，到上庭，到此刻。它连小事都会阻止我，但今天一声不吭。这说明什么？<strong>发生在我身上的事，是好的。</strong>"</p>
    <div class="two-col anim-in" style="margin-top:12px;">
      <div class="card">
        <h3 class="gold" style="text-align:center;">无梦之眠</h3>
        <p>"如果死亡是完全无意识的状态——选出你一生中连梦都没有的安睡之夜，即使波斯大王也找不出几个。如果永恒就是这样一个夜晚，<strong>那死亡真是赚到了。</strong>"</p>
      </div>
      <div class="card">
        <h3 class="gold" style="text-align:center;">灵魂的迁徙</h3>
        <p>"如果死后是前往另一个世界——我可以遇见弥诺斯、荷马、赫西俄德！与他们交谈、向他们提问——<strong>那该是多么无穷的喜悦！</strong>"</p>
      </div>
    </div>
    <p class="anim-in" style="text-align:center; margin-top:12px; color:var(--gold); font-style:italic;">"而且最重要的是——在那个世界，他们不会因为一个人提问就判他死刑。"</p>
  </div>
</div>

<!-- ============================================================
     SLIDE 21 — 最后的话
     ============================================================ -->
<div class="slide slide--dark" data-notes="这是苏格拉底最后的遗言。他请求雅典人善待他的儿子——如果他们偏离了美德的道路，请像他折磨雅典人一样折磨他们。最后那句'哪一个更好，只有神知道'是全篇的最后一句话，也是西方哲学史上最优雅的告别。">
  <div class="greek-key-border"></div>
  <div class="meander-top"></div>
  <div class="meander-bottom"></div>
  <div class="slide-inner center">
    <div class="section-num anim-in">XVIII &middot; 永别</div>
    <!-- Hemlock + Olive SVG -->
    <div class="anim-in svg-center">
      <svg class="svg-icon--lg" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Cup -->
        <path d="M55 35 Q55 80, 80 85 Q105 80, 105 35" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="110" y2="35" stroke="#c5a55a" stroke-width="1.5"/>
        <ellipse cx="80" cy="35" rx="30" ry="5" fill="none" stroke="#c5a55a" stroke-width="1"/>
        <path d="M80 85 L80 95" stroke="#c5a55a" stroke-width="1.5"/>
        <ellipse cx="80" cy="98" rx="12" ry="3" fill="none" stroke="#c5a55a" stroke-width="1.5"/>
        <!-- Olive branch draped over cup -->
        <path d="M40 30 Q60 20, 80 25 Q100 20, 120 30" fill="none" stroke="#6b7c3e" stroke-width="1.5"/>
        <ellipse cx="50" cy="26" rx="6" ry="3" transform="rotate(-15 50 26)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="65" cy="22" rx="6" ry="3" transform="rotate(-5 65 22)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="95" cy="22" rx="6" ry="3" transform="rotate(5 95 22)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <ellipse cx="110" cy="26" rx="6" ry="3" transform="rotate(15 110 26)" fill="none" stroke="#6b7c3e" stroke-width="1"/>
        <!-- Small olives -->
        <circle cx="57" cy="24" r="2" fill="#6b7c3e" opacity="0.4"/>
        <circle cx="103" cy="24" r="2" fill="#6b7c3e" opacity="0.4"/>
      </svg>
    </div>
    <p class="anim-in" style="font-size:clamp(16px,1.6vw,20px); max-width:700px; margin:0 auto 16px;">"要记住一件事：<strong>好人无论在生前还是死后，都不会遭受真正的恶。</strong>神不会忽视他。"</p>
    <p class="anim-in" style="font-size:clamp(15px,1.4vw,18px); max-width:700px; margin:0 auto 20px; opacity:0.85;">"我有一个最后的请求——等我的儿子长大了，如果他们更在乎金钱而非美德，如果他们假装很了不起其实一无是处——请像我折磨你们一样折磨他们。"</p>
    <div class="big-quote anim-in" style="font-size:clamp(22px,2.8vw,36px); max-width:800px; margin:16px auto;">"离别的时刻已经到来。我们各走各路——我去赴死，你们去生活。哪一个更好，只有神知道。"</div>
  </div>
</div>

</div><!-- /slides-container -->

<!-- ============================================================
   CONTROLS
   ============================================================ -->
<div class="controls">
  <button onclick="toggleAutoplay()" id="btnAutoplay" title="自动播放 (A)">&#9654; 自动</button>
  <button onclick="toggleNotes()" id="btnNotes" title="演讲者备注 (N)">备注</button>
  <button onclick="goFullscreen()" title="全屏 (F)">全屏</button>
</div>

<div class="slide-number" id="slideNumber">1 / 21</div>
<div class="progress-bar" id="progressBar"></div>
<div class="notes-panel" id="notesPanel"></div>

<script>
// ============================================================
// SLIDE ENGINE
// ============================================================
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;
let autoplayInterval = null;
let notesVisible = false;

function showSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    if (i === index) s.classList.add('active');
    else if (i < index) s.classList.add('prev');
  });
  currentSlide = index;
  document.getElementById('slideNumber').textContent = (index + 1) + ' / ' + totalSlides;
  document.getElementById('progressBar').style.width = ((index + 1) / totalSlides * 100) + '%';
  updateNotes();
}

function nextSlide() { showSlide(Math.min(currentSlide + 1, totalSlides - 1)); }
function prevSlide() { showSlide(Math.max(currentSlide - 1, 0)); }

function updateNotes() {
  const note = slides[currentSlide].getAttribute('data-notes') || '';
  document.getElementById('notesPanel').textContent = note;
}

function toggleNotes() {
  notesVisible = !notesVisible;
  document.getElementById('notesPanel').classList.toggle('visible', notesVisible);
  document.getElementById('btnNotes').classList.toggle('active', notesVisible);
}

function toggleAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    document.getElementById('btnAutoplay').classList.remove('active');
  } else {
    autoplayInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) nextSlide();
      else { clearInterval(autoplayInterval); autoplayInterval = null; document.getElementById('btnAutoplay').classList.remove('active'); }
    }, 8000);
    document.getElementById('btnAutoplay').classList.add('active');
  }
}

function goFullscreen() {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'Home') { e.preventDefault(); showSlide(0); }
  else if (e.key === 'End') { e.preventDefault(); showSlide(totalSlides - 1); }
  else if (e.key === 'f' || e.key === 'F') goFullscreen();
  else if (e.key === 'n' || e.key === 'N') toggleNotes();
  else if (e.key === 'a' || e.key === 'A') toggleAutoplay();
  else if (e.key === 'Escape') {
    if (autoplayInterval) toggleAutoplay();
    if (notesVisible) toggleNotes();
  }
});

// Click navigation
document.addEventListener('click', (e) => {
  if (e.target.closest('.controls') || e.target.closest('.notes-panel')) return;
  const x = e.clientX / window.innerWidth;
  if (x > 0.5) nextSlide(); else prevSlide();
});

// Touch support
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) { if (dx < 0) nextSlide(); else prevSlide(); }
});

// Initialize
showSlide(0);
</script>

</body>
</html>

=== FILE: .claude/skills/presentation-skill/examples/state-enterprise.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>关于本人无罪的申辩报告 — 苏格拉底</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
/* ===== RESET & BASE ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; }
body {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #f6f4f2;
  color: #1f1f1f;
  line-height: 1.78;
  font-weight: 400;
  font-size: 1.02rem;
  overflow: hidden;
}

/* ===== DESIGN TOKENS ===== */
:root {
  --accent: #900000;
  --accent2: #c00000;
  --soft-red: rgba(144, 0, 0, 0.08);
  --soft-gold: #efe7df;
  --text: #1f1f1f;
  --text2: #666666;
  --border: #d9d9d9;
  --page-bg: #f6f4f2;
  --slide-bg: #ffffff;
  --radius: 18px;
  --radius-sm: 14px;
  --radius-pill: 999px;
  --shadow: 0 16px 40px rgba(0,0,0,0.06);
}

/* ===== SLIDE ENGINE ===== */
.deck { position: relative; width: 100vw; height: 100vh; overflow: hidden; }
.slide {
  position: absolute; top: 0; left: 0;
  width: 100vw; height: 100vh;
  display: none; flex-direction: column;
  padding: 0;
  background: var(--page-bg);
}
.slide.active { display: flex; }
.slide-inner {
  width: min(1120px, 92vw);
  max-height: 88vh;
  margin: auto;
  background: var(--slide-bg);
  border: 1px solid var(--border);
  border-radius: 26px;
  box-shadow: var(--shadow);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2.4rem 3rem 2rem;
}
.slide-inner::-webkit-scrollbar { width: 4px; }
.slide-inner::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ===== TOP RULE ===== */
.top-rule {
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), transparent);
  border-radius: 26px 26px 0 0;
}

/* ===== SLIDE NUMBER ===== */
.slide-number {
  position: absolute; top: 18px; right: 28px;
  font-size: 0.82rem; font-weight: 500; color: var(--text2);
  z-index: 10;
}

/* ===== EYEBROW ===== */
.eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; font-weight: 700; color: var(--accent);
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 0.6rem;
}
.eyebrow::before {
  content: ''; display: inline-block;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
}

/* ===== HEADINGS ===== */
h1 { font-size: 3.2rem; font-weight: 900; line-height: 1.18; color: var(--text); margin-bottom: 0.5rem; }
h2 { font-size: 2.12rem; font-weight: 800; line-height: 1.28; color: var(--text); margin-bottom: 0.6rem; }
h3 { font-size: 1.05rem; font-weight: 700; color: var(--accent); margin-bottom: 0.4rem; }

/* ===== CLAIM BOX ===== */
.claim-box {
  border-left: 5px solid var(--accent);
  background: linear-gradient(135deg, var(--soft-red), rgba(144,0,0,0.02));
  padding: 1.2rem 1.5rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin: 1rem 0;
  font-size: 1.15rem; font-weight: 700; line-height: 1.7;
}
.claim-box .red { color: var(--accent); }

/* ===== CARD ===== */
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem 1.3rem;
  background: #fff;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
.card-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 0.6rem;
}
.card-index {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.82rem; font-weight: 700; flex-shrink: 0;
}

/* ===== TAG ===== */
.tag {
  display: inline-block;
  background: var(--soft-gold);
  color: var(--accent);
  font-size: 0.75rem; font-weight: 700;
  padding: 3px 12px;
  border-radius: var(--radius-pill);
}

/* ===== STAT ===== */
.stat {
  text-align: center; padding: 0.8rem 0.5rem;
}
.stat-number {
  font-size: 2.3rem; font-weight: 900; color: var(--accent);
  line-height: 1.2;
}
.stat-label {
  font-size: 0.82rem; color: var(--text2); font-weight: 500;
  margin-top: 2px;
}

/* ===== WARNING BOX ===== */
.warning-box {
  border-left: 5px solid var(--accent2);
  background: linear-gradient(135deg, rgba(192,0,0,0.06), rgba(192,0,0,0.01));
  padding: 1rem 1.3rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin: 1rem 0;
  font-size: 0.95rem;
}
.warning-box strong { color: var(--accent); }

/* ===== GRIDS ===== */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.8rem 0; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 0.8rem 0; }

/* ===== AGENDA ===== */
.agenda-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eee;
}
.agenda-item:last-child { border-bottom: none; }
.agenda-index {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}

/* ===== TWO COLUMN COMPARE ===== */
.compare-col {
  padding: 1rem 1.2rem;
  border-radius: var(--radius-sm);
}
.compare-col.red-side { border-left: 4px solid var(--accent); background: var(--soft-red); }
.compare-col.gray-side { border-left: 4px solid var(--border); background: #f9f9f9; }
.compare-col h3 { margin-bottom: 0.5rem; }
.compare-col ul { padding-left: 1.2rem; }
.compare-col li { margin-bottom: 0.4rem; font-size: 0.95rem; }

/* ===== FLOW DIAGRAM ===== */
.flow {
  display: flex; align-items: center; justify-content: center; gap: 0;
  margin: 1rem 0; flex-wrap: wrap;
}
.flow-step {
  background: var(--soft-red);
  color: var(--accent); font-weight: 700;
  padding: 0.6rem 1.2rem; border-radius: var(--radius-sm);
  font-size: 0.95rem;
}
.flow-arrow {
  font-size: 1.3rem; color: var(--accent); padding: 0 0.3rem;
}

/* ===== NUMBERED ARGUMENT ===== */
.arg-step {
  display: flex; gap: 12px; align-items: flex-start;
  margin-bottom: 0.6rem;
}
.arg-num {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent); color: #fff;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0; margin-top: 2px;
}
.arg-text { font-size: 0.95rem; }

/* ===== COVER SPECIFICS ===== */
.cover-meta { display: flex; gap: 1rem; margin: 1rem 0; flex-wrap: wrap; }
.meta-card {
  flex: 1; min-width: 200px;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 1rem 1.2rem;
}
.meta-card h3 { margin-bottom: 0.4rem; }
.cover-subtitle {
  font-size: 1.1rem; color: var(--text2); font-weight: 400;
  margin-bottom: 1rem;
}

/* ===== BIG QUOTE ===== */
.big-quote {
  font-size: 1.8rem; font-weight: 900; color: var(--accent);
  text-align: center; padding: 1.5rem 1rem;
  line-height: 1.5;
}
.big-quote .greek {
  display: block; font-size: 1rem; font-weight: 400; color: var(--text2);
  margin-top: 0.5rem;
}

/* ===== SUMMARY TABLE ===== */
.summary-table {
  width: 100%; border-collapse: collapse; margin: 0.8rem 0;
  font-size: 0.88rem;
}
.summary-table th {
  background: var(--accent); color: #fff; font-weight: 700;
  padding: 0.6rem 0.8rem; text-align: left;
}
.summary-table td {
  padding: 0.55rem 0.8rem; border-bottom: 1px solid #eee;
}
.summary-table tr:nth-child(even) td { background: #fafafa; }
.summary-table tr:hover td { background: var(--soft-red); }

/* ===== SPEAKER NOTES ===== */
.speaker-notes {
  display: none;
}
body.show-notes .speaker-notes {
  display: block;
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #1a1a1a; color: #eee;
  padding: 1rem 2rem; font-size: 0.88rem;
  max-height: 25vh; overflow-y: auto;
  z-index: 1000; line-height: 1.6;
  border-top: 3px solid var(--accent);
}

/* ===== VERDICT HIGHLIGHT ===== */
.verdict-box {
  background: var(--accent);
  color: #fff;
  text-align: center;
  padding: 2rem;
  border-radius: var(--radius);
  margin: 1rem 0;
}
.verdict-box .stat-number { color: #fff; font-size: 3rem; }
.verdict-box .stat-label { color: rgba(255,255,255,0.8); font-size: 1rem; }

/* ===== PROGRESS BAR ===== */
#progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: var(--accent); z-index: 9999;
  transition: width 0.3s;
}

/* ===== CONTROLS HINT ===== */
.controls-hint {
  position: fixed; bottom: 16px; right: 20px;
  font-size: 0.72rem; color: var(--text2);
  background: rgba(255,255,255,0.9);
  padding: 4px 12px; border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  z-index: 900;
}

/* ===== TRANSITION DIVIDER ===== */
.part-divider {
  text-align: center; padding: 1rem 0;
  border-top: 2px solid var(--border);
  margin-top: 1.2rem;
}
.part-divider span {
  display: inline-block;
  background: var(--soft-gold);
  color: var(--accent);
  font-weight: 700; font-size: 0.9rem;
  padding: 0.4rem 1.4rem;
  border-radius: var(--radius-pill);
}

/* ===== PRINT CSS ===== */
@media print {
  body { overflow: visible; background: #fff; }
  .deck { position: static; width: auto; height: auto; overflow: visible; }
  .slide {
    display: flex !important; position: static;
    width: 100%; height: auto; min-height: 0;
    page-break-after: always; page-break-inside: avoid;
    margin: 0; padding: 0;
  }
  .slide-inner {
    width: 100%; max-height: none; margin: 0;
    box-shadow: none; border: 1px solid #ddd;
    border-radius: 0; padding: 1.5rem 2rem;
    page-break-inside: avoid;
  }
  #progress, .controls-hint { display: none; }
  .speaker-notes { display: none !important; }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 800px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  h1 { font-size: 2.2rem; }
  h2 { font-size: 1.5rem; }
  .slide-inner { padding: 1.5rem 1.2rem; }
  .big-quote { font-size: 1.3rem; }
  .flow { gap: 0.3rem; }
}
</style>
</head>
<body>

<div id="progress"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide active" data-notes="各位陪审员同志们，本人苏格拉底，今天就控方对本人提出的指控，做一次正式的申辩汇报。请各位耐心听完全部内容后再做判断。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">01 / 21</div>
  <div class="eyebrow">雅典人民法庭 · 公元前399年</div>
  <h1>关于本人无罪的<br>申辩报告</h1>
  <p class="cover-subtitle">汇报人：苏格拉底 &nbsp;|&nbsp; 陪审团：501名雅典公民</p>
  <div class="cover-meta">
    <div class="meta-card">
      <h3>指控事项</h3>
      <p style="font-size:0.92rem;">1. 腐蚀雅典青年<br>2. 不信城邦诸神<br>3. 引入新的神灵</p>
    </div>
    <div class="meta-card">
      <h3>汇报结构</h3>
      <div class="agenda-item"><div class="agenda-index">I</div><div><strong>辩护工作汇报</strong><br><span style="color:var(--text2);font-size:0.85rem;">案件背景、旧指控澄清、神谕调查、实地调查、仇恨成因、逐条反驳、社会功能定位、政治立场</span></div></div>
      <div class="agenda-item"><div class="agenda-index">II</div><div><strong>量刑意见</strong><br><span style="color:var(--text2);font-size:0.85rem;">量刑建议、核心价值主张</span></div></div>
      <div class="agenda-item"><div class="agenda-index">III</div><div><strong>总结陈词</strong><br><span style="color:var(--text2);font-size:0.85rem;">致控方警告、死亡分析、最后请求</span></div></div>
    </div>
  </div>
</div>
<div class="speaker-notes">各位陪审员同志们，本人苏格拉底，年七十，第一次站在法庭之上。今天就控方对本人提出的指控，做一次正式的、系统的申辩汇报。本人恳请各位耐心听完全部汇报内容后，再做最终判断。本人不善法庭辞令，只会用日常朴素的语言说话，请各位关注事实本身，而非言辞技巧。</div>
</div>

<!-- ==================== SLIDE 2: 案件背景 ==================== -->
<div class="slide" data-notes="首先介绍案件基本情况。本案表面是宗教指控，实质是对本人长期从事哲学审问工作的报复。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">02 / 21</div>
  <div class="eyebrow">一、案件背景</div>
  <h2>案件基本情况概述</h2>
  <div class="claim-box">本案控方三人代表三个利益群体，实质是对本人<span class="red">哲学工作的报复性诉讼</span></div>
  <div class="grid-3">
    <div class="card"><div class="stat"><div class="stat-number">70岁</div><div class="stat-label">被告年龄</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">501人</div><div class="stat-label">陪审团规模</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">0次</div><div class="stat-label">此前涉诉记录</div></div></div>
  </div>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">原告</div></div>
      <h3>迈勒图斯</h3>
      <p style="font-size:0.9rem;">代表<strong>诗人群体</strong>。本人曾指出诗人并不真正理解自己所写的内容，引起该群体强烈不满。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">支持者</div></div>
      <h3>安尼图斯</h3>
      <p style="font-size:0.9rem;">代表<strong>工匠与政客群体</strong>。本人揭示其所谓专业知识的局限性，触及其核心利益。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">支持者</div></div>
      <h3>吕孔</h3>
      <p style="font-size:0.9rem;">代表<strong>演说家群体</strong>。本人的审问方式动摇了修辞术的权威地位。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">首先请允许本人介绍案件基本情况。本人年已七十，平生第一次站在法庭上。控方三人——迈勒图斯、安尼图斯、吕孔——分别代表诗人、工匠政客和演说家三个群体。他们提出的宗教指控只是表面文章，真正的动机是对本人长年从事哲学审问工作的报复。本人此前从未涉及任何诉讼。</div>
</div>

<!-- ==================== SLIDE 3: 旧指控澄清 ==================== -->
<div class="slide" data-notes="在回应正式指控之前，必须先澄清长期流传的不实传言。这些传言比正式指控更加危险。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">03 / 21</div>
  <div class="eyebrow">二、旧指控澄清</div>
  <h2>关于长期不实指控的澄清</h2>
  <div class="grid-2">
    <div class="compare-col red-side">
      <h3>不实指控内容</h3>
      <ul>
        <li>"苏格拉底研究天上地下的事物"——此为<strong>阿那克萨哥拉</strong>的研究领域，与本人无关</li>
        <li>"苏格拉底收费教授学生"——此为<strong>智者学派</strong>（高尔吉亚、普罗迪库斯等）的做法，本人从未收取分文</li>
        <li>"苏格拉底能把弱论证变成强论证"——纯属虚构</li>
      </ul>
    </div>
    <div class="compare-col gray-side">
      <h3>实际情况</h3>
      <ul>
        <li>本人从未从事自然科学研究，也无此方面的专长</li>
        <li>本人从未收取任何教学费用，贫穷状态即为明证</li>
        <li>本人只是通过提问揭示对话者自身知识的不足，而非传授任何"技术"</li>
      </ul>
    </div>
  </div>
  <div class="warning-box">
    <strong>重要背景：</strong>上述不实指控源自阿里斯托芬喜剧<strong>《云》</strong>（公元前423年），已误导公众长达<strong>24年</strong>。这些匿名的"旧控告者"比今天在座的正式控方更加危险，因为陪审员诸位从小就听着这些说法长大，根深蒂固，难以辩驳。
  </div>
</div>
<div class="speaker-notes">在回应今天的正式指控之前，本人必须先处理一个更棘手的问题——长期以来在公众中流传的不实传言。阿里斯托芬在喜剧《云》中把本人塑造成一个研究天文、收费教学的人物，这完全是文学虚构。但这部戏上演了二十四年，在座诸位很多人从小就受其影响。这些匿名的旧控告者比今天的原告更为危险。</div>
</div>

<!-- ==================== SLIDE 4: 德尔斐神谕调查 ==================== -->
<div class="slide" data-notes="这是理解本人全部哲学工作的关键。凯瑞丰去德尔斐问神，神说没有人比我更有智慧。我花了大量时间调查此事。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">04 / 21</div>
  <div class="eyebrow">三、神谕调查</div>
  <h2>德尔斐神谕调查报告</h2>
  <p style="margin-bottom:0.8rem;color:var(--text2);">以下是本人哲学工作的起源，请各位务必了解：</p>
  <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>事件起因</strong>——本人好友凯瑞丰（已故，其兄弟可作证）前往德尔斐神庙，询问是否有人比苏格拉底更有智慧。</div></div>
  <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>神谕回答</strong>——皮提亚女祭司回答：<strong>没有人比苏格拉底更有智慧。</strong></div></div>
  <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>本人困惑</strong>——本人深知自己既无大智也无小智，神的回答令本人百思不得其解。但神不会说谎，其中必有深意。</div></div>
  <div class="arg-step"><div class="arg-num">4</div><div class="arg-text"><strong>启动调查</strong>——本人决定通过系统性走访各类"有智之人"，尝试找出一个确实比本人更有智慧的人，以此理解（或反证）神谕的含义。</div></div>
  <div class="arg-step"><div class="arg-num">5</div><div class="arg-text"><strong>调查持续多年</strong>——本人依次访问了政客、诗人、工匠三大群体，结果见下页。</div></div>
  <div class="claim-box">经调查，神谕的真正含义是：<span class="red">承认自己无知的人，比自以为有知的人更有智慧。</span>所谓"苏格拉底最智慧"，不过是因为本人是唯一知道自己不知道的人。</div>
</div>
<div class="speaker-notes">这是理解本人全部哲学工作的关键背景。本人好友凯瑞丰——一位热情的人——前往德尔斐神庙问神，是否有人比苏格拉底更有智慧。神回答说没有。我感到极为困惑，因为我自知一无所知。但神不可能说谎。于是我决定进行系统调查，试图找到一个确实比我更有智慧的人来反证神谕。</div>
</div>

<!-- ==================== SLIDE 5: 实地调查结果 ==================== -->
<div class="slide" data-notes="经过对三类人群的系统调查，本人发现所谓有智慧的人都存在同一个问题：在自己不懂的领域自以为懂。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">05 / 21</div>
  <div class="eyebrow">四、实地调查结果</div>
  <h2>三类人群调查结果报告</h2>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">01</div><div class="tag">调查对象</div></div>
      <h3>政客群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>声誉最高者实际上最缺乏智慧。他们自认为通晓一切，但经本人追问后暴露出对核心问题的无知。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>将政治声望误认为真正的知识</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">02</div><div class="tag">调查对象</div></div>
      <h3>诗人群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>诗人创作出优秀作品，但无法解释自己的创作。他们靠天赋与灵感，而非知识。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>因创作才能而自认为在其他领域也最有智慧</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">03</div><div class="tag">调查对象</div></div>
      <h3>工匠群体</h3>
      <p style="font-size:0.9rem;"><strong>调查发现：</strong>工匠确实掌握本人不具备的技能，这一点本人充分肯定。但他们因此自认为在一切大事上都有见识。</p>
      <p style="font-size:0.85rem;color:var(--text2);margin-top:0.4rem;"><strong>核心问题：</strong>技术专长导致的跨领域自信膨胀</p>
    </div>
  </div>
  <div class="card" style="margin-top:1rem;background:var(--soft-red);">
    <div class="stat" style="padding:0.6rem 0;">
      <div class="stat-label" style="font-size:1rem;font-weight:700;color:var(--accent);">调查总结论</div>
      <div style="font-size:1.05rem;margin-top:0.3rem;">三类人群均存在同一通病：<strong style="color:var(--accent);">在自己不懂的领域自以为懂。</strong>而本人的优势仅在于——本人不会在自己不懂的事情上假装懂得。</div>
    </div>
  </div>
</div>
<div class="speaker-notes">经过对政客、诗人、工匠三个群体的系统性走访调查，本人得出如下结论：他们在各自领域确实有所建树，但无一例外地犯了同一个错误——因为在某一方面有专长，便自认为在所有方面都有智慧。本人的唯一优势，不过是不在自己不懂的事情上假装懂得而已。</div>
</div>

<!-- ==================== SLIDE 6: 仇恨成因 ==================== -->
<div class="slide" data-notes="正是这种调查工作，为本人招来了广泛的仇恨。被审问者感到难堪，于是将怒气转向本人。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">06 / 21</div>
  <div class="eyebrow">五、仇恨成因</div>
  <h2>公众敌意成因分析</h2>
  <p style="margin-bottom:1rem;">本人遭受指控的根本原因，可用以下因果链说明：</p>
  <div class="flow">
    <div class="flow-step">本人开展哲学审问</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">揭穿对方无知</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">对方当众难堪</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">转为仇恨本人</div>
    <div class="flow-arrow">&#10132;</div>
    <div class="flow-step">联合提起控告</div>
  </div>
  <div class="warning-box" style="margin-top:1.2rem;">
    <strong>加剧因素：</strong>一些富家子弟——他们有大量闲暇——喜欢跟随本人，模仿本人的审问方式去盘问他人。被他们盘问的人<strong>不怪这些年轻人，反而把账算到本人头上</strong>，指控"苏格拉底腐蚀青年"。
  </div>
  <div class="grid-2">
    <div class="card">
      <h3>仇恨的本质</h3>
      <p style="font-size:0.92rem;">并非本人做了什么坏事，而是被审问者<strong>无法接受自己被证明为无知</strong>的事实。攻击本人比承认自己无知要容易得多。</p>
    </div>
    <div class="card">
      <h3>指控的套路</h3>
      <p style="font-size:0.92rem;">凡是无法在辩论中胜过本人的人，都会搬出一套现成的说辞："<strong>苏格拉底研究天上地下的事、不信神、把弱论证变成强论证</strong>"——因为这是攻击一切哲学家的万能模板。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">现在各位应该明白本人为何招致如此广泛的仇恨了。这不是因为本人做了什么恶事，而是因为揭穿他人的无知本身就会引发敌意。被审问的人宁可攻击审问者，也不愿承认自己的无知。加上一些年轻人模仿我的做法去盘问他人，被盘问者把账算到我头上——这就是所谓"腐蚀青年"指控的真正来源。</div>
</div>

<!-- ==================== SLIDE 7: 反驳一 ==================== -->
<div class="slide" data-notes="现在正式进入对控方指控的逐条反驳。第一项：腐蚀青年。本人使用驯马师类比进行反证。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">07 / 21</div>
  <div class="eyebrow">六、指控反驳（一）</div>
  <h2>指控一：腐蚀青年</h2>
  <div class="claim-box">本人以<span class="red">"驯马师反证法"</span>证明：如果只有本人一人在腐蚀青年，那本指控不合逻辑</div>
  <div style="margin:1rem 0;">
    <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>提问迈勒图斯：</strong>谁能改善青年？——迈勒图斯回答：法律、陪审员、议员、公民大会成员……即所有雅典人。</div></div>
    <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>驯马师类比：</strong>以马匹训练为例——只有少数专业驯马师能改善马匹，而大多数人与马接触反而会败坏它们。</div></div>
    <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>推论：</strong>如果所有人都能改善青年而只有本人一人在败坏他们，这在逻辑上极不可能。真实情况恰恰相反——少数人有益，多数人有害。</div></div>
    <div class="arg-step"><div class="arg-num">4</div><div class="arg-text"><strong>进一步追问：</strong>如果本人确实在腐蚀青年，是有意还是无意？若无意，应私下劝告而非起诉；若有意——本人不会故意败坏与自己朝夕相处的人，因为被败坏的人必将反过来伤害本人。</div></div>
  </div>
  <div class="card" style="background:var(--soft-red);text-align:center;">
    <div class="stat">
      <div class="stat-number" style="font-size:1.6rem;">结论：指控一不成立</div>
      <div class="stat-label" style="font-size:0.9rem;">控方既无法说明本人如何腐蚀青年，也无法出示任何受害者证词</div>
    </div>
  </div>
</div>
<div class="speaker-notes">现在正式反驳第一项指控。我问迈勒图斯谁能改善青年，他说除了我以外所有雅典人都能。但这就像说只有一个人会败坏马匹而所有其他人都能训练马匹——事实恰恰相反，只有少数专业驯马师能改善马匹。而且，如果我是故意腐蚀青年，那我岂不是在故意伤害与自己朝夕相处的人？这对我有什么好处？</div>
</div>

<!-- ==================== SLIDE 8: 反驳二 ==================== -->
<div class="slide" data-notes="第二项指控：不信城邦诸神。本人通过揭露控方证词中的逻辑矛盾来反驳。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">08 / 21</div>
  <div class="eyebrow">六、指控反驳（二）</div>
  <h2>指控二：不信城邦之神</h2>
  <div class="claim-box">控方自相矛盾——既指控本人<span class="red">"不信神"</span>，又指控本人<span class="red">"引入新的神灵"</span></div>
  <div style="margin:1rem 0;">
    <div class="arg-step"><div class="arg-num">1</div><div class="arg-text"><strong>控方主张A：</strong>苏格拉底是彻底的无神论者，完全不信任何神。</div></div>
    <div class="arg-step"><div class="arg-num">2</div><div class="arg-text"><strong>控方主张B：</strong>苏格拉底引入新的精灵/神灵（daimonia）。</div></div>
    <div class="arg-step"><div class="arg-num">3</div><div class="arg-text"><strong>逻辑推演：</strong>A与B互相矛盾——一个完全不信神的人怎么可能同时引入新的神灵？这就像说一个人既不相信马的存在，又在从事与马相关的活动。</div></div>
  </div>
  <div class="warning-box">
    <strong>骡子类比：</strong>迈勒图斯，你说有人相信骡子的存在却不相信马和驴的存在，这可能吗？同理，如果本人相信精灵（daimonia）的活动，而精灵是神的后代——<strong>那本人怎么可能不相信神的存在？</strong>这就像相信骡子存在却否认马和驴的存在一样荒谬。
  </div>
  <div class="card" style="background:var(--soft-red);text-align:center;">
    <div class="stat">
      <div class="stat-number" style="font-size:1.6rem;">结论：指控二自相矛盾</div>
      <div class="stat-label" style="font-size:0.9rem;">控方是在戏弄法庭，用自相矛盾的指控来考验陪审团的智力</div>
    </div>
  </div>
</div>
<div class="speaker-notes">第二项指控存在致命的逻辑矛盾。迈勒图斯一方面说我完全不信任何神，另一方面又说我引入了新的神灵。这两个主张不可能同时为真。我用骡子的类比来说明：如果一个人承认精灵的存在，精灵是神的后代，那他怎么可能否认神的存在？这就像相信骡子存在却否认马和驴的存在一样荒谬。</div>
</div>

<!-- ==================== SLIDE 9: 牛虻职能 ==================== -->
<div class="slide" data-notes="本人的社会功能定位：神派驻雅典城邦的牛虻。本人以贫穷、全职投入、零报酬为证据。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">09 / 21</div>
  <div class="eyebrow">七、社会功能定位</div>
  <h2>牛虻职能说明</h2>
  <div class="claim-box">本人系神派驻雅典城邦的<span class="red">"牛虻"</span>——负责唤醒、监督与批评。雅典就像一匹高大但因肥胖而行动迟缓的骏马，需要一只牛虻不断叮咬它，使它保持警醒。</div>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">证据</div></div>
      <h3>贫穷证据</h3>
      <p style="font-size:0.9rem;">本人长期处于极度贫困状态。如果本人的动机是谋取私利，为何会让自己沦落至此？一个图谋不轨的人不会主动选择贫穷。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">证据</div></div>
      <h3>全职投入</h3>
      <p style="font-size:0.9rem;">本人放弃一切私人事务，不关心财产、不追求官职，全部精力用于<strong>逐一走访市民</strong>，劝勉他们关注灵魂的卓越而非身外之物。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">证据</div></div>
      <h3>零报酬</h3>
      <p style="font-size:0.9rem;">本人从未向任何人收取费用。任何人都可以来听本人谈话，无论贫富。本人对所有人一视同仁，既不偏向穷人，也不讨好富人。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>请注意：</strong>如果你们杀死我，受损的不是我，而是你们自己。你们不容易再找到一个像我这样的人——一个被神赐予城邦的人。而<strong>处死一只牛虻很容易，但此后你们将在昏睡中度过余生</strong>。
  </div>
</div>
<div class="speaker-notes">本人的社会功能可以用一个比喻来说明：雅典城邦如同一匹高大肥硕却因此行动迟缓的骏马，本人就是神派来叮咬它、让它保持清醒的牛虻。证据就是我的贫穷、我对私人事务的忽视、以及从未向任何人收费。杀死我对你们没有好处——处死一只牛虻很容易，但之后你们就再也没人来叫醒了。</div>
</div>

<!-- ==================== SLIDE 10: 政治立场 ==================== -->
<div class="slide" data-notes="本人始终坚持正义原则，不论面对民主派还是寡头派的压力。以两个具体事件为证。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">10 / 21</div>
  <div class="eyebrow">八、政治立场</div>
  <h2>政治立场与实际行动</h2>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-index">案例一</div><div class="tag">民主政体时期</div></div>
      <h3>阿基努赛将军审判事件</h3>
      <p style="font-size:0.9rem;">公民大会不经合法程序，要将十位将军集体定罪处死。本人时任轮值主席团成员（Prytaneis），是<strong>唯一一个</strong>投票反对违法审判的人。尽管公众威胁要逮捕和处死本人，本人仍坚持<strong>法律程序正义</strong>，拒绝向暴民压力屈服。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">案例二</div><div class="tag">寡头政体时期</div></div>
      <h3>莱昂逮捕事件</h3>
      <p style="font-size:0.9rem;">三十僭主执政期间，命令本人与另外四人前往逮捕萨拉米斯人莱昂，意图将其处死以没收财产。另外四人服从了命令，<strong>本人独自回家</strong>，拒绝参与不义之事。此事本可能让本人丧命，若非僭主政权很快被推翻。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>核心原则：</strong>本人不参与任何违背正义的行为，<strong>无论命令来自民主政体还是寡头政体</strong>。正因如此，本人一生避免参与政治——因为一个真正坚持正义的人如果从政，必然会很快被杀。本人只能以私人身份为城邦服务。
  </div>
</div>
<div class="speaker-notes">两个具体事例可以证明本人的政治立场。在民主政体下的将军审判事件中，我是唯一一个坚持合法程序、反对集体定罪的人。在寡头政体下的莱昂事件中，三十僭主命令我去逮捕无辜者，我独自回家拒绝执行。这两件事说明，无论面对什么政权，我都坚持正义原则。也正因如此，我选择不从政——从政的正义之人活不长。</div>
</div>

<!-- ==================== SLIDE 11: 求饶问题 ==================== -->
<div class="slide" data-notes="有人会问为什么我不像其他被告那样哭泣求饶、带上妻儿博取同情。本人在此说明原因。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">11 / 21</div>
  <div class="eyebrow">九、程序合规性声明</div>
  <h2>关于求饶问题的立场声明</h2>
  <p style="margin-bottom:1rem;color:var(--text2);">本人不会采用常见的求饶手段（哭泣、携子女上庭、博取同情），理由如下：</p>
  <div class="grid-3">
    <div class="card">
      <div class="card-header"><div class="card-index">1</div><div class="tag">理由</div></div>
      <h3>有损城邦声誉</h3>
      <p style="font-size:0.9rem;">本人年已七十，若在法庭上做出失态之举，将有损雅典的声誉。外邦人会认为雅典最优秀的公民竟与普通人无异。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">2</div><div class="tag">理由</div></div>
      <h3>违背陪审员职责</h3>
      <p style="font-size:0.9rem;">陪审员的职责是<strong>依据法律和事实做出公正判断</strong>，而非被被告的眼泪所动。用情感操纵陪审团是对司法制度的不敬。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">3</div><div class="tag">理由</div></div>
      <h3>不合本人信仰</h3>
      <p style="font-size:0.9rem;">本人相信神的存在，而用不正当手段影响司法就是在<strong>教导陪审员不敬神</strong>——这反而坐实了"不信神"的指控。</p>
    </div>
  </div>
  <div class="claim-box" style="margin-top:1rem;">
    本人将自己的案件完全交付各位陪审员和神明，请各位<span class="red">按照对城邦和各位自身最好的方式</span>做出判决。无论结果如何，本人和各位都不会有遗憾。
  </div>
</div>
<div class="speaker-notes">有人会奇怪我为什么不像其他被告那样哭泣求饶。原因有三：第一，这有损城邦声誉；第二，陪审员的职责是依法判断，不是被眼泪左右；第三，用不正当手段影响司法等于不敬神，反而坐实了对我的指控。我把命运交给各位和神明，按最正义的方式做出判断即可。</div>
</div>

<!-- ==================== SLIDE 12: 判决结果 ==================== -->
<div class="slide" data-notes="第一轮投票结果：有罪。但票差很小，如果仅30票改变，本人就会被宣告无罪。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">12 / 21</div>
  <div class="eyebrow">判决结果</div>
  <h2>第一轮投票结果</h2>
  <div class="verdict-box">
    <div class="stat">
      <div class="stat-number">有 罪</div>
      <div class="stat-label">501名陪审员投票结果</div>
    </div>
  </div>
  <div class="grid-3">
    <div class="card"><div class="stat"><div class="stat-number">约280</div><div class="stat-label">有罪票</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">约221</div><div class="stat-label">无罪票</div></div></div>
    <div class="card"><div class="stat"><div class="stat-number">30票</div><div class="stat-label">如仅此数改变即可无罪</div></div></div>
  </div>
  <div class="warning-box">
    <strong>本人回应：</strong>票差如此之小，令本人颇感意外。本人原以为差距会大得多。如果安尼图斯和吕孔没有加入起诉，迈勒图斯甚至无法获得五分之一的票数——那样他就要被罚款一千德拉克马了。
  </div>
  <div class="part-divider"><span>进入 Part II ——量刑意见阶段</span></div>
</div>
<div class="speaker-notes">陪审团投票的结果是有罪，但票差出乎我的意料地小——如果仅有三十票改变立场，我就会被宣告无罪。这说明控方的论证远非令人信服。接下来进入量刑阶段，按照雅典法律，被告有权提出自己认为合适的刑罚建议。</div>
</div>

<!-- ==================== SLIDE 13: 量刑建议 ==================== -->
<div class="slide" data-notes="按照法律，本人现在需要对自己提出量刑建议。本人认为自己应受到的待遇是：在普里塔尼厄姆用餐。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">13 / 21</div>
  <div class="eyebrow">十、量刑建议</div>
  <h2>被告方量刑建议</h2>
  <div class="claim-box">本人认为自己真正应得的"处罚"是：<span class="red">在普里塔尼厄姆（城邦公餐厅）终身免费用餐</span>——这是雅典给予奥运冠军和城邦英雄的待遇。</div>
  <p style="margin:0.8rem 0;font-size:0.95rem;">本人比奥运冠军更有资格享此待遇——奥运冠军让你们<strong>感觉</strong>幸福，本人让你们<strong>真正</strong>幸福。且本人一贫如洗，确实需要这顿餐食。</p>
  <h3 style="margin-top:1rem;">替代方案逐一排除</h3>
  <div class="grid-2">
    <div class="card">
      <h3>监禁 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">在监狱中成为十一人委员会的奴隶？为何要选择确定的恶？</p>
    </div>
    <div class="card">
      <h3>流放 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">如果本城邦都无法容忍本人的谈话，外邦又怎会容忍？本人到哪里都会继续做同样的事。</p>
    </div>
    <div class="card">
      <h3>沉默不言 <span class="tag" style="background:#fdecea;color:var(--accent2);">排除</span></h3>
      <p style="font-size:0.9rem;">要本人停止哲学探索，等于要本人停止生活。"未经审视的人生不值得过。"</p>
    </div>
    <div class="card">
      <h3>罚款30弥那 <span class="tag" style="background:#e8f5e9;color:#2e7d32;">可接受</span></h3>
      <p style="font-size:0.9rem;">本人的朋友们——柏拉图、克里托、克里托布洛斯、阿波罗多洛斯——愿意为本人担保，支付<strong>30弥那</strong>罚款。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">按雅典法律，本人需要提出自己认为合适的量刑建议。我认为对我最公正的"处罚"应该是在城邦公餐厅终身用餐——奥运冠军的待遇。因为我比奥运冠军更有资格。当然，如果必须选择一个惩罚，我排除监禁、流放和沉默——我到了朋友们愿意担保的30弥那罚款。</div>
</div>

<!-- ==================== SLIDE 14: 核心价值 ==================== -->
<div class="slide" data-notes="这是本人全部哲学工作的核心主张。未经审视的人生不值得过。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">14 / 21</div>
  <div class="eyebrow">十一、核心价值观</div>
  <h2>核心价值主张</h2>
  <div class="big-quote">
    "未经审视的人生<br>不值得过"
    <span class="greek">ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</span>
  </div>
  <div class="grid-2">
    <div class="card">
      <h3>内涵说明</h3>
      <p style="font-size:0.92rem;">人之为人的最高价值，不在于财富、声望或权力，而在于<strong>持续不断地审视自己和他人</strong>——追问什么是正义、什么是善、什么是美德。放弃这种审视，等于放弃了人之为人的本质。</p>
    </div>
    <div class="card">
      <h3>实践方式</h3>
      <p style="font-size:0.92rem;">本人每日在市场、体育馆、街头与人谈话，不传授知识（本人没有知识可传授），而是<strong>通过提问</strong>帮助对方审视自己的信念和假设。这是一种精神助产术——帮助他人自己生出真理。</p>
    </div>
  </div>
  <div class="warning-box">
    <strong>正是这一信念，</strong>使本人不可能接受"保持沉默换取活命"的交易。因为沉默的苏格拉底已不再是苏格拉底——<strong>不如死。</strong>
  </div>
</div>
<div class="speaker-notes">这是本人全部哲学工作的核心。未经审视的人生不值得过。我不可能为了活命而放弃审视，因为那样的生活不值得过。我每天所做的事情——与人对话、提问、审视——这就是我存在的全部意义。让我停止这些，不如让我去死。</div>
</div>

<!-- ==================== SLIDE 15: 死刑判决 ==================== -->
<div class="slide" data-notes="第二轮投票结果：死刑。而且支持死刑的票数比第一轮支持有罪的还多。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">15 / 21</div>
  <div class="eyebrow">量刑结果</div>
  <h2>第二轮投票结果</h2>
  <div class="verdict-box" style="background:linear-gradient(135deg, #900000, #600000);">
    <div class="stat">
      <div class="stat-number">死 刑</div>
      <div class="stat-label">陪审团最终判决</div>
    </div>
  </div>
  <div class="warning-box">
    <strong>本人观察：</strong>第二轮投票中支持死刑的票数甚至<strong>超过了</strong>第一轮支持有罪的票数。这说明本人在量刑阶段的发言——特别是提议在公餐厅用餐——进一步激怒了部分陪审员。但本人不后悔，因为本人不会为了讨好任何人而说违心的话。
  </div>
  <div class="claim-box">
    如果本人愿意哭泣、哀求、说各种不配本人身份的话，或许可以脱罪。但本人宁愿<span class="red">以自己的方式为自己辩护后死去</span>，也不愿以不义的方式活下来。在战场上和法庭上道理相同——<strong>一个人应当思考如何正义地行动，而非不择手段地逃避死亡。</strong>
  </div>
  <div class="part-divider"><span>进入 Part III ——总结陈词</span></div>
</div>
<div class="speaker-notes">最终判决是死刑，而且投死刑票的人比投有罪票的还多——说明我在量刑阶段的态度进一步激怒了一些人。但我不后悔。我宁愿以正义的方式为自己辩护后死去，也不愿以卑劣的手段换取生存。在战场上如此，在法庭上也如此。现在进入最后的总结陈词。</div>
</div>

<!-- ==================== SLIDE 16: 致控方 ==================== -->
<div class="slide" data-notes="现在本人要对投票判本人有罪的人说一番话——这不是咒骂，而是预言。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">16 / 21</div>
  <div class="eyebrow">十二、致控方</div>
  <h2>致投有罪票诸位的警告</h2>
  <div class="warning-box" style="border-left-width:6px;">
    <strong>预言：</strong>在本人死后，将有<strong>更多、更年轻</strong>的审问者站出来，他们是本人此前一直在约束的人。他们会更加尖锐地审问你们，而你们会更加恼怒。<br><br>
    你们以为杀死本人就能逃避审视？<strong>这是不可能的。</strong>逃避审视最可靠的方法不是堵住别人的嘴，而是<strong>让自己变得更好</strong>。
  </div>
  <div class="card" style="margin-top:1rem;">
    <h3>赛跑比喻</h3>
    <p style="font-size:0.95rem;">本人不是因为<strong>跑不过死亡</strong>而死——死亡跑得慢，谁都跑得过。本人是因为跑不过<strong>邪恶</strong>——邪恶比死亡跑得快。今天，本人被判处死刑（较慢的惩罚），而控方诸位则被<strong>真理</strong>判处了邪恶与不义（较快且更沉重的惩罚）。<strong>双方各领其罚</strong>——这或许是应当的。</p>
  </div>
</div>
<div class="speaker-notes">致判本人有罪的诸位：本人要做一个预言。杀了我之后，审问者不会减少，反而会更多。你们以为杀人能解决问题，但逃避审视的唯一办法是让自己变得更好。记住：我不是跑不过死亡而死——死亡跑得慢。我是跑不过邪恶。你们也各有各的惩罚要领受。</div>
</div>

<!-- ==================== SLIDE 17: 死亡分析 ==================== -->
<div class="slide" data-notes="对于投本人无罪票的朋友们，本人想谈谈对死亡的理性分析。代蒙的沉默是一个重要信号。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">17 / 21</div>
  <div class="eyebrow">十三、死亡分析</div>
  <h2>关于死亡的理性分析</h2>
  <div class="card" style="background:var(--soft-gold);margin-bottom:1rem;">
    <h3>关键证据：代蒙（daimonion）的沉默</h3>
    <p style="font-size:0.95rem;">本人内心的神圣声音——代蒙——平时在本人即将做错事时总会发出警告。但今天，无论是出门时、上法庭时、还是发言过程中，<strong>代蒙始终保持沉默</strong>。这强烈暗示：<strong>今天发生在本人身上的事并非坏事。</strong></p>
  </div>
  <h3 style="margin-bottom:0.6rem;">死亡的两种可能——比较分析</h3>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><div class="card-index">A</div><div class="tag">情景分析</div></div>
      <h3>完全的虚无</h3>
      <p style="font-size:0.9rem;">死亡如同<strong>无梦的深睡</strong>——没有任何感知。回想你一生中睡得最沉、完全没有做梦的那一夜，那是何等安宁？如果死亡就是这样永恒的无梦之眠，那它甚至比人生中大多数日夜都<strong>更加美好</strong>。即使是波斯大王也无法指出比无梦之眠更快乐的日子。</p>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-index">B</div><div class="tag">情景分析</div></div>
      <h3>灵魂迁往他处</h3>
      <p style="font-size:0.9rem;">如果死亡是灵魂迁往另一个世界——那里有真正公正的审判者（弥诺斯、拉达曼提斯等），有荷马、赫西俄德、奥德修斯——<strong>那将是何等的福分！</strong>本人将能在冥界继续审问特洛伊战争的英雄们，考察他们的智慧。最妙的是——<strong>冥界的人不会因为提问而判你死刑。</strong></p>
    </div>
  </div>
  <div class="claim-box">两种情况下死亡都不是坏事。因此，<span class="red">对于一个好人而言，无论生死都不会有真正的恶</span>——诸神不会忽略他的事务。</div>
</div>
<div class="speaker-notes">对于投无罪票的朋友们，我想理性地分析一下死亡。首先一个重要信号：我的代蒙今天始终沉默，说明今天发生的事不是坏事。死亡要么是彻底的虚无——如无梦之眠，那其实很美好；要么是灵魂去往另一个世界——那里我可以继续审问英雄们的智慧，而且不会因此被判死刑。所以无论哪种情况，死亡对好人而言都不是恶。</div>
</div>

<!-- ==================== SLIDE 18: 最后请求 ==================== -->
<div class="slide" data-notes="这是本人最后的请求。关于我的儿子们，请各位像本人审问你们那样审问他们。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">18 / 21</div>
  <div class="eyebrow">十四、总结陈词</div>
  <h2>最后请求与嘱托</h2>
  <p style="margin-bottom:0.8rem;">在离别之前，本人只有一个请求：</p>
  <div class="claim-box" style="font-size:1.25rem;">
    当本人的儿子们长大成人后，如果他们追求财富或其他虚浮之物胜于追求美德，请各位<span class="red">像本人审问你们那样审问他们</span>。<br><br>
    如果他们自以为有了不起其实并没有，请责备他们——就像本人责备你们一样——<span class="red">因为他们不关心应该关心的事，却在无价值的事物上自以为了不起</span>。
  </div>
  <div class="grid-3">
    <div class="card" style="text-align:center;">
      <h3>对陪审团</h3>
      <p style="font-size:0.9rem;">本人对判本人有罪的人和判本人无罪的人都不怀恨意。</p>
    </div>
    <div class="card" style="text-align:center;">
      <h3>对控方</h3>
      <p style="font-size:0.9rem;">你们伤害的不是本人。没有人能伤害一个好人。</p>
    </div>
    <div class="card" style="text-align:center;">
      <h3>对后世</h3>
      <p style="font-size:0.9rem;">本人将此案的审判交予神明和时间。</p>
    </div>
  </div>
</div>
<div class="speaker-notes">在最后，本人只有一个请求：当我的三个儿子长大后，如果他们追求财富胜于美德，请各位像我审问你们那样去审问他们。如果他们自以为了不起却其实平庸，请责备他们。这就是我全部的请求。</div>
</div>

<!-- ==================== SLIDE 19: 附录 ==================== -->
<div class="slide" data-notes="以下是本次申辩中所有核心论据的汇总表。">
<div class="slide-inner">
  <div class="top-rule"></div>
  <div class="slide-number">19 / 21</div>
  <div class="eyebrow">附录</div>
  <h2>核心论据汇总表</h2>
  <table class="summary-table">
    <thead>
      <tr><th style="width:5%;">序号</th><th style="width:22%;">论题</th><th style="width:38%;">核心论据</th><th style="width:35%;">论证方法</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>旧指控澄清</td><td>本人非自然哲学家，不收费教学</td><td>事实陈述 + 证人可证</td></tr>
      <tr><td>2</td><td>神谕来源</td><td>德尔斐神谕称无人比本人更有智慧</td><td>历史事实 + 证人（凯瑞丰之兄弟）</td></tr>
      <tr><td>3</td><td>智慧的含义</td><td>承认无知即最大智慧</td><td>系统调查三类人群后的归纳推理</td></tr>
      <tr><td>4</td><td>仇恨成因</td><td>揭穿无知导致被审问者报复</td><td>因果分析</td></tr>
      <tr><td>5</td><td>反驳"腐蚀青年"</td><td>驯马师类比证明不合逻辑</td><td>类比论证 + 反证法</td></tr>
      <tr><td>6</td><td>反驳"不信神"</td><td>控方主张自相矛盾</td><td>逻辑矛盾证明 + 骡子类比</td></tr>
      <tr><td>7</td><td>牛虻使命</td><td>本人系神派驻城邦的督察</td><td>贫穷、零报酬、全职投入为证</td></tr>
      <tr><td>8</td><td>政治清白</td><td>两次冒死坚持正义</td><td>将军审判 + 莱昂事件两个案例</td></tr>
      <tr><td>9</td><td>拒绝求饶</td><td>正义优先于生存</td><td>职责论证 + 品格论证</td></tr>
      <tr><td>10</td><td>死亡非恶</td><td>无梦之眠或灵魂迁居均非坏事</td><td>穷举分析（两种可能均利好）</td></tr>
    </tbody>
  </table>
</div>
<div class="speaker-notes">此表汇总了本次申辩中的全部核心论据及论证方法，供各位陪审员回顾参考。</div>
</div>

<!-- ==================== SLIDE 20: 结语 ==================== -->
<div class="slide" data-notes="离别的时刻到了。这是苏格拉底最后的话。">
<div class="slide-inner" style="display:flex;flex-direction:column;justify-content:center;min-height:60vh;">
  <div class="top-rule"></div>
  <div class="slide-number">20 / 21</div>
  <div class="eyebrow">结语</div>
  <div class="big-quote" style="font-size:2.2rem;padding:2rem 1rem;">
    离别的时刻已经到来。<br>
    我去赴死，你们去生活。<br>
    <span style="color:var(--accent);font-weight:900;">哪一个更好，只有神知道。</span>
    <span class="greek" style="font-size:1.1rem;margin-top:1rem;">
      ἀλλὰ γὰρ ἤδη ὥρα ἀπιέναι,<br>
      ἐμοὶ μὲν ἀποθανουμένῳ, ὑμῖν δὲ βιωσομένοις·<br>
      ὁπότεροι δὲ ἡμῶν ἔρχονται ἐπὶ ἄμεινον πρᾶγμα, ἄδηλον παντὶ πλὴν ἢ τῷ θεῷ.
    </span>
  </div>
  <div style="text-align:center;margin-top:2rem;color:var(--text2);font-size:0.95rem;">
    <div style="display:inline-block;border-top:2px solid var(--border);padding-top:1rem;">
      汇报人：苏格拉底 &nbsp;|&nbsp; 雅典人民法庭 &nbsp;|&nbsp; 公元前399年<br>
      <span style="font-size:0.82rem;">本报告内容基于柏拉图《申辩篇》(Ἀπολογία Σωκράτους) 整理</span>
    </div>
  </div>
</div>
<div class="speaker-notes">离别的时刻到了。我去赴死，你们去生活。至于哪一个更好，除了神以外，谁也不知道。这是本人最后的话。谢谢各位。</div>
</div>

<!-- ==================== SLIDE 21: 致谢页 ==================== -->
<div class="slide" data-notes="感谢各位听完本人的完整汇报。">
<div class="slide-inner" style="display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:60vh;">
  <div class="top-rule"></div>
  <div class="slide-number">21 / 21</div>
  <div style="text-align:center;">
    <div class="eyebrow" style="justify-content:center;margin-bottom:1rem;">雅典人民法庭 · 公元前399年</div>
    <h1 style="font-size:2.8rem;margin-bottom:0.5rem;">申辩完毕</h1>
    <p style="font-size:1.2rem;color:var(--text2);margin-bottom:2rem;">谨呈各位陪审员审阅</p>
    <div class="grid-3" style="max-width:600px;">
      <div class="stat">
        <div class="stat-number">21</div>
        <div class="stat-label">汇报页数</div>
      </div>
      <div class="stat">
        <div class="stat-number">14</div>
        <div class="stat-label">论证章节</div>
      </div>
      <div class="stat">
        <div class="stat-number">10</div>
        <div class="stat-label">核心论据</div>
      </div>
    </div>
    <div style="margin-top:2rem;padding-top:1rem;border-top:1px solid var(--border);">
      <p style="font-size:0.88rem;color:var(--text2);">
        汇报人：苏格拉底 &nbsp;|&nbsp; 职务：雅典公民、哲学工作者<br>
        <span style="font-size:0.82rem;">基于柏拉图《申辩篇》整理 · 国企汇报风格呈现</span>
      </p>
    </div>
  </div>
</div>
<div class="speaker-notes">感谢各位陪审员听完本人的完整汇报。全部21页，14个论证章节，10条核心论据。本人已尽自己的责任，剩下的交给各位和诸神。</div>
</div>

</div><!-- end deck -->

<div class="controls-hint">← → 翻页 &nbsp;|&nbsp; N 演讲备注 &nbsp;|&nbsp; F 全屏 &nbsp;|&nbsp; P 打印</div>

<script>
(function(){
  const deck = document.getElementById('deck');
  const slides = deck.querySelectorAll('.slide');
  const progress = document.getElementById('progress');
  let current = 0;
  const total = slides.length;

  function goTo(n) {
    if (n < 0 || n >= total) return;
    slides[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    progress.style.width = ((current + 1) / total * 100) + '%';
    // Update hash
    history.replaceState(null, '', '#' + (current + 1));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    else if (e.key === 'n' || e.key === 'N') { document.body.classList.toggle('show-notes'); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    else if (e.key === 'p' || e.key === 'P') { window.print(); }
  });

  // Click navigation
  deck.addEventListener('click', function(e) {
    const rect = deck.getBoundingClientRect();
    if (e.clientX > rect.left + rect.width * 0.5) next();
    else prev();
  });

  // Touch
  let touchStartX = 0;
  deck.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; });
  deck.addEventListener('touchend', function(e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
  });

  // Hash navigation
  function readHash() {
    const h = parseInt(location.hash.replace('#', ''), 10);
    if (h >= 1 && h <= total) goTo(h - 1);
  }
  window.addEventListener('hashchange', readHash);
  readHash();

  // Init progress
  progress.style.width = ((current + 1) / total * 100) + '%';
})();
</script>
</body>
</html>

=== FILE: .claude/skills/presentation-skill/examples/sunny-cards.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
/* ============ RESET & BASE ============ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #f5f0e8; font-family: 'Noto Sans SC', sans-serif; color: #2d2d2d; }

/* ============ DESIGN TOKENS ============ */
:root {
  --bg: #f5f0e8;
  --slide-bg: #ffffff;
  --yellow: #fff8e1;
  --blue: #e8f4fd;
  --green: #e8f5e9;
  --rose: #fce4ec;
  --purple: #f3e5f5;
  --orange: #e67e22;
  --teal: #00897b;
  --coral: #e74c3c;
  --accent-blue: #2196f3;
  --text: #2d2d2d;
  --text2: #666666;
  --radius: 16px;
  --radius-lg: 26px;
  --shadow: 0px 8px 30px rgba(0,0,0,0.06);
  --shadow-card: 0px 4px 16px rgba(0,0,0,0.05);
}

/* ============ SLIDE CONTAINER ============ */
.deck { width: 100vw; height: 100vh; position: relative; }
.slide {
  display: none; position: absolute; inset: 0;
  padding: 40px 60px;
  background: var(--bg);
  overflow-y: auto;
}
.slide.active { display: flex; flex-direction: column; }
.slide-inner {
  max-width: 1100px; width: 100%; margin: 0 auto;
  background: var(--slide-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  padding: 48px 56px;
  flex: 1;
  overflow-y: auto;
  display: flex; flex-direction: column;
}

/* ============ TYPOGRAPHY ============ */
h1 { font-size: 42px; font-weight: 900; line-height: 1.3; margin-bottom: 16px; }
h2 { font-size: 32px; font-weight: 900; line-height: 1.3; margin-bottom: 20px; }
h3 { font-size: 22px; font-weight: 700; line-height: 1.4; margin-bottom: 12px; }
p, li { font-size: 16px; font-weight: 400; line-height: 1.8; color: var(--text); }
.secondary { color: var(--text2); }
.small { font-size: 14px; }

/* ============ CARDS ============ */
.card {
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 16px;
  box-shadow: var(--shadow-card);
}
.card-yellow { background: var(--yellow); }
.card-blue { background: var(--blue); }
.card-green { background: var(--green); }
.card-rose { background: var(--rose); }
.card-purple { background: var(--purple); }
.card-white { background: #fff; border: 1.5px solid #eee; }

.card-border-left {
  border-left: 5px solid var(--orange);
}
.card-border-coral { border-left-color: var(--coral); }
.card-border-teal { border-left-color: var(--teal); }
.card-border-blue { border-left-color: var(--accent-blue); }
.card-border-purple { border-left-color: #9c27b0; }

/* ============ BADGES / PILLS ============ */
.badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  margin: 4px 4px 4px 0;
}
.badge-orange { background: var(--orange); color: #fff; }
.badge-teal { background: var(--teal); color: #fff; }
.badge-coral { background: var(--coral); color: #fff; }
.badge-blue { background: var(--accent-blue); color: #fff; }
.badge-purple { background: #9c27b0; color: #fff; }
.badge-outline { background: transparent; border: 2px solid var(--orange); color: var(--orange); }
.badge-yellow { background: #f9a825; color: #fff; }
.badge-green { background: #43a047; color: #fff; }

/* ============ QUOTE CARD ============ */
.quote-card {
  background: var(--yellow);
  border-radius: var(--radius);
  padding: 28px 32px;
  margin: 16px 0;
  position: relative;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.8;
}
.quote-card::before {
  content: '❝';
  font-size: 48px;
  position: absolute;
  top: 8px; left: 16px;
  opacity: 0.25;
}

/* ============ STAT CARD ============ */
.stat-card {
  text-align: center;
  padding: 20px;
  border-radius: var(--radius);
  background: var(--blue);
}
.stat-card .num { font-size: 42px; font-weight: 900; color: var(--accent-blue); }
.stat-card .label { font-size: 14px; color: var(--text2); margin-top: 4px; }

/* ============ FLOW / TIMELINE ============ */
.flow-step {
  display: flex; align-items: flex-start; gap: 14px;
  margin-bottom: 12px;
  padding: 12px 16px;
  background: #fff; border-radius: 12px;
  box-shadow: var(--shadow-card);
}
.flow-step .icon { font-size: 28px; flex-shrink: 0; }
.flow-step .text { font-size: 15px; line-height: 1.7; }
.flow-arrow { text-align: center; font-size: 22px; color: var(--orange); margin: 4px 0; }

/* ============ GRID HELPERS ============ */
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.grid4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px; }
.flex-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.flex-col { display: flex; flex-direction: column; gap: 12px; }
.gap-sm { gap: 8px; }
.gap-lg { gap: 20px; }
.mt { margin-top: 16px; }
.mt-lg { margin-top: 28px; }
.mb { margin-bottom: 16px; }
.center { text-align: center; }
.flex1 { flex: 1; }

/* ============ CALLOUT ============ */
.callout {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 16px 20px;
  border-radius: var(--radius);
  background: var(--green);
  margin: 12px 0;
}
.callout.warning { background: var(--rose); }
.callout .icon { font-size: 24px; flex-shrink: 0; }

/* ============ SLIDE NUMBER ============ */
.slide-num {
  position: fixed; bottom: 20px; right: 32px;
  font-size: 13px; color: var(--text2);
  z-index: 100;
  background: rgba(255,255,255,0.8);
  padding: 4px 12px;
  border-radius: 20px;
}

/* ============ CONTROLS ============ */
.controls {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 8px; z-index: 200;
  background: rgba(255,255,255,0.9);
  padding: 8px 16px;
  border-radius: 30px;
  box-shadow: var(--shadow);
}
.controls button {
  border: none; background: var(--orange); color: #fff;
  padding: 8px 18px; border-radius: 20px;
  font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: inherit;
  transition: background 0.2s;
}
.controls button:hover { background: #d35400; }
.controls button.outline {
  background: transparent; border: 2px solid var(--orange);
  color: var(--orange);
}
.controls button.outline:hover { background: var(--orange); color: #fff; }

/* ============ SPEAKER NOTES TOGGLE ============ */
.speaker-notes {
  display: none;
  margin-top: auto;
  padding: 16px 20px;
  background: #f0ebe3;
  border-radius: 12px;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.7;
  border-top: 2px dashed #ddd;
}
.speaker-notes.show { display: block; }
.speaker-notes::before { content: '🎙 演讲笔记：'; font-weight: 700; color: var(--text); }

/* ============ PROGRESS BAR ============ */
.progress-bar {
  position: fixed; top: 0; left: 0; height: 4px;
  background: var(--orange);
  z-index: 300;
  transition: width 0.3s ease;
}

/* ============ COVER SPECIAL ============ */
.cover-emoji { font-size: 80px; display: block; margin-bottom: 12px; }
.cover-title { font-size: 64px; font-weight: 900; letter-spacing: 4px; }
.cover-subtitle { font-size: 20px; color: var(--text2); margin-top: 12px; }

/* ============ BIG QUOTE ============ */
.big-quote {
  font-size: 30px; font-weight: 900; line-height: 1.6;
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, var(--yellow), var(--green));
  border-radius: 20px;
  margin: 20px 0;
}

/* ============ SVG DECORATIONS ============ */
.deco-columns {
  position: absolute; bottom: 20px; right: 40px; opacity: 0.08;
}

/* ============ PRINT ============ */
@media print {
  body { overflow: visible; background: #fff; }
  .deck { height: auto; }
  .slide { display: flex !important; position: relative; page-break-after: always; height: 100vh; }
  .slide-inner { box-shadow: none; border: 1px solid #eee; }
  .controls, .slide-num, .progress-bar { display: none !important; }
  .speaker-notes { display: block !important; }
}

/* ============ RESPONSIVE ============ */
@media (max-width: 800px) {
  .slide { padding: 16px; }
  .slide-inner { padding: 24px 20px; }
  h1 { font-size: 28px; }
  h2 { font-size: 24px; }
  .grid2, .grid3, .grid4 { grid-template-columns: 1fr; }
  .cover-title { font-size: 36px; }
  .cover-emoji { font-size: 56px; }
  .big-quote { font-size: 22px; padding: 20px; }
}
</style>
</head>
<body>

<div class="progress-bar" id="progressBar"></div>
<div class="slide-num" id="slideNum"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide" data-notes="欢迎各位。今天我以苏格拉底第一人称来讲述这个两千四百年前的法庭故事。这不仅是一次辩护，更是西方哲学史上最重要的时刻之一。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center; position: relative;">
    <svg class="deco-columns" width="200" height="180" viewBox="0 0 200 180">
      <line x1="30" y1="20" x2="30" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="70" y1="20" x2="70" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="110" y1="20" x2="110" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="150" y1="20" x2="150" y2="160" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
      <line x1="10" y1="16" x2="170" y2="16" stroke="#2d2d2d" stroke-width="4" stroke-linecap="round"/>
      <path d="M10 16 Q90 0 170 16" stroke="#2d2d2d" stroke-width="3" fill="none"/>
      <line x1="10" y1="164" x2="170" y2="164" stroke="#2d2d2d" stroke-width="6" stroke-linecap="round"/>
    </svg>
    <span class="cover-emoji">🏛️</span>
    <div class="cover-title">我的申辩</div>
    <div class="cover-subtitle">苏格拉底 · 雅典人民法庭 · 公元前399年</div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange">👴 70岁</span>
      <span class="badge badge-teal">⚖️ 第一次上法庭</span>
      <span class="badge badge-blue">👥 501名陪审员</span>
      <span class="badge badge-coral">⏱ 限时申辩</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 2: 今天的故事 ==================== -->
<div class="slide" data-notes="先让大家了解今天的结构。整个申辩分三部分，对应雅典法庭的三个阶段。指控看起来吓人，但逻辑漏洞百出。">
  <div class="slide-inner">
    <h2>📋 今天的故事</h2>
    <div class="grid2 mt">
      <div>
        <h3>三幕结构</h3>
        <div class="card card-yellow">
          <strong>Part I</strong> 🛡️ 我的辩护<br>
          <span class="small secondary">回应指控，讲述真相</span>
        </div>
        <div class="card card-blue">
          <strong>Part II</strong> ⚖️ 你们要怎么罚我<br>
          <span class="small secondary">量刑辩论</span>
        </div>
        <div class="card card-purple">
          <strong>Part III</strong> 🕊️ 最后几句话<br>
          <span class="small secondary">临终遗言</span>
        </div>
      </div>
      <div>
        <h3>🚨 指控内容</h3>
        <div class="card card-rose card-border-left card-border-coral">
          <strong>指控 ①</strong><br>
          <span style="font-size:24px;">😈</span> 腐蚀青年<br>
          <span class="small secondary">"带坏雅典的年轻人"</span>
        </div>
        <div class="card card-rose card-border-left card-border-coral">
          <strong>指控 ②</strong><br>
          <span style="font-size:24px;">🚫</span> 不信城邦之神<br>
          <span class="small secondary">"引入新的神灵"</span>
        </div>
        <div class="callout warning mt">
          <span class="icon">⚠️</span>
          <div><strong>原告：</strong>美勒托斯（诗人）、安尼托斯（政客）、莱孔（修辞家）</div>
        </div>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 3: 我的开场白 ==================== -->
<div class="slide" data-notes="苏格拉底开场就用反讽——说自己不会说话，实际上是高级修辞策略。这种'不修辞的修辞'贯穿全文。">
  <div class="slide-inner">
    <h2>🎭 我的开场白</h2>
    <div class="quote-card">
      雅典的公民们，我的控告者说得天花乱坠——但几乎没说过一句真话。
    </div>
    <div class="card card-blue mt">
      <p>😤 他们最无耻的说法是让你们提防我的"雄辩"——拜托，<strong>我连法庭话术都不会！</strong></p>
    </div>
    <div class="card card-green">
      <p>🤷 除非"雄辩"就是"说真话"，那我认了。</p>
    </div>
    <div class="callout mt">
      <span class="icon">💡</span>
      <div>
        <strong>苏格拉底的策略</strong><br>
        用"不会说话"来赢得信任。越说自己不懂修辞，越让人觉得他说的是真话。<br>
        <span class="badge badge-teal mt">反讽大师</span>
        <span class="badge badge-orange">以退为进</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 4: 看不见的敌人 vs 看得见的敌人 ==================== -->
<div class="slide" data-notes="苏格拉底区分了两类敌人。看不见的敌人更危险，因为多年谣言已经深入人心。阿里斯托芬的喜剧《云》把他丑化成空谈自然哲学的骗子。">
  <div class="slide-inner">
    <h2>👻 看不见的敌人 vs 看得见的敌人</h2>
    <div class="grid2 mt">
      <div class="card card-purple card-border-left card-border-purple" style="min-height: 220px;">
        <h3>👻 看不见的敌人</h3>
        <p>🎭 阿里斯托芬的《云》把我演成怪人——在天上走路、研究虫子</p>
        <p class="mt">📢 多年积累的谣言，从你们小时候就开始了</p>
        <div class="quote-card" style="font-size:15px; padding: 14px 18px; margin-top: 12px;">
          我只能与影子搏斗——连对手的名字都叫不出来。
        </div>
        <span class="badge badge-coral mt">更危险</span>
      </div>
      <div class="card card-blue card-border-left card-border-blue" style="min-height: 220px;">
        <h3>👁️ 看得见的敌人</h3>
        <div class="flex-col gap-sm mt">
          <div class="card card-white">🪶 <strong>美勒托斯</strong> — 诗人<br><span class="small secondary">代表被我得罪的诗人们</span></div>
          <div class="card card-white">🏛️ <strong>安尼托斯</strong> — 政客<br><span class="small secondary">代表被我得罪的政客们</span></div>
          <div class="card card-white">📜 <strong>莱孔</strong> — 修辞家<br><span class="small secondary">代表被我得罪的演说家们</span></div>
        </div>
        <span class="badge badge-blue mt">面对面的对手</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 5: 德尔斐神谕 ==================== -->
<div class="slide" data-notes="这是整个申辩的转折点。苏格拉底用神谕来解释他为什么到处找人辩论——不是为了炫耀，而是为了验证神的话。">
  <div class="slide-inner">
    <h2>🏛️ 德尔斐神谕</h2>
    <div class="flex-col mt">
      <div class="flow-step">
        <span class="icon">🏃</span>
        <div class="text">好友<strong>凯瑞丰</strong>跑去德尔斐神庙——这家伙做什么都冲动</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <span class="icon">🙋</span>
        <div class="text">问女祭司：<strong>"有没有人比苏格拉底更聪明？"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow);">
        <span class="icon">🔮</span>
        <div class="text"><strong style="font-size:18px;">神谕："没有。"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step">
        <span class="icon">😱</span>
        <div class="text">我的反应：<strong>"这不可能！我明明什么都不知道！"</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--green);">
        <span class="icon">🔍</span>
        <div class="text">我的决定：去找一个比我聪明的人来<strong>反驳神谕</strong></div>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🤔</span>
      <div>但神不会说谎——所以一定是我理解错了。让我去调查调查。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 6: 我的调查报告 ==================== -->
<div class="slide" data-notes="苏格拉底依次拜访三类人。每次都发现同一个规律：他们在自己的领域确实有能力，但都犯了同一个错——以为自己无所不知。">
  <div class="slide-inner">
    <h2>🔍 我的调查报告</h2>
    <div class="grid3 mt">
      <div class="card card-blue">
        <div style="font-size:36px; text-align:center;">🏛️</div>
        <h3 class="center">政客</h3>
        <p>自以为有智慧，其实一无所知。</p>
        <div class="callout" style="background:#d4edfc; margin-top:12px; padding:10px 14px;">
          <div class="small">我比他强一点——至少<strong>我知道自己不知道</strong>。</div>
        </div>
        <div class="center mt"><span class="badge badge-blue">自知之明 +1</span></div>
      </div>
      <div class="card card-yellow">
        <div style="font-size:36px; text-align:center;">🪶</div>
        <h3 class="center">诗人</h3>
        <p>写得好但解释不了自己的作品。靠灵感不靠智慧。</p>
        <div class="callout" style="background:#fff0c4; margin-top:12px; padding:10px 14px;">
          <div class="small">因为会写诗就以为<strong>什么都懂</strong>。</div>
        </div>
        <div class="center mt"><span class="badge badge-yellow">灵感 ≠ 智慧</span></div>
      </div>
      <div class="card card-green">
        <div style="font-size:36px; text-align:center;">🔨</div>
        <h3 class="center">工匠</h3>
        <p>手艺确实好——我承认。但也因为手艺好就以为自己是万事通。</p>
        <div class="callout" style="background:#c8e6c9; margin-top:12px; padding:10px 14px;">
          <div class="small"><strong>技术好 ≠ 全知</strong></div>
        </div>
        <div class="center mt"><span class="badge badge-green">专长陷阱</span></div>
      </div>
    </div>
    <div class="card card-rose mt center" style="padding:16px;">
      <span style="font-size:20px;">📊</span> 调查结论 → <strong>"名声越大的人，智慧越少"</strong>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 7: 神谕的真相 ==================== -->
<div class="slide" data-notes="这是苏格拉底哲学的核心——苏格拉底式无知。他不是说自己什么都不知道，而是说他知道人类智慧的局限性。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🦉 神谕的真相</h2>
    <div style="font-size:72px; margin: 8px 0;">🦉</div>
    <div class="big-quote">
      只有神有真正的智慧。<br>人类的智慧微不足道。<br>最聪明的人是像我这样——<br><strong>知道自己其实什么都不知道的人。</strong>
    </div>
    <div class="flex-row mt" style="justify-content:center;">
      <span class="badge badge-orange">① 神用我做例证</span>
      <span class="badge badge-teal">② 真智慧属于神</span>
      <span class="badge badge-blue">③ 我只比别人多一点自知之明</span>
    </div>
    <div class="card card-rose mt center">
      💰 <strong>代价：赤贫。</strong> 我忙着替神干活，完全无暇谋生。
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 8: 为什么你们恨我 ==================== -->
<div class="slide" data-notes="苏格拉底分析了自己不受欢迎的原因。被他揭穿的人恼羞成怒，加上年轻人模仿他到处质问长辈，让情况雪上加霜。">
  <div class="slide-inner">
    <h2>😡 为什么你们恨我</h2>
    <div class="card card-yellow mt">
      <p>😤 每次我揭穿一个人，他就恨我。他们说不出我到底做了什么坏事，就搬出那些<strong>老套指控</strong>：</p>
      <div class="flex-row mt gap-sm">
        <span class="badge badge-coral">"研究天上的东西"</span>
        <span class="badge badge-coral">"研究地下的东西"</span>
        <span class="badge badge-coral">"不信神"</span>
        <span class="badge badge-coral">"颠倒黑白"</span>
      </div>
    </div>
    <div class="card card-blue mt">
      <p>👦 更糟的是——<strong>你们的孩子开始模仿我</strong>去审问人。</p>
      <p>然后那些被审问的人把气撒到我头上：</p>
      <p style="font-style:italic; color: var(--coral);">"都是苏格拉底教坏的！"</p>
    </div>
    <div class="callout warning mt">
      <span class="icon">🚨</span>
      <div>
        <strong>这就是今天这场审判的真正原因。</strong><br>
        不是什么"腐蚀青年"或"不敬神"——而是<strong>面子挂不住</strong>。
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 9: 法庭交锋：驯马师陷阱 ==================== -->
<div class="slide" data-notes="这是苏格拉底式反诘法的经典展示。他用马的类比让美勒托斯的指控不攻自破——不可能所有人都能改善青年而只有一个人在腐蚀。">
  <div class="slide-inner">
    <h2>🐴 法庭交锋：驯马师陷阱</h2>
    <div class="flex-col mt">
      <div class="flow-step" style="background: var(--blue);">
        <span class="icon">1️⃣</span>
        <div class="text">我问美勒托斯：<strong>谁是青年的改善者？</strong></div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--rose);">
        <span class="icon">2️⃣</span>
        <div class="text">他答：<strong>所有雅典人！</strong>只有我一个人在腐蚀！</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow);">
        <span class="icon">3️⃣</span>
        <div class="text">我的反击：那<strong>马</strong>呢？是所有人都能训好马，还是只有<strong>专业驯马师</strong>？</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--green);">
        <span class="icon">4️⃣</span>
        <div class="text">答案：当然是<strong>少数专家</strong>。</div>
      </div>
      <div class="flow-arrow">↓</div>
      <div class="flow-step" style="background: var(--yellow); border: 2px solid var(--orange);">
        <span class="icon">5️⃣</span>
        <div class="text"><strong>结论：一个人腐蚀、所有人改善？荒谬！</strong></div>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🎯</span>
      <div>而且如果我腐蚀了身边的人，他们反过来会伤害我——<strong>我为什么要害自己？</strong>如果是无意的，应该私下教育我而不是告上法庭。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 10: 逻辑陷阱：不信神？ ==================== -->
<div class="slide" data-notes="苏格拉底用严密的逻辑推理让美勒托斯自相矛盾。控告书本身就承认他信某种神灵，却又说他不信——这是逻辑上的不可能。">
  <div class="slide-inner">
    <h2>🪤 逻辑陷阱：不信神？</h2>
    <div class="card card-blue mt">
      <h3>逻辑推演链</h3>
      <div class="flex-col mt gap-sm">
        <div class="card card-white" style="padding:12px 16px;">📜 控告书说我<strong>"信奉神灵之事"</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-white" style="padding:12px 16px;">🤔 能信神灵之事而不信精灵？→ <strong>不能</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-white" style="padding:12px 16px;">✨ 精灵 = 神 或 <strong>神的后代</strong></div>
        <div class="flow-arrow">↓</div>
        <div class="card card-yellow" style="padding:12px 16px; border: 2px solid var(--coral);">
          💥 所以你说我不信神，又说我信神 → <strong>自相矛盾！</strong>
        </div>
      </div>
    </div>
    <div class="card card-green mt">
      <span style="font-size:28px;">🫏</span>
      <p class="mt"><strong>苏格拉底的类比：</strong>"这就像说骡子存在，但马和驴不存在——有这种道理吗？"</p>
    </div>
    <div class="card card-rose mt center">
      <strong>裁决：</strong>"美勒托斯，你找不到真正的罪名来告我。"
      <span class="badge badge-coral" style="margin-left:8px;">指控破产</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 11: 我是一只牛虻 ==================== -->
<div class="slide" data-notes="牛虻比喻是《申辩》中最著名的段落之一。苏格拉底将自己定位为城邦的觉醒者——不是敌人，而是最忠诚的服务者。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🐝 我是一只牛虻</h2>
    <div style="font-size:72px; margin: 8px 0;">🐝</div>
    <div class="big-quote" style="background: linear-gradient(135deg, var(--yellow), var(--blue));">
      雅典是一匹高贵但懒惰的骏马。<br>
      我是神派来叮它的<strong>牛虻</strong>。
    </div>
    <div class="grid2 mt">
      <div class="card card-rose">
        <p>😴 你们可以一巴掌拍死我，然后继续睡大觉——</p>
        <p class="mt"><strong>除非神再派一只来。</strong></p>
      </div>
      <div class="card card-green">
        <p>💰 不信？看看我的穷就知道了。</p>
        <p class="mt"><strong>谁会为了自讨苦吃而放弃一切？</strong></p>
        <p class="small secondary mt">我没有从任何人那里收过一分钱。</p>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 12: 我的两次抗命 ==================== -->
<div class="slide" data-notes="这两个故事展示了苏格拉底的一致性——无论当权者是民主还是暴政，他都坚持正义，哪怕冒生命危险。">
  <div class="slide-inner">
    <h2>⚔️ 我的两次抗命</h2>
    <div class="grid2 mt-lg">
      <div class="card card-blue card-border-left card-border-blue" style="min-height:200px;">
        <span class="badge badge-blue">🏛️ 民主政体下</span>
        <span class="badge badge-outline" style="border-color:var(--accent-blue); color:var(--accent-blue);">406 BC</span>
        <h3 class="mt">阿吉纽西将军审判案</h3>
        <p>他们要违法集体审判十位将军。</p>
        <p class="mt"><strong>我是执政团唯一的反对者。</strong></p>
        <p class="mt" style="color:var(--coral);">被威胁逮捕也不改口。</p>
      </div>
      <div class="card card-rose card-border-left card-border-coral" style="min-height:200px;">
        <span class="badge badge-coral">👑 暴政下</span>
        <span class="badge badge-outline" style="border-color:var(--coral); color:var(--coral);">404 BC</span>
        <h3 class="mt">三十僭主的命令</h3>
        <p>让我和另外四个人去抓萨拉米斯人莱昂回来处死。</p>
        <p class="mt">其他四个人去了。<strong>我？我回家了。</strong></p>
        <p class="mt" style="color:var(--coral);">差点因此送命。</p>
      </div>
    </div>
    <div class="card card-yellow mt center" style="padding:16px;">
      ⚖️ <strong>无论民主还是暴政，我只听正义的。</strong>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 13: 我不会求饶 ==================== -->
<div class="slide" data-notes="苏格拉底拒绝用感情戏码来博取同情。这在当时的雅典法庭非常罕见——大多数被告都会带家人来哭。">
  <div class="slide-inner">
    <h2>😤 我不会求饶</h2>
    <div class="card card-yellow mt">
      <p style="font-size:18px;">👨‍👦‍👦 我有三个儿子。但我<strong>不会</strong>把他们带来哭给你们看。</p>
    </div>
    <h3 class="mt-lg">为什么？三个理由：</h3>
    <div class="grid3 mt">
      <div class="card card-rose" style="text-align:center;">
        <div style="font-size:36px;">① 😳</div>
        <p class="mt"><strong>丢人</strong></p>
        <p class="small secondary">一个七十岁的人，跪在那里嚎哭？不体面。</p>
      </div>
      <div class="card card-blue" style="text-align:center;">
        <div style="font-size:36px;">② 🏛️</div>
        <p class="mt"><strong>丢雅典的人</strong></p>
        <p class="small secondary">外邦人会说："雅典所谓的贤者也不过如此。"</p>
      </div>
      <div class="card card-purple" style="text-align:center;">
        <div style="font-size:36px;">③ ⚖️</div>
        <p class="mt"><strong>丢你们的人</strong></p>
        <p class="small secondary">你们宣誓依法审判。让我哭着求你们违背誓言？而我自己正因"不虔诚"受审？</p>
      </div>
    </div>
    <div class="callout mt">
      <span class="icon">🎯</span>
      <div>如果我靠哭来说服你们——那恰好证明了我在教你们<strong>不敬神</strong>。</div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 14: 判决：有罪 ==================== -->
<div class="slide" data-notes="501人投票，大约280对221。仅30票之差。苏格拉底自己也注意到了——如果翻转30票就无罪了。这为第二阶段的量刑辩论做了铺垫。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <span class="badge badge-coral" style="font-size:16px; padding: 8px 24px;">Part I 结束</span>
    <h1 class="mt-lg" style="font-size:56px; color: var(--coral);">⚖️ 判决：有罪</h1>
    <div class="grid3 mt-lg" style="max-width:600px;">
      <div class="stat-card" style="background: var(--rose);">
        <div class="num" style="color:var(--coral);">~280</div>
        <div class="label">有罪票</div>
      </div>
      <div class="stat-card" style="background: var(--green);">
        <div class="num" style="color:#43a047;">~221</div>
        <div class="label">无罪票</div>
      </div>
      <div class="stat-card" style="background: var(--yellow);">
        <div class="num" style="color:var(--orange);">~30</div>
        <div class="label">票差</div>
      </div>
    </div>
    <div class="card card-yellow mt-lg" style="max-width:600px;">
      <p>🤔 如果只翻转 <strong>30票</strong>，我就自由了。</p>
      <p class="small secondary mt">有趣的是——如果没有安尼托斯和莱孔加入，美勒托斯连五分之一的票都拿不到，还得交罚款。</p>
    </div>
    <div class="mt-lg">
      <span class="badge badge-blue" style="font-size:16px; padding: 8px 24px;">进入 Part II → 量刑辩论</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 15: 我该受什么"罚" ==================== -->
<div class="slide" data-notes="量刑阶段，苏格拉底的建议震惊了所有人——他要求的是奖赏而不是惩罚。在普里坦内翁免费用餐是雅典最高荣誉之一。">
  <div class="slide-inner">
    <h2>🍽️ 我该受什么"罚"</h2>
    <div class="card card-yellow mt">
      <p style="font-size:18px;">🏆 我是你们的恩人。我建议：<strong>在普里坦内翁公共食堂免费用餐</strong>——比奥林匹亚冠军更有资格！</p>
      <p class="small secondary mt">他们给你短暂的快乐，我给你真正的幸福。而且——他们不缺钱，我缺。</p>
    </div>
    <h3 class="mt-lg">我拒绝的"选项"：</h3>
    <div class="grid4 mt">
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>死刑</strong></p>
        <p class="small secondary">我不知道死亡是好是坏</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>监禁</strong></p>
        <p class="small secondary">做监狱的奴隶？</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>流放</strong></p>
        <p class="small secondary">别处也容不下我</p>
      </div>
      <div class="card card-rose center">
        <div style="font-size:28px;">❌</div>
        <p><strong>沉默</strong></p>
        <p class="small secondary">那不叫活着</p>
      </div>
    </div>
    <div class="card card-green mt center">
      <p>💰 <strong>最终提议：30弥那罚款</strong>（柏拉图、克里托等朋友们担保）</p>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 16: 未经审视的人生 ==================== -->
<div class="slide" data-notes="这是西方哲学史上最著名的格言之一。苏格拉底用它来解释为什么他不可能选择沉默——对他来说，不思考等于不活着。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <div style="font-size:56px; margin-bottom:16px;">💡</div>
    <div style="font-size:40px; font-weight:900; line-height:1.5; max-width:800px;">
      未经审视的人生<br>不值得过。
    </div>
    <div class="mt" style="font-size:16px; color: var(--text2); font-style:italic; letter-spacing: 1px;">
      ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ
    </div>
    <div class="card card-yellow mt-lg" style="max-width:700px; text-align:left;">
      <p>🗣️ 每天谈论美德、审视自己和他人——<strong>这是人最大的善</strong>。</p>
      <p class="mt">让我闭嘴？不可能。这就像让鱼离开水。</p>
    </div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange" style="font-size:14px; padding:6px 16px;">哲学史最强金句</span>
      <span class="badge badge-teal" style="font-size:14px; padding:6px 16px;">2400年后仍在引用</span>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 17: 判决：死刑 ==================== -->
<div class="slide" data-notes="第二次投票，支持死刑的人反而比第一次判有罪的更多。苏格拉底的'傲慢'量刑建议激怒了很多本来同情他的陪审员。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <span class="badge badge-coral" style="font-size:16px; padding: 8px 24px;">Part II 结束</span>
    <h1 class="mt-lg" style="font-size:64px; color: var(--coral);">☠️ 判决：死刑</h1>
    <div class="card card-rose mt-lg" style="max-width:600px;">
      <p>第二次投票中，判死刑的票数比判有罪时<strong>反而更多</strong>。</p>
      <p class="small secondary mt">我的"免费用餐"建议显然惹恼了一些人。但我不后悔。</p>
    </div>
    <div class="mt-lg">
      <span class="badge badge-purple" style="font-size:16px; padding: 8px 24px;">进入 Part III → 最后的话</span>
    </div>
    <svg width="120" height="3" class="mt-lg"><line x1="0" y1="1.5" x2="120" y2="1.5" stroke="var(--coral)" stroke-width="2" stroke-dasharray="6,4"/></svg>
    <p class="secondary mt" style="font-size:14px;">方式：饮下毒芹汁（因等候宗教节日推迟约30天执行）</p>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 18: 致判我死刑的人 ==================== -->
<div class="slide" data-notes="苏格拉底的最后演说分两部分——先对投票判他死刑的人说，再对投无罪票的人说。这一页是前者，语气从容但带有预言的力量。">
  <div class="slide-inner">
    <h2>🏃 致判我死刑的人</h2>
    <div class="big-quote" style="font-size:24px;">
      我宁愿以我的方式说话而死，<br>也不愿以你们的方式说话而活。
    </div>
    <div class="grid2 mt">
      <div class="card card-blue card-border-left card-border-blue">
        <h3>🏃 赛跑比喻</h3>
        <p><strong>不义</strong>比死亡跑得更快。</p>
        <p class="mt">死亡追上了我这个老头——这不难。</p>
        <p class="mt" style="color:var(--coral);"><strong>但不义追上了你们——这才可怕。</strong></p>
      </div>
      <div class="card card-rose card-border-left card-border-coral">
        <h3>🔮 预言</h3>
        <p>我死后，<strong>更多更年轻的人</strong>会来质问你们。</p>
        <p class="mt">杀人堵不住嘴。</p>
        <p class="mt" style="color:var(--teal);"><strong>改善自己吧——这才是唯一的出路。</strong></p>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 19: 论死亡 ==================== -->
<div class="slide" data-notes="苏格拉底对死亡的两种可能性的分析是整部《申辩》最温柔的部分。他用逻辑把恐惧化解为好奇——无论哪种情况，死亡都不是坏事。">
  <div class="slide-inner">
    <h2>💤 论死亡</h2>
    <div class="callout mt">
      <span class="icon">🤫</span>
      <div>我的<strong>神灵之声</strong>今天全程沉默——它通常会阻止我做错事。所以今天发生的一切，<strong>一定是件好事</strong>。</div>
    </div>
    <h3 class="mt-lg">死亡的两种可能：</h3>
    <div class="grid2 mt">
      <div class="card card-blue" style="min-height:200px;">
        <div style="font-size:42px; text-align:center;">😴</div>
        <h3 class="center">无梦之眠</h3>
        <p>永恒不过是一个安详的夜晚。</p>
        <div class="quote-card" style="font-size:14px; padding:12px 16px; margin-top:12px;">
          波斯大王数遍自己的一生，都找不出几个这样无梦的好觉。
        </div>
        <div class="center mt"><span class="badge badge-blue">赚了</span></div>
      </div>
      <div class="card card-yellow" style="min-height:200px;">
        <div style="font-size:42px; text-align:center;">✨</div>
        <h3 class="center">灵魂迁徙</h3>
        <p>去另一个世界——遇见<strong>荷马</strong>！<strong>赫西俄德</strong>！<strong>奥德修斯</strong>！</p>
        <p class="mt">还能继续提问——</p>
        <p style="color:var(--teal);"><strong>最棒的是，那边不会因为提问就判死刑。</strong></p>
        <div class="center mt"><span class="badge badge-yellow">更赚了</span></div>
      </div>
    </div>
    <div class="card card-green mt center">
      <strong>结论：无论哪种情况，死亡都不是坏事。</strong> 所以，请别替我悲伤。
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 20: 最后的话 ==================== -->
<div class="slide" data-notes="苏格拉底的最后遗言。他没有绝望，没有愤怒，只是平静地托付了自己的孩子。最后那句'哪一个更好，只有神知道'是完美的收束。">
  <div class="slide-inner" style="align-items: center;">
    <h2>🕊️ 最后的话</h2>
    <div class="big-quote" style="font-size:24px; background: linear-gradient(135deg, var(--green), var(--blue));">
      好人无论生死<br>都不会遭受真正的恶。<br>神不会忽视他的事。
    </div>
    <div class="card card-yellow mt" style="max-width:700px;">
      <p>🙏 <strong>我的最后请求：</strong></p>
      <p class="mt">等我儿子长大了，如果他们追逐金钱而忽视美德，如果他们自以为了不起——</p>
      <p class="mt" style="color:var(--orange);"><strong>请像我折磨你们一样折磨他们。</strong></p>
    </div>
    <div class="mt-lg" style="max-width:700px;">
      <div style="font-size:28px; font-weight:900; line-height:1.8; text-align:center; padding: 24px; background: linear-gradient(135deg, var(--yellow), var(--rose)); border-radius: 20px;">
        离别的时刻已经到来。<br>
        我去赴死，你们去生活。<br>
        <span style="color:var(--teal);">哪一个更好，只有神知道。</span>
      </div>
    </div>
    <div class="speaker-notes"></div>
  </div>
</div>

<!-- ==================== SLIDE 21: 谢谢 ==================== -->
<div class="slide" data-notes="感谢大家的聆听。苏格拉底的申辩是人类思想史上最动人的文献之一。两千四百年后的今天，他的问题依然值得我们每个人思考。">
  <div class="slide-inner" style="justify-content: center; align-items: center; text-align: center;">
    <div style="font-size:72px; margin-bottom:16px;">🙏</div>
    <h1 style="font-size:48px;">谢谢</h1>
    <p class="secondary mt" style="font-size:18px;">Thank You</p>
    <svg width="80" height="3" class="mt"><line x1="0" y1="1.5" x2="80" y2="1.5" stroke="var(--orange)" stroke-width="2"/></svg>
    <div class="quote-card mt-lg" style="max-width:600px; text-align:left; font-size:16px;">
      我知道我一无所知。<br>
      <span class="small secondary" style="font-style:italic;">— 苏格拉底 (c. 470–399 BC)</span>
    </div>
    <div class="flex-row mt-lg" style="justify-content:center;">
      <span class="badge badge-orange">📖 柏拉图记录</span>
      <span class="badge badge-teal">🏛️ 雅典 399 BC</span>
      <span class="badge badge-blue">🦉 哲学永恒</span>
    </div>
    <p class="small secondary mt-lg">按 N 查看演讲笔记 · 按 ←→ 或点击按钮翻页 · 按 F 全屏</p>
    <div class="speaker-notes"></div>
  </div>
</div>

</div><!-- /deck -->

<!-- ============ CONTROLS ============ -->
<div class="controls">
  <button class="outline" onclick="goTo(0)" title="第一页">⏮</button>
  <button onclick="prev()" title="上一页">← 上一页</button>
  <button onclick="next()" title="下一页">下一页 →</button>
  <button class="outline" onclick="goTo(totalSlides-1)" title="最后一页">⏭</button>
  <button class="outline" onclick="toggleNotes()" title="演讲笔记 (N)">🎙</button>
  <button class="outline" onclick="toggleFullscreen()" title="全屏 (F)">⛶</button>
</div>

<script>
// ============ SLIDE ENGINE ============
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let current = 0;
let notesVisible = false;

function showSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  current = Math.max(0, Math.min(n, totalSlides - 1));
  slides[current].classList.add('active');
  document.getElementById('slideNum').textContent = (current + 1) + ' / ' + totalSlides;
  document.getElementById('progressBar').style.width = ((current + 1) / totalSlides * 100) + '%';
  // Update hash
  history.replaceState(null, '', '#' + (current + 1));
}

function next() { showSlide(current + 1); }
function prev() { showSlide(current - 1); }
function goTo(n) { showSlide(n); }

function toggleNotes() {
  notesVisible = !notesVisible;
  document.querySelectorAll('.speaker-notes').forEach(n => {
    n.classList.toggle('show', notesVisible);
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Populate speaker notes from data attribute
slides.forEach(slide => {
  const note = slide.getAttribute('data-notes');
  const noteEl = slide.querySelector('.speaker-notes');
  if (note && noteEl) {
    noteEl.textContent = note;
    // Re-add the ::before pseudo via keeping the element
  }
});

// Keyboard
document.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
      e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
      e.preventDefault(); prev(); break;
    case 'Home': e.preventDefault(); goTo(0); break;
    case 'End': e.preventDefault(); goTo(totalSlides - 1); break;
    case 'n': case 'N': toggleNotes(); break;
    case 'f': case 'F': if(!e.ctrlKey && !e.metaKey) toggleFullscreen(); break;
  }
});

// Touch / swipe
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
});

// Hash navigation
function initFromHash() {
  const hash = parseInt(location.hash.replace('#', ''));
  if (hash >= 1 && hash <= totalSlides) { showSlide(hash - 1); }
  else { showSlide(0); }
}
initFromHash();
</script>
</body>
</html>

=== FILE: .claude/skills/presentation-skill/examples/ted-talk.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>我的申辩 — 苏格拉底 | TED演讲风</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
<style>
/* ========== RESET & BASE ========== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg-dark: #1a1a1a;
  --bg-red: #c0392b;
  --accent: #e62b1e;
  --text-white: #ffffff;
  --text-dark: #1a1a1a;
  --warm-white: #f5f5f5;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

html, body {
  font-family: var(--font);
  background: var(--bg-dark);
  color: var(--text-white);
  overflow: hidden;
  height: 100%;
  width: 100%;
}

/* ========== SLIDE ENGINE ========== */
.deck {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.slide {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 100px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
  overflow: hidden;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

.slide.bg-dark {
  background: var(--bg-dark);
}

.slide.bg-red {
  background: var(--bg-red);
}

.slide.bg-spotlight {
  background: radial-gradient(ellipse at 50% 40%, #2a2a2a 0%, #1a1a1a 50%, #0d0d0d 100%);
}

.slide.bg-spotlight-intense {
  background: radial-gradient(ellipse at 50% 45%, #333 0%, #1a1a1a 40%, #0a0a0a 100%);
}

/* ========== TYPOGRAPHY ========== */
.display-huge {
  font-size: clamp(48px, 7vw, 120px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.display-large {
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.display-medium {
  font-size: clamp(28px, 3.5vw, 56px);
  font-weight: 900;
  line-height: 1.1;
}

.body-text {
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 300;
  line-height: 1.7;
}

.body-large {
  font-size: clamp(18px, 2.2vw, 32px);
  font-weight: 300;
  line-height: 1.6;
}

.small-text {
  font-size: clamp(12px, 1.2vw, 18px);
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.6;
}

.stat-number {
  font-size: clamp(80px, 12vw, 180px);
  font-weight: 900;
  line-height: 1;
  color: var(--accent);
}

/* ========== DECORATIVE ========== */
.red-underline {
  border-bottom: 4px solid var(--accent);
  padding-bottom: 4px;
  display: inline;
}

.red-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--accent);
}

.red-bar-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: var(--accent);
}

.red-quote {
  color: var(--accent);
  font-size: 1.5em;
  font-weight: 900;
  vertical-align: top;
  line-height: 0.8;
}

.divider {
  width: 80px;
  height: 4px;
  background: var(--accent);
  margin: 24px 0;
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.max-w { max-width: 900px; }
.max-w-wide { max-width: 1100px; }
.mt-sm { margin-top: 16px; }
.mt-md { margin-top: 32px; }
.mt-lg { margin-top: 48px; }
.mb-sm { margin-bottom: 16px; }
.mb-md { margin-bottom: 32px; }
.op-50 { opacity: 0.5; }
.op-70 { opacity: 0.7; }

/* Animated elements */
.slide .fade-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide.active .fade-item {
  opacity: 1;
  transform: translateY(0);
}

.slide.active .fade-item:nth-child(1) { transition-delay: 0.1s; }
.slide.active .fade-item:nth-child(2) { transition-delay: 0.3s; }
.slide.active .fade-item:nth-child(3) { transition-delay: 0.5s; }
.slide.active .fade-item:nth-child(4) { transition-delay: 0.7s; }
.slide.active .fade-item:nth-child(5) { transition-delay: 0.9s; }
.slide.active .fade-item:nth-child(6) { transition-delay: 1.1s; }

/* Three-column stats */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1100px;
}

.stat-card {
  text-align: center;
  padding: 30px 20px;
  border-left: 3px solid var(--accent);
}

.stat-card .label {
  font-size: clamp(20px, 2.5vw, 36px);
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--accent);
}

.stat-card .desc {
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.85;
}

/* Two-column split */
.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  width: 100%;
  max-width: 1000px;
}

.split-card {
  padding: 30px;
  border-top: 4px solid var(--accent);
}

.split-card h3 {
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
  margin-bottom: 16px;
}

.split-card p {
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 300;
  line-height: 1.6;
  opacity: 0.85;
}

/* SVG icons */
.icon-container {
  margin-bottom: 30px;
}

.icon-container svg {
  width: 80px;
  height: 80px;
  stroke: var(--text-white);
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-container.large svg {
  width: 120px;
  height: 120px;
}

/* ========== NAV ========== */
.nav {
  position: fixed;
  bottom: 24px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 100;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.nav:hover { opacity: 1; }

.nav button {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.nav button:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.slide-counter {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,0.6);
  font-variant-numeric: tabular-nums;
}

/* Progress bar */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--accent);
  transition: width 0.4s ease;
  z-index: 200;
}

/* Speaker notes toggle */
.notes-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.95);
  color: rgba(255,255,255,0.8);
  padding: 20px 40px;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 150;
  border-top: 2px solid var(--accent);
  max-height: 30vh;
  overflow-y: auto;
}

.notes-panel.visible {
  transform: translateY(0);
}

.notes-panel .notes-title {
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 8px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ========== PRINT CSS ========== */
@media print {
  .deck { height: auto; overflow: visible; }
  .slide {
    position: relative !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    page-break-after: always;
    page-break-inside: avoid;
    height: 100vh;
    min-height: 100vh;
  }
  .nav, .progress-bar, .notes-panel { display: none !important; }
  @page {
    size: 16in 9in landscape;
    margin: 0;
  }
}

/* ========== 16:9 ASPECT RATIO ========== */
@media (max-aspect-ratio: 16/9) {
  .slide { padding: 40px 60px; }
}
</style>
</head>
<body>

<div class="progress-bar" id="progressBar"></div>

<div class="deck" id="deck">

<!-- ==================== SLIDE 1: 封面 ==================== -->
<div class="slide bg-spotlight active" data-notes="（深呼吸）欢迎各位。我是苏格拉底。一个石匠的儿子，一个助产士的儿子。今天，我要在这里做我人生中最后一次演讲。不是因为我选择了这个舞台——而是因为501个人把我推到了这里。">
  <div class="text-center max-w">
    <div class="fade-item small-text mb-md" style="letter-spacing:0.3em; text-transform:uppercase;">A Final Talk</div>
    <div class="fade-item display-huge mb-md">我的申辩</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large op-70">苏格拉底 &nbsp;|&nbsp; 雅典 · 公元前399年</div>
    <div class="fade-item small-text mt-md" style="opacity:0.4; font-style:italic;">"一个70岁老人的最后演讲"</div>
  </div>
  <div class="red-bar"></div>
</div>

<!-- ==================== SLIDE 2: Hook ==================== -->
<div class="slide bg-dark" data-notes="开场要一击命中。不要解释背景，不要铺垫。直接说出最戏剧性的事实：我从来没上过法庭，但今天要决定我的生死。让观众的心跳漏一拍。">
  <div class="text-center max-w">
    <div class="fade-item display-large" style="margin-bottom:48px;">今天，我第一次走进法庭。</div>
    <div class="fade-item body-large op-70">我70岁了。从未打过官司。<br>但今天，<span class="red-underline">501个人要决定我的生死</span>。</div>
  </div>
</div>

<!-- ==================== SLIDE 3: The accusation ==================== -->
<div class="slide bg-dark" data-notes="两项指控听起来很严重，但我要告诉你们真正的原因——不是什么腐蚀青年、不信神。真正的原因是：我让太多有权势的人在公众面前丢了脸。权力最怕的不是反抗，是被揭穿。">
  <div class="text-center max-w">
    <div class="fade-item stat-number mb-sm">2</div>
    <div class="fade-item display-medium mb-md">两项指控</div>
    <div class="fade-item" style="display:flex; gap:60px; justify-content:center; margin-bottom:40px;">
      <div class="body-large" style="border-left:3px solid var(--accent); padding-left:20px;">① 腐蚀青年</div>
      <div class="body-large" style="border-left:3px solid var(--accent); padding-left:20px;">② 不信城邦之神</div>
    </div>
    <div class="fade-item body-text op-70" style="font-style:italic;">但真正的原因？<span class="red-underline">我说了太多真话。</span></div>
  </div>
</div>

<!-- ==================== SLIDE 4: The invisible enemy ==================== -->
<div class="slide bg-dark" data-notes="阿里斯托芬在《云》里把我写成了一个在天上研究云彩的疯老头。整个雅典都在笑。24年了，谣言比真相跑得快一万倍。今天我对抗的不是三个原告，而是整个城市24年的偏见。这才是最可怕的敌人。">
  <div class="text-center max-w">
    <div class="fade-item icon-container">
      <!-- Theater mask SVG -->
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="38" r="26" />
        <circle cx="30" cy="32" r="5" />
        <circle cx="50" cy="32" r="5" />
        <path d="M30 48 Q40 56 50 48" />
        <path d="M14 28 Q20 12 40 10 Q60 12 66 28" stroke-width="2" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">24年前，一个喜剧作家把我写成了小丑。</div>
    <div class="fade-item body-large mb-md op-70">从那以后，谣言从未停止。</div>
    <div class="fade-item body-large" style="color:var(--accent);">今天我不是在和三个人战斗——<br>我是在和<span class="red-underline">影子</span>战斗。</div>
  </div>
</div>

<!-- ==================== SLIDE 5: The oracle ==================== -->
<div class="slide bg-red" data-notes="（语气变得神秘、庄重）凯勒丰——我最好的朋友，一个热情到有点疯的人——他跑去德尔斐问阿波罗神。神的回答改变了一切。我不敢相信。我，苏格拉底，一个光脚走在雅典街头的老头，怎么可能是最有智慧的人？但神不会说谎。所以我决定去找出这句话的真正含义。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md" style="opacity:0.9;">有一天，我最好的朋友跑去问神：</div>
    <div class="fade-item body-large mb-md" style="font-style:italic; opacity:0.85;">"有没有人比苏格拉底更聪明？"</div>
    <div class="fade-item" style="height:40px;"></div>
    <div class="fade-item display-large mb-md">神说：没有。</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large op-70" style="font-style:italic;">这句话改变了我的一生。</div>
  </div>
  <div class="red-bar-top" style="background:rgba(255,255,255,0.2);"></div>
</div>

<!-- ==================== SLIDE 6: My mission ==================== -->
<div class="slide bg-dark" data-notes="（加速，充满能量）我不信。真的不信。所以我做了一件在当时看来很合理但后来证明很危险的事——我决定证明神是错的。我去找了雅典最有名望的人。政客、诗人、工匠。我和他们对话。我问问题。结果呢？">
  <div class="text-center max-w">
    <div class="fade-item display-medium mb-md">我不相信。</div>
    <div class="fade-item body-large mb-md op-70">所以我决定证明神是错的。</div>
    <div class="fade-item body-large mb-md">我去找了最有权势的人、<br>最有才华的人、最有技术的人。</div>
    <div class="fade-item" style="height:30px;"></div>
    <div class="fade-item display-medium" style="color:var(--accent);">结果——</div>
  </div>
</div>

<!-- ==================== SLIDE 7: What I found ==================== -->
<div class="slide bg-dark" data-notes="（摇头，带着悲伤的幽默）政客们什么都不懂但觉得自己什么都懂。诗人写出了伟大的作品却解释不了自己在写什么——他们靠灵感，不靠理解。工匠确实有真本事，但因为擅长一件事就觉得自己擅长所有事。规律太明显了：名声越大，越不愿意承认自己的无知。">
  <div class="text-center max-w-wide">
    <div class="fade-item stat-grid">
      <div class="stat-card">
        <div class="label">政客</div>
        <div class="desc">自以为无所不知<br><span style="color:var(--accent);">→ 实际一无所知</span></div>
      </div>
      <div class="stat-card">
        <div class="label">诗人</div>
        <div class="desc">靠灵感写作<br><span style="color:var(--accent);">→ 解释不了自己的作品</span></div>
      </div>
      <div class="stat-card">
        <div class="label">工匠</div>
        <div class="desc">手艺精湛<br><span style="color:var(--accent);">→ 但以为自己什么都懂</span></div>
      </div>
    </div>
    <div class="fade-item mt-lg display-medium" style="font-style:italic; opacity:0.7;">名声越大，智慧越少。</div>
  </div>
</div>

<!-- ==================== SLIDE 8: The paradox ==================== -->
<div class="slide bg-spotlight-intense" data-notes="（停顿很长。让这句话悬在空中。）这就是一切的核心。我不是因为知道的多才被神说最有智慧——而是因为我是唯一一个知道自己不知道的人。这听起来像悖论，但这是人类最深刻的真理之一。所有的傲慢、所有的暴政，都始于一个人确信自己绝对正确。">
  <div class="text-center max-w">
    <div class="fade-item display-large" style="line-height:1.2;">
      <span class="red-quote">"</span>我唯一知道的，<br>就是我一无所知。<span class="red-quote">"</span>
    </div>
    <div class="fade-item body-large mt-lg op-70" style="max-width:700px; margin:40px auto 0;">
      这就是为什么神说我最有智慧。<br>不是因为我知道得多——<br>而是因为<span class="red-underline">只有我知道自己不知道</span>。
    </div>
  </div>
</div>

<!-- ==================== SLIDE 9: Why they hate me ==================== -->
<div class="slide bg-dark" data-notes="（语气逐渐加重，像在数罪状一样，但数的是别人的仇恨）每一次揭穿，就多一个敌人。然后年轻人开始模仿我——他们去质问长辈，质问权威。长辈们怒了。但他们不怪自己无知，他们怪我。'苏格拉底腐蚀了我的孩子！'——不，是你的无知暴露了。">
  <div class="text-left max-w" style="padding-left:10%;">
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px;">每次我揭穿一个人——</div>
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px; color:var(--accent);">他就恨我。</div>
    <div class="fade-item body-large mb-md" style="border-left:3px solid var(--accent); padding-left:24px;">然后你们的孩子开始学我。</div>
    <div class="fade-item body-large" style="border-left:3px solid var(--accent); padding-left:24px; color:var(--accent);">然后更多人恨我。</div>
  </div>
</div>

<!-- ==================== SLIDE 10: The horse trainer ==================== -->
<div class="slide bg-dark" data-notes="（转向讽刺，轻松的语气）美勒托斯站在这里说全雅典都在教育青年，只有我一个人在腐蚀。我就问了一个简单的问题——马。养马的人都知道，不是随便谁都能训好马的，只有专业的驯马师可以。大多数人碰马反而会毁了马。人难道比马简单？一个人腐蚀全城改善——这不荒谬吗？">
  <div class="text-center max-w">
    <div class="fade-item icon-container">
      <!-- Horse SVG -->
      <svg viewBox="0 0 80 80">
        <path d="M15 55 L20 35 Q25 20 35 18 L40 10 L42 18 Q50 16 55 22 L60 20 L58 28 Q65 35 63 45 L65 55" />
        <line x1="25" y1="55" x2="22" y2="72" />
        <line x1="35" y1="55" x2="33" y2="72" />
        <line x1="52" y1="55" x2="50" y2="72" />
        <line x1="60" y1="55" x2="58" y2="72" />
        <circle cx="52" cy="24" r="2" fill="white" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">美勒托斯说整个雅典都在改善青年，只有我在腐蚀。</div>
    <div class="fade-item body-text mb-md op-70">我问他：马呢？<br>是所有人都能训好马，还是只有专业驯马师？</div>
    <div class="fade-item body-text mb-md op-50">他答不上来了。</div>
    <div class="fade-item body-large" style="color:var(--accent); font-weight:700;">一个人腐蚀，全城改善？荒谬。</div>
  </div>
</div>

<!-- ==================== SLIDE 11: The logic trap ==================== -->
<div class="slide bg-dark" data-notes="（像律师一样锐利）美勒托斯在控告书里亲手写的：苏格拉底信奉'神灵之事'。同时又控告我不信神。你不能同时说一个人信神灵的事又不信神——这就像说骡子存在但马和驴不存在。逻辑上完全不成立。这不是审判，这是一场闹剧。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md">你的控告书说我<span class="red-underline">"信奉神灵之事"</span>。</div>
    <div class="fade-item body-large mb-md">同时又说我<span class="red-underline">不信神</span>。</div>
    <div class="fade-item body-text mb-md op-70" style="font-style:italic;">美勒托斯，这就像说——<br>骡子存在，但马和驴不存在。</div>
    <div class="fade-item display-medium mt-md" style="color:var(--accent);">自相矛盾。</div>
  </div>
</div>

<!-- ==================== SLIDE 12: The gadfly ==================== -->
<div class="slide bg-red" data-notes="（声音变得庄严，像在宣读使命）这是我最重要的比喻。雅典是一匹好马——高贵、强壮、但因为太大太舒服而变得迟钝懒惰。神派我来当一只牛虻——不停地叮它，让它保持清醒。你们当然可以一巴掌拍死我。但之后呢？你们会继续沉睡。神不会再轻易派来第二只牛虻了。">
  <div class="text-center max-w">
    <div class="fade-item icon-container large">
      <!-- Gadfly SVG -->
      <svg viewBox="0 0 120 120">
        <ellipse cx="60" cy="60" rx="20" ry="12" />
        <ellipse cx="60" cy="55" rx="8" ry="6" />
        <path d="M40 52 Q25 35 30 25" />
        <path d="M80 52 Q95 35 90 25" />
        <path d="M40 58 Q20 50 15 42" />
        <path d="M80 58 Q100 50 105 42" />
        <line x1="55" y1="49" x2="50" y2="40" />
        <line x1="65" y1="49" x2="70" y2="40" />
        <line x1="60" y1="72" x2="60" y2="85" />
      </svg>
    </div>
    <div class="fade-item body-large mb-md">雅典是一匹高贵的骏马。<br>体型庞大，行动迟缓。</div>
    <div class="fade-item display-medium mb-md">我是神派来叮它的牛虻。</div>
    <div class="fade-item body-large mb-sm op-70">你们可以拍死我。</div>
    <div class="fade-item body-large" style="font-weight:700;">但之后——谁来叫醒你们？</div>
  </div>
</div>

<!-- ==================== SLIDE 13: Two acts of courage ==================== -->
<div class="slide bg-dark" data-notes="（坚定、自豪但不炫耀）两次。两次我用行动证明了我不是只会说。民主政体下，所有人投票要处死十位将军——违法的。我是唯一一个投反对票的人。暴政下，三十僭主命令我去抓人。我转身回家了。无论什么制度，无论谁掌权，我只听一个声音——正义。">
  <div class="text-center max-w-wide">
    <div class="fade-item display-medium mb-lg">两次勇气</div>
    <div class="fade-item split-grid">
      <div class="split-card">
        <h3>民主之下</h3>
        <p>所有人都说处死将军。<br><strong style="color:var(--accent);">我一个人说不。</strong></p>
      </div>
      <div class="split-card">
        <h3>暴政之下</h3>
        <p>命令我去抓人。<br><strong style="color:var(--accent);">我回家了。</strong></p>
      </div>
    </div>
    <div class="fade-item body-large mt-lg op-70" style="font-style:italic;">无论什么制度，我只听正义的。</div>
  </div>
</div>

<!-- ==================== SLIDE 14: I will not beg ==================== -->
<div class="slide bg-dark" data-notes="（克制的情感，眼中有泪但声音不抖）我有三个儿子。最小的还很小。我完全可以把他们带到这里，让他们哭，让他们跪——陪审团一定会心软。很多人就是这么做的。但我不会。因为你们宣了誓——依法审判。法庭不是施舍同情的地方。我尊重你们的誓言，即使你们自己不尊重。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md">我有三个儿子。</div>
    <div class="fade-item body-large mb-md op-70">但我不会把他们带来哭给你们看。</div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large">因为你们宣誓<span class="red-underline">依法审判</span>——<br>不是施舍同情。</div>
  </div>
</div>

<!-- ==================== SLIDE 15: GUILTY ==================== -->
<div class="slide bg-red" data-notes="（沉默。长沉默。然后平静地说）有罪。差30票。如果30个人改变主意——我就无罪。30个人。在501人中。这说明什么？说明今天的审判从一开始就不是关于证据的。是关于情绪的。关于24年累积的偏见。">
  <div class="text-center">
    <div class="fade-item display-huge" style="font-size:clamp(80px,15vw,200px); letter-spacing:0.1em;">有罪</div>
    <div class="fade-item body-large mt-lg op-70">30票之差。</div>
  </div>
</div>

<!-- ==================== SLIDE 16: My "punishment" ==================== -->
<div class="slide bg-dark" data-notes="（苦笑，带着挑衅的幽默）你们问我觉得自己该受什么罚？好吧。我认真想了想。我一辈子放弃赚钱的机会，穷到今天还得朋友帮忙凑罚款，就为了让你们变得更好。所以我的刑罚应该是——在普利坦尼昂免费吃饭。像奥运冠军一样。因为冠军给你们幸福的假象，我给你们真正的清醒。至于罚款——30弥那，朋友们替我出了。我自己？身无分文。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-md" style="opacity:0.6;">你们问我该受什么罚？</div>
    <div class="fade-item display-medium mb-md" style="line-height:1.3;">我的建议：<span style="color:var(--accent);">免费吃饭。</span></div>
    <div class="fade-item body-large mb-md op-70">在公共食堂。像奥林匹亚冠军一样。</div>
    <div class="fade-item body-text op-70" style="font-style:italic;">因为冠军给你们幸福的假象——<br>我给你们<span class="red-underline">真的</span>。</div>
    <div class="fade-item small-text mt-lg" style="opacity:0.4;">最终罚金：30弥那。朋友们替我出的。</div>
  </div>
</div>

<!-- ==================== SLIDE 17: THE quote ==================== -->
<div class="slide bg-spotlight-intense" data-notes="（这是最重要的一句话。说得很慢，每一个字都像石头一样掷出去。让它在大厅里回响。）未经审视的人生不值得过。这不是一句鸡汤。这是我用一生——现在，用我的死——换来的真理。如果你今天只记住一句话，请记住这一句。">
  <div class="text-center">
    <div class="fade-item" style="margin-bottom:20px;">
      <span class="red-quote" style="font-size:clamp(40px,6vw,100px);">"</span>
    </div>
    <div class="fade-item display-huge" style="margin-bottom:16px;">未经审视的人生</div>
    <div class="fade-item display-huge" style="color:var(--accent);">不值得过。</div>
    <div class="fade-item" style="margin-top:20px;">
      <span class="red-quote" style="font-size:clamp(40px,6vw,100px);">"</span>
    </div>
    <div class="fade-item small-text mt-md" style="opacity:0.3; font-style:italic;">ὁ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ</div>
  </div>
</div>

<!-- ==================== SLIDE 18: DEATH ==================== -->
<div class="slide bg-red" data-notes="（声音没有颤抖。平静。这就是他们的决定。）死刑。他们选择了最重的惩罚。但请注意——我没有求饶，没有逃跑，没有假装忏悔。我站着接受了判决。不是因为我认为他们是对的。而是因为逃跑意味着承认我做错了。我没有。">
  <div class="text-center">
    <div class="fade-item display-huge" style="font-size:clamp(100px,18vw,260px); letter-spacing:0.15em;">死刑</div>
  </div>
</div>

<!-- ==================== SLIDE 19: To my condemners ==================== -->
<div class="slide bg-dark" data-notes="（对着判我有罪的人，但没有愤怒，是一种超越的慈悲）你们以为杀了我就安静了？不。我死后会有更多年轻人站出来质问你们。他们比我年轻，比我无情，比我更不会给你们面子。封住一个人的嘴，不如反省自己的灵魂。这是我给你们的最后忠告。">
  <div class="text-left max-w" style="padding-left:5%;">
    <div class="fade-item body-large mb-md">我不怕死。我怕的是<span class="red-underline">不义</span>。</div>
    <div class="fade-item body-large mb-md op-70">不义比死亡跑得更快。<br>死亡追上了我——不义追上了你们。</div>
    <div class="fade-item divider"></div>
    <div class="fade-item body-large mb-md">我死后，更多人会来质问你们。<br>他们更年轻，更无情。</div>
    <div class="fade-item body-large" style="color:var(--accent); font-weight:700;">杀人堵不住嘴。改善自己吧。</div>
  </div>
</div>

<!-- ==================== SLIDE 20: On death ==================== -->
<div class="slide bg-dark" data-notes="（语气变得温暖、哲学性的，甚至有些调皮）死亡是什么？只有两种可能。第一种：什么都没有。像一场无梦的深眠。你告诉我——你人生中睡得最好的那一晚是不是什么梦都没做？如果永恒不过就是这样一个好觉——那简直赚了。第二种呢？灵魂去了另一个地方。我能遇见荷马！遇见赫西俄德！我可以继续问问题！而且最棒的是——那里不会因为你提问就判你死刑。（笑）">
  <div class="text-center max-w-wide">
    <div class="fade-item display-medium mb-lg">两种可能——</div>
    <div class="fade-item split-grid">
      <div class="split-card" style="text-align:center;">
        <h3 style="font-size:clamp(28px,3vw,48px); margin-bottom:20px;">无梦的长眠</h3>
        <p>永恒不过是一个好觉。<br><br><strong style="color:var(--accent); font-size:1.2em;">赚了。</strong></p>
      </div>
      <div class="split-card" style="text-align:center;">
        <h3 style="font-size:clamp(28px,3vw,48px); margin-bottom:20px;">灵魂的旅行</h3>
        <p>遇见荷马！继续提问！<br><br><strong style="color:var(--accent); font-size:1.2em;">而且——那边不会因为提问就判死刑。</strong></p>
      </div>
    </div>
  </div>
</div>

<!-- ==================== SLIDE 21: Farewell ==================== -->
<div class="slide bg-spotlight" data-notes="（最后一次面对所有人。声音平静如水。一个用一生追求真理的人，在死亡面前的平静不是装出来的——是真正活明白了。）好人不会遭受真正的恶。无论生死。这是我最后说的话。然后我转身离开。走向监狱。走向那杯毒堇汁。你们继续生活。哪一个更好？我不知道。你们也不知道。只有神知道。这就是人的处境。谢谢。">
  <div class="text-center max-w">
    <div class="fade-item body-large mb-lg op-70">好人无论生死都不会遭受真正的恶。</div>
    <div class="fade-item display-large" style="line-height:1.2; margin-bottom:32px;">
      离别的时刻已经到来。<br>
      我去赴死，你们去生活。
    </div>
    <div class="fade-item divider" style="margin:24px auto;"></div>
    <div class="fade-item body-large" style="color:var(--accent); font-style:italic;">
      <span class="red-underline">哪一个更好，只有神知道。</span>
    </div>
  </div>
  <div class="red-bar"></div>
</div>

</div><!-- /deck -->

<!-- NAV -->
<nav class="nav" id="nav">
  <button id="btnPrev" aria-label="Previous slide">&#9664;</button>
  <span class="slide-counter" id="slideCounter">1 / 21</span>
  <button id="btnNext" aria-label="Next slide">&#9654;</button>
  <button id="btnNotes" aria-label="Toggle notes" style="font-size:12px;">N</button>
</nav>

<!-- NOTES PANEL -->
<div class="notes-panel" id="notesPanel">
  <div class="notes-title">Speaker Notes</div>
  <div id="notesContent"></div>
</div>

<script>
(function() {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let current = 0;

  const counter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const notesPanel = document.getElementById('notesPanel');
  const notesContent = document.getElementById('notesContent');
  let notesVisible = false;

  function go(index) {
    if (index < 0 || index >= total) return;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    counter.textContent = (current + 1) + ' / ' + total;
    progressBar.style.width = ((current + 1) / total * 100) + '%';
    // Update notes
    const note = slides[current].getAttribute('data-notes') || '';
    notesContent.textContent = note;
  }

  function next() { go(current + 1); }
  function prev() { go(current - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(total - 1); break;
      case 'n':
      case 'N':
        notesVisible = !notesVisible;
        notesPanel.classList.toggle('visible', notesVisible);
        break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(()=>{});
        } else {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Click nav
  document.getElementById('btnNext').addEventListener('click', next);
  document.getElementById('btnPrev').addEventListener('click', prev);
  document.getElementById('btnNotes').addEventListener('click', function() {
    notesVisible = !notesVisible;
    notesPanel.classList.toggle('visible', notesVisible);
  });

  // Touch swipe
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }
  }, { passive: true });

  // Init
  go(0);
})();
</script>

</body>
</html>

