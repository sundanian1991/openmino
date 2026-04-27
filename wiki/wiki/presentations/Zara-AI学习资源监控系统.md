# Zara AI学习资源监控系统

> Sources: mino, 2026-04-28
> Raw: [项目定义](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-zara-ai-current.md); [memory-2026-04-03](../../raw/presentations/projects-proj-1772240987779-zrc3gz-memory-2026-04-03.md); [memory-2026-04-08](../../raw/presentations/projects-proj-1772240987779-zrc3gz-memory-2026-04-08.md); [每周监控-04-03](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-03.md); [每周监控-04-03-v2](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-03-v2.md); [每周监控-04-08](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-weekly-monitor-2026-04-08.md); [Zara AI当前状态](../../raw/presentations/projects-proj-1772240987779-zrc3gz-outputs-zara-ai-current.md)

## Overview

Zara AI学习资源监控系统是一个持续运行的内容监控项目，目标是定期监控 https://zara.faces.site/ai 网站的内容更新。该项目从2026-04-03开始执行，计划每周一次，共7次监控。监控系统记录了Featured Videos、Video Podcasts、People to Follow、Newsletters、Products、Prompts、Skills七个板块的完整内容。本文章总结监控发现、内容结构和后续行动。

## 监控系统架构

### 监控目标

监控Zara的AI学习资源库（Faces平台），追踪以下板块的内容变化：
- Featured Videos（精选视频）：6个
- Video Podcasts（播客频道）：12个
- People to Follow（关注人物）：31位
- Newsletters（新闻通讯）：6个
- Products I Like（推荐产品）：9个
- Prompts（提示词模板）：4个
- Skills（技能项目）：2个

### 监控执行记录

| 轮次 | 日期 | 抓取方式 | 发现 |
|------|------|---------|------|
| 1 | 2026-04-03 | Chrome CDP | 首次完整抓取 |
| 2 | 2026-04-03-v2 | Chrome CDP | 验证抓取 |
| 3 | 2026-04-08 | Tavily extract | 无变化（Chrome CDP失败后切换） |

### 技术经验

Chrome CDP抓取失败（"Chrome debug port not ready"），切换Tavily extract成功。后续监控优先用Tavily。这是一个实用的技术经验——CDP依赖本地Chrome调试端口，稳定性不如云端抓取。

## Zara AI学习资源完整内容

### 精选视频（6个）

| 标题 | 作者/来源 | 时长 | 分类 |
|------|---------|------|------|
| Deep Dive into LLMs like ChatGPT | Andrej Karpathy | 3:31:23 | Fundamentals |
| How to Build a Beloved AI Product | Granola CEO Chris Pedregal | 1:08:35 | Product Founder |
| Inside NotebookLM | Raiza Martin & Steven Johnson | 46:11 | Product |
| Prompting 101 | Anthropic | 24:52 | Prompting |
| Andrew Ng: Building Faster with AI | Y Combinator | 43:57 | Product |
| Inside ChatGPT | Nick Turley (OpenAI) | 1:35:37 | Marketing |

### 播客频道（12个）

涵盖AI工程师播客（Latent Space）、使用方式学习（AI & I）、领导访谈（Google DeepMind Podcast）、AI新闻（AI Daily Brief）、科技日播（TBPN）、Sequoia AI访谈（Training Data）、产品增长专家（Lenny's Podcast）、产品领导者访谈（Behind the Craft）、Elad Gil & Sarah Guo（No Priors）、Redpoint AI（Unsupervised Learning）、South Park Commons（Minus One）、YC播客（Lightcone）。

### 关注人物（31位）

**原则**：Follow builders, not influencers.

核心人物涵盖Karpathy、Anthropic团队、YC合伙人、AI产品CEO等一线建设者。

### 推荐产品（9个）

NotebookLM（Google AI笔记本）、Huxe（NotebookLM团队新项目）、Granola（AI会议记录）、Snipd（AI播客）、Comet（Perplexity浏览器）、Tolan（AI好友）、Poke（个性化AI助手）、Faces（网站构建工具）、TLDW（长视频学习工具）。

### 提示词模板（4个）

AI字典应用、AI实时提示视频录制、播客转书籍章节、X数据分析仪表盘。

### 技能项目（2个）

Frontend Slides（HTML幻灯片技能）、YouTube to ebook（YouTube转EPUB）。

## 监控发现

两次监控之间**无实质性内容更新**。网站处于稳定维护状态，所有板块内容与上周一致。Newsletters板块的差异（上周记录5个vs实际6个）确认是首次抓取时漏记Peter Yang，并非真实新增。

## 后续行动建议

完成7次监控后，可考虑：
1. 内容趋势分析：7轮数据可以识别内容更新频率和偏好
2. 资源推荐系统：基于Zara的 curated list，建立个人的AI学习资源索引
3. 内容变化预警：当检测到实质性更新时自动提醒
