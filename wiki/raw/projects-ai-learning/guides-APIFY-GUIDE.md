---
input: Apify + Claude Code 集成需求
output: 完整使用指南
pos: projects/stanford-cs146s/guides/
---

# Apify × Claude Code 完整指南

> **普通 AI 网页能力的局限性** vs **Apify + Claude Code 完美协作**

---

## 🤖 背景：为什么需要 Apify？

### 当前 AI 工具的两大核心问题

#### 问题 1：信息获取方式缺陷

| 方式 | 问题 | 示例 |
|------|------|------|
| **搜索引擎依赖** | 结果不全、过时 | Google 搜索只显示前 100 条 |
| **知识截止日期** | 无法获取实时数据 | "最近 30 天融资的公司"无法回答 |
| **抽样偏差** | 只能看到部分结果 | 只显示"相关"结果，非全部 |

#### 问题 2：数据处理架构问题

```
❌ 错误架构（当前 AI 工具）
┌─────────────────────────────┐
│          LLM                │
│  抓取 + 解析 + 分析 全部做   │  ← 职责混乱
└─────────────────────────────┘
        ↓
  扩展到 100 页数据时
  基于错误数据做决策
  错误难以被发现
```

**svpino 核心观点**：
> "当处理 10 页数据时问题不明显，但扩展到 100 页时，AI 代理会基于错误数据做出决策，且错误难以被发现。"

#### ✅ 正确架构（Apify + Claude Code）

```
┌─────────────────┐     ┌─────────────────┐
│  Claude Code    │ ──→ │    Apify MCP    │
│  (智能分析)     │ ←── │   (数据抓取)    │
└─────────────────┘     └─────────────────┘
       ↓                         ↓
  数据分析                  确定性抓取
  决策制定                  结构化提取
  洞见输出                  20 年解析规则
```

**核心原则**：职责彻底分离
- **专用工具**：负责数据抓取（HTTP 请求、HTML 解析）
- **LLM**：专注智能分析（数据洞察、决策制定）

---

## 📦 快速开始（5 分钟上手）

### Step 1：获取 Apify API Token（2 分钟）

1. 访问 https://console.apify.com/account/integrations
2. 点击 "Sign Up" 创建免费账号
3. 进入 Account → Integrations
4. 复制 API Token（格式如：`apify_api_xxxxx`）

**免费额度**：
- $5 信用额度（约 1000 次抓取）
- 足够个人测试和小项目

### Step 2：配置环境变量（1 分钟）

**macOS/Linux**：

```bash
# 添加到 shell 配置
echo 'export APIFY_TOKEN="你的 token"' >> ~/.zshrc
source ~/.zshrc
```

**验证配置**：

```bash
echo $APIFY_TOKEN  # 应显示你的 token
```

### Step 3：配置 MCP（2 分钟）

**编辑 `.mcp.json`（项目根目录）**：

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

**重启 Claude Code**，配置生效。

### Step 4：测试第一个指令

```
"list all available Apify Actors"
```

如果看到 Actors 列表，说明集成成功！

---

## 🛠️ 可用 Actors 完整列表

### 市场研究类

| Actor | 用途 | 免费额度 |
|-------|------|---------|
| **Google Places Scraper** | 抓取 Google Maps 商家数据 | 100 次/月 |
| **LinkedIn Company Scraper** | 抓取 LinkedIn 公司信息 | 50 次/月 |
| **Crunchbase Scraper** | 抓取融资信息 | 20 次/月 |
| **Glassdoor Scraper** | 抓取公司评价/薪资 | 50 次/月 |

### 社交媒体类

| Actor | 用途 | 免费额度 |
|-------|------|---------|
| **YouTube Scraper** | 视频/评论/频道数据 | 200 次/月 |
| **TikTok Scraper** | 视频/话题/用户数据 | 100 次/月 |
| **Instagram Scraper** | 帖子/用户/话题数据 | 100 次/月 |
| **Twitter/X Scraper** | 推文/用户数据 | 50 次/月 |
| **Reddit Scraper** | 帖子/评论数据 | 200 次/月 |

