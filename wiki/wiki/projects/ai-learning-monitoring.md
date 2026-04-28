# AI 学习监控项目

> Sources: Mino, 2026-02-28 ~, 2026-03-15
> Raw: [项目主文档](../../raw/projects-ai-learning/project.md) | [每周监控输出](../../raw/projects-ai-learning/outputs-weekly-monitor-2026-03-01.md) | [学习笔记](../../raw/projects-ai-learning/memory-learning-notes.md)

## 概述

AI 学习监控项目旨在长期跟踪 https://zara.faces.site/ai 的 AI 学习资源库内容更新，建立定期抓取、对比更新、学习笔记的完整工作流。

## 项目目标

长期关注 AI 学习资源库的内容更新，保存整理并转化为个人学习笔记。该资源库由 Zara Zhang 策划，汇集 Google Blog/DeepMind、Ben's Bites、YouTube 等高质量 AI 学习源。

## 执行策略

### 三阶段工作流

| 阶段 | 内容 | 频率 |
|------|------|------|
| 阶段 1 | 首次完整抓取和整理，建立基线存档 | 已完成 |
| 阶段 2 | 定期抓取，对比更新，记录新增内容 | 每周一次 |
| 阶段 3 | 提取关键信息，形成学习笔记，定期回顾 | 持续 |

### 约束

- 抓取频率：每周一次，避免过度请求
- 存储位置：`outputs/` 目录
- 文件命名：按日期组织（YYYY-MM-DD.md）

## 监控脚本与工具

### 技术栈

资源库使用 Next.js（动态渲染），需要通过浏览器渲染或 API 方式抓取。

### 输出文件

| 文件 | 内容 |
|------|------|
| `outputs-2026-02-28-full-scan.md` | 首次完整扫描结果 |
| `outputs-weekly-monitor-YYYY-MM-DD.md` | 每周监控对比 |
| `memory-learning-notes.md` | 学习笔记和洞察 |

## 里程碑

- M1：完成首次完整内容抓取和整理（已完成）
- M2：建立定期监控机制（2026-03-07 完成）
- M3：形成个人学习笔记库（进行中）

## 记忆模式与产出

### 学习发现

1. **TLDW 工具** — 加速长视频学习效率
2. **Claude Code 核心团队** — 了解工具背后的制作人
3. **产品思维来源** — 多位 AI PM 的观点输出

### 与工作的关联

- 产品管理：多个 PM 观点源可参考
- 工具使用：Claude Code、NotebookLM 是日常使用工具
- 学习效率：TLDW、LongCut 提升学习效率

## 后续方向

- 将监控与 Stanford CS146S 课程学习结合
- 建立课程资源与实践工作的映射关系
- 持续积累个人 AI 知识库
