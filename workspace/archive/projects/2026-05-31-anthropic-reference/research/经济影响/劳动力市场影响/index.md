---
title: AI 对劳动力市场的影响：一种新的衡量方法与早期证据
date: 2026-02-26
---

![AI 对劳动力市场的影响](images/labor-market-impacts_94e5df8dd0.svg)

## 核心发现

- 我们提出一种衡量 AI 替代风险的新指标——**实际暴露度**（observed exposure），该指标结合了 LLM 理论能力与真实使用数据，对自动化（而非增强型）使用和工作相关使用赋予更高权重——AI 远未达到其理论能力上限：实际覆盖率仅为理论可行范围的一小部分
- 实际暴露度越高的职业，美国劳工统计局（BLS）对其到 2034 年的增长预测越低
- 暴露度最高的职业群体中，年长、女性、高学历和高收入劳动者的比例更高
- 自 2022 年底以来，高暴露度劳动者的失业率未出现系统性上升，但我们发现初步证据表明，暴露度较高职业中年轻劳动者的招聘有所放缓

## 引言

AI 的快速扩散正在催生一波衡量和预测其劳动力市场影响的研究。但过往方法的记录让我们有理由保持谦逊。

例如，一项关于工作可离岸外包程度的著名研究将约四分之一的美国岗位识别为"脆弱"，但十年后，这些岗位中的大部分依然保持了健康的就业增长。政府自身的职业增长预测虽然方向正确，但在过去趋势的线性外推之外几乎没有增加任何预测价值。即使在事后回顾时，重大经济冲击对劳动力市场的影响也常常难以厘清。关于工业机器人就业影响的研究得出了相反的结论，而中国贸易冲击造成的岗位损失规模至今仍在争论之中。[^1]

本文提出一个理解 AI 对劳动力市场影响的新框架，并用早期数据加以检验。结果表明，迄今为止 AI 对就业的影响证据有限。我们的目标是建立一套衡量 AI 如何影响就业的方法，并定期更新这些分析。这一方法无法捕捉 AI 重塑劳动力市场的每一条渠道，但在显著效应出现之前就打好基础，有望让未来的发现比事后分析更可靠地识别经济冲击。

AI 的影响可能是不可忽视的。而这个框架在效应模糊时最有价值——它可以在替代真正发生之前识别出最脆弱的工作岗位。

## 反事实分析

当效应大且突然时，因果推断更容易。新冠疫情及配套政策措施造成的经济冲击如此剧烈，以至于很多问题不需要复杂的统计方法。例如，疫情初期失业率急剧跃升，几乎不给替代解释留下空间。

然而，AI 的影响可能不像新冠，更像互联网或对华贸易。总体失业数据可能不会立即反映出影响；贸易政策和经济周期等因素会干扰对趋势线的解读。

一种常见方法是比较 AI 暴露度较高和较低的劳动者、企业或行业之间的结果，以将 AI 的效应与混杂因素隔离开来。[^2] 暴露度通常在任务层面定义：例如，AI 可以批改作业但无法管理课堂，因此教师的暴露度被认为低于那些整份工作都可以远程完成的劳动者。

我们的研究遵循这种基于任务的方法，纳入理论 AI 能力和真实使用的衡量，然后汇总到职业层面。[^3]

## 衡量暴露度

我们的方法结合了三个数据源：

