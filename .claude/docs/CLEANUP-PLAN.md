# .claude/ 目录清理方案

## 当前状态分析

### 目录位置
- **项目配置**：`/Users/sundanian/my-agent/.claude/` （核心配置在此）
- **全局配置**：`~/.claude/` （rules目录为空，大量自动生成目录）

### rules/ 目录内容分析

#### 🔴 核心文件（必须保留）
| 文件 | 用途 | 优先级 |
|------|------|--------|
| 01-IDENTITY.md | 身份定义 | P0 |
| 02-SOUL.md | 性格/价值观 | P0 |
| 03-USER.md | 年老师信息 | P0 |
| 04-MEMORY.md | 长期记忆 | P0 |
| 05-self-review.md | 错题本 | P0 |
| 06-NOW.md | 当前状态 | P0 |
| WORK.md | 工作契约 | P0 |
| heartbeat.md | 心跳检查 | P0 |

#### 🟡 评估/改进文件（建议移到workspace/）
| 文件 | 用途 | 建议位置 |
|------|------|----------|
| CAPABILITY-ASSESSMENT.md | 能力评估标准 | workspace/reference/ |
| IMPROVEMENT-PLAN.md | 改进计划 | workspace/reference/ |
| P2-ASSESSMENT.md | P2改进评估 | workspace/reference/ |
| SEARCH-GUIDELINES.md | 搜索指南 | workspace/reference/ |
| SEARCH-LOG.md | 搜索日志 | workspace/logs/ |
| SESSION-STATE.md | WAL协议记录 | 保持（L1置顶） |
| WEEKLY-REVIEW.md | 周度反思 | 保持 |
| task.md | 深度访谈指引 | workspace/docs/ |

### ~/.claude/ 目录问题

| 问题 | 目录/文件 | 文件数 | 建议 |
|------|----------|--------|------|
| 自动生成数据 | debug/, telemetry/, usage-data/ | 5000+ | 定期清理 |
| 历史记录过多 | file-history/ | 575 | 限制保留数量 |
| 临时文件 | shell-snapshots/, projects/ | 1400+ | 定期清理 |
| 空目录 | rules/, ide/, config-backups/ | 0 | 可删除 |

## 清理方案

### Phase 1: rules/ 目录整理

**移除的文件**（移到workspace/reference/）：
```
CAPABILITY-ASSESSMENT.md → workspace/reference/capability-assessment.md
IMPROVEMENT-PLAN.md → workspace/reference/improvement-plan.md
P2-ASSESSMENT.md → workspace/reference/p2-assessment.md
SEARCH-GUIDELINES.md → workspace/reference/search-guidelines.md
```

**移到workspace/logs/的文件**：
```
SEARCH-LOG.md → workspace/logs/search-log.md
```

**保留在rules/的文件**：
- 核心身份/记忆文件（IDENTITY、SOUL、USER、MEMORY、NOW、self-review）
- WORK.md（工作契约）
- heartbeat.md（心跳检查）
- SESSION-STATE.md（WAL协议）
- WEEKLY-REVIEW.md（周度反思）
- task.md（深度访谈指引）

### Phase 2: 全局.claude/清理

**可删除的空目录**：
- `~/.claude/rules/`
- `~/.claude/ide/`
- `~/.claude/config-backups/`

**定期清理的目录**（添加到清理脚本）：
- `~/.claude/debug/` → 只保留最近7天
- `~/.claude/file-history/` → 只保留最近100个
- `~/.claude/shell-snapshots/` → 清空
- `~/.claude/projects/` → 清理已完成的项目

### Phase 3: 命名规范

**rules/命名规范**：
- 核心文件：`数字缩写-名称.md`（01-IDENTITY.md）
- 功能文件：`kebab-case.md`（heartbeat.md）
- 避免使用：P1/P2前缀、临时前缀

**workspace/结构**：
```
workspace/
├── logs/          # 日志文件
├── reference/     # 参考文档
├── docs/          # 项目文档
├── learning/      # 学习笔记
└── scripts/       # 工具脚本
```

## 执行计划

1. **备份当前rules/目录**
2. **移动评估文件到workspace/reference/**
3. **删除~/.claude/中的空目录**
4. **创建定期清理脚本**
5. **更新文件索引**

---

*创建时间：2026-02-21*
