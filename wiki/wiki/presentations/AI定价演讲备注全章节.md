# AI定价演讲备注全章节深度解析

> Sources: mino, 2026-04-28
> Raw:[notes-01_cover](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-01_cover.md); [notes-02_toc](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-02_toc.md); [notes-03_chapter_01](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-03_chapter_01.md); [notes-04_timeline](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-04_timeline.md); [notes-05_pricing_comparison](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-05_pricing_comparison.md); [notes-06_measurement_systems](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-06_measurement_systems.md); [notes-07_chapter_02](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-07_chapter_02.md); [notes-08_five_forces](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-08_five_forces.md); [notes-09_three_layer_drivers](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-09_three_layer_drivers.md); [notes-10_three_phase_rhythm](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-10_three_phase_rhythm.md); [notes-11_chapter_03](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-11_chapter_03.md); [notes-12_five_insights](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-12_five_insights.md); [notes-13_agent_cost](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-13_agent_cost.md); [notes-14_future_trends](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-14_future_trends.md); [notes-15_ending](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-15_ending.md); [templates-design_spec](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-templates-design_spec.md)

## 概述

AI定价项目的15页PPT169版本包含15个独立的演讲备注文件，每个文件对应一页幻灯片，标注了演讲时长、核心要点和过渡话术。这些备注构成了约20分钟演讲的完整脚本。本文章逐一解析每个章节的内容和逻辑，与已有的[AI定价商业案例](AI定价商业案例.md)（总览性质）形成互补——那篇聚焦宏观框架，本篇聚焦逐页内容和演讲节奏。

## 开场与引入（P01-P02）

### P01：封面

封面备注仅标注"0.5分钟"，无额外内容。直接进入正题，没有多余的寒暄或铺垫。这与整个演讲的风格一致——开门见山，用事实和数据建立可信度。

### P02：目录

标注"0.5分钟"，简要介绍四段式结构：发生了什么（事实层）→ 为什么（框架层）→ 核心洞察（可复用模式）→ 未来预判。让听众提前建立认知框架，知道"我们要去哪"。

## Part 1：发生了什么（P03-P06）

### P03：第一章引入 — 时间线

用时0.5分钟。要点是展示2024Q4到2026-04的时间跨度，强调七阶段快速演进。这是事实层的起点，用时间跨度制造"这么快"的冲击感。

### P04：时间线详解

展开具体的时间节点，包括DeepSeek带头降价、智谱率先推出Coding Plan、六大平台全部上线、MiniMax更名Token Plan、阿里企业版上线、小米入局等关键事件。每个节点都有日期和数据支撑，不是泛泛而谈。

### P05：定价对比分析

用时2分钟。核心要点是"计量单位不同不能直接比数字"。对比了各平台同样价位下的实际供给：MiniMax Starter 29元=40 prompts/5h，腾讯云Lite 39元=3500万Token≈70轮深度问答，小米39元=6000万Credits，阿里百炼40元=18000次API请求。关键提醒：90%的开发者容易踩坑。

### P06：五种计量体系

用时2分钟。详细解析五种计量方式的特点：API请求次数（数字大但不透明）、Prompt次数（一次提问≈1200-1600次API调用）、Token计量（最透明）、Credit计量（抽象但可预测）、时间窗口配额（限制节奏而非总量）。演变方向清晰：从API次数→Prompt→Token→统一Credits。同时揭示Agent场景下的真实消耗：85-95%的Token是上下文开销，只有5-15%真正用于代码生成。

## Part 2：为什么（P07-P10）

### P07：第二章引入 — 框架分析

过渡到框架层，1.5分钟。从"发生了什么"转向"为什么会这样"，引导听众进入分析视角。

### P08：波特五力分析

用时2分钟。逐项分析竞争格局：行业内竞争极高（七家同池价格战，首月7.9元起）、买方议价力强（切换成本几乎为零）、替代品威胁高（开源模型+本地部署）、供应商议价力中偏高（GPU刚性成本但国产替代在降低依赖）、新进入者威胁中等。核心判断：买方强势，定价权争夺白热化。

### P09：三层驱动模型

