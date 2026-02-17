# Tavily MCP 搜索配置指南

## 问题记录

### 错误包名
```json
{
  "command": "npx",
  "args": ["-y", "@tavily/mcp-server"]  // ❌ 错误：这个包不存在
}
```

**现象**：
- MCP服务一直显示"未启用"
- npm报错：404 Not Found

**根因**：
- 正确包名是 `tavily-mcp`，不是 `@tavily/mcp-server`

---

## 正确配置

### 1. .mcp.json 配置

```json
{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "你的API密钥"
      }
    }
  }
}
```

### 2. 获取API密钥

访问 https://tavily.com 注册并获取免费API密钥。

### 3. 验证安装

```bash
# 测试包是否存在
npm view tavily-mcp

# 测试MCP服务
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx -y tavily-mcp
```

### 4. 重启桌面端

配置完成后，**必须重启** Claude Code 桌面端才能生效。

---

## 统一搜索协议

```python
# 优先级顺序
1. tavily_search     # 实时网络搜索
2. memory_search     # 知识图谱记忆搜索
3. grep fallback     # 本地精确匹配
```

**使用示例**：
```python
# 找信息时，按顺序调用
mcp__tavily__tavily_search(query="...")
memory.search_nodes(query="...")
GrepTool(pattern="...")
```

---

## 常见问题

| 问题 | 解决 |
|------|------|
| MCP服务未启用 | 检查包名是否为 `tavily-mcp`，重启桌面端 |
| 搜索配额用完 | 等待重置或检查API密钥类型 |
| 返回空结果 | 检查API密钥是否有效 |

---

*最后更新：2026-02-17*
