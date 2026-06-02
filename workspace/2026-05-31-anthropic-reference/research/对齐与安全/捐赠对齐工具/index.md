---
title: 捐赠我们的开源对齐工具
date: 2026-05-07
---

# 捐赠我们的开源对齐工具

![Patri hero image](images/donating-open-source-petri_e717e8826b.svg)

2025 年 10 月，我们发布了 [Petri](https://www.anthropic.com/research/petri-open-source-auditing)——一个开源的对齐测试工具箱，可应用于任何大语言模型。Petri 是在我们的 Anthropic Fellows 计划下开发的，可用于快速、便捷地测试 AI 模型是否存在令人担忧的倾向，包括欺骗、谄媚以及配合有害请求。这是我们开发开放且对整个 AI 开发社区有用的对齐工具的努力的一部分。

自 Claude Sonnet 4.5 以来，Petri 一直是我们评估每一个 Claude 模型对齐表现的工具。它通过一个独立的"审计"模型模拟一系列对齐相关场景，比较新模型在这些场景中的行为表现。随后，一个"裁判"模型对生成的对话记录进行评分，判断是否存在未对齐行为。

我们欣慰地看到 Petri 已被外部组织采用：例如，英国 AI 安全研究院（AISI）将其作为评估模型破坏 AI 研究倾向的[主要手段](https://arxiv.org/abs/2604.00788)之一。

我们现在将 Petri 更新到第三个版本。以下是最大的一些变化：

- **可适配性**：Petri 3.0 进行了重大架构改造，允许用户将其适配到更多场景，特别是将审计模型和目标模型拆分为可独立调整的独立组件；
- **真实性**：尽管对齐研究人员尽力让测试看起来真实，但模型往往能从测试设置中的各种人为痕迹推断出自己身处测试之中。一旦模型意识到自己正被评估，研究人员就无法再观察模型在常规情况下的行为。Petri 的一个附加模块——我们称之为"Dish"——使测试设置逼真得多，例如使用模型的真实系统提示和真实"脚手架"（即围绕模型帮助其达成目标的软件，与真实部署场景一致）来运行测试；
- **深度**：我们已将 Petri 与我们的另一个开源对齐工具 [Bloom](https://www.anthropic.com/research/bloom) 集成，Bloom 可以对特定行为进行更深入的评估（相对于 Petri 更宽泛的覆盖方式）。

我们也在为 Petri 寻找一个新家。我们已将其开发工作移交至 [Meridian Labs](https://meridianlabs.ai/)，一家 AI 评估非营利组织。这一举措——类似于我们此前将模型上下文协议（MCP）[捐赠](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)给 Linux 基金会的决定——将确保 Petri 保持独立于任何 AI 实验室，使其结果被整个行业及更广泛领域的各方视为中立和可信的。

在 Meridian Labs 旗下，Petri 将与 [Inspect](https://inspect.aisi.org.uk/) 和 [Scout](https://meridianlabs-ai.github.io/inspect_scout/) 等工具一起，构建一个对实验室、独立研究者和政府均开放的技术栈——而此刻，可靠的 AI 模型行为测试比以往任何时候都更重要。

你可以在 [Meridian Labs 博客](https://meridianlabs.ai/blog/posts/introducing-petri-3/)上了解更多关于 Petri 3.0 的信息。

安装和使用 Petri 的说明可在 [Petri 网站](https://meridianlabs-ai.github.io/inspect_petri/)找到。
