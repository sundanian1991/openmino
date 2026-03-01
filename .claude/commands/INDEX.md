---
name: "commands-index"
description: "Commands目录说明 - 命令系统索引"
---

# Commands Directory Index

> 索引Claude命令系统的核心功能模块

## Summary

本目录包含Claude命令系统的所有可用命令。每个命令都是一个独立的.md文件，采用标准化格式，包含YAML front matter和详细说明文档。

## Categories

### Core Workflow Commands
| Command | Description | Frequency |
|---------|-------------|-----------|
| `plan.md` | 规划模式 - 分析现状、设计方案、等待确认 | High |
| `checklist.md` | 任务核实 - 提取对话任务，逐项确认状态 | High |
| `wake.md` | 会话启动 - 同步代码并初始化 | High |

### Memory & Learning Commands
| Command | Description | Frequency |
|---------|-------------|-----------|
| `UPDATE_MEMORY.md` | 每周汇总 - 从事实洞察生成周文档 | Medium |
| `learn.md` | 模式提取 - 从会话中提取可复用技能 | Medium |
| `observer.md` | 对话观察 - 记录事实与洞察 | Medium |

### Advanced Workflow Commands
| Command | Description | Frequency |
|---------|-------------|-----------|
| `plan5.md` | 五文件工作流 - 需求分析到执行追踪 | Medium |
| `ultrawork.md` | 超强工作模式 - 穷尽办法直至目标完成 | Medium |
| `g-workflow-code.md` | 代码开发流程 - 从需求到部署 | Low |
| `b-workflow-report.md` | 汇报制作流程 - 从数据到报告自动化 | Low |
| `c-workflow-sop.md` | SOP标准化流程 - 重复工作可复制 | Low |
| `d-workflow-debug.md` | 问题排查流程 - 结构化调试 | Low |

### Utility Commands
| Command | Description | Frequency |
|---------|-------------|-----------|
| `log-day.md` | 日志记录 | Low |

## Standards

所有命令文件遵循以下标准：
- YAML front matter（name, description, argument-hint）
- 标准化文档结构
- 明确的使用场景说明
- 工作流程详细说明

## Maintenance

- 高频命令：持续优化和迭代
- 低频命令：定期评估保留必要性
- 文档质量：保持内容准确和时效性