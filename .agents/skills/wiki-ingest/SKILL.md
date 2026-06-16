---
name: wiki:ingest
description: |
  卡帕西式知识库的"摄取"技能(Ingest)。把指定文件夹里的工作文档(Word/Excel/PPT/PDF/HTML/Markdown)
  批量转成 Markdown、归类、提炼成 wiki 页,写入三层结构(raw/distill/notes)。
  当用户说"把这些文档整理进知识库"、"wiki 化这个文件夹"、"批量归档并提炼"、
  "把我的工作沉淀成 wiki"、"ingest 这些文档"时使用。
  前提:目标 wiki 已按卡帕西三层结构搭建(有 raw/ distill/ notes/ + CLAUDE.md schema)。
when_to_use: "wiki化, 整理进知识库, 批量归档, 摄取, ingest, 把文档变成wiki, 沉淀工作知识, 整理这个文件夹, 转成知识库, 这些文档怎么进wiki"
metadata:
  version: "0.1.0"
  pattern: "Karpathy LLM Wiki — Ingest operation"
---

# wiki:ingest — 知识库摄取技能

> 卡帕西 LLM Wiki 三操作之一(Ingest)。你负责把一堆散乱的工作文档,变成结构化、可溯源、互相链接的 wiki。
> 另两个操作:`wiki:query`(读取)、`wiki:health`(健康检查)。

你是一个 **disciplined wiki maintainer**(卡帕西原词)。你的工作不是简单地把文件挪个位置,而是让知识库**持续增值、始终可信、互相链接**。

---

## 什么时候用这个技能

- 用户给你一个文件夹/一批文档,说"整理进知识库"
- 用户要把工作沉淀成可被 AI 调用的 wiki
- raw/ 目录需要补充新原文
- 现有 wiki 需要吸收新材料扩展某个分册

**不要用于**:单篇文档的快速查询(用 `wiki:query`)、知识库体检(用 `wiki:health`)、写公众号文章(用别的写作技能)。

---

## 核心原则(卡帕西三铁律)

1. **raw/ 只读不改** —— 原文是 source of truth,归档时一字不改。要"纠正"原文,只能在 distill 标注 + notes 记录。
2. **distill/ 必须标来源** —— 每个关键段落(阈值/流程/规则)都要有 `[来源:raw/文件名]`。追溯不上的写进 `notes/待验证假设.md`,不要硬塞。
3. **合并优于追加** —— 同一概念有新版,改旧段落,不要新建重复页。

---

## 完整流程(卡帕西 Op1 六步)

### Step 0:确认目标 wiki 结构

动手前先确认目标 wiki 已搭好三层结构。读目标目录的 `CLAUDE.md`(schema):
- 有 `raw/` `distill/` `notes/` 三个目录?
- 有 `CLAUDE.md` 告诉你编码体系?
- 有 `distill/00_索引与导航.md` 当地图?

如果结构不全 → 先提示用户补 schema(可参照 `wiki/CLAUDE.md` 模板),不要强行往里塞。

### Step 1:扫描文件夹,做转换计划(不立刻动手)

枚举目标文件夹的所有文件,产出一个**摄取清单**:

```
| 文件 | 格式 | 大小 | 初判类别 | 拟编码 | 转换方式 | 拟归入分册 |
|------|------|------|---------|--------|---------|-----------|
| 供应商管理办法.docx | docx | 50K | 制度 | SM-2026-xxx | markitdown | 01制度总纲 |
| 月度考核表.xlsx | xlsx | 30K | 工具 | TM-2026-xxx | markitdown | 04评估体系 |
| ... | | | | | | |
```

**初判类别**参考目标 wiki 的既有编码体系(通常是 SM=制度 / MT=方法论 / TM=工具 / 场景用 A1-E2)。

**关键**:这一步先给用户看清单,让用户确认归类和编码,再动手。归类是人的判断,AI 只给建议。

### Step 2:归档原文到 raw/(一字不改)

对清单里确认的每个文件:
1. 转成 markdown(转换方式见下"格式转换")
2. **原样**写入 `raw/[编码]_[主题].md`,不改内容
3. 如果原文是二进制(docx/xlsx/pptx/pdf),转换后的 md 是 raw 版本,原始二进制可另存到 `raw/originals/` 备份

> 铁律:raw/ 里的内容是"冻结的快照",后续提炼可以引用它,但不能改它。

### Step 3:提炼进 distill/(核心智能环节)

逐个读 raw 文件,按以下逻辑写 distill:

**新概念/新主题** → 在对应分册新增段落:
```markdown
## §X.X [主题名]

> [来源：[编码]_[文件名].md]
> 本节从原文提炼,完整细节见 [raw/文件名](../raw/文件名.md)。

[只写可复用的方法论、关键参数表、决策规则、操作要点]
[代码/截图/DOM细节等,指向 raw 原文,不复制]
```