### 电商类

| Actor | 用途 | 免费额度 |
|-------|------|---------|
| **Amazon Scraper** | 商品/价格/评论 | 100 次/月 |
| **Shopify Store Scraper** | 抓取 Shopify 店铺 | 100 次/月 |
| **eBay Scraper** | 商品/拍卖数据 | 100 次/月 |

### 通用类

| Actor | 用途 | 免费额度 |
|-------|------|---------|
| **Ultimate Scraper** | 任意网页抓取 | 500 次/月 |
| **Contact Info Scraper** | 提取邮箱/电话 | 200 次/月 |
| **Web Search Scraper** | 搜索引擎结果 | 200 次/月 |
| **RSS Feed Scraper** | 抓取 RSS 订阅 | 500 次/月 |

---

## 💡 实战场景

### 场景 1：市场研究 / 竞品分析

**指令**：
```
帮我抓取"AI Agent 工具"赛道最近 30 天融资的初创公司，
包括公司名称、网站、融资金额、投资方，生成竞品矩阵。
```

**执行流程**：
```
1. 调用 Crunchbase Scraper → 获取融资数据
2. 调用 LinkedIn Company Scraper → 获取公司信息
3. 数据清洗 → 去除重复/不完整记录
4. 生成竞品矩阵 → CSV + 分析报告
```

**输出示例**：
```csv
公司名称，网站，融资金额，投资方，日期，员工数
AgentCorp,https://agentcorp.io,$2M,Sequoia,2026-02-15,15
AutoAI,https://autoai.com,$5M,a16z,2026-02-20,30
```

**效果**：半小时生成完整报告，效率比手动搜索提升 10 倍

---

### 场景 2：内容创作 / 趋势追踪

**指令**：
```
抓取过去 7 天 TikTok 上 #AIAgent 话题的 Top10 视频，
转录文本，做情绪分析和热点总结。
```

**执行流程**：
```
1. 调用 TikTok Scraper → 获取 Top10 视频
2. 调用 YouTube Transcript（如有）→ 获取文本
3. 调用 Claude 分析 → 情绪分析 + 热点提取
4. 生成内容创意 → 爆款脚本建议
```

**输出示例**：
```markdown
## 热点总结

1. **AI Agent 自动化工作流**（出现 7 次）
   - 情绪：正面（85%）
   - 关键词：效率、省时、自动化

2. **AI vs 人类对比**（出现 5 次）
   - 情绪：争议（45% 正面，55% 担忧）
   - 关键词：替代、威胁、协作

## 内容创意建议

1. "AI Agent 帮我节省了 10 小时/周" - 实证视频
2. "人类 + AI 协作的最佳实践" - 观点输出
```

**应用**：直接为 Claude 提供素材生成爆款短视频脚本

---

### 场景 3：个人/商业情报引擎

**指令**：
```
创建定时任务，每天监控这 10 个竞品官网：
- 价格变动
- 新产品发布
- 新闻/博客更新
生成日报发送到我的邮箱。
```

**执行流程**：
```
1. 创建 Webhook Scraper → 定时触发
2. 调用 Ultimate Scraper → 抓取 10 个网站
3. 数据对比 → 识别变动
4. 生成日报 → Markdown + 邮件发送
```

**输出示例**：
```markdown
## 竞品监控日报 (2026-03-02)

### 价格变动
- **竞品 A**：Pro 版从 $29 → $39 (+34%)
- **竞品 B**：无变动

### 新产品发布
- **竞品 C**：发布 "AI Analytics" 功能

### 新闻更新
- **竞品 A**：获得 $5M 融资
```

**价值**：打造专属商业哨兵，实时掌握市场动态

---

### 场景 4：邮箱/联系方式提取

**指令**：
```
从这 50 个公司网站中提取 CEO 邮箱和联系电话。
```

