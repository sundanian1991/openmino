---
name: viz-design
description: |
  可视化设计器 — 从数据/概念/文字到可视化方案。
  88 种视觉模式库（72 种模式 + 16 种逻辑图表），按"要表达什么"选模式。
  核心产出 = 完整的可视化 SPEC + 渲染契约 JSON，委托渲染技能执行。
  不画图，只做视觉决策和 SPEC 编写。所有渲染走 viz-echarts / viz-svg-flow，统一 JSON 接口。
trigger: |
  怎么可视化、用什么图、这个概念怎么画、把文字做成图、概念可视化、抽象概念可视化、
  视觉表达、图表选择、这个关系用什么图、帮我设计一张图、可视化的思路、数据讲故事、
  供应商分析、业绩评估、战略建议、咨询图表、麦肯锡风格、Exhibit、商业分析、
  对比排名、转化瓶颈、趋势拐点、根因分析、目标差距、KPI 完成、可视化设计
---

# viz-design — 可视化设计器

> 核心定位：不是画图工具，是**可视化设计器**。
> 输入：抽象概念、非结构化数据、文字描述、复杂关系
> 输出：完整的可视化 SPEC（模式选择 + 标题 + 数据组织 + 标注策略 + 叙事结构）
> 执行：委托 viz-echarts / viz-chart / viz-svg-flow 等渲染技能画出来

---

## 一、核心原理

**图表思维是认知压缩。** 文字是线性的，图像是并行的。一张好图让大脑跳过解码阶段，直达模式识别。

**选图本身就是洞察。** 选漏斗说明你看到了衰减关系，选齿轮说明你看到了联动机制。图的选择先于图的绘制。

**88 种模式 = 88 种"概念→图形"的翻译模板。** 不需要从零想，按需调用。

---

## 二、技能边界

| 本技能负责 | 不负责 |
|-----------|--------|
| 概念→模式匹配（选什么图） | 实际画图（viz-design 绝不自己写 ECharts/SVG 代码） |
| SPEC 编写（标题/标注/布局/叙事） | 配色设计（各渲染技能自带配色体系） |
| 视觉叙事策略（先讲什么后讲什么） | 数据清洗（交给数据技能） |

---

## 三、四阶段工作流

```
Phase 0  全局风格锁定 — 多图场景先锁 globalStyle（storyboard.md 中）
  ↓
Phase 1  intent.md       ← 意图决策（为什么做、为什么选这个模式）
  ↓ 模板：references/templates/intent.md
Phase 2  storyboard.md    ← 视觉叙事设计（叙事弧线、阅读路径、克制声明）
  ↓ 模板：references/templates/storyboard.md
Phase 3  spec.md          ← 编译规格（渲染契约 + 机器可读 JSON）
  ↓ 模板：references/templates/spec.md
Phase 4  checklist.md     ← 验收清单（出图后逐项对照）
  ↓ 模板：references/templates/checklist.md
```

**渐进加载**：先读 `references/library-index.md` 决定下一步加载什么，不要一次性加载所有参考文件。

**多图场景先走 Phase 0**：锁定全局风格（色系/字体/风格学派），后续每张图从全局继承。

### 入口模式

| 年老师说的 | 模式 | 做法 |
|-----------|------|------|
| "先看看数据能讲什么" | A 逐步引导 | 列出所有分析角度（2-5 个）→ 确认 → 再选图表 |
| "你帮我决定"/"最佳方案" | B AI 推荐 | AI 自主决策最佳方案 → 直接出图 |
| 直接指定图表或角度 | C 自定义 | 按指定执行 |
| 单图需求且意图明确 | C（快速路径） | 直接执行 |
| 多图需求或复杂数据 | A（默认） | 先分析再逐个确认 |

### 工作流详解

