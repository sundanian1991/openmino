# OpenWiki从v0.1.3到v0.1.4的演进记录

> Sources: mino, 2026-04-28
> Raw:[v0.1.5 release notes](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.5.md); [v0.1.6 release notes](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.6.md); [v0.1.7 release notes](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.7.md); [v0.1.8 release notes](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.8.md)

## 概述

OpenWiki的v0.1.5到v0.1.8版本release notes记录了应用在核心功能、用户体验和技术稳定性方面的持续迭代。虽然这四个版本的详细changelog包含在v0.1.5的累积更新说明中（v0.1.5 notes中提到了来自v0.1.3和v0.1.4的功能），但每个版本都有独立的release notes文件。本文章整理这四个版本的演进脉络。

## v0.1.3-v0.1.8 版本演进

### v0.1.5（2026-04-xx）— YouTube 开箱即用

| 类别 | 变更 |
|------|------|
| 核心功能 | YouTube 字幕开箱即用（新用户无需额外安装依赖） |
| AI 功能 | 修复 AI 摘要语言不跟随系统的问题 |
| 错误提示 | 优化内容保存失败、网址读取失败的错误提示 |
| 体验优化 | 优化洞察页面体验 |
| 前置版本功能 | v0.1.3：应用内更新提醒；v0.1.4：macOS 权限引导 |

### v0.1.6（2026-04-xx）— 知识图谱与状态保持

| 类别 | 变更 |
|------|------|
| 知识图谱 | 修剪无意义连接，聚类更清晰 |
| 标签质量 | 知识点标签更具体、更精准 |
| 状态保持 | 切换板块不再清空 AI 对话窗口，浏览状态也保留 |

### v0.1.7（2026-04-xx）— YouTube 提速与瘦身

| 类别 | 变更 |
|------|------|
| 核心功能 | YouTube 字幕提取更快、成功率更高 |
| 应用体积 | 减小约 35MB |
| Bug 修复 | 浮窗条形模式误触关闭；内容列表 >50 条数量显示错误 |

### v0.1.8（2026-04-xx）— 滚动流畅度

| 类别 | 变更 |
|------|------|
| 性能优化 | 内容列表大量时滚动不再卡顿 |

## 迭代趋势分析

**四个版本的关注点变化**：
- v0.1.5 → **功能完善**（开箱即用、错误提示优化）
- v0.1.6 → **核心体验**（知识图谱质量、状态保持）
- v0.1.7 → **性能与瘦身**（YouTube 提速、35MB 减重）
- v0.1.8 → **长尾问题**（大数据量下的滚动性能）

**发布说明写作规范**（延续）：
- 说用户能感知到的变化，不暴露技术细节
- 每条一句话
- 双语（中文+英文）

## 安装流程稳定性

从 v0.1.5 到 v0.1.8，安装说明完全一致：
1. 下载对应架构的 DMG（Apple Silicon / Intel）
2. 拖入 Applications
3. 首次打开需手动放行（未经 Apple 公证）
4. 设置 → AI 配置 API Key（Claude / OpenAI / Gemini）

核心安装流程稳定，未因版本迭代而改变。
