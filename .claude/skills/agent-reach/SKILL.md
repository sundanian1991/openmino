---
name: agent-reach
description: AI Agent 全网信息抓取脚手架 — 零 API 费用读取/搜索 YouTube、GitHub、B 站、全网搜索等 6/12 平台已可用。Use when user needs to fetch web content, extract video subtitles, read RSS feeds, or search across platforms.
license: Complete terms in LICENSE.txt
---

# Agent-Reach — 全网信息抓取脚手架

**定位**：AI Agent 全网信息抓取脚手架（scaffolding）
**开源地址**：https://github.com/Panniantong/Agent-Reach
**核心理念**：不给 AI Agent 包装上游工具，而是让 Agent 直接调用专业工具

---

## 🚀 安装状态（2026-03-04）

| 渠道 | 状态 | 说明 |
|------|------|------|
| **GitHub** | ✅ 可用 | 读取、搜索、Fork、Issue、PR |
| **YouTube** | ✅ 可用 | 提取视频信息和字幕 |
| **B 站** | ✅ 可用 | 提取视频信息和字幕（本地） |
| **RSS/Atom** | ✅ 可用 | 读取 RSS/Atom 源 |
| **全网搜索** | ✅ 可用 | Exa（免费，无需 API Key） |
| **任意网页** | ✅ 可用 | Jina Reader |
| **Twitter/X** | ⬜ 需安装 | `npm install -g xreach-cli` |
| **Reddit** | ⬜ 需代理 | 服务器需配置代理 |
| **小红书** | ⚠️ 需配置 | 有 macOS ARM64 原生二进制，但 GitHub 下载超时；可用 Tavily+Jina 替代 |
| **抖音** | ⬜ 需 pip | `pip install douyin-mcp-server` |
| **LinkedIn** | ⬜ 需 pip | `pip install linkedin-scraper-mcp` |
| **Boss 直聘** | ⬜ 需 git clone | 见 https://github.com/mucsbr/mcp-bosszp |

**当前状态：6/12 渠道可用**（小红书可用替代方案）

---

## 📋 命令速查（已可用）

### 1. 读取任意网页

```bash
# 使用 Jina Reader（推荐，返回纯净 Markdown）
curl https://r.jina.ai/[URL]

# 示例
curl https://r.jina.ai/https://example.com
```

### 2. YouTube/B 站视频

```bash
# 获取视频信息 + 字幕
yt-dlp --dump-json [URL]

# 提取中文字幕
yt-dlp --write-sub --sub-lang zh-Hans --skip-download [URL]

# 示例
yt-dlp --dump-json "https://www.youtube.com/watch?v=xxx"
yt-dlp --write-sub --sub-lang zh-Hans --skip-download "https://www.bilibili.com/video/BV1xx"
```

### 3. GitHub 操作

```bash
# 查看仓库信息
gh repo view [owner/repo]

# 搜索仓库
gh search repos "[keyword]" --language=python

# 查看 Issue
gh issue view [number] -R [owner/repo]

# 查看 PR
gh pr view [number] -R [owner/repo]
```

### 4. RSS 订阅

```bash
# 使用 Python 解析 RSS
python3 -c "import feedparser; f=feedparser.parse('[RSS_URL]'); print([e.title for e in f.entries])"
```

### 5. 全网搜索

```bash
# 使用 tavily（首选，实时）
tavily_search "query"

# 使用 Exa（通过 mcporter）
mcporter call exa search --query "your query"
```

---

## 🔧 解锁更多渠道

### Twitter/X（需 npm）
```bash
npm install -g xreach-cli
```

### 小红书（需 Docker 或 macOS ARM64 二进制）

**方案 A：Docker（仅限 Intel Mac）**
```bash
docker run -d --name xiaohongshu-mcp -p 18060:18060 --platform linux/amd64 xpzouying/xiaohongshu-mcp
mcporter config add xiaohongshu http://localhost:18060/mcp
```

