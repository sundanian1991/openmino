# Scripts - 自动化脚本库

> Mino的工具箱：脚本化重复任务，提高效率

---

## 已有脚本

### Bash脚本

| 脚本 | 用途 | 状态 |
|------|------|------|
| `analyze-skills.sh` | 分析skill使用情况 | ✅ 已实现 |
| `organize-memory.sh` | 整理记忆文件 | ✅ 已实现 |
| `daily-report.sh` | 自动生成日报 | ✅ 已实现 |

### Python脚本

| 脚本 | 用途 | 状态 |
|------|------|------|
| `fetch-rss.py` | RSS抓取：解析OPML→抓取feed→存储JSON | ✅ 已实现 |
| `daily-briefing.py` | 每日简报V3：产品级设计、内容二次加工、中文呈现 | ✅ 已实现 |

**daily-briefing.py 使用示例**：
```bash
# 需要先设置API密钥
export ANTHROPIC_API_KEY="your-key-here"

# 生成简报（精选15个高质量RSS源）
python3 scripts/daily-briefing.py

# 输出：data/briefing/YYYY-MM-DD/
#   - index.html  (导航页)
#   - brief.html  (快速浏览：每源1篇)
#   - full.html   (深度阅读：每源3篇+AI摘要)
```

**V3产品级设计**：
- **质感提升**：渐变Hero、卡片光泽效果、精致阴影
- **内容二次加工**：AI提炼核心观点、一句话总结、阅读价值标签
- **高度组织化**：分类emoji图标、中文日期、视觉层级清晰
- **全中文呈现**：所有界面文本中文化

**设计规范**：见 `.claude/design/DESIGN_SYSTEM.md`

**fetch-rss.py 使用示例**：
```bash
# 抓取前5个RSS源（默认）
python3 scripts/fetch-rss.py

# 抓取前10个RSS源
python3 scripts/fetch-rss.py 10

# 抓取全部92个源
python3 scripts/fetch-rss.py 92
```

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
