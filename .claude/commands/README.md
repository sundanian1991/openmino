# Commands Directory

> Claude命令系统配置

## 说明

本目录包含所有可用的Claude命令配置文件。每个命令都是一个独立的.md文件，遵循标准化格式。

## 目录结构

```
.commands/
├── INDEX.md           # 命令系统索引
├── wake.md           # 会话启动命令
├── plan.md           # 规划模式命令
├── checklist.md      # 任务核实命令
├── UPDATE_MEMORY.md  # 每周汇总命令
├── learn.md          # 模式提取命令
├── observer.md       # 对话观察命令
├── plan5.md          # 五文件工作流
├── ultrawork.md      # 超强工作模式
├── g-workflow-code.md # 代码开发流程
├── b-workflow-report.md # 汇报制作流程
├── c-workflow-sop.md # SOP标准化流程
├── d-workflow-debug.md # 问题排查流程
└── log-day.md        # 日志记录命令
```

## 命令格式

每个命令文件包含：

```yaml
---
name: "command-name"
description: "命令描述"
argument-hint: <参数说明>  # 可选
---
```

## 标准

- 所有命令使用小写和连字符命名
- 包含标准化的YAML front matter
- 文档结构清晰，包含使用场景和工作流程
- 保持文档内容准确和时效性

## 维护

- 定期评估命令使用频率
- 优化文档质量和实用性
- 清理不再使用的命令文件