# MemOS MCP Server

> 为 Mino 提供云端记忆能力

---

## 功能

| 工具 | 说明 |
|------|------|
| `add_message` | 添加对话记忆到 MemOS |
| `search_memory` | 从 MemOS 检索相关记忆 |

---

## 安装

```bash
cd projects/mcp-servers/memos
npm install
```

---

## 配置

在 `.mcp.json` 中添加：

```json
{
  "mcpServers": {
    "memos": {
      "command": "node",
      "args": ["projects/mcp-servers/memos/src/index.js"],
      "env": {
        "MEMOS_API_KEY": "你的API密钥"
      }
    }
  }
}
```

---

## 使用示例

### 添加记忆

```
调用 add_message，参数：
- messages: [{"role": "user", "content": "年老师喜欢 Clean 设计风格"}]
- tags: ["#偏好", "#设计"]
```

### 检索记忆

```
调用 search_memory，参数：
- query: "年老师的设计偏好是什么？"
```

---

## 记忆类型

- **事实记忆**：具体信息、知识
- **偏好记忆**：用户喜好、习惯
- **工具记忆**：工具使用经验
- **技能记忆**：可复用的技能

---

*最后更新：2026-03-03*
