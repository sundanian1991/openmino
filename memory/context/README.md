# 情境知识图谱

> **目的**：记录工作中的潜台词、人物关系、权力结构，帮助 Mino 正确理解和互动
> **更新方式**：遇到新情况随时记录，每周复盘补充
> **同步机制**：本地完整记录 → MemOS 同步关键索引

---

## 目录结构

```
context/
├── people/           # 人物档案
├── relationships/    # 关系图谱
├── scenarios/        # 场景模式
└── patterns/         # 潜台词模式
```

---

## 与其他知识库的关联

| 知识库 | 内容 | 关联方式 |
|--------|------|---------|
| **32问** | 价值观、偏好 | 在人物档案中引用 `32questions#X` |
| **电销知识库** | 业务知识 | 在场景模式中引用具体问题 |
| **情境知识** | 潜台词、关系 | 关联到具体人物和场景 |

---

## 使用原则

1. **记录 > 完美**：先记录，再完善
2. **持续 > 系统**：保持更新，不必追求完美框架
3. **具体 > 抽象**：记录具体案例，不只是抽象规则

---

## MemOS 同步脚本

```bash
# 同步人物档案
./scripts/sync-context-to-memos.sh people

# 同步关系图谱
./scripts/sync-context-to-memos.sh relationships

# 同步场景模式
./scripts/sync-context-to-memos.sh scenarios

# 同步潜台词模式
./scripts/sync-context-to-memos.sh patterns
```

---

*最后更新：2026-03-05*
