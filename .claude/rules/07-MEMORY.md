---
summary: "Curated long-term memory"
read_when:
  - Main session only
---
# MEMORY.md - Long-Term Memory

This file is the agent's compact long-term memory. It should hold durable working principles, project indexes, and stable shared context.

Do not use this file as a transcript. Detailed project history belongs in topic files; daily raw notes belong in dated logs.

## Memory Architecture

| Layer | Path | Purpose |
|---|---|---|
| Core memory | `.claude/rules/07-MEMORY.md` | Compact principles, current project index, durable decisions |
| User context | `.claude/rules/05-USER.md` | Stable user preferences and context |
| Topic memory | `memory/topics/<name>.md` | Detailed project or theme history |
| Daily notes | `memory/YYYY-MM-DD.md` | Raw chronological notes from recent work |

Information should flow from raw notes to topic files, then into this file only when it becomes broadly useful.

## Rules

- Store each fact in one place. Link or point to detail instead of duplicating it.
- Prefer dated, concrete memories over vague impressions.
- Remove or demote stale context during maintenance.
- Keep this file short enough to remain useful when automatically loaded.
- When the memory structure changes, update the relevant instructions and templates together.

## Current Context

- **供应商管理目标树**（2026-07-22）：MyAgents Space `gong-ying-shang-guan-li` 三层目标树已建成（战略3+战术5），15 Issues 挂载，#7浙江阅文已关闭，逐个确认推进中。详见 `memory/topics/supplier-management.md`
- **分级盘点模板**（2026-07-29）：赛马数据（1-6月×11家×首贷/复贷）已灌入，Sheet5拆分为首贷/复贷独立评级，所有sheet公式就绪。待填SLA/稳定性/供管自评后出ABC评级。详见 `memory/topics/supplier-management.md` "分级盘点SOP进展"
- **金条低分电销项目**（2026-07-22）：与蚂蚁、天创等第三方机构合作，存在竞对合作+数据合规风险，法务评估需先提交完整合作模式文字描述再评估，预计八月初启动
- **Agent Reach + last30days**（2026-07-22）：已安装到本地环境。Agent Reach 11/15 渠道可用（GitHub/YouTube/Twitter/Reddit/小红书等），last30days v3.16.0 核心文件已就绪
- **voice-workstation**（2026-07-29）：P4 布局统一完成（PageContainer/LoadingSpinner/ConfirmDialog/Skeleton），P5 商业化 UI 优化进行中（视觉精细化、微交互、品牌感）
- **Superpowers 插件**（2026-07-22）：已安装到 MyAgents（v5.0.7），包含 14 个核心技能（TDD、调试、协作模式等）
- **AI长周期任务协作教学材料**（2026-07-22）：迭代3版，v3-task-cards.html 采用问题卡片式布局，用户反馈待验证
- **CloudBase MCP 生图流程**（2026-07-09）：配置已完成，待新会话验证工具加载
- **guizang-material-illustration 技能**（2026-07-09）：已安装并链接，能力边界已分析
- **电视机海报项目**（2026-07-09）：J-Space 概念插图生成 + HTML 海报页面已完成
- **qiaomu-anything-to-notebooklm 技能**（2026-07-29）：仓库文件补全 + notebooklm CLI 装好登录 + weixin-reader MCP 配置写入（待重启生效）。微信抓取走 getnote MCP（fetch_url.sh 对微信失效）。详见 `memory/topics/tools/qiaomu-notebooklm.md`
- **人机协同课程设计**（2026-07-29）：3个资源已分析（你的课程+Vibe OS+JD课程），优化方案v2已出：交互式方法中心+三层方法地图+真实案例+技能包。待获取JD课程03-10结构信息。详见 `memory/topics/human-ai-collaboration-course.md`

Add the current state of important projects here as short pointers. Put detailed timelines in `memory/topics/`.

## Durable Lessons

Add cross-project lessons and working principles here when they have repeated value.

### Homebrew Python 装 CLI 工具（2026-07-29）

**用 pipx，不用 pip3**。Homebrew Python 启用 PEP 668，`pip3 install` 报 "externally-managed-environment"。
- CLI 工具：`pipx install <pkg>`，装在 `~/.local/bin`（`pipx ensurepath` 加 PATH，需重开终端）
- pipx 隔离环境缺可选依赖时（如 notebooklm 缺 playwright）：`pipx inject <pkg> <dep>`，不要 `pip3 install`（系统的包不共享给 pipx 隔离环境）
- 反例：rookiepy 在 Python 3.14.6 无预编译 wheel，装不上——新 Python 版本下依赖 Rust 编译的包常踩坑，提前判断止损

