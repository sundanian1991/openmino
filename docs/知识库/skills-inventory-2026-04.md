# Skills 完整清单 — 2026-04-24

> 一口气读完了每个 SKILL.md 的正文，以下是真实描述。
> 来源：项目级（`.claude/skills/` 54 个）+ 全局级（`~/.claude/skills/` 70 个，去重后 122 个唯一）

---

## 这 122 个技能的实质分类

按"它是干什么的、怎么工作的"来分，而不是按文件类型。你会发现很多技能表面功能不同，但底层机制一样。

---

## 🏭 第一类：文件生成器

**特点：输入内容 → 输出物理文件（.pptx/.pdf/.docx/.xlsx/.html/.png）**

### PPT 生成（6 个，各有侧重）

| 技能 | 核心机制 | 什么时候用 | 注意 |
|------|---------|-----------|------|
| **mino-pptx** | PptxGenJS，14 种设计模式 + 18 种配色方案，每页独立 JS 模块 → compile 合成 | 述职/汇报等"正式 PPT" | 最成熟的年老师专属 PPT 技能，包含 QA 检查（代码级 + 视觉级） |
| **pptx-deck-builder** | PptxGenJS，先 intake（受众/时长/大纲）→ 逐页 outline → 单文件 slides.js → QA | 需要故事线先行的主题式 PPT | 固定深蓝+奶油+强调色系统，可换 5 套配色 |
| **pptx-generator** | PptxGenJS，每页 5 种类型（封面/目录/章节/内容/总结），5-key 主题对象 | 快速数据型 PPT | 比 mino-pptx 简单，比 pptx-deck-builder 灵活度低 |
| **pptx** | 三种方式：HTML→html2pptx 转换、直接编辑 OOXML XML、模板替换 | 编辑现有 PPTX 或模板套用 | 适合"改 PPT"而非"做 PPT" |
| **presentation-skill** | 输入主题 → 输出演讲逐字稿 + HTML 幻灯片（62 种品牌风格） | 演讲场景（需要逐字稿 + 自动播放） | 输出是 HTML 不是 PPTX，适合演讲非汇报 |
| **html-ppt-skill** | 36 个主题 + 31 种页面布局 + 27 种 CSS 入场动画，选模板填内容 | 快速 HTML 演示 | 全是静态 HTML，无后端 |

### PDF 生成（2 个）

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **minimax-pdf** | CREATE/FILL/REFORMAT 三管线，15 种视觉风格，reportlab + Playwright 封面 | 需要设计感的报告/提案/简历（重视觉质量） |
| **pdf** | pypdf/pdfplumber/reportlab + qpdf，纯脚本操作 | 提取文本/表格、合并拆分、OCR 扫描件 |

### Word/Excel 生成（4 个）

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **docx** | js→docx 创建新文件 + Python 编辑 OOXML | 常规 Word 操作 |
| **minimax-docx** | OpenXML SDK (.NET) 三管线（CREATE/FILL/FORMAT），13 个权威风格指南 | 需要精准排版/学术风格的复杂文档 |
| **xlsx** | openpyxl + pandas，强制财务模型色彩规范（蓝=输入/黑=公式/绿=引用） | KPI 报表、供应商绩效统计 |
| **minimax-xlsx** | 直接编辑 OOXML XML（不丢失 VBA/透视表），公式自动更新 | 现有 Excel 编辑或避免格式丢失 |

### 图片/信息卡生成（3 个）

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **ljg-card** | 7 种视觉模具，HTML 模板 → Playwright 渲染 PNG | 把想法/观点铸造成视觉图片 |
| **editorial-card-generator** | 3-6 张杂志风 HTML5 海报（3:4 比例），Tailwind + feTurbulence 纹理 | 分享用信息卡片（精品社论风格） |
| **claude-infographic-charts** | Claude Artifact 风格的信息图和流程图 | 快速出风格统一的数据信息图 |

