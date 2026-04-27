---
input: Apify 集成需求
output: 快速开始文档
pos: projects/stanford-cs146s/guides/apify-demo/
---

# Apify 快速开始（5 分钟上手）

## 🎯 目标

5 分钟内完成 Apify + Claude Code 集成，执行第一个网页抓取任务。

---

## 📋 前置条件

- [ ] Claude Code 已安装
- [ ] Node.js 18+ 已安装
- [ ] 5 分钟空闲时间

---

## 🚀 快速开始

### Step 1：获取 API Token（2 分钟）

1. 访问 https://console.apify.com/account/integrations
2. 点击 "Sign Up" 注册免费账号
3. 复制 API Token（格式：`apify_api_xxxxx`）

### Step 2：配置环境变量（1 分钟）

**macOS/Linux**：
```bash
echo 'export APIFY_TOKEN="你的 token"' >> ~/.zshrc
source ~/.zshrc
```

**验证**：
```bash
echo $APIFY_TOKEN  # 应显示你的 token
```

### Step 3：配置 MCP（1 分钟）

编辑项目根目录 `.mcp.json`：

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

### Step 4：重启 Claude Code（30 秒）

关闭并重新打开 Claude Code。

### Step 5：测试第一个指令（30 秒）

```
"list all available Apify Actors"
```

看到 Actors 列表 = 成功！

---

## 💡 第一个抓取任务

### 任务：抓取旧金山 AI 公司

**输入指令**：
```
Help me scrape Google Maps for AI startup companies in San Francisco.
I need: company name, website, address, rating, phone number.
```

**预期输出**：
```
✅ Calling Apify Google Places Scraper...
✅ Extracted 50 companies
✅ Data saved to: results/ai-startups-sf.csv

Preview:
| Company | Website | Address | Rating | Phone |
|---------|---------|---------|--------|-------|
| AgentCorp | https://... | 123 Main St | 4.5 | +1-555... |
```

---

## ⚠️ 常见问题

### Q: "Command not found: npx"
**A**: 安装 Node.js https://nodejs.org/

### Q: "401 Unauthorized"
**A**: 检查 API Token 是否正确复制

### Q: "429 Too Many Requests"
**A**: 免费额度有限，降低请求频率

### Q: 抓取结果为空
**A**: 1) 检查搜索词 2) 更换 Actor 3) 查看 Actor 文档

---

## 📚 下一步

- [ ] 阅读 [完整指南](../APIFY-GUIDE.md)
- [ ] 尝试更多 Actors（YouTube、TikTok、Amazon）
- [ ] 创建链式自动化流程
- [ ] 设置定时任务

---

*创建时间：2026-03-02*
