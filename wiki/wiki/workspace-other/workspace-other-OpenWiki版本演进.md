# OpenWiki 版本演进与功能迭代

> Sources: Mino (AI), 2026-04-26
> Raw: [CHANGELOG](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CHANGELOG.md); [release notes v0.1.5-v0.2.0](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.2.0.md); [CODE_OF_CONDUCT](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CODE_OF_CONDUCT.md); [CLAUDE.md](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CLAUDE.md)

## 概述

OpenWiki 是一个 Mac 桌面端知识管理工具，workspace-other 目录下保存了完整的 release notes（v0.1.5 到 v0.2.0，共 6 个版本）以及项目治理文件（CHANGELOG、CODE_OF_CONDUCT、CLAUDE.md）。这篇 wiki 分析 OpenWiki 的版本演进路径和功能迭代策略。

## 版本历史概览

| 版本 | 发布时间 | 主要方向 |
|------|----------|----------|
| v0.1.5 | — | 基础功能完善 |
| v0.1.6 | — | 体验优化 |
| v0.1.7 | — | Bug 修复 |
| v0.1.8 | — | 功能增强 |
| v0.1.9 | — | AI 能力升级 |
| v0.2.0 | — | DeepSeek + 本地模型支持 |

从版本号的演进可以看出，项目经历了"基础功能 → 体验打磨 → AI 能力扩展"的三个阶段。

## v0.2.0 深度分析

### 新增 AI Provider

**DeepSeek 作为一等公民**

- 支持 V4 系列（V4 Pro / V4 Flash）
- 定位："便宜速度又快"
- 这意味着 OpenWiki 开始重视性价比用户，不只是追求最强模型

**LM Studio 本地模型支持**

- 与 Ollama 并列
- 本地模型意味着：隐私保护、零 API 费用、离线可用
- 适合对数据安全敏感的用户

**OpenAI 最新模型**

- GPT-5.5、GPT-5.5 Pro、GPT-5.4 Nano
- 保持在最新模型支持上不掉队

### Bug 修复分析

**Ollama 深度分析卡住**

修复前：跑深度分析时卡住、返回空结果
修复后：正常工作

这说明 OpenWiki 的本地模型支持经历了真实用户的验证和反馈。

**假超时问题**

修复前：本地模型分析等待时长不够，出现"假超时"
修复后：最长等待 15 分钟

15 分钟这个数值说明：本地模型的深度分析确实很慢，但值得等。这不是技术限制，是耐心问题。

### 体验优化

**洞察报告显示数据时间范围**

在报告顶部显示"年-月-日 至 年-月-日"，解决用户"这是哪个时间段的数据"的困惑。

**"入知识库"按钮误导**

修复前：内容已入知识库后仍显示"入知识库"按钮
修复后：正确隐藏按钮

这种看似微小的 UX bug，实际会让用户困惑"我到底有没有存进去"。

## 项目治理分析

### CLAUDE.md 配置

OpenWiki 有自己的 CLAUDE.md，说明项目深度集成了 Claude Code。这反映了：
- 项目可能是 vibe coding（AI 辅助编程）出来的
- 开发流程中 AI 参与度高
- 对 AI 工具友好

### CODE_OF_CONDUCT

有行为准则文件，说明项目面向开源社区，有协作规范。这是标准开源项目的做法。

### 安装流程设计

OpenWiki 的安装流程特别考虑了 macOS 的公证（notarization）问题：

1. 下载对应架构的 .dmg（Apple Silicon / Intel）
2. 拖入 Applications
3. 首次启动需要手动放行（右键 → 打开 → 确认）
4. 以后直接双击即可

这是未做 Apple 公证的 macOS 应用的标准安装流程。OpenWiki 在文档中详细说明了每一步，降低了用户的困惑。

## 版本发布策略

### 双语 Release Notes

v0.2.0 的 release notes 同时提供中英文两个版本。这符合 OpenWiki 面向中文用户的定位，同时也保留了英文版本给国际用户。

### 发布内容结构

每个版本的 release notes 遵循相同结构：
1. What's New（功能更新）
2. Bug Fixes（问题修复）
3. Installation Guide（安装指南）
4. 中英文双语

这种一致性降低了用户的阅读成本。

## 对年老师的参考价值

OpenWiki 的版本演进展示了知识管理工具应该关注什么：

1. **AI Provider 多样化**：不绑定单一 AI 服务，给用户选择权
2. **本地模型支持**：隐私和零成本是重要卖点
3. **细节体验打磨**：按钮状态、时间范围显示——这些小细节决定"好用"
4. **持续迭代**：6 个版本从基础功能到 AI 扩展，节奏稳健

年老师在评估知识管理工具时，可以关注：
- 是否支持多种 AI provider（不被锁定）
- 是否支持本地模型（数据不出本机）
- 版本迭代是否活跃（说明项目在持续改进）
- 安装流程是否顺畅（降低使用门槛）
