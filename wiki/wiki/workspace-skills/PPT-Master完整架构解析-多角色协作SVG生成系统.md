# PPT Master 完整架构解析 — 多角色协作的 AI 演示生成系统

> Sources: mino, 2026-04-28
> Raw: ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-SKILL.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-shared-standards.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-base.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-strategist.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-template-designer.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-svg-image-embedding.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-consultant.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-executor-consultant-top.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-executor-general.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-image-generator.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-references-image-layout-spec.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-workflows-create-template.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt大师下载-20260409-skills-ppt-master-workflows-topic-research.md

## 概述

PPT Master 是一个 AI 驱动的多格式 SVG 内容生成系统，能将源文档（PDF/DOCX/URL/Markdown）转换为高质量 SVG 页面并导出为 PPTX。其核心创新在于多角色协作管线（Strategist → Executor → Post-processing），以及 20+ 套专业级模板库覆盖从麦肯锡咨询风到政府红头文件的各类场景。

## 核心流水线架构

**完整管线**：源文档处理 → 创建项目 → 模板选择 → Strategist 八大确认 → [图片生成] → Executor SVG 生成 → 后处理 → 导出 PPTX

### 七大执行纪律（最高优先级）

| 纪律 | 含义 |
|------|------|
| **串行执行** | 各步骤严格按顺序执行，前一步输出是后一步输入 |
| **BLOCKING = 硬停止** | 标记 BLOCKING 的步骤必须等待用户显式确认 |
| **禁止跨阶段打包** | 不能将多个阶段合并执行（八大确认之后可自动流转） |
| **门控前置** | 每个步骤开始前必须验证先决条件 |
| **禁止推测执行** | 不能提前准备后续步骤的内容 |
| **禁止子代理生成 SVG** | SVG 生成必须由当前主代理端到端完成 |
| **逐页顺序生成** | SVG 页面必须一页接一页连续生成，禁止分批 |

### 多角色体系

| 角色 | 职责 | 输出 |
|------|------|------|
| **Strategist** | 内容分析与设计规划 | Design Specification & Content Outline |
| **Template Designer** | 全局模板库创建 | 可复用的页面模板集 |
| **Executor (Base/General/Consultant/Top)** | SVG 页面生成 | 各页面 SVG 文件 |
| **Image Generator** | AI 图片生成与分析 | 项目图片资源 |

## Strategist 角色 — 八大确认流程

Strategist 是整个管线的"大脑"，负责接收源文档后输出设计规范。核心是**八大确认**（BLOCKING 步骤）：

1. **画布格式确认** — 根据场景推荐格式（PPT 16:9、小红书 3:4、微信朋友圈 1:1 等）
2. **页数确认** — 根据源文档内容量推荐具体页数
3. **关键信息确认** — 目标受众、使用场景、核心信息
4. **风格确认** — 三档选择：通用灵活（视觉冲击）/ 通用咨询（数据清晰）/ 顶级咨询（逻辑说服）
5. **视觉隐喻确认** — 推荐核心视觉主题
6. **信息架构确认** — 页面组织逻辑（线性递进/螺旋深入/对比并列等）
7. **图片需求确认** — 列出所需图片及状态（Pending/Existing/Placeholder）
8. **特殊要求确认** — 品牌色、公司 Logo、特定图表等

**决策树**：内容特征 → 受众类型 → 风格选择。重影像/宣传 → 通用灵活；数据分析/进度报告 → 通用咨询；战略决策/说服高管 → 顶级咨询。

## Executor 角色 — SVG 生成执行规范

### 模板映射原则

| 页面类型 | 对应模板 | 遵守规则 |
|----------|----------|----------|
| 封面 | 01_cover.svg | 继承背景、装饰元素、布局结构 |
| 章节页 | 02_chapter.svg | 继承编号风格、标题位置、装饰元素 |
| 内容页 | 03_content.svg | 继承头尾样式，内容区域自由布局 |
| 结尾页 | 04_ending.svg | 继承背景、感谢语位置、联系信息布局 |

### 设计参数确认（强制步骤）

在生成第一个 SVG 页面之前，**必须确认**设计规范中的关键参数：画布尺寸、正文字号、配色方案（主次强调色 HEX 值）、字体方案。这防止了"规范说一套，执行做另一套"的脱节问题。

