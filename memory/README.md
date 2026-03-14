---
input: 记忆数据
output: 记忆存取接口
pos: 记忆存储层
---

# memory/ - 记忆系统

> L0/L1/L2 分层记忆存储

## 子目录

- `core/` - 核心记忆（永久）
- `active/` - 活跃记忆（90天）
- `workspace/` - 工作空间（临时）
- `archive/` - 归档记忆（永久）
- `backup/` - 备份（gitignored）
- `logs/` - 日志记录
- `observations/` - 月度观察
- `weekly/` - 周文档

## 生命周期

| 层级 | 保留时间 |
|------|----------|
| active | 90 天 |
| workspace | 随时清理 |
| core | 永久 |
| archive | 按需 |
| observations | 月度汇总 |
| weekly | 每月汇总 |
