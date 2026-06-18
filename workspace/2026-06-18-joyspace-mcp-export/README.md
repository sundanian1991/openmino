# likecodenex-joyspace MCP 导出包

企业文档管理 MCP，支持 JoySpace 文档的搜索、读取、创建、目录/标签管理、分享、日程/任务关联。

## 文件说明

| 文件 | 用途 |
|------|------|
| `joyspace-mcp-manifest.json` | 完整工具清单（含参数 schema） |
| `joyspace-routing-rules.json` | 意图路由与字段解析规则 |
| `README.md` | 安装与使用说明 |

## 在 Claude Code 中使用

将 `joyspace-mcp-manifest.json` 中的工具定义接入 MCP 配置。若使用 mcporter，参考 `config/mcporter.json`：

```json
{
  "mcpServers": {
    "joyspace": {
      "command": "npx",
      "args": ["-y", "@likecodenex/mcp-joyspace@latest"]
    }
  }
}
```

> 注意：当前仓库 `config/mcporter.json` 未实际配置 joyspace server，需要自行补充 server 启动命令或 SSE endpoint。

## 在通用 MCP Client 中使用

1. 加载 `joyspace-mcp-manifest.json` 作为 tools 定义
2. 将工具名映射到实际调用 endpoint
3. 按 `joyspace-routing-rules.json` 实现意图路由
4. 认证失败时按规则引导用户访问 `http://erp.jd.com` 登录

## 关键使用规则

1. **page_id 禁止猜测**：必须先调用搜索工具，唯一匹配才能使用
2. **team_id / folder_id**：私人空间用 `"root"`，团队空间先 `search_team`
3. **创建文档后**：必须输出 `https://joyspace.jd.com/pages/{page_id}`
4. **认证失败**：返回 `auth_required` 时立即询问用户，引导登录
5. **批量移动**：单次不超过 50 个 page_id

## 工具命名空间

- 不带前缀：`search_recent_doc`, `get_page_basic_info`, `create_doc_routing` 等
- `joyspace.` 前缀：空间/目录/标签相关工具
- `search.` 前缀：搜索类通用工具
