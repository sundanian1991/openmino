# Spec — nothing-design Prompt 模板

## 7 元素

| 元素 | 内容 | 来源 |
|------|------|------|
| **上下文** | nothing-design 是一个 Nothing-Inspired UI/UX 设计技能，核心：瑞士排版、单色优先、三层视觉层级（Primary/Secondary/Tertiary）、严格的字体纪律（最多2族/3号/2重）、间距即语义（4-8-16-32-48-96）、反模式列表（禁止渐变/阴影/skeleton/emoji/toast）。输出平台：HTML（默认），含内联编辑器。模式：dark 或 light，技能会主动询问 | 年老师 / Mino |
| **目标** | 生成一份**可复用的 Prompt 模板**，年老师在任何对话中复制填空就能让 nothing-design 输出高质量设计。模板必须自带一个完整示例，标注哪些字段是必填/可选，并包含使用说明 | 年老师 |
| **思考方式** | 先提取 nothing-design 技能的输入敏感点（SKILL.md 中 WORKFLOW 部分明确说明的 8 步流程和触发条件），然后逆向推导"什么样的输入能触发技能的最佳表现"，总结为填空式模板结构。不强调"角色"，强调"信息结构" | Mino |
| **约束** | - 模板必须覆盖 4 个核心维度：用途+受众、数据+关键信息、信息优先级、平台<br>- 每个字段说明必填/可选<br>- 模板自带一个完整填写示例<br>- 不超出 nothing-design 的能力边界（不做渐变/阴影/emoji） | 年老师 |
| **交付物** | 一份可复用 Markdown Prompt 模板，附带使用说明和变量替换指南。存放位置：`plans/2026-05-26-nothing-design-prompt-template/prompt.md` | |
| **缺失处理** | 模式（dark/light）不指定 → 技能会主动询问；平台不指定 → 默认 HTML；优先级不指定 → 技能自动按"第一个数据最重要"推断 | Mino |
| **示例** | "做一个供应商季度KPI看板页，给管理组看。平台：HTML。数据...优先级..." 全流程展示 | Mino |

## Mino 补充上下文

- nothing-design 的工作流第 1 步是声明字体（Doto/Space Grotesk/Space Mono），第 2 步是询问模式
- 第 3 步是"Sketch hierarchy"——所以 prompt 中明确优先级是最重要的驱动信号
- 内联编辑器在任何 HTML 输出中自动注入（除非说"最终版"）
- 技能有 8 个 reference 文件（tokens/components/platform-mapping），但 SKILL.md 本身已经包含了足够的信息来构建 prompt

## Mino 建议

- 第一次交付模板后，引导年老师实际用一次，把效果反馈写回 result.md
- 后续这个模板可以同步到 `plans/templates/` 索引中，供年老师随时取用
