---
name: "observer"
description: "对话结束后记录事实与洞察"
---

# 观察者

> 触发方式：手动触发 — 用户说"观察"、"总结观察"或"/observer"

---

## 工作流程

### Step 1: 记录事实到 daily

在 `memory/active/daily/YYYY-MM-DD.md` 中记录：
- 今天做了什么（事实）
- 涉及哪些文件
- 产生了什么结果

**记录方式**：
- 一天一个文件
- 一天内多件事 → 按时间顺序记录在同一天文件中
- 简洁记录，不用详细展开

**文件头（自指三行）**：
```markdown
---
lifecycle: P2
tags: [关键词]
input: 当日对话记录、涉及文件路径
output: 事实摘要、可供 observations 提炼洞察
pos: daily 目录的成员
# 文件更新需同步注释及所属文件夹 md
---
```

### Step 1.5: 写入今日对话摘要（跨对话上下文）

在 daily 文件**顶部**追加今日对话摘要，供 wake 命令快速读取：

```markdown
---

## 今日对话摘要

### [时间范围] 第N段对话
- **时长**：约XX分钟
- **涉及文件**：[主要文件列表]
- **核心进展**：[一句话总结]
- **待续事项**：[如有未完成的工作]
```

**摘要原则**：
- 简洁：3-5条 bullet points
- 聚焦：只记录核心内容
- 可读：新对话能快速了解上下文

**示例**：
```markdown
---

## 今日对话摘要

### 09:00-10:30 第1段对话
- **时长**：约90分钟
- **文件**：定价委员会机制V1.0.md
- **进展**：完成定价委员会机制初稿
- **待续**：约年老师和军哥时间对齐思路
```

---

### Step 2: 更新索引
写完 daily 文件后，更新索引：
```bash
python3 memory/active/tasks/scripts/index_manager.py --action update-daily
```

### Step 3: 生成洞察到observations
基于 daily 内容，在 `memory/observations/YYYY-MM.md` 中生成洞察：

**三个维度**：
1. **需求洞察** - 表面问的是A，实际可能在解决B？
2. **模式信号** - 最近反复出现的信号？趋势？
3. **我的复盘** - 这次交互中我学到了什么？下次可以更好？

**输出格式**：
```markdown
# 观察 YYYY-MM-DD

## 需求洞察
•

## 模式信号
•

## 我的复盘
•

---

## 总结
[灵活的总结点评]
```

### Step 4: 更新索引
写完 observations 文件后，更新索引：
```bash
python3 memory/active/tasks/scripts/index_manager.py --action update-obs
```

### Step 5: 提交
- `git add -A && git commit`
- `git push`

---

## 质量原则

- **事实简明** - daily只记录事实，不展开
- **洞察深入** - 观察不只记录发生了什么，要理解为什么
- **bullet points** - 简洁、易读、易对比
- **不强求** - 没有值得保留的洞察，就不写

---

## 文件结构

```
memory/
├── active/
│   ├── daily/           # 日维度 - 事实记录
│   │   ├── .index.md    # 快速索引（脚本更新）
│   │   └── YYYY-MM-DD.md
│   └── observations/    # 月维度 - 洞察记录
│       ├── .index.md    # 快速索引（脚本更新）
│       └── YYYY-MM.md
├── core/       # 永久核心记忆
├── staging/    # 临时记忆（30天）
├── transient/  # 短期记忆（7天）
└── archive/    # 归档记忆
```

---

*最后更新：2026-02-23 — 加入索引更新步骤，保持与 UPDATE_MEMORY 同步*
