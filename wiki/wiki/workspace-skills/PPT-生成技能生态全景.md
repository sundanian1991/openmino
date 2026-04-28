# PPT 生成技能生态全景——七路线并存的技术图谱

> Sources: 技能全量可视化分析 (2026-04-21); ppt-master 项目 (2026-04-09); presentation-skill (2026-04-16); 其他技能项目汇总, 2026-04-28
> Raw: [技能元数据索引](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-_metadata-index.md); [技能顺序列表](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-00-技能顺序列表.md); [ppt-master SKILL](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-SKILL.md); [presentation-skill README](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-15-技能-书信精华PPT-20260416-presentation-skill-README.md)

## 概述

Mino 技能体系中围绕 PPT/演示文稿生成形成了一个密集的技能集群——7 个技能、覆盖 3 条技术路线、总文件数超过 7300、总大小约 33MB。这种多路线并存不是混乱，而是技能体系进化过程中的自然状态：不同场景需要不同的技术方案。本文全景梳理 PPT 生成技能的生态图谱，分析每条技术路线的特征、适用场景和重叠关系，为技能选择提供决策依据。

---

## 一、PPT 技能集群全览

| 技能 | SKILL.md 行数 | 文件数 | 大小 | 技术路线 | 核心定位 |
|------|-------------|--------|------|----------|----------|
| ppt-master | 314 | 7015 | 30M | SVG → DrawingML | AI 驱动的多格式 SVG 内容生成系统 |
| presentation-skill | 452 | 41 | 796K | HTML 单文件 | 演讲脚本 + PPT 一键生成，62 种品牌风格 |
| html-ppt-skill | 186 | 109 | 496K | HTML 静态翻页 | HTML PPT Studio，生成可翻页静态幻灯片 |
| pptx | 483 | 56 | 1.3M | .pptx 文件操作 | PPT 高级操作（全局技能） |
| pptx-deck-builder | 99 | 39 | 1.3M | .pptx 构建器 | 暗色/奶油主题 PPTX 快速构建 |
| pptx-generator | 249 | 6 | 68K | PptxGenJS | 从零创建 .pptx 文件 |
| mino-pptx | 727 | 9 | 112K | PptxGenJS | 年老师专属，14 种设计模式 |

---

## 二、三条技术路线深度分析

### 路线 A：SVG 内容生成（ppt-master）

**核心逻辑**：AI 生成 SVG 矢量图形 → 后处理脚本转换为 DrawingML → 导出为可编辑的 .pptx 文件。

**为什么是 SVG？** 因为 SVG 与 PowerPoint 的 DrawingML 拥有相同的世界观——两者都是绝对坐标的二维矢量图形格式。AI 能可靠生成 SVG，人能在浏览器里预览调试，脚本能精确转换为 DrawingML。这是一条同时满足 AI、人、脚本三方需求的中间格式。

**完整管线**：源文档 → Markdown 转换 → 项目初始化 → Strategist（八项确认 + 设计规范）→ Image_Generator（可选）→ Executor（逐页 SVG + 讲稿）→ 后处理 → PPTX 导出（原生形状版 + SVG 参考版）。

**优势**：
- 产出物是可编辑的 .pptx，每个形状都是原生 PowerPoint 对象
- 支持 10+ 输出格式（PPT、小红书、微信朋友圈、竖版视频等）
- 7000+ 图标库 + 33 种图表模板
- 多角色协作保证设计质量

**劣势**：
- 系统极其庞大（30MB，7015 文件）
- 学习曲线陡峭，需要理解管线和角色
- 对 AI 上下文要求高，SVG 生成必须由主代理端到端完成

**适用场景**：需要将文档转化为专业 PPT 的场景，尤其是商业报告、战略分析、学术答辩等对设计要求高的场景。

### 路线 B：HTML 幻灯片（presentation-skill、html-ppt-skill）

**核心逻辑**：生成单文件 HTML，内联 CSS/JS/SVG，浏览器中翻页播放，可打印为 PDF。

**技术特征**：
- 零外部依赖（仅 Google Fonts 走 CDN）
- 单文件 HTML，离线可用
- 支持键盘控制、全屏、自动播放、演讲者备注
- 通过 `@media print` 导出 PDF

**presentation-skill 的独特定位**：
- 62 种世界级品牌设计风格（Apple、Stripe、Ferrari、Nike 等）
- 演讲脚本 + 幻灯片一体化输出
- 基于 awesome-design-md 的设计系统
- 支持 `/ppt` 命令快速触发

**html-ppt-skill 的独特定位**：
- 更轻量（186 行 vs 452 行）
- 适合快速生成简单的演示文稿
- HTML 静态翻页，不做复杂交互

