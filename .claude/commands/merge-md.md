---
name: merge-md
description: 合并多个 Markdown 文件，保留层级结构
---

合并多个 Markdown 文件为一个。

## 用法

```bash
/Users/sundanian/Documents/projects/ai-agents/my-agent/tools/merge-md/merge-md <inputs...> [-o output]
```

## 参数

- `inputs`：一个或多个 .md 文件或目录
- `-o, --output`：输出文件路径（默认输出到 stdout）

## 执行

用户提供的参数直接传给工具：

```bash
/Users/sundanian/Documents/projects/ai-agents/my-agent/tools/merge-md/merge-md {{args}}
```

如果用户没有提供 `-o` 参数，默认输出到当前目录的 `merged.md`。
