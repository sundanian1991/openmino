# Commands Directory Index

> 索引Claude命令系统的核心功能模块

## Summary

本目录包含Claude命令系统的所有可用命令。每个命令都是一个独立的.md文件，采用标准化格式，包含YAML front matter和详细说明文档。

---

## Core Commands (核心高频)

| Command | Description | Frequency |
|---------|-------------|-----------|
| `wake` | 会话启动 - 同步代码并初始化 | High |
| `plan` | 规划模式 - 分析现状、设计方案、等待确认 | High |
| `checklist` | 任务核实 - 提取对话任务，逐项确认状态 | High |
| `think` | 思考显性化 - 展示推理过程，让思考可见 | Medium |

---

## Memory Commands (记忆与学习)

| Command | Description | Frequency |
|---------|-------------|-----------|
| `observer` | 对话观察 - 记录事实与洞察 | Medium |
| `UPDATE_MEMORY` | 每周汇总 - 从事实洞察生成周文档 | Medium |
| `learn` | 模式提取 - 从会话中提取可复用技能 | Medium |
| `log-day` | 日志记录 - 时间轴+标签，整理到daily | Low |

---

## Workflow Commands (专项工作流)

| Command | Description | Frequency |
|---------|-------------|-----------|
| `plan5` | 五文件工作流 - 需求分析到执行追踪 | Medium |
| `ultrawork` | 超强工作模式 - 穷尽办法直至目标完成 | Medium |
| `workflow-code` | 代码开发流程 - 从需求到部署 | Low |
| `workflow-report` | 汇报制作流程 - 从数据到报告自动化 | Low |
| `workflow-sop` | SOP标准化流程 - 重复工作可复制 | Low |
| `workflow-debug` | 问题排查流程 - 结构化调试 | Low |

---

## Utility Commands (工具命令)

| Command | Description | Frequency |
|---------|-------------|-----------|
| `convert-to-md` | 多格式转 Markdown — 支持 DOCX/PDF/HTML/EPUB 等 | Medium |

---

## Standards

所有命令文件遵循以下标准：
- YAML front matter（name, description）
- 标准化文档结构
- 明确的使用场景说明
- 工作流程详细说明
