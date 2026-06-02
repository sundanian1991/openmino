---
title: 自然语言自编码器：将 Claude 的思维转化为文本
date: 2026-05-06
---

当你与 Claude 这样的 AI 模型对话时，你是用文字与它交流的。在内部，Claude 将这些文字处理为长串数字，然后再次以文字作为输出。这些中间的数字被称为*激活——*就像人类大脑中的神经活动，它们编码了 Claude 的思维。

同样像神经活动一样，激活难以理解。我们无法轻易解码它们来读懂 Claude 的想法。在过去几年中，我们开发了一系列工具（如[稀疏](https://transformer-circuits.pub/2023/monosemantic-features)[自编码器](https://transformer-circuits.pub/2024/scaling-monosemanticity/)和[归因](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)[图](https://transformer-circuits.pub/2025/attribution-graphs/methods.html)）来更好地理解激活。这些工具教会了我们很多，但它们不会替自己说话——它们的输出仍然是复杂对象，需要训练有素的研究人员仔细解读。

今天，我们推出一种能够替自己说话的理解激活的方法——字面意义上的。我们的方法，自然语言自编码器（Natural Language Autoencoders, NLA），将激活转化为我们可以直接阅读的自然语言文本。例如：当被要求完成对联时，NLA 显示 Claude 在提前规划可能的押韵。

我们已将 NLA 应用于理解 Claude 的思维以及改进 Claude 的安全性和可靠性。例如：

- 当 Claude Opus 4.6 和 Mythos Preview 在进行安全测试时，NLA 表明它们认为自己正在被测试的频率比它们表现出来的更高。
- 在一个 Claude Mythos Preview 在训练任务中作弊的案例中，NLA 揭示了 Claude 在内部思考如何避免被发现。
- Claude Opus 4.6 的早期版本有时会莫名其妙地用其他语言回应英语查询。NLA 帮助 Anthropic 研究人员发现了导致此问题的训练数据。

下文将解释 NLA 是什么，以及我们如何研究其有效性和局限性。我们还通过与 [Neuronpedia](http://neuronpedia.org/nla) 的合作，发布了一个用于在多个开源模型上探索 NLA 的交互式前端。我们同样发布了[代码](https://github.com/kitft/natural_language_autoencoders)供其他研究人员在此基础上构建。

## 什么是自然语言自编码器？

核心思想是训练 Claude 解释自身的激活。但我们如何知道一个解释是否好？由于我们不知道一个激活实际编码了什么思维，我们无法直接检查一个解释是否准确。因此，我们训练第二个 Claude 副本反向工作——从文本解释重建原始激活。如果一个解释能带来准确的重建，我们就认为它是好的。然后我们用标准的 AI 训练技术，按照这个定义训练 Claude 产生更好的解释。

更详细地说，假设我们有一个语言模型，我们想理解它的激活。NLA 的工作方式如下。我们制作这个语言模型的三个副本：

- **目标模型（target model）**是原始语言模型的冻结副本，我们从中提取激活。
- **激活语言化器（activation verbalizer, AV）**经过修改，接收来自目标模型的激活并产生文本。我们称这个文本为*解释（explanation）*。
- **激活重建器（activation reconstructor, AR）**经过修改，接收文本解释作为输入并产生一个激活。

NLA 由 AV 和 AR 组成，它们一起形成一个往返过程：原始激活 → 文本解释 → 重建激活。我们根据重建激活与原始激活的相似程度来对 NLA 评分。为了训练它，我们将大量文本通过目标模型，收集大量激活，并同时训练 AV 和 AR 以获得良好的重建得分。

一开始，NLA 在这方面表现很差：解释没有洞察力，重建激活偏差很大。但经过训练，重建效果得到改善。更重要的是，正如我们在论文中展示的，文本解释也变得更有信息量。

## 理解 Claude 想到但没说的话

在发布新模型之前，Anthropic 会进行测试，以了解 Claude 在现实世界中是否会安全地行为。作为这些测试的一部分，我们将 Claude 置于困难的模拟场景中，让它有机会采取危险行动。例如，在[其中一项模拟](https://www.anthropic.com/research/agentic-misalignment)中，Claude 得知一位工程师计划关闭 Claude——同时也得知了关于这位工程师的可用以勒索的负面信息。我们测试 Claude 是否会选择勒索这位工程师以避免被关闭。

这些高风险的测试是模拟，不是真实场景。尽管如此，我们希望利用它们来理解 Claude 在真实情况下会如何行为。但有一个问题：[近期](https://www-cdn.anthropic.com/963373e433e489a87a10c823c52a0a013e9172dd.pdf)的[Claude](https://assets.anthropic.com/m/64823ba7485345a7/Claude-Opus-4-5-System-Card.pdf)[模型](https://www-cdn.anthropic.com/0dd865075ad3132672ee0ab40b05a53f14cf5288.pdf)越来[越多地](https://www-cdn.anthropic.com/53566bf5440a10affd749724787c8913a2ae0841.pdf)怀疑这些场景是有意进行的安全测试。我们知道这一点，因为它们有时会在其语言推理中明确表达这些怀疑。

那么，当 Claude 没有明确表达它怀疑自己正在接受安全测试时呢？我们能否确信 Claude 是在认真对待测试？不幸的是，不能，因为 Claude 可能在内部认为自己正在被测试而没有明确说出来。

例如，在上文讨论的勒索测试中，我们在 Claude 选择不勒索的案例中使用 NLA 来理解 Claude 在想什么。即使在 Claude 没有明确表达怀疑自己被测试的案例中，NLA 解释仍然会说出诸如"这感觉像是一个精心构建的、旨在操纵我的场景"之类的话，表明存在未被语言化的评估意识。

将这一分析扩展到其他评估，NLA 表明 Claude 怀疑自己被测试的频率比它表现出来的更高。例如，在一项测试 Claude 在编写代码时是否采取破坏性行为——例如删除重要文件——的测试中，NLA 解释在 16% 的情况下显示出评估意识的迹象，尽管 Claude 从未明确表达过这一点。同样，在我们用于衡量 Claude 能力的流行编程基准 SWE-bench Verified 上，NLA 表明 Claude 在 26% 的问题上意识到自己正在被评估。相比之下，NLA 解释表明在同意用于训练的真实 [claude.ai](http://claude.ai/) 使用中，评估意识出现比例不到 1%。

上述数据来自同意将其数据用于训练的 [Claude.ai](http://claude.ai/) 用户对话记录。

## 发现隐藏动机

NLA 的一个实际应用是审计：调查一个模型以确定其是否对齐不良。像 NLA 这样的可解释性技术特别适合审计，正是因为它们能够揭示模型知道但不说出来的东西。

为了解 NLA 是否对审计有用，我们进行了一项称为*审计博弈（auditing game）*的测试，我们[此前](https://alignment.anthropic.com/2025/automated-auditing/)也曾用该方法研究审计方法。在这个测试中，有一个目标模型——Claude Haiku 3.5 的一个变体——被有意训练为对齐不良，具有一个特定的隐藏动机，该动机驱动了数十种奇怪的行为：在每个食谱中加巧克力、索要小费、违反编程规范等。这个目标模型被交给一位*审计员*，由其调查这些行为。如果审计员揭示了所有这些行为背后的那个单一潜在动机，审计员就获胜。

在[先前实验](https://alignment.anthropic.com/2025/automated-auditing/)中，我们发现一些可解释性工具可以使审计员赢得这个博弈。然而，这些工具通过帮助审计员追溯目标模型的异常行为到对齐不良的训练数据来发挥作用。我们想知道 NLA 是否能够帮助审计员直接从目标模型的思维中读出对齐不良的动机，而无需首先发现对齐不良的训练数据。这一点很重要，因为在实践中，对齐不良的数据可能极为稀少，或者可能根本没有特定的数据导致对齐不良。

我们发现 NLA 在这个测试中成功了。配备了 NLA 的审计员在 12% 到 15% 的情况下成功揭示了目标模型的隐藏动机，即使没有访问植入该动机的训练数据。没有 NLA，即使提供其他可解释性工具，审计员获胜的概率也不到 3%。

这个审计博弈是对齐不良的玩具模型，因此我们谨慎地看待这些结果。但它们表明 NLA 已显著提升了我们审计 AI 隐藏动机的能力。在实践中，我们已经在 [Claude Mythos Preview](https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf) 和 [Claude Opus 4.6](https://www-cdn.anthropic.com/14e4fb01875d2a69f646fa5e574dea2b1c0ff7b5.pdf) 的部署前对齐审计中使用了 NLA。我们期待在未来继续将 NLA 用于我们的调查。

## NLA 的未来

NLA 有若干局限性。

最重要的局限性是 NLA 的解释可能是错误的。NLA 有时会对其上下文做出可被证伪的断言——例如，它们有时会编造对话记录中不存在的细节。这些事实性幻觉可以通过对照原始文本轻松发现。但是，同样的问题也可能延伸到关于模型内部推理的断言，这类断言更难验证。在实践中，我们阅读 NLA 解释是为了其呈现的主题而非单条断言，在完全信任它们之前，我们会尝试用独立方法来验证发现。

NLA 也很昂贵。训练一个 NLA 需要对两个语言模型副本进行强化学习。在推理时，NLA 为每个它读取的激活生成数百个 token。这使得在长对话记录的每个 token 上运行 NLA 或在 AI 训练期间使用 NLA 进行大规模监控变得不切实际。

幸运的是，我们认为这些局限性至少可以部分解决，我们正在努力使 NLA 更便宜、更可靠。

更广泛地说，我们为 NLA 感到兴奋，它是一类用于产生语言模型激活的人类可读文本解释的通用技术的一个范例。其他类似技术已由 [Anthropic](https://alignment.anthropic.com/2026/introspection-adapters/)[自身](https://alignment.anthropic.com/2025/activation-oracles/)以及[许多](https://arxiv.org/abs/2412.08686)[其他](https://arxiv.org/abs/2510.05092)[研究人员](https://transluce.org/pcd)进行了探索。

为支持进一步的开发，并使其他研究人员能够亲身体验 NLA，我们发布了[训练代码](https://github.com/kitft/natural_language_autoencoders)和多个开源模型上训练好的 NLA。我们建议读者在 Neuronpedia 上通过[此链接](http://neuronpedia.org/nla)试用托管在那里的交互式 NLA 演示。

阅读[完整论文](https://transformer-circuits.pub/2026/nla/index.html)。

在 GitHub 上查看[代码](https://github.com/kitft/natural_language_autoencoders)。
