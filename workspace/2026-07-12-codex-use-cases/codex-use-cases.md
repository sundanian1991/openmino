# Codex Use Cases 完整整理

> 来源：https://developers.openai.com/codex/use-cases
> 国内访问需代理，备用域名：https://learn.chatgpt.com/codex/use-cases
> 整理时间：2026-07-12

---

## 概览

OpenAI 开发者关系负责人 Romain Huet 发布的 Codex 官方用例库。页面标题显示为 "ChatGPT use cases"，实际内容覆盖 ChatGPT Work 和 Codex 两类工作流。

**核心特性**：
- 每个用例提供可复制的 **Starter Prompt**
- 已安装 Codex 应用可**一键加载** starter prompt
- 用例按 **12 个分类（Collections）** 组织

---

## 12 个分类

| 分类 | 定位 |
|------|------|
| Productivity & Collaboration | 跨应用、数据、团队的协作 |
| Business Operations | 把目标上下文和指标转化为可决策的工作 |
| Data Science | 问题、仪表盘、原始数据 → 可审核的分析 |
| Web development | 从设计和提示词构建响应式 UI |
| Game development | 快速原型、UI、游戏玩法 |
| Native development | 构建和调试 iOS/macOS 应用 |
| Production systems | 理解、重构、审查真实代码库 |
| Security | 评估代码、审查变更、修复安全问题 |
| Finance | 从财务模型和运营数据中构建、审查、报告 |
| Sales | 把客户上下文和交易信号转化为管线行动 |
| Life Sciences | 用 GPT-Rosalind 加速科研和药物发现 |
| Education | 教学、学习、学术工作 → 可审核的成果 |

---

## 全部用例清单

### Featured（推荐）

| 用例 | 描述 | 标签 |
|------|------|------|
| Manage your inbox | 找到重要邮件，用你的语调写回复 | Automation, Integrations |
| Use your computer with ChatGPT | 让 ChatGPT 在 Mac 上点击、输入、导航应用 | Knowledge Work, Workflow |
| Follow a goal | 给 Codex 一个持久目标，长时间自主工作 | Engineering, Automation |

### Productivity & Collaboration

| 用例 | 描述 |
|------|------|
| Create a daily work brief | 日历、消息、邮件、项目上下文 → 聚焦计划 |
| Learn a new concept | 把密集的论文/规范/技术指南变成定义、例子、问题 |
| Coordinate new-hire onboarding | 准备入职追踪器、团队摘要、欢迎空间草稿 |
| Delegate multi-step workflows | 从多个应用收集审批输入，准备工作流 |
| Keep work moving | 检查信息源，只返回需要关注的项目 |
| Complete tasks from messages | 把 iMessage 线程转化为跨应用的已完成工作 |
| Turn feedback into actions | 从多个来源综合反馈，生成可审核的成果 |
| Clean and prepare messy data | 处理表格数据，不影响原始文件 |
| Query tabular data | 对 CSV、电子表格、导出文件提问 |
| Build a reproducible analysis | 清理和连接数据集，探索假设，打包结果 |
| Generate slide decks | 操控 pptx 文件 + 图像生成，自动化幻灯片制作 |

### Business Operations

| 用例 | 描述 |
|------|------|
| Prepare an initiative health update | 把定期项目上下文转化为清晰的领导层报告 |
| Write an initiative off-track brief | 解释什么变了、为什么延期、需要什么决策 |
| Scope an analytics request | 把模糊的利益相关者需求转化为验证过的分析计划 |
| Turn research into a decision memo | 综合证据、权衡、开放问题 → 一份建议 |
| Prepare a leadership reporting pack | 公司进展、财务指标、负责人更新 → 背书的报告包 |
| Prepare a business review | KPI、结账、预测输入 → 有来源的绩效叙述 |

### Data Science

