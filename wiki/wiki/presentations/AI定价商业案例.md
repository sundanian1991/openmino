# AI定价商业案例

> Sources: Mino (AI), 2026-04-25
> Raw:[PPT169版 README](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-README.md); [PPT169版 design_spec](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-design_spec.md); [PPT169版 notes-total](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-total.md); [PPT169版 brainstorm源](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-00-brainstorm.md); [PPT169版 research源](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-01-research.md); [演讲脚本 workspace版](../../raw/workspace-other/AI定价模式PPT--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-AI定价模式PPT-AI产品定价模式演变_演讲脚本.md); [design-spec workspace版](../../raw/workspace-other/AI定价演变--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-AI定价演变-design-spec.md)

## 概述

AI定价商业案例是 Mino 知识库中最具商业深度的演示项目。该项目研究国内 AI 大模型厂商在 2024 Q4 至 2026-04 期间，定价模式从 Coding Plan 到 Token Plan 的演变逻辑，将其类比为电信行业 20 年话费套餐演进史的精简重演。

项目创建于 2026-04-25，由 2026-04-24 的头脑风暴研究驱动，经过 research 资料补充、design_spec 设计、15 页 PPT 生成和演讲脚本编写，形成了一套完整的商业分析交付物。最终产出包括 PPT169 版（15 页幻灯片）和演讲脚本版（25 页幻灯片），两个版本在内容深度和呈现方式上有显著差异。

## 核心商业判断

项目的核心结论在第二页就抛出：

> Coding Plan 是过渡产品，Token Plan 是终态。所有厂商最终都会转向按 Token 精细计量。谁先转谁主动，谁后转谁被动。

这个判断的依据是：Agent 框架（如 OpenClaw）的爆发使 Token 消耗指数级增长，一个 Agent 任务等于几十次模型调用，包月"不限量"模式在 Agent 时代不可持续。

## 四段式分析结构

PPT169 版本采用"事实→框架→洞察→预判"的四段式递进结构：

### Part 1: 发生了什么（事实层）

- **时间线**：2024 Q4 DeepSeek 带头降价 → 2025 Q4 智谱率先推出 Coding Plan → 2026 Q1 六大平台全部上线 → 2026-03 MiniMax 更名 Token Plan → 2026-04 阿里企业版上线，小米入局
- **定价对比**：同样 ¥40-50/月，各平台计量单位不同，直接比数字毫无意义。MiniMax Starter 29 元 = 40 prompts/5h，腾讯云 Lite 39 元 = 3500 万 Token ≈ 70 轮深度问答，阿里百炼 Lite 40 元 = 18000 API 请求/月
- **五种计量体系并存**：API 请求次数、Prompt 次数、Token 计量、Credit 计量、时间窗口配额。演变方向是从 API 次数 → Prompt → Token → 统一 Credits，方向越来越透明、越来越可预测

关键数据：在 Agent 场景下，只有 5-15% 的 Token 真正用于代码生成，85-95% 是上下文开销（文件读取 35-45%、工具输出 15-25%、上下文重发 15-20%）。

### Part 2: 为什么（框架层）

- **波特五力分析**：行业内竞争极高（七家同池价格战，首月 7.9 元起）、买方议价力强（切换成本几乎为零）、替代品威胁高（开源模型+本地部署）、供应商议价力中偏高（GPU 刚性成本但国产替代在降低依赖）、新进入者威胁中等（门槛高但小米仍在进入）
- **三层驱动**：成本驱动（国产芯片放量、MoE 架构效率革命）、竞争驱动（价格战→收紧→分层）、价值驱动（从卖 Token 到卖工作流到卖生态）
- **三段式节奏**：补贴期（2024-2025，百万 Token 几毛钱）→ 收紧期（2025 H2，取消优惠、停售低档）→ 分层期（2026，极速版 98-899 元、企业版 198-1398 元）

### Part 3: 洞察层（五条可复用模式）

1. **计量单位即定价权**：谁定义计量单位谁就掌握定价权，模糊计量利早期获客，透明计量利长期信任
2. **补贴-收紧-分层**：所有互联网赛道都走这三步，先跑量再测弹性最后精细分层
3. **入口到生态**：用编程高频刚需获客，用多媒体低频高价值场景提高 ARPU
4. **国内外差异**：国内七家抢用户比谁更便宜，海外面对 Claude 三巨头比谁更强
5. **Agent 时代成本不可逆增长**：70% 的 coding agent token 是浪费，实际账单是标价的 2-5 倍

### Part 4: 未来预判

- **趋势一**：Token 成本持续下降（国产芯片放量 + MoE 效率革命 + 推理芯片竞争）
- **趋势二**：国产芯片替代加速（英伟达市占率 66% → 54% → 预计跌破 50%，华为昇腾 950PR 4 月量产）
- **趋势三**：开源模型重塑定价权（DeepSeek 模式：开源 + 极致低价 + 不卖订阅，定价权来自服务便利性而非模型独占性）
- **趋势四**：Agent 成本指数增长不可逆（推理需求已达训练的 4-5 倍，IDC 预测 2028 年推理占 73%）

