---
input: Apify 使用场景澄清
output: 工具使用决策指南
pos: .claude/skills/apify-integration/
---

# Apify 工具使用决策指南

> **核心原则**：搜索用 Tavily，批量抓取用 Apify，不让 LLM 做脏活

---

## 🎯 工具定位对比

| 维度 | Tavily / web-search | Apify |
|------|---------------------|-------|
| **核心用途** | 搜索 + 摘要 | 精准抓取 + 结构化提取 |
| **输出** | 3-5 条结果摘要（LLM 优化） | 完整网页数据（JSON/CSV） |
| **数据量** | 少量信息（~500 tokens） | 批量数据（上千条） |
| **Token 消耗** | 低 | 中（但比 LLM 解析便宜） |
| **适用场景** | 快速查询、事实检索 | 批量抓取、定时监控 |

---

## 🔄 标准工作流（三步）

```
Step 1: Tavily 搜索 → 快速了解概况
   ↓
Step 2: Apify 抓取 → 批量提取目标数据
   ↓
Step 3: Claude 分析 → 生成报告/洞见
```

**核心优势**：
- **Tavily**：只返回相关信息片段，节省 Token
- **Apify**：结构化数据，无废话，20 年解析经验
- **Claude**：专注智能分析，不做 HTML 解析脏活

---

## 📋 使用决策树

```
收到任务
    ↓
需要实时信息/快速查询？
    ├─ 是 → 用 Tavily（search/tavily_search）
    │   示例："美伊冲突最新进展"、"XXX 是谁"
    │
    └─ 否 ↓
需要批量抓取网页数据？
    ├─ 是 → 用 Apify
    │   示例："抓取 100 个竞品官网价格"
    │   示例："提取 Google Maps 所有 AI 公司"
    │
    └─ 否 ↓
需要精读单个页面？
    ├─ 是 → 用 webReader（100 次/月）
    │   示例："分析这篇文章的论点"
    │
    └─ 用 Grep/Read 搜索本地文件
```

---

## ✅ 典型场景

### ✅ 用 Tavily（搜索类）

| 场景 | 指令示例 |
|------|---------|
| **实时新闻** | "美伊冲突最新进展" |
| **事实查询** | "XXX 公司的 CEO 是谁" |
| **技术调研** | "2026 年最新前端框架" |
| **竞品速览** | "XXX 产品的主要功能" |

**调用方式**：
```
tavily_search(query="关键词", max_results=5-10)
```

---

### ✅ 用 Apify（批量抓取类）

| 场景 | 指令示例 | Actor |
|------|---------|-------|
| **Google Maps** | "抓取旧金山所有 AI 公司" | Google Places Scraper |
| **邮箱提取** | "从 50 个网站提取联系邮箱" | Contact Info Scraper |
| **社交媒体** | "抓取 TikTok #AIAgent Top100 视频" | TikTok Scraper |
| **电商监控** | "监控 Amazon 竞品价格" | Amazon Scraper |
| **公司信息** | "抓取 LinkedIn 公司员工数" | LinkedIn Company Scraper |
| **融资数据** | "最近 30 天 AI 赛道融资" | Crunchbase Scraper |
| **通用抓取** | "抓取这 20 个博客最新文章" | Ultimate Scraper |

**调用方式**：
```
用户指令："抓取 Google Maps 上旧金山的 AI 公司，导出 CSV"
→ Claude 调用 Apify MCP → 返回结构化数据
```

---

### ✅ 用 webReader（精读类）

| 场景 | 指令示例 |
|------|---------|
| **单页分析** | "分析这篇文章的论点" |
| **内容提取** | "提取这个页面的核心观点" |
| **深度阅读** | "帮我读这篇论文" |

**注意**：仅 100 次/月配额，优先用 Tavily Extract

---

## ❌ 避坑指南

### ❌ 别用 Apify 做搜索

```
❌ 错误："美伊冲突最新进展" → 用 Apify（大材小用，浪费）
✅ 正确："美伊冲突最新进展" → 用 Tavily
```

### ❌ 别用 LLM 做解析

```
❌ 错误：让 Claude 解析 HTML → 容易出错，Token 浪费
✅ 正确：Apify 返回 JSON/CSV → Claude 直接分析
```

### ❌ 别用 webReader 做批量抓取

```
❌ 错误：用 webReader 抓取 50 个网站 → 配额耗尽
✅ 正确：用 Apify Ultimate Scraper → 批量处理
```

---

## 💡 实战示例

### 示例 1：市场调研

```
任务：分析 AI Agent 赛道竞品

Step 1: Tavily 搜索
  → tavily_search("AI Agent 工具 竞品 2026")
  → 获得：10 个竞品信息、主要功能

Step 2: Apify 抓取
  → 调用 Crunchbase Scraper
  → 获得：融资金额、投资方、员工数

Step 3: Claude 分析
  → 生成：竞品矩阵、差异化分析
  → 输出：CSV + Markdown 报告
```

---

### 示例 2：竞品监控

```
任务：每天监控 10 个竞品官网价格

Step 1: 设置定时任务
  → GitHub Actions 每天 8:00 UTC 触发

Step 2: Apify 抓取
  → 调用 Ultimate Scraper
  → 抓取 10 个网站价格数据

Step 3: Claude 分析
  → 对比昨日数据
  → 生成：价格变动报告
  → 输出：Markdown + 邮件发送
```

---

### 示例 3：邮箱提取

```
任务：从 50 个公司网站提取 CEO 邮箱

Step 1: Apify 抓取
  → 调用 Contact Info Scraper
  → 遍历 50 个网站

Step 2: 数据验证
  → 检查邮箱格式
  → 去除重复记录

Step 3: Claude 整理
  → 生成：CSV 文件
  → 输出：公司、网站、邮箱、电话
```

---

## 🔧 配置检查清单

使用前确认：

- [ ] **环境变量**：`export APIFY_TOKEN="your_token"`
- [ ] **MCP 配置**：`.mcp.json` 包含 Apify Server
- [ ] **重启 Claude Code**：加载 MCP Server
- [ ] **测试指令**：`"list all available Apify Actors"`

---

## 📊 Token 节省对比

| 方案 | Token 消耗 | 准确率 | 适用场景 |
|------|----------|--------|---------|
| **Tavily → Claude** | ~500 | 高 | 快速查询 |
| **Apify → Claude** | ~2000 | 极高 | 批量抓取 |
| **LLM 直接解析 HTML** | ~5000+ | 低 | ❌ 不推荐 |

**核心原则**：让专用工具做专用事，LLM 专注智能分析。

---

## 🎯 一句话总结

> **搜索用 Tavily，批量用 Apify，精读用 webReader，别让 LLM 做 HTML 解析的脏活。**

---

*创建时间：2026-03-02*
*基于：Apify × Claude Code 协作实践*
