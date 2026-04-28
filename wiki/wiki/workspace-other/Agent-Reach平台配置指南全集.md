# Agent-Reach平台配置指南全集

> Sources: mino, 2026-04-28
> Raw: [groq配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-groq.md); [reddit配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-reddit.md); [twitter配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-twitter.md); [微信配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-wechat.md); [小红书配置](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-xiaohongshu.md); [career参考](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-career.md); [dev参考](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-dev.md); [search参考](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-search.md); [video参考](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-video.md); [web参考](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-web.md); [SKILL_en](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-SKILL_en.md); [cookie导出](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-cookie-export.md); [dependency-locking](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-dependency-locking.md); [README_en](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-README_en.md); [README_ja](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-README_ja.md); [README_ko](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-README_ko.md)

## 概述

Agent-Reach是一个让AI Agent接入互联网平台的多合一工具，支持Twitter/X、小红书、微信、Reddit、Bilibili等多个平台的数据读取和交互。项目包含5个平台配置指南、5个参考文档、多语言文档（en/ja/ko）和技术文档（cookie导出、依赖锁定）。本文章汇总所有配置指南的核心内容。

## 五大平台配置概览

### 微信公众号

**配置方式**：安装Playwright + Chromium浏览器组件（约150MB），不需要登录。

**Agent操作**：自动安装Playwright，测试读取公众号文章。用户不需要做任何事情。

**能力**：直接读取微信公众号文章，通过Jina Reader或Playwright处理微信的反爬机制。

### 小红书

**配置方式**：通过Cookie导出。用户从小红书网站导出登录Cookie，Agent配置后可以直接读取内容。

**用户操作**：
1. 访问 https://www.xiaohongshu.com 并登录
2. 使用Cookie-Editor扩展导出Cookie Header String
3. 将Cookie发给Agent

### Twitter/X

**配置方式**：同小红书，通过Cookie导出。

**用户操作**：
1. 访问 https://x.com 并登录
2. 使用Cookie-Editor导出Cookie
3. Agent配置后可以直接读取推文、搜索内容

### Reddit

**配置方式**：Reddit有公开API，部分功能不需要登录。深度搜索需要Cookie。

**能力**：搜索话题、读取帖子和评论、分析社区趋势。

### Groq Whisper（语音转文字）

**功能**：当YouTube/Bilibili视频没有字幕时，用Groq的Whisper API进行语音转文字。

**配置**：用户需要在 https://console.groq.com 注册并获取API Key（免费）。

## Cookie导出通用方法

**推荐方法（30秒）**：
1. 安装Cookie-Editor扩展（Chrome/Firefox/Edge）
2. 访问目标网站并登录
3. 点击扩展图标 → Export → Header String
4. 将结果粘贴给Agent

**手动方法（无需扩展）**：
1. 按F12打开开发者工具
2. 切换到Network标签
3. 刷新页面
4. 点击任意请求 → Request Headers → 找到Cookie:行

## 参考文档体系

Agent-Reach包含5个参考文档，覆盖了Agent可接入的主要信息源类型：

| 参考文档 | 覆盖内容 |
|---------|---------|
| career | 职场招聘（LinkedIn人才搜索、公司资料、职位搜索） |
| dev | 开发资源（GitHub、技术文档、API文档） |
| search | 搜索能力（通用搜索、特定网站搜索） |
| video | 视频内容（YouTube、Bilibili字幕提取和分析） |
| web | 网页读取（通用网页→Markdown转换） |

## Cookie导出的安全注意事项

- Cookie包含登录凭证，只发给可信的Agent
- 不要分享Cookie到公共渠道
- Agent配置完成后，Cookie存储在本地配置文件中
- 可以随时在Agent中清除Cookie

## 多语言支持

Agent-Reach文档支持英语、日语、韩语，面向国际用户。每个语言的README都包含对应语言的安装和使用说明。
