---
title: 通过人类反馈强化学习训练有用且无害的助手
date: 2023-12-18
---
# 通过人类反馈强化学习训练有用且无害的助手

## 摘要

我们将偏好建模和人类反馈强化学习（RLHF）应用于微调语言模型，使其成为有用且无害的助手。我们发现，这种对齐训练在几乎所有 NLP 评估上都提升了性能，并且与 Python 编程和摘要等专业技能训练完全兼容。我们探索了一种迭代在线训练模式，在该模式中偏好模型和 RL 策略以每周为周期，利用新的人类反馈数据进行更新，从而高效地改进我们的数据集和模型。最后，我们研究了 RLHF 训练的鲁棒性，发现 RL 奖励与策略与其初始化之间的 KL 散度的平方根之间存在近似线性的关系。除主要结果外，我们还进行了关于校准、竞争目标以及 OOD 检测使用的辅助分析，将我们的模型与人类写作者进行了比较，并提供了使用近期相关工作中出现的提示词生成的模型样本。

## 作者

Yuntao Bai, Andy Jones, Kamal Ndousse, Amanda Askell, Anna Chen, Nova DasSarma, Dawn Drain, Stanislav Fort, Deep Ganguli, Tom Henighan, Nicholas Joseph, Saurav Kadavath, Jackson Kernion, Tom Conerly, Sheer El-Showk, Nelson Elhage, Zac Hatfield-Dodds, Danny Hernandez, Tristan Hume, Scott Johnston, Shauna Kravec, Liane Lovitt, Neel Nanda, Catherine Olsson, Dario Amodei, Tom Brown, Jack Clark, Sam McCandlish, Chris Olah, Ben Mann, Jared Kaplan
