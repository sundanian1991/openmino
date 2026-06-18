# Phase 6 Final Review · 日耗 2 亿 token

> 主题：tufte | 宽度：regular | 信息保留：~100% longform

## Editorial

**总体 verdict：pass**

### 逐项核查

1. **它仍然是一篇文章，不是网页应用 —— pass**
   - 证据：`Article.tsx` 仅使用 `Article`、`Hero`、`Lead`、`Section`、`Quote`、`Aside`、`Table`、`Raw` 等出版组件；没有路由、状态、表单、API 调用或交互式应用逻辑。整体是线性长文结构，`Raw` 仅作为内插图（SVG 图表）点亮关键概念。

2. **信息保留比例符合 Brief（~100% longform）；必须保留的信息没有丢 —— pass**
   - 证据：
     - 核心命题「Token消耗的本质是调用智能的能力」在 `article/sections/01-opening.tsx` 第 10-12 行完整保留。
     - 项羽 vs 韩信 ROI/调用量对比在 `article/sections/01-opening.tsx` 第 31-39 行、`Raw` 图表第 52-83 行完整保留。
     - 2 亿 token ≈ 93 元的三段 source 计算：作者月包追踪（`article/sections/03-cost.tsx` 第 11-35 行）、Peter Steinberger API 账单（`article/sections/04-leverage.tsx` 第 15-39 行）、X 用户自测（`article/sections/04-leverage.tsx` 第 42-43 行）全部保留。
     - 月薪 12000 元 / 10% 可支配收入消费观在 `article/sections/05-consumption.tsx` 第 11-27 行保留。
     - 四个第一性原理条件在 `article/sections/06-invariants.tsx` 第 10-48 行完整保留。
     - 前额叶减负、谷氨酸减少在 `article/sections/07-brain.tsx` 第 7-49 行完整保留。
     - 结尾「超体」与 10 万倍调兵能力差距在 `article/sections/08-conclusion.tsx` 第 18-28 行完整保留。
   - 可删减项处理得当：迪迦奥特曼玩笑保留 2 处且未重复；作者简介头衔精简为关键身份；重复的「有人会说」反问句式合并为 1 处。

3. **语言符合 Brief：全文中文，地道、无翻译腔 —— pass**
   - 证据：全文以中文为绝对主体；英文术语（token、ROI、source、Vibe Coding、craft、SOTA、reasoning 等）均来自原文风格，用于表达特定概念，未见机器翻译痕迹。`article/sections/02-leadership.tsx` 第 19 行还修正了原文"很多人能熟练 vibe coding 的人"的语病，表述更自然。

4. **没有空泛标题、堆卡片、过度总结 —— pass**
   - 证据：8 个 section 标题均为具体命题或问题，无"引言""总结""结语"等空泛标题。`Aside` 共 9 个，分布合理，均用于标注核心判断/条件/误区，非装饰。`article/sections/06-invariants.tsx` 用 4 个 `Aside` 对应 4 个条件，与 `source/source.md` 的"条件1-4"结构一致。结尾 `Quote` 使用原文核心宣言，非额外添加的过度总结。

### 必须修复项

无。

### 改写建议（可选）

1. **`article/sections/06-invariants.tsx` 第 10-48 行的 4 个连续 `Aside`**：在 `tufte` 主题下，需确认 `Aside` 组件渲染为边注/旁注而非带背景色的卡片块。若渲染为卡片，会违反 tufte "去除卡片、填色块"的禁止项，建议改用加粗段落或编号列表呈现四条件。
2. **`article/sections/08-conclusion.tsx` 第 33 行 "physiological hacker"**：与前后中文语体略有不一致。`source/source.md` 第 202 行为"生理黑客科学"，建议改为"生理黑客"或保留英文并加括号注释，如"生理黑客（physiological hacker）"。
3. **`article/sections/01-opening.tsx` 第 31 行 "谁的 value 更大？"**：中英文切换略显突兀，可改为"谁创造的价值更大？"或保留英文并确保 tufte 主题下的中西文混排不会断裂。

## Visual

总体 verdict：**fail**

