---
input: 记忆数据
output: 记忆存取接口
pos: 记忆存储层
---

# memory/ - 记忆系统

> L0/L1/L2 分层记忆存储

## 子目录

- `staging/` - 临时记忆
- `core/` - 核心记忆
- `active/` - 活跃记忆
- `transient/` - 短期记忆
- `archive/` - 归档记忆

## 生命周期

| 层级 | 保留时间 |
|------|----------|
| transient | 7 天 |
| staging | 30 天 |
| active | 90 天 |
| core | 永久 |
| archive | 按需 |