### 目标树设计原则（2026-07-22）

**三层结构优于扁平罗列**：
- 战略层：方向锚，对应能力水位和晋升叙事
- 战术层：管理动作分类（如选用育留汰）
- 执行层：Issues 追踪具体任务

**目标描述要有立场**：
- 先说"为什么存在"（连接上层愿景）
- 再说"怎么做"（具体原则）
- 避免写成任务清单

**AI协作分层设计**：
- 战略层：方向锚（告诉AI长期方向）
- 战术层：流程触发器（按节奏主动提醒）
- 执行层：任务执行单元（具体Issue驱动）

**失败模式**：
- 把不同层级的概念并列（如"准入清退"和"联盟运营"并列）
- 缺少战略高度，只有战术动作
- 没有考虑晋升叙事

### 代码重构经验（2026-07-22）

**提取共享组件/ Hook 的判据**：
- 三个以上组件有相同逻辑 → 提取
- 一个组件独有逻辑多 → 保留专用 hook
- 函数间共享状态多 → 不拆分文件

**kw-workflow 适用场景**：
- 复杂问题需要系统化分析
- 不确定从哪开始
- 需要完整闭环（brainstorm → plan → review → work）

### 教学材料设计原则（2026-07-22）

**问题驱动 > 信息展示**：
- 用户是来解决问题的，不是来听课的
- 先问"用户遇到什么问题"，再给解决方案
- 每个问题对应一张卡片：问题→原因→操作→验证

**操作步骤要可直接复制**：
- 用户不想理解原理，只想复制prompt开始用
- 验证方法很重要：用户需要知道"怎么知道做对了"

**失败模式**：
- 信息密度过高 → 用户不知道从哪开始
- 理论太多 → 用户不知道怎么用
- 缺少验证方法 → 用户不知道做对没有

### 会议纪要整理方法论（2026-07-22）

**三层输出体系**：
1. **完整会议纪要**：结构化排版，含背景、流程、风险、决策、待办（给存档和追溯）
2. **老板汇报材料**：书面版，突出风险升级处理，结论在前理由在后（给向上汇报）
3. **早会同步材料**：口语化版本，简洁直接，说清楚下一步（给团队同步）

**整理原则**：
- 结论在前，理由在后
- 风险点要显式标出，不能藏在细节里
- 待办事项必须明确责任方和截止时间
- 口语化版本要精简到核心信息，去掉书面语

**失败模式**：
- 只有完整纪要，没有分层输出 → 不同场景需要不同版本
- 口语化版本太书面 → 早会念起来像读稿
- 风险点不突出 → 老板看不到关键问题

### Excel 模板工作原则（2026-07-29）

**公式优先于数值**：用户要改扣分项后自动联动，写死数值=白做。所有计算列必须用Excel公式。

**公式链太长时 Excel 可能不自动重算**：跨sheet引用3层以上（Sheet1→Sheet5→Sheet6），打开时可能显示空值。解决方案：设 `fullCalcOnLoad=True` 或提示用户 Ctrl+Alt+F9 强制重算。

**拆分维度要考虑管理粒度**：年老师汇报后要求首贷/复贷分开评级——"首贷有问题就首贷做管理"。设计模板前先确认管理视角，不要自行合并维度。

**清空操作要小心合并单元格**：openpyxl 的 `unmerge_cells` + 重新 `merge_cells` 容易因 border/NoneType 报错。先清值再处理合并。

**失败模式**：
- 写死数值 → 用户改了上游数据，下游不联动
- 清空区域误删表头 → 用户打开看到空表
- 公式引用行偏移 → 数据错位（如引用 row4 但数据在 row6）

### 商业化 UI 设计标准（2026-07-29）

**视觉精致度**：
- 卡片阴影、圆角、边框需要更细腻
- 间距系统要统一（使用 CSS 变量）
- 颜色对比度要符合 WCAG AA 标准

**微交互**：
- hover效果要丰富（上浮、放大、高亮）
- 点击反馈要及时（scale 变换）
- 过渡动画要流畅（使用 CSS transition）

**品牌感**：
- 需要独特的品牌视觉元素（logo、品牌色）
- 视觉识别度要高
- 与竞品有明显区分

**细节处理**：
- 文字大小、行高、字间距要精心调整
- 空状态设计要精致
- 图标大小、颜色要统一

**可访问性**：
- 键盘导航要完整
- 屏幕阅读器要支持
- 颜色对比度要足够

**失败模式**：
- 只有功能没有设计感 → 用户觉得"丑"
- 微交互缺失 → 用户觉得"不流畅"
- 品牌感弱 → 用户记不住产品
- 细节粗糙 → 用户觉得"不专业"
