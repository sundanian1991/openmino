---
name: brand-research-showcase
description: |
  品牌调研 → Showcase HTML 生成。输入品牌名，自动调研其设计系统，用 nian-design 或指定设计系统生成 showcase 级 HTML 页面。
  触发词：品牌调研、brand showcase、品牌设计系统、品牌视觉
---

# Brand Research → Showcase

> 调研一个品牌的设计系统，生成 showcase 级 HTML 页面。

---

## 输入

- **品牌名**（必填）：如 Nothing、Haglöfs、IKEA、Volvo 等
- **设计系统**（可选）：默认 nian-design，可指定 nothing-design 等
- **内容方向**（可选）：如"品牌展示"、"设计系统解析"、"产品设计理念"

---

## 工作流

### Step 1: 研究 — 派 2-3 个研究 Agent

并行派 Agent 搜索品牌设计信息：

| Agent | 搜索方向 | 返回格式 |
|-------|---------|---------|
| **品牌视觉** | `{品牌} design system`, `{品牌} brand identity visual` | URL + 标题 + 2-3 句设计风格摘要 |
| **设计系统** | `{品牌} design system guidelines`, `{品牌} UI components` | URL + 标题 + 设计系统核心要素 |
| **案例/Showcase** | `{品牌} showcase`, `{品牌} website redesign` | URL + 标题 + 页面结构分析 |

每个 Agent 的 prompt 模板：

```
Search for "{品牌} {方向关键词}" to understand their design system.
Find 2-3 relevant articles.

Return: URL, title, and a 2-3 sentence summary of the design approach.
Include: color palette, typography, grid/layout patterns, and unique visual elements.
```

### Step 2: 读取设计参考

根据选择的设计系统，读取对应 SKILL.md 和参考文件：

1. 读取 `{design-skill}/SKILL.md`（设计哲学、规则、组件清单）
2. 读取 `{design-skill}/references/tokens.md`（颜色/字体/间距变量）
3. 从 showcase 目录找一个风格最接近的 R 系列文件作为结构参考

### Step 3: 生成 Showcase HTML

读取研究结果 + 设计参考后，生成 HTML 页面：

**结构模板**（从 Step 2 的 showcase 参考提取）：

```
├── Hero Section（品牌名 + 核心理念）
├── Brand DNA（色板 + 字体 + 间距系统可视化）
├── Design Philosophy（3-5 条核心设计原则，图文并排）
├── Component Showcase（关键组件示例，用品牌风格渲染）
├── Typography Scale（字体层级可视化）
└── Footer（品牌签名 + 设计系统来源）
```

**输出要求**：
- 单个自包含 HTML 文件（所有 CSS 内联）
- 深色/浅色模式切换
- 响应式布局
- 遵循所选设计系统的 tokens 和规范

---

## 示例调用

```
/brand-research-showcase Nothing
/brand-research-showcase Haglöfs nothing-design
/brand-research-showcase IKEA nian-design "品牌民主化设计"
```

---

## 注意事项

- 研究 Agent 不需要读取本地文件，只做网页搜索
- 如果品牌有官方设计系统文档，优先引用
- 生成 HTML 前先确认用户是否需要特定内容方向
- 参考文件路径以实际项目 `.claude/skills/{skill-name}/` 为准
