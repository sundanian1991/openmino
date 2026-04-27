---
input: 用户消息
output: 匹配的相关技能
pos: .claude/skills/TRIGGER-INDEX.md
---

# 技能触发词索引

> 最小化索引 — 用于匹配用户消息触发相关技能
>
> **设计原则**：从 ~5000 tokens 压缩到 ~500 tokens，触发时再加载完整 SKILL.md

---

## 文档处理

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| document-writer | 起草、审批、公文、邮件模板、汇报、通知 | 专业公文起草（Markdown 输出） |
| pdf | PDF、提取、合并、拆分、合同 | PDF 处理全流程 |
| docx | Word、文档、修订、制度 | Word 文档操作 |
| pptx | PPT、幻灯片、演示、述职 | PPT 创建编辑 |
| xlsx | Excel、表格、KPI、数据统计 | Excel 数据处理 |
| summarize | 总结、摘要、这个链接、视频讲了什么 | URL/内容快速摘要 |
| getnote | 笔记、记下来、保存到笔记、知识库 | Get 笔记管理 |

---

## 代码开发

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| frontend-patterns | React、前端模式、组件 | React/Next.js 最佳实践 |
| frontend-design | 网页、界面设计、UI | 生产级前端设计 |
| frontend-slides | HTML 幻灯片、动画演示 | HTML 动画幻灯片 |
| github | PR、CI、Issue、GitHub | GitHub CLI 集成 |
| testing-patterns | 测试、单元测试、E2E | 测试策略 |
| systematic-debugging | 调试、Bug、排查 | 系统化调试 |
| tdd-agentic | TDD、测试驱动 | AI 协作 TDD |

---

## 数据分析

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| data-storytelling | 数据可视化、数据报告、数据沟通、图表设计、业绩汇报、可视化规范 | 端到端数据沟通流程（受众→选图→清晰→迭代） |
| survey-analysis | 问卷、调研、数据分析 | 问卷分析全流程 |
| supplier-capacity-adjustment | 分量调整、供应商人力 | 供应商分量调整 |
| report-builder | 报告、数据报告 | 结构化报告构建 |
| evaluating-trade-offs | 权衡、对比、利弊 | 决策权衡分析 |

---

## 浏览器自动化

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| agent-browser | 打开网页、截图、填表、抓取数据 | 浏览器自动化 |
| claude-for-browsers | Safari、Chrome、真实浏览器 | 控制真实浏览器 |
| webapp-testing | Playwright、前端测试 | 前端功能测试 |
| download-anything | 下载、电子书、视频、资源 | 数字资源下载 |

---

## 内容创作

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| content-creation | 博客、社交媒体、营销内容 | 营销内容起草 |
| copywriting | 文案、落地页、营销文案 | 营销文案撰写 |
| copy-editing | 文案润色、编辑、改进 | 文案编辑审查 |
| seo-audit | SEO、排名、技术审查 | SEO 技术审查 |

---

## 职业发展

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| career-coach | 职业困惑、成长、职业发展 | AI 职业导师 |
| building-a-promotion-case | 晋升、述职、答辩 | 晋升案例准备 |
| leader-interrogation | 领导质询、演练、预演 | 领导模拟质询 |
| leader-sim | 压力测试、多轮质询 | 领导模拟压力测试 |

---

## 沟通与写作

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| written-communication | 备忘录、战略文档 | 高效书面沟通 |
| writing-clearly | 清晰写作、简洁 | 清晰写作原则 |
| speech-structure | 演讲、汇报口述 | 演讲叙述结构 |
| running-effective-meetings | 会议、高效会议 | 高效会议指南 |
| stakeholder-alignment | 干系人、对齐、批准 | 干系人对齐 |
| managing-up | 向上管理、高管沟通 | 向上管理 |

---

## 产品与设计

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| ux-designer | UX、线框图、用户流程 | 用户体验设计 |
| web-design-expert | 网页视觉、配色、排版 | 网页视觉设计 |
| top-design | 作品集、落地页设计 | 高端网页设计 |
| pricing-strategy | 定价、免费付费 | 定价策略设计 |

---

## 系统思维与学习

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| systems-thinking | 系统思维、复杂问题 | 系统思维分析 |
| deep-reading-analyst | 深度分析、解读、洞察 | 深度阅读分析 |
| steal-learning | 萃取、学习方法、他人经验 | 极简信息萃取 |

---

## 工作流与效率

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| skill-creator | 创建技能、新技能 | 创建和改进技能 |
| using-superpowers | 技能检查 | 技能激活检查 |
| planning-with-files | 任务规划、文件规划 | 文件化任务规划 |
| weekly-report | 周报、周会、工作总结 | 周报自动生成 |
| email | 发邮件、SMTP、邮件模板 | 邮件发送与模板 |
| official-docs | 公文、审批、通知 | 专业化公文模板 |

---

## 浏览器自动化

| 技能 | 触发词 | 一句话描述 |
|------|--------|-----------|
| agent-reach | 抓取、YouTube、B站、RSS | 全网信息抓取 |

---

## 使用方法

**匹配逻辑**：
1. 扫描用户消息中的关键词
2. 匹配触发词（部分匹配即可，如"下载这个视频"匹配 download-anything）
3. 命中时调用 `Skill` 工具加载完整 SKILL.md

**优先级**：
- 高频技能（email、document-writer、weekly-report）：优先匹配
- 专业技能（数据分析、职业发展）：精确匹配
- 工具技能（pdf、xlsx、github）：需求明确时匹配

---

## Token 节省估算

| 对比项 | 原方案 | 新方案 | 节省 |
|--------|--------|--------|------|
| 系统提醒注入 | ~73 技能描述 (~5000 tokens) | 本索引 (~800 tokens) | ~84% |
| 触发时加载 | 无 | 完整 SKILL.md (~200 tokens) | 按需 |

---

*创建时间：2026-03-16 — 上下文优化方案*