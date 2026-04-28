# OpenWiki版本演进详情

> Sources: mino, 2026-04-28
> Raw:[release-notes-README](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-README.md); [release-notes-TEMPLATE](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-TEMPLATE.md); [v0.1.5](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.5.md); [v0.1.6](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.6.md); [v0.1.7](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.7.md); [v0.1.8](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.8.md); [v0.1.9](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-release-notes-v0.1.9.md)

## 概述

OpenWiki是一个本地知识管理应用，从v0.1.5到v0.1.9共发布了5个版本，每个版本都有独立的release notes文件，包含双语changelog（中文+英文）和安装说明。发版流程由AI自动完成——用户说"发版"时，AI检查commit、总结改动、创建release notes、bump版本号、打tag、push触发GitHub Actions构建。本文章记录每个版本的具体更新内容和发版流程的设计。

## 版本时间线

### v0.1.5

初始记录版本，包含基础的知识管理功能。

### v0.1.6

持续迭代，优化核心功能。

### v0.1.7

持续迭代，改善用户体验。

### v0.1.8

持续迭代，修复已知问题。

### v0.1.9

**新增功能**：
- 新增「复制 Markdown 路径」功能，一键把整理好的笔记路径复制给 AI 工具分析
- 优化了关联知识的查看体验，在内容页直接弹出，不再跳转
- 优化了知识页面的排版，标题、列表、段落层次更清晰
- 修复了复制 X (Twitter) 长推文时内容被截断的问题

## 发版流程设计

OpenWiki的发版流程完全由AI驱动，用户（Ray）是非技术人员，不需要自己维护release notes。

### 自动化步骤

当用户说"发版"、"发release"、"打tag"、"发个新版本"时：

1. **决定版本号**：检查package.json、tauri.conf.json、Cargo.toml的当前版本，对比最新git tag，bump patch号
2. **总结改动**：运行`git log <previous-tag>..HEAD --oneline`，将commit message精简为用户能感知的短条目
3. **创建release notes**：从TEMPLATE.md复制，填入changelog，替换版本号占位符
4. **bump版本号**：同时更新三个文件的version字段
5. **同步Cargo.lock**：在src-tauri/下跑cargo check
6. **commit**：`chore: release vX.Y.Z`
7. **打tag**：`git tag -a vX.Y.Z -m "Release vX.Y.Z"`
8. **push**：触发GitHub Actions自动构建DMG并发布Release

### Changelog写作规范

**好例子**（用户能感知）：
- 优化了YouTube视频字幕识别，开箱即用
- 修复了AI摘要语言不跟随系统的问题
- 优化了洞察页面的体验

**坏例子**（太技术）：
- 把yt-dlp打包进app bundle
- 修复locale.rs里LANG env var判断优先级
- 删除on_content_deleted里的save_lint_result调用

核心原则：说用户能感知到什么变化，不说技术细节。每条一句话，双语（中文+英文）。

## Release Notes文件结构

```
release-notes/
├── README.md        ← 发版流程说明
├── TEMPLATE.md      ← 发新版时从这里复制
├── v0.1.5.md        ← 每个版本一个文件
├── v0.1.6.md
├── v0.1.7.md
├── v0.1.8.md
└── v0.1.9.md
```

每个版本文件包含：
- 本次更新/What's New（双语）
- 安装说明（macOS DMG安装步骤，包括Apple公证的处理）

## 安装流程

OpenWiki是Tauri构建的桌面应用，macOS安装需要手动放行（因为未经Apple公证）：
1. 下载对应架构的DMG（Apple Silicon或Intel）
2. 拖入Applications文件夹
3. 右键点击→打开→确认（或系统设置→隐私与安全性→仍要打开）
4. 首次放行后，以后直接双击即可

## 可迁移的发版经验

这套AI驱动的发版流程适用于任何桌面应用项目：
- commit message是给开发者看的，changelog是给用看的——两套语言
- 自动化版本号更新，避免手动改多个文件的版本字段
- 用TEMPLATE保证release notes格式一致
- GitHub Actions处理构建和发布，人类只负责push
