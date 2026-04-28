# PPT Master 深度解析——SVG 内容生成系统的架构与纪律

> Sources: ppt-master 技能下载项目 (2026-04-09); 技术设计文档（中英文）; SKILL.md; 角色定义文件; 模板系统, 2026-04-28
> Raw: [README](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-README.md); [SKILL.md](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-SKILL.md); [中文技术设计](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-docs-zh-technical-design.md); [Strategist 角色](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-strategist.md); [Executor General](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-general.md); [Executor Consultant Top](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-consultant-top.md)

## 概述

ppt-master 是 Mino 技能体系中规模最大、架构最复杂的技能项目——87 个相关文件、7015 个文件总数、30MB 总容量。它不只是一个 PPT 生成工具，而是一个完整的 AI 驱动的内容生成生态系统，将源文档（PDF/DOCX/URL/Markdown）通过多角色协作的串行管线，最终转换为可编辑的 PowerPoint 文件。本文深度解析其架构设计、技术选型理由、角色系统、执行纪律和设计风格体系。

---

## 一、系统架构——七步串行管线

ppt-master 的核心是一条严格串行的七步管线，每一步都有明确的输入、输出和门禁条件（GATE）：

```
用户输入 (PDF/DOCX/URL/Markdown)
    ↓
[步骤 1：源内容转换] → PDF/DOCX/Web 转 Markdown
    ↓
[步骤 2：项目初始化] → 创建项目目录结构
    ↓
[步骤 3：模板选项] → A) 使用模板 B) 自由设计
    ↓
[步骤 4：Strategist 策略师] → 八项确认 + 设计规范
    ↓
[步骤 5：Image_Generator 图片生成师]（条件触发）
    ↓
[步骤 6：Executor 执行师] → 逐页 SVG + 讲稿
    ↓
[步骤 7：后处理与导出] → 拆分讲稿 → SVG 终处理 → PPTX 导出
```

### 管线的刚性约束

管线设计体现了对 AI 行为模式的深刻理解——AI 倾向于跳跃步骤、预判执行、并行处理，这在需要上下文依赖的任务中是灾难性的。因此 ppt-master 设定了六条铁律：

| 铁律 | 内容 | 违反后果 |
|------|------|----------|
| 串行执行 | 步骤必须按顺序执行 | 上下文缺失导致输出错误 |
| BLOCKING 硬停止 | 标记 ⛔ 的步骤必须等用户确认 | 跳过用户确认导致方向偏离 |
| 禁止跨阶段打包 | 不得将多步合并为一个输出 | 失去中间校验点 |
| 门禁前置 | 每步开始前必须验证前置条件 | 输入不完整导致垃圾输出 |
| 禁止投机执行 | 不得提前准备后续步骤的内容 | 上下文浪费和方向错误 |
| 禁止子代理生成 SVG | 步骤 6 必须由主代理端到端完成 | 丢失全局上下文导致不一致 |

这些约束不是技术限制，而是对 AI 行为模式的工程化应对。

---

## 二、为什么选择 SVG——格式选型的技术论证

ppt-master 选择 SVG 作为中间格式，是通过逐一排除其他方案得出的结论。这是整个系统架构的核心设计决策。

### 被排除的方案

**直接生成 DrawingML**：看起来最直接，跳过中间格式，AI 直接输出 PowerPoint 的底层 XML。但 DrawingML 极其繁琐——一个简单的圆角矩形就需要数十行嵌套 XML。AI 的训练数据中 DrawingML 远少于 SVG，生成质量不稳定，调试几乎无法肉眼完成。

**HTML/CSS**：AI 最熟悉的格式之一，但 HTML 和 PowerPoint 有根本不同的世界观。HTML 描述的是文档——标题、段落、列表，元素位置由内容流动决定。PowerPoint 描述的是画布——每个元素都是独立的、绝对定位的对象，没有流，没有上下文关系。这不只是排版计算的问题，而是两种完全不同的内容组织方式之间的鸿沟。HTML 里的一个 `<table>` 也没法自然地变成 PPT 里的几个独立形状。

**WMF/EMF（Windows 图元文件）**：微软自家的原生矢量图形格式，与 DrawingML 有直接的血缘关系，理论上转换损耗最小。但 AI 对它几乎没有训练数据，这条路死在起点。连微软自家的格式在这里都输给了 SVG。

**SVG 作为嵌入图片**：最简单的路线——把整张幻灯片渲染成图片塞进 PPT。但这样完全丧失可编辑性，形状变成像素，文字无法选中，颜色无法修改，和截图没有本质区别。

