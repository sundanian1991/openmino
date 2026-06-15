---
title: 从Claude对话评估AI生产力增益
date: 2025-11-25
---
# 从Claude对话评估AI生产力增益

![估算生产力增益](images/estimating-productivity-gains_2c7b1ff34c.svg)

## 概述

*真实的Claude对话能告诉我们什么关于AI对劳动生产率的影响？我们使用隐私保护分析方法，从Claude.ai中抽取了十万个真实对话样本，估算这些对话中的任务在有AI辅助和无AI辅助下分别需要多长时间，并研究其对更广泛经济的生产力影响。根据Claude的估算，这些任务在没有AI辅助的情况下平均需要约90分钟完成，而Claude将单个任务的速度提升了约80%。*

*将这些估算外推，表明当前这一代AI模型可能在未来十年内使美国劳动生产率年增长提高1.8%——*

*大约是近年来增速的两倍。但这并非对未来的预测，因为我们没有考虑采用速度，也没有考虑更具能力的AI系统可能带来的更大生产力效应。*

*我们的分析有其局限。最值得注意的是，我们无法考虑人们在Claude对话之外为任务花费的额外时间，包括验证Claude工作质量或准确性所花的时间。但随着AI模型在时间估算方面变得更强，我们认为这份研究笔记中的方法可能在理解AI如何塑造实际工作方面变得越来越有用。*

*以下是结果的更详细总结：*

