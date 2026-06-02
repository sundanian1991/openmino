---
title: Open-sourcing circuit-tracing tools
description: Anthropic is an AI safety and research company that's working to build reliable, interpretable, and steerable AI systems.
sitename: Anthropic
date: 2023-11-03
---
# Open-sourcing circuit tracing tools

![Screenshot of the Neuronpedia interactive interface showing an attribution graph](images/interface.png)

In our recent interpretability research, we introduced a new method to [trace the thoughts](https://www.anthropic.com/research/tracing-thoughts-language-model) of a large language model. Today, we're open-sourcing the method so that anyone can build on our research.

Our approach is to generate *attribution graphs*, which (partially) reveal the steps a model took internally to decide on a particular output. The open-source [library](https://github.com/safety-research/circuit-tracer) we're releasing supports the generation of attribution graphs on popular open-weights models—and a frontend hosted by Neuronpedia lets you explore the graphs interactively.

This project was led by participants in our [Anthropic Fellows](https://alignment.anthropic.com/2024/anthropic-fellows-program/) program, in collaboration with [Decode Research](https://www.decoderesearch.org/).

To get started, you can visit the [Neuronpedia interface](https://www.neuronpedia.org/gemma-2-2b/graph) to generate and view your own attribution graphs for prompts of your choosing. For more sophisticated usage and research, you can view the [code repository](https://github.com/safety-research/circuit-tracer). This release enables researchers to:

**Trace circuits** on supported models, by generating their own attribution graphs; **Visualize, annotate, and share** graphs in an interactive frontend; **Test** **hypotheses** by modifying feature values and observing how model outputs change.

We've already used these tools to study interesting behaviors like multi-step reasoning and multilingual representations in Gemma-2-2b and Llama-3.2-1b—see our demo [notebook](https://github.com/safety-research/circuit-tracer/blob/main/demos/circuit_tracing_tutorial.ipynb) for examples and analysis. We also invite the community to help us find additional interesting circuits—as inspiration, we provide additional attribution graphs that we haven't yet analyzed in the demo notebook and on Neuronpedia.

Our CEO Dario Amodei [wrote recently](https://www.darioamodei.com/post/the-urgency-of-interpretability) about the urgency of interpretability research: at present, our understanding of the inner workings of AI lags far behind the progress we're making in AI capabilities. By open-sourcing these tools, we're hoping to make it easier for the broader community to study what's going on inside language models. We're looking forward to seeing applications of these tools to understand model behaviors—as well as extensions that improve the tools themselves.

*The open-source-circuit-finding library was developed by Anthropic Fellows Michael Hanna and Mateusz Piotrowski with mentorship from Emmanuel Ameisen and Jack Lindsey. The Neuronpedia integration was implemented by Decode Research (Neuronpedia lead: Johnny Lin; Science lead/director: Curt Tigges). Our Gemma graphs are based on transcoders trained as part of the GemmaScope project. For questions or feedback, please open an issue on GitHub.*
