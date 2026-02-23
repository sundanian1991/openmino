---
input: 03-USER.md，对话中浮现的偏好
output: 用户偏好文档（审美、沟通、写作）
pos: core/的成员，P0 永久核心
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Preferences

> **用户偏好 — P0 永久核心**

---

## Summary

存储年老师的偏好：审美、沟通风格、写作风格。

这些信息直接影响每次交互的质量。

---

## Members

| 文件 | 内容 |
|------|------|
| **aesthetic.md** | 审美偏好（Clean > Minimalist > Modern） |
| **communication.md** | 沟通风格（结构化表达、用数据说话） |
| **writing.md** | 写作偏好（接地气、直白、案例支撑） |

---

## Rules

1. **来源**：从 03-USER.md 提炼，或 WAL 协议触发时写入
2. **更新**：偏好变化时立即更新，旧版本保留到 archive/
3. **调用**：每次会话开始前 Read（已自动加载）

---

*记住：年老师喜欢什么，不喜欢什么。*
