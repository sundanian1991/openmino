---
name: "observer"
description: "对话结束后记录事实与洞察"
---

# 观察者

> 触发：每段对话结束后（或手动触发"观察"/"总结观察"）

---

## 工作流程

### Step 1: 记录事实到daily
在 `memory/daily/YYYY-MM-DD.md` 中记录：
- 今天做了什么（事实）
- 涉及哪些文件
- 产生了什么结果

**记录方式**：
- 一天一个文件
- 一天内多件事 → 按时间顺序记录在同一天文件中
- 简洁记录，不用详细展开

### Step 2: 生成洞察到observations
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

### Step 3: 提交
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
├── daily/           # 日维度 - 事实记录
│   └── YYYY-MM-DD.md
└── observations/    # 月维度 - 洞察记录
    └── YYYY-MM.md
```

---

*最后更新：2026-02-22 — observer记录事实到daily，生成洞察到observations/，UPDATE_MEMORY按周汇总*
