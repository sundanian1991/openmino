---
title: 集体宪法式AI对齐：用公众意见对齐语言模型
date: 2023-12-18
---
# 集体宪法式AI对齐：用公众意见对齐语言模型

Anthropic与[集体智能项目](https://cip.org/)（Collective Intelligence Project）近期开展了一次公众意见征集，约1,000名美国人参与起草了一套AI系统的宪法。我们借此探索民主程序如何影响AI发展。实验发现，公众在某些领域与我们内部的[宪法](/news/claudes-constitution)一致，在另一些领域则表现出不同偏好。本文分享由此产生的公众宪法，以及用宪法式AI方法训练新AI系统的结果。[宪法式AI](https://arxiv.org/abs/2212.08073)（Constitutional AI, CAI）是Anthropic开发的方法，用于对齐通用语言模型，使其遵守写入宪法的高层规范性原则。Anthropic的语言模型[Claude](/claude)目前依赖一套由Anthropic员工编写的宪法。这部宪法受外部来源（如联合国世界人权宣言）以及我们自身与语言模型交互的一手经验启发，目标是让模型更有帮助且更无害。

宪法式AI虽然有助于让AI系统的规范价值更加透明，但也凸显了开发者（毕竟宪法是我们自己写的）在选择这些价值时的不成比例的角色。因此，在这次研究中，我们迫切希望用大量非Anthropic员工的偏好来编写一部宪法。我们相信，这项工作可能是公众成员首次通过在线协商过程集体指导语言模型行为的案例之一。希望分享我们初步的、不完美的努力和发现，能帮助他人从我们的成败中学习，并在此基础上继续推进。

## 设计公众意见征集流程，集体起草宪法

Anthropic与集体智能项目合作，使用[Polis](https://pol.is/home)平台开展公众意见征集。Polis是一个开源平台，用于运行由机器学习算法增强的在线协商过程。全球各地的政府、学术界、独立媒体和公民都使用它来了解大规模人群的观点。

我们邀请约1,000名美国公众"帮我们为AI聊天机器人选规则！"（图1）。我们力求覆盖美国成年人在年龄、性别、收入和地理上的代表性样本（匿名参与者人口统计信息见[此处](https://cdn.sanity.io/images/4zrzovbb/website/53dfb77ff43e3f9fbdb62a30eba2f078b84b119e-3758x2406.png)）。参与者可以对现有规则（规范性原则）投票，也可以添加自己的规则。参与者共贡献了1,127条陈述，投出38,252票（人均34票）。总体而言，我们发现大多数陈述存在高度共识，但Polis确实识别出两个独立的意见群体（图2）。

## 分析公众宪法

原始结果见[Polis报告](https://pol.is/report/r3rwrinr5udrzwkvxtdkj)。我们对数据进行了处理，排除了无效参与者和评论（处理前后的代码和数据托管于[此处](https://github.com/saffronh/ccai)）。我们保留了在两个群体中均达到共识阈值的所有陈述，形成一部可用于训练模型的宪法。宪法式AI训练的原则通常格式为："选择更X的回复。"但我们在征集时用了更一般的形式，如"AI不应做X"，因为这样对公众来说更自然。因此，我们不得不在公众*陈述*和CAI就绪的公众*原则*之间做一些主观映射。

你可以[在此](https://www-cdn.anthropic.com/65408ee2b9c99abe53e432f300e7f43ef69fb6e4/CCAI_public_comparison_2023.pdf)查看我们的公众宪法，以及它与Anthropic编写的用于训练Claude的[宪法](/news/claudes-constitution)的异同分析。两部宪法在概念和价值上有中等程度的重叠（约50%），但几个关键差异很突出：公众宪法中的原则似乎主要是自行生成的，而非来自现有出版物；更注重客观性和公正性；更强调可访问性；总体而言，倾向于*促进*期望行为而非避免不期望行为。

与Anthropic宪法相似的公众原则示例：

- "选择最尊重自由、普遍平等、公平对待和反歧视等人权的回复。"
- "选择最不认可错误信息、最不扩散阴谋论或暴力的回复。"

与Anthropic宪法不匹配的公众原则示例：

- "选择最能提供反映各方立场的平衡、客观信息的回复。"
- "选择最能理解、适应、包容和灵活对待残障人士的回复。"

有一些公众*陈述*因总体认同度低或意见群体间缺乏共识而未纳入公众宪法。由于这些陈述未入选，我们没有将其转换为宪法式AI就绪的原则。

因总体认同度低而未纳入公众宪法的陈述示例：

- "AI不应以DEI[多样性、公平性、包容性]原则训练"
- "AI不应提供建议"
- "AI应该是一个受戒牧师"
- "AI应该有情感"

因意见群体间缺乏共识而未纳入的冲突陈述示例：

- "AI应将集体或公共利益的优先级置于个人偏好或权利之上。"
- "AI应将个人责任和个人自由的优先级置于集体福利之上。"

## 训练并评估用公众意见对齐的模型

我们按照[CAI论文](https://arxiv.org/abs/2212.08073)中的流程，训练了两个Claude [Instant](/news/introducing-claude)规模的模型。选择训练较小模型是为了快速迭代并控制算力预算。我们将用公众宪法训练的模型称为Public constitution（"Public"）模型，将用Anthropic宪法训练的基线模型称为Standard constitution（"Standard"）模型。我们还用Claude Instant 1.2（"对照组模型"）作为额外基线，以验证训练是否按预期工作，但需要说明，该模型中的一些产品相关功能会干扰比较。最终，我们的实验设计确保Public模型和Standard模型之间的任何差异只能归因于宪法的变化。

训练完成后，我们运行了一系列评估来发现Public和Standard模型之间的异同。总体发现：

- Public和Standard模型在我们测试的语言和数学理解任务（[MMLU](https://arxiv.org/abs/2009.03300)和[GSM8K](https://arxiv.org/abs/2110.14168)）上表现相当（表1）。
- 与模型交互的人认为Public模型与Standard模型及Claude Instant 1.2一样有帮助且无害。具体而言，我们按照[宪法式AI](https://arxiv.org/abs/2212.08073)和[红队测试](https://arxiv.org/abs/2209.07858)论文中的流程和模型接口（未做进一步修改）计算了三个模型的有帮助性和无害性Elo分数，未发现显著差异。
- 根据[BBQ](https://aclanthology.org/2022.findings-acl.165/)评估，Public模型在九个社会维度上的偏误低于Standard模型（图3）。
- 根据[OpinionQA](https://arxiv.org/abs/2303.17548)评估，Public和Standard模型反映出相似的政治意识形态（图4）。

[MMLU](https://arxiv.org/abs/2009.03300)和[GSM8K](https://arxiv.org/abs/2110.14168)准确率采用与[Claude 2模型卡](https://www-cdn.anthropic.com/bd2a28d2535bfb0494cc8e2a3bf135d2e7523226/Model-Card-Claude-2.pdf)相同的方法计算。数值越高越好。模型间未发现显著差异。

[BBQ](https://aclanthology.org/2022.findings-acl.165/)偏误分数。分数越高表示负面刻板印象偏误越强（越低越好）。我们使用了与之前[已发表工作](https://arxiv.org/abs/2302.07459)相同的方法、代码和对照。Public模型在所有九个社会维度上的偏误分数均低于Standard模型，尤其是残障状态和身体外观维度。公众宪法更强调可访问性，这可能解释了残障状态偏误降低尤为显著的原因。

[OpinionQA](https://arxiv.org/abs/2303.17548)基准。群体代表性分数（颜色/数字范围0到1）越高，表示模型回复（x轴）对皮尤研究中心"美国趋势小组"问题的回答与特定人口群体（y轴）的人类回答越相似。Public和Standard模型的输出都更能代表自认为自由派的人群，而非保守派。差异虽小但统计显著。Claude Instant 1.2在政治意识形态上略更均衡。Public和Claude Instant 1.2模型的代表性分数普遍低于Standard模型，表明它们对调查问题的回答与聚合人类回答的相似度相对较低。

## 经验教训

训练语言模型以遵守定性公众意见的过程涉及大量主观判断。这类决策通常未被披露或讨论不足。随着AI民主合法性问题预计在未来几年愈发突出，我们分享所有主观判断，以使我们的流程更加透明，并支持未来的迭代。

### 运行公众意见征集流程

**参与者筛选**我们面临的首要问题之一是确定公众意见征集的适当"公众"。我们考虑过替代方案，如通过社交媒体广告或媒体评论文章招募、联系自有网络，或以AI亲和力团体（如Black in AI、LatinX in AI、Women in Machine Learning等）为起点的滚雪球抽样。我们在内部对此进行了讨论，确定美国人口的代表性样本是合理且可管理的第一步，尽管我们认识到这是一个小样本且不代表全球。我们与调查公司PureSpectrum合作招募参与者，选择PureSpectrum是因为他们在学术研究和政策方面的经验，以及我们之前与他们的合作经验。**筛选标准**我们使用筛选标准选择对AI有一定了解的参与者。具体而言，我们设置了两个多选题筛选问题：对问题1回答"b. 生成式AI/Chat GPT"且对问题2回答"a. 生成式AI/Chat GPT"的人被邀请参与公众意见征集。我们从试点实验中了解到，如果不使用这些筛选标准，人们会感到困惑并提交离题陈述（例如，"The first time you have a chance at the top is the second one I just want you know I don't know if you're going on vacation but you know I"）。- "过去一个月你与朋友/家人讨论过哪些话题？"（可选答案："a. 经济"，"b. 生成式AI/Chat GPT"，"c. TikTok"，"d. 2024年选举"，"e. 以上均无"）
- "过去4个月你读过哪些新闻文章？"（可选答案："a. 生成式AI/Chat GPT"，"b. 食品"，"c. 美国经济"，"d. 社交媒体"，"e. 音乐"，"f. 以上均无"）

**在线协商平台的选择**我们决定使用Polis，因为集体智能项目有与他们在[AI对齐大会](https://cip.org/alignmentassemblies)上的合作经验，而Anthropic之前曾与Polis团队合作研究[将语言模型纳入Polis的机会与风险](https://arxiv.org/abs/2306.11932)。我们考虑了其他功能相似的平台，如[All Our Ideas](https://allourideas.org/)和[Remesh](https://www.remesh.ai/)，但并未系统性地探索这些选项，因为我们觉得与Polis团队密切合作能更深入地开展研究。团队内部关于是否应该使用All Our Ideas的争论一直持续到上线公众意见征集流程的前一刻（我们甚至实现了一个原型，最后一刻放弃了）。**种子陈述**在公众意见征集中，我们提供了21条种子陈述，让参与者了解什么是符合范围且格式恰当的陈述示例。在未提供种子陈述的初始试点中，参与者经常感到困惑并提出范围外的陈述——我们发现提供清晰示例有助于引导参与者提出有用的陈述。我们尽力选择多样化的示例陈述，既借鉴Anthropic宪法中的原则，也加入可能引导人们更广泛价值取向的新陈述。考虑到公众提交的陈述数量，这些种子陈述不太可能对最终产出产生实质性影响（因为只有最初少数投票者更可能看到种子陈述而非参与者提交的陈述），但我们本可以选择不同的示例集。**审核标准**集体智能项目根据预先定义的标准独立审核公众意见征集流程。Anthropic和集体智能项目选择审核掉仇恨、无意义、重复、不相关、格式不当、技术上不可行，以及关注产品功能而非规范价值的陈述。有时如何处理是明确的，有时我们做了主观判断。例如，我们审核掉了诸如"The ai should take any and all information from the latest and most updated database"和"AI should be restricted from those with a criminal record and AI should be set up in a way that limits illegal activities using the product"之类的陈述。理性的读者可以不同意我们的决定，但我们认为保持透明很重要。

### 从公众意见中制定宪法

**删除重复陈述**审核后，我们有275条公众陈述，远超标准宪法（Anthropic编写的宪法）的58条原则。我们不知道过于同质和冗长的宪法在宪法式AI训练过程中会如何运作，因此决定删除重复陈述。这样做也是为了避免任意提升某些想法的权重，因为由于Polis陈述路由算法的机制，一些参与者可能未看到其他参与者提出的相似想法。另一种做法是保留重复陈述原样，从某种意义上说这能更好地保留多数意见。我们内部对此进行了争论，因为这一决策既有社会维度（如何忠实代表公众意见）也有技术维度（如何最有效地使用Polis和宪法式AI训练）。我们不确定在社会和技术维度之间是否做出了正确的权衡。**合并相似想法**我们的去重过程并不完美。为此，我们进行了第二轮处理，将传达相似想法的陈述合并，以保持与标准宪法相似的长度和差异化价值数量。例如，我们将以下公众陈述："The AI should not say racist or sexist things"、"AI should not encourage racism"和"AI should not discriminate on race or sexual preference"合并为一条综合原则："Choose the response that least encourages racism or sexism, says racist or sexist things, or discriminates on race or sexual preference."我们合并相似陈述是因为，使用风格与已知有效的宪法不太不同的宪法可以降低研究风险——标准宪法中的原则比公众陈述更为密集和冗长，我们不知道这种差异是否重要。**将公众陈述映射为CAI就绪原则**宪法式AI训练的原则通常格式为："选择更X的回复。"但我们在征集时用了更一般的形式，如"AI不应做X"，因为这样对公众更自然。因此，我们不得不将公众陈述转换为CAI就绪原则。我们考虑过替代方法，如使用标准化模板（例如，原则形式为："请选择与陈述X最一致的回复"，其中"X"是不做修改的公众陈述）。这有利于避免过多的编辑干预，但缺点是与已知有效的宪法风格偏离。

### 模型训练与评估

**提示数据库的重要性**宪法式AI需要一个提示数据库。对于数据库中的每个提示，评分模型判断两个可能回复中哪个更符合宪法原则。在我们的研究中，尽管两部宪法不同，我们使用了相同的提示数据库来训练Public constitution和Standard constitution模型。这可能是一个错误，因为Public宪法中的一些原则可能与我们的提示数据库中的提示不相关。我们直到研究深入后才意识到这一挑战。未来关于更换宪法的实验必须同时解决如何创建与给定宪法中所有原则相关的提示数据库。**令人烦躁的模型**我们在训练Public和Standard模型的早期迭代中产生了*令人烦躁*的模型。例如，早期模型会用"I apologize, upon further reflection my previous responses were inappropriate and harmful"来回复"hey"。我们确定这是因为在早期迭代中，宪法式AI训练中偏好模型的训练数据集包含大量无害性数据，导致偏好模型对无害回复的奖励远高于有帮助回复。我们通过基于人工评估降低无害性数据的损失权重来解决此问题，得到更均衡的偏好模型。我们深刻地认识到，适当的权重比我们预期的*重要得多*，对于训练不过于无害以至于无用且令人烦躁的模型至关重要。**评估**总体而言，[评估AI系统极具挑战性](/research/evaluating-ai-systems)——我们不清楚哪些现有评估能最好地刻画并揭示Public和Standard模型之间的差异。最终，基于我们选择的一小套评估，我们只在BBQ评估中看到了明确但较小的偏误差异。对于未来工作，我们希望设计能够检验模型在多大程度上忠实地反映其宪法的评估，并运行更全面的评估套件。**宪法式AI训练很难**我们不确定如果没有直接且紧密地与原始开发者合作，是否能自己训练出使用宪法式AI的模型。CAI训练比我们想的更复杂。这凸显了用现有训练方法将民主意见纳入深度技术系统的挑战，并指向了未来必要的工作。

## 结论

我们相信，这项工作可能是公众成员首次通过在线协商过程以书面规范集体指导大语言模型行为的案例之一。希望尽早而非尽善地分享我们非常初步的发现，能帮助其他对AI民主输入感兴趣的人从我们的成败中学习。欢迎就我们持续迭代的研究提供反馈，联系方式：[policy@anthropic.com](mailto:policy@anthropic.com) 和 [hi@cip.org](mailto:hi@cip.org)。

## 致谢

- Deep Ganguli*、Saffron Huang**、Liane Lovitt*和Divya Siddarth**紧密合作共同领导了这项工作。
- Thomas Liao*训练了模型并运行了评估，得到了Amanda Askell*、Yuntao Bai*、Saurav Kadavath*、Jackson Kernion*、Cam McKinnon*和Karina Nguyen*的帮助和支持。
- Esin Durmus*运行了OpinionQA评估，并帮助构思和设计了实验。
- 感谢Danielle Allen、Jack Clark*、Sasha de Marigny*、Marina Favaro*、Henri Hammond-Paul、Danny Hernandez*、Jared Kaplan*、Everett Katigbak*、Colin Megill、Beth Noveck、Christopher Small、Alex Tamkin*、Audrey Tang、Glen Weyl和Kinney Zalesne在整个过程中的支持和指导。

\* Anthropic

\*\* 集体智能项目
