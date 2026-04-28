# 技能生态

> Sources: Mino, 2026-02-12 ~, 2026-04-26
> Raw:[skill-search](../../raw/agent-rules/skill-search.md)

## 概述

技能生态由 501 个文件组成，覆盖约 76 个已安装技能，涵盖可视化、文档生成、知识工作、数据处理、演示文稿和领域专业知识。技能遵循按需安装原则——绝不批量安装。

## 技能管理原则

| 原则 | 说明 |
|------|------|
| **按需安装** | 先搜索，推荐 1-3 个，确认后安装 |
| **不批量装** | 只装当前任务需要的 |
| **先读 SKILL.md** | 调用前先读技能说明 |
| **简单任务跳过** | ≤3 步任务不需要检查技能 |
| **不确定→先读** | 任务超出当前知识范围时，先读 SKILL.md |

## 技能发现来源

| 优先级 | 平台 | 说明 |
|--------|------|------|
| 1 | Tencent SkillHub | 1.3 万 Skills，中国优化 |
| 2 | ClawHub | 中国镜像 |
| 3 | claw123.ai | OpenClaw 国际站 |

**API**：`curl -s https://clawhub.ai/api/skills.zh.json`

## 已安装技能清单

### 可视化与设计（12 个）

| 技能 | 能力 |
|------|------|
| **chart-visualization** | 26 种图表（matplotlib）— 柱/线/饼/散点/桑基/鱼骨/思维导图/组织架构/网络图/漏斗等 |
| **echarts-visualization** | 交互式 ECharts HTML — 桑基/K线/地图/热力/矩形树/关系图/雷达/仪表盘/日历/主题河流等 |
| **diagram-design** | 13 种图表（HTML+SVG）— 架构/流程/序列/状态机/ER/时间线/泳道/象限/嵌套/树/层叠/韦恩/金字塔 |
| **data-storytelling** | 数据叙事策略与内容编排层 |
| **data-visualization** | 图表类型选择 + Python matplotlib 生成 |
| **narrative-text-visualization** | 结构化叙事文本可视化（T8 引擎） |
| **infographic-creator** | 文本转信息图 HTML |
| **svg-flow-diagram** | 独立 SVG 流程图和过程图 |
| **hand-drawn-icon** | 手绘风格 SVG 图标生成 |
| **icon-retrieval** | 从图标库搜索和获取 SVG |
| **impeccable** | 高品质前端设计——独特、生产级界面 |
| **cinematic-ui** | 电影灵感视觉系统 |

### 文档与演示（13 个）

| 技能 | 能力 |
|------|------|
| **html-ppt-skill** | 静态 HTML 演示文稿 — 36 主题、15 完整模板、31 布局、27 CSS 动画、20 canvas 特效、演讲者模式 |
| **pptx** | PPT 高级操作 — 创建、编辑、批注、演讲者备注 |
| **pptx-deck-builder** | PptxGenJS 专业格式演示文稿生成 |
| **presentation-skill** | 演讲脚本 + PPT 自动生成 |
| **guizang-ppt-skill** | "电子杂志×电子墨水"风格横翻 HTML PPT |
| **frontend-slides** | 动画丰富的 HTML 演示文稿 |
| **docx** | Word 高级操作 — 创建、编辑、修订跟踪 |
| **minimax-docx** | DOCX via OpenXML SDK (.NET) |
| **minimax-pdf** | 高品质 PDF 创建，注重视觉设计 |
| **minimax-xlsx** | Excel 表格操作 |
| **xlsx** | Excel 公式、格式、数据分析 |
| **kami** | 专业文档排版——简历、白皮书、法律文档 |
| **official-doc** | 公文编写——供应商管理、合规、协调 |

### 知识工作（12 个）

| 技能 | 能力 |
|------|------|
| **kw-workflow** | 一键完整工作流：brainstorm→plan→review→work→compound |
| **kw-brainstorm** | 头脑风暴，拉取参考，找方向 |
| **kw-plan** | 结构化为可执行计划，搜索过往学习成果 |
| **kw-confidence** | 评估已知/未知，直白语言分解 |
| **kw-review** | 并行战略对齐 + 数据准确性审查 |
| **kw-work** | 执行计划，拆分任务，并行执行 |
| **kw-compound** | 提取学习成果，保存到 docs/knowledge/ |
| **knowledge-distiller** | 知识提取和总结 |
| **work** | 工商管理日常思考——场景匹配思考框架 |
| **work-expression** | 工作表达润色——口述升级为定性+定量融合 |
| **task-alignment** | 从想法出发的对齐对话，共同决策 |

