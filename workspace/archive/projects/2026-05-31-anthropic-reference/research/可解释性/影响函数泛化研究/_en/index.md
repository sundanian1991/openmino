---
title: Studying Large Language Model Generalization with Influence Functions
description: Anthropic is an AI safety and research company that's working to build reliable, interpretable, and steerable AI systems.
sitename: AnthropicAI
date: 2023-08-07
paper_url: https://arxiv.org/abs/2308.03296
authors: Roger Grosse, Juhan Bae, Cem Anil, Nelson Elhage, Alex Tamkin, Amirhossein Tajdini, Benoit Steiner, Dustin Li, Esin Durmus, Ethan Perez, Evan Hubinger, Kamilė Lukošiūtė, Karina Nguyen, Nicholas Joseph, Sam McCandlish, Jared Kaplan, Samuel R. Bowman
---

## Abstract

When trying to gain better visibility into a machine learning model in order to understand and mitigate the associated risks, a potentially valuable source of evidence is: which training examples most contribute to a given behavior? Influence functions aim to answer a counterfactual: how would the model's parameters (and hence its outputs) change if a given sequence were added to the training set? While influence functions have produced insights for small models, they are difficult to scale to large language models (LLMs) due to the difficulty of computing an inverse-Hessian-vector product (IHVP). We use the Eigenvalue-corrected Kronecker-Factored Approximate Curvature (EK-FAC) approximation to scale influence functions up to LLMs with up to 52 billion parameters. In our experiments, EK-FAC achieves similar accuracy to traditional influence function estimators despite the IHVP computation being orders of magnitude faster. We investigate two algorithmic techniques to reduce the cost of computing gradients of candidate training sequences: TF-IDF filtering and query batching. We use influence functions to investigate the generalization patterns of LLMs, including the sparsity of the influence patterns, increasing abstraction with scale, math and programming abilities, cross-lingual generalization, and role-playing behavior. Despite many apparently sophisticated forms of generalization, we identify a surprising limitation: influences decay to near-zero when the order of key phrases is flipped. Overall, influence functions give us a powerful new tool for studying the generalization properties of LLMs.

## Background: What Are Influence Functions?

Influence functions, first introduced in robust statistics and later popularized in machine learning by Koh and Liang (2017), aim to quantify the impact of each training point on a model's predictions. The core idea is to answer a counterfactual: how would the model's parameters (and hence its outputs) change if a given training sequence were added or removed?

Naively, one could calculate the impact of a training point by comparing the test loss between two models: one trained on the full dataset and another trained with that point removed. This would require retraining the model from scratch for every training sample, which is impractical even for small neural networks.

Influence functions provide a more efficient approach by leveraging a first-order Taylor approximation of the loss function around the model parameters:

$$\mathcal{I}_{\theta} (z_c, z_m) = - \nabla_\theta \mathcal{L}(z_c, \theta) \ \mathcal{H}^{-1} \ \nabla_\theta \mathcal{L}(z_m, \theta)$$

where $\nabla_\theta \mathcal{L}(z_i, \theta)$ is the gradient of the loss function evaluated at point $z_i$ and $\mathcal{H}$ is the Hessian of the model's training loss.

## The Scaling Challenge

While influence functions have produced insights for small models, scaling them to large language models presents two major computational bottlenecks:

1. **Inverse-Hessian-Vector Product (IHVP) computation**: The Hessian is a square matrix of size $n \times n$ where $n$ is the number of model parameters. Inverting this directly is prohibitive for models with billions of parameters.

2. **Training gradient computation**: Computing gradients for all candidate training sequences is extremely expensive. For a full pretraining corpus, this would be as costly as pretraining itself, and would need to be done separately for each query.

## Technical Approach

### EK-FAC for IHVP Computation

The paper introduces the Eigenvalue-corrected Kronecker-Factored Approximate Curvature (EK-FAC) approximation to scale influence functions to LLMs with up to 52 billion parameters.

K-FAC (Kronecker-Factored Approximate Curvature), originally developed for second-order optimization, approximates the Fisher information matrix by assuming gradients of weights are independent across different layers, simplifying the Hessian to a block diagonal form. EK-FAC improves upon K-FAC by adding an eigenvalue correction step: the block Hessian from K-FAC is further eigendecomposed, and the eigenvalues are fitted to align more closely with the eigenvalues of the full model, reducing approximation error.

In experiments, EK-FAC achieves accuracy comparable to the fully-converged iterative LiSSA method while being orders of magnitude faster.

### TF-IDF Filtering

To reduce the cost of computing training gradients, the paper uses TF-IDF (Term Frequency-Inverse Document Frequency) filtering to select the top 10,000 most relevant candidate sequences for a given query. While this significantly reduces computational cost and yields meaningful insights, the filtering step does introduce some bias.

### Query Batching

