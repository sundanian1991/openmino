# Cron 定时任务配置

## 当前配置

| 任务 | 时间 | 命令 |
|------|------|------|
| Claude 日报 | 每天 9:00 | `daily-claude-news.sh` |

## Crontab 格式说明

```
* * * * * 命令
│ │ │ │ │
│ │ │ │ └─ 星期 (0-7, 0 和 7 都是周日)
│ │ │ └─── 月份 (1-12)
│ │ └───── 日期 (1-31)
│ └─────── 小时 (0-23)
└───────── 分钟 (0-59)
```

## 常用时间示例

| 描述 | Cron 表达式 |
|------|------------|
| 每天早上 9 点 | `0 9 * * *` |
| 每 30 分钟 | `*/30 * * * *` |
| 每小时 | `0 * * * *` |
| 工作日早上 8:30 | `30 8 * * 1-5` |
| 每周一 9:00 | `0 9 * * 1` |
| 每月 1 号 9:00 | `0 9 1 * *` |

## 管理命令

```bash
# 查看当前配置
crontab -l

# 编辑配置
crontab -e

# 删除所有配置（谨慎！）
crontab -r

# 从文件加载
crontab /path/to/cronfile
```

## 日志查看

```bash
# 查看执行日志
tail -f /tmp/claude-news.log

# 查看系统 cron 日志（macOS）
log show --predicate 'process == "cron"' --last 1h
```

## 故障排查

### 任务不执行？

1. **检查脚本权限**：
   ```bash
   ls -la scripts/daily-claude-news.sh
   # 应该是 -rwxr-xr-x
   ```

2. **检查脚本路径**：
   ```bash
   # crontab 中使用绝对路径
   /Users/sundanian/Documents/projects/ai-agents/my-agent/scripts/daily-claude-news.sh
   ```

3. **手动执行测试**：
   ```bash
   ./scripts/daily-claude-news.sh
   ```

4. **查看环境变量**：
   cron 的环境变量可能和你终端不同，脚本中应使用绝对路径

5. **macOS timeout 命令**：
   macOS 没有内置 `timeout` 命令，脚本已自动兼容：
   - 可选：`brew install coreutils` 安装 `gtimeout`
   - 不安装也不影响，脚本会自动跳过超时控制

### 收不到告警？

1. 检查飞书 Webhook 是否配置
2. 检查网络连接
3. 查看日志中的告警发送记录

## 修改执行时间

编辑 crontab：
```bash
crontab -e
```

修改第一行的时间表达式，例如改为每天早上 8 点：
```
0 8 * * * /Users/sundanian/Documents/projects/ai-agents/my-agent/scripts/daily-claude-news.sh >> /tmp/claude-news.log 2>&1
```
