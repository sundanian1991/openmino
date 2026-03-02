---
input: Apify + Claude Code 集成需求
output: Apify 集成技能 + 使用指南
pos: .claude/skills/apify-integration/
---

# Apify Integration - 网页抓取自动化

> **核心认知**：专用工具负责数据抓取，LLM 专注智能分析

---

## 🎯 什么时候使用

| 场景 | 指令示例 |
|------|---------|
| **市场研究** | "抓取旧金山 AI 初创公司的 Google Maps 数据" |
| **竞品分析** | "提取竞争对手官网的价格变动" |
| **内容创作** | "抓取 TikTok #AIAgent 话题 Top10 视频" |
| **商业情报** | "监控 10 个竞品官网的价格和新闻" |
| **邮箱提取** | "从这些网站里提取邮箱地址" |

---

## 🔄 架构原理

```
┌─────────────────┐     ┌─────────────────┐
│   Claude Code   │ ──→ │    Apify MCP    │
│   (智能分析)    │ ←── │   (数据抓取)    │
└─────────────────┘     └─────────────────┘
        ↓                        ↓
  决策制定/洞见输出      20 年网页抓取经验
  数据分析/报告生成      稳定 Actor 云程序
```

**核心优势**：
- **零幻觉**：数据来自真实 HTTP 请求，非 LLM 生成
- **无限边界**：支持上千平台（Google Maps、YouTube、Instagram、TikTok、Amazon）
- **链式自动化**：抓取→清洗→分析→报告生成全流程
- **低门槛**：一行命令集成，免费额度足够上手

---

## 📋 安装与配置

### 步骤 1：获取 Apify API Token

1. 访问 https://console.apify.com/account/integrations
2. 创建免费账号
3. 复制 API Token

### 步骤 2：配置环境变量

**方式 A：系统环境变量（推荐）**

```bash
# ~/.zshrc 或 ~/.bashrc
export APIFY_TOKEN="your_apify_token_here"
```

**方式 B：项目 .env 文件**

```bash
# 项目根目录/.env
APIFY_TOKEN=your_apify_token_here
```

### 步骤 3：验证配置

```bash
# 验证 Token 是否有效
curl "https://api.apify.com/v2/user-profile?token=YOUR_TOKEN"
```

---

## 🔌 MCP 配置（推荐方式）

### 添加到 `.mcp.json`

```json
{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/actors-mcp-server"],
      "env": {
        "APIFY_TOKEN": "${APIFY_TOKEN}"
      }
    }
  }
}
```

### 重启 Claude Code

配置完成后重启，Apify Actors 将作为工具自动可用。

---

## 🛠️ 可用 Actors（部分）

| Actor | 用途 | 指令示例 |
|-------|------|---------|
| **Google Places** | 抓取 Google Maps 商家数据 | "list AI startups in San Francisco" |
| **Contact Info Scraper** | 提取网站邮箱/电话 | "extract emails from these websites" |
| **Ultimate Scraper** | 通用网页抓取 | "scrape latest news from tech blogs" |
| **YouTube Scraper** | 抓取 YouTube 视频/评论 | "get top videos for #AIAgent" |
| **Instagram Scraper** | 抓取 Instagram 帖子 | "scrape influencer posts" |
| **TikTok Scraper** | 抓取 TikTok 视频 | "get trending videos" |
| **Amazon Scraper** | 抓取 Amazon 商品/价格 | "monitor product prices" |
| **LinkedIn Company** | 抓取 LinkedIn 公司信息 | "get company employee count" |
| **Twitter/X Scraper** | 抓取推文 | "scrape recent tweets about AI" |
| **GitHub API** | 抓取 GitHub 仓库 | "find trending AI repos" |

---

## 💡 使用示例

### 示例 1：市场研究

```
用户：帮我抓取旧金山 AI 初创公司的 Google Maps 数据

AI: 我将调用 Apify 的 Google Places Actor...

输出：CSV 文件包含
- 公司名称
- 网站 URL
- 地址
- 评分
- 评论数
- 联系电话
```

### 示例 2：邮箱提取

```
用户：从这些网站里提取邮箱地址

AI: 我将调用 Contact Info Scraper，遍历所有网站...

输出：追加邮箱到现有 CSV
```

### 示例 3：竞品监控

```
用户：创建一个定时任务，每天监控竞品价格

AI: 我将设置自动化流程...

输出：每日价格变动报告
```

---

## ⚠️ 注意事项

### 合规使用

- ✅ 仅抓取公开数据
- ⚠️ 商业用途需遵守平台条款
- ❌ 不要抓取个人隐私信息
- ❌ 不要高频请求导致目标网站压力

### 免费额度

- 免费账号：$5 信用额度（约 1000 次抓取）
- 超出后：按量付费（$0.10-$1/100 次）

### 错误处理

| 错误 | 原因 | 解决 |
|------|------|------|
| `401 Unauthorized` | Token 无效/过期 | 重新获取 Token |
| `429 Too Many Requests` | 请求超限 | 降低频率/升级套餐 |
| `500 Internal Error` | Actor 故障 | 重试或换 Actor |

---

## 🔗 相关资源

- [Apify MCP Server](https://docs.apify.com/platform/mcp) — 官方文档
- [Apify Actors 市场](https://apify.com/store) — 上千个可用 Actor
- [Actor 开发指南](https://docs.apify.com/platform/actors) — 自定义 Actor

---

*创建时间：2026-03-02*
*基于：svpino 网页抓取架构 + Apify 20 年经验*
