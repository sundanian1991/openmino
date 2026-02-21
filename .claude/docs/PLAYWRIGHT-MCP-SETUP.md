# Playwright MCP 登录态复用方案

## 问题

Playwright MCP 每次启动都创建新的浏览器实例，无法复用豆包浏览器中已有的登录态。

## 解决方案

使用豆包浏览器profile的**同步副本**，避免同时访问同一目录的冲突。

## 工作原理

```
豆包浏览器
    ↓ (定期同步)
备份目录 (doubao-backup)
    ↓ (Playwright MCP使用)
Playwright MCP
```

## 使用方法

### 1. 同步登录态

每次想用Playwright MCP复用登录态前，运行：

```bash
~/.claude/scripts/sync-doubao-profile.sh
```

**建议**：
- 最好关闭豆包浏览器后再同步
- 登录态变化后（如新登录网站）需要重新同步

### 2. 使用Playwright MCP

同步后，直接在对话中使用：

```
用playwright打开 https://example.com
```

Playwright MCP会自动使用备份目录中的登录态。

## 配置文件

**MCP配置**：`~/.claude/.mcp.json`
```json
"playwright": {
  "command": "npx",
  "args": ["-y", "@playwright/mcp@latest", "--user-data-dir", "/Users/sundanian/Library/Caches/ms-playwright/doubao-backup"]
}
```

**同步脚本**：`~/.claude/scripts/sync-doubao-profile.sh`

## 目录说明

| 目录 | 用途 |
|------|------|
| `~/Library/Application Support/Doubao/` | 豆包浏览器的原始用户数据 |
| `~/Library/Caches/ms-playwright/doubao-backup/` | Playwright MCP使用的备份副本 |
| `~/Library/Caches/ms-playwright/mcp-chrome-*/` | Playwright MCP默认创建的独立profile |

## 注意事项

1. **不要同时运行**：豆包浏览器和Playwright MCP不要使用相同的用户数据目录
2. **定期同步**：cookies和登录态会过期，需要定期重新同步
3. **敏感信息**：备份目录包含登录凭据，注意保密

## 自动化（可选）

如果想自动同步，可以创建cron任务：

```bash
# 每小时同步一次
0 * * * * ~/.claude/scripts/sync-doubao-profile.sh
```

---

*创建时间：2026-02-21*
*最后更新：2026-02-21*
