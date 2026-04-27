# AI 学习资源监控体系

> Sources: Zara AI 学习资源库每周监控 (2026-04-03 至 2026-04-12)
> Raw: [每周监控-2026-04-03](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-03.md); [每周监控-2026-04-03-v2](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-03-v2.md); [每周监控-2026-04-08](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-08.md); [Zara AI 当前状态](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-zara-ai-current.md); [项目记忆-2026-04-03](../../raw/presentations/projects-proj-1772240987779-zrc3gz-memory-2026-04-03.md); [项目记忆-2026-04-08](../../raw/presentations/projects-proj-1772240987779-zrc3gz-memory-2026-04-08.md)

## 概述

AI 学习资源监控体系是 Mino 知识库中关于外部 AI 学习资源持续追踪的系统方法。该体系每周定期对 Zara's AI learning library（zara.faces.site/ai）进行内容抓取和变化检测，记录 Featured Videos、Video Podcasts、People to Follow、Newsletters、Products、Prompts 和 Skills 等 7 个板块的内容变化。该项目不仅是对一个网站的监控，更是一套关于如何持续追踪外部知识源、发现变化信号、并据此调整个人学习策略的方法论。

## 监控目标与网站结构

**监控网站**：https://zara.faces.site/ai

**网站定位**：AI 学习资源库，由 Faces 平台构建，包含视频、播客、人物、通讯、产品、提示词模板和技能项目七大板块。

**监控频率**：每周一次，共执行 7 次（2026-04-03 至 2026-04-12）。

**网站内容结构**：

**Featured Videos（精选视频）**：6 个核心视频，涵盖 AI 基础知识到产品实战：
- Deep Dive into LLMs like ChatGPT — Andrej Karpathy（3 小时 31 分钟，Fundamentals）
- How to Build a Beloved AI Product — Granola CEO Chris Pedregal（1 小时 8 分钟，Product Founder interview）
- Inside NotebookLM — Raiza Martin & Steven Johnson（46 分钟，Product）
- Prompting 101 — Anthropic（24 分钟，Practical tutorial）
- Andrew Ng: Building Faster with AI — Y Combinator（43 分钟，Vibe coding）
- Inside ChatGPT — Nick Turley, OpenAI（1 小时 35 分钟，Marketing and growth）

**Video Podcasts（播客频道）**：12 个核心播客，覆盖 AI 工程、产品领导力、投资趋势等维度：
- Latent Space — AI Engineers 播客
- AI & I — AI 使用方式学习
- Google DeepMind Podcast — Google AI 领导访谈
- The AI Daily Brief — AI 新闻
- TBPN — 科技日播
- Training Data — Sequoia AI 访谈
- Lenny's Podcast — 产品与增长专家访谈
- Behind the Craft — 产品领导者访谈
- No Priors — Elad Gil & Sarah Guo
- Unsupervised Learning — Redpoint AI
- Minus One Podcast — South Park Commons
- Lightcone Podcast — YC 播客

**People to Follow on X（关注人物）**：31 位核心人物，原则是"Follow builders, not influencers"。

**Newsletters（新闻通讯）**：6 个订阅源：
- AI Valley — AI 每日动态
- Every — AI 时代深度文章
- The Keyword — Google AI 官方博客
- Ben's Bites — 非技术人员 AI 构建指南
- AINews by smol.ai — AI 工程师新闻
- Peter Yang — PM 友好 AI 技能提升

**Products I Like（推荐产品）**：9 个 AI 产品：
- NotebookLM — Google 的 AI 笔记本/知识重混工具
- Huxe — NotebookLM 团队新创业项目
- Granola — AI 会议记录助手
- Snipd — AI 播客应用
- Comet (Perplexity) — Perplexity AI 浏览器
- Tolan — AI 好友
- Poke — 个性化主动型 AI 助手
- Faces — 本网站构建工具
- TLDW — 长 YouTube 视频学习工具

**Prompts（提示词模板）**：4 个模板，均带有 Demo：
- AI dictionary — AI 字典应用构建
- Video recorder with live prompting — AI 实时提示视频录制
- Acquired Podcast to book — 播客转书籍章节
- X analytics dashboard — X 数据分析仪表盘

**Skills（技能项目）**：2 个开源项目：
- Frontend Slides — Claude 前端技能创建网页幻灯片（GitHub）
- YouTube to ebook — YouTube 转录转 EPUB 电子书（GitHub）

## 监控方法论

**变化检测策略**：每周对比上周记录，识别新增、删除或修改的内容。大多数周"无实质性内容更新"，但持续监控的价值在于建立基线——知道"正常"是什么样，才能在真正变化时第一时间识别。

**完整性记录**：即使无变化，也完整记录所有板块的内容。这建立了网站的"知识快照"，可以随时回溯某个时间点的内容状态。

**差异分析**：当发现差异时，区分"真正新增"和"上周漏记"。例如 2026-04-08 发现 Newsletters 板块从 5 个变为 6 个（含 Peter Yang），经分析判断为上周可能漏记，实际无新增。

## 播客转书籍章节提示词模板

Zara 网站的 Prompts 板块中有一个特别有价值的模板——"Acquired Podcast to book"。这是一个将长播客节目转化为商业传记章节的高质量提示词。

**角色定义**：你是一个执行助理，帮我把一个长 Acquired 播客节目转化为一本实体书中引人入胜的章节。

**风格与语气**：像优秀商业传记的章节一样写作——如《鞋狗》《一网打尽》《孵化 Twitter》。包含丰富的叙事和戏剧张力，关键转折点作为核心场景处理，引用原话让主人公自己说话，读者应该感觉在看历史发生而不是读摘要。

**六步工作流**：
1. **理解弧线**：识别中心叙事、关键角色、转折点、风险
2. **角色地图**：首次出现时清晰介绍每个人物，重新出现时重新锚定读者
3. **概念解释**：识别"阻碍理解"的概念，用类比或真实例子解释
4. **引用收割**：保留主持人和原始资料的两类引用
5. **构建叙事**：开篇从场景或张力开始，中间按时间或主题推进，结尾留下共鸣
6. **融合**：将叙事、分析和引用融合为流畅的一章

**质量检查**：7 个问题——这像我想读的商业书籍章节吗？开篇有吸引力吗？保留了最好的引用吗？转折点有戏剧重量吗？不了解这家公司的人能理解故事吗？读者能跟踪人物吗？打印出来好看吗？

这个提示词模板的方法论价值在于：它定义了一个完整的知识转译流程——从音频到文字、从对话到叙事、从信息到洞察。

## 监控的实践意义

持续监控一个 AI 学习资源库，不是简单的"看看有没有更新"，而是：

**建立知识基线**：知道正常状态是什么，才能在真正变化时识别。

**追踪趋势信号**：当 Featured Videos 从 3 小时的技术深度讲解转向 20 分钟的产品教程，说明行业关注点在变化。

**发现学习机会**：Products 板块的新产品值得关注，Skills 板块的新项目可能值得安装，Newsletters 的新订阅源可能提供更好的信息流。

**监控作为一种纪律**：每周一次的固定动作，培养持续关注外部信号的习惯。不是一次性的研究，而是持续的情报收集。
