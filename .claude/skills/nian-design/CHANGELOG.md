## 6. EVOLUTION — 演进日志

| 日期 | 发现 | 调整 |
|------|------|------|
| 2026-06-01 | SKILL.md 初始化，7 步工作流 | 建档 |
| 2026-06-07 | 流程过重：A/B/C 三层嵌套 + 旋钮 + 公式 + 15 个参考文件，90% token 花在读文件而非设计 | 重构为 6 步平坦工作流；SKILL.md 自含 Philosophy+Craft Rules；Philosophy+R 系列+模板优先；文件改为搜索式使用；废弃 decision-path.md（旋钮+公式）；recipe-book.md 重写为纯表格 |
| 2026-06-07 | Step 0 缺内容补充/表达形式分支；Showcase 使用方式不明确（直接复制 vs 分析结构再创作） | Step 0 增加三问（类型+表达形式+载体）；Step 2.5 增加 Showcase 分析卡（容器结构+组件清单+适配方向）；明确 Showcase 是起点不是终点；模板+结构调整代替复制替换 |
| 2026-06-07 | 旋钮 F/D/BV 抽象、视觉身份公式、轮转机制——它们增加的是"科学复杂度"不是"设计质量" | 全部移除。场景→Hero 锁定直接查 recipe-book 表格，不做公式计算。角色卡改为确认单，不是推理工具。 |
| 2026-06-07 | 满意产出来自直接套 showcase，不是来自抽象组件选型 | 模板优先：新建 scene-*.md（场景布局+组件偏好）+ templates/（HTML 骨架）。Step 3-4 从 showcase+模板开始，不走抽象决策。 |
| 2026-06-07 | 复刻 Nothing 的 SABC 页面时，chart3 用了 bar 而非 scatter+baseline、chart4 用了 stacked bar 而非 heatmap。根因：分析卡不分析图表，AI 自己猜类型 | Step 2.5 新增「图表清单」模块（类型/编码/标注/排序必须逐图记录）；加入硬规则"图表类型必须从 showcase 源代码读取，不允许猜" |
| 2026-06-07 | Nian 产出不稳定——AI 每次从零组装 section 结构，导致"碰运气"。Guizang 稳定交付的核心：页面级可粘贴骨架 + 版式锁定 + 微观硬规则 | 新增 `references/layouts.md`（12 种 N01-N12 页面骨架，完整 HTML 代码块）；新增 `scripts/validate-nian-deck.mjs`（自动化校验）；Step 3 重写为"选骨架+填内容"；增加版式锁定规则（data-layout 必填，不允许发明新骨架）；checklist 补充 P0 微观硬规则 |
| 2026-06-07 | 12 种骨架不够——Guizang 32 种布局去重后有 21 种独特结构。需要对标提取而非凭空推演 | layouts.md 从 12 种扩展到 27 种（S01-S27），从 Guizang 32 种去重提取 + nian 设计语言重写。覆盖叙事(10)/扩展(7)/进阶(10)。校验脚本/recipe-book/checklist 同步更新到 S27 |
| 2026-06-08 | 14 色系统维护成本高，Nature/Signal 配对增加了不必要的复杂度；7 步工作流太重，大部分步骤是填表而非设计 | 颜色系统替换为 7 色 Brand DNA（darkgray/olive/earth + yellow/orange + glacier/rock），80/10/10 比例原则。删除 Nature→Signal 固定配对、Showcase 分析卡、节奏规划表、角色卡确认单。工作流精简为 3 步：理解→找参考→产出 |
| 2026-06-09 | 三个断裂点：骨架编号 SKILL.md(S01-S27) vs layouts.md(S01-S21+S28) 不统一；组件代码获取路径断了（catalog 没代码，components/ 没被引用）；showcase→产出的质感转化缺失。§5 引用 6 个已删文件 | 骨架统一为 S01-S28（28 种），template.html 注释 N 系列改为 S 系列并补全 S22-S28。§5 重写：删 6 个幽灵引用，补上 components/ 11 个代码文件的索引。Step 2 加入"6 质感锚点"（字号对比/ghost 水印/底色节奏/1px 边框/Mono 标签/深色收尾），读 showcase 时提取，产出时自检 |
| 2026-06-11 | 规则驱动的查表逻辑切断了 showcase 的参考价值——模型按规则选骨架（"有数据→S05"），不从 showcase 学组合判断。工程化手段守下限但上限不高。向 Peg Design System 学习：模板优先、规范自文档化、Token CSS 化 | **Token CSS 化**：新增 `tokens/colors.css`、`tokens/typography.css`、`tokens/spacing.css`，模型直接引用 CSS 变量不查表。**Guideline Card**：新增 `guidelines/` 目录下 8 个可渲染 HTML card（colors-base/colors-semantic/type-scale/type-roles/ghost-watermark/border-system/spacing-rhythm/hero-types/anti-patterns/content-types），规范可视化。**SKILL.md 精简**：从 8.6KB 精简到 ~3KB，砍掉骨架选择规则、组件映射表、背景色节奏规则，Step 2 改为"从 showcase 复制，替换文案"。**Showcase 注释**：给 7 个核心 showcase 加 `@showcase` 设计判断注释（scene/hero/palette/skeleton/judgment/rejected/combination） |

---

*最后更新：2026-06-11 — Peg 学习重构：Token CSS 化 + Guideline Card + SKILL.md 精简 + 模板优先工作流*
