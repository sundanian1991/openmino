# AI 产品定价模式演变 — 从 Coding Plan 到 Token Plan

> Sources: mino, 2026-04-28
> Raw: ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-README.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-design_spec.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-01_cover.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-02_toc.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-03_chapter_01.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-04_timeline.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-05_pricing_comparison.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-06_measurement_systems.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-07_chapter_02.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-08_five_forces.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-09_three_layer_drivers.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-10_three_phase_rhythm.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-11_chapter_03.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-12_five_insights.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-13_agent_cost.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-14_future_trends.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-15_ending.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-total.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-00-brainstorm.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-01-research.md; ../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-templates-design_spec.md

## 概述

《AI 产品定价模式演变：从 Coding Plan 到 Token Plan》是一份 14 页的商业分析演示文稿，采用 anthropic 模板 + 通用咨询风格。核心论点是：国内 AI 大模型定价模式在不到两年时间里走完了电信行业 20 年的演进路径，商业模式正在从"卖工具使用权"升级为"卖算力资源包"。

## 项目信息

| 属性 | 值 |
|------|-----|
| 格式 | PPT 16:9 (1280x720) |
| 页数 | 14 页 |
| 设计风格 | anthropic + General Consulting |
| 目标受众 | 科技行业从业者 / 产品经理 / 商业分析人员 |
| 用途 | 内部分享 / 行业交流 / 知识沉淀 |
| 创建日期 | 2026-04-25 |

## 视觉主题

### 配色方案

| 角色 | HEX | 用途 |
|------|-----|------|
| 深色背景 | #1A1A2E | 封面/章节页深色背景 |
| 页面背景 | #FFFFFF | 内容页白色背景 |
| 卡片背景 | #F8FAFC | 卡片背景色 |
| 主色（橙） | #D97757 | 标题强调、关键数据、装饰元素 |
| 辅助色（蓝） | #4A90D9 | 流程图、趋势线、链接 |
| 强调色（绿） | #10B981 | 正面指标、推荐、成功状态 |
| 警告色（红） | #EF4444 | 风险、警告、收紧信号 |
| 正文深色 | #1A1A2E | 正文文字 |
| 次要文字 | #64748B | 图例、标注 |

### 渐变方案

封面和章节页使用深色背景渐变：从 #1A1A2E 到更深的 #16162A，营造科技前沿感。

## 15 页内容结构

### 第一章：定价模式演变（页 1-6）

1. **封面** — AI 产品定价模式演变：从 Coding Plan 到 Token Plan
   - 核心论点：电信 20 年历史重演，计量单位即定价权

2. **目录** — 三章结构概览

3. **章节页：第一章** — 定价模式的演变路径

4. **时间线** — 电信行业 20 年定价演进史重演
   - 从固定月租 → 按时长计费 → 按流量计费 → 资源包模式

5. **价格对比** — 同样花 40-50 元各平台给什么
   - MiniMax Starter 29 元 = 40 prompts/5h
   - 腾讯云 39 元 = 3500 万 Token ≈ 70 轮深度问答
   - 小米 39 元 = 6000 万 Credits
   - 阿里百炼 40 元 = 18000 次 API 请求
   - Kimi/智谱 49 元
   - **关键洞察**：计量单位不同不能直接比数字，90% 开发者容易踩坑

6. **计量体系** — Prompt/Token/Credits/次数的换算逻辑

### 第二章：定价背后的商业逻辑（页 7-10）

7. **章节页：第二章** — 定价背后的商业逻辑

8. **波特五力分析** — AI 定价的竞争格局

9. **三层驱动力** — 成本结构 + 竞争策略 + 用户分层

10. **三阶段节奏** — 补贴 → 收紧 → 分层
    - 第一阶段（2024-2025）：补贴期，抢用户规模建习惯
    - 第二阶段（2025 下半年）：收紧期，取消优惠、测试价格弹性
    - 第三阶段（2026）：分层期，极速版 98-899 元，企业版 198-1398 元

### 第三章：未来展望与启示（页 11-14）

11. **章节页：第三章** — 未来展望与启示

12. **五大洞察** — 核心结论总结

13. **Agent 成本分析** — AI Agent 的经济账

14. **未来趋势** — AI 定价的下一步

15. **结尾** — 感谢与联系方式

## 核心商业洞察

### 计量单位即定价权

定价模式的核心不是价格本身，而是**计量单位**。谁定义了计量单位，谁就掌握了定价权。从 Prompt → Token → Credits → API 次数的演变，本质上是定价权的争夺。

### 互联网定价三段式

**补贴 → 收紧 → 分层**，这是所有互联网赛道的通用路径：
- 先进入者有先发优势，可以先定义计量单位
- 后进者只能在既定框架内竞争
- 关键启示：进入新市场不要一开始就想好定价，先补贴跑量，再收紧测试弹性，最后精细分层

### 五大核心洞察

1. 电信 20 年历史重演 — 路径高度相似
2. 计量单位即定价权 — 谁定义谁掌握主动权
3. 三层驱动 — 成本/竞争/用户分层同时作用
4. 三阶段节奏 — 所有赛道的通用路径
5. Agent 时代即将来临 — 计量单位将进一步进化

## 演讲者备注特点

每页备注包含过渡语、关键数据、要点摘要和建议时长。例如：

> "大家好，今天我们来看一个正在发生的商业故事——国内 AI 大模型定价模式在不到两年的时间里，走完了电信行业 20 年的演进路径。"

数据页面标注了精确的对比数据和建议朗读方式，如"看起来百炼的 18000 次比 MiniMax 的 40 次多了几百倍，但这是不同计量单位，直接比数字毫无意义。"
