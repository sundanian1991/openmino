---
input: launchd plist 配置
output: 定时执行 UPDATE_MEMORY 的设置指南
pos: logs 目录，自动化设置说明
---

# UPDATE_MEMORY 自动化设置

## 配置已完成

以下文件已创建：
- **脚本**：`scripts/auto-update-memory.sh`
- **配置**：`~/Library/LaunchAgents/com.mino.update-memory.plist`
- **日志目录**：`memory/logs/`

## 启用定时任务

### 方式 1：加载 launchd（推荐）

```bash
# 加载定时任务
launchctl load ~/Library/LaunchAgents/com.mino.update-memory.plist

# 验证已加载
launchctl list | grep com.mino.update-memory

# 查看日志
tail -f memory/logs/update-memory.log
```

### 方式 2：手动测试

```bash
# 手动执行脚本测试
./scripts/auto-update-memory.sh
```

### 卸载定时任务

```bash
# 卸载
launchctl unload ~/Library/LaunchAgents/com.mino.update-memory.plist

# 删除配置文件
rm ~/Library/LaunchAgents/com.mino.update-memory.plist
```

## 定时规则

- **时间**：每周一早上 9:00
- **执行内容**：
  1. 检查超期文件
  2. 归档到 archive/
  3. 更新索引
  4. 记录日志

## 日志位置

- **执行日志**：`memory/logs/update-memory.log`
- **标准输出**：`memory/logs/update-memory.stdout.log`
- **错误输出**：`memory/logs/update-memory.stderr.log`

---

*最后更新：2026-03-14*