用时1.5分钟。成本驱动（国产芯片放量、MoE架构效率革命）+ 竞争驱动（价格战→收紧→分层）+ 价值驱动（从卖Token到卖工作流再到卖生态）。MiniMax的Token Plan不只卖编程，还打包了图片、语音、音乐、视频。

### P10：三段式定价节奏

用时2分钟。互联网定价的经典路径：补贴期（2024-2025，百万Token几毛钱）→ 收紧期（2025H2，取消优惠、停售低档、限时抢购）→ 分层期（2026，极速版98-899元、企业版198-1398元）。关键启示：进入新市场不要一开始就想好定价，先跑量再测弹性最后精细分层。

## Part 3：洞察层（P11-P13）

### P11：第三章引入

过渡到洞察层，提取五条可复用的商业规律。

### P12：五条核心洞察

每条都配有数据支撑和可迁移价值：

1. **计量单位即定价权**：谁定义计量单位谁掌握定价权，模糊计量利早期获客，透明计量利长期信任
2. **补贴-收紧-分层**：所有互联网赛道通用，先进入者有先发优势
3. **入口到生态**：编程高频刚需获客，多媒体低频高价值场景提高ARPU
4. **国内外差异**：国内七家比谁更便宜，海外面对Claude三巨头比谁更强
5. **Agent时代成本不可逆增长**：70%的coding agent token是浪费，实际账单是标价2-5倍

### P13：Agent成本结构深入

用时2.5分钟。具体数据：一个开发者8个月Claude Code消耗100亿Token，API价格超15000美元，但Max plan只要800美元（节省93%）。Token构成：文件读取35-45%、工具输出15-25%、上下文重发15-20%、推理10-15%。Cursor的credit-based转型引发退款风波，重度用户一周超支350美元。核心要点：订阅模式不可持续。

## Part 4：未来预判（P14-P15）

### P14：四趋势预判

用时3分钟，是单页用时最长的章节。四个趋势预判：

1. Token成本持续下降：国产芯片放量、MoE效率革命、推理芯片竞争三股力量
2. 国产芯片替代加速：英伟达市占率66%→54%→预计跌破50%，华为/寒武纪/平头哥形成国产算力三角
3. 开源模型重塑定价权：DeepSeek模式（开源+极致低价+不卖订阅）
4. Agent成本指数增长不可逆：推理需求已达训练的4-5倍，IDC预测2028年推理占73%

核心结论：Coding Plan是过渡产品，Token Plan是终态。三个核心学到——计量单位即定价权、补贴-收紧-分层节奏、入口到生态升级路径。

### P15：结尾

收束全篇，回应开篇的核心命题，给听众留下可行动的insight。

## 演讲节奏分析

15页总计约20分钟，各页用时分布如下：

| 页面 | 内容 | 时长 |
|------|------|------|
| P01 | 封面 | 0.5min |
| P02 | 目录 | 0.5min |
| P03 | 时间线引入 | 0.5min |
| P04 | 时间线详解 | 1.5min |
| P05 | 定价对比 | 2.0min |
| P06 | 计量体系 | 2.0min |
| P07 | 框架引入 | 1.5min |
| P08 | 五力分析 | 2.0min |
| P09 | 三层驱动 | 1.5min |
| P10 | 三段式节奏 | 2.0min |
| P11 | 洞察引入 | 1.0min |
| P12 | 五条洞察 | 2.0min |
| P13 | Agent成本 | 2.5min |
| P14 | 四趋势 | 3.0min |
| P15 | 结尾 | 0.5min |

**节奏特点**：
- 引入页短（0.5-1min），实质页长（2-3min）
- Part 1事实层节奏快（多用数据冲击），Part 2框架层中等（需要思考），Part 3-4洞察和预判最慢（需要消化）
- P14是全篇最长页（3分钟），承载最重的结论

## 与notes-total的关系

notes-total是15个独立notes的合并版本，用于一次性读取全部内容。独立notes的优势在于：每页可以单独引用和索引，与其他wiki文章的交叉引用更精准。这也是为什么本项目为每个章节都保留了独立文件。