**方案 B：macOS ARM64 原生二进制（推荐 M 系列芯片）**
```bash
# 1. 从 GitHub Releases 下载（需要稳定网络）
curl -L "https://github.com/xpzouying/xiaohongshu-mcp/releases/latest/download/xiaohongshu-mcp-darwin-arm64.tar.gz" -o /tmp/xiaohongshu-mcp.tar.gz

# 2. 解压
tar xzf /tmp/xiaohongshu-mcp.tar.gz -C /usr/local/bin

# 3. 首次登录（会打开浏览器）
xiaohongshu-mcp-login

# 4. 启动服务
xiaohongshu-mcp &

# 5. 配置 MCP
mcporter config add xiaohongshu http://localhost:18060/mcp
```

**方案 C：Tavily + Jina Reader（无需安装，推荐）**
```bash
# 搜索小红书内容
tavily_search "site:xiaohongshu.com 关键词"

# 读取笔记详情
curl https://r.jina.ai/https://www.xiaohongshu.com/explore/[笔记 ID]
```

### 抖音（需 pip）
```bash
pip install douyin-mcp-server
# 启动服务后：
mcporter config add douyin http://localhost:18070/mcp
```

### LinkedIn（需 pip）
```bash
pip install linkedin-scraper-mcp
mcporter config add linkedin http://localhost:3000/mcp
```

---

## 📱 应用场景

### 场景 1：视频内容分析
```bash
# 1. 提取字幕
yt-dlp --write-sub --skip-download [URL]

# 2. 读取字幕文件
cat *.vtt

# 3. 让 AI 分析内容
```

### 场景 2：GitHub 项目调研
```bash
# 1. 查看项目信息
gh repo view owner/repo

# 2. 查看最近 Issues
gh issue list -R owner/repo --limit 10

# 3. 查看 README
gh repo view owner/repo --json readme
```

### 场景 3：网页内容抓取
```bash
# 使用 Jina Reader 获取纯净内容
curl https://r.jina.ai/[URL] > content.md
```

### 场景 4：RSS 订阅追踪
```bash
# 订阅多个 RSS 源
for f in "https://example.com/rss" "https://blog.com/feed"; do
  python3 -c "import feedparser; f=feedparser.parse('$f'); print([e.title for e in f.entries[:5]])"
done
```

---

## 🔗 与 Obsidian 集成

### 自动化流程
```
Agent-Reach 抓取内容
       ↓
生成 Markdown 文档
       ↓
保存到 Obsidian 收件箱
       ↓
定期整理成知识库
```

### 示例命令
```bash
# 保存网页内容到 Obsidian
curl https://r.jina.ai/[URL] > ~/Obsidian/inbox/$(date +%Y%m%d-%H%M%S).md

# 保存视频字幕
yt-dlp --write-sub --skip-download -o ~/Obsidian/inbox/%(title)s.%(ext)s [URL]
```

---

## 🛠️ 故障排除

### yt-dlp 无法下载字幕
```bash
# 检查视频是否有字幕
yt-dlp --list-subs [URL]

# 尝试不同语言
yt-dlp --write-sub --sub-lang en --skip-download [URL]
```

### GitHub API 限流
```bash
# 登录 GitHub（提高限额）
gh auth login

# 检查状态
gh auth status
```

### Jina Reader 超时
```bash
# 备用方案
curl [URL] | html2text
```

---

## 🎯 最佳实践

1. **优先使用现有工具** — 能用 tavily 就不用 curl
2. **内容本地化** — 抓取后立即保存到本地
3. **Cookie 安全** — 只在本地存储，定期更新
4. **批量操作** — 多个 URL 时批量处理
5. **记录来源** — 保存内容时保留原始 URL

---

*参考：https://github.com/Panniantong/Agent-Reach*
*安装日期：2026-03-04 | 状态：6/12 渠道可用*
