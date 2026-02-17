# Get笔记 MCP 服务器

Get笔记知识库的MCP服务器，让Claude Code能够直接查询你的Get笔记知识库。

---

## 功能

- **知识库搜索**：用自然语言查询Get笔记中的内容
- **深度思考**：支持AI深度分析模式
- **引用来源**：可返回知识来源信息

---

## 安装

1. **安装依赖**

```bash
cd projects/mcp-servers/getnote
npm install
```

2. **配置环境变量**

编辑 `~/.zshrc` 或 `~/.bashrc`，添加：

```bash
export GETNOTE_API_TOKEN="你的API Token"
export GETNOTE_KNOWLEDGE_BASE_ID="你的知识库ID"
```

然后执行：

```bash
source ~/.zshrc
```

---

## 配置到 Claude Code

编辑 `~/.mcp.json`（或 `~/.claude/mcp.json`），添加：

```json
{
  "mcpServers": {
    "getnote": {
      "command": "node",
      "args": ["/Users/sundanian/my-agent/projects/mcp-servers/getnote/index.js"],
      "env": {
        "GETNOTE_API_TOKEN": "你的API Token",
        "GETNOTE_KNOWLEDGE_BASE_ID": "你的知识库ID"
      }
    }
  }
}
```

**重启 Claude Code** 生效。

---

## 使用方式

### 方式1：直接指令

你说："查一下我的Get笔记，关于XXX的内容"

我会自动调用 `getnote_search` 工具查询。

### 方式2：隐式触发

你说："我的供应商管理框架是什么？"

如果这个问题涉及你的知识库内容，我会主动查询Get笔记。

---

## API 说明

### getnote_search

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| question | string | ✅ | 要搜索的问题或关键词 |
| deep_seek | boolean | ❌ | 是否深度思考（默认true） |
| refs | boolean | ❌ | 是否返回引用（默认true） |

---

## 注意事项

1. **API限制**：公测期间QPS=2，日调用量=5000次
2. **单向查询**：目前只支持查询，不支持写入笔记
3. **环境变量**：Token和知识库ID是敏感信息，注意保密

---

## 作者

Mino