```
收到输入 → 选择入口模式（A/B/C）
  ↓
Phase 0: 全局风格锁定（仅 ≥2 张图时执行）
  ├── 风格学派：hash(主题名) → 读 style-schools.md
  ├── 全局色系：1 套主色 + 1 套强调色 → 读 color-themes.md
  ├── 全局字体：锁定 1 对 → 读 typography-moods.md
  └── 写入 global-style.md
  ↓
Phase 1: intent.md — 意图决策
  1. 读 library-index.md，决定下一步加载什么
  2. 意图识别 → 模式匹配（88 种 → 选 1 个）
     模式索引见 references/pattern-index.md（快速选图 + 决策树）
  3. DNA 快速筛选 — grep/awk 查 chart-dna-index.tsv
  4. 自动选择器 — 读 auto-selector.md
     多图：仅走 L1，L2/L3 从 global-style 继承
     单图：L1→L2→L3 全流程
  5. 写入 intent.md
  ↓
Phase 2: storyboard.md — 视觉叙事
  6. 读 narrative-arcs.md + visual-beats.md 定弧线和节拍
  7. 场景设计 — "一句话灵魂" + 签名视觉元素 + 克制声明
  8. 写入 storyboard.md
  ↓
Gate: 图表有效性门禁
  读 chart-validity-gate.md → R0 检验
  失败 → 查备选模式表 → 切换 → 重新过门禁
  ↓
Phase 3: spec.md — 渲染契约
  9. 读 templates/spec.md，按模板编写
  10. 编写渲染契约 JSON（v2 ggplot2 分层格式）
  11. JSON Schema 自检：
      ├── version = "viz-design-spec-v2"
      ├── data 必须有 rows 或 series
      ├── mapping 必须声明 x 映射（可 null）
      ├── layers 非空数组，每个含 geom + aes + params
      ├── layers[].params.color/size/smooth 必须是标量
      ├── scales 非空时每个必须有 aesthetic + type
      └── coord/facet/theme 必须存在（可为 null）
  12. 委托渲染 → 渲染契约 JSON 传入 viz-echarts / viz-svg-flow
  13. 写入 spec.md
  ↓
Phase 4: checklist.md — 验收
  14. 出图前自检 — 读 anti-patterns.md
  15. 验收 — 读 verification-standards.md
  16. 写入 checklist.md，标注通过/不通过
  17. 4 项以上不通过 → 回退 Phase 1
```

### 轻量模式（单图快速场景）

简单单图需求（如"帮我画个柱状图对比 5 个供应商业绩"）：

- Phase 1+2 合并为口头确认（不写文件）
- Phase 3 必须写 spec.md，**必须包含渲染契约 JSON**
- Phase 4 验收后，**必须委托渲染技能执行，不得自己出图**

---

## 四、SPEC 编写规范

> SPEC 是**视觉叙事剧本**，不是渲染指令。详细模板见 `references/spec-template.md`。

### 叙事意图（必须先写）

```
【可视化目的】为什么要做这张图？认知缺口是什么？
【想传达什么】核心信息（只有一句话）
【结论】读者应该得出什么判断？
【思路】为什么选这个图？视觉叙事路径是什么？
```

### 视觉执行（渲染指令）

```
【模式选择】编号 + 名称 + 匹配理由（1 句话）
【标题】主标题：结论性（不是描述性）；副标题：时间范围 + 对象
【视觉编码】X/Y 轴编码什么 / 颜色编码什么 / 大小编码什么
【数据组织】字段清单 / 排序规则 / 聚合规则
【标注策略】高亮 ≤10% / 标注写原因+幅度（不写数字）
【布局】画布尺寸 / 配色遵循 13-VISUALIZATION.md
```

### 委托渲染路由

| 模式范围 | 委托目标 |
|----------|---------|
| 01-30（数据图表） | viz-echarts |
| 31-48（结构关系） | viz-svg-flow（简单情况用 viz-chart） |
| 49-72（状态叙事） | viz-svg-flow |
| C01-C16（逻辑图表） | viz-echarts 或 viz-svg-flow（按数据特征） |

