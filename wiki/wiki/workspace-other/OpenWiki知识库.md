# OpenWiki 知识库

> Sources: Mino (AI), 2026
> Raw: [OpenWiki README](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-README.md); [OpenWiki README.zh-CN](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-README.zh-CN.md); [OpenWiki CLAUDE](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CLAUDE.md); [OpenWiki DESIGN](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-DESIGN.md); [OpenWiki CONTRIBUTING](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CONTRIBUTING.md); [OpenWiki CODE_OF_CONDUCT](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CODE_OF_CONDUCT.md); [OpenWiki CHANGELOG](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CHANGELOG.md); [release notes v0.1.5-v0.2.0](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.2.0.md)

## Overview

OpenWiki 是一个被归档到 workspace-other 目录的开源知识库项目。该项目拥有完整的开源项目结构：README（含中英文版本）、CLAUDE.md（AI 交互配置）、DESIGN.md（设计规范）、CONTRIBUTING.md（贡献指南）、CODE_OF_CONDUCT.md（行为准则）、CHANGELOG.md（变更日志）以及 6 个版本的 release notes（v0.1.5 到 v0.2.0）。

这个项目的存在说明年老师对知识库/Wiki 类工具持续关注，可能是为了评估或参考如何构建自己的知识管理体系。

## 项目结构

### 标准开源文件

- **README.md / README.zh-CN.md**：项目介绍和快速开始指南，包含中文翻译版本，说明项目面向中文用户
- **CLAUDE.md**：AI 交互配置，说明 OpenWiki 对 Claude Code 的集成支持，可能包含项目结构说明和命令定义
- **DESIGN.md**：设计规范，定义了知识库的视觉/交互设计原则
- **CONTRIBUTING.md**：贡献指南，定义如何参与项目开发
- **CODE_OF_CONDUCT.md**：行为准则，定义社区参与的行为规范
- **CHANGELOG.md**：变更日志，追踪功能更新和修复

### Release Notes

从 v0.1.5 到 v0.2.0 共 6 个版本，包含：
- **release-notes-README.md**：Release notes 说明
- **release-notes-TEMPLATE.md**：Release notes 模板
- **v0.1.5.md ~ v0.1.9.md**：5 个小版本
- **v0.2.0.md**：第一个 0.2.x 版本，可能包含重要功能更新

v0.2.0 的语义版本升级暗示这个版本可能引入了破坏性变更或重要新功能。

## 与 Mino 知识库的关联

OpenWiki 被归档到 workspace-other，说明它被 Mino 的 wiki 工具抓取过。年老师可能在做以下事情之一：

1. **工具评估**：比较 OpenWiki 与 llm-wiki-agent 等类似项目，选择适合个人知识库的工具
2. **设计参考**：OpenWiki 的 DESIGN.md 可能为年老师的 wiki 设计提供了参考
3. **开源学习**：了解开源知识库项目的架构和最佳实践

## Release Notes 结构分析

OpenWiki 的 release notes 采用了标准化的模板：
- **README.md**：说明 release notes 的组织方式
- **TEMPLATE.md**：定义了 release notes 的标准格式，包含版本号、日期、新增功能、修复项、破坏性变更等
- **v0.1.5 ~ v0.1.9**：5 个小版本迭代，每个版本可能包含少量功能更新或 bug 修复
- **v0.2.0**：第一个 0.2.x 版本，语义版本号的 0.x → 0.y 跳跃通常意味着重要功能添加或 API 变更

从 0.1.5 到 0.2.0 共 6 个版本，说明项目处于活跃开发期。v0.2.0 可能是引入核心功能或重新设计架构的里程碑版本。

## 项目意义

OpenWiki 的存在反映了年老师对知识管理工具的持续关注。结合知识库中同时存在的 llm-wiki-agent 项目（另一个 LLM 驱动的 Wiki 工具），年老师在探索"如何让 AI 自动维护和更新个人知识库"这个问题上投入了实质性的调研精力。

OpenWiki 的 release notes 模板也可能被年老师用作自己项目的 release notes 模板参考。在 wiki 工具的工作流中，版本管理和发布说明是知识沉淀的重要组成部分。