当前视觉整体符合 tufte 克制、线条化、Data-Ink 的气质，但存在两处必须修复的 blocker：封面渲染非确定性（影响 SSR/PDF），以及 Raw 中出现 tufte 禁止的填色块。

逐项核查：

1. **主题气质统一；Raw 没有野生样式（都用 `--ra-*` token）** — pass
   - 全部颜色、字号、间距、字重均通过 `var(--ra-color-*)` / `var(--ra-text-*)` / `var(--ra-space-*)` / `var(--ra-font-*)` 取值，未出现写死 hex、写死 px 字号或独立于主题的字体。
   - Article.tsx 的 footer Raw、所有 Section 的 SVG 均使用 token。

2. **图片符合主题和上下文，不抢正文，不与 Raw 重复** — pass
   - Plan 配图策略为 `none`，全文无外部图片；所有视觉增强通过 Raw SVG / CSS 实现，与正文论点一一对应（ROI 散点、成本换算、价格杠杆、预算条、四条件推导、前额叶负荷）。
   - 封面为抽象 token 场 SVG，不与任何 Raw 图表重复。

3. **没有明显 AI 味：装饰性视觉、紫粉渐变、圆角彩卡、假插画、emoji 装饰** — pass（带必须修复项）
   - 未发现渐变、紫粉高饱和、假插画、emoji、卡片阴影或圆角彩卡。封面与 Raw 均为低饱和线条/点阵。
   - **问题**：SectionInvariants.tsx 结论框使用 `fill="var(--ra-color-accent)" opacity="0.08"`，属于 tufte 明确禁止的"填色块"（见 `theme-profiles/tufte.md` 禁止项：卡片、面板、填色块）。

4. **桌面和移动端都可读，无文字溢出 / 遮挡 / 空白异常** — pass（带必须修复项）
   - 封面标题使用 `clamp(2rem, 5.4vw, ...)` 与 `maxWidth: 85%`；所有 SVG 使用 `viewBox + width="100%"`，比例自适应。
   - **问题**：Cover.tsx 在 render 中调用 `Math.random()` 生成点阵，导致每次渲染结果不同。这会引发 SSR/客户端 hydration 不匹配，且 PDF 输出无法保证可复现。

5. **封面不与 Hero 重复内容，比例 3:4 自适应** — pass
   - Hero 主标题为中文"日耗2亿token，是脑力工作者的底线。"，副标题"The Art of Token：AI时代的兵仙"；封面主标题为英文 "The Art of Token"，副标题"AI 时代的调用能力"，底部 tagline 为"智能已便宜如兵..."，无文字重复。
   - 封面使用 `aspectRatio: "3 / 4"` + `max-width: min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))`，符合 cover.md 的硬约束。

### 必须修复项

**[blocker] Cover.tsx 渲染非确定性（SSR / PDF 风险）**

- 文件：`/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-06-18-日耗2亿token-beautiful-article/article/Cover.tsx`
- 行号：第 113-114 行
- 代码片段：
  ```tsx
  const density = 0.12 + 0.88 * Math.pow(progress, 2.2);
  if (Math.random() > density) continue;
  ```
- 问题：React 每次 render 都会重新随机撒点，hydration 时服务端与客户端 DOM 不一致；PDF 导出时也无法复现。
- 建议：使用确定性伪随机（seeded PRNG）或在构建时预计算 dots 数组，确保同一篇文章的封面图案稳定。

**[blocker] SectionInvariants.tsx 结论框使用填色块，违反 tufte 禁填色原则**

- 文件：`/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-06-18-日耗2亿token-beautiful-article/article/sections/06-invariants.tsx`
- 行号：第 77 行
- 代码片段：
  ```tsx
  <rect x="120" y="140" width="320" height="70" fill="var(--ra-color-accent)" opacity="0.08" stroke="var(--ra-color-accent)" strokeWidth="1.5" />
  ```
- 问题：`fill` + 8% 透明度仍属于 tufte 禁止的"填色块"。
- 建议：删除 `fill` 属性，仅保留 `stroke` 细线框；若需强调，可加粗 stroke 或改用文本加粗/字重变化。

### 改写建议（可选）

