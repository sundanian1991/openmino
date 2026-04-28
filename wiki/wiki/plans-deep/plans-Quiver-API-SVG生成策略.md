# Quiver-API高质量SVG生成策略：配额约束下的视觉生产力

> Sources: mino, 2026-04-04
> Raw:[brainstorm](../../raw/plans/2026-04-04-Quiver-API高质量使用策略-00-brainstorm.md); [research](../../raw/plans/2026-04-04-Quiver-API高质量使用策略-01-research.md)

## 概述

2026年4月4日，年老师对Quiver API（arrow-preview模型）的SVG生成能力进行了系统性策略研究。核心约束是每周仅20次请求配额，目标是在有限配额下生成东京猫/李诞虾级别的高质量手绘风格SVG。研究涵盖了API核心能力分析、高质量Prompt构成要素、references参数使用技巧、配额分配策略，以及针对权责不对等研究内容的5个可视化场景的具体生成方案。

---

## 一、API核心能力分析

### 1.1 模型能力

**模型**：arrow-preview — Quiver旗舰SVG生成模型

**输入参数**：
- prompt（必需）— 主要文本描述
- instructions（可选）— 风格/格式指导
- references（可选）— 参考图数组（最多4张）
- n — 生成数量（1-16）

**采样参数**：
- temperature（0-2，默认1）— 越低越确定
- top_p（0-1，默认1）— nucleus sampling
- presence_penalty（-2到2，默认0）— 惩罚重复

**输出**：SVG代码（直接可用），支持streaming

### 1.2 关键假设待验证

| 假设 | 验证方法 | 风险 |
|------|---------|------|
| references接受URL还是base64？ | 测试两种格式 | 可能只接受一种 |
| n>1时是重复还是变体？ | 生成后对比 | 可能浪费配额 |
| instructions对中文prompt支持如何？ | 测试中英混合 | 可能英文更好 |
| context_length 131072是什么单位？ | 长prompt测试 | 可能token限制 |

---

## 二、高质量SVG的反推分析

### 2.1 东京猫的特征

- ~50个path元素（高精细度）
- stroke-linecap="round" stroke-linejoin="round"（手绘感）
- 双层技法：填充层+线条层
- 色彩：#BA3420（陶土）、#0B0800（墨黑）、#F7F3ED（米白）

### 2.2 李诞虾的特征

- 双层技法更明显（fill layer + ink line layer）
- 纸张纹理（feTurbulence filter）
- 渐变色彩深度（不同透明度）

### 2.3 Prompt结构假设

```
prompt = [主体描述] + [风格描述] + [构图说明] + [细节要求]

示例：
"Japanese organizational chart showing power structure,
策略组 on left with pricing authority, 服务组 on right carrying risk,
供应商 in middle receiving conflicting signals.
Hand-drawn ink style with vermillion accents,
双层技法: fill layer for color weight + ink layer for fine outlines.
Use #BA3420 for accents, #0B0800 for lines, #F7F3ED for background.
约50个path elements, stroke-linecap round."
```

### 2.4 instructions的作用

推测：instructions是对风格的技术指导，与prompt的内容描述分离。

```
instructions = "色彩规范 + 线条技法 + 构图原则 + 输出要求"
```

---

## 三、references参数的使用策略

### 3.1 三种参考策略

**策略A：风格参考**
```
references = [
  东京猫SVG（手绘风格）,
  李诞虾SVG（双层技法）
]
```

**策略B：内容参考**
```
references = [
  类似的组织架构图,
  信息流动示意图
]
```

**策略C：混合**
```
references = [
  风格参考图,
  内容参考图,
  色彩参考图
]
```

### 3.2 待测试的关键问题

- 同一张图放多次是否有叠加效果？
- 参考图的权重如何分配？
- 参考图与prompt冲突时以谁为准？

---

## 四、配额分配策略

### 4.1 每周配额计算

**每周20次 = 约3次/天**

**建议分配**：
- 周一：3次探索性测试（n=3，快速看方向）
- 周二-周四：每天2次精细生成（n=1，迭代优化）
- 周五：3次最终版本（n=1-2，确保质量）
- 预留：4次应急/重试

### 4.2 核心原则

- 每次调用前必须充分准备（prompt + references）
- 失败立即分析原因，不要盲目重试
- 记录每次参数和结果，形成知识库
- n>1虽然只消耗1 credit，但产出多个变体通常只有1个可用，实际是"用1次配额换选择权"

### 4.3 一次性生成 vs 批量生成

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| n=1（精细生成） | 精细控制、可迭代、节省配额 | 需要多次尝试 | 复杂场景、需要精细调整 |
| n>1（批量生成） | 一次得到多个变体、可选择 | 消耗配额快，通常只有1个可用 | 简单场景、探索性尝试 |

---

## 五、具体场景的生成策略

### 5.1 权责不对等研究的5个可视化场景

| 场景 | 复杂度 | 策略 |
|------|--------|------|
| 结构性权责分离 | 高 | n=1精细生成 |
| 供应商夹层困境 | 高 | n=1精细生成 |
| 刘伟佳责任边界管理 | 高 | n=1精细生成 |
| REACT回应框架 | 中 | n=2得到变体 |
| 联盟可行性评估 | 中 | n=1确保一致性 |

### 5.2 统一风格要求

**色彩系统**：
- 陶土色：#BA3420（重点）、#E2725B（辅助）
- 米白：#F7F3ED（背景）、#F5F1EE（深色）
- 墨黑：#0B0800（线条）、#111111（文字）
- 灰度：#D4CFC7、#A8A098

**线条技法**：
- stroke-linecap: round
- stroke-linejoin: round
- 双层：fill layer + ink layer
- 主线：1.5-2px，细节：0.8-1.2px

**构图原则**：
- 信息密度高但不拥挤
- 左右对称或中心辐射
- 用色彩引导视线

---

## 六、方法论总结

### 6.1 配额约束下的生产力原则

1. **准备大于执行**：每次调用前充分准备prompt和references，减少试错
2. **记录等于复用**：每次参数和结果都记录，形成可复用的知识库
3. **分析大于重试**：失败后立即分析原因，而非盲目重试消耗配额
4. **参考图是放大器**：好的参考图可以大幅提升生成质量，优先准备参考素材

### 6.2 可迁移的策略框架

这套配额管理策略可以迁移到任何有API限额的AI工具使用场景：

1. 评估配额上限和日均可用量
2. 按探索/精细/最终三个阶段分配配额
3. 建立参数-结果记录表，形成经验库
4. 失败时先分析后重试，不盲目消耗
