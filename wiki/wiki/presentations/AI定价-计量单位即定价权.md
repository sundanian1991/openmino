# AI定价-计量单位即定价权

> Sources: mino, 2026-04-28
> Raw: [计量体系备注](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-06_measurement_systems.md); [定价对比备注](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-05_pricing_comparison.md); [三层驱动备注](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-09_three_layer_drivers.md); [Agent成本备注](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-notes-13_agent_cost.md); [头脑风暴源](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-sources-00-brainstorm.md)

## Overview

"计量单位即定价权"是AI定价项目五条核心洞察中的第一条，也是最基础的一条。谁定义计量单位谁就掌握定价权——这个规律适用于所有"算力即服务"的商业模式。本文章深入分析五种计量体系的并存现状、演变方向和对定价权的争夺逻辑。

## 五种计量体系并存

AI大模型市场目前存在五种计量体系，各自有不同的透明度水平和可预测性：

### API请求次数

数字看起来很大，但实际消耗不透明。18000次API请求听起来很多，但每次请求的参数规模差异巨大，无法预测实际消耗。

### Prompt次数

一次提问大约等于1200-1600次API调用，稍微直观一些。但Prompt的长度和复杂度差异也很大，短问题和长文档处理的消耗完全不同。

### Token计量

最透明的方式。直接按输入输出计费，每个Token的大小一致，可以精确预测消耗。但Agent场景下只有5-15%的Token真正用于代码生成，85-95%是上下文开销。

### Credit计量

抽象了一层但可预测。统一了不同操作的成本（如一次图片生成=X Credits），让用户有心理预期，但具体的换算比率不透明。

### 时间窗口配额

限制的是节奏而不是总量。40 prompts每5小时，不是限制总数，是限制使用速度。

## 演变方向

从API次数→Prompt→Token→统一Credits，方向是越来越透明、越来越可预测。这个演变反映了用户对透明度的需求在增长，厂商不得不回应。

但"透明"不等于"公平"。Token计量虽然最透明，但在Agent场景下，85-95%的Token消耗是上下文开销（文件读取35-45%、工具输出15-25%、上下文重发15-20%），真正用于代码生成的只有5-15%。这意味着用户按最透明的方式付费，但为的是大量"非代码生成"的消耗买单。

## 定价权的争夺逻辑

**定义计量单位 = 定义比较基准**。当所有厂商都用不同的计量单位时，用户无法直接比价。这正是厂商想要的——模糊计量有利于早期获客，因为用户"看起来都很便宜"。

**透明计量 = 长期信任**。当市场成熟后，用户需要透明计量来做出理性决策。不转向透明计量的厂商会被淘汰。

**Agent时代的挑战**：Agent框架使Token消耗指数级增长，一个Agent任务等于几十次模型调用。包月"不限量"模式不可持续。Cursor从request改credit-based引发退款风波（重度用户一周超支350美元），说明从模糊到透明的转换是痛苦的。

## 可迁移规律

这个规律可以迁移到其他"算力即服务"领域：
- 云存储：按GB vs 按请求 vs 按带宽
- API服务：按调用次数 vs 按数据量 vs 按QPS
- SaaS产品：按用户 vs 按功能 vs 按使用量

核心原则不变：谁定义计量单位谁掌握定价权。进入新市场时，先用模糊计量获客，再用透明计量建立信任。