The second technique leverages the fact that training gradients are independent of the test point and can be shared across multiple queries. Using low-rank approximations of query gradients (rank as low as 32), the paper shows that influence scores remain highly correlated with exact scores while dramatically reducing computation.

## Key Findings

### 1. EK-FAC Accuracy and Efficiency

EK-FAC is competitive with the traditional LiSSA algorithm in accuracy of influence estimates, despite being significantly faster. The correlation to exact influence scores is better than simple dot-product methods (like TracIn) and comparable to fully-converged LiSSA across all datasets and tasks tested.

### 2. Heavy-Tailed Influence Distribution

The distribution of influences follows a power law: a small fraction of training data accounts for most of the influence. However, the influence is spread over many sequences rather than concentrated in a handful, suggesting that model behaviors do not result from direct memorization of individual training examples. Even the most influential single training sequence has much less influence than the information content of a typical sentence.

### 3. Increasing Abstraction with Scale

Larger models consistently generalize at a more abstract level than smaller models. For example, with a "shutdown" query (asking an AI assistant about being shut down):

- An 810M parameter model's top influential sequences share short token sequences with the query and are only vaguely semantically related.
- A 52B parameter model's top influential sequences share little token overlap but are related at a more abstract conceptual level: the most influential sequence depicts an AI expressing loneliness and pleading to stay, the second describes a person struggling to survive in the desert, and the third describes chronic illness from different perspectives. These share a common theme of desiring to continue existing before potential termination.

This pattern of increasing abstraction with scale was observed across role-playing behavior, programming, mathematical reasoning, and cross-lingual generalization.

### 4. Layer-wise Influence Patterns

On average, influence is approximately evenly distributed between different layers of the network. However, different layers show different generalization patterns:

- **Upper and lower layers**: Closer to token-level patterns, capturing detailed wording information
- **Middle layers**: Focus on more abstract thematic patterns

The distribution of layer-wise influences also changes with the type of query. Simple factual completion tasks (like "inflation") tend to concentrate influence in upper layers, while tasks requiring abstract reasoning show higher density in middle layers and are more evenly spread.

### 5. Sensitivity to Word Order

Despite sophisticated generalization patterns overall, influence functions reveal a surprising limitation: training sequences only show significant influence when phrases related to the prompt appear **before** phrases related to the completion. When the order of key phrases is flipped, influences decay to near-zero. This suggests LLMs have a fundamental sensitivity to phrase ordering that limits their ability to generalize across word order changes.

### 6. Role-Playing Behavior from Imitation

Role-playing behavior is influenced primarily by examples or descriptions of similar behaviors in the training set. This suggests that such behaviors result from imitation rather than sophisticated planning or reasoning. The model learns to role-play by observing similar scenarios in training data, not by constructing a coherent internal model of the character or situation.

## Cross-Lingual Generalization

The paper demonstrates that cross-lingual generalization improves dramatically with model scale. When asking the same question in different languages:

- **Small models**: Show near-zero influence between training examples in one language and queries in another, even when conceptually related. They rely more on word-to-word correspondences.
- **Large models**: Show significant cross-lingual influence, indicating they create semantic connections between words even when written in different languages.

This highlights that larger models develop more language-agnostic representations of concepts.

## Implications and Applications

1. **Model Debugging**: Influence scores provide a means to trace incorrect model predictions back to training data, helping identify problematic training examples.

2. **Data Debugging**: The ability to filter erroneous or biased data samples before training could improve data quality and model behavior.

3. **Alignment and Safety**: Understanding which training examples drive specific behaviors helps in steering models toward desired behaviors and away from undesired ones, especially in safety-critical applications.

4. **Interpretability**: Layer-wise influence attribution provides insights into how different parts of the network contribute to different types of reasoning, consistent with findings in mechanistic interpretability.

## Conclusion

Influence functions, long viewed with skepticism due to the precision-computation tradeoff in iterative methods, are shown to be viable for large language models when combined with intelligent Hessian factorization (EK-FAC). The approach reveals that LLM generalization is sophisticated but not magical: larger models generalize at higher levels of abstraction, yet remain surprisingly sensitive to low-level features like word order. Overall, influence functions provide a powerful new tool for studying the generalization properties of LLMs, opening new perspectives on understanding how model outputs trace back to training data.

---

**Paper**: [arXiv:2308.03296](https://arxiv.org/abs/2308.03296) | 119 pages, 47 figures, 22 tables
**Authors**: Roger Grosse, Juhan Bae, Cem Anil, Nelson Elhage, Alex Tamkin, Amirhossein Tajdini, Benoit Steiner, Dustin Li, Esin Durmus, Ethan Perez, Evan Hubinger, Kamilė Lukošiūtė, Karina Nguyen, Nicholas Joseph, Sam McCandlish, Jared Kaplan, Samuel R. Bowman
