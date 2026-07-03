# First Spread Review · 日耗 2 亿 token

## 逐项核查

### 1. 封面

- **图文并茂**：**pass**。`TokenField` 提供 SVG 网格 + 散点 + 横线 + `2×10⁸ tokens` 标注；文字层有 kicker、标题、副题、底部钩子句。截掉任何一层都仍成立。
- **只用 `--ra-*` token**：**pass（按项目模板标准）**。颜色、字体、间距、圆角均走 `--ra-*`；`1px` 边框、`letterSpacing: 0.22em`、SVG `strokeWidth` / `fontSize` / 圆点半径与模板占位封面及 `raw-policy.md` 示例一致，视为 SVG 坐标系内的可缩放值，不视为写死颜色/字体/像素字号。
- **呼应正文主旨**：**pass**。散点密度梯度、token 数量级标注、"智能已便宜如兵，限制你的从不是成本，而是调兵的能力" 均直接指向正文核心论点。
- **比例自适应**：**pass**。使用 `aspect-ratio: 3 / 4` + `max-width: min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))`，与 `references/cover.md` 硬约束一致；内部用百分比 / flex / grid 撑起。
- **是否与 Hero 重复内容**：**fail**。封面 h1 "日耗2亿token" + p "是脑力工作者的底线。" 与 `Article.tsx` 中 `Hero.title` "日耗2亿token，是脑力工作者的底线。" 构成整句重复。`cover.md` 明确要求"封面文字 ≠ Hero 文字"，封面应是钩子而非锚点。

### 2. 首屏像文章，不像 landing page

- **pass**。首屏结构为 TOC → Hero → Lead → Section 01，是文章阅读流；Lead 一句"2 亿 token 不到 100 元，但 99% 的人用不掉"直接点出文章要解决的悖论。

### 3. 第一节阅读节奏

- **阅读节奏**：**pass**。段落长度错落：成本直觉 → `Quote` 核心断言 → sensible 前提解释 → `Aside` 原则 → 反驳常见说法 → 项羽/韩信案例 → 结论收束。
- **Raw 是否服务理解**：**pass**。`01-opening.tsx` 中 Raw 的散点/斜线 SVG 直接可视化"用兵能力 = 调用量 × 有效 ROI"，与段落论点一一对应。
- **图片是否服务表达**：**pass**。封面与第一节的 SVG 均服务于"token 量级 / 调用能力"这一核心概念，无装饰性插图。
- **移动端能读**：**pass**。SVG 使用 `width="100%"` + `viewBox`，文字随容器缩放；Cover 标题使用 `clamp(2rem, 5.4vw, var(--ra-text-4xl))`，在小屏会自然缩小。

### 4. 主题气质与版式宽度

- **主题气质**：**pass**。Tufte 的 Data-Ink 气质成立：细线网格、低饱和散点、无卡片/阴影/圆角滥用、正文驱动、Raw 像"页边手图"。
- **版式宽度**：**pass**。《Plan》指定 `regular`，`Article.tsx` 使用 `width="regular"`。

### 5. 可构建性与控制台

- **typecheck**：**pass**。`npm run typecheck` 无错误。
- **浏览器控制台**：**pass**。`npm run dev` 在 `http://localhost:5173/` 运行；Playwright 抓取到 `errors: []`、`warnings: []`，页面 title 正确。

---

## 必须修复项

1. **Cover 与 Hero 标题重复**（最高优先级）
   - 文件：`article/Cover.tsx` 第 57–69 行、`article/Article.tsx` 第 8 行。
   - 问题：封面与 Hero 共用了同一句话 "日耗2亿token，是脑力工作者的底线。"，违反 `cover.md` 封面自检第 5 条。
   - 修复方向：封面保留视觉钩子，标题改为不与 Hero 重复的短语（例如 "The Art of Token"、"2×10⁸"、"兵符" 等），副题也不宜复述 Hero 标题。

---

## 改写建议

- **封面标题**：把 h1 改为 "The Art of Token" 或 "兵仙的兵符"，p 改为 "AI 时代的调用能力" 之类，让 Hero 承担完整标题责任。
- **封面 kicker**："THE ART OF TOKEN" 可以保留，但注意全大写与标题大小写统一。
- **Hero**：目前 `subtitle="The Art of Token：AI时代的兵仙"` 与封面 kicker 也有轻微撞车，建议封面 kicker 与 Hero subtitle 做区分：封面用更抽象的符号化语言，Hero 用完整副题。
- **SVG 文本**：`TokenField` 中 `fontSize="24"`、`12`、`10`、`11` 在坐标系内可缩放，但若希望严格跟随主题字号系统，可改用 `calc(var(--ra-text-xs) * N)` 并通过 CSS 变量注入，当前不作为必须修复。

---

**结论**：首屏样张整体符合 Tufte 长文气质，构建与控制台干净，第一节节奏与 Raw 配合得当。唯一必须修复的是 **Cover 与 Hero 的内容重复**；修完后即可进入 Phase 5。
