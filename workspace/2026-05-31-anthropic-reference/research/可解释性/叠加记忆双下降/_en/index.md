# Superposition, Memorization, and Double Descent

### Authors

[Tom Henighan∗](https://tomhenighan.com/),
Shan Carter∗,
Tristan Hume∗,
[Nelson Elhage∗](https://nelhage.com/),
Robert Lasenby,
Stanislav Fort,
Nicholas Schiefer,
[Christopher Olah‡](https://colah.github.io/)

### Affiliation

[Anthropic](https://www.anthropic.com/)

### Published

January 5, 2023

* Core Research Contributor;
‡ Correspondence to [colah@anthropic.com](mailto:colah@anthropic.com);
[Author contributions statement below](#author-contributions).

---

In a [recent paper](https://transformer-circuits.pub/2022/toy_model/index.html), we found that simple neural networks trained on toy tasks often exhibit a phenomenon called superposition, where they represent more features than they have neurons. Our investigation was limited to the infinite-data, underfitting regime. But there's reason to believe that understanding overfitting might be important if we want to succeed at mechanistic interpretability, and that superposition might be a central part of the story.

Why should mechanistic interpretability care about overfitting? Despite overfitting being a central problem in machine learning, we have little mechanistic understanding of what exactly is going on when deep learning models overfit or memorize examples. Additionally, previous work has hinted that there may be an important link between overfitting and learning interpretable features.

So understanding overfitting is important, but why should it be relevant to superposition? Consider the case of a language model which verbatim memorizes text. How can it do this? One naive idea is that it might use neurons to create a lookup table mapping sequences to arbitrary continuations. For every sequence of tokens it wishes to memorize, it could dedicate one neuron to detecting that sequence, and then implement arbitrary behavior when it fires. The problem with this approach is that it's extremely inefficient – but it seems like a perfect candidate for superposition, since each case is mutually exclusive and can't interfere.

In this note, we offer a very preliminary investigation of training the same toy models in our previous paper on limited datasets. Despite being extremely simple, the toy model turns out to be a surprisingly rich case study for overfitting. In particular, we find the following:

- Overfitting corresponds to storing data points, rather than features, in superposition.
- Depending on dataset size, our models fall into two different regimes: an overfitting regime (characterized by storing data points in superposition), and a generalizing regime (characterized by storing features in superposition).
- We observe double descent as the model transitions between these regimes.

### Experiment Setup

We hypothesize that real neural networks perform operations in a sparse, high-dimensional "feature" space, but these features are difficult for us to see directly because they're stored in superposition. Motivated by this, we attempt to simulate this feature space using synthetic input vectors x which are sparse, high-dimensional, and non-negative (similar to our [previous paper](https://transformer-circuits.pub/2022/toy_model/index.html#demonstrating-setup-x)). Concretely, x ∈ ℝⁿ is a n=10,000 dimensional vector. We let individual features x_i = 0 with probability S=0.999, but otherwise uniformly distributed between [0, 1]. However in contrast to our previous work, we then rescale x such that ||x||² =1, as this will make memorization of training examples easier. We also consider training sets of finite size T, whereas our previous work only considered T=∞. We will use X ∈ ℝⁿˣᵀ to refer to the matrix of training data, where each column X_i is a training data point.

We consider the ["ReLU Output" toy model](https://transformer-circuits.pub/2022/toy_model/index.html#demonstrating-setup-model), defined as:

**ReLU Output Model**

```
h = Wx
x' = ReLU(Wᵀh + b) = ReLU(WᵀWx + b)
```

where W is Xavier-initialized. Models are trained to minimize mean-squared reconstruction error:

```
L = (1/T) ∑_x ∑_i I_i (x_i - x'_i)²
```

In this work we limit ourselves to uniform importance I_i = 1, ∀i.

We use 50,000 full-batch updates, as opposed to mini-batch, using the AdamW optimizer. Our learning rate schedule includes a 2,500 step linear-warmup to 1e-3, followed by a cosine-decay to zero. The number of training updates, the use of full-batch optimization, and the annealed learning rate all seem important for our results. We focus on very low-dimensional hidden spaces which seems to make this a more difficult optimization problem. Additionally, having extremely sparse features makes gradients much noisier. For this reason, it's important to optimize for a large number of steps using full-batches to produce these results. In some experiments, we'll further train multiple models with different random seeds for parameter-initialization and select the one with the lowest training loss in order to avoid local minima. However we qualitatively find these sensitivities are greatly reduced for models with m>3.

Unless otherwise specified, we use a weight decay of 1e-2. In line with previous work, we find that double descent is strongest with low values of weight decay and vice versa.

### "Datapoint Features" vs "Generalizing Features"

In the "normal superposition" we described in our previous paper, we found that the model embeds more features than it has dimensions, often mapping them to regular polytopes. For example, if the model has a two dimensional hidden space, sparse features will be organized as a pentagon:

![Normal superposition: features organized as a pentagon](https://transformer-circuits.pub/2023/toy-double-descent/index.html#datapoints-vs-features)

However, when we train models to reconstruct on finite datasets, the behavior becomes very different. Instead of features forming regular polytopes, we see something messy and unstructured — unless we look at the hidden vectors h_i = Wx_i, i.e. the projections of the training data points into the hidden space. Surprisingly, these projections exhibit very clean structure.

Specifically, for small training sets, the hidden vectors form regular T-gons — the training data points are arranged into regular polygons in hidden space. The model is storing individual data points in superposition, rather than "generalizing features."

As we increase the number of training examples, the behavior undergoes a qualitative change. Above a certain critical dataset size, the model no longer stores data points in superposition, but switches to the familiar regime of generalizing features. In the transition region, the model behaves poorly, with low dimensionality for both features and data points.

### Superposition Double Descent

The phenomenon of models behaving very differently in two different regimes, with strange behavior in between, is eerily reminiscent of double descent, especially "data double descent." One striking phenomenon of data double descent is that test loss gets worse before it gets better — in violation of naive intuitions that more data should always reduce overfitting!

For a given T, the model's solution will depend on the randomly-chosen training set, where some will lend themselves to memorization (e.g. orthogonal training examples) and others to generalization. To ensure our results aren't a fluke, we trained 4 models with different dataset random seeds for each dataset size. We then plotted the average test loss, revealing a clear bump at the transition between the "data points in superposition" regime and the "generalizing features in superposition" regime.

It's interesting to note that we're observing double-descent in the absence of label noise. That is to say: the inputs and targets are exactly the same. Here, the "noise" arises from the lossy compression happening in the downprojection. It is impossible to encode 10,000 features into 2 neurons with a linear projection, even in the sparse limit. Thus the reconstruction is necessarily imperfect, giving rise to unavoidable reconstruction error and consequently, double-descent.

### The Effect of m on Double Descent

At this point, it's natural to wonder whether the double descent might be an artifact of only having m=2 hidden dimensions, or difficulties with optimization. In this section, we confirm that this isn't the case and also explore a theme in some of the double descent literature — understanding it not as a one-dimensional phenomenon, but as a multi-dimensional interaction between model size, dataset size, and training.

We visualize double descent as a two-dimensional function varying both the number of training examples, T, and the number of hidden dimensions, m. All other hyperparameters are the same as above. We train four models for each (T,m) configuration, averaging the resulting losses. We empirically found optimization to yield much more consistent results for m>3.

There are clearly regions where "double descent" occurs — regions where bigger models or more data hurt performance. Consistent with prior work on double descent, these results are sensitive to weight decay and the number of training epochs. In the appendix, we show that for m=4 models:
- The test-loss bump increases when training for more epochs
- Increasing weight-decay from 1e-2 to 1.0 removes the bump entirely

### Maximal Data Dimension

Adam Jermyn further explored how the dimensionality allocated by the model to training data points varies with how often data points are repeated. He found that in the memorization regime, repeated data points get significantly higher dimensionality — not just compared to random data points, but compared to "similar" data points. This means the model is learning specific "single data point features," not features that are meaningful for similar data points.

These results show that models can simultaneously use both "data point features" and "generalizing features" — for instance, "memorization appendages" on top of generalizing features. This also suggests that in real models, distinguishing between these two cases requires solving superposition.

### Discussion

We find that, in toy models, memorization can be understood as models learning "single data point features" in superposition. These models exhibit double descent as they transition from this strategy of representing data points to representing features.

Several implications of this work:

First, we have an example of overfitting — in a problem which wasn't specifically tuned for overfitting/memorization — which from a naive perspective looks horribly messy and complicated but turns out to be very simple and clean. Although it's a toy problem, that's very promising.

Second, what we observe is exactly the naive hypothesis + superposition. And in retrospect this makes a lot of sense: memorization is the ideal case for superposition. Definitionally, a single data point feature is the most sparse possible feature you can have.

Third, Adam Jermyn's extension to repeated data shows that "single data point features" and "generalizing features" can co-occur. The nice double descent phase change is really just the cherry on the cake. The important thing is having these two regimes where we represent data points vs features.

This work may also have bearing on mechanistic anomaly detection. Perhaps the clearest example of this is Adam Jermyn's follow-up with repeated data. Here, we have a model with both "generalizing mechanisms" and "hard coded special cases which rarely activate." Distinguishing them would be very hard if one didn't understand the superposition structure.

If superposition is widespread, these results suggest that mechanistic anomaly detection will require solving superposition. My present guess (although very uncertain) is that superposition is the hardest problem in mechanistic interpretability. So this makes me think that anomaly detection likely isn't a significantly easier problem than mechanistic interpretability as a whole.

### Effect of Weight Decay and Epochs on Double Descent (Appendix)

Here we use m=4 models because they are much less prone to optimization failures than m=2, giving us more confidence in the results. Keeping other hyperparameters the same as the text, we find that decreasing weight decay increases the test loss bump, whereas increasing it all the way up to 1.0 removes it entirely. This is consistent with prior double-descent work.

We also vary the number of training epochs (still using a linear warmup for the first 5% of training, followed by a cosine decay for the learning rate). Again we find results in-line with prior double-descent work: more epochs leads to a larger bump in test loss.

### Author Contributions

**Core Research**: Tom Henighan led all experiments, analysis, and wrote most of the paper. Shan Carter was involved in all aspects of the research process, especially visual presentation. Nelson Elhage guided the research, was deeply involved in analysis, and worked with Adam Jermyn on dimensionality metric analysis. Christopher Olah originated the superposition idea, proposed the research question, and guided the research.

**Additional Experiments**: Adam Jermyn performed the "Maximal Data Dimension" experiments after reviewing an initial draft of the paper. Stanislav Fort provided advice on early iterations of this research.

**Other**: Tristan Hume and Robert Lasenby were involved in discussions and suggestions. Nicholas Schiefer provided logistical support.

---

*Source: [Superposition, Memorization, and Double Descent](https://transformer-circuits.pub/2023/toy-double-descent/index.html) — Transformer Circuits Thread, Anthropic, January 5, 2023*
