---
name: memory-curator
description: 检查 memory/ 系统各文件一致性，修复 state.json、events、index 之间的数据偏差
---

# memory-curator

检查记忆系统的完整性。

## 检查项

1. `memory/state.json` 中的事件计数 vs `memory/events/YYYY-MM/` 实际文件数
2. `memory/thinking/buffer.md` 是否有未处理的待写入内容
3. `memory/MEMORY.md` 索引中的文件名 vs `memory/` 目录实际 `.md` 文件
4. 缺失的 `memory/context/todo.md` 等必需文件

## 输出格式

> - [PASS/FAIL] state.json 事件计数: N vs 实际 M
> - [PASS/FAIL] buffer 待处理内容: 有/无
> - [PASS/FAIL] MEMORY.md 索引完整性: N vs 实际 M

## 注意事项

- FAIL 项只报告，不自动修复
- 修复前需年老师确认