### 生成节奏

**推荐两阶段法**：
1. **视觉构建阶段**：按页码顺序连续生成所有 SVG 页面，确保设计风格和布局坐标的高度一致性
2. **逻辑构建阶段**：所有 SVG 定稿后，批量生成演讲者备注，确保叙事连贯性

## SVG 技术共享标准

### 绝对禁止列表（PPT 兼容性）

| 禁止特性 | 原因 | 正确替代 |
|----------|------|----------|
| `clipPath` | PPT 不支持 | 使用 rect 遮罩层 |
| `<style>` | PPT 不支持 | 使用内联样式 |
| `class` | PPT 不支持 | 使用内联属性 |
| `fill="rgba()"` | PPT 不支持 | `fill="#HEX" fill-opacity="0.X"` |
| `<g opacity="X">` | PPT 不支持 | 对每个子元素单独设置 fill-opacity |
| `<symbol>` + `<use>` | PPT 不支持 | 直接复制元素代码 |
| `marker-end` | PPT 不支持 | 用 polygon 画三角形箭头 |
| `<foreignObject>` | PPT 不支持 | 使用 tspan 处理换行 |
| `<animate*>` | PPT 不支持 | 静态展示 |

### 画布格式参考

| 格式 | viewBox | 尺寸 | 比例 |
|------|---------|------|------|
| PPT 16:9 | 0 0 1280 720 | 1280x720 | 16:9 |
| PPT 4:3 | 0 0 1024 768 | 1024x768 | 4:3 |
| 小红书 | 0 0 1242 1660 | 1242x1660 | 3:4 |
| 微信朋友圈 | 0 0 1080 1080 | 1080x1080 | 1:1 |
| A4 打印(150dpi) | 0 0 1240 1754 | 1240x1754 | 1:1.414 |

### 图标系统

三种图标库：**chunk**（直线几何、棱角分明）/ **tabler-filled**（贝塞尔曲线、圆润）/ **tabler-outline**（轻量线条、仅屏幕展示）。**一个演示文稿 = 一个图标库，绝不混用**。

## 独立工作流

### Create-Template 工作流

用于创建全局可复用的模板，而非项目级一次性定制。步骤：收集模板信息 → 创建目录 → 调用 Template Designer → 验证资源 → 注册索引 → 输出。需要确认模板 ID、显示名、分类（brand/general/scenario/government/special）、适用场景、色调、画布格式等。

### Topic Research 工作流

当用户只提供主题名称而无源文档时，从零开始研究内容并生成结构化 Markdown 文档及相关图片文件夹，作为 PPT 生成管线的前置输入。

## 图片嵌入策略

### 三种图片状态

| 状态 | 含义 | Executor 处理 |
|------|------|---------------|
| **Pending** | 需 AI 生成，有描述 | 先调用 image_gen.py 生成到 images/，再引用 |
| **Existing** | 用户已有图片 | 放入 images/，用 image 标签引用 |
| **Placeholder** | 暂未处理 | 使用虚线边框占位符 |

### 两种嵌入方式

| 方式 | 优势 | 劣势 | 适用阶段 |
|------|------|------|----------|
| **外部引用** | 文件小、迭代快、易替换 | 预览需从项目根启动 HTTP 服务 | svg_output/ 开发阶段 |
| **Base64 嵌入** | 自包含、导出稳定 | 文件体积大 | svg_final/ 交付阶段 |

## 核心脚本工具链

| 脚本 | 用途 |
|------|------|
| `pdf_to_md.py` | PDF 转 Markdown（PyMuPDF） |
| `doc_to_md.py` | 多格式转 Markdown（Pandoc，支持 DOCX/EPUB/HTML/LaTeX） |
| `web_to_md.py` / `web_to_md.cjs` | 网页转 Markdown（含微信公众号等特殊站点） |
| `project_manager.py` | 项目初始化/验证/管理 |
| `analyze_images.py` | 图片分析 |
| `image_gen.py` | AI 图片生成（多提供商） |
| `finalize_svg.py` | SVG 后处理（统一入口，自动嵌入图片） |
| `svg_to_pptx.py` | 导出 PPTX |
| `total_md_split.py` | 演讲者备注分割 |
| `svg_quality_checker.py` | SVG 质量检查 |