- SectionCost.tsx 第 37 行 Raw 标题"2 亿 token 能买什么？"与内部三组等价换算内容不完全匹配，建议改为"价格等价换算"或"2 亿 token 约等于什么"。
- SectionBrain.tsx 的"高负荷"侧使用多层填充矩形表示谷氨酸堆积，在严格 tufte 下可改用同高度下边框或斜线纹理填充，减少填色面积；但当前 12% 透明度已较克制，修复优先级低于 SectionInvariants 的 8% 结论框。
- Cover.tsx 在窄屏下左右内边距使用 `--ra-space-8`（4rem），可考虑在移动端通过 `@media` 降至 `--ra-space-5`/`--ra-space-6`，避免文字区域过窄。

修复以上两项 blocker 后，Visual 终审可通过。

## Technical

总体 verdict: **pass**

逐项核查：

1. `npm run html` 可构建，`article/article.html` 存在且可打开
   - 状态：pass
   - 证据：`npm run html` 成功（`dist/index.html` 2 MB，复制到 `article/article.html`）；`ls -lh article/article.html` 显示文件 1.9M，首行为 `<!doctype html>`，`<html lang="zh-CN">`。单文件 HTML 离线可打开。

2. 浏览器控制台无报错
   - 状态：pass
   - 证据：启动 `vite preview`（端口 4173）后，用 Playwright 抓取页面加载完成 2 秒内所有 `console` 与 `pageerror` 事件。`errors: []`，`warnings: []`。

3. 图片有 alt，链接可用，标题层级合理
   - 状态：fail（标题层级）
   - 图片：pass。页面无 `<img>` 标签，符合 plan 中 `配图策略：none`。5 个内容 SVG 均带 `role="img"` 与 `aria-label`，语义化替代文本完整。
   - 链接：pass。渲染出 3 个外部链接（原文微信文章、邀请信、beautiful-article GitHub）和 8 个 TOC 锚点（`#section-01` 至 `#section-08`），`href` 均非空且格式正确。
   - 标题层级：fail。页面出现两个 `<h1>`：
     - `<h1>The Art of Token</h1>`（Hero subtitle，`/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-06-18-日耗2亿token-beautiful-article/article/Article.tsx` 第 16 行传入的 `subtitle`）
     - `<h1 class="ra-hero__title">日耗2亿token，是脑力工作者的底线。</h1>`（Hero title，第 15 行）
     - 同一页面存在两个 H1，违反语义层级；副标题不应是 H1，建议改为 `<p>` 或 `<h2>`。该行为来自 `reacticle` Hero 组件的默认渲染，非当前文件可直接修复。

4. 章节序号全篇自洽
   - 状态：pass
   - 证据：`article/sections/*.tsx` 中 8 个 `Section` 组件的 `index` 依次为 `01` 至 `08`，单调连续；TOC 锚点对应 `#section-01` 至 `#section-08`；与 plan.md Outline 的 8 个 section 标题一一对应。全篇无 `Subsection` 组件，无子序号前缀问题。

必须修复项：

- **标题层级**：Hero 副标题被渲染为 `<h1>`，导致页面出现两个 H1。
  - 位置：`/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-06-18-日耗2亿token-beautiful-article/article/Article.tsx` 第 15–16 行
  - 代码片段：
    ```tsx
    <Hero
      title="日耗2亿token，是脑力工作者的底线。"
      subtitle="The Art of Token：AI时代的兵仙"
      ...
    />
    ```
  - 建议：检查 `reacticle` Hero 组件是否支持 `subtitleTag` / `titleTag` 或类似 API，将 subtitle 降级为 `<p>` 或 `<h2>`；若组件不支持，可考虑将副标题移出 `Hero`，作为独立的 Lead 或段落呈现。

改写建议（可选）：

- SVG 序号 0 在 DOM 中无 `aria-label`/`role`，经排查为 React 内部占位 SVG，非内容元素。若后续出现 a11y 扫描告警，可在其根节点加 `aria-hidden="true"`（需改组件库）。
- 外部链接（微信文章）无法从本地验证 HTTP 200，但 URL 有效；交付前可手动二次确认。
