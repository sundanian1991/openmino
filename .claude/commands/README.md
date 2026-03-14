# Commands Directory

> Claude命令系统配置

## 说明

本目录包含所有可用的Claude命令配置文件。每个命令都是一个独立的.md文件，遵循标准化格式。

## 命令格式

每个命令文件包含：

```yaml
---
name: "command-name"
description: "命令描述"
argument-hint: <参数说明>  # 可选
---
```

## 命令分类

### Core Commands (核心高频)
- `wake` - 会话启动
- `plan` - 规划模式
- `checklist` - 任务核实
- `think` - 思考显性化

### Memory Commands (记忆与学习)
- `observer` - 对话观察
- `update-memory` - 每周汇总
- `learn` - 模式提取
- `log-day` - 日志记录

### Workflow Commands (专项工作流)
- `plan5` - 五文件工作流
- `ultrawork` - 超强工作模式
- `workflow-code` - 代码开发
- `workflow-report` - 汇报制作
- `workflow-sop` - SOP 标准化
- `workflow-debug` - 问题排查

### Utility Commands (工具命令)
- `convert-to-md` - 格式转换

## 标准

- 所有命令使用小写和连字符命名
- 包含标准化的YAML front matter
- 文档结构清晰，包含使用场景和工作流程
- 保持文档内容准确和时效性

## 维护

- 定期评估命令使用频率
- 优化文档质量和实用性
- 清理不再使用的命令文件