- [O*NET 数据库](https://www.onetcenter.org/database.html)，列举了美国约 800 种独立职业所关联的任务。
- 我们自身的使用数据（通过 [Anthropic 经济指数](https://www.anthropic.com/economic-index) 衡量）。
- Eloundou 等人（2023）的任务级暴露度估算，衡量 LLM 是否在理论上有可能将某项任务的速度至少提高一倍。

Eloundou 等人的指标 β 按简单量表对任务打分：如果一项任务仅靠 LLM 就能将速度翻倍，则 β = 1；如果需要借助 LLM 之上构建的额外工具或软件，则 β = 0.5；否则为 0。[^4]

为什么实际使用会低于理论能力？有些理论上可行的任务可能因模型限制而未在使用中出现。还有些则因法律约束、特定软件需求、人工验证步骤或其他障碍而扩散缓慢。例如，Eloundou 等人将"授权药品续方并向药房提供处方信息"标记为完全暴露（β=1）。我们尚未观察到 Claude 执行此任务，尽管从理论上说 LLM 确实可以加速这项工作的评估似乎是正确的。

即便如此，理论能力与实际使用这两类衡量指标高度相关。如图 1 所示，过去四期经济指数报告中观察到的任务中，97% 属于被 Eloundou 等人评为理论可行的类别（β=0.5 或 β=1.0）。

![图 1：按 Eloundou 等人任务暴露度评级划分的 Claude 使用分布](images/labor-market-impacts_94e5df8dd0.svg)

**图 1：按 Eloundou 等人任务暴露度评级划分的 Claude 使用分布**

本图展示了 Claude 使用量按 O*NET 任务及其理论 AI 暴露度分组的分布。β=1（仅靠 LLM 完全可行）的任务占 Claude 总使用量的 68%，而 β=0（不可行）的任务仅占 3%。Claude 使用数据来自过去四期经济指数报告。

### 一种衡量职业暴露度的新指标

我们的新指标**实际暴露度**旨在量化：在 LLM 理论上可以加速的任务中，哪些在职业场景中真正出现了自动化使用？理论能力涵盖的任务范围要广泛得多。通过追踪这一差距如何缩小，实际暴露度可以在经济变化初现端倪时就提供洞察。

我们的指标在定性上捕捉了 AI 使用的几个我们认为能预测岗位影响的方面。以下情况会使一个岗位的暴露度更高：

- 其任务在理论上可用 AI 完成
- 其任务在 Anthropic 经济指数中有显著使用量[^5]
- 其任务在工作相关场景中执行
- 其自动化使用模式或 API 实现的占比相对更高
- 其受 AI 影响的任务占整体岗位职责的比重更大[^6]

数学细节见[附录](https://cdn.sanity.io/files/4zrzovbb/website/e5f77fc0e77c0185110b5e4b909602791ae76eae.pdf)。我们将理论上有 LLM 能力且 Claude 流量中有足够工作相关使用的任务计为"已覆盖"。然后根据任务的执行方式调整权重：完全自动化实现获得全权重，增强型使用获得半权重。最后，将任务级覆盖率按各任务所花时间占比加权平均到职业层面。

图 2 展示了实际暴露度（红色）与 Eloundou 等人的 β 指标（蓝色）的对比，展示理论能力与我们平台上实际使用之间的差距，按职业大类分组。我们先将各职业按时间占比加权平均，再按总就业人数加权平均到职业大类。例如，β 指标显示计算机与数学（94%）和办公与行政（90%）职业的大部分任务都有 LLM 渗透的空间。

![图 2：各职业类别的理论能力与实际暴露度](https://www-cdn.anthropic.com/images/4zrzovbb/website/c1952c81bca02a7c8cc05ef7801e67ca60831c55-4096x4096.png)

**图 2：各职业类别的理论能力与实际暴露度**

LLM 理论上可执行的工作任务占比（蓝色区域）及我们根据使用数据得出的岗位覆盖率（红色区域）。

红色区域描绘了 Anthropic 经济指数中的 LLM 使用情况，展示人们如何在职业场景中使用 Claude。覆盖率显示 AI 远未达到其理论能力。例如，Claude 目前仅覆盖了计算机与数学类别中 33% 的任务。

随着能力进步、采用范围扩大和部署深化，红色区域将逐渐覆盖蓝色区域。也有大量未被覆盖的区域——许多任务当然仍超出 AI 的能力范围——从修剪树木、操作农机等体力农活，到出庭代理客户等法律任务。

图 3 展示了该指标下暴露度最高的十个职业。与其他数据显示 Claude 广泛用于编程一致，计算机程序员以 75% 的覆盖率位居榜首；其次是客服代表，其主要任务越来越多地出现在第一方 API 流量中；数据录入员的覆盖率为 67%，其阅读源文件并录入数据的主要任务正经历显著自动化。

![图 3：暴露度最高的职业](https://www-cdn.anthropic.com/images/4zrzovbb/website/a16a5b9ba4a5280ef41e058dff6964a3f116c854-4584x2579.png)

**图 3：暴露度最高的职业** — 基于我们任务覆盖率指标的十大暴露度最高职业。

在另一端，30% 的劳动者覆盖率为零，因为他们的任务在我们的数据中出现频率太低，未达到最低阈值。这一群体包括厨师、摩托车修理工、救生员、调酒师、洗碗工和试衣间服务员等。

**暴露度与预测岗位增长及劳动者特征的关系**

美国劳工统计局（BLS）定期发布就业预测，最新一期发布于 2025 年，涵盖 2024 年至 2034 年各职业就业变化的[预测](https://data.bls.gov/projections/occupationProj)。图 4 将我们的岗位级覆盖率指标与他们的预测进行了对比。

以当前就业人数加权的职业层面回归分析发现，实际暴露度越高的岗位，增长预测越弱。覆盖率每增加 10 个百分点，BLS 的增长预测下降 0.6 个百分点。这在一定程度上验证了我们的指标——它与劳动力市场分析师独立得出的估算一致，尽管相关性较弱。有趣的是，仅使用 Eloundou 等人的指标则不存在这种相关性。

![图 4：BLS 2024-2034 年就业增长预测 vs. 实际暴露度](https://www-cdn.anthropic.com/images/4zrzovbb/website/4da91f7eeb62c2c7b09600282c9163f6bdf0d5ca-4584x2579.png)

**图 4：BLS 2024-2034 年就业增长预测 vs. 实际暴露度**

包含 25 个等大小分组的散点图。每个实心点代表一个分组的平均实际暴露度与预测就业变化。虚线为以当前就业水平加权的简单线性回归拟合。小菱形标记了用于说明的个别示例职业。

图 5 展示了暴露度前四分位劳动者与 30% 零暴露劳动者在 ChatGPT 发布前三个月（2022 年 8 月至 10 月）的特征，使用当期人口调查（CPS）数据。[^7] 两组差异显著。高暴露度组为女性的概率高出 16 个百分点，为白人的概率高出 11 个百分点，为亚裔的概率接近两倍。他们的平均收入高出 47%，教育水平也更高。例如，拥有研究生学位的人在零暴露组中占 4.5%，而在最高暴露组中占 17.4%，差距接近四倍。

![图 5：高暴露度与低暴露度劳动者的差异，当期人口调查](https://www-cdn.anthropic.com/images/4zrzovbb/website/ff251060d019f4fdf6579df08aaf61e94b4c2d27-4584x2579.png)

**图 5：高暴露度与低暴露度劳动者的差异，当期人口调查**

## 确定优先观察的结果

有了这些暴露度指标，问题在于关注什么。研究者采取的方法各不相同。例如，Gimbel 等人（2025）使用当期人口调查追踪职业构成的变化。他们的论点是，AI 引发的任何重大经济重组都应体现在岗位分布的变化上。（他们发现，迄今为止这些变化并不显著。）Brynjolfsson 等人（2025）使用薪酬处理公司 ADP 的数据按年龄组观察就业水平；Acemoglu 等人（2022）和 Hampole 等人（2025）分别使用 Burning Glass（现为 Lightcast）和 Revelio 的招聘数据。

我们以失业作为优先结果，因为它最直接地捕捉了经济损害的潜力——一个失业的劳动者想要一份工作但尚未找到。在此情况下，招聘数据和就业水平不一定意味着需要政策干预；一个高暴露度岗位的招聘减少可能被相关岗位的增加所抵消。AI 对劳动力市场的大多数有害发展都理应包含一段失业率上升的时期，因为被替代的劳动者需要寻找替代方案。当期人口调查非常适合追踪这一点，因为失业受访者会报告他们之前的职业和行业。

## 初步结果

接下来我们研究失业趋势，将我们的职业层面指标与当期人口调查的受访者进行匹配。

解读覆盖率指标时的一个关键问题是：哪些劳动者应被视为"受到处理"？是否 10% 的任务覆盖率就应期待就业变化？Gans 和 Goldfarb（2025）指出，如果 O 型环模型最能描述岗位，那么可能只有在所有任务都有一定程度 AI 渗透时才会看到就业效应。Hampole 等人（2025）认为平均暴露度会降低劳动力需求，但暴露度*集中*在某些任务中可以抵消这一效应。Autor 和 Thompson（2025）则强调剩余任务所需的专业水平。

着眼于简洁性，并注意到我们最关心的是大规模影响，我们将分析聚焦于这样一个理念：影响应在平均暴露度最高的群体中最先显现。我们比较时间加权任务覆盖率前四分位的劳动者与底部的劳动者。如果 AI 能力快速进步，较低覆盖率百分位数的任务覆盖率也可能很高，此时绝对阈值可能更有用。但我们假设影响应首先波及暴露度最高的劳动者，并展示按不同阈值定义处理组的结果。

图 6 上半部分展示了自 2016 年以来暴露度前四分位劳动者与零暴露劳动者的失业率原始趋势。在疫情中，AI 暴露度较低（更可能从事面对面工作）的劳动者失业率增幅大得多。此后，两组的趋势大体相似。下半部分在双重差分框架中衡量最高暴露度与最低暴露度劳动者之间差距的大小，与原始数据的发现一致。ChatGPT 发布以来差距的平均变化很小且不显著，表明暴露度更高组的失业率略有上升，但效应与零无统计差异。[^8]

![图 6：实际暴露度前四分位与零 AI 暴露度劳动者的失业率趋势，当期人口调查](https://www-cdn.anthropic.com/images/4zrzovbb/website/e4cf7bf0364758fe1bfbb7b915c8f1db6d7bd4d4-4584x2579.png)

**图 6：实际暴露度前四分位与零 AI 暴露度劳动者的失业率趋势，当期人口调查**

上半部分展示了暴露度前四分位劳动者（红线）与 30% 零暴露劳动者的失业率。下半部分在双重差分框架中衡量这两条序列之间的差距。

这个框架能识别什么样的场景？基于汇总估计的置信区间，1 个百分点量级的差异化失业率上升是可以检测到的（这将随新数据进入而变化，因此仅为粗略估计）。如果前 10% 暴露度的劳动者全部被裁，前四分位组的失业率将从 3% 升至 43%，总体失业率将从 4% 升至 13%。

一个规模较小但仍令人担忧的影响场景是"白领劳动者的大衰退"。在 2007-2009 年大衰退期间，美国失业率翻倍，从 5% 升至 10%。如果暴露度前四分位出现类似翻倍，其失业率将从 3% 升至 6%。这在我们的分析中也应可见。请注意，我们的核心估计基于暴露组与低暴露组之间失业率的*差异化*变化。如果所有劳动者的失业率同步上升，我们不会将其归因于仍使许多任务不受影响的 AI 进步。

一个特别值得关注的群体是年轻劳动者。Brynjolfsson 等人报告称，22 至 25 岁劳动者在暴露职业中的就业下降了 6%—16%，他们将此下降主要归因于招聘放缓而非离职增加。[^9]

我们发现暴露职业中年轻劳动者的失业率持平（见[附录](https://cdn.sanity.io/files/4zrzovbb/website/e5f77fc0e77c0185110b5e4b909602791ae76eae.pdf)）。但招聘放缓未必表现为失业率上升，因为许多年轻劳动者是劳动力市场新进入者，在 CPS 数据中没有列出职业，且可能退出劳动力市场而非表现为失业。为直接处理招聘问题，我们利用 CPS 的面板维度，统计随时间推移在暴露度较高和较低职业中开始新工作的年轻（22-25 岁）劳动者比例。图 7 展示了年轻劳动者的月度就业找到率（即劳动者报告了上月没有的工作），按进入高暴露度还是低暴露度职业进行区分。

![图 7：22-25 岁劳动者在高实际暴露度与零 AI 暴露度职业中的新工作入职率，当期人口调查](https://www-cdn.anthropic.com/images/4zrzovbb/website/1e4020e4312e8eeb4601f542a96cb238234f6c8b-4584x2579.png)

**图 7：22-25 岁劳动者在高实际暴露度与零 AI 暴露度职业中的新工作入职率，当期人口调查**

上半部分展示了年轻劳动者在高暴露度与零暴露度职业中开始新工作的比例。下半部分在双重差分框架中衡量这两条序列之间的差距。

除 2020-2021 年的一些大幅波动外，这两条序列在 2024 年视觉上出现分化——年轻劳动者进入暴露职业的概率相对下降。低暴露度职业的就业找到率稳定在每月 2%，而进入最高暴露度职业的比例下降了约半个百分点。ChatGPT 时代以来，暴露职业的就业找到率平均下降 14%（与 2022 年相比），尽管这一结果仅勉强达到统计显著。（25 岁以上的劳动者没有出现此类下降。）

这可能提供了 AI 对就业早期影响的某种信号，并与 Brynjolfsson 等人的发现相呼应。但存在几种替代解释。未被雇用的年轻劳动者可能留在现有岗位、转做其他工作或返校就读。另一个数据相关的注意事项是，调查中的工作转换可能更容易出现测量误差。[^10]

## 讨论

本文提出了一个理解 AI 劳动力市场影响的新指标，并研究了其对失业和招聘的影响。当岗位的任务在 LLM 理论可行且在我们的平台上以自动化、工作相关的使用案例被观察到时，该岗位的 AI 暴露度就更高。我们发现计算机程序员、客服代表和财务分析师属于暴露度最高的群体。使用美国调查数据，我们没有发现暴露度最高职业中劳动者失业率受到的影响，尽管初步证据表明 22-25 岁劳动者进入这些职业的招聘略有放缓。

我们的工作是系统梳理 AI 对劳动力市场影响的第一步。我们希望本文所采取的尤其是围绕覆盖率和反事实分析的分析步骤，能够在新的就业和 AI 使用数据出现时易于更新。一套成熟的方法可以帮助未来的观察者从噪声中分离出信号。

当前工作有几个待改进之处。我们的使用数据将纳入未来的更新，形成对经济中任务和岗位覆盖率的不断演化的图景。Eloundou 等人的指标也可以更新，因为它与 2023 年初的 LLM 能力挂钩。此外，鉴于围绕年轻劳动者和劳动力市场新进入者的初步发现，关键的下一步可能是观察在暴露领域拥有学历的应届毕业生如何在劳动力市场中找到方向。

## 附录

详见[此处](https://cdn.sanity.io/files/4zrzovbb/website/e5f77fc0e77c0185110b5e4b909602791ae76eae.pdf)。

### 致谢

作者：Maxim Massenkoff 与 Peter McCrory。

感谢：Ruth Appel、Tim Belonax、Keir Bradwell、Andy Braden、Dexter Callender III、Miriam Chaum、Madison Clark、Jake Eaton、Deep Ganguli、Kunal Handa、Ryan Heller、Lara Karadogan、Jennifer Martinez、Jared Mueller、Sarah Pollack、David Saunders、Carl De Torres、Kim Withee 和 Jack Clark。

另感谢 Martha Gimbel、Anders Humlum、Evan Rose 和 Nathan Wilmers 对本文早期版本提供了反馈。

### 引用

```
@online{massenkoffmccrory2026labor,
author = {Maxim Massenkoff and Peter McCrory},
title = {Labor market impacts of AI: A new measure and early evidence},
date = {2026-03-05},
year = {2026},
url = {https://www.anthropic.com/research/labor-market-impacts},
}
```

## 参考文献

Acemoglu, Daron and Pascual Restrepo, "Robots and Jobs: Evidence from US Labor Markets," *Journal of Political Economy*, 2020, 128 (6), 2188-2244.

Acemoglu, Daron, David Autor, Jonathon Hazell, and Pascual Restrepo, "Artificial intelligence and jobs: Evidence from online vacancies," *Journal of Labor Economics*, 2022, 40 (S1), S293-S340.

Appel, Ruth, Maxim Massenkoff, Peter McCrory, Miles McCain, Ryan Heller, Tyler Neylon, and Alex Tamkin, "Anthropic Economic Index report: economic primitives," 2026.

Autor, David H, David Dorn, and Gordon H Hanson, "The China syndrome: Local labor market effects of import competition in the United States," *American Economic Review*, 2013, 103 (6), 2121-2168.

Autor, David H, & Thompson, N. (2025). Expertise. NBER Working Paper, (w33941).

Blinder, Alan S et al., "How many US jobs might be offshorable?," *World Economics*, 2009, 10 (2), 41.

Borusyak, Kirill, Peter Hull, and Xavier Jaravel, "Quasi-experimental shift-share research designs," *The Review of Economic Studies*, 2022, 89 (1), 181-213.

Brynjolfsson, Erik, Bharat Chandar, and Ruyu Chen, "Canaries in the coal mine? six facts about the recent employment effects of artificial intelligence," *Digital Economy*, 2025.

Eckhardt, Sarah and Nathan Goldschlag, "AI and Jobs: The Final Word (Until the Next One)," Economic Innovation Group (EIG), August 2025. Available at: [https://eig.org/ai-and-jobs-the-final-word/](https://eig.org/ai-and-jobs-the-final-word/)

Eloundou, Tyna, Sam Manning, Pamela Mishkin, and Daniel Rock, "Gpts are gpts: An early look at the labor market impact potential of large language models," arXiv preprint arXiv:2303.10130, 2023, 10.

Fujita, S., Moscarini, G., & Postel-Vinay, F. (2024). Measuring employer-to-employer reallocation. *American Economic Journal: Macroeconomics*, 16(3), 1-51.

Gans, Joshua S. and Goldfarb, Avi, "O-Ring Automation," NBER Working Paper No. 34639, December 2025. Available at SSRN: [https://ssrn.com/abstract=5962594](https://ssrn.com/abstract=5962594)

Gimbel, Martha, Molly Kinder, Joshua Kendall, and Maddie Lee, "Evaluating the Impact of AI on the Labor Market: Current State of Affairs," Research Report, The Budget Lab at Yale, New Haven, CT October 2025. Available at: [https://budgetlab.yale.edu](https://budgetlab.yale.edu).

Graetz, Georg and Guy Michaels, "Robots at Work," *Review of Economics and Statistics*, 2018, 100 (5), 753-768.

Hampole, Menaka, Dimitris Papanikolaou, Lawrence DW Schmidt, and Bryan Seegmiller, "Artificial intelligence and the labor market," Technical Report, National Bureau of Economic Research 2025.

Handa, Kunal, Alex Tamkin, Miles McCain, Saffron Huang, Esin Durmus, Sarah Heck, Jared Mueller, Jerry Hong, Stuart Ritchie, Tim Belonax, Kevin K. Troy, Dario Amodei, Jared Kaplan, Jack Clark, and Deep Ganguli, "Which Economic Tasks are Performed with AI? Evidence from Millions of Claude Conversations," 2025.

Hui, Xiang, Oren Reshef, and Luofeng Zhou, "The short-term effects of generative artificial intelligence on employment: Evidence from an online labor market," *Organization Science*, 2024, 35 (6), 1977-1989.

Johnston, Andrew and Christos Makridis, "The labor market effects of generative AI: A difference-in-differences analysis of AI exposure," Available at SSRN 5375017, 2025.

Massenkoff, Maxim, "How predictable is job destruction? Evidence from the Occupational Outlook," 2025. *Working Paper.*

Ozimek, Adam, "Overboard on Offshore Fears," 2019. [https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3777307](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3777307)

Tamkin, Alex and Peter McCrory, "Estimating AI productivity gains from Claude conversations," 2025.

Tomlinson, K., Jaffe, S., Wang, W., Counts, S., & Suri, S. (2025). Working with AI: measuring the applicability of generative AI to occupations. arXiv preprint arXiv:2507.07935.

## 脚注

[^1]: 工作离岸外包：Blinder 等人（2009）和 Ozimek（2019）；政府增长预测：Massenkoff（2025）；机器人：Graetz 和 Michaels（2018）以及 Acemoglu 和 Restrepo（2020）；中国冲击：Autor 等人（2013）和 Borusyak 等人（2022）。

[^2]: Brynjolfsson 等人（2025）使用 Eloundou 等人（2023）的任务暴露度指标和 ADP 薪酬数据，比较了 AI 暴露度更高和更低劳动者之间的就业趋势。Johnston 和 Makridis（2025）使用美国行政数据进行了类似的任务分析，但在行业层面汇总处理。Hui 等人（2024）研究了 Upwork 上的自由职业岗位如何响应 ChatGPT 和高级图像生成工具的发布，比较了在各工具发布日期前后直接受影响和未受影响类别的劳动者。Hampole 等人（2025）使用历史大学招聘网络作为企业层面 AI 采用的工具变量：历史上招聘的大学毕业生后来进入 AI 相关岗位的企业面临更低的采用成本。

[^3]: 我们的任务和职业层面暴露度指标可以轻松纳入其他使用数据，并扩展到不同国家。我们计划随时间将这一方法应用于新场景。

[^4]: 在他们的框架中，"直接暴露"任务是指使用 LLM（2000 词输入限制，无最新事实访问权限）可以在一半时间内完成的任务。"借助工具暴露"任务是指使用能够访问信息检索和图像处理等软件的 LLM 可以达到同样加速效果的任务。未暴露的任务是指使用 LLM 无法将持续时间减少 50% 或更多的任务。

[^5]: 我们使用前两期 Anthropic 经济指数数据集，涵盖 2025 年 8 月和 11 月的使用数据。对于语义高度相似的 ONET 任务，我们在它们之间分配计数。

[^6]: 每一步都涉及判断。Eloundou 等人（2023）的指标应以 {0, 0.5, 1} 还是其他方式输入？什么构成"显著"使用？如何处理那些与高使用量任务非常相似但因过于罕见而未在经济指数采样中被单独捕捉到的任务？自动化工作流的权重应比增强型高多少？在附录中我们展开了一个令人安心的发现：无论对这些问题的许多不同解答如何，岗位暴露度的 Spearman 秩相关系数都极高。

[^7]: 为将 O*NET-SOC 编码与 CPS 中的 occ1990 编码进行匹配，我们使用了 [Eckhart 和 Goldschlag（2025）](https://eig.org/ai-and-jobs-the-final-word/) 提供的对照表。

[^8]: 我们在[附录](https://cdn.sanity.io/files/4zrzovbb/website/e5f77fc0e77c0185110b5e4b909602791ae76eae.pdf)中以三种方式进一步探索。首先，我们检验用于定义处理组的百分位阈值是否重要，将其从中位数变化到第 95 百分位。在所有情况下，影响都是平坦或负面的（即暴露组失业率下降）。其次，我们特别关注年轻劳动者，即 Brynjolfsson 等人（2025）中的 22 至 25 岁群体。最后，我们使用劳工部的失业保险申领数据而非 CPS 调查回答来衡量失业。在任何扩展中，我们都没有发现对暴露岗位的明确影响。

[^9]: 这一范围较宽，因为作者提供了基于多个反事实情景的估计。6 个百分点的下降对应的是就业零增长的反事实。16 个百分点的估计来自比较同一公司内不同职业的相似劳动者的设计。

[^10]: 参见 Fujita 等人（2024）。

### 更正

*更新于 2026 年 3 月 8 日：修正了图 7，该图此前错误地将前四分位组与零暴露组的入职率标签颠倒。*
