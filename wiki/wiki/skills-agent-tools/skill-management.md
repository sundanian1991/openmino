# 技能管理与评测体系

> Sources: MyAgents, 2026-04-27
> Raw:[skill-creator](../../raw/skills/skill-creator-SKILL.md); [analyzer](../../raw/skills/skill-creator-analyzer.md); [comparator](../../raw/skills/skill-creator-comparator.md); [grader](../../raw/skills/skill-creator-grader.md); [schemas](../../raw/skills/skill-creator-schemas.md); [find-skills](../../raw/skills/find-skills-SKILL.md)

## 概述

skill-creator 是一套完整的技能生命周期管理系统，覆盖从零创建、迭代评测、盲测对比到描述优化的全流程。配套的 Grader、Blind Comparator、Post-hoc Analyzer 三个专业子代理负责量化评测与归因分析。find-skills 则负责从外部生态发现和安装技能。

## 技能创建流程

创建技能遵循"意图捕捉 → 调研确认 → 编写 SKILL.md → 测试验证 → 迭代优化"的线性流程。

**意图捕捉阶段**需要明确四个核心问题：技能要让 Claude 做什么、什么场景触发、预期输出格式是什么、是否需要测试用例验证。客观可验证的技能（文件转换、数据提取、代码生成、固定工作流）建议配置测试用例；主观输出类技能（写作风格、设计审美）通常不需要断言，以人工评审为主。

**调研阶段**需要主动向用户询问边界情况、输入输出格式、示例文件、成功标准和依赖关系。如果可用的 MCP 工具适合做调研（搜索文档、查找类似技能、查找最佳实践），应通过子代理并行执行。

**SKILL.md 编写**包含四个组件：name（技能标识）、description（触发条件与功能描述，同时包含"做什么"和"何时用"）、compatibility（可选的依赖声明）、以及技能主体说明。description 是技能触发的主要机制，需要写得略有"推动性"——不仅描述功能，还要明确列举触发场景和关键词，防止 Claude 在需要用时不触发技能。

技能遵循三级渐进式加载机制：Metadata（name + description，始终在上下文，约 100 词）、SKILL.md body（触发时加载，建议不超过 500 行）、Bundled resources（按需加载，包含 scripts/、references/、assets/ 三个子目录）。当 SKILL.md 接近 500 行上限时，应增加分层结构并给出明确的跳转指引。支持多领域或多框架的技能应按变体组织 references/ 目录，Claude 只读取相关参考文件。

## 测试与评测工作流

评测是"生成测试用例 → 并行执行 → 起草断言 → 分级评分 → 聚合汇总 → 可视化评审 → 读取反馈 → 迭代改进"的闭环。

**测试用例管理**：测试用例保存在 `evals/evals.json` 中，每个用例包含 id、prompt、expected_output、可选的 files 列表以及 expectations 断言列表。测试用例应该是真实用户会说的话，包含具体上下文（文件路径、公司名、列名、简短背景故事），避免抽象空泛的请求。

**并行执行**：每个测试用例在同一轮次中同时启动两个子代理——有技能版和无技能版。新建技能时基线为"无技能"；改进已有技能时基线可以是原始版本或上一轮迭代。每个运行目录需要写入 `eval_metadata.json`，包含 eval_id、eval_name、prompt 和 assertions。

**计时数据捕获**：子代理任务完成后，通知中会包含 total_tokens 和 duration_ms，必须立即保存到运行目录的 timing.json 中，这是唯一捕获时机。

**分级评分（Grader）**：Grader 子代理读取执行记录（transcript）和输出文件，对每条 expectation 进行 PASS/FAIL 判定，必须引用具体证据。Grader 还承担两项额外职责：一是从输出中提取隐含声明（事实性、过程性、质量性）并验证，捕获预设断言可能遗漏的问题；二是评审断言本身的质量——如果某条断言过于宽松（正确输出和明显错误输出都能通过），或观察到重要结果但没有任何断言覆盖，需要提出改进建议。

**聚合汇总**：使用 `scripts/aggregate_benchmark.py` 将各运行目录的 grading.json 聚合为 benchmark.json 和 benchmark.md，包含 pass_rate、time、tokens 的均值与标准差，以及 with_skill 与 without_skill 的 delta 值。

**可视化评审**：通过 `eval-viewer/generate_review.py` 启动浏览器评审页面，包含 Outputs（逐个查看测试用例输出并留反馈）和 Benchmark（量化对比统计）两个标签页。无浏览器环境（Cowork、远程服务器）使用 `--static` 参数生成本地 HTML 文件。

## 盲测对比（Blind Comparator）

盲测用于需要严格对比两个技能版本的场景。Comparator 接收两个标记为 A 和 B 的输出，但不知道哪个由哪个技能产生，仅基于输出质量进行评判。

对比流程包括：阅读两个输出、理解任务要求、生成评价量规（内容维度：正确性、完整性、准确性；结构维度：组织性、格式一致性、可用性）、按量规对每个输出打分（1-5 分）、检查期望断言通过率（如有）、确定获胜者。获胜判定优先级为：量规总分 > 断言通过率 > 真正相等时判为 TIE。

输出保存为 comparison.json，包含 winner、reasoning、rubric（双方详细评分）、output_quality（优缺点摘要）、expectation_results（如有期望断言）。核心原则是保持盲态、基于具体证据做判断、果断选择获胜方。

## 归因分析（Post-hoc Analyzer）

盲测确定胜负后，Post-hoc Analyzer 解开盲态，通过检查技能文件和执行记录来分析"为什么赢家赢了"以及"如何改进输家"。

