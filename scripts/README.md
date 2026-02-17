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
| `daily-briefing.py` | 每日简报V2：精选15源→Claude摘要→Tailwind+Lucide设计 | ✅ 已实现 |

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

**V2设计特点**：
- Tailwind CSS + Lucide Icons（Vibe Coding标准）
- 两版输出：brief（快速）+ full（深度）
- 精选15个高质量源（Simon Willison、Paul Graham、Gwern等）
- Newsletter级别排版设计

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