### 数据与办公（5 个）

| 技能 | 能力 |
|------|------|
| **antv-s2-expert** | S2 多维交叉分析表（数据透视表） |
| **editorial-card-generator** | 文本转编辑风格 HTML5 信息卡片 |
| **markdown-converter** | 文档转 Markdown（PDF、Word 等） |
| **pdf** | 综合 PDF 操作——提取文本、表格 |
| **find-skills** | 技能发现助手 |

### 领域专业知识（5 个）

| 技能 | 能力 |
|------|------|
| **supplier-mentor** | P12+ 供应商管理导师——判断力、框架、风险评估 |
| **lenny-skills** | 基于 Lenny's Newsletter/Podcast 的商业决策顾问 |
| **agent-browser** | 浏览器自动化——打开页面、填表、点击、截图、抓取 |
| **work** | 工商管理日常思考——场景匹配思考框架 |

### 元能力与自我改进（6 个）

| 技能 | 能力 |
|------|------|
| **skill-creator** | 创建、修改和改进技能 |
| **darwin-skill** | 自主技能优化器——评估、修剪、进化 |
| **ownership-skills** | 端到端责任意识 |
| **taste** | 通过人类反馈培养审美判断力 |
| **taste-agency** | 判断力与行动力校准 |
| **legacy-vault** | 旧版技能存档管理器 |

### 个人与工具（10 个）

| 技能 | 能力 |
|------|------|
| **daily-letter** | 每日书信——十年记忆切片 |
| **getnote** | 笔记保存服务 |
| **ima-note** | IMA 个人笔记服务 API |
| **download-anything** | 下载几乎所有数字资源 |
| **ljg-card** | 内容铸造器——内容转 PNG 视觉 |
| **ljg-xray-book** | 书籍深度结构提取 |
| **ljg-xray-paper** | 论文 X 光——提取问题-视角-结果 |
| **arming-thought** | 对话启动时"实事求是"原则 |
| **person-observer** | 人物观察分析 |
| **workspace-tidy** | 三区域文件生命周期管理 |

### 前端与 Web（5 个）

| 技能 | 能力 |
|------|------|
| **mino-frontend** | 年老师专属前端——HTML 幻灯片、数据仪表盘、页面、海报 |
| **huashu-design** | 花叔 Design——高保真原型、交互演示、幻灯片 |
| **task-dispatcher** | 通用任务执行调度器——IPOFA 五环流程 |
| **task-implement** | 基于任务文档的自主执行 |
| **ultrawork** | 穷尽所有办法，直至目标完成 |

## 技能分类汇总

| 类别 | 数量 | 核心能力 |
|------|------|---------|
| 可视化与设计 | 12 | 图表、图表、SVG、信息图 |
| 文档与演示 | 13 | PPT、Word、PDF、Excel、公文 |
| 知识工作 | 11 | 头脑风暴、计划、审查、复合 |
| 数据与办公 | 5 | 数据透视表、卡片、转换器 |
| 领域专业知识 | 5 | 供应商管理、商业顾问 |
| 元能力与自我改进 | 6 | 技能创建、责任、审美 |
| 个人与工具 | 10 | 每日书信、笔记、下载 |
| 前端与 Web | 5 | HTML 原型、仪表盘 |
| 任务与执行 | 4 | 调度、自主执行 |

**总计**：约 76 个技能，501 个文件

## 技能使用指南

- **简单任务（≤3 步）**：直接回答，不需要检查技能
- **复杂任务**：检查是否有相关技能，读 SKILL.md，然后调用
- **不确定领域**：如果超出当前知识范围，先读 SKILL.md
- **绝不批量安装**：搜索→推荐→确认→逐个安装
- **定期清理**：移除未使用的技能，归档旧版技能
