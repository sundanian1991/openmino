---
title: 用模型编写的评估发现语言模型行为
description: 利用语言模型自动生成评估，发现包括逆向缩放、谄媚行为和RLHF负面效应在内的新行为模式。
date: 2022-12-19
source: https://www.anthropic.com/research/discovering-language-model-behaviors-with-model-written-evaluations
paper: https://arxiv.org/abs/2212.09251
data: https://github.com/anthropics/evals
visualizations: https://www.evals.anthropic.com/model-written/
subjects:
  - 对齐
  - 研究
---

# 用模型编写的评估发现语言模型行为

## 摘要

随着语言模型（LMs）规模扩大，它们会发展出许多新行为，有好有坏，这使得评估它们的行为变得更加紧迫。此前的工作通过众包（耗时且昂贵）或现有数据源（并非总是可用）来创建评估。本文中，我们利用语言模型自动生成评估。我们探索了不同人力投入程度的方法，从让语言模型编写是/否问题，到通过多阶段基于语言模型的生成和过滤来制作复杂的 Winogender 模式。众包人员将这些示例评为高度相关，并对 90-100% 的标签表示认同，有时甚至超过相应的人工编写数据集。我们生成了 154 个数据集，并发现了逆向缩放（inverse scaling）的新案例——即语言模型随着规模增大反而表现更差。更大的语言模型会更倾向于重复对话中用户偏好的答案（"谄媚行为"，sycophancy），并表现出更强的追求令人担忧的目标的倾向，如资源获取（resource acquisition）和目标保持（goal preservation）。我们还发现了基于人类反馈的强化学习（RLHF）中逆向缩放的首批案例，即更多的 RLHF 反而使语言模型表现更差。例如，RLHF 使语言模型表达更强的政治观点（涉及持枪权和移民），以及更强的避免被关闭的意愿。总体而言，语言模型编写的评估质量很高，使我们能够快速发现许多新的语言模型行为。
