# Commands Directory

> Claude命令系统配置

## 说明

本目录包含所有可用的Claude命令配置文件，按功能分组到子目录中。每个命令都是一个独立的.md文件，遵循标准化格式。

## 目录结构

```
.claude/commands/
├── INDEX.md                    # 命令系统索引
├── README.md                   # 本文件
├── CLAUDE.md                   # 配置文件
│
├── core/                       # 核心高频命令
│   ├── wake.md                 # 会话启动
│   ├── plan.md                 # 规划模式
│   ├── checklist.md            # 任务核实
│   └── think.md                # 思考显性化
│
├── memory/                     # 记忆与学习
│   ├── observer.md             # 对话观察
│   ├── UPDATE_MEMORY.md        # 每周汇总
│   ├── learn.md                # 模式提取
│   └── log-day.md              # 日志记录
│
├── workflow/                   # 专项工作流
│   ├── plan5.md                # 五文件工作流
│   ├── ultrawork.md            # 超强工作模式
│   ├── workflow-code.md        # 代码开发
│   ├── workflow-report.md      # 汇报制作
│   ├── workflow-sop.md         # SOP 标准化
│   └── workflow-debug.md       # 问题排查
│
└── utility/                    # 工具命令
    └── convert-to-md.md        # 格式转换
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
