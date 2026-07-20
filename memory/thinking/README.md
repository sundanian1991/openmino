# thinking/ — 思考过程索引

> 会话过程中的实时记录和暂存区

---

## 文件说明

| 文件 | 用途 | 生命周期 |
|:---|:---|:---|
| buffer.md | 会话中关键信息的实时落盘（WAL协议） | 每日整理后清空 |
| journal.md | 深度思考和推理过程 | 长期保留 |
| rule-audit-2026-07-07.md | 规则审计记录 | 审计时产生 |
| improvement-candidates-2026-07-07.md | 改进候选清单 | 审计时产生 |
| git-audit-note.md | Git 审计备注 | 长期保留 |

---

## 工作流程

```
对话中发现关键信息
    ↓ 立即写入
thinking/buffer.md
    ↓ 每日10:00整理 → 分发到目标目录
decisions/ meetings/ projects/ topics/ daily/
    ↓ 清空已处理条目
buffer.md 保留头部说明
```

---

## 关联 MOC

- **整理流程** → 见 MEMORY-L1 每日整理说明
- **错题本** → [.claude/reference/05-self-review.md](../../.claude/reference/05-self-review.md)
- **认知协议** → [cognitive-contract.md](../topics/cognitive-contract.md)

---

*最后更新：2026-07-15*
