# Errors

> 记录：命令失败、异常、集成错误

---

## 模板

```markdown
## [ERR-YYYYMMDD-XXX] skill_or_command_name

**Logged**: ISO-8601 timestamp
**Priority**: high
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### Summary
失败简述

### Error
```
错误信息
```

### Context
- Command/operation attempted
- Input or parameters used
- Environment details

### Suggested Fix
可能的解决方案

### Metadata
- Reproducible: yes | no | unknown
- Related Files: path/to/file.ext
- See Also: ERR-YYYYMMDD-XXX (if related)

---
```