| 用例 | 描述 |
|------|------|
| Analyze datasets and ship reports | 混乱数据 → 清晰分析和可视化 |
| Turn feedback into actions | 多源反馈综合 → 可审核成果 |
| Clean and prepare messy data | 表格数据处理，保留原件 |
| Query tabular data | 对数据文件提问 |
| Forecast cash flow | 在可编辑的预测工作簿中找到流动性低点 |
| Model a DCF valuation | 财务输入 → 可编辑的估值工作簿 |
| Review budget vs. actuals | 计划、实际、结账注释 → 差异工作簿 |
| Plan a dashboard and monitoring workflow | 定义指标、负责人、质量检查、决策支持 |
| Analyze KPI root causes | 用证据解释异常指标变动 |
| Build a variance driver bridge | 解释实际、预算、预测之间的变动 |
| Calibrate assessments | 审查评分模式，不分配或更改成绩 |

### Web development

| 用例 | 描述 |
|------|------|
| Build responsive front-end designs | 截图和视觉参考 → 响应式 UI + 视觉检查 |
| Make granular UI changes | 用 Codex-Spark 在现有应用中快速迭代 UI |
| Deploy an app or website | 构建/更新 Web 应用，部署预览，获取线上 URL |
| Turn Figma designs into code | Figma 选区 → 精致 UI + 结构化设计上下文 + 视觉检查 |
| Get from idea to proof of concept | 用 ImageGen 视觉探索概念，构建第一个版本 |
| Build a student website | 把想法和素材变成测试过的第一个版本 |
| Adopt liquid glass | 迁移 SwiftUI 应用到 Liquid Glass（iOS 26 + Xcode 26） |

### Game development

| 用例 | 描述 |
|------|------|
| Create browser-based games | 定义游戏计划，Codex 在浏览器中构建和测试 |

### Native development

| 用例 | 描述 |
|------|------|
| Build for iOS | 构建、调试 SwiftUI iPhone/iPad 应用 |
| Build for macOS | 构建、调试原生 Mac SwiftUI 应用 |
| Build a Mac app shell | 构建 Mac 原生 SwiftUI 应用框架（侧边栏、详情面板、检查器） |
| Debug in iOS simulator | 用 Codex + XcodeBuildMCP 在模拟器中驱动应用、捕获证据 |
| Add iOS app intents | 让应用的操作和内容支持 Shortcuts、Siri、Spotlight |
| Add Mac telemetry | 为 Mac 功能插桩 Logger，运行应用，验证操作 |
| Refactor SwiftUI screens | 把过大的 SwiftUI 屏幕拆分成小子视图 |
| Run code migrations | 在受控检查点迁移遗留技术栈 |

### Production systems

| 用例 | 描述 |
|------|------|
| Understand large codebases | 追踪请求流、映射陌生模块、快速找到正确文件 |
| Automate bug triage | 把每日 bug 报告转化为优先级列表，自动化扫查 |
| Review GitHub pull requests | 在人工审查前捕获回归和潜在问题 |
| Kick off coding tasks from Slack | 把 Slack 线程转化为有范围的云任务 |
| Refactor your codebase | 删除死代码、现代化遗留模式，不改变行为 |
| Keep documentation up to date | 用代码和其他来源自动化文档更新 |
| Save workflows as skills | 创建 Codex 可保留的可重复使用技能 |
| Iterate on difficult problems | 用 Codex 作为评分改进循环解决难题 |

### Security

| 用例 | 描述 |
|------|------|
| Run a deep security scan | 深度搜索授权仓库，查找可能的漏洞 |
| Scan code changes for security | 审查 PR 或本地 diff 中的安全回归 |
| Remediate a vulnerability backlog | 把已审查的发现转化为最小修复 + 回归证据 |
| Audit dependency incidents | 把公开的包 advisory 转化为安全的仓库审计计划 |

### Finance

