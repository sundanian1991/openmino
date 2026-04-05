# Errors

> 记录：命令失败、异常、集成错误

---

## 历史数据导入（2026-03-06 至 2026-04-05）

> 来源：memory/daily/ 最近30天日志提取

---

## [ERR-20260322-001] 人力看板JS调试失败

**Logged**: 2026-03-22T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
连续3次修补失败，暴露代码调试思维缺陷

### Error
```
Cannot read properties of undefined (reading 'primary')
```

### Context
- **Command attempted**: 修复人力看板HTML文件的DS.colors梯度引用错误
- **错误尝试**:
  1. 添加 `typeof DS` 检查 → 失败
  2. 改为 `getECT()` 函数延迟执行 → 失败
  3. 继续加检查 → 失败，陷入修补循环
- **Environment**: JavaScript单线程，对象字面量初始化时序问题

### Suggested Fix
- **正确方案**（别人一次性解决）：重构架构，去掉`DS`嵌套对象，改为扁平常量`C`
- **铁律**：修补失败2次 → 立刻停下来反思方向
- **核心差异**："报错了修掉它" vs "为什么会报错？执行时序是什么？"

### Metadata
- Reproducible: yes
- Related Files: workspace/产电/人力看板.html
- Pattern-Key: debugging.stop_after_two_attempts
- Recurrence-Count: 1
- Date: 2026-03-22

---

*导入完成：2026-04-05*
*来源：memory/daily/ 2026-03-06 至 2026-04-05*
