# 技能与规则文件结构分析

> 用于制作可分发的人机协同工作包。

## 1. 目录树结构（`.codex/` 核心，2-3 层深度）

```
.codex/
├── config.toml                          # Codex CLI 配置
├── hooks.json                           # 钩子配置
├── agents/                              # 子代理定义（TOML 格式）
├── commands/                            # 命令目录
├── skills/                             # 项目级技能目录
│   └── user-context/                   # 用 README.md 作为索引
├── rules/                              # 规则文件（按数字前缀排序加载）
│   ├── 01-SOUL.md
│   ├── 02-COLLAB.md
│   └── ...
├── reference/                          # 参考文档（按需读取）
├── templates/
│   └── workspace-project/              # workspace 项目模板
└── workspace/                          # 工作台（入库 git 跟踪）
    └── Rules/                          # 用户上下文规则
```

**重要观察**：`.codex/skills/` 与 `.agents/skills/` 是两套并存的体系。
- `.codex/skills/` 放项目级、轻量技能（用 README.md）。
- `.agents/skills/` 放标准格式、可跨工具复用的技能（每个目录一个 `SKILL.md`）。

## 2. 技能文件标准格式（SKILL.md）

### 2.1 frontmatter 字段（极简约定）

| 字段 | 必需 | 用途 |
|------|------|------|
| `name` | 是 | 技能唯一标识（kebab-case） |
| `description` | 是 | 描述 + 触发条件（含自然语言触发词） |

`description` 是技能被自动调用的核心，必须包含：能力描述 + 什么时候触发。

### 2.2 body 结构约定

1. `# 技能名 · 一句话定位`
2. `## Mission / 定位`
3. `## When To Use / 何时使用`（适用 + 不适用场景）
4. `## Core rules / 核心规则`
5. `## 输入`
6. `## Workflow / 工作流`
7. `## Reference routing`（按需读取的 references 子文件表）
8. `## 输出格式`

### 2.3 实际示例

```yaml
---
name: orchestrate-projects
description: 协调长时间运行的 Codex 项目。触发词：协调项目、长时间任务、/goal、GOALS.md、项目协调、子代理编排。
---
```

## 3. 规则文件的组织方式

### 3.1 命名约定

- 数字前缀 + 全大写：`01-SOUL.md`、`02-COLLAB.md`
- 数字前缀决定加载顺序

### 3.2 内部结构

1. 标题 + 一句定位
2. 主题小节
3. 态度锚点 / 硬约束（列表，每条可执行）
4. 「做」与「不做」边界
5. 文末更新标记

## 4. 最小可分发技能包

### 4.1 最小必需（1 个文件）

```
my-skill/
└── SKILL.md          # 必需且唯一硬要求
```

### 4.2 推荐最小包（2-3 个文件）

```
my-skill/
├── SKILL.md              # 给模型读
├── README.md             # 给人读：安装说明、用法
└── references/           # SKILL.md 超 300 行时拆分
```

### 4.3 分发检查清单

- [ ] `SKILL.md` 存在（大写文件名）
- [ ] frontmatter `name` 是 kebab-case，与目录名一致
- [ ] `description` 包含至少 3 个触发短语
- [ ] body 有明确的「适用」与「不适用」边界
- [ ] 无硬编码绝对路径、无对宿主项目的隐式依赖
- [ ] README.md 写清安装位置
