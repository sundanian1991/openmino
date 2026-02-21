# 文件架构重构 - 执行计划

## 执行前确认

**状态**：⏸️ 等待年老师审查和确认

**确认内容**：
- [ ] 年老师已审查ARCHITECTURE-ANALYSIS.md
- [ ] 年老师已审查ARCHITECTURE-VISUAL.md
- [ ] 年老师同意新架构设计
- [ ] 年老师确认执行时机

---

## 执行计划

### Phase 1: 备份（安全第一）

**操作**：
```bash
# 创建备份
cd /Users/sundanian
tar -czf my-agent-backup-$(date +%Y%m%d).tar.gz my-agent/

# 验证备份
tar -tzf my-agent-backup-*.tar.gz | head -20
```

**预期结果**：
- 创建完整备份文件
- 验证备份内容完整

---

### Phase 2: 删除重复/无用文件

**操作清单**：

| # | 操作 | 命令 |
|---|------|------|
| 1 | 删除根目录空文件HEARTBEAT.md | `rm my-agent/HEARTBEAT.md` |
| 2 | 删除根目录重复的SESSION-STATE.md | `rm my-agent/SESSION-STATE.md` |
| 3 | 删除business/Soul.md（已在rules/） | `rm my-agent/business/Soul.md` |
| 4 | 删除workspace/docs/空目录 | `rmdir my-agent/workspace/docs` |
| 5 | 删除docs/目录（内容移走后） | `rm -r my-agent/docs/` |
| 6 | 删除data/目录（内容移走后） | `rm -r my-agent/data/` |
| 7 | 删除sources/目录（内容移走后） | `rm -r my-agent/sources/` |

**预期结果**：
- 删除7个重复/无用文件
- 释放无用空间

---

### Phase 3: 移动文件到正确位置

**操作清单**：

| # | 从 | 到 | 命令 |
|---|----|----|------|
| 1 | docs/agent-teams-test.md | .claude/docs/ | `mv my-agent/docs/agent-teams-test.md my-agent/.claude/docs/` |
| 2 | docs/skills-guide.md | .claude/docs/ | `mv my-agent/docs/skills-guide.md my-agent/.claude/docs/` |
| 3 | data/briefing | workspace/data/briefing | `mv my-agent/data/briefing my-agent/workspace/data/` |
| 4 | data/rss | workspace/data/rss | `mv my-agent/data/rss my-agent/workspace/data/` |
| 5 | sources/karpathy-rss.opml | workspace/sources/ | `mv my-agent/sources/karpathy-rss.opml my-agent/workspace/sources/` |
| 6 | workspace/*.py | scripts/python/ | `mv my-agent/workspace/*.py my-agent/scripts/python/` |
| 7 | workspace/CAPTURE.md | workspace/ | 保持在原位置 |
| 8 | workspace/EVOMAP-*.md | workspace/reference/ | `mv my-agent/workspace/EVOMAP-*.md my-agent/workspace/reference/` |
| 9 | workspace/TAVILY-*.md | workspace/reference/ | `mv my-agent/workspace/TAVILY-*.md my-agent/workspace/reference/` |
| 10 | workspace/AlphaMao_Skills | projects/AlphaMao_Skills | `mv my-agent/workspace/AlphaMao_Skills my-agent/projects/` |

**预期结果**：
- 所有文件移动到正确位置
- 文件分类清晰

---

### Phase 4: 新建目录

**操作清单**：

| # | 目录 | 用途 | 命令 |
|----|------|------|------|
| 1 | memory/curated/ | 精炼内容 | `mkdir -p my-agent/memory/curated/{patterns,decisions,lessons}` |
| 2 | memory/personal/ | 个人生活 | `mkdir -p my-agent/memory/personal` |
| 3 | business/career/ | 职业发展 | `mkdir -p my-agent/business/career` |
| 4 | scripts/python/ | Python脚本 | `mkdir -p my-agent/scripts/python` |
| 5 | scripts/shell/ | Shell脚本 | `mkdir -p my-agent/scripts/shell` |
| 6 | workspace/drafts/ | 草稿 | `mkdir -p my-agent/workspace/drafts` |
| 7 | workspace/temp/ | 临时文件 | `mkdir -p my-agent/workspace/temp` |

**预期结果**：
- 创建7个新目录
- 目录结构完整

---

### Phase 5: 移动脚本文件

**操作清单**：

| # | 文件 | 目标位置 |
|----|------|----------|
| 1 | scripts/daily-briefing.py | scripts/python/ |
| 2 | scripts/daily-briefing-v2-backup.py | scripts/python/ |
| 3 | scripts/fetch-rss.py | scripts/python/ |
| 4 | scripts/daily-report.sh | scripts/shell/ |
| 5 | scripts/organize-memory.sh | scripts/shell/ |

**预期结果**：
- 所有脚本正确归类

---

### Phase 6: 更新文档索引

**操作**：
- 更新.claude/docs/FILE-STRUCTURE.md
- 更新.claude/docs/FILE-ARCHITECTURE.md
- 创建scripts/README.md

**预期结果**：
- 文档索引准确
- 脚本有说明文档

---

### Phase 7: 清理空目录

**操作**：
```bash
# 查找并删除空目录
find my-agent/ -type d -empty -delete
```

**预期结果**：
- 无空目录残留

---

### Phase 8: 最终验证

**验证清单**：

- [ ] 备份文件存在
- [ ] 无重复文件
- [ ] 无空目录
- [ ] 所有文件在正确位置
- [ ] 命名规范一致
- [ ] 文档索引准确
- [ ] 脚本可正常运行

---

## 回滚计划

**如果出现问题**：

```bash
# 解除备份
cd /Users/sundanian
rm -rf my-agent/
tar -xzf my-agent-backup-YYYYMMDD.tar.gz
```

---

## 预期结果

**执行后的目录结构**：

```
my-agent/
├── .claude/          # AI核心配置
├── business/         # 工作相关
├── memory/           # 记忆系统
├── projects/         # 开发项目
├── scripts/          # 工具脚本
└── workspace/        # 临时工作区
```

**改进**：
- 一级目录：9个 → 6个
- 消除重复文件
- 消除空目录
- 文件分类清晰
- 命名规范统一

---

*创建时间：2026-02-21*
*状态：⏸️ 等待年老师确认*
