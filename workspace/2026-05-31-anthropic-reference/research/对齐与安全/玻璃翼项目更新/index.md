---
title: 玻璃翼项目：初步更新
date: 2026-05-20
---
# 玻璃翼项目：初步更新

> 原文：[Project Glasswing: An initial update](https://www.anthropic.com/research/glasswing-initial-update) | 2026-05-20

上个月，我们启动了[玻璃翼项目（Project Glasswing）](https://www.anthropic.com/glasswing)——一项协作计划，旨在保护全球最关键软件的安全，防止日益强大的 AI 模型被用于攻击它们。

此后，我们与约 50 家合作伙伴使用 Claude Mythos Preview，在全球最具系统重要性的软件中发现了超过一万个高危或严重级别的漏洞。过去，软件安全的进展受限于发现新漏洞的速度。现在，瓶颈变成了验证、披露和修复 AI 发现的大量漏洞的速度。

本文讨论我们在玻璃翼项目最初几周对这一关键网络安全挑战的认识。我们重点关注 Mythos Preview 性能的早期公开证据、扫描数千个开源软件项目的初步结果，以及这些进展对当前网络防御者的意义。我们还会介绍玻璃翼项目的下一步计划，以及我们对未来发布 Mythos 级模型的思考。

## 早期成果

### 讨论 Mythos Preview 发现结果的方式

软件行业的长期惯例是在漏洞被发现 90 天后披露（或者，如果在 90 天内创建了补丁，则在补丁可用约 45 天后披露）。这为终端用户留出时间更新软件，以免漏洞被攻击者利用。我们自己的[协调漏洞披露政策](https://www.anthropic.com/coordinated-vulnerability-disclosure)也采用这一方式。

然而，这意味着已披露的漏洞是 AI 模型网络能力加速前移的滞后指标：我们尚未达到可以全面详述合作伙伴使用 Mythos Preview 发现的漏洞而不危及终端用户的程度。取而代之的是，我们提供模型性能的说明性示例，以及截至目前的汇总统计数据。一旦 Mythos Preview 发现的漏洞补丁得到广泛部署，我们将提供更详细的学习成果。

### 来自合作伙伴和外部测试者的证据

玻璃翼项目的初始合作伙伴构建和维护着互联网及其他关键基础设施赖以运行的软件。修复其代码中的缺陷可降低众多依赖这些软件的组织面临的风险，进而降低数十亿终端用户的风险。

一个月后，大多数合作伙伴各自在其软件中发现了数百个严重或高危漏洞。合计超过一万个。多家合作伙伴告诉我们，其漏洞发现速度提升了十倍以上。例如，[Cloudflare](https://blog.cloudflare.com/cyber-frontier-models/) 在其关键路径系统中发现了 2,000 个漏洞（其中 400 个为高危或严重级别），Cloudflare 团队认为其误报率优于人工测试者。

这与外部测试者对 Mythos Preview 性能的体验以及近期对该模型的额外评估一致：

**英国 AI 安全研究所（UK AISI）**[报告](https://www.aisi.gov.uk/blog/how-fast-is-autonomous-ai-cyber-capability-advancing)称，Mythos Preview 是首个端到端攻克其两个网络靶场（多步网络攻击模拟）的模型；**Mozilla** 在测试 Mythos Preview 期间在 Firefox 150 中[发现并修复](https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/)了 [271 个漏洞](https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/)——比他们在 Firefox 148 中使用 Claude Opus 4.6 发现的漏洞多出十倍以上；独立安全平台 **XBOW** [报告](https://xbow.com/blog/mythos-offensive-security-xbow-evaluation)称，Mythos Preview 在其 Web 漏洞利用基准测试上"相比所有现有模型有显著跃升"，并在单位 token 基础上提供了"绝对前所未有的精度"；**ExploitBench**——两个近期发布的衡量模型漏洞利用开发能力的学术基准——显示 Mythos Preview 表现最强。我们在 **ExploitGym** [前沿红队博客](https://red.anthropic.com/2026/exploit-evals/)中更详细地讨论了这些基准测试对模型的评估。

更广泛地看，我们现在看到已打补丁软件的推出速度大幅加快。Palo Alto Networks 最新发布的补丁数量是往常的[五倍](https://www.paloaltonetworks.com/blog/2026/05/defenders-guide-frontier-ai-impact-cybersecurity-may-2026-update/)以上。微软[报告](https://www.microsoft.com/en-us/msrc/blog/2026/05/a-note-on-patch-tuesday)称，其新补丁的发布数量将"在一段时间内持续呈增大趋势"。Oracle 发现和修复其产品及云服务漏洞的速度[比以前快了好几倍](https://blogs.oracle.com/security/accelerating-vulnerability-detection-and-response-at-oracle)。

Mythos Preview 还在其他类型的安全工作中证明了其价值。例如，在我们的一家玻璃翼合作银行，一名威胁行为者入侵了客户的电子邮件账户并进行虚假电话后，Mythos Preview 帮助检测并阻止了一笔 150 万美元的欺诈性电汇。

## 开源软件

过去几个月，Anthropic 使用 Mythos Preview 扫描了超过 1,000 个开源项目，这些项目共同支撑着互联网的大部分——以及我们自身基础设施的很大一部分。

截至目前，Mythos Preview 在这些项目中发现了其评估为高危或严重级别的 6,202 个漏洞（总计 23,019 个，包括评估为中危或低危的漏洞）。

其中 1,752 个高危或严重级别的漏洞已由六家独立安全研究公司（少数情况下由我们自己）仔细评估。其中 90.6%（1,587 个）被证实为有效的真阳性，62.4%（1,094 个）被确认为高危或严重级别。这意味着，即使 Mythos Preview 不再发现任何新漏洞，按照我们当前分类后验证的真阳性率，它有望在开源代码中发现近 3,900 个高危或严重级别漏洞——这还不包括为玻璃翼项目合作伙伴发现的漏洞。需要明确的是，我们计划在一段时间内继续扫描开源代码，因此预计这一数字还会上升。

Mythos Preview 检测到的一个开源漏洞示例来自 [wolfSSL](https://www.wolfssl.com/)，这是一个以安全著称的开源加密库，被全球数十亿设备使用。Mythos Preview [构建了一个漏洞利用](https://www.wolfssl.com/how-claude-mythos-preview-helped-harden-wolfssl/)，攻击者可借此伪造证书，从而（例如）托管一个银行或电子邮件提供商的虚假网站。该网站对终端用户看起来完全合法，实际却由攻击者控制。我们将于未来几周发布对这一现已修补的漏洞（编号 [CVE-2026-5194](https://nvd.nist.gov/vuln/detail/CVE-2026-5194)）的完整技术分析。

如前所述，*修复*此类漏洞的瓶颈在于人类的能力——分类、报告、设计并部署补丁。有了 Mythos Preview，一开始的发现环节变得极其直接。我们创建了一个已扫描的[开源漏洞仪表盘](https://red.anthropic.com/2026/cvd/)，展示我们披露流程的不同阶段，并跟踪进展。该仪表盘显示所有严重级别的漏洞，而非仅限 Mythos Preview 初步评估为高危或严重的子集。注意每个阶段的陡峭下降，这反映了验证和修复每个漏洞所需的大量人力投入。

我们的漏洞分类流程十分密集。首先，我们或与我们合作的外部安全公司复现 Mythos 发现的问题并重新评估其严重性。确认漏洞真实存在后，我们检查是否已有修复措施，并编写详细报告提交给软件维护者。我们在这方面格外谨慎：除了维护开源软件本身的常规挑战外，维护者还面临大量低质量的 AI 生成漏洞报告的冲击。事实上，多位维护者告诉我们他们目前严重超负荷，有些甚至请求我们放慢披露速度，因为他们需要更多时间来设计补丁。（平均而言，Mythos Preview 发现的高危或严重漏洞需要两周时间来修补。）

应维护者要求，我们有时会直接披露漏洞，不进行进一步评估。我们目前已报告了 1,129 个此类未经审核的漏洞，Mythos Preview 估计其中 175 个为高危或严重级别。

我们估计到目前为止已向维护者披露了 530 个高危或严重级别漏洞。直接披露的情况基于 Claude 的严重性评估，可行时基于维护者或我们安全合作伙伴的评估。此外还有 827 个已确认漏洞（按同样方式评估为高危或严重级别），我们正尽快推进披露。

我们报告的 530 个高危或严重级别漏洞中，已有 75 个完成修补，其中 65 个发布了公开通告。补丁数量仍然相对较低，原因有三。第一，我们仍处于协调漏洞披露政策规定的 90 天窗口期早期：我们预计很快会有更多补丁落地。第二，我们可能少计了补丁，因为有些漏洞在修补时未发布公开通告：这些情况我们只能依靠 Claude 自行扫描补丁。第三，补丁数量少反映了一个真实问题：即使以我们相对较慢的披露速度，Mythos Preview 也在加剧本已超负荷的安全生态系统。

发现漏洞的相对容易与修复漏洞的困难之间的差距，构成了网络安全的重大挑战。成功应对这一挑战将使我们软件的远比今天更安全。下文讨论网络防御者可以采取的应对方式。

## 适应网络安全的新阶段

具备与 Mythos Preview 相似网络安全能力的模型将很快更广泛地可用。整个软件行业显然需要更大规模的协作来管理这些模型将产生的海量发现结果。

目前，从漏洞发现到创建补丁，再到补丁被终端用户广泛部署，通常存在很长的滞后。这为攻击者利用关键软件留下了显著的窗口期。Mythos 级模型大幅缩短了发现和利用漏洞所需的时间和成本，放大了与这些时间滞后相关的风险。最终，Mythos 级模型将使开发者能够在漏洞部署前捕获它们，从而构建远比今天更安全的软件。但在这个过渡期——漏洞被快速发现却修补缓慢——将带来新的风险。

软件开发者和用户应立即采取行动降低风险敞口。以下建议并非新内容，许多研究者（包括 Anthropic 的研究者）正在研究更好、更持久的解决方案。与此同时，做好基础工作至关重要：

**软件开发者**应缩短补丁周期，尽快提供安全修复。审慎使用公开可用的 AI 模型可以在此发挥作用；我们正在构建工具并分享研究以支持这一点（详见下文）。开发者还应通过尽可能简化更新安装流程来帮助用户保持软件最新；在可行范围内，应对仍在运行含已知漏洞软件的用户进行更持续的跟进。**网络防御者**应缩短补丁测试和部署时间线。[美国国家标准与技术研究院（NIST）](https://www.nist.gov/cyberframework)和英国[国家网络安全中心（NCSC）](https://www.ncsc.gov.uk/collection/10-steps/risk-management)等机构制定的关键控制措施现在更加重要，因为它们不依赖任何单一补丁的及时落地就能提升安全性。这些措施包括加固网络的默认配置、强制多因素认证，以及保持全面的日志用于检测和响应。

### 基于公开可用 AI 模型的网络防御工具

许多广泛可用的模型已经能发现大量软件漏洞，尽管它们无法发现最复杂的漏洞，也不能像 Claude Mythos Preview 那样有效利用漏洞。玻璃翼项目已经促使许多其他组织使用这些广泛可用的模型对自己的代码库采取行动；我们正在努力让这一过程变得更加容易。

首先，我们已面向 Claude Enterprise 客户发布了公开测试版的 [Claude Security](https://claude.com/product/claude-security)。这是一个帮助团队扫描代码库漏洞的工具，并能生成修复建议。发布三周以来，Claude Opus 4.7 已被用于修补超过 2,100 个漏洞。（这比上述开源修补速度快得多，主要是因为企业修复的是自己的代码，而开源修复通常需要志愿者维护者通过协调披露流程来完成。）

我们还启动了[网络验证计划（Cyber Verification Program）](https://support.claude.com/en/articles/14604842-real-time-cyber-safeguards-on-claude)，允许安全专业人员出于合法网络安全目的（如漏洞研究、渗透测试和红队演练）使用我们的模型时，不受某些为防止网络滥用而设计的安全措施的约束。

现在，我们正将我们和合作伙伴在 Mythos Preview 中使用的工具按需提供给符合条件的客户安全团队。我们的目标是让安全团队无需大量配置即可从高能力公开模型中获取最佳性能。此次发布包括：

- 我们和合作伙伴构建并共享的 [skills](https://code.claude.com/docs/en/skills)（用于重复性工作的自定义指令）;
- 一个帮助 Claude 映射代码库、启动扫描子代理、分类发现结果并撰写报告的运行框架;
- 一个威胁模型构建器，用于映射代码库以识别潜在攻击目标并据此排定模型工作优先级。

思科（Cisco），我们的玻璃翼项目合作伙伴之一，最近也开源了其 [Foundry Security Spec](https://blogs.cisco.com/ai/announcing-foundry-security-spec)，帮助其他防御者构建类似于其自用的评估系统。

## 支持生态系统

我们已与开源安全基金会（OpenSSF）的 Alpha-Omega 项目建立了[合作关系](https://openssf.org/press-release/2026/03/17/linux-foundation-announces-12-5-million-in-grant-funding-from-leading-organizations-to-advance-open-source-security/)，支持该基金会协助维护者处理和分类漏洞报告的工作。我们还在继续发布关于前沿模型能力如何最好地支持网络防御者的研究。

我们还支持了 [ExploitBench](http://exploitbench.ai) 和 [ExploitGym](https://rdi.berkeley.edu/blog/exploitgym/) 的开发，这两个新基准允许研究者追踪前沿 AI 模型漏洞利用开发能力随时间的变化，详见[此处](https://red.anthropic.com/2026/exploit-evals/)的讨论。我们正通过[外部研究者访问计划](https://support.claude.com/en/articles/9125743-what-is-the-external-researcher-access-program)支持其他高质量量化基准的开发。最后，[Claude for Open Source](https://claude.com/contact-sales/claude-for-oss) 为维护者和贡献者提供支持，我们承诺未来对我们自身采用的任何开源包进行扫描。

## 玻璃翼项目的下一步

AI 进步的速度意味着与 Mythos Preview 同样能力的模型很快将被多家不同的 AI 公司开发出来。目前，没有一家公司——包括 Anthropic——开发出了足够强大的安全防护措施，能防止此类模型被滥用以至于可能造成严重伤害。这就是我们尚未向公众发布 Mythos 级模型的原因。但这也是我们启动玻璃翼项目的原因：如果一个能力相似的模型在*没有*此类防护措施的情况下发布，全球几乎任何人都将很快变得能够以极低的成本、极其容易地利用有缺陷的软件。

玻璃翼帮助最具系统重要性的网络防御者获得不对称优势。然而，尽可能多的组织迫切需要加强其网络防御。我们希望我们的广泛可用模型，以及我们随附提供的新工具、资源和研究，能支持这些组织改善其网络安全态势。

接下来，我们将与关键合作伙伴——包括美国及其盟国政府——合作，将玻璃翼项目扩展到更多合作伙伴。在不久的将来，一旦我们开发出所需的远更强大的防护措施，我们期待通过正式发布让 Mythos 级模型可用。

跨过这些风险之后，等待我们的是一个令人鼓舞的世界：关键代码比今天坚固得多，黑客攻击远不如今天普遍。前路障碍重重，但我们仍然坚信玻璃翼项目能帮助我们到达那里。