**执行流程**：
```
1. 调用 Contact Info Scraper → 遍历 50 个网站
2. 提取：邮箱、电话、社交媒体链接
3. 数据验证 → 检查邮箱格式
4. 输出 → CSV 文件
```

**输出示例**：
```csv
公司，网站，CEO 邮箱，电话，LinkedIn
AgentCorp,https://agentcorp.io,ceo@agentcorp.io,+1-555-0123,https://linkedin.com/...
```

**注意**：仅用于合法商业目的，遵守 GDPR 等隐私法规

---

## 🔗 链式自动化（高级用法）

### 示例：完整营销情报流程

```
Step 1: 抓取 → "用 Google Places 抓取旧金山 AI 公司"
   ↓
Step 2: 清洗 → "去除评分<4.0 的公司"
   ↓
Step 3:  enrich → "用 LinkedIn 补充员工数/融资信息"
   ↓
Step 4: 分析 → "生成市场地图，按融资阶段分组"
   ↓
Step 5: 报告 → "输出 PPT 格式的投资分析报告"
```

**全流程自动化**：一次指令，全自动完成

---

## ⚠️ 注意事项

### 合规使用

| ✅ 推荐 | ❌ 禁止 |
|--------|--------|
| 抓取公开数据 | 抓取个人隐私信息 |
| 商业用途遵守条款 | 违反平台 ToS |
| 合理频率请求 | 高频 DDoS 式抓取 |
| 数据脱敏处理 | 直接发布原始数据 |

### 错误处理

| 错误 | 原因 | 解决 |
|------|------|------|
| `401 Unauthorized` | Token 无效 | 检查/更新 Token |
| `429 Too Many Requests` | 请求超限 | 降低频率/升级 |
| `500 Internal Error` | Actor 故障 | 重试/换 Actor |
| `Timeout` | 抓取目标过慢 | 增加 timeout/重试 |

### 最佳实践

1. **先测试小样本**：先抓取 10 条，验证正确性
2. **保存原始数据**：保留抓取原始结果
3. **增量抓取**：只抓取新增/变动数据
4. **错误重试**：网络错误自动重试 3 次

---

## 🚀 进阶技巧

### 技巧 1：自定义 Actor 开发

**指令**：
```
帮我写一个自定义 Actor，抓取 XXX 网站的数据。
```

**流程**：
```
1. 调用 apify-actor-development skill
2. 生成 Actor 代码（Node.js/Python）
3. 部署到 Apify Platform
4. 通过 MCP 调用
```

### 技巧 2：多 Actor 串联

```
"先用 Google Places 抓取公司，
再用 Contact Scraper 提取邮箱，
最后用 LinkedIn 补充信息，
合并成一个完整 CSV"
```

### 技巧 3：定时任务设置

**使用 GitHub Actions**：

```yaml
# .github/workflows/apify-daily.yml
name: Daily Apify Scraper

on:
  schedule:
    - cron: '0 8 * * *'  # 每天 8:00 UTC

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npx -y @apify/actors-mcp-server --command "抓取指令"
```

---

## 📚 相关资源

| 资源 | 链接 |
|------|------|
| **Apify 文档** | https://docs.apify.com |
| **MCP Server** | https://docs.apify.com/platform/mcp |
| **Actors 市场** | https://apify.com/store |
| **Actor 开发** | https://docs.apify.com/platform/actors |
| **Pricing** | https://apify.com/pricing |

---

## 💬 常见问题

### Q: 免费额度够用吗？
**A**: 测试和学习足够（约 1000 次抓取），商业用途需升级（$49/月起）。

### Q: 抓取速度慢怎么办？
**A**: 1) 检查网络连接 2) 减少并发数 3) 使用代理（Apify 自带）

### Q: 数据准确性如何保证？
**A**: Apify 有 20 年解析经验，但最终数据需人工抽检（建议 10% 抽检率）

### Q: 需要编程基础吗？
**A**: 基础使用不需要（自然语言指令），自定义 Actor 需要基础 JS/Python

---

*创建时间：2026-03-02*
*基于：svpino 网页抓取架构 + Apify 20 年经验*