委托方式：将渲染契约 JSON 直接传入对应技能。交接示例见 `references/delegation-examples.md`。

---

## 五、委派收口铁律

> **根因：SPEC 是自然语言，下游需要 JSON。AI 脑中翻译时信息衰减，多图成倍放大。**

**铁律 1：viz-design 绝不自己写渲染代码。** 所有渲染只走 viz-echarts 或 viz-svg-flow。

**铁律 2：每张图的 spec.md 末尾必须附带渲染契约 JSON。** 无 JSON = 未完成。

**铁律 3：多图场景必须先锁 globalStyle。** 后续每张图从全局继承，不得各自选色。

**铁律 4：委派路径唯一。** viz-design → 渲染契约 JSON → viz-echarts / viz-svg-flow。不存在第二条路径。

**铁律 5：JSON 必须使用 v2 格式。** `version` / `layers` / `mapping` / `scales` / `coord` 缺一不可。标注用 `geom_label`/`geom_hline`/`geom_vline` 图层，不用 annotations 外挂。

**反模式（禁止）**：
- 自己写 ECharts option / SVG path / Chart.js config
- 多图各自选色，不锁全局
- 用自然语言代替 JSON 契约
- 自行组装多图 HTML（应委派容器技能）
- `layers` 为空 / `mapping.x` 未声明 / 标注用 annotations 外挂数组

---

## 六、技能生态

### 三层架构

```
viz-data-story     ← 策略层（大纲 → 几张图 → 叙事顺序）
  ↓
viz-design         ← 设计层（每张图 → 选模式 → 写 SPEC → 选容器）
  ↓
渲染层：viz-echarts / viz-svg-flow / viz-chart / viz-infographic
  ↓
容器层：ppt-html / fe-mino / mini-pdf / ppt-deck-builder / fe-frontend
```

### 容器委派

| 使用场景 | 委派技能 |
|----------|---------|
| 汇报演示（翻页） | ppt-html |
| 汇报演示（动画） | ppt-slides |
| 数据看板/仪表盘 | fe-mino |
| Office 格式 | ppt-deck-builder |
| 正式报告/提案 | mini-pdf |
| 社交媒体传播 | viz-editorial |
| 落地页/专题页 | fe-frontend |
| 单图需求 | 无容器层，直接渲染 |

**渲染执行铁律**：渲染执行前必须通过 viz-echarts 或 viz-svg-flow，不得跳过。

### 与 13-VISUALIZATION.md 的合规

| 13 的规则 | SPEC 中如何体现 |
|----------|----------------|
| 标题写结论，不写描述 | SPEC【标题】必须是结论性的 |
| 颜色是信号不是装饰 | SPEC【视觉编码】说明颜色编码什么 |
| 高亮 ≤10% | SPEC【标注策略】限定高亮范围 |
| 默认 Warm，≤2 ramp | SPEC 注明色系选择理由 |
| 一个图一个核心洞察 | SPEC【想传达什么】只写一句话 |

### 参考文件索引

| 文件 | 何时读 |
|------|--------|
| **library-index.md** | **工作流第一步** |
| **pattern-index.md** | Phase 1 模式匹配（88 种模式 + 快速选图 + 决策树） |
| **templates/*.md** | 各 Phase 对应模板 |
| **delegation-examples.md** | 委托渲染时的 JSON 格式示例 |
| **usage-examples.md** | 三种入口模式的使用示例 |
| **auto-selector.md** | Phase 1 自动选择器 |
| **chart-validity-gate.md** | 门禁检验 |
| **anti-patterns.md** | Phase 4 出图前自检 |
| **verification-standards.md** | Phase 4 验收标准 |
| **consulting-quality-gates.md** | 12 问质量标准 |
| 其余参考文件 | 按 library-index.md 指引按需加载 |