## 演讲脚本版（25 页）的扩展内容

相比 PPT169 版的 15 页，演讲脚本版扩展到 25 页，增加了以下深度内容：

### 芯片供给线分析

这是演讲脚本版独有的深度章节。详细分析了英伟达在中国的退缩（市占率从 66% 跌到 54%）和华为昇腾的崛起（2025 年交付 81.2 万片，950PR 算力是 H20 的 2.87 倍，价格只有三分之一）。伯恩斯坦预测国产芯片自给率从 2023 年 17% 到 2027 年 55%。

### DeepSeek V4 定价冲击

2026-04-24 刚发布的 DeepSeek V4：
- V4-Pro：1.6T 参数只激活 49B，输入 1 元/百万 Token，输出 24 元/百万
- V4-Flash：284B 参数只激活 13B，输入 0.2 元/百万，输出 2 元/百万
- 官方明确说"受限于高端算力，预计下半年昇腾 950 批量上市后价格大幅下调"

### IPO 与定价策略关联

智谱 GLM 和 MiniMax 都在 2026 年 1 月港交所上市：
- 智谱 IPO 市值 511 亿港元，Coding Plan 上线两个月付费开发者超 15 万，ARR 快速破亿
- MiniMax 成立到 IPO 仅 4 年，海外收入占 73%，毛利率转正 25.4%

上市公司必须证明商业可持续性，定价不能太激进也不能太保守。

### 跨越鸿沟挑战

Gartner 数据：90% 企业推进 AI 实验，仅 41% 成功落地生产环境。预计 2027 年 40% 的 Agentic AI 项目因无法证明 ROI 被终止。这是 Token Plan 企业版溢价的基础。

### 反模式分析

三个真实踩坑案例：
1. Cursor 退款风波（2025-06 突然从 request 改 credit-based，重度用户一周超支 350 美元）
2. 计量单位混乱（90% 用户踩坑）
3. 饥饿营销反噬（每天 10 点半抢购伤害品牌信任）

### 实操决策清单

五个关键决策点：定义计量单位、选择获客策略、设计分层结构、确定透明度、规划演进路径。

## 头脑风暴阶段的信息密度

项目的 `sources-00-brainstorm.md` 文件展现了极高的信息密度，覆盖了：
- 11 个关键时间节点的时间线
- 7 款模型进步时间线（含参数规模）
- 英伟达 vs 华为昇腾的芯片供给线对比
- DeepSeek V4 的详细定价表
- 智谱和 MiniMax 的 IPO 财务数据
- 跨越鸿沟的行业数据
- 4 个未来趋势预判
- 5 种计量体系并存对比表
- 7 家平台入门档套餐对比表
- 价格锚点矩阵（最低/Pro/特殊）
- 6 个核心 Themes 和 5 组 Tensions
- 3 个信息缺口（Gaps）

头脑风暴阶段还识别了三组核心张力：固定月费 vs 按量付费、低价抢市场 vs 可持续经营、计量透明 vs 信息不对称。

## 设计系统

PPT169 版采用了 "anthropic + General Consulting" 混合设计风格：

- **配色**：深色封面（`#1A1A2E`）+ 内容页白色（`#FFFFFF`）+ 橙色强调（`#D97757`）+ 蓝色流程（`#4A90D9`）+ 绿色成功（`#10B981`）+ 红色警告（`#EF4444`）
- **图表引用**：timeline、horizontal_bar_chart、grouped_bar_chart、matrix_2x2、process_flow、porter_five_forces、waterfall_chart、dumbbell_chart
- **字体**：微软雅黑/Arial，正文 18px 基线
- **布局模式**：单列居中、左-右 split 5:5、三列卡片、顶-底 split、矩阵网格

## 文件规模与产出

该项目在 presentations 目录下生成约 30+ 个文件，包括 15 页 notes（01_cover 到 15_ending + notes-total）、2 个 sources（brainstorm + research）、design_spec 及其模板。workspace-other 目录下另有演讲脚本版（25 页）和独立的 design-spec 文件。

两个版本的关系是：PPT169 版是精简版（15 页，约 20 分钟演讲），演讲脚本版是扩展版（25 页，约 25 分钟），后者增加了芯片供给线、DeepSeek V4、IPO 分析、跨越鸿沟、反模式、决策清单等深度内容。

## 项目的跨领域价值

AI 定价商业案例不仅是一份行业研究报告，更是一个可迁移的商业分析模板。其方法论适用于任何"算力即服务"的商业模式分析：
- 计量单位即定价权的规律可应用于云存储、API 服务、SaaS 产品
- 补贴-收紧-分层的三段式节奏是互联网定价的通用模式
- 从入口到生态的升级路径是平台型产品的共通战略
