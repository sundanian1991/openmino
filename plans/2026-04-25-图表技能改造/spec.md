---
date: 2026-04-25
type: spec
---

# 最终版 Spec

1. 背景目标：
   改造/合并现有图表可视化技能，使其不仅能生成图表，还能先做数据分析再出图。
   当前有 chart-visualization（Node.js，26 种通用图）和 echarts-visualization（ECharts，27 种交互图）
   两个技能，功能互补不重复。需决定：合并为一个，还是各自增强。

2. 交付物：
   改造后的两个 SKILL.md + 可复用 Prompt 模板。

3. 目标受众：
   年老师一人使用。

4. 时间要求：
   2026-04-25。

5. 场景平台：
   - 报告文档（HTML 嵌入）
   - 看板展示（HTML 交互）
   - PPT 粘贴（SVG/PNG 导出）
   PPT 场景少，主力是 HTML 和看板。

6. 风格要求：
   - 主题色：红 #C13531、深蓝 #293C54、纯灰 #CDCECD
   - 克制配色，不花哨
   - 图表要简洁、重点突出、对比明确
   - 现有 echarts-visualization 的 default/binary 主题已用这三色，可作为基础

7. 体量范围：
   覆盖所有常见图表类型，但核心不是"种类多"而是"用得准"。

8. Mino 补充上下文：
   - chart-visualization 和 echarts-visualization 覆盖 40+ 图表类型，互补无冗余
   - echarts-visualization 已有完整主题系统（5 套），default 和 binary 主题已经是红+深蓝+灰
   - chart-visualization 独有的图表类型（鱼骨图、思维导图、维恩图、电子表格）echarts 不原生支持
   - echarts-visualization 的输出天然是 HTML（交互式），也支持 SVG/PNG 导出，最适合多场景
   - 建议以 echarts-visualization 为主干，chart-visualization 的独有类型作为补充

9. Mino 建议：
   - 不建议"合并"成一个，而是明确分工：echarts-visualization 做主引擎（数据→ECharts 分析图），chart-visualization 做特殊图补充
   - "主动分析数据"拆成两步：① 技能先读数据，给出分析建议（趋势/对比/占比/分布/相关性）→ ② 年老师确认维度 → ③ 出图
   - 这样既保留了人的判断力，又让 AI 提供专业视角

10. 其他约束：
    generate.js 不修改（纯渲染层），分析能力纯在 SKILL.md 的 AI 工作流实现。