| 用例 | 描述 |
|------|------|
| Forecast cash flow | 找到可编辑预测工作簿中的流动性低点 |
| Model a DCF valuation | 财务输入 → 可编辑估值工作簿 |
| Review budget vs. actuals | 计划、实际、结账注释 → 差异工作簿 |
| Clean and review a financial model | 审查前检查公式、链接、对账、假设 |
| Refresh a forecast and plan | 更新假设，比较基准、乐观、悲观计划 |
| Build a variance driver bridge | 解释实际、预算、预测之间的变动 |
| Prepare a business review | KPI、结账、预测 → 有来源的绩效叙述 |

### Sales

| 用例 | 描述 |
|------|------|
| Prioritize accounts | 按风险、潜力、紧迫性、下一步行动排名客户 |
| Review forecast risk | 决定哪些交易属于 commit、upside 或 pull |
| Diagnose a stalled deal | 找到真正的阻碍和下一步客户行动 |
| Refresh a strategic account plan | 把最近的客户活动转化为当前的交易策略包 |

### Life Sciences

| 用例 | 描述 |
|------|------|
| Discover protein folding models | 把蛋白质折叠假设转化为基准测试的实验循环 |
| Prioritize drug targets | 跨多个证据通道排名药物靶点 |
| Annotate scRNA-seq data | 在一个任务中审查单细胞 QC、注释和 UMAP |
| Validate bulk RNA-seq inputs | 差异表达前验证批量 RNA-seq 输入 |

### Education

| 用例 | 描述 |
|------|------|
| Learn a new concept | 把密集素材变成清晰的学习报告 |
| Build a unit plan from source files | 把标准、节奏、以往课程变成可教授的序列 |
| Create a lesson deck | 把批准的教学材料变成可编辑的演示文稿 |
| Create a classroom materials pack | 制作对齐的教学、练习、家庭材料 |
| Build an interactive lesson resource | 把批准的课程包变成测试过的学生体验 |
| Refresh course materials | 把课程作为一个连接系统来审查 |
| Revise a lesson package | 把批准的反馈一致地应用到关联文件 |
| Organize a lesson or unit folder | 把分散的教学文件变成清晰、验证过的结构 |
| Organize a semester workspace | 把分散的课程文件和截止日期变成一个验证过的系统 |
| Track course engagement | 把去标识化的课程导出变成教师审查视图 |
| Audit course section consistency | 比较共享课程，保留教师自主权 |
| Build an exam study system | 把课程材料变成可重复使用的计划和练习集 |
| Run a student club project | 在一个中心协调计划、负责人、预算和跟进 |
| Track job applications | 比较职位，管理定制的申请材料 |

### 其他跨领域用例

| 用例 | 描述 |
|------|------|
| Turn meetings into follow-ups | 把 Zoom 会议洞察转化为跨工具的行动 |
| QA your app with Computer Use | 点击真实产品流程，记录问题 |
| Upgrade your API integration | 升级应用到最新的 OpenAI API 模型 |
| Prepare meeting briefs | 把日历上下文转化为议程和笔记计划 |
| Follow a goal | 给 Codex 持久目标，长时间自主工作 |
| Draft PRDs from internal context | 从 Linear、Slack、源文档、会议记录创建 PRD |
| Build an interactive lesson resource | 把课程包变成测试过的学生体验 |
| Measure business impact | 把实验/上线结果转化为规模化、变更或停止建议 |
| Model strategic scenarios and tradeoffs | 比较战略路径：假设、风险、成本、时间、影响 |
| Prepare a committee packet | 把治理上下文转化为可审核的会议包 |
| Refresh a forecast and plan | 更新假设，比较多情景计划 |

---

## 关键信息

**Starter Prompt**：每个用例页面都提供可复制的 starter prompt，描述任务目标、上下文、输出格式和约束。

**一键加载**：如果已安装 Codex 桌面应用，点击页面上的按钮可直接在 Codex 中打开对应的 starter prompt。

**Tags**：每个用例标注了适用的工具/能力标签（如 Automation、Integrations、Data、Engineering 等），方便按场景筛选。

**难度和时间**：部分用例标注了难度（Easy/Medium/Hard）和预估时间（如 5m、30m、2h）。