分析涵盖六个维度：读取对比结果理解评判标准、对比双方 SKILL.md 找出结构性差异（指令清晰度、脚本使用模式、示例覆盖、边界情况处理）、对比执行记录评估指令遵循程度、识别赢家强项、定位输家弱点、生成按影响优先级排序的改进建议。

改进建议按六个类别组织：instructions（技能说明文字变更）、tools（脚本/模板/工具增减）、examples（示例输入输出补充）、error_handling（失败处理指引）、structure（内容重组）、references（外部文档引用）。优先级分为 high（可能改变对比结果）、medium（提升质量但不一定改变胜负）、low（边际改进）。

Analyzer 还有一个独立的"基准分析"模式，用于审查多轮基准运行结果并发现模式：某条断言是否在两种配置下都始终通过（不具区分性）、是否始终失败（可能超出能力范围）、是否只在有技能时通过（技能确有价值）、是否在有技能时反而失败（技能可能有副作用）、是否高度不稳定（断言脆弱或行为非确定）。同时分析跨测试用例难度差异、指标模式（时间、token、工具调用量）等聚合指标无法揭示的细节。

## 描述优化

description 字段是技能触发的核心机制。优化流程分为四步：

**生成测试查询集**：创建 20 条查询，包含应触发（8-10 条）和不应触发（8-10 条）。应触发查询需覆盖不同表达方式（正式/随意）、隐式需求（不直接说出技能名但实际需要）、边缘用例。不应触发查询最有价值的是"擦边球"——包含相似关键词但实际需要不同能力的查询，而非明显无关的请求。

**用户审核**：通过 HTML 模板页面展示查询集，用户可编辑查询内容、切换 should_trigger 状态、增删条目，导出为 eval_set.json。

**优化循环**：运行 `scripts/run_loop` 在后台执行自动优化。将查询集分为 60% 训练集和 40% 保留测试集，每轮对当前描述进行 3 次重复执行以获取可靠触发率，然后调用 Claude 扩展思考提出改进建议，在训练集和测试集上重新评估，最多迭代 5 轮。最终选择基于测试集分数而非训练集分数的最佳描述，避免过拟合。

**应用结果**：将 best_description 更新到 SKILL.md 的 frontmatter 中，向用户展示修改前后对比和分数报告。

## 核心数据结构

**evals.json**：定义技能的测试用例集，位于技能目录下的 evals/ 中。每个用例包含 id、prompt（任务提示）、expected_output（预期结果描述）、files（可选输入文件路径）、expectations（可验证断言列表）。

**grading.json**：Grader 的输出结果，包含 expectations 数组（每条断言的 text、passed、evidence）、summary 汇总（passed/failed/total/pass_rate）、execution_metrics（工具调用统计）、timing（时间数据）、claims（提取并验证的隐含声明）、user_notes_summary（执行者标注的不确定性和变通方案）、eval_feedback（断言改进建议）。

**comparison.json**：盲测对比结果，包含 winner、reasoning、rubric 双方评分、output_quality 优缺点、expectation_results 断言对比结果。

**analysis.json**：归因分析结果，包含 comparison_summary、winner_strengths、loser_weaknesses、instruction_following 评分、improvement_suggestions 改进建议（含 priority、category、suggestion、expected_impact）、transcript_insights 执行模式对比。

**benchmark.json**：基准测试汇总，包含 metadata（技能名称、时间、模型信息）、runs（每条运行的详细结果）、run_summary（按配置分组的统计汇总与 delta 值）、notes（分析者观察记录）。其中 configuration 字段必须为 "with_skill" 或 "without_skill"，viewer 依赖这两个精确字符串进行分组和着色。

**timing.json**：记录执行器和分级器的起止时间与耗时，包含 total_tokens、duration_ms、executor/grader 各阶段时间戳。

**metrics.json**：执行器的工具调用统计，包含 tool_calls（按工具类型计数）、total_tool_calls、total_steps、files_created、errors_encountered、output_chars、transcript_chars。

**history.json**：Improve 模式下的版本追踪，记录每次迭代的 version、parent、expectation_pass_rate、grading_result（baseline/won/lost/tie）、is_current_best 标记。

## 技能发现与安装

find-skills 技能通过 `npx skills` CLI 帮助发现和安装外部技能。核心命令包括：`npx skills find [query]` 按关键词搜索、`npx skills add <package>` 安装技能、`npx skills check` 检查更新、`npx skills update` 更新所有已安装技能。技能市场可通过 https://skills.sh/ 浏览。

搜索时建议使用具体关键词（如 "react testing" 优于 "testing"），尝试替代术语，关注主流来源（如 vercel-labs/agent-skills、ComposioHQ/awesome-claude-skills）。未找到匹配技能时，可以直接用通用能力帮助用户完成任务，或建议用户通过 `npx skills init` 自行创建技能。

## 平台适配

skill-creator 针对不同运行平台有差异化策略：

**Claude Code**：完整支持所有功能，包括子代理并行执行、浏览器评审页面、量化基准对比、描述优化循环。

**Claude.ai**：无子代理支持，测试用例需逐个串行执行（执行者同时是技能编写者，严谨性较低但可接受）。跳过基线运行和量化基准对比，专注于用户定性反馈。跳过描述优化（依赖 claude CLI）。描述优化依赖 claude CLI 工具。

**Cowork**：有子代理但无浏览器。测试用例可并行执行（遇到超时问题时允许串行）。评审页面使用 `--static` 生成本地 HTML 文件而非启动服务器。反馈通过下载 feedback.json 文件获取而非服务器提交。打包和描述优化功能均可用。
