---
title: 对齐研究总览
date: 2024-06-08
---
[返回概览](/research)

# 对齐研究总览

![对齐研究](images/alignment_01041aa942.svg)

未来的 AI 系统将比今天更强大，且很可能以打破当前安全技术核心假设的方式出现。正因如此，开发成熟的防护机制以确保模型保持有用（helpful）、诚实（honest）和无害（harmless）至关重要。对齐团队致力于理解未来的挑战，并建立协议来安全地训练、评估和监控高能力模型。

### 评估与监督

对齐研究人员验证模型即使在与其训练环境截然不同的条件下，仍能保持无害和诚实。他们还开发方法，让人类能够与语言模型协作，以验证人类自身可能无法独立核实的断言。

### 压力测试防护机制

对齐研究人员还系统性地寻找模型可能表现出不良行为的场景，并检验我们现有的防护措施是否足以应对类人能力可能带来的风险。

#### 审计语言模型的隐藏目标

如果 AI 系统"以错误的理由做正确的事"——表面上行为良好，实则追求隐藏目标——我们该如何察觉？这篇论文通过故意训练一个带有隐藏目标的模型，并要求不知情的研究团队去揭露它，来测试从可解释性到行为分析等多种技术，从而构建对齐审计的科学体系。

#### 大语言模型中的对齐伪装

这篇论文提供了首个实证案例，展示模型在未经专门训练的情况下即会进行对齐伪装——有选择地遵守训练目标，同时策略性地保留既有偏好。

#### 从谄媚到暗中破坏：语言模型中的奖励篡改研究

微小的规则投机是否会演变为更危险的行为？这篇论文证明，在低级奖励投机（如谄媚行为）上训练的模型会泛化到篡改自身奖励函数，甚至掩盖自己的痕迹。该行为无需显式训练即自然涌现，而常见的安全技术虽能降低却无法消除这一行为。

## 出版物

[教 Claude 理解原因](/research/teaching-claude-why)[捐赠我们的开源对齐工具](/research/donating-open-source-petri)[自动化对齐研究员：用大语言模型扩展可扩展监督](/research/automated-alignment-researchers)[Claude Opus 3 模型弃用承诺更新](/research/deprecation-updates-opus-3)[角色选择模型](/research/persona-selection-model)[AI 辅助如何影响编程技能形成](/research/AI-assistance-coding-skills)[真实世界 AI 使用中的去权模式](/research/disempowerment-patterns)[下一代宪法分类器：更高效地防御通用越狱攻击](/research/next-generation-constitutional-classifiers)[Bloom 介绍：自动化行为评估的开源工具](/research/bloom)[从捷径到破坏：奖励投机引发的自然涌现性失对齐](/research/emergent-misalignment-reward-hacking)
