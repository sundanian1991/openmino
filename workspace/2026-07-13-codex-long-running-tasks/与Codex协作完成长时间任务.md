# 与 Codex 协作完成长时间任务

> 原文：[Collaborating with Codex on Long-Running Tasks](https://openai.com/index/codex-long-running-tasks/)
> 翻译校对：2026-07-13

---

Codex 可以长时间工作，尤其是在 `/goal` 给它一个持续目标的情况下。更难的部分是：当它工作数小时或数天、不断发现新的实现细节、经历多种验证时，如何保持方向感。

早期假设往往在实现开始后就发生变化。协作模型需要在保留目标的同时，给你和 Codex 留出根据新证据修订计划的空间。

过去几周，我一直在使用以下五种实践：

- 让 Codex 规划工作并维护路线图
- 让主线程聚焦于协调
- 在每个里程碑后审计路线图并审查代码
- 用本地线程做 Computer Use 测试
- 通过简洁的更新和仪表盘报告进度

*配图：Generated with GPT Image 2 in Codex*

## 1. 让 Codex 规划工作并维护路线图

我通常以对话开始，而非 `/plan` 模式。我描述想构建的东西，口述粗略想法，分享约束条件，然后让 Codex 提问，直到它有足够的上下文来提出初始计划。

这让早期讨论保持灵活。我不需要把半成品的想法变成正式规范，Codex 才能开始帮忙。它可以采访我，复述它的理解，识别缺口，逐步把对话变成可执行的计划。

随着项目成形，我让 Codex 设定当前 Goal。Goal 模式给 Codex 一个持续目标，让它能够在多轮对话中持续朝同一结果努力，直到目标完成、被阻塞或被替换。

我可以用 `/goal` 自己设定目标，但我通常让 Codex 来做。Goal 模式通过 harness 暴露，所以 Codex 可以把我们的对话、项目上下文和它目前学到的所有东西综合成一个清晰的目标。它还可以定义完成该目标所需的证据。

对于更大的项目，我会让 Codex 把更广泛的路线图写入 GOALS.md。这是一个项目约定，而非 Codex 内置功能，文件可以随意命名。

我通常围绕里程碑来组织 GOALS.md，而非扁平的任务列表。每个里程碑记录：

- 预期结果
- 当前范围内的工作
- 重要决策
- 已知阻塞项
- 继续前进前所需的证据

随着项目发展，Codex 维护这个文件。新发现可能改变里程碑的范围，引入新的里程碑，或改变完成所需的证据。

同一时间只有一个 Goal 模式目标处于激活状态。随着里程碑完成，Codex 更新 GOALS.md，激活下一个目标，并继续朝它努力。

## 2. 让主线程聚焦于协调

路线图一旦建立，我就让主线程聚焦于目标、约束、决策和当前项目状态。

它决定接下来该做什么，委派有边界的任务，并评估结果。它不需要承载每个实现细节。

一个 worker 可能花一小时阅读不熟悉的代码，尝试多种方法，或追踪一个失败的测试。协调者只需要影响更广泛项目的信息：

- worker 学到了什么
- 什么发生了变化
- 支撑证据
- 接下来该做什么

Codex 可以把这项工作委派给子代理，或创建一个独立的线程。功能上，它们能完成同样的任务。当我预计以后会重新访问这项工作时，我会用独立线程，因为它在 Codex 应用中保持可见，并保留自己的历史。

当几项工作并行运行时，这就特别有用。主线程可以继续协调项目，而每次调查、实现或审查都保持易于检查。

## 3. 在每个里程碑后审计路线图并审查代码

GOALS.md 反映的是 Codex 上次更新时已知的信息。到里程碑结束时，项目通常已经发现了新东西。

在继续之前，我让另一个线程把路线图与当前状态对比：

- 这个里程碑真的完成了吗？
- 下一个目标还是对的吗？
- 有没有遗漏的里程碑？
- 新证据是否改变了工作顺序？
- "完成"的定义还成立吗？

我在每个里程碑结束时运行这个审计，也在新证据实质性地改变项目方向时运行。

我还在实现上运行 `/review`。

假设一个登录流程的实现和远程测试都完成了。路线图审计可能注意到：没有人用真实的已登录浏览器测试过这个流程。同时，`/review` 可能发现新路径存储 token 的方式有误，即使远程测试通过了。

协调者更新 GOALS.md，委派 token 修复，添加缺失的浏览器验证，然后才激活下一个里程碑。

我通常把审计和审查放在独立的线程中。子代理可以做同样的工作，但独立线程留下一条可见的记录，我以后可以回看。

## 4. 用本地线程做 Computer Use 测试

我的大部分 Codex 会话在远程实例上运行，所以即使我合上笔记本，工作也能继续。有些检查仍然依赖我的本地机器：

- 已登录的浏览器
- 本地凭证
- Xcode
- macOS 权限
- iOS 模拟器

远程协调者可以为其中一项检查创建一个本地线程。我应用远程 diff 或检出相关的分支或 commit，让本地线程测试正确的代码。

本地线程操作浏览器或应用，返回截图、日志和发现。当检查失败时，远程 worker 修复问题，本地线程再次测试。

一个典型的循环看起来是这样的：

1. 远程 worker 实现登录流程
2. 远程测试通过
3. 本地线程使用 Codex Chrome 扩展
4. 浏览器测试发现一个重定向 bug
5. 远程 worker 修复它
6. 本地线程重复检查

项目默认保持远程状态。我的电脑只在需要时才加入。当我重新打开笔记本时，远程线程也可以持续检查本地线程是否重新可用。

## 5. 通过简洁的更新和仪表盘报告进度

Worker 线程通常报告单个任务。当我回到项目时，我需要看到整体状态：

- 什么完成了
- 什么发生了变化
- 什么还剩
- 什么需要决策

我让 Codex 在项目状态变化时报告，使用三个简短的部分：

- **已完成**
- **下一步**
- **阻塞项**

这几乎就像和 Codex 开每日站会，只不过是一小时一次。

Codex 可以通过 Slack 发送同样的更新，可以是私信，也可以是专门的项目频道。

当我在 Codex 应用中时，我也用 `/side` 来查看情况，而不打断主线程。从 side 线程，我可以询问已完成什么、还剩什么、是否有需要我帮忙的——比如手动点击、审批，或其他点击操作。

- 从 side 线程获取摘要
- 让 side 线程把我的指令传达给主线程

然后我可以澄清指令、解决阻塞、补充上下文，或让 side 线程把更新的指导发回主线程。

对于有多个里程碑或并行工作流的项目，我还维护一个 progress-dashboard.html。这是一个自定义项目产物，而非 Codex 内置 UI。它可以显示：

- 活跃目标
- 已完成的里程碑
- 证据
- 阻塞项
- 决策
- 最近更新

当我几小时后回来，无需阅读每个 worker 线程就能理解项目状态。Codex 还可以把仪表盘部署为 Site，让它可以远程访问。

## 总结

当一个项目可能涉及新发现、多项独立工作、或需要来自多个环境的证据时，我就使用这个结构。

工作流遵循一个简单循环。Codex 把初始对话变成路线图，激活一个里程碑，委派工作，在继续之前检查结果。本地线程处理需要我机器的检查，而更新和仪表盘帮助我回到项目时不必从头重建所有东西。

重要的是保持项目状态足够新，让下一个决策反映 Codex 实际学到的东西。

## 试试看

把以下内容粘贴到一个新的 Codex 线程中：

> Coordinate this as a long-running project.
>
> Begin by interviewing me about what I am trying to build. Let me describe rough ideas and constraints conversationally, then turn that discussion into an initial plan.
>
> Create GOALS.md as the shared roadmap. Organize it around milestones, with the intended outcome, scope, decisions, blockers, and evidence required for each one.
>
> Set and maintain one Goal-mode objective at a time. The active objective should correspond to the current milestone.
>
> Keep this thread focused on the objective, constraints, decisions, and project state. Delegate implementation to subagents or new threads.
>
> Require workers to return conclusions, changes, and evidence rather than full transcripts.
>
> Use separate threads when I may want to inspect, continue, or review the work later. Use subagents for bounded work that does not need its own visible history.
>
> After each milestone, use a separate thread to audit GOALS.md against the current state and run /review on the implementation. Update the roadmap before activating the next objective.
>
> Use local threads for Computer Use testing that depends on my browser, desktop applications, permissions, credentials, or device state.
>
> When the project state changes, report only:
> - What's done
> - What's next
> - Any blockers
>
> Maintain progress-dashboard.html when the project spans several milestones or workers. Do not declare completion until the agreed evidence exists.

或者，你也可以对这篇文章截一个 Appshot，然后问 Codex：

> Create a reusable Codex skill named orchestrate-projects from this article.
>
> Preserve these practices:
> - let Codex interview me and create the initial plans
> - use GOALS.md as a milestone-based roadmap
> - keep one Goal-mode objective active at a time
> - keep the main thread focused on coordination
> - audit the roadmap and run /review after each milestone
> - use separate threads for work I may want to revisit
> - use local threads for Computer Use testing
> - report progress through concise updates, Slack, and progress-dashboard.html

---

*翻译校对：Mino | 2026-07-13*
