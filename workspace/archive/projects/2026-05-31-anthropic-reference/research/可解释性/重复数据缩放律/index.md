---
title: 重复数据学习的缩放律与可解释性
author: Authors
date: 2023-12-18
---

# 重复数据学习的缩放律与可解释性

## 摘要

近年来，大语言模型在海量数据集上训练，但也经常使用重复数据——或是有意为之，旨在提高高质量数据的权重；或是由数据去重不完善导致，模型在句子、段落或文档级别接触到重复数据。一些研究已报告了这种重复数据的显著负面性能影响。本文尝试系统性地研究重复数据，并从机理层面理解其影响。为此，我们训练了一组模型，其中大部分数据是唯一的，但有一小部分数据被重复多次。我们发现了一种强烈的双下降现象：重复数据可能导致测试损失在训练中期不降反升。在一个可预测的重复频率区间内，性能退化程度惊人地严重。例如，一个 8 亿参数的模型，仅仅因为 0.1% 的数据被重复 100 次，其性能就可能退化到与一个 2 倍小的模型（4 亿参数）相当，尽管其余 90% 的训练 token 保持唯一。我们推测，存在一个中间区间，数据可以被记忆化，而记忆化会消耗模型的大量容量，性能退化的峰值可能就出现在这个区间。最后，我们将这些观察与近期的机理可解释性工作联系起来——即试图逆向工程模型执行的详细计算——发现数据重复不成比例地损害了与泛化相关的复制和内部结构（如归纳头），这为从泛化到记忆化的转变提供了一种可能的机制。综合来看，这些结果提供了一个假说：为什么在大语言模型中重复相对较小比例的数据，可能导致不成比例的巨大性能损害。

## 作者

Amanda Askell, Yuntao Bai, Anna Chen, Dawn Drain, Deep Ganguli, Tom Henighan, Andy Jones, Nicholas Joseph, Ben Mann, Nova DasSarma, Nelson Elhage, Zac Hatfield-Dodds, Danny Hernandez, Jackson Kernion, Kamal Ndousse, Catherine Olsson, Dario Amodei, Tom Brown, Jack Clark, Sam McCandlish, Chris Olah, Jared Kaplan