---

## 📐 第二类：代码生成器

**特点：输入数据/需求 → 输出可运行的代码**

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **data-visualization** | Python matplotlib 代码生成，三种咨询风格（BCG/Economist/McKinsey），26 种图表类型 | **汇报材料里的专业图表**（输出的代码你得自己跑） |
| **chart-visualization** | Node.js 图表图片生成器，26 种图表类型，输出图片 URL | 需要直接出图（不用跑代码） |
| **diagram-design** | 13 种技术图（架构/流程/时序/状态/ER 等），输出 HTML+SVG | 画架构图、业务流程图 |
| **svg-flow-diagram** | JSON specs → Python 渲染 → SVG，手绘风格 + 虚线动画流向 | 需要手绘感流程图的场景 |
| **narrative-text-visualization** | 数据 → T8 语法标注 → HTML 叙事报告（@antv/t8 渲染） | 数据叙事型报告（带标注和嵌入式迷你图） |
| **antv-s2-expert** | @antv/s2 多维交叉分析表，输出 TypeScript/React 代码 | 需要复杂表格/透视表的前端开发 |

---

## 🧠 第三类：专家顾问

**特点：结构化诊断 → 输出判断/建议/策略，不产物理文件**

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **supplier-mentor** | P12+ 级别供应商管理专家，13 个认知模式，准入/业绩/清退各有 6 个逼迫性问题，维护供应商画像库 | **日常供应商管理决策**（评估/沟通/风险预警） |
| **person-observer** | 四层聆听模型（说了什么→没说什么→为什么→为什么对我说），输出结构化人物档案 | 分析职场人物行为模式、潜台词 |
| **lenny-skills** | 整合 287 位行业专家智慧，9 个子模块（增长/战略/产品/领导力等），诊断 → 探测 → 交付 | 商业决策参考 |
| **work** | 22 个场景模板（A1-A6 业绩合规清退 / B1-B6 准入汇报谈判 / C1-C4 分析邮件制度），Plan→Doc 流转 | 工作中的日常思考框架 |
| **knowledge-distiller** | Socratic 访谈引擎，一轮一问题，每 5 轮总结，追踪盲点和模糊区 | 从自己或别人的知识中萃取结构化洞察 |

---

## 🔄 第四类：工作流编排器

**特点：多步骤、多技能协作，线性推进**

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **kw-workflow** | 六步全自动工作流（brainstorm→plan→confidence→review→work→compound），每步写文件，下步读文件 | **复杂问题的完整分析**（从头到尾一键跑通） |
| **task-dispatcher** | 5W2H 澄清 → Spec → Plan → 调度专业技能（判断任务类型，调对应技能执行） | 跨技能复杂任务 |
| **task-alignment + task-implement** | 想法对齐（是否固化为独立 Task）→ 四份文档（alignment/task/verify/progress）→ 自主执行 + 独立验证 | 可独立跟踪的长期任务（能定时、能独立 session 跑、能追踪进度） |
| **ownership-skills** | 遇阻时五步 OWNER Method，失败自动升级挑战等级（L1-L5），L4 强制 7 项检查 | 确保任务闭环不放弃 |
| **workspace-tidy** | 五阶段整理（扫描→分类→计划→执行→验证），价值评分矩阵 | workspace/ 文件整理 |

---

## ✍️ 第五类：内容转化

