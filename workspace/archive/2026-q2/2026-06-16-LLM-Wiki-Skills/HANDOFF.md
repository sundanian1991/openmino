# Handoff: LLM Wiki 技能落地（给后续 Agent）

## 背景

用户（年老师）希望把团队过往工作文档沉淀为知识库，并让 Agent 能调用。采用 **Karpathy LLM Wiki** 模式：

- `raw/`：原始素材（只读）
- `distill/`：LLM/人工提炼的结构化知识
- `notes/`：冲突记录、待验证假设、ingest 日志

三个核心操作：ingest（摄取）、query（查询）、health（健康检查）。

项目里已经有一套对应 skills，位于 `.agents/skills/`：
- `wiki:ingest`
- `wiki:health`
- `wiki:query`

## 目标

帮用户跑通一次真实文件夹的完整闭环：

```
本地散乱文档
    ↓
wiki:ingest（批量转换 + 归档 raw）
    ↓
Claude 人工/半自动提炼到 distill/
    ↓
wiki:health 体检
    ↓
wiki:query 问答验证
    ↓
确认有价值的 distill 上传 KaaS（通过 kaas-kb skill）
```

## 当前状态

- ✅ 已确认 skills 存在且可用
- ✅ `batch_convert.sh` 能批量转换多格式文档
- ✅ `wiki_health_check.py` 健康巡检可运行，当前 wiki 健康度 100/100
- ❌ 还没用真实工作文件夹跑过完整闭环
- ❌ 明天早上分享需要 demo 素材

## 你必须先读的文件

按顺序读取：

1. `.agents/skills/wiki-ingest/SKILL.md`
2. `.agents/skills/wiki-health/SKILL.md`
3. `.agents/skills/wiki-query/SKILL.md`
4. `.claude/skills/kaas-kb/SKILL.md`
5. `wiki/CLAUDE.md`（如果存在）
6. `wiki/distill/00_索引与导航.md`

## 下一步任务

### 任务 1：找一个真实测试文件夹

问用户：
> "你想用哪个文件夹测试完整的 wiki ingest 流程？"

候选：
- 用户本地某个未整理的供应商管理资料夹
- `workspace/2026-06-16-KaaS操作手册/` 里的材料
- 任何包含 Word/Excel/PPT/PDF/Markdown 的文件夹

### 任务 2：运行 wiki:ingest

方式一（用已有脚本）：

```bash
bash .agents/skills/wiki-ingest/scripts/batch_convert.sh <源文件夹> wiki/raw/2026-06-16_<source-name>
```

方式二（如果用户需要更智能的命名/归类）：

按 `wiki:ingest` SKILL.md 中的 Step 1-6 执行，先列摄取清单给用户确认，再归档、提炼、链接、更新索引、记日志。

### 任务 3：生成/更新 distill 分册

根据新归档的 raw 文件，判断：
- 是否需要新增 distill 分册
- 还是更新现有分册（如 `01_制度总纲.md`、`05_方法论体系.md` 等）
- 每个关键段落标注 `[来源:raw/编码_文件名.md]`

### 任务 4：运行 wiki:health

```bash
cd wiki/scripts
python3 wiki_health_check.py --wiki-dir ../ --output /tmp/wiki_health.json
```

确保健康度不下降（目标 ≥ 95 分）。

### 任务 5：运行 wiki:query 验证

让用户问一个只有新加入文档才能回答的问题，验证查询链路。

### 任务 6（可选）：上传到 KaaS

如果用户确认内容可以共享：
1. 把确认过的 distill Markdown 放到 JoySpace 目录
2. 用 `kaas-kb` skill 中的"文档上传"流程导入 KaaS
3. 用 `kaas-kb` skill 查询验证

## 关键约束

1. **raw/ 只读不改**：原始素材归档后不要修改
2. **distill 必须标来源**：每个关键规则/阈值/流程都要 `[来源:raw/...]`
3. **先问再归类**：ingest 前给用户看摄取清单，确认编码和分册归属
4. **健康度不下降**：新增内容后 wiki:health 分数不能低于当前
5. **KaaS 是下游发布态**：没确认的内容不要上传

## 常见陷阱

- 不要把 `.agents/skills/wiki-*` 和 `.claude/skills/llm-wiki*` 混用
- `batch_convert.sh` 只做格式转换，真正的 wiki 化（归类/提炼/链接）需要 Claude 人工做
- 不要直接用通用知识回答 wiki:query 的问题，必须先读 wiki
- 如果 wiki 里没有答案，不要硬编，记进 `wiki/notes/待验证假设.md`

## 与用户确认的问题

1. 第一批测试用哪个真实文件夹？
2. 是否继续用现有 `wiki/raw/` + `wiki/distill/` 结构，还是严格改成 Karpathy 的 `raw/` + `wiki/`？
3. 明天分享需要多长的 demo？（5 分钟 / 15 分钟 / 30 分钟）
4. 哪些内容可以上传到团队 KaaS，哪些只能留在本地 wiki？

## 参考链接

- Karpathy 原始 gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- 相关实现: https://github.com/kfchou/wiki-skills
- 相关实现: https://github.com/NicholasSpisak/second-brain
