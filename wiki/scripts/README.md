# Wiki 自动化脚本使用指南

> 供应商管理知识库配套脚本 — 本地可运行
> 兼容 Claude Desktop (MCP) / 命令行 / CI流水线

---

## 脚本清单

| 脚本 | 功能 | 运行频率建议 |
|------|------|------------|
| `wiki_health_check.py` | 健康巡检：来源完整性、冲突状态、待验证假设数量、raw缺失检查 | 每周1次，或每次重大更新后 |
| `source_validator.py` | 来源验证：扫描distill层，找出缺少[来源]标注的关键规则 | 每次新增/修改分册后 |
| `build_knowledge_graph.py` | 知识图谱：构建分册间引用关系，生成可视化图表 | 每月1次 |

---

## 快速开始

### 方式一：命令行直接运行

```bash
cd wiki/scripts

# 1. 健康巡检（推荐先跑这个）
python3 wiki_health_check.py

# 带JSON报告输出
python3 wiki_health_check.py --output health_report.json

# 2. 来源验证
python3 source_validator.py

# 显示来源建议（自动猜测）
python3 source_validator.py --fix-suggestions

# 3. 构建知识图谱
python3 build_knowledge_graph.py

# 生成Mermaid图表（可粘贴到Markdown中渲染）
python3 build_knowledge_graph.py --format mermaid --output graph.md

# 生成JSON（供其他工具消费）
python3 build_knowledge_graph.py --format json --output graph.json
```

### 方式二：Claude Desktop (MCP) 集成

在 Claude Desktop 的 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "wiki-health": {
      "command": "python3",
      "args": [
        "/path/to/wiki/scripts/wiki_health_check.py",
        "--wiki-dir",
        "/path/to/wiki/",
        "--output",
        "/tmp/wiki_health.json"
      ]
    }
  }
}
```

然后在对话中直接询问：
- "运行知识库健康巡检"
- "检查哪些分册缺少来源标注"
- "生成知识库关联图谱"

### 方式三：GitHub Actions / CI 集成

`.github/workflows/wiki-health.yml`:

```yaml
name: Wiki Health Check
on:
  push:
    paths:
      - 'wiki/distill/**'
      - 'wiki/raw/**'
  schedule:
    - cron: '0 9 * * 1'  # 每周一早9点

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      - run: python3 wiki/scripts/wiki_health_check.py --output report.json
      - run: python3 wiki/scripts/source_validator.py
      - run: python3 wiki/scripts/build_knowledge_graph.py --format json --output graph.json
```

---

## 脚本详解

### wiki_health_check.py

**功能**：全面体检知识库三层架构的健康度

**检查项**：
1. **来源覆盖率**：每个包含关键规则（阈值、百分比、时限等）的段落是否标注了 `[来源]`
2. **原文完整性**：distill中引用的 `raw/` 文件是否真实存在
3. **冲突状态**：`notes/冲突记录.md` 中有多少个未解决冲突
4. **待验证假设**：`notes/待验证假设.md` 中有多少个待验证项
5. **健康度得分**：0-100分，<60分需要立即修复

**输出示例**：
```
==================================================
供应商管理知识库健康巡检报告
==================================================
提炼层文件: 10个
原文层文件: 43个
健康判断层文件: 3个
提炼层总行数: 4200行
来源标注覆盖率: 45/60 (75.0%)
未解决冲突: 5个
待验证假设: 6个
缺失raw文件: 0个
健康度得分: 85/100
--------------------------------------------------
✅ 所有检查通过，知识库状态健康
==================================================
```

### source_validator.py

**功能**：精准定位缺少来源标注的段落

**特点**：
- 自动识别"关键规则段落"（包含表格、阈值、百分比的段落）
- 跳过索引、导航、总览等元段落
- 提供来源建议（基于章节标题关键词匹配）

### build_knowledge_graph.py

**功能**：可视化知识库结构

**三种输出格式**：
- `summary`（默认）：文字摘要，显示被引用最多和引用最多的分册
- `mermaid`：Mermaid流程图语法，可粘贴到支持Mermaid的Markdown编辑器中渲染
- `json`：结构化数据，可被其他程序消费

---

## 本地运行环境要求

- Python 3.8+
- 无第三方依赖（仅使用标准库）
- 支持 macOS / Linux / Windows

---

## 扩展开发

如需新增脚本，遵循以下规范：

1. **文件位置**：`wiki/scripts/your_script.py`
2. **参数规范**：支持 `--wiki-dir` 参数指向Wiki根目录
3. **输出规范**：支持 `--output` 参数输出结果到文件
4. **编码规范**：UTF-8，中文输出
5. **依赖规范**：尽量只使用Python标准库

---

## 与Agent/Skill的集成思路

这些脚本可以作为Agent的"体检工具"：

1. **定期巡检**：Agent每周自动运行 `wiki_health_check.py`，发现健康度下降时主动提醒
2. **来源补全**：当Agent回答用户问题时，同时运行 `source_validator.py` 检查相关段落是否有来源，如果没有，提醒用户补充
3. **知识导航**：`build_knowledge_graph.py` 生成的图谱可以作为Agent的"地图"，帮助Agent理解分册间关系，回答跨分册问题时知道去哪里查
4. **冲突预警**：Agent在引用规则时，先查 `notes/冲突记录.md`，如果存在冲突，主动告知用户"此处有两个版本，当前采用X"