**特点：一种内容形式 → 另一种更优形式**

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **work-expression** | 口述稿 → 定性+定量融合表达。L1-L4 层级诊断，记忆数据注入，按"先再后"公式润色 | 周报/汇报/发言前的口述稿升级 |
| **official-doc** | 29 个模板 × 100+ 场景，Remix 系统生成 4-6 种语气变体（正式/柔和/紧急/协商/告知/质询） | 供应商管理正式公文 |
| **a4-report** | 麦肯锡/BCG/贝恩风格 HTML 报告，210mm A4 可打印 PDF，含第 7 阶段数据审计（交叉验证每个数字） | 正式咨询风格分析报告 |
| **daily-letter** | 从 MyAgents JSONL + CodePilot 提取想法种子 → 三遍筛选 → 李娟人文叙事 + 芒格洞察产出书信 | 每日自动生成书信 |
| **markdown-converter** | uvx markitdown 一条命令转文件为 MD（PDF/DOCX/PPTX/XLSX/HTML/图片 OCR/音频转录/ZIP/EPub） | 把外部资料转成我能处理的格式 |

---

## 🌐 第六类：Baoyu 创作管线（全局）

**特点：一条完整的内容创作产业链，从素材到发布**

这是一个完整的"内容生产 → 配图 → 排版 → 发布"管线，全部在全局级安装：

| 阶段 | 技能 | 功能 |
|------|------|------|
| **配图** | baoyu-article-illustrator | 分析文章结构，在合适位置生成配图 |
| | baoyu-cover-image | 5 维定制文章封面图（9 色板 × 6 渲染风格） |
| | baoyu-comic | 知识漫画（多艺术风格 + 氛围基调） |
| | baoyu-infographic | 专业信息图（20 布局 × 17 视觉风格） |
| | baoyu-xhs-images | 小红书信息图系列（10 风格 × 8 布局） |
| | baoyu-image-gen | AI 图片生成核心（OpenAI/Google/阿里通义万象） |
| **素材** | baoyu-url-to-markdown | 任意 URL → MD |
| | baoyu-format-markdown | MD 格式化（Frontmatter/标题/列表/摘要） |
| | baoyu-markdown-to-html | MD → 精美 HTML（微信兼容） |
| **排版** | baoyu-slide-deck | 内容 → 幻灯片图片序列 |
| **发布** | baoyu-post-to-wechat | 发布到微信公众号（API + Chrome CDP） |
| | baoyu-post-to-x | 发布到 X/Twitter（真实 Chrome 防 Ban） |
| **辅助** | baoyu-compress-image | 图片压缩（WebP/PNG） |
| | blog-post-writer | 零散想法 → 公众号文章 |

---

## 🧰 第七类：实用工具

| 技能 | 核心机制 | 什么时候用 |
|------|---------|-----------|
| **agent-browser** | CLI 浏览器自动化（导航/截图/点击/填表/并行会话/加密认证） | 操作网页、抓数据 |
| **download-anything** | yt-dlp/aria2/gallery-dl 等 CLI 包装器，支持 1800+ 站点 + 中文网盘搜索 | 下载视频/音频/电子书 |
| **markdown-converter** | uvx markitdown（零安装） | 文档转 MD |
| **icon-retrieval** | Iconify 搜索 SVG 图标 | 找图标 |
| **hand-drawn-icon** | better-icons 搜索 + 手绘 SVG 生成 | 手绘风格图标 |
| **data-analysis**（全局） | 全链路分析（CSV/Excel/PDF/DOCX/MD/图片），三步流程（安全探查→质量体检→清洗统计可视化） | 数据分析 |
| **daily-review**（全局） | 每日复盘三问（进展/卡点/关键动作） | 每日复盘 |
| **deep-review**（全局） | 周/月维度的工作模式分析 | 长期工作回顾 |
| **ffmpeg-usage**（全局） | FFmpeg 全面音视频处理 | 音视频转换/拼接/压缩/GIF/字幕 |
| **remotion-video**（全局） | React 编程式 MP4 视频 | 数据驱动视频生成 |
| **workflow-automator**（全局） | CI/CD/脚本/Git Hooks/定时任务 | 自动化配置 |
| **webapp-testing**（全局） | Playwright 本地 Web 测试 | 前端测试 |
| **deepl**（全局） | DeepL API 翻译 | 翻译（文档/XLIFF） |
| **feishu-doc-reader**（全局） | 飞书开放 API | 飞书文档读取 |