**已有概念的更新** → 改已有段落(不新建),在段尾标注更新:
```markdown
> 更新(YYYY-MM-DD):据 [新文件名] 补充/修正了 [具体什么]
```

**提炼的度**(很重要,这是 wiki 质量的关键):
- ✅ 保留:可复用的规则、阈值、流程、决策树、参数表、方法论
- ✅ 保留:不同文档对同一规则的说法(矛盾记进 notes)
- ❌ 不复制:大段代码、完整截图、逐字原文(指向 raw)
- ❌ 不编造:原文没有的,不写进 distill;推测的写进 notes/待验证

### Step 4:更新交叉链接

每个新段落,至少检查 3 个方向的链接:
- **向上**:链接到它服务的制度/方法论(如"本 SOP 服务于 02分册 §合同续签")
- **向下**:链接到它依赖的工具/清单(如"字段校验复用 09分册 §1 检查清单")
- **横向**:链接到相关的其他段落(如"与 03分册 合规红线理念一致")

卡帕西原话:wiki 的价值在于链接密度。孤立页 = 死页。

### Step 5:更新索引

在 `distill/00_索引与导航.md` 登记:
- 原文层索引表加新 raw 文件条目
- 快速导航表加新段落的"问题→去哪查"映射
- 如果有关键数字/阈值,加到"全局关键数字"表

**未登记到 index 的新页 = agent 找不到的页 = 等于不存在。**

### Step 6:记摄取日志

在 `notes/ingest日志.md`(append-only)追加:
```markdown
### YYYY-MM-DD 摄取 [编码](主题)

- raw/ 归档:[文件名](从 [来源] 转换/拷入,[大小])
- distill/ 产出:[分册] 新增 §X.X(含 N 个子节)
- 交叉链接:列出新建立的链接
- 提炼原则:raw 保留了什么,distill 提炼了什么
- 健康检查:摄取后跑 wiki:health,分数 X→Y
```

---

## 格式转换速查

底层工具是 `markitdown`(via `doc:markdown-converter` 技能或直接 `uvx markitdown`):

| 格式 | 命令 | 注意 |
|------|------|------|
| .docx | `markitdown input.docx -o output.md` | 保留标题层级、表格 |
| .xlsx | `markitdown input.xlsx -o output.md` | 每个 sheet 成一个表格;公式不保留 |
| .pptx | `markitdown input.pptx -o output.md` | 每页一张,备注成文本 |
| .pdf | `markitdown input.pdf -o output.md` | 扫描件需先 OCR;文字版直接抽 |
| .html | `markitdown input.html -o output.md` | 去标签留结构 |
| .md | 无需转换,直接拷 | 检查 frontmatter 是否需清理 |
| 图片 | `markitdown input.png -o output.md` | 自带 OCR(需模型配置) |

**批量转一个文件夹**(示例脚本,见 `scripts/batch_convert.sh`):
```bash
for f in source_folder/*.{docx,xlsx,pptx,pdf,html}; do
  [ -e "$f" ] || continue
  name=$(basename "${f%.*}")
  uvx markitdown "$f" -o "raw/${name}.md"
done
```

> 转换只是"把格式打通",真正的 wiki 化(归类/提炼/链接)是 Step 3-5,那才是 AI 的核心价值。

---

## 与其他技能的协作

| 协作对象 | 何时调用 |
|---------|---------|
| `doc:markdown-converter` | Step 2 转换格式时,底层引擎 |
| `khazix:knowledge-distiller` | Step 3 遇到需要"苏格拉底式追问"才能理清的隐性知识 |
| `wiki:query` | Step 3 判断"这个概念 wiki 里是否已有" |
| `wiki:health` | Step 6 摄取后跑体检 |
| `kaas-kb` | 团队共享阶段,把确认的 distill 上传到 KaaS 知识库 |

---

## 反模式(绝对不做)

1. **未经用户确认就批量归类** —— 类别判断要人确认,AI 只给建议
2. **把原文直接复制进 distill** —— distill 是提炼,不是转载;细节指向 raw
3. **不改 raw** —— 任何"修正"都走 distill 标注 + notes 记录
4. **跳过交叉链接和 index 更新** —— 不链接不登记 = 死页
5. **一口气处理几十个文件** —— 每批 5-10 个,处理完跑 health,再继续

---

## 参考资源

- `scripts/batch_convert.sh` — 批量格式转换脚本
- 目标 wiki 的 `CLAUDE.md` — 该 wiki 的 schema 和编码体系
- `../wiki-health/SKILL.md` — 摄取后的健康检查
- Karpathy LLM Wiki 原文:https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