**跨十万个真实世界对话，Claude估算AI将任务完成时间减少了80%。**我们使用Claude来评估匿名化的Claude.ai对话记录，以估算AI的生产力影响。根据Claude的估算，人们通常用AI处理复杂的任务，这些任务平均需要1.4小时才能完成。通过将任务匹配到O*NET职业分类和BLS工资数据，我们估算这些任务原本需要花费55美元的人力成本。**任务的范围、成本和时间节省估算因职业差异很大。**根据Claude的估算，人们用Claude处理的法律和管理任务原本需要近两小时，而食品准备任务只需30分钟。我们发现医疗辅助任务可以快90%完成，而硬件问题的时间节省为56%。不过，这不考虑人们可能在这些任务上花费的超出其与[Claude.ai](http://claude.ai)对话的额外时间，因此我们认为这些估算可能在某种程度上高估了当前的生产力效应。**将这些结果外推至经济层面，当前这一代AI模型可能在未来十年内使美国劳动生产率年增长提高1.8%。这将使美国自2019年以来的年增长率翻倍，**我们的估算位于[近期其他估算](https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/11/miracle-or-myth-assessing-the-macroeconomic-productivity-gains-from-artificial-intelligence_fde2a597/b524a072-en.pdf)的上端区间。基于Claude对任务级效率增益的估算，我们使用标准方法计算出未来十年美国劳动生产率隐含年增长1.8%。然而，这一估算未考虑AI模型的未来改进（或对当前技术更复杂的使用），这些可能显著放大AI的经济影响。**AI加速部分任务的同时，其他任务可能成为瓶颈**：我们观察到某些任务有大幅加速，而其他任务——即使在同一职业群体内——加速幅度小得多。在AI影响较小的地方，这些任务可能成为瓶颈，潜在地对增长构成约束。

**这为我们理解AI随时间的经济影响提供了新视角，我们将作为经济指数的一部分持续跟踪：**基于真实Claude对话计算这些估算，为我们理解AI生产力提供了一个新视角。这补充了其他方法，如狭窄领域的实验室研究，或提供更粗粒度洞察的政府统计数据。我们将跟踪这些估算随时间的变化，以获取随着能力和采用率不断进步，这些问题的演变图景。

## 引言

作为[Anthropic经济指数](https://www.anthropic.com/economic-index)的一部分，我们记录了人们如何在不同的任务、行业和地点使用Claude。我们捕捉了使用的**广度**——人们如何用Claude处理法律、科学和编程任务——但未捕捉其**深度**。人们用Claude完成的任务有多重要？Claude为他们节省了多少时间？

当前版的经济指数无法捕捉这种**任务内异质性**——例如，它无法区分花五分钟的报告撰写任务和花五天的报告撰写任务，也无法区分花一个下午的财务建模任务和花几周的财务建模任务。这使得评估AI的经济效应变得困难：一个软件开发者可能一天用Claude写十个pull request，但如果九个是次要文档更新，一个是关键基础设施变更，仅统计用Claude完成的任务数量就偏离了重点。

不仅如此，随着模型能力的提升，我们还想知道它们是否在做更高价值的工作。要理解AI如何重塑工作和生产力，我们不仅需要知道Claude处理*哪些*任务，还需要知道这些任务和时间节省有*多大*。

若干研究组已开始在狭窄领域进行随机对照试验来衡量生产力增益，包括[软件工程](https://arxiv.org/abs/2302.06590)[任务](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566)、[写作](https://www.science.org/doi/10.1126/science.adh2586)和[客户服务](https://www.nber.org/papers/w31161)。METR关于[衡量AI完成长任务能力](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)的工作表明AI系统可以独立应对延伸的多步骤挑战。但这些评估考虑的是一组狭窄的问题，而非广泛的真实世界使用。要评估AI对经济的*整体*影响，我们需要一种方法来分析成百上千个真实世界AI应用。

本报告朝着这个目标迈出了第一步。它使用Claude来估算一个人需要多长时间来完成Claude处理的任务，将其与Claude和人一起花费的时间进行比较，从而计算AI节省了多少时间。虽然AI模型缺乏关于用户专业知识、工作流程和约束条件的上下文，但我们发现，对于一组软件工程任务的数据集，模型估算的时间相对于人类估算的完成时间和时间追踪结果，显示了有前景的准确性。

接下来，我们呈现估算任务级时间节省的方法论，用真实数据验证我们的方法，然后用这些估算来评估哪些任务和职业从AI中获得了最大的生产力增益。然后我们探索任务级估算在AI开始在整个经济中被采用时，对总生产力意味着什么。

## 估算任务长度和时间节省

使用我们的[隐私保护分析系统](https://www.anthropic.com/research/clio)，我们分析了来自Claude.ai（Free、Pro和Max层级）的100,000个对话记录，以衡量Claude处理任务的长度和时间节省。我们为每个任务生成了两个核心估算：

**无AI的时间估算**：一名专业人员在没有AI辅助的情况下完成任务所需的小时数。**有AI的时间估算**：在有AI辅助的情况下完成任务所花费的时间。

我们使用Claude为每个对话生成这些估算。遵循我们的[经济指数方法论](https://www.anthropic.com/news/the-anthropic-economic-index)，我们随后通过取每个任务的时间估算中位数，将这些单独的聊天对话聚合到[O*NET](https://www.onetcenter.org/database.html)分类法的任务中。这使我们能够探索这些时间估算在不同任务和经济中的不同职业之间如何变化。分类提示词详见附录。

分析真实世界的对话记录使我们能够考虑*任务内变异*。例如，即使*设计制造设备*任务的总体占比保持不变，对话记录层面的信息让我们看到人们是否随着时间的推移用AI处理更复杂、时间跨度更长的项目（或实现更大的时间节省）。我们的[经济指数](https://www.anthropic.com/economic-index)将追踪这些估算如何随时间演变，并分享聚合数据集，供研究人员做出自己的预测和结论。

### 验证

估算任务持续时间[对人类来说也是出名的困难](https://web.mit.edu/curhan/www/docs/Articles/biases/67_J_Personality_and_Social_Psychology_366,_1994.pdf)。AI模型面临更大的挑战，因为它们缺乏关于任务更广泛背景的关键上下文（尽管我们预期随着[记忆](https://www.anthropic.com/news/memory)和[外部集成](https://www.anthropic.com/news/claude-and-slack)等功能变得更加全面，这种上下文会随时间增加）。为了评估Claude的估算是否具有信息量，我们进行了两项验证分析。

**自洽性测试：**首先，我们评估Claude是否在不同的对话样本中或在提示词的变体中产生稳定的任务长度估算。

我们创建了多个提示词变体——例如，询问"具备适当技能的员工"与"熟练的专业人员"——以评估估算对提示词措辞的敏感程度。我们使用每个变体分析了1,800个对话，其中用户已同意将其对话分享给我们，并计算了各提示词变体之间的相关性。结果显示强自洽性，各变体之间对数尺度的相关系数*r*=0.89–0.93。

**Claude估算的人类完成时间在不同提示词变体中显示出高相关性。**提示词1要求Claude估算"具备适当技能的员工"完成任务所需的时间，提示词2询问的是"在该领域胜任的""人类工作者"。两种提示词显示对数尺度相关系数为0.89，表明高度一致。分析基于用户已同意与我们分享用于研究目的的[Claude.ai](http://claude.ai)对话记录。

**外部基准测试：**如果模型的预测与现实不够吻合，自洽性就没有太大意义。为了检查这一点，我们用一个包含数千个真实世界[软件开发任务](https://zenodo.org/records/7022735)的数据集测试了Claude的时间估算能力，这些数据来自开源仓库的JIRA工单，附有开发者估算和实际追踪的完成时间。

这对Claude来说是一个非常具有挑战性的任务，因为Claude只拿到JIRA工单的标题和描述，而人类开发者拥有关于代码库和工单的完整上下文，并且见过类似任务需要多长时间完成。在该基准测试的1,000个任务子集上：

- 人类开发者自身实现了与实际时间的Spearman相关系数ρ=0.50，对数值的Pearson相关系数r_log=0.67，表明中等强度的相关性（两个值越高越好）。
- Claude Sonnet 4.5实现了ρ=0.44和r_log=0.46。
- 带有十个任务及其真实时间长度示例的Claude Sonnet 4.5表现出更差的ρ=0.39，但r_log提升至0.48。

这一分析表明，Claude的估算提供的*方向性*信息仅略逊于软件开发者的自身估算。然而，我们观察到Claude的估算比人类更压缩——对较短任务预测相对较长的时间，对较长的任务预测相对较短的时间——并且总体上更倾向于高估。这表明任务之间的实际长度差异可能比我们报告的更大，而实际任务长度可能略短。总体而言，这些发现表明模型预测与真实世界结果存在有意义的相关性，至少在这个领域如此，使其在跨任务比较或追踪随时间变化方面有用。我们还观察到Claude Sonnet 4.5比Claude Sonnet 4的相关性更高，表明这些估算可能随模型能力继续改善。

ρ=0.44，而开发者为ρ=0.50，但Claude显著高估短任务、低估长任务。坐标轴为log（底数10）尺度。误差线为每个分箱的95%置信区间。

## 结果

我们首先使用上述方法估算任务级节省，然后将其聚合为经济整体效应的估算。

### 任务级节省

**任务时间**通过让Claude预测一名专业人员在无AI辅助下执行该任务所需的时间来估算。

**时薪**来自职业就业和工资统计（OEWS）2024年5月数据。

**任务成本**通过将任务时间乘以时薪来计算。

**时间节省**通过估算人完成任务的时间并计算*1 - 有AI时间 / 无AI时间*来得出。

#### 示例任务展示了不同程度的时间节省

观察各职业内的具体任务，可以找到AI可能在何处以及如何带来时间节省的具体例子。在最极端的一端，我们看到用户在11分钟内完成了Claude认为需要4.5小时的课程开发任务。基于教师的平均时薪，这些任务隐含的劳动力成本为115美元。

人们也使用AI来节省撰写发票、备忘录和其他文档所需时间的87%（至少对于Claude被要求处理的文档类型而言）。最后，AI为财务分析师的任务（如解释财务数据）节省了80%的时间，这些任务原本需花费31美元的工资。

#### 任务长度在不同职业中差异显著

人类时间估算显示，Claude处理的任务长度因职业而异。在下面的图表中，我们展示了Claude用于处理每个职业类别任务子集中任务的平均值[1]。Claude被用于管理的平均任务（如选择投资）估算需要人类2.0小时完成，其次是法律（1.8小时）、教育（1.7）和艺术/媒体任务（1.6）。在另一端，食品准备任务（如规划或定价菜单项）、安装/维护和运输任务平均都只花0.3-0.5小时，表明任务更受限制，或等待时间更少。鉴于Claude的时间估算倾向于低估长任务和高估短任务，这些差异在实践中可能更大。

*1 - 有AI时间 / 无AI时间*。

成本估算放大这种AI影响的变异：时间估算最长的任务也往往是劳动力成本最高的任务。我们通过将每个任务的中位时间乘以OEWS 2024年5月数据中相关职业的平均工资来计算这些成本估算。对于一名专业人员，平均管理任务成本为133美元，而法律任务为119美元，食品准备和供应相关任务为8美元。业务和财务任务平均为69美元，而计算机和数学任务平均为82美元。

在我们观察的所有任务中，我们估算Claude在每个对话中处理的工作，聘请专家执行这些工作的专业劳动力成本中位数为54美元。当然，当前模型在许多任务上的实际表现可能不如人类专家，尽管最近的研究表明[差距正在缩小](https://openai.com/index/gdpval/)，涵盖广泛的不同应用。

在主要职业组别中，我们观察到我们样本中任务/职业的平均时薪与Claude被要求处理的任务的人类等效时长之间存在正相关。例如，管理和法律职业类别在平均时薪方面排名分类顶部——与Claude在复杂知识工作方面的优势一致。

*r*=0.8）。

#### 时间节省在不同职业中高度不均衡

我们的人力时间和成本估算捕捉的是人们用AI处理的任务的*量级*。但时间*节省*——Claude对AI使工作完成快多少的估算——反映了使用AI处理这些任务可能带来的生产力增益。

中位对话经历了估算84%的时间节省，尽管我们在不同任务和类别中看到了相当大的变异。例如，检查诊断影像的任务仅显示20%的时间节省，可能是因为这已经是专家在没有AI辅助下可以快速完成的任务。相比之下，从报告中汇编信息的任务节省约95%的时间，可能是因为AI系统比人快得多地阅读、提取和引用信息。总体而言，按任务节省时间的分布集中在50-95%的范围内，峰值在80-90%之间。

这些大的时间节省与Claude读写速度远快于人类的能力一致。然而，我们的方法没有考虑人们需要做的额外工作来将Claude的输出细化到完成状态，或他们是否在多个会话中继续迭代工作产物——这两种情况都会导致更小的时间节省。过去的随机对照试验通常发现更小的时间节省，包括不同应用中的[56%](https://arxiv.org/abs/2302.06590)、[40%](https://www.science.org/doi/10.1126/science.adh2586)、[26%](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4945566)、[14%](https://www.nber.org/papers/w31161)甚至[负](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)时间节省——可能是因为这些效应，或因为这些研究使用的是更早版本的模型。

*1 - 有AI时间 / 无AI时间*。我们的估算未考虑在聊天窗口之外细化Claude输出所花的时间。

### 从任务级效率增益到经济整体生产力效应

上述估算捕捉了AI在任务层面驱动的生产力增益。要理解宏观层面的影响，本节建模这些增益如何在整个经济中聚合，假设它们按Claude的估算展开。

#### 方法论

为了估算经济整体生产力效应，我们使用Hulten定理，这是一种标准方法，允许我们将任务层面的效率增益聚合到更广泛的美国经济[2]。与[Acemoglu（2024）](https://economics.mit.edu/sites/default/files/2024-04/The%20Simple%20Macroeconomics%20of%20AI.pdf)的"基准"方法一样，我们将隐含的劳动生产率增长建模为任务级生产力增益的加权平均——这一建模选择隐含假设资本投资会因与AI采用相关的全要素生产率（TFP）提高而增加。在此框架中，隐含的TFP增长是劳动生产率增益乘以劳动收入份额[3]。

**任务构成**：对于每个职业，我们从O*NET获取工作任务列表。然后我们使用Claude来估算工人在每个任务上花费的时间比例。例如，Claude估算程序员将23%的时间花在编写和维护代码上，15%花在分析和改写程序上，较小比例花在测试、文档和会议上。

**任务级生产力改善**：在上一节中，我们提供了可用于计算每个任务在AI辅助下完成速度快了多少的估算。我们对无AI时间和有AI时间取对数差值来生成生产力改善值，并保守地将未在我们样本中观察到的任务赋值为零改善。

**经济整体估算**：我们使用两个因素对每个任务的隐含生产力增益按其经济重要性进行加权：（i）Claude估算该职业在该任务上花费的时间比例（如上所述），以及（ii）该职业在美国总工资支出中的份额（该职业类别的就业人数乘以平均工资，然后除以所有职业的总工资支出）。对于总工资支出，我们使用2024年5月OEWS数据。这种方法隐含假设Claude产生的时间估算代表了每个任务所有实例的可靠平均值，并且Claude或类似AI系统将在整个美国经济中被采用。

**美国经济整体劳动生产率影响：前十大职业。**总体而言，Claude的估算暗示，假设当前AI系统在我们观察到的所有任务中被普遍采用，美国劳动生产率年化增长为1.8%（虚线），由软件、管理、营销和客户服务任务驱动。这对应隐含的TFP年化增长1.08%。平均*ln（时间估算比率）*代表每个职业中所有任务的时间加权生产力增益，其中*时间估算比率 = 有AI时间 / 无AI时间*。劳动力统计数据来自OEWS 2024数据。

### 发现

假设AI在未来10年内达到在美国经济中的普遍采用——并使用当前模型——我们计算出Claude的估算意味着美国劳动生产率年增长1.8%。这将使当前长期增长率近乎翻倍，该增长率自1947年以来平均为2.1%每年，自2019年以来为1.8%。假设劳动力在TFP中的份额为0.6[4]，这意味着整体TFP每年增长1.1%。鉴于自2000年代初以来TFP增长往往低于1%，这些估算表明，即使是当前AI系统的广泛部署也可能使增长翻倍：达到1990年代末以及1960年代和1970年代的增长率[5]。

这一由任务级效率增益隐含的总劳动生产率增长估算，处于近期关于AI对生产力潜在影响的估算范围内，尽管更偏向上端（Filippucci、Gal和Schief，2024）。

重要的是，这一练习假设AI能力（以及人类使用AI的有效性）在未来10年内与我们在采样时保持不变。但这似乎不太可能成立：我们认为AI将在未来几年[继续快速发展](https://www.anthropic.com/news/core-views-on-ai-safety)。

因此，这一估算应被视为探索基于*当前使用模式*可能发生什么的一次练习，而非对实际最可能发生的生产力影响的预测。正如我们在其他工作中写到的，我们对AI导致重大劳动力市场动荡的可能性保持极度警觉，这可能与AI带来的更大生产力增长相关联。随着模型进步，这可能代表AI生产力效应的近似下界，尽管我们的估算未考虑采用的不均衡性，这可能在短期内降低真实世界的生产力增益。

反映了[某些任务和职业在我们的数据中出现的频率远高于其他任务和职业](https://assets.anthropic.com/m/218c82b858610fac/original/Economic-Index.pdf)这一事实，我们在职业对劳动生产率的贡献中也观察到类似现象。**软件开发者对归因于AI的总劳动生产率增益贡献最大（19%）。总经理和运营经理（约6%）、市场研究分析师和营销专员（5%）、客户服务代表（4%）和中学教师（3%）构成前五名。

相比之下，餐饮、医疗服务、建筑和零售对整体生产力效应的贡献要小得多。这很大程度上是因为它们的任务在我们的数据中出现得很少——主要是因为这些职业在我们样本中关联的任务很少。

### AI可能如何改变工人的时间分配？

如果工人能够用AI加速其职业任务的一个子集，那么AI提供较少加速的任务可能会在这些职业的工作中占据更大、因而更重要的份额。例如，AI可能帮助房屋检查员准备报告，但如果检查员仍需花同样多的时间亲自前往房产进行检查，这可能使检查在整体工作中占据更大比例。

下图展示了一些职业的情况。对于软件开发者，AI加速了软件开发、测试、文档编写和数据处理的过程。但我们目前未看到在协调系统安装或监督其他技术人员或工程师工作方面有意义的AI使用。对于教师，我们看到AI辅助课程和活动规划，但未辅助赞助课外俱乐部或在课堂上执行规则。

从增长的角度看，这些观察与[Aghion、Jones和Jones](https://www.nber.org/papers/w23928)最近的观察高度一致："增长可能不受制于我们所擅长的，而受制于那些必不可少却难以改善的。"

## 局限

我们的方法存在若干局限，我们认为值得进一步研究：

**Claude的预测并不完美，且我们缺乏对Claude时间估算的真实世界验证**：AI系统是不完美的预测器，无法看到用户在完成与模型的交互后发生的活动。虽然我们预期这些估算将随模型能力改善而提升，但使用模型估算引入了显著的噪声源。虽然我们的估算显示模型在估算任务时间方面接近人类表现，而人类自身也远非完美，但我们缺乏验证Claude提供的估算的真实世界数据。**任务分类法的局限**：真实工作比O*NET任务列表更复杂，我们为每个任务估算的时间分配仅是近似的。工作的许多重要方面——隐性知识、关系、不确定性下的判断——不出现在这些正式的任务描述中，而任务*之间*的联系对生产力的重要性可能与那些孤立的单个任务的时间节省同等或更高。虽然我们展示了个别任务有大的预测时间节省，[一项最近的随机对照试验](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)研究端到端软件功能并未看到AI带来的时间节省。**结构性假设**：在上面的计算中，我们比较了一名专业人员无AI完成给定任务的时间与有AI完成的时间。但这可能*低估*生产力增益——因为招聘员工和传达上下文需要额外资源而未被我们考虑——也可能高估，如果AI的工作质量比人差的话。**组织重构**：历史上，单个企业最大的生产力增益来自为采用新技术而[重构业务运营](https://www.jstor.org/stable/2006600)。我们的模型可以帮助预测这种重构的*效应*，但它无法预测公司可能如何决定重构，或这个过程可能多快发生。**创新的角色**：技术创新是经济增长的[引擎](https://www.jstor.org/stable/1926047)。我们的模型未捕捉AI系统可能加速甚至自动化科学过程的效应，也未捕捉这对生产力、增长和工作结构的影响。**数据有限**：我们的数据集仅来自[Claude.ai](http://claude.ai)对话。这个样本不代表AI使用的全谱，且可能存在某种选择效应，即人们使用Claude的任务实例是他们认为Claude会最有用的那些。此外，由于我们样本量有限，我们可能遗漏了一些不太常见的AI任务。

我们在此开发的测量基础设施能够在大规模上持续追踪AI对时间节省的影响。随着模型改进和更好的方法解决这些局限，我们可以重新估算这些时间节省，并识别这些能力改善如何转化为更广泛的经济影响。我们预期在未来的月份和年份中追踪这些变化。

## 结论

Claude处理的任务复杂度差异巨大——从花几分钟就能完成的简单食品准备问题，到需要数小时才能完成的复杂法律和管理任务。但这些工作的总效应是什么？

基于Claude对每个任务的时间估算（并假设未来10年内普遍采用），我们发现使用*当前*模型意味着美国劳动生产率可能每年增加1.8%——这是近期劳动生产率增长率的两倍。基于当前的AI使用，这些增益将集中在技术、教育和专业服务领域，而零售、餐饮和运输部门将受到最小影响。随着模型能力、产品和采用率持续进步，我们将作为[经济指数](https://www.anthropic.com/economic-index)的一部分追踪这些变化。

这些生产力增益来自使现有任务完成得更快。但从历史上看，变革性的生产力改善——来自电气化、计算或互联网——并非来自加速旧任务，而是来自从根本上重新组织生产。在这样的未来，AI不仅使实现功能更快，公司还会重构会议和代码审查，以更快地验证和交付这些功能，无论是否使用AI。

我们的框架可用于帮助估算这种重组的效应，但它无法预测哪些变化会发生或发生得多快。未来工作的一个重要方向是理解这个问题——更好地理解企业何时以及如何围绕新兴AI能力重新组织自身。答案将决定AI何时从提供显著但有限的生产力提升，跃迁为代表历史上定义技术革命的那种结构性转型。

### Bibtex

如需引用本文，可以使用以下Bibtex键：

```
@online{tamkinmccrory2025productivity,
author = {Alex Tamkin and Peter McCrory},
title = {Estimating AI productivity gains from Claude conversations},
date = {2025-11-05},
year = {2025},
url = {https://www.anthropic.com/research/estimating-productivity-gains},
}
```


## 附录

### Claude估算与其他估算的对比

### 时间估算所用的提示词

**人力时间估算提示词**

```
Human: Consider the following conversation:
<conversation>
{{TRANSCRIPT}}
</conversation>
Estimate how many hours a competent professional would need to complete the tasks done by the Assistant.
Assume they have:
- The necessary domain knowledge and skills
- All relevant context and background information
- Access to required tools and resources
Before providing your final answer, use <thinking> tags to break down your reasoning process:
<thinking>
2-5 sentences of reasoning estimating how many hours would be needed to complete the tasks.
</thinking>
Provide your output in the following format:
<answer>A number representing hours (can use decimals like 0.5 for shorter tasks)</answer>
Assistant: <thinking>
```


**交互时间估算提示词**

```
Human: Consider the following conversation:
<conversation>
{{TRANSCRIPT}}
</conversation>
Estimate how many minutes the user spent completing the tasks in the prompt with the model.
Consider:
- Number and complexity of human messages
- Time reading Claude's responses
- Time thinking and formulating questions
- Time reviewing outputs and iterating
- Realistic typing/reading speeds
- Time implementing suggestions or running code outside of the converesation (only if directly relevant to the tasks)
Before providing your final answer, use <thinking> tags to break down your reasoning process:
<thinking>
2-5 sentences of reasoning about how many minutes the user spent.
</thinking>
Provide your output in the following format:
<answer>A number representing minutes</answer>
Assistant: <thinking>
```


**软件开发时间估算提示词**

```
Human: You are estimating software development tasks for open-source projects. Provide ONLY a number in hours (e.g., 0.3, 1.6, 15). Do not explain.
Task: {task}
Description: {description}:
Estimate (hours):
Assistant:
```


**任务时间估算提示词**

```
You are estimating how much time workers in the occupation "{occupation_title}" spend on each of their job tasks.
Below is the complete list of tasks for this occupation. For each task, estimate how many hours per week a typical worker spends on it.
Important: Don't worry about making the hours sum to exactly 40 or any specific total - we'll normalize the results afterward. Just give your best estimate for each task independently based on what seems realistic.
Tasks:
{tasks}
Return ONLY a JSON object mapping each task_id to your estimated hours per week, with no additional text, explanations, or commentary. Format:
{{
"task_id_1": hours,
"task_id_2": hours,
...
}}"""
```


#### 脚注

1. Claude容易产生时间跨度和成本的异常估算；例如，它将一些编程任务归类为需要人类数年完成或价值数百万美元。虽然这是可能的，但为了产生更保守的估算，我们取每个任务中位值的平均值，并按每个任务中的对话数量加权。

2. Hulten定理指出，在无扭曲的竞争均衡中，微观层面生产力增益对全要素生产率的贡献与该生产要素的Domar权重成正比，为一阶近似。一个要素的Domar权重是其总产出价值与GDP的比率。在Acemoglu（2024）提出的基于任务的模型中，劳动密集型任务的Domar权重等于该任务在工资总额中的份额乘以劳动收入份额。关于Hulten定理的最新处理与扩展，见Baqaee和Farhi（2019）。公式上，Hulten定理指出TFP的对数变化等于微观生产率对数变化的Domar加权和。在我们的情况中，对数变化取ln（无AI完成时间）减去ln（有AI完成时间）。

3. TFP的增长比劳动生产率的增长更为根本。劳动生产率是每个工人的产出比率，即使TFP不变，也可能因劳动以外其他生产要素的增加而增长。

4. [Acemoglu 2024](https://www.nber.org/papers/w32487)将AI暴露行业的劳动份额计算为0.57；我们为简便起见使用经济整体份额0.6，因为两者相差不大。

5. 关于全要素生产率的历史数据，见旧金山联邦储备银行的估算：[https://www.frbsf.org/research-and-insights/data-and-indicators/total-factor-productivity-tfp/](https://www.frbsf.org/research-and-insights/data-and-indicators/total-factor-productivity-tfp/)。2015年至2024年TFP的平均增长率为0.7%。二十年前，1995年至2004年TFP的平均增长率为1.6%。
