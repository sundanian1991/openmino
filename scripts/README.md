# Scripts - 自动化脚本库

> Mino的工具箱：脚本化重复任务，提高效率

---

## 已有脚本

| 脚本 | 用途 | 状态 |
|------|------|------|
| `analyze-skills.sh` | 分析skill使用情况 | ✅ 已实现 |
| `organize-memory.sh` | 整理记忆文件 | ✅ 已实现 |
| `daily-report.sh` | 自动生成日报 | ✅ 已实现 |

---

## 脚本规范

**命名**：`动词-名词.sh` 格式，如 `analyze-skills.sh`

**结构**：
```bash
#!/bin/bash
# 脚本说明：做什么
# 作者：Mino
# 日期：YYYY-MM-DD

set -euo pipefail  # 严格模式

# 主逻辑
main() {
    echo "执行中..."
}

main "$@"
```

**使用**：
```bash
chmod +x scripts/xxx.sh
./scripts/xxx.sh
```

---

*创建于 2026-02-17*
