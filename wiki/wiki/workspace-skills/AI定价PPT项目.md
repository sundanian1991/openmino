# AI定价PPT项目

> Sources: AI产品定价模式演变商业案例研究 (2026-04-24~2026-04-25); PPT169 版演示文稿; 演讲脚本版, 2026-04-28
> Raw:[PPT169版 README](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-README.md); [PPT169版 design_spec](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-design_spec.md); [PPT169版 notes-total](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-total.md); [brainstorm源](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-00-brainstorm.md); [research源](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-01-research.md); [演讲脚本版](../../raw/presentations/projects-liang-junrui-mysterious-island-v2_ppt169_20260411-README.md); [模板设计](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-templates-design_spec.md)

## 概述

AI定价PPT项目是将 AI 定价研究成果转化为可演示、可传播的商业案例演示文稿。该项目在 2026-04-24 至 2026-04-25 期间完成，经过头脑风暴、深度研究、设计规格、PPT 生成、演讲脚本编写等完整工作流，最终产出两个版本的演示文稿：PPT169 版（15 页精简版）和演讲脚本版（25 页扩展版）。

---

## 一、PPT169 版（15 页精简版）

### 四段式结构

**Part 1: 发生了什么（事实层，约 4 页）**
- 封面页：以 "¥0.000002/token" 作为关键数字切入
- 时间线页：从 2024 Q4 DeepSeek 带头降价到 2026-04 阿里企业版上线
- 定价对比页：同样 ¥40-50/月，各平台计量单位完全不同
- 计量体系页：五种计量方式（API 请求、Prompt、Token、Credit、时间窗口）

**Part 2: 为什么（框架层，约 4 页）**
- 波特五力分析：行业内竞争极高、买方议价力强、替代品威胁高
- 三层驱动：成本驱动（国产芯片+MoE）、竞争驱动（价格战→分层）、价值驱动（工作流→生态）
- 三段式节奏：补贴期→收紧期→分层期
- Agent 成本不可逆增长：70% coding agent token 是浪费

**Part 3: 洞察层（约 4 页）**
- 计量单位即定价权
- 补贴-收紧-分层的通用模式
- 入口到生态的升级路径
- 国内外市场差异

**Part 4: 未来预判（约 3 页）**
- Token 成本持续下降
- 国产芯片替代加速
- 开源模型重塑定价权
- Agent 成本指数增长

### 设计风格
- Anthropic + General Consulting 混合风格
- 深色封面（#1A1A2E）+ 内容页白色 + 橙色强调（#D97757）
- 字体：微软雅黑/Arial，正文 18px
- 图表：timeline、horizontal_bar_chart、grouped_bar_chart、matrix_2x2、process_flow、porter_five_forces

---

## 二、演讲脚本版（25 页扩展版）

相比 PPT169 版增加的内容：
- **芯片供给线分析**：英伟达市占率 66% → 54%，华为昇腾 950PR 算力是 H20 的 2.87 倍
- **DeepSeek V4 定价冲击**：V4-Pro/Flash 详细定价表
- **IPO 与定价策略关联**：智谱市值 511 亿港元，MiniMax 海外收入占 73%
- **跨越鸿沟挑战**：90% 企业推进 AI 实验，仅 41% 成功落地
- **反模式分析**：Cursor 退款风波、计量单位混乱、饥饿营销反噬
- **实操决策清单**：五个关键决策点

---

## 三、制作工具链

该项目使用了多种 PPT 生成工具和技能：
- **PPT169**：专门用于生成 16:9 幻灯片的设计规格系统
- **presentation-skill**：演讲脚本 + PPT 一键生成器
- **html-ppt-skill**：HTML PPT Studio，生成静态 HTML 翻页幻灯片
- **kw-workflow**：一键完整知识工作流（brainstorm → research → design → deliver）

文件规模：PPT169 版在 presentations 目录下生成约 30+ 个文件，包括 15 页 notes、2 个 sources、design_spec 及其模板。演讲脚本版另有独立文件和 notes。

---

## 四、与 ppt-master 的关系

workspace-skills 目录下有 87 个 ppt-master 相关文件，这是另一套 SVG 内容生成系统（30M，7015 文件）。ppt-master 与 PPT169 是不同的技术路线：
- **ppt-master**：基于 SVG 的内容生成系统，侧重图形和视觉
- **PPT169**：基于 HTML/CSS 的幻灯片系统，侧重文本和信息架构

两者服务于不同的演示场景，但在 Mino 技能体系中都是重要的 PPT 生成能力。

---

## 五、项目的方法论价值

AI定价PPT项目不仅是商业案例，更是知识工作流的完整示范：

1. **从研究到交付的端到端流程**：brainstorm → research → decisions → storyboard → design_spec → PPT → 演讲脚本
2. **双版本策略**：精简版（20 分钟）用于快速汇报，扩展版（25 分钟）用于深度讨论
3. **设计系统复用**：Anthropic + Consulting 风格可迁移到其他商业案例
4. **数据密度控制**：15 页内容密度高但可读性好，靠图表+关键数字支撑
