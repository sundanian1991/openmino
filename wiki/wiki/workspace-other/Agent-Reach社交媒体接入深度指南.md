# Agent-Reach社交媒体接入深度指南

> Sources: mino, 2026-04-28
> Raw:[Twitter高级功能](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-twitter.md); [小红书配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-xiaohongshu.md); [Cookie导出指南](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-cookie-export.md); [SKILL英文版](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-SKILL_en.md)

## 概述

Agent-Reach的社交媒体接入指南覆盖了Twitter/X和小红书的深度配置。Twitter分为基础阅读（Jina Reader免费）和高级功能（twitter-cli + Cookie），小红书通过xhs-cli实现搜索和笔记读取。两个平台都依赖Cookie导出作为认证方式，这是Agent访问需要登录态的网站的通用模式。

## Twitter/X接入

### 基础阅读（免费，无需配置）

通过Jina Reader可以直接读取推文内容：
```bash
curl -s "https://r.jina.ai/https://x.com/username/status/tweet_id"
```

### 高级功能（需要twitter-cli）

高级功能包括：搜索推文、读取完整对话链、用户时间线、长文阅读。

配置步骤：
1. `pipx install twitter-cli`（安装免费开源工具）
2. 从浏览器导出Cookie（Cookie-Editor扩展）
3. `agent-reach configure twitter-cookies "cookie JSON"`

Cookie配置会自动提取`auth_token`和`ct0`，写入环境变量。

## 小红书接入

### 安装与配置

1. `pipx install xiaohongshu-cli`（Python 3.10+）
2. `xhs login`（自动从浏览器提取Cookie）
3. `agent-reach doctor`验证

### 备用方案

如果自动提取失败：
1. 安装Cookie-Editor扩展
2. 登录xiaohongshu.com
3. 导出Header String
4. `agent-reach configure xhs-cookies "导出的cookie"`

### 使用示例

```bash
xhs search "关键词"          # 搜索笔记
xhs note "笔记ID"            # 读取特定笔记
```

## Cookie导出的通用模式

Agent-Reach的Cookie导出文档总结了一个通用模式：
1. 安装Cookie-Editor扩展（Chrome/Firefox/Edge通用）
2. 登录目标网站
3. Export → Header String
4. 粘贴给Agent配置

这个模式适用于所有需要登录态的网站：Twitter/X、小红书、Bilibili、LinkedIn等。

## Agent-Reach的架构设计

Agent-Reach将每个平台的能力封装为独立的guide文件，每个guide包含：
- 功能说明
- Agent可自动完成的步骤
- 需要用户手动做的步骤
- 配置验证命令
- 使用示例

这种设计使得新增平台只需添加新的guide文件，不影响已有平台。
