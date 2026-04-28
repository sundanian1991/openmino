# AI Agent 工具生态：从 Agent-Reach 到数据炼金师

> Sources: Mino (AI), 2026-04-24 ~, 2026-04-26
> Raw:[Agent-Reach README/SKILL/CLAUDE](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-README.md); [数据炼金师 SPEC](../../raw/workspace-other/20-工具-数据炼金师-20260426--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-20-工具-数据炼金师-20260426-SPEC.md); [OpenWiki README](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-README.md); [Agent-Reach guides](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-exa.md)

## 概述

workspace-other 目录下保存了多个 AI Agent 工具项目的完整资料：Agent-Reach（互联网接入）、数据炼金师（数据叙事）、OpenWiki（知识管理）、以及相关的 SKILL.md 和配置文档。这些项目代表了 AI Agent 工具生态的三个核心方向：信息获取、数据处理、知识管理。本篇 wiki 综合分析这个生态体系。

## 三个工具的定位

| 工具 | 定位 | 解决的问题 | 技术路线 |
|------|------|-------------|----------|
| Agent-Reach | 互联网接入层 | AI Agent 无法访问互联网平台 | Python CLI + 上游工具胶水层 |
| 数据炼金师 | 数据叙事工具 | 原始数据无法直接用于商业汇报 | React + ECharts + Anthropic API |
| OpenWiki | 知识管理工具 | 信息碎片化，无法形成知识体系 | Tauri 2 + React 桌面应用 |

### 能力覆盖图

```
信息获取 ← Agent-Reach（17+ 平台）
    ↓
数据处理 ← 数据炼金师（CSV/Excel → 数据故事）
    ↓
知识管理 ← OpenWiki（捕获 → 整理 → 回顾）
```

三个工具形成了"获取 → 处理 → 沉淀"的完整闭环。

## AI Agent 工具生态的核心模式

### 模式一：脚手架（Scaffolding）而非框架（Framework）

Agent-Reach 和 数据炼金师 都采用了"脚手架"模式：

- Agent-Reach 不做 wrapper，只做安装器 + 配置工具
- 数据炼金师不做 BI 平台，只做端到端转换器

脚手架的优势：
- 轻量，不绑架用户的工作流
- 可替换，不满意的组件随时更换
- 可理解，用户知道底层发生了什么

### 模式二：SKILL.md 驱动的智能路由

AI Agent 工具都依赖 SKILL.md 来实现"意图 → 工具"的路由：

Agent-Reach 的 SKILL.md：
- 17 个平台按 6 大分类组织
- 触发词匹配（搜/查/小红书/推特...）
- 零配置快速命令参考

数据炼金师的 Prompt 策略：
- 5 层分层加载（角色 → 规则 → 指南 → 叙事 → 格式）
- 按需注入（问答阶段 ~2500 tokens，生成阶段 ~8000 tokens）
- JSON Schema 约束输出格式

### 模式三：可插拔架构

| 工具 | 可插拔点 | 替换方式 |
|------|----------|----------|
| Agent-Reach | 每个渠道的上游工具 | 换 channel 文件 |
| 数据炼金师 | AI 后端 | 换 Anthropic 为其他 provider |
| OpenWiki | AI provider | 设置中选择 Claude/OpenAI/Gemini |

## 安装体验设计

### "一句话安装"

三个工具都追求极简的安装体验：

- Agent-Reach：复制安装链接给 Agent，Agent 自己完成
- 数据炼金师：输入 API Key，状态点变绿即可用
- OpenWiki：拖入 Applications，首次右键放行

### 安全模式

Agent-Reach 特别设计了安全模式：
- `--safe`：不自动装系统包，只列需求
- `--dry-run`：预览所有操作，不做改动
- 操作边界：禁止 sudo、禁止修改系统文件、禁止关闭防火墙

### 安装后引导

Agent-Reach 安装完成后：
1. 自动运行 `agent-reach doctor` 验证
2. 询问用户需要哪些可选渠道
3. 按用户选择配置凭据
4. 提供可选的每日监控 cron 任务

## 上游工具选型方法论

Agent-Reach 的上游工具选型是最系统的案例：

### 选型标准

1. **社区活跃度**：Star 数、近期更新频率
2. **安装便捷度**：pipx/pip/npm 一行安装
3. **认证方式**：Cookie 登录 > API Key > 扫码（Cookie 最简单可靠）
4. **功能完整性**：搜索 + 阅读 + 交互（缺一不可）
5. **免费可用**：零 API 费用

### 工具矩阵

| 场景 | 零配置 | 需配置 | 上游工具 |
|------|--------|--------|----------|
| 读网页 | ✅ | — | Jina Reader |
| YouTube | ✅ | — | yt-dlp |
| RSS | ✅ | — | feedparser |
| Twitter | ❌ | Cookie | twitter-cli |
| Reddit | ❌ | Cookie | rdt-cli |
| 小红书 | ❌ | Cookie | xhs-cli |
| 抖音 | ❌ | MCP | douyin-mcp-server |
| 全网搜索 | ❌ | MCP | Exa |
| GitHub | ✅ | 私有库 | gh CLI |

## AI Provider 生态

OpenWiki 支持多种 AI provider：
- Claude（Anthropic）
- OpenAI（GPT-5.5、GPT-5.5 Pro、GPT-5.4 Nano）
- Gemini（Google）
- DeepSeek（V4 Pro / V4 Flash，便宜速度快）
- Ollama（本地模型）
- LM Studio（本地模型）

数据炼金师当前使用 Anthropic API（浏览器直调），但可以扩展为多 provider 支持。

## 对年老师的综合价值

### 供应商信息获取

通过 Agent-Reach 的能力，可以：
- 搜索供应商在社交媒体上的舆情
- 追踪行业新闻和动态
- 监控竞品的供应商合作情况

### 供应商数据汇报

数据炼金师的方法论可以直接应用于：
- 供应商月度绩效汇报自动化
- 数据可视化质量提升
- 汇报叙事结构化

### 知识沉淀

OpenWiki 的思路可以用于：
- 供应商档案的自动化整理
- 沟通记录的 AI 总结
- 月度/季度回顾报告生成

### 工具链整合

三个工具的理念一致：**脚手架而非框架、可插拔而非绑定、安全可控而非黑盒**。年老师在选择或构建任何供应商管理工具时，都应该遵循这套原则。
