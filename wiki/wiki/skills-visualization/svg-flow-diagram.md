# SVG Flow Diagram — 手绘风格流程图

> Sources: mino, 2026-04-28
> Raw: ../../raw/skills/svg-flow-diagram-SKILL.md; ../../raw/skills/svg-flow-diagram-README.md; ../../raw/skills/svg-flow-diagram-style-guide.md; ../../raw/skills/svg-flow-diagram-svg-recipes.md

## Overview

SVG Flow Diagram 专门用于创建独立的 SVG 流程图、过程图、架构图和管道图。视觉语言基于 Excalidraw 风格的手绘美学，特色是虚线动画流线和温暖纸质背景。与 diagram-design 不同，这个技能专注于纯 .svg 输出（非 HTML），适用于需要嵌入文档、幻灯片或网页的场景。

## 核心视觉语言

### 手绘美学

- 温暖纸质背景，深色墨水轮廓，克制的柔和色调填充
- 双描边节点模拟手绘盒子
- 优先使用圆角矩形、胶囊和软菱形，而非尖锐的企业风格方框
- 单条虚线动画连接器表示每个关系，不添加管道轨道或连接器底板

### 流线设计

- 连接器厚度与节点大小成比例，避免粗管道淹没小节点
- 优先柔和曲线或圆角正交运动，避免生硬的直角意面式布线
- 边缘笔记胶囊偏移连接器，留有可见的呼吸空间
- 将边缘注记放在曲线更干净的一侧，确保注记胶囊与连接器永不交叉

## 工作流

### 1. 定义流程语法

绘制前必须列出：主要流方向（左到右、上到下或循环）、一个主导故事（执行流、系统清单或责任地图）、节点类型（步骤、决策、数据、外部系统、注释）、关系类型（主管道、可选分支、反馈循环、异步信号）、强调重点。

默认为 4-8 个节点、一个主路径、最多两个次要分支。如果请求同时混合了系统清单和执行流，拆分为两个图表。

### 2. 规划减缩步骤

超过 4 个节点的图表必须先进行规划减缩：

```
primary_path: node-a -> node-b -> node-c -> node-d
secondary_branches:
- node-b -> helper-x
feedback_loops:
- tool-y -> node-b
layout_model: columns-by-phase | rows-by-swimlane
lanes_or_phases: input, agent, execution, external, output
```

### 3. 实现路径选择

**使用脚本的情况**：从头创建新图表、多次迭代布局、4 个以上节点、需要一致的动画管道。渲染器从 JSON spec 生成 SVG，支持同时输出原始 SVG、扁平化 SVG（用于 PNG 导出）和 PNG 预览。

**直接编辑 SVG 的情况**：仅修改标签或文案、调整一两个连接器、集成到现有手工制作的 SVG 中。

## 流程清晰度规则

- 用最直接的路径、最强的对比度和最少的转弯来突出一个主路径
- 用更轻的颜色、更细的视觉强调来降级支持和查找路径
- 反馈回路沿外周边缘路由，不穿过主脊柱中间
- 外部系统放在画布远端，使其读作目标或依赖项，而非核心步骤
- 边缘标签写为动词短语（如 `load context`、`run command`），避免主题标签
- 每个图表只使用一种结构模型：按阶段分列或按泳分行。不混合作为主要组织线索

## 运动编码方向

对于每条主要边缘：绘制约 4-6px 粗的虚线连接器，对该虚线笔划动画化 `stroke-dashoffset`，保持箭头头小且次要于虚线运动，不绘制暗色背景轨道、幽灵轨道或填充管道。运动应足够微妙，以至于动画暂停时图表仍然可读。静态箭头头仅作为后备线索，不是唯一的方向信号。

## 最终交付清单

- 节点间保持 24-40px 呼吸空间
- 边缘标签距连接器中心线 18-28px
- 边缘标签在背景胶囊内保持水平和垂直居中
- 连接节点块之间的间隙大于对应边缘标签宽度的 2 倍
- 边缘通过节点之间的空白走廊路由
- 节点标签/标题文本保持在节点边界内（通过换行、截断或减小字号）
- 标题/副标题头部区域与第一行节点分开
- 文本保持 14px 或以上
- SVG 独立，无外部 JavaScript
- 需要发送或预览时，同时保留原始 SVG 并导出 PNG

## 清晰度自检

- 读者能否在 5 秒内追踪主路径而不阅读每个注记？如果不能，简化
- 每条非主要边缘是否合理？如果不，删除
- 任何反馈回路是否穿过图表中心？如果是，重新路由到周边
- 图表是否试图同时解释架构和时间流？如果是，拆分输出
- 颜色和笔画粗细是否在所有边缘上编码稳定含义？如果不是，导出前标准化

## JSON Spec 格式

支持的顶层字段：`width`、`height`、`title`、`subtitle`、`direction`（优先 lr）、`layoutModel`（columns 或 swimlanes）、`theme`、`groups`、`nodes`、`edges`。

节点字段：`id`、`label`、`caption`、`x`、`y`、`w`、`h`、`lane/phase`、`column`、`role`（entry/core/support/decision/external/exit）、`tone`（sand/mint/sky/coral/amber/graphite）、`shape`（rect/pill/diamond）。

边缘字段：`from`、`to`、`label`、`kind`（primary/secondary/feedback/async）、`tone`、`fromSide`、`toSide`、`duration`。

始终先决定节点 role 再选择 tone 或 shape。让 role 驱动强调，而不是反过来。

## Guardrails

- 除非用户明确要求，否则不切换到 Mermaid、HTML、Canvas 或 Figma
- 不导入外部字体、库或 JavaScript
- 不使用光泽渐变、玻璃拟态或重阴影
- 不在小画布上挤入太多节点——扩展画布或拆分图表
- 不使用运动作为传达意义的唯一方式
- 不绘制连接器轨道或底板
- 不将边缘标签放在连接器上或其他连接器交叉的地方
- 不允许边缘与非端点节点重叠