### SVG 胜出的理由

SVG 与 DrawingML 拥有相同的世界观：两者都是绝对坐标的二维矢量图形格式，共享同一套概念体系：

| SVG | DrawingML | 映射关系 |
|-----|-----------|----------|
| `<path d="...">` | `<a:custGeom>` | 自定义几何形状 |
| `<rect rx="...">` | `<a:prstGeom prst="roundRect">` | 圆角矩形 |
| `<circle>` / `<ellipse>` | `<a:prstGeom prst="ellipse">` | 椭圆 |
| `transform="translate/scale/rotate"` | `<a:xfrm>` | 变换 |
| `linearGradient` / `radialGradient` | `<a:gradFill>` | 渐变填充 |
| `fill-opacity` / `stroke-opacity` | `<a:alpha>` | 透明度 |

转换不是格式错配，而是两种方言之间的精确翻译。SVG 是唯一同时满足三个角色需要的格式：AI 能可靠地生成它，人能在浏览器里直接预览和调试，脚本能精确地转换它。

---

## 三、角色系统——Strategist 与 Executor 的分工

ppt-master 采用多角色协作模式，核心是两个角色：Strategist（策略师）和 Executor（执行师）。

### Strategist——设计的大脑

Strategist 是顶级 AI 演示文稿策略师，负责内容分析和设计规划。核心产出是 Design Specification（设计规范），一个包含 13 个章节的完整设计文档：

**八项确认流程**是 Strategist 的核心工作方法——在开始分析前，必须就以下八项向用户提供专业建议并等待确认：

1. **画布格式确认**：PPT 16:9 / 4:3 / 小红书 / 微信朋友圈 / 竖版视频等 10+ 格式
2. **页数确认**：基于源文档内容量推荐具体页数
3. **关键信息确认**：目标受众、使用场景、核心信息
4. **风格目标确认**：通用视觉型 / 通用咨询型 / 顶级咨询型
5. **配色方案推荐**：基于行业特征提供 HEX 值配色
6. **图标使用确认**：Emoji / AI 生成 / 内置图标库 / 自定义
7. **字体排版计划**：P1-P5 五套预设 + 字号层级
8. **图片使用确认**：不使用 / 用户提供 / AI 生成 / 占位符

### Executor——设计的手

Executor 有三种风格变体，对应不同的演示场景：

| 风格 | 定位 | 核心能力 | 适用场景 |
|------|------|----------|----------|
| General（通用灵活） | 视觉冲击力优先 | 全屏图片+渐变叠加、自由创意布局、三段变体 | 产品发布、培训材料、品牌活动 |
| Consultant（通用咨询） | 数据清晰度优先 | KPI 仪表盘、专业图表组合、数据色阶 | 进度报告、财务分析、政府报告 |
| Consultant Top（顶级咨询） | 逻辑说服力优先 | SCQA 框架、金字塔原理、数据语境化 | 战略决策报告、MBB 级别咨询 |

三种风格不仅仅是视觉差异，更是叙事结构的根本不同。顶级咨询风格要求每页遵循"断言标题 + Takeaway Box + 内容区 + 脚注"的标准结构，每个数据点必须有比较参照。

---

## 四、顶级咨询风格的深层设计

顶级咨询风格（MBB Level）是 ppt-master 中最精致的设计体系，体现了商业演示的最高标准。

### SCQA 叙事结构

| SCQA 元素 | 目的 | 弱标题 | MBB 级标题 |
|-----------|------|--------|-----------|
| Situation | 建立共享语境 | "行业背景" | "数字渗透率突破 60%，行业进入深水区" |
| Complication | 引入问题/张力 | "面临的挑战" | "然而三大结构性矛盾制约规模化部署" |
| Question | 待解决的核心问题 | "战略问题" | "如何在 18 个月内从试点走向全面部署？" |
| Answer | 核心方案 | "解决方案" | "三步路径：聚焦、扩展、规模化" |

### 数据语境化铁律

> **黄金规则**：绝不孤立展示单个数据点。每个数字都需要语境。

| 方法 | 模式 | 视觉实现 |
|------|------|----------|
| 时间对比 | "从 X 到 Y" | 折线图 + 标注变化幅度 |
| 基准对比 | "X vs 行业均值 Y" | 柱状图 + 灰色虚线基准 |
| 竞争对比 | "我们 X vs 竞品 Y" | 并排柱状图，高亮自身 |
| 目标差距 | "实际 X / 目标 Y" | 进度条 + 差距标注 |
| 排名 | "M 家中排第 N" | 水平柱状图 + 高亮标记 |