---

## ⚙️ 第八类：系统注入 & 元技能

自动触发或管理其他技能。

| 技能 | 触发方式 | 干什么 |
|------|---------|--------|
| **arming-thought** | 每次会话启动自动 | 建立"实事求是"总原则 |
| **ownership-skills** | 任务遇阻时触发 | 穷尽办法，不轻言放弃 |
| **skill-creator** | 主动调用 | 创建/评估/迭代技能（双盲测试对比） |
| **darwin-skill** | 主动调用 | 8 维评分自动优化 SKILL.md |
| **find-skills** | 主动调用 | 搜索并安装新技能 |

---

## 🔍 第九类：MyAgents 集成

| 技能 | 干什么 |
|------|--------|
| **getnote** | 保存内容到 Get 笔记 |
| **ima-note** | IMA 个人笔记 API 管理 |
| **wake** | 会话启动加载 |
| **update-memory** | 每周记忆维护 |
| **update-memory-rules** | 夜间自动记忆注入 |
| **observer** | 对话结束记录洞察 |
| **checklist** | 上下文整理与步骤核实 |
| **plan5** | 五文件工作流 |
| **think** | 思考显性化 |
| **ultrawork** | 超强工作模式 |

---

## 🧹 待处理

### Broken Symlinks（项目级）
`caveman` 及变体（5 个）、`compress` — 均指向不存在的 `.agents/skills/`，建议删除。

### 无描述全局技能（24 个）
`browse`, `canary`, `careful`, `checkpoint`, `cso`, `design-consultation`, `design-html`, `design-review`, `design-shotgun`, `document-release`, `freeze`, `guard`, `health`, `learn`, `office-hours`, `open-gstack-browser`, `retro`, `setup-browser-cookies`, `setup-deploy`, `ship`, `unfreeze`, `autoplan`, `benchmark`, `land-and-deploy`
建议逐个打开看看，无用的清掉。

### 重复
`frontend-design`（全局和项目各一份）、`workspace-tidy`（同）— 项目级优先。

---

## 我的建议

### 按你的工作流推荐的 Top 10

**做一个述职 PPT 的标准流程（从零到交付）：**
1. **work-expression** — 先口述你的工作内容，润色成专业表达
2. **work** — 用场景模板梳理你要讲的结构
3. **a4-report** — 如果需要正式报告形态，先生成报告框架
4. **data-visualization** — 数据做成麦肯锡风格图表
5. **mino-pptx** — 成 PPT（14 种设计模式够你选）

**做供应商决策：**
1. **supplier-mentor** — 先咨询导师，过一遍 13 个认知模式
2. **person-observer** — 如果涉及关键人物，先建立/补充人物档案
3. **work** — 场景模板辅助思考
4. **official-doc** — 输出正式公文

**日常知识沉淀：**
1. **kw-workflow** — 本周遇到的重要分析，跑一遍完整工作流
2. **knowledge-distiller** — 从材料中萃取洞察
3. **daily-letter** — 每天自动写书信相当于每天自己做回顾

### 全局技能的宝藏

Baoyu 那 16 个技能形成一个完整的内容生产管线 — 从配图、信息图、排版到公众号/Twitter 发布。如果你有对外内容产出的需求（比如写公众号、发小红书），这是一个完整的流水线，调用一次就通。

### 两个值得删的冗余

- `chart-visualization-skills` 是 chart-visualization 的旧辅助，建议合并或删除
- 24 个无描述全局技能大概率是历史残留，逐个确认后清理

### 优先级矩阵

```
               高频率使用                   低频率使用
高价值    supplier-mentor, work-expression   data-visualization, mino-pptx
         work, kw-workflow, official-doc    a4-report, presentation-skill
低价值    xlsx, markdown-converter           大部分前端/设计技能
         daily-letter, person-observer       Baoyu 套件（除非有发布需求）
```