**优势**：
- 零门槛，生成即用
- 浏览器中直接播放，无需 PowerPoint
- 微信/邮件分享方便
- 风格选择丰富

**劣势**：
- 不可在 PowerPoint 中编辑
- 图表和数据可视化能力有限
- 不适合需要精细控制的场景

**适用场景**：快速分享、非正式汇报、风格化演示（如 TED 演讲风、水墨中国风）。

### 路线 C：.pptx 文件操作（pptx、pptx-deck-builder、pptx-generator、mino-pptx）

**核心逻辑**：直接操作 .pptx 文件格式，通过编程方式创建或修改 PowerPoint 文件。

**技术分化**：

| 技能 | 技术方案 | 特点 |
|------|----------|------|
| pptx | python-pptx 或类似 | 全局技能，高级操作（编辑现有文件） |
| pptx-deck-builder | PptxGenJS | 暗色/奶油主题快速构建 |
| pptx-generator | PptxGenJS | 从零创建，轻量 |
| mino-pptx | PptxGenJS | 年老师专属，14 种设计模式，727 行 SKILL.md |

**mino-pptx 的 14 种设计模式**覆盖了年老师日常工作最常见的汇报场景，是专为供应商管理和 BPO 运营场景定制的 PPT 生成方案。

**优势**：
- 产出物是原生 .pptx，完全可编辑
- mino-pptx 针对年老师场景做了深度定制
- 技术成熟，python-pptx/PptxGenJS 生态完善

**劣势**：
- 设计能力受限于库的 API，不如 SVG 灵活
- 无法实现复杂的自定义图形
- 视觉表现力不如 HTML/SVG 路线

**适用场景**：需要原生 .pptx 格式、需要编辑现有文件、日常标准化汇报。

---

## 三、重叠分析与清理建议

### 高重叠区域

| 重叠组 | 技能 | 重叠程度 | 建议 |
|--------|------|----------|------|
| .pptx 操作 | pptx + pptx-generator + pptx-deck-builder | 高 | pptx 作为全局技能保留，其余按需评估 |
| HTML 幻灯片 | presentation-skill + html-ppt-skill | 中 | presentation-skill 功能更完整，html-ppt-skill 可作为轻量备选 |

### 独特定位保留

| 技能 | 不可替代的理由 |
|------|---------------|
| ppt-master | 唯一支持 SVG → DrawingML 转换的完整管线，7000+ 图标库 |
| mino-pptx | 年老师专属，14 种场景化设计模式 |
| presentation-skill | 62 种品牌风格 + 演讲脚本一体化 |

### 选择决策树

```
需要什么格式？
├── 可编辑的 .pptx
│   ├── 从文档自动生成？→ ppt-master
│   ├── 年老师日常汇报？→ mino-pptx
│   ├── 编辑现有文件？→ pptx
│   └── 快速构建？→ pptx-deck-builder
├── HTML 浏览器播放
│   ├── 需要品牌风格？→ presentation-skill
│   └── 简单快速？→ html-ppt-skill
└── PDF 导出
    ├── 从 HTML 打印？→ presentation-skill / html-ppt-skill
    └── 从 PPTX 导出？→ ppt-master / mino-pptx
```

---

## 四、与 AI 定价研究的关联

AI 定价 PPT 项目（2026-04-24~25）是 PPT 技能生态的一次完整实战演练。该项目使用了多种工具链：

- **PPT169**：15 页精简版，PPT 16:9 设计规格系统
- **presentation-skill**：演讲脚本版，25 页扩展
- **html-ppt-skill**：HTML 静态翻页幻灯片
- **kw-workflow**：一键完整知识工作流

这次实战验证了多技能协作的可行性——同一主题可以产出多个版本，服务不同场景（精简版用于快速汇报，扩展版用于深度讨论）。

---

## 五、技术路线的哲学差异

三条路线本质上是三种不同的内容组织哲学：

| 路线 | 世界观 | 内容组织方式 |
|------|--------|-------------|
| SVG → PPTX | 画布模型 | 每个元素独立、绝对定位 |
| HTML 幻灯片 | 文档模型 | 内容流动、响应式布局 |
| .pptx 操作 | 对象模型 | 编程式创建、精确控制 |

SVG → PPTX 和 .pptx 操作都遵循"画布"哲学，但 SVG 路线在 AI 生成环节选择了更友好的中间格式。.pptx 操作则在 AI 不擅长 DrawingML 的现实约束下，选择了对开发者友好的编程接口。HTML 幻灯片则完全跳出了 PowerPoint 的世界观，选择了一种更轻、更灵活的呈现方式。

理解这些哲学差异，才能在面对具体需求时做出正确的技能选择。
