# AI 学习监控项目

> Sources: Mino, 2026-02-28 ~, 2026-03-15
> Raw:[项目主文档](../../raw/projects-ai-learning/project.md); [每周监控输出](../../raw/projects-ai-learning/outputs-weekly-monitor-2026-03-01.md); [学习笔记](../../raw/projects-ai-learning/memory-learning-notes.md)

## 概述

AI 学习监控项目旨在长期跟踪 https://zara.faces.site/ai 的 AI 学习资源库内容更新，建立定期抓取、对比更新、学习笔记的完整工作流。该资源库由 Zara Zhang 策划，汇集 Google Blog/DeepMind、Ben's Bites、YouTube 等高质量 AI 学习源。

## 项目目标

长期关注 AI 学习资源库的内容更新，保存整理并转化为个人学习笔记。

| 维度 | 说明 |
|------|------|
| 目标网站 | https://zara.faces.site/ai |
| 技术栈 | Next.js（动态渲染），需要通过浏览器渲染或 API 方式抓取 |
| 资源特点 | 免费访问、非技术人员友好、手工精选（非算法推荐） |
| 内容源 | Google Blog/DeepMind、Google Research、Google Cloud、Ben's Bites、YouTube 等 |

## 三阶段执行策略

| 阶段 | 内容 | 频率 | 状态 |
|------|------|------|------|
| 阶段 1 | 首次完整抓取和整理，建立基线存档 | 已完成 | ✅ |
| 阶段 2 | 定期抓取，对比更新，记录新增内容 | 每周一次 | ✅ |
| 阶段 3 | 提取关键信息，形成学习笔记，定期回顾 | 持续 | 🔄 |

### 约束

- 抓取频率：每周一次，避免过度请求
- 存储位置：`outputs/` 目录
- 文件命名：按日期组织（YYYY-MM-DD.md）

## 输出文件

| 文件 | 内容 |
|------|------|
| `outputs-2026-02-28-full-scan.md` | 首次完整扫描结果 |
| `outputs-weekly-monitor-YYYY-MM-DD.md` | 每周监控对比 |
| `memory-learning-notes.md` | 学习笔记和洞察 |

## 首次扫描基线（2026-02-28）

资源库总计 64 个资源，分布在 5 个分类：

| 分类 | 数量 | 代表内容 |
|------|------|----------|
| Featured Videos | 6 | Karpathy Deep Dive into LLMs、NotebookLM 幕后、Anthropic Prompting 101 |
| Video Podcasts | 12 | Latent Space、Lenny's Podcast、Training Data (Sequoia) |
| People to Follow | 31 | Andrej Karpathy、Cat Wu (Claude Code PM)、Thariq (Claude Code Team) |
| Newsletters | 6 | Ben's Bites、AI Valley、The Keyword (Google) |
| Products | 9 | NotebookLM、TLDW、Granola、Huxe、Comet (Perplexity) |

## 周度监控首次报告（2026-03-01）

**结论**：本周无内容更新（64 个资源全部无变化）。

**原因分析**：
1. 手工精选模式 — Zara 的资源库需要作者亲自观看/使用后才收录
2. 质量优先 — 不是自动聚合
3. 更新频率可能为每月或每季度，而非每周

**建议**：继续保持每周监控，如下周仍无更新，可考虑调整为双周监控。

## 学习笔记与洞察（2026-02-28 首次接触）

### 最有价值的发现

| 发现 | 说明 | 与工作的关联 |
|------|------|-------------|
| TLDW 工具 | Zara 自己做的长 YouTube 视频学习加速工具 | 提升学习效率，看 Karpathy 等长视频 |
| Claude Code 团队 | Cat Wu (PM)、Thariq (team)、Amanda Askell (性格专家) | 了解正在使用的工具背后的团队 |
| NotebookLM 幕后 | Raiza Martin (前 PM) + Steven Johnson (作者) | 产品思维来源 |
| Granola CEO | Chris Pedregal，被 Zara 评为"最欣赏的 AI PM" | 产品管理参考 |

### 下一步学习计划

1. 看 Karpathy 的 LLM 深入讲解（用 TLDW 加速）
2. 订阅 Ben's Bites 和 Peter Yang Newsletter
3. 关注 Cat Wu 和 Thariq（Claude Code 团队）
4. 尝试 Granola 会议笔记工具

## 里程碑

- M1：完成首次完整内容抓取和整理（已完成）
- M2：建立定期监控机制（2026-03-07 完成）
- M3：形成个人学习笔记库（进行中）
