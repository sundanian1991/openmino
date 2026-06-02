---
title: Claude SWE-Bench 性能报告
description: Claude 3.5 Sonnet 在 SWE-bench 软件工程评测中达到 49% 得分，超越了此前最先进的 45%。本文介绍我们围绕模型构建的 agent 脚手架，帮助开发者从 Claude 中获得最佳性能。
sitename: AnthropicAI
date: 2025-01-06
---
# Claude SWE-Bench 性能报告

![SWE-Bench 性能对比](images/swe-bench-sonnet_d1c3845336.svg)

*我们的最新模型——升级版 Claude 3.5 Sonnet——在 SWE-bench Verified（一个软件工程评测基准）上达到 49% 的得分，超越了此前最先进模型 45% 的成绩。本文解释了我们围绕该模型构建的"agent"，旨在帮助开发者从 Claude 3.5 Sonnet 中获得最佳性能。*

[SWE-bench](https://www.swebench.com/) 是一个 AI 评测基准，用于评估模型完成真实软件工程任务的能力。具体来说，它测试模型如何解决来自流行开源 Python 仓库的 GitHub issue。对于基准中的每个任务，AI 模型会获得一个配置好的 Python 环境以及该仓库在 issue 解决前一刻的检出副本（本地工作拷贝）。模型需要理解、修改并测试代码，然后提交其解决方案。

每个方案都会根据关闭原始 GitHub issue 的 pull request 中的真实单元测试进行评分。这测试的是 AI 模型是否能够实现与原始 PR 人类作者相同的功能。

SWE-bench 并非孤立地评估 AI 模型，而是评估一个完整的"agent"系统。在此语境中，"agent"指的是 AI 模型与其周围软件脚手架的组合。这个脚手架负责生成送入模型的 prompt、解析模型输出以执行操作，以及管理交互循环——将模型上一步操作的结果整合到下一步的 prompt 中。即使使用相同的底层 AI 模型，agent 在 SWE-bench 上的表现也可能因脚手架的不同而差异显著。

针对大语言模型的编码能力有许多其他基准，但 SWE-bench 因以下几个原因而逐渐流行：

需注意，原始 SWE-bench 数据集中包含一些在 GitHub issue 之外缺乏额外上下文就无法解决的任务（例如，涉及特定错误消息返回的任务）。[SWE-bench-Verified](https://openai.com/index/introducing-swe-bench-verified/) 是 SWE-bench 的一个 500 题子集，经过人工审核确保其可解性，因此能最清晰地衡量编码 agent 的性能。本文所指的基准即为此版本。

我们在为升级版 Claude 3.5 Sonnet 设计 agent 脚手架时的哲学是：尽可能多地将控制权交给语言模型本身，保持脚手架的最小化。该 agent 包含一个 prompt、一个用于执行 bash 命令的 Bash Tool，以及一个用于查看和编辑文件与目录的 Edit Tool。我们会持续采样，直到模型判定任务完成，或超出其 200k 上下文长度。这个脚手架允许模型自主判断如何推进问题，而非被硬编码到特定的模式或工作流中。

prompt 为模型勾勒了一个建议方法，但并未过于冗长或详尽。模型可以自由选择如何在步骤之间移动，而非遵循严格且离散的转换。如果你对 token 消耗不敏感，显式鼓励模型生成较长的响应可能会有所帮助。

以下代码展示了我们 agent 脚手架中的 prompt：

```
<uploaded_files>
{location}
</uploaded_files>
I've uploaded a python code repository in the directory {location} (not in /tmp/inputs). Consider the following PR description:
<pr_description>
{pr_description}
</pr_description>
Can you help me implement the necessary changes to the repository so that the requirements specified in the <pr_description> are met?
I've already taken care of all changes to any of the test files described in the <pr_description>. This means you DON'T have to modify the testing logic or any of the tests in any way!
Your task is to make the minimal changes to non-tests files in the {location} directory to ensure the <pr_description> is satisfied.
Follow these steps to resolve the issue:
1. As a first step, it might be a good idea to explore the repo to familiarize yourself with its structure.
2. Create a script to reproduce the error and execute it with `python <filename.py>` using the BashTool, to confirm the error
3. Edit the sourcecode of the repo to resolve the issue
4. Rerun your reproduce script and confirm that the error is fixed!
5. Think about edgecases and make sure your fix handles them as well
Your thinking should be thorough and so it's fine if it's very long.
```

模型的第一个工具用于执行 Bash 命令。其 schema 很简单，仅接受要在环境中运行的命令。然而，工具的描述承载了更多分量——它包含对模型的更详细指引，包括输入的转义、无网络访问权限以及如何在后台运行命令。

下面是 Bash Tool 的规格说明：

```
{
"name": "bash",
"description": "Run commands in a bash shell\n
* When invoking this tool, the contents of the \"command\" parameter does NOT need to be XML-escaped.\n
* You don't have access to the internet via this tool.\n
* You do have access to a mirror of common linux and python packages via apt and pip.\n
* State is persistent across command calls and discussions with the user.\n
* To inspect a particular line range of a file, e.g. lines 10-25, try 'sed -n 10,25p /path/to/the/file'.\n
* Please avoid commands that may produce a very large amount of output.\n
* Please run long lived commands in the background, e.g. 'sleep 10 &' or start a server in the background.",
"input_schema": {
"type": "object",
"properties": {
"command": {
"type": "string",
"description": "The bash command to run."
}
},
"required": ["command"]
}
}
```

模型的第二个工具（Edit Tool）要复杂得多，它包含了模型查看、创建和编辑文件所需的一切。同样，我们的工具描述中包含了对模型如何使用该工具的详细信息。

我们在大量 agent 任务中为这些工具的描述和规格付出了巨大努力。我们对它们进行测试，以发现模型可能误解规格的方式或使用工具时可能遇到的陷阱，然后修改描述来预防这些问题。我们认为，应该像重视为人类设计工具界面一样，重视为模型设计工具界面。

以下代码展示了 Edit Tool 的描述：

```
{
"name": "str_replace_editor",
"description": "Custom editing tool for viewing, creating and editing files\n
* State is persistent across command calls and discussions with the user\n
* If `path` is a file, `view` displays the result of applying `cat -n`. If `path` is a directory, `view` lists non-hidden files and directories up to 2 levels deep\n
* The `create` command cannot be used if the specified `path` already exists as a file\n
* If a `command` generates a long output, it will be truncated and marked with `<response clipped>` \n
* The `undo_edit` command will revert the last edit made to the file at `path`\n
\n
Notes for using the `str_replace` command:\n
* The `old_str` parameter should match EXACTLY one or more consecutive lines from the original file. Be mindful of whitespaces!\n
* If the `old_str` parameter is not unique in the file, the replacement will not be performed. Make sure to include enough context in `old_str` to make it unique\n
* The `new_str` parameter should contain the edited lines that should replace the `old_str`",
...
```

我们提升性能的一种做法是让工具"防错"。例如，模型有时会在 agent 离开根目录后搞乱相对文件路径。为防止这一点，我们简单地让工具始终要求绝对路径。

我们试验了多种指定文件编辑的策略，最终发现字符串替换的可靠性最高——模型指定文件中的 `old_str`，用 `new_str` 来替换。仅当 `old_str` 恰好匹配一次时，替换才会执行。如果匹配次数多于或少于一次，模型会看到相应的错误信息以便重试。

Edit Tool 的输入 schema 如下：

```
...
"input_schema": {
"type": "object",
"properties": {
"command": {
"type": "string",
"enum": ["view", "create", "str_replace", "insert", "undo_edit"],
"description": "The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`."
},
"file_text": {
"description": "Required parameter of `create` command, with the content of the file to be created.",
"type": "string"
},
"insert_line": {
"description": "Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`.",
"type": "integer"
},
"new_str": {
"description": "Required parameter of `str_replace` command containing the new string. Required parameter of `insert` command containing the string to insert.",
"type": "string"
},
"old_str": {
"description": "Required parameter of `str_replace` command containing the string in `path` to replace.",
"type": "string"
},
"path": {
"description": "Absolute path to file or directory, e.g. `/repo/file.py` or `/repo`.",
"type": "string"
},
"view_range": {
"description": "Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file.",
"items": {
"type": "integer"
},
"type": "array"
}
},
"required": ["command", "path"]
}
}
```

总体而言，升级版 Claude 3.5 Sonnet 在推理、编码和数学能力上均超越了此前的模型和[此前的最先进模型](https://solverai.com/)。它还展示了更强的 agent 能力：工具和脚手架帮助将这些提升的能力发挥到了最佳状态。

| 模型 | Claude 3.5 Sonnet（新版） | 此前 SOTA | Claude 3.5 Sonnet（旧版） | Claude 3 Opus |
|---|---|---|---|---|
| SWE-bench Verified 得分 | 49% | 45% | 33% | 22% |

在运行基准测试时，我们使用 [SWE-Agent](https://swe-agent.com/) 框架作为 agent 代码的基础。在下面的日志中，我们将 agent 的文本输出、工具调用和工具响应分别呈现为 THOUGHT、ACTION 和 OBSERVATION，尽管我们并未将模型约束为固定的顺序。

下面的代码块将展示 Sonnet 3.5 解决 SWE-bench 问题的一个典型案例。

在第一个代码块中，你可以看到给模型的初始 prompt 的一部分，其中 `{pr_description}` 被填充为 SWE-bench 任务中的真实值。重要的是，这个任务包含了复现问题的步骤，这为模型提供了一个有价值的调查起点。

```
<uploaded_files>
/repo
</uploaded_files>
I've uploaded a python code repository in the directory /repo (not in /tmp/inputs). Consider the following PR description:
<pr_description>
linear_model.RidgeClassifierCV's Parameter store_cv_values issue
#### Description
Parameter store_cv_values error on sklearn.linear_model.RidgeClassifierCV
#### Steps/Code to Reproduce
import numpy as np
from sklearn import linear_model as lm
#test database
n = 100
x = np.random.randn(n, 30)
y = np.random.normal(size = n)
rr = lm.RidgeClassifierCV(alphas = np.arange(0.1, 1000, 0.1), normalize = True,
store_cv_values = True).fit(x, y)
#### Expected Results
Expected to get the usual ridge regression model output, keeping the cross validation predictions as attribute.
#### Actual Results
TypeError: __init__() got an unexpected keyword argument 'store_cv_values'
lm.RidgeClassifierCV actually has no parameter store_cv_values, even though some attributes depends on it.
```

模型响应后，首先使用 Edit Tool 查看仓库结构。你可以在 THOUGHT 和 ACTION 下看到模型的文本输出和工具调用参数，在 OBSERVATION 下看到工具的部分输出：

```
THOUGHT:
I'll help you implement the changes to satisfy the PR description. Let's follow the steps you outlined.
1. First, let's explore the repo structure:
ACTION (str_replace_editor):
command:
view
path:
/repo
OBSERVATION:
Here's the files and directories up to 2 levels deep in /repo, excluding hidden items:
/repo
/repo/PULL_REQUEST_TEMPLATE.md
/repo/ISSUE_TEMPLATE.md
/repo/sklearn
/repo/sklearn/decomposition
/repo/sklearn/kernel_ridge.py
/repo/sklearn/model_selection
/repo/sklearn/covariance
/repo/sklearn/cluster
/repo/sklearn/base.py
/repo/sklearn/dummy.py
/repo/sklearn/naive_bayes.py
...
```

在对仓库结构有了更好的理解后，模型使用 Edit Tool 创建了一个新脚本，用于复现问题并测试其修复：

```
THOUGHT:
Based on the repository structure, we'll need to modify the Ridge Classifier in the `sklearn/linear_model` directory.
Let's create a script to reproduce the error:
ACTION (str_replace_editor):
command:
create
path:
/repo/reproduce_error.py
file_text:
import numpy as np
from sklearn import linear_model as lm
#test database
n = 100
x = np.random.randn(n, 30)
y = np.random.normal(size = n)
rr = lm.RidgeClassifierCV(alphas=np.arange(0.1, 1000, 0.1), normalize=True,
store_cv_values=True).fit(x, y)
OBSERVATION:
File created successfully at: /repo/reproduce_error.py
```

接着，模型使用 Bash Tool 执行它编写的脚本，成功复现了任务中的问题：

```
THOUGHT:
Let's verify that we can reproduce the error:
ACTION (bash):
command:
python3 /repo/reproduce_error.py
OBSERVATION:
Traceback (most recent call last):
File "/repo/reproduce_error.py", line 10, in <module>
store_cv_values=True).fit(x, y)
TypeError: __init__() got an unexpected keyword argument 'store_cv_values'
```

此后，模型使用 Edit Tool 修改仓库中的源代码，并重新运行脚本以验证修改是否解决了问题：

```
THOUGHT:
The error is reproducible. Looking at the code, I can see that the issue is that while the `RidgeClassifierCV` class inherits from `_BaseRidgeCV`, it fails to pass the `store_cv_values` parameter from its constructor through to the base class constructor.
Let's fix this:
ACTION (str_replace_editor):
command:
str_replace
path:
/repo/sklearn/linear_model/ridge.py
old_str:
def __init__(self, alphas=(0.1, 1.0, 10.0), fit_intercept=True,
normalize=False, scoring=None, cv=None, class_weight=None):
super(RidgeClassifierCV, self).__init__(
alphas=alphas, fit_intercept=fit_intercept, normalize=normalize,
scoring=scoring, cv=cv)
self.class_weight = class_weight
new_str:
def __init__(self, alphas=(0.1, 1.0, 10.0), fit_intercept=True,
normalize=False, scoring=None, cv=None, class_weight=None,
store_cv_values=False):
super(RidgeClassifierCV, self).__init__(
alphas=alphas, fit_intercept=fit_intercept, normalize=normalize,
scoring=scoring, cv=cv, store_cv_values=store_cv_values)
self.class_weight = class_weight
```

在这个特定案例中，模型工作了 12 步后判定可以提交。该任务的测试随后成功运行，验证了模型的方案解决了问题。有些任务需要超过 100 个回合模型才提交其方案；在其他任务中，模型持续尝试直到耗尽上下文。

通过对比升级版 Claude 3.5 Sonnet 与旧模型的尝试记录，我们发现升级版 3.5 Sonnet 更频繁地进行自我纠正。它还展示了尝试多种不同方案的能力，而非陷入重复犯同样错误的困境。

SWE-bench Verified 是一个强大的评测工具，但运行起来比简单的单轮评测复杂得多。以下是我们使用过程中面临的一些挑战——其他 AI 开发者也可能会遇到类似的问题。

升级版 Claude 3.5 Sonnet 凭借简单的 prompt 和两个通用工具，在 SWE-bench Verified 上达到了 49% 的成绩，超越了此前最先进的 45%。我们相信，使用新版 Claude 3.5 Sonnet 的开发者将很快找到比我们在此展示的初始成果更好的方法来提升 SWE-bench 得分。

Erik Schluntz 优化了 SWE-bench agent 并撰写了本文。Simon Biggs、Dawn Drain 和 Eric Christiansen 协助实施了基准测试。Shauna Kravec、Dawn Drain、Felipe Rosso、Nova DasSarma、Ven Chandrasekaran 及其他许多人为训练 Claude 3.5 Sonnet 在 agent 编码方面的卓越表现做出了贡献。