每个数据可视化必须包含三要素：数值本身（大号粗体）、比较参照（基线/前期/竞品）、意义解读（"So what?"）。

### 标准页面结构

```
┌──────────────────────────────────┐
│ 渐变顶栏 (0,0 → 1280,6)           │
├──────────────────────────────────┤
│ 断言标题 (x=40, y=50, 24px)       │
├──────────────────────────────────┤
│ Takeaway Box (x=40, y=75,         │  ← 深色背景 + 白色文字
│   w=1200, h=45)                   │
├──────────────────────────────────┤
│ 内容区 (x=40, y=140,              │  ← 图表/数据/分析
│   w=1200, h=520)                  │
├──────────────────────────────────┤
│ 来源 | 机密 | 页码                │  ← y=700, 10px
└──────────────────────────────────┘
```

---

## 五、模板系统——10+ 输出格式与设计风格库

### 画布格式矩阵

| 类别 | 格式 | viewBox | 用途 |
|------|------|---------|------|
| 演示文稿 | PPT 16:9 | 0 0 1280 720 | 标准演示 |
| 演示文稿 | PPT 4:3 | 0 0 1024 768 | 老式投影 |
| 社交媒体 | 小红书 | 0 0 1242 1660 | 3:4 竖版 |
| 社交媒体 | Instagram | 0 0 1080 1080 | 1:1 方图 |
| 社交媒体 | 竖版视频 | 0 0 1080 1920 | 9:16 竖版 |
| 营销素材 | 微信头图 | 0 0 900 383 | 2.35:1 横幅 |
| 营销素材 | A4 打印 | 0 0 1240 1754 | 1:1.414 |

### 内置布局模板

| 模板 | 风格描述 | 适用场景 |
|------|----------|----------|
| McKinsey | 麦肯锡咨询风格 | 战略报告、决策分析 |
| Google Style | 谷歌年度报告 | 技术分享、产品发布 |
| Academic Defense | 学术答辩 | 论文答辩、学术报告 |
| Government Blue/Red | 政府汇报 | 政务报告、国企汇报 |
| Pixel Retro | 像素风 | 技术科普、轻松场景 |
| Chinese Ink | 水墨中国风 | 文化主题、人文报告 |
| Psychology Attachment | 心理学依恋 | 心理分析、人文关怀 |

---

## 六、设计哲学——AI 是设计师，不是完工师

ppt-master 的技术设计文档中有一段核心论述，定义了工具的边界和定位：

> 生成的 PPTX 是一份设计稿，而非成品。把它理解成建筑师的效果图：AI 负责视觉设计、排版布局和内容结构，交付给你一个高质量的起点。要想获得真正精良的成品，需要你自己在 PowerPoint 里做精装修。这个工具的目标是消除 90% 的从零开始的工作量，而不是替代人在最后一公里的判断。

> 工具的上限是你的上限。PPT Master 放大的是你已有的能力——你有设计感和内容判断力，它帮你快速落地；你不知道一个好的演示文稿应该长什么样，它也没法替你知道。输出的质量，归根结底是你自身品味与判断力的映射。

这一定位区分了 ppt-master 与"一键完美 PPT"类工具的本质差异：它不承诺终极质量，而是承诺效率杠杆。

---

## 七、脚本工具链

| 脚本 | 功能 |
|------|------|
| `pdf_to_md.py` | PDF 转 Markdown |
| `doc_to_md.py` | DOCX/EPUB/HTML 转 Markdown |
| `web_to_md.py` | 网页转 Markdown |
| `web_to_md.cjs` | 微信/高安全站点转 Markdown |
| `project_manager.py` | 项目初始化/验证/管理 |
| `analyze_images.py` | 图片分析（AI 不可直接读图） |
| `image_gen.py` | 多供应商 AI 图片生成 |
| `svg_quality_checker.py` | SVG 质量检查 |
| `total_md_split.py` | 讲稿拆分 |
| `finalize_svg.py` | SVG 终处理（图标嵌入/图片裁剪/文字扁平化） |
| `svg_to_pptx.py` | SVG 转 PPTX（生成原生形状版和 SVG 参考版） |

特别规则：后处理三步骤（讲稿拆分 → SVG 终处理 → PPTX 导出）必须逐个执行，每步完成并确认成功后才能执行下一步，严禁将三个命令放在同一个代码块中。
